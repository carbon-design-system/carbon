# `@carbon/angular`: status and open questions

**As of:** 2026-10-26, branch `feat/angular` (31 commits ahead of local `next`,
0 behind). This is a point-in-time record written so work can resume without
re-deriving state. It supersedes nothing: where it disagrees with an ADR, the
ADR is the decision record and this is a note that something needs reconciling.
The remaining work, in suggested order, is under
[Suggested next steps](#suggested-next-steps).

## Where things stand

| Area                                                                         | State                                                                                                                          |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Generator ([`tasks/generate-wrappers`](../tasks/generate-wrappers/index.js)) | Emits 279 wrappers into `src/generated/` (gitignored). 29 have a `ControlValueAccessor`. Host is the web component (ADR 0015). |
| Verified components                                                          | Button and `ModalFooter`, in jsdom. Jest: 5 suites, 104 passed, 10 `it.todo`. Modal child registration is covered too.         |
| Playwright                                                                   | `Button.e2e.ts` is written. ADR 0015 says it has never been run. We did not run it either.                                     |
| Legacy entry point                                                           | Abandoned and removed 2026-10-26.                                                                                              |
| Angular peer floor                                                           | Peers updated to `>=20` (2026-10-27). `devDependencies` and CI matrix still on `^19`; move to `^20` in a follow-up PR.         |
| Migration guide `docs/guides/cca-to-angular.md`                              | Does not exist.                                                                                                                |
| CCA codemods in `packages/upgrade`                                           | None.                                                                                                                          |
| `docs/migration/v12.md`                                                      | No Angular content.                                                                                                            |

Run: Jest, `tsc -p tsconfig.storybook.json --noEmit` and the `ng-packagr` build
(all clean after the barrel fix). Not run: Playwright, the Storybook build, the
root `yarn build`.

## Decisions on record

| ADR                                                                                       | Status   | Summary                                                                                                            |
| ----------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| [0011](../../../docs/decisions/0011-back-angular-components-with-web-components.md)       | Accepted | Thin wrappers over `@carbon/web-components`; generated core plus a `legacy` entry point.                           |
| [0012](../../../docs/decisions/0012-angular-standalone-components-no-ngmodule-barrels.md) | Accepted | Standalone components, no NgModule barrels.                                                                        |
| [0013](../../../docs/decisions/0013-controlvalueaccessor-on-angular-wrapper-not-wc.md)    | Accepted | CVA lives on the Angular wrapper.                                                                                  |
| [0014](../../../docs/decisions/0014-preserve-cds-consumer-facing-selectors.md)            | Accepted | Selectors stay `cds-*`. **Proposed to be superseded by ADR 0020.**                                                 |
| [0015](../../../docs/decisions/0015-angular-wrapper-host-is-the-web-component.md)         | Proposed | Wrapper host is the web component under its real tag. Host-is-WC kept by ADR 0020; real-tag registration replaced. |
| [0018](../../../docs/decisions/0018-angular-supported-major-versions.md)                  | Proposed | Peer floor of Angular 20. Peers set to `>=20` 2026-10-27; devDeps/CI still on 19.                                  |
| [0019](../../../docs/decisions/0019-angular-storybook-story-authoring.md)                 | -        | Story authoring.                                                                                                   |
| [0020](../../../docs/decisions/0020-angular-wholesale-cds-ng-prefix.md)                   | Proposed | Wholesale `cds-ng-*` prefix over a prefixed build of the web components.                                           |
| [0021](../../../docs/decisions/0021-angular-drop-classic-date-picker.md)                  | Accepted | No classic or fluid Date Picker wrappers; Preview Date Picker only. Removes flatpickr. Generator not yet changed.  |

## Component structure: what was learned

From ADR 0015 (measured in Chromium and jsdom at the time):

- A tag renamed per class loses styles and logic keyed on the original tag (113
  of 126 style files use `:host(cds-…)`). Accordion item header: 48px under
  `cds-accordion-item`, 20px under a renamed tag.
- Parents look up children by tag (`matches('cds-button')`). With a wrapper
  element around a `cds-button`, `ModalFooter` reported
  `hasThreeButtons: false`.
- An `@Output` named like a native event the host dispatches fires twice, or
  loops (580 calls then a stack overflow).

From this audit, new:

- **The generated wrappers do not register child elements.** After importing
  only the generated `ModalComponent`, `cds-modal` is defined but `cds-dialog`,
  `cds-modal-header`, `cds-modal-footer` and `cds-modal-body` are not. About 70
  to 76 of the 279 classes render other `cds-*` tags. Details and the fix in
  [ADR 0020](../../../docs/decisions/0020-angular-wholesale-cds-ng-prefix.md)
  finding 2. This was verified with a throwaway Jest spec that was not
  committed.
- **Of those, 58 are pure classes where the problem is certain.** 19 of the 279
  classes still use the deprecated self-registering `carbonElement` decorator,
  and the remaining 260 register nothing on import.
- **A whole-tree prefix is consistent where a per-class rename is not.**
  `create-prefixed-build --prefix cds-ng` rewrote 1060 files with no remaining
  `cds-<name>` in the JavaScript. Not run in a browser.

## Documentation that is out of date

| Document                                                             | Problem                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`plan.md`](./plan.md)                                               | About 32 `cds-ng-*` references that describe the old inner-element design. States "no selector collisions" between core and legacy; ADR 0015 says the selectors do collide. §16 says "no import path change needed" for the selector while §7 lists import path changes. Open question 6 ("Selector prefix") is marked closed with the old design. |
| [`milestones.md`](./milestones.md)                                   | Says "Pre-implementation". Describes `@carbon/web-components` as a hard dependency; `package.json` has it as a peer. Calls for a Dropdown legacy PoC; only Button exists. Milestone 3 estimates "~15 to 20" adapters; the matrix lists 57 adapter-tier rows plus 32 tag renames.                                                                   |
| [`legacy-compatibility-matrix.md`](./legacy-compatibility-matrix.md) | Tag mappings are inferred and unverified; outputs are not compared. Its counts differ from a fresh grep of CCA by a few (118 versus 119 elements, 64 versus 58 modules).                                                                                                                                                                           |
| ADR 0011                                                             | Says the wrappers "are hand-written" in its last consequence, but also that the core is "100% automated". Peer-dependency consequence changes if ADR 0020 is accepted.                                                                                                                                                                             |
| ADR 0014                                                             | Superseded by ADR 0020 if accepted.                                                                                                                                                                                                                                                                                                                |
| Codemod lists                                                        | `plan.md` §16 (seven transforms) and `milestones.md` Milestone 5 (three transforms) conflict. See [`migration-support.md`](./migration-support.md).                                                                                                                                                                                                |

### Fixed in the documentation pass

These were corrected where they were factually wrong against ADR 0015, without
deciding the `cds-*` versus `cds-ng-*` question:

- [`plan.md`](./plan.md): the "no selector collisions" claim, the
  registration-pattern section (now notes the class-file bug), §9 registration
  text, the out-of-scope bullet, the §13 modal example, the TDD sentence, open
  question 6 (reopened), migration-guide item 1, and the `create-prefixed-build`
  paragraph.
- [`milestones.md`](./milestones.md): status banner, the peer-dependency line,
  the Dropdown PoC claim, a banner on Milestone 3, and a note on the codemod
  list conflict.
- ADR 0011: the "wrappers are hand-written" contradiction, plus a note on what
  ADR 0020 would change.
- ADR 0014: status note pointing at ADR 0020.
- ADR 0015: status note and a new remaining-work item 0 for the child
  registration bug.

### Not fixed

- The `cds-ng-preview-*` names and `cds-ng-<name>` queries in `plan.md` §8 and
  §13 (about 25 lines). They now carry a "Stale naming" note rather than being
  rewritten, because ADR 0020 would change them again.
- The codemod lists in `plan.md` §16 and `milestones.md` Milestone 5 are
  flagged, not reconciled. They belong to the `plan.md` and `milestones.md`
  rewrite (next step 11).
- [`legacy-compatibility-matrix.md`](./legacy-compatibility-matrix.md): counts
  and tag mappings are unverified and unchanged.
- Angular peer range in `package.json` and `README.md` (still `>=17`).

## Open questions, consolidated

Grouped by what they block. "Blocking" means a decision should wait for it.

### Selector and packaging (ADR 0020)

1. **Does CCA coexist with `@carbon/angular` under `cds-*`?** Run for the Modal
   and the Dropdown (2026-10-26): no, for both. Registering the real tag
   upgrades CCA's host elements. The CCA modal stops painting regardless of load
   order or whether child tags are registered, and the CCA dropdown is replaced
   by a different control with no selectable items. Under `cds-ng-*` both CCA
   components work, with `cds-ng-dropdown` and `cds-ng-modal` rendered on the
   same page. Two components, Chromium, Angular 19. Details and limits in ADR
   0020 open question 1. A CCA form control with validation, Angular 20+, and
   the unmodified two-copies case are not run.
2. **Packaging mechanism.** Ownership is answered: `@carbon/angular` owns the
   prefixed copy (ADR 0020 option B). Spiked 2026-10-26 with a scratch
   `ng-packagr` library: it works, with constraints. A relative import of the
   vendored JavaScript does not build; copying it with `ng-package.json`
   `assets` and importing it through a `package.json` `imports` alias
   (`#carbon-ng/*`) does. The built package must carry
   `"sideEffects": ["./vendor/**/*.js"]` or the bundler drops the registration.
   `@carbon/layout` and `@carbon/motion` must be declared (they are dev-only in
   `@carbon/web-components`), `stories/` must be excluded, and flatpickr under
   `vendor/node_modules` is needed only while the classic Date Picker is
   wrapped. ADR 0021 drops it, so flatpickr should not ship once the generator
   skips those six tags. One entry point still ships every family it imports.
   Details, numbers and the list of what was not checked are in ADR 0020 open
   question 2. Blocking for implementation only.
3. **`@carbon/styles` prefix.** Does anything outside shadow DOM need a matching
   `$prefix`? What happens with `@carbon/styles` 1.x and 2.x on one page?
4. **Manifest.** Does the standard CEM analyzer give usable output for this
   codebase? The WCA manifest is deprecated and slated for removal in v3.0.0
   (issue #20670).
5. **Tree-shaking of import-time registration.** Open since ADR 0015.

### Legacy entry point

**Decided 2026-10-26: `@carbon/angular/legacy` is abandoned and was removed.**
Reasoning given by the maintainers: migration is not trivial even with adapters,
and adapters create a two-step migration that is not wanted.

What was removed from `packages/angular`: `legacy/` (6 tracked files, including
the secondary entry point config), `tasks/scaffold-legacy-component/`, the
`scaffold:legacy` script, the `legacy/**` globs in `jest.config.js`,
`tsconfig.storybook.json` and `.storybook/main.ts`, the Storybook ordering
entry, and `.storybook/docs/legacy-overview.mdx`. Storybook docs that described
it (`welcome.mdx`, `migration.mdx`, `Button.mdx`) and the generator README were
rewritten. ADR 0011, 0014, 0015 and 0019 carry status notes; `plan.md` and
`milestones.md` carry banners. Left alone on purpose: `docs/archive/*`, and the
bodies of older ADRs and planning text, which are the historical record.

Not checked: whether anything outside `packages/angular` (CI, root docs, release
config) referenced the legacy entry point. A grep of `.github` and the root docs
found nothing, but the root `package.json` and release config were not read.

Consequences:

- The migration cost moves to consumers, concentrated in about 20 model-shaped
  components. See [`migration-support.md`](./migration-support.md).
- The codemod list is the `plan.md` §16 set plus tag, output and directive
  transforms. `milestones.md` Milestone 5 still lists the superseded
  `cca-to-legacy` set (marked as such) and needs a rewrite.
- [`legacy-compatibility-matrix.md`](./legacy-compatibility-matrix.md) is now a
  migration reference, not an adapter backlog. Its title still says "legacy".
- An alternative that was raised in the audit and is not decided: a small set of
  convenience components in core for the hardest model-shaped cases (Dropdown,
  ComboBox, Select, MultiSelect, Table, Pagination, Notification, Tabs).
- [`developer-experience.md`](./developer-experience.md) records what the core
  wrappers give over raw web components.

Still needed to size the migration: per-component CCA usage. Not available from
telemetry (see [`migration-support.md`](./migration-support.md)).

### Quality and verification

6. Run the Button Playwright checks. Never run.
7. A consumer app with `strictTemplates`, including how `$event` typing looks
   for native-named events.
8. Form controls (CVA), named-slot components, and `ActionSet` in a real
   browser.
9. Trace the cause of the `@Output() change` re-emission loop. The generator
   avoids it; the cause is unknown.
10. Compare the hand-written `NATIVE_DOM_EVENTS` set in the generator against
    the events in the manifest.
11. Port the 10 `it.todo` Button tests (8 RTL layout, 2 badge indicator).
12. Generator type quality: about 400 properties collapse to `any`, about 80
    entries are the `shadowRootOptions` object leaking in as inputs, and all
    outputs are `EventEmitter<any>`.

### Migration

13. Shadow DOM is not in the intentional-breaks list. It needs guidance. See
    [`migration-support.md`](./migration-support.md).
14. Where agent skills live, how templates are parsed by the codemods, how the
    mapping file is verified. Same document.
15. Audit CCA attribute directives (ADR 0015 item 10). The matrix already lists
    53; individual review of the 10 with behavior is still needed.

### Platform

16. Angular peer floor: land ADR 0018 in its own pull request.
17. Whether `docs/migration/v12.md` needs Angular content, and whether the
    package is behind a v12 flag. Unconfirmed with maintainers.

## Tracked item: generator should import component barrels

Independent of the prefix decision. **Change made 2026-10-26** (uncommitted);
the all-composites verification (step 2 below) is not done. The text below is
the original brief.

**Result.** The generator now emits
`import '@carbon/web-components/es/components/<dir>/index.js'` and no longer
calls `defineCustomElement`. `resolveBarrelImport` walks up from the manifest
`path` to the nearest folder with an `index.ts`, so the folder without a barrel
(`date-picker/next/components`) falls back to `date-picker/next`. All 279
wrappers resolve to an existing barrel.
[`src/__tests__/child-registration.spec.ts`](../src/__tests__/child-registration.spec.ts)
imports only the Modal wrapper and asserts `cds-dialog`, `cds-modal-header`,
`-body` and `-footer` are defined, and that every wrapper imports an existing
`…/index.js`. It fails against the old class-file import and passes now. Jest,
`tsc -p tsconfig.storybook.json --noEmit`, the `ng-packagr` build and Prettier
were clean afterwards.

**Not done.** A runtime check across all 70 to 76 composites. The web
components' `registration-coverage.mjs` is the static equivalent. It currently
exits 1 on `tearsheet`, but that is a false positive: the six tags it reports
come from `tearsheet/tearsheet-helpers.ts`, which holds story demo content, and
the audit only skips file names containing `.stories.`. The Tearsheet wrappers
are not affected, and with that file excluded the audit passes for all 102
components. Filed as
[carbon-design-system/carbon#23858](https://github.com/carbon-design-system/carbon/issues/23858).
Root `yarn ci-check` does not run this script.

**Problem.**
[`tasks/generate-wrappers/index.js`](../tasks/generate-wrappers/index.js)
imports `…/components/<dir>/<file>.js` and calls `defineCustomElement` on that
one class, so child elements are never registered (ADR 0020 finding 2).

**Change.** For each tag, import the barrel for its folder
(`@carbon/web-components/es/components/<dir>/index.js`) instead of the class
file. The barrel registers the family. The wrapper still needs the class only if
it uses it for typing.

**Details found while checking, so the change doesn't trip on them:**

- Derive `<dir>` from the manifest `path` (`./src/components/<dir>/<file>.ts`).
  Some folders are nested (`fluid-date-picker/next`, `date-picker/next`).
- One folder (`date-picker/next/components`) has no `index.js`.
- Three folders (`add-select`, `guide-banner`, `fluid-date-picker/next`) have
  barrels of side-effect imports only, because their classes use the deprecated
  decorator. They register, but not through `defineCustomElement`.
- Many wrappers share a barrel (39 folders have one tag, `ui-shell` has 19).
  That is fine, registration is idempotent.
- Barrel and package `exports`: `./es/components/*` is exported, so the path
  resolves. `sideEffects` is not set in the web components `package.json`, so
  the import will not be dropped by bundlers.

**How to verify.**

1. Regenerate and run the Jest suite.
2. For every composite class (about 70 to 76), import only that wrapper in a
   throwaway spec and assert every `<cds-…>` tag its template renders is
   `customElements.get(...)`-defined. The web components'
   [`registration-coverage.mjs`](../../web-components/tasks/registration-coverage.mjs)
   does the equivalent statically and is the model.
3. Add a permanent version of that check to the generator tests, so the bug
   cannot come back.

## Evidence gathered

**Coexistence spike (Modal and Dropdown).** Details and limits are in
[`spikes/coexistence-spike.md`](./spikes/coexistence-spike.md) and ADR 0020 open
question 1. Chromium via Playwright, Angular 19.2.25,
`carbon-components-angular` 5.72.3, `@carbon/styles` 1.118.0.

- Registering the real `cds-modal` upgrades CCA's `<cds-modal>` host, and the
  CCA modal stops painting. Load order does not matter. Registering the children
  too (the folder barrel) does not help. Under `cds-ng-*` the CCA modal is
  unaffected.
- Registering the real `cds-dropdown` upgrades CCA's `<cds-dropdown>` host. The
  Lit dropdown renders over CCA's markup, CCA's own list box ends up 0 by 0
  pixels, and no item can be picked. This needs no child tag collision: CCA's
  `cds-dropdown-list` is not a web component tag.
- With the `cds-ng-*` dropdown and modal registered and rendered on the same
  page as the CCA ones, both CCA components still open, select and close.
- 63 of CCA's 121 `cds-*` element selectors are also web component tags. Only
  two of the 63 were run.
- The cause is probable, not proven: for the Modal, the Lit `open` property
  stays false.
- Not run: a CCA form control with validation, the unmodified two-copies case,
  Angular 20+, `@carbon/styles` 2.x, `ng-packagr`, other browsers.
- The scratch app and scripts live in `temp/spike/`, which is gitignored and
  local to the machine that ran them.

**Prefixed build.** `node bin/create-prefixed-build.js --prefix cds-ng --out …`
in `packages/web-components` rewrote 1060 files with no `cds-<name>` left in the
JavaScript (1100 on a fresh rebuild). About 0.9 MB gzipped for the whole
library.

**Packaging spike.** A scratch `ng-packagr` library vendoring the prefixed copy
built, installed into a clean consumer and rendered a styled `cds-ng-button` and
a working `cds-ng-date-picker` in Chromium. The scratch library and consumer are
in the gitignored `temp/pkg-spike/`. A Button-only app was 240 kB with only
Button in the library and 365 kB when the library also exported the Date Picker,
because everything an entry point imports is registered. The real figure for 279
wrappers in one entry point is not measured.

**Re-measurement without flatpickr (2026-10-26).** Rebuilt `temp/pkg-spike/lib`
from a fresh `cds-ng` prefixed build, excluding `components/date-picker`,
`components/fluid-date-picker` and `node_modules/flatpickr`. Packed size: 944 kB
(down from 967 kB), 664 JS files (down from 698). Button-only production bundle:
**364.68 kB** — effectively the same as the 365 kB original. Flatpickr (~90 kB
JS, 9 files) is not the source of the cost. The bundle cost is the single entry
point registering every component barrel it covers regardless of what the
consumer actually imports. Entry-point splitting is the required fix.

**Secondary entry point measurement (2026-10-27).** Added a secondary entry
(`src/button/ng-package.json` + `index.ts`) to `temp/pkg-spike/lib`. The
secondary entry holds only `button.component.ts` and its
`#carbon-ng/components/button/index.js` barrel import. Consumer updated to
`import { ButtonComponent } from '@spike/angular-lib/src/button'`. Production
bundle: **239.57 kB** — a **125 kB / 34% reduction** vs the 364.68 kB
single-entry baseline. The Angular CLI `application` builder keeps only the
button barrel side effect; no other component's registration code is included.
`ng-packagr` 19.2.2 builds both entries cleanly in 2 s. Open items remaining
from constraint 4: entry naming, per-component vs per-family granularity, and
build time for all 284 wrappers.

**Raw web components in Angular (jsdom probe, not kept).** `ngModel` and
`formControl` fail with `NG01203`. Misspelled bindings are silently accepted
under `CUSTOM_ELEMENTS_SCHEMA`. See
[`developer-experience.md`](./developer-experience.md). `ngDefaultControl` and
editor behavior were not tested.

## Known leftovers

- `plan.md` has 5 broken repo-root-style links that existed at HEAD and were
  left alone.
- `plan.md` still describes `/legacy` in many places (effort table, directory
  tree, Storybook ordering, the section 16 codemod list). The top banner marks
  them as superseded. A real rewrite is outstanding.
- `milestones.md` Milestone 5 lists the superseded `cca-to-legacy` codemods
  (labelled as such).
- `docs/guides/cca-to-angular.md` is referenced by the Storybook migration page
  and by `plan.md` but does not exist.
- The `yarn build` of `@carbon/web-components` was re-run during the packaging
  spike (exit 0). `es/` and `custom-elements.json` are gitignored, so nothing
  tracked changed, but a copy of `es/` made before 2026-10-13 still imports
  `@lit-labs/signals`.
- The root `package.json` and release config were not read for legacy
  references. A grep of `.github` and the root docs found none.
- `packages/web-components/src/components/loading/Loading-test.js` had an
  unrelated change on the branch that was never investigated.
- `package.json` peers are now `>=20`. `devDependencies` and CI matrix still on
  `^19`; upgrading to Angular 20 is step 12, its own PR (ADR 0018).

## Suggested next steps

In order. Items marked ~~done~~ are complete; the remainder are open.

1. ~~**Apply ADR 0021 in the generator.**~~ **Done 2026-10-27.** `SKIPPED_TAGS`
   set added to
   [`tasks/generate-wrappers/index.js`](../tasks/generate-wrappers/index.js).
   284 wrappers emitted (manifest has grown since the 279 count; 6 skip). Jest:
   5 suites, 104 passed, 0 failures. Type-check clean.
2. **Optional third coexistence sample**: a CCA form control with validation
   (for example `TextInput` with `ngModel`), and experiment D, the unmodified
   two-copies case. Brief in
   [`spikes/coexistence-spike.md`](./spikes/coexistence-spike.md). Two
   components already point the same way, so this is confirmation and not a
   blocker.
3. **Packaging follow-ups** (the spike itself is done; see ADR 0020 open
   question 2 and the evidence section below):
   - ~~Split into secondary entry points and measure.~~ **Done 2026-10-27.**
     239.57 kB (−34% vs 364.68 kB single-entry baseline). Note: 239 kB raw looks
     alarming but gzips to ~47 kB; 112 kB of it is `button.scss.js` (CSS inlined
     by Lit for shadow-root injection) which compresses 10:1. Angular + Lit
     (~128 kB raw) is the fixed per-app cost paid once.
   - **Decide entry naming and granularity.** `ng-packagr` exposes a secondary
     placed at `src/button/` as `@carbon/angular/src/button`. Conventional path
     is `@carbon/angular/button`. Fix: place each secondary directly under
     `src/<name>/` (one level, no `src/` prefix). Granularity: one secondary
     entry per vendor barrel folder (99 folders → 99 entries) rather than one
     per wrapper (284), so families like `button-set` stay in `button/`.
   - **Build the full 284-wrapper library with secondary entries and time it.**
   - Try Angular 20+ and the `browser` and webpack builders.
   - Decide whether wrappers need `.d.ts` for the vendored code.
   - Wire the vendoring step into the Lerna build order (web components →
     prefixed copy → `ng-packagr`).
4. **Trace the `CDSTooltip.updated` error** seen in coexistence run B3
   (`Cannot set properties of null (setting 'align')`), to see whether it is
   specific to the CCA host or a bug in the web components.
5. **`@carbon/styles` `$prefix`** (ADR 0020 question 3), including 1.x with 2.x
   on one page.
6. **CEM analyzer spike** for enum unions and typed event payloads. The current
   manifest is the deprecated WCA format. Gaps are listed in
   [`developer-experience.md`](./developer-experience.md).
7. **Run the Button Playwright checks** (never run) and the Storybook build.
8. **Verify form controls, named-slot components and `ActionSet`** in a real
   browser.
9. **Define feature parity**, then decide what typing and slot work belongs in
   the first release. A candidate definition is in
   [`developer-experience.md`](./developer-experience.md).
10. **Migration tooling** per [`migration-support.md`](./migration-support.md):
    mapping file, codemods (`plan.md` section 16 plus tag, output and directive
    transforms), agent skills, shadow DOM guidance,
    `docs/guides/cca-to-angular.md`. Decide how `@carbon/upgrade` parses Angular
    `.html` templates (its globs match only `.js/.jsx/.ts/.tsx`). Per-component
    CCA usage is not available from telemetry, so size it from an
    import-reporting codemod across sample repos or GitHub code search.
11. **Rewrite `plan.md` and `milestones.md`** now that legacy is gone, with new
    estimates.
12. **Land the Angular 20 peer floor** (ADR 0018) in its own PR.
13. **Decide whether to accept ADR 0020**, once item 5 (`$prefix`) is answered
    and the entry-point split in item 3 is tried. The coexistence question
    (item 2) already leans toward accepting.
14. **Update `docs/migration/v12.md`** if confirmed needed (`AGENTS.md` says
    v12-affecting changes must).

Also undecided: whether a few convenience components in core are worth adding
for the hardest model-shaped CCA cases (Dropdown, ComboBox, Select, MultiSelect,
Table, Pagination, Notification, Tabs). Raised in the audit, not analysed.

## Useful commands

```sh
# Jest, from packages/angular
npx jest

# Type check and library build, from packages/angular
npx tsc -p tsconfig.storybook.json --noEmit
npx ng-packagr -p ng-package.json

# Regenerate the wrappers, from packages/angular
node tasks/generate-wrappers/index.js

# Prefixed build of the web components, from packages/web-components
node bin/create-prefixed-build.js --prefix cds-ng --out ../../temp/spike/cds-ng-wc
```
