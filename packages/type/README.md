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
| [Font face](#font-face)       | Include IBM Plex™ font faces in your application. Uses Google fonts                                          |
| [Type classes](#type-classes) | Helpers to use type styles directly. Not included by default                                                 |
| [Font family](#font-family)   | Defines the font stack for IBM Plex™ in your application, provides helpers for working with font definitions |
| [Reset](#reset)               | Provides a high-level CSS Reset to use in your project                                                       |
| [Scale](#type-scale)          | Provides the type scale. Can access the size at any given step (step 1, 2, 3, etc)                           |
| [Styles](#type-styles)        | Provides type styles for your application (heading-01, body-long-01, etc)                                    |

To include `@carbon/type` in your project, you can write the following in your
Sass file:

```scss
@import '@carbon/type/scss/type';
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';

@include carbon--type-reset();
@include carbon--font-face-mono();
@include carbon--font-face-sans();
```

This should include the default type reset from the project, in addition to
font-face definitions for IBM Plex Mono and IBM Plex Sans that come from Google
Fonts.

If you are using `@carbon/elements`, the import paths become:

```scss
@import '@carbon/elements/scss/type/path-to-import';
```

For example:

```scss
@import '@carbon/elements/scss/type/styles';
```

In addition, you will need to setup `node-sass` so that `node_modules` is
included in the `includePaths` option. Often times, the tool that you are using
to build Sass files in your project should expose this option for you to set.

For example, if you are using Webpack you would use `node-sass` and
`sass-loader` with the following configuration for `includePaths`:

```js
{
  loader: 'sass-loader',
  options: {
    includePaths: ['node_modules'],
  },
}
```

### Type styles

Instead of using a type scale, `@carbon/type` provides tokens that represent
what we call type styles. These tokens have a variety of properties for styling
how text is rendered on a page.

You can find a full reference of the type styles that are available on the
[Carbon Design System website](https://www.carbondesignsystem.com/guidelines/typography/productive)
.

You can include a token in your Sass file by writing:

```scss
@import '@carbon/type/scss/styles';

@include carbon--type-style('token-name');
```

In addition, if the type style you are using has a fluid style then you can pass
in `true` as the second argument to `carbon--type-style` to enable fluid styles.
For example:

```scss
@import '@carbon/type/scss/styles';

@include carbon--type-style('token-name', true);
```

### Font-face

`@carbon/type` supports three font-face definitions that you can use to add IBM
Plex to your project. These font-face definitions include support for:

- IBM Plex Mono
- IBM Plex Sans
- IBM Plex Serif

For most projects, only IBM Plex Mono and IBM Plex Sans is necessary. We also
provide IBM Plex Serif if you are building an editorial or marketing project.

These font-face definitions are pulling the above fonts from Google Fonts. As a
result, they are not intended to be used as a production asset for your project.
While you can depend on these for bootstrapping your project, we highly
recommend using the fonts from the `@ibm/plex` package and hosting them on a
global CDN.

You can include each font-face definition by including the corresponding file
and calling its mixin. For example, if you wanted to include IBM Plex Mono in
your project you would write the following in your Sass file:

```scss
@import '@carbon/type/scss/font-face/mono';

@include carbon--font-face-mono();
```

Similarly, you can include IBM Plex Sans and IBM Plex Serif by writing:

```scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@import '@carbon/type/scss/font-face/serif';

@include carbon--font-face-mono();
@include carbon--font-face-sans();
@include carbon--font-face-serif();
```

### Type classes

The recommended way to style your application will be to use our
[type styles](#type-styles). However, we also offer helper CSS classes for
specific use-cases. These are also helpful when quickly prototyping a project.

You can include type classes in your project by writing the following in your
Sass file:

```scss
@import '@carbon/type/scss/classes';
```

| Selector                 | Description                               |
| ------------------------ | ----------------------------------------- |
| `.bx--type-mono`         | Specify the font face as IBM Plex Mono    |
| `.bx--type-sans`         | Specify the font face as IBM Plex Sans    |
| `.bx--type-serif`        | Specify the font face as IBM Plex Serif   |
| `.bx--type-light`        | Specify the font weight as light (300)    |
| `.bx--type-regular`      | Specify the font weight as regular (400)  |
| `.bx--type-semibold`     | Specify the font weight as semibold (600) |
| `.bx--type-italic`       | Specify the font style as italic          |
| `.bx--type-<type-style>` | Set styles for the given type style       |

### Font family

`@carbon/type` provides the font stacks for all the IBM Plex fonts available.
You can access the font family information by including the following import in
your Sass file:

```scss
@import '@carbon/type/scss/font-family';
```

The font stacks are available under the `$carbon--font-families` variable. You
can also access a specific font family by using the `carbon--font-family`
function by doing:

```scss
.my-selector {
  font-family: carbon--font-family('mono');
}
```

You can also use the `carbon--font-family` mixin to automatically set the
`font-family` property for you:

```scss
.my-selector {
  @include carbon--font-family('mono');
}
```

You can see all the available font families in `$carbon--font-families` .

### Reset

An optional type reset is provided under the `carbon--type-reset` mixin. You can
include this mixin by writing the following in your Sass file:

```scss
@import '@carbon/type/scss/reset';

@include carbon--type-reset();
```

This reset sets some top-level properties on `html` and `body`, namely
`font-size`, `font-family`, and some `text-rendering` options. We also map the
`strong` tag to the semibold font weight.

### Type scale

A type scale is provided through the `$carbon--type-scale` variable and
corresponding `carbon--type-scale` function and mixin. However, for specifying
type styles, the recommendation is to use [type styles](#type-styles) .

If you are looking to use the type scale, you can include all the scale-related
utilities and variables by writing the following in your Sass file:

```scss
@import '@carbon/type/scss/scale';
```

You can access a specific step in the type scale by using the
`carbon--type-scale` function:

```scss
@import '@carbon/type/scss/scale';

.my-selector {
  font-size: carbon--type-scale(1);
}
```

There is also a `type-scale` mixin that will set `font-size` for your directly:

```scss
@import '@carbon/type/scss/scale';

.my-selector {
  @include carbon--type-scale(1);
}
```

## 📚 Examples

If you're looking for more examples on how to use `@carbon/type`, we have some
examples that you can check out:

- [styled-components](./examples/styled-components)

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
