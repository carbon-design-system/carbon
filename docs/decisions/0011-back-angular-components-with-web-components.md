# 11. Back `@carbon/angular` with `@carbon/web-components` rather than reimplementing independently

Date: 2026-09

## Status

Accepted

> **Update 2026-10-26.** The `@carbon/angular/legacy` entry point described
> below was abandoned and removed from the repository (see
> [ADR 0020](0020-angular-wholesale-cds-ng-prefix.md)). The reasons were that
> migration is not trivial even with adapters and that adapters would create a
> two-step migration. `@carbon/angular` is now a single automated entry point.
> Sections about `/legacy` are kept as the historical record of this decision.

## Context

Carbon has two existing component implementations: `@carbon/react` and
`carbon-components-angular` (CCA). CCA was maintained independently of the React
library, which created a persistent lag in component coverage, design language
support, and platform capabilities — roughly 35 components vs. the React
library's full set, with no AI component family, no fluid form variants, no
complete UI Shell, and no automated accessibility testing.

Carbon telemetry (monthly unique repositories per instrumented package,
Sep 2026) shows both layers have substantial adoption. Roughly 12% of
instrumented package-repository pairs use `carbon-components-angular`, which is
the population that would migrate, and roughly 27% use `@carbon/web-components`.
Repositories that use more than one Carbon package are counted once per package,
so these are shares of package-repository pairs, not of distinct repositories.
This is a point-in-time snapshot.

Web component usage has grown over time. By monthly repository scans,
`@carbon/web-components` rose from roughly 8% of instrumented package scans in
January 2025 to roughly 25% in September 2026. Part of that rise falls after a
period in spring 2026 when tracking stopped and was then repaired, so the two
figures may not be directly comparable.

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

Option 3 (full code generation across all components) was originally evaluated
and narrowed:

- **Pure 1:1 generators cannot preserve the legacy CCA API** for components that
  require specialized Angular adapters (such as `[items]` array slot
  materialization, custom CVA value mappings, or Angular-managed state machines
  like `FileUploader`).
- However, **components that never existed in `carbon-components-angular`** (the
  IBM Products / Enterprise catalog, AI components, fluid form variants, and new
  layout primitives — comprising ~65% of the total component catalog) carry
  **zero legacy compatibility burden**. Their API is naturally 1:1 with
  `@carbon/web-components`.
- Furthermore, pure Tier 1 primitives (Checkbox, Toggle, Tag, Loading, etc.) are
  already direct 1:1 attribute and event proxies to the backing Web Component.

### Automated Core & `@carbon/angular/legacy` Architecture

To achieve both **zero legacy drift for new components** and **zero friction for
migrating teams**, `@carbon/angular` structures the package with two entry
points:

1. **`@carbon/angular` (Root / Core — 100% Automated Wrappers):**

   - Generated directly from `@carbon/web-components`' Custom Elements Manifest
     (CEM / `custom-elements.json`).
   - Pure 1:1 reflection of the Web Component API across all 110+ component
     families (all 26+ IBM Products components, AI components, fluid forms, and
     core primitives).
   - Generates `defineCustomElement` registration under the default `cds-*` tag,
     `@Component` standalone declarations whose host element is the web
     component (ADR 0015), typed `@Input()` bindings, `@Output()` bindings for
     custom events, and standard `ControlValueAccessor` boilerplate for
     `formAssociated` elements.
   - Zero maintenance lag; automatically tracks new Carbon Web Component
     releases.

2. **`@carbon/angular/legacy` (Secondary Entry Point — Deprecated Migration
   Adapters):**
   - Contains specialized, hand-crafted wrappers for the subset of components
     where `carbon-components-angular` had divergent, non-1:1 API conventions
     (such as `[items]` array slot materialization in `Dropdown` / `Select`,
     `notificationObj` in `Notification`, or Angular-managed state in
     `FileUploader`).
   - Every component in `/legacy` shares the same consumer-facing `cds-*`
     selector. Whether the legacy and core layers can coexist on one page is an
     open question in ADR 0015.
   - All legacy wrappers are marked `@deprecated` with migration JSDoc pointing
     to the corresponding `@carbon/angular` core equivalent.
   - Teams migrating from CCA can update their package imports to
     `@carbon/angular/legacy` without template rewrites, and incrementally
     modernize individual components to `@carbon/angular` over time.

## Consequences

- `@carbon/angular` tracks `@carbon/react` and `@carbon/web-components`
  feature-for-feature automatically: component coverage grows from ~35 in CCA to
  110+ component families (297+ backing custom elements).
- Greenfield consumers use pure, automated 1:1 wrappers from `@carbon/angular`
  with zero legacy baggage.
- Migrating consumers use `@carbon/angular/legacy` for low-friction drop-in
  compatibility, modernizing to `@carbon/angular` at their own pace.
- Time to implement the package is reduced from ~5–6.5 months to ~2.5–3 months,
  as ~70+ wrapper families are generated automatically from CEM metadata.
- The Angular layer is thin and predictable. Component wrappers are 50–200
  lines. The entire test strategy reduces to asserting that `@Input()` bindings
  reach the web component on the wrapper's host element.
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
- Migration effort is reduced, not eliminated. Template selectors and most
  `@Input()` / `@Output()` shapes carry over, but consumers still change import
  paths (ADR 0012), adjust the documented API breaks above, and install
  `@carbon/web-components` as a peer. Documentation should describe the lift as
  "reduced" rather than "none".
- The core wrappers are generated, so they track `@carbon/web-components`
  through the generator. The hand-written `@carbon/angular/legacy` adapters do
  not, and rely on review discipline and the Angular ↔ WC interface tests. (An
  earlier version of this ADR said all wrappers were hand-written, which
  contradicted the decision above.)
- Changed by ADR 0020 (accepted 2026-10-27): the peer-dependency consequence
  above no longer holds. `@carbon/angular` bundles a `cds-ng-*` prefixed copy of
  the web components, so `@carbon/web-components` is not a peer dependency.
  **Done 2026-10-28:** removed from `peerDependencies` in
  `packages/angular/package.json` and `yarn.lock`, and from the README install
  instructions. It remains a `devDependency` for the build, generator and tests.
  The legacy entry point was removed; see
  `packages/angular/docs/status-and-open-questions.md`.
