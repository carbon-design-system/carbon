# Sass

> Sass documentation for `@carbon/layout`

## Usage

The `@carbon/layout` package provides spacing tokens and conversion utilities
for the Carbon Design System. You can access these tokens and helpers by writing
the following:

```scss
@use '@carbon/layout';

.selector {
  margin-bottom: layout.$spacing-05;
  width: layout.rem(24px);
  height: layout.rem(24px);
}
```

## API

| Export              | Description | !default |
| :------------------ | :---------- | :------- |
| `$spacing-01`       |             | ✅       |
| `$spacing-02`       |             | ✅       |
| `$spacing-03`       |             | ✅       |
| `$spacing-04`       |             | ✅       |
| `$spacing-05`       |             | ✅       |
| `$spacing-06`       |             | ✅       |
| `$spacing-07`       |             | ✅       |
| `$spacing-08`       |             | ✅       |
| `$spacing-09`       |             | ✅       |
| `$spacing-10`       |             | ✅       |
| `$spacing-11`       |             | ✅       |
| `$spacing-12`       |             | ✅       |
| `$spacing-13`       |             | ✅       |
| `$spacing `         |             |          |
| `$fluid-spacing-01` |             | ✅       |
| `$fluid-spacing-02` |             | ✅       |
| `$fluid-spacing-03` |             | ✅       |
| `$fluid-spacing-04` |             | ✅       |
| `$fluid-spacing `   |             |          |
| `@function em`      |             |          |
| `@function rem`     |             |          |
| `$base-font-size`   |             | ✅       |

### Configuration

You can configure parts of the `@carbon/layout` package that are `!default` with
Sass Modules. For example, you can change the `$base-font-size` by writing the
following:

```scss
@use '@carbon/layout' with (
  $base-font-size: 18px
);
```
