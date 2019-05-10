# IBM Plex

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Overview](#overview)
  - [`@ibm/plex`](#ibmplex)
  - [`@font-face`](#font-face)
- [Including in your product](#including-in-your-product)
  - [`@carbon/type`](#carbontype)
  - [unpkg](#unpkg)
  - [Self-hosted, CDN](#self-hosted-cdn)
    - [Self-hosted](#self-hosted)
    - [CDN](#cdn)
- [FAQ](#faq)
    - [How do I enable support for IE11?](#how-do-i-enable-support-for-ie11)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Overview

The Carbon Design System uses [IBM Plex](https://www.ibm.com/plex) as its
typeface. For teams using Carbon, this font is loaded by default through Google
Fonts if you are using any of our projects, or if you are using
[`@carbon/type`](../packages/type) directly.

However, the Google Fonts strategy loaded by default is not recommended for
production use-cases. Below, we offer several alternative ways to include IBM
Plex in your project for a variety of situations.

If you feel like a situation isn't fully covered, or you have an idea for
another one to add, please
[make an issue](https://github.com/IBM/carbon-elements/issues/new/choose)! We
want to make sure everyone feels like their use-case is fully covered by this
document.

### `@ibm/plex`

IBM Plex is distributed through a package on NPM called
[`@ibm/plex`](https://www.npmjs.com/package/@ibm/plex). The source for this
package is available on [GitHub](https://github.com/ibm/plex#readme).

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

To get the hang of things, let's go through a couple of examples for various
font families and formats.

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

### `@carbon/type`

### unpkg

If you're looking for a quick way to include IBM Plex, and the default Google
Font solution from `@carbon/type` isn't working for you, you can use the hosted
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

### Self-hosted, CDN

If your product uses a CDN, or you want to self-host, you can serve the IBM Plex
files directly. You have a couple of options for getting the right assets,
namely:

- Download directly from GitHub (unpreferred as the asset is unversioned)
- Include `@ibm/plex` as a dependency in your project and update the assets
  locally or on the CDN when you update the `@ibm/plex` dependency.

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
view how Google Fonts does this in
[`@carbon/type`](https://github.com/IBM/carbon-elements/blob/master/packages/type/scss/font-face/_sans.scss).

## FAQ

#### How do I enable support for IE11?

If your product needs to support IE11, then you can include a `.woff` complete
file as a fallback. For example:

```css
@font-face {
  font-family: 'IBM Plex Sans';
  font-weight: 400;
  src: url('//unpkg.com/@ibm/plex/IBM-Plex-Sans/fonts/complete/woff/IBMPlexSans-Regular.woff')
    format('woff');
}

@font-face {
  font-family: 'IBM Plex Sans';
  font-weight: 400;
  src: url('//unpkg.com/@ibm/plex/IBM-Plex-Sans/fonts/complete/woff2/IBMPlexSans-Regular.woff2')
    format('woff2');
}
```
