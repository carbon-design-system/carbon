# Sass

> Sass documentation for `@carbon/type`

## Usage

The `@carbon/type` package enables you to use typography from the IBM Design
Language, including the type scale and fonts, along with typography design
tokens from the Carbon Design System. It also comes with opinionated defaults
for type styles on common elements like `h1`, `h2`, `p`, etc.

You can use this package by writing the following:

```scss
@use '@carbon/type';

// Include type reset
@include type.reset();

// Include default type styles, targets h1, h2, h3, etc
@include type.default-type();

// Include utility classes for type-related properties
@include type.type-classes();

.selector {
  // Include a type style
  @include type.type-style('productive-heading-01');
}
```

### Type classes

The `type-classes` mixin will output a collection of utility CSS that you can
use to style a given HTML element with type-related styles.

In particular, you can use the following classes:

| Class                      | Description                                                                                                                                                                                                           |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.cds--type-{font-family}` | Set the `font-family` property for the given font. This can include `mono`, `sans`, `sans-condensed`, `sans-arabic`, `sans-devanagari`, `sans-hebrew`, `sans-jp`, `sans-kr`, `sans-thai-looped`, `sans-thai`, `serif` |
| `.cds--type-{font-weight}` | Set the `font-weight` property                                                                                                                                                                                        |
| `.cds--type-italic`        | Set the `font-style` property to `italic`                                                                                                                                                                             |
| `.cds--type-{token}`       | Style the HTML element with the given type token                                                                                                                                                                      |

## API

| Export                     | Description                                                       | Link | !default |
| :------------------------- | :---------------------------------------------------------------- | :--- | :------- |
| `@mixin type-classes`      | A mixin used to emit utility type classes in CSS                  |      |          |
| `@mixin reset`             | A mixin used to emit base styles for the Carbon Design System     |      |          |
| `@mixin default-type`      | A mixin used to emit default styles for typographic HTML elements |      |          |
| `@mixin type-style`        | A mixin used to emit all declarations for a type token            |      |          |
| `$label-01`                |                                                                   |      | ✅       |
| `$legal-02`                |                                                                   |      | ✅       |
| `$helper-text-01`          |                                                                   |      | ✅       |
| `$helper-text-02`          |                                                                   |      | ✅       |
| `$body-short-01`           |                                                                   |      | ✅       |
| `$body-compact-01`         |                                                                   |      | ✅       |
| `$body-long-01`            |                                                                   |      | ✅       |
| `$body-01`                 |                                                                   |      | ✅       |
| `$body-short-02`           |                                                                   |      | ✅       |
| `$body-compact-02`         |                                                                   |      | ✅       |
| `$body-long-02`            |                                                                   |      | ✅       |
| `$body-02`                 |                                                                   |      | ✅       |
| `$code-01`                 |                                                                   |      | ✅       |
| `$code-02`                 |                                                                   |      | ✅       |
| `$heading-01`              |                                                                   |      | ✅       |
| `$productive-heading-01`   |                                                                   |      | ✅       |
| `$heading-compact-01`      |                                                                   |      | ✅       |
| `$heading-02`              |                                                                   |      | ✅       |
| `$productive-heading-02`   |                                                                   |      | ✅       |
| `$heading-compact-02`      |                                                                   |      | ✅       |
| `$productive-heading-03`   |                                                                   |      | ✅       |
| `$heading-03`              |                                                                   |      | ✅       |
| `$productive-heading-04`   |                                                                   |      | ✅       |
| `$heading-04`              |                                                                   |      | ✅       |
| `$productive-heading-05`   |                                                                   |      | ✅       |
| `$heading-05`              |                                                                   |      | ✅       |
| `$productive-heading-06`   |                                                                   |      | ✅       |
| `$heading-06`              |                                                                   |      | ✅       |
| `$productive-heading-07`   |                                                                   |      | ✅       |
| `$heading-07`              |                                                                   |      | ✅       |
| `$expressive-heading-01`   |                                                                   |      | ✅       |
| `$expressive-heading-02`   |                                                                   |      | ✅       |
| `$expressive-heading-03`   |                                                                   |      | ✅       |
| `$fluid-heading-03`        |                                                                   |      | ✅       |
| `$expressive-heading-04`   |                                                                   |      | ✅       |
| `$fluid-heading-04`        |                                                                   |      | ✅       |
| `$expressive-heading-05`   |                                                                   |      | ✅       |
| `$fluid-heading-05`        |                                                                   |      | ✅       |
| `$expressive-heading-06`   |                                                                   |      | ✅       |
| `$fluid-heading-06`        |                                                                   |      | ✅       |
| `$expressive-paragraph-01` |                                                                   |      | ✅       |
| `$fluid-paragraph-01`      |                                                                   |      | ✅       |
| `$quotation-01`            |                                                                   |      | ✅       |
| `$fluid-quotation-01`      |                                                                   |      | ✅       |
| `$quotation-02`            |                                                                   |      | ✅       |
| `$fluid-quotation-02`      |                                                                   |      | ✅       |
| `$display-01`              |                                                                   |      | ✅       |
| `$fluid-display-01`        |                                                                   |      | ✅       |
| `$display-02`              |                                                                   |      | ✅       |
| `$fluid-display-02`        |                                                                   |      | ✅       |
| `$display-03`              |                                                                   |      | ✅       |
| `$fluid-display-03`        |                                                                   |      | ✅       |
| `$display-04`              |                                                                   |      | ✅       |
| `$fluid-display-04`        |                                                                   |      | ✅       |

### Configuration

You can configure parts of the `@carbon/type` package with Sass Modules. For
example, you can change the `$prefix` used by writing the following:

```scss
@use '@carbon/type' with (
  $prefix: 'custom-prefix'
);
```

For a full list of options that you can configure, check out the table below.

| Option    | Description                                                       | Default |
| :-------- | :---------------------------------------------------------------- | :------ |
| `$prefix` | The prefix that is used in selectors, CSS Custom Properties, etc. | `'cds'` |
