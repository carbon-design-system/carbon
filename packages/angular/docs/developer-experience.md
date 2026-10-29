# Developer experience: raw `@carbon/web-components` versus `@carbon/angular`

Maintainer intent (2026-10-26): an Angular team should never need
`@carbon/web-components`. `@carbon/angular` should be a one-for-one Angular
version of it, with full feature parity and a better developer experience for
Angular. This document records what is measured, what is inferred, and what is
still a plan. It supports
[ADR 0020](../../../docs/decisions/0020-angular-wholesale-cds-ng-prefix.md).

## Why it matters

If `@carbon/angular` is only a thin re-export of the web components, it has no
reason to exist. The case for the package rests on the gap below being real and
growing. The case is also what decides whether `@carbon/angular` should own the
prefixed copy of the web components (ADR 0020 option B).

## How this was checked, and its limits

- **Raw web components:** a throwaway Jest spec (since deleted) used Angular's
  test bed with `CUSTOM_ELEMENTS_SCHEMA` and a `<cds-…>` element in a template.
  This ran under jsdom, not in a browser, and not in a real application build.
- **Generated wrappers:** read from `packages/angular/.entries/<entry>/*`
  (gitignored output of `tasks/generate-wrappers`) and from the generator
  source. Counts come from grepping that output.
- **Not tested:** `ngDefaultControl`, editor and language-service behavior,
  `strictTemplates` in a consumer app, anything in a real browser, any
  production build.

## Raw web components in an Angular app (measured under jsdom)

| Scenario                                                | Result                                        |
| ------------------------------------------------------- | --------------------------------------------- |
| `[(ngModel)]` on `<cds-text-input>`                     | Fails with `NG01203: No value accessor`       |
| `[formControl]` on `<cds-text-input>`                   | Fails with `NG01203: No value accessor`       |
| `[kind]`, `[disabled]`, `[attr.size]` on `<cds-button>` | Work with `CUSTOM_ELEMENTS_SCHEMA`            |
| Custom event `(cds-checkbox-changed)`                   | Delivers `detail`, but `$event` is untyped    |
| Misspelled binding (`[valeu]`, `[kindd]`)               | Silently accepted by `CUSTOM_ELEMENTS_SCHEMA` |
| `ngDefaultControl` as a workaround                      | **Untested**                                  |

`CUSTOM_ELEMENTS_SCHEMA` also has to be added to every module or standalone
component that uses a tag, and it switches off template checking for all custom
elements in that scope, not only Carbon's.

## What the generated wrappers give today

Measured from the generated output and generator:

- A `ControlValueAccessor` on the 29 form-associated elements (matches the 29
  `formAssociated` entries in the manifest), so `ngModel`, `formControl` and
  `formControlName` are expected to work. This has been unit-tested with Jest;
  it has not been exercised in a browser.
- Declared `@Input`s (2186 in the generated output) with `booleanAttribute`
  transforms for boolean properties. A misspelled binding is a compile error
  instead of a silent no-op.
- **String-literal union types for enum-valued inputs.** The Custom Elements
  Manifest resolves enums to their values, so `button[kind]` is typed
  `'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | ...` instead of
  `string`. 248 inputs carry union types.
- **`ChangeDetectionStrategy.OnPush`** on every generated component. The
  input-forwarding model (`ngOnChanges` → `nativeElement[key]`) is compatible:
  Angular tracks `@Input` reference changes and marks the view dirty. Custom
  events dispatched by the web component bubble to the root and are caught by
  Angular's zone listener, so `@Output` emitters trigger consumer change
  detection correctly.
- No `CUSTOM_ELEMENTS_SCHEMA` needed in the consumer.
- Wrappers that are the web component itself (ADR 0015) rather than an extra
  element around it.

## What the wrappers do not give today

The four gaps below are ordered by their fixability. Two need the web components
to describe more in the manifest; two are architectural and belong in a later
milestone.

### 1. Typed events (`EventEmitter<any>`) — needs event types in the manifest

All 225 generated `@Output`s are `EventEmitter<any>`. The generator reads the
Custom Elements Manifest, but its event entries carry no payload types: the
`type` is `CustomEvent` or `Event` at most, never `CustomEvent<T>`. The detail
shapes exist in the web components source (e.g. `cds-accordion-item-toggled`
always dispatches `detail: { open: boolean }`, `cds-checkbox-changed` dispatches
`detail: { checked: boolean, indeterminate: boolean }`) but they are inline
object literals, not exported named types.

Once the web components declare event detail types so the manifest records them,
typed payloads are a direct generator change: read the event `type` and emit
`EventEmitter<{ open: boolean }>` instead of `EventEmitter<any>`. It is the
single largest remaining ergonomic gap: every consumer who binds an `@Output`
today gets `$event: any` and no IDE assistance.

As an interim measure, a hand-maintained overlay (similar to the existing
`MANIFEST_TYPE_OVERRIDES` in the generator) could cover the highest-traffic
events (checkbox changed, dropdown selected, accordion toggled, modal
closed/being-closed, pagination changed).

### 2. Input quality (145 remaining `any` inputs) — partly needs manifest fixes

Moving to the Custom Elements Manifest reduced `any` inputs from 233 to 145. Of
those that remain:

- **About 40 are type names the manifest does not resolve** — type aliases and
  classes such as `ButtonSize`, `TooltipAlignment`, `AspectRatio`,
  `BigNumberSizeValues`. These need the web components (or the manifest
  configuration) to resolve the alias to its values.
- **About 40 have no type in the manifest** at all.
- **About 70 are genuinely complex types** — object shapes (`collator`,
  `context`), Date objects (`viewDate`, `minDate`, `maxDate`), arrays
  (`currentSelections`, `radioTiles`), functions, or opaque compound-component
  state. These cannot be typed without either re-exporting the WC interfaces or
  duplicating them in the Angular package.

### 3. Slot awareness — low priority, marginal payoff

The manifest lists 116 named slots across 63 components (plus 30 unnamed default
slots). Nothing in the generated output uses this data today.

What could be built: structural directives that assign the `slot=""` attribute
automatically (e.g. `*cdsSlot="'label-text'"`), or build-time validation that
the right child type is in the right slot. In practice, the native `slot=""`
attribute already works transparently in Angular templates — the browser
enforces the slot assignment and the web component's own styles handle it.
Wrapping that in a directive adds a layer consumers must learn without removing
the need to understand the underlying slot model.

The manifest slot entries describe names and free-text descriptions but do not
declare what _type_ of child is expected, so generated type-safety is not
achievable from the manifest alone. This gap is real but the payoff is low
relative to the engineering cost. It is not a CEM-gated item; it is a deliberate
deferral.

### 4a. Router integration — Milestone 4.5, ships before v1.0

Angular's `[routerLink]` directive attaches to elements in Angular's component
tree. The web components that navigate render their `<a>` tags inside shadow DOM
where Angular cannot reach. Without a fix, nav clicks in a Carbon SPA cause full
page reloads and the active nav item never gets highlighted.

**Decided:** this ships as `CdsRouterLinkDirective` — a set of hand-written
attribute directives, one per navigating component family (side-nav links,
header nav items, breadcrumb links, tabs, inline links). The directive resolves
the URL via the Angular `Router`, intercepts clicks, and sets the host web
component's `active` property based on `NavigationEnd` events. Full spec in
[Milestone 4.5](./milestones.md#milestone-45--router-integration-directives).

The CCA migration codemod replaces `[route]` / `[useRouter]` with
`[cdsRouterLink]` automatically.

### 4b. Services — post-v1.0, demand-gated

`ModalService` in CCA dynamically instantiates a component into a
`ViewContainerRef` at runtime, with no template involvement. This pattern
requires Angular DI, `PlaceholderService`, and a `<cds-placeholder>` element in
the app root — none of which the web components support.

**Decided for v1.0:** this is not provided. The intended pattern is declarative:
`<cds-ng-modal [open]="showModal">`. This is idiomatic modern Angular and covers
the majority of use cases. The only scenario where a service genuinely adds
value over a template binding is application-wide alert dialogs triggered from
guards or interceptors; a narrow helper for that case could be added post-v1.0
if there is demand. A GitHub issue will track requests.

The migration guide tells CCA consumers to replace `modalService.create(...)` /
`modalService.show(...)` calls with a component-owned `[open]` binding. See
Milestone 5 open question 5 in [`milestones.md`](./milestones.md).

## Summary: fixability at a glance

| Gap                                       | Fixable?                                           | Blocked on                  |
| ----------------------------------------- | -------------------------------------------------- | --------------------------- |
| Typed event payloads (202 `@Output`s)     | ✅ Priority item for CEM PR                        | CEM landing in WC           |
| ~75 inputs `any` with `@property(type:X)` | ✅ Priority item for CEM PR (or source-scrape now) | CEM (or none)               |
| ~61 inputs `any` — complex object types   | ⏳ Resolved by CEM automatically                   | CEM landing in WC           |
| Slot awareness                            | 🔵 Deliberate deferral — low payoff                | Nothing, deferred by choice |
| Router integration (`cdsRouterLink`)      | ✅ **Milestone 4.5 — ships before v1.0**           | Nothing (hand-written)      |
| `ModalService` / programmatic overlays    | 🔵 Post-v1.0 if demand confirmed                   | GitHub issue                |

## Where the gap could grow further

Each of these is proposed, none is built:

1. **Signal and `model()` support** for two-way bindings on non-form inputs.
   Angular 17.1+ `input()` and `model()` signals are available (our floor is
   19). Adopting them for generated components would require replacing
   `ngOnChanges` with `effect()` calls — a non-trivial generator rewrite, but
   the resulting API is more idiomatic for modern Angular.
2. **Zoneless-friendly event handling.** With `OnPush` and zone.js the current
   event listener approach works: custom events bubble and zone.js catches them.
   Outputs and form binding use declarative host listeners, and Angular
   schedules change detection for host listeners in a fully zoneless application
   (`provideExperimentalZonelessChangeDetection`) too. Unchecked; needs a
   zoneless test app.
3. **Tests, stories and docs written for Angular**, so teams need not read the
   web components documentation. Today only 7 of 296 components have stories and
   parity specs.

## Implications for decisions

- **Prefixed copy.** If Angular teams never load `@carbon/web-components`, the
  bundled copy is an implementation detail and `@carbon/angular` should own it.
  That is option B in ADR 0020.
- **"Full feature parity" needs a definition.** Candidates: every `cds-*`
  component has a wrapper (296 today; the seven Date Picker tags in ADR 0021 are
  deliberately skipped), every public property and event is typed, and every
  documented slot is addressable. Not yet agreed.
- **Legacy.** `@carbon/angular/legacy` was abandoned and removed on 2026-10-26.
  Because it is gone, the core wrappers' own developer experience carries the
  migration story, which raises the importance of the gaps listed above.
- **Dependency cost.** Bundling the web components makes their runtime
  dependencies (`lit`, `@lit/context`, `@floating-ui/dom`, `lodash-es`,
  `@carbon/icons`, `@carbon/styles`, `@carbon/utilities`,
  `@carbon/icon-helpers`, `@ibm/telemetry-js`, `tslib`) `@carbon/angular`'s
  concern. `ng-packagr` blocks non-peer runtime dependencies unless they are
  whitelisted.

## Open questions

1. Does `ngDefaultControl` give raw web components acceptable forms support? If
   so, the forms advantage is smaller than the table suggests.
2. What does a consumer's editor show for a wrapper versus a raw element
   (completion, hover types, errors under `strictTemplates`)?
3. Which of the items under "Where the gap could grow" belong in the first
   release, and which are later?
4. How is parity verified over time as `@carbon/web-components` adds properties
   and events? A generator check against the manifest is one option.

## Reproducing the raw-web-component probe

1. Add a Jest spec under `packages/angular/src/__tests__/` that imports a
   component's folder barrel from `@carbon/web-components/es/components/…`.
2. Declare a standalone test component with `schemas: [CUSTOM_ELEMENTS_SCHEMA]`
   and a template using the element with each binding from the table above.
3. Run `yarn jest <path>` in `packages/angular` and read the errors.
4. Delete the spec afterwards; it was a probe, not a test to keep.
