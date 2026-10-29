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
- **Generated wrappers:** read from `packages/angular/src/generated/*`
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
- Declared `@Input`s (2197 in the generated output) with `booleanAttribute`
  transforms for boolean properties. A misspelled binding is a compile error
  instead of a silent no-op.
- No `CUSTOM_ELEMENTS_SCHEMA` needed in the consumer.
- Wrappers that are the web component itself (ADR 0015) rather than an extra
  element around it.

## What the wrappers do not give today

- **Typed values.** 233 inputs are `any`. Button `kind` is `string`, not a
  union, because the manifest types it as the enum `BUTTON_KIND`. Only 31 of
  2847 manifest properties carry a string-literal union.
- **Typed events.** All 202 generated `@Output`s are `EventEmitter<any>`.
- **Slot awareness.** The manifest lists slots for 62 elements, but the
  generator does not use them, so nothing helps a consumer put the right child
  in the right slot.
- **Services and router integration.** Nothing replaces `ModalService`,
  `NotificationService` or `routerLink` handling on links and tabs.
- **Input quality.** About 400 properties collapse to `any`, and about 80
  entries are the `shadowRootOptions` object leaking in as inputs.

So the measured advantage today is forms integration plus compile-time input
name checking. "Better ergonomics" beyond that is a plan, not a result.

## Where the gap could grow

Each of these is proposed, none is built:

1. **Typed unions and event payloads.** Needs a better manifest (the standard
   CEM analyzer is unspiked) or a hand-maintained overlay.
2. **Slot-aware templates**, for example directives or structural helpers for
   named slots.
3. **Angular-native services** for modal and notification creation.
4. **Router and focus integration** for links, tabs, side nav and menus.
5. **Signal and `model()` support** for two-way bindings on non-form inputs.
6. **Zoneless-friendly event handling.** Unchecked; depends on how Lit updates
   interact with change detection.
7. **Tests, stories and docs written for Angular**, so teams need not read the
   web components documentation.

## Implications for decisions

- **Prefixed copy.** If Angular teams never load `@carbon/web-components`, the
  bundled copy is an implementation detail and `@carbon/angular` should own it.
  That is option B in ADR 0020.
- **"Full feature parity" needs a definition.** Candidates: every `cds-*`
  component has a wrapper (281 today; the six Date Picker tags in ADR 0021 are
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
