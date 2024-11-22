# Sass

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Overview](#overview)
- [Global flags](#global-flags)
- [Feature flags](#feature-flags)
- [Optimizing your Sass builds](#optimizing-your-sass-builds)
- [FAQ](#faq)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Overview

The `@carbon/styles` package ships all of the styles for the Carbon Design
System.

> [!IMPORTANT]  
> You probably don't need to install this package. Framework variant packages
> such as `@carbon/react` re-export all of `@carbon/styles`. For the examples
> below `@carbon/styles` paths can be switched out for `@carbon/react` without
> issue.

`@carbon/styles` uses the sass module system. We recommend taking a look through
the [announcement](https://sass-lang.com/blog/the-module-system-is-launched/)
and [documentation](https://sass-lang.com/documentation/at-rules/use/) to
familiarize yourself with this. `@use` is quite
[different than `@import`](https://sass-lang.com/documentation/at-rules/use/#differences-from-import),
particularly as it relates to the previous concept of `globals` in the v10.x
styles.

To get started, just `@use` the package.

```scss
@use '@carbon/styles';
```

This will include all the styles for the Carbon Design System, even if you're
not using all of it's components. If desired, you can
[optimize your Sass builds](#optimizing-your-sass-builds) to include only the
relevant modules you need.

If you would like to a see a full overview of the functionality we ship in Sass,
in particular our public API, you should checkout our published
[SassDoc](../../packages/styles/docs/sass.md).

## Config variables

The Carbon Design System sass setup specifies a number of config variables
(previously called "global flags") that you can configure via the `with` syntax.
For example:

```scss
@use '@carbon/styles' with (
  $font-path: '@ibm/plex'
);
```

For a full reference of config variables, see the table below.

| Global flag            | Description                                                                          | Default value |
| ---------------------- | ------------------------------------------------------------------------------------ | ------------- |
| `$css--body`           | Sets a top-level reset, type style, and color for the `<body>` tag                   | `true`        |
| `$css--font-face`      | Includes the font-face mixins for IBM Plex                                           | `true`        |
| `$css--reset`          | Includes a top-level CSS Reset                                                       | `true`        |
| `$css--default-type`   | Includes default type styles for a handful of elements (`h1`, etc)                   | `true`        |
| `$font-display`        | Specify the default value for the `font-display` property used for fonts             | `swap`        |
| `$font-path`           | Specify the base path for loading IBM Plex. When using Vite, set this to `@ibm/plex` | `~@ibm/plex`  |
| `$use-akamai-cdn`      | Specify if IBM Plex should be provided by the IBM Akamai CDN                         | `false`       |
| `$use-per-family-plex` | Use individual per-family Plex packages (recommended)                                | `false`       |
| `$prefix`              | Specify the value used to prefix all selectors and CSS Custom Properties             | `cds`         |
| `$use-flexbox-grid`    | Specify if the flexbox grid styles should be emitted                                 | `false`       |
| `$flex-grid-columns`   | Specify the total columns to be used in the flex grid                                | `16`          |

## Feature flags

The Carbon Design System takes advantage of feature flags to conditionally
enable or disable new features that are being introduced to the system. You can
enable feature flags in any of your stylesheets. Most often this is done at the
root/entrypoint stylesheet.

```scss
@use '@carbon/styles/scss/feature-flags' with (
  $feature-flags: (
    'enable-experimental-tile-contrast': true,
  )
);
@use '@carbon/styles';
```

Feature flags can also be enabled via the provided `enable()` mixin

```scss
@use '@carbon/styles/scss/feature-flags';
@use '@carbon/styles';

@include feature-flags.enable('enable-experimental-tile-contrast');
```

## Optimizing your Sass builds

If you are looking to optimize the CSS that is output by including the Carbon
Design System, you can take advantage of the fact that every module in
`@carbon/styles` package can be compiled independently. Using the sass module
system, when `@use`ing a single file, all required dependent modules will be
included as well.

To use only a specific module, include the full path.

```scss
@use '@carbon/styles/scss/<path-to-file>';
```

> [!NOTE]  
> Sass modules can only ever be configured once. Bringing in this module and
> configuring it should be one of the first things you do in your project.
>
> As such, when configuring or using multiple modules, `@use '@carbon/styles';`
> should always come last in the `@use` order.

More broadly, you can mirror the default entrypoint configuration to include
only the component styles that you need. At a high-level, this would look like:

```scss
// Use the config module to set config variables
@use '@carbon/styles/scss/config' with (
  $prefix: 'cds'
);

// Include prerequisite modules typically provided through the main entrypoint
@use '@carbon/styles/scss/reset';
@use '@carbon/styles/scss/grid';
@use '@carbon/styles/scss/layer';
@use '@carbon/styles/scss/themes';
@use '@carbon/styles/scss/theme';

// Optionally include components that you need
@use '@carbon/styles/scss/components/button';
```

In this example, because `button` relies on
[a number of additional modules](https://github.com/carbon-design-system/carbon/blob/main/packages/styles/scss/components/button/_button.scss#L8-L22),
all of these will be included in the final compiled output.

## Prefixes

Style selectors that are a part of the sass files for Carbon are built using a
global `$prefix` variable that allows us to dynamically change the prefix of
selectors that we ship. By default, `$prefix` is set to `cds`. If you look at
our source files, you'll see that we use `$prefix` in our selectors in the
following way:

```scss
// Input
.#{$prefix}--my-component {
  // ...
}

// Output
.cds--my-component {
  // ...
}
```

When writing styles that depend on, or target, selectors from Carbon it is
recommended that you use the global `$prefix` variable to prevent regressions in
the future if this value changes or if the prefix is overridden.

### Overriding `$prefix`

In order to override `$prefix` to your own custom prefix, you will need to set
`$prefix`. For example:

```scss
@use '@carbon/styles' with (
  $prefix: 'my-prefix'
);
```

In addition, if you're using any of the JavaScript packages that Carbon ships,
you'll want to update the `prefix` there as well. For instance, in
`@carbon/react` the
[ClassPrefix](https://react.carbondesignsystem.com/?path=/docs/components-classprefix--overview)
component is available for this use.

## FAQ
