# `@carbon/styles`

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Overview](#overview)
  - [Files](#files)
- [Breakpoint](#breakpoint)
- [Colors](#colors)
- [Config](#config)
- [Feature Flags](#feature-flags)
- [Grid](#grid)
  - [Using the grid](#using-the-grid)
  - [Classes provided](#classes-provided)
  - [Grid Mixins](#grid-mixins)
- [Motion](#motion)
- [Reset](#reset)
- [Spacing](#spacing)
- [Themes](#themes)
- [Theme](#theme)
- [Type](#type)
- [Components](#components)
- [Utilities](#utilities)
- [Configuration](#configuration)
  - [`sass-loader`](#sass-loader)
  - [Parcel](#parcel)
  - [Vite](#vite)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Overview

The `@carbon/styles` package provides the Sass files needed to include every
style for the Carbon Design System. It includes entrypoints for themes, tokens,
CSS helpers, components, and more.

### Files

The following is a table of all files that are available to use. While there may
be additional files that you can import from directly within the package, these
are the public entrypoints that are maintained and follow semantic versioning
between version updates.

| File                                   | Description                                                |
| :------------------------------------- | :--------------------------------------------------------- |
| [`scss/breakpoint`](#breakpoint)       | Helper functions and mixins for working with breakpoints   |
| [`scss/colors`](#colors)               | Access colors from every swatch in the IBM Design Language |
| [`scss/compat/`](#compatibility)       | Helper themes and tokens for migrating from v10 to v11     |
| [`scss/config`](#config)               | Configure various options for the package                  |
| [`scss/feature-flags`](#feature-flags) | Configure various feature flags for experiments            |
| [`scss/font-face`](#font-face)         | Configure the IBM Plex font and languages                  |
| [`scss/grid`](#grid)                   | Access and use the CSS Grid built-in to Carbon             |
| [`scss/motion`](#motion)               | Helper function, mixins, and tokens for motion             |
| [`scss/reset`](#reset)                 | A CSS Reset                                                |
| [`scss/spacing`](#spacing)             | Variables for the spacing scale                            |
| [`scss/theme`](#theme)                 | Tokens for the current theme                               |
| [`scss/themes`](#themes)               | Reference the default themes from the Carbon Design System |
| [`scss/type`](#type)                   | Type tokens and helpers                                    |
| [`scss/components/`](#components)      | A directory containing component styles                    |
| [`scss/utilities/`](#utilities)        | A directory containing common CSS utilities                |

## Breakpoint

| Import                                   | Filepath                |
| :--------------------------------------- | :---------------------- |
| `@use '@carbon/styles/scss/breakpoint';` | `scss/_breakpoint.scss` |

## Colors

The colors package will give you access to each swatch from the IBM Design
Language. You can refer to any color by its swatch and grade.

```scss
@use '@carbon/styles/scss/colors';

.my-selector {
  background-color: colors.$blue-50;
}
```

| Import                               | Filepath            |
| :----------------------------------- | :------------------ |
| `@use '@carbon/styles/scss/colors';` | `scss/_colors.scss` |

To see all the colors available to be imported, checkout our
[colors](https://github.com/carbon-design-system/carbon/tree/main/packages/colors)
docs.

## Config

| Import                               | Filepath            |
| :----------------------------------- | :------------------ |
| `@use '@carbon/styles/scss/config';` | `scss/_config.scss` |

## Feature Flags

| Import                                      | Filepath                   |
| :------------------------------------------ | :------------------------- |
| `@use '@carbon/styles/scss/feature-flags';` | `scss/_feature-flags.scss` |

## Font Face

| Import                                  | Filepath               |
| :-------------------------------------- | :--------------------- |
| `@use '@carbon/styles/scss/font-face';` | `scss/_font-face.scss` |

### Using IBM Plex

By default, IBM Plex will be emitted when importing via the `@carbon/styles`
main entrypoint or referencing the `font-face` file directly. If you do not want
the font-face declarations to be emitted, you can set the `css--font-face` token
to `false`:

```scss
@use '@carbon/styles/scss/config' with (
  $css--font-face: false,
);
```

### Emitting additional typefaces

When using the font-face declarations, only `IBM Plex Sans` and `IBM Plex Mono`
are emitted. If you would like to emit additional typefaces, like
`IBM Plex Sans Arabic`, you can set additional config tokens:

```scss
@use '@carbon/styles/scss/config' with (
  $css--plex-arabic: true,
);
```

| IBM Plex Language | Token               |
| :---------------- | :------------------ |
| Arabic            | `$css--plex-arabic` |
| TODO              | `TODO`              |

## Grid

| Import                             | Filepath          |
| :--------------------------------- | :---------------- |
| `@use '@carbon/styles/scss/grid';` | `scss/_grid.scss` |

### Using the grid

This package `@forward`s the styles defined in the
[`@carbon/grid`](https://github.com/carbon-design-system/carbon/tree/main/packages/grid)
package. The full source for Carbon grid styles can be found there alongside
more comprehensive documentation on package contents, configuration, and usage.

To use the grid via `@carbon/styles`, it must be brought in directly or the grid
specific style sheet must be imported:

```scss
/* All the grid styles are included through this central entrypoint */
@use '@carbon/styles';

/* Alternatively, the grid styles can be brought in on their own */
@use '@carbon/styles/scss/grid';
```

### Classes provided

In either case, you will then have access to the grid classes and mixins
available to build with the grid. There are two primitive class types to use in
order to structure your application. They include:

- `.#{$prefix}--css-grid` - defines the overall grid context and sets some
  useful attributes like width and margin
- `.#{$prefix}--col-span-*` - used to define individual columns

Additional class types are available for advanced usages such as subgrids,
offset, alignment utilities, and breakpoint helpers to configure the grid at
different viewport widths. For further information on these and others, see the
[`@carbon/grid`](https://github.com/carbon-design-system/carbon/tree/main/packages/grid)
package.

As an example, here's how a 4 column grid could be configured with the default
prefix:

```html
<div class="cds--css-grid">
  <div class="cds--col-span-4"></div>
  <div class="cds--col-span-4"></div>
  <div class="cds--col-span-4"></div>
  <div class="cds--col-span-4"></div>
</div>
```

### Grid Mixins

In the event that you'd like to configure your own classes for portions of the
grid, there are a few mixins that can be used.

- `css-grid()` provides the base grid definition
- `subgrid()` provides the subgrid definition
- `carbon--aspect-ratio($aspect-ratios: $carbon--aspect-ratios)` generates the
  CSS classname utilities for the aspect ratios

```scss
.custom-grid-class {
  @include css-grid();
}
```

## Motion

The motion package provides helper functions, mixins, and duration tokens to add
motion into your project.

```scss
@use '@carbon/styles/scss/motion' as *;

.my-selector {
  transition: transform $duration-fast-02 motion(standard, productive);
}
```

| Import                               | Filepath            |
| :----------------------------------- | :------------------ |
| `@use '@carbon/styles/scss/motion';` | `scss/_motion.scss` |

For more information, checkout our [motion](#todo) docs.

## Reset

| Import                              | Filepath           |
| :---------------------------------- | :----------------- |
| `@use '@carbon/styles/scss/reset';` | `scss/_reset.scss` |

## Spacing

| Import                                | Filepath             |
| :------------------------------------ | :------------------- |
| `@use '@carbon/styles/scss/spacing';` | `scss/_spacing.scss` |

## Themes

| Import                               | Filepath            |
| :----------------------------------- | :------------------ |
| `@use '@carbon/styles/scss/themes';` | `scss/_themes.scss` |

This entrypoint re-exports the `themes` entrypoint from the `@carbon/themes`. it
provides access to the theme variables built for the Carbon Design System.

These theme variables can be used in the following way:

```scss
@use '@carbon/styles/scss/themes';

// themes.$white
// themes.$g10
// themes.$g90
// themes.$g100
```

## Theme

| Import                              | Filepath           |
| :---------------------------------- | :----------------- |
| `@use '@carbon/styles/scss/theme';` | `scss/_theme.scss` |

This entrypoint re-exports the `theme` entrypoint from the `@carbon/themes`.
This entrypoint exports all of the design tokens as Sass Variables, as well as
helpers for you to interact with the theme.

To use a design token from this entrypoint, you can include the filepath and
reference it as a variable.

```scss
@use '@carbon/styles/scss/theme';

body {
  background: theme.$background;
}
```

The value of the `theme.$background` token is a CSS Custom Property. For
example, `theme.$background` would have the value `var(--cds-background)`. To
get the value of a token, you will need to use the `theme.get` function
described below.

For a full list of tokens available, check out our
[themes documentation](../../themes/docs/sass.md#tokens).

There are also some helpers that you can use from this entrypoint. These
include:

- `theme.get` to get access to the value of a token from the theme
- `theme.extend` to extend the current theme with new values

You can use these in the following way:

```scss
@use '@carbon/styles/scss/theme';

@include theme.extend(
  (
    custom-token: #000000,
  )
);

.my-selector {
  background: rgba(theme.get('custom-token'), 0.1);
}
```

**Configuration**

The `@carbon/styles/scss/theme` entrypoint can be configured with the following
options:

- `$theme` to set the current theme
- `$fallback` to set the fallback theme. This value is used to get values of
  tokens if they are not defined in the current `$theme`

## Type

The type package entrypoint allows you to specifically bring type tokens into
your project. The type package includes various type tokens and mixins.

```scss
@use '@carbon/styles/scss/type';

.my-selector {
  @include type.style(type.$productive-heading-01);
}
```

| Import                             | Filepath          |
| :--------------------------------- | :---------------- |
| `@use '@carbon/styles/scss/type';` | `scss/_type.scss` |

For more information, check out our [type](#todo) docs.

## Components

All of the styles for the components in the Carbon Design System live in the
`scss/components` directory. You can include all of the styles for a component
by including its entrypoint file. For a full list of component styles that you
can import, check out the files table below.

**Component tokens**

In some situations, you may want to change the tokens for a specific component.
To do so you will need to configure the module and provide the tokens you would
like to see changed. For example, if you wanted to change the component token
`button-separator` for `button` you would do the following:

```scss
@use '@carbon/styles/scss/components/button' with (
  $button-separator: #e4e4e4,
);
```

**Files**

| Component | Import                                             | File                                                        |
| :-------- | :------------------------------------------------- | :---------------------------------------------------------- |
| Accordion | `@use '@carbon/styles/scss/components/accordion';` | [`scss/components/accordion`](../scss/components/accordion) |

## Utilities

**Files**

| Import                                                | Description |
| :---------------------------------------------------- | :---------- |
| `@use '@carbon/styles/scss/utilities/focus-outline';` |             |

## Compatibility

| Import                                      | Filepath                   |
| :------------------------------------------ | :------------------------- |
| `@use '@carbon/styles/scss/compat/themes';` | `scss/compat/_themes.scss` |
| `@use '@carbon/styles/scss/compat/theme';`  | `scss/compat/_theme.scss`  |

The compatibility entrypoints for themes and theme provide access to the v10
tokens along with the v11 tokens. To make sure that the tokens that you're using
from v10 have the correct value in v11, you will need to include the theme that
you're using from `scss/compat/themes` and set that as your theme.

```scss
@use '@carbon/styles/scss/compat/themes' as compat;
@use '@carbon/styles/scss/compat/theme' with (
  $theme: compat.$g100,
);
```

It's important that you specify the `$fallback` theme as a value from the
`scss/themes` entrypoint. This will guarantee that all tokens that you are using
from v11 will match the theme of the tokens that you are using from v10.

You can directly reference a token from the `scss/compat/theme` entrypoint. This
entrypoint will also re-export all available v11 tokens and mixins from
`scss/theme`.

```scss
@use '@carbon/styles/scss/compat/theme';

body {
  // You can use both v10 and v11 tokens
  background: theme.$background;
  color: theme.$text-01;
}
```

_Note: all tokens from v10 are deprecated in v11. They will be removed in the
next major release of Carbon_

## Configuration

You will need to configure Sass to be able to lookup packages from your
`node_modules` folder. To do this, use the `includePaths` option and set its
value to an array of locations where Sass should look to find `node_modules`
folders.

For most teams, this configuration will look like:

```json
{
  "includePaths": ["node_modules"]
}
```

For bundler specific solutions, check out the sections below for your bundler of
choice. If you can't find what you're looking for, please make an
[issue](https://github.com/carbon-design-system/carbon/issues/new/choose) and
we'll try to get instructions for it added!

### `sass-loader`

[Link](https://www.npmjs.com/package/sass-loader)

Update your `webpack.config.js` that uses `sass-loader` with the following
options passed into `sassOptions`:

```js
{
  loader: 'sass-loader',
  options: {
    sassOptions: {
      includePaths: ['node_modules'],
    },
  },
}
```

### Parcel

[Link](https://www.npmjs.com/package/parcel)

Create a `.sassrc` file with the following configuration:

```json
{
  "includePaths": ["node_modules"]
}
```

### Vite

[Link](https://vitejs.dev/)

Create a `vite.config.js` file with the following configuration:

```js
export default {
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules'],
      },
    },
  },
};
```
