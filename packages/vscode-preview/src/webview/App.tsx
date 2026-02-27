/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { componentRegistry } from './components';

// Available Carbon themes. "vscode" uses real --vscode-* CSS vars injected by
// VS Code; the others use Carbon's built-in token values.
const THEMES = [
  { id: 'vscode', label: 'VS Code' },
  { id: 'white', label: 'White' },
  { id: 'g10', label: 'Gray 10' },
  { id: 'g90', label: 'Gray 90' },
  { id: 'g100', label: 'Gray 100' },
] as const;

type ThemeId = (typeof THEMES)[number]['id'];

// Inline styles use VS Code CSS custom properties directly for the shell UI
// (sidebar, toolbar). The preview area uses Carbon theme tokens instead.
const styles = {
  app: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    fontFamily: 'var(--vscode-font-family, "IBM Plex Sans", sans-serif)',
    fontSize: 'var(--vscode-font-size, 13px)',
    color: 'var(--vscode-foreground, #cccccc)',
    background: 'var(--vscode-editor-background, #1e1e1e)',
  } as React.CSSProperties,

  sidebar: {
    width: '220px',
    minWidth: '220px',
    background: 'var(--vscode-sideBar-background, #252526)',
    borderRight: '1px solid var(--vscode-sideBar-border, #2b2b2b)',
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column' as const,
  } as React.CSSProperties,

  sidebarHeader: {
    padding: '12px 16px 8px',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: 'var(--vscode-sideBarTitle-foreground, #bbbbbb)',
    borderBottom: '1px solid var(--vscode-sideBar-border, #2b2b2b)',
    userSelect: 'none' as const,
  } as React.CSSProperties,

  sidebarSection: {
    padding: '4px 0',
  } as React.CSSProperties,

  sidebarGroupTitle: {
    padding: '6px 16px 4px',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    color: 'var(--vscode-sideBarSectionHeader-foreground, #bbbbbb)',
    userSelect: 'none' as const,
    cursor: 'default',
  } as React.CSSProperties,

  sidebarItem: (isActive: boolean): React.CSSProperties => ({
    padding: '4px 16px 4px 28px',
    cursor: 'pointer',
    fontSize: '13px',
    color: isActive
      ? 'var(--vscode-list-activeSelectionForeground, #ffffff)'
      : 'var(--vscode-foreground, #cccccc)',
    background: isActive
      ? 'var(--vscode-list-activeSelectionBackground, #04395e)'
      : 'transparent',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),

  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
  } as React.CSSProperties,

  toolbar: {
    padding: '6px 16px',
    borderBottom: '1px solid var(--vscode-panel-border, #2b2b2b)',
    background: 'var(--vscode-editor-background, #1e1e1e)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--vscode-foreground, #cccccc)',
    userSelect: 'none' as const,
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,

  toolbarBreadcrumb: {
    opacity: 0.7,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: 0,
  } as React.CSSProperties,

  toolbarSeparator: {
    opacity: 0.4,
  } as React.CSSProperties,

  toolbarCurrent: {
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties,

  themeSelector: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flexShrink: 0,
  } as React.CSSProperties,

  themeSelectorLabel: {
    fontSize: '11px',
    opacity: 0.7,
    userSelect: 'none' as const,
  } as React.CSSProperties,

  themeButton: (isActive: boolean): React.CSSProperties => ({
    padding: '2px 8px',
    fontSize: '11px',
    cursor: 'pointer',
    border: isActive
      ? '1px solid var(--vscode-focusBorder, #007fd4)'
      : '1px solid var(--vscode-input-border, #3c3c3c)',
    borderRadius: '2px',
    background: isActive
      ? 'var(--vscode-button-secondaryBackground, #3a3d41)'
      : 'transparent',
    color: isActive
      ? 'var(--vscode-button-secondaryForeground, #cccccc)'
      : 'var(--vscode-foreground, #cccccc)',
    fontWeight: isActive ? 600 : 400,
    userSelect: 'none',
    lineHeight: '18px',
  }),

  preview: {
    flex: 1,
    overflow: 'auto',
    padding: '32px',
  } as React.CSSProperties,

  previewCard: {
    border: '1px solid var(--vscode-panel-border, #2b2b2b)',
    borderRadius: '2px',
    padding: '32px',
    maxWidth: '800px',
  } as React.CSSProperties,

  previewTitle: {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    opacity: 0.6,
    marginBottom: '24px',
    userSelect: 'none' as const,
  } as React.CSSProperties,

  emptyState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column' as const,
    gap: '8px',
    opacity: 0.5,
    userSelect: 'none' as const,
  } as React.CSSProperties,
};

interface Selection {
  groupTitle: string;
  storyName: string;
}

export function App() {
  const [selection, setSelection] = useState<Selection | null>(() => {
    const first = componentRegistry[0];
    if (first && first.stories[0]) {
      return { groupTitle: first.title, storyName: first.stories[0].name };
    }
    return null;
  });

  // Default to "vscode" so designers immediately see the VS Code-mapped theme.
  const [activeTheme, setActiveTheme] = useState<ThemeId>('vscode');

  const selectedGroup = selection
    ? componentRegistry.find((g) => g.title === selection.groupTitle)
    : null;

  const selectedStory =
    selectedGroup && selection
      ? selectedGroup.stories.find((s) => s.name === selection.storyName)
      : null;

  // Background color for the preview area — use Carbon token background for
  // non-vscode themes so the preview looks correct against the theme.
  const previewBackground =
    activeTheme === 'vscode'
      ? 'var(--vscode-editor-background, #1e1e1e)'
      : activeTheme === 'white' || activeTheme === 'g10'
        ? '#f4f4f4'
        : '#161616';

  return (
    <div style={styles.app}>
      {/* Sidebar */}
      <nav style={styles.sidebar} aria-label="Component navigation">
        <div style={styles.sidebarHeader}>Carbon Preview</div>
        <div style={styles.sidebarSection}>
          {componentRegistry.map((group) => (
            <div key={group.title}>
              <div style={styles.sidebarGroupTitle}>{group.title}</div>
              {group.stories.map((story) => {
                const isActive =
                  selection?.groupTitle === group.title &&
                  selection?.storyName === story.name;
                return (
                  <div
                    key={story.name}
                    style={styles.sidebarItem(isActive)}
                    onClick={() =>
                      setSelection({
                        groupTitle: group.title,
                        storyName: story.name,
                      })
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelection({
                          groupTitle: group.title,
                          storyName: story.name,
                        });
                      }
                    }}
                    aria-current={isActive ? 'page' : undefined}>
                    {story.name}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <main style={styles.main}>
        {/* Toolbar: breadcrumb + theme switcher */}
        <div style={styles.toolbar}>
          {/* Breadcrumb */}
          <div style={styles.toolbarBreadcrumb}>
            {selection ? (
              <>
                <span style={styles.toolbarSeparator}>
                  {selection.groupTitle}
                </span>
                <span style={styles.toolbarSeparator}>/</span>
                <span style={styles.toolbarCurrent}>{selection.storyName}</span>
              </>
            ) : (
              <span>Select a component</span>
            )}
          </div>

          {/* Theme switcher */}
          <div style={styles.themeSelector} role="group" aria-label="Theme">
            <span style={styles.themeSelectorLabel}>Theme:</span>
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                style={styles.themeButton(activeTheme === theme.id)}
                onClick={() => setActiveTheme(theme.id)}
                aria-pressed={activeTheme === theme.id}
                title={
                  theme.id === 'vscode'
                    ? 'VS Code theme — uses your current VS Code color theme'
                    : `Carbon ${theme.label} theme`
                }>
                {theme.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preview area — data-carbon-theme drives which Carbon theme is active */}
        <div
          style={{ ...styles.preview, background: previewBackground }}
          data-carbon-theme={activeTheme}>
          {selectedStory ? (
            <div style={styles.previewCard}>
              <div style={styles.previewTitle}>
                {selection?.groupTitle} · {selection?.storyName}
              </div>
              {/* Carbon components rendered here receive real --vscode-* CSS vars
                  injected by VS Code into this webview document */}
              {selectedStory.render()}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div>No story selected</div>
              <div style={{ fontSize: '11px' }}>
                Choose a component from the sidebar
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Made with Bob
