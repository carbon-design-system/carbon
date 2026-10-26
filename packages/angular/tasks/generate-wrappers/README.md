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
- `import { <Name>Component } from '@carbon/angular'`
- A runnable `Default` story
- `// TODO(parity): <StoryName>` comments for every WC story that still needs an
  Angular equivalent

Maintainers complete the `// TODO` entries following the WC story file at
`packages/web-components/src/components/<name>/<name>.stories.ts` as a
reference. Re-running the generator never overwrites a story a maintainer has
already filled in.

## Adding New Automated Wrappers

When a new Web Component is added to `@carbon/web-components`:

1. Run `yarn generate:wrappers` in `packages/angular/`.
2. The generator produces the wrapper, Layer 1 tests, and a story stub in
   `src/generated/<Name>/` and `src/stories/<Name>/`.
3. Complete the story's `// TODO(parity):` entries, following the WC story as a
   reference.
4. Run `yarn test` to verify that all reflection assertions pass.
