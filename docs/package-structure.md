# Package structure

The packages contained within this monorepo and published to NPM are
intentionally layered on top of each other. Higher-level packages re-export or
wrap lower-level packages. This sometimes paints a confusing picture of what
packages exist, which to use, and what others' purpose is relative to the ones
currently in use.

## Layer 0: Elements

These packages have minimal or zero dependency on the rest of the design system.
They use the IBM Design Language as foundational guidance and a single source of
truth.

- `packages/colors` -> `@carbon/colors`
- `packages/grid` -> `@carbon/grid`
- `packages/icons` -> `@carbon/icons`
- `packages/pictograms` -> `@carbon/pictograms`
- `packages/layout` -> `@carbon/layout`
- `packages/motion` -> `@carbon/motion`
- `packages/themes` -> `@carbon/themes`
- `packages/type` -> `@carbon/type`

This may not be an exhaustive/current list.

## Layer 1: Primitives

These packages import and use the elements packages to provide low level
building blocks, helpers, and tooling.

- `packages/styles` -> `@carbon/styles`
- `packages/icons-react` -> `@carbon/icons-react`
- `packages/icons-vue` -> `@carbon/icons-vue`
- `packages/pictograms-react` -> `@carbon/pictograms-react`
- `packages/upgrade` -> `@carbon/upgrade`
- `packages/utilities` -> `@carbon/utilities`
- `packages/utilities-react` -> `@carbon/utilities-react`

This may not be an exhaustive/current list.

## Layer 2: Components

These are the canonical design system component implementations that incorporate
packages in the lower layers. In some cases, lower layer packages are exposed
directly through these, removing the need for consumers to install the lower
level packages. One example is how `@carbon/react` makes available
`@carbon/styles` and `@carbon/icons-react` assets.

- `packages/react` -> `@carbon/react`
- `packages/web-components` -> `@carbon/web-comonents`

This may not be an exhaustive/current list.
