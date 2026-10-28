# `@carbon/angular` Wrapper Generator

This directory contains the automated code generator for `@carbon/angular`.

## Purpose & Architecture

`@carbon/angular` is a single, automated entry point:

**`@carbon/angular` (Core / Root Entry Point — 100% Automated):**

- Automatically generated from `@carbon/web-components` definitions/CEM
  (`custom-elements.json`).
- Every Carbon Web Component has a 1:1 Angular standalone component with:
  - Registration under the **real `cds-*` tag** (no `cds-ng-*` renaming — ADR
    0015), by importing the component's folder barrel
    (`@carbon/web-components/es/components/<dir>/index.js`) so the child
    elements it renders are registered too
  - `@Component({ selector: 'cds-*', template: '<ng-content />' })` — the host
    element IS the web component
  - Typed `@Input()` properties forwarded to the host in `ngOnChanges`
  - Boolean `@Input()` properties use `booleanAttribute` (so bare
    `<cds-button disabled>` works)
  - `@Output()` event emitters for **custom events only** — native DOM events
    (`change`, `input`, `invalid`, etc.) never get an `@Output` to avoid
    double-calls (ADR 0015 §4)
  - `ControlValueAccessor` (CVA) for form-associated elements, reading/writing
    the host element
  - Automated Layer 1 Jest unit reflection tests (`<Name>.spec.ts`)
  - A stub Storybook story (`<Name>.stories.ts`) if none already exists
- **Do NOT manually edit files in `src/generated/`** — they are re-created on
  every generator run.

The generator output in `src/generated/` is the source for the published
package, but it is not what ships. `yarn build` also runs
[`tasks/build-entries`](../build-entries/index.js), which regroups the wrappers
into one secondary entry point per component folder (`@carbon/angular/button`),
rewrites them to `cds-ng-*` over a vendored, prefixed copy of the web
components, and builds `.entries/` with `ng-packagr` into `dist/` (ADR 0020).

There is no `@carbon/angular/legacy` entry point. It was removed before release
(see ADR 0020).

See
[ADR 0019](../../../../docs/decisions/0019-angular-storybook-story-authoring.md)
for the full rationale behind this split.

## Running the Generator

```bash
# Generate all component wrappers from web components metadata
yarn generate:wrappers

# Or generate a specific component
node tasks/generate-wrappers/index.js --tag cds-button
```

## Story stubs

For each generated component the generator emits a stub story file at
`src/stories/<Name>/__stories__/<Name>.stories.ts` **only if no story already
exists** at that path. The stub contains:

- `title: 'Components/<Name>'`
- `import { <Name>Component } from '@carbon/angular/<entry>'`
- A runnable `Default` story
- `// TODO(parity): <StoryName>` comments for every WC story that still needs an
  Angular equivalent

Maintainers complete the `// TODO` entries following the WC story file at
`packages/web-components/src/components/<name>/<name>.stories.ts` as a
reference. Re-running the generator never overwrites a story a maintainer has
already filled in.

## Adding new automated wrappers

When a new Web Component is added to `@carbon/web-components`:

1. Run `yarn generate:wrappers` in `packages/angular/`.
2. The generator produces the wrapper, Layer 1 tests, and a story stub in
   `src/generated/<Name>/` and `src/stories/<Name>/`.
3. Complete the story's `// TODO(parity):` entries, following the WC story as a
   reference.
4. Run `yarn test` to verify that all reflection assertions pass.

## Handling WC elements missing from `custom-elements.json`

Some WC elements are registered via `defineCustomElement()` inside their
`index.ts` instead of using the `@customElement()` decorator. The CEM analyser
only sees the decorator form, so these elements never appear in
`custom-elements.json` and the generator produces no wrapper for them.

**Do not work around this with `CUSTOM_ELEMENTS_SCHEMA`.** Adding that schema to
a story's `moduleMetadata` silences Angular's template checker and allows the
raw `cds-*` tag to pass through, but it defeats Angular's type system for the
whole story module. It is never acceptable in `@carbon/angular` stories.

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
2. Add the corresponding `.entries/<entry>/<Name>/` directory with the
   `cds-ng-*` prefixed component file (copy the pattern from an existing entry
   such as `.entries/text-input/TextInputSkeleton/`).
3. Add `export * from './<Name>';` to `.entries/<entry>/index.ts`.
4. Also add a `// TODO(@carbon/web-components):` comment in the WC source file
   pointing to the root fix: adding `@customElement()` to the class so it
   appears in `custom-elements.json` automatically and `SYNTHETIC_TAGS` can be
   removed.

See `AccordionSkeleton`, `CheckboxSkeleton`, and `DropdownSkeleton` in
`SYNTHETIC_TAGS` as a complete worked example.
