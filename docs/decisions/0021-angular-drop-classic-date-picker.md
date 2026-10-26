# 21. Do not wrap the classic or fluid Date Picker in `@carbon/angular`

Date: 2026-10

## Status

Accepted, for now. Revisit if consumers ask for the fluid variant, or once the
web components decouple the Preview Fluid Date Picker from the classic one.

- DRI: Angular package maintainer
- Decided by: Angular package maintainer, 2026-10-26

## Context

`@carbon/web-components` ships two generations of Date Picker:

- **Classic**, under `date-picker/` and `fluid-date-picker/`. It is built on
  flatpickr (4.6.13) and loads it from a `node_modules` folder inside `es/`.
- **Preview**, under `date-picker/next/`. It is built on the Temporal API and a
  state machine in `@carbon/utilities`, and has no flatpickr dependency.

[`plan.md`](../../packages/angular/docs/plan.md) section 8 already says the
Angular wrapper targets the Preview Date Picker. The wrapper generator does not
act on that: it emits a wrapper for every `cds-` tag in the manifest, so
`@carbon/angular` currently generates both generations.

The packaging spike for [ADR 0020](0020-angular-wholesale-cds-ng-prefix.md)
found what that costs. Following the import graph of the built `es/` barrels:

| Barrel                            | Files reached | Reaches flatpickr |
| --------------------------------- | ------------- | ----------------- |
| `date-picker/next/index.js`       | 20            | No                |
| `date-picker/index.js`            | 37            | Yes               |
| `fluid-date-picker/index.js`      | 42            | Yes               |
| `fluid-date-picker/next/index.js` | 46            | Yes               |

`fluid-date-picker/next/index.js` imports `../index` to re-register the classic
items, and `PreviewFluidDatePicker` extends the classic `CDSFluidDatePicker`.
The only classic file the Preview Date Picker reaches is `date-picker/defs.js`,
which holds shared constants.

`carbon-components-angular` 5.72.3 has one date picker selector,
`cds-date-picker, ibm-date-picker`, and no fluid date picker. Nothing in a
migration from it needs the fluid variant.

## Decision

`@carbon/angular` does not wrap the classic Date Picker or any Fluid Date
Picker. For now the Date Picker in `@carbon/angular` is the Preview Date Picker
only.

Not wrapped:

| Web component tag                | Generated wrapper         |
| -------------------------------- | ------------------------- |
| `cds-date-picker`                | `DatePicker`              |
| `cds-date-picker-input`          | `DatePickerInput`         |
| `cds-fluid-date-picker`          | `FluidDatePicker`         |
| `cds-fluid-date-picker-input`    | `FluidDatePickerInput`    |
| `cds-fluid-date-picker-skeleton` | `FluidDatePickerSkeleton` |
| `cds-preview-fluid-date-picker`  | `PreviewFluidDatePicker`  |

The sixth row is a consequence, not a separate choice. The Preview Fluid Date
Picker is built on the classic fluid class, so wrapping it brings flatpickr back
in. It is excluded until the web components stop depending on the classic code.

Still wrapped: `cds-preview-date-picker`, `cds-preview-date-picker-input` and
`cds-preview-date-picker-calendar`. The manifest does not list the Preview input
skeleton (`cds-preview-date-picker-input-skeleton`), although the barrel
registers it, so it has no wrapper today.

The other fluid components (`fluid-combo-box`, `fluid-dropdown`, `fluid-form`,
`fluid-multi-select`, `fluid-number-input`, `fluid-password-input`,
`fluid-search`, `fluid-select`, `fluid-text-input`, `fluid-textarea`,
`fluid-time-picker`) do not reach flatpickr and are not affected.

## Consequences

Positive:

- Flatpickr does not ship in `@carbon/angular`, which removes 9 JavaScript files
  (about 90 KB; 18 files with types and maps) from the vendored copy in ADR 0020
  and one packaging constraint (keeping `vendor/node_modules`).
- Six fewer generated wrappers to maintain, test and document, and none that
  expose a Flatpickr-shaped API. `plan.md` already drops `[flatpickr]`,
  `[plugins]` and `(calendarChange)`.
- The wrapper surface matches what `plan.md` already described.

Negative or risky:

- **No fluid date picker for Angular consumers.** Consumers who want one have no
  Carbon option in `@carbon/angular` until the web components change. They have
  the same gap in `carbon-components-angular`, so this is not a regression.
- **The Preview Date Picker is a different API from the CCA one**, not a rename:
  string values instead of `Date`, no flatpickr options. Migrating a CCA
  `cds-date-picker` is a template change by hand, which `plan.md` section 8
  already assumes. It is not a mechanical codemod.
- **The Preview Date Picker is a preview.** It lives in `next/` and its tag is
  `cds-preview-date-picker`. If its API changes before it is promoted, the
  Angular wrapper changes with it.
- **The generator must exclude the six tags explicitly.** It currently wraps
  every `cds-` tag, so without a skip list the wrappers come back on the next
  regeneration.
- **Vendoring must not copy flatpickr by accident.** If the vendoring step
  copies all of `es/`, flatpickr is present but unused. It is only an unused
  file, not a bug, but it should be left out.

Not decided here:

- Whether to file an issue against `@carbon/web-components` to decouple the
  Preview Fluid Date Picker from the classic fluid class. That change belongs to
  the web components, not this package.
- Whether to add the classic pickers later behind a secondary entry point, for
  consumers who need flatpickr behavior. Not needed for the CCA migration.

## Verification needed

1. Add the skip list to
   [`tasks/generate-wrappers/index.js`](../../packages/angular/tasks/generate-wrappers/index.js),
   regenerate, and confirm 6 wrappers are removed from the 279.
2. Confirm that `child-registration.spec.ts` still passes, since it asserts
   every wrapper imports an existing barrel.
3. Confirm the Preview Date Picker wrapper imports `date-picker/next/index.js`
   and renders without any classic file other than `date-picker/defs.js`.
4. Re-measure the Button-only bundle and the vendored tarball from the packaging
   spike without flatpickr.
