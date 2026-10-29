# `@carbon/angular` — Planning Document

> **Update 2026-10-26: `@carbon/angular/legacy` has been abandoned and removed
> from the repository.** The reasons recorded by the maintainers: migration is
> not trivial even with adapters, and adapters create a two-step migration. The
> package is a single automated entry point. Sections were corrected on
> 2026-10-28. Any remaining mention of `@carbon/angular/legacy`, `cca-to-legacy`
> or "legacy adapters" is historical. Current state:
> [`status-and-open-questions.md`](./status-and-open-questions.md) and
> [`migration-support.md`](./migration-support.md).
>
> **Update 2026-10-28: decisions recorded.**
>
> - `@carbon/angular` is **not behind a feature flag**. It is new in v12 and
>   gets a separate migration guide for CCA users
>   (`docs/guides/cca-to-angular.md`, not yet written). Whether
>   `docs/migration/v12.md` also gets a short entry is undecided.
> - `@carbon/web-components` is no longer a peer dependency (ADR 0020).
> - **No convenience components in core.** Migration support is codemods plus
>   agent skills. The first release has full `@carbon/web-components` coverage,
>   so the scope freeze waits for the components still merging from Carbon for
>   IBM Products.
> - The manifest moves to the Custom Elements Manifest when the dev lead's PR
>   lands.
> - No classic or fluid Date Pickers until the web components have a fluid
>   picker without flatpickr.
> - The generator does not emit stories or tests. They are hand-written, and the
>   `storybook:parity` check was dropped.
> - Angular 19+ is the floor (ADR 0018).
> - **Follow-up PRs.** The first PR does not wait for the scope freeze (the
>   three web components still merging) and does not include migration tooling.
>   Both are future PRs; see "Follow-up PRs" in
>   [`milestones.md`](./milestones.md).
>
> See [`milestones.md`](./milestones.md) for where each decision lands.

**Status:** In progress. 296 generated wrappers, 97 secondary entry points, 7
components ported with stories and tests. **Last updated:** 2026-10-28
**Location in monorepo:** `packages/angular/` **Package name:**
`@carbon/angular` **Versioning:** `0.0.0-prerelease.0` → `1.0.0-rc.0` (v12 RC) →
`1.0.0` (v12 GA) **Component selector prefix:** `cds-ng-*` (selector and web
component tag, ADR 0020, accepted 2026-10-27).

> **How to read this document.** It began as a pre-implementation plan. Sections
> were corrected on 2026-10-28 to match the code. Where a section still
> describes the earlier design (hand-written tiers, `cds-*` selectors,
> `@carbon/angular/legacy`), it carries a note saying so. Element names written
> as `cds-<name>` in tables are **web component** names; the Angular selector is
> `cds-ng-<name>`.

---

## Architecture: single automated entry point

`@carbon/angular` is generated automatically from `@carbon/web-components`:

- Pure 1:1 Angular wrappers generated from the `@carbon/web-components` manifest
  (`custom-elements.json` today; the standard Custom Elements Manifest once the
  dev lead's PR lands).
- Covers 110+ component families, currently 296 generated wrappers, with zero
  manual adapter lag. The first release must cover every
  `@carbon/web-components` component (decided 2026-10-28).
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

### Component coverage: ~35 → 110+ (296 generated wrappers)

| Category                                | CCA     | @carbon/angular | Notes                                                                                                                                                                                                                                                      |
| --------------------------------------- | ------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Core components                         | ~35     | ~45             | Feature-extended parity on all core primitives                                                                                                                                                                                                             |
| Fluid form variants                     | —       | **12**          | Full-width condensed forms: text-input, textarea, number-input, password-input, search, select, dropdown, combo-box, multi-select, time-picker + fluid-form wrapper                                                                                        |
| AI component family                     | —       | **6**           | ai-label, ai-skeleton (text/icon/placeholder), slug (deprecated alias)                                                                                                                                                                                     |
| UI Shell                                | Partial | **19**          | Complete header + side-nav + switcher family                                                                                                                                                                                                               |
| Display, layout & primitives            | —       | **11**          | combo-button, password-input, copy-button, tree-view, pagination-nav, contained-list, stack, heading, options-tile, etc.                                                                                                                                   |
| **Enterprise & Product (IBM Products)** | —       | **26+**         | PageHeader, Tearsheet, SidePanel, Card system, Coachmark, ActionSet, Dialog, InterstitialScreen, EditInPlace, FullPageError, GuideBanner, NotificationsPanel, Resizer, TruncatedText, UserAvatar, BigNumber, BadgeIndicator, IconIndicator, ShapeIndicator |

### New capabilities on existing components

| Capability                              | CCA     | @carbon/angular  | Detail                                                                                                                       |
| --------------------------------------- | ------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| AI Label decoration                     | ✗       | ✓                | `<cds-ng-ai-label>` slot on Button, Dropdown, DataTable rows, Tag — marks AI-generated content with a built-in revert action |
| Fluid form variants                     | ✗       | ✓                | 12 full-width condensed variants; each inherits every property from its standard counterpart                                 |
| Warn state on inputs                    | ✗       | ✓                | `warn` / `warnText` distinct from `invalid` across all form components                                                       |
| Native form participation               | ✗       | ✓                | WC elements are `formAssociated`; work inside `<form>` natively; Angular layer adds CVA on top                               |
| Floating UI autoalign                   | ✗       | ✓                | Tooltip, Popover, Dropdown flip intelligently at viewport edges via `@floating-ui/dom`                                       |
| Layer / theming context                 | ✗       | ✓                | `cds-layer` propagates level-0/1/2 CSS tokens; child components automatically use the correct background and field tokens    |
| Locale-aware DataTable sort             | ✗       | ✓                | `Intl.Collator` with configurable `locale` and pluggable `collator`; custom `filterRows` fn                                  |
| DataTable AI label rows                 | ✗       | ✓                | `withRowAILabels` — per-row AI provenance indicator                                                                          |
| DataTable radio selection               | ✗       | ✓                | `radio` prop for single-select mode alongside existing checkbox mode                                                         |
| DataTable `xs` / `xl` sizes             | ✗       | ✓                | Two additional size variants beyond the existing sm/md/lg                                                                    |
| ComboBox typeahead                      | ✗       | ✓ (experimental) | `typeahead` prop; `allowCustomValue` for free-text entry; custom `shouldFilterItem` fn                                       |
| MultiSelect `selectAll`                 | ✗       | ✓                | Built-in select-all checkbox; `selectionFeedback` modes (top / fixed / top-after-reopen)                                     |
| Pagination i18n formatters              | ✗       | ✓                | All label text exposed as format callbacks (`formatLabelText`, `formatStatusWithDeterminateTotal`, etc.)                     |
| Pagination unknown total                | ✗       | ✓                | `pagesUnknown` mode for open-ended data sets                                                                                 |
| Notification auto-dismiss               | ✗       | ✓                | `timeout` (ms) on inline and toast notifications                                                                             |
| Notification low contrast               | ✗       | ✓                | `lowContrast` mode                                                                                                           |
| Tooltip autoalign + delays              | ✗       | ✓                | `autoalign`, configurable `enterDelayMs` / `leaveDelayMs`, `keyboardOnly` activation, `closeOnActivation`                    |
| Button link mode                        | Partial | ✓                | Full `href`, `download`, `rel`, `target`, `ping`, `hreflang` support                                                         |
| Button built-in tooltip                 | ✗       | ✓                | `tooltipText`, `tooltipAlignment`, `tooltipPosition`, `openTooltip` — no wrapper element needed                              |
| Modal `alert` / `fullWidth`             | ✗       | ✓                | `alert` mode; `fullWidth`; `shouldSubmitOnEnter`                                                                             |
| Accordion `isFlush` / `alignment`       | ✗       | ✓                | Flush text mode; chevron start/end alignment; `size` cascades to children                                                    |
| Tab `secondaryLabel` / `badgeIndicator` | ✗       | ✓                | Secondary label on contained tabs; badge dot per tab (experimental)                                                          |
| DatePicker `enabledRange`               | ✗       | ✓                | Date range constraint; `allowInput`, `closeOnSelect`, `open` (programmatic), `name` (form)                                   |

### Platform-level gains

| Capability                          | CCA | @carbon/angular                                                          |
| ----------------------------------- | --- | ------------------------------------------------------------------------ |
| Standalone components (no NgModule) | ✗   | ✓ Angular 19+ throughout; import from a per-family secondary entry point |
| IBM Equal Access a11y (automated)   | ✗   | ✓ Checker runs on stories; only Button has `play()` functions so far     |
| In-monorepo versioning              | ✗   | ✓ Ships with the Carbon v12 release cycle; no independent lag            |

### Migration cost — intentional API breaks

Deliberate breaks from CCA, identified from CCA source inspection. The per-break
detail is planned for the migration guide (§14, §16):

| Break                                                                  | Old                                                                           | New                                                                     | Reason                                                              |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------- |
| DatePicker (classic and fluid)                                         | `ibm-date-picker` with Flatpickr                                              | Not wrapped. Only `cds-ng-preview-date-picker` (ADR 0021)               | No flatpickr; wait for a fluid picker in the web components         |
| Composition model                                                      | Explicit child components (`ibm-modal-header`, `ibm-date-picker-input`, etc.) | Flat `@Input()` + `ng-content`                                          | WC internalises slot structure                                      |
| NgModule imports                                                       | `ButtonModule` from `carbon-components-angular`                               | `ButtonComponent` from `@carbon/angular/button` (standalone)            | No barrel NgModules (ADR 0012)                                      |
| Per-component `theme` input                                            | `[theme]="'white'"` on 12+ components                                         | Global CSS custom properties                                            | Theming is a CSS concern                                            |
| `[flatpickr]` / `[plugins]` input                                      | Raw Flatpickr config                                                          | Dropped; individual props instead                                       | Unmaintainable coupling                                             |
| Pagination event shape                                                 | `{page: {number, length}}`                                                    | Raw WC `CustomEvent` (`(paginationChangedCurrent)`)                     | The wrapper re-emits the event unchanged                            |
| Pagination model input                                                 | `[model]: PaginationModel`                                                    | Flat `[totalItems]`, `[page]`, `[pageSize]`                             | `PaginationModel` conflates page state and data; WC uses flat props |
| Tabs / Accordion items API                                             | `[tabs]="[{label, content}]"` array                                           | Projected child components                                              | Array API blocks rich template content                              |
| `DataTableModel` / `TableHeaderItem` / `TableItem` classes             | Mutable classes; `TableItem.template` per cell                                | Projected `cds-ng-table-*` children. No `[rows]` input (not built)      | Classes caused CD conflicts with WC sort/select                     |
| UI Shell navigation arrays                                             | `[navigationItems]`, `[menuItems]`, `[headerItems]` arrays                    | Projected `<cds-ng-header-nav-item>`, `<cds-ng-side-nav-link>` children | Arrays prevent `routerLink`/`routerLinkActive` in slot content      |
| `notificationObj` model input                                          | `notificationObj: NotificationContent / ActionableContent / ToastContent`     | Flat `title`, `subtitle`, `caption`, `kind` inputs                      | Object input is an unnecessary indirection over flat WC props       |
| `appendInline` / `dropUp` / `scrollableContainer` on Dropdown/ComboBox | Manual positioning hacks                                                      | Dropped                                                                 | Floating UI autoalign in the WC supersedes all of these             |
| `[isDataGrid]` on DataTable                                            | `DataGridInteractionModel` keyboard mode                                      | Deferred to v2                                                          | Complex keyboard interaction model; WC handles keyboard natively    |

---

## 1. Overview

`@carbon/angular` is a new package in the Carbon monorepo (`packages/angular/`)
that provides Angular components wrapping `@carbon/web-components` custom
elements. Each wrapper maps one web component 1:1. It does not try to preserve
the `carbon-components-angular` API surface (ADR 0020, 2026-10-26): migration is
a single move supported by codemods and agent skills, not by compatibility
adapters.

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
animation, form participation. The Angular layer owns only three things, and the
generator emits all of them:

1. **Property reflection** — forwarding camelCase `@Input()` values to the host
   web component as properties in `ngOnChanges`
2. **Event normalisation** — listening to WC custom events and re-emitting them
   as typed `@Output()` emitters
3. **Forms** — a `ControlValueAccessor` on form-associated elements (28
   wrappers)

There is no `[items]` / `[rows]` array materialisation and no hand-written
compound adapter in core (decided 2026-10-28). Consumers compose the web
components as slotted children.

---

## 2. Package structure

```
packages/angular/                       ← @carbon/angular
├── package.json                        ← version 0.0.0-prerelease.0; peers: Angular >=19, @carbon/styles
├── angular.json                        ← Storybook builders
├── tasks/
│   ├── generate-wrappers/              ← manifest -> src/generated (gitignored)
│   └── build-entries/                  ← src/generated -> .entries (gitignored)
├── src/
│   ├── generated/                      ← 281 wrapper folders, one per element
│   ├── stories/<Name>/                 ← hand-written stories, specs, e2e (7 components)
│   ├── __tests__/                      ← generator and registration specs
│   └── testing/                        ← test render helper
├── .storybook/                         ← main.ts, preview.ts, docs/*.mdx
├── docs/                               ← this document, milestones, status
└── .entries/                           ← build output (gitignored)
    ├── vendor/                         ← `cds-ng` prefixed copy of @carbon/web-components
    ├── index.ts                        ← root entry; `export {}`
    └── <entry>/                        ← 97 secondary entry points, each with ng-package.json
```

`build-entries` groups the generated wrappers into secondary entry points (for
example `@carbon/angular/button`, `@carbon/angular/modal`) and vendors a
prefixed copy of `@carbon/web-components` that they import through the
`#carbon-ng/*` path alias. `ng-packagr` then builds `.entries/` as one package
with many entry points. The root entry is side-effect free and exports nothing,
so consumers always import from a secondary entry. There is no
`@carbon/angular/legacy` (removed 2026-10-26).

---

## 3. Naming conventions

| Framework      | Package name             | Component selector    |
| -------------- | ------------------------ | --------------------- |
| React          | `@carbon/react`          | `<Button />`          |
| Web Components | `@carbon/web-components` | `<cds-button>`        |
| **Angular**    | **`@carbon/angular`**    | **`<cds-ng-button>`** |

Angular ships one package for all components. This is intentional — Angular's
compilation model (Ivy, partial compilation, APF) is best served by a single
`ng-packagr` project rather than dozens of independent packages.

### Selector prefix: `cds-ng-*`

`carbon-components-angular` (CCA) uses `cds-*` selectors (migrated from
`ibm-*`), and `@carbon/web-components` registers `cds-*` tags. A wrapper that
reused `cds-*` would collide with both. ADR 0020 (accepted 2026-10-27) therefore
applies one prefix, `cds-ng-*`, to every wrapper selector **and** to the web
component it hosts, so `@carbon/angular` can load next to CCA or a separately
loaded `@carbon/web-components` on the same page. The coexistence spike
(`spikes/coexistence-spike.md`) ran the Modal and the Dropdown to confirm it.

The rename from CCA is mechanical for most components:

| Component  | CCA selector     | `@carbon/angular` selector |
| ---------- | ---------------- | -------------------------- |
| Button     | `[cdsButton]`    | `cds-ng-button`            |
| Checkbox   | `cds-checkbox`   | `cds-ng-checkbox`          |
| ComboBox   | `cds-combo-box`  | `cds-ng-combo-box`         |
| Dropdown   | `cds-dropdown`   | `cds-ng-dropdown`          |
| Modal      | `cds-modal`      | `cds-ng-modal`             |
| Pagination | `cds-pagination` | `cds-ng-pagination`        |
| Tab        | `cds-tab`        | `cds-ng-tab`               |
| Tabs       | `cds-tabs`       | `cds-ng-tabs`              |

The Button is the exception. In CCA it is an attribute directive on a native
`<button>`, and here it becomes an element. See
[`migration-support.md`](./migration-support.md) for the full mapping.

---

## 4. Toolchain decisions

| Decision          | Choice                                                       | Rationale                                                                                                                                            |
| ----------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build tool        | `ng-packagr`                                                 | Produces Angular Package Format (APF); correct `esm2022` + `fesm2022` outputs; Ivy-compatible; required for Angular CLI prod builds and lazy loading |
| Module style      | Standalone components                                        | Default on Angular 19+; the generated `standalone: true` is redundant and is being removed (ADR 0018)                                                |
| WC schema         | None. The host element is the web component                  | No `CUSTOM_ELEMENTS_SCHEMA` in wrappers or stories (ADR 0019)                                                                                        |
| Storybook         | `@storybook/angular`                                         | Separate port; see §5                                                                                                                                |
| Testing           | Jest + `jest-preset-angular`; Playwright against Storybook   | Layer 1 and Layer 2 in §13                                                                                                                           |
| Forms integration | `ControlValueAccessor`                                       | Generated for form-associated elements; required for `[formControl]` / `[(ngModel)]`                                                                 |
| WC registration   | Wholesale `cds-ng` prefixed copy of `@carbon/web-components` | Built by `create-prefixed-build` during `build-entries`; no runtime renaming (ADR 0020)                                                              |
| Change detection  | Property forwarding in `ngOnChanges`                         | Not yet verified under OnPush. Wrappers do not call `markForCheck()`                                                                                 |

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

**Problem.** `carbon-components-angular` renders its own DOM and uses `cds-*`
selectors. `@carbon/web-components` registers the same `cds-*` tags. A wrapper
that used `cds-*` and hosted the real web component would clash with both, and
Angular would match `<cds-modal>` inside the wrapper's own template.

**History.** Three designs were tried, in order:

1. An inner `cds-ng-*` element inside a `cds-*` wrapper.
2. ADR 0015: the host element IS the web component, registered under the real
   `cds-*` tag with `defineCustomElement`. This broke composites. The generated
   code imported `modal.js`, which registers only `CDSModal`, so `cds-dialog`,
   `cds-modal-header` and the other elements the modal renders were never
   defined (ADR 0020 finding 2).
3. **ADR 0020 (accepted 2026-10-27), current:** one prefix, `cds-ng-*`, applied
   to the wrappers and to a prefixed copy of the web components.

**Current mechanism.** `tasks/build-entries/index.js`:

- runs `create-prefixed-build --prefix cds-ng` over `packages/web-components/es`
  into `.entries/vendor`, and filters it to what the wrappers import. The
  `--cds` custom properties are kept, so theming stays shared with
  `@carbon/styles`;
- regroups the wrappers into one secondary entry point per web component folder
  and rewrites those **copies** in `.entries/` so each selector and each import
  use the prefix. `src/generated/` is not changed: it keeps `cds-*` selectors
  and the `@carbon/web-components` import. Jest specs run against it, while
  Storybook, Playwright and the published package use the `cds-ng-*` copies;
- imports the web component's **folder barrel** (`components/<name>/index.js`),
  which registers the element and every child it renders.

Each wrapper therefore registers its web component as a side effect of its own
import, and a consumer never imports a web component directly.

`@carbon/web-components` is **not a peer dependency**. The prefixed copy is part
of the published package (peer removed 2026-10-28). `@carbon/styles` is a peer
because the components read about 24,600 `var(--cds-*)` references and import no
stylesheet; without it the tokens are empty.

**`defineCustomElement` and `create-prefixed-build`.** Both shipped with
`@carbon/web-components` v3 (PR #23097, commit `dd87f84`).
`defineCustomElement(clazz, { name?, registry? })` is the public registration
API (ADR 0007). `create-prefixed-build` is the supported way to run two full
copies of Carbon on one page. `@carbon/angular` uses the latter.

**Manifest.** The generator reads
`packages/web-components/custom-elements.json`, the standard Custom Elements
Manifest that replaced the deprecated WCA format in #23872.

### Generated wrapper shape

What ends up in `.entries/` for the Button, abbreviated, after `build-entries`
has applied the prefix:

```ts
import '#carbon-ng/components/button/index.js';

@Component({
  selector: 'cds-ng-button',
  template: `<ng-content />`,
  encapsulation: ViewEncapsulation.None,
  standalone: true, // redundant on Angular 19+; to be removed (ADR 0018)
})
export class ButtonComponent implements OnChanges {
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input() kind: string = 'primary';
  // ...one @Input per manifest attribute or property

  ngOnChanges(changes: SimpleChanges): void {
    for (const key of Object.keys(changes)) {
      if (PROPERTY_INPUTS.has(key)) {
        (this._el.nativeElement as any)[key] = changes[key].currentValue;
      }
    }
  }
}
```

Selector === web component tag. There is no inner element, no
`CUSTOM_ELEMENTS_SCHEMA` and no `es-custom`. `@Output()` emitters are generated
only for custom events the manifest declares, not for native DOM events, so a
native `click` is consumed as `(click)`. Components that need it also get a
`ControlValueAccessor` provider.

**Registration coverage audit.** PR #23097 also shipped
`packages/web-components/tasks/registration-coverage.mjs`, which fails if a
component renders an element its barrel cannot register.
`src/__tests__/child-registration.spec.ts` checks the same contract from the
Angular side.

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

The sidebar follows ADR 0006 and ADR 0009: migrated IBM Products components sit
alongside core components alphabetically, with no separate product group.
`.storybook/preview.ts` sets the order:

```ts
storySort: {
  method: 'alphabetical',
  order: [
    'Introduction',
    ['Welcome', 'Migration', 'Form Participation', 'Component Registration'],
    'Components',
    'Utilities',
    'Examples',
  ],
},
```

Only `Welcome` and `Migration` exist today (`.storybook/docs/welcome.mdx`,
`.storybook/docs/migration.mdx`). `Form Participation` and
`Component Registration` are named in the sort order but have no page yet. Seven
components have stories: Accordion, ActionSet, Button, Checkbox, Dropdown,
Modal, TextInput. The `Utilities` and `Examples` groups are planned and empty.
There is no `Legacy` group because there is no legacy entry point.

#### Story authoring policy (ADR 0019)

Story files for `@carbon/angular` are **hand-written** under
`src/stories/<Name>/__stories__/`, with `// TODO(parity):` comments marking WC
stories that cannot be reproduced yet. ADR 0019 proposed generated stubs; they
were not built (see its 2026-10-28 update). There is no `@carbon/angular/legacy`
entry point. See
[ADR 0019](../../../docs/decisions/0019-angular-storybook-story-authoring.md)
for the story authoring rules and why full automation was rejected.

#### Story parity with `@carbon/web-components`

Every story exported from a WC story file **must have a matching story in the
Angular story file for that component.** This is a hard requirement, not a
guideline.

**Rule:** For each named export in
`packages/web-components/src/components/<name>/<name>.stories.ts`, there should
be an identically named export in
`packages/angular/src/stories/<Name>/__stories__/<Name>.stories.ts`, or a
`// TODO(parity):` comment explaining why not.

This gives consumers a side-by-side reference when comparing the two packages
and keeps the Angular Storybook honest about feature coverage. It also surfaces
any Angular-layer gaps.

**Status (2026-10-28):** a comparison across the 7 ported components found three
web component stories without an Angular counterpart, all marked: Button
`IconButtonWithBadge`, Dropdown `WithToggletipLabel`, and Modal
`EnableDialogElement` (on hold until the dialog version of Modal is stable).

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

**Enforcement:** Manual, through code review. An automated check
(`storybook:parity`) was considered and dropped for now (ADR 0019, update
2026-10-28).

#### `migration.mdx` and `welcome.mdx`

`packages/angular/.storybook/docs/migration.mdx` is the migration page. It lives
in Storybook so it sits next to the component examples a migrating developer is
browsing. It is a stand-in until `docs/guides/cca-to-angular.md` exists (see
§16). When the guide is written, the page becomes a short entry point that links
to it.

`welcome.mdx` is concise: package description, install command, a usage snippet,
the stylesheet requirement and a link to the migration page. It does not
duplicate migration content.

---

## 6. Component implementation plan

### Development methodology: Automated generation

`@carbon/angular` uses an automated wrapper generator. (The paired hand-crafted
`@carbon/angular/legacy` adapters that this section used to describe were
removed on 2026-10-26.)

#### Generator output

`tasks/generate-wrappers/` reads `packages/web-components/custom-elements.json`
and emits one folder per element under `src/generated/`:

- A component class, `@Component({ selector, template: '<ng-content />' })`
- Typed `@Input()` properties forwarded to the host element in `ngOnChanges`
- Boolean inputs with `booleanAttribute`, so `<cds-ng-button disabled>` works
- `@Output()` emitters for **custom events only** (not native DOM events, ADR
  0015 §4)
- A `ControlValueAccessor` provider for form-associated elements (28 wrappers)
- An `index.ts` per folder

It does **not** emit stories or tests. Those are hand-written (ADR 0019).

The manifest has 305 custom elements, 303 of them `cds-`. 296 wrapper folders
are emitted. The classic and fluid Date Pickers (7 tags) are skipped on purpose
(ADR 0021).

#### Secondary entry points

`build-entries` regroups the output into 97 secondary entry points, one per web
component folder, so an app that imports `@carbon/angular/button` does not pay
for every component's registration (ADR 0020 constraint 4).

#### Secondary entry point `@carbon/angular/legacy`: removed

Removed 2026-10-26. The components it was to hold (`Dropdown` / `Select` /
`MultiSelect` with `[items]`, `FileUploader`, `DataTable`, `Tabs` / `Accordion`,
`Notification` with `notificationObj`) are migration cases handled by codemods
and agent skills. See [`migration-support.md`](./migration-support.md).

---

### Component tiers

> **Planning content, not what was built (2026-10-28).** The tiers below were
> written when the plan was to hand-write adapters. The decision since is **no
> convenience components in core**, so nothing in Tiers 2 to 4 that materialises
> children from an `[items]` / `[rows]` / `[tree]` array, or that owns state in
> Angular, is being built. Every one of these components is currently a
> generated 1:1 wrapper that consumers compose with slotted children. The tables
> remain useful as a per-component record of the CCA API and the web component
> equivalent, and as input to the codemods and agent skills (Milestone 5).
> Element names are web component names; the Angular selector is
> `cds-ng-<name>`.
>
> The tiers also predate full web component coverage as the first-release goal.
> Components in "Tier 5" that have no web component yet (`ScrollGradient`,
> `TagOverflow`, `ConditionBuilder`) are waiting on the web components, not on
> an Angular implementation.

The tiers include both core Carbon components and the IBM Products components
that ADR 0009 merges into core.

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

> **Not built as described.** The wrapper does not render children from an
> `[items]` input. Consumers project the web component's child elements.

All behaviour (keyboard navigation, selection, open/close) is owned by the WC.

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

> **Not built as described.** The Angular-side logic below (`closeOthers`,
> `filterMode`, the `FileUploader` state machine, compound exports) is not in
> core. Each element is a generated wrapper.

Original plan: real Angular logic beyond slot materialisation, compound
component authoring, or state coordination, with the WC still owning all
behaviour.

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

> **Not built as described.** The generated `Table`, `TableRow`, `TableCell` and
> related wrappers are used with projected children. `[rows]` / `[columns]`
> binding is a convenience component and is out of scope (decided 2026-10-28).
> The text below is the original plan.

The Angular wrapper's only job was to be data binding:

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
`<cds-ng-header-nav-item>` / `<cds-ng-side-nav-link>` children — the same
composition model applied to Tabs and Accordion. The WC layer owns all keyboard
navigation and ARIA.

CCA router inputs (`[useRouter]`, `[route]`, `[routeExtras]`,
`[activeLinkActive]`, `[isCurrentPage]`) and the `(navigation)` output have no
equivalent in the generated wrappers, which expose `href`, `rel` and `target`.

**Decided:** `routerLink` integration ships as a set of hand-written attribute
directives (`CdsRouterLinkDirective`), one per navigating component family. This
is **not** a codemod target and **not** migration guidance — it is a first-class
feature of `@carbon/angular`. See Milestone 4.5 in
[`milestones.md`](./milestones.md) for the full implementation spec. The
migration codemod replaces CCA's `[route]` / `[useRouter]` with
`[cdsRouterLink]`; guidance covers `[activeLinkClass]` → Angular's
`routerLinkActive` on the wrapper element.

### Tier 5 — Components without a web component yet

Components that have no `@carbon/web-components` equivalent today, or that are
in `@carbon/react` and await a web component port. Nothing is implemented purely
in Angular.

| Component        | Status / Architecture                          | Recommendation                                                                                                            |
| ---------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Stepper          | CCA only; no web component                     | Not in core (decided 2026-10-28). `cds-progress-indicator` is the web component equivalent. Migration case.               |
| ScrollGradient   | In `@carbon/react`; **no web component yet**   | Wrap it when the web component lands. The scope freeze waits for it (ADR 0009). No Angular-only stand-in.                 |
| TagOverflow      | In `@carbon/react`; **no web component yet**   | Wrap it when the web component lands. The scope freeze waits for it. No Angular-only stand-in.                            |
| AddSelect        | `cds-add-select*` exists in the web components | Already generated (`AddSelect`, `AddSelectBody`, and others).                                                             |
| ConditionBuilder | In `@carbon/react`; **no web component yet**   | Wrap it when the web component lands. The scope freeze waits for it.                                                      |
| StructuredList   | WC equivalent exists (`cds-structured-list`)   | Wrap it — see Tier 2. CCA CVA accepts `any`; preserve `selection`, `flushed`, `condensed` inputs and `(selected)` output. |

---

## 7. Cross-cutting API decisions

### Universal keeps

Because each wrapper forwards web component properties, these carry over for
free wherever the web component uses the same name:

- Boolean flag `@Input()`s (`disabled`, `readOnly`, `invalid`, `hideLabel`,
  `open`, `checked`, `required`, …)
- String display `@Input()`s (`labelText`, `placeholder`, `invalidText`,
  `warnText`, `helperText`, `title`, …)
- Variant enums where the WC uses the same string values (`kind`, `size`,
  `type`, `alignment`, …)

`[items]` / `[rows]` / `[columns]` array inputs are **not** kept. See the Tier
notes in §6.

### Universal breaks

Apply intentionally across all components:

| Break                                                                       | Affected CCA components                                                                                                                                                                       | Reason                                                                                                                      |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `Date` object types → `string`                                              | DatePicker                                                                                                                                                                                    | State machine and WC operate on strings. Conversion layer introduces timezone edge cases with no team to maintain it.       |
| Array and model inputs → projected web component children                   | Modal (`ibm-modal-header/content/footer`), Tabs/Accordion array inputs, UI Shell (`[navigationItems]` arrays), Dropdown/Select (`[items]`)                                                    | The wrapper does not build children; consumers project `cds-ng-*` elements.                                                 |
| Flatpickr-specific `@Input()`s dropped                                      | DatePicker: `[flatpickr]`, `[appendTo]`, `[plugins]`                                                                                                                                          | The backing library is gone.                                                                                                |
| Per-component `theme` `@Input()` dropped                                    | **All components** — CCA has `[theme]` on: CodeSnippet, ComboBox, DatePicker/DatePickerInput, Dropdown, NumberInput, Search, Select, Tabs, Tiles (all variants), TimePicker, TimepickerSelect | Theming is global via `@carbon/themes` CSS custom properties, not per-component.                                            |
| NgModule exports → standalone component exports                             | All                                                                                                                                                                                           | Barrel `*Module` imports are replaced by per-family imports such as `@carbon/angular/button`.                               |
| `PaginationModel` object → flat `@Input()`s                                 | Pagination (also removes shared model with DataTable)                                                                                                                                         | CCA `[model]: PaginationModel` conflates page state and data; replace with `[totalItems]`, `[page]`, `[pageSize]`.          |
| `TableModel` / `TableHeaderItem` / `TableItem` classes → projected children | DataTable                                                                                                                                                                                     | Mutable class model causes CD conflicts. No `[rows]` input is built (out of scope).                                         |
| Array-based navigation inputs → projected children                          | UI Shell `[navigationItems]`, `[menuItems]`, `[headerItems]`                                                                                                                                  | Arrays block rich template content. `[cdsRouterLink]` on the projected children replaces CCA router inputs (Milestone 4.5). |
| `notificationObj: NotificationContent` model → flat `@Input()`s             | Notification (inline, toast, actionable)                                                                                                                                                      | Object input is an unnecessary indirection when WC exposes flat props.                                                      |

### Forms (ControlValueAccessor)

The generator adds a `ControlValueAccessor` to **28** form-associated wrappers:
Checkbox, ComboBox, Dropdown, MultiSelect, NumberInput, PasswordInput,
PreviewDatePicker, RadioButtonGroup, Search, Select, Slider, TableToolbarSearch,
TextInput, Textarea, TimePicker, TimePickerSelect, Toggle, and the Fluid
variants. CVA value types follow the WC, not the old Angular types. The table
below is the original plan and lists the intended value types. `EditInPlace` and
`OptionsTile` are in the table but have no CVA today, and `StructuredList` is
unverified. `PreviewDatePickerInput` has none.

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

> **Current state (2026-10-28).** The wrapper is the generated
> `PreviewDatePickerComponent` (selector `cds-ng-preview-date-picker`, with a
> `ControlValueAccessor`) plus `PreviewDatePickerInput` and
> `PreviewDatePickerCalendar` (no CVA). The generator does not hand-write the
> `labelEnd` / `placeholderEnd` composition or the `(onOpen)` / `(onClose)`
> outputs below, and the named output is `(previewDatePickerChanged)`, not
> `(onChange)`. The API mapping is the original plan and is kept as input to the
> migration guide. Consumers project `cds-ng-preview-date-picker-input`
> children. There is no classic or fluid Date Picker (ADR 0021).

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

**Composition model change:** the old API used explicit
`<ibm-date-picker-input>` child components. The web component also takes
`cds-ng-preview-date-picker-input` children, so the structure is similar and the
consumer still writes the children. (The earlier plan to hide them behind a
single flat element was not built.)

**CVA:** value type is `string`. Single mode: `"01/15/2026"`. Range mode is
`/`-separated: `"01/10/2026/01/20/2026"`. This resolves Open Question #1 —
`string` is correct, not `Date[]`, because the new WC operates entirely on
strings and `Temporal.PlainDate` internally.

**`(onChange)` event detail:** `selectedDates` is `Temporal.PlainDate[]` (not
`string[]` as originally planned in the pre-PR design). `value` is the formatted
string. The WC fires `cds-preview-date-picker-changed`, which the wrapper
re-emits as `(previewDatePickerChanged)`.

**Temporal polyfill:** `@carbon/utilities/date-picker` bundles
[`temporal-polyfill`](https://github.com/fullcalendar/temporal-polyfill) and
installs it only when the engine has no native implementation. No additional
polyfill setup is required in the Angular package.

---

## 9. WC element registration

See §4 for the full history and mechanism. In short:

- `build-entries` vendors a `cds-ng` prefixed copy of `@carbon/web-components`
  (ADR 0020). Each wrapper imports the **folder barrel** of its component, which
  registers the element and its children as a side effect.
- Consumers never import a web component. They import a wrapper from a secondary
  entry point such as `@carbon/angular/modal`.
- `@carbon/web-components` is not a peer dependency (removed 2026-10-28).
- `es-custom` is not used. `defineCustomElement` is used inside the web
  components; the Angular wrappers do not call it directly.

---

## 10. Effort estimate

> **Out of date.** The original estimate (about 2.5 to 3 months for one
> engineer) included 3 to 4 weeks of legacy adapters, which were cancelled on
> 2026-10-26. The remaining estimates are in [`milestones.md`](./milestones.md),
> and the migration tooling estimate is still to be made (Milestone 5).

| Phase                                                           | Status                                 |
| --------------------------------------------------------------- | -------------------------------------- |
| Package scaffolding and entry points                            | Done                                   |
| Wrapper generator and 281 wrappers                              | Done; moves to CEM when it lands       |
| Stories, Jest and Playwright tests                              | 7 components done; the rest to do      |
| Scope freeze and full web component coverage                    | Future PR; waiting on 3 web components |
| Migration support (codemods, agent skills, `cca-to-angular.md`) | Future PR; estimate to be made         |
| CI matrix, `standalone: true` removal, RC hardening             | Not started                            |

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

- Convenience components in core (decided 2026-10-28). Migration support is
  codemods plus agent skills.
- Classic and fluid Date Pickers (decided 2026-10-28). Wait for a fluid picker
  without flatpickr in the web components.
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

| Constraint        | WC tests                                | Angular unit tests                          |
| ----------------- | --------------------------------------- | ------------------------------------------- |
| Runtime           | Real browser (Puppeteer)                | jsdom                                       |
| Assertion library | Chai (`to.have.attribute`)              | Jest (`toBe`, `toBeNull`)                   |
| What is inspected | `el.shadowRoot.querySelector('button')` | `nativeElement.querySelector('cds-button')` |
| WC lifecycle      | Real (`customElements.define`)          | Real, in jsdom, for the parity specs        |
| Shadow DOM        | Real                                    | Available to the parity specs               |

Importing the WC tests verbatim would also be wrong by design: the Angular tests
assert a different contract. The WC tests confirm the WC renders correctly given
props; the Angular tests confirm the Angular wrapper forwards props correctly to
the WC host element. These are complementary, not redundant.

#### Translation pattern

For each WC test scenario, the Angular translation follows a fixed pattern:

```
WC:      expect(el.shadowRoot.querySelector('button')).to.have.attribute('type', 'submit')
Angular: expect(wc().getAttribute('type')).toBe('submit')
         // where wc() = fixture.nativeElement.querySelector('cds-<name>')
         // Jest runs against src/generated, which keeps `cds-*` selectors.
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

> **Parity specs.** Alongside the property-forwarding specs, each ported
> component has a `<Name>.parity.spec.ts` that renders the web component and
> asserts on its shadow DOM, mirroring the web component tests. Only the Button
> has both kinds of spec.

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
`packages/react`. Last run: 11 suites, 250 passed, 45 `it.todo`.

Tests the Angular wrapper's responsibility: input reflection, output emission
and CVA integration, against `src/generated`. The test selector there is
`cds-*`.

The examples below are the original plan. The `cds-ng-*` selectors and the
slot-materialisation pattern do not apply to Jest, which uses `cds-*`, and slot
materialisation was not built.

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

**Coverage target:** The web component tests are the source (see "WC test
mirroring"). Every scenario in a ported component's web component test either
has an equivalent Jest test or an `it.todo`. The CCA test files are not a
source.

#### Layer 2 — Playwright integration tests (real browser, WC lifecycle)

**Runner:** Playwright, consistent with `packages/web-components`. Run against
the Angular package's Storybook build.

Tests that require WC lifecycle to execute — keyboard navigation, focus
restoration, calendar open/close, datepicker range selection. These cannot run
in jsdom. Last recorded: 36 passed in Chromium (not re-run after the latest
story additions).

```ts
// Example: Dropdown keyboard navigation
test('opens on ArrowDown and closes on Escape', async ({ page }) => {
  await page.goto(storybookUrl('components-dropdown--default'));
  const dropdown = page.locator('cds-ng-dropdown');
  await dropdown.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('cds-ng-dropdown[open]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('cds-ng-dropdown[open]')).not.toBeVisible();
});
```

**Coverage target:** One Playwright test file per ported component. Today:
Button, Dropdown, Modal and others from the 7 ported components.

#### Layer 3 — Storybook accessibility (IBM Equal Access)

**Runner:** `storybook-addon-accessibility-checker` (IBM Equal Access), enabled
in `.storybook/main.ts`, plus `play()` functions where a story needs an
interacted state.

The goal is that every story runs the checker against a live, interacted-with
state rather than a static render. **Today only the Button stories have `play()`
functions**, so most stories are checked in their initial render.

`@storybook/addon-a11y` (axe-core) is **not included**. IBM Equal Access is the
canonical accessibility standard for IBM products and covers a broader WCAG rule
set.

---

### Coverage target summary

| Layer          | Runner                                                     | What it covers                                            | Target                 |
| -------------- | ---------------------------------------------------------- | --------------------------------------------------------- | ---------------------- |
| Jest unit      | jsdom                                                      | Input reflection, output emission, CVA, shadow DOM parity | 250 passing today      |
| Playwright     | Real browser                                               | Keyboard nav, focus, WC lifecycle interactions            | 36 passing today       |
| Storybook a11y | IBM Equal Access (`storybook-addon-accessibility-checker`) | Accessibility on every component story                    | All stories (7 so far) |

---

### Package file structure

```text
packages/angular/
├── src/
│   ├── generated/                     # 281 wrapper folders (gitignored)
│   ├── stories/<Name>/                # 7 components so far
│   │   ├── __stories__/
│   │   │   ├── <Name>.mdx             # Button, Checkbox, Dropdown, Modal, TextInput
│   │   │   └── <Name>.stories.ts
│   │   └── __tests__/
│   │       ├── <Name>.parity.spec.ts
│   │       └── <Name>.e2e.ts          # Button, Dropdown, Modal, ...
│   ├── __tests__/                     # generator and registration specs
│   └── testing/render.ts
└── .entries/                          # build output (gitignored): 97 entry points
```

Storybook `play()` functions live in the story file alongside the component
story (Button only so far).

---

## 14. Migration guide structure (per breaking change)

Every intentional break in the CCA migration guide
(`docs/guides/cca-to-angular.md`, not yet written) should follow this format:

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

3. ~~**Secondary entry points**~~ — **Closed.** 97 secondary entry points, one
   per web component folder, built by `build-entries`. A single entry point
   registers every component barrel it imports and costs a Button-only app about
   125 kB (ADR 0020 constraint 4). The root entry exports nothing.

4. ~~**StructuredList**~~ — **Closed.** Wrapped as a generated 1:1 wrapper of
   `cds-structured-list`. CVA is not generated for it today.

5. ~~**`feat/wc-class-exports` merge timeline**~~ — **Closed.** PR #23097 merged
   to `main` (commit `dd87f84`). `defineCustomElement` is available. There is no
   `@carbon/web-components` peer dependency any more (ADR 0020); the prefixed
   copy is bundled. Note: v3 pure class exports (side-effect-free class files)
   are not yet in main; until then the subclass fallback in
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

11. **Migration tooling** — **Open, may be delegated; future PR.** Where the
    agent skills live, how `@carbon/upgrade` parses Angular templates, how the
    mapping file is verified, shadow DOM styling guidance, services and
    directives. See Milestone 5 in [`milestones.md`](./milestones.md).

12. **`@carbon/styles` peer range** — **Open.** `^2.0.0-alpha.3` today. Whether
    to also allow 1.x is not decided (ADR 0020 open question 3).

13. **`docs/migration/v12.md` entry** — **Open.** A short `@carbon/angular`
    entry pointing at the CCA guide, or none.

14. **Upstream skeleton classes** — **Done 2026-10-29.** The Custom Elements
    Manifest from #23872 includes them; `SYNTHETIC_TAGS` is removed.

---

## 16. Migration support

> **Rewritten 2026-10-28.** The earlier version of this section listed seven
> `cca-*` transforms from the time of the legacy entry point and described the
> `cds-*` selector. Both are superseded. The authoritative design and the open
> questions are in [`migration-support.md`](./migration-support.md), and the
> work is tracked as Milestone 5 in [`milestones.md`](./milestones.md).

### Overview

`@carbon/angular` has no compatibility layer and no convenience components in
core (decided 2026-10-28). Migrating from `carbon-components-angular` (CCA) is a
single move, supported by three things:

1. **A migration guide** at `docs/guides/cca-to-angular.md`. **Not yet
   written.** `@carbon/angular` is new in v12 and not behind a feature flag, so
   CCA users need their own document. Whether `docs/migration/v12.md` also gets
   a short pointer is undecided.
2. **Codemods** in `@carbon/upgrade`, for the changes that are mechanical.
3. **Agent skills**, for the changes that need reading the surrounding code.

Codemods and skills read one shared CCA-to-Carbon mapping file so that they
cannot disagree.

### Migration guide

Structured as §14 specifies: one `## BREAKING:` block per intentional API break,
with Before and After code, Why and Migration steps. The Storybook page
(`.storybook/docs/migration.mdx`) stands in until the guide exists.

The breaks are recorded in the universal-breaks table in §7. The ones that
affect the most consumers:

1. **Selector and import.** Every wrapper uses a `cds-ng-*` selector and imports
   from a per-family entry point, for example
   `import { ModalComponent } from '@carbon/angular/modal'`. CCA's Button is an
   attribute directive (`<button cdsButton>`) and becomes an element.
2. **Shadow DOM.** Rendering moves into shadow DOM. This is the largest cost and
   is not in the list of breaks. Global CSS overrides and tests that select
   Carbon internals stop working.
3. **`TableModel` / `TableHeaderItem` / `TableItem` removed.** Compose
   `cds-ng-table-*` children. There is no `[rows]` input.
4. **`notificationObj` removed** on toast, inline and actionable notifications.
   Use flat `title`, `subtitle`, `caption` and `kind` inputs.
5. **`PaginationModel` removed.** Use `[totalItems]`, `[pageSize]` and `[page]`.
6. **`[navigationItems]` / `[menuItems]` / `[headerItems]` removed** on UI
   Shell. Project `cds-ng-header-nav-item`, `cds-ng-side-nav-link` and the other
   children. Not automatable.
7. **`[theme]` removed.** Theming is global through `@carbon/styles`.
8. **`appendInline` / `dropUp` / `scrollableContainer` removed.** Floating UI
   autoalign in the web components supersedes them.
9. **`@carbon/styles` is required** so that `--cds-*` tokens resolve.
10. **Services** (for example `ModalService`, `NotificationService`) have no
    equivalent in v1.0 core. `[open]` / `[open]="isOpen"` is the intended
    pattern for modals and side panels. Programmatic services may be added
    post-v1.0 if there is demand; a GitHub issue tracks the request. See
    `developer-experience.md` for the full rationale.

### Codemods

`@carbon/upgrade` is the codemod host. Transforms go in
`packages/upgrade/transforms/` and are registered in
`packages/upgrade/src/upgrades.js`, following the `wc-*` conventions: a shared
detection helper, report-first transforms, dry run by default, `--write` to
apply.

The transform inventory is **not settled**. `migration-support.md` proposes four
tiers (deterministic, codemod plus report, agent skill, judgment) and lists the
constraints, notably that `@carbon/upgrade` cannot parse Angular `.html`
templates today. The names on `migration.mdx` (`cca-report-imports`,
`cca-update-module-imports`, and so on) are placeholders and none is built.

### Open questions

Unanswered and possibly delegated to a developer: where the agent skills live,
how `@carbon/upgrade` parses Angular templates, how the mapping file is verified
against both packages, shadow DOM guidance, and directives. `routerLink`
integration and services are decided and documented in `milestones.md`. See
Milestone 5 in [`milestones.md`](./milestones.md).

### Runtime diagnostic

A Carbon element matching `:not(:defined)` at runtime was never registered. For
`@carbon/angular` the tag is prefixed, so the check is:

```js
// In browser devtools or an integration test:
document.querySelectorAll('*').forEach((el) => {
  if (el.localName.startsWith('cds-ng-') && !customElements.get(el.localName)) {
    console.warn('Un-upgraded Carbon element:', el.localName);
  }
});
```

CSS cannot match a wildcard on tag names, so the earlier `cds-*:not(:defined)`
selector does not work and was removed.

### Coexistence

Under ADR 0020, `@carbon/angular` (`cds-ng-*`), `carbon-components-angular`
(`cds-*`) and a separately loaded `@carbon/web-components` (`cds-*`) can share a
page without registering the same tag. This is shown for the Modal and the
Dropdown in the coexistence spike; other components are untested. Because of
this, an incremental migration can render `<cds-ng-button>` next to a CCA
button.

`create-prefixed-build` (shipped in PR #23097) is still the supported way to run
two copies of the bare web components. It is not part of the `@carbon/angular`
migration path, because `@carbon/angular` already ships its own prefixed copy.
