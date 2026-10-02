# 12. Preserve `cds-*` as the consumer-facing Angular component selector prefix

Date: 2026-09

## Status

Accepted

## Context

`@carbon/angular` wraps `@carbon/web-components` elements. Both the WC elements
and the existing `carbon-components-angular` (CCA) library already use `cds-*`
as their element / selector prefix (CCA migrated from `ibm-*` to `cds-*` in
v11). The question for `@carbon/angular` was whether to keep `cds-*` for its
consumer-facing Angular component selectors or introduce a new prefix.

Three options were considered:

1. **Keep `cds-*`** — Angular component selectors match the WC tag names and the
   existing CCA selectors. A consumer's HTML template does not change when
   migrating from CCA.
2. **Use a new Angular-specific prefix** (e.g. `carbon-button`, `ng-cds-button`)
   — makes it unambiguous in a template which elements are Angular components
   vs. raw WC elements, at the cost of requiring every template to be updated on
   migration.
3. **Use no custom element selector at all** — render only the WC element
   directly, with Angular attribute directives for binding. Drops the Angular
   component wrapper entirely.

The practical complication with option 1 is the selector collision risk: the
Angular component declares selector `cds-button`, and its template renders a WC
element. If the WC element is also registered as `cds-button`, Angular would
recursively match the WC element inside the wrapper template as another
`ButtonComponent`, causing infinite instantiation.

This collision is fully resolved by ADR 0013: the WC element is registered under
the internal `cds-ng-button` tag, not `cds-button`. The Angular selector and the
WC tag are distinct, so there is no recursion and no collision.

## Decision

Consumer-facing Angular component selectors use the **`cds-*` prefix**,
identical to the existing CCA selectors and the WC element tag names.

| Component | WC tag         | CCA selector   | `@carbon/angular` selector |
| --------- | -------------- | -------------- | -------------------------- |
| Button    | `cds-button`   | `cds-button`   | `cds-button`               |
| Modal     | `cds-modal`    | `cds-modal`    | `cds-modal`                |
| Dropdown  | `cds-dropdown` | `cds-dropdown` | `cds-dropdown`             |

Options 2 and 3 were rejected:

- Option 2 would require every consumer template to be updated on migration from
  CCA — a pure mechanical cost with no architectural benefit. The selector
  prefix is the most visible surface of a component library; changing it is the
  highest-friction migration step possible.
- Option 3 loses Angular's template type-checking, `@Input()` / `@Output()`
  bindings, and Angular-specific tooling (language service, schematics). The
  Angular wrapper is necessary for CVA, change detection integration, and typed
  bindings.

## Consequences

- Consumers migrating from `carbon-components-angular` to `@carbon/angular` do
  not need to change any HTML templates. The selector is identical.
- The module import path changes (`carbon-components-angular` →
  `@carbon/angular`) and some `@Input()` API shapes change (see
  `docs/guides/cca-to-angular.md`), but the element names in templates remain
  `<cds-button>`, `<cds-modal>`, etc.
- The `cds-*` Angular selector and the `cds-*` WC tag coexist without collision
  because the WC is registered under `cds-ng-*` internally (ADR 0013). The
  Angular selector matches only Angular component instances; the WC tag
  `cds-button` is never registered in the global custom element registry by
  `@carbon/angular`.
- If a consumer uses both `@carbon/angular` and `@carbon/web-components`
  directly on the same page, their `cds-button` Angular components and the WC's
  `cds-button` registered elements coexist without conflict because the two tags
  are `cds-button` (Angular selector, not a custom element) and `cds-ng-button`
  (the registered custom element inside it).
