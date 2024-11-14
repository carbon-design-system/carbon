# IBM Plex

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Overview](#overview)
  - [Plex packages](#plex-packages)
    - [Per-family packages](#per-family-packages)
    - [`@ibm/plex`](#ibmplex)
  - [`@font-face`](#font-face)
- [Including in your product](#including-in-your-product)
  - [`@carbon/type`](#carbontype)
  - [unpkg](#unpkg)
  - [Loading Configuration](#loading-configuration)
    - [Configuration Priority](#configuration-priority)
    - [Using `$font-path`](#using-font-path)
  - [Migration Guide](#migration-guide)
    - [Migrating from Akamai CDN to per-family packages](#migrating-from-akamai-cdn-to-per-family-packages)
  - [Future Changes](#future-changes)
  - [Self-hosted, CDN](#self-hosted-cdn)
    - [Self-hosted](#self-hosted)
    - [CDN](#cdn)
- [FAQ](#faq)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Overview

The Carbon Design System uses [IBM Plex](https://www.ibm.com/plex) as its
typeface. For teams using Carbon, there are several options to include IBM Plex
in your project:

1. `@ibm/plex` (this is the default)
2. Per-family packages `@ibm/plex-sans`, `@ibm/plex-mono`, etc. (recommended for
   new projects)
3. Akamai CDN
4. Self-hosted fonts

### Plex packages

IBM Plex is distributed through packages on NPM:

- Individual per-family packages (e.g., `@ibm/plex-sans`, `@ibm/plex-mono`) The
  source for these packages is available on
  [GitHub](https://github.com/ibm/plex#readme).
- [`@ibm/plex`](https://www.npmjs.com/package/@ibm/plex): The legacy package
  containing all fonts. This package is no longer updated and uses an outdated
  version of plex.

#### Per-family packages

The per-family packages, introduced in 2024, separate IBM Plex assets out into
individual packages for each family. This provides greater flexibility for
projects to only include the fonts they need and/or to include more beyond the
provided defaults. It also avoids issues with package manager configurations
requiring dependencies to be included in committed files (e.g. yarn's
[offline mirror](https://yarnpkg.com/features/caching#offline-mirror)).

Per-family packages include:

- @ibm/plex-math
- @ibm/plex-mono
- @ibm/plex-sans-arabic
- @ibm/plex-sans-condensed
- @ibm/plex-sans-devanagari
- @ibm/plex-sans-hebrew
- @ibm/plex-sans-jp
- @ibm/plex-sans-kr
- @ibm/plex-sans-tc
- @ibm/plex-sans-thai-looped
- @ibm/plex-sans-thai
- @ibm/plex-sans-variable
- @ibm/plex-sans
- @ibm/plex-serif

For backwards-compatibility, the default configuration in Carbon continues to
use the legacy `@ibm/plex` package. This package is no longer updated and we
encourage projects to use the per-family packages instead.

To enable per-family loading, set the sass config variable in your Sass
configuration. For example with `@carbon/react`:

```scss
@use '@carbon/react' with (
  $use-per-family-plex: true
);
```

The assets follow a similar structure as defined below for `@ibm/plex` with only
a slight variation to the pathing. They also no longer include legacy filetypes
that are no longer needed.

#### `@ibm/plex`

This package ships all of the available fonts, and includes files that offer the
complete typeface in one file. It also ships fonts split up into a variety of
Unicode ranges to offer better performance (this is only available for a handful
of fonts).

For example, if your team wants to serve a `woff2` file for IBM Plex Sans, they
could locate this file using this path (relative to the package);

```
<path-to-node-modules>/@ibm/plex/IBM-Plex-Sans/fonts/complete/woff2/IBMPlexSans-Regular.woff2
```

In general, the path to specific file format will follow this template:

```
@ibm/plex/<font-family-name>/fonts/<output>/<format>/<font-family-name>-<font-weight>-<?font-style>-<?font-split>.<format>
```

The following are the options for each of these sub-paths:

- `<font-family-name>`
  - `IBM-Plex-Arabic`
  - `IBM-Plex-Devanagari`
  - `IBM-Plex-Mono`
  - `IBM-Plex-Sans-Condensed`
  - `IBM-Plex-Sans-Hebrew`
  - `IBM-Plex-Sans`
  - `IBM-Plex-Serif`
  - `IBM-Plex-Thai`
- `<output>`: the output format
  - `complete`: includes all characters in one file
  - `split`: split characters by Unicode ranges, optimal for performance
- `<format>`: the file format, only `woff` and `woff2` are available when
  `output` is `split`
  - `eot`
  - `otf`
  - `ttf`
  - `woff`: useful for IE11 support
  - `woff2`: most likely the format you will use for modern browsers
- `<font-weight>`: the corresponding font weight for the font family, make sure
  to check support for a given font family as not all families contain all font
  weights
  - `Bold`
  - `ExtraLight`
  - `Light`
  - `Medium`
  - `Regular`
  - `SemiBold`
  - `Text`
  - `Thin`
- `<font-style>`: an optional attribute, used for italicized versions of fonts
  - `Italic`
- `<font-split>`: an optional attribute for a specific Unicode range, only
  available when `<output>` is `split`
  - `Cyrillic`
  - `Greek`
  - `Latin1`
  - `Latin2`
  - `Latin3`
  - `Pi`

Let's go through a couple of examples for various font families and formats.

<details>
<summary>IBM Plex Arabic</summary>

```bash
# Complete, Regular weight, woff2 format
@ibm/plex/IBM-Plex-Arabic/fonts/complete/woff2/IBMPlexArabic-Regular.woff2

# Complete, Light weight, woff format
@ibm/plex/IBM-Plex-Arabic/fonts/complete/woff/IBMPlexArabic-Light.woff
```

</details>

<details>
<summary>IBM Plex Sans</summary>

```bash
# Complete, Regular weight, woff2 format
@ibm/plex/IBM-Plex-Sans/fonts/complete/woff2/IBMPlexSans-Regular.woff2

# Complete, Italic, Regular weight, woff2 format
@ibm/plex/IBM-Plex-Sans/fonts/complete/woff2/IBMPlexSans-Italic.woff2

# Split (Pi), Bold, Italic, woff2
@ibm/plex/IBM-Plex-Sans/fonts/split/woff2/IBMPlexSans-BoldItalic-Pi.woff2
```

</details>

### `@font-face`

To include IBM Plex in your projects on the web, you need to use a CSS feature
called the
[`@font-face` at-rule.](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)
If you have not used this feature before, an overview is available
[here](https://css-tricks.com/snippets/css/using-font-face/).

In general, the structure of an `@font-face` block for IBM Plex will follows
template:

```css
@font-face {
  // Set font family as for IBM Plex Sans
  font-family: 'IBM Plex Sans';
  src: url('path-to-webfont.woff2') format('woff2');
}
```

Each block corresponds to a given file supplied by the `@ibm/plex` package. For
example, if we want to load IBM Plex Sans with the font weights of light,
regular, and bold, we would write three separate `@font-face` blocks:

```css
@font-face {
  font-family: 'IBM Plex Sans';
  font-weight: 300;
  src: url('<path-to-ibm-plex>/IBM-Plex-Sans/fonts/complete/woff2/IBMPlexSans-Light.woff2')
    format('woff2');
}

@font-face {
  font-family: 'IBM Plex Sans';
  font-weight: 400;
  src: url('<path-to-ibm-plex>/IBM-Plex-Sans/fonts/complete/woff2/IBMPlexSans-Regular.woff2')
    format('woff2');
}

@font-face {
  font-family: 'IBM Plex Sans';
  font-weight: 700;
  src: url('<path-to-ibm-plex>/IBM-Plex-Sans/fonts/complete/woff2/IBMPlexSans-Bold.woff2')
    format('woff2');
}
```

You can then use this font family in your project by specifying the font family
`IBM Plex Sans` on your `<body>` tag in CSS. For example:

```css
body {
  font-family: 'IBM Plex Sans';
}
```

Thankfully, setting this on `body` is is handled by Carbon for you so no need to
set this up if you're already using Carbon!

If you would like to support Unicode ranges, as well, be on the lookout for an
update to this document with guidance!

## Including in your product

If you're using `@carbon/styles` or `@carbon/react`, IBM Plex assets and the
relevant `@font-face` are already included by default. We recommend configuring
the per-family packages in your sass configuration to ensure you're using the
latest version of IBM Plex.

For example, with `@carbon/react`:

```scss
@use '@carbon/react' with (
  $use-per-family-plex: true
);
```

### `@carbon/type`

### unpkg

If you're looking for a quick way to include IBM Plex, and the default Akamai
CDN solution from `@carbon/type` isn't working for you, you can use the hosted
assets from [`unpkg`](https://unpkg.com).

You can see the URL for a given font face by visiting the URL for the package
[here](http://unpkg.com/@ibm/plex/).

To quickly load IBM Plex Sans, you could use the following `@font-face` block:

```css
@font-face {
  font-family: 'IBM Plex Sans';
  font-weight: 400;
  src: url('//unpkg.com/@ibm/plex/IBM-Plex-Sans/fonts/complete/woff2/IBMPlexSans-Regular.woff2')
    format('woff2');
}
```

### Loading Configuration

Carbon provides several ways to configure how IBM Plex is loaded:

```scss
// Option 1: Use legacy monolithing `@ibm/plex` assets
// No configuration is needed, this is the default

// Option 2: Use per-family loading (recommended)
@use '@carbon/react' with (
  $use-per-family-plex: true
);

// Option 3: Use Akamai CDN
@use '@carbon/react' with (
  $use-akamai-cdn: true
);

// When using option 1 or 2, optionally provide a custom font path.
// This can be used with the default `@ibm/plex` configuration, or
// with $use-per-family-plex.
@use '@carbon/react' with (
  $use-per-family-plex: true
);
$font-path: 'path/to/fonts';
```

#### Configuration Priority

The configuration options follow this priority order:

1. Per-family loading (`$use-per-family-plex: true`)
2. Akamai CDN (`$use-akamai-cdn: true`)

When multiple configurations are present:

- If both `$use-per-family-plex` and `$use-akamai-cdn` are set to `true`:
  - Per-family loading takes precedence
  - Akamai CDN configuration is ignored
  - Fonts will be loaded from individual family packages

#### Using `$font-path`

When using the default configuration or the per-family package configuration, a
custom font path can be specified. The pathing structure is slightly different
between the two.

When using the default:

```
<$font-path>/IBM-Plex-Sans/fonts/complete/woff2/IBMPlexSans-Bold.woff2
```

When using the per-family configuration:

```
<$font-path>/fonts/complete/woff2/IBMPlexSans-Bold.woff2
```

> If you're using Vite, the tilde included in the default
> $font-path (`~@ibm/plex`) is not needed. Remove it by reconfiguring `$font-path`to just`@ibm/plex`.

### Migration Guide

#### Migrating from Akamai CDN to per-family packages

1. Update your Sass configuration:

```scss
@use '@carbon/react' with (
  // Remove or set Akamai CDN to false
  // $use-akamai-cdn: false,
  // Enable per-family packages
  $use-per-family-plex: true
);
```

2. Updates $font-path configuration if needed:

```scss
@use '@carbon/react' with (
  $use-akamai-cdn: false,
  $use-per-family-plex: true,

  // Set the custom path to font assets in your app
  $font-path: 'path/to/fonts'
);
```

```scss
@use '@carbon/react' with (
  $use-akamai-cdn: false,
  $use-per-family-plex: true,

  // Or remove the font-path
  // $font-path: 'path/to/fonts'
);
```

4. Update font references:
   - Remove custom `@font-face` declarations if you had any
   - Update any direct path references to use the new package structure

### Future Changes

In the next major version:

- `$use-per-family-plex: true` will be the default configuration
- The monolithic `@ibm/plex` package will be removed in favor of individual
  family packages
- No expected changes to the Akamai CDN option (`$use-akamai-cdn`)
- No expected further changes for custom font paths (`$font-path`)

### Self-hosted, CDN

If your product uses a CDN, or you want to self-host, you can serve the IBM Plex
files directly. You have a couple of options for getting the right assets,
namely:

- Download directly from GitHub (unpreferred as the asset is unversioned)
- Include `@ibm/plex` as a dependency in your project and update the assets
  locally or on the CDN when you update the `@ibm/plex` dependency.
- Include per-family packages `@ibm/plex-sans`, etc. as a dependency in your
  project and update the assets locally or on the CDN when you update the
  per-family packages/dependencies.

#### Self-hosted

If you're using a bundler for your front-end assets, like Webpack, then you can
reference these assets directly, and your project should serve them as intended.
For example, say we have a CSS file that we included in our webpack-based
project and wrote:

```css
@font-face {
  font-family: 'IBM Plex Sans';
  font-weight: 400;
  src: url(~@ibm/plex/IBM-Plex-Sans/fonts/complete/woff2/IBMPlexSans-Regular.woff2)
    format('woff2');
}
```

The `~` tells webpack to resolve this path from the `@ibm/plex` dependency. When
the project is built, the `woff2` asset should be handled by the `file-loader`
or `url-loader` in your webpack config.

#### CDN

If hosting in a CDN, you will need to manually extract the files that you need
and publish them to your CDN. For an example of how to structure these, you can
view how Akamai does this in
[`@carbon/type`](https://github.com/IBM/carbon-elements/blob/master/packages/type/scss/font-face/_sans.scss).

## FAQ
