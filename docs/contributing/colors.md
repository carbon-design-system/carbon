# Colors

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Contributing](#contributing)
  - [Colors](#colors)
    - [Gotchas](#gotchas)
  - [Themes](#themes)
    - [Using another theme](#using-another-theme)
    - [`rgba` values](#rgba-values)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Contributing

When looking to make contributions to colors, you can find all the source files
available to edit [in this directory](/packages/colors/src). There are a couple
of files, namely:

- `colors.js` which holds all the color information for the IBM Design Language
- `tokens.js` which holds all the token information for the Carbon Design System

You can make edits to either file in order to update a name or value of a color.

### Colors

When working with color names and values, you will be working in the
[`colors.js`](/packages/colors/src/colors.js) file. This file is written in
JavaScript and exports all the colors that developers could use from the IBM
Design Language. A color is exported by writing the following:

```js
export const red10 = '#fff0f1';
```

`red10` represents the name of the color, in this case the color in the `red`
swatch with a grade of `10` and `'#fff0f1'` represents its value. More often
than not, the value is a HEX code value or an rgb/rgba value.

You can update the value of any of the colors in this file by changing the HEX
code. For example, we could update `red10` above to be:

```js
export const red10 = '#fff0f2';
```

You can update these values to any valid HEX code or rgb value. The important
thing to remember is that the value is contained within the single quotes, `'`,
otherwise the JavaScript program will not run.

#### Gotchas

- Make sure that every value is lowercase in the HEX code
  - In other words, prefer `#ffffff` to `#FFFFFF`
- Make sure that the value is contained within the single quotes, `'`
  - For example, `export const red10 = '#fff0f1;` would not compile without the
    ending `'` quote.

### Themes

When working with token names and values, you will be working in the
[`themes`](/packages/themes/src) folder. This folder will have files that are
named for each theme we currently support. The
[`white`](/packages/themes/src/white.js) theme is considered the default theme.

Each file in this directly (outside of `index.js`) will have all of the theme
tokens defined inside of them. These files are written in JavaScript exports all
the tokens that developers could use when working in the Carbon Design System.

A token is exported by writing the following:

```js
export const interactive01 = blue60;
```

In this example, `interactive01` is the name of the token and `blue60` is the
value.

Most likely, when editing, updating, or adding token values you will need to
reference a value from the IBM Design Language color palette. In JavaScript, you
do this by importing the colors that we need to use at the top of the file. You
can see if a color has been imported by looking at `import` block:

```js
import {
  // Blue
  blue60,
  blue70,
  blue80,

  // ...
} from '@carbon/colors';
```

In the above code snippet, we can see that several blue values have been
imported already. If we needed to use a new color, for example `blue20`, then we
could add it to the `import` block:

```js
import {
  // Blue
  blue20,
  blue60,
  blue70,
  blue80,

  // ...
} from '@carbon/colors';
```

Afterwards, we could use `blue20` as the value in any of our tokens 🎉

In order to update the value of a token, you can change the value after the
equals sign in the export. For example, if we wanted to change `interactive01`
from `blue60` to `blue20` we would need to do the following:

```js
export const interactive01 = blue20;
```

#### Using another theme

If a theme that you are currently editing relies on another theme value, you can
re-export that token at the end of the file. As an example, let's say we are
working in the `gray10`, or `g10`, theme. This theme has a token,
`hoverSelectedUI`, that is the same value as the `white` theme.

Following our examples above, we would normally write a token value like:

```js
export const hoverSelectedUI = 'some-value';
```

However, since this token relies on the `white` theme, we can re-export this
value at the bottom of the file. We can do this by writing the following:

```js
export { hoverSelectedUI } from './white';
```

Writing the line above will allow us to get the `hoverSelectedUI` value from the
`white` theme and include it as part of the `g10` theme.

#### `rgba` values

When working with values that have opacity, you can import and use the `rgba`
helper to get the proper representation of the value in code.

We can use this helper by including the following at the top of the file in our
imports:

```js
import {
  blue60,
  blue80,
  blue100,
  // ...

  // Include the `rgba` helper
  rgba,
} from '@carbon/colors';

// ...

export const overlay01 = rgba(gray100, 0.5);
```

In this example, we have included the `rgba` helper and called in for the token
`overlay01`. This helper takes in a color, in this case `gray100`, and the
decimal value for the opacity.
