# @carbon/type

> Typography for digital and software products using the Carbon Design System

## Getting started

To install `@carbon/type` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/type
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/type
```

## Usage

`@carbon/type` provides a variety of ways to work with typography from the IBM
Design Language. You can use all of these features either in JavaScript or Sass.
These features include:

| Feature                       | Description                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [Font face](#font-face)       | Include IBM Plex™ font faces in your application. Uses Akamai CDN                                            |
| [Type classes](#type-classes) | Helpers to use type styles directly. Not included by default                                                 |
| [Font family](#font-family)   | Defines the font stack for IBM Plex™ in your application, provides helpers for working with font definitions |
| [Reset](#reset)               | Provides a high-level CSS Reset to use in your project                                                       |
| [Scale](#type-scale)          | Provides the type scale. Can access the size at any given step (step 1, 2, 3, etc)                           |
| [Styles](#type-styles)        | Provides type styles for your application (heading-01, body-long-01, etc)                                    |

The `@carbon/type` package enables you to use typography from the IBM Design
Language, including the type scale and fonts, along with typography design
tokens from the Carbon Design System. It also comes with opinionated defaults
for type styles on common elements like `h1`, `h2`, `p`, etc.

You can use this package by writing the following:

```scss
@use '@carbon/type';

// Include type reset
@include type.reset();

// Include default type styles, targets h1, h2, h3, etc
@include type.default-type();

// Include utility classes for type-related properties
@include type.type-classes();

.selector {
  // Include a type style
  @include type.type-style('productive-heading-01');
}
```

This should include the default type reset from the project, in addition to
font-face definitions for IBM Plex Mono and IBM Plex Sans that come from Google
Fonts.

If you are using `@carbon/react`, the import paths become:

```scss
@use '@carbon/react/scss/type';
```

### Type styles

Instead of using a type scale, `@carbon/type` provides tokens that represent
what we call type styles. These tokens have a variety of properties for styling
how text is rendered on a page.

You can find a full reference of the type styles that are available on the
[Carbon Design System website](https://www.carbondesignsystem.com/guidelines/typography/type-sets)
.

You can include a token in your Sass file by writing:

```scss
@use '@carbon/type';

@include type.type-style('token-name');
```

In addition, if the type style you are using has a fluid style then you can pass
in `true` as the second argument to `type-style` to enable fluid styles. For
example:

```scss
@use '@carbon/type';

@include type.type-style('token-name', true);
```

### Type classes

The recommended way to style your application will be to use our
[type styles](#type-styles). However, we also offer helper CSS classes for
specific use-cases. These are also helpful when quickly prototyping a project.

You can include type classes in your project by writing the following in your
Sass file:

```scss
@use '@carbon/type';

:root {
  @include type.type-classes();
}
```

And then add the appropriate classes to the element you want to style

```html
<span className="cds--type-mono">Test sentence</span>
```

| Selector                  | Description                               |
| ------------------------- | ----------------------------------------- |
| `.cds--type-mono`         | Specify the font face as IBM Plex Mono    |
| `.cds--type-sans`         | Specify the font face as IBM Plex Sans    |
| `.cds--type-serif`        | Specify the font face as IBM Plex Serif   |
| `.cds--type-light`        | Specify the font weight as light (300)    |
| `.cds--type-regular`      | Specify the font weight as regular (400)  |
| `.cds--type-semibold`     | Specify the font weight as semibold (600) |
| `.cds--type-italic`       | Specify the font style as italic          |
| `.cds--type-<type-style>` | Set styles for the given type style       |

### Font family

`@carbon/type` provides the font stacks for all the IBM Plex fonts available.
You can access the font family information by including the following import in
your Sass file:

```scss
@use '@carbon/type';
```

The font stacks are available under the `$font-families` variable. You can also
access a specific font family by using the `font-family` function by doing:

```scss
.my-selector {
  font-family: type.font-family('mono');
}
```

You can also use the `font-family` mixin to automatically set the `font-family`
property for you:

```scss
.my-selector {
  @include type.font-family('serif');
}
```

You can see all the available font families in `$font-families` .

### Reset

An optional type reset is provided under the `reset` mixin. You can include this
mixin by writing the following in your Sass file:

```scss
@use '@carbon/type';

:root {
  @include type.reset();
}
```

This reset sets some top-level properties on `html` and `body`, namely
`font-size`, `font-family`, and some `text-rendering` options. We also map the
`strong` tag to the semibold font weight.

### Type scale

A type scale is provided through the `$type-scale` variable and corresponding
`type-scale` function and mixin. However, for specifying type styles, the
recommendation is to use [type styles](#type-styles) .

If you are looking to use the type scale, you can include all the scale-related
utilities and variables by writing the following in your Sass file:

```scss
@use '@carbon/type';
```

You can access a specific step in the type scale by using the `type-scale`
function:

```scss
.my-selector {
  font-size: type.type-scale(1);
}
```

There is also a `type-scale` mixin that will set `font-size` for your directly:

```scss
@use '@carbon/type';

.my-selector {
  @include type.type-scale(4);
}
```

## 📚 Examples

If you're looking for more examples on how to use `@carbon/type`, we have some
examples that you can check out:

- [Stackblitz](https://stackblitz.com/edit/github-wdcdqx?file=src%2Findex.scss)

You can also see more documentation regarding the available tokens
[here](./docs/sass.md)

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).

## <picture><source height="20" width="20" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-dark.svg"><source height="20" width="20" media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"><img height="20" width="20" alt="IBM Telemetry" src="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"></picture> IBM Telemetry

This package uses IBM Telemetry to collect metrics data. By installing this
package as a dependency you are agreeing to telemetry collection. To opt out,
see
[Opting out of IBM Telemetry data collection](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection).
For more information on the data being collected, please see the
[IBM Telemetry documentation](https://github.com/ibm-telemetry/telemetry-js/tree/main#ibm-telemetry-collection-basics).
