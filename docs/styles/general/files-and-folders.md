# File Structure (SCSS)

`scss` directory looks like this:

```
scss
├── base-elements
├── components
├── deprecated
├── global
├── _utils.scss
├── _import-once.scss
└── styles.scss
```

* `styles.scss`: Main SCSS file that can be used in production.
This file `@import`s all SCSS files.
* `_utils.scss`: SCSS file that does not output CSS.
* `_import-once`: a `@mixin` file that ensures SCSS files are only imported once and *not* multiple times.


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

.bx--btn {
  @include btn--primary;
}

.bx--btn--secondary {
  @include btn--primary;
}


// ... truncated for brevity
```
