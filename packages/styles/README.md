# @carbon/styles

> Styles for the Carbon Design System

## Getting started

To install `@carbon/styles` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/styles
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/styles
```

This package requires [Dart Sass](http://npmjs.com/package/sass) in order to
compile. It uses
[Sass modules](https://css-tricks.com/introducing-sass-modules/) to organize the
codebase and provide exports to use.

If you're new to Sass, or are wondering how to configure Sass for your project,
we recommend checking out the following resources and links:

- [Sass Basics](https://sass-lang.com/guide)
- [Webpack with Sass](https://webpack.js.org/loaders/sass-loader/)
- [Next.js with Sass](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support)
- [Create React App with Sass](https://create-react-app.dev/docs/adding-a-sass-stylesheet/)
- [Parcel with Sass](https://v2.parceljs.org/languages/sass/)
- [Vite with Sass](https://vitejs.dev/guide/features.html#css-pre-processors)
- [Snowpack with Sass](https://www.snowpack.dev/guides/sass/)

Once you get Sass up and running in your project, make sure to configure Sass to
include `node_modules` in its `includePaths` option. For more information,
checkout the [configuration](./docs/sass.md#configuration) section in our Sass
docs.

## Usage

You can bring in all the styles for the Carbon Design System by including
`@carbon/styles` in your Sass files. For example:

```scss
@use '@carbon/styles';
```

If you only would like to bring in specific components from Carbon, you can
import them in a similar way:

```scss
@use '@carbon/styles/scss/reset';
@use '@carbon/styles/scss/components/accordion';
@use '@carbon/styles/scss/components/button';
@use '@carbon/styles/scss/components/checkbox';
```

There are various helpers that you can include from Carbon, as well, such as a
CSS reset, grid, breakpoint helpers, and more. You can include these similar to
how you bring in components:

```scss
// Bring in the CSS Reset
@use '@carbon/styles/scss/reset';

// Bring in the CSS Grid
@use '@carbon/styles/scss/grid';
```

To learn more about the various helpers that `@carbon/styles` provides, checkout
the overview of the files available to use in our
[Sass docs](./docs/sass.md#files).

## Theming

You can change the default theme of Carbon by doing the following:

```scss
@use '@carbon/styles/scss/themes';
@use '@carbon/styles/scss/theme' with (
  $theme: themes.$g100
);
```

This example uses a built-in theme from Carbon provided by the `scss/themes`
entrypoint. You can also use a custom theme, or add your own custom tokens to
extend the theme.

```scss
// Configure with a custom theme
@use '@carbon/styles/scss/theme' with (
  $theme: (
    background: #e2e2e2,
    text-primary: #ffffff,
  )
);
```

```scss
// Extend the g100 theme with your own tokens
@use '@carbon/styles/scss/themes';
@use '@carbon/styles/scss/theme' with (
  $fallback: themes.$g100,
  $theme: (
    custom-token-01: #000000,
  )
);
```

### Design tokens

You can access the design tokens defined by the Carbon Design System through the
`@carbon/styles/scss/theme` entrypoint. This file will allow you to refer to
tokens using Sass Variables as well as get the current value for any token in
the current theme. For example:

```scss
@use '@carbon/styles/scss/theme';

body {
  background: theme.$background;
}
```

For a full list of tokens available for you to use, check out our
[theming documentation](../themes/docs/sass.md#tokens).

## 📖 API Documentation

If you're looking for `@carbon/styles` API documentation, check out:

- [Sass](./docs/sass.md)

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
