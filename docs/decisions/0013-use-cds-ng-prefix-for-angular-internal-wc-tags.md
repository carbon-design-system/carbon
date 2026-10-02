# 13. Use `cds-ng-*` as the internal custom element tag prefix for `@carbon/angular`

Date: 2026-09

## Status

Accepted

## Context

`@carbon/angular` wraps `@carbon/web-components` elements as Angular components.
Each Angular component class (e.g. `ButtonComponent`, selector `cds-button`)
needs to render the backing Web Component in its template. That WC must be
registered under a custom element tag name that:

1. Does not collide with the consumer-facing Angular selector (`cds-button`),
   which would cause Angular to recursively instantiate the wrapper inside its
   own template.
2. Does not collide with the WC package's own default tags (`cds-button`
   registered by the `@carbon/web-components` barrel), which would trigger a
   `NotSupportedError` or a silent first-definition-wins collision in the global
   registry.
3. Is unambiguous to anyone inspecting the DOM in DevTools — the tag name should
   communicate _which package registered it_ and _why it looks different from
   `cds-button`_.

ADR 0007 established that `defineCustomElement(clazz, { name })` is the correct
primitive for registering a WC class under a custom name. The remaining question
is: what prefix to use for `@carbon/angular`'s internal registrations.

Two candidates were evaluated:

- **`cds-wc-*`** (e.g. `cds-wc-button`) — describes _what_ is being registered
  (a web component). This was the original working assumption recorded in
  `carbon-angular-plan.md`.
- **`cds-ng-*`** (e.g. `cds-ng-button`) — describes _who_ registered it (the
  Angular package).

## Decision

Use **`cds-ng-*`** as the tag prefix for all Web Component elements registered
internally by `@carbon/angular`.

Examples: `cds-ng-button`, `cds-ng-modal`, `cds-ng-modal-header`,
`cds-ng-dropdown-item`.

The registration call in every wrapper component follows this pattern:

```ts
import CDSButton from '@carbon/web-components/es/components/button/button.js';
import { defineCustomElement } from '@carbon/web-components/es/globals/register.js';

defineCustomElement(CDSButton, { name: 'cds-ng-button' });

@Component({ selector: 'cds-button', template: `<cds-ng-button ...><ng-content /></cds-ng-button>` })
export class ButtonComponent { ... }
```

`cds-wc-*` was rejected because it describes the _technology_ (web component),
not the _registrant_. A developer inspecting `<cds-wc-button>` in DevTools has
no immediate signal that this tag was placed there by the Angular package.
`cds-ng-button` is unambiguous: it is the Angular package's private registration
of the Carbon button WC. It also future-proofs the naming convention — a
hypothetical `@carbon/vue` package would naturally use `cds-vue-*`, keeping all
framework-internal tags distinct in a mixed environment.

Both prefixes are unoccupied: neither `@carbon/web-components` nor
`carbon-components-angular` define any `cds-ng-*` or `cds-wc-*` tags. There is
no collision risk with either choice.

## Consequences

- Every `@carbon/angular` component template uses `cds-ng-*` tags internally;
  consumers never write these tags directly.
- `cds-ng-*` tags are visible in DevTools when inspecting an Angular app that
  uses `@carbon/angular`. The prefix makes it immediately clear which package
  owns the registration.
- If `@carbon/web-components` and `@carbon/angular` are used on the same page,
  there is no tag-name collision: the WC package registers `cds-button`, the
  Angular package registers `cds-ng-button`, and the consumer writes
  `<cds-button>` (the Angular selector).
- The scaffold generator (`packages/angular/tasks/generate/`) uses
  `cds-ng-KEBAB_NAME` as its template placeholder, enforcing the convention for
  all future components.
