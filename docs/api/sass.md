# Sass API

| Mark | Description                                                |
| ---- | ---------------------------------------------------------- |
| ✅   | Public functions, mixins, placeholders, and variables      |
| ❌   | Private items - not supported outside package's build      |
| ⚠️   | Deprecated items - may not be available in future releases |

<!-- toc -->

- [\$padding map](#padding-map)
  - [✅⚠️// .container [css]](#----container-css)
- [\$z-indexes](#z-indexes)
  - [✅// .modal [css]](#----modal-css)
- [@function padding();](#function-padding)
  - [❌⚠️padding [variable]](#padding-variable)
- [@function z();](#function-z)
  - [❌z-indexes [variable]](#z-indexes-variable)
- [@mixin breakpoint/max-breakpoint](#mixin-breakpointmax-breakpoint)
  - [❌⚠️breakpoints [variable]](#breakpoints-variable)
- [layer](#layer)
  - [❌box-shadow [variable]](#box-shadow-variable)
  - [❌layer-shadows [variable]](#layer-shadows-variable)
  - [✅layer [mixin]](#layer-mixin)
- [plex-font-face](#plex-font-face)
  - [❌⚠️unicodes [variable]](#unicodes-variable)
  - [❌⚠️families [variable]](#families-variable)
  - [❌⚠️fallbacks [variable]](#fallbacks-variable)
  - [❌⚠️weights [variable]](#weights-variable)
- [spacing/layout tokens](#spacinglayout-tokens)
  - [✅spacing-baseline [variable]](#spacing-baseline-variable)
- [typography](#typography)
  - [✅⚠️font-family-mono [variable]](#font-family-mono-variable)
  - [✅⚠️base-font-size [variable]](#base-font-size-variable)
  - [✅⚠️typescale-map [variable]](#typescale-map-variable)
  - [✅⚠️typescale [mixin]](#typescale-mixin)
  - [✅⚠️helvetica [mixin]](#helvetica-mixin)
  - [✅⚠️font-family [mixin]](#font-family-mixin)
- [general](#general)
  - [❌data-table-suffix [variable]](#data-table-suffix-variable)
  - [❌data-table-suffix [variable]](#data-table-suffix-variable)
  - [✅mini-units [function]](#mini-units-function)
  - [✅experimental-focus [mixin]](#experimental-focus-mixin)
  - [✅text-overflow [mixin]](#text-overflow-mixin)
  - [✅expanded [mixin]](#expanded-mixin)
  - [✅⚠️color\_\_blue-20 [variable]](#color__blue-20-variable)
  - [✅⚠️color\_\_blue-30 [variable]](#color__blue-30-variable)
  - [✅⚠️color\_\_blue-40 [variable]](#color__blue-40-variable)
  - [✅⚠️color\_\_blue-50 [variable]](#color__blue-50-variable)
  - [✅⚠️color\_\_blue-90 [variable]](#color__blue-90-variable)
  - [✅⚠️color\_\_navy-gray-1 [variable]](#color__navy-gray-1-variable)
  - [✅⚠️color\_\_navy-gray-2 [variable]](#color__navy-gray-2-variable)
  - [✅⚠️color\_\_navy-gray-3 [variable]](#color__navy-gray-3-variable)
  - [✅⚠️color\_\_navy-gray-4 [variable]](#color__navy-gray-4-variable)
  - [✅⚠️color\_\_navy-gray-5 [variable]](#color__navy-gray-5-variable)
  - [✅⚠️color\_\_navy-gray-6 [variable]](#color__navy-gray-6-variable)
  - [✅⚠️color\_\_navy-gray-7 [variable]](#color__navy-gray-7-variable)
  - [✅⚠️color\_\_navy-gray-8 [variable]](#color__navy-gray-8-variable)
  - [✅⚠️color\_\_navy-gray-9 [variable]](#color__navy-gray-9-variable)
  - [✅⚠️color\_\_white [variable]](#color__white-variable)
  - [✅⚠️color\_\_blue-51 [variable]](#color__blue-51-variable)
  - [✅⚠️color\_\_gray-1 [variable]](#color__gray-1-variable)
  - [✅⚠️color\_\_gray-2 [variable]](#color__gray-2-variable)
  - [✅⚠️color\_\_gray-3 [variable]](#color__gray-3-variable)
  - [✅⚠️color\_\_blue-10 [variable]](#color__blue-10-variable)
  - [✅⚠️color\_\_blue-60 [variable]](#color__blue-60-variable)
  - [✅⚠️color\_\_teal-10 [variable]](#color__teal-10-variable)
  - [✅⚠️color\_\_teal-20 [variable]](#color__teal-20-variable)
  - [✅⚠️color\_\_teal-30 [variable]](#color__teal-30-variable)
  - [✅⚠️color\_\_teal-40 [variable]](#color__teal-40-variable)
  - [✅⚠️color\_\_teal-50 [variable]](#color__teal-50-variable)
  - [✅⚠️color\_\_teal-60 [variable]](#color__teal-60-variable)
  - [✅⚠️color\_\_green-10 [variable]](#color__green-10-variable)
  - [✅⚠️color\_\_green-20 [variable]](#color__green-20-variable)
  - [✅⚠️color\_\_green-30 [variable]](#color__green-30-variable)
  - [✅⚠️color\_\_green-40 [variable]](#color__green-40-variable)
  - [✅⚠️color\_\_green-50 [variable]](#color__green-50-variable)
  - [✅⚠️color\_\_green-60 [variable]](#color__green-60-variable)
  - [✅⚠️color\_\_yellow-10 [variable]](#color__yellow-10-variable)
  - [✅⚠️color\_\_yellow-20 [variable]](#color__yellow-20-variable)
  - [✅⚠️color\_\_yellow-30 [variable]](#color__yellow-30-variable)
  - [✅⚠️color\_\_yellow-60 [variable]](#color__yellow-60-variable)
  - [✅⚠️color\_\_orange-10 [variable]](#color__orange-10-variable)
  - [✅⚠️color\_\_orange-20 [variable]](#color__orange-20-variable)
  - [✅⚠️color\_\_orange-30 [variable]](#color__orange-30-variable)
  - [✅⚠️color\_\_orange-60 [variable]](#color__orange-60-variable)
  - [✅⚠️color\_\_red-10 [variable]](#color__red-10-variable)
  - [✅⚠️color\_\_red-30 [variable]](#color__red-30-variable)
  - [✅⚠️color\_\_red-40 [variable]](#color__red-40-variable)
  - [✅⚠️color\_\_red-50 [variable]](#color__red-50-variable)
  - [✅⚠️color\_\_red-60 [variable]](#color__red-60-variable)
  - [✅⚠️color\_\_purple-10 [variable]](#color__purple-10-variable)
  - [✅⚠️color\_\_purple-20 [variable]](#color__purple-20-variable)
  - [✅⚠️color\_\_purple-30 [variable]](#color__purple-30-variable)
  - [✅⚠️color\_\_purple-40 [variable]](#color__purple-40-variable)
  - [✅⚠️color\_\_purple-60 [variable]](#color__purple-60-variable)
  - [❌css-body [mixin]](#css-body-mixin)
  - [❌css-body--x [mixin]](#css-body--x-mixin)
  - [✅⚠️helvetica-font-face [mixin]](#helvetica-font-face-mixin)
  - [✅css-helpers [mixin]](#css-helpers-mixin)
  - [✅⚠️check-default-font-path [mixin]](#check-default-font-path-mixin)
  - [✅⚠️plex-font-face [mixin]](#plex-font-face-mixin)
  - [✅reset [mixin]](#reset-mixin)
  - [✅⚠️typography [mixin]](#typography-mixin)
  - [✅deprecate [mixin]](#deprecate-mixin)
  - [✅feature-flags [variable]](#feature-flags-variable)
  - [❌default-feature-flags [variable]](#default-feature-flags-variable)
  - [❌did-warn-diverged-feature-flags [variable]](#did-warn-diverged-feature-flags-variable)
  - [❌merge-feature-flags [function]](#merge-feature-flags-function)
  - [✅feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [✅text-overflow [mixin]](#text-overflow-mixin)
  - [✅placeholder-colors [mixin]](#placeholder-colors-mixin)
  - [✅box-shadow [mixin]](#box-shadow-mixin)
  - [✅focus-outline [mixin]](#focus-outline-mixin)
  - [✅rotate [mixin]](#rotate-mixin)
  - [✅hidden [mixin]](#hidden-mixin)
  - [✅button-reset [mixin]](#button-reset-mixin)
  - [✅skeleton [mixin]](#skeleton-mixin)
  - [✅⚠️light-ui [mixin]](#light-ui-mixin)
  - [✅⚠️// @include breakpoint(bp--md--major) [css]](#----include-breakpointbp--md--major-css)
  - [✅⚠️max-breakpoint [mixin]](#max-breakpoint-mixin)
  - [✅⚠️grid-container [mixin]](#grid-container-mixin)
  - [✅carbon--ease-in [variable]](#carbon--ease-in-variable)
  - [✅carbon--ease-out [variable]](#carbon--ease-out-variable)
  - [✅carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [✅transition--base [variable]](#transition--base-variable)
  - [✅transition--expansion [variable]](#transition--expansion-variable)
  - [✅duration--fast-01 [variable]](#duration--fast-01-variable)
  - [✅⚠️bx--ease-in [variable]](#bx--ease-in-variable)
  - [✅⚠️bx--ease-out [variable]](#bx--ease-out-variable)
  - [✅⚠️bx--standard-easing [variable]](#bx--standard-easing-variable)
  - [✅motion [function]](#motion-function)
  - [✅motion [mixin]](#motion-mixin)
  - [✅// .box [css]](#----box-css)
  - [✅layout-2xs [variable]](#layout-2xs-variable)
  - [❌carbon--theme--v9 [variable]](#carbon--theme--v9-variable)
  - [✅carbon--theme [variable]](#carbon--theme-variable)
  - [✅nav-01 [variable]](#nav-01-variable)
  - [✅input-border [variable]](#input-border-variable)
  - [✅button-font-weight [variable]](#button-font-weight-variable)
  - [✅accordion-flex-direction [variable]](#accordion-flex-direction-variable)
  - [✅card-text-align [variable]](#card-text-align-variable)
  - [✅checkbox-border-width [variable]](#checkbox-border-width-variable)
  - [✅snippet-background-color [variable]](#snippet-background-color-variable)
  - [✅content-switcher-border-radius [variable]](#content-switcher-border-radius-variable)
  - [✅data-table-heading-transform [variable]](#data-table-heading-transform-variable)
  - [✅modal-border-top [variable]](#modal-border-top-variable)
  - [✅progress-indicator-bar-width [variable]](#progress-indicator-bar-width-variable)
  - [✅radio-border-width [variable]](#radio-border-width-variable)
  - [✅structured-list-padding [variable]](#structured-list-padding-variable)
  - [✅skeleton [variable]](#skeleton-variable)
  - [✅edited [variable]](#edited-variable)
  - [✅input-border [variable]](#input-border-variable)
  - [✅link-visited [variable]](#link-visited-variable)
  - [✅tooltip-background-color [variable]](#tooltip-background-color-variable)
  - [✅button-font-weight [variable]](#button-font-weight-variable)
  - [✅accordion-flex-direction [variable]](#accordion-flex-direction-variable)
  - [✅card-text-align [variable]](#card-text-align-variable)
  - [✅checkbox-border-width [variable]](#checkbox-border-width-variable)
  - [✅snippet-background-color [variable]](#snippet-background-color-variable)
  - [✅content-switcher-border-radius [variable]](#content-switcher-border-radius-variable)
  - [✅data-table-heading-transform [variable]](#data-table-heading-transform-variable)
  - [✅date-picker-in-range-background-color [variable]](#date-picker-in-range-background-color-variable)
  - [✅modal-border-top [variable]](#modal-border-top-variable)
  - [✅notification-info-background-color [variable]](#notification-info-background-color-variable)
  - [✅progress-indicator-bar-width [variable]](#progress-indicator-bar-width-variable)
  - [✅copy-active [variable]](#copy-active-variable)
  - [✅radio-border-width [variable]](#radio-border-width-variable)
  - [✅structured-list-padding [variable]](#structured-list-padding-variable)
  - [✅tab-underline-color [variable]](#tab-underline-color-variable)
  - [✅skeleton [variable]](#skeleton-variable)
  - [✅⚠️hover-field [variable]](#hover-field-variable)
  - [✅⚠️font-family-sans-serif [variable]](#font-family-sans-serif-variable)
  - [✅⚠️font-family-serif [variable]](#font-family-serif-variable)
  - [✅⚠️font-family-helvetica [variable]](#font-family-helvetica-variable)
  - [✅⚠️rem [function]](#rem-function)
  - [✅⚠️em [function]](#em-function)
  - [✅⚠️line-height [mixin]](#line-height-mixin)
  - [✅⚠️font-smoothing [mixin]](#font-smoothing-mixin)
  - [✅⚠️letter-spacing [mixin]](#letter-spacing-mixin)
  - [✅⚠️font-size-map [variable]](#font-size-map-variable)
  - [✅⚠️font-size [mixin]](#font-size-mixin)
  - [✅type-style [mixin]](#type-style-mixin)
  - [✅prefix [variable]](#prefix-variable)
  - [✅css--font-face [variable]](#css--font-face-variable)
  - [✅⚠️css--use-experimental-grid [variable]](#css--use-experimental-grid-variable)
  - [✅⚠️css--use-experimental-grid-fallback [variable]](#css--use-experimental-grid-fallback-variable)
  - [❌deprecations--entry [variable]](#deprecations--entry-variable)
  - [✅/// Used to intialize the default properties for a column class, most notably](#-used-to-intialize-the-default-properties-for-a-column-class-most-notably)
  - [❌carbon--make-col-ready [mixin]](#carbon--make-col-ready-mixin)
  - [❌carbon--make-col [mixin]](#carbon--make-col-mixin)
  - [❌carbon--make-col-offset [mixin]](#carbon--make-col-offset-mixin)
  - [❌carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)
  - [✅/// Define the properties for a selector assigned to a row in the grid system.](#-define-the-properties-for-a-selector-assigned-to-a-row-in-the-grid-system)
  - [❌carbon--make-row [mixin]](#carbon--make-row-mixin)
  - [✅/// Add no-gutter and no-gutter-- [css]](#-add-no-gutter-and-no-gutter---css)
  - [❌carbon--no-gutter [mixin]](#carbon--no-gutter-mixin)
  - [✅/// Add hang--left and hang--right classes for a given gutter. These classes are](#-add-hang--left-and-hang--right-classes-for-a-given-gutter-these-classes-are)
  - [❌carbon--hang [mixin]](#carbon--hang-mixin)
  - [✅carbon--aspect-ratios [variable]](#carbon--aspect-ratios-variable)
  - [✅/// The aspect ratios that are used to generate corresponding aspect ratio](#-the-aspect-ratios-that-are-used-to-generate-corresponding-aspect-ratio)
  - [❌carbon--aspect-ratio [mixin]](#carbon--aspect-ratio-mixin)
  - [✅/// Create the container for a grid. Will cause full-bleed for the grid unless](#-create-the-container-for-a-grid-will-cause-full-bleed-for-the-grid-unless)
  - [❌carbon--make-container [mixin]](#carbon--make-container-mixin)
  - [❌carbon--set-largest-breakpoint [mixin]](#carbon--set-largest-breakpoint-mixin)
  - [❌carbon--make-container-max-widths [mixin]](#carbon--make-container-max-widths-mixin)
  - [✅carbon--grid [mixin]](#carbon--grid-mixin)
  - [✅exports [mixin]](#exports-mixin)
  - [✅carbon--breakpoint-next [function]](#carbon--breakpoint-next-function)
  - [✅carbon--is-smallest-breakpoint [function]](#carbon--is-smallest-breakpoint-function)
  - [✅carbon--largest-breakpoint-name [function]](#carbon--largest-breakpoint-name-function)
  - [✅carbon--breakpoint-infix [function]](#carbon--breakpoint-infix-function)
  - [✅carbon--breakpoint-up [mixin]](#carbon--breakpoint-up-mixin)
  - [✅carbon--breakpoint-down [mixin]](#carbon--breakpoint-down-mixin)
  - [✅carbon--breakpoint-between [mixin]](#carbon--breakpoint-between-mixin)
  - [✅carbon--largest-breakpoint [mixin]](#carbon--largest-breakpoint-mixin)
  - [✅carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [✅carbon--rem [function]](#carbon--rem-function)
  - [✅carbon--em [function]](#carbon--em-function)
  - [✅carbon--get-column-width [function]](#carbon--get-column-width-function)
  - [✅carbon--key-height [function]](#carbon--key-height-function)
  - [✅carbon--mini-units [function]](#carbon--mini-units-function)
  - [✅map-deep-get [function]](#map-deep-get-function)
  - [✅carbon--key-by-index [function]](#carbon--key-by-index-function)
  - [✅last-map-item [function]](#last-map-item-function)
  - [✅carbon--easings [variable]](#carbon--easings-variable)
  - [✅carbon--motion [function]](#carbon--motion-function)
  - [✅carbon--motion [mixin]](#carbon--motion-mixin)
  - [✅carbon--theme [mixin]](#carbon--theme-mixin)
  - [✅carbon--font-families [variable]](#carbon--font-families-variable)
  - [✅carbon--font-family [function]](#carbon--font-family-function)
  - [✅carbon--font-family [mixin]](#carbon--font-family-mixin)
  - [✅carbon--font-weights [variable]](#carbon--font-weights-variable)
  - [✅carbon--font-weight [function]](#carbon--font-weight-function)
  - [✅carbon--font-weight [mixin]](#carbon--font-weight-mixin)
  - [✅carbon--type-reset [mixin]](#carbon--type-reset-mixin)
  - [✅carbon--get-type-size [function]](#carbon--get-type-size-function)
  - [✅carbon--type-scale [variable]](#carbon--type-scale-variable)
  - [✅carbon--type-scale [function]](#carbon--type-scale-function)
  - [✅carbon--type-scale [mixin]](#carbon--type-scale-mixin)
  - [✅carbon--font-size [mixin]](#carbon--font-size-mixin)
  - [✅fluid-type [mixin]](#fluid-type-mixin)
  - [✅fluid-type-size [mixin]](#fluid-type-size-mixin)
  - [✅carbon--type-style [mixin]](#carbon--type-style-mixin)
  - [✅/// Used to intialize the default properties for a column class, most notably](#-used-to-intialize-the-default-properties-for-a-column-class-most-notably)
  - [❌carbon--make-col-ready [mixin]](#carbon--make-col-ready-mixin)
  - [❌carbon--make-col [mixin]](#carbon--make-col-mixin)
  - [❌carbon--make-col-offset [mixin]](#carbon--make-col-offset-mixin)
  - [❌carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)
  - [✅/// Define the properties for a selector assigned to a row in the grid system.](#-define-the-properties-for-a-selector-assigned-to-a-row-in-the-grid-system)
  - [❌carbon--make-row [mixin]](#carbon--make-row-mixin)
  - [✅/// Add no-gutter and no-gutter-- [css]](#-add-no-gutter-and-no-gutter---css)
  - [❌carbon--no-gutter [mixin]](#carbon--no-gutter-mixin)
  - [✅/// Add hang--left and hang--right classes for a given gutter. These classes are](#-add-hang--left-and-hang--right-classes-for-a-given-gutter-these-classes-are)
  - [❌carbon--hang [mixin]](#carbon--hang-mixin)
  - [✅carbon--aspect-ratios [variable]](#carbon--aspect-ratios-variable)
  - [✅/// The aspect ratios that are used to generate corresponding aspect ratio](#-the-aspect-ratios-that-are-used-to-generate-corresponding-aspect-ratio)
  - [❌carbon--aspect-ratio [mixin]](#carbon--aspect-ratio-mixin)
  - [✅/// Create the container for a grid. Will cause full-bleed for the grid unless](#-create-the-container-for-a-grid-will-cause-full-bleed-for-the-grid-unless)
  - [❌carbon--make-container [mixin]](#carbon--make-container-mixin)
  - [❌carbon--set-largest-breakpoint [mixin]](#carbon--set-largest-breakpoint-mixin)
  - [❌carbon--make-container-max-widths [mixin]](#carbon--make-container-max-widths-mixin)
  - [✅carbon--grid [mixin]](#carbon--grid-mixin)
  - [✅exports [mixin]](#exports-mixin)
  - [✅carbon--breakpoint-next [function]](#carbon--breakpoint-next-function)
  - [✅carbon--is-smallest-breakpoint [function]](#carbon--is-smallest-breakpoint-function)
  - [✅carbon--largest-breakpoint-name [function]](#carbon--largest-breakpoint-name-function)
  - [✅carbon--breakpoint-infix [function]](#carbon--breakpoint-infix-function)
  - [✅carbon--breakpoint-up [mixin]](#carbon--breakpoint-up-mixin)
  - [✅carbon--breakpoint-down [mixin]](#carbon--breakpoint-down-mixin)
  - [✅carbon--breakpoint-between [mixin]](#carbon--breakpoint-between-mixin)
  - [✅carbon--largest-breakpoint [mixin]](#carbon--largest-breakpoint-mixin)
  - [✅carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [✅carbon--rem [function]](#carbon--rem-function)
  - [✅carbon--em [function]](#carbon--em-function)
  - [✅carbon--get-column-width [function]](#carbon--get-column-width-function)
  - [✅carbon--key-height [function]](#carbon--key-height-function)
  - [✅carbon--mini-units [function]](#carbon--mini-units-function)
  - [✅map-deep-get [function]](#map-deep-get-function)
  - [✅carbon--key-by-index [function]](#carbon--key-by-index-function)
  - [✅last-map-item [function]](#last-map-item-function)
  - [✅carbon--easings [variable]](#carbon--easings-variable)
  - [✅carbon--motion [function]](#carbon--motion-function)
  - [✅carbon--motion [mixin]](#carbon--motion-mixin)
  - [✅carbon--theme [mixin]](#carbon--theme-mixin)
  - [✅carbon--font-families [variable]](#carbon--font-families-variable)
  - [✅carbon--font-family [function]](#carbon--font-family-function)
  - [✅carbon--font-family [mixin]](#carbon--font-family-mixin)
  - [✅carbon--font-weights [variable]](#carbon--font-weights-variable)
  - [✅carbon--font-weight [function]](#carbon--font-weight-function)
  - [✅carbon--font-weight [mixin]](#carbon--font-weight-mixin)
  - [✅carbon--type-reset [mixin]](#carbon--type-reset-mixin)
  - [✅carbon--get-type-size [function]](#carbon--get-type-size-function)
  - [✅carbon--type-scale [variable]](#carbon--type-scale-variable)
  - [✅carbon--type-scale [function]](#carbon--type-scale-function)
  - [✅carbon--type-scale [mixin]](#carbon--type-scale-mixin)
  - [✅carbon--font-size [mixin]](#carbon--font-size-mixin)
  - [✅fluid-type [mixin]](#fluid-type-mixin)
  - [✅fluid-type-size [mixin]](#fluid-type-size-mixin)
  - [✅carbon--type-style [mixin]](#carbon--type-style-mixin)

<!-- tocstop -->

## \$padding map

### ✅⚠️// .container [css]

**Example**:

<details>
<summary>Example code</summary>

```scss
```

</details>

- **Group**: [\$padding map](#padding-map)
- **Deprecated**: (For v10) Was used primary for older grid

## \$z-indexes

### ✅// .modal [css]

**Example**:

<details>
<summary>Example code</summary>

```scss
```

</details>

- **Group**: [\$z-indexes](#z-indexes)

## @function padding();

### ❌⚠️padding [variable]

<details>
<summary>Source code</summary>

```scss
$padding: (
  'mobile': 3%,
  'xs': 5%,
);
```

</details>

- **Group**: [@function padding();](#function-padding)
- **Type**: `Map`
- **Deprecated**: (For v10) Was used primary for older grid

## @function z();

### ❌z-indexes [variable]

<details>
<summary>Source code</summary>

```scss
$z-indexes: (
  modal: 9000,
  overlay: 8000,
  dropdown: 7000,
  header: 6000,
  footer: 5000,
  hidden: - 1,
  overflowHidden: - 1,
  floating: 10000,
);
```

</details>

- **Group**: [@function z();](#function-z)
- **Type**: `Map`

## @mixin breakpoint/max-breakpoint

### ❌⚠️breakpoints [variable]

<details>
<summary>Source code</summary>

```scss
$breakpoints: (
  bp--xs--major: 500px,
  bp--sm--major: 768px,
  bp--md--major: 992px,
  bp--lg--major: 1200px,
  sm: 320px,
  md: 672px,
  lg: 1056px,
  xlg: 1312px,
  max: 1584px,
);
```

</details>

- **Group**: [@mixin breakpoint/max-breakpoint](#mixin-breakpointmax-breakpoint)
- **Type**: `Map`
- **Used by**:
  - [max-breakpoint [mixin]](#max-breakpoint-mixin)
  - [carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)
  - [carbon--make-container [mixin]](#carbon--make-container-mixin)
  - [carbon--set-largest-breakpoint [mixin]](#carbon--set-largest-breakpoint-mixin)
  - [carbon--make-container-max-widths [mixin]](#carbon--make-container-max-widths-mixin)
  - [carbon--grid [mixin]](#carbon--grid-mixin)
  - [carbon--is-smallest-breakpoint [function]](#carbon--is-smallest-breakpoint-function)
  - [carbon--largest-breakpoint-name [function]](#carbon--largest-breakpoint-name-function)
  - [carbon--breakpoint-up [mixin]](#carbon--breakpoint-up-mixin)
  - [carbon--breakpoint-down [mixin]](#carbon--breakpoint-down-mixin)
  - [carbon--breakpoint-between [mixin]](#carbon--breakpoint-between-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [carbon--get-column-width [function]](#carbon--get-column-width-function)
  - [fluid-type [mixin]](#fluid-type-mixin)
  - [fluid-type-size [mixin]](#fluid-type-size-mixin)
  - [carbon--type-style [mixin]](#carbon--type-style-mixin)
- **Deprecated**: (For v10) Superseded by `$carbon--grid-breakpoints`

## layer

### ❌box-shadow [variable]

<details>
<summary>Source code</summary>

```scss
$box-shadow: rgba(0, 0, 0, 0.1);
```

</details>

**Example**:

<details>
<summary>Example code</summary>

```scss
box-shadow: 0px 3px 3px 0 $box-shadow;
```

</details>

- **Group**: [layer](#layer)
- **Type**: `Value`
- **Used by**:
  - [box-shadow [mixin]](#box-shadow-mixin)

### ❌layer-shadows [variable]

<details>
<summary>Source code</summary>

```scss
$layer-shadows: (
  base: none,
  flat: none,
  raised: $box-shadow--raised,
  overlay: $box-shadow--overlay,
  pop-out: $box-shadow--pop-out,
  temporary-nav: $box-shadow--temporary-nav,
  sticky-nav: $box-shadow--sticky-nav,
);
```

</details>

**Example**:

<details>
<summary>Example code</summary>

```scss
- @include layer('raised');
```

</details>

- **Group**: [layer](#layer)
- **Type**: `Map`
- **Used by**:
  - [layer [mixin]](#layer-mixin)

### ✅layer [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin layer($layer) {
  @if global-variable-exists('css--use-layer') == false or $css--use-layer == true {
    @if map-has-key($layer-shadows, $layer) {
      box-shadow: #{map-get($layer-shadows, $layer)};
    } @else {
      @warn '#{$layer} is not a valid layer.';
    }
  }
}
```

</details>

- **Parameters**:

| Name     | Description                          | Type     | Default value |
| -------- | ------------------------------------ | -------- | ------------- |
| `$layer` | a value from the \$layer-shadows map | `String` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
- @include layer('raised');
```

</details>

- **Group**: [layer](#layer)
- **Requires**:
  - [layer-shadows [variable]](#layer-shadows-variable)

## plex-font-face

### ❌⚠️unicodes [variable]

<details>
<summary>Source code</summary>

```scss
$unicodes: (
  Pi:
    'U+03C0, U+0E3F, U+2070, U+2074-2079, U+2080-2089, U+2113, U+2116, U+2126, U+212E, U+2150-2151, U+2153-215E, U+2190-2199, U+21A9-21AA, U+21B0-21B3, U+21B6-21B7, U+21BA-21BB, U+21C4, U+21C6, U+2202, U+2206, U+220F, U+2211, U+221A, U+221E, U+222B, U+2248, U+2260, U+2264-2265, U+25CA, U+2713, U+274C, U+2B0E-2B11, U+EBE1, U+EBE3-EBE4, U+EBE6-EBE7, U+ECE0, U+EFCC',
  Latin3: 'U+0102-0103, U+1EA0-1EF9, U+20AB',
  Latin2: 'U+0100-024F, U+0259, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF, U+FB01-FB02',
  Latin1: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2212, U+FB01-FB02',
);
```

</details>

**Example**:

<details>
<summary>Example code</summary>

```scss
- @include plex-font-face;
```

</details>

- **Group**: [plex-font-face](#plex-font-face)
- **Type**: `Map`
- **Used by**:
  - [plex-font-face [mixin]](#plex-font-face-mixin)
- **Deprecated**: (For v10) Superseded by `@include carbon--font-face-sans()`, `@include carbon--font-face-mono()`, etc.

### ❌⚠️families [variable]

<details>
<summary>Source code</summary>

```scss
$families: (
  'Mono': unquote("'ibm-plex-mono'"),
  'Sans': unquote("'ibm-plex-sans'"),
);
```

</details>

**Example**:

<details>
<summary>Example code</summary>

```scss
- @include plex-font-face;
```

</details>

- **Group**: [plex-font-face](#plex-font-face)
- **Type**: `Map`
- **Used by**:
  - [plex-font-face [mixin]](#plex-font-face-mixin)
- **Deprecated**: (For v10) Superseded by `@include carbon--font-face-sans()`, `@include carbon--font-face-mono()`, etc.

### ❌⚠️fallbacks [variable]

<details>
<summary>Source code</summary>

```scss
$fallbacks: (
  'Mono': unquote("'ibm-plex-mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace"),
  'Sans': unquote("'ibm-plex-sans', 'Helvetica Neue', Arial, sans-serif"),
);
```

</details>

**Example**:

<details>
<summary>Example code</summary>

```scss
- @include plex-font-face;
```

</details>

- **Group**: [plex-font-face](#plex-font-face)
- **Type**: `Map`
- **Deprecated**: (For v10) Superseded by `@include carbon--font-face-sans()`, `@include carbon--font-face-mono()`, etc.

### ❌⚠️weights [variable]

<details>
<summary>Source code</summary>

```scss
$weights: (
  'Light': (
    font-style: normal,
    font-weight: 300,
  ),
  'Regular': (
    font-style: normal,
    font-weight: 400,
  ),
  'SemiBold': (
    font-style: normal,
    font-weight: 600,
  ),
);
```

</details>

**Example**:

<details>
<summary>Example code</summary>

```scss
- @include plex-font-face;
```

</details>

- **Group**: [plex-font-face](#plex-font-face)
- **Type**: `Map`
- **Used by**:
  - [plex-font-face [mixin]](#plex-font-face-mixin)
- **Deprecated**: (For v10) Superseded by `@include carbon--font-face-sans()`, `@include carbon--font-face-mono()`, etc.

## spacing/layout tokens

### ✅spacing-baseline [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-baseline: 1rem;
```

</details>

- **Group**: [spacing/layout tokens](#spacinglayout-tokens)

## typography

### ✅⚠️font-family-mono [variable]

<details>
<summary>Source code</summary>

```scss
$font-family-mono: 'ibm-plex-mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace;
```

</details>

- **Group**: [typography](#typography)
- **Deprecated**: (For v10) Use `$carbon--font-families`

### ✅⚠️base-font-size [variable]

<details>
<summary>Source code</summary>

```scss
$base-font-size: 16px;
```

</details>

- **Group**: [typography](#typography)
- **Used by**:
  - [rem [function]](#rem-function)
  - [em [function]](#em-function)
- **Deprecated**: (For v10) Superseded by `$carbon--base-font-size`

### ✅⚠️typescale-map [variable]

<details>
<summary>Source code</summary>

```scss
$typescale-map: (
  'giga': 4.75rem,
  'mega': 3.375rem,
  'alpha': 2.25rem,
  'beta': 1.75rem,
  'gamma': 1.25rem,
  'delta': 1.125rem,
  'epsilon': 1rem,
  'zeta': 0.875rem,
  'omega': 0.75rem,
  'caption': 0.75rem,
  'legal': 0.6875rem,
  'p': 1rem,
);
```

</details>

- **Group**: [typography](#typography)
- **Type**: `Map`
- **Used by**:
  - [typescale [mixin]](#typescale-mixin)
- **Deprecated**: (For v10) Superseded by `$carbon--base-font-size`

### ✅⚠️typescale [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin typescale($size) {
  @include deprecate(
    '`@include typescale()` has been removed. ' + 'Use `@include carbon--type-scale()` instead.',
    feature-flag-enabled('breaking-changes-x'),
    true
  ) {
    @if map-has-key($typescale-map, $size) {
      font-size: map-get($typescale-map, $size);
    } @else {
      @warn 'This is not a step of the Carbon Type Scale!';
    }
  }
}
```

</details>

- **Parameters**:

| Name    | Description        | Type     | Default value |
| ------- | ------------------ | -------- | ------------- |
| `$size` | value of type size | `String` | —             |

- **Group**: [typography](#typography)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [carbon--type-scale [mixin]](#carbon--type-scale-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [typescale-map [variable]](#typescale-map-variable)
- **Used by**:
  - [typography [mixin]](#typography-mixin)
- **Deprecated**: (For v10) Use `@include carbon--type-scale()`

### ✅⚠️helvetica [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin helvetica() {
  @include deprecate(
    '`@include helvetica` has been removed. ' + 'Use `@include carbon--font-family()` instead.',
    feature-flag-enabled('breaking-changes-x'),
    true
  ) {
    font-family: $font-family-helvetica;
  }
}
```

</details>

**Example**:

<details>
<summary>Example code</summary>

```scss
- @include helvetica;
```

</details>

- **Group**: [typography](#typography)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [font-family-helvetica [variable]](#font-family-helvetica-variable)
- **Deprecated**: (For v10) Use Plex fonts

### ✅⚠️font-family [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin font-family() {
  @include deprecate(
    '`@include font-family` has been removed. ' + 'Use `@include carbon--font-family()` instead.',
    feature-flag-enabled('breaking-changes-x'),
    true
  ) {
    @if global-variable-exists('css--plex') and $css--plex == true {
      font-family: $font-family-sans-serif;
    } @else {
      font-family: $font-family-helvetica;
    }
  }
}
```

</details>

**Example**:

<details>
<summary>Example code</summary>

```scss
- @include font-family;
```

</details>

- **Group**: [typography](#typography)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [font-family-sans-serif [variable]](#font-family-sans-serif-variable)
  - [font-family-helvetica [variable]](#font-family-helvetica-variable)
- **Used by**:
  - [css-body [mixin]](#css-body-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
- **Deprecated**: (For v10) Use `@include carbon--font-family()`

## general

### ❌data-table-suffix [variable]

<details>
<summary>Source code</summary>

```scss
$data-table-suffix: if(feature-flag-enabled('components-x'), '-v2', '');
```

</details>

- **Group**: [general](#general)

### ❌data-table-suffix [variable]

<details>
<summary>Source code</summary>

```scss
$data-table-suffix: if(feature-flag-enabled('components-x'), '-v2', '');
```

</details>

- **Group**: [general](#general)

### ✅mini-units [function]

Get a `rem` value based for a number of mini-units.

<details>
<summary>Source code</summary>

```scss
@function mini-units($count) {
  @return $unit * $count;
}
```

</details>

- **Parameters**:

| Name     | Description | Type     | Default value |
| -------- | ----------- | -------- | ------------- |
| `$count` | —           | `number` | —             |

- **Group**: [general](#general)
- **Returns**: `rem`

### ✅experimental-focus [mixin]

Adds experimental focus styles to a particular selector.

<details>
<summary>Source code</summary>

```scss
@mixin experimental-focus() {
  outline: 4px solid $shell-side-nav-accent-01;
  outline-offset: -4px;
}
```

</details>

**Example**:

<details>
<summary>Example code</summary>

```scss
.my-custom-selector:focus {
  @include experimental-focus();
}
```

</details>

- **Group**: [general](#general)

### ✅text-overflow [mixin]

Helper to add in text overflow styles to a particular node. Useful if we
don't want to have display-inline: block from the text helper classes

<details>
<summary>Source code</summary>

```scss
@mixin text-overflow() {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

</details>

**Example**:

<details>
<summary>Example code</summary>

```scss
.my-custom-selector {
  @include text-overflow();
}
```

</details>

- **Group**: [general](#general)

### ✅expanded [mixin]

Helper for handling selectors for the expansion state of the side-nav.
This helper makes it easier to write code for children that need to respond
to whether the side-nav is open, or closed. For convenience, we also
optionally set properties for opacity and visibility to help with the
transition animation.

<details>
<summary>Source code</summary>

```scss
@mixin expanded($opacity, $visibility) {
  @if $opacity == true {
    opacity: 0;
  }

  @if $visibility == true {
    visibility: hidden;
  }

  .#{$prefix}--side-nav:hover &,
  // Include the fixed variant here so components can render in both expandable
  // and fixed side navs
  .#{$prefix}--side-nav--fixed &,
  .#{$prefix}--side-nav--expanded & {
    @if $visibility == true {
      visibility: visible;
    }
    @if $opacity == true {
      opacity: 1;
    }
    @content;
  }
}
```

</details>

- **Parameters**:

| Name          | Description | Type      | Default value |
| ------------- | ----------- | --------- | ------------- |
| `$opacity`    | —           | `boolean` | —             |
| `$visibility` | —           | `boolean` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [prefix [variable]](#prefix-variable)

### ✅⚠️color\_\_blue-20 [variable]

<details>
<summary>Source code</summary>

```scss
$color__blue-20: #7cc7ff;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_blue-30 [variable]

<details>
<summary>Source code</summary>

```scss
$color__blue-30: #5aaafa;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_blue-40 [variable]

<details>
<summary>Source code</summary>

```scss
$color__blue-40: #5596e6;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_blue-50 [variable]

<details>
<summary>Source code</summary>

```scss
$color__blue-50: #4178be;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_blue-90 [variable]

<details>
<summary>Source code</summary>

```scss
$color__blue-90: #152935;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-1 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-1: #0f212e;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-2 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-2: #20343e;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-3 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-3: #2d3f49;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-4 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-4: #394b54;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-5 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-5: #42535c;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-6 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-6: #5a6872;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-7 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-7: #8c9ba5;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-8 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-8: #dfe6eb;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-9 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-9: #eff2f5;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_white [variable]

<details>
<summary>Source code</summary>

```scss
$color__white: #fff;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_blue-51 [variable]

<details>
<summary>Source code</summary>

```scss
$color__blue-51: #3d70b2;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_gray-1 [variable]

<details>
<summary>Source code</summary>

```scss
$color__gray-1: #dfe3e6;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_gray-2 [variable]

<details>
<summary>Source code</summary>

```scss
$color__gray-2: #f0f3f6;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_gray-3 [variable]

<details>
<summary>Source code</summary>

```scss
$color__gray-3: #f5f7fa;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_blue-10 [variable]

<details>
<summary>Source code</summary>

```scss
$color__blue-10: #c0e6ff;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_blue-60 [variable]

<details>
<summary>Source code</summary>

```scss
$color__blue-60: #325c80;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_teal-10 [variable]

<details>
<summary>Source code</summary>

```scss
$color__teal-10: #a7fae6;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_teal-20 [variable]

<details>
<summary>Source code</summary>

```scss
$color__teal-20: #6eedd8;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_teal-30 [variable]

<details>
<summary>Source code</summary>

```scss
$color__teal-30: #41d6c3;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_teal-40 [variable]

<details>
<summary>Source code</summary>

```scss
$color__teal-40: #00b4a0;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_teal-50 [variable]

<details>
<summary>Source code</summary>

```scss
$color__teal-50: #008571;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_teal-60 [variable]

<details>
<summary>Source code</summary>

```scss
$color__teal-60: #006d5d;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_green-10 [variable]

<details>
<summary>Source code</summary>

```scss
$color__green-10: #c8f08f;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_green-20 [variable]

<details>
<summary>Source code</summary>

```scss
$color__green-20: #b4e051;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_green-30 [variable]

<details>
<summary>Source code</summary>

```scss
$color__green-30: #8cd211;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_green-40 [variable]

<details>
<summary>Source code</summary>

```scss
$color__green-40: #5aa700;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_green-50 [variable]

<details>
<summary>Source code</summary>

```scss
$color__green-50: #4b8400;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_green-60 [variable]

<details>
<summary>Source code</summary>

```scss
$color__green-60: #2d660a;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_yellow-10 [variable]

<details>
<summary>Source code</summary>

```scss
$color__yellow-10: #fde876;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_yellow-20 [variable]

<details>
<summary>Source code</summary>

```scss
$color__yellow-20: #fdd600;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_yellow-30 [variable]

<details>
<summary>Source code</summary>

```scss
$color__yellow-30: #efc100;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_yellow-60 [variable]

<details>
<summary>Source code</summary>

```scss
$color__yellow-60: #735f00;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_orange-10 [variable]

<details>
<summary>Source code</summary>

```scss
$color__orange-10: #ffd4a0;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_orange-20 [variable]

<details>
<summary>Source code</summary>

```scss
$color__orange-20: #ffa573;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_orange-30 [variable]

<details>
<summary>Source code</summary>

```scss
$color__orange-30: #ff7832;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_orange-60 [variable]

<details>
<summary>Source code</summary>

```scss
$color__orange-60: #a53725;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_red-10 [variable]

<details>
<summary>Source code</summary>

```scss
$color__red-10: #ffd2dd;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_red-30 [variable]

<details>
<summary>Source code</summary>

```scss
$color__red-30: #ff7d87;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_red-40 [variable]

<details>
<summary>Source code</summary>

```scss
$color__red-40: #ff5050;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_red-50 [variable]

<details>
<summary>Source code</summary>

```scss
$color__red-50: #e71d32;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_red-60 [variable]

<details>
<summary>Source code</summary>

```scss
$color__red-60: #ad1625;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_purple-10 [variable]

<details>
<summary>Source code</summary>

```scss
$color__purple-10: #eed2ff;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_purple-20 [variable]

<details>
<summary>Source code</summary>

```scss
$color__purple-20: #d7aaff;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_purple-30 [variable]

<details>
<summary>Source code</summary>

```scss
$color__purple-30: #ba8ff7;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_purple-40 [variable]

<details>
<summary>Source code</summary>

```scss
$color__purple-40: #af6ee8;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_purple-60 [variable]

<details>
<summary>Source code</summary>

```scss
$color__purple-60: #734098;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ❌css-body [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin css-body() {
  body {
    @include reset;
    @include font-family;
    color: $text-01;
    background-color: $ui-02;
    line-height: 1;
  }
}
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)

### ❌css-body--x [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin css-body--x() {
  body {
    @include reset;
    @include type-style('body-short-01');
    color: $text-01;
    background-color: $ui-background;
    line-height: 1;
  }
}
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)

### ✅⚠️helvetica-font-face [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin helvetica-font-face() {
  // Default font directory, `!default` flag allows user override.
  // (font files are configured to be served as static assets from server.js)
  @include deprecate('Usage of Helvetica font in `carbon-components` has been deprecated.') {
    @include check-default-font-path {
      @font-face {
        font-family: 'IBM Helvetica';
        font-style: normal;
        font-weight: 300;
        src: url('#{$font-path}/helvetica-neue-light.woff2') format('woff2'), url('#{$font-path}/helvetica-neue-light.woff')
            format('woff');
      }

      @font-face {
        font-family: 'IBM Helvetica';
        font-style: italic;
        font-weight: 300;
        src: url('#{$font-path}/helvetica-neue-light-italic.woff2') format('woff2'), url('#{$font-path}/helvetica-neue-light-italic.woff')
            format('woff');
      }

      @font-face {
        font-family: 'IBM Helvetica';
        font-style: normal;
        font-weight: 400;
        src: url('#{$font-path}/helvetica-neue-roman.woff2') format('woff2'), url('#{$font-path}/helvetica-neue-roman.woff')
            format('woff');
      }

      @font-face {
        font-family: 'IBM Helvetica';
        font-style: italic;
        font-weight: 400;
        src: url('#{$font-path}/helvetica-neue-roman-italic.woff2') format('woff2'), url('#{$font-path}/helvetica-neue-roman-italic.woff')
            format('woff');
      }

      @font-face {
        font-family: 'IBM Helvetica';
        font-style: normal;
        font-weight: 700;
        src: url('#{$font-path}/helvetica-neue-bold.woff2') format('woff2'), url('#{$font-path}/helvetica-neue-bold.woff') format('woff');
      }

      @font-face {
        font-family: 'IBM Helvetica';
        font-style: italic;
        font-weight: 700;
        src: url('#{$font-path}/helvetica-neue-bold-italic.woff2') format('woff2'), url('#{$font-path}/helvetica-neue-bold-italic.woff')
            format('woff');
      }
    }
  }
}
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
- **Deprecated**: (For v10) Use `@include carbon--font-face-sans()`, `@include carbon--font-face-mono()`, etc.

### ✅css-helpers [mixin]

Include styles for screen reader/assistive text

<details>
<summary>Source code</summary>

```scss
@mixin css-helpers() {
  .#{$prefix}--assistive-text,
  .#{$prefix}--visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
    visibility: visible;
    white-space: nowrap;
  }

  .#{$prefix}--body {
    @include reset;
    @if not feature-flag-enabled('components-x') {
      @include font-family;
    } @else {
      @include type-style('body-short-01');
    }
    color: $text-01;
    background-color: $ui-02;
    line-height: 1;
  }
}
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [prefix [variable]](#prefix-variable)

### ✅⚠️check-default-font-path [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin check-default-font-path() {
  @if (str-index($font-path, 'https://unpkg.com/') == 1) {
    @warn 'The default font path (#{$font-path}) should be used only for demonstration/evaluation purposes. For production applications, please host fonts in your own CDN and change `$font-path` accordingly.';
    @content;
  } @else {
    @content;
  }
}
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Superseded by `@include carbon--font-face-sans()`, `@include carbon--font-face-mono()`, etc.

### ✅⚠️plex-font-face [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin plex-font-face() {
  @include deprecate(
    '`@include plex-font-face` has been removed. ' +
      'Use `@include carbon--font-face-sans()`, `@include carbon--font-face-mono()`, etc. instead.',
    feature-flag-enabled('components-x'),
    true
  ) {
    @include check-default-font-path {
      @each $family, $name in $families {
        @each $weight, $styles in $weights {
          @font-face {
            font-family: $name;
            font-style: map-get($styles, 'font-style');
            font-weight: map-get($styles, 'font-weight');
            src: url('#{$font-path}/IBMPlex#{$family}-#{$weight}.woff') format('woff');
          }

          @each $unicode, $range in $unicodes {
            @font-face {
              font-family: $name;
              font-style: map-get($styles, 'font-style');
              font-weight: map-get($styles, 'font-weight');
              src: url('#{$font-path}/IBMPlex#{$family}-#{$weight}-#{$unicode}.woff2') format('woff2');
              unicode-range: map-get($unicodes, $unicode);
            }
          }
        }
      }
    }
  }
}
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [families [variable]](#families-variable)
  - [weights [variable]](#weights-variable)
  - [unicodes [variable]](#unicodes-variable)
- **Deprecated**: (For v10) Use `@include carbon--font-face-sans()`, `@include carbon--font-face-mono()`, etc.

### ✅reset [mixin]

Resets default browser styling

<details>
<summary>Source code</summary>

```scss
@mixin reset() {
  @if global-variable-exists(css--reset) ==false or $css--reset==false {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline;

    & > *,
    & > *:before,
    & > *:after {
      box-sizing: inherit;
    }
  }
}
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [css-body [mixin]](#css-body-mixin)
  - [css-body--x [mixin]](#css-body--x-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)
  - [typography [mixin]](#typography-mixin)
  - [button-reset [mixin]](#button-reset-mixin)

### ✅⚠️typography [mixin]

Includes type styles for different elements and classes

<details>
<summary>Source code</summary>

```scss
@mixin typography() {
  @include deprecate(
    '`@include typography` has been removed. ' + 'Use `@include carbon--type-classes` instead.',
    feature-flag-enabled('components-x'),
    true
  ) {
    // really big
    .#{$prefix}--type-giga {
      @include typescale('giga');
      @include reset;
      @include line-height('heading');
      font-weight: 300;
    }

    .#{$prefix}--type-mega {
      @include typescale('mega');
      @include reset;
      @include line-height('heading');
      font-weight: 300;
    }

    // really small
    .#{$prefix}--type-omega {
      @include typescale('omega');
      @include reset;
      @include line-height('heading');
      font-weight: 600;
    }

    .#{$prefix}--type-caption {
      @include typescale('caption');
      @include reset;
      @include line-height('body');
      font-weight: 400;
    }

    .#{$prefix}--type-legal {
      @include typescale('legal');
      @include reset;
      @include line-height('body');
      font-weight: 400;
    }

    .#{$prefix}--type-caps {
      text-transform: uppercase;
    }

    strong,
    .#{$prefix}--type-strong {
      @include reset;
      font-weight: 700;
    }

    p {
      @include reset;
      @include typescale('p');
      @include line-height('body');
      font-weight: 400;
    }

    em {
      @include reset;
      font-style: italic;
    }

    a {
      @include reset;
      color: $brand-01;
    }

    h1,
    .#{$prefix}--type-alpha {
      @include reset;
      @include typescale('alpha');
      @include line-height('heading');
      font-weight: 300;
    }

    h2,
    .#{$prefix}--type-beta {
      @include reset;
      @include typescale('beta');
      @include line-height('heading');
      font-weight: 300;
    }

    h3,
    .#{$prefix}--type-gamma {
      @include reset;
      @include typescale('gamma');
      @include line-height('heading');
      font-weight: 300;
    }

    h4,
    .#{$prefix}--type-delta {
      @include reset;
      @include typescale('delta');
      @include line-height('heading');
      font-weight: 600;
    }

    h5,
    .#{$prefix}--type-epsilon {
      @include reset;
      @include typescale('epsilon');
      @include line-height('heading');
      font-weight: 600;
    }

    h6,
    .#{$prefix}--type-zeta {
      @include reset;
      @include typescale('zeta');
      @include line-height('heading');
      font-weight: 600;
    }
  }
}
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [reset [mixin]](#reset-mixin)
  - [line-height [mixin]](#line-height-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [prefix [variable]](#prefix-variable)
- **Deprecated**: (For v10) Use `@include carbon--type-classes`

### ✅deprecate [mixin]

Generic `deprecate` mixin that is being used to indicate that a component is
no longer going to be present in the next major release of Carbon.

<details>
<summary>Source code</summary>

```scss
@mixin deprecate($reason, $condition: true, $remove-deprecated: false) {
  $deprecations--entry: false !default;

  @if not $condition {
    @content;
  } @else {
    @if ($deprecations--entry == true) {
      $deprecations--reasons: append($deprecations--reasons, $reason) !global;
    } @else {
      @warn 'Deprecated code was found, this code will be removed before the next release of Carbon. REASON: #{$reason}';
    }
    @if not $remove-deprecated {
      @content;
    }
  }
}
```

</details>

- **Parameters**:

| Name                 | Description                                         | Type     | Default value |
| -------------------- | --------------------------------------------------- | -------- | ------------- |
| `$reason`            | The message                                         | `String` | —             |
| `$condition`         | `true` to emit the given deprecation messsage       | `Bool`   | `true`        |
| `$remove-deprecated` | `true` to omit the content if \$condition is `true` | `Bool`   | `false`       |

- **Group**: [general](#general)
- **Requires**:
  - [deprecations--entry [variable]](#deprecations--entry-variable)
- **Used by**:
  - [typescale [mixin]](#typescale-mixin)
  - [helvetica [mixin]](#helvetica-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [helvetica-font-face [mixin]](#helvetica-font-face-mixin)
  - [plex-font-face [mixin]](#plex-font-face-mixin)
  - [typography [mixin]](#typography-mixin)
  - [light-ui [mixin]](#light-ui-mixin)
  - [max-breakpoint [mixin]](#max-breakpoint-mixin)
  - [grid-container [mixin]](#grid-container-mixin)
  - [line-height [mixin]](#line-height-mixin)
  - [font-smoothing [mixin]](#font-smoothing-mixin)
  - [letter-spacing [mixin]](#letter-spacing-mixin)
  - [font-size [mixin]](#font-size-mixin)

### ✅feature-flags [variable]

Initialize our feature flag map with default values, user can override default values (\$default-feature-flags) here

<details>
<summary>Source code</summary>

```scss
$feature-flags: ();
```

</details>

**Example**:

<details>
<summary>Example code</summary>

```scss
$feature-flags: (
  components-x: true,
  ui-shell: true,
); // overrides default values for components-x and ui-shell
```

</details>

- **Group**: [general](#general)
- **Type**: `Map`
- **Used by**:
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)

### ❌default-feature-flags [variable]

Default feature flag values

<details>
<summary>Source code</summary>

```scss
$default-feature-flags: (
  components-x: true,
  breaking-changes-x: true,
  ui-shell: false,
  grid: true,
  grid-columns-16: false,
  grid--fallback: false,
);
```

</details>

- **Group**: [general](#general)
- **Type**: `Map`

### ❌did-warn-diverged-feature-flags [variable]

<details>
<summary>Source code</summary>

```scss
$did-warn-diverged-feature-flags: false !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Bool`
- **Used by**:
  - [merge-feature-flags [function]](#merge-feature-flags-function)

### ❌merge-feature-flags [function]

Look for user-defined feature flags that are different from default ones, and warn them before merging them.

<details>
<summary>Source code</summary>

```scss
@function merge-feature-flags($dst, $src) {
  @if (not $did-warn-diverged-feature-flags) {
    $diverged: ();

    @each $name, $value in $src {
      @if (map-has-key($dst, $name) == true and map-get($dst, $name) != $value) {
        $diverged: append($diverged, $name);
      }
    }

    @if (length($diverged) > 0) {
      @warn 'Usage of non-default feature flags was found: #{$diverged}. ' +
        'Feature/code under non-default feature flags are either experimental, deprecated, or support for edge cases. ' +
        'They are subject to change any time. Use them at your own risk.';
      $did-warn-diverged-feature-flags: true !global;
    }
  }

  @return map-merge($dst, $src);
}
```

</details>

- **Parameters**:

| Name   | Description                                                   | Type  | Default value |
| ------ | ------------------------------------------------------------- | ----- | ------------- |
| `$dst` | The feature flags to merge to (default feature flags).        | `Map` | —             |
| `$src` | The feature flags to merge from (user-defined feature flags). | `Map` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
-$feature-flags: merge-feature-flags($default-feature-flags, $feature-flags);
```

</details>

- **Group**: [general](#general)
- **Returns**: `Map` The result of `map-merge($dst, $src)`.
- **Requires**:
  - [did-warn-diverged-feature-flags [variable]](#did-warn-diverged-feature-flags-variable)

### ✅feature-flag-enabled [function]

Used for enabling features

<details>
<summary>Source code</summary>

```scss
@function feature-flag-enabled($feature) {
  @if global-variable-exists(feature-flags) == true and map-get($feature-flags, $feature) == true {
    @return true;
  }
  @return false;
}
```

</details>

- **Parameters**:

| Name       | Description                          | Type     | Default value |
| ---------- | ------------------------------------ | -------- | ------------- |
| `$feature` | feature from \$default-feature-flags | `String` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
@if feature-flag-enabled('components-x') { ... } will include code inside of { } only if components-x is true
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [feature-flags [variable]](#feature-flags-variable)
- **Used by**:
  - [typescale [mixin]](#typescale-mixin)
  - [helvetica [mixin]](#helvetica-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)
  - [plex-font-face [mixin]](#plex-font-face-mixin)
  - [typography [mixin]](#typography-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [light-ui [mixin]](#light-ui-mixin)
  - [max-breakpoint [mixin]](#max-breakpoint-mixin)
  - [grid-container [mixin]](#grid-container-mixin)
  - [line-height [mixin]](#line-height-mixin)
  - [font-smoothing [mixin]](#font-smoothing-mixin)
  - [letter-spacing [mixin]](#letter-spacing-mixin)
  - [font-size [mixin]](#font-size-mixin)

### ✅text-overflow [mixin]

Adds text overflow styling

<details>
<summary>Source code</summary>

```scss
@mixin text-overflow($width: false) {
  display: block;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  // apply a width if width parameter exists
  @if ($width) {
    width: $width;
  }
}
```

</details>

- **Parameters**:

| Name     | Description                                           | Type    | Default value |
| -------- | ----------------------------------------------------- | ------- | ------------- |
| `$width` | value of width if you want to set width, else nothing | `Value` | `false`       |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include text-overflow(300px);
```

</details>

- **Group**: [general](#general)

### ✅placeholder-colors [mixin]

Adds placeholder text color

<details>
<summary>Source code</summary>

```scss
@mixin placeholder-colors() {
  color: $text-03;
}
```

</details>

**Example**:

<details>
<summary>Example code</summary>

```scss
@include placeholder-colors;
```

</details>

- **Group**: [general](#general)

### ✅box-shadow [mixin]

Adds small or large box shadow

<details>
<summary>Source code</summary>

```scss
@mixin box-shadow($size: 'small') {
  // Large - For dropdowns
  @if ($size == 'large') {
    box-shadow: 6px 6px 6px 0 $box-shadow;
  }

  @if ($size == 'small') {
    box-shadow: 0px 3px 3px 0 $box-shadow;
  }
}
```

</details>

- **Parameters**:

| Name    | Description        | Type     | Default value |
| ------- | ------------------ | -------- | ------------- |
| `$size` | size of box shadow | `String` | `'small'`     |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include box-shadow();
@include box-shadow('large');
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [box-shadow [variable]](#box-shadow-variable)

### ✅focus-outline [mixin]

Adds outline styles depending on specific type

<details>
<summary>Source code</summary>

```scss
@mixin focus-outline($type: 'border') {
  @if ($type == 'border') {
    outline: 1px solid if(not feature-flag-enabled('components-x'), $brand-01, $focus);
  }

  @if ($type == 'blurred') {
    box-shadow: 0 0 0 3px $focus;
    outline: 1px solid transparent;
  }

  @if ($type == 'outline') {
    outline: 2px solid if(not feature-flag-enabled('components-x'), $brand-01, $focus);
    outline-offset: -2px;
  }

  @if ($type == 'invalid') {
    outline: 2px solid $support-01;
    outline-offset: -2px;
  }

  @if ($type == 'reset') {
    outline: 2px solid transparent;
    outline-offset: -2px;
  }
}
```

</details>

- **Parameters**:

| Name    | Description                                                    | Type     | Default value |
| ------- | -------------------------------------------------------------- | -------- | ------------- |
| `$type` | type of outline from: border, blurred, outline, invalid, reset | `String` | `'border'`    |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include focus-outline('outline');
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)

### ✅rotate [mixin]

Adds rotational transformation

<details>
<summary>Source code</summary>

```scss
@mixin rotate($deg, $speed, $origin: center) {
  transform: rotate($deg);
  transition: transform $speed;
  transform-origin: $origin;
}
```

</details>

- **Parameters**:

| Name      | Description                | Type    | Default value |
| --------- | -------------------------- | ------- | ------------- |
| `$deg`    | how many degrees to rotate | `Value` | —             |
| `$speed`  | speed of rotation          | `Value` | —             |
| `$origin` | transform-origin           | `Value` | `center`      |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include rotate(90deg, 300ms);
```

</details>

- **Group**: [general](#general)

### ✅hidden [mixin]

Adds styles to hide content

<details>
<summary>Source code</summary>

```scss
@mixin hidden() {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
  visibility: visible;
  white-space: nowrap;
}
```

</details>

- **Group**: [general](#general)

### ✅button-reset [mixin]

Resets button styles

<details>
<summary>Source code</summary>

```scss
@mixin button-reset($width: true) {
  @include reset;
  @if not feature-flag-enabled('components-x') {
    @include font-family;
    @include font-smoothing;
    @include letter-spacing;
  }
  display: inline-block;
  background: none;
  appearance: none;
  border: 0;
  padding: 0;
  cursor: pointer;

  @if ($width == true) {
    width: 100%;
  }

  &::-moz-focus-inner {
    border: 0;
  }
}
```

</details>

- **Parameters**:

| Name     | Description                | Type   | Default value |
| -------- | -------------------------- | ------ | ------------- |
| `$width` | sets width to 100% if true | `Bool` | `true`        |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include button-reset($width: false);
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [font-smoothing [mixin]](#font-smoothing-mixin)
  - [letter-spacing [mixin]](#letter-spacing-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)

### ✅skeleton [mixin]

💀 Skeleton loading animation

<details>
<summary>Source code</summary>

```scss
@mixin skeleton() {
  position: relative;
  border: none;
  padding: 0;
  box-shadow: none;
  pointer-events: none;
  background: $skeleton;

  &:hover,
  &:focus,
  &:active {
    border: none;
    outline: none;
    cursor: default;
  }

  &:before {
    content: '';
    width: 0%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.3;
    background: $skeleton;
    animation: 3000ms ease-in-out skeleton infinite;
  }
}
```

</details>

**Example**:

<details>
<summary>Example code</summary>

```scss
@include skeleton;
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [skeleton [variable]](#skeleton-variable)

### ✅⚠️light-ui [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin light-ui() {
  @include deprecate('`@include light-ui` has been removed.', feature-flag-enabled('breaking-changes-x'), true) {
    .#{$prefix}--global-light-ui & {
      @content;
    }
  }
}
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [prefix [variable]](#prefix-variable)
- **Deprecated**: A legacy class used for our older way of dark/light theme switch

### ✅⚠️// @include breakpoint(bp--md--major) [css]

**Example**:

<details>
<summary>Example code</summary>

```scss
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `@include carbon--breakpoint()`

### ✅⚠️max-breakpoint [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin max-breakpoint($size) {
  @include deprecate(
    '`@include max-breakpoint()` has been removed. ' + 'Use `@include carbon--breakpoint-down()` instead.',
    feature-flag-enabled('breaking-changes-x'),
    true
  ) {
    @if map-has-key($breakpoints, $size) {
      @media screen and (max-width: map-get($breakpoints, $size)) {
        @content;
      }
    } @else {
      @media (max-width: $size) {
        @content;
      }
    }
  }
}
```

</details>

- **Parameters**:

| Name    | Description                          | Type     | Default value |
| ------- | ------------------------------------ | -------- | ------------- |
| `$size` | from \$breakpoints map (see line 16) | `String` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include max-breakpoint('bp--xs--major') { ... };
```

</details>

- **Group**: [general](#general)
- **Content**: will add media query for styles using breakpoint as max-width
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [carbon--breakpoint-down [mixin]](#carbon--breakpoint-down-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [breakpoints [variable]](#breakpoints-variable)
- **Deprecated**: (For v10) Use `@include carbon--breakpoint-down()`

### ✅⚠️grid-container [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin grid-container() {
  @include deprecate(
    '`@include grid-container` has been removed. ' + 'Use `@include carbon--make-container()` instead.',
    feature-flag-enabled('breaking-changes-x'),
    true
  ) {
    width: 100%;
    padding-right: padding(mobile);
    padding-left: padding(mobile);

    @include breakpoint(bp--xs--major) {
      padding-right: padding(xs);
      padding-left: padding(xs);
    }
  }
}
```

</details>

**Example**:

<details>
<summary>Example code</summary>

```scss
.some-container {
  @include grid-container;
}
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
- **Deprecated**: (For v10) Use `@include carbon--make-container()`

### ✅carbon--ease-in [variable]

Used primarily for removing elements from the screen.

<details>
<summary>Source code</summary>

```scss
$carbon--ease-in: cubic-bezier(0.25, 0, 1, 1);
```

</details>

- **Group**: [general](#general)

### ✅carbon--ease-out [variable]

Used for adding elements to the screen or changing on-screen states at a users's input.

<details>
<summary>Source code</summary>

```scss
$carbon--ease-out: cubic-bezier(0, 0, 0.25, 1);
```

</details>

- **Group**: [general](#general)

### ✅carbon--standard-easing [variable]

Used for the majority of animations.

<details>
<summary>Source code</summary>

```scss
$carbon--standard-easing: cubic-bezier(0.5, 0, 0.1, 1);
```

</details>

- **Group**: [general](#general)

### ✅transition--base [variable]

Base transition duration

<details>
<summary>Source code</summary>

```scss
$transition--base: 250ms;
```

</details>

- **Group**: [general](#general)

### ✅transition--expansion [variable]

Expansion duration

<details>
<summary>Source code</summary>

```scss
$transition--expansion: 300ms;
```

</details>

- **Group**: [general](#general)

### ✅duration--fast-01 [variable]

New easing durations

<details>
<summary>Source code</summary>

```scss
$duration--fast-01: 70ms;
```

</details>

- **Group**: [general](#general)

### ✅⚠️bx--ease-in [variable]

Default ease-in for components

<details>
<summary>Source code</summary>

```scss
$bx--ease-in: $carbon--ease-in;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: Updated to `$carbon--ease-in`

### ✅⚠️bx--ease-out [variable]

Default ease-out for components

<details>
<summary>Source code</summary>

```scss
$bx--ease-out: $carbon--ease-out;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: Updated to `$carbon--ease-out`

### ✅⚠️bx--standard-easing [variable]

Standard easing for components

<details>
<summary>Source code</summary>

```scss
$bx--standard-easing: $carbon--standard-easing;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: Updated to `$carbon--standard-easing`

### ✅motion [function]

Get the transition-timing-function for a given easing and motion mode.
Easings that are currently supported include: standard, entrance, and exit.
We also offer two modes: productive and expressive.

<details>
<summary>Source code</summary>

```scss
@function motion($name, $mode) {
  @return carbon--motion($name, $mode, $easings);
}
```

</details>

- **Parameters**:

| Name    | Description                           | Type     | Default value |
| ------- | ------------------------------------- | -------- | ------------- |
| `$name` | the name of the easing curve to apply | `String` | —             |
| `$mode` | the mode for the easing curve to use  | `String` | —             |

- **Group**: [general](#general)
- **Returns**: `cubic-bezier`
- **Requires**:
  - [carbon--motion [function]](#carbon--motion-function)

### ✅motion [mixin]

Get the transition-timing-function for a given easing and motion mode.
Easings that are currently supported include: standard, entrance, and exit.
We also offer two modes: productive and expressive.

<details>
<summary>Source code</summary>

```scss
@mixin motion($name, $mode) {
  @include carbon--motion($name, $mode);
}
```

</details>

- **Parameters**:

| Name    | Description                           | Type     | Default value |
| ------- | ------------------------------------- | -------- | ------------- |
| `$name` | the name of the easing curve to apply | `String` | —             |
| `$mode` | the mode for the easing curve to use  | `String` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--motion [mixin]](#carbon--motion-mixin)

### ✅// .box [css]

**Example**:

<details>
<summary>Example code</summary>

```scss
```

</details>

- **Group**: [general](#general)

### ✅layout-2xs [variable]

<details>
<summary>Source code</summary>

```scss
$layout-2xs: $spacing-baseline;
```

</details>

- **Group**: [general](#general)

### ❌carbon--theme--v9 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--theme--v9: (
  brand-01: $color__blue-51,
  brand-02: $color__blue-40,
  brand-03: $color__teal-20,
  inverse-01: $color__white,
  inverse-02: #272d33,
  ui-01: $color__white,
  ui-02: #f4f7fb,
  ui-03: $color__gray-1,
  ui-04: #8897a2,
  ui-05: $color__navy-gray-6,
  text-01: $color__blue-90,
  text-02: $color__navy-gray-6,
  text-03: #cdd1d4,
  field-01: #f4f7fb,
  field-02: $color__white,
  support-01: #e0182d,
  support-02: $color__green-40,
  support-03: $color__yellow-30,
  support-04: $color__blue-30,
  nav-01: $color__navy-gray-1,
  nav-02: $color__blue-90,
  nav-03: $color__purple-30,
  nav-04: $color__purple-60,
  nav-05: $color__teal-40,
  nav-06: $color__teal-50,
  nav-07: $color__blue-30,
  nav-08: $color__blue-51,
  hover-primary: darken($color__blue-51, 10%),
  hover-primary-text: darken($color__blue-51, 15%),
  hover-danger: darken(#e0182d, 10%),
  hover-secondary: $color__blue-51,
  hover-row: rgba($color__blue-40, 0.1),
);
```

</details>

- **Group**: [general](#general)

### ✅carbon--theme [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--theme: $carbon--theme--v9;
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅nav-01 [variable]

<details>
<summary>Source code</summary>

```scss
$nav-01: $color__navy-gray-1 !default;
```

</details>

- **Group**: [general](#general)

### ✅input-border [variable]

<details>
<summary>Source code</summary>

```scss
$input-border: 1px solid transparent !default;
```

</details>

- **Group**: [general](#general)

### ✅button-font-weight [variable]

<details>
<summary>Source code</summary>

```scss
$button-font-weight: 600 !default;
```

</details>

- **Group**: [general](#general)

### ✅accordion-flex-direction [variable]

<details>
<summary>Source code</summary>

```scss
$accordion-flex-direction: row !default;
```

</details>

- **Group**: [general](#general)

### ✅card-text-align [variable]

<details>
<summary>Source code</summary>

```scss
$card-text-align: center !default;
```

</details>

- **Group**: [general](#general)

### ✅checkbox-border-width [variable]

<details>
<summary>Source code</summary>

```scss
$checkbox-border-width: 2px !default;
```

</details>

- **Group**: [general](#general)

### ✅snippet-background-color [variable]

<details>
<summary>Source code</summary>

```scss
$snippet-background-color: $ui-01 !default;
```

</details>

- **Group**: [general](#general)

### ✅content-switcher-border-radius [variable]

<details>
<summary>Source code</summary>

```scss
$content-switcher-border-radius: 8px !default;
```

</details>

- **Group**: [general](#general)

### ✅data-table-heading-transform [variable]

<details>
<summary>Source code</summary>

```scss
$data-table-heading-transform: uppercase !default;
```

</details>

- **Group**: [general](#general)

### ✅modal-border-top [variable]

<details>
<summary>Source code</summary>

```scss
$modal-border-top: $brand-01 4px solid !default;
```

</details>

- **Group**: [general](#general)

### ✅progress-indicator-bar-width [variable]

<details>
<summary>Source code</summary>

```scss
$progress-indicator-bar-width: 1px inset transparent !default;
```

</details>

- **Group**: [general](#general)

### ✅radio-border-width [variable]

<details>
<summary>Source code</summary>

```scss
$radio-border-width: 2px !default;
```

</details>

- **Group**: [general](#general)

### ✅structured-list-padding [variable]

<details>
<summary>Source code</summary>

```scss
$structured-list-padding: 2rem !default;
```

</details>

- **Group**: [general](#general)

### ✅skeleton [variable]

<details>
<summary>Source code</summary>

```scss
$skeleton: rgba($color__blue-51, 0.1) !default;
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [skeleton [mixin]](#skeleton-mixin)

### ✅edited [variable]

<details>
<summary>Source code</summary>

```scss
$edited: true !default;
```

</details>

- **Group**: [general](#general)

### ✅input-border [variable]

<details>
<summary>Source code</summary>

```scss
$input-border: 1px solid transparent !default;
```

</details>

- **Group**: [general](#general)

### ✅link-visited [variable]

<details>
<summary>Source code</summary>

```scss
$link-visited: $ibm-color__purple-60 !default;
```

</details>

- **Group**: [general](#general)

### ✅tooltip-background-color [variable]

<details>
<summary>Source code</summary>

```scss
$tooltip-background-color: $inverse-02 !default;
```

</details>

- **Group**: [general](#general)

### ✅button-font-weight [variable]

<details>
<summary>Source code</summary>

```scss
$button-font-weight: 400 !default;
```

</details>

- **Group**: [general](#general)

### ✅accordion-flex-direction [variable]

<details>
<summary>Source code</summary>

```scss
$accordion-flex-direction: row-reverse !default;
```

</details>

- **Group**: [general](#general)

### ✅card-text-align [variable]

<details>
<summary>Source code</summary>

```scss
$card-text-align: center !default;
```

</details>

- **Group**: [general](#general)

### ✅checkbox-border-width [variable]

<details>
<summary>Source code</summary>

```scss
$checkbox-border-width: 2px !default;
```

</details>

- **Group**: [general](#general)

### ✅snippet-background-color [variable]

<details>
<summary>Source code</summary>

```scss
$snippet-background-color: $ui-01 !default;
```

</details>

- **Group**: [general](#general)

### ✅content-switcher-border-radius [variable]

<details>
<summary>Source code</summary>

```scss
$content-switcher-border-radius: 0px !default;
```

</details>

- **Group**: [general](#general)

### ✅data-table-heading-transform [variable]

<details>
<summary>Source code</summary>

```scss
$data-table-heading-transform: uppercase !default;
```

</details>

- **Group**: [general](#general)

### ✅date-picker-in-range-background-color [variable]

<details>
<summary>Source code</summary>

```scss
$date-picker-in-range-background-color: $ibm-color__blue-20 !default;
```

</details>

- **Group**: [general](#general)

### ✅modal-border-top [variable]

<details>
<summary>Source code</summary>

```scss
$modal-border-top: $brand-01 4px solid !default;
```

</details>

- **Group**: [general](#general)

### ✅notification-info-background-color [variable]

<details>
<summary>Source code</summary>

```scss
$notification-info-background-color: $ibm-color__blue-10 !default;
```

</details>

- **Group**: [general](#general)

### ✅progress-indicator-bar-width [variable]

<details>
<summary>Source code</summary>

```scss
$progress-indicator-bar-width: 1px inset transparent !default;
```

</details>

- **Group**: [general](#general)

### ✅copy-active [variable]

<details>
<summary>Source code</summary>

```scss
$copy-active: $active-ui !default;
```

</details>

- **Group**: [general](#general)

### ✅radio-border-width [variable]

<details>
<summary>Source code</summary>

```scss
$radio-border-width: 1px !default;
```

</details>

- **Group**: [general](#general)

### ✅structured-list-padding [variable]

<details>
<summary>Source code</summary>

```scss
$structured-list-padding: 2rem !default;
```

</details>

- **Group**: [general](#general)

### ✅tab-underline-color [variable]

<details>
<summary>Source code</summary>

```scss
$tab-underline-color: 3px solid $ibm-color__gray-30 !default;
```

</details>

- **Group**: [general](#general)

### ✅skeleton [variable]

<details>
<summary>Source code</summary>

```scss
$skeleton: rgba($color__blue-51, 0.1) !default;
```

</details>

- **Group**: [general](#general)

### ✅⚠️hover-field [variable]

<details>
<summary>Source code</summary>

```scss
$hover-field: $hover-ui !default;
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
- **Deprecated**: @access public

### ✅⚠️font-family-sans-serif [variable]

<details>
<summary>Source code</summary>

```scss
$font-family-sans-serif: 'ibm-plex-sans', Helvetica Neue, Arial, sans-serif;
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [font-family [mixin]](#font-family-mixin)
- **Deprecated**: (For v10) Use `$carbon--font-families`

### ✅⚠️font-family-serif [variable]

<details>
<summary>Source code</summary>

```scss
$font-family-serif: 'ibm-plex-serif', 'Georgia', Times, serif;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) Use `$carbon--font-families`

### ✅⚠️font-family-helvetica [variable]

<details>
<summary>Source code</summary>

```scss
$font-family-helvetica: 'IBM Helvetica', Helvetica Neue, HelveticaNeue, Helvetica, sans-serif;
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [helvetica [mixin]](#helvetica-mixin)
  - [font-family [mixin]](#font-family-mixin)
- **Deprecated**: (For v10) Use Plex fonts

### ✅⚠️rem [function]

<details>
<summary>Source code</summary>

```scss
@function rem($px) {
  @return ($px / $base-font-size) * 1rem;
}
```

</details>

- **Parameters**:

| Name  | Description             | Type    | Default value |
| ----- | ----------------------- | ------- | ------------- |
| `$px` | value of type in pixels | `Value` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
- rem(48px);
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [base-font-size [variable]](#base-font-size-variable)
- **Deprecated**: (For v10) Use `carbon--rem()`

### ✅⚠️em [function]

<details>
<summary>Source code</summary>

```scss
@function em($px) {
  @return ($px / $base-font-size) * 1em;
}
```

</details>

- **Parameters**:

| Name  | Description             | Type    | Default value |
| ----- | ----------------------- | ------- | ------------- |
| `$px` | value of type in pixels | `Value` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
- em(48px);
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [base-font-size [variable]](#base-font-size-variable)
- **Deprecated**: (For v10) Use `carbon--em()`

### ✅⚠️line-height [mixin]

There are two line heights to choose from. One for headings and one for body text

<details>
<summary>Source code</summary>

```scss
@mixin line-height($el) {
  @include deprecate(
    '`@include line-height()` has been removed. ' + 'Use `@include carbon--type-style()` instead.',
    feature-flag-enabled('breaking-changes-x'),
    true
  ) {
    @if $el == 'heading' {
      line-height: 1.25;
    } @else if $el == 'body' {
      line-height: 1.5;
    } @else {
      @warn 'Invalid argument used for @mixin line-height($el) . Please use 'heading' or 'body'.';
    }
  }
}
```

</details>

- **Parameters**:

| Name  | Description         | Type     | Default value |
| ----- | ------------------- | -------- | ------------- |
| `$el` | 'heading' or 'body' | `String` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include line-height('heading');
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [carbon--type-style [mixin]](#carbon--type-style-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
- **Used by**:
  - [typography [mixin]](#typography-mixin)
- **Deprecated**: (For v10) Use `@include carbon--type-style()`

### ✅⚠️font-smoothing [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin font-smoothing() {
  @include deprecate('`@include font-smoothing` has been removed.', feature-flag-enabled('breaking-changes-x'), true) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
- **Used by**:
  - [button-reset [mixin]](#button-reset-mixin)
- **Deprecated**: (For v10) The new type styles doesn't use this

### ✅⚠️letter-spacing [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin letter-spacing() {
  @include deprecate('`@include letter-spacing` has been removed.', feature-flag-enabled('breaking-changes-x'), true) {
    letter-spacing: 0;
  }
}
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
- **Used by**:
  - [button-reset [mixin]](#button-reset-mixin)
- **Deprecated**: (For v10) The new type styles doesn't use this

### ✅⚠️font-size-map [variable]

<details>
<summary>Source code</summary>

```scss
$font-size-map: (
  '76': 4.75rem,
  '54': 3.375rem,
  '36': 2.25rem,
  '28': 1.75rem,
  '20': 1.25rem,
  '18': 1.125rem,
  '16': 1rem,
  '14': 0.875rem,
  '12': 0.75rem,
  '11': 0.6875rem,
);
```

</details>

- **Group**: [general](#general)
- **Type**: `Map`
- **Used by**:
  - [font-size [mixin]](#font-size-mixin)
- **Deprecated**: (For v10) Superseded by `$carbon--type-scale`

### ✅⚠️font-size [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin font-size($size) {
  @include deprecate(
    '`@include font-size()` has been removed. ' + 'Use `@include carbon--type-scale()` instead.',
    feature-flag-enabled('breaking-changes-x'),
    true
  ) {
    @if map-has-key($font-size-map, $size) {
      font-size: map-get($font-size-map, $size);
    } @else {
      @warn 'This is not a step of the Carbon Type Scale! Valid sizes are 11, 12, 14, 16, 18, 20, 28, 36, 54, and 76';
    }
  }
}
```

</details>

- **Parameters**:

| Name    | Description                | Type     | Default value |
| ------- | -------------------------- | -------- | ------------- |
| `$size` | value from \$font-size-map | `String` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include font-size('76');
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [carbon--type-scale [mixin]](#carbon--type-scale-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [font-size-map [variable]](#font-size-map-variable)
- **Deprecated**: (For v10) Use `@include carbon--type-scale()`

### ✅type-style [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin type-style($name, $fluid: false) {
  @include carbon--type-style($name, $fluid);
}
```

</details>

- **Parameters**:

| Name     | Description                                 | Type      | Default value |
| -------- | ------------------------------------------- | --------- | ------------- |
| `$name`  | the name of the token to get the styles for | `String`  | —             |
| `$fluid` | specify whether to include fluid styles     | `Boolean` | `false`       |

**Example**:

<details>
<summary>Example code</summary>

```scss
-  @include type-style('body-short-01');
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [carbon--type-style [mixin]](#carbon--type-style-mixin)
- **Used by**:
  - [css-body--x [mixin]](#css-body--x-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)

### ✅prefix [variable]

Sets the prefix for all classes

<details>
<summary>Source code</summary>

```scss
$prefix: 'bx';
```

</details>

**Example**:

<details>
<summary>Example code</summary>

```scss
.bx--batch-actions
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [expanded [mixin]](#expanded-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)
  - [typography [mixin]](#typography-mixin)
  - [light-ui [mixin]](#light-ui-mixin)
  - [carbon--make-col-ready [mixin]](#carbon--make-col-ready-mixin)
  - [carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)
  - [carbon--no-gutter [mixin]](#carbon--no-gutter-mixin)
  - [carbon--hang [mixin]](#carbon--hang-mixin)
  - [carbon--aspect-ratio [mixin]](#carbon--aspect-ratio-mixin)
  - [carbon--grid [mixin]](#carbon--grid-mixin)

### ✅css--font-face [variable]

<details>
<summary>Source code</summary>

```scss
$css--font-face: true;
```

</details>

- **Group**: [general](#general)
- **Type**: `Bool`

### ✅⚠️css--use-experimental-grid [variable]

<details>
<summary>Source code</summary>

```scss
$css--use-experimental-grid: false;
```

</details>

- **Group**: [general](#general)
- **Type**: `Bool`
- **Deprecated**: (For v10) v10 always uses `@carbon/grid`

### ✅⚠️css--use-experimental-grid-fallback [variable]

<details>
<summary>Source code</summary>

```scss
$css--use-experimental-grid-fallback: false;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: (For v10) v10 always uses `@carbon/grid`

### ❌deprecations--entry [variable]

<details>
<summary>Source code</summary>

```scss
$deprecations--entry: true;
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [deprecate [mixin]](#deprecate-mixin)

### ✅/// Used to intialize the default properties for a column class, most notably

/// for setting width and default gutters when a column's breakpoint has not been
/// hit yet.
/// @param [css]

Columns

<details>
<summary>Source code</summary>

```scss
$/// Used to intialize the default properties for a column class, most notably
/// for setting width and default gutters when a column's breakpoint has not been
/// hit yet.
/// @param: Number;
```

</details>

- **Group**: [general](#general)

### ❌carbon--make-col-ready [mixin]

Used to intialize the default properties for a column class, most notably
for setting width and default gutters when a column's breakpoint has not been
hit yet.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-col-ready($gutter, $collapsed-gutter) {
  // Prevent columns from becoming too narrow when at smaller grid tiers by
  // always setting `width: 100%;`. This works because we use `flex` values
  // later on to override this initial width.
  width: 100%;
  padding-right: ($gutter / 2);
  padding-left: ($gutter / 2);

  // For our condensed use-case, our gutters collapse to 2px solid, 1px on each
  // side.
  .#{$prefix}--row--condensed &,
  .#{$prefix}--grid--condensed & {
    padding-right: ($condensed-gutter / 2);
    padding-left: ($condensed-gutter / 2);
  }
}
```

</details>

- **Parameters**:

| Name                | Description                                | Type     | Default value |
| ------------------- | ------------------------------------------ | -------- | ------------- |
| `$gutter`           | the default gutter used in the grid system | `Number` | —             |
| `$collapsed-gutter` | the condensed mode gutter                  | `Number` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
- **Used by**:
  - [carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)

### ❌carbon--make-col [mixin]

Define the width of the column for a given span and column count.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-col($span, $columns) {
  flex: 0 0 percentage($span / $columns);
  // Add a `max-width` to ensure content within each column does not blow out
  // the width of the column. Applies to IE10+ and Firefox. Chrome and Safari
  // do not appear to require this.
  max-width: percentage($span / $columns);
}
```

</details>

- **Parameters**:

| Name       | Description                           | Type     | Default value |
| ---------- | ------------------------------------- | -------- | ------------- |
| `$span`    | the number of columns covered         | `Number` | —             |
| `$columns` | the total number of columns available | `Number` | —             |

- **Group**: [general](#general)
- **Used by**:
  - [carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)

### ❌carbon--make-col-offset [mixin]

Create a column offset for a given span and column count.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-col-offset($span, $columns) {
  $offset: $span / $columns;
  @if $offset == 0 {
    margin-left: 0;
  } @else {
    margin-left: percentage($offset);
  }
}
```

</details>

- **Parameters**:

| Name       | Description                                   | Type     | Default value |
| ---------- | --------------------------------------------- | -------- | ------------- |
| `$span`    | the number of columns the offset should cover | `Number` | —             |
| `$columns` | the total number of columns available         | `Number` | —             |

- **Group**: [general](#general)
- **Used by**:
  - [carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)

### ❌carbon--make-grid-columns [mixin]

Output the CSS required for all the columns in a given grid system.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-grid-columns($breakpoints, $gutter) {
  .#{$prefix}--col {
    @include carbon--make-col-ready();
  }

  @each $breakpoint in map-keys($breakpoints) {
    $infix: carbon--breakpoint-infix($breakpoint);
    $columns: map-get(map-get($breakpoints, $breakpoint), columns);

    // Allow columns to stretch full width below their breakpoints
    @for $i from 1 through $columns {
      .#{$prefix}--col#{$infix}-#{$i} {
        @include carbon--make-col-ready();
      }
    }

    .#{$prefix}--col#{$infix},
    .#{$prefix}--col#{$infix}--auto {
      @include carbon--make-col-ready();
    }

    @include carbon--breakpoint($breakpoint, $breakpoints) {
      // Provide basic `.col-{bp}` classes for equal-width flexbox columns
      .#{$prefix}--col,
      .#{$prefix}--col#{$infix} {
        flex-basis: 0;
        flex-grow: 1;
        max-width: 100%;
      }

      .#{$prefix}--col--auto,
      .#{$prefix}--col#{$infix}--auto {
        flex: 1 0 0%;
        width: auto;
        // Reset earlier grid tiers
        max-width: 100%;
      }

      @for $i from 1 through $columns {
        .#{$prefix}--col#{$infix}-#{$i} {
          @include carbon--make-col($i, $columns);
        }
      }

      @for $i from 0 through ($columns - 1) {
        @if not($infix == '') {
          .#{$prefix}--offset#{$infix}-#{$i} {
            @include carbon--make-col-offset($i, $columns);
          }
        }
      }
    }
  }
}
```

</details>

- **Parameters**:

| Name           | Description                        | Type     | Default value |
| -------------- | ---------------------------------- | -------- | ------------- |
| `$breakpoints` | the breakpoints in the grid system | `Map`    | —             |
| `$gutter`      | the gutter for the grid system     | `Number` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--make-col-ready [mixin]](#carbon--make-col-ready-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [carbon--make-col [mixin]](#carbon--make-col-mixin)
  - [carbon--make-col-offset [mixin]](#carbon--make-col-offset-mixin)
  - [carbon--breakpoint-infix [function]](#carbon--breakpoint-infix-function)
  - [prefix [variable]](#prefix-variable)
  - [breakpoints [variable]](#breakpoints-variable)
- **Used by**:
  - [carbon--grid [mixin]](#carbon--grid-mixin)

### ✅/// Define the properties for a selector assigned to a row in the grid system.

/// @param [css]

Rows

<details>
<summary>Source code</summary>

```scss
$/// Define the properties for a selector assigned to a row in the grid system.
/// @param: Number;
```

</details>

- **Group**: [general](#general)

### ❌carbon--make-row [mixin]

Define the properties for a selector assigned to a row in the grid system.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-row($gutter) {
  display: flex;
  flex-wrap: wrap;
  margin-right: -1 * $gutter / 2;
  margin-left: -1 * $gutter / 2;
}
```

</details>

- **Parameters**:

| Name      | Description                   | Type     | Default value |
| --------- | ----------------------------- | -------- | ------------- |
| `$gutter` | the gutter in the grid system | `Number` | —             |

- **Group**: [general](#general)
- **Used by**:
  - [carbon--grid [mixin]](#carbon--grid-mixin)

### ✅/// Add no-gutter and no-gutter-- [css]

No gutter

<details>
<summary>Source code</summary>

```scss
$///Addno-gutter and no-gutter--: left, right;
```

</details>

- **Group**: [general](#general)

### ❌carbon--no-gutter [mixin]

Add no-gutter and no-gutter--{left,right} classes to the output CSS. These
classes are useful for dropping the gutter in fluid situations.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--no-gutter() {
  .#{$prefix}--no-gutter,
  .#{$prefix}--row.#{$prefix}--no-gutter [class*='#{$prefix}--col'] {
    padding-left: 0;
    padding-right: 0;
  }

  .#{$prefix}--no-gutter--left,
  .#{$prefix}--row.#{$prefix}--no-gutter--left [class*='#{$prefix}--col'] {
    padding-left: 0;
  }

  .#{$prefix}--no-gutter--right,
  .#{$prefix}--row.#{$prefix}--no-gutter--right [class*='#{$prefix}--col'] {
    padding-right: 0;
  }
}
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
- **Used by**:
  - [carbon--grid [mixin]](#carbon--grid-mixin)

### ✅/// Add hang--left and hang--right classes for a given gutter. These classes are

/// used alongside `no-gutter--left` and `no-gutter--right` to "hang" type.
/// @param [css]

Hang

<details>
<summary>Source code</summary>

```scss
$/// Add hang--left and hang--right classes for a given gutter. These classes are
/// used alongside `no-gutter--left` and `no-gutter--right` to "hang" type.
/// @param: Number;
```

</details>

- **Group**: [general](#general)

### ❌carbon--hang [mixin]

Add hang--left and hang--right classes for a given gutter. These classes are
used alongside `no-gutter--left` and `no-gutter--right` to "hang" type.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--hang($gutter) {
  .#{$prefix}--hang--left {
    padding-left: ($gutter / 2);
  }

  .#{$prefix}--hang--right {
    padding-right: ($gutter / 2);
  }
}
```

</details>

- **Parameters**:

| Name      | Description | Type     | Default value |
| --------- | ----------- | -------- | ------------- |
| `$gutter` | —           | `Number` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
- **Used by**:
  - [carbon--grid [mixin]](#carbon--grid-mixin)

### ✅carbon--aspect-ratios [variable]

The aspect ratios that are used to generate corresponding aspect ratio
classes in code

<details>
<summary>Source code</summary>

```scss
$carbon--aspect-ratios: ((16, 9), (2, 1), (4, 3), (1, 1));
```

</details>

- **Group**: [general](#general)

### ✅/// The aspect ratios that are used to generate corresponding aspect ratio

/// classes in code
/// @access public
\$carbon--aspect-ratios: ((16, 9), (2, 1), (4, 3), (1, 1));

/// Output the CSS classes for generating aspect ratio classes
/// @param [css]

Aspect ratio

<details>
<summary>Source code</summary>

```scss
$///Theaspect ratios that are used to generate corresponding aspect ratio
/// classes in code
/// @access public
$carbon--aspect-ratios: ((16, 9), (2, 1), (4, 3), (1, 1));

/// Output the CSS classes for generating aspect ratio classes
/// @param: List;
```

</details>

- **Group**: [general](#general)

### ❌carbon--aspect-ratio [mixin]

Output the CSS classes for generating aspect ratio classes

<details>
<summary>Source code</summary>

```scss
@mixin carbon--aspect-ratio($aspect-ratios) {
  .#{$prefix}--aspect-ratio {
    height: 0;
    position: relative;
  }

  .#{$prefix}--aspect-ratio--object {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }

  @each $ratio in $aspect-ratios {
    $width: nth($ratio, 1);
    $height: nth($ratio, 2);

    .#{$prefix}--aspect-ratio--#{$width}x#{$height} {
      padding-bottom: percentage($height / $width);
    }
  }
}
```

</details>

- **Parameters**:

| Name             | Description                         | Type   | Default value |
| ---------------- | ----------------------------------- | ------ | ------------- |
| `$aspect-ratios` | a list of aspect ratios to generate | `List` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
- **Used by**:
  - [carbon--grid [mixin]](#carbon--grid-mixin)

### ✅/// Create the container for a grid. Will cause full-bleed for the grid unless

/// max-width properties are added with `make-container-max-widths`
/// @param [css]

Grid

<details>
<summary>Source code</summary>

```scss
$/// Create the container for a grid. Will cause full-bleed for the grid unless
/// max-width properties are added with `make-container-max-widths`
/// @param: Map;
```

</details>

- **Group**: [general](#general)

### ❌carbon--make-container [mixin]

Create the container for a grid. Will cause full-bleed for the grid unless
max-width properties are added with `make-container-max-widths`

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-container($breakpoints) {
  margin-right: auto;
  margin-left: auto;

  @include carbon--set-largest-breakpoint();

  @each $name, $value in $breakpoints {
    $prev-breakpoint: map-get($breakpoints, carbon--breakpoint-prev($name));
    $margin: map-get($value, margin);

    @if $prev-breakpoint {
      $prev-margin: map-get($prev-breakpoint, margin);
      @if $prev-margin != $margin {
        @include carbon--breakpoint($name) {
          padding-left: #{($carbon--grid-gutter / 2) + $margin};
          padding-right: #{($carbon--grid-gutter / 2) + $margin};
        }
      }
    } @else {
      @include carbon--breakpoint($name) {
        padding-left: #{($carbon--grid-gutter / 2) + $margin};
        padding-right: #{($carbon--grid-gutter / 2) + $margin};
      }
    }
  }
}
```

</details>

- **Parameters**:

| Name           | Description | Type  | Default value |
| -------------- | ----------- | ----- | ------------- |
| `$breakpoints` | —           | `Map` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--set-largest-breakpoint [mixin]](#carbon--set-largest-breakpoint-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [breakpoints [variable]](#breakpoints-variable)
- **Used by**:
  - [carbon--grid [mixin]](#carbon--grid-mixin)

### ❌carbon--set-largest-breakpoint [mixin]

Get the last breakpoint width and set max-width to its value

<details>
<summary>Source code</summary>

```scss
@mixin carbon--set-largest-breakpoint($breakpoints) {
  $largest-breakpoint: last-map-item($breakpoints);

  max-width: map-get($largest-breakpoint, 'width');
}
```

</details>

- **Parameters**:

| Name           | Description | Type  | Default value |
| -------------- | ----------- | ----- | ------------- |
| `$breakpoints` | —           | `Map` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [last-map-item [function]](#last-map-item-function)
  - [breakpoints [variable]](#breakpoints-variable)
- **Used by**:
  - [carbon--make-container [mixin]](#carbon--make-container-mixin)

### ❌carbon--make-container-max-widths [mixin]

Add in the max-widths for each breakpoint to the container

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-container-max-widths($breakpoints) {
  @each $name, $value in $breakpoints {
    @include carbon--breakpoint($name) {
      max-width: map-get($value, width);
    }
  }
}
```

</details>

- **Parameters**:

| Name           | Description | Type  | Default value |
| -------------- | ----------- | ----- | ------------- |
| `$breakpoints` | —           | `Map` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [breakpoints [variable]](#breakpoints-variable)

### ✅carbon--grid [mixin]

Generate the CSS for a grid for the given breakpoints and gutter

<details>
<summary>Source code</summary>

```scss
@mixin carbon--grid($breakpoints, $grid-gutter) {
  .#{$prefix}--grid {
    @include carbon--make-container($breakpoints);
  }

  @include carbon--largest-breakpoint($breakpoints) {
    .#{$prefix}--grid--full-width {
      max-width: 100%;
    }
  }

  .#{$prefix}--row {
    @include carbon--make-row();
  }

  .#{$prefix}--grid--condensed .#{$prefix}--row:not(:last-of-type) {
    margin-bottom: $condensed-gutter;
  }

  .#{$prefix}--row--condensed + .#{$prefix}--row--condensed {
    margin-top: $condensed-gutter;
  }

  @include carbon--make-grid-columns($breakpoints, $grid-gutter);
  @include carbon--no-gutter();
  @include carbon--hang($grid-gutter);
  @include carbon--aspect-ratio();
}
```

</details>

- **Parameters**:

| Name           | Description | Type     | Default value |
| -------------- | ----------- | -------- | ------------- |
| `$breakpoints` | —           | `Map`    | —             |
| `$grid-gutter` | —           | `Number` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--make-container [mixin]](#carbon--make-container-mixin)
  - [carbon--largest-breakpoint [mixin]](#carbon--largest-breakpoint-mixin)
  - [carbon--make-row [mixin]](#carbon--make-row-mixin)
  - [carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)
  - [carbon--no-gutter [mixin]](#carbon--no-gutter-mixin)
  - [carbon--hang [mixin]](#carbon--hang-mixin)
  - [carbon--aspect-ratio [mixin]](#carbon--aspect-ratio-mixin)
  - [prefix [variable]](#prefix-variable)
  - [breakpoints [variable]](#breakpoints-variable)

### ✅exports [mixin]

Module export mixin
This mixin helps making sure a module is imported once and only once.

<details>
<summary>Source code</summary>

```scss
@mixin exports($name, $error: false) {
  @if (index($imported-modules, $name) == null) {
    $imported-modules: append($imported-modules, $name) !global;
    @content;
  } @else if $warn == true {
    @warn 'Module `#{$name}` has already been imported.';
  }
}
```

</details>

- **Parameters**:

| Name     | Description                                   | Type     | Default value |
| -------- | --------------------------------------------- | -------- | ------------- |
| `$name`  | Name of exported module                       | `String` | —             |
| `$error` | Error when a module has been already imported | `Bool`   | `false`       |

- **Group**: [general](#general)

### ✅carbon--breakpoint-next [function]

Get the value of the next breakpoint, or null for the last breakpoint.

<details>
<summary>Source code</summary>

```scss
@function carbon--breakpoint-next($name, $breakpoints: $carbon--grid-breakpoints, $breakpoint-names: map-keys($breakpoints)) {
  $n: index($breakpoint-names, $name);
  @if $n != null and $n < length($breakpoint-names) {
    @return nth($breakpoint-names, $n + 1);
  }
  @return null;
}
```

</details>

- **Parameters**:

| Name                                                             | Description                                    | Type                        | Default value            |
| ---------------------------------------------------------------- | ---------------------------------------------- | --------------------------- | ------------------------ |
| `$name`                                                          | the name of the brekapoint                     | `String`                    | —                        |
| `$breakpoints`                                                   | a map of breakpoints where the key is the name |
| of the breakpoint and the value is the values for the breakpoint | `Map`                                          | `$carbon--grid-breakpoints` |
| `$breakpoint-names`                                              | a list of names from the \$breakpoints map     | `List`                      | `map-keys($breakpoints)` |

- **Group**: [general](#general)
- **Returns**: `String`
- **Used by**:
  - [fluid-type-size [mixin]](#fluid-type-size-mixin)

### ✅carbon--is-smallest-breakpoint [function]

Check to see if the given breakpoint name

<details>
<summary>Source code</summary>

```scss
@function carbon--is-smallest-breakpoint() {
  @return index(map-keys($breakpoints), $name) == 1;
}
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [breakpoints [variable]](#breakpoints-variable)
- **Used by**:
  - [carbon--breakpoint-up [mixin]](#carbon--breakpoint-up-mixin)
  - [carbon--breakpoint-down [mixin]](#carbon--breakpoint-down-mixin)

### ✅carbon--largest-breakpoint-name [function]

returns the largest breakpoint name

<details>
<summary>Source code</summary>

```scss
@function carbon--largest-breakpoint-name($breakpoints: $carbon--grid-breakpoints) {
  $total-breakpoints: length($breakpoints);
  @return carbon--key-by-index($breakpoints, $total-breakpoints);
}
```

</details>

- **Parameters**:

| Name           | Description                                    | Type  | Default value               |
| -------------- | ---------------------------------------------- | ----- | --------------------------- |
| `$breakpoints` | a map of breakpoints where the key is the name | `Map` | `$carbon--grid-breakpoints` |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--key-by-index [function]](#carbon--key-by-index-function)
  - [breakpoints [variable]](#breakpoints-variable)
- **Used by**:
  - [carbon--largest-breakpoint [mixin]](#carbon--largest-breakpoint-mixin)

### ✅carbon--breakpoint-infix [function]

Get the infix for a given breakpoint in a list of breakpoints. Usesful for
generate the size part in a selector, for example: `.prefix--col-sm-2`

<details>
<summary>Source code</summary>

```scss
@function carbon--breakpoint-infix($name) {
  @return '-#{$name}';
}
```

</details>

- **Parameters**:

| Name    | Description                | Type     | Default value |
| ------- | -------------------------- | -------- | ------------- |
| `$name` | the name of the breakpoint | `String` | —             |

- **Group**: [general](#general)
- **Returns**: `String`
- **Used by**:
  - [carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)

### ✅carbon--breakpoint-up [mixin]

Generate a media query up to the width of the given breakpoint name

<details>
<summary>Source code</summary>

```scss
@mixin carbon--breakpoint-up($name, $breakpoints: $carbon--grid-breakpoints) {
  @if type-of($name) == 'number' {
    @media (min-width: $name) {
      @content;
    }
  } @else if map-has-key($breakpoints, $name) {
    $breakpoint: map-get($breakpoints, $name);
    $width: map-get($breakpoint, width);
    @if carbon--is-smallest-breakpoint($name, $breakpoints) {
      @content;
    } @else {
      @media (min-width: $width) {
        @content;
      }
    }
  } @else {
    @error 'Unable to find a breakpoint with name `#{$name}`. Expected one of: (#{map-keys($breakpoints)})';
  }
}
```

</details>

- **Parameters**:

| Name           | Description                                    | Type               | Default value               |
| -------------- | ---------------------------------------------- | ------------------ | --------------------------- |
| `$name`        | —                                              | `string \| number` | —                           |
| `$breakpoints` | a map of breakpoints where the key is the name | `Map`              | `$carbon--grid-breakpoints` |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--is-smallest-breakpoint [function]](#carbon--is-smallest-breakpoint-function)
  - [breakpoints [variable]](#breakpoints-variable)
- **Used by**:
  - [carbon--breakpoint-between [mixin]](#carbon--breakpoint-between-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)

### ✅carbon--breakpoint-down [mixin]

Generate a media query for the maximum width of the given styles

<details>
<summary>Source code</summary>

```scss
@mixin carbon--breakpoint-down($name, $breakpoints: $carbon--grid-breakpoints) {
  @if type-of($name) == 'number' {
    @media (max-width: $name) {
      @content;
    }
  } @else if map-has-key($breakpoints, $name) {
    $breakpoint: map-get($breakpoints, $name);
    $width: map-get($breakpoint, width);
    @if carbon--is-smallest-breakpoint($name, $breakpoints) {
      @content;
    } @else {
      @media (max-width: $width) {
        @content;
      }
    }
  } @else {
    @error 'Unable to find a breakpoint with name `#{$name}`. Expected one of: (#{map-keys($breakpoints)})';
  }
}
```

</details>

- **Parameters**:

| Name           | Description                                    | Type               | Default value               |
| -------------- | ---------------------------------------------- | ------------------ | --------------------------- |
| `$name`        | —                                              | `string \| number` | —                           |
| `$breakpoints` | a map of breakpoints where the key is the name | `Map`              | `$carbon--grid-breakpoints` |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--is-smallest-breakpoint [function]](#carbon--is-smallest-breakpoint-function)
  - [breakpoints [variable]](#breakpoints-variable)
- **Used by**:
  - [max-breakpoint [mixin]](#max-breakpoint-mixin)
  - [carbon--breakpoint-between [mixin]](#carbon--breakpoint-between-mixin)

### ✅carbon--breakpoint-between [mixin]

Generate a media query for the range between the lower and upper
breakpoints.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--breakpoint-between($lower, $upper) {
  $is-number-lower: type-of($lower) == 'number';
  $is-number-upper: type-of($upper) == 'number';
  $min: if($is-number-lower, $lower, map-get($breakpoints, $lower));
  $max: if($is-number-upper, $upper, map-get($breakpoints, $upper));

  @if $min and $max {
    $min-width: if(not $is-number-lower and $min, map-get($min, width), $min);
    $max-width: if(not $is-number-upper and $max, map-get($max, width), $max);
    @media (min-width: $min-width) and (max-width: $max-width) {
      @content;
    }
  } @else if $min != null and $max == null {
    @include carbon--breakpoint-up($lower) {
      @content;
    }
  } @else if $min == null and $max != null {
    @include carbon--breakpoint-down($upper) {
      @content;
    }
  } @else {
    @error 'Unable to find a breakpoint to satisfy: (#{$lower},#{$upper}). Expected both to be one of (#{map-keys($breakpoints)}).';
  }
}
```

</details>

- **Parameters**:

| Name     | Description | Type               | Default value |
| -------- | ----------- | ------------------ | ------------- |
| `$lower` | —           | `string \| number` | —             |
| `$upper` | —           | `string \| number` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--breakpoint-up [mixin]](#carbon--breakpoint-up-mixin)
  - [carbon--breakpoint-down [mixin]](#carbon--breakpoint-down-mixin)
  - [breakpoints [variable]](#breakpoints-variable)

### ✅carbon--largest-breakpoint [mixin]

generate media query for the largest breakpoint

<details>
<summary>Source code</summary>

```scss
@mixin carbon--largest-breakpoint($breakpoints: $carbon--grid-breakpoints) {
  @include carbon--breakpoint(carbon--largest-breakpoint-name()) {
    @content;
  }
}
```

</details>

- **Parameters**:

| Name           | Description                                    | Type  | Default value               |
| -------------- | ---------------------------------------------- | ----- | --------------------------- |
| `$breakpoints` | a map of breakpoints where the key is the name | `Map` | `$carbon--grid-breakpoints` |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [carbon--largest-breakpoint-name [function]](#carbon--largest-breakpoint-name-function)
- **Used by**:
  - [carbon--grid [mixin]](#carbon--grid-mixin)

### ✅carbon--breakpoint [mixin]

Generate a media query for a given breakpoint

<details>
<summary>Source code</summary>

```scss
@mixin carbon--breakpoint($name, $breakpoints: $carbon--grid-breakpoints) {
  @include carbon--breakpoint-up($name, $breakpoints) {
    @content;
  }
}
```

</details>

- **Parameters**:

| Name           | Description                                    | Type               | Default value               |
| -------------- | ---------------------------------------------- | ------------------ | --------------------------- |
| `$name`        | —                                              | `string \| number` | —                           |
| `$breakpoints` | a map of breakpoints where the key is the name | `Map`              | `$carbon--grid-breakpoints` |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--breakpoint-up [mixin]](#carbon--breakpoint-up-mixin)
  - [breakpoints [variable]](#breakpoints-variable)
- **Used by**:
  - [carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)
  - [carbon--make-container [mixin]](#carbon--make-container-mixin)
  - [carbon--make-container-max-widths [mixin]](#carbon--make-container-max-widths-mixin)
  - [carbon--largest-breakpoint [mixin]](#carbon--largest-breakpoint-mixin)
  - [fluid-type [mixin]](#fluid-type-mixin)

### ✅carbon--rem [function]

Convert a given px unit to a rem unit

<details>
<summary>Source code</summary>

```scss
@function carbon--rem($px) {
  @return ($px / $carbon--base-font-size) * 1rem;
}
```

</details>

- **Parameters**:

| Name  | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `$px` | —           | `px` | —             |

- **Group**: [general](#general)
- **Returns**: `rem`
- **Used by**:
  - [carbon--mini-units [function]](#carbon--mini-units-function)

### ✅carbon--em [function]

Convert a given px unit to a em unit

<details>
<summary>Source code</summary>

```scss
@function carbon--em($px) {
  @return ($px / $carbon--base-font-size) * 1em;
}
```

</details>

- **Parameters**:

| Name  | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `$px` | —           | `px` | —             |

- **Group**: [general](#general)
- **Returns**: `em`

### ✅carbon--get-column-width [function]

Get the column width for a given breakpoint. Useful for figuring out key
heights

<details>
<summary>Source code</summary>

```scss
@function carbon--get-column-width($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    $values: map-get($breakpoints, $breakpoint);
    $width: map-get($values, width);
    $margin: map-get($values, margin);
    $columns: map-get($values, columns);

    @return ($width - (2 * $margin)) / $columns;
  } @else {
    @warn 'Breakpoint: `#{$breakpoint}` is not a valid breakpoint.';
  }
}
```

</details>

- **Parameters**:

| Name          | Description | Type     | Default value |
| ------------- | ----------- | -------- | ------------- |
| `$breakpoint` | —           | `string` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [breakpoints [variable]](#breakpoints-variable)

### ✅carbon--key-height [function]

Get the value of a key height step at a given breakpoint

<details>
<summary>Source code</summary>

```scss
@function carbon--key-height($breakpoint, $step) {
  @if map-has-key($carbon--key-height-scales, $breakpoint) {
    @return nth(map-get($carbon--key-height-scales, $breakpoint), $step);
  } @else {
    @warn 'Breakpoint: `#{$breakpoint}` is not a valid breakpoint.';
  }
}
```

</details>

- **Parameters**:

| Name          | Description | Type     | Default value |
| ------------- | ----------- | -------- | ------------- |
| `$breakpoint` | —           | `string` | —             |
| `$step`       | —           | `number` | —             |

- **Group**: [general](#general)

### ✅carbon--mini-units [function]

Get the value of the corresponding number of units

<details>
<summary>Source code</summary>

```scss
@function carbon--mini-units($count) {
  @return carbon--rem($carbon--mini-unit-size * $count);
}
```

</details>

- **Parameters**:

| Name     | Description                              | Type     | Default value |
| -------- | ---------------------------------------- | -------- | ------------- |
| `$count` | the number of units to get the value for | `number` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--rem [function]](#carbon--rem-function)

### ✅map-deep-get [function]

Map deep get

<details>
<summary>Source code</summary>

```scss
@function map-deep-get($map, $keys) {
  @each $key in $keys {
    $map: map-get($map, $key);
  }
  @return $map;
}
```

</details>

- **Parameters**:

| Name    | Description | Type      | Default value |
| ------- | ----------- | --------- | ------------- |
| `$map`  | Map         | `Map`     | —             |
| `$keys` | Key chain   | `Arglist` | —             |

- **Group**: [general](#general)
- **Returns**: `*` Desired value

### ✅carbon--key-by-index [function]

Key by Index
provide a $map, and $index, and get back the relevant
key value.

<details>
<summary>Source code</summary>

```scss
@function carbon--key-by-index($map, $index) {
  $keys: map-keys($map);
  @return nth($keys, $index);
}
```

</details>

- **Parameters**:

| Name     | Description | Type      | Default value |
| -------- | ----------- | --------- | ------------- |
| `$map`   | Map         | `Map`     | —             |
| `$index` | Key chain   | `Integer` | —             |

- **Group**: [general](#general)
- **Returns**: `String` Desired value
- **Used by**:
  - [carbon--largest-breakpoint-name [function]](#carbon--largest-breakpoint-name-function)
  - [last-map-item [function]](#last-map-item-function)

### ✅last-map-item [function]

Last Map Item
Pass in a map, and get the last one in the list back.

<details>
<summary>Source code</summary>

```scss
@function last-map-item($map) {
  $total-length: length($map);
  @return map-get($map, carbon--key-by-index($map, $total-length));
}
```

</details>

- **Parameters**:

| Name   | Description | Type  | Default value |
| ------ | ----------- | ----- | ------------- |
| `$map` | Map         | `Map` | —             |

- **Group**: [general](#general)
- **Returns**: `*` Desired value
- **Requires**:
  - [carbon--key-by-index [function]](#carbon--key-by-index-function)
- **Used by**:
  - [carbon--set-largest-breakpoint [mixin]](#carbon--set-largest-breakpoint-mixin)

### ✅carbon--easings [variable]

Common easings for components in the Carbon Design System

<details>
<summary>Source code</summary>

```scss
$carbon--easings: (
  standard: (
    productive: cubic-bezier(0.2, 0, 0.38, 0.9),
    expressive: cubic-bezier(0.4, 0.14, 0.3, 1),
  ),
  entrance: (
    productive: cubic-bezier(0, 0, 0.38, 0.9),
    expressive: cubic-bezier(0, 0, 0.3, 1),
  ),
  exit: (
    productive: cubic-bezier(0.2, 0, 1, 0.9),
    expressive: cubic-bezier(0.4, 0.14, 1, 1),
  ),
);
```

</details>

- **Group**: [general](#general)

### ✅carbon--motion [function]

Get the transition-timing-function for a given easing and motion mode.
Easings that are currently supported include: standard, entrance, and exit.
We also offer two modes: productive and expressive.

<details>
<summary>Source code</summary>

```scss
@function carbon--motion($name, $mode) {
  @if map-has-key($easings, $name) {
    $easing: map-get($easings, $name);
    @if map-has-key($easing, $mode) {
      @return map-get($easing, $mode);
    } @else {
      @error 'Unable to find a mode for the easing #{$easing} called: #{$mode}.';
    }
  } @else {
    @error 'Unable to find an easing named #{$name} in our supported easings.';
  }
}
```

</details>

- **Parameters**:

| Name    | Description                           | Type     | Default value |
| ------- | ------------------------------------- | -------- | ------------- |
| `$name` | the name of the easing curve to apply | `String` | —             |
| `$mode` | the mode for the easing curve to use  | `String` | —             |

- **Group**: [general](#general)
- **Returns**: `cubic-bezier`
- **Used by**:
  - [motion [function]](#motion-function)
  - [carbon--motion [mixin]](#carbon--motion-mixin)

### ✅carbon--motion [mixin]

Set the transition-timing-function for a given easing and motion mode.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--motion($name, $mode) {
  transition-timing-function: carbon--motion($name, $mode);
}
```

</details>

- **Parameters**:

| Name    | Description                           | Type     | Default value |
| ------- | ------------------------------------- | -------- | ------------- |
| `$name` | the name of the easing curve to apply | `String` | —             |
| `$mode` | the mode for the easing curve to use  | `String` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--motion [function]](#carbon--motion-function)
- **Used by**:
  - [motion [mixin]](#motion-mixin)

### ✅carbon--theme [mixin]

Define theme variables

<details>
<summary>Source code</summary>

```scss
@mixin carbon--theme($theme) {
  $interactive-01: map-get($theme, interactive-01) !global;
  $interactive-02: map-get($theme, interactive-02) !global;
  $interactive-03: map-get($theme, interactive-03) !global;
  $interactive-04: map-get($theme, interactive-04) !global;
  $ui-background: map-get($theme, ui-background) !global;
  $ui-01: map-get($theme, ui-01) !global;
  $ui-02: map-get($theme, ui-02) !global;
  $ui-03: map-get($theme, ui-03) !global;
  $ui-04: map-get($theme, ui-04) !global;
  $ui-05: map-get($theme, ui-05) !global;
  $text-01: map-get($theme, text-01) !global;
  $text-02: map-get($theme, text-02) !global;
  $text-03: map-get($theme, text-03) !global;
  $text-04: map-get($theme, text-04) !global;
  $icon-01: map-get($theme, icon-01) !global;
  $icon-02: map-get($theme, icon-02) !global;
  $icon-03: map-get($theme, icon-03) !global;
  $link-01: map-get($theme, link-01) !global;
  $field-01: map-get($theme, field-01) !global;
  $field-02: map-get($theme, field-02) !global;
  $inverse-01: map-get($theme, inverse-01) !global;
  $inverse-02: map-get($theme, inverse-02) !global;
  $support-01: map-get($theme, support-01) !global;
  $support-02: map-get($theme, support-02) !global;
  $support-03: map-get($theme, support-03) !global;
  $support-04: map-get($theme, support-04) !global;
  $overlay-01: map-get($theme, overlay-01) !global;
  $focus: map-get($theme, focus) !global;
  $hover-primary: map-get($theme, hover-primary) !global;
  $active-primary: map-get($theme, active-primary) !global;
  $hover-primary-text: map-get($theme, hover-primary-text) !global;
  $hover-secondary: map-get($theme, hover-secondary) !global;
  $active-secondary: map-get($theme, active-secondary) !global;
  $hover-tertiary: map-get($theme, hover-tertiary) !global;
  $active-tertiary: map-get($theme, active-tertiary) !global;
  $hover-ui: map-get($theme, hover-ui) !global;
  $active-ui: map-get($theme, active-ui) !global;
  $selected-ui: map-get($theme, selected-ui) !global;
  $hover-selected-ui: map-get($theme, hover-selected-ui) !global;
  $hover-danger: map-get($theme, hover-danger) !global;
  $active-danger: map-get($theme, active-danger) !global;
  $hover-row: map-get($theme, hover-row) !global;
  $visited-link: map-get($theme, visited-link) !global;
  $disabled-01: map-get($theme, disabled-01) !global;
  $disabled-02: map-get($theme, disabled-02) !global;
  $disabled-03: map-get($theme, disabled-03) !global;
  $highlight: map-get($theme, highlight) !global;
  $brand-01: map-get($theme, brand-01) !global;
  $brand-02: map-get($theme, brand-02) !global;
  $brand-03: map-get($theme, brand-03) !global;
  $active-01: map-get($theme, active-01) !global;
  $hover-field: map-get($theme, hover-field) !global;

  @content;

  // Reset to default theme after apply in content
  @if $theme != $carbon--theme {
    @include carbon--theme;
  }
}
```

</details>

- **Parameters**:

| Name     | Description         | Type  | Default value |
| -------- | ------------------- | ----- | ------------- |
| `$theme` | map of theme tokens | `Map` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [hover-field [variable]](#hover-field-variable)
  - [carbon--theme [variable]](#carbon--theme-variable)

### ✅carbon--font-families [variable]

Font family fallbacks for: IBM Plex Mono, IBM Plex Sans, IBM Plex Sans
Condensed, IBM Plex Sans Hebrew, and IBM Plex Serif

<details>
<summary>Source code</summary>

```scss
$carbon--font-families: (
  'mono': unquote("'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace"),
  'sans': unquote("'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif"),
  'sans-condensed': unquote("'IBM Plex Sans Condensed', 'Helvetica Neue', Arial, sans-serif"),
  'sans-hebrew': unquote("'IBM Plex Sans Hebrew', 'Helvetica Hebrew', 'Arial Hebrew', sans-serif"),
  'serif': unquote("'IBM Plex Serif', 'Georgia', Times, serif"),
);
```

</details>

- **Group**: [general](#general)
- **Type**: `{Map}`
- **Used by**:
  - [carbon--font-family [function]](#carbon--font-family-function)

### ✅carbon--font-family [function]

Get the font-family for an IBM Plex font.

<details>
<summary>Source code</summary>

```scss
@function carbon--font-family($name) {
  @return map-get($carbon--font-families, $name);
}
```

</details>

- **Parameters**:

| Name    | Description | Type     | Default value |
| ------- | ----------- | -------- | ------------- |
| `$name` | —           | `String` | —             |

- **Group**: [general](#general)
- **Returns**: `String`
- **Requires**:
  - [carbon--font-families [variable]](#carbon--font-families-variable)
- **Used by**:
  - [carbon--font-family [mixin]](#carbon--font-family-mixin)

### ✅carbon--font-family [mixin]

Include the `font-family` definition for the given name in your selector.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--font-family($name) {
  font-family: carbon--font-family($name);
}
```

</details>

- **Parameters**:

| Name    | Description | Type     | Default value |
| ------- | ----------- | -------- | ------------- |
| `$name` | —           | `String` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--font-family [function]](#carbon--font-family-function)
- **Used by**:
  - [carbon--type-reset [mixin]](#carbon--type-reset-mixin)

### ✅carbon--font-weights [variable]

Suggested font weights to be used in product.

<details>
<summary>Source code</summary>

```scss
$carbon--font-weights: (
  'light': 300,
  'regular': 400,
  'semibold': 600,
);
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [carbon--font-weight [function]](#carbon--font-weight-function)

### ✅carbon--font-weight [function]

Retrieve the font-weight value for a given name

<details>
<summary>Source code</summary>

```scss
@function carbon--font-weight($weight) {
  @return map-get($carbon--font-weights, $weight);
}
```

</details>

- **Parameters**:

| Name      | Description | Type     | Default value |
| --------- | ----------- | -------- | ------------- |
| `$weight` | —           | `String` | —             |

- **Group**: [general](#general)
- **Returns**: `Number`
- **Requires**:
  - [carbon--font-weights [variable]](#carbon--font-weights-variable)
- **Used by**:
  - [carbon--font-weight [mixin]](#carbon--font-weight-mixin)

### ✅carbon--font-weight [mixin]

Set the `font-weight` property with the value for a given name

<details>
<summary>Source code</summary>

```scss
@mixin carbon--font-weight($weight) {
  font-weight: carbon--font-weight($weight);
}
```

</details>

- **Parameters**:

| Name      | Description | Type     | Default value |
| --------- | ----------- | -------- | ------------- |
| `$weight` | —           | `String` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--font-weight [function]](#carbon--font-weight-function)
- **Used by**:
  - [carbon--type-reset [mixin]](#carbon--type-reset-mixin)

### ✅carbon--type-reset [mixin]

Include a type reset that individuals can use in their projects for
consistent rendering

<details>
<summary>Source code</summary>

```scss
@mixin carbon--type-reset() {
  html {
    font-size: $carbon--base-font-size;
  }

  body {
    @include carbon--font-family('sans');
    @include carbon--font-weight('regular');

    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  strong {
    font-weight: 600;
  }
}
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [carbon--font-family [mixin]](#carbon--font-family-mixin)
  - [carbon--font-weight [mixin]](#carbon--font-weight-mixin)

### ✅carbon--get-type-size [function]

Compute the type size for the given type scale step

<details>
<summary>Source code</summary>

```scss
@function carbon--get-type-size($step) {
  @if $step == 1 {
    @return 12px;
  }
  // Yn = Yn-1 + {INT[(n-2)/4] + 1} * 2
  @return carbon--get-type-size($step - 1) + (floor(($step - 2) / 4) + 1) * 2;
}
```

</details>

- **Parameters**:

| Name    | Description | Type     | Default value |
| ------- | ----------- | -------- | ------------- |
| `$step` | —           | `Number` | —             |

- **Group**: [general](#general)
- **Returns**: `px`

### ✅carbon--type-scale [variable]

Our type scale. Follows a custom formula for determining each step size.
Supports sizes from 12px to 92px.

<details>
<summary>Source code</summary>

```scss
$carbon--type-scale: ();
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [carbon--type-scale [function]](#carbon--type-scale-function)

### ✅carbon--type-scale [function]

Get the value of a specific step in the typescale

<details>
<summary>Source code</summary>

```scss
@function carbon--type-scale($step) {
  @return nth($carbon--type-scale, $step);
}
```

</details>

- **Parameters**:

| Name    | Description | Type     | Default value |
| ------- | ----------- | -------- | ------------- |
| `$step` | —           | `Number` | —             |

- **Group**: [general](#general)
- **Returns**: `rem`
- **Requires**:
  - [carbon--type-scale [variable]](#carbon--type-scale-variable)
- **Used by**:
  - [carbon--type-scale [mixin]](#carbon--type-scale-mixin)
  - [carbon--font-size [mixin]](#carbon--font-size-mixin)

### ✅carbon--type-scale [mixin]

Set the font-size value of a selector with the value at the given \$step

<details>
<summary>Source code</summary>

```scss
@mixin carbon--type-scale($step) {
  font-size: carbon--type-scale($step);
}
```

</details>

- **Parameters**:

| Name    | Description | Type     | Default value |
| ------- | ----------- | -------- | ------------- |
| `$step` | —           | `Number` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--type-scale [function]](#carbon--type-scale-function)
- **Used by**:
  - [typescale [mixin]](#typescale-mixin)
  - [font-size [mixin]](#font-size-mixin)

### ✅carbon--font-size [mixin]

Alias of `type-scale` mixin.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--font-size($step) {
  font-size: carbon--type-scale($step);
}
```

</details>

- **Parameters**:

| Name    | Description | Type     | Default value |
| ------- | ----------- | -------- | ------------- |
| `$step` | —           | `Number` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--type-scale [function]](#carbon--type-scale-function)

### ✅fluid-type [mixin]

This helper includes fluid type styles for the given token value. Fluid type
means that the `font-size` is computed using `calc()` in order to be
determined by the screen size instead of a breakpoint. As a result, fluid
styles should be used with caution in fixed width contexts.

In addition, we make use of %-based line-heights so that the line-height of
each type style is computed correctly due to the dynamic nature of the
`font-size`.

Most of the logic for this work comes from CSS Tricks:
https://css-tricks.com/snippets/css/fluid-typography/

<details>
<summary>Source code</summary>

```scss
@mixin fluid-type($type-styles, $breakpoints) {
  // Include the initial styles for the given token by default without any
  // media query guard. This includes `font-size` as a fallback in the case
  // that a browser does not support `calc()`
  @include properties(map-remove($type-styles, breakpoints));
  // We also need to include the `sm` styles by default since they don't
  // appear in the fluid styles for tokens
  @include fluid-type-size($type-styles, sm, $breakpoints);

  // Finally, we need to go through all the breakpoints defined in the type
  // token and apply the properties and fluid type size for that given
  // breakpoint
  @each $name, $values in map-get($type-styles, breakpoints) {
    @include carbon--breakpoint($name) {
      @include properties($values);
      @include fluid-type-size($type-styles, $name, $breakpoints);
    }
  }
}
```

</details>

- **Parameters**:

| Name           | Description                     | Type   | Default value |
| -------------- | ------------------------------- | ------ | ------------- |
| `$type-styles` | the value of a given type token | `Map`  | —             |
| `$breakpoints` | custom breakpoints to use       | `?Map` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [fluid-type-size [mixin]](#fluid-type-size-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [breakpoints [variable]](#breakpoints-variable)
- **Used by**:
  - [carbon--type-style [mixin]](#carbon--type-style-mixin)

### ✅fluid-type-size [mixin]

Computes the fluid `font-size` for a given type style and breakpoint

<details>
<summary>Source code</summary>

```scss
@mixin fluid-type-size($type-styles, $name, $breakpoints) {
  // Get the information about the breakpoint we're currently working in. Useful
  // for getting initial width information
  $breakpoint: map-get($breakpoints, $name);

  // Our fluid styles are captured under the 'breakpoints' property in our type
  // styles map. These define what values to treat as `max-` variables below
  $fluid-sizes: map-get($type-styles, breakpoints);
  $fluid-breakpoint: ();
  // Special case for `sm` because the styles for small are on the type style
  // directly
  @if $name == sm {
    $fluid-breakpoint: map-remove($type-styles, breakpoints);
  } @else {
    $fluid-breakpoint: map-get($fluid-sizes, $name);
  }

  // Initialize our font-sizes to the default size for the type style
  $max-font-size: map-get($type-styles, font-size);
  $min-font-size: map-get($type-styles, font-size);
  @if map-has-key($fluid-breakpoint, font-size) {
    $min-font-size: map-get($fluid-breakpoint, font-size);
  }

  // Initialize our min and max width to the width of the current breakpoint
  $max-vw: map-get($breakpoint, width);
  $min-vw: map-get($breakpoint, width);

  // We can use `breakpoint-next` to see if there is another breakpoint we can
  // use to update `max-font-size` and `max-vw` with larger values
  $next-breakpoint-available: carbon--breakpoint-next($name, $breakpoints);
  $next-fluid-breakpoint-name: null;

  // We need to figure out what the next available fluid breakpoint is for our
  // given $type-styles. In this loop we try and iterate through breakpoints
  // until we either manually set $next-breakpoint-available to null or
  // `breakpoint-next` returns null.
  @while $next-breakpoint-available {
    @if map-has-key($fluid-sizes, $next-breakpoint-available) {
      $next-fluid-breakpoint-name: $next-breakpoint-available;
      $next-breakpoint-available: null;
    } @else {
      $next-breakpoint-available: carbon--breakpoint-next($next-breakpoint-available, $breakpoints);
    }
  }

  // If we have found the next available fluid breakpoint name, then we know
  // that we have values that we can use to set max-font-size and max-vw as both
  // values derive from the next breakpoint
  @if $next-fluid-breakpoint-name {
    $next-fluid-breakpoint: map-get($breakpoints, $next-fluid-breakpoint-name);
    $max-font-size: map-get(map-get($fluid-sizes, $next-fluid-breakpoint-name), font-size);
    $max-vw: map-get($next-fluid-breakpoint, width);

    // prettier-ignore
    font-size: calc(#{$min-font-size} +
      #{strip-unit($max-font-size - $min-font-size)} *
      ((100vw - #{$min-vw}) / #{strip-unit($max-vw - $min-vw)})
    );
  } @else {
    // Otherwise, just default to setting the font size found from the type
    // style or the given fluid breakpoint in the type style
    font-size: $min-font-size;
  }
}
```

</details>

- **Parameters**:

| Name           | Description                                            | Type   | Default value |
| -------------- | ------------------------------------------------------ | ------ | ------------- |
| `$type-styles` | the styles for a given token                           | `Map`  | —             |
| `$name`        | the name of the breakpoint to which we apply the fluid |
| styles         | `String`                                               | —      |
| `$breakpoints` | the breakpoints for the grid system                    | `?Map` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--breakpoint-next [function]](#carbon--breakpoint-next-function)
  - [breakpoints [variable]](#breakpoints-variable)
- **Used by**:
  - [fluid-type [mixin]](#fluid-type-mixin)

### ✅carbon--type-style [mixin]

Helper mixin to include the styles for a given token in any selector in your
project. Also includes an optional fluid option that will enable fluid
styles for the token if they are defined. Fluid styles will cause the
token's font-size to be computed based on the viewport size. As a result, use
with caution in fixed contexts.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--type-style($name, $fluid, $breakpoints) {
  @if not map-has-key($tokens, $name) {
    @error 'Unable to find a token with the name: `#{$name}`';
  }

  $token: map-get($tokens, $name);

  // If $fluid is set to true and the token has breakpoints defined for fluid
  // styles, delegate to the fluid-type helper for the given token
  @if $fluid == true and map-has-key($token, 'breakpoints') {
    @include fluid-type($token, $breakpoints);
  } @else {
    // Otherwise, we just include all the property declarations directly on the
    // selector
    @include properties(map-remove($token, 'breakpoints'));
  }
}
```

</details>

- **Parameters**:

| Name           | Description                                     | Type       | Default value |
| -------------- | ----------------------------------------------- | ---------- | ------------- |
| `$name`        | the name of the token to get the styles for     | `String`   | —             |
| `$fluid`       | specify whether to include fluid styles for the | `?Boolean` | —             |
| `$breakpoints` | provide a custom breakpoint map to use          |
| token          | `?Map`                                          | —          |

- **Group**: [general](#general)
- **Requires**:
  - [fluid-type [mixin]](#fluid-type-mixin)
  - [breakpoints [variable]](#breakpoints-variable)
- **Used by**:
  - [line-height [mixin]](#line-height-mixin)
  - [type-style [mixin]](#type-style-mixin)

### ✅/// Used to intialize the default properties for a column class, most notably

/// for setting width and default gutters when a column's breakpoint has not been
/// hit yet.
/// @param [css]

Columns

<details>
<summary>Source code</summary>

```scss
$/// Used to intialize the default properties for a column class, most notably
/// for setting width and default gutters when a column's breakpoint has not been
/// hit yet.
/// @param: Number;
```

</details>

- **Group**: [general](#general)

### ❌carbon--make-col-ready [mixin]

Used to intialize the default properties for a column class, most notably
for setting width and default gutters when a column's breakpoint has not been
hit yet.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-col-ready($gutter, $collapsed-gutter) {
  // Prevent columns from becoming too narrow when at smaller grid tiers by
  // always setting `width: 100%;`. This works because we use `flex` values
  // later on to override this initial width.
  width: 100%;
  padding-right: ($gutter / 2);
  padding-left: ($gutter / 2);

  // For our condensed use-case, our gutters collapse to 2px solid, 1px on each
  // side.
  .#{$prefix}--row--condensed &,
  .#{$prefix}--grid--condensed & {
    padding-right: ($condensed-gutter / 2);
    padding-left: ($condensed-gutter / 2);
  }
}
```

</details>

- **Parameters**:

| Name                | Description                                | Type     | Default value |
| ------------------- | ------------------------------------------ | -------- | ------------- |
| `$gutter`           | the default gutter used in the grid system | `Number` | —             |
| `$collapsed-gutter` | the condensed mode gutter                  | `Number` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [prefix [variable]](#prefix-variable)

### ❌carbon--make-col [mixin]

Define the width of the column for a given span and column count.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-col($span, $columns) {
  flex: 0 0 percentage($span / $columns);
  // Add a `max-width` to ensure content within each column does not blow out
  // the width of the column. Applies to IE10+ and Firefox. Chrome and Safari
  // do not appear to require this.
  max-width: percentage($span / $columns);
}
```

</details>

- **Parameters**:

| Name       | Description                           | Type     | Default value |
| ---------- | ------------------------------------- | -------- | ------------- |
| `$span`    | the number of columns covered         | `Number` | —             |
| `$columns` | the total number of columns available | `Number` | —             |

- **Group**: [general](#general)

### ❌carbon--make-col-offset [mixin]

Create a column offset for a given span and column count.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-col-offset($span, $columns) {
  $offset: $span / $columns;
  @if $offset == 0 {
    margin-left: 0;
  } @else {
    margin-left: percentage($offset);
  }
}
```

</details>

- **Parameters**:

| Name       | Description                                   | Type     | Default value |
| ---------- | --------------------------------------------- | -------- | ------------- |
| `$span`    | the number of columns the offset should cover | `Number` | —             |
| `$columns` | the total number of columns available         | `Number` | —             |

- **Group**: [general](#general)

### ❌carbon--make-grid-columns [mixin]

Output the CSS required for all the columns in a given grid system.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-grid-columns($breakpoints, $gutter) {
  .#{$prefix}--col {
    @include carbon--make-col-ready();
  }

  @each $breakpoint in map-keys($breakpoints) {
    $infix: carbon--breakpoint-infix($breakpoint);
    $columns: map-get(map-get($breakpoints, $breakpoint), columns);

    // Allow columns to stretch full width below their breakpoints
    @for $i from 1 through $columns {
      .#{$prefix}--col#{$infix}-#{$i} {
        @include carbon--make-col-ready();
      }
    }

    .#{$prefix}--col#{$infix},
    .#{$prefix}--col#{$infix}--auto {
      @include carbon--make-col-ready();
    }

    @include carbon--breakpoint($breakpoint, $breakpoints) {
      // Provide basic `.col-{bp}` classes for equal-width flexbox columns
      .#{$prefix}--col,
      .#{$prefix}--col#{$infix} {
        flex-basis: 0;
        flex-grow: 1;
        max-width: 100%;
      }

      .#{$prefix}--col--auto,
      .#{$prefix}--col#{$infix}--auto {
        flex: 1 0 0%;
        width: auto;
        // Reset earlier grid tiers
        max-width: 100%;
      }

      @for $i from 1 through $columns {
        .#{$prefix}--col#{$infix}-#{$i} {
          @include carbon--make-col($i, $columns);
        }
      }

      @for $i from 0 through ($columns - 1) {
        @if not($infix == '') {
          .#{$prefix}--offset#{$infix}-#{$i} {
            @include carbon--make-col-offset($i, $columns);
          }
        }
      }
    }
  }
}
```

</details>

- **Parameters**:

| Name           | Description                        | Type     | Default value |
| -------------- | ---------------------------------- | -------- | ------------- |
| `$breakpoints` | the breakpoints in the grid system | `Map`    | —             |
| `$gutter`      | the gutter for the grid system     | `Number` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--make-col-ready [mixin]](#carbon--make-col-ready-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [carbon--make-col [mixin]](#carbon--make-col-mixin)
  - [carbon--make-col-offset [mixin]](#carbon--make-col-offset-mixin)
  - [carbon--breakpoint-infix [function]](#carbon--breakpoint-infix-function)
  - [prefix [variable]](#prefix-variable)
  - [breakpoints [variable]](#breakpoints-variable)

### ✅/// Define the properties for a selector assigned to a row in the grid system.

/// @param [css]

Rows

<details>
<summary>Source code</summary>

```scss
$/// Define the properties for a selector assigned to a row in the grid system.
/// @param: Number;
```

</details>

- **Group**: [general](#general)

### ❌carbon--make-row [mixin]

Define the properties for a selector assigned to a row in the grid system.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-row($gutter) {
  display: flex;
  flex-wrap: wrap;
  margin-right: -1 * $gutter / 2;
  margin-left: -1 * $gutter / 2;
}
```

</details>

- **Parameters**:

| Name      | Description                   | Type     | Default value |
| --------- | ----------------------------- | -------- | ------------- |
| `$gutter` | the gutter in the grid system | `Number` | —             |

- **Group**: [general](#general)

### ✅/// Add no-gutter and no-gutter-- [css]

No gutter

<details>
<summary>Source code</summary>

```scss
$///Addno-gutter and no-gutter--: left, right;
```

</details>

- **Group**: [general](#general)

### ❌carbon--no-gutter [mixin]

Add no-gutter and no-gutter--{left,right} classes to the output CSS. These
classes are useful for dropping the gutter in fluid situations.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--no-gutter() {
  .#{$prefix}--no-gutter,
  .#{$prefix}--row.#{$prefix}--no-gutter [class*='#{$prefix}--col'] {
    padding-left: 0;
    padding-right: 0;
  }

  .#{$prefix}--no-gutter--left,
  .#{$prefix}--row.#{$prefix}--no-gutter--left [class*='#{$prefix}--col'] {
    padding-left: 0;
  }

  .#{$prefix}--no-gutter--right,
  .#{$prefix}--row.#{$prefix}--no-gutter--right [class*='#{$prefix}--col'] {
    padding-right: 0;
  }
}
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [prefix [variable]](#prefix-variable)

### ✅/// Add hang--left and hang--right classes for a given gutter. These classes are

/// used alongside `no-gutter--left` and `no-gutter--right` to "hang" type.
/// @param [css]

Hang

<details>
<summary>Source code</summary>

```scss
$/// Add hang--left and hang--right classes for a given gutter. These classes are
/// used alongside `no-gutter--left` and `no-gutter--right` to "hang" type.
/// @param: Number;
```

</details>

- **Group**: [general](#general)

### ❌carbon--hang [mixin]

Add hang--left and hang--right classes for a given gutter. These classes are
used alongside `no-gutter--left` and `no-gutter--right` to "hang" type.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--hang($gutter) {
  .#{$prefix}--hang--left {
    padding-left: ($gutter / 2);
  }

  .#{$prefix}--hang--right {
    padding-right: ($gutter / 2);
  }
}
```

</details>

- **Parameters**:

| Name      | Description | Type     | Default value |
| --------- | ----------- | -------- | ------------- |
| `$gutter` | —           | `Number` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [prefix [variable]](#prefix-variable)

### ✅carbon--aspect-ratios [variable]

The aspect ratios that are used to generate corresponding aspect ratio
classes in code

<details>
<summary>Source code</summary>

```scss
$carbon--aspect-ratios: ((16, 9), (2, 1), (4, 3), (1, 1));
```

</details>

- **Group**: [general](#general)

### ✅/// The aspect ratios that are used to generate corresponding aspect ratio

/// classes in code
/// @access public
\$carbon--aspect-ratios: ((16, 9), (2, 1), (4, 3), (1, 1));

/// Output the CSS classes for generating aspect ratio classes
/// @param [css]

Aspect ratio

<details>
<summary>Source code</summary>

```scss
$///Theaspect ratios that are used to generate corresponding aspect ratio
/// classes in code
/// @access public
$carbon--aspect-ratios: ((16, 9), (2, 1), (4, 3), (1, 1));

/// Output the CSS classes for generating aspect ratio classes
/// @param: List;
```

</details>

- **Group**: [general](#general)

### ❌carbon--aspect-ratio [mixin]

Output the CSS classes for generating aspect ratio classes

<details>
<summary>Source code</summary>

```scss
@mixin carbon--aspect-ratio($aspect-ratios) {
  .#{$prefix}--aspect-ratio {
    height: 0;
    position: relative;
  }

  .#{$prefix}--aspect-ratio--object {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }

  @each $ratio in $aspect-ratios {
    $width: nth($ratio, 1);
    $height: nth($ratio, 2);

    .#{$prefix}--aspect-ratio--#{$width}x#{$height} {
      padding-bottom: percentage($height / $width);
    }
  }
}
```

</details>

- **Parameters**:

| Name             | Description                         | Type   | Default value |
| ---------------- | ----------------------------------- | ------ | ------------- |
| `$aspect-ratios` | a list of aspect ratios to generate | `List` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [prefix [variable]](#prefix-variable)

### ✅/// Create the container for a grid. Will cause full-bleed for the grid unless

/// max-width properties are added with `make-container-max-widths`
/// @param [css]

Grid

<details>
<summary>Source code</summary>

```scss
$/// Create the container for a grid. Will cause full-bleed for the grid unless
/// max-width properties are added with `make-container-max-widths`
/// @param: Map;
```

</details>

- **Group**: [general](#general)

### ❌carbon--make-container [mixin]

Create the container for a grid. Will cause full-bleed for the grid unless
max-width properties are added with `make-container-max-widths`

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-container($breakpoints) {
  margin-right: auto;
  margin-left: auto;

  @include carbon--set-largest-breakpoint();

  @each $name, $value in $breakpoints {
    $prev-breakpoint: map-get($breakpoints, carbon--breakpoint-prev($name));
    $margin: map-get($value, margin);

    @if $prev-breakpoint {
      $prev-margin: map-get($prev-breakpoint, margin);
      @if $prev-margin != $margin {
        @include carbon--breakpoint($name) {
          padding-left: #{($carbon--grid-gutter / 2) + $margin};
          padding-right: #{($carbon--grid-gutter / 2) + $margin};
        }
      }
    } @else {
      @include carbon--breakpoint($name) {
        padding-left: #{($carbon--grid-gutter / 2) + $margin};
        padding-right: #{($carbon--grid-gutter / 2) + $margin};
      }
    }
  }
}
```

</details>

- **Parameters**:

| Name           | Description | Type  | Default value |
| -------------- | ----------- | ----- | ------------- |
| `$breakpoints` | —           | `Map` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--set-largest-breakpoint [mixin]](#carbon--set-largest-breakpoint-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [breakpoints [variable]](#breakpoints-variable)

### ❌carbon--set-largest-breakpoint [mixin]

Get the last breakpoint width and set max-width to its value

<details>
<summary>Source code</summary>

```scss
@mixin carbon--set-largest-breakpoint($breakpoints) {
  $largest-breakpoint: last-map-item($breakpoints);

  max-width: map-get($largest-breakpoint, 'width');
}
```

</details>

- **Parameters**:

| Name           | Description | Type  | Default value |
| -------------- | ----------- | ----- | ------------- |
| `$breakpoints` | —           | `Map` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [last-map-item [function]](#last-map-item-function)
  - [breakpoints [variable]](#breakpoints-variable)

### ❌carbon--make-container-max-widths [mixin]

Add in the max-widths for each breakpoint to the container

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-container-max-widths($breakpoints) {
  @each $name, $value in $breakpoints {
    @include carbon--breakpoint($name) {
      max-width: map-get($value, width);
    }
  }
}
```

</details>

- **Parameters**:

| Name           | Description | Type  | Default value |
| -------------- | ----------- | ----- | ------------- |
| `$breakpoints` | —           | `Map` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [breakpoints [variable]](#breakpoints-variable)

### ✅carbon--grid [mixin]

Generate the CSS for a grid for the given breakpoints and gutter

<details>
<summary>Source code</summary>

```scss
@mixin carbon--grid($breakpoints, $grid-gutter) {
  .#{$prefix}--grid {
    @include carbon--make-container($breakpoints);
  }

  @include carbon--largest-breakpoint($breakpoints) {
    .#{$prefix}--grid--full-width {
      max-width: 100%;
    }
  }

  .#{$prefix}--row {
    @include carbon--make-row();
  }

  .#{$prefix}--grid--condensed .#{$prefix}--row:not(:last-of-type) {
    margin-bottom: $condensed-gutter;
  }

  .#{$prefix}--row--condensed + .#{$prefix}--row--condensed {
    margin-top: $condensed-gutter;
  }

  @include carbon--make-grid-columns($breakpoints, $grid-gutter);
  @include carbon--no-gutter();
  @include carbon--hang($grid-gutter);
  @include carbon--aspect-ratio();
}
```

</details>

- **Parameters**:

| Name           | Description | Type     | Default value |
| -------------- | ----------- | -------- | ------------- |
| `$breakpoints` | —           | `Map`    | —             |
| `$grid-gutter` | —           | `Number` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--make-container [mixin]](#carbon--make-container-mixin)
  - [carbon--largest-breakpoint [mixin]](#carbon--largest-breakpoint-mixin)
  - [carbon--make-row [mixin]](#carbon--make-row-mixin)
  - [carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)
  - [carbon--no-gutter [mixin]](#carbon--no-gutter-mixin)
  - [carbon--hang [mixin]](#carbon--hang-mixin)
  - [carbon--aspect-ratio [mixin]](#carbon--aspect-ratio-mixin)
  - [prefix [variable]](#prefix-variable)
  - [breakpoints [variable]](#breakpoints-variable)

### ✅exports [mixin]

Module export mixin
This mixin helps making sure a module is imported once and only once.

<details>
<summary>Source code</summary>

```scss
@mixin exports($name, $error: false) {
  @if (index($imported-modules, $name) == null) {
    $imported-modules: append($imported-modules, $name) !global;
    @content;
  } @else if $warn == true {
    @warn 'Module `#{$name}` has already been imported.';
  }
}
```

</details>

- **Parameters**:

| Name     | Description                                   | Type     | Default value |
| -------- | --------------------------------------------- | -------- | ------------- |
| `$name`  | Name of exported module                       | `String` | —             |
| `$error` | Error when a module has been already imported | `Bool`   | `false`       |

- **Group**: [general](#general)

### ✅carbon--breakpoint-next [function]

Get the value of the next breakpoint, or null for the last breakpoint.

<details>
<summary>Source code</summary>

```scss
@function carbon--breakpoint-next($name, $breakpoints: $carbon--grid-breakpoints, $breakpoint-names: map-keys($breakpoints)) {
  $n: index($breakpoint-names, $name);
  @if $n != null and $n < length($breakpoint-names) {
    @return nth($breakpoint-names, $n + 1);
  }
  @return null;
}
```

</details>

- **Parameters**:

| Name                                                             | Description                                    | Type                        | Default value            |
| ---------------------------------------------------------------- | ---------------------------------------------- | --------------------------- | ------------------------ |
| `$name`                                                          | the name of the brekapoint                     | `String`                    | —                        |
| `$breakpoints`                                                   | a map of breakpoints where the key is the name |
| of the breakpoint and the value is the values for the breakpoint | `Map`                                          | `$carbon--grid-breakpoints` |
| `$breakpoint-names`                                              | a list of names from the \$breakpoints map     | `List`                      | `map-keys($breakpoints)` |

- **Group**: [general](#general)
- **Returns**: `String`

### ✅carbon--is-smallest-breakpoint [function]

Check to see if the given breakpoint name

<details>
<summary>Source code</summary>

```scss
@function carbon--is-smallest-breakpoint() {
  @return index(map-keys($breakpoints), $name) == 1;
}
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [breakpoints [variable]](#breakpoints-variable)

### ✅carbon--largest-breakpoint-name [function]

returns the largest breakpoint name

<details>
<summary>Source code</summary>

```scss
@function carbon--largest-breakpoint-name($breakpoints: $carbon--grid-breakpoints) {
  $total-breakpoints: length($breakpoints);
  @return carbon--key-by-index($breakpoints, $total-breakpoints);
}
```

</details>

- **Parameters**:

| Name           | Description                                    | Type  | Default value               |
| -------------- | ---------------------------------------------- | ----- | --------------------------- |
| `$breakpoints` | a map of breakpoints where the key is the name | `Map` | `$carbon--grid-breakpoints` |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--key-by-index [function]](#carbon--key-by-index-function)
  - [breakpoints [variable]](#breakpoints-variable)

### ✅carbon--breakpoint-infix [function]

Get the infix for a given breakpoint in a list of breakpoints. Usesful for
generate the size part in a selector, for example: `.prefix--col-sm-2`

<details>
<summary>Source code</summary>

```scss
@function carbon--breakpoint-infix($name) {
  @return '-#{$name}';
}
```

</details>

- **Parameters**:

| Name    | Description                | Type     | Default value |
| ------- | -------------------------- | -------- | ------------- |
| `$name` | the name of the breakpoint | `String` | —             |

- **Group**: [general](#general)
- **Returns**: `String`

### ✅carbon--breakpoint-up [mixin]

Generate a media query up to the width of the given breakpoint name

<details>
<summary>Source code</summary>

```scss
@mixin carbon--breakpoint-up($name, $breakpoints: $carbon--grid-breakpoints) {
  @if type-of($name) == 'number' {
    @media (min-width: $name) {
      @content;
    }
  } @else if map-has-key($breakpoints, $name) {
    $breakpoint: map-get($breakpoints, $name);
    $width: map-get($breakpoint, width);
    @if carbon--is-smallest-breakpoint($name, $breakpoints) {
      @content;
    } @else {
      @media (min-width: $width) {
        @content;
      }
    }
  } @else {
    @error 'Unable to find a breakpoint with name `#{$name}`. Expected one of: (#{map-keys($breakpoints)})';
  }
}
```

</details>

- **Parameters**:

| Name           | Description                                    | Type               | Default value               |
| -------------- | ---------------------------------------------- | ------------------ | --------------------------- |
| `$name`        | —                                              | `string \| number` | —                           |
| `$breakpoints` | a map of breakpoints where the key is the name | `Map`              | `$carbon--grid-breakpoints` |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--is-smallest-breakpoint [function]](#carbon--is-smallest-breakpoint-function)
  - [breakpoints [variable]](#breakpoints-variable)

### ✅carbon--breakpoint-down [mixin]

Generate a media query for the maximum width of the given styles

<details>
<summary>Source code</summary>

```scss
@mixin carbon--breakpoint-down($name, $breakpoints: $carbon--grid-breakpoints) {
  @if type-of($name) == 'number' {
    @media (max-width: $name) {
      @content;
    }
  } @else if map-has-key($breakpoints, $name) {
    $breakpoint: map-get($breakpoints, $name);
    $width: map-get($breakpoint, width);
    @if carbon--is-smallest-breakpoint($name, $breakpoints) {
      @content;
    } @else {
      @media (max-width: $width) {
        @content;
      }
    }
  } @else {
    @error 'Unable to find a breakpoint with name `#{$name}`. Expected one of: (#{map-keys($breakpoints)})';
  }
}
```

</details>

- **Parameters**:

| Name           | Description                                    | Type               | Default value               |
| -------------- | ---------------------------------------------- | ------------------ | --------------------------- |
| `$name`        | —                                              | `string \| number` | —                           |
| `$breakpoints` | a map of breakpoints where the key is the name | `Map`              | `$carbon--grid-breakpoints` |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--is-smallest-breakpoint [function]](#carbon--is-smallest-breakpoint-function)
  - [breakpoints [variable]](#breakpoints-variable)

### ✅carbon--breakpoint-between [mixin]

Generate a media query for the range between the lower and upper
breakpoints.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--breakpoint-between($lower, $upper) {
  $is-number-lower: type-of($lower) == 'number';
  $is-number-upper: type-of($upper) == 'number';
  $min: if($is-number-lower, $lower, map-get($breakpoints, $lower));
  $max: if($is-number-upper, $upper, map-get($breakpoints, $upper));

  @if $min and $max {
    $min-width: if(not $is-number-lower and $min, map-get($min, width), $min);
    $max-width: if(not $is-number-upper and $max, map-get($max, width), $max);
    @media (min-width: $min-width) and (max-width: $max-width) {
      @content;
    }
  } @else if $min != null and $max == null {
    @include carbon--breakpoint-up($lower) {
      @content;
    }
  } @else if $min == null and $max != null {
    @include carbon--breakpoint-down($upper) {
      @content;
    }
  } @else {
    @error 'Unable to find a breakpoint to satisfy: (#{$lower},#{$upper}). Expected both to be one of (#{map-keys($breakpoints)}).';
  }
}
```

</details>

- **Parameters**:

| Name     | Description | Type               | Default value |
| -------- | ----------- | ------------------ | ------------- |
| `$lower` | —           | `string \| number` | —             |
| `$upper` | —           | `string \| number` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--breakpoint-up [mixin]](#carbon--breakpoint-up-mixin)
  - [carbon--breakpoint-down [mixin]](#carbon--breakpoint-down-mixin)
  - [breakpoints [variable]](#breakpoints-variable)

### ✅carbon--largest-breakpoint [mixin]

generate media query for the largest breakpoint

<details>
<summary>Source code</summary>

```scss
@mixin carbon--largest-breakpoint($breakpoints: $carbon--grid-breakpoints) {
  @include carbon--breakpoint(carbon--largest-breakpoint-name()) {
    @content;
  }
}
```

</details>

- **Parameters**:

| Name           | Description                                    | Type  | Default value               |
| -------------- | ---------------------------------------------- | ----- | --------------------------- |
| `$breakpoints` | a map of breakpoints where the key is the name | `Map` | `$carbon--grid-breakpoints` |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [carbon--largest-breakpoint-name [function]](#carbon--largest-breakpoint-name-function)

### ✅carbon--breakpoint [mixin]

Generate a media query for a given breakpoint

<details>
<summary>Source code</summary>

```scss
@mixin carbon--breakpoint($name, $breakpoints: $carbon--grid-breakpoints) {
  @include carbon--breakpoint-up($name, $breakpoints) {
    @content;
  }
}
```

</details>

- **Parameters**:

| Name           | Description                                    | Type               | Default value               |
| -------------- | ---------------------------------------------- | ------------------ | --------------------------- |
| `$name`        | —                                              | `string \| number` | —                           |
| `$breakpoints` | a map of breakpoints where the key is the name | `Map`              | `$carbon--grid-breakpoints` |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--breakpoint-up [mixin]](#carbon--breakpoint-up-mixin)
  - [breakpoints [variable]](#breakpoints-variable)

### ✅carbon--rem [function]

Convert a given px unit to a rem unit

<details>
<summary>Source code</summary>

```scss
@function carbon--rem($px) {
  @return ($px / $carbon--base-font-size) * 1rem;
}
```

</details>

- **Parameters**:

| Name  | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `$px` | —           | `px` | —             |

- **Group**: [general](#general)
- **Returns**: `rem`

### ✅carbon--em [function]

Convert a given px unit to a em unit

<details>
<summary>Source code</summary>

```scss
@function carbon--em($px) {
  @return ($px / $carbon--base-font-size) * 1em;
}
```

</details>

- **Parameters**:

| Name  | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `$px` | —           | `px` | —             |

- **Group**: [general](#general)
- **Returns**: `em`

### ✅carbon--get-column-width [function]

Get the column width for a given breakpoint. Useful for figuring out key
heights

<details>
<summary>Source code</summary>

```scss
@function carbon--get-column-width($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    $values: map-get($breakpoints, $breakpoint);
    $width: map-get($values, width);
    $margin: map-get($values, margin);
    $columns: map-get($values, columns);

    @return ($width - (2 * $margin)) / $columns;
  } @else {
    @warn 'Breakpoint: `#{$breakpoint}` is not a valid breakpoint.';
  }
}
```

</details>

- **Parameters**:

| Name          | Description | Type     | Default value |
| ------------- | ----------- | -------- | ------------- |
| `$breakpoint` | —           | `string` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [breakpoints [variable]](#breakpoints-variable)

### ✅carbon--key-height [function]

Get the value of a key height step at a given breakpoint

<details>
<summary>Source code</summary>

```scss
@function carbon--key-height($breakpoint, $step) {
  @if map-has-key($carbon--key-height-scales, $breakpoint) {
    @return nth(map-get($carbon--key-height-scales, $breakpoint), $step);
  } @else {
    @warn 'Breakpoint: `#{$breakpoint}` is not a valid breakpoint.';
  }
}
```

</details>

- **Parameters**:

| Name          | Description | Type     | Default value |
| ------------- | ----------- | -------- | ------------- |
| `$breakpoint` | —           | `string` | —             |
| `$step`       | —           | `number` | —             |

- **Group**: [general](#general)

### ✅carbon--mini-units [function]

Get the value of the corresponding number of units

<details>
<summary>Source code</summary>

```scss
@function carbon--mini-units($count) {
  @return carbon--rem($carbon--mini-unit-size * $count);
}
```

</details>

- **Parameters**:

| Name     | Description                              | Type     | Default value |
| -------- | ---------------------------------------- | -------- | ------------- |
| `$count` | the number of units to get the value for | `number` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--rem [function]](#carbon--rem-function)

### ✅map-deep-get [function]

Map deep get

<details>
<summary>Source code</summary>

```scss
@function map-deep-get($map, $keys) {
  @each $key in $keys {
    $map: map-get($map, $key);
  }
  @return $map;
}
```

</details>

- **Parameters**:

| Name    | Description | Type      | Default value |
| ------- | ----------- | --------- | ------------- |
| `$map`  | Map         | `Map`     | —             |
| `$keys` | Key chain   | `Arglist` | —             |

- **Group**: [general](#general)
- **Returns**: `*` Desired value

### ✅carbon--key-by-index [function]

Key by Index
provide a $map, and $index, and get back the relevant
key value.

<details>
<summary>Source code</summary>

```scss
@function carbon--key-by-index($map, $index) {
  $keys: map-keys($map);
  @return nth($keys, $index);
}
```

</details>

- **Parameters**:

| Name     | Description | Type      | Default value |
| -------- | ----------- | --------- | ------------- |
| `$map`   | Map         | `Map`     | —             |
| `$index` | Key chain   | `Integer` | —             |

- **Group**: [general](#general)
- **Returns**: `String` Desired value

### ✅last-map-item [function]

Last Map Item
Pass in a map, and get the last one in the list back.

<details>
<summary>Source code</summary>

```scss
@function last-map-item($map) {
  $total-length: length($map);
  @return map-get($map, carbon--key-by-index($map, $total-length));
}
```

</details>

- **Parameters**:

| Name   | Description | Type  | Default value |
| ------ | ----------- | ----- | ------------- |
| `$map` | Map         | `Map` | —             |

- **Group**: [general](#general)
- **Returns**: `*` Desired value
- **Requires**:
  - [carbon--key-by-index [function]](#carbon--key-by-index-function)

### ✅carbon--easings [variable]

Common easings for components in the Carbon Design System

<details>
<summary>Source code</summary>

```scss
$carbon--easings: (
  standard: (
    productive: cubic-bezier(0.2, 0, 0.38, 0.9),
    expressive: cubic-bezier(0.4, 0.14, 0.3, 1),
  ),
  entrance: (
    productive: cubic-bezier(0, 0, 0.38, 0.9),
    expressive: cubic-bezier(0, 0, 0.3, 1),
  ),
  exit: (
    productive: cubic-bezier(0.2, 0, 1, 0.9),
    expressive: cubic-bezier(0.4, 0.14, 1, 1),
  ),
);
```

</details>

- **Group**: [general](#general)

### ✅carbon--motion [function]

Get the transition-timing-function for a given easing and motion mode.
Easings that are currently supported include: standard, entrance, and exit.
We also offer two modes: productive and expressive.

<details>
<summary>Source code</summary>

```scss
@function carbon--motion($name, $mode) {
  @if map-has-key($easings, $name) {
    $easing: map-get($easings, $name);
    @if map-has-key($easing, $mode) {
      @return map-get($easing, $mode);
    } @else {
      @error 'Unable to find a mode for the easing #{$easing} called: #{$mode}.';
    }
  } @else {
    @error 'Unable to find an easing named #{$name} in our supported easings.';
  }
}
```

</details>

- **Parameters**:

| Name    | Description                           | Type     | Default value |
| ------- | ------------------------------------- | -------- | ------------- |
| `$name` | the name of the easing curve to apply | `String` | —             |
| `$mode` | the mode for the easing curve to use  | `String` | —             |

- **Group**: [general](#general)
- **Returns**: `cubic-bezier`

### ✅carbon--motion [mixin]

Set the transition-timing-function for a given easing and motion mode.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--motion($name, $mode) {
  transition-timing-function: carbon--motion($name, $mode);
}
```

</details>

- **Parameters**:

| Name    | Description                           | Type     | Default value |
| ------- | ------------------------------------- | -------- | ------------- |
| `$name` | the name of the easing curve to apply | `String` | —             |
| `$mode` | the mode for the easing curve to use  | `String` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--motion [function]](#carbon--motion-function)

### ✅carbon--theme [mixin]

Define theme variables

<details>
<summary>Source code</summary>

```scss
@mixin carbon--theme($theme) {
  $interactive-01: map-get($theme, interactive-01) !global;
  $interactive-02: map-get($theme, interactive-02) !global;
  $interactive-03: map-get($theme, interactive-03) !global;
  $interactive-04: map-get($theme, interactive-04) !global;
  $ui-background: map-get($theme, ui-background) !global;
  $ui-01: map-get($theme, ui-01) !global;
  $ui-02: map-get($theme, ui-02) !global;
  $ui-03: map-get($theme, ui-03) !global;
  $ui-04: map-get($theme, ui-04) !global;
  $ui-05: map-get($theme, ui-05) !global;
  $text-01: map-get($theme, text-01) !global;
  $text-02: map-get($theme, text-02) !global;
  $text-03: map-get($theme, text-03) !global;
  $text-04: map-get($theme, text-04) !global;
  $icon-01: map-get($theme, icon-01) !global;
  $icon-02: map-get($theme, icon-02) !global;
  $icon-03: map-get($theme, icon-03) !global;
  $link-01: map-get($theme, link-01) !global;
  $field-01: map-get($theme, field-01) !global;
  $field-02: map-get($theme, field-02) !global;
  $inverse-01: map-get($theme, inverse-01) !global;
  $inverse-02: map-get($theme, inverse-02) !global;
  $support-01: map-get($theme, support-01) !global;
  $support-02: map-get($theme, support-02) !global;
  $support-03: map-get($theme, support-03) !global;
  $support-04: map-get($theme, support-04) !global;
  $overlay-01: map-get($theme, overlay-01) !global;
  $focus: map-get($theme, focus) !global;
  $hover-primary: map-get($theme, hover-primary) !global;
  $active-primary: map-get($theme, active-primary) !global;
  $hover-primary-text: map-get($theme, hover-primary-text) !global;
  $hover-secondary: map-get($theme, hover-secondary) !global;
  $active-secondary: map-get($theme, active-secondary) !global;
  $hover-tertiary: map-get($theme, hover-tertiary) !global;
  $active-tertiary: map-get($theme, active-tertiary) !global;
  $hover-ui: map-get($theme, hover-ui) !global;
  $active-ui: map-get($theme, active-ui) !global;
  $selected-ui: map-get($theme, selected-ui) !global;
  $hover-selected-ui: map-get($theme, hover-selected-ui) !global;
  $hover-danger: map-get($theme, hover-danger) !global;
  $active-danger: map-get($theme, active-danger) !global;
  $hover-row: map-get($theme, hover-row) !global;
  $visited-link: map-get($theme, visited-link) !global;
  $disabled-01: map-get($theme, disabled-01) !global;
  $disabled-02: map-get($theme, disabled-02) !global;
  $disabled-03: map-get($theme, disabled-03) !global;
  $highlight: map-get($theme, highlight) !global;
  $brand-01: map-get($theme, brand-01) !global;
  $brand-02: map-get($theme, brand-02) !global;
  $brand-03: map-get($theme, brand-03) !global;
  $active-01: map-get($theme, active-01) !global;
  $hover-field: map-get($theme, hover-field) !global;

  @content;

  // Reset to default theme after apply in content
  @if $theme != $carbon--theme {
    @include carbon--theme;
  }
}
```

</details>

- **Parameters**:

| Name     | Description         | Type  | Default value |
| -------- | ------------------- | ----- | ------------- |
| `$theme` | map of theme tokens | `Map` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [hover-field [variable]](#hover-field-variable)
  - [carbon--theme [variable]](#carbon--theme-variable)

### ✅carbon--font-families [variable]

Font family fallbacks for: IBM Plex Mono, IBM Plex Sans, IBM Plex Sans
Condensed, IBM Plex Sans Hebrew, and IBM Plex Serif

<details>
<summary>Source code</summary>

```scss
$carbon--font-families: (
  'mono': unquote("'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace"),
  'sans': unquote("'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif"),
  'sans-condensed': unquote("'IBM Plex Sans Condensed', 'Helvetica Neue', Arial, sans-serif"),
  'sans-hebrew': unquote("'IBM Plex Sans Hebrew', 'Helvetica Hebrew', 'Arial Hebrew', sans-serif"),
  'serif': unquote("'IBM Plex Serif', 'Georgia', Times, serif"),
);
```

</details>

- **Group**: [general](#general)
- **Type**: `{Map}`

### ✅carbon--font-family [function]

Get the font-family for an IBM Plex font.

<details>
<summary>Source code</summary>

```scss
@function carbon--font-family($name) {
  @return map-get($carbon--font-families, $name);
}
```

</details>

- **Parameters**:

| Name    | Description | Type     | Default value |
| ------- | ----------- | -------- | ------------- |
| `$name` | —           | `String` | —             |

- **Group**: [general](#general)
- **Returns**: `String`
- **Requires**:
  - [carbon--font-families [variable]](#carbon--font-families-variable)

### ✅carbon--font-family [mixin]

Include the `font-family` definition for the given name in your selector.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--font-family($name) {
  font-family: carbon--font-family($name);
}
```

</details>

- **Parameters**:

| Name    | Description | Type     | Default value |
| ------- | ----------- | -------- | ------------- |
| `$name` | —           | `String` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--font-family [function]](#carbon--font-family-function)

### ✅carbon--font-weights [variable]

Suggested font weights to be used in product.

<details>
<summary>Source code</summary>

```scss
$carbon--font-weights: (
  'light': 300,
  'regular': 400,
  'semibold': 600,
);
```

</details>

- **Group**: [general](#general)

### ✅carbon--font-weight [function]

Retrieve the font-weight value for a given name

<details>
<summary>Source code</summary>

```scss
@function carbon--font-weight($weight) {
  @return map-get($carbon--font-weights, $weight);
}
```

</details>

- **Parameters**:

| Name      | Description | Type     | Default value |
| --------- | ----------- | -------- | ------------- |
| `$weight` | —           | `String` | —             |

- **Group**: [general](#general)
- **Returns**: `Number`
- **Requires**:
  - [carbon--font-weights [variable]](#carbon--font-weights-variable)

### ✅carbon--font-weight [mixin]

Set the `font-weight` property with the value for a given name

<details>
<summary>Source code</summary>

```scss
@mixin carbon--font-weight($weight) {
  font-weight: carbon--font-weight($weight);
}
```

</details>

- **Parameters**:

| Name      | Description | Type     | Default value |
| --------- | ----------- | -------- | ------------- |
| `$weight` | —           | `String` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--font-weight [function]](#carbon--font-weight-function)

### ✅carbon--type-reset [mixin]

Include a type reset that individuals can use in their projects for
consistent rendering

<details>
<summary>Source code</summary>

```scss
@mixin carbon--type-reset() {
  html {
    font-size: $carbon--base-font-size;
  }

  body {
    @include carbon--font-family('sans');
    @include carbon--font-weight('regular');

    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  strong {
    font-weight: 600;
  }
}
```

</details>

- **Group**: [general](#general)
- **Requires**:
  - [carbon--font-family [mixin]](#carbon--font-family-mixin)
  - [carbon--font-weight [mixin]](#carbon--font-weight-mixin)

### ✅carbon--get-type-size [function]

Compute the type size for the given type scale step

<details>
<summary>Source code</summary>

```scss
@function carbon--get-type-size($step) {
  @if $step == 1 {
    @return 12px;
  }
  // Yn = Yn-1 + {INT[(n-2)/4] + 1} * 2
  @return carbon--get-type-size($step - 1) + (floor(($step - 2) / 4) + 1) * 2;
}
```

</details>

- **Parameters**:

| Name    | Description | Type     | Default value |
| ------- | ----------- | -------- | ------------- |
| `$step` | —           | `Number` | —             |

- **Group**: [general](#general)
- **Returns**: `px`

### ✅carbon--type-scale [variable]

Our type scale. Follows a custom formula for determining each step size.
Supports sizes from 12px to 92px.

<details>
<summary>Source code</summary>

```scss
$carbon--type-scale: ();
```

</details>

- **Group**: [general](#general)

### ✅carbon--type-scale [function]

Get the value of a specific step in the typescale

<details>
<summary>Source code</summary>

```scss
@function carbon--type-scale($step) {
  @return nth($carbon--type-scale, $step);
}
```

</details>

- **Parameters**:

| Name    | Description | Type     | Default value |
| ------- | ----------- | -------- | ------------- |
| `$step` | —           | `Number` | —             |

- **Group**: [general](#general)
- **Returns**: `rem`
- **Requires**:
  - [carbon--type-scale [variable]](#carbon--type-scale-variable)

### ✅carbon--type-scale [mixin]

Set the font-size value of a selector with the value at the given \$step

<details>
<summary>Source code</summary>

```scss
@mixin carbon--type-scale($step) {
  font-size: carbon--type-scale($step);
}
```

</details>

- **Parameters**:

| Name    | Description | Type     | Default value |
| ------- | ----------- | -------- | ------------- |
| `$step` | —           | `Number` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--type-scale [function]](#carbon--type-scale-function)

### ✅carbon--font-size [mixin]

Alias of `type-scale` mixin.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--font-size($step) {
  font-size: carbon--type-scale($step);
}
```

</details>

- **Parameters**:

| Name    | Description | Type     | Default value |
| ------- | ----------- | -------- | ------------- |
| `$step` | —           | `Number` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--type-scale [function]](#carbon--type-scale-function)

### ✅fluid-type [mixin]

This helper includes fluid type styles for the given token value. Fluid type
means that the `font-size` is computed using `calc()` in order to be
determined by the screen size instead of a breakpoint. As a result, fluid
styles should be used with caution in fixed width contexts.

In addition, we make use of %-based line-heights so that the line-height of
each type style is computed correctly due to the dynamic nature of the
`font-size`.

Most of the logic for this work comes from CSS Tricks:
https://css-tricks.com/snippets/css/fluid-typography/

<details>
<summary>Source code</summary>

```scss
@mixin fluid-type($type-styles, $breakpoints) {
  // Include the initial styles for the given token by default without any
  // media query guard. This includes `font-size` as a fallback in the case
  // that a browser does not support `calc()`
  @include properties(map-remove($type-styles, breakpoints));
  // We also need to include the `sm` styles by default since they don't
  // appear in the fluid styles for tokens
  @include fluid-type-size($type-styles, sm, $breakpoints);

  // Finally, we need to go through all the breakpoints defined in the type
  // token and apply the properties and fluid type size for that given
  // breakpoint
  @each $name, $values in map-get($type-styles, breakpoints) {
    @include carbon--breakpoint($name) {
      @include properties($values);
      @include fluid-type-size($type-styles, $name, $breakpoints);
    }
  }
}
```

</details>

- **Parameters**:

| Name           | Description                     | Type   | Default value |
| -------------- | ------------------------------- | ------ | ------------- |
| `$type-styles` | the value of a given type token | `Map`  | —             |
| `$breakpoints` | custom breakpoints to use       | `?Map` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [fluid-type-size [mixin]](#fluid-type-size-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [breakpoints [variable]](#breakpoints-variable)

### ✅fluid-type-size [mixin]

Computes the fluid `font-size` for a given type style and breakpoint

<details>
<summary>Source code</summary>

```scss
@mixin fluid-type-size($type-styles, $name, $breakpoints) {
  // Get the information about the breakpoint we're currently working in. Useful
  // for getting initial width information
  $breakpoint: map-get($breakpoints, $name);

  // Our fluid styles are captured under the 'breakpoints' property in our type
  // styles map. These define what values to treat as `max-` variables below
  $fluid-sizes: map-get($type-styles, breakpoints);
  $fluid-breakpoint: ();
  // Special case for `sm` because the styles for small are on the type style
  // directly
  @if $name == sm {
    $fluid-breakpoint: map-remove($type-styles, breakpoints);
  } @else {
    $fluid-breakpoint: map-get($fluid-sizes, $name);
  }

  // Initialize our font-sizes to the default size for the type style
  $max-font-size: map-get($type-styles, font-size);
  $min-font-size: map-get($type-styles, font-size);
  @if map-has-key($fluid-breakpoint, font-size) {
    $min-font-size: map-get($fluid-breakpoint, font-size);
  }

  // Initialize our min and max width to the width of the current breakpoint
  $max-vw: map-get($breakpoint, width);
  $min-vw: map-get($breakpoint, width);

  // We can use `breakpoint-next` to see if there is another breakpoint we can
  // use to update `max-font-size` and `max-vw` with larger values
  $next-breakpoint-available: carbon--breakpoint-next($name, $breakpoints);
  $next-fluid-breakpoint-name: null;

  // We need to figure out what the next available fluid breakpoint is for our
  // given $type-styles. In this loop we try and iterate through breakpoints
  // until we either manually set $next-breakpoint-available to null or
  // `breakpoint-next` returns null.
  @while $next-breakpoint-available {
    @if map-has-key($fluid-sizes, $next-breakpoint-available) {
      $next-fluid-breakpoint-name: $next-breakpoint-available;
      $next-breakpoint-available: null;
    } @else {
      $next-breakpoint-available: carbon--breakpoint-next($next-breakpoint-available, $breakpoints);
    }
  }

  // If we have found the next available fluid breakpoint name, then we know
  // that we have values that we can use to set max-font-size and max-vw as both
  // values derive from the next breakpoint
  @if $next-fluid-breakpoint-name {
    $next-fluid-breakpoint: map-get($breakpoints, $next-fluid-breakpoint-name);
    $max-font-size: map-get(map-get($fluid-sizes, $next-fluid-breakpoint-name), font-size);
    $max-vw: map-get($next-fluid-breakpoint, width);

    // prettier-ignore
    font-size: calc(#{$min-font-size} +
      #{strip-unit($max-font-size - $min-font-size)} *
      ((100vw - #{$min-vw}) / #{strip-unit($max-vw - $min-vw)})
    );
  } @else {
    // Otherwise, just default to setting the font size found from the type
    // style or the given fluid breakpoint in the type style
    font-size: $min-font-size;
  }
}
```

</details>

- **Parameters**:

| Name           | Description                                            | Type   | Default value |
| -------------- | ------------------------------------------------------ | ------ | ------------- |
| `$type-styles` | the styles for a given token                           | `Map`  | —             |
| `$name`        | the name of the breakpoint to which we apply the fluid |
| styles         | `String`                                               | —      |
| `$breakpoints` | the breakpoints for the grid system                    | `?Map` | —             |

- **Group**: [general](#general)
- **Requires**:
  - [carbon--breakpoint-next [function]](#carbon--breakpoint-next-function)
  - [breakpoints [variable]](#breakpoints-variable)

### ✅carbon--type-style [mixin]

Helper mixin to include the styles for a given token in any selector in your
project. Also includes an optional fluid option that will enable fluid
styles for the token if they are defined. Fluid styles will cause the
token's font-size to be computed based on the viewport size. As a result, use
with caution in fixed contexts.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--type-style($name, $fluid, $breakpoints) {
  @if not map-has-key($tokens, $name) {
    @error 'Unable to find a token with the name: `#{$name}`';
  }

  $token: map-get($tokens, $name);

  // If $fluid is set to true and the token has breakpoints defined for fluid
  // styles, delegate to the fluid-type helper for the given token
  @if $fluid == true and map-has-key($token, 'breakpoints') {
    @include fluid-type($token, $breakpoints);
  } @else {
    // Otherwise, we just include all the property declarations directly on the
    // selector
    @include properties(map-remove($token, 'breakpoints'));
  }
}
```

</details>

- **Parameters**:

| Name           | Description                                     | Type       | Default value |
| -------------- | ----------------------------------------------- | ---------- | ------------- |
| `$name`        | the name of the token to get the styles for     | `String`   | —             |
| `$fluid`       | specify whether to include fluid styles for the | `?Boolean` | —             |
| `$breakpoints` | provide a custom breakpoint map to use          |
| token          | `?Map`                                          | —          |

- **Group**: [general](#general)
- **Requires**:
  - [fluid-type [mixin]](#fluid-type-mixin)
  - [breakpoints [variable]](#breakpoints-variable)
