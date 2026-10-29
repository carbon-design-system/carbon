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

## Manifest input

The generator reads the Custom Elements Manifest that
`yarn workspace @carbon/web-components cem` writes to
`packages/web-components/custom-elements.json`:

- Every `modules[].declarations[]` entry with a `tagName` gets a wrapper, except
  the tags in `SKIPPED_TAGS`.
- Inputs are the public, writable instance fields. Static members (`is`,
  `formAssociated`), protected members and read-only fields (getters and form
  internals such as `validity`) are not settable, so they get no `@Input()`.
- Input types come from `type.text`. String-literal unions, `string`, `boolean`
  and `number` are kept as they are. A union that includes `string` becomes
  `string`. A type the manifest leaves as a name it does not resolve
  (`ButtonSize`, `TooltipAlignment`) becomes `any`.
- When an element defaults an inherited property to a value outside the union
  its parent declares, the value is added to the union (`cds-number-input`
  defaults `type` to `'number'`).
- `MANIFEST_TYPE_OVERRIDES` corrects types the manifest gets wrong. Remove an
  entry once the manifest is fixed.

The generator exits with an error when the manifest has no custom elements or
when any wrapper fails to generate, so a manifest problem fails the build
instead of publishing a package with wrappers missing.

## Handling WC elements missing from `custom-elements.json`

An element missing from the manifest gets no wrapper. Fix it in
`@carbon/web-components` so the element appears in the manifest; the generator
then picks it up on the next run.

**Do not work around this with `CUSTOM_ELEMENTS_SCHEMA`.** Adding that schema to
a story's `moduleMetadata` silences Angular's template checker and allows the
raw `cds-*` tag to pass through, but it defeats Angular's type system for the
whole story module. It is never acceptable in `@carbon/angular` stories.
