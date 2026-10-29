# `@carbon/angular` — Implementation Milestones

**Status:** In progress, partly out of date. See
[`status-and-open-questions.md`](./status-and-open-questions.md) for the current
state. Milestones 0, 1 and 2 are largely done (scaffolding, generator, 287
generated wrappers, 97 secondary entries). **`@carbon/angular/legacy` was
abandoned and removed on 2026-10-26**, so Milestone 3 is cancelled. Milestone 5
was rewritten on 2026-10-28 around codemods plus agent skills; see
[`migration-support.md`](./migration-support.md) and ADR 0020. The estimates
below included legacy adapters and are no longer valid. **Source plan:**
[`plan.md`](./plan.md) **Package location:** `packages/angular/` **Package
name:** `@carbon/angular` (Automated Core)

## Follow-up PRs (decided 2026-10-28)

The first PR (`feat/angular`) lands the package, the generator, the entry-point
build and 7 ported components. It does **not** wait for, and does not include,
the items below. Each is a future PR.

| Follow-up PR                            | What                                                                                                                                                                                                                                                                                                       | Milestone |
| :-------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------- |
| **Scope freeze and full coverage**      | Wait for `condition-builder`, `scroll-gradient` and `tag-overflow` (ADR 0009) and any other components that join `@carbon/web-components` before v12 scope is frozen. The generator needs no change: it wraps every `cds-` tag in the manifest. Add stories and parity specs for the remaining components. | 2         |
| **Migration tooling**                   | Codemods, agent skills, template parsing, the mapping file and shadow DOM guidance. See Milestone 5 for the open questions. May be delegated to a developer.                                                                                                                                               | 5         |
| **Manifest type gaps**                  | The generator reads the Custom Elements Manifest. Remaining gaps need the manifest to describe more: typed event payloads (`EventEmitter<any>` → `EventEmitter<T>`) and type aliases it leaves unresolved. See `developer-experience.md`.                                                                  | 2         |
| **Router integration directives**       | `CdsRouterLinkDirective` for side-nav links, header nav items, breadcrumb links, and navigation tabs. See Milestone 4.5 for the full spec.                                                                                                                                                                 | 4.5       |
| **`Loading-test.js`**                   | Separate PR for the `:modal` stub change. The patch is in the gitignored `temp/loading-test-modal-stub.patch`.                                                                                                                                                                                             | —         |
| **Modal `EnableDialogElement` story**   | Hold until the dialog version of Modal is stable.                                                                                                                                                                                                                                                          | 4         |
| **Dropdown `WithToggletipLabel` story** | `ToggletipComponent` is generated, but the WC story uses imperative Storybook controls that need an established Angular template pattern. Implement when the pattern is set for another component.                                                                                                         | 2         |

Not yet assigned to a PR (decided only that they are needed): the CI Angular
version matrix (Milestone 0, ADR 0018), and `docs/guides/cca-to-angular.md`
(Milestone 5). ~~`standalone: true` removal~~ — done 2026-10-28. Two decisions
are also open: the `@carbon/styles` peer range, and whether
`docs/migration/v12.md` gets a short entry (Milestone 6) — the section was
added; confirm whether more is needed.

This document breaks the `@carbon/angular` implementation plan into seven
focused milestones, leveraging the **automated core wrapper generator**.
Mentions of the `@carbon/angular/legacy` entry point below are the historical
plan and are superseded.

---

## Milestone 0 — Package & secondary entry point scaffolding

**Estimated effort:** 2–3 days **Unblocks:** All subsequent milestones

Establishes the Yarn workspace, `ng-packagr` dual-entry-point build, test
runners, Storybook, and CI workflow.

### Deliverables

- `packages/angular/package.json`
  - `name: "@carbon/angular"`, `version: "0.0.0-prerelease.0"`
  - Peer deps: `@angular/common >=19`, `@angular/core >=19`,
    `@angular/forms >=19`, `@carbon/styles >=2`
    ([ADR 0018](../../../docs/decisions/0018-angular-supported-major-versions.md))
  - No `@carbon/web-components` peer. ADR 0020 (accepted 2026-10-27) bundles a
    prefixed copy instead, and the peer was removed on 2026-10-28.
- `.entries/ng-package.json` — root ng-packagr entry point, written by
  `tasks/build-entries` (no checked-in `ng-package.json`). A secondary entry
  point per web component folder sits beside it (97 today). There is no
  `@carbon/angular/legacy`.
- `packages/angular/tsconfig.json` — strict Angular + Ivy partial compilation
  options
- `packages/angular/jest.config.js` + `jest-preset-angular` setup
- `packages/angular/playwright.config.ts` — points at the Storybook build URL
- `packages/angular/.storybook/main.ts` + `.storybook/preview.ts`
  (`@storybook/angular`)
- `packages/angular/README.md` — installation instructions and architecture
  overview

### CI

> **Partly done.** `.github/workflows/ci.yml` has `angular-test` and
> `angular-e2e` jobs, skipped unless `packages/angular/**` changed. They run on
> one Angular version. The version matrix below is not set up.

Add a CI workflow that runs:

- `yarn workspace @carbon/angular build`
- `yarn workspace @carbon/angular test`
- `yarn workspace @carbon/angular storybook:build`
- a matrix over the supported Angular majors (19 up to "latest"), where "latest"
  is the newest Angular version Angular itself supports. ADR 0018 proposes
  pinning the major number in the matrix and bumping it, rather than a floating
  dist-tag. Not confirmed, and toolchain support for Angular 22 is unchecked.

### Cleanup before review

- Remove `standalone: true` from the generated components (ADR 0018).

### Exit criteria

`yarn workspace @carbon/angular build` succeeds and produces valid APF outputs
(`esm2022` + `fesm2022`) for `@carbon/angular` and every secondary entry point.
CI is green. **The CI half is not met yet.**

---

## Milestone 1 — Automated wrapper generator & PoC

**Estimated effort:** 3–4 days **Depends on:** Milestone 0

Builds the wrapper generator task and validates the automated 1:1 path on the
`Button`. (The specialized legacy adapter path on the `Dropdown` was cancelled
with the legacy entry point.)

### Deliverables

- `packages/angular/tasks/generate-wrappers/`
  - Reads `packages/web-components/custom-elements.json` (Custom Elements
    Manifest since #23872)
  - Generates a standalone component class that imports the web component's
    folder barrel (ADR 0015, ADR 0020)
  - Reflects `@Input()` attributes & properties and maps `@Output()` custom
    events
  - Generates `ControlValueAccessor` (CVA) for form-associated elements
  - Does **not** generate specs or stories; they are hand-written (ADR 0019).
    Corrected 2026-10-28.
- Automated PoC: `src/generated/Button/` generated via pipeline, tested in
  `src/stories/Button/`
- Layer 1 Jest test + Layer 2 Playwright test + Storybook story for Button, then
  for Accordion, ActionSet, Checkbox, Dropdown, Modal and TextInput
- `.storybook/docs/welcome.mdx` & `.storybook/docs/migration.mdx` (both exist;
  `migration.mdx` is incomplete)

### Exit criteria

- Generator successfully parses `custom-elements.json` and emits working Angular
  components
- Jest and Playwright layers pass on the ported components (250 and 36 at last
  run; Playwright not re-run after the latest story additions)
- Equal Access a11y checker reports zero violations on the stories. **Not
  verified in this review.**

---

## Milestone 2 — Automated core rollout (~110+ component families)

**Estimated effort:** 1 week **Depends on:** Milestone 1

Executes the wrapper generator across the full `@carbon/web-components` catalog,
delivering 100% component coverage for `@carbon/angular` core.

### Deliverables

- Generated wrappers in `.entries/<entry>/` covering:
  - Core primitives (Checkbox, Radio, Toggle, Tag, Loading, TextInput, TextArea,
    NumberInput, Search, Link, Layer, etc.)
  - Fluid form variants (12 variants)
  - AI component family (ai-label, ai-skeleton variants, slug)
  - UI Shell family (19 elements)
  - Display & layout primitives (combo-button, copy-button, tree-view,
    contained-list, stack, etc.)
  - Enterprise & IBM Products catalog (26+ families: PageHeader, Tearsheet,
    SidePanel, Card, Coachmark, ActionSet, Dialog, Resizer, TruncatedText,
    UserAvatar, etc.)
- Hand-written Layer 1 Jest specs for the ported components. The generator does
  not emit tests or stories (corrected 2026-10-28).
- `src/index.ts` public barrel re-exporting all generated components

### Scope (decided 2026-10-28)

- **No convenience components in core.** Start from a clean slate. Migration
  support is codemods plus agent skills.
- **The first release must have full `@carbon/web-components` coverage**,
  including components still merging from Carbon for IBM Products. The scope
  freeze waits for `condition-builder`, `scroll-gradient` and `tag-overflow`
  (ADR 0009), which are not yet in `packages/web-components/src/components/`.
  **This is a follow-up PR; the first PR does not wait for it.**
- **No classic or fluid Date Pickers.** Wait for a fluid picker without
  flatpickr in the web components.
- **Manifest moves to CEM.** Done 2026-10-29: the generator reads the CEM from
  #23872, which also includes the skeleton classes, so `SYNTHETIC_TAGS` is
  removed.

### Exit criteria

- All generated components compile cleanly with `ng-packagr`
- Jest suites pass in CI
- Scope freeze done and every web component has a wrapper (follow-up PR)
- Version bumped to `0.0.0-prerelease.1`

---

## Milestone 3 — Specialized legacy adapters (`@carbon/angular/legacy`)

> **Cancelled 2026-10-26.** The legacy entry point was abandoned and removed.
> The text below is kept as the historical plan. The 3 to 4 weeks it covered are
> not being spent; the cost moves to consumers and to the codemods in
> Milestone 5.

**Estimated effort:** 3–4 weeks **Depends on:** Milestone 2

Hand-craft the ~15–20 compatibility wrappers in `@carbon/angular/legacy` to
ensure drop-in migration for existing `carbon-components-angular` applications.

> The compatibility matrix lists 57 adapter-tier components and 32 tag renames,
> not 15 to 20, and the estimate below predates it. See
> [`status-and-open-questions.md`](./status-and-open-questions.md).

### Deliverables

Specialized adapter components in `legacy/src/components/` (all marked
`@deprecated`):

- **`Dropdown` / `Select` / `MultiSelect`:** `[items]` array → slot
  materialization, `itemValueKey` mapping
- **`FileUploader`:** Angular-managed file upload state tracking machine
- **`DataTable`:** `[rows]` / `[columns]` array binding with
  `cellTemplate: TemplateRef` projection
- **`Tabs` / `Accordion`:** Compatibility wrappers with `closeOthers` event
  interception
- **`ComboBox`:** Server-side async filter mode adapter
- **`Notification` (Inline, Toast, Actionable):** `notificationObj` model
  adapter
- **`Pagination`:** Flat input bindings adapter
- **`Slider`:** Range mode tuple `[number, number]` CVA mapping
- **`DatePicker`:** Preview DatePicker wrapper with ISO8601 string CVA mapping
- Layer 1 Jest tests for all legacy adapters asserting CCA compatibility
  behaviors

### Exit criteria

- All legacy adapter tests green
- Build emits clean `@carbon/angular/legacy` secondary entry point
- Version bumped to `0.0.0-prerelease.2`

---

## Milestone 4 — Layer 2 integration & Layer 3 a11y tests

**Estimated effort:** 2–3 weeks **Depends on:** Milestone 3

Validates interactive behavior and accessibility against live browser runs.

### Deliverables

- **Layer 2 Playwright Tests:** Interaction suites covering keyboard navigation,
  focus restoration, modal trapping, calendar popups, and dropdown interactions
- **Layer 3 Storybook A11y:**
  - One-for-one Storybook story parity with `@carbon/web-components`
  - Interactive `play()` functions for stateful stories
  - IBM Equal Access checker (`storybook-addon-accessibility-checker`) running
    on all stories with 0 violations

### Exit criteria

- All Playwright test suites green in CI
- IBM Equal Access checker reports zero violations across all component stories

---

## Milestone 4.5 — Router integration directives

**Estimated effort:** 3–5 days **Depends on:** Milestone 2 (can run in parallel
with Milestone 4) **Priority:** ship before v1.0

Angular SPAs navigate programmatically through the Angular `Router`. The web
components that render `<a>` tags inside their shadow DOM
(`cds-ng-side-nav-link`, `cds-ng-header-nav-item`, `cds-ng-breadcrumb-link`,
`cds-ng-tab`) cannot participate in Angular's `[routerLink]` /
`RouterLinkActive` mechanism directly because those directives attach to
elements in Angular's component tree, not inside shadow roots. Without this
milestone, a team building a Carbon SPA gets full-page reloads on every nav
click and no active-route styling on the nav.

### What the fix looks like

A thin **attribute directive per navigating component family**, sharing a common
base. The directive:

1. Accepts `[cdsRouterLink]` — same input shape as Angular's built-in
   `[routerLink]` (a string, an array of segments, or `null`).
2. Resolves the URL via `Router.createUrlTree()` + `Router.serializeUrl()` and
   writes the result to the host element's `href` property (forwarded to the
   inner `<a>` by the web component).
3. Intercepts the host element's `click` event and calls
   `router.navigateByUrl(url, { replaceUrl })` instead of letting the browser
   follow the `href`. This keeps the SPA navigation model intact and fires route
   guards.
4. Subscribes to `Router.events` (filtering `NavigationEnd`) and compares the
   active URL to the directive's resolved URL. When they match it sets the web
   component's `active` property to `true` (and clears all siblings); when they
   don't it sets `active` to `false`. This replaces `RouterLinkActive`.
5. Tears down cleanly: the `click` listener is removed in `ngOnDestroy` and the
   `Router.events` subscription is unsubscribed.

### Component families in scope

| Directive selector                         | Host component             | WC property written                         |
| ------------------------------------------ | -------------------------- | ------------------------------------------- |
| `cds-ng-side-nav-link[cdsRouterLink]`      | `SideNavLinkComponent`     | `href`, `active`                            |
| `cds-ng-side-nav-menu-item[cdsRouterLink]` | `SideNavMenuItemComponent` | `href`, `active`                            |
| `cds-ng-header-nav-item[cdsRouterLink]`    | `HeaderNavItemComponent`   | `href`, `active`                            |
| `cds-ng-header-menu-item[cdsRouterLink]`   | `HeaderMenuItemComponent`  | `href`, `active`                            |
| `cds-ng-breadcrumb-link[cdsRouterLink]`    | `BreadcrumbLinkComponent`  | `href` (no `active`)                        |
| `cds-ng-tab[cdsRouterLink]`                | `TabComponent`             | `href` (selection via `cds-ng-tabs` parent) |

`cds-ng-link` (inline body links) uses the same directive. Tab active-state is
more complex because selection is owned by the parent `cds-ng-tabs`; the
directive sets `href` and lets the web component's own selection logic handle
the rest.

### Implementation notes

- The base class `CdsRouterLinkBase` holds the URL resolution, click
  interception, and `NavigationEnd` subscription. Each per-family directive
  extends it and overrides the `active` property name if the WC uses a different
  attribute (e.g. `aria-current` on breadcrumb links).
- The directive must call `markForCheck()` when it sets `active`, since the
  generated wrappers use `OnPush`.
- The directive should be exported from the relevant secondary entry point (e.g.
  `@carbon/angular/side-nav`, `@carbon/angular/ui-shell`) so consumers import
  only what they use.
- `[cdsRouterLink]="null"` disables the directive (removes the `href`, stops
  interception). Mirrors Angular's own `[routerLink]="null"` behaviour.
- Fragment (`#section`) and query-param support should follow Angular's
  `[routerLink]` contract (`fragment`, `queryParams` inputs).

### Migration codemod

The `cca-to-angular` codemod replaces:

- `[route]="path"` / `[useRouter]="true"` → `[cdsRouterLink]="path"`
- `[activeLinkClass]="cls"` → `[routerLinkActive]="cls"` on the wrapper element
  (Angular's built-in `RouterLinkActive` detects the `cdsRouterLink` directive
  via the injected `RouterLink` token, which `CdsRouterLinkBase` provides).
- `[isCurrentPage]="bool"` → `[active]="bool"` (pass-through to the WC `active`
  property; not router-driven).

### Deliverables

- `packages/angular/src/directives/router-link/` — base class and per-family
  directives
- Jest specs: URL resolution, click interception, `NavigationEnd` active-state
  toggle, `[cdsRouterLink]="null"` no-op, `ngOnDestroy` cleanup
- Playwright e2e spec against a two-route Storybook story: clicking a
  `cds-ng-side-nav-link` navigates without a page reload and the link gets
  `active`; the previous link loses `active`
- Storybook stories: `WithRouter` variant for SideNav and HeaderNav
- Exports added to `@carbon/angular/side-nav` and `@carbon/angular/ui-shell`
  secondary entries
- `developer-experience.md` "What the wrappers give today" updated once shipped

### Exit criteria

- Jest suite green
- Playwright `WithRouter` story passes in Chromium
- `tsc -p tsconfig.storybook.json --noEmit` clean
- CCA migration: `[route]` / `[useRouter]` / `[activeLinkClass]` noted in
  `docs/guides/cca-to-angular.md` with the codemod target

---

## Milestone 5 — Migration support & codemods

**Estimated effort:** to be re-estimated. **Depends on:** Milestone 2 (can run
in parallel with Milestone 4)

> **Rewritten 2026-10-28.** The legacy entry point is gone, so the two-step
> guide and the `cca-to-legacy` / `cca-to-angular` / `cca-report-legacy-usage`
> codemods no longer apply. Migration support is now codemods plus agent skills,
> with no convenience components in core. See
> [`migration-support.md`](./migration-support.md).
>
> **Delivered in a future PR (decided 2026-10-28), not the first one.** Nothing
> below is built.

### Deliverables

- **Migration guide (`docs/guides/cca-to-angular.md`), not yet written.** A
  separate document for `carbon-components-angular` (CCA) users.
  `@carbon/angular` is new in v12 and not behind a feature flag, so this guide,
  not `docs/migration/v12.md`, is where CCA users start. It covers the peer
  requirement on `@carbon/styles`, tag and selector renames, `[items]` array
  inputs becoming slotted children, shadow DOM styling, and what cannot be
  automated.
- **`@carbon/upgrade` codemods (`packages/upgrade/transforms/`):** the seven
  transforms in `plan.md` §16, plus tag, output and directive transforms.
- **Agent skills** for the cases a codemod cannot handle.
- **Storybook migration page:** `.storybook/docs/migration.mdx`. It currently
  calls `docs/guides/cca-to-angular.md` the authoritative reference, which is
  wrong until the guide exists.

### Open questions (no answers yet, may be delegated to a developer)

1. Where do the agent skills live in the repo, and how are they distributed?
2. How does `@carbon/upgrade` parse Angular templates?
3. How is the CCA-to-Carbon mapping file verified against both packages?
4. What shadow DOM styling guidance do consumers get?
5. **CCA services (`ModalService`, `NotificationService`):** no v1.0 equivalent.
   The migration guide tells consumers to use declarative `[open]="isOpen"`
   bindings instead. A post-v1.0 GitHub issue tracks demand for programmatic
   service helpers; if demand is confirmed they are scoped to a separate PR and
   do not block the release. See `developer-experience.md` for rationale.
6. How are CCA directives handled?

### Exit criteria

- Codemods have complete snapshot fixtures in `packages/upgrade/` and execute
  cleanly on sample projects
- The migration guide exists and the open questions above are answered or
  explicitly deferred

---

## Milestone 6 — RC hardening & v12 documentation

**Estimated effort:** 1 week **Depends on:** Milestones 4 and 5

Freezes the API and cuts the Release Candidate.

### Deliverables

- `docs/guides/cca-to-angular.md` finished (see Milestone 5)
- Decide whether `docs/migration/v12.md` also gets a short `@carbon/angular`
  entry pointing at the CCA guide. **Undecided.** `AGENTS.md` requires v12
  behavior changes to update that file.
- Decide the `@carbon/styles` peer range (`^2.0.0-alpha.3` today).
  **Undecided.**
- Full test pass in CI
- Version bump to `1.0.0-rc.0`

### Exit criteria

- CI green across all tests, linters, and typechecks. Migration documentation
  accurate and complete.

---

## Summary

| Milestone                      | Scope                                                  | Estimate          | Version              |
| :----------------------------- | :----------------------------------------------------- | :---------------- | :------------------- |
| **0 — Scaffolding**            | Workspace, dual entry points, toolchain                | 2–3 days          | —                    |
| **1 — Generator & PoC**        | Wrapper generator, Button PoC                          | 3–4 days          | —                    |
| **2 — Automated Core**         | 296 wrappers generated; scope freeze pending           | 1 week            | `0.0.0-prerelease.1` |
| **3 — Legacy Adapters**        | Cancelled 2026-10-26                                   | —                 | —                    |
| **4 — Integration & A11y**     | Playwright tests + IBM Equal Access checker            | 2–3 weeks         | `0.0.0-prerelease.x` |
| **4.5 — Router Integration**   | `CdsRouterLinkDirective` for all navigating components | 3–5 days          | `0.0.0-prerelease.x` |
| **5 — Migration Tooling**      | Codemods, agent skills & CCA migration guide           | to re-estimate    | —                    |
| **6 — RC Hardening**           | Documentation, v12 guide, RC release                   | 1 week            | `1.0.0-rc.0`         |
| **Total**                      |                                                        | **~2.5–3 months** | `1.0.0` (v12 GA)     |
| **Post-v1.0 — Services (TBD)** | Programmatic modal/notification helpers (demand-gated) | —                 | post-`1.0.0`         |
