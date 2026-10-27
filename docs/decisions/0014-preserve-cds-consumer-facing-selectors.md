# 14. Preserve `cds-*` as the consumer-facing Angular component selector prefix

Date: 2026-09

## Status

Superseded by [ADR 0020](0020-angular-wholesale-cds-ng-prefix.md) (accepted
2026-10-27), which replaces `cds-*` with a wholesale `cds-ng-*` prefix for
`@carbon/angular`. A spike with the CCA Modal (2026-10-26) showed that the real
`cds-*` tag breaks a CCA modal on the same page; see ADR 0020 open question 1.
The text below is kept as the historical record.

`@carbon/angular/legacy` was removed from the repository on 2026-10-26, so the
bullet below about the two layers sharing `cds-*` selectors no longer applies.

## Context

`@carbon/angular` wraps `@carbon/web-components` elements. Both the WC elements
and the existing `carbon-components-angular` (CCA) library already use `cds-*`
as their selector prefix (CCA migrated from `ibm-*` to `cds-*` in v11). The
question for `@carbon/angular` was whether to keep `cds-*` for its
consumer-facing Angular component selectors or introduce a new prefix.

Not every CCA component is an element. Checked against the CCA source, Modal
(`cds-modal, ibm-modal`) and Dropdown (`cds-dropdown, ibm-dropdown`) are element
selectors, but **Button is an attribute directive** (`[cdsButton], [ibmButton]`,
used as `<button cdsButton>`). Where CCA uses an attribute directive there is no
element selector to preserve.

Three options were considered:

1. **Keep `cds-*`** — Angular component selectors match the WC tag names and,
   where CCA uses an element selector, the existing CCA selectors. For those
   components a consumer's HTML template does not change when migrating from
   CCA.
2. **Use a new Angular-specific prefix** (e.g. `carbon-button`, `ng-cds-button`)
   — makes it unambiguous in a template which elements are Angular components
   vs. raw WC elements, at the cost of requiring every template to be updated on
   migration.
3. **Use no custom element selector at all** — render only the WC element
   directly, with Angular attribute directives for binding. Drops the Angular
   component wrapper entirely.

The practical complication with option 1 is the selector collision risk: if the
Angular component declares selector `cds-button` and its template renders a WC
element that is also registered as `cds-button`, Angular would recursively match
the WC element inside the wrapper template as another `ButtonComponent`, causing
infinite instantiation.

ADR 0015 resolves this by making the wrapper's host element the web component
itself, so the template renders no inner `cds-button` for Angular to match.

## Decision

Consumer-facing Angular component selectors use the **`cds-*` prefix**,
identical to the WC element tag names and, where CCA uses an element selector,
to the CCA selector.

| Component | WC tag         | CCA selector              | `@carbon/angular` selector |
| --------- | -------------- | ------------------------- | -------------------------- |
| Button    | `cds-button`   | `[cdsButton]` (attribute) | `cds-button`               |
| Modal     | `cds-modal`    | `cds-modal` (element)     | `cds-modal`                |
| Dropdown  | `cds-dropdown` | `cds-dropdown` (element)  | `cds-dropdown`             |

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

- For components where CCA uses an element selector (for example Modal and
  Dropdown), consumers migrating from `carbon-components-angular` to
  `@carbon/angular` keep the same element name in their templates.
- For components where CCA uses an attribute directive, templates do change. The
  Button is the main case: `<button cdsButton>` becomes `<cds-button>`. The
  earlier claim that migration needs no template changes does not hold for the
  Button. How many other components are attribute directives in CCA has not been
  audited.
- The module import path changes (`carbon-components-angular` →
  `@carbon/angular`) and some `@Input()` API shapes change (see
  `docs/guides/cca-to-angular.md`).
- The `cds-*` Angular selector and the `cds-*` WC tag are the same element (ADR
  0015). `@carbon/angular` registers the real `cds-*` tags in the global custom
  element registry, so a page that also loads `@carbon/web-components` gets one
  definition per tag (first wins). See the risks in ADR 0015.
- Both `@carbon/angular` (automated 1:1 core) and `@carbon/angular/legacy`
  (deprecated CCA-compatible adapters) export components with the same `cds-*`
  selectors. Angular standalone components resolve selectors per component, but
  the registered custom element is global. Whether the two layers can coexist on
  one page is an open question in ADR 0015.
