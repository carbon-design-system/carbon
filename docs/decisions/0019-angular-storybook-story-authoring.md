# 19. Angular Storybook story authoring: generated stubs for core wrappers, hand-crafted for legacy

Date: 2026-09

## Status

Accepted

> **Update 2026-10-26.** The `@carbon/angular/legacy` family described below was
> removed from the repository (see
> [ADR 0020](0020-angular-wholesale-cds-ng-prefix.md)). The decision about
> generated story stubs for core wrappers stands. The parts about hand-crafted
> legacy stories no longer apply.
>
> **Update 2026-10-30.** A firm rule has been added (see "Story authoring rules"
> below): Angular stories must **never** reference raw `cds-*` web component
> tags directly. Every element used in a story template must be imported as an
> Angular wrapper component from `@carbon/angular/<entry>`. Raw WC tags bypass
> Angular's type system, lose `[binding]` / `(event)` checking, and silently
> accept misspelled inputs — exactly the problem documented in ADR 0015 §3 and
> measured in `developer-experience.md`. `CUSTOM_ELEMENTS_SCHEMA` must not be
> added to story `moduleMetadata` as a workaround. If no Angular wrapper exists
> for an element because it is missing from `custom-elements.json`, fix the
> manifest in `@carbon/web-components` and regenerate — do not reach for
> `CUSTOM_ELEMENTS_SCHEMA`.
>
> **Update 2026-10-28.** Two parts of the decision below were never built:
>
> - **Generated story stubs (Option C).** The generator does not emit
>   `<Name>.stories.ts` stubs. Stories under `src/stories/<Name>/__stories__/`
>   are hand-written, import from `@carbon/angular/<entry>` (not
>   `@carbon/angular`), and are completed to one-for-one parity with the web
>   components stories. `// TODO(parity):` comments are written by hand to mark
>   known gaps. The "Story authoring rules" section is what applies.
> - **The `storybook:parity` CI check.** Dropped for now. Parity is maintained
>   by hand and by review. Revisit if stories drift; a check would compare story
>   export names only, not story content or behavior.
>
> The Context and Decision text below is kept as the historical record.

## Context

`@carbon/angular` has two distinct component families, each with different
authoring dynamics:

1. **`@carbon/angular` core (`.entries/<entry>/`)** — Angular wrappers generated
   automatically from `@carbon/web-components`' Custom Elements Manifest (CEM)
   by `packages/angular/tasks/generate-wrappers/`. The component class files are
   100% machine-produced and must not be hand-edited; the generator re-creates
   them on every run.

2. **`@carbon/angular/legacy` (`legacy/src/components/`)** — Specialized,
   hand-crafted CCA-compatible adapters (e.g. `[items]` array slot
   materialisation for `Dropdown`, `notificationObj` adapter for `Notification`,
   Angular-managed `FileUploader` state machine). These are authored by
   maintainers and are not generated.

The question is how Storybook story files should be created and maintained for
each family.

### Options evaluated for core wrappers

**Option A — Fully manual story authoring:** A maintainer writes every story
from scratch after running the generator. Has no risk of template staleness and
allows complete Angular-specific customisation from the start, but creates a gap
where generated components have no story until a human fills one in, and
duplicates boilerplate (title, import path, argTypes derived from `@Input()`
declarations) that is already available in the CEM.

**Option B — Fully automated story generation:** The generator emits a complete
story file mirroring every WC story export, translating Lit
`html\`\``template syntax to Angular`render: (args) => ({ template: \`...\` })`
format. This sounds appealing but is not feasible:

- WC stories use Lit tagged templates with interpolated JavaScript expressions.
  Angular story templates use binding syntax (`[kind]="kind"`, `(click)=`). The
  two syntaxes are structurally different; no mechanical translation preserves
  correctness for non-trivial stories (icon slots, compound children, `play()`
  assertions against shadow DOM, etc.).
- WC-specific story utilities (e.g. `radiusArgType`, `radiusTokenScale`,
  `radiusGroup`) have no Angular equivalent and cannot be generated into a
  working Angular story.
- Angular-only stories (CVA / `[(ngModel)]` / `ReactiveFormsModule` /
  `ControlValueAccessor` integration) have no WC source to derive from at all.
- A "fully automated" story would either be wrong or would need immediate manual
  correction, providing false confidence that stories are complete.

**Option C — Generated stub + manual completion (chosen):** The generator emits
a minimal but valid stub story file alongside each generated component. The stub
provides the scaffolding a maintainer needs without inventing story content:
title, import from `@carbon/angular`, argTypes wired from the generated
`@Input()` declarations, a single runnable `Default` story, and a
`// TODO(parity):` comment block listing every WC story export that still needs
a corresponding Angular story. Maintainers then complete each `// TODO` entry
following the WC story as a reference. Stub files are only written when no story
file already exists; re-running the generator never overwrites a story a
maintainer has already filled in.

### Decision for legacy stories

The legacy adapters in `@carbon/angular/legacy` are hand-crafted by maintainers.
Their story files are hand-crafted for the same reason: the whole point of each
legacy adapter is a CCA-specific API surface (`[items]`, `notificationObj`,
`PaginationModel`, etc.) that has no equivalent in the WC or CEM. Attempting to
generate legacy stories from the CEM would produce the wrong API shape.
Hand-authoring legacy stories also keeps them co-located and in sync with their
adapter component, exactly as in `carbon-components-angular` itself.

## Decision

**Core wrappers (`@carbon/angular`):** The `generate-wrappers` task is extended
to emit a stub story file (`<Name>.stories.ts`) alongside each generated
component class **if and only if no story file already exists** at that path.
The stub contains:

- `title: 'Components/<Name>'`
- `import { <Name>Component } from '@carbon/angular'` — making the correct
  import path explicit from day one
- `argTypes` wired from the generated `@Input()` declarations (matching the
  component class the generator just produced)
- A runnable `Default` story with a minimal template
- A `// TODO(parity): <StoryName>` comment for every named WC story export that
  does not yet have a matching Angular story — derived by reading
  `packages/web-components/src/components/<name>/<name>.stories.ts` at
  generation time when that file exists

Maintainers complete `// TODO` entries one at a time, following the WC story as
a reference for args, template shape, and `play()` assertions. The stub is a
scaffold, not a finished product.

**Legacy adapters (`@carbon/angular/legacy`):** Story files are fully
hand-crafted by the maintainer who authors the adapter component. No generation
occurs. The story must:

- Import from `@carbon/angular/legacy` explicitly (not `@carbon/angular`)
- Show the CCA-compatible API shape (`[items]`, `labelText`, etc.) so that
  migrating teams see the familiar pattern
- Include a prominent deprecation notice pointing to the `@carbon/angular`
  equivalent, along with a code block contrasting the two import paths:

  ```ts
  // Legacy — matches carbon-components-angular API
  import { DropdownComponent } from '@carbon/angular/legacy';

  // Modern — use for new development
  import { DropdownComponent } from '@carbon/angular';
  ```

- Cover the same variation breadth as the corresponding WC and core wrapper
  stories (all `kind`, `size`, state variants, etc.), using `// TODO(parity):`
  where a variation cannot yet be expressed by the legacy API

## Story authoring rules

The following rules apply to every story file under
`packages/angular/src/stories/`. They are enforced by code review and must be
communicated to any agent or developer working on stories.

### 1. Never use raw `cds-*` web component tags in story templates

All elements in a story template must be Angular wrapper components imported
from `@carbon/angular/<entry>`. Using raw WC tags directly bypasses Angular's
template type-checker and makes the story functionally different from what a
consumer would write.

**Wrong:**

```ts
// DO NOT DO THIS — raw WC tag, bypasses Angular
template: `<cds-accordion-skeleton></cds-accordion-skeleton>`;
```

**Wrong:**

```ts
// DO NOT DO THIS — CUSTOM_ELEMENTS_SCHEMA silences the error but does not fix it
moduleMetadata({ schemas: [CUSTOM_ELEMENTS_SCHEMA] });
```

**Correct:**

```ts
// Import the wrapper, use the cds-ng-* selector
import { AccordionSkeletonComponent } from '@carbon/angular/accordion';
// ...
moduleMetadata({ imports: [AccordionSkeletonComponent] });
// ...
template: `<cds-ng-accordion-skeleton></cds-ng-accordion-skeleton>`;
```

### 2. If a wrapper does not exist, fix the generator — do not use CUSTOM_ELEMENTS_SCHEMA

If an element you need in a story has no Angular wrapper because it is missing
from `custom-elements.json`, fix it in `@carbon/web-components` so the element
appears in the manifest, then regenerate. The generator wraps every `cds-*`
element in the manifest except the ones ADR 0021 skips.

### 3. WC-parity story ordering

Stories are ordered to match the `@carbon/web-components` story file
one-for-one. Angular-only stories (CVA, `ngModel`, `ReactiveFormsModule`) come
after all WC parity stories and carry `tags: ['!dev', '!autodocs']`.

### 4. Entry imports, not generated imports

Stories import from `@carbon/angular/<entry>` (e.g.
`@carbon/angular/accordion`), never by relative path. The entry resolves via
`tsconfig.storybook.json` path aliases to `.entries/<entry>/index.ts`, which
uses `cds-ng-*` selectors and the vendored WC copy — exactly what consumers get.

## Consequences

- Generated core wrapper components are immediately browsable in Storybook
  without manual intervention; the `Default` story is runnable from day one.
- Maintainers have a clear, low-friction workflow for closing parity gaps: each
  `// TODO` is one self-contained unit of work.
- Re-running the generator on an already-completed story file is safe — it will
  not overwrite manually authored content.
- Legacy story files require more upfront effort per component than the stub
  approach, but this is appropriate: the legacy adapter itself requires the same
  upfront effort, and the story is authored in the same PR as the adapter.
- There is no risk of generated stories presenting the wrong API shape for
  legacy components — a generated `Dropdown` story from CEM would show slot
  projection, not `[items]`, which would actively mislead CCA-migrating teams.
- The decision to not fully automate story generation is captured here to
  prevent re-evaluation of Option B in the future without the context of why it
  was rejected.

## Tests

**Update 2026-10-29.** Components do not get Angular test files. The
`@carbon/web-components` test suites are the source of truth for component
behavior: `yarn test:wc` runs them, rewritten for the `cds-ng` prefix, against
the vendored copy that `@carbon/angular` ships. Angular tests cover only what is
Angular's:

- `src/__tests__/wrappers.spec.ts` mounts every generated wrapper.
- `src/__tests__/generated-wrappers.spec.ts` covers input forwarding, outputs
  and forms.
- `src/__tests__/stories.e2e.ts` renders every story in Chromium and runs its
  `play()` function, so Angular-specific checks for a component belong in its
  stories.

The per-component parity specs, binding specs and Playwright files, and the
`check-parity.js` CI check, were removed. Nothing in CI enforces story parity
(rule 3); it is checked in review.
