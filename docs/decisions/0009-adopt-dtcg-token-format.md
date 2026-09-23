# 9. Adopt the DTCG token format across foundational packages

Date: 2026-07-30

## Status

Accepted. Migration complete for `@carbon/themes`, `@carbon/colors`,
`@carbon/motion`, and `@carbon/layout` (v11 tokens). v10 tokens are out of scope
and will not be migrated. v12 migration work is ongoing.

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
several problems as tooling expectations evolved:

- **Poor machine-readability for emerging AI/agent tooling**: JS-defined tokens
  are not structured for reliable parsing by MCP servers or other agent-based
  consumers, which need a predictable, tool-agnostic data format rather than
  executable code.
- **Limited tool interoperability**: any non-JS tool (such as design-token
  processors, design tools like Figma, documentation pipelines, or custom
  external integrations) needed bespoke adapters or was forced to
  execute/interpret JS to consume Carbon tokens. There was no machine-readable
  type information or format-neutral schema.
- **Divergent per-package build conventions**: each package resolved its tokens
  differently — `miniUnits()` in layout, raw hex strings in colors, bare
  millisecond strings in motion — with no shared rule. Adding a token required
  understanding each package's unique authoring convention and updating its
  bespoke build script separately.

The
[W3C Design Tokens Community Group (DTCG)](https://tr.designtokens.org/format/)
specification defines an open, vendor-neutral JSON format for design tokens. It
standardises the keys a token may carry (`$type`, `$value`, `$description`,
`$extensions`), the reference alias syntax (`{palette.blue.60}`), and the set of
allowed primitive types (`color`, `dimension`, `duration`, `fontFamily`, etc.).
Several design tools and token pipelines have converged on this format, making
it the closest thing to an industry standard at the time of this decision.

## Decision

Migrate all v11 tokens across four Carbon packages — `@carbon/themes`,
`@carbon/colors`, `@carbon/motion`, and `@carbon/layout` — from JS-based
definitions to the DTCG token format.

Scope boundaries:

- **v11**: fully migrated (all four packages above).
- **v10**: explicitly not considered for migration.
- **v12**: migration continues as an ongoing effort beyond this ADR's scope.

Under this migration, DTCG JSON files are the only hand-edited source of truth:

- **`@carbon/themes`** — All four themes (white, g10, g90, g100) and component
  tokens consolidated into `themes.json` and component token files under
  `packages/themes/src/dtcg/components/`. Each token carries `$type: "color"`,
  `$description`, and per-theme values stored under a
  `$extensions["carbon.themes"]` key so all four themes live in one file instead
  of four.
- **`@carbon/colors`** — The full color palette moved to `colors.json` with
  `$type: "color"` on every entry. This file becomes the palette alias target
  for all token references in `themes.json`.
- **`@carbon/layout`** — All spacing, fluid-spacing, container, icon-size,
  border-radius, layout-scale, and size tokens moved to `layout.json` with
  `$type: "dimension"` on every token. A `carbon.layout.converter` extension
  declares how raw numeric values (`miniUnits` grid steps or pixel values) are
  resolved to `rem` strings by Style Dictionary.
- **`@carbon/motion`** — Duration (`$type: "duration"`) and easing
  (`$type: "cubicBezier"`) primitive tokens moved to `motion.json`. Composite
  surface recipes (`$type: "transition"`) that reference those primitives live
  in `surfaces.json`.

`$extensions` carries auxiliary data that may be needed to calculate the actual
value. See individual package READMEs for the full `$extensions` usage
convention and examples.

The existing build pipeline in each package was updated to use
[Style Dictionary v5](https://styledictionary.com/) as the transform and output
layer, replacing the previous bespoke Node scripts. Style Dictionary reads the
DTCG files, applies Carbon-specific transforms (e.g. `carbon/alpha-modifier`,
`carbon.layout.miniUnits`), and emits the same Sass variables, Sass maps, and
JavaScript/TypeScript modules that consumers already depend on. This migration
is fully backward-compatible: it is an internal authoring and build architecture
change with zero breaking changes, and the public API surface of each package is
unchanged.

Consistency within the unified `themes.json` is enforced via a Jest validation
test (`dtcg-cross-theme-parity-test.js`), which asserts token naming, `$type`,
`$description`, and per-theme value coverage within that single file. DTCG JSON
Schema validation was added to `@carbon/themes` and `@carbon/motion` so that any
token that does not conform to the spec causes a CI failure before it reaches
consumers.

## Consequences

Adopting DTCG as the source format has the following effects.

**Easier:**

- **Zero backward-compatibility impact for end users** — Because generated
  outputs (Sass maps/variables, JS/TS exports, CSS variables) remain bit-for-bit
  identical, downstream consumers experience no breaking changes or migration
  burden.
- **AI/agent tooling readiness** — structured DTCG JSON is directly parseable by
  MCP and other agent-based consumers, without needing to execute or interpret
  JS.
- **Multi-tool support** — tokens are no longer locked to JS-only consumption;
  other tools (e.g., Style Dictionary as a CI conformance checker) can read the
  same source of truth.
- **Figma sync** — becomes newly feasible as a future capability, though it was
  not a driver of this migration and hasn't been adopted yet.
- **Cross-theme consistency checking** — automatable now that naming, `$type`,
  and `$description` follow a standard schema, rather than being implicit in JS
  structure (enforced via `dtcg-cross-theme-parity-test.js`).
- **Consistent authoring across packages** — Contributors follow the same
  conventions regardless of which package they are editing: `$type`, `$value`,
  `$description`, `$extensions`. Onboarding friction is reduced.
- **Token explorer and documentation** — The shared schema makes it
  straightforward to generate token explorer UIs, searchable tables, and diff
  views from the JSON without parsing package-specific formats.
- **Spec validation in CI** — Schema validation runs automatically, catching
  structural mistakes (wrong type, missing description, invalid reference
  syntax) before they reach consumers.

**More difficult / carried-over debt to be aware of:**

- **v10 tokens remain on the old JS-based format indefinitely**, so tooling that
  needs to support both v10 and v11 must handle two token formats side by side.
- **Nested-key authoring** — DTCG represents token names through JSON object
  nesting rather than flat hyphenated keys. A token named `border-subtle-02` is
  authored as `border → subtle → 02`. Contributors must learn to navigate nested
  JSON rather than flat lists. The per-package READMEs document this convention
  explicitly.
- **Carbon-specific extensions** — The DTCG spec does not natively express
  per-theme color values (one token, four theme values) or grid-step-based
  dimension authoring. These are expressed as `$extensions["carbon.themes"]` and
  `$extensions["carbon.layout"]` respectively. Any tool that reads the JSON must
  understand these extensions or treat extension data as opaque. The extensions
  are documented in the package READMEs and are stable.
- **Build dependency on Style Dictionary v5** — All four packages now depend on
  SD v5. Upstream breaking changes or bugs in SD affect token generation across
  the entire foundational layer. The SD version is pinned and upgrade testing is
  required before bumping.
