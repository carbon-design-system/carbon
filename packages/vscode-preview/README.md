# @carbon/vscode-preview

A VS Code extension that renders Carbon Design System components inside a VS
Code webview panel, so designers can preview how Carbon components look when
styled with any VS Code color theme — in real time.

---

## ⚡ Quickstart

### Step 1 — Install dependencies (one time only)

Open a terminal in the root of this repository and run:

```bash
yarn install
```

### Step 2 — Build the extension

```bash
yarn vscode-preview
```

This compiles everything needed to run the preview. It takes 10-30 seconds.

### Step 3 — Launch the preview

1. Open this repository folder in **VS Code**
2. Press **`F5`** — a new VS Code window opens (the "Extension Development
   Host")
3. In that new window, open the Command Palette:
   - Mac: `Cmd + Shift + P`
   - Windows/Linux: `Ctrl + Shift + P`
4. Type **`Carbon: Open Component Preview`** and press Enter

The **Carbon Component Preview** panel opens with a **theme switcher** in the
toolbar. Click any button to instantly switch:

| Button       | What it shows                                                      |
| ------------ | ------------------------------------------------------------------ |
| **VS Code**  | Carbon components using your current VS Code color theme (default) |
| **White**    | Carbon White theme (light)                                         |
| **Gray 10**  | Carbon Gray 10 theme (light)                                       |
| **Gray 90**  | Carbon Gray 90 theme (dark)                                        |
| **Gray 100** | Carbon Gray 100 theme (darkest)                                    |

When **VS Code** is selected, also try switching your VS Code color theme
(`Cmd/Ctrl + K`, then `Cmd/Ctrl + T`) — the components update in real time.

---

## Changing how Carbon tokens map to VS Code colors

All the color mappings live in one file:
[`packages/themes/src/vscode.js`](../themes/src/vscode.js)

Each line maps a Carbon design token to a VS Code CSS property:

```js
// packages/themes/src/vscode.js

export const buttonPrimary = 'var(--vscode-button-background, #0e639c)';
//                                 ^^^^^^^^^^^^^^^^^^^^^^^^^^  ^^^^^^^^^
//                                 VS Code color property      fallback color
```

To change a mapping, edit that file, then rebuild and relaunch:

```bash
# After editing vscode.js — rebuilds themes + extension in one command:
yarn vscode-preview:full
```

Then press `F5` again (or reload the Extension Development Host window with
`Cmd/Ctrl + R`) to see your changes.

### Finding VS Code color property names

VS Code exposes hundreds of color properties. A full reference is available at:
<https://code.visualstudio.com/api/references/theme-color>

Common ones used in Carbon:

| VS Code property                      | What it controls          |
| ------------------------------------- | ------------------------- |
| `--vscode-button-background`          | Primary button fill       |
| `--vscode-button-foreground`          | Primary button text       |
| `--vscode-button-hoverBackground`     | Primary button hover fill |
| `--vscode-button-secondaryBackground` | Secondary button fill     |
| `--vscode-button-secondaryForeground` | Secondary button text     |
| `--vscode-editor-background`          | Page / panel background   |
| `--vscode-editor-foreground`          | Body text                 |
| `--vscode-input-background`           | Text input fill           |
| `--vscode-input-foreground`           | Text input text           |
| `--vscode-input-border`               | Text input border         |
| `--vscode-focusBorder`                | Focus ring color          |
| `--vscode-checkbox-background`        | Checkbox fill             |
| `--vscode-checkbox-foreground`        | Checkbox checkmark        |
| `--vscode-checkbox-border`            | Checkbox border           |
| `--vscode-dropdown-background`        | Dropdown fill             |
| `--vscode-dropdown-foreground`        | Dropdown text             |
| `--vscode-dropdown-border`            | Dropdown border           |

---

## Two types of Carbon tokens: color vs. layout

The Token Inspector panel shows all `--cds-*` tokens used by a component. They
fall into two distinct categories that are changed in different ways:

### Color tokens (`--cds-button-primary`, `--cds-field-01`, etc.)

These come from `@carbon/themes` and change with the active theme. In the VS
Code theme they map to `--vscode-*` CSS properties. **Edit
[`packages/themes/src/vscode.js`](../themes/src/vscode.js)** to change them.

### Layout / sizing tokens (`--cds-layout-size-height-*`, `--cds-layout-density-*`)

These come from `@carbon/layout` and are emitted as CSS custom properties at
`:root` by Carbon's stylesheet. They are **intentionally outside the color theme
system** — Carbon's design decision is that sizing/spacing is theme-independent.

VS Code has no equivalent `--vscode-*` property for component sizing. However,
because these are plain CSS custom properties, they can be overridden at
runtime.

**The VS Code compact overrides are already applied** in
[`packages/vscode-preview/src/webview/styles.scss`](src/webview/styles.scss)
inside the `[data-carbon-theme='vscode']` block. VS Code's native UI is
significantly more compact than Carbon's defaults:

| Token                                        | Carbon default | VS Code target  | What it controls                     |
| -------------------------------------------- | -------------- | --------------- | ------------------------------------ |
| `--cds-layout-size-height-xs`                | 1.5rem (24px)  | 1.375rem (22px) | Compact icon buttons, tags           |
| `--cds-layout-size-height-sm`                | 2rem (32px)    | 1.75rem (28px)  | Standard VS Code control height      |
| `--cds-layout-size-height-md`                | 2.5rem (40px)  | 2rem (32px)     | Medium controls                      |
| `--cds-layout-size-height-lg`                | 3rem (48px)    | 2.25rem (36px)  | Large controls (default button size) |
| `--cds-layout-size-height-xl`                | 4rem (64px)    | 2.75rem (44px)  | Extra large                          |
| `--cds-layout-size-height-2xl`               | 5rem (80px)    | 3.5rem (56px)   | 2XL (expressive / hero buttons)      |
| `--cds-layout-density-padding-inline-normal` | 1rem (16px)    | 0.75rem (12px)  | Horizontal padding inside controls   |

**To experiment with different sizes**, edit the values in
[`packages/vscode-preview/src/webview/styles.scss`](src/webview/styles.scss) and
rebuild:

```bash
yarn vscode-preview
# then press F5
```

> **Tip:** Use the Token Inspector panel to find the exact token name
> controlling a specific element. Tokens starting with
> `--cds-layout-size-height-*` control component heights. Tokens starting with
> `--cds-layout-density-*` control horizontal padding inside controls.

---

## Background

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

---

## Adding new components to the preview

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

3. Rebuild: `yarn vscode-preview`

---

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
// packages/vscode-preview/src/webview/styles.scss
[data-carbon-theme='vscode'] {
  @include styles.theme(styles.$vscode);
}
```

The webview HTML sets `data-carbon-theme="vscode"` on the `<html>` element, so
all Carbon components in the webview automatically use VS Code's colors.
