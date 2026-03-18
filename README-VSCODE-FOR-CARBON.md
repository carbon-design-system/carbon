# @carbon/vscode-preview

## Table of Contents

- [Background](#background)
- [Setup](#setup)
- [Customizing components with Bob](#customizing-components-with-bob)
- [Working with branches](#working-with-branches)

## Background

This repository enables our team to test how Carbon React components look with
different colors, font sizes, and spacing values directly in VS Code. It is a
fork of the [Carbon](https://github.com/carbon-design-system/carbon) git
repository, supercharged with new capabilities (thanks to Bob's help).

Using the commands described in this README, you will be able to display a VS
Code webview that renders Carbon components in their various states. This lets
us preview different colors, spacing values, and font sizes natively inside VS
Code.

This webview allows you to switch between different Carbon themes (including the
new "VS Code" theme) and see how the components look in different themes.

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
[`vscode.js`](../themes/src/vscode.js), which is a new theme that assigns Carbon
color tokens to VS Code CSS properties. This means Carbon components rendered in
a VS Code webview that are using the `vscode` theme automatically adapt to
whatever color theme the user has selected in VS Code.

### Spacing and layout

Carbon defines _spacing_ tokens (`$spacing-01` through `$spacing-13`) that
components reference for margins, gaps, and spacing between elements. Unlike
colors, spacing tokens remain constant across all themes.

Carbon also provides _layout_ tokens that control component heights and internal
padding. While these tokens are defined outside the theme system, they're
implemented as CSS custom properties, which means we can override them.

We apply these overrides in the webview stylesheet, scoped specifically to the
`vscode` theme. When you switch to another Carbon theme, the overrides no longer
apply, and components revert to their standard dimensions.

### Typography

Typography tokens work similarly to layout tokens -- they're CSS custom
properties that can be overridden at runtime.These typography overrides are
applied in the same stylesheet and follow the same scoping pattern. They only
take effect when using the `vscode` theme, allowing other themes to display text
at Carbon's standard sizes.

## Setup

### Step 1 — Clone the repository (one time only)

**If you don't have the repository yet:**

First, you need to get a copy of this repository on your computer. Open a
terminal and navigate to where you want to store the project (for example, your
Documents folder):

```bash
cd ~/Documents
```

Then clone the repository and switch to the `theme` branch:

```bash
git clone https://github.com/benjamin-t-santos/carbon-for-vscode.git
cd carbon-for-vscode
git checkout theme
```

**If you already have the repository:**

Make sure you have the latest changes:

```bash
git pull origin theme
```

> **Note:** If you're not sure whether you have the repository, check if there's
> a folder called `carbon-for-vscode` in your projects directory.

### Step 2 — Install dependencies (one time only)

**First, ensure you have yarn installed:**

If you don't have yarn installed, you can install it using one of these methods.
Visit [yarnpkg.com](https://yarnpkg.com/getting-started/install) for
installation instructions for your system.

To verify yarn is installed, run:

```bash
yarn --version
```

**Then, install project dependencies:**

Open a terminal in the root of this repository and run:

```bash
yarn install
```

### Step 3 — Build the extension

```bash
yarn vscode-preview
```

This compiles everything needed to run the preview. It takes 10-30 seconds.

### Step 4 — Launch the preview

1. Open this repository folder in **VS Code**
2. Press **`F5`** — a new VS Code window opens (the "Extension Development
   Host")
3. In that new window, open the Command Palette:
   - Mac: `Cmd + Shift + P`
   - Windows/Linux: `Ctrl + Shift + P`
4. Type **`Carbon: Open Component Preview`** and press Enter

The **Carbon Component Preview** panel opens with a **theme switcher** in the
toolbar. Click any button to select and switch themes:

| Button       | What it shows                                                      |
| ------------ | ------------------------------------------------------------------ |
| **VS Code**  | Carbon components using your current VS Code color theme (default) |
| **White**    | Carbon White theme                                                 |
| **Gray 10**  | Carbon Gray 10 theme                                               |
| **Gray 90**  | Carbon Gray 90 theme                                               |
| **Gray 100** | Carbon Gray 100 theme                                              |

When **VS Code** is selected, if you switch your VS Code color theme
(`Cmd/Ctrl + K`, then `Cmd/Ctrl + T`), the components update in real time.

### Viewing CSS custom properties (tokens)

The Carbon Tokens table shows all CSS custom properties (design tokens) used in
rendering the component.

## Customizing components with Bob

### Changing colors

**Example prompts:**

- "Make the primary button background use the VS Code accent color"
- "Change the text input border to match VS Code's input border color"
- "Update the checkbox colors to use VS Code's checkbox theme colors"

Bob will edit [`packages/themes/src/vscode.js`](../themes/src/vscode.js) to map
Carbon color tokens to the appropriate VS Code CSS properties.

VS Code exposes hundreds of color properties. A full reference is available at:
<https://code.visualstudio.com/api/references/theme-color> if you would like Bob
to use a specific CSS property.

### Adjusting sizes and spacing

**Example prompts:**

- "Make buttons 2px taller"
- "Reduce the horizontal padding inside text inputs"
- "Increase the height of dropdown menus to 32px"

Bob will edit
[`packages/vscode-preview/src/webview/styles.scss`](src/webview/styles.scss) to
override the layout tokens (like `--cds-layout-size-height-sm` or
`--cds-layout-density-padding-inline-normal`).

You can also use the Token Inspector to find specific layout token to override.

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

---

### Rebuilding after changes

After Bob makes changes to the code, you need to rebuild and reload the
extension to see the results:

### Option 1: Quick rebuild (for most changes)

```bash
yarn vscode-preview
```

Then reload the Extension Development Host window:

- Mac: `Cmd + R`
- Windows/Linux: `Ctrl + R`

### Option 2: Full rebuild (for theme changes)

If Bob edited [`packages/themes/src/vscode.js`](../themes/src/vscode.js), use
the full rebuild:

```bash
yarn vscode-preview:full
```

Then reload the Extension Development Host window (`Cmd/Ctrl + R`).

### Option 3: Restart from scratch

If reloading doesn't work, close the Extension Development Host window and press
`F5` again in your main VS Code window to launch a fresh instance.

> **Tip:** Bob can run these commands for you! Just ask: "Rebuild the extension"
> or "Run yarn vscode-preview"

## Working with branches

If you're experimenting with component styling and want to keep your work
organized, you should create a new branch based on the `theme` branch. This
keeps your experiments separate and makes it easy to share your work or discard
changes if needed.

### Creating a new branch for your work

**Step 1: Make sure you're starting from the theme branch**

Open the VS Code terminal (`` Ctrl + ` `` or `Cmd + ` ` on Mac) and run:

```bash
git checkout theme
git pull origin theme
```

This ensures you have the latest version of the `theme` branch.

**Step 2: Create your new branch**

Create a new branch with a descriptive name. For example, if you're styling
buttons:

```bash
git checkout -b theme/button-styling
```

Or if you're working on input fields:

```bash
git checkout -b theme/input-styling
```

### Making and saving your changes

**Step 1: Make your changes**

Work with Bob to customize components as described in the "Customizing
components with Bob" section above. Bob will help you edit the necessary files.

**Step 2: Check what files changed**

After making changes, see what files were modified:

```bash
git status
```

This shows a list of files that have been changed.

**Step 3: Save your changes**

Add all your changes:

```bash
git add .
```

Then commit them with a descriptive message:

```bash
git commit -m "Update button colors to match VS Code theme"
```

**Step 4: Push your branch to GitHub**

The first time you push your new branch:

```bash
git push -u origin theme/button-styling
```

After that, you can simply use:

```bash
git push
```

### Switching between branches

To switch back to the main `theme` branch:

```bash
git checkout theme
```

To switch to your feature branch:

```bash
git checkout theme/button-styling
```

To see all your branches:

```bash
git branch
```

### Getting help from Bob

You can ask Bob to help with git commands! For example:

- "Create a new branch called theme/dropdown-styling based on the theme branch"
- "Commit my changes with the message 'Update dropdown colors'"
- "Push my branch to GitHub"
- "Switch to the theme branch"

---
