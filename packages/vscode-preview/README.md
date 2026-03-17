# @carbon/vscode-preview

## Background

This repository enables our team to test how Carbon React components look with
different colors, font sizes, and spacing values directly in VS Code. It is a
fork of the [Carbon](https://github.com/carbon-design-system/carbon) git
repository, supercharged with new capabilities (thanks to Bob's help).

Using the commands described in this README, you will be able to display a VS
Code webview that renders Carbon components in their various states. The idea is
that we will be able to preview different colors, spacing values, and font sizes
natively inside VS Code.

This webview will allow you to switch between different Carbon themes (including
the new "VS Code" theme) and see how the components look in different themes.

Below, I go over how this repository customizes color, spacing, and typography
of Carbon components in more detail.

### Colors

To test new colors, we created a new Carbon theme. Carbon themes define a set of
SCSS variables, known as tokens, that specify colors and styles for React
components. Change a token, and you change the appearance of many UI components
simultaneously.

In VS Code, webviews automatically receive CSS custom properties like
`--vscode-button-background` or `--vscode-editor-foreground`. The value of these
properties update automatically when changing themes (Light, Dark, Red, etc.),
so these properties would be useful to use a token values in a Carbon theme. The
tricky part is figuring out what CSS properties from VS Code we should use, and
creating a mapping from Carbon tokens to those properties. That is where Bob
comes in.

Rather than import an existing theme and override all of it's tokens, I asked
Bob to create a completely new Carbon theme for VS Code. He created
[`vscode.js`](../themes/src/vscode.js), which assigns Carbon color tokens to VS
Code CSS properties. This means Carbon components rendered in a VS Code webview
that are using the `vscode` theme automatically adapt to whatever color theme
the user has selected in VS Code.

### Spacing and layout

Carbon defines _spacing_ tokens (`$spacing-01` through `$spacing-13`) that
components reference for margins, gaps, and spacing between elements. Unlike
colors, spacing tokens remain constant across all themes.

Carbon also provides _layout_ tokens that control component heights and internal
padding. While these tokens are defined outside the theme system, they're
implemented as CSS custom properties, which means we can override them at
runtime without recompiling. This is essential for adapting Carbon components to
VS Code's interface, which uses significantly more compact dimensions than
Carbon's defaults (for example, VS Code's standard control height is 28px versus
Carbon's 32px).

We apply these overrides in the webview stylesheet, scoped specifically to the
`vscode` theme. When you switch to another Carbon theme, the overrides no longer
apply, and components revert to their standard dimensions.

### Typography

Typography tokens work similarly to layout tokens—they're CSS custom properties
that can be overridden at runtime. VS Code's interface uses tighter typography
than Carbon's defaults to maintain its compact aesthetic. We've adjusted font
sizes and line heights to match: body text uses 13px instead of 14px, labels use
11px instead of 12px, and headings are proportionally reduced.

These typography overrides are applied in the same stylesheet and follow the
same scoping pattern. They only take effect when using the `vscode` theme,
allowing other themes to display text at Carbon's standard sizes.

---

## Setup

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

To change a mapping, you can find a VS Code color property name in the
[VS Code reference](https://code.visualstudio.com/api/references/theme-color)
and manually replace it. Or ask Bob -- if you say something like "I want to
change the button background color in our VS Code theme to match VS Code button
color", Bob can find the VS Code property name for you and update the theme
accordingly.

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

## Three types of Carbon tokens: color, layout, and typography

The Token Inspector panel shows all `--cds-*` tokens used by a component. They
fall into three distinct categories that are changed in different ways:

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

**The VS Code compact layout overrides are already applied** in
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

### Typography tokens (`--cds-body-01-font-size`, `--cds-heading-03-font-size`, etc.)

These come from `@carbon/type` and are also emitted as CSS custom properties.
Like layout tokens, they are outside the color theme system but can be
overridden at runtime.

VS Code has no equivalent `--vscode-*` property for typography. However, VS Code
uses significantly smaller, tighter typography than Carbon's defaults to match
the compact feel of the editor.

**The VS Code typography overrides are already applied** in
[`packages/vscode-preview/src/webview/styles.scss`](src/webview/styles.scss)
inside the `[data-carbon-theme='vscode']` block:

| Token category | Carbon default | VS Code target | What it controls           |
| -------------- | -------------- | -------------- | -------------------------- |
| Body text      | 14px           | 13px           | Primary content text       |
| Labels         | 12px           | 11px           | Form labels, tags, badges  |
| Helper text    | 12px           | 11px           | Form hints, descriptions   |
| Code           | 12px           | 13px           | Inline code, code snippets |
| Heading 01-02  | 14-16px        | 14-16px        | Small section headers      |
| Heading 03     | 20px           | 18px           | Medium section headers     |
| Heading 04     | 28px           | 24px           | Large section headers      |
| Heading 05-07  | 32-54px        | 28-48px        | Display / hero headings    |

**To experiment with different typography**, edit the values in
[`packages/vscode-preview/src/webview/styles.scss`](src/webview/styles.scss) and
rebuild:

```bash
yarn vscode-preview
# then press F5
```

> **Tip:** Use the Token Inspector panel to find the exact token name
> controlling a specific element. Tokens starting with `--cds-body-*` control
> body text, `--cds-heading-*` control headings, `--cds-label-*` control labels,
> and `--cds-code-*` control code text. Each token has separate properties for
> `font-size`, `line-height`, `font-weight`, and `letter-spacing`.

---

## Using Developer Tools to Inspect Components

VS Code's webview panels support Chrome DevTools, making it easy to inspect
components and find the exact CSS custom properties they use.

### Opening Developer Tools

1. **Launch the preview** (press `F5` and run `Carbon: Open Component Preview`)
2. **Open DevTools** in the Extension Development Host window:
   - Mac: `Cmd + Option + I`
   - Windows/Linux: `Ctrl + Shift + I`
   - Or: `Help` → `Toggle Developer Tools`

### Finding CSS Custom Properties

Once DevTools is open:

1. **Click the element picker** (top-left icon in DevTools, or press
   `Cmd/Ctrl + Shift + C`)
2. **Hover over a component** in the preview — it highlights in the DOM tree
3. **Click the component** to select it
4. **View the Styles panel** (right side of DevTools)

The Styles panel shows all CSS applied to the element, including:

- **Color tokens**: `--cds-button-primary`, `--cds-text-primary`, etc.
- **Layout tokens**: `--cds-layout-size-height-sm`,
  `--cds-layout-density-padding-inline-normal`, etc.
- **Typography tokens**: `--cds-body-01-font-size`,
  `--cds-heading-03-line-height`, etc.

### Example: Inspecting a Button

1. Click the element picker in DevTools
2. Click any button in the preview
3. In the Styles panel, look for properties like:

```css
.cds--btn--primary {
  background-color: var(--cds-button-primary);
  color: var(--cds-text-on-color);
  height: var(--cds-layout-size-height-lg);
  padding-inline: var(--cds-layout-density-padding-inline-normal);
  font-size: var(--cds-body-compact-01-font-size);
}
```

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
