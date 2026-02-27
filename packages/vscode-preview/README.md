# @carbon/vscode-preview

A VS Code extension that renders Carbon Design System components inside a VS
Code webview panel, allowing designers and developers to preview how Carbon
components look when styled with VS Code's built-in color themes.

## Why this exists

VS Code webviews automatically receive CSS custom properties like
`--vscode-button-background`, `--vscode-editor-foreground`, etc. — injected
directly into the webview document by VS Code itself.

The Carbon `vscode` theme maps Carbon design tokens to these properties:

```scss
// In @carbon/themes/src/vscode.js
export const buttonPrimary = 'var(--vscode-button-background, #0e639c)';
```

This means Carbon components rendered in a VS Code webview **automatically
adapt** to whatever color theme the user has selected in VS Code — no
configuration needed.

This extension provides a preview panel so designers can:

1. Open the **Carbon Component Preview** panel in VS Code
2. Switch VS Code color themes (`Ctrl/Cmd + K`, `Ctrl/Cmd + T`)
3. See Carbon components update in real time to match the active theme

## Getting started

### Prerequisites

- Node.js 18+
- Yarn (this monorepo uses Yarn workspaces)
- VS Code 1.85+

### Build the extension

From the monorepo root:

```bash
# Install dependencies
yarn install

# Build the extension and webview app
cd packages/vscode-preview
yarn build
```

### Run in VS Code (development)

1. Open the monorepo in VS Code
2. Press `F5` to launch the **Extension Development Host** (a new VS Code
   window)
3. In the new window, open the Command Palette (`Ctrl/Cmd + Shift + P`)
4. Run **"Carbon: Open Component Preview"**

The Carbon Component Preview panel will open. Switch VS Code color themes to see
the components update.

### Development workflow (hot reload)

```bash
cd packages/vscode-preview
yarn dev
```

This watches both the extension source and the webview React app for changes.
After a change:

- For webview changes: reload the webview panel (right-click → "Reload Webview")
- For extension changes: reload the Extension Development Host window
  (`Ctrl/Cmd + R`)

## Project structure

```
packages/vscode-preview/
├── src/
│   ├── extension.ts          # VS Code extension entry point
│   └── webview/
│       ├── index.html        # Webview HTML shell (Vite entry)
│       ├── index.tsx         # React entry point
│       ├── App.tsx           # Main app layout (sidebar + preview)
│       ├── styles.scss       # Carbon styles with vscode theme
│       └── components/       # Component story definitions
│           ├── index.ts      # Component registry
│           ├── ButtonStories.tsx
│           ├── CheckboxStories.tsx
│           ├── DropdownStories.tsx
│           ├── TextInputStories.tsx
│           └── ToggleStories.tsx
├── package.json
├── tsconfig.json
└── vite.webview.config.ts
```

## Adding new components

To add a new component to the preview gallery:

1. Create `src/webview/components/MyComponentStories.tsx`:

```tsx
import React from 'react';
import { MyComponent } from '@carbon/react';

export const stories = [
  {
    name: 'Default',
    render: () => <MyComponent />,
  },
  {
    name: 'Variant',
    render: () => <MyComponent variant="something" />,
  },
];
```

2. Register it in `src/webview/components/index.ts`:

```ts
import { stories as myComponentStories } from './MyComponentStories';

export const componentRegistry = [
  // ... existing entries
  {
    title: 'MyComponent',
    stories: myComponentStories,
  },
];
```

## How VS Code theme injection works

When VS Code opens a webview panel, it injects CSS custom properties into the
webview's `document` element. For example:

```css
/* Injected by VS Code automatically — no code needed */
:root {
  --vscode-button-background: #0078d4;
  --vscode-button-foreground: #ffffff;
  --vscode-editor-background: #1f1f1f;
  /* ... hundreds more */
}
```

The Carbon `vscode` theme tokens reference these properties with fallbacks:

```js
// packages/themes/src/vscode.js
export const buttonPrimary = 'var(--vscode-button-background, #0e639c)';
```

The Sass theme mixin applies these as CSS custom properties scoped to
`[data-carbon-theme="vscode"]`:

```scss
// packages/react/.storybook/styles.scss (and webview/styles.scss)
[data-carbon-theme='vscode'] {
  @include styles.theme(styles.$vscode);
}
```

The webview HTML sets `data-carbon-theme="vscode"` on the `<html>` element, so
all Carbon components in the webview automatically use VS Code's colors.

## Mapping VS Code colors to Carbon tokens

The token mapping is defined in
[`packages/themes/src/vscode.js`](../themes/src/vscode.js). To change how a
Carbon token maps to a VS Code color:

```js
// Before: button uses VS Code's button color
export const buttonPrimary = 'var(--vscode-button-background, #0e639c)';

// After: button uses a different VS Code color
export const buttonPrimary = 'var(--vscode-focusBorder, #007fd4)';
```

After editing, rebuild the themes package and the webview:

```bash
cd packages/themes && yarn build
cd packages/vscode-preview && yarn build:webview
```
