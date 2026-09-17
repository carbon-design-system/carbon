# 8. Adopt the DTCG token format across foundational packages

Date: 2026-07-30

## Status

Accepted

Implemented across four packages: `@carbon/themes` (#22326, #22870, #23217),
`@carbon/motion` (#22743), `@carbon/layout` (#23075), and `@carbon/colors`
(#23074).

## Context

Carbon's design tokens were historically defined directly in JavaScript. Each
foundational package kept its tokens as hand-authored JS exports:

- **`@carbon/colors`** — flat `export const yellow10 = '#fcf4d6'` statements
  with one named export per color stop, grouped into plain JS objects.
- **`@carbon/layout`** — `export const spacing05 = miniUnits(2)` calls where the
  resolved CSS value was computed at import time by a `miniUnits()` helper.
- **`@carbon/motion`** — `export const fast01 = '70ms'` string literals and
  easing curves as plain `cubic-bezier(…)` strings.
- **`@carbon/themes`** — one JS/TS object per theme (white, g10, g90, g100),
  each exporting every token as a named property, with four separate files that
  had to be kept in sync.

This JS-first approach worked well for JavaScript consumers, but it created
three pain points as tooling expectations evolved:

1. **No shared consumer story for non-JS targets.** Tooling outside JavaScript —
   design tools (Figma Variables, Tokens Studio), mobile code generators
   (iOS/SwiftUI, Android Compose), and documentation pipelines — could not
   consume Carbon tokens reliably. There was no documented, stable,
   format-neutral schema to target. Every consumer had to write a custom parser
   or adapter on top of the generated JS.

2. **No machine-readable type information.** Plain JS exports carry no metadata
   about what kind of value a token represents. A tool processing
   `spacing05 = '1rem'` has to guess whether it is a dimension, a color, or an
   opaque string. That guessing is fragile and blocks integrations with
   strongly-typed platforms where the type determines which field the token
   populates.

3. **Divergent per-package build conventions.** Each package resolved its tokens
   differently — `miniUnits()` in layout, raw hex strings in colors, bare
   millisecond strings in motion — with no shared rule. Adding a token required
   understanding each package's unique authoring convention and updating its
   bespoke build script separately.

The
[W3C Design Tokens Community Group (DTCG)](https://tr.designtokens.org/format/)
specification defines an open, vendor-neutral JSON format for design tokens. It
standardises the keys every token carries (`$type`, `$value`, `$description`,
`$extensions`), the reference alias syntax (`{palette.blue.60}`), and the set of
allowed primitive types (`color`, `dimension`, `duration`, `fontFamily`, etc.).
Several design tools and token pipelines have converged on this format, making
it the closest thing to an industry standard at the time of this decision.

## Decision

Adopt the DTCG format as the **canonical, human-edited token source** in the
four foundational Carbon packages that author design tokens.

- **`@carbon/themes`** — All four themes (white, g10, g90, g100) and component
  tokens consolidated into `src/dtcg/themes.json` and
  `src/dtcg/components/*.json`. Each token carries `$type: "color"`,
  `$description`, and per-theme values stored under a
  `$extensions["carbon.themes"]` key so all four themes live in one file instead
  of four.
- **`@carbon/colors`** — The full color palette moved to `src/dtcg/colors.json`
  with `$type: "color"` on every entry. This file becomes the palette alias
  target for all token references in `themes.json`.
- **`@carbon/layout`** — All spacing, fluid-spacing, container, icon-size,
  border-radius, layout-scale, and size tokens moved to `src/dtcg/layout.json`
  with `$type: "dimension"` on every token. A `carbon.layout.converter`
  extension declares how raw numeric values (`miniUnits` grid steps or pixel
  values) are resolved to `rem` strings by Style Dictionary.
- **`@carbon/motion`** — Duration and easing tokens moved to
  `src/dtcg/motion.json` and `src/dtcg/surfaces.json` with `$type: "duration"`
  and `$type: "cubicBezier"` respectively.

In all four packages the DTCG JSON files are the only hand-edited source of
truth. The existing build pipeline in each package was updated to use
[Style Dictionary v5](https://styledictionary.com/) as the transform and output
layer, replacing the previous bespoke Node scripts. Style Dictionary reads the
DTCG files, applies Carbon-specific transforms (e.g. `carbon/alpha-modifier`,
`carbon.layout.miniUnits`), and emits the same Sass variables, Sass maps, and
JavaScript/TypeScript modules that consumers already depend on. The public API
surface of each package is unchanged.

DTCG JSON Schema validation was added to each package's test suite so that any
token that does not conform to the spec causes a CI failure before it reaches
consumers.

## Consequences

Adopting DTCG as the source format has the following effects.

**Easier to do:**

- **Design-tool synchronisation.** Figma Variables, Tokens Studio, and other
  tools that consume DTCG JSON can ingest Carbon tokens directly without a
  custom adapter. `$type` ensures values land in the correct variable type
  (color vs. number vs. string).
- **Cross-platform code generation.** Mobile platforms (iOS/SwiftUI, Android
  Compose) and other targets can use a standard DTCG pipeline to generate
  platform-native token files from the same source Carbon uses.
- **Consistent authoring across packages.** Contributors follow the same
  conventions regardless of which package they are editing: `$type`, `$value`,
  `$description`, `$extensions`. Onboarding friction is reduced.
- **Token explorer and documentation.** The shared schema makes it
  straightforward to generate token explorer UIs, searchable tables, and diff
  views from the JSON without parsing package-specific formats.
- **Spec validation in CI.** Schema validation runs automatically, catching
  structural mistakes (wrong type, missing description, invalid reference
  syntax) before they reach consumers.

**More difficult or requiring care:**

- **Nested-key authoring.** DTCG represents token names through JSON object
  nesting rather than flat hyphenated keys. A token named `border-subtle-02` is
  authored as `border → subtle → 02`. Contributors must learn to navigate nested
  JSON rather than flat lists. The per-package READMEs document this convention
  explicitly.
- **Carbon-specific extensions.** The DTCG spec does not natively express
  per-theme color values (one token, four theme values) or grid-step-based
  dimension authoring. These are expressed as `$extensions["carbon.themes"]` and
  `$extensions["carbon.layout"]` respectively. Any tool that reads the JSON must
  understand these extensions or treat extension data as opaque. The extensions
  are documented in the package READMEs and are stable.
- **Build dependency on Style Dictionary v5.** All four packages now depend on
  SD v5. Upstream breaking changes or bugs in SD affect token generation across
  the entire foundational layer. The SD version is pinned and upgrade testing is
  required before bumping.
- **Dual-format transition period.** During migration, some consumers may depend
  on the old generated output filenames or Sass map variable names. Because the
  generated API surface was kept identical, no breaking changes were introduced,
  but care is required when renaming generated files in the future.
