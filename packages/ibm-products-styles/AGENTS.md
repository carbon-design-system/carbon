# `packages/ibm-products-styles`

This package houses a hierarchy of Sass files that have a main entrypoint of
`packages/ibm-products-styles/src/index.scss`. It `@use`'s, `@forward`'s,
`@include`'s and re-exports style modules/files to provide consumers a single
entrypoint for all areas of the design system. In addition it houses primary
styles that are used with component implementations in `packages/ibm-products`,
`packages/ibm-products-web-components`. It makes use of the Sass module system
to ensure styles are only included once and not duplicated.

## Guidelines

- Use current Sass authoring practices such as `@use`
- Stylelint must pass, config in `config/stylelint-config-carbon`
- Testing files: `__tests__/`, though most all tests are housed upstream in the
  elements packages
