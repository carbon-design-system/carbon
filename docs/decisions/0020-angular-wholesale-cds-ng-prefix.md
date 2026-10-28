# 20. Ship `@carbon/angular` with a wholesale `cds-ng-*` prefix

Date: 2026-10

## Status

Accepted (2026-10-27)

This supersedes the selector decision in
[ADR 0014](0014-preserve-cds-consumer-facing-selectors.md), replaces the "host
is registered under the real `cds-*` tag" part of
[ADR 0015](0015-angular-wrapper-host-is-the-web-component.md), and changes the
peer-dependency consequence in
[ADR 0011](0011-back-angular-components-with-web-components.md). The "wrapper
host is the web component" part of ADR 0015 is kept.

What accepting covers: option B, the wholesale `cds-ng-*` prefix over a
vendored, prefixed copy of the web components owned by `@carbon/angular`. It
does not decide the manifest source (WCA or CEM, open question 4) or the items
under "Follow-ups after acceptance" at the end of this document.

Basis for accepting:

- The coexistence spike (open question 1) ran for the Modal and the Dropdown.
  Under the real `cds-*` tag the CCA modal stops rendering and the CCA dropdown
  is replaced by a different control; under `cds-ng-*` both are unaffected,
  including with the `cds-ng-*` versions rendered on the same page. It covers
  two components, one browser and one Angular version.
- No prefixed `@carbon/styles` is needed (open question 3), and `@carbon/styles`
  1.x and 2.x on one page made no difference to seven vendored components in a
  browser.
- The Button Playwright checks pass in Chromium (9 of 9) against the `cds-ng-*`
  Storybook build.
- A packed `dist/` installed into an empty project resolves every import in the
  vendored copy (open question 2).

- DRI: Angular package maintainer
- Input needed from: Angular experts, the migration/upgrade tooling owners. The
  web components and Angular packages are managed by the same team, so no
  separate sign-off is needed for packaging.

Maintainer input recorded 2026-10-26 is summarized under "Maintainer answers"
below.

## Context

ADR 0014 keeps `cds-*` as the Angular selector so that consumers migrating from
`carbon-components-angular` (CCA) keep their element names. ADR 0015 then made
the wrapper's host element the web component, registered under the real `cds-*`
tag, because a per-tag rename (`cds-ng-button` inside a `cds-button` wrapper)
broke styles and slotted-child lookups.

Three things have come up since:

1. **Migration is not an "easy button" regardless.** Checked against the CCA
   source, many components change shape (see
   [`migration-support.md`](../../packages/angular/docs/migration-support.md)).
   The `cds-*` selector preserves very little for the consumers who would
   benefit most from it.
2. **Registering the real `cds-*` tags is global.** Importing `@carbon/angular`
   defines `cds-button` and every other tag in the page-wide registry. ADR 0015
   already lists the risk of two copies of `@carbon/web-components` on one page.
   We also expect, but have not tested, that it affects incremental migration
   from CCA (see Open questions).
3. **A migration tool needs to tell migrated from unmigrated elements.** If both
   CCA and `@carbon/angular` use `<cds-modal>`, a codemod cannot tell whether a
   given element has been converted, so it cannot run repeatedly or file by
   file.

The rename problem in ADR 0015 was real, but it was about renaming one class at
a time. It did not test renaming the whole tree consistently.

## What we found

All measurements below were taken on this branch in October 2026 and are
reproducible with the commands shown. None were run in a browser.

### 1. A per-class rename is incomplete; a whole-tree rename is consistent

[`defineCustomElement(clazz, { name })`](../../packages/web-components/src/globals/register.ts)
renames only the class passed to it. ADR 0007 says so explicitly: `{ name }`
applies only to directly registered elements, and a composite still resolves its
children by the original tag. The `:host(cds-…)` selectors, the `::slotted`
selectors and the `querySelector('cds-…')` calls inside the web components are
unchanged. That is the failure ADR 0015 measured.

[`create-prefixed-build`](../../packages/web-components/bin/create-prefixed-build.js)
renames the whole tree at build time by rewriting every `cds` that is not part
of a `--cds` custom property. We ran it with `--prefix cds-ng` into a scratch
directory:

- 1060 files were rewritten.
- No `cds-<name>` element name remains in the JavaScript output.
- `static is` becomes `cds-ng-button`, `:host(cds-button)` becomes
  `:host(cds-ng-button)`, and event names become `cds-ng-checkbox-changed`.
- CSS classes become `cds-ng--btn`. `--cds-*` tokens are kept, so theming is
  shared.
- Substring check on the original output: the only `cds` occurrences with a
  letter directly next to them are four copies of a pre-existing typo in the
  source CSS (`.ccdsds--date-picker`). The rewrite changes that typo the same
  way as everything else, so it causes no new problem.

Size: the JavaScript in the prefixed copy is 7.6 MB raw and about 0.9 MB gzipped
for the whole library, against 7.3 MB raw for the original. This is the size of
the whole library, not what a consumer ships. Whether a bundler can tree-shake
it is open.

The scratch build was first not wired into Angular. It has since been vendored
into a scratch `ng-packagr` library and run in a browser; see open question 2.

### 2. The generated wrappers do not register child elements

This is independent of the prefix, and it is a bug in the current generator.

- 72 of the 279 `cds-*` classes render other `cds-*` tags, counted from the
  TypeScript source with comments stripped. A second count over the built `es/`
  output, which also includes tags emitted by imported helpers, found 76. We did
  not reconcile the difference of 4. Treat the count as "about 70 to 76".
- Each generated wrapper imported its own class file and called
  `defineCustomElement` on that one class. **Fixed:** the generator now imports
  the folder barrel (`src/__tests__/child-registration.spec.ts` guards it).
- Under the pure-exports model (ADR 0007), a class file registers nothing. Only
  the component barrel (`components/<name>/index.js`) registers the family.

We confirmed the effect with a throwaway Jest spec (not committed). After
importing only the generated `ModalComponent`:

| Tag                | Defined |
| ------------------ | ------- |
| `cds-modal`        | yes     |
| `cds-dialog`       | **no**  |
| `cds-modal-header` | **no**  |
| `cds-modal-footer` | **no**  |
| `cds-modal-body`   | **no**  |

`cds-modal` renders a `<cds-dialog>` internally, so the generated Modal would
render an inert, unstyled dialog unless the consumer also imports other wrappers
or the web components' barrel. ADR 0015 verified Button and `ModalFooter` only,
which is why this was not caught.

Importing the **barrel** fixes it, because the barrel registers every element
its component renders. This also gets simpler under a prefixed build: the
prefixed barrel registers the whole family under the prefix with no
per-component name handling.

### 3. The manifest is a poor long-term input for the generator

The generator reads
[`packages/web-components/custom-elements.json`](../../packages/web-components/package.json).

- It is in **WCA format** (`web-component-analyzer`), produced by `yarn wca`. It
  is a build artifact (gitignored) and
  [`wca-deprecation.mjs`](../../packages/web-components/tasks/wca-deprecation.mjs)
  stamps it as deprecated and scheduled for removal in v3.0.0 in favor of the
  standard Custom Elements Manifest (CEM). Tracking issue: #20670.
- It holds 309 tags, 279 of them `cds-*`.
- Of 2847 property entries, 368 have no type, and the generator's own
  `sanitizeType` collapses roughly 400 more to `any`. About 80 entries are the
  `shadowRootOptions` object type leaking in as an input.
- 62 elements have slots and 99 have events, but the generator uses neither
  slots nor event payload types. Every output is `EventEmitter<any>`.
- The generator guesses the WC class name from the tag (`CDS${displayName}`). 16
  of those guesses do not match the real class name (for example `CDSAiLabel`
  versus `CDSAILabel`). This currently works only because every file uses a
  default import, so the local name does not matter.

## Options considered

**A. Keep `cds-*` (ADR 0014 and 0015 as they are).** No template change for
element-selector components from CCA. Global registration of real tags, the
unverified CCA coexistence question, and no way for tooling to tell migrated
from unmigrated elements.

**B. Wholesale `cds-ng-*`, wrapper host is the web component, with a prefixed
copy of `@carbon/web-components` bundled in `@carbon/angular`.** Described
below. The package no longer needs the web components as a peer, but ships a
second copy of the code. **Preferred by the maintainers.**

**C. Wholesale `cds-ng-*`, with the prefixed copy published as its own artifact
by the web components package** and depended on by `@carbon/angular`. Same
runtime result as B with different ownership. **Not pursued:** the maintainers
want `@carbon/angular` to own the prefixed copy, and no part of it should live
in `@carbon/web-components`.

**D. Per-class rename with `defineCustomElement(clazz, { name })`.** Rejected.
Finding 1 shows it breaks composites. It is the ADR 0015 option A failure again.

## Decision

**Decided: B.** `@carbon/angular` uses the `cds-ng-*` prefix for every Angular
selector and every registered custom element, over a build of
`@carbon/web-components` made with `create-prefixed-build --prefix cds-ng`,
owned and produced by `@carbon/angular`.

How "the wrapper host is the web component" works under it:

1. **Selector.** `cds-ng-button`. The registered custom element is also
   `cds-ng-button`, so the host element is the web component, as in ADR 0015.
2. **Template.** `<ng-content />` only, unchanged.
3. **Registration.** The wrapper imports the **barrel** of the prefixed copy for
   its component (`…/components/button/index.js`), which registers the whole
   family under `cds-ng-*`. The wrapper does not call `defineCustomElement` on
   one class. This fixes finding 2.
4. **Inputs.** Unchanged. Property names are not affected by the prefix.
5. **Events.** Event names change with the prefix (`cds-checkbox-changed`
   becomes `cds-ng-checkbox-changed`). The generator maps them. The ADR 0015
   rule stays: no `@Output` with the same name as a DOM event that the host
   dispatches.
6. **Forms.** `ControlValueAccessor` on the wrapper, as in ADR 0013. The
   value-change event list in the generator uses prefixed names.
7. **Compound components.** Parent lookups such as `matches('cds-ng-button')`
   work because the whole tree uses the same prefix.

### Generator input

The runtime code and the API metadata are two different inputs, so this is not
an either/or choice:

| Need                                                                | Source                                                                          |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Runtime behavior, styles, registration                              | The **prefixed build** of the web components                                    |
| Names, inputs, outputs, types, slots, docs for the Angular wrappers | A **manifest**, which still has to come from the unprefixed source or be mapped |

Direction (the manifest move to CEM is not decided by accepting this ADR, see
open question 4):

- The prefixed build replaces per-class registration, and the generator imports
  barrels from it.
- The generator keeps using a manifest for the API, but **moves from WCA to
  standard CEM** (`@custom-elements-manifest/analyzer`). `plan.md` already
  recommends this. CEM carries typed events, slots, CSS parts and inheritance,
  which would let outputs be typed and slot-aware.
- The generator applies the prefix mapping to tag names and event names when it
  emits code. It does not need a manifest of the prefixed build.

We have not run the CEM analyzer against this codebase. Whether it handles the
mixins, the `static is = \`${prefix}-…\`` pattern and Lit decorators well is an
open question and needs a spike.

## Consequences

Positive:

- Each page can run CCA, a separate copy of `@carbon/web-components`, and
  `@carbon/angular` without tag collisions. (Expected, not yet tested.)
- Migration tooling can tell `<cds-modal>` (CCA) from `<cds-ng-modal>` (new), so
  codemods can be re-run and applied file by file.
- Real browser tags no longer depend on whether a consumer also loads
  `@carbon/web-components`.
- The generator's child-registration bug (finding 2) is fixed by construction.

Negative or risky:

- **Every migrating template changes**, because `cds-modal` becomes
  `cds-ng-modal`. For the roughly 118 element selectors in CCA this is a
  mechanical rename, but it removes the "no template change" argument of
  ADR 0014.
- **Packaging.** B bundles a second copy of the web components inside
  `@carbon/angular`. ADR 0011's "peer dependency on `@carbon/web-components`" no
  longer holds. Consumers who also use `@carbon/web-components` directly pay for
  two copies. The web components' runtime dependencies (`lit`,
  `@floating-ui/dom`, `@carbon/icons`, `@carbon/utilities`, `@ibm/telemetry-js`
  and others) become `@carbon/angular`'s concern: ADR 0011 notes that
  `ng-packagr` blocks non-peer runtime dependencies unless they are whitelisted.
  Checked 2026-10-27: `build-entries` copies the web components' `dependencies`
  into the published `package.json` (minus `@carbon/styles` and
  `@ibm/telemetry-js`), adds `@carbon/layout` and `@carbon/motion`
  (devDependencies upstream, imported by `stack` and `side-panel`), and
  whitelists them in `allowedNonPeerDependencies`. `npm pack` of `dist/` into an
  empty project resolved all 116 distinct bare specifiers in the 646 vendored
  files and all 102 `#carbon-ng/*` wrapper imports, with no missing packages
  other than the declared peers. One gap: the Tearsheet files import
  `lit-html/directives/class-map.js`, which is not declared; it resolves only
  because npm hoists `lit-html` from `lit`. A strict package manager (for
  example pnpm) may not resolve it. Not tested.
- **Version coupling.** `@carbon/angular` is pinned to one version of the web
  components. Bug fixes in the web components reach Angular consumers only
  through a new `@carbon/angular` release.
- **Global class names.** `cds-ng--*` class names appear in the output. A static
  check (open question 3) found none that needs a stylesheet outside shadow DOM,
  so no matching `$prefix` build of `@carbon/styles` is planned. Theme tokens
  stay unprefixed `--cds-*` and are shared with a CCA app on `@carbon/styles`
  1.x. The 1.x and 2.x token sets differ in three properties, none of which the
  vendored components read through a selector they match, and a browser check
  with both stylesheets on one page showed no difference (open question 3).
- **Docs and examples.** Everything that shows `cds-*` for Angular changes,
  including about 32 `cds-ng-*` references in `plan.md` that currently mean
  something else.
- **Tree-shaking** of import-time barrel registration is unverified (the open
  item from ADR 0015 still applies).

## Maintainer answers

Recorded 2026-10-26.

| Question                                   | Answer                                                                                                                             | Effect on this ADR                                                 |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Who owns the prefixed copy?                | `@carbon/angular`, not `@carbon/web-components`. The same team manages both packages.                                              | Option B is preferred. Option C is not pursued.                    |
| Is `@carbon/angular/legacy` worth keeping? | Abandoned and removed (decided 2026-10-26). Migration is not trivial even with adapters, and adapters create a two-step migration. | Open question 5. The collision argument is moot under a prefix.    |
| Should Angular teams need web components?  | No. `@carbon/angular` should be a one-for-one Angular version with full feature parity and a better developer experience.          | The bundled copy is an implementation detail. See open question 6. |

## Open questions

1. **Does CCA coexist with `@carbon/angular` under `cds-*`? Spike run; answer
   for the Modal and the Dropdown is no.** Hypothesis: registering `cds-modal`
   upgrades CCA's `<cds-modal>` elements, because CCA's elements are Angular
   component hosts and not registered custom elements. This rests on CCA's Modal
   declaring `selector: "cds-modal, ibm-modal"`, rendering its own template, and
   CCA having no dependency on `@carbon/web-components`. Brief and full setup:
   [`coexistence-spike.md`](../../packages/angular/docs/spikes/coexistence-spike.md).

   **Observed** (Chromium via Playwright; Angular 19.2.25;
   `carbon-components-angular` 5.72.3; `@carbon/styles` 1.118.0; the workspace
   `@carbon/web-components`; a scratch app built with the Angular CLI in
   development mode). The CCA modal is declared in the template with `[open]`.

   | Run | What was loaded                                                                                                         | CCA host upgraded (shadow root, `instanceof` Lit class) | CCA modal painted when opened (screenshot) | Close button works             | Console                                    |
   | --- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------ | ------------------------------ | ------------------------------------------ |
   | A   | CCA only (baseline)                                                                                                     | No                                                      | Yes                                        | Yes                            | Clean                                      |
   | B   | Generated wrapper under real tag, loaded before Angular rendered (registers `cds-modal` only; children are not defined) | Yes                                                     | No                                         | No (click timed out after 2 s) | Lit dev-mode warning only                  |
   | B2  | CCA modal rendered first, then the wrapper lazy-loaded                                                                  | Yes (existing element upgraded)                         | No                                         | Not run                        | Lit dev-mode warning only                  |
   | B3  | Real-tag barrel (`…/components/modal/index.js`), so `cds-modal-header`, `-footer`, `-body` and `cds-dialog` are defined | Yes                                                     | No                                         | No (click timed out after 2 s) | Two `CDSTooltip.updated` TypeErrors, below |
   | C   | Prefixed build barrel, `cds-ng-modal` and children registered, no real `cds-*` tags                                     | No                                                      | Yes, same as A in the screenshot           | Yes                            | Lit dev-mode warning only                  |

   B3's errors: `Cannot set properties of null (setting 'align')` thrown from
   `CDSTooltip.updated`. The trigger was not traced.

   **What this shows.**

   - The hypothesis holds for the Modal: defining the real `cds-modal` tag
     upgrades CCA's host elements, as it does in B2 where the element already
     existed, and the CCA modal stops rendering.
   - Load order does not rescue it (B versus B2).
   - Fixing the child-registration bug does not rescue it (B3). That bug and
     this one are independent.
   - The prefixed registration (C) leaves CCA untouched. C registered
     `cds-ng-modal` and its children but did not render a `cds-ng-modal` element
     next to the CCA modal. The second sample below (DD-C) does render both.

   "Visible" above means what the screenshots show. In B and B3 the CCA body
   element still had a layout box (about 808 by 20 pixels) while nothing was
   painted, so a test based on geometry would have passed.

   **Second sample: Dropdown** (same setup, run after the Modal). The CCA
   dropdown is declared as
   `<cds-dropdown label="…" (selected)="…"><cds-dropdown-list [items]="…">`.
   Scratch labels are `D0`, `D1` and `N` in `temp/spike/run-d.mjs` and
   `run-d2.mjs`; they are renamed here to avoid clashing with experiment D in
   the brief.

   | Run  | What was loaded                                                                                                                    | CCA host upgraded (shadow root, `instanceof` Lit class) | CCA dropdown opens and lists its 3 items | Picking Option 2 fires CCA's `(selected)` | Console                   |
   | ---- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------- | ----------------------------------------- | ------------------------- |
   | DD-A | CCA only (baseline)                                                                                                                | No                                                      | Yes                                      | Yes (`picked: Option 2`)                  | Clean                     |
   | DD-B | Dropdown folder barrel under the real tags (`cds-dropdown`, `cds-dropdown-item`, `cds-dropdown-skeleton`); no real `cds-modal`     | Yes                                                     | No                                       | No                                        | Lit dev-mode warning only |
   | DD-C | Prefixed dropdown and modal barrels registered; `cds-ng-dropdown` and `cds-ng-modal` rendered on the same page as the CCA versions | No                                                      | Yes                                      | Yes                                       | Lit dev-mode warning only |

   DD-B detail. The CCA host became a `CDSDropdown` and took the Lit element's
   `label` from CCA's static `label` attribute. Its height changed from 66 to 40
   pixels. CCA's own `.cds--list-box__field` measured 0 by 0 pixels and
   `checkVisibility()` returned false, so the user cannot reach it. Clicking the
   host opened the Lit dropdown (`open` was true), and the screenshot shows its
   popup containing CCA's markup slotted in (a second "CCA dropdown" label and a
   "Select" field) and none of the three items. No item was selectable and
   `picked` stayed empty. Unlike the Modal, the host is not blank: it renders a
   second, different control over the CCA one.

   DD-C detail. `cds-ng-dropdown` was upgraded, opened on click, and picking its
   second item set `value` to `b`. With `cds-ng-modal` registered and in the
   DOM, the CCA modal opened, its body was visible and was the topmost element
   at its own position (a hit test, not only geometry), and its close button
   worked. `cds-ng-modal` opened alone behaved the same way. Opening both modals
   at once makes them overlap because both centre; that is not a meaningful test
   and is not counted. Checked by screenshot as well.

   **Probable mechanism (observed facts, then inference).** Observed in a B3
   probe after clicking the open button: the CCA host has a shadow root
   containing the Lit modal's container `div`, CCA's `cds-overlay` is slotted
   into it, the host's `open` property and attribute are both false, and the
   slotted overlay measured 768 by 0 pixels. Inferred, not checked: Angular
   binds `[open]` to CCA's component input and not to the Lit property, so the
   Lit element is never opened. CCA's own input value was not read.

   **What the Dropdown adds.**

   - The break is not specific to the Modal. Two components with different
     shapes fail the same way: the CCA host element is upgraded into the Lit
     class.
   - The Dropdown's own tag is enough. CCA's list tag `cds-dropdown-list` is not
     a web component tag, and the web components do not define it, yet the CCA
     dropdown still breaks because its host shares the tag `cds-dropdown`. No
     child tag collision is needed.
   - This fits the name comparison: 63 of CCA's 121 `cds-*` element selectors
     (counted from the `carbon-components-angular` sources against the
     `custom-elements.json` tags) are also web component tags. That is a count
     of names, and only two of those 63 were run. Treat "any of the 63 is at
     risk" as an inference.
   - The prefixed build coexists in the two samples run, with both libraries'
     components rendered on one page (DD-C).

   **Limits.** Two components, both declarative CCA components and not
   `ModalService`. Chromium only. Angular CLI application build, so it says
   nothing about `ng-packagr` (open question 2). The Dropdown used CCA's
   `(selected)` output, not `ngModel`. Not run: a CCA form control with
   validation, Angular 20+, `@carbon/styles` 2.x, `cds-ng-modal` close and focus
   trap (only that it displays and is hit-testable), and the unmodified
   two-copies case (experiment D in the brief). The scratch app and scripts are
   in the gitignored `temp/spike/`.

   Corroboration from history, from the maintainers: before the prefixed build
   existed, Angular teams hit this same conflict, and the `es-custom` export
   (`cds-custom-*`) was created for them. `es-custom` is now deprecated and
   scheduled for removal in `@carbon/web-components` v3.0.0
   (`packages/web-components/README.md`).

2. **Packaging mechanism (ownership answered: `@carbon/angular` owns it). Spiked
   2026-10-26: it works, with four constraints.** `create-prefixed-build` copies
   `es/`, which must already exist, so the build order is web components first,
   then the prefixed copy, then `ng-packagr`.

   **Setup** (scratch library under the gitignored `temp/pkg-spike/`): the
   workspace `@carbon/web-components` was rebuilt from source (`yarn build`,
   exit 0), then `create-prefixed-build --prefix cds-ng` made 1100 re-prefixed
   files. `ng-packagr` 19.2.2, Angular 19.2.25, Angular CLI `application`
   builder for the consumer, Chromium. One entry point, three wrapper components
   (`cds-ng-button`, `cds-ng-date-picker`, `cds-ng-date-picker-input`).

   | What was tried                                                                                                                                                          | Result                                                                                                                                                                        |
   | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Relative import of the vendored JavaScript from a wrapper (`./vendor/…/index.js`)                                                                                       | Fails: `Could not resolve "./vendor/components/button/index.js"`. `ng-packagr` compiles TypeScript from the entry file only and does not emit the vendor JS.                  |
   | Same, with `allowJs` and the vendor folder in `include` (the build's `.d.ts` files still beside the JavaScript)                                                         | Fails the same way. `ng-packagr` sets `rootNames` to the entry file, so `include` is ignored, and TypeScript resolves the import to the `.d.ts`, so no JavaScript is emitted. |
   | Same, with `allowJs` and the `.d.ts` files deleted so TypeScript reads the JavaScript                                                                                   | Fails: `TS4094` (private or protected members of an exported anonymous class) on the Lit mixin classes, because `declaration` is on.                                          |
   | Copy the JavaScript with `ng-package.json` `assets`, import it through a `package.json` `imports` alias (`#carbon-ng/*` to `./vendor/*`) and a `tsconfig` `paths` entry | Builds. The FESM keeps `import '#carbon-ng/components/button/index.js'` untouched.                                                                                            |
   | A path-mapped package-style specifier (`@spike/angular-lib/vendor/*`)                                                                                                   | Fails: `ng-packagr` treats it as a secondary entry point that does not exist.                                                                                                 |

   **What the working setup gives.**

   - The Angular CLI `application` builder resolves the `#carbon-ng/*` alias
     from the installed package. The prefixed `cds-ng-button` renders styled
     (114 by 48 pixels, shadow root, class `CDSButton`) and `cds-button` is not
     defined. The Date Picker opens, the calendar appears and a picked date sets
     `value`.
   - Declaring the runtime dependencies needs `allowedNonPeerDependencies` in
     `ng-package.json`; without it the build stops with
     `Dependency @carbon/icon-helpers must be explicitly allowed`. Listed: the
     seven dependencies of `@carbon/web-components` that the JavaScript imports
     (`lit`, `@lit/context`, `@carbon/icons`, `@carbon/icon-helpers`,
     `@carbon/utilities`, `@floating-ui/dom`, `lodash-es`).
   - Packed size, with `.d.ts`, source maps, `stories/` and `__tests__/` left
     out: 698 vendored files (including 9 for flatpickr), about 11 MB unpacked
     and a 0.98 MiB `.tgz`. The same library before trimming, with `.d.ts`, maps
     and stories, was 1.11 MiB packed, so trimming saves little in the tarball.
     The full vendored tree holds 2481 files.

   **Constraints found.**

   1. **`sideEffects: false` removes the registration.** `ng-packagr` writes
      `"sideEffects": false` into the built `package.json`. The vendored barrel
      is imported for its side effect only, so a bundler drops it: the consumer
      built without error, `cds-ng-button` was never defined and "Hello" showed
      as plain text. Setting `sideEffects` to `["./vendor/**/*.js"]` in the
      source `package.json` fixes it, and that array is carried into the built
      package. The wrapper that imports `@carbon/web-components` as a peer is
      not affected, because that package declares no `sideEffects` field
      (checked with the existing design: `cds-button` was defined). So this trap
      is introduced by vendoring.
   2. **Undeclared and unshipped imports.** Resolving every bare import in the
      vendored JavaScript from a clean install of the packed library: the
      packages above resolve, and `@carbon/layout` and `@carbon/motion` do not
      unless installed some other way. In `@carbon/web-components` they are
      `devDependencies`, and `stack/defs.js` and `side-panel/side-panel.js`
      import them, so an unprefixed install gets them only transitively through
      `@carbon/styles`. A vendored copy must declare them. `stories/helpers.js`
      imports `storybook/actions` and must be excluded. `lit-html` is imported
      by the Tearsheet files and comes in through `lit`. An earlier build in the
      workspace was stale and still imported `@lit-labs/signals`; a fresh build
      does not, so rebuild before copying.
   3. **Flatpickr.** `date-picker.js` imports `../../node_modules/flatpickr/…`,
      a `node_modules` folder inside `es/` that `bundledDependencies` places
      there. A vendoring step that skips `node_modules` breaks the Date Picker
      silently, and an `assets` glob for `**/*.js` does include it (9 files).
      Only the classic picker needs it. Following the import graph of the built
      `es/` barrels, `date-picker/next/index.js` (the Preview Date Picker, which
      `plan.md` section 8 already says the wrappers target) reaches no flatpickr
      (20 files, 0 hits). `date-picker/index.js` and
      `fluid-date-picker/index.js` do, and so does
      `fluid-date-picker/next/index.js`, because it imports `../index` to
      re-register the classic items. The spike vendored everything, so it
      carried flatpickr (about 90 KB of JavaScript) for a picker the plan does
      not intend to expose. [ADR 0021](0021-angular-drop-classic-date-picker.md)
      resolves this by not wrapping the classic, fluid or Preview Fluid pickers,
      so flatpickr can be left out of the vendored copy. **Measured 2026-10-26
      (see ADR 0021 verification 4):** re-running the Button-only consumer
      against a rebuilt `lib` that excludes `date-picker`, `fluid-date-picker`
      and `node_modules/flatpickr` from the vendor tree (664 JS files, down from
      698; 944 kB packed, down from 967 kB) gave a production bundle of **364.68
      kB** — the same as the 365 kB original to within rounding. Flatpickr is
      not the source of the button-only cost; the cost is the entry-point
      registering every component barrel it covers, confirming constraint 4
      below.
   4. **Tree-shaking does not work at the package level, but secondary entry
      points fix it.** With the `sideEffects` fix, a consumer that imports only
      `ButtonComponent` from an entry point that also exports the Date Picker
      wrapper still ships the Date Picker and flatpickr: the production bundle
      was 240 kB with the library holding only Button and 365 kB with the
      library also holding the date picker wrappers. The generated
      `@carbon/angular` has 279 wrappers in one entry point, so the bundle would
      carry the registration code for all of them unless the entry points are
      split. **Measured 2026-10-27:** splitting `button.component.ts` into a
      secondary entry (`@spike/angular-lib/src/button`) and importing from that
      path gave a production bundle of **239.57 kB** — a 125 kB / 34% reduction
      versus the single-entry 364.68 kB baseline. The secondary entry's FESM
      contains only the Button barrel side-effect import; the Angular CLI
      `application` builder does not pull in any other component. The scratch
      library and consumer are in the gitignored `temp/pkg-spike/`. **Decided
      and built 2026-10-27:** one secondary entry per top-level
      `components/<dir>` folder, named for the folder
      (`@carbon/angular/button`), 97 entries for 278 wrappers, assembled by
      `packages/angular/tasks/build-entries` into a separate gitignored build
      root (`.entries/`) so the path has no `src/` segment. The same task
      vendors the `cds-ng` prefixed copy (646 JS files, 9 MB; no flatpickr,
      stories, tests or root barrel), writes the `imports`, `sideEffects`,
      `assets` and dependency declarations from constraints 1 and 2, and fails
      if a vendored import does not resolve. The full `ng-packagr` build (98
      entry points including a side-effect-free primary) takes about 22 s with
      no warnings and packs to 1.3 MB. **Consumer check:** installed from the
      tarball into a clean Angular 19.2 app, `ButtonComponent` from
      `@carbon/angular/button` gives **240.95 kB raw / 47.11 kB gzipped**, and
      Button plus Modal from `@carbon/angular/modal` renders styled in Chromium
      with `cds-ng-button`, `-modal`, `-body`, `-footer`, `-dialog` and
      `-header` defined, no unprefixed `cds-*` tag defined and no console
      errors.

   **Not checked.** Angular 20+. Other bundlers (webpack, Vite) and the Angular
   CLI `browser` builder. Whether `.d.ts` for the vendored code is needed by the
   wrappers (the spike used none, since the wrappers import it for side effects
   only). Whether `yarn build` order and caching work in the repository's Lerna
   setup. Source maps for the vendored code.

3. **Does `@carbon/styles` need a matching `$prefix`** for anything outside
   shadow DOM, and what happens to a CCA app on `@carbon/styles` 1.x that also
   loads `@carbon/styles` 2.x?

   **Static check, 2026-10-27: no dependency found.** Searched the vendored copy
   (`.entries/vendor`, 646 JS files: 119 `*.scss.js`, 179 logic files that
   mention `cds-ng--`). Nothing was run in a browser.

   - **Template classes** (`classMap`, `class=`, `iconLoader(..., { class })`)
     render inside shadow roots and are styled by the component's `*.scss.js`.
   - **DOM-touching hits** (`classList.*`, `querySelector`, `closest`,
     `matches`, `composedPath`: 72 sites). Every class added to the host or a
     light-DOM child was looked up in the component's `*.scss.js`, and a
     matching `:host(...)`, `::slotted` or plain rule exists in each case (for
     example `page-header`, `tabs-vertical`, `menu-item`, `popover` tab-tip, the
     `slug--revert` toggle in `dropdown`, `select` and `text-input`). The
     `querySelector` and `closest` sites target the component's own shadow root,
     a `query()` field or another `cds-ng-*` element's shadow root. These were
     read by pattern, not each one executed.
   - **No vendored file** imports, links, injects or adopts a stylesheet, and
     none references `@carbon/styles`. The only `document` access is `cds-ng-*`
     tag lookups, `document.documentElement.style.setProperty` for
     `--tearsheet-*` properties (already unprefixed), `document.body` cursor,
     and unprefixed `.coachmark-body` in `coachmark-helpers.js`. None of these
     needs a prefixed stylesheet.
   - **`overflow-menu` host class: confirmed inert 2026-10-27.**
     `overflow-menu.js` adds `cds-ng--layout--size-<size>` to the host (light
     DOM). The only matching rule in the vendored styles is
     `.cds-ng--layout--size-*` inside the shadow styles, which cannot match the
     host. In a browser the host stays 40x40 with and without `@carbon/styles`
     loaded.
   - **Custom properties are not prefixed.** The vendored styles contain 0
     `--cds-ng-*` references and about 24,600 `var(--cds-*` references. Theme
     tokens therefore still come from a global `--cds-*` provider (the page's
     `@carbon/styles` or `@carbon/themes` output, via inheritance through shadow
     DOM). A `$prefix: cds-ng` build of `@carbon/styles` would not be needed for
     the components, and could make token names diverge from what they read
     unless it left custom properties alone (not checked).

   **Conclusion:** do not build a `cds-ng` copy of `@carbon/styles`. A CCA app
   on `@carbon/styles` 1.x uses the `cds--*` classes the vendored copy never
   references, so the two do not collide on class names. They do share `--cds-*`
   custom properties, which is the intended path for theming.

   **Browser check, 2026-10-27: 1.x and 2.x on one page do not affect the
   vendored components.** Setup: the vendored `button`, `dropdown`, `tooltip`,
   `overflow-menu`, `text-input`, `tag` and `menu` bundled with esbuild into one
   page, in Chromium (Playwright), with five stylesheet variants: none, 1.118.0,
   2.0.0-alpha.4, 1.x then 2.x, and 2.x then 1.x. A sixth case wrapped the
   components in a CCA-style `.cds--layout--size-sm` element.

   - **Token diff, 1.x vs 2.x `styles.css`:** 640 and 634 `--cds-*` custom
     properties. One changed value (`--cds-popover-border-radius`: `2px` in 1.x,
     `0.25rem` in 2.x), 11 only in 1.x (`--cds-layout-size-icon-gap*`), 5 only
     in 2.x (`--cds-button-radius*`).
   - **None of the three reaches a vendored component.** In both stylesheets
     `--cds-popover-border-radius` is declared only on `.cds--tooltip`,
     `.cds--definition-tooltip` and `.cds--toggletip`; `--cds-button-radius*`
     (2.x) is declared only on `cds--*` class selectors; and
     `--cds-layout-size-icon-gap` (1.x) only on `.cds--layout--size-*`. The
     vendored copy uses none of those classes, so each `var()` takes its
     fallback.
   - **Measured result:** across the five stylesheet variants, button background
     and radius, tertiary border colour, and dropdown, text input and
     overflow-menu sizes were identical, as were the screenshots (byte-identical
     for the four variants that load a stylesheet). No console errors. In the
     wrapper case only the dropdown's `--cds-layout-size-icon-gap` (`0.5rem`),
     the dropdown and trigger heights, and the overflow-menu size and host class
     were measured; they matched the plain run. Loading no stylesheet changed
     only widths by a few pixels (126 vs 130 px for a button) and left the theme
     tokens empty, so the vendored components still need a `--cds-*` provider on
     the page.

   **Limits.** Seven components, one browser, no Angular (the vendored copy
   bundled directly), no real CCA components on the page, light theme only. The
   token diff is of the compiled CSS bundles, not of every theme and component
   scope. The button is a full pill (`999999px` radius) in every variant. It is
   the `var(--cds-button-radius, 999999px)` fallback in the vendored styles, so
   it does not depend on the stylesheet.

4. **Manifest: CEM.** **Direction decided 2026-10-28:** move from the WCA
   manifest to the standard Custom Elements Manifest (CEM). A PR from the web
   components maintainers that produces a CEM is in progress. The generator will
   pivot when it lands in the monorepo, and the web components package owns
   producing it. No spike in this repo. Until then the generator reads
   `custom-elements.json` in WCA format.
5. **Fate of `@carbon/angular/legacy`: decided 2026-10-26, abandoned and
   removed.** Maintainer reasoning: migration is not trivial even with adapters,
   and adapters add a two-step migration that is not wanted. See
   [`status-and-open-questions.md`](../../packages/angular/docs/status-and-open-questions.md)
   for what was removed.
6. **Does a consumer who also loads `@carbon/web-components` need anything
   else?** The intent is that an Angular team never loads it, because
   `@carbon/angular` is a one-for-one Angular version of it with a better
   developer experience. That makes the bundled copy an implementation detail.
   Two copies on a mixed-framework page (for example an Angular micro-frontend
   in a shell built with `@carbon/web-components`) means two sets of styles and
   two registries, which should be harmless but has not been exercised. What
   "one for one" covers, and what the wrappers add today, is in
   [`developer-experience.md`](../../packages/angular/docs/developer-experience.md).
7. **v12 migration doc.** **Decided 2026-10-28:** `@carbon/angular` is not
   behind a feature flag and is new as of v12. Consumers coming from
   `carbon-components-angular` get a separate migration doc
   (`docs/guides/cca-to-angular.md`). Whether `docs/migration/v12.md` also needs
   a short entry is not decided (ADR 0015 open item 9).

## Verification before acceptance

Status at acceptance, 2026-10-27. Items 1 and 4 are done, items 2 and 3 are
partly done and carried into "Follow-ups after acceptance" below.

1. The coexistence spike in open question 1. **Done.**
2. Run the generator against the prefixed build and load the Accordion, Modal
   and `ModalFooter` in a real browser, with the Playwright checks that ADR 0015
   notes were never run. **Partly done at acceptance:** the Button Playwright
   checks pass (9 of 9, Chromium). **Done 2026-10-28:** Accordion, Modal and
   `ModalFooter` were loaded through Playwright (see Follow-up 2).
3. Confirm that the generator importing barrels registers the children of every
   composite class (about 70 to 76). The barrel change is made and Modal is
   covered by a Jest spec; the per-component check (similar to
   `registration-coverage.mjs`) across all composites is not yet written.
4. **Done for the vendored barrels.** Measure a real consumer bundle (not the
   whole-library size above) for one component. Partly done: a Button-only app
   was 240 kB when the library held only Button and 365 kB when the library also
   held the Date Picker wrappers, because the entry point registers everything
   it imports (open question 2, constraint 4). Re-measured 2026-10-27 on the
   packed `dist/` installed into an empty project and bundled with esbuild
   (`--bundle --minify`), importing the vendored barrels directly rather than
   through an Angular app: `button` 145 kB (22 kB gzip); `button` + `dropdown` +
   `modal` 934 kB (116 kB gzip); every vendored `components/*/index.js` (99
   barrels, no Date Picker) 6.99 MB (818 kB gzip). So the split into secondary
   entry points does keep a one-component app small. Not measured: a real
   Angular app through the wrappers, and tree-shaking of the primary entry.

## Follow-ups after acceptance

Not blockers for the decision. Tracked in
[`status-and-open-questions.md`](../../packages/angular/docs/status-and-open-questions.md).

1. ~~Declare `lit-html` in `build-entries`.~~ `lit-html` is now a `dependencies`
   entry in `packages/angular/package.json`, which `build-entries` copies into
   the published `package.json`. The Tearsheet files import
   `lit-html/directives/class-map.js`. Not checked under pnpm.
2. ~~Load the Accordion, Modal and `ModalFooter` in a browser with Playwright.~~
   Done 2026-10-28 (Accordion, Modal, `ModalFooter` with two and three buttons;
   27 checks, all passing). Still open: the per-component child-registration
   check across the other composites (about 70 to 76 in total; verification
   items 2 and 3).
3. Measure a real Angular app through the wrappers, for size and tree-shaking of
   the primary entry (verification item 4).
4. ~~Decide how to produce the manifest.~~ **Decided 2026-10-28:** move to CEM
   when the web components PR lands (open question 4). Pivot the generator then.
5. Rewrite `plan.md`, `milestones.md` and the other docs that describe `cds-*`
   selectors for Angular; add `docs/guides/cca-to-angular.md` with shadow DOM
   guidance (open question 7 and `migration-support.md`).
6. Decide whether `docs/migration/v12.md` needs an entry in addition to the
   separate CCA migration doc (open question 7).
