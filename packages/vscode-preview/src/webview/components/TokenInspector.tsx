/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * TokenInspector — dynamically discovers and displays all Carbon CSS custom
 * properties (--cds-*) that are referenced by the CSS rules applied to a
 * rendered component's DOM subtree.
 *
 * No static token lists needed. Works by:
 * 1. Walking all document.styleSheets
 * 2. Finding rules whose selectors match elements inside the container ref
 * 3. Extracting var(--cds-*) references from those rules' cssText
 * 4. Resolving live values via getComputedStyle on the container element
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface TokenEntry {
  /** The full CSS custom property name, e.g. "--cds-button-primary" */
  name: string;
  /** The live resolved value from getComputedStyle */
  value: string;
}

interface TokenInspectorProps {
  /** Ref to the container element wrapping the rendered component */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Active theme id — used to re-scan when theme changes */
  activeTheme: string;
  /**
   * A key that changes whenever the rendered story changes (e.g.
   * "Button/Danger"). TokenInspector re-scans the DOM whenever this changes,
   * so switching stories updates the token list.
   */
  scanKey: string;
}

/** Extract all --cds-* variable names referenced in a CSS declaration string */
function extractCdsVars(cssText: string): string[] {
  const matches = cssText.matchAll(/var\(\s*(--cds-[a-zA-Z0-9-]+)/g);
  const names = new Set<string>();
  for (const m of matches) {
    names.add(m[1]);
  }
  return Array.from(names);
}

/**
 * Walk all accessible stylesheets and collect --cds-* tokens referenced in
 * rules whose selectors match at least one element inside `container`.
 */
function discoverTokens(container: HTMLElement): string[] {
  const found = new Set<string>();

  // Also scan inline styles on all elements in the subtree
  const allElements = [
    container,
    ...Array.from(container.querySelectorAll('*')),
  ];
  for (const el of allElements) {
    const inline = (el as HTMLElement).style?.cssText ?? '';
    for (const name of extractCdsVars(inline)) {
      found.add(name);
    }
  }

  // Walk stylesheets
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      // Cross-origin sheet — skip
      continue;
    }
    if (!rules) continue;

    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSStyleRule)) continue;

      // Check if this rule's selector matches any element in our subtree
      let matches = false;
      try {
        matches = allElements.some((el) => el.matches(rule.selectorText));
      } catch {
        // Invalid selector — skip
        continue;
      }

      if (matches) {
        for (const name of extractCdsVars(rule.style.cssText)) {
          found.add(name);
        }
      }
    }
  }

  return Array.from(found).sort();
}

/** Resolve the live computed value of a CSS custom property on an element */
function resolveToken(el: HTMLElement, name: string): string {
  return getComputedStyle(el).getPropertyValue(name).trim();
}

/** True if the string looks like a CSS color value (hex, rgb, hsl, named, or var()) */
function looksLikeColor(value: string): boolean {
  if (!value) return false;
  const v = value.trim();
  return (
    v.startsWith('#') ||
    v.startsWith('rgb') ||
    v.startsWith('hsl') ||
    v.startsWith('var(') ||
    /^[a-zA-Z]+$/.test(v) // named color
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const panelStyles: React.CSSProperties = {
  marginTop: '24px',
  border: '1px solid var(--vscode-panel-border, #c8c8c8)',
  borderRadius: '2px',
  overflow: 'hidden',
  maxWidth: '800px',
  // Use the editor background so the panel always contrasts with its border
  background: 'var(--vscode-editor-background, #ffffff)',
};

const headerStyles: React.CSSProperties = {
  padding: '8px 16px',
  // sideBarSectionHeader-background is defined for both light and dark themes
  background: 'var(--vscode-sideBarSectionHeader-background, #e8e8e8)',
  borderBottom: '1px solid var(--vscode-panel-border, #c8c8c8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
};

const headerTitleStyles: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  // editor-foreground adapts to light/dark automatically
  color: 'var(--vscode-editor-foreground, #1e1e1e)',
  userSelect: 'none',
};

const headerCountStyles: React.CSSProperties = {
  fontSize: '11px',
  opacity: 0.6,
  color: 'var(--vscode-editor-foreground, #1e1e1e)',
  userSelect: 'none',
};

const tableStyles: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '12px',
  fontFamily: 'var(--vscode-editor-font-family, "Cascadia Code", monospace)',
  background: 'var(--vscode-editor-background, #ffffff)',
};

const thStyles: React.CSSProperties = {
  padding: '6px 12px',
  textAlign: 'left',
  fontSize: '10px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: 'var(--vscode-editor-foreground, #1e1e1e)',
  opacity: 0.7,
  borderBottom: '1px solid var(--vscode-panel-border, #c8c8c8)',
  userSelect: 'none',
  fontFamily: 'var(--vscode-font-family, sans-serif)',
  background: 'var(--vscode-editor-background, #ffffff)',
};

const tdStyles: React.CSSProperties = {
  padding: '5px 12px',
  borderBottom: '1px solid var(--vscode-panel-border, #e8e8e8)',
  verticalAlign: 'middle',
  color: 'var(--vscode-editor-foreground, #1e1e1e)',
};

const tokenNameStyles: React.CSSProperties = {
  // symbolIcon-variableForeground is blue on dark (#9cdcfe) and dark-blue on
  // light (#0070c1) — both readable on their respective backgrounds
  color: 'var(--vscode-symbolIcon-variableForeground, #0070c1)',
  userSelect: 'text',
};

const emptyStyles: React.CSSProperties = {
  padding: '16px',
  fontSize: '12px',
  opacity: 0.6,
  color: 'var(--vscode-editor-foreground, #1e1e1e)',
  userSelect: 'none',
  fontFamily: 'var(--vscode-font-family, sans-serif)',
  background: 'var(--vscode-editor-background, #ffffff)',
};

// ─── Component ───────────────────────────────────────────────────────────────

export function TokenInspector({
  containerRef,
  activeTheme,
  scanKey,
}: TokenInspectorProps) {
  const [tokens, setTokens] = useState<TokenEntry[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const rafRef = useRef<number | null>(null);

  const scan = useCallback(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    // Cancel any pending scan
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    // Double-rAF: first frame lets React commit the new story DOM,
    // second frame lets Carbon's CSS settle after the commit.
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const names = discoverTokens(el);
        const entries: TokenEntry[] = names.map((name) => ({
          name,
          value: resolveToken(el, name),
        }));
        setTokens(entries);
      });
    });
  }, [containerRef]);

  // Re-scan whenever the active theme OR the rendered story changes.
  // scanKey is "GroupTitle/StoryName" and changes on every story switch.
  useEffect(() => {
    scan();
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [activeTheme, scanKey, scan]);

  return (
    <div style={panelStyles}>
      {/* Collapsible header */}
      <div
        style={{ ...headerStyles, cursor: 'pointer' }}
        onClick={() => setIsOpen((o) => !o)}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setIsOpen((o) => !o);
        }}>
        <span style={headerTitleStyles}>
          {isOpen ? '▾' : '▸'}&nbsp; Carbon Tokens
        </span>
        <span style={headerCountStyles}>
          {tokens.length} token{tokens.length !== 1 ? 's' : ''} · click to{' '}
          {isOpen ? 'collapse' : 'expand'}
        </span>
      </div>

      {isOpen && (
        <>
          {tokens.length === 0 ? (
            <div style={emptyStyles}>No --cds-* tokens detected</div>
          ) : (
            <table style={tableStyles}>
              <thead>
                <tr>
                  <th style={thStyles}>Token</th>
                  <th style={thStyles}>Live value</th>
                  <th style={{ ...thStyles, width: '32px' }}>Swatch</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, i) => (
                  <tr
                    key={token.name}
                    style={{
                      // list-hoverBackground is defined for both light and dark
                      // themes and always provides a subtle, readable contrast.
                      background:
                        i % 2 === 0
                          ? 'var(--vscode-editor-background, #ffffff)'
                          : 'var(--vscode-list-hoverBackground, #f0f0f0)',
                    }}>
                    <td style={tdStyles}>
                      <span style={tokenNameStyles}>{token.name}</span>
                    </td>
                    <td style={tdStyles}>
                      <span style={{ userSelect: 'text' }}>
                        {token.value || <em style={{ opacity: 0.4 }}>empty</em>}
                      </span>
                    </td>
                    <td style={tdStyles}>
                      {looksLikeColor(token.value) && (
                        <div
                          title={token.value}
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '2px',
                            background: token.value,
                            border:
                              '1px solid var(--vscode-panel-border, #444)',
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

// Made with Bob
