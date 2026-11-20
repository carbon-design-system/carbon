# storybook-stackblitz

Generates a standalone [StackBlitz](https://stackblitz.com) project for each
Storybook story, straight from the stories module, and adds an **Open in
StackBlitz** action to every story's docs canvas.

Stories are the single source: there are no hand-maintained example projects to
keep in sync.

## How it works

- `csf.mjs` (framework-agnostic): parses a CSF module and extracts one story as
  standalone code. It keeps the story and the default export's runtime keys
  (`args`, `render`, and `argTypes` only when a story sets an arg whose argType
  has a `mapping`), and drops Storybook-only keys (`parameters`, `decorators`,
  `play`, etc). It then tree-shakes the module down to the top-level
  declarations and imports those reference.
- `project.mjs` (framework-agnostic): collects a project's files. It copies the
  story-only files a story imports (rewriting their imports in turn) and holds
  the shared helpers.
- `web-components.mjs`: turns an extracted story into a Vite + lit project that
  runs against the published packages:

  - relative imports of published source become
    `@carbon/web-components/es/<path>.js`;
  - story-only files (story assets, story styles, `.storybook` templates,
    unpublished files) are copied into `src/story-files/`;
  - Storybook APIs (`storybook/actions`, `storybook/preview-api` hooks, etc)
    resolve to a small shim in `src/storybook-shim.ts`.

  `findUnregisteredTags()` checks that a stories module imports every element it
  renders. In Storybook a forgotten import still works when another story
  registered the element, but the story breaks on its own.

- `react.mjs`: turns an extracted story into a Vite + React project that runs
  against the published packages:

  - relative imports of anything `@carbon/react` exports become
    `import { Name } from '@carbon/react'`, resolved through the export map of
    `src/index.ts`;
  - everything else (story helpers, styles, `.storybook` templates, source that
    isn't exported yet) is copied into `src/story-files/`;
  - `storybook/actions` and `@storybook/addon-links/react` resolve to a small
    shim in `src/storybook-shim.jsx`.

- `vite-plugin.mjs`: appends a few lines to each stories module that attach the
  docs action to its stories. Generated projects live in a virtual module per
  stories file, fetched only when an action is clicked.
- `open-in-stackblitz.js`: browser runtime; opens the project with
  `@stackblitz/sdk`.

## Usage

The web components and React Storybooks (`packages/*/.storybook/main.ts`, and
each `.storybook-v12`, which extends it) register the plugin:

```ts
import { storybookStackBlitz } from '../../../tasks/storybook-stackblitz/vite-plugin.mjs';
import { webComponentsStackBlitz } from '../../../tasks/storybook-stackblitz/web-components.mjs';
// or: import { reactStackBlitz } from '../../../tasks/storybook-stackblitz/react.mjs';

// viteFinal
plugins: [storybookStackBlitz(webComponentsStackBlitz)];
```

## Check

```sh
node tasks/storybook-stackblitz/cli.mjs
```

Reports web components stories that render elements they don't import. The Jest
test in `__tests__/` runs it, so it's enforced in CI.
