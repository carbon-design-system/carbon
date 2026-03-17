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

## Customizing components with Bob

The Token Inspector panel shows all `--cds-*` tokens used by a component. You
can ask Bob to help you customize colors, sizes, and fonts for any component
you're working on.

### Changing colors

**Example prompts:**

- "Make the primary button background use the VS Code accent color"
- "Change the text input border to match VS Code's input border color"
- "Update the checkbox colors to use VS Code's checkbox theme colors"

Bob will edit [`packages/themes/src/vscode.js`](../themes/src/vscode.js) to map
Carbon color tokens to the appropriate VS Code CSS properties.

### Adjusting sizes and spacing

**Example prompts:**

- "Make buttons 2px taller"
- "Reduce the horizontal padding inside text inputs"
- "Increase the height of dropdown menus to 32px"

Bob will edit
[`packages/vscode-preview/src/webview/styles.scss`](src/webview/styles.scss) to
override the layout tokens (like `--cds-layout-size-height-sm` or
`--cds-layout-density-padding-inline-normal`).

### Changing fonts and text sizes

**Example prompts:**

- "Make body text 1px smaller"
- "Increase the font size of form labels"
- "Make headings slightly larger"

Bob will edit
[`packages/vscode-preview/src/webview/styles.scss`](src/webview/styles.scss) to
override typography tokens (like `--cds-body-01-font-size` or
`--cds-heading-03-font-size`).

### Adding new components to preview

**Example prompts:**

- "Add a DataTable component to the preview so I can test it"
- "Show me a Modal component with different button configurations"
- "Add a form with TextInput, Dropdown, and Checkbox components"

Bob will edit the preview files to add the component you want to experiment
with.

### Using the Token Inspector

The Token Inspector panel (click the 🔍 icon in the toolbar) shows all tokens
affecting a component. Use it to:

1. Click on any component in the preview
2. See which `--cds-*` tokens control its appearance
3. Copy the token name to use in your prompt to Bob

**Example workflow:**

1. Click a button in the preview
2. Token Inspector shows `--cds-layout-size-height-lg: 2.25rem`
3. Ask Bob: "Change `--cds-layout-size-height-lg` to 2.5rem"
