/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from 'next/link';
import {
  themes,
  buttonTokens,
  tagTokens,
  notificationTokens,
  statusTokens,
  contentSwitcherTokens,
} from '../../../../src';
import { TokenFormat, group, contextual } from '../../../../src/tokens';
import * as componentGroups from '../../../../src/tokens/components';

import whiteJson from '../../../../src/dtcg/white.json';
import g10Json from '../../../../src/dtcg/g10.json';
import g90Json from '../../../../src/dtcg/g90.json';
import g100Json from '../../../../src/dtcg/g100.json';
import buttonJson from '../../../../src/dtcg/components/button.json';
import contentSwitcherJson from '../../../../src/dtcg/components/content-switcher.json';
import notificationJson from '../../../../src/dtcg/components/notification.json';
import statusJson from '../../../../src/dtcg/components/status.json';
import tagJson from '../../../../src/dtcg/components/tag.json';

// ─── Component token lookup: camelCase JS name → { whiteTheme, g10, g90, g100 } ──
const COMP_TOKENS = Object.assign(
  {},
  buttonTokens,
  tagTokens,
  notificationTokens,
  statusTokens,
  contentSwitcherTokens
);
const THEME_KEY = { white: 'whiteTheme', g10: 'g10', g90: 'g90', g100: 'g100' };

// ─── DTCG helpers (same as index.js) ─────────────────────────────────────────

function flattenDtcg(obj, prefix = '') {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const name = prefix ? `${prefix}-${key}` : key;
    if (val && typeof val === 'object' && !('$value' in val)) {
      Object.assign(result, flattenDtcg(val, name));
    } else if (val && '$value' in val) {
      result[name] = val;
    }
  }
  return result;
}

function flattenComponentDtcg(obj, prefix = '') {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const name = prefix ? `${prefix}-${key}` : key;
    if (
      val &&
      typeof val === 'object' &&
      '$extensions' in val &&
      'carbon.themes' in val.$extensions
    ) {
      result[name] = val;
    } else if (val && typeof val === 'object') {
      Object.assign(result, flattenComponentDtcg(val, name));
    }
  }
  return result;
}

const dtcgFlat = {
  white: flattenDtcg(whiteJson),
  g10: flattenDtcg(g10Json),
  g90: flattenDtcg(g90Json),
  g100: flattenDtcg(g100Json),
};

const componentDtcg = {
  ...flattenComponentDtcg(buttonJson),
  ...flattenComponentDtcg(contentSwitcherJson),
  ...flattenComponentDtcg(notificationJson),
  ...flattenComponentDtcg(statusJson),
  ...flattenComponentDtcg(tagJson),
};

function getAlias(theme, tokenName) {
  if (componentDtcg[tokenName]) {
    const entry = componentDtcg[tokenName];
    const val =
      entry.$extensions?.['carbon.themes']?.[theme] ??
      entry.$extensions?.['carbon.themes']?.white ??
      null;
    const alpha =
      entry.$extensions?.['org.carbon']?.alphaModifiers?.[theme] ??
      entry.$extensions?.['org.carbon']?.alphaModifier ??
      null;
    if (!val) return null;
    return alpha != null ? `${val} × ${alpha}α` : String(val);
  }
  const entry = dtcgFlat[theme]?.[tokenName] ?? dtcgFlat.white?.[tokenName];
  if (!entry) return null;
  const ref = String(entry.$value ?? '');
  const alpha = entry.$extensions?.['org.carbon']?.alphaModifier;
  return alpha != null ? `${ref} × ${alpha}α` : ref;
}

function resolveValue(theme, jsName) {
  // Check component tokens first (they aren't in themes.white/g10/...)
  const compEntry = COMP_TOKENS[jsName];
  if (compEntry != null) {
    const val = compEntry[THEME_KEY[theme]] ?? compEntry[THEME_KEY.white];
    return val ?? null;
  }
  const raw = themes[theme]?.[jsName];
  if (raw == null) return null;
  if (typeof raw === 'object') {
    return (
      raw.hex ??
      (raw.r !== undefined
        ? `rgba(${raw.r}, ${raw.g}, ${raw.b}, ${raw.a ?? 1})`
        : null)
    );
  }
  return String(raw);
}

// ─── Build tree: [ { category, groups: [ { name, tokens: [...] } ] } ] ───────

const THEME_OPTIONS = [
  { label: 'White', key: 'white' },
  { label: 'Gray 10 (g10)', key: 'g10' },
  { label: 'Gray 90 (g90)', key: 'g90' },
  { label: 'Gray 100 (g100)', key: 'g100' },
];

// Sub-groups of the root group (skip the top-level "All" group itself)
const rootSubGroups = group.getTokenGroups().filter((g) => g.name !== 'All');

const TREE = [
  {
    category: 'Root',
    groups: rootSubGroups.map((g) => ({
      name: g.name,
      tokens: g.getTokens(),
    })),
  },
  {
    category: 'Contextual',
    groups: [{ name: 'Contextual', tokens: contextual.getTokens() }],
  },
  ...Object.values(componentGroups).map((g) => ({
    category: g.name,
    groups: [{ name: g.name, tokens: g.getTokens() }],
  })),
];

// ─── Components ───────────────────────────────────────────────────────────────

function TokenLeaf({ token, theme }) {
  const jsName = TokenFormat.convert({
    name: token.name,
    format: TokenFormat.formats.js,
  });
  const color = resolveValue(theme, jsName);
  const alias = getAlias(theme, token.name);

  return (
    <div className="tree-token">
      <div
        className="tree-swatch"
        style={{ background: color ?? 'transparent' }}
        title={color ?? '—'}
      />
      <div className="tree-token-info">
        <span className="tree-token-name">{token.name}</span>
        {alias && <span className="tree-alias">{alias}</span>}
        {color && <span className="tree-hex">{color}</span>}
      </div>
    </div>
  );
}

function GroupNode({ name, tokens, theme }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="tree-group">
      <button
        className={`tree-group-toggle${open ? ' tree-group-toggle--open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}>
        <span className="tree-chevron">{open ? '▾' : '▸'}</span>
        <span className="tree-group-name">{name}</span>
        <span className="tree-group-count">{tokens.length}</span>
      </button>
      {open && (
        <div className="tree-group-tokens">
          {tokens.map((t) => (
            <TokenLeaf key={t.name} token={t} theme={theme} />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryNode({ category, groups, theme }) {
  const [open, setOpen] = React.useState(false);
  const total = groups.reduce((n, g) => n + g.tokens.length, 0);
  return (
    <div className="tree-category">
      <button
        className={`tree-category-toggle${open ? ' tree-category-toggle--open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}>
        <span className="tree-chevron">{open ? '▾' : '▸'}</span>
        <span className="tree-category-name">{category}</span>
        <span className="tree-group-count">{total}</span>
      </button>
      {open && (
        <div className="tree-category-children">
          {/* If there's only one group with same name as category, skip the group level */}
          {groups.length === 1 && groups[0].name === category
            ? groups[0].tokens.map((t) => (
                <TokenLeaf key={t.name} token={t} theme={theme} />
              ))
            : groups.map((g) => (
                <GroupNode
                  key={g.name}
                  name={g.name}
                  tokens={g.tokens}
                  theme={theme}
                />
              ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TreePage({ lastBuiltOn }) {
  const [activeTheme, setActiveTheme] = React.useState('white');
  const totalTokens = TREE.reduce(
    (n, c) => n + c.groups.reduce((m, g) => m + g.tokens.length, 0),
    0
  );

  return (
    <main>
      <section>
        <header className="header">
          <div className="header-title">
            <h1>Theme Tokens DTCG — Tree ({totalTokens})</h1>
            <p>Last built on {lastBuiltOn}</p>
          </div>
          <div className="controls">
            <div className="control-group">
              <label htmlFor="theme-select-tree">Theme</label>
              <select
                id="theme-select-tree"
                value={activeTheme}
                onChange={(e) => setActiveTheme(e.target.value)}>
                {THEME_OPTIONS.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <Link href="/" className="nav-link">
              Table view
            </Link>
            <Link href="/graph" className="nav-link">
              Graph view
            </Link>
          </div>
        </header>

        <div className="content tree-content">
          {TREE.map((c) => (
            <CategoryNode
              key={c.category}
              category={c.category}
              groups={c.groups}
              theme={activeTheme}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: { lastBuiltOn: new Date().toISOString() },
  };
}
