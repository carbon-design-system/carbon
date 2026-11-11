# Carbon v12 OKLCH theming: design decisions and constraints

This document records the stable decisions behind the v12 OKLCH theme generator,
why they were made, and the constraints that follow-up work must respect. It
does not cover consumer guidance (see
[`docs/migration/v12.md`](../../../docs/migration/v12.md)).

`PROVISIONAL(Qn)` tags in `specification.ts` and below mark rules that are
implemented but still await Design sign-off. Remove a tag when Design confirms
the rule.

Source of truth:
[`src/theme-generator/specification.ts`](../src/theme-generator/specification.ts).

## 1. Architecture

```text
specification.ts          numeric rules + per-token status      (the only place values are decided)
  -> generate-theme.ts      generateTheme(mode, overrides)      (rules -> OKLCH tokens, hex fallbacks)
  -> validate-theme.ts      validateTheme(theme)                (contrast, gamut, hex drift; errors block)
  -> generate-tokens.ts     generateV12Tokens()                 (DTCG token files)
  -> tasks/generate-v12-tokens.js  validates, then writes tokens/next/themes/{light,dark}/theme.tokens.json
  -> style-dictionary/sd.config.js `runV12()`  JS (js/generated/v12), SCSS (scss/generated/_v12-*.scss)
  -> tasks/builders/generate-color-fallbacks.js  `@supports not (color: oklch(0 0 0))` hex/rgba fallbacks
```

### Decisions

- **`specification.ts` is the single source of truth.** Every number that came
  from Design (surface lightness, deltas, floors, contrast targets, brand,
  hue/chroma) lives there, together with a `status` (`confirmed`,
  `experimental`, `unresolved`) and a `reason`. The generator contains
  arithmetic, not colour decisions. Why: a value changed in two places drifts,
  and reviewers can audit Design conformance by reading one file. The
  `ALLOWED_*` key sets and `validateSpecification` in `generate-theme.ts` must
  be extended whenever a field is added, so overrides cannot silently ignore a
  typo.
- **Generated token files must not be edited by hand.**
  `tokens/next/themes/*/theme.tokens.json`, `scss/generated/_v12-*.scss` and
  `js/generated/v12/*` are outputs. Change the specification, run
  `yarn generate:v12`, and commit the regenerated `tokens/next` files (they are
  tracked and published). `scss/generated` and `js/generated` are gitignored and
  rebuilt by `yarn build`. `build-pipeline-test.js` fails when the committed
  files no longer match the specification.
- **Two themes, `light` and `dark`, from the same rules.** `white` and `g10`
  correspond to `light`; `g90` and `g100` to `dark`. Runtime aliasing is the
  migration strategy, so the four v11 names are not generated. Why: Design
  defined the system as shared math with only lightness varying, not four
  hand-tuned palettes. Both modes run through the same `generateTheme` function;
  a test asserts they emit identical token sets (`design-conformance-test.ts`,
  "same generator").
- **Hidden defaults are avoided.** `text-on-color`, `border-inverse` and
  `border-interactive` are specification fields, not literals in the generator,
  so they can be reviewed and overridden.

## 2. Colour model

- **Hue and chroma are fixed; lightness is the variable.** Neutrals use
  `oklch(L 0.004 262)`. Brand is `oklch(0.5565 0.243 262)` (`#0f62fe`) in both
  themes. Why: OKLCH lightness is perceptually uniform, so a delta means the
  same visual step on every surface, which is what makes layering rules
  expressible as simple offsets.
- **Hue is normalised to `[0, 360)`** (`normalizeHue`, `color.ts`) before it is
  emitted or used in the contrast solver. DTCG consumers should not see negative
  or wrapped hues.
- **Surfaces** are `surface`, `surface-light` (+step) and `surface-dark`
  (-step). Light: `0.97` with step `0.03`. Dark: `0.20` with step `0.04`, i.e.
  base `0.16` + `0.04`. They map positionally to `layer-01/02/03`.
- **Delta tokens** (`field`, `layer-accent`, `border-subtle`,
  `skeleton-background`) are an offset from the surface they sit on. Light and
  dark use different magnitudes and signs (light darkens; dark `border-subtle`
  lightens).
- **State modifiers** (hover, selected, active) are deltas applied to the parent
  token, per parent, and clamped to `[0, 1]`: `-0.03 / -0.06 / -0.09` (light),
  `+0.04 / +0.08 / +0.12` (dark). Design supplied these deltas (v12 Explorer's
  guide); the per-parent expansion into 18 token names is an engineering choice
  that keeps v11 token names (`PROVISIONAL(Q3)`).
- **Disabled** is a modifier, not a colour: the parent colour with chroma
  `0.004` at 25% alpha, in both themes. It is emitted with an alpha, never
  relying on component-level `opacity`, so fallbacks use `rgba()`.
  `text-disabled` and `icon-disabled` are the parents `text-primary` and
  `icon-primary`; the global `state-disabled` derives from `surface`.
- **`border-interactive`**: light = brand; dark = `oklch(0.647 0.189 262)`.
  Design states dark "needs to reach accessibility", so it is validated at least
  3:1 on every surface.
- **`text-on-color`** is pure white (`#ffffff`, L=1.0) because white gives
  5.00:1 on the brand colour (`#0f62fe`) while black gives 4.20:1. Confirmed
  with Design as the initial value in both light and dark themes; validated at
  least 4.5:1 on brand.
- **Support colours** (`support-error`, `support-success`, `support-warning`,
  `support-info` and their `-inverse` pairs) are converted from canonical Carbon
  v11 palette hex anchors into OKLCH without introducing new algorithmic hue
  rules. They are defined in `specification.ts` under `support` and can be
  overridden or transitioned to formula-based generation when Design delivers
  algorithmic specifications.

### Floors instead of black

Design chose a lightness floor over letting nested dark accents and skeletons
reach pure black. `accentFloor` and `skeletonFloor` are per-mode specification
fields (`0` = disabled). When a floor binds, the token's `source` records
`{ type: 'floor', floor, delta }` so the clamp is auditable in the DTCG output.
Today only `skeletonFloor` (0.14) binds; `accentFloor` (0.08) equals the
arithmetic result and acts as a guard against deeper nesting or overrides. The
numeric values are engineering proposals; the principle is Design's decision.

## 3. Contrast algorithm

Implemented in [`contrast.ts`](../src/theme-generator/contrast.ts)
(`findLightnessForContrast`), consumed by `text-helper-*` (4.5:1) and
`border-strong-*` (3:1). `icon-helper-*` and `icon-placeholder-*` are aliases of
the helper text values. `text-placeholder-*` is solved separately, against field
backgrounds (see below).

1. **Metric: WCAG 2.x relative luminance contrast.** Chosen because it is what
   Carbon's accessibility requirements and tooling already use. APCA is not used
   as a gate.
2. **Binary search on OKLCH lightness** (40 iterations, about 1e-12 precision)
   against the surface, moving in the contrast-increasing direction, with the
   boundary (L=0 or 1) tested first. If the target is unreachable it throws with
   an actionable message instead of emitting a failing colour.
3. **Round in the contrast-increasing direction** to 4 decimal places (`ceil`
   for lighter, `floor` for darker). Why: nearest-rounding can land below the
   target; this can only increase contrast, and it gives stable, reviewable
   values in the committed token files.
4. **Hex-aware nudge.** After rounding, lightness is moved in 0.0001 steps (up
   to 200) until the 8-bit hex pair also meets the target, and the solver throws
   if it cannot. Why: browsers without OKLCH support render the hex fallback,
   and quantising to 8 bits previously dropped light `text-helper` to about
   4.49:1 and dark `border-strong-03` to 2.999:1. Consequence: hex quantisation
   now influences generated lightness (by under 0.001), which is intentional.
   Changing the rounding direction, step or cap is an algorithm change and needs
   the design-conformance and validation tests reviewed.
5. **`validateTheme`** re-checks every contrasted token in both OKLCH math and
   hex (`getHexContrastRatio`): helper text, strong border (4.5 / 3),
   `border-inverse` (at least 4.5:1), `border-interactive` (at least 3:1),
   `text-on-color` on brand (at least 4.5:1), brand fallback hex within 3/255
   per channel, and that disabled tokens carry a fractional alpha. Errors block
   `yarn generate:v12`; gamut clipping is a warning.

### Placeholder text contrast

Placeholder text renders inside fields, so aliasing it to `text-helper` (solved
against surfaces) left light placeholders at about 4.15:1 on `field-01` and
3.8:1 on `field-02`. `text-placeholder-01..03` is now ONE shared value solved by
`findLightnessForContrastAgainstAll` against `field-01`, `field-02` and
`field-03` at once, in OKLCH and in the 8-bit hex fallbacks. Hue and chroma stay
at the neutral values; fields are inputs and are never changed.

- The minimum is `PLACEHOLDER_TEXT_MIN_CONTRAST` (4.5), not part of
  `contrastTargets`. The solver uses `max(contrastTargets.helperText, 4.5)`, so
  a higher configured target raises it and a lower one cannot bypass it.
  `validateTheme` checks against the constant, recomputing the ratio for every
  placeholder x field pair from the emitted colours and hex.
- If no lightness satisfies every field, `generateTheme` throws naming each
  field with its required and best achievable ratio.
- Result: light `L=0.5046` (`#636467`), binding on `field-03` (4.52:1); dark
  `L=0.5954` (`#7d7f81`), binding on `field-02` (4.50:1).
- Context-aware decoupling (Option A) confirmed with Design: `text-helper-*` is
  solved against surface backgrounds and `text-placeholder-*` against field
  backgrounds. `border-strong-*` is still solved and validated against surfaces
  only; see "Measured contrast" below.

### Measured contrast (current output)

- Helper text and strong borders meet 4.5:1 and 3:1 on all three surfaces, in
  OKLCH and in the hex fallback.
- `border-inverse`: 12.2 to 14.6:1 (light), 13.0 to 15.4:1 (dark).
- Layer step: about 1.09:1 (light) and 1.10:1 (dark) between `surface` and
  `surface-light`, matching Design's headline ratios.
- Against **field** backgrounds: `text-placeholder` is at least 4.5:1 on every
  field (see above). `border-strong` falls below 3:1 on some fields (light: 2.3
  to 2.8:1 for the same-context field, for example 2.74:1 on `field-01` over
  `surface`; dark: 2.81:1 for `border-strong-surface-dark` on
  `field-surface-light`), and `text-helper` is 3.5 to 5.6:1 on fields. The
  generator targets surfaces only for these two, and which field pairings count
  as "relevant" for `border-strong` is a Design decision. This is the main open
  correctness item; do not claim field coverage for `border-strong` until it is
  resolved.

## 4. Known deviations from Design references

Asserted in `__tests__/theme-generator/design-conformance-test.ts`
(`knownDeviations`). The design-conformance tests compare against values
transcribed from Design (within 0.001 for fixed and delta tokens, 0.002 for
solved tokens). The deviations table pins the current output so an algorithm
change cannot move it silently; update an entry only with its reason.

| Token / context                  | Design reference                   | Generated                  | Reason and status                                                                                                                                        |
| -------------------------------- | ---------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Light `skeleton`, `surface-dark` | table `0.91`                       | `0.90`                     | The stated rule (-0.04 from `0.94`) gives `0.90`; `-0.03` would be the field delta. Rule followed (0.90 confirmed, table 0.91 was a typo). Settled (Q4). |
| Dark `skeleton`, `surface-dark`  | black                              | `0.14` (floor)             | Design chose a floor (Slack, option A). Value `0.14` is the figure in the endorsed option; arithmetic gives `0.10`. Principle settled, number proposed.  |
| Dark `accent`, `surface-dark`    | black                              | `0.08`                     | Same floor decision; equals `0.16 - 0.08`.                                                                                                               |
| Dark `icon-primary`              | `0.92` and `0.94` in one reference | `0.94`                     | Value and hex say `0.94`, matching `text-primary`. Settled.                                                                                              |
| Dark `border-strong`             | `0.50 / 0.52 / 0.483`              | `0.4987 / 0.5211 / 0.4834` | Solved to exactly 3:1 (hex-nudged); Design values are rounded. Rounding only.                                                                            |
| Dark `border-interactive` hex    | `#4589ff`                          | `#4a88ff`                  | `#4589ff` is `oklch(0.647 0.1888 260.58)`, hue 1.4 degrees from the stated 262. The OKLCH rule is followed.                                              |
| Dark `accent` hexes              | `#08090B`, `#111213`               | `#050607`, `#0c0d0f`       | The reference hexes measure L `0.1395` and `0.1815` (the skeleton values), not the stated `0.12` and `0.16`. Stated lightness followed.                  |
| Slack example hexes              | `#111214`, `#1c1e21`               | n/a                        | Measure L `0.182` and `0.234`, not the stated `0.14` and `0.20`. Treated as illustrative.                                                                |

Thirteen further cells differ from Design only in the last 8-bit hex step
(rounding in the reference); no action is needed.

## 5. Constraints for follow-up work

1. **Do not invent colours.** Anything Design has not defined (support, focus,
   link and visited colours, the `background` family, inverse polarity) stays
   out of the generator until a rule exists. "Not implemented" is not "decided".
2. **Add fields to the specification, not the generator.** Extend
   `ThemeModeSpecification` or `ThemeSpecification`, the `ALLOWED_*` sets,
   `validateSpecification` and `mergeSpecification`, and add a `tokenRules`
   entry with an honest `status`.
3. **New contextual groups** must be added to the `ContextualGroups` mapping in
   `validate-theme.ts`, which forces them into validation.
4. **New contrasted tokens need hex validation**, not only OKLCH validation.
5. **Keep the numbered names** (`layer-01`, `text-helper-01`, ...) until Design
   decides otherwise. `surface-0N` is not equivalent to v11 `layer-0N` (for
   example, v12 dark `surface-03` is darker than `surface-01`, whereas v11 g100
   `layer-03` is lighter), so aliasing by name does not prove visual
   equivalence.
6. **Components fall back silently to v11.** `$use-fallback-value` defaults to
   true, so a token missing from v12 resolves to the v11 value. Absence of a v12
   token is therefore not a failing build. `border-subtle-00` is also referenced
   by the level-1 layer set and does not exist in v12.
7. **Generated outputs, snapshots and `.npmignore`.** The public API snapshot
   lists published files. Do not add working documents or reports under
   `packages/themes/docs/` without deciding whether they should ship.
8. **Gamut.** Light `surface-light` (`oklch(1 0.004 262)`) and dark
   `border-interactive` lie slightly outside sRGB; their fallbacks are
   gamut-mapped and `validateTheme` reports them as warnings, not errors.

## 6. Where to look

| Topic                     | Location                                                                     |
| ------------------------- | ---------------------------------------------------------------------------- |
| Rules and statuses        | `src/theme-generator/specification.ts`                                       |
| Generation                | `src/theme-generator/generate-theme.ts`                                      |
| Contrast solver           | `src/theme-generator/contrast.ts`                                            |
| Validation                | `src/theme-generator/validate-theme.ts`                                      |
| DTCG emission             | `src/theme-generator/generate-tokens.ts`                                     |
| Design conformance        | `__tests__/theme-generator/design-conformance-test.ts`                       |
| Validator behaviour       | `__tests__/theme-generator/validate-theme-test.ts`                           |
| Output consistency        | `__tests__/theme-generator/build-pipeline-test.js`, `generate-theme-test.js` |
| Regeneration instructions | `tokens/README.md` ("V12 tokens")                                            |
