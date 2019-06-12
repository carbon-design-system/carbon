# @carbon/icons-handlebars

> Handlebars helpers for IBM Design Language icons in digital and software
> products using the Carbon Design System

## Getting started

To install `@carbon/icons-handlebars` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/icons-handlebars
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/icons-handlebars
```

## Usage

You can use the `carbon-icon` helper by passing in the name of the icon you'd
like to render. For example:

```hbs
{{ carbon-icon "Accessibility32" }}
```

This will output the default `<svg>` markup for the `Accessibility` icon at
32x32. You can pass in additional properties like `aria-label` by doing:

```hbs
{{ carbon-icon "Accessibility32" aria-label="Accessibility label" }}
```

These attributes will be applied to the top-level `<svg>` node.

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
