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

HOW DO WE ANTICIPATE PEOPLE USING THIS PACKAGE?

WHAT ARE THE TOP 5 USE-CASES THAT WE EXPECT PEOPLE TO HAVE?

WHERE WILL THEY GO IF THEY CANNOT FIND ONE OF THOSE USE-CASES?

You can bring in all the styles for the Carbon Design System by including
`@carbon/styles` in your Sass files. For example:

```scss
@use '@carbon/styles';
```

If you only would like to bring in specific components from Carbon, you can
import them in a similar way:

```scss
@use '@carbon/styles/scss/components/accordion';
@use '@carbon/styles/scss/components/button';
@use '@carbon/styles/scss/components/checkbox';
```

You can configure various parts of the `@carbon/styles` package using the `with`
syntax alongside `@use`. For example, you can change the default theme used by
Carbon by writing the following:

```scss
@use '@carbon/styles/scss/themes';
@use '@carbon/styles/scss/theme' with (
  $theme: themes.$g100,
);
@use '@carbon/styles/scss/components/accordion';
```

In the above code snippet, we set the default theme to the `g100` theme from the
`themes` file provided by `@carbon/styles`.

Finally, to define the tokens for the theme you will need to call the `theme`
mixin in the `:root` selector. For example:

```scss
@use '@carbon/styles/scss/themes';
@use '@carbon/styles/scss/theme' with (
  $theme: themes.$g100,
);
@use '@carbon/styles/scss/components/accordion';

:root {
  @include theme.theme();
}
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

Under the hood, the value of the `$background` Sass Variable will map to the CSS
Custom Property `var(--cds-background)`. It's important to note that if you're
manipulating the value of a token that you will now need to use the `calc()` CSS
function.

```scss
@use '@carbon/styles/scss/theme';

.my-component {
  // Before
  margin: theme.$spacing-05 / 2;

  // After
  background: calc(#{theme.$spacing-05} / 2);
}
```

This file also includes [contextual tokens](#todo-link) like `$field`, `$layer`,
or `border-strong` for you to use, as well.

If you would like to change a specific [component token](#todo-link), then you
will need to configure the component import itself.

```scss
@use '@carbon/styles/scss/components/button' with (
  $button-separator: #e0e0e0,
);
```

### Theming

- How to apply a theme (a set of design tokens) to a page or component?
- how do I add my own design tokens?

#### Design Tokens

- How a value is represented, how it can be used or redefined for a project?
  - Represented: static vs CSS Custom property
  - Used:
    - @use
    - var(--cds-token-01), or $token-01
  - Changing
    - Theming
- Extending
  - how do I add my own design tokens?

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

## 📖 API Documentation

If you're looking for `@carbon/styles` API documentation, check out:

- [Sass](./docs/sass.md)

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
