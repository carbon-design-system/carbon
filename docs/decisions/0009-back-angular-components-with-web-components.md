# 9. Back `@carbon/angular` with `@carbon/web-components` rather than reimplementing independently

Date: 2026-09

## Status

Accepted

## Context

Carbon has two existing component implementations: `@carbon/react` and
`carbon-components-angular` (CCA). CCA was maintained independently of the React
library, which created a persistent lag in component coverage, design language
support, and platform capabilities — roughly 35 components vs. the React
library's full set, with no AI component family, no fluid form variants, no
complete UI Shell, and no automated accessibility testing.

When planning `@carbon/angular`, three architectural approaches were available:

1. **Continue CCA's model** — maintain Angular components independently, written
   entirely in Angular + SCSS, with no dependency on `@carbon/web-components`.
2. **Rewrite using `@carbon/web-components` as the backing layer** — thin
   Angular wrappers that register and render the WC elements, with Angular
   responsible only for data binding, property reflection, and event
   normalisation.
3. **Generate Angular components from a shared source** (e.g. code generation
   from the WC source, or a shared Lit base class) — avoids duplication but
   requires new tooling.

## Decision

`@carbon/angular` is implemented as thin Angular wrappers over
`@carbon/web-components`. The WC elements own all behaviour — keyboard
navigation, focus management, accessibility attributes, selection state, sort
and filter logic, open/close animation, and native form participation. The
Angular layer owns exactly three things:

1. **Data binding** — accepting `@Input()` arrays and mapping them to WC slot
   children via `*ngFor`
2. **Property reflection** — mapping camelCase `@Input()` names to kebab-case WC
   attributes
3. **Event normalisation** — listening to WC custom events and re-emitting them
   as typed `@Output()` emitters

No behaviour logic is reimplemented in Angular unless the WC explicitly does not
provide it. The three known exceptions are: `FileUploader` file-state tracking
(WC is a layout shell only), `Accordion` `closeOthers` (~10 lines intercepting a
cancellable WC event), and `Pagination` event-shape normalisation.

Option 1 was rejected because it perpetuates the maintenance lag. Every feature
added to `@carbon/react` and `@carbon/web-components` would require a separate
Angular implementation. CCA's history shows this gap compounds over time.

Option 3 was rejected because it requires new shared tooling that does not yet
exist and introduces a build-time dependency that would slow down iteration.

## Consequences

- `@carbon/angular` tracks `@carbon/react` feature-for-feature automatically:
  component coverage grows from ~35 to ~87 at launch, and every future WC
  addition is available to Angular consumers with a wrapper rather than a full
  reimplementation.
- The Angular layer is thin and predictable. Component wrappers are 50–200
  lines. The entire test strategy reduces to asserting that `@Input()` bindings
  are reflected as the correct HTML attributes on the inner `cds-ng-*` element.
- All behaviour correctness (keyboard, ARIA, animation, form participation) is
  guaranteed by the WC test suite, not the Angular test suite. The Angular suite
  asserts the Angular ↔ WC interface only.
- `@carbon/angular` takes a peer dependency on `@carbon/web-components`.
  Consumers must install both. This is an explicit, documented cost of the
  approach. Concretely, `@carbon/web-components` must be listed in
  `peerDependencies` in `package.json`, not `dependencies`. `ng-packagr` (the
  build tool used to publish Angular libraries) hard-blocks the build if a
  runtime dependency is not declared as a peer, unless it is explicitly
  whitelisted via `allowedNonPeerDependencies` in `ng-package.json`. Bundled
  utilities with no consumer-facing install requirement (e.g. `flatpickr`,
  `lodash-es` in `carbon-components-angular`) are appropriate candidates for
  that whitelist; `@carbon/web-components` is not — it is a full peer library
  that consumers are expected to have installed.
- A small number of intentional API breaks from CCA are required where the WC
  layer does not support the old model (e.g. `DataTableModel` removed,
  `notificationObj` removed, `[theme]` input removed). These are documented in
  `docs/guides/cca-to-angular.md` and automated via codemods in
  `@carbon/upgrade`.
