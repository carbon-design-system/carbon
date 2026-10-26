# Spike: can CCA and `@carbon/angular` coexist in one app?

**Status:** Run for the Modal (experiments A, B, B2, B3, C) and then for the
Dropdown (DD-A, DD-B, DD-C, below). Results are in
[ADR 0020](../../../../docs/decisions/0020-angular-wholesale-cds-ng-prefix.md)
open question 1. B3 (the real-tag folder barrel) was added during the run and is
not in the table below. D (the unmodified two-copies case) was not run. In C no
`cds-ng-modal` was rendered beside the CCA modal; DD-C later did render the
`cds-ng-*` dropdown and modal beside the CCA ones. The brief is kept so the
spike can be repeated for another component (a CCA form control with validation
would be the next sample). Scratch app and scripts: gitignored `temp/spike/`.
**Decides:** whether
[ADR 0020](../../../../docs/decisions/0020-angular-wholesale-cds-ng-prefix.md)
(wholesale `cds-ng-*` prefix) is worth accepting. It is open question 1 in that
ADR and in [`status-and-open-questions.md`](../status-and-open-questions.md).
**Size:** a day or less, if the scratch app builds first time.

## The question

`carbon-components-angular` (CCA) and `@carbon/angular` both use `cds-*` element
names. If a migrating app imports both, does registering the real `cds-*` custom
elements break the CCA components that are still in the app?

## Why we think it might

This is a hypothesis built from reading source. Nothing here has been run.

- CCA's Modal is an Angular component with selector `"cds-modal, ibm-modal"`
  (`temp/carbon-components-angular/src/modal/modal.component.ts`). Its template
  renders `<cds-overlay>` and CCA's own markup. It is **not** a registered
  custom element, so in CCA `<cds-modal>` is an ordinary unknown element that
  Angular matches by selector.
- `@carbon/angular` (as built today) calls
  `customElements.define('cds-modal', …)` when its wrapper is imported.
- The browser then upgrades every existing `<cds-modal>` in the document and
  constructs the Lit class for every `<cds-modal>` created afterwards, including
  the ones Angular creates for CCA's component host. That would attach a shadow
  root and render the web component's template over CCA's markup.
- CCA's templates also use `<cds-modal-header>` and `<cds-modal-footer>`, which
  are also web component tags (see the CCA story sample in the same file).

If this is right, `cds-*` is unsafe for incremental migration and the prefix is
justified. If CCA elements keep working, the main argument for ADR 0020 is much
weaker, and its remaining benefits (codemod idempotence, no global tag
registration) need to be weighed on their own.

## Setup

Use the gitignored `temp/` directory at the repo root for the scratch work so
nothing needs cleaning up.

1. **Build the web components** if `packages/web-components/es/` is missing:
   `yarn workspace @carbon/web-components build`.
2. **Make a prefixed copy** of the build:
   ```sh
   cd packages/web-components
   node bin/create-prefixed-build.js --prefix cds-ng --out ../../temp/spike/cds-ng-wc
   ```
   Earlier runs rewrote 1060 files with no `cds-<name>` left in the JavaScript.
3. **Create a scratch Angular app** in `temp/spike/app` (Angular 19 matches the
   toolchain the package is built with; CCA's peer range covers 14 to 21).
4. **Install CCA** from npm. The latest published version at the time of writing
   was 5.72.3 with a `@carbon/styles ^1.54.0` peer. Install a matching
   `@carbon/styles` 1.x for the CCA side.
5. Add the generated `@carbon/angular` Modal wrapper. Either use the built
   package from `packages/angular/dist`, or import
   `packages/angular/src/generated/Modal/Modal.component.ts` directly. Run
   `yarn workspace @carbon/angular generate:wrappers` first if `src/generated/`
   is missing.

## Experiments

Run each one in a fresh page load and record the observations below.

| #    | Setup                                                                                                                                                                                                                                  | Purpose                                                                       |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| A    | CCA `Modal` only, open and close it.                                                                                                                                                                                                   | Baseline. Confirm CCA works in the scratch app.                               |
| B    | CCA `Modal` **and** the generated `@carbon/angular` `Modal` (real `cds-modal` tag) both imported and both rendered.                                                                                                                    | The hypothesis.                                                               |
| B2   | Same as B, but render the CCA modal **before** importing the `@carbon/angular` wrapper (lazy-load it on a button click).                                                                                                               | Distinguishes "upgrade of existing elements" from "construction of new ones". |
| C    | CCA `Modal` and a hand-written `cds-ng-modal` wrapper over the prefixed build. The wrapper is `@Component({ selector: 'cds-ng-modal', template: '<ng-content />' })` and imports `…/cds-ng-wc/components/modal/index.js` (the barrel). | The proposed design.                                                          |
| D    | Optional. B plus a separately loaded, unmodified `@carbon/web-components` Modal.                                                                                                                                                       | ADR 0015's two-copies case. Skip if short on time.                            |
| DD-A | CCA `Dropdown` only: open it and pick an item. Added after the Modal run.                                                                                                                                                              | Baseline for the second sample.                                               |
| DD-B | DD-A plus the real-tag Dropdown folder barrel (`…/components/dropdown/index.js`).                                                                                                                                                      | Whether the break is Modal-specific.                                          |
| DD-C | DD-A plus the prefixed Dropdown and Modal barrels, with `cds-ng-dropdown` and `cds-ng-modal` rendered on the same page.                                                                                                                | The proposed design with both libraries rendered together.                    |

For the `@carbon/angular` side in B and B2, importing only the generated
`ModalComponent` is exactly what a consumer does today. Note, but do not fix,
what is and isn't registered: this is also the child-registration bug in ADR
0020 finding 2.

## What to record

For each experiment:

- `customElements.get('cds-modal')` and `customElements.get('cds-ng-modal')`:
  defined or not, and by which class.
- For the CCA modal's host element: does it have a `shadowRoot`? Is
  `el instanceof customElements.get('cds-modal')` true?
- Does the CCA modal render the way it does in A (visually and in the DOM)?
- Does open, close, focus trap and the overlay click still work?
- Console errors and warnings, verbatim.
- Screenshots for A, B and C.

Also record, as plain facts:

- Which Angular, CCA, `@carbon/styles` and web components versions were used.
- Whether the build needed any change to get C to compile (this feeds ADR 0020
  open question 2 on whether `ng-packagr` copes with a vendored JavaScript
  directory). A scratch app built with the Angular CLI does not answer that
  question for a library build, so say which one you used.

## How to read the result

| Outcome                            | Meaning                                                                                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B breaks the CCA modal, C does not | Hypothesis confirmed. ADR 0020 is justified on coexistence grounds.                                                                                                       |
| B and C both work                  | `cds-*` coexists, at least for the Modal. The main argument weakens. Try one more component with a different shape (CCA `Dropdown`, or a form control) before concluding. |
| B breaks, C also breaks            | Something else is wrong. Look at global CSS (`@carbon/styles` 1.x versus the web components) before drawing conclusions about the prefix.                                 |
| B2 works but B breaks              | Only a load-order issue. Document it; it changes the advice, not the architecture.                                                                                        |

One component is a weak sample. A positive result on the Modal alone would not
have shown coexistence in general. The actual result was negative for both the
Modal and the Dropdown (see ADR 0020), which is stronger than one sample but is
still two components.

DD-B shows a different failure from the Modal. The host is not blank: the Lit
dropdown renders over CCA's markup, CCA's list box is hidden (0 by 0 pixels) and
no items are selectable. Record "painted" and "usable" separately.

## What to hand back

1. The observations above, as a short table in
   [ADR 0020](../../../../docs/decisions/0020-angular-wholesale-cds-ng-prefix.md)
   under open question 1.
2. Update open question 1 in
   [`status-and-open-questions.md`](../status-and-open-questions.md).
3. If C needed any packaging workaround, add it to ADR 0020 open question 2.
4. Do not commit the scratch app. Keep the exact commands used.

## Not in scope

- Fixing the generator's barrel problem. It is tracked separately.
- Any `@carbon/styles` 1.x versus 2.x conflict beyond noting visible styling
  differences (ADR 0020 open question 3).
- Measuring bundle size.
