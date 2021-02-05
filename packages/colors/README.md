# @carbon/colors

> Colors for digital and software products using the Carbon Design System

## Getting started

To install `@carbon/colors` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/colors
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/colors
```

## Usage

You can use the `@carbon/colors` module in your JavaScript, in addition to your
Sass.

### Sass

In Sass, you can import the files individual by doing:

```scss
@import '@carbon/colors/scss/colors';
```

This file automatically includes the `carbon--colors` mixin which initializes
all the color variables for the IBM Design Language.

These color variables follow the naming convention: `$carbon--<swatch>-<grade>`.
For example:

```scss
$carbon--blue-50;
$carbon--cool-gray-10;
$carbon--black-100;
$carbon--white-0;
```

You can also use the shorthand form of these colors by dropping the `carbon--`
namespace:

```scss
$blue-50;
$cool-gray-10;
$black-100;
$white-0;
```

_Note: the shorthand variables require that you do not have any other
conflicting variables in your setup. Namespaced variables are always preferred
for this reason, unless you are confident that no collisions will occur._

If you would like you choose when these variables are defined, then you can call
the `carbon--colors` mixin directly by importing the following file:

```scss
@import '@carbon/colors/scss/mixins';

// ...
@include carbon--colors();
```

Alongside the color variables detailed above, we also provide a map of colors so
that you can programmatically use these values. This map is called
`$carbon--colors` and each key is the name of a swatch. The value of these
swatches is also a map, but each key is now the grade. In code, this looks like
the following:

<!-- prettier-ignore-start -->

```scss
$carbon--colors: (
  'blue': (
    10: #edf4ff,
    // ...
  )
);
```

<!-- prettier-ignore-end -->

You can include this variable by including `@carbon/colors/scss/colors` or
calling the `carbon--colors()` mixin directly.

#### Migrating from previous versions

If you were originally using a project that had color variables defined as
`$ibm-color__<swatch>-<grade>`, or are relying on `$ibm-color-map`, you can also
use the entrypoint described above to access these colors. They are meant as an
easier way to help adopt these packages. However, these variables will be
removed in the next release of Carbon.

Similar to previous efforts, we also provide colors in the formats mentioned
above. For example:

```scss
$ibm-color__blue-50;
$ibm-color__warm-gray-100;
```

If you would like a mixin to conditionally include these variables, you can
include the mixin by using:

```scss
@import '@carbon/colors/scss/mixins';

@include ibm--colors();
```

### JavaScript

For JavaScript, you can import and use this module by doing the following in
your code:

```js
// ESM
import { black, blue, warmGray } from '@carbon/colors';

// CommonJS
const { black, blue, warmGray } = require('@carbon/colors');
```

Each color swatch is exported as a variable, and each color name is also
exported as an object that can be called by specifying grade, for example:

```js
black;
blue[50]; // Using the `blue` object.
warmGray100; // Using the `warmGray100` variable.
```

## 📚 Examples

If you're looking for more examples on how to use `@carbon/colors`, we have some
examples that you can check out:

- [sass-modules](./examples/sass-modules)

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
