# `@carbon/angular` — Implementation Milestones

**Status:** Pre-implementation **Source plan:** [`plan.md`](./plan.md) **Package
location:** `packages/angular/` **Package names:** `@carbon/angular` (Automated
Core) & `@carbon/angular/legacy` (Migration Adapters)

This document breaks the `@carbon/angular` implementation plan into seven
focused milestones, leveraging the **automated core wrapper generator** and
**`@carbon/angular/legacy` secondary entry point** to deliver full component
coverage in **~2.5–3 months** (down from the original 5–6.5 month estimate).

---

## Milestone 0 — Package & secondary entry point scaffolding

**Estimated effort:** 2–3 days **Unblocks:** All subsequent milestones

Establishes the Yarn workspace, `ng-packagr` dual-entry-point build, test
runners, Storybook, and CI workflow.

### Deliverables

- `packages/angular/package.json`
  - `name: "@carbon/angular"`, `version: "0.0.0-prerelease.0"`
  - Peer deps: `@angular/common >=20`, `@angular/core >=20`,
    `@angular/forms >=20`, `@carbon/styles >=2`
    ([ADR 0018](../../../docs/decisions/0018-angular-supported-major-versions.md))
  - Deps: `@carbon/web-components` (hard dependency — wraps WC directly)
- `packages/angular/ng-package.json` — Root ng-packagr entry point
  (`@carbon/angular`)
- `packages/angular/legacy/ng-package.json` — Secondary entry point
  (`@carbon/angular/legacy`)
- `packages/angular/tsconfig.json` — strict Angular + Ivy partial compilation
  options
- `packages/angular/src/index.ts` — root barrel export
- `packages/angular/legacy/src/index.ts` — legacy barrel export
- `packages/angular/jest.config.js` + `jest-preset-angular` setup
- `packages/angular/playwright.config.ts` — points at the Storybook build URL
- `packages/angular/.storybook/main.ts` + `.storybook/preview.ts`
  (`@storybook/angular`)
- `packages/angular/README.md` — installation instructions and architecture
  overview

### CI

Add a CI workflow that runs:

- `yarn workspace @carbon/angular build` (builds both `@carbon/angular` and
  `@carbon/angular/legacy`)
- `yarn workspace @carbon/angular test`
- `yarn workspace @carbon/angular storybook:build`

### Exit criteria

`yarn workspace @carbon/angular build` succeeds and produces valid APF outputs
(`esm2022` + `fesm2022`) for both `@carbon/angular` and
`@carbon/angular/legacy`. CI is green.

---

## Milestone 1 — Automated wrapper generator & PoC

**Estimated effort:** 3–4 days **Depends on:** Milestone 0

Builds the Custom Elements Manifest (CEM) wrapper generator task and validates
both the automated 1:1 core path (`Button`) and the specialized legacy adapter
path (`Dropdown`).

### Deliverables

- `packages/angular/tasks/generate-wrappers/`
  - Reads `packages/web-components/custom-elements.json`
  - Generates standalone component class with `defineCustomElement` (real tag,
    ADR 0015)
  - Reflects `@Input()` attributes & properties and maps `@Output()` custom
    events
  - Generates `ControlValueAccessor` (CVA) for form-associated elements
  - Generates companion Layer 1 Jest reflection specs (`<Name>.spec.ts`)
- Automated PoC: `src/generated/Button/` generated via pipeline, tested in
  `src/stories/Button/`
- Legacy PoC: `legacy/src/components/Dropdown/` (CCA-compatible `[items]` array
  adapter)
- Layer 1 Jest test + Layer 2 Playwright test + Storybook story for Button and
  Dropdown
- `.storybook/docs/welcome.mdx` & `.storybook/docs/migration.mdx` stubs

### Exit criteria

- Generator successfully parses `custom-elements.json` and emits working Angular
  components
- All 3 test layers pass on both PoC components
- Equal Access a11y checker reports zero violations on PoC stories

---

## Milestone 2 — Automated core rollout (~110+ component families)

**Estimated effort:** 1 week **Depends on:** Milestone 1

Executes the wrapper generator across the full `@carbon/web-components` catalog,
delivering 100% component coverage for `@carbon/angular` core.

### Deliverables

- Generated wrappers in `src/generated/` covering:
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
- Generated Layer 1 Jest reflection tests for all components (~300+ tests)
- `src/index.ts` public barrel re-exporting all generated components

### Exit criteria

- All generated components compile cleanly with `ng-packagr`
- All ~300+ generated Layer 1 Jest tests execute and pass in CI
- Version bumped to `0.0.0-prerelease.1`

---

## Milestone 3 — Specialized legacy adapters (`@carbon/angular/legacy`)

**Estimated effort:** 3–4 weeks **Depends on:** Milestone 2

Hand-craft the ~15–20 compatibility wrappers in `@carbon/angular/legacy` to
ensure drop-in migration for existing `carbon-components-angular` applications.

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

## Milestone 5 — Migration support & codemods

**Estimated effort:** 1–2 weeks **Depends on:** Milestone 3 (can run in parallel
with Milestone 4)

Provides the migration guide and `@carbon/upgrade` codemods for seamless
transitions.

### Deliverables

- **Migration Guide (`docs/guides/cca-to-angular.md`):** Complete guide
  detailing:
  - Step 1: Drop-in migration via `@carbon/angular/legacy`
  - Step 2: Incremental modernization to `@carbon/angular`
- **`@carbon/upgrade` Codemods (`packages/upgrade/transforms/`):**
  - `cca-to-legacy` — Rewrites `carbon-components-angular` import paths to
    `@carbon/angular/legacy`
  - `cca-to-angular` — Modernizes imports from `@carbon/angular/legacy` to
    `@carbon/angular`
  - `cca-report-legacy-usage` — Generates a report of remaining legacy adapter
    usages in a codebase
- **Storybook Migration Page:** Co-located migration guide at
  `.storybook/docs/migration.mdx`

### Exit criteria

- Codemods have complete snapshot fixtures in `packages/upgrade/` and execute
  cleanly on sample projects

---

## Milestone 6 — RC hardening & v12 documentation

**Estimated effort:** 1 week **Depends on:** Milestones 4 and 5

Freezes the API and cuts the Release Candidate.

### Deliverables

- Update `docs/migration/v12.md` with `@carbon/angular` and
  `@carbon/angular/legacy` consumption details
- Full test pass across both entry points in CI
- Version bump to `1.0.0-rc.0`

### Exit criteria

- CI green across all tests, linters, and typechecks. v12 migration
  documentation accurate and complete.

---

## Summary

| Milestone                  | Scope                                               | Estimate          | Version              |
| :------------------------- | :-------------------------------------------------- | :---------------- | :------------------- |
| **0 — Scaffolding**        | Workspace, dual entry points, toolchain             | 2–3 days          | —                    |
| **1 — Generator & PoC**    | CEM generator, Button & Dropdown PoC                | 3–4 days          | —                    |
| **2 — Automated Core**     | ~110+ components / 297+ custom elements generated   | 1 week            | `0.0.0-prerelease.1` |
| **3 — Legacy Adapters**    | ~15–20 CCA compatibility wrappers in `/legacy`      | 3–4 weeks         | `0.0.0-prerelease.2` |
| **4 — Integration & A11y** | Playwright tests + IBM Equal Access checker         | 2–3 weeks         | `0.0.0-prerelease.x` |
| **5 — Migration Tooling**  | Codemods (`cca-to-legacy`, `cca-to-angular`) & docs | 1–2 weeks         | —                    |
| **6 — RC Hardening**       | Documentation, v12 guide, RC release                | 1 week            | `1.0.0-rc.0`         |
| **Total**                  |                                                     | **~2.5–3 months** | `1.0.0` (v12 GA)     |
