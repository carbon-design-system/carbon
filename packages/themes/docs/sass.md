# `@carbon/themes`

> Sass documentation for `@carbon/themes`

## Usage

There are several entrypoints that you can use with `@carbon/themes`, including:

| Filename                                    | Description                                            |
| ------------------------------------------- | ------------------------------------------------------ |
| `@use '@carbon/themes';`                    | Package entrypoint                                     |
| `@use '@carbon/themes/scss/config';`        | Specify config options for the package                 |
| `@use '@carbon/themes/scss/themes';`        | Theme definitions for white, g10, g90, and g100        |
| `@use '@carbon/themes/scss/theme';`         | Set the current theme, get token values from the theme |
| `@use '@carbon/themes/scss/tokens';`        | Access theme tokens                                    |
| `@use '@carbon/themes/scss/compat/themes';` | v10 Theme definitions for white, g10, g90, and g100    |
| `@use '@carbon/themes/scss/compat/tokens';` | v10 theme tokens                                       |

_Note: the white, g10, g90, and g100 themes are only available in the
`scss/themes` file and are not re-exported in `@carbon/themes`. To learn more,
checkout our [FAQ](#why-are-the-themes-not-exported-in-carbonthemes)._

You can bring in `@carbon/themes` by using `@use`:

```scss
@use '@carbon/themes';

.my-component {
  // Use tokens from the theme, this will map to a CSS Custom Property
  color: themes.$token-01;
}

:root {
  // Emit CSS Custom Properties for the current theme
  @include themes.theme();
}

// Get the value of a specific token
$custom-variable: rgba(themes.get('token-01'), 0.25);
```

You can configure the current theme with the `$theme` option:

```scss
@use '@carbon/themes/scss/themes' as *;
@use '@carbon/themes' with (
  $theme: $g100
);
```

You can also extend the theme with your own custom tokens:

```scss
@use '@carbon/themes/scss/themes';
@use '@carbon/themes' with (
  $fallback: themes.$g100,
  $theme: (
    token-01: #000000,
  )
);
```

## API

| Import                       | Export                       | Description                                                                           | !default |
| :--------------------------- | :--------------------------- | :------------------------------------------------------------------------------------ | :------- |
| `@carbon/themes/scss/themes` |                              |                                                                                       |          |
|                              | `$white`                     |                                                                                       | ✅       |
|                              | `$g10`                       |                                                                                       | ✅       |
|                              | `$g90`                       |                                                                                       | ✅       |
|                              | `$g100`                      |                                                                                       | ✅       |
| `@carbon/themes`             |                              | The default entrypoint which re-exports values from all other modules in this package |          |
|                              | `$fallback`                  |                                                                                       | ✅       |
|                              | `$theme`                     |                                                                                       | ✅       |
|                              | `$background`                |                                                                                       | ✅       |
|                              | `$background-active`         |                                                                                       | ✅       |
|                              | `$background-selected`       |                                                                                       | ✅       |
|                              | `$background-selected-hover` |                                                                                       | ✅       |
|                              | `$background-hover`          |                                                                                       | ✅       |
|                              | `$background-brand`          |                                                                                       | ✅       |
|                              | `$background-inverse`        |                                                                                       | ✅       |
|                              | `$background-inverse-hover`  |                                                                                       | ✅       |
|                              | `$layer-01`                  |                                                                                       | ✅       |
|                              | `$layer-active-01`           |                                                                                       | ✅       |
|                              | `$layer-hover-01`            |                                                                                       | ✅       |
|                              | `$layer-selected-01`         |                                                                                       | ✅       |
|                              | `$layer-selected-hover-01`   |                                                                                       | ✅       |
|                              | `$layer-02`                  |                                                                                       | ✅       |
|                              | `$layer-active-02`           |                                                                                       | ✅       |
|                              | `$layer-hover-02`            |                                                                                       | ✅       |
|                              | `$layer-selected-02`         |                                                                                       | ✅       |
|                              | `$layer-selected-hover-02`   |                                                                                       | ✅       |
|                              | `$layer-03`                  |                                                                                       | ✅       |
|                              | `$layer-active-03`           |                                                                                       | ✅       |
|                              | `$layer-hover-03`            |                                                                                       | ✅       |
|                              | `$layer-selected-03`         |                                                                                       | ✅       |
|                              | `$layer-selected-hover-03`   |                                                                                       | ✅       |
|                              | `$layer-selected-inverse`    |                                                                                       | ✅       |
|                              | `$layer-selected-disabled`   |                                                                                       | ✅       |
|                              | `$layer-accent-01`           |                                                                                       | ✅       |
|                              | `$layer-accent-active-01`    |                                                                                       | ✅       |
|                              | `$layer-accent-hover-01`     |                                                                                       | ✅       |
|                              | `$layer-accent-02`           |                                                                                       | ✅       |
|                              | `$layer-accent-active-02`    |                                                                                       | ✅       |
|                              | `$layer-accent-hover-02`     |                                                                                       | ✅       |
|                              | `$layer-accent-03`           |                                                                                       | ✅       |
|                              | `$layer-accent-active-03`    |                                                                                       | ✅       |
|                              | `$layer-accent-hover-03`     |                                                                                       | ✅       |
|                              | `$field-01`                  |                                                                                       | ✅       |
|                              | `$field-hover-01`            |                                                                                       | ✅       |
|                              | `$field-02`                  |                                                                                       | ✅       |
|                              | `$field-hover-02`            |                                                                                       | ✅       |
|                              | `$field-03`                  |                                                                                       | ✅       |
|                              | `$field-hover-03`            |                                                                                       | ✅       |
|                              | `$interactive`               |                                                                                       | ✅       |
|                              | `$border-subtle-00`          |                                                                                       | ✅       |
|                              | `$border-subtle-01`          |                                                                                       | ✅       |
|                              | `$border-subtle-selected-01` |                                                                                       | ✅       |
|                              | `$border-subtle-02`          |                                                                                       | ✅       |
|                              | `$border-subtle-selected-02` |                                                                                       | ✅       |
|                              | `$border-subtle-03`          |                                                                                       | ✅       |
|                              | `$border-subtle-selected-03` |                                                                                       | ✅       |
|                              | `$border-strong-01`          |                                                                                       | ✅       |
|                              | `$border-strong-02`          |                                                                                       | ✅       |
|                              | `$border-strong-03`          |                                                                                       | ✅       |
|                              | `$border-inverse`            |                                                                                       | ✅       |
|                              | `$border-interactive`        |                                                                                       | ✅       |
|                              | `$border-disabled`           |                                                                                       | ✅       |
|                              | `$text-primary`              |                                                                                       | ✅       |
|                              | `$text-secondary`            |                                                                                       | ✅       |
|                              | `$text-placeholder`          |                                                                                       | ✅       |
|                              | `$text-helper`               |                                                                                       | ✅       |
|                              | `$text-error`                |                                                                                       | ✅       |
|                              | `$text-inverse`              |                                                                                       | ✅       |
|                              | `$text-on-color`             |                                                                                       | ✅       |
|                              | `$text-on-color-disabled`    |                                                                                       | ✅       |
|                              | `$text-disabled`             |                                                                                       | ✅       |
|                              | `$link-primary`              |                                                                                       | ✅       |
|                              | `$link-primary-hover`        |                                                                                       | ✅       |
|                              | `$link-secondary`            |                                                                                       | ✅       |
|                              | `$link-inverse`              |                                                                                       | ✅       |
|                              | `$link-visited`              |                                                                                       | ✅       |
|                              | `$icon-primary`              |                                                                                       | ✅       |
|                              | `$icon-secondary`            |                                                                                       | ✅       |
|                              | `$icon-inverse`              |                                                                                       | ✅       |
|                              | `$icon-on-color`             |                                                                                       | ✅       |
|                              | `$icon-on-color-disabled`    |                                                                                       | ✅       |
|                              | `$icon-disabled`             |                                                                                       | ✅       |
|                              | `$support-error`             |                                                                                       | ✅       |
|                              | `$support-success`           |                                                                                       | ✅       |
|                              | `$support-warning`           |                                                                                       | ✅       |
|                              | `$support-info`              |                                                                                       | ✅       |
|                              | `$support-error-inverse`     |                                                                                       | ✅       |
|                              | `$support-success-inverse`   |                                                                                       | ✅       |
|                              | `$support-warning-inverse`   |                                                                                       | ✅       |
|                              | `$support-info-inverse`      |                                                                                       | ✅       |
|                              | `$support-caution-major`     |                                                                                       | ✅       |
|                              | `$support-caution-minor`     |                                                                                       | ✅       |
|                              | `$support-caution-undefined` |                                                                                       | ✅       |
|                              | `$highlight`                 |                                                                                       | ✅       |
|                              | `$overlay`                   |                                                                                       | ✅       |
|                              | `$toggle-off`                |                                                                                       | ✅       |
|                              | `$shadow`                    |                                                                                       | ✅       |
|                              | `$focus`                     |                                                                                       | ✅       |
|                              | `$focus-inset`               |                                                                                       | ✅       |
|                              | `$focus-inverse`             |                                                                                       | ✅       |
|                              | `$skeleton-background`       |                                                                                       | ✅       |
|                              | `$skeleton-element`          |                                                                                       | ✅       |

### Configuration

## FAQ

### Why are the themes not exported in `@carbon/themes`?

In order to support `@use '@carbon/themes' with` in Sass Modules, unfortunately
we cannot re-export the themes available in `scss/modules/themes`. If we
implemented the entrypoint at `@carbon/themes` to re-export that module, then
Sass would not compile when doing the following:

```scss
@use '@carbon/themes/scss/modules/themes';
@use '@carbon/themes' with (
  $theme: themes.$g100
);
```

This is because the `scss/modules/themes` file will have been initialized twice
which is not allowed in the Sass Module system.
