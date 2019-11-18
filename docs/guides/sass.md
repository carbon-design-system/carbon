<!-- alex disable color -->

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

The `carbon-components` package ships all of the styles for the Carbon Design
System as Sass files in the `scss` folder. You can import this file directly
through either of the following paths:

```scss
# Specifying node_modules directly
@import 'node_modules/carbon-components/scss/<path-to-file>';

# With webpack
@import '~carbon-components/scss/<path-to-file>';

# With sass config setup to include `node_modules` in paths
@import 'carbon-components/scss/<path-to-file>';
```

There are two folders in this `scss` folder:

- `components`: which contain component-specific styles and mixins
- `globals`: which contain files that effect global settings like color, type,
  grid, and more

To quickly get started, you can import `styles.scss` which contains all of the
styles for the Carbon Design System. You can import this using the following
path:

```scss
@import 'carbon-components/scss/globals/scss/styles.scss';
```

_Note: the `styles.scss` will include all styles for the Carbon Design System,
even if you are not using all of its components, to learn how to optimize this
import check out [Optimizing your Sass builds](#optimizing-your-sass-builds)._

If you would like to a see a full overview of the functionality we ship in Sass,
in particular our public API, you should checkout our published
[SassDoc](../../packages/components/docs/sass.md).

## Global flags

The Carbon Design System sass setup specifies a number of global flags that you
can configure before importing Carbon's sass files to enable or disable
different behaviors. To enable these flags, you will need to set them before
importing any styles from Carbon. For example:

```scss
$css--reset: false;
@import 'carbon-components/scss/globals/scss/styles.scss';
```

For a full reference of flags, see the table below.

| Global flag       | Description                                                          | Default value |
| ----------------- | -------------------------------------------------------------------- | ------------- |
| `$css--font-face` | Includes the font-face mixins for the current font family (IBM Plex) | `true`        |
| `$css--helpers`   | Includes classes and utilities that are commonly used by components  | `true`        |
| `$css--body`      | Sets a top-level reset, type style, and color for the `<body>` tag   | `true`        |
| `$css--use-layer` | Enables use of box-shadow in `layer()` helpers                       | `true`        |
| `$css--reset`     | Includes a top-level CSS Reset                                       | `true`        |

## Feature flags

The Carbon Design System takes advantage of feature flags to conditionally
enable or disable new features that are being introduced to the system. To
configure feature flags, you will need to update the `$feature-flags` map before
importing any sass files from Carbon. For example:

```scss
$feature-flags: (
  grid-columns-16: true,
);
@import 'carbon-components/scss/globals/scss/styles.scss';
```

## Optimizing your Sass builds

If you are looking to optimize the CSS that is output by including the Carbon
Design System, you can take advantage of the fact that every partial in Carbon's
package can be compiled independently. Using this feature, you can mirror the
structure of the default `styles.scss` file to include only the component styles
that you need.

At a high-level, this would look like:

```scss
// Your entrypoint for including sass files from Carbon
$css--font-face: true;
$css--helpers: true;
$css--body: true;
$css--use-layer: true;
$css--reset: true;
$css--default-type: true;
$css--plex: true;

// Include defaults typically provided through the `styles.scss` entrypoint
@import 'carbon-components/scss/globals/scss/_css--reset.scss';
@import 'carbon-components/scss/globals/scss/_css--font-face.scss';
@import 'carbon-components/scss/globals/scss/_css--helpers.scss';
@import 'carbon-components/scss/globals/scss/_css--body.scss';

// Optionally include the grid
@import 'carbon-components/scss/globals/grid/_grid.scss';

// Optionally include components that you need
@import 'carbon-components/scss/components/button/button';
@import 'carbon-components/scss/components/file-uploader/file-uploader';
```

## Prefixes

Style selectors that are a part of the sass files for Carbon are built using a
global `$prefix` variable that allows us to dynamically change the prefix of
selectors that we ship. By default, `$prefix` is set to `bx`. `bx` comes from
Carbon's origins in Bluemix. If you look at our source files, you'll see that we
use `$prefix` in our selectors in the following way:

```scss
// Input
.#{$prefix}--my-component {
  // ...
}

// Output
.bx--my-component {
  // ...
}
```

When writing styles that depend on, or target, selectors from Carbon it is
recommended that you use the global `$prefix` variable to prevent regressions in
the future if this value changes or if the prefix is overridden.

### Overriding `$prefix`

In order to override `$prefix` to your own custom prefix, you will need to set
`$prefix` before importing any styles from Carbon. For example:

```scss
// Custom prefix
$prefix: 'cds';

// Import Carbon
@import 'path-to-carbon';
```

In addition, if you're using any of the JavaScript packages that Carbon ships,
you'll want to update the `prefix` setting available in `carbon-components`.
This setting is used in JavaScript files to make sure that components use the
correct prefix for class names. For example:

```jsx
import { settings } from 'carbon-components';
import React from 'react';

const { prefix } = settings;

function Accordion(props) {
  return <ul className={`${prefix}--accordion`}>{props.children}</ul>;
}
```

Settings from Carbon are available from the `settings` named export. You can
mutate this value before including any references to other packages (like
`carbon-components-react`) in order to change `prefix` across

```js
import { settings } from 'carbon-components';
// Set custom prefix, should match what is set in Sass
settings.prefix = 'cds';
```

**Note:** it's important that this is included as one of the first modules
initialized in your project. We recommend having this be one of the first
imports in your entrypoint as a result.

## FAQ
