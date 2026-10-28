# `@carbon/angular` Wrapper Generator

This directory contains the automated code generator for `@carbon/angular`.

## Purpose & Architecture

`@carbon/angular` is a single, automated entry point:

**`@carbon/angular` (Core / Root Entry Point — 100% Automated):**

- Automatically generated from `@carbon/web-components` definitions/CEM
  (`custom-elements.json`).
- Every Carbon Web Component (except the tags in `SKIPPED_TAGS`, ADR 0021) has a
  1:1 Angular standalone component with:
  - Registration by importing the component's folder barrel
    (`#carbon-ng/components/<dir>/index.js` — a vendored, `cds-ng`-prefixed copy
    of the web components, ADR 0020) so all child elements the component renders
    are registered when the wrapper is imported.
  - `@Component({ selector: 'cds-ng-*', template: '<ng-content />' })` — the
    host element IS the web component (ADR 0015, ADR 0020)
  - Typed `@Input()` properties forwarded to the host in `ngOnChanges`
  - Boolean `@Input()` properties use `booleanAttribute` (so bare
    `<cds-button disabled>` works)
  - `@Output()` event emitters for **custom events only** — native DOM events
    (`change`, `input`, `invalid`, etc.) never get an `@Output` to avoid
    double-calls (ADR 0015 §4)
  - `ControlValueAccessor` (CVA) for form-associated elements, reading/writing
    the host element
- The generator does **not** emit tests or stories. Tests are hand-written
  (`src/__tests__/` and `src/stories/<Name>/__tests__/`) and stories are
  hand-written (`src/stories/<Name>/__stories__/`).
- **Do NOT manually edit files in `src/generated/`** — they are re-created on
  every generator run.

The generator writes `cds-ng-*` selectors and `#carbon-ng/*` vendored imports
directly into `src/generated/`. `yarn build` also runs
[`tasks/build-entries`](../build-entries/index.js), which regroups the wrappers
into one secondary entry point per component folder (`@carbon/angular/button`),
copies the vendor tree, and builds `.entries/` with `ng-packagr` into `dist/`
(ADR 0020). `build-entries` does not rewrite selectors or imports.

There is no `@carbon/angular/legacy` entry point. It was removed before release
(see ADR 0020).

See
[ADR 0019](../../../../docs/decisions/0019-angular-storybook-story-authoring.md)
for how stories are authored.

## Running the Generator

```bash
# Generate all component wrappers from web components metadata
yarn generate:wrappers

# Or generate a specific component
node tasks/generate-wrappers/index.js --tag cds-button
```

## Stories

The generator does not emit stories. Stories live at
`src/stories/<Name>/__stories__/<Name>.stories.ts`, are written by hand, and
follow the WC story file at
`packages/web-components/src/components/<name>/<name>.stories.ts` one for one.
Mark a WC story that cannot be reproduced yet with a
`// TODO(parity): <StoryName>` comment. See
[ADR 0019](../../../../docs/decisions/0019-angular-storybook-story-authoring.md)
"Story authoring rules".

## Adding new automated wrappers

When a new Web Component is added to `@carbon/web-components`:

1. Run `yarn generate:wrappers` in `packages/angular/`. The generator writes the
   wrapper to `src/generated/<Name>/`.
2. Rebuild the secondary entries with `node tasks/build-entries/index.js`
   (`yarn build` and `yarn storybook` do both steps).
3. Write the stories and the parity spec by hand. See
   [`porting-web-component-tests.md`](../../docs/porting-web-component-tests.md).
4. Run `yarn test` from `packages/angular`.

## Handling WC elements missing from `custom-elements.json`

Some WC elements are registered via `defineCustomElement()` inside their
`index.ts` instead of using the `@customElement()` decorator. The CEM analyser
only sees the decorator form, so these elements never appear in
`custom-elements.json` and the generator produces no wrapper for them.

**Do not work around this with `CUSTOM_ELEMENTS_SCHEMA`.** Adding that schema to
a story's `moduleMetadata` silences Angular's template checker and allows the
raw `cds-*` tag to pass through, but it defeats Angular's type system for the
whole story module. It is never acceptable in `@carbon/angular` stories.

> **Temporary.** `SYNTHETIC_TAGS` is a workaround until the web components fix
> this upstream. An issue with the Carbon team (so the three skeleton classes
> use `@customElement()` and appear in the manifest) is decided but not yet
> filed. Remove the synthetic entries once the manifest includes them, and do
> not add new ones without an upstream issue. The generator is also expected to
> move to the standard CEM when that lands in the monorepo.

**The correct fix is `SYNTHETIC_TAGS`.** Add a hand-authored descriptor to the
`SYNTHETIC_TAGS` array at the top of `index.js`. Each entry mirrors the shape of
a real manifest tag object — `name`, `path`, `description`, and `properties`:

```js
const SYNTHETIC_TAGS = [
  {
    name: 'cds-accordion-skeleton',
    path: './src/components/accordion/accordion-skeleton.ts',
    description: 'Skeleton of accordion.',
    properties: [
      {
        name: 'alignment',
        attribute: 'alignment',
        description:
          'Specify the alignment of the accordion heading title and chevron.',
        type: 'string',
        default: '"END"',
      },
      {
        name: 'isFlush',
        attribute: 'isFlush',
        description: 'Specify whether Accordion text should be flush.',
        type: 'boolean',
        default: 'false',
      },
    ],
  },
  // ...
];
```

The `path` field drives `resolveBarrelImport`, which walks up to the nearest
`index.ts` folder — so it finds the existing `accordion/index.js` barrel that
already registers the whole family including the skeleton.

After adding a synthetic entry:

1. Run `yarn generate:wrappers --tag cds-<name>` to generate the
   `src/generated/` wrapper.
2. Run `yarn build` (or `node tasks/build-entries/index.js`) — `build-entries`
   reads `src/generated/` and rebuilds `.entries/` automatically. There is no
   manual `.entries/` editing; `.entries/` is gitignored and fully generated.
3. Also add a `// TODO(@carbon/web-components):` comment in the WC source file
   pointing to the root fix: adding `@customElement()` to the class so it
   appears in `custom-elements.json` automatically and `SYNTHETIC_TAGS` can be
   removed.

See `AccordionSkeleton`, `CheckboxSkeleton`, and `DropdownSkeleton` in
`SYNTHETIC_TAGS` as a complete worked example.
