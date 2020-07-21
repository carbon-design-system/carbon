# @carbon/layout

> Layout helpers for digital and software products using the Carbon Design
> System

## Getting started

To install `@carbon/layout` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/layout
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/layout
```

## Usage

`@carbon/layout` provides a couple of useful utilities alongside the
specification for the grid system for the IBM Design Language. This package
includes:

| Feature         | Description                                                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Breakpoints     | Variables and settings for the IBM Design Grid, including gutter and breakpoints. It also includes helpers for working with breakpoints |
| Unit conversion | Helpers for converting from `px` to `rem` or `em`.                                                                                      |
| Key heights     | Helpers for working with key heights at different breakpoints                                                                           |
| Mini unit       | Helpers for working in multiples of the mini-unit                                                                                       |
| Spacing         | Provides a spacing scale and helper for using steps in the scale                                                                        |

One important thing to remember is that `@carbon/layout` is not responsible for
the grid itself. If you are looking for a grid implementation to use, definitely
checkout the [`@carbon/grid`](../grid) package.

`@carbon/layout` provides the above features in both Sass and JavaScript. If
you're looking for support in a different language, feel free to file an issue
proposing the new addition!

## 📖 API Documentation

If you're looking for `@carbon/layout` API documentation, check out:

- [Sass](./docs/sass.md)

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
