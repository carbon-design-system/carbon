# `src/globals/scss`

**IMPORTANT NOTE**: Most of deprecated variables, mixins and functions will be
_removed_ soon after the initial `v10` release.

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [`_colors.scss`](#_colorsscss)
- [`_css--body.scss`](#_css--bodyscss)
  - [Internals](#internals)
- [`_css--font-face.scss`](#_css--font-facescss)
  - [Helvetica Neue](#helvetica-neue)
- [`_css--plex-core.scss`](#_css--plex-corescss)
- [`_css--reset.scss`](#_css--resetscss)
- [`_css--typography.scss`](#_css--typographyscss)
- [`_feature-flags.scss`](#_feature-flagsscss)
  - [Internals](#internals-1)
- [`_functions.scss`](#_functionsscss)
- [`_helper-classes.scss`](#_helper-classesscss)
- [`_helper-mixins.scss`](#_helper-mixinsscss)
  - [Internals](#internals-2)
- [`_import-once.scss`](#_import-oncescss)
- [`_layer.scss`](#_layerscss)
  - [Internal](#internal)
- [`_layout.scss`](#_layoutscss)
- [`_mixins.scss`](#_mixinsscss)
- [`_motion.scss`](#_motionscss)
- [`_spacing.scss`](#_spacingscss)
- [`_theme-tokens.scss`](#_theme-tokensscss)
- [`_theme.scss`](#_themescss)
- [`_typography.scss`](#_typographyscss)
- [`_vars.scss`](#_varsscss)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## `_colors.scss`

`$color__` variables are deprecated. Migration table available
[here](https://github.com/carbon-design-system/carbon/blob/master/docs/migration/10.x-color.md).

## `_css--body.scss`

No change

### Internals

Toggle on feature flag for `font-family` mixin

## `_css--font-face.scss`

File now relies on `@carbon/elements` for bringing in font files for IBM Plex.
It is still recommended to use a CDN for serving IBM Plex.

### Helvetica Neue

Usage of `helvetica-font-face` is deprecated. Please set `$css--plex: true`
before importing `carbon-components` to make sure IBM Plex is loaded instead of
Helvetica Neue.

No longer shipping font files for Helvetica Neue

## `_css--plex-core.scss`

Notable changes:

- IBM Plex fonts now come from Carbon Elements
- The CDN for IBM Plex font files is now Google Fonts, we still recommend using
  your own for production

| v9                        | v10                                              |
| ------------------------- | ------------------------------------------------ |
| `$font-path`              | ☠️ Removed                                       |
| `$unicodes`               | ☠️ Removed                                       |
| `$families`               | ☠️ Removed, use `$carbon--font-families` instead |
| `$fallbacks`              | ☠️ Removed, use `$carbon--font-families` instead |
| `$weights`                | ☠️ Removed, use `$carbon--font-weights` instead  |
| `check-default-font-path` | ☠️ Removed                                       |
| `plex-font-face`          | ☠️ Removed                                       |

## `_css--reset.scss`

No change

## `_css--typography.scss`

Classes have been replaced with Type styles. Below is a rough conversion table
if you would still like to use the classes.

| Type class | v9   | v10                     |
| ---------- | ---- | ----------------------- |
| Giga       | 76px | `display-03`            |
| Mega       | 54px | `display-01`            |
| Alpha      | 36px | `productive-heading-05` |
| Beta       | 28px | `productive-heading-04` |
| Gamma      | 20px | `heading-03`            |
| Delta      | 18px | `heading-02`            |
| Epsilon    | 16px | `heading-01`            |
| Zeta       | 14px | N/A                     |
| Omega      | 12px | N/A                     |
| Caption    | 12px | `caption-01`            |
| Legal      | 11px | `caption-01`            |
| Paragraph  | 16px | `body-long-02`          |

For full details, please check our
[our v10 migration guide for type.](https://github.com/carbon-design-system/carbon/blob/master/docs/migration/10.x-type.md)

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

| v9               | v10                                                                          |
| ---------------- | ---------------------------------------------------------------------------- |
| `$breakpoints`   | ☠️ Deprecated, please use `$carbon--grid-breakpoints`                        |
| `$padding`       | ☠️ Deprecated                                                                |
| `padding`        | ☠️ Deprecated                                                                |
| `breakpoint`     | ☠️ Deprecated, please use `carbon--breakpoint` instead                       |
| `max-breakpoint` | ☠️ Deprecated, please use `carbon--breakpoint-down` isntead                  |
| `grid-container` | ☠️ Deprecated, please use `carbon--grid` or `carbon--make-container` instead |
| `$z-indexes`     | No change                                                                    |
| `z`              | No change                                                                    |

## `_mixins.scss`

No change

## `_motion.scss`

New in v10. For full details, please check out our
[migration guide](https://github.com/carbon-design-system/carbon/blob/master/docs/migration/10.x-motion.md).

## `_spacing.scss`

Spacing scale no longer uses t-shirt sizing, instead uses a scale approach (ref:
https://github.com/IBM/carbon/blob/v0.0.1-beta.1/docs/migration/10.x-layout.md#migrating).

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
| spacing-2xl | 8                        |
| spacing-3xl | 9                        |
| layout-2xs  | 5                        |
| layout-xs   | 6                        |
| layout-sm   | 7                        |
| layout-md   | 8                        |
| layout-lg   | 9                        |
| layout-xl   | 11                       |
| layout-2xl  | N/A                      |

## `_theme-tokens.scss`

Migration table available
[here](https://github.com/carbon-design-system/carbon/blob/master/docs/migration/10.x-color.md).

## `_theme.scss`

No change

## `_typography.scss`

| v9                     | v10                                                         |
| ---------------------- | ----------------------------------------------------------- |
| `$font-family-*`       | ☠️ Deprecated, please use `$carbon--font-families` instead  |
| `$base-font-size`      | ☠️ Deprecated, please use `$carbon--base-font-size` instead |
| `$typescale-map`       | ☠️ Deprecated, please use `carbon--$type-scale` instead     |
| `typescale` mixin      | ☠️ Deprecated, please use `carbon--type-scale` instead      |
| `rem` mixin            | No change                                                   |
| `em` mixin             | No change                                                   |
| `helvetica` mixin      | ☠️ Deprecated                                               |
| `font-family` mixin    | ☠️ Deprecated, please use `carbon--font-family` instead     |
| `line-height` mixin    | ☠️ Deprecated                                               |
| `font-smoothing` mixin | ☠️ Deprecated                                               |
| `letter-spacing` mixin | ☠️ Deprecated                                               |
| `$font-size-map`       | ☠️ Deprecated                                               |
| `font-size` mixin      | ☠️ Deprecated                                               |

For full details, please check our
[our v10 migration guide for type.](https://github.com/carbon-design-system/carbon/blob/master/docs/migration/10.x-type.md)

## `_vars.scss`

| v9                                  | v10                            |
| ----------------------------------- | ------------------------------ |
| `$bx--ease-*` (Deprecated)          | Removed (Or defined as `null`) |
| `$bx--standard-easing` (Deprecated) | Removed (Or defined as `null`) |
