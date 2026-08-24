<!--
HUMAN MAINTAINERS:
This file should be as short as possible. More length = more tokens used.
-->

This is a monorepo for IBM's Carbon Design System that contains React
components, web components, Sass styles, foundational elements (colors, grid,
icons, pictograms, layout, motion, themes, type), and tooling.

# Repository Guidelines

- The correct Node version to use is present in `.nvmrc`
- Yarn workspaces manage dependencies and package relationships
- `package.json` scripts make use of Lerna for build and task sequencing

## Workflow details

- Avoid scanning the entire repo as a first step. Start from the most necessary
  surface for the task and expand or drill down only when necessary
- Follow the coding style guide, see `docs/style.md`
- Follow the developer guide, see `docs/developer-handbook.md`
- Project decisions are recorded through Architecture Decision Records (ADRs) in
  `docs/decisions/`
- For procedural instructions on various tasks for maintainers, see
  `docs/guides/`
- The approach for delivering experimental, feature-flagged, "preview" code:
  `docs/experimental-code.md`, `docs/feature-flags.md`, `docs/preview-code.md`
- Every code change that affects v12 behavior, including code exercised through
  `enable-v12-release`, an individual `enable-v12-*` flag, or a related package
  change, must meaningfully update `docs/migration/v12.md` in the same change.
  Keep it accurate for a consumer or agent migrating from v11 to v12: update an
  existing section when possible, document only consumer-visible behavior and
  migration burden, and omit internal details or maintainer notes. Do not
  duplicate flag or codemod metadata. See
  `docs/working-with-v12.md#required-v12-migration-documentation`.
- Linting, formatting, build and tests should all pass before committing
- Before opening or reviewing a pull request (PR), follow the instructions:
  `docs/guides/reviewing-pull-requests.md`
- When opening a PR, always use and fill out the pull request template:
  `.github/PULL_REQUEST_TEMPLATE.md`
- When opening an issue, always use a template: `.github/ISSUE_TEMPLATE/*.yaml`

## Package relationships

- The packages contained within this monorepo and published to NPM are
  intentionally layered on top of each other. Higher-level packages re-export or
  wrap lower-level packages.
- A directory-to-package mapping is generated from the build:
  `docs/generated/package-structure.json`
- A detailed graph of packages and their relationships is generated from the
  build: `docs/generated/package-structure-graph.json`

## Theme token lookup

- Token values and descriptions live in `packages/themes/src/dtcg/` — one JSON
  file per theme (`white.json`, `g10.json`, `g90.json`, `g100.json`). Component
  tokens are in `packages/themes/src/dtcg/components/`.
- Tokens use nested JSON keys (e.g. `layer-accent-active-03` is
  `layer.accent.active.03`), so search by key segments rather than flat token
  names.
- The DTCG files are the canonical source of truth for both `$value` and
  `$description`. The generated `packages/themes/scss/generated/_themes.scss` is
  useful for seeing all four theme values side-by-side but carries no
  descriptions and should not be edited directly.
- See `packages/themes/src/dtcg/README.md` for full details on: nested key
  structure, dual-role nodes, alpha modifier tokens, component token format, and
  how to resolve `$value` palette references.

## Package-specific details

- A dual-flagship model is followed for `@carbon/react` and
  `@carbon/web-components`. These two are intended to provide an equal
  experience for consumers choosing to build with either library. Visual and
  functional parity are paramount, though the implementations themselves are
  allowed to diverge as necessary. Opportunities to unify logic between the two
  can be considered and surfaced as an option when appropriate. Framework
  conventions should be prioritized over logic unification when beneficial to
  either/both packages in areas included, but not limited to, performance
  optimization and ease of maintenance.
- `carbon-components` is a deprecated package that re-exports `@carbon/styles`
- `carbon-components-react` is a deprecated package that re-exports
  `@carbon/react`

## End user/practitioner guidance

If the task is complicated and specialized enough to require it, there is
external documentation focused towards end users of the system (designers,
developers, product managers)

- Detailed design and usage information for the system as a whole:
  https://github.com/carbon-design-system/carbon-website/tree/main/src/pages
- Developer-focused, component-specific usage docs are surfaced through
  storybook and housed in colocated `.mdx` files.
