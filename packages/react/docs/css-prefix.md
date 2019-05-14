# Customizing CSS class prefix

> Guidelines for how to customize CSS class prefix

<!-- You can run `npx doctoc --title '## Table of Contents' <path-to-file.md>` to automatically generate the table of contents for this page -->

<!-- prettier-ignore-start -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [Overview](#overview)
- [Example](#example)
- [Building Sass code from `carbon-components` with custom CSS prefix](#building-sass-code-from-carbon-components-with-custom-css-prefix)
- [Building `carbon-components-react` code with custom CSS prefix](#building-carbon-components-react-code-with-custom-css-prefix)
  - [Dependency injection](#dependency-injection)
  - [On-the-fly module editing](#on-the-fly-module-editing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- prettier-ignore-end -->

# Overview

In latest version of `carbon-components` and `carbon-components-react`, you can
use custom CSS prefix. This document explains how to use custom CSS prefix.

# Example

An example project can be found at
[`custom-css-prefix` in our example directory](../examples/custom-css-prefix).

# Building Sass code from `carbon-components` with custom CSS prefix

Custom CSS prefix in `carbon-components` Sass code can be used by setting
`$prefix` Sass variable, like:

```scss
$prefix: 'your-brand';
@import '~carbon-components/scss/globals/scss/styles.scss';
```

# Building `carbon-components-react` code with custom CSS prefix

Custom CSS prefix in `carbon-components-react` code can be used by changing
`prefix` property in
[`settings` module in `carbon-components`](https://github.com/IBM/carbon-components/blob/v9.0.0/src/globals/js/settings.js#L16)
on-the-fly. This can be done in either of two ways:

1. Dependency injection
2. On-the-fly module editing

## Dependency injection

Dependency injection can be done by using a custom
[WebPack "resolve plugin"](https://webpack.js.org/configuration/resolve/#resolve-plugins).
See
[`webpack.config.js` in our example](../examples/custom-css-prefix/webpack.config.dev.js#L8-L25)
for the details.

## On-the-fly module editing

Dependency injection can be done by using something like
[WebPack `string-replace-loader`](https://www.npmjs.com/package/string-replace-loader).
