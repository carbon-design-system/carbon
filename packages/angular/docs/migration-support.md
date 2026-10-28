# Migration support: `carbon-components-angular` to `@carbon/angular`

**Status:** Draft, for discussion. Nothing in this document is implemented.
**Related:**
[ADR 0020](../../../docs/decisions/0020-angular-wholesale-cds-ng-prefix.md)
(accepted `cds-ng-*` prefix, 2026-10-27),
[`legacy-compatibility-matrix.md`](./legacy-compatibility-matrix.md),
[`plan.md`](./plan.md) §16, [`milestones.md`](./milestones.md) Milestone 5

This document records what we know about the cost of moving a
`carbon-components-angular` (CCA) application to `@carbon/angular`, and a
proposal for tooling: deterministic codemods where they are safe, and agent
skills for the rest.

## Constraints and what we do not know

- **No per-component usage data for CCA.** Telemetry for Angular is
  package-level only. Per-component data exists for React and web components
  only (confirmed with the telemetry team). We cannot size any component-level
  claim below from real usage.
- **Counts below are from the CCA source and are approximate.** They come from
  `temp/carbon-components-angular` (gitignored, not part of the repo) and from
  the generated
  [`legacy-compatibility-matrix.md`](./legacy-compatibility-matrix.md), which
  describes itself as "a triage aid, not a verified API diff". The two disagree
  slightly (see the table). Verify before relying on any number for a decision.
- **Nothing here has been run on a real application.**

## What CCA is, from the source

| Measure                                            | Value     | Source                                |
| -------------------------------------------------- | --------- | ------------------------------------- |
| Element selectors (`cds-*`)                        | 118       | grep of `src/`; matrix says 119       |
| Attribute-directive selectors (`[cds…]`)           | 62        | grep of `src/`; matrix lists 53 rows  |
| `*.module.ts` files (NgModules)                    | 64        | grep; matrix says 58                  |
| Injectable services                                | 17        | grep of `@Injectable`, non-spec files |
| `@Input()` declarations                            | 1,172     | grep                                  |
| `@Output()` declarations                           | 131       | grep                                  |
| `@Input()` that look like objects/arrays/templates | about 157 | rough grep, likely approximate        |
| Stories files                                      | 73        | `*.stories.ts`                        |
| Distinct tags used in stories                      | 102       | grep of `<cds-` / `<ibm-`             |
| Distinct attribute directives used in stories      | 52        | grep                                  |

CCA peer dependencies: Angular 14 to 21, `@carbon/styles ^1.56`, `rxjs`,
`zone.js ^0.11`. It does not depend on `@carbon/web-components`. CCA's Button is
an attribute directive (`[cdsButton], [ibmButton]`), confirmed in
`button/button.directive.ts`.

## The migration tax

Ordered roughly by how much work each is likely to cost a team. The ordering is
a judgment, not a measurement.

| #   | Change                                                                                                                             | Scope                                      | Automation                              |
| --- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------- |
| 1   | Rendering moves into shadow DOM (**not in the 14 listed breaks**)                                                                  | Every team that styles or tests Carbon DOM | Cannot be automated; needs review       |
| 2   | Model-shaped inputs (`items`, `model`, `notificationObj`, `tree`…)                                                                 | About 20 of 57 adapter-tier components     | Poor; agent skill with review           |
| 3   | Services (`ModalService`, `NotificationService`…) rewritten                                                                        | 17 services                                | Poor; agent skill with review           |
| 4   | Output names change (web component events are `cds-…` or native)                                                                   | Every component with outputs               | Partial; needs a verified mapping table |
| 5   | `ControlValueAccessor` value shapes change                                                                                         | 12 adapter-tier components                 | Manual or agent skill                   |
| 6   | Attribute directives become elements (for example `[cdsButton]`)                                                                   | 53 listed directives, 10 with behavior     | Partial; class toggles are mechanical   |
| 7   | Tag changes                                                                                                                        | 63 same-tag (add prefix) plus 32 renamed   | Mechanical                              |
| 8   | NgModule imports become standalone `imports: []`                                                                                   | All consumers                              | Mechanical                              |
| 9   | Import paths and package changes                                                                                                   | All consumers                              | Mechanical                              |
| 10  | Peer dependencies: `@carbon/styles` 1.x to 2.x, Angular `>=19` (ADR 0018), `@carbon/web-components` not needed (bundled, ADR 0020) | All consumers                              | Package manager, not codemod            |

### 1. Shadow DOM

This is the item most likely to be underestimated, and it is not in the list of
intentional breaks in `plan.md` §7.

- The web components render into shadow DOM. [`plan.md`](./plan.md) §13 already
  notes that `.cds--modal` "lives inside the WC's shadow DOM".
- From the CCA architecture described in `plan.md`, CCA renders its own DOM from
  Angular templates plus global SCSS. Application CSS and tests that reach into
  Carbon's internal DOM (`.cds--btn`, `.cds--modal`, and so on) would no longer
  match.
- Affected: global style overrides, `querySelector` in unit tests, end-to-end
  selectors (Cypress, Playwright), and ARIA references across the boundary.
- The supported replacements are CSS custom properties and `::part`. How many
  parts the web components expose, and whether they cover what teams override
  today, has not been checked.

This should be documented as a break, with guidance, before the first release
candidate.

### 2 to 5. API-shape changes

From the compatibility matrix, of 119 CCA element selectors:

| Tier           | Count | What it means for migration                                                                    |
| -------------- | ----- | ---------------------------------------------------------------------------------------------- |
| Thin           | 6     | Same tag, few differences.                                                                     |
| Adapter        | 57    | Same tag, but model-shaped inputs, low input overlap, or outputs.                              |
| Tag differs    | 32    | The web component tag differs from CCA's. Tag mappings are inferred from names and unverified. |
| No counterpart | 24    | No web component, or CCA-internal. Port, drop, or document.                                    |

Within the 57 adapter-tier rows: 20 have model-shaped inputs, 12 need
`ControlValueAccessor` mapping, 10 have large CCA templates. The matrix notes
that almost no web component events share CCA's output names, so every row with
outputs needs an output mapping.

### 6. Attribute directives

53 directives are listed in the matrix. About 43 are class or markup toggles
(`cdsGrid`, `cdsLayer`, `cdsText`, `cdsIcon`…). Ten carry behavior (`cdsDialog`,
`cdsOverflowMenu`, `cdsPopover`, `cdsPassword`, `cdsTable`, `routerLink` and
others). Classification in the matrix is by name and input count; files were not
read individually.

The generated wrappers come from a web component manifest, which describes
elements, so they do not produce directives. Whether these directives are
ported, replaced by elements, or dropped is undecided.

## Proposed tooling

### Principle

A codemod changes only what it is certain about and reports everything else. An
agent skill handles what needs reading the surrounding code. Both read one
shared mapping file so they cannot disagree.

### Why the `cds-ng-*` prefix helps (ADR 0020, accepted)

- A tool can tell a CCA `<cds-modal>` from a migrated `<cds-ng-modal>`, so a
  codemod is idempotent and can run file by file.
- The tag rule is simple: prepend `ng-` for same-tag components, use a lookup
  table for the 32 renamed ones. About 95 of 119 element selectors are covered.
- Both libraries can be installed at once for incremental migration. This is
  shown for the Modal and the Dropdown in the coexistence spike (ADR 0020 open
  question 1); other components are untested.

### Tiers

| Tier                    | What                                                                                                                                         | Mechanism                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **A. Deterministic**    | Import paths. Tags (opening and closing, including `ibm-` variants). Table renames. `*Module` to standalone `imports`.                       | Codemod, safe to run with `--write`.                     |
| **B. Codemod + report** | `[cdsButton]` to element. Removed inputs (`[theme]`, `appendInline`, `dropUp`). Output and input renames.                                    | Codemod where the mapping is verified; report otherwise. |
| **C. Agent skill**      | `[items]` arrays to slotted children. `notificationObj`, `TableModel`, `PaginationModel`. Modal and notification services. CVA value shapes. | Skill with human review.                                 |
| **D. Judgment**         | Global CSS overrides and test selectors that depend on Carbon internals (shadow DOM).                                                        | Documentation and a checklist.                           |

Tiers C and D hold most of the real effort. The codemods will produce most of
the changed lines but few of the hard decisions.

### Technical constraints on the codemods

- [`@carbon/upgrade`](../../upgrade/src/jscodeshift.js) runs jscodeshift with
  the Babel parser. [`upgrades.js`](../../upgrade/src/upgrades.js) selects only
  `*.js`, `*.jsx`, `*.ts` and `*.tsx`. It cannot parse Angular `.html`
  templates.
- Angular templates are usually external `.html` files, or inline in a
  component's `template:`. Tier A tag and attribute changes need a
  template-aware path.
- Options for template parsing:
  - Use the consumer's own `@angular/compiler`. It is installed in every Angular
    project. Not checked: how `@carbon/upgrade` would resolve it from the
    consumer's workspace.
  - Bundle an HTML parser. Adds a dependency, and may mishandle Angular syntax
    (`@if`, `*ngFor`, `[(ngModel)]`).
  - Regex rewriting. Fast to build, fragile, not recommended for `--write`.
- TypeScript changes (imports, component `imports: []`, service usage) can use
  the existing jscodeshift path.
- Conventions to follow are in the existing `wc-*` transforms: a shared
  detection helper
  ([`carbon-wc-imports.js`](../../upgrade/transforms/carbon-wc-imports.js)),
  report-first, dry run by default, `--write` to apply.

### Shared mapping file

One machine-readable file read by codemods and skills. It should hold:

- CCA selector to new tag, including the 32 renames
- input renames and removals
- output renames
- components with model-shaped inputs, and the strategy for each
- attribute directive to element (or "dropped")

[`legacy-compatibility-matrix.md`](./legacy-compatibility-matrix.md) is the
starting point, but it is generated by name-matching and says the tag mappings
are unverified and the outputs are not compared. It must be checked by hand
before a codemod writes files from it.

### Handoff from codemod to skill

1. The codemod run writes a work list (JSON or markdown) of everything it did
   not change, tagged by category: model-shaped input, service, CVA, CSS
   override.
2. A skill reads the work list and follows a per-category recipe: before and
   after examples, edge cases, a verification checklist.
3. The skill runs the project's tests where it can and flags anything it is not
   sure about.

Draft one skill per category rather than one large skill.

### Test corpus

CCA's own stories are real CCA templates. 73 stories files use 102 distinct tags
and 52 attribute directives. They can serve as input fixtures. We have not
checked whether they compile after transformation, and stories do not cover
services (no story file in `src/` references `ModalService`,
`NotificationService` or `PlaceholderService`).

### Reconciling two existing codemod lists

`plan.md` §16 proposes seven transforms (`cca-report-imports`,
`cca-update-module-imports`, `cca-remove-table-model`,
`cca-remove-notification-obj`, `cca-remove-pagination-model`,
`cca-remove-theme-input`, `cca-report-ui-shell-nav`). `milestones.md` Milestone
5 proposes three (`cca-to-legacy`, `cca-to-angular`, `cca-report-legacy-usage`).
They conflict. If legacy is dropped or scoped down, the second list falls away
and the first list needs tag, output and directive transforms added.

## Open questions

1. **Where do agent skills live, and who runs them?** There is no skills
   directory in the repo. `.bob/` contains only `custom_modes.yaml`. Options:
   ship with `@carbon/upgrade`, place under `docs/guides/`, or keep
   tool-specific. Recommendation: keep recipe content tool-neutral (plain
   markdown), and add thin wrappers per tool.
2. **How is the shared mapping file produced and kept correct?** Generated from
   the CCA source and the web component manifest, then hand-verified. Who owns
   verification? Does it ship in `@carbon/upgrade`?
3. **How does `@carbon/upgrade` parse Angular templates?** See constraints
   above.
4. **Shadow DOM guidance.** How many `::part`s and CSS custom properties do the
   web components expose, and do they cover the overrides teams make today?
5. **Attribute directives.** Port (the matrix says "styles only" for most),
   replace with elements, or drop? This is also where the 10 behavior-bearing
   directives need individual review.
6. **Services.** `ModalService`, `NotificationService` and similar create
   components dynamically. What replaces them, and is the replacement part of
   `@carbon/angular` or documentation only?
7. **Sizing without telemetry.** Per-component CCA usage is unavailable.
   Alternatives that measure real usage: run an import-reporting codemod
   (`cca-report-imports`) on repositories from 5 to 10 IBM product teams, or a
   GitHub code search for `carbon-components-angular/<module>` imports. Both are
   proposals; neither has been done.
8. **`@carbon/angular/legacy`: decided, abandoned (2026-10-26).** It was removed
   because adapters make a two-step migration and migration is not trivial even
   with them. The codemod plan is the `plan.md` §16 set plus tag, output and
   directive transforms, and the migration cost moves to consumers, mostly in
   the roughly 20 model-shaped components. What was removed is listed in
   [`status-and-open-questions.md`](./status-and-open-questions.md). **Decided
   2026-10-28: no convenience components in core.** Start from a clean slate.
   Migration support is a combination of codemods and agent skills.
9. **Ownership of questions 1 to 7.** Decided 2026-10-28: they are part of the
   plan and milestones (Milestone 5). The maintainer has no answers yet and may
   delegate them to a developer.
10. **Migration doc.** Decided 2026-10-28: `@carbon/angular` is not behind a v12
    feature flag, so it gets its own migration doc,
    `docs/guides/cca-to-angular.md`, for consumers coming from
    `carbon-components-angular`. It does not yet exist.

## Suggested order

1. ~~Resolve the `cds-*` versus `cds-ng-*` decision (ADR 0020).~~ Accepted
   2026-10-27: `cds-ng-*`. Update every rule above to it.
2. Verify the mapping data for the 32 tag renames and the roughly 20
   model-shaped components.
3. Build Tier A for template files, using the CCA stories as fixtures.
4. Write the shadow DOM guidance.
5. Draft the first skill, probably `[items]` to slotted children, since it
   covers Dropdown, ComboBox, Select and MultiSelect.
