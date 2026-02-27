/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { componentRegistry } from './components';

// Inline styles use VS Code CSS custom properties directly.
// These are injected by VS Code into the webview document automatically —
// no simulation needed. Carbon component tokens (via the vscode theme) also
// resolve to these same properties.
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
    padding: '8px 16px',
    borderBottom: '1px solid var(--vscode-panel-border, #2b2b2b)',
    background: 'var(--vscode-editor-background, #1e1e1e)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--vscode-foreground, #cccccc)',
    userSelect: 'none' as const,
  } as React.CSSProperties,

  toolbarBreadcrumb: {
    opacity: 0.7,
  } as React.CSSProperties,

  toolbarSeparator: {
    opacity: 0.4,
  } as React.CSSProperties,

  toolbarCurrent: {
    fontWeight: 600,
  } as React.CSSProperties,

  preview: {
    flex: 1,
    overflow: 'auto',
    padding: '32px',
    background: 'var(--vscode-editor-background, #1e1e1e)',
  } as React.CSSProperties,

  previewCard: {
    background: 'var(--vscode-editor-background, #1e1e1e)',
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
    color: 'var(--vscode-foreground, #cccccc)',
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
    // Default to the first story of the first group
    const first = componentRegistry[0];
    if (first && first.stories[0]) {
      return { groupTitle: first.title, storyName: first.stories[0].name };
    }
    return null;
  });

  const selectedGroup = selection
    ? componentRegistry.find((g) => g.title === selection.groupTitle)
    : null;

  const selectedStory =
    selectedGroup && selection
      ? selectedGroup.stories.find((s) => s.name === selection.storyName)
      : null;

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
        {/* Breadcrumb toolbar */}
        <div style={styles.toolbar}>
          {selection ? (
            <>
              <span style={styles.toolbarBreadcrumb}>
                {selection.groupTitle}
              </span>
              <span style={styles.toolbarSeparator}>/</span>
              <span style={styles.toolbarCurrent}>{selection.storyName}</span>
            </>
          ) : (
            <span>Select a component</span>
          )}
        </div>

        {/* Preview area */}
        <div style={styles.preview}>
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
