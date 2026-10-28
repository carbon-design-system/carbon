# `@carbon/angular` — Planning Document

> **Update 2026-10-26: `@carbon/angular/legacy` has been abandoned and removed
> from the repository.** The reasons recorded by the maintainers: migration is
> not trivial even with adapters, and adapters create a two-step migration. The
> package is a single automated entry point. This document was written when the
> legacy entry point was part of the plan, and **many sections below still
> describe it** (the §6 methodology, the effort table, the directory tree, the
> Storybook ordering, the codemod list in §16). Treat every mention of
> `@carbon/angular/legacy`, `cca-to-legacy` and "legacy adapters" as superseded.
> Current state:
> [`status-and-open-questions.md`](./status-and-open-questions.md) and
> [`migration-support.md`](./migration-support.md). Effort estimates that
> include legacy adapters are no longer valid.

**Status:** Pre-implementation planning **Last updated:** 2026-09 (updated with
Automated Core Wrapper Generator; legacy entry point since removed, see above)
**Location in monorepo:** `packages/angular/` **Package name:**
`@carbon/angular` (Automated) **Versioning:** `0.0.0-prerelease.0` →
`1.0.0-rc.0` (v12 RC) → `1.0.0` (v12 GA) **Angular component selector prefix:**
`cds-ng-*` (selector and WC tag, ADR 0020, accepted 2026-10-27). The text below
that says `cds-*` predates ADR 0020 and is rewritten in status step 11.

---

## Architecture: single automated entry point

`@carbon/angular` is generated automatically from `@carbon/web-components`:

- Pure 1:1 Angular wrappers generated from `@carbon/web-components`' Custom
  Elements Manifest (CEM / `custom-elements.json`).
- Covers all 110+ component families (297+ custom elements) with zero manual
  adapter lag.
- Migration from `carbon-components-angular` is a single move, supported by
  documentation, codemods and agent skills. See
  [`migration-support.md`](./migration-support.md).

---

## Why migrate from `carbon-components-angular`?

`@carbon/angular` is backed by `@carbon/web-components`, which tracks
`@carbon/react` feature-for-feature. CCA was maintained independently of the
React library, which created a persistent lag in component coverage, new design
language support, and platform capabilities. With the merger of Carbon for IBM
Products into Carbon core (ADR 0009), `@carbon/angular` also inherits the
complete enterprise and product component catalog directly in the same package.
The table below shows what Angular developers gain by switching.

### Component coverage: ~35 → 110+ (297+ Custom Elements)

| Category                                | CCA     | @carbon/angular | Notes                                                                                                                                                                                                                                                      |
| --------------------------------------- | ------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Core components                         | ~35     | ~45             | Feature-extended parity on all core primitives                                                                                                                                                                                                             |
| Fluid form variants                     | —       | **12**          | Full-width condensed forms: text-input, textarea, number-input, password-input, search, select, dropdown, combo-box, multi-select, time-picker + fluid-form wrapper                                                                                        |
| AI component family                     | —       | **6**           | ai-label, ai-skeleton (text/icon/placeholder), slug (deprecated alias)                                                                                                                                                                                     |
| UI Shell                                | Partial | **19**          | Complete header + side-nav + switcher family                                                                                                                                                                                                               |
| Display, layout & primitives            | —       | **11**          | combo-button, password-input, copy-button, tree-view, pagination-nav, contained-list, stack, heading, options-tile, etc.                                                                                                                                   |
| **Enterprise & Product (IBM Products)** | —       | **26+**         | PageHeader, Tearsheet, SidePanel, Card system, Coachmark, ActionSet, Dialog, InterstitialScreen, EditInPlace, FullPageError, GuideBanner, NotificationsPanel, Resizer, TruncatedText, UserAvatar, BigNumber, BadgeIndicator, IconIndicator, ShapeIndicator |

### New capabilities on existing components

| Capability                              | CCA     | @carbon/angular  | Detail                                                                                                                    |
| --------------------------------------- | ------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| AI Label decoration                     | ✗       | ✓                | `<cds-ai-label>` slot on Button, Dropdown, DataTable rows, Tag — marks AI-generated content with a built-in revert action |
| Fluid form variants                     | ✗       | ✓                | 12 full-width condensed variants; each inherits every property from its standard counterpart                              |
| Warn state on inputs                    | ✗       | ✓                | `warn` / `warnText` distinct from `invalid` across all form components                                                    |
| Native form participation               | ✗       | ✓                | WC elements are `formAssociated`; work inside `<form>` natively; Angular layer adds CVA on top                            |
| Floating UI autoalign                   | ✗       | ✓                | Tooltip, Popover, Dropdown flip intelligently at viewport edges via `@floating-ui/dom`                                    |
| Layer / theming context                 | ✗       | ✓                | `cds-layer` propagates level-0/1/2 CSS tokens; child components automatically use the correct background and field tokens |
| Locale-aware DataTable sort             | ✗       | ✓                | `Intl.Collator` with configurable `locale` and pluggable `collator`; custom `filterRows` fn                               |
| DataTable AI label rows                 | ✗       | ✓                | `withRowAILabels` — per-row AI provenance indicator                                                                       |
| DataTable radio selection               | ✗       | ✓                | `radio` prop for single-select mode alongside existing checkbox mode                                                      |
| DataTable `xs` / `xl` sizes             | ✗       | ✓                | Two additional size variants beyond the existing sm/md/lg                                                                 |
| ComboBox typeahead                      | ✗       | ✓ (experimental) | `typeahead` prop; `allowCustomValue` for free-text entry; custom `shouldFilterItem` fn                                    |
| MultiSelect `selectAll`                 | ✗       | ✓                | Built-in select-all checkbox; `selectionFeedback` modes (top / fixed / top-after-reopen)                                  |
| Pagination i18n formatters              | ✗       | ✓                | All label text exposed as format callbacks (`formatLabelText`, `formatStatusWithDeterminateTotal`, etc.)                  |
| Pagination unknown total                | ✗       | ✓                | `pagesUnknown` mode for open-ended data sets                                                                              |
| Notification auto-dismiss               | ✗       | ✓                | `timeout` (ms) on inline and toast notifications                                                                          |
| Notification low contrast               | ✗       | ✓                | `lowContrast` mode                                                                                                        |
| Tooltip autoalign + delays              | ✗       | ✓                | `autoalign`, configurable `enterDelayMs` / `leaveDelayMs`, `keyboardOnly` activation, `closeOnActivation`                 |
| Button link mode                        | Partial | ✓                | Full `href`, `download`, `rel`, `target`, `ping`, `hreflang` support                                                      |
| Button built-in tooltip                 | ✗       | ✓                | `tooltipText`, `tooltipAlignment`, `tooltipPosition`, `openTooltip` — no wrapper element needed                           |
| Modal `alert` / `fullWidth`             | ✗       | ✓                | `alert` mode; `fullWidth`; `shouldSubmitOnEnter`                                                                          |
| Accordion `isFlush` / `alignment`       | ✗       | ✓                | Flush text mode; chevron start/end alignment; `size` cascades to children                                                 |
| Tab `secondaryLabel` / `badgeIndicator` | ✗       | ✓                | Secondary label on contained tabs; badge dot per tab (experimental)                                                       |
| DatePicker `enabledRange`               | ✗       | ✓                | Date range constraint; `allowInput`, `closeOnSelect`, `open` (programmatic), `name` (form)                                |

### Platform-level gains

| Capability                          | CCA     | @carbon/angular                                                                    |
| ----------------------------------- | ------- | ---------------------------------------------------------------------------------- |
| Standalone components (no NgModule) | ✗       | ✓ Angular 17+ throughout; import only what you use                                 |
| OnPush change detection safe        | Partial | ✓ `markForCheck()` called after every WC event; safe by design                     |
| IBM Equal Access a11y (automated)   | ✗       | ✓ Every story has a `play()` function; checker runs against live interactive state |
| Feature flags                       | ✗       | ✓ Same flag surface as `@carbon/react` and `@carbon/web-components`                |
| In-monorepo versioning              | ✗       | ✓ Ships with the Carbon v12 release cycle; no independent lag                      |

### Migration cost — intentional API breaks

Fourteen deliberate breaks from CCA (nine original + five new, identified from
CCA source inspection), each documented in §14:

| Break                                                                  | Old                                                                           | New                                                                       | Reason                                                              |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| DatePicker value type                                                  | `Date \| Date[]`                                                              | `string` (ISO8601)                                                        | Eliminates Flatpickr timezone bugs                                  |
| DatePicker `(onChange)`                                                | `EventEmitter<Date[]>`                                                        | `EventEmitter<{selectedDates: string[], value: string}>`                  | Drops Flatpickr instance leak                                       |
| Composition model                                                      | Explicit child components (`ibm-modal-header`, `ibm-date-picker-input`, etc.) | Flat `@Input()` + `ng-content`                                            | WC internalises slot structure                                      |
| NgModule imports                                                       | `ButtonModule`                                                                | `ButtonComponent` (standalone)                                            | No barrel NgModules                                                 |
| Per-component `theme` input                                            | `[theme]="'white'"` on 12+ components                                         | Global CSS custom properties                                              | Theming is a CSS concern                                            |
| `[flatpickr]` / `[plugins]` input                                      | Raw Flatpickr config                                                          | Dropped; individual props instead                                         | Unmaintainable coupling                                             |
| Pagination event shape                                                 | `{page: {number, length}}`                                                    | `{page: number, pageSize: number}`                                        | Matches WC event; simpler                                           |
| Pagination model input                                                 | `[model]: PaginationModel`                                                    | Flat `[totalItems]`, `[page]`, `[pageSize]`, `[itemsPerPageOptions]`      | `PaginationModel` conflates page state and data; WC uses flat props |
| Tabs / Accordion items API                                             | `[tabs]="[{label, content}]"` array                                           | Projected child components                                                | Array API blocks rich template content                              |
| `DataTableModel` / `TableHeaderItem` / `TableItem` classes             | Mutable classes; `TableItem.template` per cell                                | Plain `DataTableRow[]` interfaces; `cellTemplate: TemplateRef` per column | Classes caused CD conflicts with WC sort/select                     |
| UI Shell navigation arrays                                             | `[navigationItems]`, `[menuItems]`, `[headerItems]` arrays                    | Projected `<cds-header-item>`, `<cds-sidenav-item>` children              | Arrays prevent `routerLink`/`routerLinkActive` in slot content      |
| `notificationObj` model input                                          | `notificationObj: NotificationContent / ActionableContent / ToastContent`     | Flat `@Input()`s per WC prop                                              | Object input is an unnecessary indirection over flat WC props       |
| `appendInline` / `dropUp` / `scrollableContainer` on Dropdown/ComboBox | Manual positioning hacks                                                      | Dropped                                                                   | Floating UI autoalign in the WC supersedes all of these             |
| `[isDataGrid]` on DataTable                                            | `DataGridInteractionModel` keyboard mode                                      | Deferred to v2                                                            | Complex keyboard interaction model; WC handles keyboard natively    |

---

## 1. Overview

`@carbon/angular` is a new package in the Carbon monorepo (`packages/angular/`)
that provides Angular components wrapping `@carbon/web-components` custom
elements. It preserves as much of the existing `carbon-components-angular` API
surface as possible so that migration is low-friction, while deliberately
breaking from it where the old API was coupled to Flatpickr, child-component
composition models, or types that no longer exist in the WC layer.

### Why here, not Carbon Labs

The package lives in the main monorepo from day one, published as
`@carbon/angular`. A `0.0.0-prerelease.x` version signals instability during
active development. This avoids the churn of an intermediate
`@carbon-labs/angular` incubation phase (separate repo, separate CI, migration
ceremony at graduation). The versioning milestones are:

| Milestone             | Version              | Trigger                  |
| --------------------- | -------------------- | ------------------------ |
| Active development    | `0.0.0-prerelease.x` | Now through v12 RC       |
| v12 Release Candidate | `1.0.0-rc.0`         | v12 RC stabilisation     |
| v12 GA                | `1.0.0`              | v12 general availability |

### Core premise

The WC elements own all behaviour — keyboard navigation, focus management,
accessibility attributes, selection state, sort logic, filter logic, open/close
animation, form participation. The Angular layer owns only three things:

1. **Data binding** — accepting `@Input()` arrays and mapping them to WC slot
   children via `*ngFor`
2. **Property reflection** — mapping camelCase `@Input()` names to kebab-case WC
   attributes
3. **Event normalisation** — listening to WC custom events and re-emitting them
   as typed `@Output()` emitters

No behaviour logic is reimplemented in Angular unless the WC explicitly does not
provide it (see `FileUploader` state tracking, `Accordion` `closeOthers`,
`Pagination` event shape).

---

## 2. Package structure

```
packages/
└── angular/                              ← @carbon/angular
    ├── package.json                      ← name: "@carbon/angular", version: "0.0.0-prerelease.0"
    ├── ng-package.json                   ← Root ng-packagr entry point (@carbon/angular)
    ├── tsconfig.json                     ← Angular + strict compiler options
    ├── .storybook/
    │   ├── main.ts                       ← @storybook/angular
    │   └── preview.ts
    ├── tasks/
    │   ├── generate-wrappers/            ← Code generator: CEM -> Angular wrappers & tests
    │   └── scaffold-component/
    ├── src/                              ← Root entry point (@carbon/angular — 100% automated 1:1 WC wrappers)
    │   ├── index.ts                      ← Barrel re-exporting all generated components
    │   └── components/
    │       ├── Button/
    │       ├── Modal/
    │       ├── Dropdown/
    │       └── ... (110+ component families generated from CEM)
    └── legacy/                           ← Secondary entry point (@carbon/angular/legacy)
        ├── ng-package.json               ← Secondary ng-packagr entry point
        └── src/
            ├── index.ts                  ← Barrel exporting deprecated CCA-compatible wrappers
            └── components/
                ├── Dropdown/             ← [items] array adapter -> WC slots
                ├── Select/               ← [items] array adapter
                ├── FileUploader/         ← Angular-managed file state machine
                └── ... (~15-20 specialized migration wrappers)
```

`ng-packagr` builds both the root entry point (`@carbon/angular`) and the
secondary entry point (`@carbon/angular/legacy`). Consumers import from
`@carbon/angular` for greenfield code or `@carbon/angular/legacy` for
low-friction migration.

---

## 3. Naming conventions

| Framework      | Package name             | Component selector |
| -------------- | ------------------------ | ------------------ |
| React          | `@carbon/react`          | `<Button />`       |
| Web Components | `@carbon/web-components` | `<cds-button>`     |
| **Angular**    | **`@carbon/angular`**    | **`<cds-button>`** |

Angular ships one package for all components. This is intentional — Angular's
compilation model (Ivy, partial compilation, APF) is best served by a single
`ng-packagr` project rather than dozens of independent packages.

### Selector prefix: `cds-*`

`carbon-components-angular` already uses `cds-*` selectors (migrated from
`ibm-*`):

| Component  | Old selector (`ibm-*`) | Current selector (`cds-*`) |
| ---------- | ---------------------- | -------------------------- |
| Button set | `ibm-button-set`       | `cds-button-set`           |
| Checkbox   | `ibm-checkbox`         | `cds-checkbox`             |
| ComboBox   | `ibm-combo-box`        | `cds-combo-box`            |
| DatePicker | `ibm-date-picker`      | `cds-date-picker`          |
| Dropdown   | `ibm-dropdown`         | `cds-dropdown`             |
| Modal      | `ibm-modal`            | `cds-modal`                |
| Pagination | `ibm-pagination`       | `cds-pagination`           |
| Tab        | `ibm-tab`              | `cds-tab`                  |
| Tabs       | `ibm-tabs`             | `cds-tabs`                 |

Using `cds-*` in `@carbon/angular` matches what current consumers already write
and makes migration from `carbon-components-angular` a minimal-change upgrade.
Since this package lives in the monorepo from day one as `@carbon/angular`,
there is no graduation rename.

---

## 4. Toolchain decisions

| Decision          | Choice                                                       | Rationale                                                                                                                                            |
| ----------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build tool        | `ng-packagr`                                                 | Produces Angular Package Format (APF); correct `esm2022` + `fesm2022` outputs; Ivy-compatible; required for Angular CLI prod builds and lazy loading |
| Module style      | Standalone components                                        | Angular 17+ default; no NgModule boilerplate; tree-shakeable                                                                                         |
| WC schema         | `CUSTOM_ELEMENTS_SCHEMA` per component                       | Scoped to each wrapper; does not bleed into consumer NgModules                                                                                       |
| Storybook         | `@storybook/angular`                                         | Separate port; Storybook static published to a companion repo (see §5)                                                                               |
| Testing           | Jest + `@angular/core/testing`                               | Matches React package tooling; TestBed for component integration tests                                                                               |
| Forms integration | `ControlValueAccessor`                                       | Required for `[formControl]` / `[(ngModel)]` compatibility                                                                                           |
| WC registration   | Pure class imports + `defineCustomElement`                   | Side-effect-free imports; Angular wrapper registers WC under private names; no `es-custom` needed                                                    |
| Change detection  | `ChangeDetectorRef.markForCheck()` after machine transitions | Ensures OnPush-compatible state propagation                                                                                                          |

### Why ng-packagr, not tsdown/rolldown

The sibling packages (`@carbon/react`, `@carbon/web-components`) use `tsdown`
(rolldown-based) for their builds. Angular has specific requirements — partial
Ivy compilation, proper peer dependency handling, `ngPackage` metadata — that
`ng-packagr` handles correctly and that rolldown does not address without
significant custom plugin work. `ng-packagr` is the established standard for
publishing Angular libraries that work correctly with the Angular CLI, Ivy
tree-shaking, and lazy loading. A single `ng-package.json` at
`packages/angular/` covers the entire library.

### WC registration and name clashing — resolved

**Background — why this was a problem:**

`carbon-components-angular` has zero dependency on `@carbon/web-components`. It
renders its own DOM from Angular templates + SCSS, with `cds-*` selectors used
for intra-package Angular component references. When `@carbon/angular` adopts
`cds-*` selectors _and_ wraps WC elements (also `cds-*`), the Angular compiler
would recursively match `<cds-modal>` inside the wrapper's own template against
the declared `cds-modal` Angular selector. `es-custom` was the previous
workaround — a full duplicate build with `cds-custom-*` tag names — which is why
the other Angular team used it.

**The `@carbon/web-components` v3 pure class export API resolves this cleanly.**

**PR #23097 (`feat/wc-v3`) merged to `main` (2026-09-04, commit `dd87f84`).**
This is the v3 registration API. Key changes shipped in that PR:

- **`defineCustomElement(clazz, { name?, registry? })`** is now the public API,
  exported from `@carbon/web-components/es/globals/register.js` and implemented
  in
  [`packages/web-components/src/globals/register.ts`](../../web-components/src/globals/register.ts).
  The decision is formalised in
  [`docs/decisions/0007-provide-pure-class-exports-for-web-components.md`](../../../docs/decisions/0007-provide-pure-class-exports-for-web-components.md).
- **`carbonElement` decorator is now deprecated** (development warning emitted).
  It continues to work throughout the v2→v3 transition period.
- **`es-custom` build is now deprecated**; it still ships but will be removed in
  v3. **`create-prefixed-build`**
  (`packages/web-components/bin/create-prefixed-build.js`) is its replacement —
  a CLI that copies the `es/` directory and rewrites every `cds-*` element name
  to a custom prefix at build time, with no runtime cost. It preserves `--cds`
  CSS custom properties so theming stays shared. `@carbon/angular` does not need
  this tool (per-component `defineCustomElement` is sufficient), but it is the
  supported path for consumers who run two full copies of Carbon on the same
  page (micro-frontends, shell/app version mismatches). See §16.
- **Two `@carbon/upgrade` codemods** now ship for the barrel-import migration:
  - `wc-report-non-barrel-imports` — dry-run report of class-file imports and
    their barrel equivalents (no changes made)
  - `wc-add-barrel-imports` — rewrites class-file side-effect imports to
    barrels; adds a side-effect barrel alongside kept value imports; idempotent
  - Both live in `packages/upgrade/transforms/` and share `carbon-wc-imports.js`
    — a jscodeshift utility that classifies `@carbon/web-components` imports.
    This utility and the report-first / write-opt-in UX pattern are the **direct
    model** for `@carbon/angular` migration codemods (see §16).
- **`custom-elements.json` (WCA manifest) is deprecated** in v2 and removed in
  v3, replaced by the standard
  [Custom Elements Manifest (CEM)](https://github.com/webcomponents/custom-elements-manifest).
  A `wca-deprecation.mjs` task now prints a deprecation warning at build time.
  IDE tooling that consumed `custom-elements.json` should migrate to the CEM
  schema. `@carbon/angular` should generate its own CEM (via
  `@custom-elements-manifest/analyzer` or `@compodoc/compodoc`) rather than
  re-using the WC one.
- **Barrels preserve v2 behaviour.** Each component's `index.js` still calls
  `defineCustomElement`, so importing the barrel registers the element exactly
  as before — no consumer-facing change until v3 pure class exports land.
- **v3 pure class exports (side-effect-free class files) are NOT yet in main.**
  The current state is additive: `defineCustomElement` is available and
  `carbonElement` is deprecated, but class files still self-register via the
  decorator. Pure class files land with the v3 release.

**What this means for `@carbon/angular` development today:**

`@carbon/angular` can use `defineCustomElement` right now against the current
`@carbon/web-components` release — no `git:` branch dep needed. The WC peer dep
can be pinned to the first release that includes PR #23097. The registration
pattern works as follows (ADR 0015 — host-is-WC):

```ts
import CDSModal from '@carbon/web-components/es/components/modal/modal.js';
import { defineCustomElement } from '@carbon/web-components/es/globals/register.js';

// Register under the real tag — no renaming (ADR 0015).
defineCustomElement(CDSModal);
// Angular selector is also 'cds-modal'; host element IS the web component.
```

**`es-custom` is superseded for `@carbon/angular`'s purposes.** For
`@carbon/angular`, neither `es-custom` nor `create-prefixed-build` is needed —
`defineCustomElement` (no custom name) provides exactly the right contract.

**Registration coverage audit:** PR #23097 also shipped
`packages/web-components/tasks/registration-coverage.mjs` — a CI tool that
traverses the module graph from every component barrel and fails if a component
renders an element its barrel cannot register. When developing
`@carbon/angular`, this audit is a useful reference for confirming which WC
elements each barrel registers. The v3 barrel discipline — every barrel
registers exactly the elements it renders, no transitive leakage — is the same
contract `@carbon/angular` wrapper barrels should follow.

### WC registration pattern per component (ADR 0015)

**Note:** An earlier version of this plan used a `cds-ng-*` _inner element_
inside a `cds-*` wrapper. ADR 0015 replaced that with host-is-WC. A different
idea, a wholesale `cds-ng-*` prefix over a prefixed build of the web components,
was accepted in ADR 0020 (2026-10-27) and replaces the real-tag registration
below. The section below reflects ADR 0015 and is stale until step 11.

Each Angular wrapper component registers its backing WC element under the real
tag as a side effect of its own module import:

```ts
// modal.component.ts — generated by tasks/generate-wrappers/index.js
import CDSModal from '@carbon/web-components/es/components/modal/modal.js';
import { defineCustomElement } from '@carbon/web-components/es/globals/register.js';

// Real tag — no renaming. Host element IS the web component.
defineCustomElement(CDSModal);

@Component({
  selector: 'cds-modal', // same as the WC tag
  template: `<ng-content />`,
  standalone: true,
})
export class ModalComponent implements OnChanges {
  @Input() open = false;
  private readonly _el = inject(ElementRef<HTMLElement>);
  ngOnChanges(changes: SimpleChanges): void {
    for (const key of Object.keys(changes)) {
      (this._el.nativeElement as any)[key] = changes[key].currentValue;
    }
  }
}
```

Selector (`cds-modal`) === WC tag. Host IS the web component. No inner element,
no `CUSTOM_ELEMENTS_SCHEMA`, no `es-custom`.

**The snippet above is not what the generator emits.** It imports the `modal.js`
class file and registers only `CDSModal`, so `cds-dialog`, `cds-modal-header`
and the other elements that `cds-modal` renders were never defined. The
generator now emits `import '…/components/modal/index.js'` (the folder barrel)
instead. See ADR 0020 finding 2.

**`@carbon/web-components` peer dep:** `defineCustomElement` is available
(merged via PR #23097, commit `dd87f84`).

---

## 5. Monorepo integration

`packages/angular/` is a standard Yarn workspace — the root `workspaces` glob
`"packages/*"` already covers it. No root-level changes are needed for workspace
registration.

### Lerna build order

`@carbon/angular` has `@carbon/web-components` as a hard `dependency` and
`@carbon/styles` as a `peerDependency`. Lerna resolves the build order
automatically from `package.json` dependency declarations — do not hardcode a
build sequence. Declare the dependencies correctly and let Lerna figure it out.

### Storybook

Storybook for `@carbon/angular` is published to a companion repository (the same
pattern used for the v12 WC and React Storybooks). It is not embedded in the
main monorepo static output. Eventually it will be added to the Chromatic VRT
pipeline.

Local development: `yarn workspace @carbon/angular storybook` starts the dev
server. CI: `yarn workspace @carbon/angular storybook:build` produces the static
output for publishing.

#### Storybook navigation structure

The sidebar follows the unified structure established in ADR 0006 and ADR 0009
(migrated IBM Products components sit alongside core components alphabetically
without a separate product group). Migration content remains the **first group**
— the top entry a CCA consumer sees when opening the Storybook.

```
Introduction/
  Welcome                        ← packages/angular/.storybook/docs/welcome.mdx
  Migrating from carbon-components-angular   ← packages/angular/.storybook/docs/migration.mdx
  Form participation             ← packages/angular/.storybook/docs/form-participation.mdx
  Component registration         ← packages/angular/.storybook/docs/component-registration.mdx

Components/                      ← 100% Automated 1:1 WC wrappers (@carbon/angular), unified alphabetically
  Accordion/
  ActionSet/
  Button/
  Card/
  DataTable/
  Dropdown/
  Modal/
  PageHeader/
  SidePanel/
  Tearsheet/
  ...

Utilities/                       ← Utility & layout primitives
  Layer/
  Resizer/
  ScrollGradient/
  TruncatedText/

Examples/                        ← Enterprise pattern demonstrations
  CreateFlows/
  DeleteAndRemove/
  Export/
  ImportAndUpload/

Legacy carbon-components-angular/  ← Deprecated CCA compatibility adapters (@carbon/angular/legacy)
  Overview                          ← packages/angular/.storybook/docs/legacy-overview.mdx
  Accordion/
  DataTable/
  Dropdown/
  FileUploader/
  Notification/
  Select/
  ...
```

Storybook sidebar order is controlled by `storySort` in `.storybook/preview.ts`:

```ts
// packages/angular/.storybook/preview.ts
storySort: {
  order: [
    'Introduction',
    ['Welcome', 'Migrating from carbon-components-angular',
     'Form participation', 'Component registration'],
    'Components',
    'Utilities',
    'Examples',
    'Legacy carbon-components-angular',
  ],
},
```

#### Story authoring policy (ADR 0019)

Story files for `@carbon/angular` core wrappers are **scaffolded as stubs by the
wrapper generator** then completed by maintainers. The generator emits a minimal
but runnable stub with a `Default` story, correct import path, and
`// TODO(parity):` comments for each WC story not yet covered. Story files for
`@carbon/angular/legacy` are **fully hand-crafted** alongside their adapter
component — no generation occurs. See
[ADR 0019](../../../docs/decisions/0019-angular-storybook-story-authoring.md)
for the full rationale, including why full automation was rejected.

#### Story parity with `@carbon/web-components`

Every story exported from a WC story file **must have a matching story in the
Angular story file for that component.** This is a hard requirement, not a
guideline.

**Rule:** For each named export in
`packages/web-components/src/components/<name>/<name>.stories.ts`, there must be
an identically named export in
`packages/angular/src/stories/<Name>/__stories__/<Name>.stories.ts`.

This gives consumers a side-by-side reference when comparing the two packages
and keeps the Angular Storybook honest about feature coverage. It also surfaces
any Angular-layer gaps — if a WC story cannot be reproduced in the Angular
wrapper, that is a signal the `@Input()` or slot-materialisation API is
incomplete.

**Additional Angular-only stories are allowed** when they demonstrate behaviour
that is specific to Angular (e.g. `[(ngModel)]` two-way binding,
`ReactiveFormsModule` usage, `ControlValueAccessor` integration). These stories
must be placed _after_ the WC-parity stories in the file so the WC-equivalent
block appears first.

**Exceptions:**

- Stories that depend on a WC feature not yet wrapped by `@carbon/angular` must
  be tracked as a `// TODO(parity):` comment at the bottom of the Angular story
  file, not silently omitted.
- `Skeleton` stories for components whose Angular wrapper has no skeleton
  variant yet follow the same `TODO` pattern.

**Enforcement:** A CI check (`yarn workspace @carbon/angular storybook:parity`)
compares exported story names between the WC and Angular story files for each
component and fails if any WC story is missing from the Angular file without a
matching `// TODO(parity):` comment.

#### `migration.mdx` — the migration page

`packages/angular/.storybook/docs/migration.mdx` is the primary migration
reference. It lives in Storybook (not just `docs/guides/`) so it is co-located
with the component examples a migrating developer is browsing. Content mirrors
`docs/guides/cca-to-angular.md` but is formatted as an interactive Storybook
page with live `<Canvas>` examples where the before/after difference is visible.

**Page structure:**

```mdx
<Meta title="Introduction/Migrating from carbon-components-angular" />

# Migrating from carbon-components-angular

> Already using `@carbon/angular`? Jump straight to the [component stories](#)
> or run the codemods below.

## Quick start

1. Uninstall `carbon-components-angular` and install `@carbon/angular` —
   `@carbon/web-components` comes with it automatically
2. Install `@carbon/styles` if you need to customise or override Carbon SCSS
   (`@carbon/styles` is a peer dependency, not bundled)
3. Run `npx @carbon/upgrade migrate cca-report-imports` to see what needs
   changing
4. Run the write codemods (see [Codemods](#codemods) below)
5. Fix any remaining `:not(:defined)` elements in the browser

## What stays the same

- Selectors stay `cds-*` — your templates do not change
- `[(ngModel)]` and `[formControl]` bindings work identically
- All `@carbon/styles` SCSS imports are unchanged

## Breaking changes

### Module imports

### TableModel removed

### notificationObj removed

### PaginationModel removed

### UI Shell: projected children replace arrays

### [theme] input removed

### appendInline / dropUp / scrollableContainer removed

## Codemods

npx @carbon/upgrade migrate cca-report-imports npx @carbon/upgrade migrate
cca-update-module-imports --write ...

## Running two versions side by side
```

The breaking-changes sections map 1:1 to the §7 universal-breaks table and §16
migration guide. Full detail (Before/After/Why/Migration) is in
`docs/guides/cca-to-angular.md`; the Storybook page is the discoverable entry
point that links to it and surfaces the codemods commands where developers are
actively working.

#### `welcome.mdx`

`packages/angular/.storybook/docs/welcome.mdx` — the `Introduction/Welcome` page
— is concise: package description, install command, basic usage snippet, and a
prominent **"Migrating from `carbon-components-angular`?"** call-to-action link
to the migration page. It does not duplicate migration content.

---

## 6. Component implementation plan

### Development methodology: Automated generation

`@carbon/angular` uses an automated wrapper generator pipeline. (The paired
hand-crafted `@carbon/angular/legacy` adapters that this section used to
describe were removed on 2026-10-26.)

#### 1. Core `@carbon/angular` Pipeline (100% Automated from CEM)

The generator script (`packages/angular/tasks/generate-wrappers/`) reads the
`custom-elements.json` manifest emitted by `@carbon/web-components` and
generates:

- Standalone component classes
  (`@Component({ selector: 'cds-<name>', template: '<ng-content />' })`)
- `defineCustomElement` registration under the real tag (ADR 0015 — no
  `cds-ng-*` renaming)
- Typed `@Input()` properties forwarded to the host element in `ngOnChanges`
- Boolean `@Input()` using `booleanAttribute` (so `<cds-button disabled>` works)
- `@Output()` event emitters for **custom events only** (not native DOM events —
  ADR 0015 §4)
- `ControlValueAccessor` (CVA) providers for form-associated custom elements
- Automated Layer 1 Jest unit tests (`<Name>.spec.ts`) asserting property
  forwarding

Because the generator operates on the CEM source of truth, **over 110+ component
families (297+ custom elements)** are generated and tested automatically.

#### 2. Secondary entry point `@carbon/angular/legacy`: removed

Removed 2026-10-26. The components it was to hold (`Dropdown` / `Select` /
`MultiSelect` with `[items]`, `FileUploader`, `DataTable`, `Tabs` / `Accordion`,
`Notification` with `notificationObj`) are now migration cases handled by
codemods and guidance. See [`migration-support.md`](./migration-support.md).

---

### Component tiers

Components are grouped into implementation tiers based on wrapper complexity.
The tiers include both core Carbon components and the newly integrated IBM
Products component surface (ADR 0009).

### Tier 1 — Thin wrappers (~2–4 hours each)

Pure attribute-mapping wrappers. No slot materialisation, no behaviour logic.

| Component         | WC element(s)                                                            | Origin       | Notes                                                                                              |
| ----------------- | ------------------------------------------------------------------------ | ------------ | -------------------------------------------------------------------------------------------------- |
| Checkbox          | `cds-checkbox`, `cds-checkbox-group`                                     | Core         | CVA: boolean; group CVA: string                                                                    |
| RadioButton       | `cds-radio-button`, `cds-radio-button-group`                             | Core         | CVA: string; group CVA: string                                                                     |
| Toggle            | `cds-toggle`                                                             | Core         | CVA: boolean                                                                                       |
| Tag               | `cds-tag`, `cds-tag-selectable`, `cds-tag-filter`, `cds-tag-operational` | Core         | Display + selectable CVA: boolean; filter emits (close)                                            |
| Loading           | `cds-loading`                                                            | Core         | —                                                                                                  |
| InlineLoading     | `cds-inline-loading`                                                     | Core         | —                                                                                                  |
| Skeleton variants | `cds-skeleton-text`, `cds-skeleton-icon`, `cds-skeleton-placeholder`     | Core         | —                                                                                                  |
| Tooltip           | `cds-tooltip`, `cds-tooltip-content`, `cds-definition-tooltip`           | Core         | CCA exposes `enterDelayMs`, `leaveDelayMs`, `disabled`; expose all                                 |
| ToggleTip         | `cds-toggletip`                                                          | Core         | CCA: `isOpen`; WC equivalent exists                                                                |
| TextInput         | `cds-text-input`                                                         | Core         | CVA: string; drop `theme` @Input                                                                   |
| TextArea          | `cds-textarea`                                                           | Core         | CVA: string                                                                                        |
| NumberInput       | `cds-number-input`                                                       | Core         | CVA: number; CCA has `min`, `max`, `step`, `precision`, `hideSteppers`                             |
| ProgressBar       | `cds-progress-bar`                                                       | Core         | CCA: `value`, `max`, `status`, `type`, `size`, `hideLabel`                                         |
| ProgressIndicator | `cds-progress-indicator`, `cds-progress-step`                            | Core         | CCA: `[steps]: Step[]` array → slot materialise; `orientation`, `spacing`                          |
| Search            | `cds-search`                                                             | Core         | CVA: string; CCA has `expandable`, `toolbar`, `tableSearch` flags                                  |
| Link              | `cds-link`                                                               | Core         | CCA directive `[cdsLink]`; `inline`, `visited`, `disabled`, `size`                                 |
| AILabel           | `cds-ai-label`, `cds-ai-label-action-button`                             | Core         | CCA has full AI label component with popover, actions, revert; wrap equivalently                   |
| Layer             | `cds-layer`                                                              | Core         | CCA directive `[cdsLayer]` with level 0/1/2; thin wrapper directive                                |
| CodeSnippet       | `cds-code-snippet`                                                       | Core         | CCA: `display: single/multi/inline`, `wrapText`, `hideCopyButton`, `feedbackTimeout`; drop `theme` |
| BadgeIndicator    | `cds-badge-indicator`                                                    | IBM Products | Lightweight count / status indicator dot                                                           |
| BigNumber         | `cds-big-number`, `cds-big-number-skeleton`                              | IBM Products | KPI stat callout with trend indicator                                                              |
| IconIndicator     | `cds-icon-indicator`                                                     | IBM Products | Semantic status icon display                                                                       |
| ShapeIndicator    | `cds-shape-indicator`                                                    | IBM Products | High-contrast shape + color accessibility indicator                                                |
| UserAvatar        | `cds-user-avatar`                                                        | IBM Products | User profile avatar (image, initials, icon)                                                        |
| CopyButton / Copy | `cds-copy`, `cds-copy-button`                                            | IBM Products | Inline and standalone clipboard copy button                                                        |
| TruncatedText     | `cds-truncated-text`                                                     | IBM Products | Ellipsis overflow text with integrated tooltip                                                     |
| FullPageError     | `cds-full-page-error`                                                    | IBM Products | Standardized 403 / 404 / 500 error display page                                                    |

### Tier 2 — Slot materialisation (~1–3 days each)

Angular wrapper renders WC child elements via `*ngFor` from `[items]` input. All
behaviour (keyboard navigation, selection, open/close) is owned by the WC.

| Component          | WC element(s)                                                                      | Origin       | Key adapter work                                                                                                                                                                                                                                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Select             | `cds-select`, `cds-select-item`, `cds-select-item-group`                           | Core         | Items array → slot children; groups support                                                                                                                                                                                                                                                                                               |
| Dropdown           | `cds-dropdown`, `cds-dropdown-item`                                                | Core         | Items → slots; `itemValueKey`; event re-emit; native form participation                                                                                                                                                                                                                                                                   |
| MultiSelect        | `cds-multi-select`, `cds-multi-select-item`                                        | Core         | `selectAll`, `selectionFeedback`, filterable, locale built into WC                                                                                                                                                                                                                                                                        |
| Breadcrumb         | `cds-breadcrumb`, `cds-breadcrumb-link`, `cds-breadcrumb-overflow-menu`            | Core         | `[items]` array → slots; overflow menu                                                                                                                                                                                                                                                                                                    |
| Notification       | `cds-actionable-notification`, `cds-inline-notification`, `cds-toast-notification` | Core         | Three distinct wrappers; CCA uses `notificationObj` model — replace with flat `@Input()`s matching WC props                                                                                                                                                                                                                               |
| Pagination         | `cds-pagination`, `cds-page-sizes-select`                                          | Core         | CCA uses `PaginationModel` object — replace with flat inputs (`totalItems`, `page`, `pageSize`, `itemsPerPageOptions`); event shape: old `{page: {number, length}}` → `{page: number, pageSize: number}`                                                                                                                                  |
| ContentSwitcher    | `cds-content-switcher`, `cds-content-switcher-item`                                | Core         | CCA uses projected `[cdsContentOption]` directives; `[items]` array approach preferred                                                                                                                                                                                                                                                    |
| ContainedList      | `cds-contained-list`, `cds-contained-list-item`, `cds-contained-list-description`  | Core         | CCA uses projected `ibm-contained-list-item` children; items → slots                                                                                                                                                                                                                                                                      |
| ContextMenu / Menu | `cds-menu`, `cds-menu-item`, `cds-menu-group`, `cds-menu-divider`                  | Core         | CCA: projected child composition; `[items]` array → slots; `open`, `position`                                                                                                                                                                                                                                                             |
| ComboButton        | `cds-combo-button`                                                                 | Core         | CCA: `label`, `size`, `disabled`, `menuAlignment`; projected action items                                                                                                                                                                                                                                                                 |
| MenuButton         | `cds-menu-button`                                                                  | Core         | CCA: `label`, `kind`, `size`, `menuAlignment`, `disabled`; projected menu items                                                                                                                                                                                                                                                           |
| Tiles              | `cds-tile`, `cds-clickable-tile`, `cds-expandable-tile`, `cds-selectable-tile`     | Core         | Four tile variants; CCA has `[theme]` on all — drop per plan; `href`, `route`, `expanded`                                                                                                                                                                                                                                                 |
| Treeview           | `cds-tree-view`, `cds-tree-node`                                                   | Core         | CCA: `[tree]: Node[]` recursive array → slot materialise recursively; `isMultiSelect`; `(select)`, `(toggle)` outputs                                                                                                                                                                                                                     |
| Slider             | `cds-slider`, `cds-slider-input`                                                   | Core         | CVA: `number` (single) or `[number, number]` (range). Two-handle mode via `value` + `unstable_valueUpper` (attr `value-upper`). Each thumb fires `cds-slider-changed` separately with `{ value: number, intermediate?: boolean }` — wrapper reads both and emits tuple. `min`, `max`, `step`, `shiftMultiplier`, `disableArrowKeys`.      |
| TimePicker         | `cds-time-picker`, `cds-time-picker-select`                                        | Core         | WC equivalent confirmed (Q7 closed). CVA value: `string`. Inputs: `disabled`, `invalid`, `invalid-text`, `warning`, `label-text`, `placeholder`, `read-only`, `max-length`, `pattern`, `size`, `required`. Slot: `time-picker-select` → projected `<cds-time-picker-select>` children. WC fires native `change` with `{ value: string }`. |
| StructuredList     | `cds-structured-list`, `cds-structured-list-row`, `cds-structured-list-cell`       | Core         | CVA: `any`; preserve `selection`, `flushed`, `condensed`, `(selected)`                                                                                                                                                                                                                                                                    |
| ActionSet          | `cds-action-set`                                                                   | IBM Products | Action button bar layout with responsive stacking for tearsheets, modals, and side panels                                                                                                                                                                                                                                                 |
| OptionsTile        | `cds-options-tile`                                                                 | IBM Products | Interactive configuration tile with toggle / radio CVA state; CVA: `boolean \| string`                                                                                                                                                                                                                                                    |
| GuideBanner        | `cds-guide-banner`, `cds-guide-banner-element`                                     | IBM Products | Dismissible contextual announcement & onboarding banner; projected element items                                                                                                                                                                                                                                                          |
| ChatButton         | `cds-chat-button`, `cds-chat-button-skeleton`                                      | IBM Products | Floating or inline AI chat button launcher                                                                                                                                                                                                                                                                                                |
| EditInPlace        | `cds-edit-in-place`                                                                | IBM Products | Inline text editing wrapper with CVA integration; CVA: `string`                                                                                                                                                                                                                                                                           |

### Tier 3 — Compound components & complex adapters (~1–2 weeks each)

Requires real Angular logic beyond slot materialisation, compound component
authoring, or state coordination, but WC still owns all behaviour.

#### Tabs (`cds-tabs` + `cds-tab`)

**Architecture break from old Angular API (intentional):**

Old API: `[tabs]="[{label, content}]"` array — prevents rich Angular template
content in panels. New API: projected child `<cds-tab>` components.

```html
<!-- NEW -->
<cds-tabs type="contained">
  <cds-tab label="Tab 1"><my-component /></cds-tab>
  <cds-tab label="Tab 2" [disabled]="true"><p>Content</p></cds-tab>
</cds-tabs>
```

WC owns: keyboard navigation, scroll overflow with IntersectionObserver
sentinels, all ARIA. New WC capabilities exposed: `dismissable`,
`badgeIndicator`, `iconOnly`, `iconSize` per tab.

#### Accordion (`cds-accordion` + `cds-accordion-item`)

Same architecture break as Tabs — projected children replace items array.

`closeOthers` is preserved: wrap intercepts cancellable
`cds-accordion-item-beingtoggled` event, prevents toggling items that should
stay closed. ~10 lines of Angular logic.

New WC capabilities exposed: `isFlush`, responsive `breakpoint` per item.

#### ComboBox (`cds-combo-box` + `cds-combo-box-item`)

WC has built-in client-side filtering (`shouldFilterItem` fn, replaceable),
experimental typeahead, and `allowCustomValue`. Angular wrapper exposes these
directly.

Server-side async filtering: expose `[filterMode]="'client'|'server'"`. In
server mode, wrapper intercepts WC input events, emits `(filtered)` output,
waits for consumer to rebind `[items]`. WC re-filters the updated slot children
automatically.

`allowCreate` → renamed to `allowCustomValue` (exact WC equivalent).

#### Modal (`cds-modal` + slot children)

Wrapper builds `cds-modal-header / cds-modal-body / cds-modal-footer` slot
structure from `@Input`s. Consumer body content via `<ng-content>`.

WC owns: focus trapping, `getFocusable()`, keyboard Escape, ARIA labelling via
MutationObserver. New WC capabilities exposed: `loadingStatus`
(inactive/active/finished/error), `shouldSubmitOnEnter`, `preventClose`,
`preventCloseOnClickOutside`, `fullWidth`, `alert`.

Drop: `selectorPrimaryFocus` — the WC manages initial focus via its own
`getFocusable()`. Keep: `hasScrollingContent` — also on `cds-modal` natively.

#### FileUploader (`cds-file-uploader` + `cds-file-uploader-item` + `cds-file-uploader-drop-container`)

`cds-file-uploader` is a layout shell only (3 props: `disabled`,
`labelDescription`, `labelTitle`). The Angular wrapper must own file state
tracking.

Wrapper accepts `[files]` array of
`{name, state, invalid, errorSubject, errorBody}` and renders one
`cds-file-uploader-item` per entry. State updates
(`uploading → uploaded / error`) are the consumer's responsibility — wrapper
re-renders on `files[]` changes. WC owns all visuals, delete button, and
drag-and-drop behaviour.

~150 lines of Angular. This is the one component where the pattern inverts —
Angular owns the state machine, WC owns the rendering.

#### Card (`cds-card` + compound subcomponents)

Unified composable card system from IBM Products (replaces separate
expressive/productive cards). The Angular wrapper exports a compound family:
`<cds-card>`, `<cds-card-header>`, `<cds-card-title>`, `<cds-card-body>`,
`<cds-card-footer>`, `<cds-card-actions>`, `<cds-card-media>`. Supports
clickable, selectable, and pictogram/media layouts.

#### SidePanel (`cds-side-panel`)

Slide-over panel component from IBM Products for details, creation flows, and
editing without losing page context. Angular wrapper exposes slide-in animation,
focus trapping, dirty state guards, action buttons, and size variants (`xs`,
`sm`, `md`, `lg`, `2xl`).

#### Tearsheet (`cds-tearsheet` + compound elements)

High-visibility flow container for complex multi-step tasks. Angular wrapper
provides `<cds-tearsheet>`, `<cds-tearsheet-header>`, `<cds-tearsheet-body>`,
`<cds-tearsheet-footer>`, and `<cds-tearsheet-influencer>` with support for
wide, narrow, stacked, and step-by-step navigation flows.

#### PageHeader (`cds-page-header` + slots)

Standardized enterprise page header. Wrapper coordinates title, subtitle,
breadcrumbs, action bar, page-level tabs, and hero media slots.

#### Dialog (`cds-dialog` + compound elements)

Modal messaging and confirmation dialogs with compound sub-components:
`<cds-dialog-header>`, `<cds-dialog-body>`, `<cds-dialog-footer>`,
`<cds-dialog-controls>`.

#### Coachmark (`cds-coachmark` + beacon/body)

Onboarding tour and feature discovery beacon system with floating tooltip cards.

#### NotificationsPanel (`cds-notification-panel`)

Flyout notification drawer with grouped notification lists and footer actions.

#### Resizer (`cds-resizer-grid`, `cds-resizer-handle`, `cds-resizer-panel`)

Adjustable split-pane grid layout system with drag handles and panel
constraints.

### Tier 4 — Data adapter (~2–3 weeks)

#### DataTable (`cds-table` + supporting elements)

**`cds-table` is not a primitive shell.** It owns: client-side sort (with custom
`collator`, locale-aware), client-side search/filter (replaceable `filterRows`
fn), row selection (checkbox/radio), select-all, batch actions bar, row
expansion, batch expansion, overflow menu hover, download, zebra striping, AI
label support. It fires 8 distinct events.

The Angular wrapper's only job is data binding:

- Accept `[rows]: DataTableRow[]` and `[columns]: DataTableColumn[]`
- Render `cds-table-header-cell` per column via `*ngFor`
- Render `cds-table-row` + `cds-table-cell` per row via `*ngFor`
- Detect array changes via Angular CD; re-render on change
- Compose `cds-pagination` alongside when `[pageSize]` is set
- Re-emit WC events as typed `@Output()` emitters

**Do not lift-and-shift the old Angular DataTable.** The old implementation owns
sort, filter, and selection state in TypeScript service classes. Copying that
code creates two competing implementations of the same behaviour — Angular's
re-rendering would undo the WC's DOM sorting, and selection state would diverge.

**Drop:** `DataTableModel` class (Angular-specific mutable class; replace with
plain interfaces). **Drop:** `isVirtualized` / virtual scroll (defer to v2; use
CDK Virtual Scroll independently). **Keep:** `cellTemplate: TemplateRef` per
column — use `*ngTemplateOutlet` inside `cds-table-cell`.

New WC capabilities exposed: `locale` (Intl.Collator sort), `radio`
(single-select mode), `expandable`, `batchExpansion`, `useStaticWidth`,
`withRowAILabels`, size variants `xs` and `xl`.

### Tier 3 (continued) — UI Shell

#### UI Shell (`cds-header-*`, `cds-side-nav-*`, `cds-panel`, `cds-switcher-*`)

CCA's UI Shell uses array-based `[navigationItems]` / `[menuItems]` /
`[headerItems]` inputs on the container components (`cds-header-navigation`,
`cds-header-menu`, `cds-sidenav`, `cds-sidenav-menu`). This is a high-value
migration break point:

**Break from CCA:** replace `[navigationItems]="[...]"` arrays with projected
`<cds-header-item>` / `<cds-sidenav-item>` children — the same composition model
applied to Tabs and Accordion. The WC layer owns all keyboard navigation and
ARIA; Angular's role is routing integration and slot binding.

Key CCA router inputs to preserve on navigating items: `[useRouter]`, `[route]`,
`[routeExtras]`, `[href]`, `[activeLinkClass]`, `[isCurrentPage]`. The
`(navigation)` output (`EventEmitter<Promise<boolean>>`) should be preserved on
all navigating children (`cds-header-item`, `cds-sidenav-item`,
`cds-switcher-list-item`).

### Tier 5 — Pure Angular & Web Component follow-ups

Components that either have no `@carbon/web-components` equivalent and are
implemented purely in Angular, or have migrated into `@carbon/react` in Carbon
Core and await Web Component ports.

| Component        | Status / Architecture                              | Recommendation                                                                                                             |
| ---------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Stepper          | Pure Angular                                       | Port forward from CCA — keep old API; frequently used in IBM product multi-step flows.                                     |
| ScrollGradient   | In `@carbon/react`; WC port follow-up              | Implement temporary Angular directive/component with `@carbon/styles` CSS scroll indicators until WC lands.                |
| TagOverflow      | In `@carbon/react`; WC port follow-up              | Implement Angular wrapper calculating container width / overflow tags using CDK / ResizeObserver until WC port lands.      |
| AddSelect        | In `@carbon/react` (composable); WC port follow-up | Implement hierarchical modal / inline selection wrapper consuming `AddSelectData` utility; wrap WC element once available. |
| ConditionBuilder | In `@carbon/react`; WC port follow-up              | Rule / criteria builder component; port to Angular once WC equivalent is delivered in `@carbon/web-components`.            |
| StructuredList   | WC equivalent exists (`cds-structured-list`)       | Wrap it — see Tier 2. CCA CVA accepts `any`; preserve `selection`, `flushed`, `condensed` inputs and `(selected)` output.  |

---

## 7. Cross-cutting API decisions

### Universal keeps

Preserve unchanged across all components:

- All boolean flag `@Input()`s (`disabled`, `readOnly`, `invalid`, `hideLabel`,
  `open`, `checked`, `required`, …)
- All string display `@Input()`s (`labelText`, `placeholder`, `invalidText`,
  `warnText`, `helperText`, `title`, …)
- All variant enums where WC uses the same string values (`kind`, `size`,
  `type`, `alignment`, …)
- All `[items]` / `[rows]` / `[columns]` array `@Input()`s — wrapper
  materialises the slots

### Universal breaks

Apply intentionally across all components:

| Break                                                                           | Affected CCA components                                                                                                                                                                       | Reason                                                                                                                                       |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `Date` object types → `string`                                                  | DatePicker                                                                                                                                                                                    | State machine and WC operate on strings. Conversion layer introduces timezone edge cases with no team to maintain it.                        |
| Child component composition models → flat `@Input()` + `ng-content`             | DatePicker (`ibm-date-picker-input`), Modal (`ibm-modal-header/content/footer`), Tabs/Accordion array inputs, UI Shell (`[navigationItems]` arrays)                                           | Wrapper internalises slot structure; consumers write a single flat element.                                                                  |
| Flatpickr-specific `@Input()`s dropped                                          | DatePicker: `[flatpickr]`, `[appendTo]`, `[plugins]`                                                                                                                                          | The backing library is gone.                                                                                                                 |
| Per-component `theme` `@Input()` dropped                                        | **All components** — CCA has `[theme]` on: CodeSnippet, ComboBox, DatePicker/DatePickerInput, Dropdown, NumberInput, Search, Select, Tabs, Tiles (all variants), TimePicker, TimepickerSelect | Theming is global via `@carbon/themes` CSS custom properties, not per-component.                                                             |
| NgModule exports → standalone component exports                                 | All                                                                                                                                                                                           | Not a breaking change for component imports; barrel `*Module` imports need updating.                                                         |
| `PaginationModel` object → flat `@Input()`s                                     | Pagination (also removes shared model with DataTable)                                                                                                                                         | CCA `[model]: PaginationModel` conflates page state with data; replace with `[totalItems]`, `[page]`, `[pageSize]`, `[itemsPerPageOptions]`. |
| `TableModel` / `TableHeaderItem` / `TableItem` classes → plain `DataTableRow[]` | DataTable                                                                                                                                                                                     | Mutable class model causes CD conflicts; plain arrays are immutable-friendly.                                                                |
| Array-based navigation inputs → projected children                              | UI Shell `[navigationItems]`, `[menuItems]`, `[headerItems]`                                                                                                                                  | Arrays block rich template content and Angular router integration; projected children allow `routerLink`, `routerLinkActive`, etc.           |
| `notificationObj: NotificationContent` model → flat `@Input()`s                 | Notification (inline, toast, actionable)                                                                                                                                                      | Object input is an unnecessary indirection when WC exposes flat props.                                                                       |

### Forms (ControlValueAccessor)

Every form input implements `ControlValueAccessor`. CVA value types follow the
WC, not the old Angular types. CCA's inspection and the IBM Products surface
reveal additional CVA components:

| Component           | CVA type            | Notes                                                                                                                                                          |
| ------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TextInput           | `string`            | —                                                                                                                                                              |
| TextArea            | `string`            | —                                                                                                                                                              |
| Select              | `string`            | —                                                                                                                                                              |
| Dropdown            | `string`            | String value matching `itemToString(selectedItem)`                                                                                                             |
| MultiSelect         | `string[]`          | Array of string values                                                                                                                                         |
| ComboBox            | `string`            | —                                                                                                                                                              |
| DatePicker          | `string`            | CVA value is formatted string e.g. `"01/15/2026"`; range: `"01/10/2026/01/20/2026"`. `(onChange)` emits `{selectedDates: Temporal.PlainDate[], value: string}` |
| Checkbox            | `boolean`           | —                                                                                                                                                              |
| Toggle              | `boolean`           | —                                                                                                                                                              |
| RadioButton (group) | `string`            | Group CVA; individual radio responds to checked @Input                                                                                                         |
| NumberInput         | `number`            | CCA `writeValue` accepts `any`; constrain to `number`                                                                                                          |
| Search              | `string`            | CCA has CVA; `(valueChange)` output also emitted                                                                                                               |
| Slider              | `number` / `[n, n]` | Single mode: `number`; Range mode: `[number, number]`                                                                                                          |
| StructuredList      | `any`               | Selection state; align CVA type with WC                                                                                                                        |
| TimePicker          | `string`            | CVA: `string`; fires change event with string value                                                                                                            |
| EditInPlace         | `string`            | CVA: `string`; inline editable text                                                                                                                            |
| OptionsTile         | `boolean \| string` | CVA: `boolean` (toggle mode) or `string` (radio mode)                                                                                                          |

---

## 8. DatePicker — detailed API mapping

**The Angular wrapper targets the Preview DatePicker** —
`cds-preview-date-picker` and `cds-preview-date-picker-input` — shipped in PR
#22728 (merged Aug 5) at
[`packages/web-components/src/components/date-picker/next/`](../../web-components/src/components/date-picker/next/).
Import from `@carbon/web-components/es/components/date-picker/next/index.js`.

This is the definitive v12 DatePicker: built on the **Temporal API** and a
framework-agnostic **state machine** (`@carbon/utilities/date-picker`), fully
replacing Flatpickr. The classic `cds-date-picker` (Flatpickr-based) remains in
`@carbon/web-components`, but `@carbon/angular` does not wrap it or any Fluid
Date Picker
([ADR 0021](../../../docs/decisions/0021-angular-drop-classic-date-picker.md)).

> **Stale naming:** the `cds-ng-preview-*` names in this section and the
> `cds-ng-<name>` queries in the §13 examples describe the earlier inner-element
> design. Under ADR 0015 they are the real tags (`cds-preview-date-picker`, and
> so on). They will be rewritten when those components are built (ADR 0015,
> remaining work item 8). ADR 0020 would change them again.

**Internal WC tag names for `@carbon/angular`:**

| WC element                  | Angular-internal registration      |
| --------------------------- | ---------------------------------- |
| `CDSDatePicker` (next)      | `cds-ng-preview-date-picker`       |
| `CDSDatePickerInput` (next) | `cds-ng-preview-date-picker-input` |

The `cds-ng-preview-*` prefix keeps these distinct from both the consumer-facing
`cds-*` Angular selectors and the raw WC preview tags.

### API mapping

| `@Input()` / `@Output()`     | Old `carbon-components-angular` | New `@carbon/angular`                                                | Decision           |
| ---------------------------- | ------------------------------- | -------------------------------------------------------------------- | ------------------ |
| `[datePickerType]`           | `'simple'\|'single'\|'range'`   | maps to WC `kind` on `cds-ng-preview-date-picker-input`              | KEEP               |
| `[value]`                    | `Date \| Date[]`                | `string` — ISO8601 date or `/`-separated range                       | **BREAK**          |
| `[dateFormat]`               | Flatpickr token string          | same (numeric tokens only: `m`, `d`, `Y`)                            | KEEP               |
| `[minDate]`, `[maxDate]`     | string                          | same (`min-date`, `max-date` attributes)                             | KEEP               |
| `[disabled]`, `[readOnly]`   | boolean                         | same                                                                 | KEEP               |
| `[invalid]`, `[invalidText]` | —                               | on `cds-ng-preview-date-picker-input`                                | KEEP               |
| `[warn]`, `[warnText]`       | —                               | on `cds-ng-preview-date-picker-input`                                | KEEP               |
| `[size]`                     | `'sm'\|'md'\|'lg'`              | on `cds-ng-preview-date-picker-input`                                | KEEP               |
| `[label]`                    | string                          | `label-text` on `cds-ng-preview-date-picker-input`                   | KEEP               |
| `[placeholder]`              | string                          | on `cds-ng-preview-date-picker-input`                                | KEEP               |
| `[labelEnd]`                 | second child's `[label]`        | `@Input()` on wrapper → second `cds-ng-preview-date-picker-input`    | RENAME             |
| `[placeholderEnd]`           | second child's `[placeholder]`  | `@Input()` on wrapper → second input                                 | RENAME             |
| `[allowInput]`               | —                               | `allow-input` on WC (default `true`)                                 | NEW                |
| `[closeOnSelect]`            | —                               | `close-on-select` on WC (default `true`)                             | NEW                |
| `[locale]`                   | string                          | `locale` on WC — **now supported** via `Intl.DateTimeFormat`         | **NEW (was DROP)** |
| `[name]`                     | —                               | `name` on WC (native form participation)                             | NEW                |
| `[open]`                     | —                               | `open` on WC (programmatic control)                                  | NEW                |
| `[flatpickr]`                | Flatpickr config object         | dropped — no Flatpickr                                               | **DROP**           |
| `[plugins]`                  | Flatpickr plugins array         | dropped                                                              | **DROP**           |
| `[appendTo]`                 | DOM teleport                    | dropped                                                              | **DROP**           |
| `(onChange)`                 | `EventEmitter<Date[]>`          | `EventEmitter<{selectedDates: Temporal.PlainDate[], value: string}>` | **BREAK**          |
| `(onOpen)`                   | via `calendarChange`            | explicit `EventEmitter<void>`                                        | KEEP               |
| `(onClose)`                  | via `calendarChange`            | explicit `EventEmitter<void>`                                        | KEEP               |
| `(calendarChange)`           | Flatpickr instance event        | dropped                                                              | **DROP**           |

**Composition model change:** Old API required explicit
`<ibm-date-picker-input>` child components. New wrapper internalises
`cds-ng-preview-date-picker-input` children; consumer uses a single flat
element.

**CVA:** value type is `string`. Single mode: `"01/15/2026"`. Range mode is
`/`-separated: `"01/10/2026/01/20/2026"`. This resolves Open Question #1 —
`string` is correct, not `Date[]`, because the new WC operates entirely on
strings and `Temporal.PlainDate` internally.

**`(onChange)` event detail:** `selectedDates` is `Temporal.PlainDate[]` (not
`string[]` as originally planned in the pre-PR design). `value` is the formatted
string. The Angular output type should be
`{ selectedDates: Temporal.PlainDate[], value: string }`. The WC fires
`cds-preview-date-picker-changed`.

**Temporal polyfill:** `@carbon/utilities/date-picker` bundles
[`temporal-polyfill`](https://github.com/fullcalendar/temporal-polyfill) and
installs it only when the engine has no native implementation. No additional
polyfill setup is required in the Angular package.

---

## 9. WC element registration

With `defineCustomElement` now shipped in `@carbon/web-components` (PR #23097,
merged to `main`; see §4 for full detail):

- Each Angular wrapper component registers its WC backing element on first
  import (ADR 0015: under the real tag, using `defineCustomElement(CDSModal)`;
  ADR 0020, accepted, uses `cds-ng-*` through a prefixed build instead). The
  older text here described
  `defineCustomElement(CDSModal, { name: 'cds-ng-modal' })`, which renames one
  class only and breaks composites (ADR 0015 findings 2 and 3)
- Consumers do not need to separately import WC side-effect modules
- `defineCustomElement` is idempotent — re-registering the same class under the
  same tag is a no-op; if the WC class has already self-registered under
  `cds-modal`, the helper registers a transparent subclass under the custom name
  instead (`instanceof CDSModal` still holds)
- `es-custom` is not used
- The `@carbon/web-components` peer dep can be pinned to the release containing
  commit `dd87f84` (PR #23097 merge); no `git:` branch dep is required

---

## 10. Effort estimate

| Phase                                                                                                                                  | Scope               | Estimate                                  |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------------------------------------- |
| Package scaffolding & `@carbon/angular/legacy` secondary entry point config                                                            | Toolchain           | 2–3 days                                  |
| Automated wrapper generator (`tasks/generate-wrappers/`) & PoC validation                                                              | Generator Tooling   | 3–4 days                                  |
| Automated Core Generation (~110+ components, 297+ custom elements, Layer 1 specs)                                                      | Core Implementation | 1 week                                    |
| Specialized Legacy Adapters in `@carbon/angular/legacy` (`Dropdown`, `Select`, `FileUploader`, `DataTable`, `Tabs`, `Accordion`, etc.) | Legacy Adapters     | 3–4 weeks                                 |
| Layer 2 Playwright tests & Layer 3 Storybook a11y (`play()` + IBM Equal Access)                                                        | Integration & A11y  | 2–3 weeks                                 |
| Migration support (Codemods: CCA → `/legacy` and `/legacy` → Core + documentation)                                                     | Tooling & Guides    | 1–2 weeks                                 |
| **Total**                                                                                                                              |                     | **~2.5–3 months (1 engineer, full-time)** |

> By automating wrapper and Layer 1 test generation from the Custom Elements
> Manifest, ~70% of the implementation burden is eliminated. Development effort
> is concentrated on high-value legacy adapters, integration testing, and
> migration tooling.

---

## 11. Versioning and release milestones

| Milestone                          | Version              | Description                         |
| ---------------------------------- | -------------------- | ----------------------------------- |
| Scaffolding + PoC merged           | `0.0.0-prerelease.0` | Package exists, not for consumption |
| Tier 1–2 complete                  | `0.0.0-prerelease.x` | Early adopter testing only          |
| Tier 1–5 complete, all tests green | `0.0.0-prerelease.x` | Feature complete, pre-RC            |
| v12 Release Candidate              | `1.0.0-rc.0`         | API frozen; public preview          |
| v12 GA                             | `1.0.0`              | Stable release                      |

Because the package is in the monorepo from day one as `@carbon/angular`, there
is no package-rename migration for consumers. The `0.0.0-prerelease.x` dist-tag
signals the instability period explicitly.

---

## 12. Out of scope for v1

- Schematics / `ng add` support
- i18n / localisation inputs (expose once WC layer implements them)
- Server-side rendering (Angular Universal) — WC SSR is still evolving
- DataTable virtual scroll — use CDK Virtual Scroll independently; defer to v2
- ~~TimePicker drop~~ — TimePicker is **in scope as a Tier 2 WC wrapper**
  (`cds-time-picker` confirmed in `@carbon/web-components`; Q7 closed)
- Custom WC element name registration at the `defineCustomElement` level. The
  wholesale prefix in ADR 0020 (accepted) is a different mechanism.
- Porting CCA test files verbatim (see §14 for the correct migration strategy)
- `DataGridInteractionModel` / datagrid keyboard mode — CCA-specific; complex;
  defer to v2
- CCA's `[isDataGrid]` input on Table — complex keyboard interaction model
  managed by CCA's `DataGridInteractionModel` class; the WC handles keyboard
  natively, so this input is not needed in `@carbon/angular`
- CCA's `appendInline` / `dropUp` / `scrollableContainer` positioning hacks on
  Dropdown, ComboBox — Floating UI autoalign built into the WC supersedes all of
  these

---

## 13. Test strategy

### Test coverage in sibling packages

Before defining the Angular test strategy, it is worth understanding what the
React and WC packages actually do — the Angular package should match or exceed
this baseline.

#### React package (`packages/react`)

- **Runner:** Jest + `@testing-library/react` + `@testing-library/user-event`
- **Environment:** jsdom
- **Patterns used:**
  - Snapshot testing (`toMatchSnapshot`) on every component
  - DOM role queries (`screen.getByRole`, `screen.getByText`) — Testing Library
    standard
  - ARIA attribute assertions (`toHaveAttribute('aria-label', ...)`) for
    accessibility
  - Event callback mocks (`jest.fn()`) verified after `userEvent.click()`
  - CSS class assertions (`toHaveClass(...)`) for prop → style mapping
  - Edge cases: invalid inputs, boundary conditions, disabled states

#### Web Components package (`packages/web-components`)

- **Runner:** Web Test Runner + `@open-wc/testing` (Chai assertions) +
  Playwright (real browser)
- **Patterns used:**
  - `fixture(html\`...\`)`rendering +`expect(el).dom.to.equalSnapshot()`
    snapshots
  - `expect(el).shadowDom.to.be.accessible()` — axe-core on every component
    (automated a11y)
  - Shadow DOM queries: `el.shadowRoot.querySelector(...)`
  - `await el.updateComplete` (Lit lifecycle)
  - Real-browser execution catches WC lifecycle issues jsdom misses

#### CCA (`carbon-components-angular`)

- **Runner:** Karma + Jasmine (`ng test --no-watch`)
- **~12–15 spec files** confirmed, covering the most-used components:

| Component      | `it()` cases | What is tested                                         |
| -------------- | ------------ | ------------------------------------------------------ |
| Accordion      | ~4           | Render, expand/collapse                                |
| Breadcrumb     | 3            | Render, overflow menu                                  |
| Checkbox       | 5            | Checked state, label, indeterminate event              |
| Checkbox group | 14           | Invalid, warn, readonly, helper text                   |
| ComboBox       | 13           | Selection, filtering, keyboard (ArrowDown/Escape)      |
| DatePicker     | 9            | Label, value, placeholder, format, disabled            |
| Dropdown       | 10           | Expand, selection, placeholder, ng-control integration |
| Modal          | 3            | Render, overlay click, Escape key                      |
| Pagination     | 10           | Page emit, next/prev, start/end index calc             |
| Table          | 9            | Sort, select-all, deselect-all, row select/deselect    |
| Tabs           | ~15          | Tab switching, keyboard nav, 3 spec files              |

---

### Why CCA tests cannot be ported verbatim

CCA tests assert against CCA's rendered DOM. `modal.component.spec.ts` queries
for `.cds--modal.cds--modal-tall.is-visible` — a CSS class applied by CCA's own
Angular template. In `@carbon/angular`, the Modal host is the `<cds-modal>` web
component and `.cds--modal` lives inside the WC's shadow DOM, invisible to
`fixture.debugElement.query(By.css(...))`. Similarly, the Escape-key close test
exercises logic now owned by the WC — `TestBed` does not invoke WC lifecycle in
jsdom.

**The test scenarios are reusable; the assertions must be rewritten for our API
boundary.**

---

### WC test mirroring — the primary TDD source

The WC test suite
(`packages/web-components/src/components/<name>/__tests__/<name>-test.js`) is
the **primary, authoritative source** for Layer 1 Jest test cases. For every
scenario the WC tests verify on the element itself, a corresponding Angular test
verifies that the Angular wrapper correctly forwards the same contract as a
property on the host `cds-<name>` element (ADR 0015).

#### Why the WC tests are the best TDD source

The WC tests are the canonical specification for what each component property
does. They are maintained by the Carbon team, kept in sync with every WC change,
and cover the full input/output surface. Using them as the TDD source means:

- **No duplication of specification work.** The list of props to test comes
  directly from an existing, reviewed test file rather than being inferred from
  `.d.ts` files or docs.
- **Parity is structurally enforced.** If the WC gains a new prop and a new
  test, the Angular spec immediately has a missing test — a visible gap rather
  than a silent omission.
- **The interface between the two layers is explicit.** Each Angular test is
  annotated with the WC test it mirrors
  (`// Mirrors: WC "should support a custom tabIndex through props"`), creating
  a traceable link between the two suites.

#### Why the WC tests cannot be used verbatim

The WC tests run in a real browser under Web Test Runner + Puppeteer. They use
`@open-wc/testing` (Chai assertions),
`fixture(html\`...\`)`to render real custom elements, and`el.shadowRoot.querySelector('button')`
to inspect shadow DOM. None of that is available under Jest + jsdom:

| Constraint        | WC tests                                | Angular unit tests                             |
| ----------------- | --------------------------------------- | ---------------------------------------------- |
| Runtime           | Real browser (Puppeteer)                | jsdom                                          |
| Assertion library | Chai (`to.have.attribute`)              | Jest (`toBe`, `toBeNull`)                      |
| What is inspected | `el.shadowRoot.querySelector('button')` | `nativeElement.querySelector('cds-ng-button')` |
| WC lifecycle      | Real (`customElements.define`)          | Mocked (bare `HTMLElement` stub)               |
| Shadow DOM        | Real                                    | Not available                                  |

Importing the WC tests verbatim would also be wrong by design: the Angular tests
assert a different contract. The WC tests confirm the WC renders correctly given
props; the Angular tests confirm the Angular wrapper forwards props correctly to
the WC host element. These are complementary, not redundant.

#### Translation pattern

For each WC test scenario, the Angular translation follows a fixed pattern:

```
WC:      expect(el.shadowRoot.querySelector('button')).to.have.attribute('type', 'submit')
Angular: expect(wc().getAttribute('type')).toBe('submit')
         // where wc() = fixture.nativeElement.querySelector('cds-ng-<name>')
```

Boolean/presence attributes follow the same rule:

```
WC:      expect(button).to.have.attribute('disabled')
Angular: expect(wc().getAttribute('disabled')).not.toBeNull()

WC:      expect(button).not.to.have.attribute('disabled')
Angular: expect(wc().getAttribute('disabled')).toBeNull()
```

Parametrised WC tests (e.g. `kinds.forEach(...)`, `sizes.forEach(...)`) become
equivalent `forEach` loops in the Angular spec so coverage is identical.

#### Reference implementation

`Button.spec.ts` is the reference. It covers every scenario from
`packages/web-components/src/components/button/__tests__/button-test.js`,
annotated with `// Mirrors: WC "..."` comments that link each Angular test back
to its WC counterpart.

---

### Three-layer test strategy

`@carbon/angular` adopts three test layers that together match the coverage of
the React and WC packages:

#### Layer 1 — Jest unit tests (API boundary)

**Runner:** Jest + `jest-preset-angular`, jsdom environment — consistent with
`packages/react`.

Tests the Angular wrapper's responsibility: input reflection, output emission,
slot materialisation, and CVA integration. WC Lit lifecycle does not run in
jsdom; these tests confirm the Angular layer is wired correctly without
depending on WC render output.

Four test patterns, one file per component:

```ts
// 1. Input → WC attribute reflection
it('should reflect [disabled] to the cds-ng-modal element', () => {
  component.disabled = true;
  fixture.detectChanges();
  const wc = fixture.nativeElement.querySelector('cds-ng-modal');
  expect(wc.hasAttribute('disabled')).toBeTrue();
});

// 2. WC custom event → @Output() emission
it('should emit (close) when cds-modal-closed fires on the WC', () => {
  const spy = jest.fn();
  component.close.subscribe(spy);
  fixture.nativeElement
    .querySelector('cds-ng-modal')
    .dispatchEvent(new CustomEvent('cds-modal-closed', { bubbles: true }));
  expect(spy).toHaveBeenCalled();
});

// 3. Slot materialisation
it('should render one cds-ng-dropdown-item per [items] entry', () => {
  component.items = [{ label: 'A' }, { label: 'B' }, { label: 'C' }];
  fixture.detectChanges();
  const items = fixture.nativeElement.querySelectorAll('cds-ng-dropdown-item');
  expect(items.length).toBe(3);
});

// 4. CVA — writeValue propagates to WC
it('should set the value attribute on the WC when writeValue is called', () => {
  component.writeValue('option-a');
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('cds-ng-dropdown').value).toBe(
    'option-a'
  );
});
```

**Coverage target:** Every confirmed CCA `it()` scenario has an equivalent Jest
test rewritten for the API boundary. Minimum of ~100 `it()` cases across the
component set.

#### Layer 2 — Playwright integration tests (real browser, WC lifecycle)

**Runner:** Playwright, consistent with `packages/web-components`. Run against
the Angular package's Storybook build.

Tests that require WC lifecycle to execute — keyboard navigation, focus
restoration, calendar open/close, datepicker range selection. These cannot run
in jsdom.

```ts
// Example: Dropdown keyboard navigation
test('opens on ArrowDown and closes on Escape', async ({ page }) => {
  await page.goto(storybookUrl('cds-dropdown--default'));
  const dropdown = page.locator('cds-dropdown');
  await dropdown.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('cds-ng-dropdown[open]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('cds-ng-dropdown[open]')).not.toBeVisible();
});
```

**Coverage target:** One Playwright test file per Tier 3–4 component (Modal,
ComboBox, Tabs, Accordion, DataTable, DatePicker).

#### Layer 3 — Storybook accessibility (IBM Equal Access)

**Runner:** `storybook-addon-accessibility-checker` (IBM Equal Access) +
`@storybook/test` `play()` functions.

Every component story includes a `play()` function that exercises the primary
interactive scenario, so the IBM Equal Access checker runs against a live,
interacted-with component state rather than a static initial render.

`@storybook/addon-a11y` (axe-core) is **not included**. IBM Equal Access is the
canonical accessibility standard for IBM products and covers a broader WCAG rule
set.

---

### Coverage target summary

| Layer          | Runner                                                     | What it covers                                               | Target                   |
| -------------- | ---------------------------------------------------------- | ------------------------------------------------------------ | ------------------------ |
| Jest unit      | jsdom                                                      | Input reflection, output emission, slot materialisation, CVA | ~100+ `it()` (≥ CCA)     |
| Playwright     | Real browser                                               | Keyboard nav, focus, WC lifecycle interactions               | ~30 scenarios (Tier 3–4) |
| Storybook a11y | IBM Equal Access (`storybook-addon-accessibility-checker`) | Accessibility on every component story                       | All components           |

---

### Package file structure

```text
packages/angular/
├── src/
│   ├── generated/                     # Automated 1:1 WC wrappers (gitignored)
│   │   ├── Button/
│   │   └── Modal/
│   ├── stories/                       # Storybook stories and test suites
│   │   └── Button/
│   │       ├── __stories__/
│   │       │   ├── Button.mdx
│   │       │   └── Button.stories.ts
│   │       └── __tests__/
│   │           ├── Button.e2e.ts
│   │           └── Button.spec.ts
│   └── index.ts                       # Public API barrel (exports generated)
├── legacy/                            # Secondary entry point (@carbon/angular/legacy)
│   ├── src/
│   │   ├── components/                # Hand-crafted CCA migration adapters (@deprecated)
│   │   │   ├── Button/
│   │   │   └── Dropdown/
│   │   └── index.ts
│   └── ng-package.json
```

Storybook `play()` functions live in the story file alongside the component
story.

---

## 14. Migration guide structure (per breaking change)

Every intentional break in the package's changelog should follow this format:

```markdown
## BREAKING: <short description>

**Before (carbon-components-angular):** <old code>

**After (@carbon/angular):** <new code>

**Why:** <one sentence — the removed dependency or type mismatch that makes the
old API unmaintainable>

**Migration:** <exact find-and-replace or one-line change>
```

---

## 15. Open questions

1. ~~**DatePicker `(onChange)` type**~~ — **Closed.** PR #22728 (merged Aug 5)
   ships the Preview DatePicker (`cds-preview-date-picker`). The WC event detail
   is `{ selectedDates: Temporal.PlainDate[], value: string }`. The Angular
   `(onChange)` output type is
   `{ selectedDates: Temporal.PlainDate[], value: string }` — not `string[]` and
   not `Date[]`. `[value]` CVA input/output is `string`. See §8 for the full
   mapping.

2. **Storybook Compodoc integration** — whether to generate API docs from
   Angular `@Input`/`@Output` decorators via Compodoc, or rely solely on
   Storybook ArgTypes.

3. **Secondary entry points** — whether to configure per-component secondary
   entry points in `ng-package.json` (e.g. `@carbon/angular/button`) for more
   granular tree-shaking, or rely on the single barrel export and let the
   consumer's bundler tree-shake from there. Deferred to v1 release; Ivy +
   modern bundlers handle single-barrel packages well.

4. ~~**StructuredList**~~ — **Closed.** Wrap `cds-structured-list` (WC
   equivalent exists). Preserve `selection`, `flushed`, `condensed` inputs and
   `(selected)` output from CCA. CVA accepts `any`. See Tier 5 table in §6.

5. ~~**`feat/wc-class-exports` merge timeline**~~ — **Closed.** PR #23097 merged
   to `main` (commit `dd87f84`). `defineCustomElement` is available now; pin the
   `@carbon/web-components` peer dep to the first release that includes it. No
   `git:` branch dep needed. Note: v3 pure class exports (side-effect-free class
   files) are not yet in main; until then the subclass fallback in
   `defineCustomElement` handles the transitional period cleanly.

6. **Selector prefix decision** — **Closed 2026-10-27: wholesale `cds-ng-*` (ADR
   0020, accepted).** Previously closed as `cds-*` Angular selectors with
   `cds-ng-*` internal tags; ADR 0015 replaced the internal tags with host-is-WC
   under the real tag, and ADR 0020 replaced the real tag with a wholesale
   `cds-ng-*` prefix. The coexistence spike (`spikes/coexistence-spike.md`) ran
   for the Modal and the Dropdown and supports it.

7. ~~**TimePicker — port forward or drop?**~~ — **Closed.** `cds-time-picker`
   exists in `@carbon/web-components` with full feature parity: `disabled`,
   `invalid`, `invalid-text`, `warning`, `warning-text`, `hide-label`,
   `label-text`, `placeholder`, `read-only`, `max-length`, `pattern`, `size`,
   `value`, `name`, `required`, and a `cds-time-picker-select` companion
   element. It fires a native `change` event with `{ value: string }`. The
   Angular wrapper is a **thin WC wrapper** (Tier 1/2), not a pure-Angular port.
   CCA's `[pattern]`, `[maxLength]`, `[size]`, `[invalid]`, `[placeholder]`
   inputs all have direct WC attribute equivalents. Move TimePicker out of Tier
   5 into **Tier 2** (slot materialisation — the `time-picker-select` slot needs
   Angular projection).

8. ~~**Slider CVA range mode type**~~ — **Closed.** Verified from
   [`packages/web-components/src/components/slider/slider.ts`](../../web-components/src/components/slider/slider.ts):

   - Single-handle mode: `value` property (`number`)
   - Two-handle mode: `value` (lower, `number`) + `unstable_valueUpper` (upper,
     `number`, WC attribute `value-upper`)
   - `cds-slider-changed` fires **one event per thumb** with
     `{ value: number, intermediate?: boolean }`. There is no single event
     carrying both handles — each thumb dispatches independently.
   - **Angular CVA decision:** CVA `value` type is `number` for single mode and
     `[number, number]` for range mode. The Angular wrapper listens to
     `cds-slider-changed` on both thumbs, reads `this.value` and
     `this.unstable_valueUpper` from the WC element, and emits the full tuple to
     `onChange`. `writeValue` sets `value` for single mode or
     `[value, value-upper]` for range mode. The `unstable_` prefix signals WC
     intent to stabilise the API — bind to it but document the caveat and watch
     for a stable rename.

9. ~~**Carbon for IBM Products scope integration**~~ — **Closed.** Per ADR 0009
   ([`docs/decisions/0009-ibm-products-to-core-migration.md`](../../../docs/decisions/0009-ibm-products-to-core-migration.md)),
   high-value IBM Products components are merged directly into `@carbon/react`
   and `@carbon/web-components`. `@carbon/angular` wraps these elements natively
   as part of the core library, providing single-package consumption without a
   separate `@carbon/ibm-products-angular` package.

10. **Supported Angular major versions** — **Accepted: floor of Angular 19.**
    ADR 0018 sets a peer floor of `>=19`, built and tested against Angular 19
    and the latest major, aligning the library build toolchain with the lowest
    supported major and covering over 92% of active consumer metrics. It also
    allows dropping explicit `standalone: true`. Tracked in
    [`docs/decisions/0018-angular-supported-major-versions.md`](../../../docs/decisions/0018-angular-supported-major-versions.md).

---

## 16. Migration support

### Overview

Migration from `carbon-components-angular` (CCA) to `@carbon/angular` involves
three components: a **migration guide** (per breaking change), **codemods**
(automated transforms via `@carbon/upgrade`), and a **runtime diagnostic**
(`:not(:defined)` detection for un-registered WC elements). Together they match
the migration quality bar set by the WC v3 migration in PR #23097.

### Migration guide

The guide lives at `docs/guides/cca-to-angular.md` (parallel to
`docs/guides/cwc-v3-migration.md`). It is structured exactly as §14 specifies —
one `## BREAKING:` block per intentional API break, with Before/After code, Why,
and Migration steps. The guide is linked from `packages/angular/README.md` and
the Storybook welcome MDX.

The CCA → `@carbon/angular` breaks are documented in the universal-breaks table
in §7. In guide format each becomes a standalone entry. High-priority entries
(those affecting the most consumers):

1. **Selector** — ADR 0014 keeps `cds-*` for element selectors, but the Button
   is an attribute directive in CCA (`<button cdsButton>`) and becomes an
   element. The module path changes from `carbon-components-angular` to
   `@carbon/angular`. ADR 0020 (accepted) uses `cds-ng-*` instead.
2. **`TableModel` / `TableHeaderItem` / `TableItem` removed** — replace with
   flat `[rows]`, `[headers]`, `[size]` inputs.
3. **`notificationObj` removed** on Toast, Inline, ActionableNotification —
   replace with flat `[title]`, `[subtitle]`, `[caption]` inputs.
4. **`PaginationModel` removed** on Pagination — replace with `[totalItems]`,
   `[pageSize]`, `[page]`.
5. **`[navigationItems]` / `[menuItems]` / `[headerItems]` removed** on UI Shell
   — replace with projected children (`<cds-header-nav-item>`, etc.).
6. **`[theme]` removed** on CodeSnippet, ComboBox, DatePicker, Dropdown, etc. —
   use global Carbon theme via `@carbon/styles` body class or `CarbonTheme`
   service.
7. **`appendInline` / `dropUp` / `scrollableContainer`** removed on Dropdown,
   ComboBox — Floating UI autoalign built into the WC supersedes them; no
   replacement needed.
8. **`carbonElement` import** — not a CCA break but relevant for consumers who
   used it from the WC package. Migrate to `static is` + `defineCustomElement`
   (Option B in `docs/guides/cwc-v3-migration.md`).

### Codemods

`@carbon/upgrade` is the established codemod host for this monorepo. Angular
migration transforms go in `packages/upgrade/transforms/` and are registered in
`packages/upgrade/src/upgrades.js`.

**Model:** The WC codemods from PR #23097 establish the exact conventions to
follow:

| Convention              | WC precedent                        | Angular equivalent           |
| ----------------------- | ----------------------------------- | ---------------------------- |
| Shared detection helper | `carbon-wc-imports.js`              | `carbon-angular-imports.js`  |
| Report-first transform  | `wc-report-non-barrel-imports.js`   | `cca-report-breaking-api.js` |
| Write transform         | `wc-add-barrel-imports.js`          | `cca-migrate-*` transforms   |
| Parser                  | `module.exports.parser = 'tsx'`     | same                         |
| UX                      | dry-run default; `--write` to apply | same                         |

**Proposed transform inventory** (7 transforms):

| Transform name                | Type   | What it does                                                                                                   |
| ----------------------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| `cca-report-imports`          | report | Lists all `carbon-components-angular` imports; shows the `@carbon/angular` equivalent module path              |
| `cca-update-module-imports`   | write  | Rewrites `carbon-components-angular` import sources to `@carbon/angular`                                       |
| `cca-remove-table-model`      | write  | Replaces `TableModel` constructor + `[model]` binding with flat `[rows]`/`[headers]` inputs                    |
| `cca-remove-notification-obj` | write  | Replaces `notificationObj` object literal binding with flat prop inputs                                        |
| `cca-remove-pagination-model` | write  | Replaces `PaginationModel` binding with flat `[totalItems]`/`[pageSize]`/`[page]` inputs                       |
| `cca-remove-theme-input`      | write  | Removes `[theme]="theme"` bindings (no replacement; body-class theming)                                        |
| `cca-report-ui-shell-nav`     | report | Flags `[navigationItems]`/`[menuItems]` array bindings that require manual restructuring to projected children |

Note: `cca-report-ui-shell-nav` is report-only because restructuring template
slots is not safely automatable — it requires generating child element subtrees
from data arrays.

**Registering in `upgrades.js`:**

Each transform is registered as a named migration. Following the WC pattern from
`packages/upgrade/src/upgrades.js`:

```js
// packages/upgrade/src/upgrades.js
{
  name: 'cca-update-module-imports',
  description: 'Update carbon-components-angular imports to @carbon/angular',
  // ...
}
```

**Running codemods:**

```sh
# See what needs changing (dry run)
npx @carbon/upgrade migrate cca-report-imports

# Apply import path rewrite
npx @carbon/upgrade migrate cca-update-module-imports --write

# Apply flat-input migrations
npx @carbon/upgrade migrate cca-remove-table-model --write
npx @carbon/upgrade migrate cca-remove-notification-obj --write
npx @carbon/upgrade migrate cca-remove-pagination-model --write
npx @carbon/upgrade migrate cca-remove-theme-input --write

# Review UI Shell (manual restructuring required)
npx @carbon/upgrade migrate cca-report-ui-shell-nav
```

### Runtime diagnostic

The WC v3 migration guide (`docs/guides/cwc-v3-migration.md`) notes that a
Carbon element matching `:not(:defined)` at runtime means it was never
registered. The same signal applies to `@carbon/angular` development: an
unregistered `<cds-*>` element indicates a missing registration call in the
wrapper component.

For consumer migration, the equivalent runtime check is `<cds-*>`:

```js
// In browser devtools or an integration test:
document
  .querySelectorAll('cds-*:not(:defined)')
  .forEach((el) => console.warn('Un-upgraded Carbon element:', el.tagName));
```

This is a useful sanity check during migration and can be added to integration
test setup.

### Relationship to `create-prefixed-build`

`create-prefixed-build` (shipped in PR #23097) is not part of the
`@carbon/angular` migration path. Under ADR 0015, `@carbon/angular` registers
the real `cds-*` tags and does conflict with a separately loaded
`@carbon/web-components`; ADR 0020 (accepted) uses a prefix that avoids it.

It _is_ relevant when a consumer runs both bare `@carbon/web-components` and
`@carbon/angular` on the same page (e.g. a shell built with bare WC and an
embedded micro-frontend built with Angular). In that case,
`create-prefixed-build` can resolve the name conflict at build time:

```sh
npx -p @carbon/web-components create-prefixed-build --prefix shell --out ./vendor/carbon-shell
```

The migration guide should mention this as the supported coexistence path,
linking to
`docs/guides/cwc-v3-migration.md#a-prefixed-build-for-the-whole-package`.
