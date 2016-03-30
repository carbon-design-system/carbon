# `scss`

This is where we keep pre-compiled stylesheets.
Bluemix Components uses Sass (CSS preprocessor) with SCSS syntax.

`scss` directory looks like this:
```
scss
├── base-elements
├── components
├── global
├── _utils.scss
└── styles.scss
```

### `styles.scss`

Main SCSS file that can be used in production.
This file `@import`s all SCSS files.

### `_utils.scss`

Utilities file that only `@import`s SCSS that does not output CSS.

## How It Works

Each base-element or component folder follows this structure:
```
buttons
├── _extends.scss
├── _mixins.scss
├── _vars.scss
└── buttons.scss
```

**Partial files** are denoted with an underscore-prefixed name (`_extends.scss`, `_mixins.scss`, `_vars.scss`) - these also indicate that these files do not output any CSS when compiled.

**Consumable** files are labeled with the component/base-element name, (`buttons.scss`). These files `@import` partial files and hold class-selector styles to be consumed by users.

```scss
@import 'vars';
@import 'mixins';
@import 'extends';

.btn {
  @include btn--primary($color__btn--bg, $color__btn--bg--active);

  .light-ui & {
    @include btn--primary($color__btn--bg--light, $color__btn--bg--active--light);
  }
}

.btn--secondary {
  @include btn--secondary($color__btn--bg);

  .light-ui & {
    @include btn--secondary($color__btn--bg--light);
  }
}

// ... truncated for brevity
```
