# Sass

> Sass documentation for `@carbon/elements`

## Usage

The `@carbon/elements` package re-exports from other packages that make up the
IBM Design Language. You can import and use this package by writing the
following:

```scss
@use '@carbon/elements';

.selector {
  background: elements.$blue-50;
}
```

For more information about what is re-exported, view the documentation for the
individual packages. Each public export from these packages will be available in
`@carbon/elements`.

| Package          | README                         | Sass                              |
| :--------------- | :----------------------------- | :-------------------------------- |
| `@carbon/colors` | [Link](../../colors/README.md) | [Link](../../colors/docs/sass.md) |
| `@carbon/grid`   | [Link](../../grid/README.md)   | [Link](../../grid/docs/sass.md)   |
| `@carbon/layout` | [Link](../../layout/README.md) | [Link](../../layout/docs/sass.md) |
| `@carbon/motion` | [Link](../../motion/README.md) | [Link](../../motion/docs/sass.md) |
| `@carbon/themes` | [Link](../../themes/README.md) | [Link](../../themes/docs/sass.md) |
| `@carbon/type`   | [Link](../../type/README.md)   | [Link](../../type/docs/sass.md)   |
