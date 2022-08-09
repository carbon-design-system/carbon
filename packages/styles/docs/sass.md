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

**Note: You may not need this package! If you're using `@carbon/react` you do
not need to install `@carbon/styles`. Module paths in `@carbon/styles` and
`@carbon/react` are synonymous - `@carbon/react` re-exports everything from
`@carbon/styles`. For example, `@carbon/styles/scss/components/button` is the
same as `@carbon/react/scss/components/button`.**

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
  $css--font-face: false
);
```

## Grid

| Import                                     | Filepath                  |
| :----------------------------------------- | :------------------------ |
| `@use '@carbon/styles/scss/grid';`         | `scss/grid/_index.scss`   |
| `@use '@carbon/styles/scss/grid/flexbox';` | `scss/grid/_flexbox.scss` |

### Using the grid

This package `@forward`s the styles defined in the
[`@carbon/grid`](https://github.com/carbon-design-system/carbon/tree/main/packages/grid)
package. For full documentation, visit the
[Sass Documentation](../../grid/docs/sass.md) for the package.

To use the grid via `@carbon/styles`, it must be brought in directly or the grid
specific style sheet must be imported:

```scss
// All the grid styles are included through this central entrypoint
@use '@carbon/styles';

// Alternatively, the grid styles can be brought in on their own
@use '@carbon/styles/scss/grid';
```

By default, the emitted grid will be a CSS Grid based implementation. If you
prefer to use flexbox version, you can configure the package by writing the
following:

```scss
@use '@carbon/styles' with (
  $use-flexbox-grid: true
);
```

Or you can import the flexbox grid directly:

```scss
@use '@carbon/styles/scss/grid/flexbox';
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
  @include type.type-style('productive-heading-01');
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

**Reminder: Module paths in `@carbon/styles` and `@carbon/react` are
synonymous - `@carbon/react` re-exports everything from `@carbon/styles`.**

**Files**

| Component             | Import                                                         | File                                                                                |
| :-------------------- | :------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| accordion             | `@use '@carbon/styles/scss/components/accordion';`             | [`scss/components/accordion`](../scss/components/accordion)                         |
| aspect-ratio          | `@use '@carbon/styles/scss/components/aspect-ratio';`          | [`scss/components/aspect-ratio`](../scss/components/aspect-ratio)                   |
| breadcrumb            | `@use '@carbon/styles/scss/components/breadcrumb';`            | [`scss/components/breadcrumb`](../scss/components/breadcrumb)                       |
| button                | `@use '@carbon/styles/scss/components/button';`                | [`scss/components/button`](../scss/components/button)                               |
| checkbox              | `@use '@carbon/styles/scss/components/checkbox';`              | [`scss/components/checkbox`](../scss/components/checkbox)                           |
| code-snippet          | `@use '@carbon/styles/scss/components/code-snippet';`          | [`scss/components/code-snippet`](../scss/components/code-snippet)                   |
| combo-box             | `@use '@carbon/styles/scss/components/combo-box';`             | [`scss/components/combo-box`](../scss/components/combo-box)                         |
| content-switcher      | `@use '@carbon/styles/scss/components/content-switcher';`      | [`scss/components/content-switcher`](../scss/components/content-switcher)           |
| copy-button           | `@use '@carbon/styles/scss/components/copy-button';`           | [`scss/components/copy-button`](../scss/components/copy-button)                     |
| data-table            | `@use '@carbon/styles/scss/components/data-table';`            | [`scss/components/data-table`](../scss/components/data-table)                       |
| data-table/action     | `@use '@carbon/styles/scss/components/data-table/action';`     | [`scss/components/data-table/action`](../scss/components/data-table/action)         |
| data-table/expandable | `@use '@carbon/styles/scss/components/data-table/expandable';` | [`scss/components/data-table/expandable`](../scss/components/data-table/expandable) |
| data-table/skeleton   | `@use '@carbon/styles/scss/components/data-table/skeleton';`   | [`scss/components/data-table/skeleton`](../scss/components/data-table/skeleton)     |
| data-table/sort       | `@use '@carbon/styles/scss/components/data-table/sort';`       | [`scss/components/data-table/sort`](../scss/components/data-table/sort)             |
| date-picker           | `@use '@carbon/styles/scss/components/date-picker';`           | [`scss/components/date-picker`](../scss/components/date-picker)                     |
| dropdown              | `@use '@carbon/styles/scss/components/dropdown';`              | [`scss/components/dropdown`](../scss/components/dropdown)                           |
| file-uploader         | `@use '@carbon/styles/scss/components/file-uploader';`         | [`scss/components/file-uploader`](../scss/components/file-uploader)                 |
| form                  | `@use '@carbon/styles/scss/components/form';`                  | [`scss/components/form`](../scss/components/form)                                   |
| inline-loading        | `@use '@carbon/styles/scss/components/inline-loading';`        | [`scss/components/inline-loading`](../scss/components/inline-loading)               |
| link                  | `@use '@carbon/styles/scss/components/link';`                  | [`scss/components/link`](../scss/components/link)                                   |
| list                  | `@use '@carbon/styles/scss/components/list';`                  | [`scss/components/list`](../scss/components/list)                                   |
| list-box              | `@use '@carbon/styles/scss/components/list-box';`              | [`scss/components/list-box`](../scss/components/list-box)                           |
| loading               | `@use '@carbon/styles/scss/components/loading';`               | [`scss/components/loading`](../scss/components/loading)                             |
| menu                  | `@use '@carbon/styles/scss/components/menu';`                  | [`scss/components/menu`](../scss/components/menu)                                   |
| modal                 | `@use '@carbon/styles/scss/components/modal';`                 | [`scss/components/modal`](../scss/components/modal)                                 |
| multiselect           | `@use '@carbon/styles/scss/components/multiselect';`           | [`scss/components/multiselect`](../scss/components/multiselect)                     |
| notification          | `@use '@carbon/styles/scss/components/notification';`          | [`scss/components/notification`](../scss/components/notification)                   |
| number-input          | `@use '@carbon/styles/scss/components/number-input';`          | [`scss/components/number-input`](../scss/components/number-input)                   |
| overflow-menu         | `@use '@carbon/styles/scss/components/overflow-menu';`         | [`scss/components/overflow-menu`](../scss/components/overflow-menu)                 |
| pagination            | `@use '@carbon/styles/scss/components/pagination';`            | [`scss/components/pagination`](../scss/components/pagination)                       |
| pagination-nav        | `@use '@carbon/styles/scss/components/pagination-nav';`        | [`scss/components/pagination-nav`](../scss/components/pagination-nav)               |
| popover               | `@use '@carbon/styles/scss/components/popover';`               | [`scss/components/popover`](../scss/components/popover)                             |
| progress-bar          | `@use '@carbon/styles/scss/components/progress-bar';`          | [`scss/components/progress-bar`](../scss/components/progress-bar)                   |
| progress-indicator    | `@use '@carbon/styles/scss/components/progress-indicator';`    | [`scss/components/progress-indicator`](../scss/components/progress-indicator)       |
| radio-button          | `@use '@carbon/styles/scss/components/radio-button';`          | [`scss/components/radio-button`](../scss/components/radio-button)                   |
| search                | `@use '@carbon/styles/scss/components/search';`                | [`scss/components/search`](../scss/components/search)                               |
| select                | `@use '@carbon/styles/scss/components/select';`                | [`scss/components/select`](../scss/components/select)                               |
| skeleton-styles       | `@use '@carbon/styles/scss/components/skeleton-styles';`       | [`scss/components/skeleton-styles`](../scss/components/skeleton-styles)             |
| slider                | `@use '@carbon/styles/scss/components/slider';`                | [`scss/components/slider`](../scss/components/slider)                               |
| stack                 | `@use '@carbon/styles/scss/components/stack';`                 | [`scss/components/stack`](../scss/components/stack)                                 |
| structured-list       | `@use '@carbon/styles/scss/components/structured-list';`       | [`scss/components/structured-list`](../scss/components/structured-list)             |
| tabs                  | `@use '@carbon/styles/scss/components/tabs';`                  | [`scss/components/tabs`](../scss/components/tabs)                                   |
| tag                   | `@use '@carbon/styles/scss/components/tag';`                   | [`scss/components/tag`](../scss/components/tag)                                     |
| text-area             | `@use '@carbon/styles/scss/components/text-area';`             | [`scss/components/text-area`](../scss/components/text-area)                         |
| text-input            | `@use '@carbon/styles/scss/components/text-input';`            | [`scss/components/text-input`](../scss/components/text-input)                       |
| tile                  | `@use '@carbon/styles/scss/components/tile';`                  | [`scss/components/tile`](../scss/components/tile)                                   |
| time-picker           | `@use '@carbon/styles/scss/components/time-picker';`           | [`scss/components/time-picker`](../scss/components/time-picker)                     |
| toggletip             | `@use '@carbon/styles/scss/components/toggletip';`             | [`scss/components/toggletip`](../scss/components/toggletip)                         |
| toggle                | `@use '@carbon/styles/scss/components/toggle';`                | [`scss/components/toggle`](../scss/components/toggle)                               |
| tooltip               | `@use '@carbon/styles/scss/components/tooltip';`               | [`scss/components/tooltip`](../scss/components/tooltip)                             |
| treeview              | `@use '@carbon/styles/scss/components/treeview';`              | [`scss/components/treeview`](../scss/components/treeview)                           |
| ui-shell              | `@use '@carbon/styles/scss/components/ui-shell';`              | [`scss/components/ui-shell`](../scss/components/ui-shell)                           |

**Component tokens**

In some situations, you may want to change the tokens for a specific component.
To do so you will need to configure the modules and provide the tokens you would
like to see changed.

Component tokens are available for the following components:

| Component    | Import                                                       | File                                                                            |
| :----------- | :----------------------------------------------------------- | :------------------------------------------------------------------------------ |
| button       | `@use '@carbon/styles/scss/components/button/tokens';`       | [`scss/components/button/tokens`](../scss/components/button/tokens)             |
| notification | `@use '@carbon/styles/scss/components/notification/tokens';` | [`scss/components/notification/tokens`](../scss/components/notification/tokens) |
| tag          | `@use '@carbon/styles/scss/components/tag/tokens';`          | [`scss/components/tag/tokens`](../scss/components/tag/tokens)                   |

For example, if you wanted to change the component token `button-primary` for
`button` you could do the following:

```scss
@use '@carbon/react/scss/themes';
@use '@carbon/react/scss/components/button/tokens' with (
  $button-primary: #3f51b5
);

@use '@carbon/react';
```

The same as above can also be done without using the central entrypoint, instead
bringing in only the button component styles. This applies to all the examples
here regarding component tokens:

```diff
  @use '@carbon/react/scss/themes';
  @use '@carbon/react/scss/components/button/tokens' with (
    $button-primary: #3f51b5
  );

- @use '@carbon/react';
+ @use '@carbon/react/scss/reset';
+ @use '@carbon/react/scss/components/button';
```

You can alternatively override the values for each theme:

```scss
@use '@carbon/react/scss/themes';
@use '@carbon/react/scss/components/button/tokens' with (
  $button-primary: (
    fallback: #3f51b5,
    values: (
      (theme: themes.$white, value: #3f51b5),
      (theme: themes.$g10, value: #d55bff),
      (theme: themes.$g90, value: #d0b2ff),
      (theme: themes.$g100, value: #cfd2ff),
    ),
  )
);

@use '@carbon/react/scss/reset';
@use '@carbon/react/scss/components/button';
```

If you'd like to use these component tokens in your stylesheet, you'll need to
`@use` them:

```scss
@use '@carbon/styles/scss/components/button';

.my-selector {
  background: button.$button-primary;
}
```

You can also change the component token definition for each theme for multiple
tokens at the same time via the theme mixin:

```scss
@use '@carbon/react/scss/themes';
@use '@carbon/react/scss/theme';
@use '@carbon/react/scss/components/button/tokens' as button-tokens;
@use '@carbon/themes/scss/utilities';
@use '@carbon/react';

// Set new token values. Follow this format, each theme has a specification
$button-token-overrides: (
  button-primary: (
    fallback: #3f51b5,
    values: (
      (
        theme: themes.$white,
        value: #3f51b5,
      ),
      (
        theme: themes.$g10,
        value: #3fb557,
      ),
      (
        theme: themes.$g90,
        value: #3f9ab5,
      ),
      (
        theme: themes.$g100,
        value: #ab3fb5,
      ),
    ),
  ),
);

// The new tokens must be merged into the existing tokens
$button-tokens: utilities.merge(
  button-tokens.$button-tokens,
  $button-token-overrides
);

// Add the new component tokens which will be included any time the theme mixin is called
@include theme.add-component-tokens($button-tokens);

// Ensure that the theme() mixin is called to set the new token values
// You can override the existing `.cds--{theme}` classes for each theme
:root {
  @include theme.theme();
}

.cds--g10 {
  @include theme.theme(themes.$g10);
}

.cds--g90 {
  @include theme.theme(themes.$g90);
}

.cds--g100 {
  @include theme.theme(themes.$g100);
}
```

## Utilities

**Files**

| Import                                                     | Description                                                            |
| :--------------------------------------------------------- | :--------------------------------------------------------------------- |
| `@use '@carbon/styles/scss/utilities/box-shadow';`         | Adds the Carbon defined box-shadow value                               |
| `@use '@carbon/styles/scss/utilities/button-reset';`       | Resets Button styles                                                   |
| `@use '@carbon/styles/scss/utilities/component-reset';`    | Resets default styles                                                  |
| `@use '@carbon/styles/scss/utilities/component-tokens';`   | Get tokens and inverse values for a given theme                        |
| `@use '@carbon/styles/scss/utilities/convert';`            | Converts a given px value to a rem unit                                |
| `@use '@carbon/styles/scss/utilities/custom-property';`    | Get the var() representation for a given token                         |
| `@use '@carbon/styles/scss/utilities/focus-outline';`      | Adds the Carbon defined focus styles                                   |
| `@use '@carbon/styles/scss/utilities/hide-at-breakpoint';` | Hides elements at specific breakpoints only                            |
| `@use '@carbon/styles/scss/utilities/high-contrast-mode';` | Sets Windows High Contrast Mode styles                                 |
| `@use '@carbon/styles/scss/utilities/keyframes';`          | Animations for skeleton states, showing + hiding                       |
| `@use '@carbon/styles/scss/utilities/placeholder-colors';` | Sets the Carbon defined placeholder styles                             |
| `@use '@carbon/styles/scss/utilities/rotate';`             | Adds rotational transformation                                         |
| `@use '@carbon/styles/scss/utilities/skeleton';`           | Adds Carbon defined skeleton styles                                    |
| `@use '@carbon/styles/scss/utilities/text-overflow';`      | Adds text overflow styling                                             |
| `@use '@carbon/styles/scss/utilities/text-truncate';`      | Truncates text at beginning or end of text                             |
| `@use '@carbon/styles/scss/utilities/tooltip';`            | Shared Tooltip styles                                                  |
| `@use '@carbon/styles/scss/utilities/visually-hidden';`    | Hides elements visually, but available to screen reader/assistive text |
| `@use '@carbon/styles/scss/utilities/z-index';`            | The Carbon stack hierarchy                                             |

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
  $theme: compat.$g100
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
