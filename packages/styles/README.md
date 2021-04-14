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

## Usage

### Sass entrypoints

| Entrypoint                   | Description                                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `index.scss`                 | Entrypoint that brings in all of the CSS for the Carbon Design System                                        |
| `scss/_breakpoint.scss`      | Use helpers to easily create breakpoints in your product that align to the 16 column grid                    |
| `scss/_colors.scss`          | Provides access to colors from the IBM Design Language                                                       |
| `scss/_config.scss`          | Allows you to configure various behaviors of Carbon                                                          |
| `scss/_feature-flags.scss`   | Enable or disable various feature flags to try out experiments within Carbon                                 |
| `scss/_grid.scss`            | Provides access to grid mixins and helpers for working with the 16 column grid                               |
| `scss/_motion.scss`          | Provides access to motion easing curves and durations from the IBM Design Language                           |
| `scss/_reset.scss`           | Brings in a CSS reset to enable consistent styles across browsers                                            |
| `scss/_themes.scss`          | Provides access to the default themes used with Carbon                                                       |
| `scss/_theme.scss`           | Provides access to the current theme and theme helpers to use in your project                                |
| `scss/_type.scss`            | Provides access to type tokens configured for use with IBM Plex                                              |
| `scss/components/*`          | Bring in a single component, or several that you need for your project. Great for optimizing CSS bundle size |
| `scss/components/index.scss` | Bring in all component styles                                                                                |

### Optimizing CSS bundle size

When you bring in `@carbon/styles` directly, it will include all of the styles
available for the Carbon Design System. If you would like to bring in only the
styles that you use, then we recommend structuring your imports in the following
way:

```scss
// Bring in top-level / global styles
@use '@carbon/styles/reset';

// Bring in each component that you use
@use '@carbon/styles/scss/components/<component>';
```

For example, if your project is only using the Accordion and Breadcrumb
components then you would do the following:

```scss
@use '@carbon/styles/reset';
@use '@carbon/styles/scss/components/accordion';
@use '@carbon/styles/scss/components/breadcrumb';
```

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
