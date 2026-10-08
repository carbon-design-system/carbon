# `@carbon/angular` — Implementation Milestones

**Status:** Pre-implementation **Source plan:** [`plan.md`](./plan.md) **Package
location:** `packages/angular/` **Package name:** `@carbon/angular`

This document breaks the `@carbon/angular` implementation plan into six
sequential milestones, each producing a shippable, independently reviewable PR.
Milestones are ordered by dependency; Milestone 5 (migration support) can be
worked in parallel with Milestone 4.

---

## Milestone 0 — Package scaffolding

**Estimated effort:** 2–3 days **Unblocks:** All subsequent milestones

Everything required before a single component can be written. Establishes the
Yarn workspace, build toolchain, test runners, Storybook, and CI job.

### Deliverables

- `packages/angular/package.json`
  - `name: "@carbon/angular"`, `version: "0.0.0-prerelease.0"`
  - Peer deps: `@angular/common >=17`, `@angular/core >=17`,
    `@angular/forms >=17`, `@carbon/styles >=2`
  - Deps: `@carbon/web-components` (hard dependency — Angular wraps WC directly)
- `packages/angular/ng-package.json` — ng-packagr entry point
- `packages/angular/tsconfig.json` — strict Angular + Ivy compiler options
- `packages/angular/src/index.ts` — empty public barrel
- `packages/angular/jest.config.js` + `jest-preset-angular` setup
- `packages/angular/playwright.config.ts` — points at the Storybook build URL
- `packages/angular/.storybook/main.ts` + `.storybook/preview.ts`
  (`@storybook/angular`)
- `packages/angular/tasks/generate/` — token-substitution scaffold generator for
  new components
  - `index.js`
  - `templates/index.ts`
  - `templates/components/DISPLAY_NAME.component.ts`
  - `templates/__stories__/DISPLAY_NAME.stories.ts`
  - `templates/__tests__/DISPLAY_NAME.spec.ts`
- `packages/angular/README.md` — install instructions, link to migration guide
- Lerna build-order plumbing — `@carbon/web-components` in `dependencies` means
  Lerna resolves build order automatically; no extra plumbing needed

### CI

Add a CI job that runs:

- `yarn workspace @carbon/angular build`
- `yarn workspace @carbon/angular test`
- `yarn workspace @carbon/angular storybook:build`

### Exit criteria

`yarn workspace @carbon/angular build` succeeds and produces a valid Angular
Package Format (APF) output (`esm2022` + `fesm2022`). CI is green on an empty
package.

---

## Milestone 1 — Proof of concept: Button

**Estimated effort:** 2–3 days **Depends on:** Milestone 0

Proves the full three-layer stack works end-to-end before committing to all 70+
component wrappers (~110+ component variants). Validates the
`defineCustomElement` / `cds-ng-*` registration pattern, CVA wiring, and IBM
Equal Access integration.

### Deliverables

- `src/components/Button/Button.component.ts`
  - Registers `cds-ng-button` via
    `defineCustomElement(CDSButton, { name: 'cds-ng-button' })`
  - Consumer-facing selector: `cds-button`
  - All `@Input()` / `@Output()` from the WC `.d.ts`
  - `CUSTOM_ELEMENTS_SCHEMA` scoped to this component
- `src/components/Button/index.ts`
- Layer 1 Jest test (`Button.spec.ts`) — input reflection, output emission
- Layer 2 Playwright test (`Button.e2e.ts`) — click and keyboard activation
- Storybook story (`Button.stories.ts`) with a `play()` function
- `.storybook/docs/welcome.mdx` — stub Introduction/Welcome page
- `.storybook/docs/migration.mdx` — stub migration page (full content added in
  Milestone 5)

### Exit criteria

- All 3 test layers green
- `storybook-addon-accessibility-checker` (IBM Equal Access) reports zero
  violations on the Button story
- `defineCustomElement` pattern confirmed working; `cds-button` (Angular
  selector) ≠ `cds-ng-button` (internal WC tag), no recursive matching

---

## Milestone 2 — Pre-implementation test sprint

**Estimated effort:** 3–4 weeks **Depends on:** Milestone 1

Write the complete Layer 1 Jest test suite for **all** planned components before
any implementation code is written. This sprint produces ~300+ failing tests
that define the full API contract across the combined Core Carbon and IBM
Products surfaces. Implementation tiers (Milestones 3 and 4) then work through
making them pass in order.

### Approach

Derive test cases from:

1. CCA Karma spec files for that component (scenarios rewritten for the
   `@carbon/angular` API boundary — do not assert against CCA's rendered DOM)
2. WC `.d.ts` and test files for all `@Input()` / `@Output()` the Angular
   wrapper must expose
3. IBM Products Web Components specifications and tests (ADR 0009)
4. Universal-break decisions from §7 of `plan.md`

Four test patterns per component:

```ts
// 1. Input → WC attribute reflection
it('should reflect [disabled] to the cds-ng-modal element', () => { ... });

// 2. WC custom event → @Output() emission
it('should emit (close) when cds-modal-closed fires on the WC', () => { ... });

// 3. Slot materialisation
it('should render one cds-ng-dropdown-item per [items] entry', () => { ... });

// 4. CVA — writeValue propagates to WC attribute
it('should set the value attribute on the WC when writeValue is called', () => { ... });
```

### Deliverables

- `src/components/<Name>/__tests__/<Name>.spec.ts` for every Tier 1–5 component
  (~70+ files covering ~110+ components/variants)
- `src/components/<Name>/__tests__/<Name>.e2e.ts` stubs for Tier 3–4 components
  (compile-only stubs; not yet executed against a running Storybook)
- CVA test patterns for all 16 form-input components (see CVA type table in §7
  of the plan)

### Exit criteria

All test files compile. Tests fail for the right reason (missing import or
assertion failure, not a syntax error). CI runs the suite with
`--passWithNoTests` guard in place; zero compilation errors reported.

---

## Milestone 3 — Tier 1 and Tier 2 components

**Estimated effort:** 5–7 weeks **Depends on:** Milestone 2

Implement the ~46 simpler components (~26 Tier 1 thin wrappers + ~20 Tier 2 slot
materialisation / composite wrappers) until all their Milestone 2 Layer 1 tests
pass. Each component or closely related group is a separate commit or sub-PR
within the milestone.

### Tier 1 — Thin wrappers (~26 components, ~2–4 hours each)

Pure attribute-mapping wrappers. No slot materialisation, no behaviour logic.

| Component         | WC element(s)                                                            | Origin       | CVA type               |
| ----------------- | ------------------------------------------------------------------------ | ------------ | ---------------------- |
| Checkbox          | `cds-checkbox`, `cds-checkbox-group`                                     | Core         | `boolean` / `string`   |
| RadioButton       | `cds-radio-button`, `cds-radio-button-group`                             | Core         | `string`               |
| Toggle            | `cds-toggle`                                                             | Core         | `boolean`              |
| Tag               | `cds-tag`, `cds-tag-selectable`, `cds-tag-filter`, `cds-tag-operational` | Core         | `boolean` (selectable) |
| Loading           | `cds-loading`                                                            | Core         | —                      |
| InlineLoading     | `cds-inline-loading`                                                     | Core         | —                      |
| Skeleton variants | `cds-skeleton-text`, `cds-skeleton-icon`, `cds-skeleton-placeholder`     | Core         | —                      |
| Tooltip           | `cds-tooltip`, `cds-tooltip-content`, `cds-definition-tooltip`           | Core         | —                      |
| ToggleTip         | `cds-toggletip`                                                          | Core         | —                      |
| TextInput         | `cds-text-input`                                                         | Core         | `string`               |
| TextArea          | `cds-textarea`                                                           | Core         | `string`               |
| NumberInput       | `cds-number-input`                                                       | Core         | `number`               |
| ProgressBar       | `cds-progress-bar`                                                       | Core         | —                      |
| ProgressIndicator | `cds-progress-indicator`, `cds-progress-step`                            | Core         | —                      |
| Search            | `cds-search`                                                             | Core         | `string`               |
| Link              | `cds-link`                                                               | Core         | —                      |
| AILabel           | `cds-ai-label`, `cds-ai-label-action-button`                             | Core         | —                      |
| Layer             | `cds-layer`                                                              | Core         | —                      |
| CodeSnippet       | `cds-code-snippet`                                                       | Core         | —                      |
| BadgeIndicator    | `cds-badge-indicator`                                                    | IBM Products | —                      |
| BigNumber         | `cds-big-number`, `cds-big-number-skeleton`                              | IBM Products | —                      |
| IconIndicator     | `cds-icon-indicator`                                                     | IBM Products | —                      |
| ShapeIndicator    | `cds-shape-indicator`                                                    | IBM Products | —                      |
| UserAvatar        | `cds-user-avatar`                                                        | IBM Products | —                      |
| CopyButton / Copy | `cds-copy`, `cds-copy-button`                                            | IBM Products | —                      |
| TruncatedText     | `cds-truncated-text`                                                     | IBM Products | —                      |
| FullPageError     | `cds-full-page-error`                                                    | IBM Products | —                      |

### Tier 2 — Slot materialisation & composite wrappers (~20 components, ~1–3 days each)

Angular wrapper renders WC child elements via `*ngFor` from a `[items]` input or
coordinates simple composite elements. All behaviour is owned by the WC.

| Component          | WC element(s)                                                                      | Origin       | Key adapter work                                                                            |
| ------------------ | ---------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------- |
| Select             | `cds-select`, `cds-select-item`, `cds-select-item-group`                           | Core         | Items array → slot children; group support                                                  |
| Dropdown           | `cds-dropdown`, `cds-dropdown-item`                                                | Core         | Items → slots; `itemValueKey`; CVA: `string`                                                |
| MultiSelect        | `cds-multi-select`, `cds-multi-select-item`                                        | Core         | `selectAll`, `selectionFeedback`; CVA: `string[]`                                           |
| Breadcrumb         | `cds-breadcrumb`, `cds-breadcrumb-link`, `cds-breadcrumb-overflow-menu`            | Core         | Items array → slots                                                                         |
| Notification (×3)  | `cds-actionable-notification`, `cds-inline-notification`, `cds-toast-notification` | Core         | Replace `notificationObj` model with flat `@Input()`s                                       |
| Pagination         | `cds-pagination`, `cds-page-sizes-select`                                          | Core         | Replace `PaginationModel` with flat inputs; event shape change                              |
| ContentSwitcher    | `cds-content-switcher`, `cds-content-switcher-item`                                | Core         | `[items]` array                                                                             |
| ContainedList      | `cds-contained-list`, `cds-contained-list-item`, `cds-contained-list-description`  | Core         | Items → slots                                                                               |
| ContextMenu / Menu | `cds-menu`, `cds-menu-item`, `cds-menu-group`, `cds-menu-divider`                  | Core         | Items array → slots; `open`, `position`                                                     |
| ComboButton        | `cds-combo-button`                                                                 | Core         | Projected action items                                                                      |
| MenuButton         | `cds-menu-button`                                                                  | Core         | Projected menu items                                                                        |
| Tiles (×4)         | `cds-tile`, `cds-clickable-tile`, `cds-expandable-tile`, `cds-selectable-tile`     | Core         | Drop `[theme]`; `href`, `route`, `expanded`                                                 |
| Treeview           | `cds-tree-view`, `cds-tree-node`                                                   | Core         | Recursive `[tree]: Node[]` → slot materialisation                                           |
| Slider             | `cds-slider`, `cds-slider-input`                                                   | Core         | CVA: `number` (single) or `[number, number]` (range); reads `value` + `unstable_valueUpper` |
| TimePicker         | `cds-time-picker`, `cds-time-picker-select`                                        | Core         | Slot projection for select child; CVA: `string`                                             |
| StructuredList     | `cds-structured-list`, `cds-structured-list-row`, `cds-structured-list-cell`       | Core         | CVA: `any`; preserve `selection`, `flushed`, `condensed`, `(selected)`                      |
| ActionSet          | `cds-action-set`                                                                   | IBM Products | Responsive action button bar for tearsheets and side panels                                 |
| OptionsTile        | `cds-options-tile`                                                                 | IBM Products | Interactive configuration tile with toggle / radio CVA; CVA: `boolean \| string`            |
| GuideBanner        | `cds-guide-banner`, `cds-guide-banner-element`                                     | IBM Products | Contextual announcement & onboarding banner                                                 |
| ChatButton         | `cds-chat-button`, `cds-chat-button-skeleton`                                      | IBM Products | Floating or inline AI chat button launcher                                                  |
| EditInPlace        | `cds-edit-in-place`                                                                | IBM Products | Inline text editing wrapper with CVA integration; CVA: `string`                             |

### Exit criteria

All Tier 1 and Tier 2 Layer 1 Jest tests green. Version bumped to
`0.0.0-prerelease.1`.

---

## Milestone 4 — Tier 3, 4 and 5 components (Core & Enterprise Systems)

**Estimated effort:** 8–11 weeks **Depends on:** Milestone 3

Complex compound systems, non-trivial adapters, and the DataTable data binder.
Each component family is a separate PR.

### Tier 3 — Compound components & complex adapters (~1–2 weeks each)

#### Tabs (`cds-tabs` + `cds-tab`)

**Architecture break from CCA:** projected child `<cds-tab>` components replace
`[tabs]="[{label, content}]"` array input.

```html
<cds-tabs type="contained">
  <cds-tab label="Tab 1"><my-component /></cds-tab>
  <cds-tab label="Tab 2" [disabled]="true"><p>Content</p></cds-tab>
</cds-tabs>
```

New WC capabilities exposed: `dismissable`, `badgeIndicator`, `iconOnly`,
`iconSize` per tab.

#### Accordion (`cds-accordion` + `cds-accordion-item`)

Same projected-child architecture break as Tabs.

`closeOthers` preserved: wrapper intercepts cancellable
`cds-accordion-item-beingtoggled` event and prevents items that should stay
closed from toggling (~10 lines of Angular logic).

New WC capabilities exposed: `isFlush`, responsive `breakpoint` per item.

#### ComboBox (`cds-combo-box` + `cds-combo-box-item`)

- Expose built-in client-side filtering (`shouldFilterItem` fn), experimental
  typeahead, and `allowCustomValue` directly
- Server-side async filter mode: `[filterMode]="'client'|'server'"` — in server
  mode, wrapper intercepts WC input events and emits `(filtered)` output;
  consumer rebinds `[items]`
- `allowCreate` renamed to `allowCustomValue`

#### Modal (`cds-modal` + slot children)

- Wrapper builds `cds-ng-modal-header` / `cds-ng-modal-body` /
  `cds-ng-modal-footer` slot structure from `@Input()`s; consumer body content
  via `<ng-content>`
- WC owns focus trapping, Escape key, and ARIA labelling
- New capabilities exposed: `loadingStatus`, `shouldSubmitOnEnter`,
  `preventClose`, `preventCloseOnClickOutside`, `fullWidth`, `alert`
- Drop: `selectorPrimaryFocus` (WC manages initial focus via `getFocusable()`)
- Keep: `hasScrollingContent`

#### FileUploader (`cds-file-uploader` + items + drop container)

- `cds-file-uploader` is a layout shell only; the **Angular wrapper owns file
  state tracking**
- Accepts `[files]` array of `{name, state, invalid, errorSubject, errorBody}`
  and renders one `cds-file-uploader-item` per entry
- State updates (`uploading → uploaded / error`) are the consumer's
  responsibility; wrapper re-renders on `files[]` changes
- WC owns all visuals, delete button, and drag-and-drop behaviour
- ~150 lines of Angular — the one component where Angular owns the state machine

#### UI Shell (`cds-header-*`, `cds-side-nav-*`, `cds-panel`, `cds-switcher-*`)

**Architecture break from CCA:** replace `[navigationItems]` / `[menuItems]` /
`[headerItems]` array inputs with projected `<cds-header-item>` /
`<cds-sidenav-item>` children.

CCA router inputs to preserve: `[useRouter]`, `[route]`, `[routeExtras]`,
`[href]`, `[activeLinkClass]`, `[isCurrentPage]`.

`(navigation)` output (`EventEmitter<Promise<boolean>>`) preserved on all
navigating children.

#### Card (`cds-card` + compound subcomponents)

- Unified composable card system from IBM Products
- Export compound components: `CardComponent`, `CardHeaderComponent`,
  `CardTitleComponent`, `CardBodyComponent`, `CardFooterComponent`,
  `CardActionsComponent`, `CardMediaComponent`

#### SidePanel (`cds-side-panel`)

- Slide-over panel component with focus trapping, animated slide-in, size
  variants (`xs`, `sm`, `md`, `lg`, `2xl`), action buttons, and dirty-state
  confirmation integration

#### Tearsheet (`cds-tearsheet` + compound elements)

- Multi-step flow container supporting wide/narrow configurations, stacking, and
  progress influencer sidebar: `<cds-tearsheet>`, `<cds-tearsheet-header>`,
  `<cds-tearsheet-body>`, `<cds-tearsheet-footer>`, `<cds-tearsheet-influencer>`

#### PageHeader (`cds-page-header` + slots)

- Enterprise page header wrapper projecting title, subtitle, breadcrumbs, action
  bar, and page-level tabs into designated slots

#### Dialog (`cds-dialog` + compound elements)

- Modal messaging & confirmation dialog compound family: `<cds-dialog>`,
  `<cds-dialog-header>`, `<cds-dialog-body>`, `<cds-dialog-footer>`,
  `<cds-dialog-controls>`

#### Coachmark (`cds-coachmark` + beacon/body)

- Interactive feature tour beacon and popover card system

#### NotificationsPanel (`cds-notification-panel`)

- Flyout drawer for notification feed and grouping

#### Resizer (`cds-resizer-grid`, `cds-resizer-handle`, `cds-resizer-panel`)

- Split-pane adjustable layout containers with draggable handles

### Tier 4 — Data adapter (~2–3 weeks)

**`cds-table` is not a primitive shell.** It owns client-side sort,
search/filter, row selection, select-all, batch actions, row expansion, overflow
menu, and zebra striping.

Angular wrapper responsibilities only:

- Accept `[rows]: DataTableRow[]` and `[columns]: DataTableColumn[]`
- Render `cds-table-header-cell` per column via `*ngFor`
- Render `cds-table-row` + `cds-table-cell` per row via `*ngFor`
- Detect array changes via Angular change detection; re-render on change
- Compose `cds-pagination` alongside when `[pageSize]` is set
- Re-emit WC events as typed `@Output()` emitters

**Drop:** `DataTableModel` / `TableHeaderItem` / `TableItem` classes — replace
with plain `DataTableRow[]` interfaces. `isVirtualized` / virtual scroll
deferred to v2.

**Keep:** `cellTemplate: TemplateRef` per column — use `*ngTemplateOutlet`
inside `cds-table-cell`.

**New WC capabilities exposed:** `locale` (Intl.Collator sort), `radio`
(single-select mode), `expandable`, `batchExpansion`, `useStaticWidth`,
`withRowAILabels`, size variants `xs` / `xl`.

### DatePicker — Preview WC

**Target:** `cds-preview-date-picker` + `cds-preview-date-picker-input` (from
`packages/web-components/src/components/date-picker/next/`).

Internal WC registration names:

- `CDSDatePicker` (next) → `cds-ng-preview-date-picker`
- `CDSDatePickerInput` (next) → `cds-ng-preview-date-picker-input`

Key API decisions:

- `[value]` CVA type: `string` (ISO8601 or `/`-separated range); **breaks** from
  CCA's `Date | Date[]`
- `(onChange)` type:
  `EventEmitter<{ selectedDates: Temporal.PlainDate[], value: string }>`
- Drop: `[flatpickr]`, `[plugins]`, `[appendTo]`, `(calendarChange)`
- New: `[allowInput]`, `[closeOnSelect]`, `[locale]`, `[name]`, `[open]`

Full API mapping in §8 of `plan.md`.

### Tier 5 — Pure Angular & WC follow-ups

| Component        | Status / Architecture                 | Recommendation                                                                        |
| ---------------- | ------------------------------------- | ------------------------------------------------------------------------------------- |
| Stepper          | Pure Angular                          | Port forward from CCA — keep old API; frequently used in IBM product multi-step flows |
| ScrollGradient   | In `@carbon/react`; WC port follow-up | Temporary Angular directive applying scroll shadow tokens until WC port lands         |
| TagOverflow      | In `@carbon/react`; WC port follow-up | Angular component measuring width & collapsing overflowing tags until WC port lands   |
| AddSelect        | In `@carbon/react`; WC port follow-up | Composable modal selection component wrapping `AddSelectData` until WC port lands     |
| ConditionBuilder | In `@carbon/react`; WC port follow-up | Port to Angular once WC equivalent is delivered                                       |

> Note: StructuredList and TimePicker moved to Tier 2 (WC equivalents confirmed
> in `@carbon/web-components`).

### Exit criteria

All Tier 3–5 Layer 1 Jest tests and Layer 2 Playwright tests green. All
Storybook `play()` functions pass IBM Equal Access checker with zero violations.

---

## Milestone 5 — Migration support

**Estimated effort:** 1 week **Depends on:** Milestone 1 (can be worked in
parallel with Milestone 4)

Codemods in `@carbon/upgrade` and the full migration guide. Follows the exact
conventions established by the WC v3 codemods in `packages/upgrade/transforms/`.

### Migration guide

`docs/guides/cca-to-angular.md` — one `## BREAKING:` section per intentional API
break, structured as:

```markdown
## BREAKING: <short description>

**Before (carbon-components-angular):** <old code>

**After (@carbon/angular):** <new code>

**Why:** <one sentence>

**Migration:** <exact find-and-replace or one-line change>
```

High-priority entries (affecting the most consumers):

1. Module import path: `carbon-components-angular` → `@carbon/angular`
2. `TableModel` / `TableHeaderItem` / `TableItem` removed → flat `[rows]`,
   `[headers]`
3. `notificationObj` removed → flat `[title]`, `[subtitle]`, `[caption]`
4. `PaginationModel` removed → `[totalItems]`, `[pageSize]`, `[page]`
5. `[navigationItems]` / `[menuItems]` / `[headerItems]` → projected children
6. `[theme]` removed on all components → global CSS custom properties via
   `@carbon/styles`
7. `appendInline` / `dropUp` / `scrollableContainer` → no replacement (Floating
   UI autoalign)

### Codemods

All transforms live in `packages/upgrade/transforms/` and are registered in
`packages/upgrade/src/upgrades.js`. Follow the model of
`wc-add-barrel-imports.js` and `wc-report-non-barrel-imports.js`.

| Transform name                | Type   | What it does                                                                            |
| ----------------------------- | ------ | --------------------------------------------------------------------------------------- |
| `cca-report-imports`          | report | Lists all `carbon-components-angular` imports with `@carbon/angular` equivalents        |
| `cca-update-module-imports`   | write  | Rewrites import sources from `carbon-components-angular` to `@carbon/angular`           |
| `cca-remove-table-model`      | write  | Replaces `TableModel` constructor + `[model]` binding with flat `[rows]` / `[headers]`  |
| `cca-remove-notification-obj` | write  | Replaces `notificationObj` object literal with flat prop inputs                         |
| `cca-remove-pagination-model` | write  | Replaces `PaginationModel` binding with flat `[totalItems]` / `[pageSize]` / `[page]`   |
| `cca-remove-theme-input`      | write  | Removes `[theme]="theme"` bindings (no replacement)                                     |
| `cca-report-ui-shell-nav`     | report | Flags `[navigationItems]` / `[menuItems]` array bindings requiring manual restructuring |

> `cca-report-ui-shell-nav` is report-only because restructuring template slots
> to projected children is not safely automatable.

Shared detection helper: `packages/upgrade/transforms/carbon-angular-imports.js`
(mirrors `carbon-wc-imports.js`).

### Storybook migration page

Expand `packages/angular/.storybook/docs/migration.mdx` (stubbed in Milestone 1)
with:

- Quick-start steps (install, run codemods, fix `:not(:defined)` elements)
- What stays the same (selectors, `[(ngModel)]`, SCSS imports)
- Full breaking-changes sections with Before/After `<Canvas>` examples
- Codemod command reference

### Exit criteria

Each transform has `__testfixtures__/` snapshot tests.
`npx @carbon/upgrade migrate cca-report-imports` runs against a fixture project
and produces correct output. `docs/guides/cca-to-angular.md` covers all breaks
listed in §7 of the plan.

---

## Milestone 6 — RC hardening

**Estimated effort:** 1 week **Depends on:** Milestones 4 and 5

Freeze the API, cut the Release Candidate, and satisfy the monorepo's v12
documentation requirement.

### Deliverables

- Resolve all open questions from §15 of `plan.md`:
  - Q2: Storybook Compodoc integration — decide and document
  - Q3: Secondary entry points (`@carbon/angular/button`) — decide and document
- Update `docs/migration/v12.md` with a `@carbon/angular` section covering:
  - Package installation and peer deps
  - All intentional API breaks (linking to `docs/guides/cca-to-angular.md`)
  - Codemod commands
- Full Layer 2 Playwright test run against the built Storybook
- Layer 3: all Storybook `play()` + IBM Equal Access — zero violations on all
  component stories
- Version bump to `1.0.0-rc.0`

### Exit criteria

CI green across all three test layers. `docs/migration/v12.md` accurately
reflects all consumer-visible behaviour and migration burden introduced by
`@carbon/angular`. API frozen.

---

## Summary

| Milestone        | Scope                             | Estimate                       | Version              |
| ---------------- | --------------------------------- | ------------------------------ | -------------------- |
| 0 — Scaffolding  | Toolchain, workspace, CI          | 2–3 days                       | —                    |
| 1 — PoC: Button  | End-to-end stack proof            | 2–3 days                       | —                    |
| 2 — Test sprint  | ~300+ failing Layer 1 tests       | 3–4 weeks                      | —                    |
| 3 — Tier 1 + 2   | ~46 simpler components green      | 5–7 weeks                      | `0.0.0-prerelease.1` |
| 4 — Tier 3–5     | Enterprise + DataTable + Adapters | 8–11 weeks                     | `0.0.0-prerelease.x` |
| 5 — Migration    | Codemods + migration guide        | 1 week (parallel with M4)      | —                    |
| 6 — RC hardening | API freeze, v12 docs, RC cut      | 1.5 weeks                      | `1.0.0-rc.0`         |
| **Total**        |                                   | **~5–6.5 months (1 engineer)** | `1.0.0` (v12 GA)     |

---

## Starting point

Milestone 0 is the unblocked first move. Nothing can be built until
`packages/angular/` exists as a valid Yarn workspace with a passing CI job. Open
that PR first.
