# `src/globals/scss`

## `_colors.scss`

| v9                   | v10                   |
| -------------------- | --------------------- |
| `color__blue-*`      | `ibm-color__blue-*`   |
| `color__navy-gray-*` | Removed TODO skeleton |
| `color__white`       | `ibm-color__white`    |
| `color__blue-51`     | Removed               |
| `color__gray-1`      | Removed TODO skeleton |
| `color__gray-2`      | Removed               |
| `color__gray-3`      | Removed               |
| `color__teal-*`      | Removed               |
| `color__green-*`     | `ibm-color__green-*`  |
| `color__yellow-*`    | `ibm-color__yellow`   |
| `color__orange-*`    | `ibm-color__orange`   |
| `color__red-*`       | `ibm-color__red-*`    |
| `color__purple-*`    | `ibm-color__purple-*` |

## `_css--body.scss`

No change

### Internals

Toggle on feature flag for `font-family` mixin

## `_css--font-face.scss`

### Helvetica Neue

Usage of `helvetica-font-face` is deprecated. Please set `$css--plex: true`
before importing `carbon-components` to make sure IBM Plex is loaded instead of
Helvetica Neue.

No longer shipping font files for Helvetica Neue

## `_css--plex-core.scss`

| v9                        | v10                                                    |
| ------------------------- | ------------------------------------------------------ |
| `$unicodes`               | ☠️ Deprecated                                          |
| `$families`               | ☠️ Deprecated, use `font-families` from `@carbon/type` |
| `$fallbacks`              | ☠️ Deprecated, use `font-families` from `@carbon/type` |
| `$weights`                | ☠️ Deprecated, use `font-weight` from `@carbon/type`   |
| `check-default-font-path` | TODO: might want to remove?                            |

- `@font-face` declarations now come from `@carbon/type`
- Font files come from `@ibm/plex`

## `_css--reset.scss`

No change

## `_css--typography.scss`

Classes have been replaced with Type styles. TODO link to type styles. Below is
a rough conversion table if you would still like to use the classes.

| v9          | v10                     |
| ----------- | ----------------------- |
| `Giga`      | `display-03`            |
| `Mega`      | `display-01`            |
| `Alpha`     | `productive-heading-05` |
| `Beta`      | `productive-heading-04` |
| `Gamma`     | `heading-03`            |
| `Delta`     | `heading-02`            |
| `Epsilon`   | `heading-01`            |
| `Zeta`      | N/A                     |
| `Omega`     | N/A                     |
| `Caption`   | `caption-01`            |
| `Legal`     | `caption-01`            |
| `Paragraph` | `body-long-02`          |

## `_feature-flags.scss`

No change

### Internals

- Remove experimental grid options
- Eventually remove feature flags

## `_functions.scss`

No change

## `_helper-classes.scss`

No change

## `_helper-mixins.scss`

- `light-ui` removed

### Internals

- Remove `light-ui`
- Replace usage of `brand-01`

## `_import-once.scss`

No change

## `_layer.scss`

No change

### Internal

- Change box shadow color to read from token

## `_layout.scss`

Replaced with `@carbon/grid`

| v9               | v10                 | Changes                                     |
| ---------------- | ------------------- | ------------------------------------------- |
| `$breakpoints`   | `$grid-breakpoints` | Renamed breakpoints to sm, md, lg, xlg, max |
| `$padding`       | ☠️ Deprecated       |                                             |
| `padding`        | ☠️ Deprecated       |                                             |
| `breakpoint`     | ☠️ Deprecated       | Moved to `@carbon/grid`                     |
| `max-breakpoint` | ☠️ Deprecated       | Moved to `@carbon/grid`                     |
| `grid-container` | ☠️ Deprecated       | TODO                                        |
| `$z-indexes`     | No change           |                                             |
| `z`              | No change           |                                             |

## `_mixins.scss`

No change

## `_spacing.scss`

Spacing scale no longer uses t-shirt sizing, instead uses a scale approach.

| v9          | v10 (spacing scale step) |
| ----------- | ------------------------ |
| spacing-4xs | 0                        |
| spacing-3xs | 1                        |
| spacing-2xs | 2                        |
| spacing-xs  | 3                        |
| spacing-sm  | 4                        |
| spacing-md  | 5                        |
| spacing-lg  | 6                        |
| spacing-xl  | 7                        |
| spacing-2xl | N/A                      |
| spacing-3xl | 8                        |
| layout-2xs  | 5                        |
| layout-xs   | 6                        |
| layout-sm   | 7                        |
| layout-md   | 8                        |
| layout-lg   | 9                        |
| layout-xl   | 11                       |
| layout-2xl  | N/A                      |

## `_theme-tokens.scss`

Legend:

- ✨ New
- ☠️ Deprecated (to be removed next version)

| v9                 | v10                          |
| ------------------ | ---------------------------- |
| brand-01           | replaced with interactive-01 |
| brand-02           | replaced with interactive-02 |
| brand-03           | replaced with interactive-03 |
| ui-01              | No change                    |
| ui-02              | No change                    |
| ui-03              | No change                    |
| ui-04              | No change                    |
| ui-05              | No change                    |
|                    |  ✨ ui-background            |
| text-01            | No change                    |
| text-02            | No change                    |
| text-03            | No change                    |
|                    | ✨ text-04                   |
| inverse-01         | No change                    |
| inverse-02         | No change                    |
| field-01           | No change                    |
| field-02           | No change                    |
| support-01         | No change                    |
| support-02         | No change                    |
| support-03         | No change                    |
| support-04         | No change                    |
| nav-01             | ☠️ Deprecated                |
| nav-02             | ☠️ Deprecated                |
| nav-03             | ☠️ Deprecated                |
| nav-04             | ☠️ Deprecated                |
| nav-05             | ☠️ Deprecated                |
| nav-06             | ☠️ Deprecated                |
| nav-07             | ☠️ Deprecated                |
| nav-08             | ☠️ Deprecated                |
|                    | ✨ focus                     |
| hover-primary      | No change                    |
|                    | ✨ active-primary            |
| hover-primary-text | No change                    |
| hover-secondary    | No change                    |
|                    | ✨ active-secondary          |
|                    | ✨hover-tertiary             |
|                    | ✨active-tertiary            |
| hover-field        | ☠️ Deprecated, use hover-ui  |
|                    | ✨hover-ui                   |
| active-01          | ☠️ Deprecated, use active-ui |
|                    | ✨active-ui                  |
|                    | ✨selected-ui                |
|                    | ✨hover-selected-ui          |
| hover-danger       | No change                    |
|                    | ✨active-danger              |
| hover-row          | No change                    |
|                    | ✨visited-link               |
|                    | ✨disabled-01                |
|                    | ✨disabled-02                |
|                    | ✨disabled-03                |

## `_theme.scss`

No change

## `_typography.scss`

| v9                     | v10                                                     |
| ---------------------- | ------------------------------------------------------- |
| `$font-family-*`       | Deprecated, use `font-families` map from `@carbon/type` |
| `$base-font-size`      | Comes from `@carbon/layout/scss/convert`                |
| `$typescale-map`       | Replaced with `$type-scale` from `@carbon/type`         |
| `typescale` mixin      | Replaced with `type-scale` from `@carbon/type`          |
| `rem` mixin            | Moved to `@carbon/layout/scss/convert`                  |
| `em` mixin             | Moved to `@carbon/layout/scss/convert`                  |
| `helvetica` mixin      | ☠️ Deprecated                                           |
| `font-family` mixin    | ☠️ Deprecated, use `font-family` from `@carbon/type`    |
| `line-height` mixin    | ☠️ Deprecated                                           |
| `font-smoothing` mixin | ☠️ Deprecated                                           |
| `letter-spacing` mixin | ☠️ Deprecated                                           |
| `$font-size-map`       | ☠️ Deprecated, use `type-scale` from `@carbon/type`     |
| `font-size` mixin      | ☠️ Deprecated, use `font-size` from `@carbon/type`      |

## `_vars.scss`

| v9                                  | v10                            |
| ----------------------------------- | ------------------------------ |
| `$bx--ease-*` (Deprecated)          | Removed (Or defined as `null`) |
| `$bx--standard-easing` (Deprecated) | Removed (Or defined as `null`) |

TODO motion table
