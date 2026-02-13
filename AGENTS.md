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
- Linting, formatting, build and tests should all pass before committing
- Before opening or reviewing a pull request (PR), follow the instructions:
  `docs/guides/reviewing-pull-requests.md`

## Package relationships

- The packages contained within this monorepo and published to NPM are
  intentionally layered on top of each other. Higher-level packages re-export or
  wrap lower-level packages.
- A directory-to-package mapping is generated from the build:
  `docs/generated/package-structure.json`
- A detailed graph of packages and their relationships is generated from the
  build: `docs/generated/package-structure-graph.json`

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
