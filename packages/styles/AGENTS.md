# `packages/styles`

This package houses a hierarchy of Sass files that have a main entrypoint of
`packages/styles/index.scss`. It `@use`'s, `@forward`'s, `@include`'s and
re-exports style modules/files built in all the elements packages to provide
consumers a single entrypoint for all areas of the design system: colors, grid,
icons, pictograms, layout, motion, themes, type. In addition it houses primary
styles that are used with component implementations in `packages/react`,
`packages/web-components`. It makes use of the Sass module system to ensure
styles are only included once and not duplicated.

## Guidelines

- Use current Sass authoring practices such as `@use`
- Stylelint must pass, config in `config/stylelint-config-carbon`
- Testing files: `__tests__/`, though most all tests are housed upstream in the
  elements packages
