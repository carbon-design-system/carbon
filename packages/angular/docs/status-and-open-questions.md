# `@carbon/angular`: status and open questions

**As of:** 2026-10-30, branch `feat/angular` (43 commits ahead of `next`, 0
behind). This is the project's living state record. It supersedes nothing: where
it disagrees with an ADR, the ADR is the decision record and this is a note that
something needs reconciling. The remaining work, in suggested order, is under
[Suggested next steps](#suggested-next-steps).

## Where things stand

| Area                                                                         | State                                                                                                                                                              |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Generator ([`tasks/generate-wrappers`](../tasks/generate-wrappers/index.js)) | Emits 281 wrappers into `src/generated/` (278 from manifest + 3 via `SYNTHETIC_TAGS`). 28 have a CVA. Host is the web component (ADR 0015, ADR 0020).              |
| Build                                                                        | `yarn build`: generate-wrappers → build-entries → ng-packagr. 97 secondary entries + primary. ~30 s, 1.3 MB packed, no warnings.                                   |
| Storybook                                                                    | Builds clean. Stories use `cds-ng-*` throughout via `tsconfig.storybook.json` aliases. No raw `cds-*` WC tags in any story (enforced by ADR 0019 rule 1).          |
| Jest                                                                         | **11 suites, 250 passed, 45 `it.todo`, 0 failures.** 6 parity specs (Accordion, Checkbox, Dropdown, TextInput, Modal, ActionSet) are 1:1 with WC test files.       |
| Stories                                                                      | All 6 step-8 components at WC one-for-one parity. See [Step 9 results](#step-9-results).                                                                           |
| MDX overviews                                                                | Checkbox, Dropdown, Modal, TextInput. Button and Accordion added earlier. All 6 step-8 components have an overview page.                                           |
| Playwright                                                                   | 36 passed in Chromium against a fresh `storybook:build`: Button (9) plus TextInput, Checkbox, Dropdown, ActionSet, Accordion, Modal (27). Not re-run after step 9. |
| Generated `@Output`s                                                         | Fixed 2026-10-28: each custom event is forwarded to its `@Output` in `ngOnInit`. Verified on Accordion and Modal in a browser.                                     |
| Legacy entry point                                                           | Abandoned and removed 2026-10-26.                                                                                                                                  |
| Angular peer floor                                                           | Peers updated to `>=19` (2026-10-28, ADR 0018). Toolchain is on `^19`. CI has no "19 plus latest" matrix and the generator still emits `standalone: true`.         |
| Migration guide `docs/guides/cca-to-angular.md`                              | Does not exist.                                                                                                                                                    |
| CCA codemods in `packages/upgrade`                                           | None.                                                                                                                                                              |
| `docs/migration/v12.md`                                                      | No Angular content.                                                                                                                                                |

Last run (2026-10-30): Jest (**250 passed, 45 `it.todo`**, 0 failures),
`tsc -p tsconfig.storybook.json --noEmit` (clean). Storybook `WithLayer` stories
(Accordion, Dropdown, TextInput) updated to the labelled
`$background`/`$layer-01`/`$layer-02` visual pattern; `.storybook/styles.scss`
added for layer background and label styles.

## Decisions on record

| ADR                                                                                       | Status               | Summary                                                                                                                        |
| ----------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [0011](../../../docs/decisions/0011-back-angular-components-with-web-components.md)       | Accepted             | Thin wrappers over `@carbon/web-components`, generated. The `legacy` entry point was removed; peer changed by 0020.            |
| [0012](../../../docs/decisions/0012-angular-standalone-components-no-ngmodule-barrels.md) | Accepted             | Standalone components, no NgModule barrels.                                                                                    |
| [0013](../../../docs/decisions/0013-controlvalueaccessor-on-angular-wrapper-not-wc.md)    | Accepted             | CVA lives on the Angular wrapper.                                                                                              |
| [0014](../../../docs/decisions/0014-preserve-cds-consumer-facing-selectors.md)            | Superseded           | Selectors stay `cds-*`. **Superseded by ADR 0020 (2026-10-27).**                                                               |
| [0015](../../../docs/decisions/0015-angular-wrapper-host-is-the-web-component.md)         | Partially superseded | Wrapper host is the web component. Host-is-WC kept by ADR 0020; real-tag registration replaced.                                |
| [0016](../../../docs/decisions/0016-pin-memfs-resolution.md)                              | Accepted             | Pin `memfs` via root `resolutions`.                                                                                            |
| [0017](../../../docs/decisions/0017-pin-playwright-test-resolution.md)                    | Accepted             | Pin `@playwright/test` via root `resolutions`.                                                                                 |
| [0018](../../../docs/decisions/0018-angular-supported-major-versions.md)                  | Accepted             | Peer floor of Angular 19 (`>=19`). Accepted 2026-10-28. CI matrix, `standalone: true` and v12 entry still open.                |
| [0019](../../../docs/decisions/0019-angular-storybook-story-authoring.md)                 | Accepted             | Story authoring rules. Generated story stubs and `storybook:parity` were not built; stories are hand-written.                  |
| [0020](../../../docs/decisions/0020-angular-wholesale-cds-ng-prefix.md)                   | Accepted             | Wholesale `cds-ng-*` prefix over a prefixed build of the web components. Accepted 2026-10-27.                                  |
| [0021](../../../docs/decisions/0021-angular-drop-classic-date-picker.md)                  | Accepted             | No classic or fluid Date Picker wrappers; Preview Date Picker only. Removes flatpickr. Done in the generator (`SKIPPED_TAGS`). |

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
| ADR 0011                                                             | Peer-dependency consequence updated for ADR 0020 (accepted 2026-10-27).                                                                                                                                                                                                                                                                            |
| ADR 0014                                                             | Marked superseded by ADR 0020 (2026-10-27).                                                                                                                                                                                                                                                                                                        |
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
  ADR 0020 changed.
- ADR 0014: status note pointing at ADR 0020.
- ADR 0015: status note and a new remaining-work item 0 for the child
  registration bug.

### Not fixed

- The `cds-ng-preview-*` names and `cds-ng-<name>` queries in `plan.md` §8 and
  §13 (about 25 lines). They now carry a "Stale naming" note rather than being
  rewritten, because ADR 0020 (now accepted) changes them again.
- The codemod lists in `plan.md` §16 and `milestones.md` Milestone 5 are
  flagged, not reconciled. They belong to the `plan.md` and `milestones.md`
  rewrite (next step 11).
- [`legacy-compatibility-matrix.md`](./legacy-compatibility-matrix.md): counts
  and tag mappings are unverified and unchanged.
- ~~Angular peer range in `package.json` and `README.md` (still `>=17`).~~ Done:
  both say `>=19`.

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
3. **`@carbon/styles` prefix.** Answered 2026-10-27: nothing outside shadow DOM
   needs a matching `$prefix`. The vendored copy loads no global stylesheet and
   reads theme tokens as unprefixed `--cds-*`. Browser check done: 1.x, 2.x, and
   both on one page give identical results for seven vendored components, and
   the `overflow-menu` host class is inert. Details and limits in ADR 0020 open
   question 3.
4. **Manifest.** **Direction decided 2026-10-28:** move from the deprecated WCA
   manifest (removal slated for v3.0.0, issue #20670) to the standard CEM. A PR
   producing a CEM is coming from the web components maintainers. The generator
   will pivot when it lands in the monorepo. Until then it reads the WCA
   `custom-elements.json`.
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
- **Decided 2026-10-28: no convenience components in core.** The idea of a small
  set of hand-written components for the hardest model-shaped cases (Dropdown,
  ComboBox, Select, MultiSelect, Table, Pagination, Notification, Tabs) is
  dropped, and the package starts from a clean slate. Migration support is a
  combination of codemods and agent skills (see
  [`migration-support.md`](./migration-support.md) and `milestones.md` Milestone
  5).
- [`developer-experience.md`](./developer-experience.md) records what the core
  wrappers give over raw web components.

Still needed to size the migration: per-component CCA usage. Not available from
telemetry (see [`migration-support.md`](./migration-support.md)).

### Quality and verification

6. ~~Run the Button Playwright checks.~~ Done: 9 passed in Chromium. The
   vendored WC renders `cds-ng--btn--*` classes, so `Button.e2e.ts` and the
   `Expressive` story play function now assert on those.
7. A consumer app with `strictTemplates`, including how `$event` typing looks
   for native-named events.
8. ~~Form controls (CVA), named-slot components, and `ActionSet` in a real
   browser.~~ Done, with one finding. See [Step 8 results](#step-8-results).
9. ~~Port WC test suites to Jest parity specs.~~ Done 2026-10-30. See
   [Step 9 results](#step-9-results).
10. Trace the cause of the `@Output() change` re-emission loop. The generator
    avoids it; the cause is unknown.
11. Compare the hand-written `NATIVE_DOM_EVENTS` set in the generator against
    the events in the manifest.
12. Port the 10 `it.todo` Button tests (8 RTL layout, 2 badge indicator).
13. Generator type quality: about 400 properties collapse to `any`, about 80
    entries are the `shadowRootOptions` object leaking in as inputs, and all
    outputs are `EventEmitter<any>`.

### Migration

13. Shadow DOM is not in the intentional-breaks list. It needs guidance. See
    [`migration-support.md`](./migration-support.md).
14. Where agent skills live, how templates are parsed by the codemods, how the
    mapping file is verified. Same document. **Decided 2026-10-28:** these are
    part of the plan and milestones (Milestone 5), not answered yet. The
    maintainer has no answers and may delegate them to a developer.
15. Audit CCA attribute directives (ADR 0015 item 10). The matrix already lists
    53; individual review of the 10 with behavior is still needed.

### Platform

16. ~~Angular peer floor.~~ Done: ADR 0018 accepted 2026-10-28 with a floor
    of 19. Two consequences of the ADR are not implemented yet: CI runs one
    Angular version, not the "19 plus latest" matrix the ADR calls for (no
    matrix exists in the `angular-test` and `angular-e2e` jobs of
    `.github/workflows/ci.yml`), and the generator still emits
    `standalone: true`, which is redundant on 19+. "Latest" means the newest
    Angular major that Angular supports; pinning the number in the matrix is
    proposed in ADR 0018.
17. ~~Whether the package is behind a v12 flag.~~ **Decided 2026-10-28:** it is
    not. `@carbon/angular` is new as of v12 and needs a separate migration doc
    for consumers coming from `carbon-components-angular`
    (`docs/guides/cca-to-angular.md`). Still undecided: whether
    `docs/migration/v12.md` also gets a short entry, which `AGENTS.md` may
    require for v12-affecting changes.

### Scope and upstream dependencies

18. **First release covers all of `@carbon/web-components`.** Decided
    2026-10-28. Components still being merged into the web components from
    Carbon for IBM Products must be captured before v12 scope is frozen. Of the
    18 components ADR 0009 lists as migrating to core, 15 have a folder in
    `packages/web-components/src/components/` and a secondary entry in
    `.entries/`. These three do not exist in the web components yet:
    `condition-builder`, `scroll-gradient` and `tag-overflow`. The generator
    needs no change for them: it wraps every `cds-` tag in the manifest, so they
    appear when the web components land them and the manifest includes them. The
    scope freeze should wait for those three, and for any others that join. Also
    needed: stories and parity specs (only 7 components have them today).
    **Decided 2026-10-28: the first PR does not wait for this.** It is captured
    in the plan and milestones ("Follow-up PRs") and done in a future PR.
19. **Upstream issue for the skeleton classes.** Decided 2026-10-28: open an
    issue with the Carbon team so `AccordionSkeleton`, `CheckboxSkeleton` and
    `DropdownSkeleton` use `@customElement()` and appear in the manifest. Until
    it is fixed upstream, `SYNTHETIC_TAGS` in the generator is a temporary
    workaround and is documented as such (generator README and the
    `TODO(@carbon/web-components)` comments). **Not filed yet.** Remove the
    synthetic entries once the manifest includes them. **Decided 2026-10-28:
    document now, file the issue and remove `SYNTHETIC_TAGS` in a future PR.**
20. **Modal `EnableDialogElement` story.** Decided 2026-10-28: hold until the
    dialog version of Modal becomes stable. The WC story lives in
    `modal.feature-flag.stories.ts`. The Angular Modal stories have no matching
    story and no `TODO(parity)` comment yet; add one when this is picked up.

## Step 9 results

2026-10-30. Stories and parity specs for all 6 step-8 components brought to full
WC one-for-one parity. All work landed in the same commit as this update.

### Stories: WC parity complete

| Component | Stories added / completed                                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Accordion | Skeleton, WithLayer (3-layer nested `<cds-ng-layer>`)                                                                               |
| Checkbox  | Skeleton, WithAILabel (3 group variants: group-level label, per-checkbox label, per-checkbox inline label)                          |
| Dropdown  | ExperimentalAutoAlign, InlineWithLayer, Skeleton, WithAILabel, WithLayer. WithToggletipLabel is TODO (ToggleTip not yet generated). |
| Modal     | WithAILabel, WithInlineLoading, WithScrollingContent, WithStateManager                                                              |
| TextInput | WithAILabel, WithLayer (3-layer nested)                                                                                             |
| ActionSet | No changes needed — already complete.                                                                                               |

### Generator: `SYNTHETIC_TAGS` for missing skeletons

`AccordionSkeleton`, `CheckboxSkeleton`, and `DropdownSkeleton` were absent from
`custom-elements.json` because their WC classes use `defineCustomElement()`
instead of `@customElement()`. The CEM analyser only sees the decorator form.
Fixed by adding `SYNTHETIC_TAGS` to `tasks/generate-wrappers/index.js` — a
hand-authored descriptor array prepended to the manifest tag list before the
generator loop. Three new wrappers were generated and wired into `.entries/`.
`TODO(@carbon/web-components):` comments added to each WC source file. See the
generator README for the full SYNTHETIC_TAGS workflow.

**Rule added (ADR 0019):** Angular stories must never use raw `cds-*` WC tags or
`CUSTOM_ELEMENTS_SCHEMA`. If a wrapper is missing, fix the generator.

### Jest

11 suites, **250 passed**, 45 `it.todo`, 0 failures.
`tsc -p tsconfig.storybook.json --noEmit` — clean.

## Step 8 results

2026-10-28. Playwright in Chromium against `storybook:build`, using the
`cds-ng-*` entries. 27 new checks (stories under
`src/stories/<Name>/__stories__/`, specs under `__tests__/<Name>.e2e.ts`). All
pass.

| Mechanism               | Component     | What was checked                                                                                                                                                                        |
| ----------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CVA on `value`          | `TextInput`   | `ngModel` and `formControl`: initial write, typing updates the model, `setValue`, `disable`/`enable`, `touched` on blur.                                                                |
| CVA on `checked`        | `Checkbox`    | `ngModel` toggle both ways, `formControl` initial write, `setValue`, `disable`. Driven by `cds-ng-checkbox-changed`.                                                                    |
| CVA with child items    | `Dropdown`    | `cds-ng-dropdown-item` registered, initial value, `setValue`, selecting an item updates the control. Driven by `cds-ng-dropdown-selected`.                                              |
| Named slots             | `TextInput`   | Projected `label-text` and `helper-text` elements are the assigned nodes of the shadow root's named slots.                                                                              |
| `ActionSet`             | `ActionSet`   | Slotted buttons are reordered and styled by `slotchange` (`cds-ng--action-set__action-button`); `actions` array renders sorted buttons; `md` with 3 stacks, `disableStacking` does not. |
| Child registration      | `Accordion`   | `cds-ng-accordion` and `-item` defined, `cds-accordion-item` not; `open` and `disabled` forwarded; header click toggles.                                                                |
| Child registration      | `Modal`       | `cds-ng-modal`, `-dialog`, `-header`, `-body`, `-footer`, `-footer-button`, `-close-button` all defined and `cds-modal` not; opens styled; close button closes it.                      |
| `ModalFooter` three-btn | `ModalFooter` | `has-three-buttons` absent with two buttons and present with three. Closes the three-button item under step 3.                                                                          |

**Finding, fixed the same day: generated `@Output`s never fired.** The generator
declared `@Output() readonly modalClosed = new EventEmitter<any>()` and the
like, but nothing called `.emit()` or forwarded the web component's custom event
to the emitter. Measured in a browser on `Accordion` and `Modal`: the DOM
binding `(cds-ng-accordion-item-toggled)` and `(cds-ng-modal-closed)` each fired
once, and the `@Output` binding (`accordionItemToggled`, `modalClosed`) fired
zero times. By construction it affected every wrapper that declares a custom
event.

Fix, in `tasks/generate-wrappers`: `ngOnInit` now adds a host listener per
custom event that calls `.emit(event)`. The generator writes the manifest name
(`cds-modal-closed`); `build-entries` rewrites it to `cds-ng-modal-closed` with
the same `cds` to `cds-ng` rule it applies to selectors, so no vendored-class
lookup was needed. The listener is on the host element, which has the
component's lifetime, so there is no teardown. Coverage: a Jest case in
`generated-wrappers.spec.ts` (Checkbox, `cds-checkbox-changed`) and the two
`output-count` assertions in `Accordion.e2e.ts` and `Modal.e2e.ts`, which now
expect `1`. Only Accordion, Modal and Checkbox have an `@Output` test; the other
wrappers get the same generated code but are not individually measured.

Not covered by step 8: `Select`, `ComboBox`, `MultiSelect`, `RadioButtonGroup`,
`Toggle`, `Slider` and the rest of the CVA wrappers. Three were exercised, one
per event style (`input`/`change`, `-changed`, `-selected`); the `.entries/`
build has 28 wrappers with a `ControlValueAccessor`. Also not covered:
`ModalFooter` with `loading`, and a consumer app with `strictTemplates`.

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
build time for all 278 wrappers (measured: ~22 s).

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
- `package.json` peers are set to `>=19` (ADR 0018, accepted 2026-10-28).
  `devDependencies` and CI matrix remain aligned on `^19`.

## Suggested next steps

In order. Items marked ~~done~~ are complete; the remainder are open.

1. ~~**Apply ADR 0021 in the generator.**~~ **Done 2026-10-27.** `SKIPPED_TAGS`
   set added to
   [`tasks/generate-wrappers/index.js`](../tasks/generate-wrappers/index.js).
   278 wrappers emitted (6 skipped; an earlier "284" counted stale folders).
   Jest: 5 suites, 104 passed, 0 failures. Type-check clean. ~~**9a. Port WC
   test suites + bring stories to WC parity.**~~ **Done 2026-10-30.** 11 suites,
   250 passed. All 6 step-8 components at story and spec parity. Generator
   extended with `SYNTHETIC_TAGS` for 3 missing skeleton wrappers. Rule added to
   ADR 0019: no raw WC tags in stories. See [Step 9 results](#step-9-results).
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
   - ~~Decide entry naming and granularity.~~ **Done 2026-10-27.** One secondary
     entry per top-level `components/<dir>` folder, named for the folder
     (`@carbon/angular/button`). **278 wrappers group into 97 entries**; nested
     barrels (`page-header/*-set`, `coachmark/*`, `date-picker/next`) fold into
     their parent. The `src/<name>` path problem is avoided by generating a
     separate build root, `.entries/`, via
     [`tasks/build-entries`](../tasks/build-entries/index.js), with its own
     primary `ng-package.json`. The primary entry is side-effect free.
   - ~~Wire the vendoring step into the entries build.~~ **Done 2026-10-27.**
     `build-entries` runs `create-prefixed-build --prefix cds-ng` into
     `.entries/vendor`, drops `node_modules` (flatpickr), `stories`,
     `__tests__`, `_story-assets` (except `overflowHandler.js`, which
     `page-header/utils.js` imports), the root `index.js` barrel, the classic
     and fluid `date-picker` folders, `.d.ts` and maps: **646 JS files, 9 MB**.
     It rewrites the copied wrappers to `cds-ng-*` selectors and
     `#carbon-ng/components/<dir>/index.js` imports, and writes `imports`,
     `sideEffects: ["./vendor/**/*.js"]`, `assets`, the web components' runtime
     dependencies (including `@carbon/layout` and `@carbon/motion`) and
     `allowedNonPeerDependencies`. It fails if any vendored relative import is
     missing or any bare import is not a declared dependency; that check found
     the `_story-assets` and root-barrel problems on the first run.
     `src/generated/` is unchanged (`cds-*`, peer `@carbon/web-components`) so
     Jest and Storybook are unaffected.
   - ~~Build the full library with secondary entries and time it.~~ **Done
     2026-10-27.** `yarn build`: 98 entry points (97 + primary), no warnings,
     **~22 s** for ng-packagr (single-entry build is ~5 s). The `exports` map
     has all 97 subpaths; the tarball is 1.3 MB.
   - ~~Consumer check against the real entries.~~ **Done 2026-10-27**
     (`temp/pkg-spike/consumer`, Angular 19.2, Chromium). Installed the packed
     tarball. `ButtonComponent` from `@carbon/angular/button`: bundle **240.95
     kB raw / 47.11 kB gzipped**, the same as the spike's 239.57 kB. Button plus
     Modal, Modal body and footer from `@carbon/angular/modal`: `cds-ng-button`,
     `cds-ng-modal`, `-body`, `-footer`, `-dialog` and `-header` all defined, no
     unprefixed `cds-*` tag defined, modal open and styled, no console errors.
     Child registration for Accordion and Modal was then checked in Playwright
     (step 8); the other composites (about 70 to 76) are still unchecked (ADR
     0020 verification 3).
   - ~~`ModalFooter.hasThreeButtons` three-button case.~~ **Done 2026-10-28**
     (step 8): absent with two buttons, present with three.
   - Try Angular 20+ and the `browser` and webpack builders.
   - Decide whether wrappers need `.d.ts` for the vendored code. Not needed so
     far: the wrappers import the vendor tree for side effects only, and the
     consumer build type-checked.
   - ~~Switch `build` to the entries layout.~~ **Done 2026-10-27.**
     `yarn workspace @carbon/angular build` is now generate wrappers, then
     `build-entries`, then `ng-packagr -p .entries/ng-package.json`, writing to
     `dist/` (the `publishConfig.directory`) in ~30 s. The root
     `ng-package.json` and `src/index.ts` were removed and `angular.json` points
     the build target at `.entries/ng-package.json`. The Lerna and CI order
     already builds `@carbon/web-components` first (`angular-test` and
     `angular-e2e` in `.github/workflows/ci.yml`; `lerna ls --toposort` puts
     web-components before angular), so `es/` exists.
   - ~~Point Storybook at `.entries/` so docs match what consumers get.~~ **Done
     2026-10-28.** `storybook` and `storybook:build` scripts now prepend
     `generate-wrappers` and `build-entries` (no `ng-packagr`). Two `paths`
     aliases added to `tsconfig.storybook.json`: `@carbon/angular/*` →
     `.entries/*/index.ts` and `#carbon-ng/*` → `.entries/vendor/*`. Button
     stories, MDX and e2e tests updated to `cds-ng-*` throughout. `welcome.mdx`
     and `migration.mdx` updated to match. `src/generated/` is still used by
     Jest only (unit tests query `cds-button` intentionally — explained in
     `Button.spec.ts`). Note: `baseUrl` must not appear in
     `tsconfig.storybook.json` — it is deprecated under
     `moduleResolution: "bundler"` and TypeScript 5.8 treats it as a hard error;
     `paths` entries use `./` relative paths instead.
   - Decide what to do with the six duplicated tags: the manifest lists
     `page-header`, `-breadcrumb`, `-content`, `-content-text`, `-hero-image`
     and `-tabs` from both `page-header` and `page-header-deprecated`. They map
     to one wrapper each, so the deprecated variants are not wrapped.
     Unconfirmed with maintainers whether that is intended.
4. **Trace the `CDSTooltip.updated` error** seen in coexistence run B3
   (`Cannot set properties of null (setting 'align')`), to see whether it is
   specific to the CCA host or a bug in the web components.
5. ~~**`@carbon/styles` `$prefix`** (ADR 0020 question 3).~~ **Done
   2026-10-27**: no prefixed stylesheet needed. Static check, then a browser
   check with 1.x and 2.x on one page: no effect on the vendored components, and
   the `overflow-menu` host class is inert.
6. **CEM analyzer spike** for enum unions and typed event payloads. The current
   manifest is the deprecated WCA format. Gaps are listed in
   [`developer-experience.md`](./developer-experience.md).
7. ~~**Run the Button Playwright checks.**~~ **Done**: `playwright:install`,
   fresh `storybook:build`, `e2e`: 9 passed. Two stale `cds--btn--*` assertions
   (and the `Expressive` story play function) were corrected to
   `cds-ng--btn--*`.
8. ~~**Verify form controls, named-slot components and `ActionSet`** in a real
   browser.~~ **Done 2026-10-28.** See [Step 8 results](#step-8-results). 9a.
   **Port the web component tests to Jest, component by component.** Task for
   the next clean session. The project's own guide,
   [`porting-web-component-tests.md`](./porting-web-component-tests.md), says
   each component ships a `<Name>.parity.spec.ts` ported from the WC
   `__tests__/*-test.js` files with titles preserved, a `<Name>.spec.ts` for
   input and output bindings, and an `e2e` file only for what jsdom cannot do.
   Only Button has all three. The six step 8 components (TextInput, Checkbox,
   Dropdown, ActionSet, Accordion, Modal) have hand-written Playwright checks
   that were **not** derived from the WC tests; the WC tests were not read. The
   WC suites to port are under
   `packages/web-components/src/components/<name>/__tests__/` (for example
   `modal-test.js`, `accordion-test.js`, `action-set-test.js`, and four checkbox
   files). Follow the guide: keep titles, use `it.todo` with a reason for
   anything needing layout, focus or snapshots, never hand-edit
   `src/generated/`. Then generalise: decide how to cover the other ~270
   wrappers (a shared harness that runs each WC suite against its wrapper is
   worth costing before porting file by file). Keep the step 8 Playwright specs;
   they cover value accessors, slot projection and child registration that the
   WC suites do not.
9. ~~**Define feature parity.**~~ **Decided 2026-10-28:** the first release has
   full coverage of `@carbon/web-components`, including the components still
   being merged from Carbon for IBM Products (item 18). What typing and slot
   work belongs in the first release is still open; a candidate definition is in
   [`developer-experience.md`](./developer-experience.md).
10. **Migration tooling** per [`migration-support.md`](./migration-support.md):
    mapping file, codemods (`plan.md` section 16 plus tag, output and directive
    transforms), agent skills, shadow DOM guidance,
    `docs/guides/cca-to-angular.md`. Decide how `@carbon/upgrade` parses Angular
    `.html` templates (its globs match only `.js/.jsx/.ts/.tsx`). Per-component
    CCA usage is not available from telemetry, so size it from an
    import-reporting codemod across sample repos or GitHub code search.
    **Decided 2026-10-28:** this is part of the plan and milestones (Milestone
    5), delivered as codemods plus agent skills, and may be delegated to a
    developer. **It ships in a future PR, not the first one.**
11. **Rewrite `plan.md` and `milestones.md`** now that legacy is gone, with new
    estimates. Include the migration tooling (item 10) and the scope freeze
    (item 18).
12. ~~**Land the Angular 19 peer floor** (ADR 0018).~~ **Accepted 2026-10-28.**
    Peers set to `>=19`, toolchain stays on `^19`. Follow-ups: add the Angular
    19 plus latest matrix to `angular-test` and `angular-e2e` in
    `.github/workflows/ci.yml`; drop `standalone: true` from the generator
    (`tasks/generate-wrappers/index.js`), the README and the Storybook welcome
    sample; put the `>=19` peer requirement in the CCA migration doc.
13. ~~**Decide whether to accept ADR 0020.**~~ **Accepted 2026-10-27.** Basis:
    coexistence spike, `$prefix` answered, 1.x and 2.x browser check, Button
    Playwright 9 of 9, packed install resolves every import, Button barrel 145
    kB (22 kB gzip). Follow-ups are listed at the end of the ADR:
    - Declare `lit-html` in `build-entries` (the Tearsheet files import it; it
      works under npm hoisting, untested under pnpm).
    - ~~Load the Accordion, Modal and `ModalFooter` in a browser.~~ Done
      2026-10-28 (step 8). Still open: the child-registration check across all
      composites.
    - Measure a real Angular app through the wrappers for size and tree-shaking.
14. **Write `docs/guides/cca-to-angular.md`** (decided 2026-10-28: a separate
    migration doc, because the package is not behind a v12 flag). Decide whether
    `docs/migration/v12.md` also needs a short entry (`AGENTS.md` says
    v12-affecting changes must update it).
15. **Open the upstream issue for the skeleton classes** (item 19; future PR)
    and put the `TODO(parity)` comment on the Modal stories for
    `EnableDialogElement` (item 20; the comment is done).
16. **Move the generator to CEM** when the web components PR lands (open
    question 4).
17. **Move the `Loading-test.js` change to its own PR.** Removed from this
    branch 2026-10-28; the patch is saved in the gitignored
    `temp/loading-test-modal-stub.patch`.

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
