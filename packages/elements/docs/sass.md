# Sass API

| Mark | Description                                                |
| ---- | ---------------------------------------------------------- |
| ✅   | Public functions, mixins, placeholders, and variables      |
| ❌   | Private items - not supported outside package's build      |
| ⚠️   | Deprecated items - may not be available in future releases |

<!-- toc -->

- [@carbon/colors](#carboncolors)
  - [✅⚠️ibm--colors [mixin]](#ibm--colors-mixin)
  - [✅carbon--colors [mixin]](#carbon--colors-mixin)
- [@carbon/grid](#carbongrid)
  - [✅carbon--12-column-grid [variable]](#carbon--12-column-grid-variable)
  - [❌carbon--make-col-ready [mixin]](#carbon--make-col-ready-mixin)
  - [❌carbon--make-col [mixin]](#carbon--make-col-mixin)
  - [❌carbon--make-col-offset [mixin]](#carbon--make-col-offset-mixin)
  - [❌carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)
  - [❌carbon--make-row [mixin]](#carbon--make-row-mixin)
  - [❌carbon--no-gutter [mixin]](#carbon--no-gutter-mixin)
  - [❌carbon--hang [mixin]](#carbon--hang-mixin)
  - [✅carbon--aspect-ratios [variable]](#carbon--aspect-ratios-variable)
  - [❌carbon--aspect-ratio [mixin]](#carbon--aspect-ratio-mixin)
  - [❌carbon--make-container [mixin]](#carbon--make-container-mixin)
  - [❌carbon--set-largest-breakpoint [mixin]](#carbon--set-largest-breakpoint-mixin)
  - [❌carbon--make-container-max-widths [mixin]](#carbon--make-container-max-widths-mixin)
  - [✅carbon--grid [mixin]](#carbon--grid-mixin)
  - [✅prefix [variable]](#prefix-variable)
- [@carbon/icons](#carbonicons)
  - [✅carbon--icons [mixin]](#carbon--icons-mixin)
- [@carbon/import-once](#carbonimport-once)
  - [✅imported-modules [variable]](#imported-modules-variable)
  - [✅exports [mixin]](#exports-mixin)
- [@carbon/layout](#carbonlayout)
  - [✅carbon--grid-gutter [variable]](#carbon--grid-gutter-variable)
  - [✅carbon--grid-gutter--condensed [variable]](#carbon--grid-gutter--condensed-variable)
  - [✅carbon--grid-breakpoints [variable]](#carbon--grid-breakpoints-variable)
  - [✅carbon--breakpoint-next [function]](#carbon--breakpoint-next-function)
  - [✅carbon--breakpoint-prev [function]](#carbon--breakpoint-prev-function)
  - [✅carbon--is-smallest-breakpoint [function]](#carbon--is-smallest-breakpoint-function)
  - [✅carbon--largest-breakpoint-name [function]](#carbon--largest-breakpoint-name-function)
  - [✅carbon--breakpoint-infix [function]](#carbon--breakpoint-infix-function)
  - [✅carbon--breakpoint-up [mixin]](#carbon--breakpoint-up-mixin)
  - [✅carbon--breakpoint-down [mixin]](#carbon--breakpoint-down-mixin)
  - [✅carbon--breakpoint-between [mixin]](#carbon--breakpoint-between-mixin)
  - [✅carbon--largest-breakpoint [mixin]](#carbon--largest-breakpoint-mixin)
  - [✅carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [✅carbon--container-01 [variable]](#carbon--container-01-variable)
  - [✅carbon--container-02 [variable]](#carbon--container-02-variable)
  - [✅carbon--container-03 [variable]](#carbon--container-03-variable)
  - [✅carbon--container-04 [variable]](#carbon--container-04-variable)
  - [✅carbon--container-05 [variable]](#carbon--container-05-variable)
  - [✅carbon--container [variable]](#carbon--container-variable)
  - [✅container-01 [variable]](#container-01-variable)
  - [✅container-02 [variable]](#container-02-variable)
  - [✅container-03 [variable]](#container-03-variable)
  - [✅container-04 [variable]](#container-04-variable)
  - [✅container-05 [variable]](#container-05-variable)
  - [✅carbon--base-font-size [variable]](#carbon--base-font-size-variable)
  - [✅carbon--rem [function]](#carbon--rem-function)
  - [✅carbon--em [function]](#carbon--em-function)
  - [✅carbon--fluid-spacing-01 [variable]](#carbon--fluid-spacing-01-variable)
  - [✅carbon--fluid-spacing-02 [variable]](#carbon--fluid-spacing-02-variable)
  - [✅carbon--fluid-spacing-03 [variable]](#carbon--fluid-spacing-03-variable)
  - [✅carbon--fluid-spacing-04 [variable]](#carbon--fluid-spacing-04-variable)
  - [✅carbon--fluid-spacing [variable]](#carbon--fluid-spacing-variable)
  - [✅fluid-spacing-01 [variable]](#fluid-spacing-01-variable)
  - [✅fluid-spacing-02 [variable]](#fluid-spacing-02-variable)
  - [✅fluid-spacing-03 [variable]](#fluid-spacing-03-variable)
  - [✅fluid-spacing-04 [variable]](#fluid-spacing-04-variable)
  - [✅carbon--icon-size-01 [variable]](#carbon--icon-size-01-variable)
  - [✅carbon--icon-size-02 [variable]](#carbon--icon-size-02-variable)
  - [✅carbon--icon-size [variable]](#carbon--icon-size-variable)
  - [✅icon-size-01 [variable]](#icon-size-01-variable)
  - [✅icon-size-02 [variable]](#icon-size-02-variable)
  - [✅carbon--get-column-width [function]](#carbon--get-column-width-function)
  - [✅carbon--key-height-scales [variable]](#carbon--key-height-scales-variable)
  - [✅carbon--key-height [function]](#carbon--key-height-function)
  - [✅carbon--layout-01 [variable]](#carbon--layout-01-variable)
  - [✅carbon--layout-02 [variable]](#carbon--layout-02-variable)
  - [✅carbon--layout-03 [variable]](#carbon--layout-03-variable)
  - [✅carbon--layout-04 [variable]](#carbon--layout-04-variable)
  - [✅carbon--layout-05 [variable]](#carbon--layout-05-variable)
  - [✅carbon--layout-06 [variable]](#carbon--layout-06-variable)
  - [✅carbon--layout-07 [variable]](#carbon--layout-07-variable)
  - [✅carbon--layout [variable]](#carbon--layout-variable)
  - [✅layout-01 [variable]](#layout-01-variable)
  - [✅layout-02 [variable]](#layout-02-variable)
  - [✅layout-03 [variable]](#layout-03-variable)
  - [✅layout-04 [variable]](#layout-04-variable)
  - [✅layout-05 [variable]](#layout-05-variable)
  - [✅layout-06 [variable]](#layout-06-variable)
  - [✅layout-07 [variable]](#layout-07-variable)
  - [✅carbon--mini-unit-size [variable]](#carbon--mini-unit-size-variable)
  - [✅carbon--mini-units [function]](#carbon--mini-units-function)
  - [✅carbon--spacing-01 [variable]](#carbon--spacing-01-variable)
  - [✅carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [✅carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [✅carbon--spacing-04 [variable]](#carbon--spacing-04-variable)
  - [✅carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [✅carbon--spacing-06 [variable]](#carbon--spacing-06-variable)
  - [✅carbon--spacing-07 [variable]](#carbon--spacing-07-variable)
  - [✅carbon--spacing-08 [variable]](#carbon--spacing-08-variable)
  - [✅carbon--spacing-09 [variable]](#carbon--spacing-09-variable)
  - [✅carbon--spacing-10 [variable]](#carbon--spacing-10-variable)
  - [✅carbon--spacing-11 [variable]](#carbon--spacing-11-variable)
  - [✅carbon--spacing-12 [variable]](#carbon--spacing-12-variable)
  - [✅carbon--spacing [variable]](#carbon--spacing-variable)
  - [✅spacing-01 [variable]](#spacing-01-variable)
  - [✅spacing-02 [variable]](#spacing-02-variable)
  - [✅spacing-03 [variable]](#spacing-03-variable)
  - [✅spacing-04 [variable]](#spacing-04-variable)
  - [✅spacing-05 [variable]](#spacing-05-variable)
  - [✅spacing-06 [variable]](#spacing-06-variable)
  - [✅spacing-07 [variable]](#spacing-07-variable)
  - [✅spacing-08 [variable]](#spacing-08-variable)
  - [✅spacing-09 [variable]](#spacing-09-variable)
  - [✅spacing-10 [variable]](#spacing-10-variable)
  - [✅spacing-11 [variable]](#spacing-11-variable)
  - [✅spacing-12 [variable]](#spacing-12-variable)
  - [✅map-deep-get [function]](#map-deep-get-function)
  - [✅carbon--key-by-index [function]](#carbon--key-by-index-function)
  - [✅last-map-item [function]](#last-map-item-function)
- [@carbon/motion](#carbonmotion)
  - [✅carbon--easings [variable]](#carbon--easings-variable)
  - [✅carbon--motion [function]](#carbon--motion-function)
  - [✅carbon--motion [mixin]](#carbon--motion-mixin)
- [@carbon/themes](#carbonthemes)
  - [❌custom-property-prefix [variable]](#custom-property-prefix-variable)
  - [❌custom-property [mixin]](#custom-property-mixin)
  - [❌should-emit [function]](#should-emit-function)
  - [✅carbon--theme [mixin]](#carbon--theme-mixin)
  - [✅carbon--theme--g10 [variable]](#carbon--theme--g10-variable)
  - [✅carbon--theme--g90 [variable]](#carbon--theme--g90-variable)
  - [✅carbon--theme--g100 [variable]](#carbon--theme--g100-variable)
  - [✅carbon--theme--v9 [variable]](#carbon--theme--v9-variable)
  - [✅carbon--theme [variable]](#carbon--theme-variable)
  - [✅interactive-01 [variable]](#interactive-01-variable)
  - [✅interactive-02 [variable]](#interactive-02-variable)
  - [✅interactive-03 [variable]](#interactive-03-variable)
  - [✅interactive-04 [variable]](#interactive-04-variable)
  - [✅ui-background [variable]](#ui-background-variable)
  - [✅ui-01 [variable]](#ui-01-variable)
  - [✅ui-02 [variable]](#ui-02-variable)
  - [✅ui-03 [variable]](#ui-03-variable)
  - [✅ui-04 [variable]](#ui-04-variable)
  - [✅ui-05 [variable]](#ui-05-variable)
  - [✅text-01 [variable]](#text-01-variable)
  - [✅text-02 [variable]](#text-02-variable)
  - [✅text-03 [variable]](#text-03-variable)
  - [✅text-04 [variable]](#text-04-variable)
  - [✅text-05 [variable]](#text-05-variable)
  - [✅icon-01 [variable]](#icon-01-variable)
  - [✅icon-02 [variable]](#icon-02-variable)
  - [✅icon-03 [variable]](#icon-03-variable)
  - [✅link-01 [variable]](#link-01-variable)
  - [✅inverse-link [variable]](#inverse-link-variable)
  - [✅field-01 [variable]](#field-01-variable)
  - [✅field-02 [variable]](#field-02-variable)
  - [✅inverse-01 [variable]](#inverse-01-variable)
  - [✅inverse-02 [variable]](#inverse-02-variable)
  - [✅support-01 [variable]](#support-01-variable)
  - [✅support-02 [variable]](#support-02-variable)
  - [✅support-03 [variable]](#support-03-variable)
  - [✅support-04 [variable]](#support-04-variable)
  - [✅inverse-support-01 [variable]](#inverse-support-01-variable)
  - [✅inverse-support-02 [variable]](#inverse-support-02-variable)
  - [✅inverse-support-03 [variable]](#inverse-support-03-variable)
  - [✅inverse-support-04 [variable]](#inverse-support-04-variable)
  - [✅overlay-01 [variable]](#overlay-01-variable)
  - [✅danger [variable]](#danger-variable)
  - [✅focus [variable]](#focus-variable)
  - [✅inverse-focus-ui [variable]](#inverse-focus-ui-variable)
  - [✅hover-primary [variable]](#hover-primary-variable)
  - [✅active-primary [variable]](#active-primary-variable)
  - [✅hover-primary-text [variable]](#hover-primary-text-variable)
  - [✅hover-secondary [variable]](#hover-secondary-variable)
  - [✅active-secondary [variable]](#active-secondary-variable)
  - [✅hover-tertiary [variable]](#hover-tertiary-variable)
  - [✅active-tertiary [variable]](#active-tertiary-variable)
  - [✅hover-ui [variable]](#hover-ui-variable)
  - [✅active-ui [variable]](#active-ui-variable)
  - [✅selected-ui [variable]](#selected-ui-variable)
  - [✅hover-selected-ui [variable]](#hover-selected-ui-variable)
  - [✅inverse-hover-ui [variable]](#inverse-hover-ui-variable)
  - [✅hover-danger [variable]](#hover-danger-variable)
  - [✅active-danger [variable]](#active-danger-variable)
  - [✅hover-row [variable]](#hover-row-variable)
  - [✅visited-link [variable]](#visited-link-variable)
  - [✅disabled-01 [variable]](#disabled-01-variable)
  - [✅disabled-02 [variable]](#disabled-02-variable)
  - [✅disabled-03 [variable]](#disabled-03-variable)
  - [✅highlight [variable]](#highlight-variable)
  - [✅skeleton-01 [variable]](#skeleton-01-variable)
  - [✅skeleton-02 [variable]](#skeleton-02-variable)
  - [✅⚠️brand-01 [variable]](#brand-01-variable)
  - [✅⚠️brand-02 [variable]](#brand-02-variable)
  - [✅⚠️brand-03 [variable]](#brand-03-variable)
  - [✅⚠️active-01 [variable]](#active-01-variable)
  - [✅⚠️hover-field [variable]](#hover-field-variable)
  - [✅caption-01 [variable]](#caption-01-variable)
  - [✅label-01 [variable]](#label-01-variable)
  - [✅helper-text-01 [variable]](#helper-text-01-variable)
  - [✅body-short-01 [variable]](#body-short-01-variable)
  - [✅body-long-01 [variable]](#body-long-01-variable)
  - [✅body-short-02 [variable]](#body-short-02-variable)
  - [✅body-long-02 [variable]](#body-long-02-variable)
  - [✅code-01 [variable]](#code-01-variable)
  - [✅code-02 [variable]](#code-02-variable)
  - [✅heading-01 [variable]](#heading-01-variable)
  - [✅productive-heading-01 [variable]](#productive-heading-01-variable)
  - [✅heading-02 [variable]](#heading-02-variable)
  - [✅productive-heading-02 [variable]](#productive-heading-02-variable)
  - [✅productive-heading-03 [variable]](#productive-heading-03-variable)
  - [✅productive-heading-04 [variable]](#productive-heading-04-variable)
  - [✅productive-heading-05 [variable]](#productive-heading-05-variable)
  - [✅productive-heading-06 [variable]](#productive-heading-06-variable)
  - [✅productive-heading-07 [variable]](#productive-heading-07-variable)
  - [✅expressive-heading-01 [variable]](#expressive-heading-01-variable)
  - [✅expressive-heading-02 [variable]](#expressive-heading-02-variable)
  - [✅expressive-heading-03 [variable]](#expressive-heading-03-variable)
  - [✅expressive-heading-04 [variable]](#expressive-heading-04-variable)
  - [✅expressive-heading-05 [variable]](#expressive-heading-05-variable)
  - [✅expressive-heading-06 [variable]](#expressive-heading-06-variable)
  - [✅expressive-paragraph-01 [variable]](#expressive-paragraph-01-variable)
  - [✅quotation-01 [variable]](#quotation-01-variable)
  - [✅quotation-02 [variable]](#quotation-02-variable)
  - [✅display-01 [variable]](#display-01-variable)
  - [✅display-02 [variable]](#display-02-variable)
  - [✅display-03 [variable]](#display-03-variable)
  - [✅display-04 [variable]](#display-04-variable)
  - [✅spacing-01 [variable]](#spacing-01-variable)
  - [✅spacing-02 [variable]](#spacing-02-variable)
  - [✅spacing-03 [variable]](#spacing-03-variable)
  - [✅spacing-04 [variable]](#spacing-04-variable)
  - [✅spacing-05 [variable]](#spacing-05-variable)
  - [✅spacing-06 [variable]](#spacing-06-variable)
  - [✅spacing-07 [variable]](#spacing-07-variable)
  - [✅spacing-08 [variable]](#spacing-08-variable)
  - [✅spacing-09 [variable]](#spacing-09-variable)
  - [✅spacing-10 [variable]](#spacing-10-variable)
  - [✅spacing-11 [variable]](#spacing-11-variable)
  - [✅spacing-12 [variable]](#spacing-12-variable)
  - [✅fluid-spacing-01 [variable]](#fluid-spacing-01-variable)
  - [✅fluid-spacing-02 [variable]](#fluid-spacing-02-variable)
  - [✅fluid-spacing-03 [variable]](#fluid-spacing-03-variable)
  - [✅fluid-spacing-04 [variable]](#fluid-spacing-04-variable)
  - [✅layout-01 [variable]](#layout-01-variable)
  - [✅layout-02 [variable]](#layout-02-variable)
  - [✅layout-03 [variable]](#layout-03-variable)
  - [✅layout-04 [variable]](#layout-04-variable)
  - [✅layout-05 [variable]](#layout-05-variable)
  - [✅layout-06 [variable]](#layout-06-variable)
  - [✅layout-07 [variable]](#layout-07-variable)
  - [✅container-01 [variable]](#container-01-variable)
  - [✅container-02 [variable]](#container-02-variable)
  - [✅container-03 [variable]](#container-03-variable)
  - [✅container-04 [variable]](#container-04-variable)
  - [✅container-05 [variable]](#container-05-variable)
  - [✅icon-size-01 [variable]](#icon-size-01-variable)
  - [✅icon-size-02 [variable]](#icon-size-02-variable)
- [@carbon/type](#carbontype)
  - [✅carbon--type-classes [mixin]](#carbon--type-classes-mixin)
  - [✅carbon--font-families [variable]](#carbon--font-families-variable)
  - [✅carbon--font-family [function]](#carbon--font-family-function)
  - [✅carbon--font-family [mixin]](#carbon--font-family-mixin)
  - [✅carbon--font-weights [variable]](#carbon--font-weights-variable)
  - [✅carbon--font-weight [function]](#carbon--font-weight-function)
  - [✅carbon--font-weight [mixin]](#carbon--font-weight-mixin)
  - [✅carbon--font-face-mono [mixin]](#carbon--font-face-mono-mixin)
  - [✅prefix [variable]](#prefix-variable)
  - [✅carbon--type-reset [mixin]](#carbon--type-reset-mixin)
  - [✅carbon--default-type [mixin]](#carbon--default-type-mixin)
  - [✅carbon--font-face-sans [mixin]](#carbon--font-face-sans-mixin)
  - [✅carbon--get-type-size [function]](#carbon--get-type-size-function)
  - [✅carbon--type-scale [variable]](#carbon--type-scale-variable)
  - [✅carbon--type-scale [function]](#carbon--type-scale-function)
  - [✅carbon--type-scale [mixin]](#carbon--type-scale-mixin)
  - [✅carbon--font-size [mixin]](#carbon--font-size-mixin)
  - [✅carbon--font-face-serif [mixin]](#carbon--font-face-serif-mixin)
  - [✅carbon--font-display [variable]](#carbon--font-display-variable)
  - [✅caption-01 [variable]](#caption-01-variable)
  - [✅label-01 [variable]](#label-01-variable)
  - [✅helper-text-01 [variable]](#helper-text-01-variable)
  - [✅body-short-01 [variable]](#body-short-01-variable)
  - [✅body-long-01 [variable]](#body-long-01-variable)
  - [✅body-short-02 [variable]](#body-short-02-variable)
  - [✅body-long-02 [variable]](#body-long-02-variable)
  - [✅code-01 [variable]](#code-01-variable)
  - [✅code-02 [variable]](#code-02-variable)
  - [✅heading-01 [variable]](#heading-01-variable)
  - [✅productive-heading-01 [variable]](#productive-heading-01-variable)
  - [✅heading-02 [variable]](#heading-02-variable)
  - [✅productive-heading-02 [variable]](#productive-heading-02-variable)
  - [✅productive-heading-03 [variable]](#productive-heading-03-variable)
  - [✅productive-heading-04 [variable]](#productive-heading-04-variable)
  - [✅productive-heading-05 [variable]](#productive-heading-05-variable)
  - [✅productive-heading-06 [variable]](#productive-heading-06-variable)
  - [✅productive-heading-07 [variable]](#productive-heading-07-variable)
  - [✅expressive-heading-01 [variable]](#expressive-heading-01-variable)
  - [✅expressive-heading-02 [variable]](#expressive-heading-02-variable)
  - [✅expressive-heading-03 [variable]](#expressive-heading-03-variable)
  - [✅expressive-heading-04 [variable]](#expressive-heading-04-variable)
  - [✅expressive-heading-05 [variable]](#expressive-heading-05-variable)
  - [✅expressive-heading-06 [variable]](#expressive-heading-06-variable)
  - [✅expressive-paragraph-01 [variable]](#expressive-paragraph-01-variable)
  - [✅quotation-01 [variable]](#quotation-01-variable)
  - [✅quotation-02 [variable]](#quotation-02-variable)
  - [✅display-01 [variable]](#display-01-variable)
  - [✅display-02 [variable]](#display-02-variable)
  - [✅display-03 [variable]](#display-03-variable)
  - [✅display-04 [variable]](#display-04-variable)
  - [✅tokens [variable]](#tokens-variable)
  - [✅properties [mixin]](#properties-mixin)
  - [✅strip-unit [function]](#strip-unit-function)
  - [✅fluid-type [mixin]](#fluid-type-mixin)
  - [✅fluid-type-size [mixin]](#fluid-type-size-mixin)
  - [❌custom-property-prefix [variable]](#custom-property-prefix-variable)
  - [❌custom-properties [mixin]](#custom-properties-mixin)
  - [✅carbon--type-style [mixin]](#carbon--type-style-mixin)

<!-- tocstop -->

## @carbon/colors

### ✅⚠️ibm--colors [mixin]

Define color variables

<details>
<summary>Source code</summary>

```scss
@mixin ibm--colors() {
  $ibm-color__black-100: #000000 !default !global;
  $ibm-color__blue-10: #edf5ff !default !global;
  $ibm-color__blue-20: #d0e2ff !default !global;
  $ibm-color__blue-30: #a6c8ff !default !global;
  $ibm-color__blue-40: #78a9ff !default !global;
  $ibm-color__blue-50: #4589ff !default !global;
  $ibm-color__blue-60: #0f62fe !default !global;
  $ibm-color__blue-70: #0043ce !default !global;
  $ibm-color__blue-80: #002d9c !default !global;
  $ibm-color__blue-90: #001d6c !default !global;
  $ibm-color__blue-100: #001141 !default !global;
  $ibm-color__cool-gray-10: #f2f4f8 !default !global;
  $ibm-color__cool-gray-20: #dde1e6 !default !global;
  $ibm-color__cool-gray-30: #c1c7cd !default !global;
  $ibm-color__cool-gray-40: #a2a9b0 !default !global;
  $ibm-color__cool-gray-50: #878d96 !default !global;
  $ibm-color__cool-gray-60: #697077 !default !global;
  $ibm-color__cool-gray-70: #4d5358 !default !global;
  $ibm-color__cool-gray-80: #343a3f !default !global;
  $ibm-color__cool-gray-90: #21272a !default !global;
  $ibm-color__cool-gray-100: #121619 !default !global;
  $ibm-color__cyan-10: #e5f6ff !default !global;
  $ibm-color__cyan-20: #bae6ff !default !global;
  $ibm-color__cyan-30: #82cfff !default !global;
  $ibm-color__cyan-40: #33b1ff !default !global;
  $ibm-color__cyan-50: #1192e8 !default !global;
  $ibm-color__cyan-60: #0072c3 !default !global;
  $ibm-color__cyan-70: #00539a !default !global;
  $ibm-color__cyan-80: #003a6d !default !global;
  $ibm-color__cyan-90: #012749 !default !global;
  $ibm-color__cyan-100: #061727 !default !global;
  $ibm-color__gray-10: #f4f4f4 !default !global;
  $ibm-color__gray-20: #e0e0e0 !default !global;
  $ibm-color__gray-30: #c6c6c6 !default !global;
  $ibm-color__gray-40: #a8a8a8 !default !global;
  $ibm-color__gray-50: #8d8d8d !default !global;
  $ibm-color__gray-60: #6f6f6f !default !global;
  $ibm-color__gray-70: #525252 !default !global;
  $ibm-color__gray-80: #393939 !default !global;
  $ibm-color__gray-90: #262626 !default !global;
  $ibm-color__gray-100: #161616 !default !global;
  $ibm-color__green-10: #defbe6 !default !global;
  $ibm-color__green-20: #a7f0ba !default !global;
  $ibm-color__green-30: #6fdc8c !default !global;
  $ibm-color__green-40: #42be65 !default !global;
  $ibm-color__green-50: #24a148 !default !global;
  $ibm-color__green-60: #198038 !default !global;
  $ibm-color__green-70: #0e6027 !default !global;
  $ibm-color__green-80: #044317 !default !global;
  $ibm-color__green-90: #022d0d !default !global;
  $ibm-color__green-100: #071908 !default !global;
  $ibm-color__magenta-10: #fff0f7 !default !global;
  $ibm-color__magenta-20: #ffd6e8 !default !global;
  $ibm-color__magenta-30: #ffafd2 !default !global;
  $ibm-color__magenta-40: #ff7eb6 !default !global;
  $ibm-color__magenta-50: #ee5396 !default !global;
  $ibm-color__magenta-60: #d12771 !default !global;
  $ibm-color__magenta-70: #9f1853 !default !global;
  $ibm-color__magenta-80: #740937 !default !global;
  $ibm-color__magenta-90: #510224 !default !global;
  $ibm-color__magenta-100: #2a0a18 !default !global;
  $ibm-color__orange-40: #ff832b !default !global;
  $ibm-color__purple-10: #f6f2ff !default !global;
  $ibm-color__purple-20: #e8daff !default !global;
  $ibm-color__purple-30: #d4bbff !default !global;
  $ibm-color__purple-40: #be95ff !default !global;
  $ibm-color__purple-50: #a56eff !default !global;
  $ibm-color__purple-60: #8a3ffc !default !global;
  $ibm-color__purple-70: #6929c4 !default !global;
  $ibm-color__purple-80: #491d8b !default !global;
  $ibm-color__purple-90: #31135e !default !global;
  $ibm-color__purple-100: #1c0f30 !default !global;
  $ibm-color__red-10: #fff1f1 !default !global;
  $ibm-color__red-20: #ffd7d9 !default !global;
  $ibm-color__red-30: #ffb3b8 !default !global;
  $ibm-color__red-40: #ff8389 !default !global;
  $ibm-color__red-50: #fa4d56 !default !global;
  $ibm-color__red-60: #da1e28 !default !global;
  $ibm-color__red-70: #a2191f !default !global;
  $ibm-color__red-80: #750e13 !default !global;
  $ibm-color__red-90: #520408 !default !global;
  $ibm-color__red-100: #2d0709 !default !global;
  $ibm-color__teal-10: #d9fbfb !default !global;
  $ibm-color__teal-20: #9ef0f0 !default !global;
  $ibm-color__teal-30: #3ddbd9 !default !global;
  $ibm-color__teal-40: #08bdba !default !global;
  $ibm-color__teal-50: #009d9a !default !global;
  $ibm-color__teal-60: #007d79 !default !global;
  $ibm-color__teal-70: #005d5d !default !global;
  $ibm-color__teal-80: #004144 !default !global;
  $ibm-color__teal-90: #022b30 !default !global;
  $ibm-color__teal-100: #081a1c !default !global;
  $ibm-color__warm-gray-10: #f7f3f2 !default !global;
  $ibm-color__warm-gray-20: #e5e0df !default !global;
  $ibm-color__warm-gray-30: #cac5c4 !default !global;
  $ibm-color__warm-gray-40: #ada8a8 !default !global;
  $ibm-color__warm-gray-50: #8f8b8b !default !global;
  $ibm-color__warm-gray-60: #736f6f !default !global;
  $ibm-color__warm-gray-70: #565151 !default !global;
  $ibm-color__warm-gray-80: #3c3838 !default !global;
  $ibm-color__warm-gray-90: #272525 !default !global;
  $ibm-color__warm-gray-100: #171414 !default !global;
  $ibm-color__white-0: #ffffff !default !global;
  $ibm-color__yellow-20: #fdd13a !default !global;
  $ibm-color__yellow-30: #f1c21b !default !global;
  $ibm-color-map: (
    'black': (
      100: #000000,
    ),
    'blue': (
      10: #edf5ff,
      20: #d0e2ff,
      30: #a6c8ff,
      40: #78a9ff,
      50: #4589ff,
      60: #0f62fe,
      70: #0043ce,
      80: #002d9c,
      90: #001d6c,
      100: #001141,
    ),
    'cool-gray': (
      10: #f2f4f8,
      20: #dde1e6,
      30: #c1c7cd,
      40: #a2a9b0,
      50: #878d96,
      60: #697077,
      70: #4d5358,
      80: #343a3f,
      90: #21272a,
      100: #121619,
    ),
    'coolGray': (
      10: #f2f4f8,
      20: #dde1e6,
      30: #c1c7cd,
      40: #a2a9b0,
      50: #878d96,
      60: #697077,
      70: #4d5358,
      80: #343a3f,
      90: #21272a,
      100: #121619,
    ),
    'cyan': (
      10: #e5f6ff,
      20: #bae6ff,
      30: #82cfff,
      40: #33b1ff,
      50: #1192e8,
      60: #0072c3,
      70: #00539a,
      80: #003a6d,
      90: #012749,
      100: #061727,
    ),
    'gray': (
      10: #f4f4f4,
      20: #e0e0e0,
      30: #c6c6c6,
      40: #a8a8a8,
      50: #8d8d8d,
      60: #6f6f6f,
      70: #525252,
      80: #393939,
      90: #262626,
      100: #161616,
    ),
    'green': (
      10: #defbe6,
      20: #a7f0ba,
      30: #6fdc8c,
      40: #42be65,
      50: #24a148,
      60: #198038,
      70: #0e6027,
      80: #044317,
      90: #022d0d,
      100: #071908,
    ),
    'magenta': (
      10: #fff0f7,
      20: #ffd6e8,
      30: #ffafd2,
      40: #ff7eb6,
      50: #ee5396,
      60: #d12771,
      70: #9f1853,
      80: #740937,
      90: #510224,
      100: #2a0a18,
    ),
    'orange': (
      40: #ff832b,
    ),
    'purple': (
      10: #f6f2ff,
      20: #e8daff,
      30: #d4bbff,
      40: #be95ff,
      50: #a56eff,
      60: #8a3ffc,
      70: #6929c4,
      80: #491d8b,
      90: #31135e,
      100: #1c0f30,
    ),
    'red': (
      10: #fff1f1,
      20: #ffd7d9,
      30: #ffb3b8,
      40: #ff8389,
      50: #fa4d56,
      60: #da1e28,
      70: #a2191f,
      80: #750e13,
      90: #520408,
      100: #2d0709,
    ),
    'teal': (
      10: #d9fbfb,
      20: #9ef0f0,
      30: #3ddbd9,
      40: #08bdba,
      50: #009d9a,
      60: #007d79,
      70: #005d5d,
      80: #004144,
      90: #022b30,
      100: #081a1c,
    ),
    'warm-gray': (
      10: #f7f3f2,
      20: #e5e0df,
      30: #cac5c4,
      40: #ada8a8,
      50: #8f8b8b,
      60: #736f6f,
      70: #565151,
      80: #3c3838,
      90: #272525,
      100: #171414,
    ),
    'warmGray': (
      10: #f7f3f2,
      20: #e5e0df,
      30: #cac5c4,
      40: #ada8a8,
      50: #8f8b8b,
      60: #736f6f,
      70: #565151,
      80: #3c3838,
      90: #272525,
      100: #171414,
    ),
    'white': (
      0: #ffffff,
    ),
    'yellow': (
      20: #fdd13a,
      30: #f1c21b,
    ),
  ) !default !global;
}
```

</details>

- **Group**: [@carbon/colors](#carboncolors)
- **Deprecated**: Use `$carbon--colors` going forward

### ✅carbon--colors [mixin]

Define color variables

<details>
<summary>Source code</summary>

```scss
@mixin carbon--colors() {
  $carbon--black-100: #000000 !default !global;
  $carbon--blue-10: #edf5ff !default !global;
  $carbon--blue-20: #d0e2ff !default !global;
  $carbon--blue-30: #a6c8ff !default !global;
  $carbon--blue-40: #78a9ff !default !global;
  $carbon--blue-50: #4589ff !default !global;
  $carbon--blue-60: #0f62fe !default !global;
  $carbon--blue-70: #0043ce !default !global;
  $carbon--blue-80: #002d9c !default !global;
  $carbon--blue-90: #001d6c !default !global;
  $carbon--blue-100: #001141 !default !global;
  $carbon--cool-gray-10: #f2f4f8 !default !global;
  $carbon--cool-gray-20: #dde1e6 !default !global;
  $carbon--cool-gray-30: #c1c7cd !default !global;
  $carbon--cool-gray-40: #a2a9b0 !default !global;
  $carbon--cool-gray-50: #878d96 !default !global;
  $carbon--cool-gray-60: #697077 !default !global;
  $carbon--cool-gray-70: #4d5358 !default !global;
  $carbon--cool-gray-80: #343a3f !default !global;
  $carbon--cool-gray-90: #21272a !default !global;
  $carbon--cool-gray-100: #121619 !default !global;
  $carbon--cyan-10: #e5f6ff !default !global;
  $carbon--cyan-20: #bae6ff !default !global;
  $carbon--cyan-30: #82cfff !default !global;
  $carbon--cyan-40: #33b1ff !default !global;
  $carbon--cyan-50: #1192e8 !default !global;
  $carbon--cyan-60: #0072c3 !default !global;
  $carbon--cyan-70: #00539a !default !global;
  $carbon--cyan-80: #003a6d !default !global;
  $carbon--cyan-90: #012749 !default !global;
  $carbon--cyan-100: #061727 !default !global;
  $carbon--gray-10: #f4f4f4 !default !global;
  $carbon--gray-20: #e0e0e0 !default !global;
  $carbon--gray-30: #c6c6c6 !default !global;
  $carbon--gray-40: #a8a8a8 !default !global;
  $carbon--gray-50: #8d8d8d !default !global;
  $carbon--gray-60: #6f6f6f !default !global;
  $carbon--gray-70: #525252 !default !global;
  $carbon--gray-80: #393939 !default !global;
  $carbon--gray-90: #262626 !default !global;
  $carbon--gray-100: #161616 !default !global;
  $carbon--green-10: #defbe6 !default !global;
  $carbon--green-20: #a7f0ba !default !global;
  $carbon--green-30: #6fdc8c !default !global;
  $carbon--green-40: #42be65 !default !global;
  $carbon--green-50: #24a148 !default !global;
  $carbon--green-60: #198038 !default !global;
  $carbon--green-70: #0e6027 !default !global;
  $carbon--green-80: #044317 !default !global;
  $carbon--green-90: #022d0d !default !global;
  $carbon--green-100: #071908 !default !global;
  $carbon--magenta-10: #fff0f7 !default !global;
  $carbon--magenta-20: #ffd6e8 !default !global;
  $carbon--magenta-30: #ffafd2 !default !global;
  $carbon--magenta-40: #ff7eb6 !default !global;
  $carbon--magenta-50: #ee5396 !default !global;
  $carbon--magenta-60: #d12771 !default !global;
  $carbon--magenta-70: #9f1853 !default !global;
  $carbon--magenta-80: #740937 !default !global;
  $carbon--magenta-90: #510224 !default !global;
  $carbon--magenta-100: #2a0a18 !default !global;
  $carbon--orange-40: #ff832b !default !global;
  $carbon--purple-10: #f6f2ff !default !global;
  $carbon--purple-20: #e8daff !default !global;
  $carbon--purple-30: #d4bbff !default !global;
  $carbon--purple-40: #be95ff !default !global;
  $carbon--purple-50: #a56eff !default !global;
  $carbon--purple-60: #8a3ffc !default !global;
  $carbon--purple-70: #6929c4 !default !global;
  $carbon--purple-80: #491d8b !default !global;
  $carbon--purple-90: #31135e !default !global;
  $carbon--purple-100: #1c0f30 !default !global;
  $carbon--red-10: #fff1f1 !default !global;
  $carbon--red-20: #ffd7d9 !default !global;
  $carbon--red-30: #ffb3b8 !default !global;
  $carbon--red-40: #ff8389 !default !global;
  $carbon--red-50: #fa4d56 !default !global;
  $carbon--red-60: #da1e28 !default !global;
  $carbon--red-70: #a2191f !default !global;
  $carbon--red-80: #750e13 !default !global;
  $carbon--red-90: #520408 !default !global;
  $carbon--red-100: #2d0709 !default !global;
  $carbon--teal-10: #d9fbfb !default !global;
  $carbon--teal-20: #9ef0f0 !default !global;
  $carbon--teal-30: #3ddbd9 !default !global;
  $carbon--teal-40: #08bdba !default !global;
  $carbon--teal-50: #009d9a !default !global;
  $carbon--teal-60: #007d79 !default !global;
  $carbon--teal-70: #005d5d !default !global;
  $carbon--teal-80: #004144 !default !global;
  $carbon--teal-90: #022b30 !default !global;
  $carbon--teal-100: #081a1c !default !global;
  $carbon--warm-gray-10: #f7f3f2 !default !global;
  $carbon--warm-gray-20: #e5e0df !default !global;
  $carbon--warm-gray-30: #cac5c4 !default !global;
  $carbon--warm-gray-40: #ada8a8 !default !global;
  $carbon--warm-gray-50: #8f8b8b !default !global;
  $carbon--warm-gray-60: #736f6f !default !global;
  $carbon--warm-gray-70: #565151 !default !global;
  $carbon--warm-gray-80: #3c3838 !default !global;
  $carbon--warm-gray-90: #272525 !default !global;
  $carbon--warm-gray-100: #171414 !default !global;
  $carbon--white-0: #ffffff !default !global;
  $carbon--yellow-20: #fdd13a !default !global;
  $carbon--yellow-30: #f1c21b !default !global;
  $black-100: #000000 !default !global;
  $blue-10: #edf5ff !default !global;
  $blue-20: #d0e2ff !default !global;
  $blue-30: #a6c8ff !default !global;
  $blue-40: #78a9ff !default !global;
  $blue-50: #4589ff !default !global;
  $blue-60: #0f62fe !default !global;
  $blue-70: #0043ce !default !global;
  $blue-80: #002d9c !default !global;
  $blue-90: #001d6c !default !global;
  $blue-100: #001141 !default !global;
  $cool-gray-10: #f2f4f8 !default !global;
  $cool-gray-20: #dde1e6 !default !global;
  $cool-gray-30: #c1c7cd !default !global;
  $cool-gray-40: #a2a9b0 !default !global;
  $cool-gray-50: #878d96 !default !global;
  $cool-gray-60: #697077 !default !global;
  $cool-gray-70: #4d5358 !default !global;
  $cool-gray-80: #343a3f !default !global;
  $cool-gray-90: #21272a !default !global;
  $cool-gray-100: #121619 !default !global;
  $cyan-10: #e5f6ff !default !global;
  $cyan-20: #bae6ff !default !global;
  $cyan-30: #82cfff !default !global;
  $cyan-40: #33b1ff !default !global;
  $cyan-50: #1192e8 !default !global;
  $cyan-60: #0072c3 !default !global;
  $cyan-70: #00539a !default !global;
  $cyan-80: #003a6d !default !global;
  $cyan-90: #012749 !default !global;
  $cyan-100: #061727 !default !global;
  $gray-10: #f4f4f4 !default !global;
  $gray-20: #e0e0e0 !default !global;
  $gray-30: #c6c6c6 !default !global;
  $gray-40: #a8a8a8 !default !global;
  $gray-50: #8d8d8d !default !global;
  $gray-60: #6f6f6f !default !global;
  $gray-70: #525252 !default !global;
  $gray-80: #393939 !default !global;
  $gray-90: #262626 !default !global;
  $gray-100: #161616 !default !global;
  $green-10: #defbe6 !default !global;
  $green-20: #a7f0ba !default !global;
  $green-30: #6fdc8c !default !global;
  $green-40: #42be65 !default !global;
  $green-50: #24a148 !default !global;
  $green-60: #198038 !default !global;
  $green-70: #0e6027 !default !global;
  $green-80: #044317 !default !global;
  $green-90: #022d0d !default !global;
  $green-100: #071908 !default !global;
  $magenta-10: #fff0f7 !default !global;
  $magenta-20: #ffd6e8 !default !global;
  $magenta-30: #ffafd2 !default !global;
  $magenta-40: #ff7eb6 !default !global;
  $magenta-50: #ee5396 !default !global;
  $magenta-60: #d12771 !default !global;
  $magenta-70: #9f1853 !default !global;
  $magenta-80: #740937 !default !global;
  $magenta-90: #510224 !default !global;
  $magenta-100: #2a0a18 !default !global;
  $orange-40: #ff832b !default !global;
  $purple-10: #f6f2ff !default !global;
  $purple-20: #e8daff !default !global;
  $purple-30: #d4bbff !default !global;
  $purple-40: #be95ff !default !global;
  $purple-50: #a56eff !default !global;
  $purple-60: #8a3ffc !default !global;
  $purple-70: #6929c4 !default !global;
  $purple-80: #491d8b !default !global;
  $purple-90: #31135e !default !global;
  $purple-100: #1c0f30 !default !global;
  $red-10: #fff1f1 !default !global;
  $red-20: #ffd7d9 !default !global;
  $red-30: #ffb3b8 !default !global;
  $red-40: #ff8389 !default !global;
  $red-50: #fa4d56 !default !global;
  $red-60: #da1e28 !default !global;
  $red-70: #a2191f !default !global;
  $red-80: #750e13 !default !global;
  $red-90: #520408 !default !global;
  $red-100: #2d0709 !default !global;
  $teal-10: #d9fbfb !default !global;
  $teal-20: #9ef0f0 !default !global;
  $teal-30: #3ddbd9 !default !global;
  $teal-40: #08bdba !default !global;
  $teal-50: #009d9a !default !global;
  $teal-60: #007d79 !default !global;
  $teal-70: #005d5d !default !global;
  $teal-80: #004144 !default !global;
  $teal-90: #022b30 !default !global;
  $teal-100: #081a1c !default !global;
  $warm-gray-10: #f7f3f2 !default !global;
  $warm-gray-20: #e5e0df !default !global;
  $warm-gray-30: #cac5c4 !default !global;
  $warm-gray-40: #ada8a8 !default !global;
  $warm-gray-50: #8f8b8b !default !global;
  $warm-gray-60: #736f6f !default !global;
  $warm-gray-70: #565151 !default !global;
  $warm-gray-80: #3c3838 !default !global;
  $warm-gray-90: #272525 !default !global;
  $warm-gray-100: #171414 !default !global;
  $white-0: #ffffff !default !global;
  $yellow-20: #fdd13a !default !global;
  $yellow-30: #f1c21b !default !global;
  $carbon--colors: (
    'black': (
      100: #000000,
    ),
    'blue': (
      10: #edf5ff,
      20: #d0e2ff,
      30: #a6c8ff,
      40: #78a9ff,
      50: #4589ff,
      60: #0f62fe,
      70: #0043ce,
      80: #002d9c,
      90: #001d6c,
      100: #001141,
    ),
    'cool-gray': (
      10: #f2f4f8,
      20: #dde1e6,
      30: #c1c7cd,
      40: #a2a9b0,
      50: #878d96,
      60: #697077,
      70: #4d5358,
      80: #343a3f,
      90: #21272a,
      100: #121619,
    ),
    'coolGray': (
      10: #f2f4f8,
      20: #dde1e6,
      30: #c1c7cd,
      40: #a2a9b0,
      50: #878d96,
      60: #697077,
      70: #4d5358,
      80: #343a3f,
      90: #21272a,
      100: #121619,
    ),
    'cyan': (
      10: #e5f6ff,
      20: #bae6ff,
      30: #82cfff,
      40: #33b1ff,
      50: #1192e8,
      60: #0072c3,
      70: #00539a,
      80: #003a6d,
      90: #012749,
      100: #061727,
    ),
    'gray': (
      10: #f4f4f4,
      20: #e0e0e0,
      30: #c6c6c6,
      40: #a8a8a8,
      50: #8d8d8d,
      60: #6f6f6f,
      70: #525252,
      80: #393939,
      90: #262626,
      100: #161616,
    ),
    'green': (
      10: #defbe6,
      20: #a7f0ba,
      30: #6fdc8c,
      40: #42be65,
      50: #24a148,
      60: #198038,
      70: #0e6027,
      80: #044317,
      90: #022d0d,
      100: #071908,
    ),
    'magenta': (
      10: #fff0f7,
      20: #ffd6e8,
      30: #ffafd2,
      40: #ff7eb6,
      50: #ee5396,
      60: #d12771,
      70: #9f1853,
      80: #740937,
      90: #510224,
      100: #2a0a18,
    ),
    'orange': (
      40: #ff832b,
    ),
    'purple': (
      10: #f6f2ff,
      20: #e8daff,
      30: #d4bbff,
      40: #be95ff,
      50: #a56eff,
      60: #8a3ffc,
      70: #6929c4,
      80: #491d8b,
      90: #31135e,
      100: #1c0f30,
    ),
    'red': (
      10: #fff1f1,
      20: #ffd7d9,
      30: #ffb3b8,
      40: #ff8389,
      50: #fa4d56,
      60: #da1e28,
      70: #a2191f,
      80: #750e13,
      90: #520408,
      100: #2d0709,
    ),
    'teal': (
      10: #d9fbfb,
      20: #9ef0f0,
      30: #3ddbd9,
      40: #08bdba,
      50: #009d9a,
      60: #007d79,
      70: #005d5d,
      80: #004144,
      90: #022b30,
      100: #081a1c,
    ),
    'warm-gray': (
      10: #f7f3f2,
      20: #e5e0df,
      30: #cac5c4,
      40: #ada8a8,
      50: #8f8b8b,
      60: #736f6f,
      70: #565151,
      80: #3c3838,
      90: #272525,
      100: #171414,
    ),
    'warmGray': (
      10: #f7f3f2,
      20: #e5e0df,
      30: #cac5c4,
      40: #ada8a8,
      50: #8f8b8b,
      60: #736f6f,
      70: #565151,
      80: #3c3838,
      90: #272525,
      100: #171414,
    ),
    'white': (
      0: #ffffff,
    ),
    'yellow': (
      20: #fdd13a,
      30: #f1c21b,
    ),
  ) !default !global;
}
```

</details>

- **Group**: [@carbon/colors](#carboncolors)

## @carbon/grid

### ✅carbon--12-column-grid [variable]

Overrides `$carbon--grid-breakpoints` to use a 12 column grid instead of the
default 16

<details>
<summary>Source code</summary>

```scss
$carbon--12-column-grid: map-merge(
  $carbon--grid-breakpoints,
  (
    lg: map-merge(
        map-get($carbon--grid-breakpoints, lg),
        (
          columns: 12,
        )
      ),
    xlg: map-merge(
        map-get($carbon--grid-breakpoints, xlg),
        (
          columns: 12,
        )
      ),
    max: map-merge(
        map-get($carbon--grid-breakpoints, max),
        (
          columns: 12,
        )
      ),
  )
);
```

</details>

- **Group**: [@carbon/grid](#carbongrid)
- **Type**: `Map`

### ❌carbon--make-col-ready [mixin]

Used to initialize the default properties for a column class, most notably for
setting width and default gutters when a column's breakpoint has not been hit
yet.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-col-ready(
  $gutter: $carbon--grid-gutter,
  $collapsed-gutter: $carbon--grid-gutter--condensed
) {
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

| Name                | Description                    | Type     | Default value                     |
| ------------------- | ------------------------------ | -------- | --------------------------------- |
| `$gutter`           | The gutter for the grid system | `Number` | `$carbon--grid-gutter`            |
| `$collapsed-gutter` | The condensed mode gutter      | `Number` | `$carbon--grid-gutter--condensed` |

- **Group**: [@carbon/grid](#carbongrid)
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
| `$span`    | The number of columns covered         | `Number` | —             |
| `$columns` | The total number of columns available | `Number` | —             |

- **Group**: [@carbon/grid](#carbongrid)
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
| `$span`    | The number of columns the offset should cover | `Number` | —             |
| `$columns` | The total number of columns available         | `Number` | —             |

- **Group**: [@carbon/grid](#carbongrid)
- **Used by**:
  - [carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)

### ❌carbon--make-grid-columns [mixin]

Output the CSS required for all the columns in a given grid system.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-grid-columns(
  $breakpoints: $carbon--grid-breakpoints,
  $gutter: $carbon--grid-gutter
) {
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

| Name           | Description                        | Type     | Default value               |
| -------------- | ---------------------------------- | -------- | --------------------------- |
| `$breakpoints` | The breakpoints in the grid system | `Map`    | `$carbon--grid-breakpoints` |
| `$gutter`      | The gutter for the grid system     | `Number` | `$carbon--grid-gutter`      |

- **Group**: [@carbon/grid](#carbongrid)
- **Requires**:
  - [carbon--make-col-ready [mixin]](#carbon--make-col-ready-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [carbon--make-col [mixin]](#carbon--make-col-mixin)
  - [carbon--make-col-offset [mixin]](#carbon--make-col-offset-mixin)
  - [carbon--breakpoint-infix [function]](#carbon--breakpoint-infix-function)
  - [prefix [variable]](#prefix-variable)
- **Used by**:
  - [carbon--grid [mixin]](#carbon--grid-mixin)

### ❌carbon--make-row [mixin]

Define the properties for a selector assigned to a row in the grid system.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-row($gutter: $carbon--grid-gutter) {
  display: flex;
  flex-wrap: wrap;
  margin-right: -1 * $gutter / 2;
  margin-left: -1 * $gutter / 2;
}
```

</details>

- **Parameters**:

| Name      | Description                   | Type     | Default value          |
| --------- | ----------------------------- | -------- | ---------------------- |
| `$gutter` | The gutter in the grid system | `Number` | `$carbon--grid-gutter` |

- **Group**: [@carbon/grid](#carbongrid)
- **Used by**:
  - [carbon--grid [mixin]](#carbon--grid-mixin)

### ❌carbon--no-gutter [mixin]

Add `no-gutter` and `no-gutter--{left,right}` classes to the output CSS. These
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

- **Group**: [@carbon/grid](#carbongrid)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
- **Used by**:
  - [carbon--grid [mixin]](#carbon--grid-mixin)

### ❌carbon--hang [mixin]

Add `hang--left` and `hang--right` classes for a given gutter. These classes are
used alongside `no-gutter--left` and `no-gutter--right` to "hang" type.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--hang($gutter: $carbon--grid-gutter) {
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

| Name      | Description                   | Type     | Default value          |
| --------- | ----------------------------- | -------- | ---------------------- |
| `$gutter` | The gutter in the grid system | `Number` | `$carbon--grid-gutter` |

- **Group**: [@carbon/grid](#carbongrid)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
- **Used by**:
  - [carbon--grid [mixin]](#carbon--grid-mixin)

### ✅carbon--aspect-ratios [variable]

The aspect ratios that are used to generate corresponding aspect ratio classes
in code

<details>
<summary>Source code</summary>

```scss
$carbon--aspect-ratios: ((16, 9), (2, 1), (4, 3), (1, 1), (1, 2));
```

</details>

- **Group**: [@carbon/grid](#carbongrid)
- **Type**: `List`

### ❌carbon--aspect-ratio [mixin]

Output the CSS classes for generating aspect ratio classes

<details>
<summary>Source code</summary>

```scss
@mixin carbon--aspect-ratio($aspect-ratios: $carbon--aspect-ratios) {
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

| Name             | Description                         | Type   | Default value            |
| ---------------- | ----------------------------------- | ------ | ------------------------ |
| `$aspect-ratios` | A list of aspect ratios to generate | `List` | `$carbon--aspect-ratios` |

- **Group**: [@carbon/grid](#carbongrid)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
- **Used by**:
  - [carbon--grid [mixin]](#carbon--grid-mixin)

### ❌carbon--make-container [mixin]

Create the container for a grid. Will cause full-bleed for the grid unless
max-width properties are added with `make-container-max-widths`

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-container($breakpoints: $carbon--grid-breakpoints) {
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

| Name           | Description                                    | Type  | Default value               |
| -------------- | ---------------------------------------------- | ----- | --------------------------- |
| `$breakpoints` | A map of breakpoints where the key is the name | `Map` | `$carbon--grid-breakpoints` |

- **Group**: [@carbon/grid](#carbongrid)
- **Requires**:
  - [carbon--set-largest-breakpoint [mixin]](#carbon--set-largest-breakpoint-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [carbon--breakpoint-prev [function]](#carbon--breakpoint-prev-function)
  - [carbon--grid-gutter [variable]](#carbon--grid-gutter-variable)
- **Used by**:
  - [carbon--grid [mixin]](#carbon--grid-mixin)

### ❌carbon--set-largest-breakpoint [mixin]

Get the last breakpoint width and set max-width to its value

<details>
<summary>Source code</summary>

```scss
@mixin carbon--set-largest-breakpoint($breakpoints: $carbon--grid-breakpoints) {
  $largest-breakpoint: last-map-item($breakpoints);

  max-width: map-get($largest-breakpoint, 'width');
}
```

</details>

- **Parameters**:

| Name           | Description                                    | Type  | Default value               |
| -------------- | ---------------------------------------------- | ----- | --------------------------- |
| `$breakpoints` | A map of breakpoints where the key is the name | `Map` | `$carbon--grid-breakpoints` |

- **Group**: [@carbon/grid](#carbongrid)
- **Requires**:
  - [last-map-item [function]](#last-map-item-function)
- **Used by**:
  - [carbon--make-container [mixin]](#carbon--make-container-mixin)

### ❌carbon--make-container-max-widths [mixin]

Add in the max-widths for each breakpoint to the container

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-container-max-widths(
  $breakpoints: $carbon--grid-breakpoints
) {
  @each $name, $value in $breakpoints {
    @include carbon--breakpoint($name) {
      max-width: map-get($value, width);
    }
  }
}
```

</details>

- **Parameters**:

| Name           | Description                                    | Type  | Default value               |
| -------------- | ---------------------------------------------- | ----- | --------------------------- |
| `$breakpoints` | A map of breakpoints where the key is the name | `Map` | `$carbon--grid-breakpoints` |

- **Group**: [@carbon/grid](#carbongrid)
- **Requires**:
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)

### ✅carbon--grid [mixin]

Generate the CSS for a grid for the given breakpoints and gutters

<details>
<summary>Source code</summary>

```scss
@mixin carbon--grid(
  $breakpoints: $carbon--grid-breakpoints,
  $grid-gutter: $carbon--grid-gutter,
  $condensed-gutter: $carbon--grid-gutter--condensed
) {
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

| Name                | Description               | Type     | Default value                     |
| ------------------- | ------------------------- | -------- | --------------------------------- |
| `$breakpoints`      | The default breakpoints   | `Map`    | `$carbon--grid-breakpoints`       |
| `$grid-gutter`      | The default gutters       | `Number` | `$carbon--grid-gutter`            |
| `$condensed-gutter` | The condensed mode gutter | `Number` | `$carbon--grid-gutter--condensed` |

- **Group**: [@carbon/grid](#carbongrid)
- **Requires**:
  - [carbon--make-container [mixin]](#carbon--make-container-mixin)
  - [carbon--largest-breakpoint [mixin]](#carbon--largest-breakpoint-mixin)
  - [carbon--make-row [mixin]](#carbon--make-row-mixin)
  - [carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)
  - [carbon--no-gutter [mixin]](#carbon--no-gutter-mixin)
  - [carbon--hang [mixin]](#carbon--hang-mixin)
  - [carbon--aspect-ratio [mixin]](#carbon--aspect-ratio-mixin)
  - [prefix [variable]](#prefix-variable)

### ✅prefix [variable]

Namespace prefix

<details>
<summary>Source code</summary>

```scss
$prefix: 'bx';
```

</details>

- **Group**: [@carbon/grid](#carbongrid)
- **Type**: `String`
- **Used by**:
  - [carbon--make-col-ready [mixin]](#carbon--make-col-ready-mixin)
  - [carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)
  - [carbon--no-gutter [mixin]](#carbon--no-gutter-mixin)
  - [carbon--hang [mixin]](#carbon--hang-mixin)
  - [carbon--aspect-ratio [mixin]](#carbon--aspect-ratio-mixin)
  - [carbon--grid [mixin]](#carbon--grid-mixin)
  - [custom-property [mixin]](#custom-property-mixin)
  - [carbon--type-classes [mixin]](#carbon--type-classes-mixin)

## @carbon/icons

### ✅carbon--icons [mixin]

Makes SVGs accessible in high contrast mode

<details>
<summary>Source code</summary>

```scss
@mixin carbon--icons() {
  @media screen and (-ms-high-contrast: active) {
    svg {
      fill: ButtonText;
    }
  }
}
```

</details>

- **Group**: [@carbon/icons](#carbonicons)
- **Links**:
  - [Carbon-elements #345](https://github.com/IBM/carbon-elements/issues/345#issuecomment-466577293)

## @carbon/import-once

### ✅imported-modules [variable]

Used by `exports` mixin to track which modules have been imported

<details>
<summary>Source code</summary>

```scss
$imported-modules: ();
```

</details>

- **Group**: [@carbon/import-once](#carbonimport-once)
- **Type**: `Map`
- **Used by**:
  - [exports [mixin]](#exports-mixin)

### ✅exports [mixin]

Module export mixin that helps making sure a module is imported once and only
once

<details>
<summary>Source code</summary>

```scss
@mixin exports($name, $warn: false) {
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

| Name    | Description                                  | Type     | Default value |
| ------- | -------------------------------------------- | -------- | ------------- |
| `$name` | Name of exported module                      | `String` | —             |
| `$warn` | Warn when a module has been already imported | `Bool`   | `false`       |

- **Group**: [@carbon/import-once](#carbonimport-once)
- **Content**: Declaration blocks to be imported
- **Requires**:
  - [imported-modules [variable]](#imported-modules-variable)

## @carbon/layout

### ✅carbon--grid-gutter [variable]

Carbon gutter size in rem

<details>
<summary>Source code</summary>

```scss
$carbon--grid-gutter: carbon--rem(32px);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Used by**:
  - [carbon--make-container [mixin]](#carbon--make-container-mixin)

### ✅carbon--grid-gutter--condensed [variable]

Carbon condensed gutter size in rem

<details>
<summary>Source code</summary>

```scss
$carbon--grid-gutter--condensed: carbon--rem(2px);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`

### ✅carbon--grid-breakpoints [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--grid-breakpoints: (
  sm: (
    columns: 4,
    margin: 0,
    width: carbon--rem(320px),
  ),
  md: (
    columns: 8,
    margin: carbon--rem(16px),
    width: carbon--rem(672px),
  ),
  lg: (
    columns: 16,
    margin: carbon--rem(16px),
    width: carbon--rem(1056px),
  ),
  xlg: (
    columns: 16,
    margin: carbon--rem(16px),
    width: carbon--rem(1312px),
  ),
  max: (
    columns: 16,
    margin: carbon--rem(24px),
    width: carbon--rem(1584px),
  ),
);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Map`

### ✅carbon--breakpoint-next [function]

Get the value of the next breakpoint, or null for the last breakpoint

<details>
<summary>Source code</summary>

```scss
@function carbon--breakpoint-next(
  $name,
  $breakpoints: $carbon--grid-breakpoints,
  $breakpoint-names: map-keys($breakpoints)
) {
  $n: index($breakpoint-names, $name);
  @if $n != null and $n < length($breakpoint-names) {
    @return nth($breakpoint-names, $n + 1);
  }
  @return null;
}
```

</details>

- **Parameters**:

| Name                | Description                                                                                                     | Type     | Default value               |
| ------------------- | --------------------------------------------------------------------------------------------------------------- | -------- | --------------------------- |
| `$name`             | The name of the brekapoint                                                                                      | `String` | —                           |
| `$breakpoints`      | A map of breakpoints where the key is the name of the breakpoint and the value is the values for the breakpoint | `Map`    | `$carbon--grid-breakpoints` |
| `$breakpoint-names` | A list of names from the `$breakpoints` map                                                                     | `List`   | `map-keys($breakpoints)`    |

- **Group**: [@carbon/layout](#carbonlayout)
- **Returns**: `String`
- **Used by**:
  - [fluid-type-size [mixin]](#fluid-type-size-mixin)

### ✅carbon--breakpoint-prev [function]

Get the value of the previous breakpoint, or null for the first breakpoint

<details>
<summary>Source code</summary>

```scss
@function carbon--breakpoint-prev(
  $name,
  $breakpoints: $carbon--grid-breakpoints,
  $breakpoint-names: map-keys($breakpoints)
) {
  $n: index($breakpoint-names, $name);
  @if $n != null and $n > 1 {
    @return nth($breakpoint-names, $n - 1);
  }
  @return null;
}
```

</details>

- **Parameters**:

| Name                | Description                                                                                                     | Type     | Default value               |
| ------------------- | --------------------------------------------------------------------------------------------------------------- | -------- | --------------------------- |
| `$name`             | The name of the brekapoint                                                                                      | `String` | —                           |
| `$breakpoints`      | A map of breakpoints where the key is the name of the breakpoint and the value is the values for the breakpoint | `Map`    | `$carbon--grid-breakpoints` |
| `$breakpoint-names` | A list of names from the `$breakpoints` map                                                                     | `List`   | `map-keys($breakpoints)`    |

- **Group**: [@carbon/layout](#carbonlayout)
- **Returns**: `String`
- **Used by**:
  - [carbon--make-container [mixin]](#carbon--make-container-mixin)

### ✅carbon--is-smallest-breakpoint [function]

Check to see if the given breakpoint name

<details>
<summary>Source code</summary>

```scss
@function carbon--is-smallest-breakpoint(
  $name,
  $breakpoints: $carbon--grid-breakpoints
) {
  @return index(map-keys($breakpoints), $name) == 1;
}
```

</details>

- **Parameters**:

| Name           | Description                                                                                                     | Type     | Default value               |
| -------------- | --------------------------------------------------------------------------------------------------------------- | -------- | --------------------------- |
| `$name`        | The name of the brekapoint                                                                                      | `String` | —                           |
| `$breakpoints` | A map of breakpoints where the key is the name of the breakpoint and the value is the values for the breakpoint | `Map`    | `$carbon--grid-breakpoints` |

- **Group**: [@carbon/layout](#carbonlayout)
- **Returns**: `Bool`
- **Used by**:
  - [carbon--breakpoint-up [mixin]](#carbon--breakpoint-up-mixin)
  - [carbon--breakpoint-down [mixin]](#carbon--breakpoint-down-mixin)

### ✅carbon--largest-breakpoint-name [function]

Returns the largest breakpoint name

<details>
<summary>Source code</summary>

```scss
@function carbon--largest-breakpoint-name(
  $breakpoints: $carbon--grid-breakpoints
) {
  $total-breakpoints: length($breakpoints);
  @return carbon--key-by-index($breakpoints, $total-breakpoints);
}
```

</details>

- **Parameters**:

| Name           | Description                                    | Type  | Default value               |
| -------------- | ---------------------------------------------- | ----- | --------------------------- |
| `$breakpoints` | A map of breakpoints where the key is the name | `Map` | `$carbon--grid-breakpoints` |

- **Group**: [@carbon/layout](#carbonlayout)
- **Returns**: `String`
- **Requires**:
  - [carbon--key-by-index [function]](#carbon--key-by-index-function)
- **Used by**:
  - [carbon--largest-breakpoint [mixin]](#carbon--largest-breakpoint-mixin)

### ✅carbon--breakpoint-infix [function]

Get the infix for a given breakpoint in a list of breakpoints. Usesful for
generate the size part in a selector, for example: `.prefix--col-sm-2`.

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
| `$name` | The name of the breakpoint | `String` | —             |

- **Group**: [@carbon/layout](#carbonlayout)
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
| `$name`        | —                                              | `String \| Number` | —                           |
| `$breakpoints` | A map of breakpoints where the key is the name | `Map`              | `$carbon--grid-breakpoints` |

- **Group**: [@carbon/layout](#carbonlayout)
- **Requires**:
  - [carbon--is-smallest-breakpoint [function]](#carbon--is-smallest-breakpoint-function)
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
| `$name`        | —                                              | `String \| Number` | —                           |
| `$breakpoints` | A map of breakpoints where the key is the name | `Map`              | `$carbon--grid-breakpoints` |

- **Group**: [@carbon/layout](#carbonlayout)
- **Requires**:
  - [carbon--is-smallest-breakpoint [function]](#carbon--is-smallest-breakpoint-function)
- **Used by**:
  - [carbon--breakpoint-between [mixin]](#carbon--breakpoint-between-mixin)

### ✅carbon--breakpoint-between [mixin]

Generate a media query for the range between the lower and upper breakpoints

<details>
<summary>Source code</summary>

```scss
@mixin carbon--breakpoint-between(
  $lower,
  $upper,
  $breakpoints: $carbon--grid-breakpoints
) {
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

| Name           | Description                                    | Type               | Default value               |
| -------------- | ---------------------------------------------- | ------------------ | --------------------------- |
| `$lower`       | —                                              | `String \| Number` | —                           |
| `$upper`       | —                                              | `String \| Number` | —                           |
| `$breakpoints` | A map of breakpoints where the key is the name | `Map`              | `$carbon--grid-breakpoints` |

- **Group**: [@carbon/layout](#carbonlayout)
- **Requires**:
  - [carbon--breakpoint-up [mixin]](#carbon--breakpoint-up-mixin)
  - [carbon--breakpoint-down [mixin]](#carbon--breakpoint-down-mixin)

### ✅carbon--largest-breakpoint [mixin]

Generate media query for the largest breakpoint

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
| `$breakpoints` | A map of breakpoints where the key is the name | `Map` | `$carbon--grid-breakpoints` |

- **Group**: [@carbon/layout](#carbonlayout)
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
| `$name`        | —                                              | `String \| Number` | —                           |
| `$breakpoints` | A map of breakpoints where the key is the name | `Map`              | `$carbon--grid-breakpoints` |

- **Group**: [@carbon/layout](#carbonlayout)
- **Requires**:
  - [carbon--breakpoint-up [mixin]](#carbon--breakpoint-up-mixin)
- **Used by**:
  - [carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)
  - [carbon--make-container [mixin]](#carbon--make-container-mixin)
  - [carbon--make-container-max-widths [mixin]](#carbon--make-container-max-widths-mixin)
  - [carbon--largest-breakpoint [mixin]](#carbon--largest-breakpoint-mixin)
  - [fluid-type [mixin]](#fluid-type-mixin)

### ✅carbon--container-01 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--container-01: 1.5rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `container-01`

### ✅carbon--container-02 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--container-02: 2rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `container-02`

### ✅carbon--container-03 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--container-03: 2.5rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `container-03`

### ✅carbon--container-04 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--container-04: 3rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `container-04`

### ✅carbon--container-05 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--container-05: 4rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `container-05`

### ✅carbon--container [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--container: (
  $carbon--container-01,
  $carbon--container-02,
  $carbon--container-03,
  $carbon--container-04,
  $carbon--container-05
);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `List`

### ✅container-01 [variable]

<details>
<summary>Source code</summary>

```scss
$container-01: $carbon--container-01;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--container-01`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅container-02 [variable]

<details>
<summary>Source code</summary>

```scss
$container-02: $carbon--container-02;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--container-02`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅container-03 [variable]

<details>
<summary>Source code</summary>

```scss
$container-03: $carbon--container-03;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--container-03`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅container-04 [variable]

<details>
<summary>Source code</summary>

```scss
$container-04: $carbon--container-04;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--container-04`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅container-05 [variable]

<details>
<summary>Source code</summary>

```scss
$container-05: $carbon--container-05;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--container-05`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅carbon--base-font-size [variable]

Default font size

<details>
<summary>Source code</summary>

```scss
$carbon--base-font-size: 16px;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Used by**:
  - [carbon--rem [function]](#carbon--rem-function)
  - [carbon--em [function]](#carbon--em-function)

### ✅carbon--rem [function]

Convert a given px unit to a rem unit

<details>
<summary>Source code</summary>

```scss
@function carbon--rem($px) {
  @if unit($px) != 'px' {
    // TODO: update to @error in v11
    @warn "Expected argument $px to be of type `px`, instead received: `#{unit($px)}`";
  }

  @return ($px / $carbon--base-font-size) * 1rem;
}
```

</details>

- **Parameters**:

| Name  | Description         | Type     | Default value |
| ----- | ------------------- | -------- | ------------- |
| `$px` | Number with px unit | `Number` | —             |

- **Group**: [@carbon/layout](#carbonlayout)
- **Returns**: `Number` Number with rem unit
- **Requires**:
  - [carbon--base-font-size [variable]](#carbon--base-font-size-variable)
- **Used by**:
  - [carbon--mini-units [function]](#carbon--mini-units-function)

### ✅carbon--em [function]

Convert a given px unit to a em unit

<details>
<summary>Source code</summary>

```scss
@function carbon--em($px) {
  @if unit($px) != 'px' {
    // TODO: update to @error in v11
    @warn "Expected argument $px to be of type `px`, instead received: `#{unit($px)}`";
  }

  @return ($px / $carbon--base-font-size) * 1em;
}
```

</details>

- **Parameters**:

| Name  | Description         | Type     | Default value |
| ----- | ------------------- | -------- | ------------- |
| `$px` | Number with px unit | `Number` | —             |

- **Group**: [@carbon/layout](#carbonlayout)
- **Returns**: `Number` Number with em unit
- **Requires**:
  - [carbon--base-font-size [variable]](#carbon--base-font-size-variable)

### ✅carbon--fluid-spacing-01 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--fluid-spacing-01: 0;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `fluid-spacing-01`

### ✅carbon--fluid-spacing-02 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--fluid-spacing-02: 2vw;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `fluid-spacing-02`

### ✅carbon--fluid-spacing-03 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--fluid-spacing-03: 5vw;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `fluid-spacing-03`

### ✅carbon--fluid-spacing-04 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--fluid-spacing-04: 10vw;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `fluid-spacing-04`

### ✅carbon--fluid-spacing [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--fluid-spacing: (
  $carbon--fluid-spacing-01,
  $carbon--fluid-spacing-02,
  $carbon--fluid-spacing-03,
  $carbon--fluid-spacing-04
);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `List`

### ✅fluid-spacing-01 [variable]

<details>
<summary>Source code</summary>

```scss
$fluid-spacing-01: $carbon--fluid-spacing-01;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--fluid-spacing-01`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅fluid-spacing-02 [variable]

<details>
<summary>Source code</summary>

```scss
$fluid-spacing-02: $carbon--fluid-spacing-02;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--fluid-spacing-02`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅fluid-spacing-03 [variable]

<details>
<summary>Source code</summary>

```scss
$fluid-spacing-03: $carbon--fluid-spacing-03;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--fluid-spacing-03`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅fluid-spacing-04 [variable]

<details>
<summary>Source code</summary>

```scss
$fluid-spacing-04: $carbon--fluid-spacing-04;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--fluid-spacing-04`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅carbon--icon-size-01 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--icon-size-01: 1rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `icon-size-01`

### ✅carbon--icon-size-02 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--icon-size-02: 1.25rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `icon-size-02`

### ✅carbon--icon-size [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--icon-size: ($carbon--icon-size-01, $carbon--icon-size-02);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `List`

### ✅icon-size-01 [variable]

<details>
<summary>Source code</summary>

```scss
$icon-size-01: $carbon--icon-size-01;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--icon-size-01`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅icon-size-02 [variable]

<details>
<summary>Source code</summary>

```scss
$icon-size-02: $carbon--icon-size-02;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--icon-size-02`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅carbon--get-column-width [function]

Get the column width for a given breakpoint

<details>
<summary>Source code</summary>

```scss
@function carbon--get-column-width(
  $breakpoint,
  $breakpoints: $carbon--grid-breakpoints
) {
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

| Name           | Description | Type     | Default value               |
| -------------- | ----------- | -------- | --------------------------- |
| `$breakpoint`  | —           | `String` | —                           |
| `$breakpoints` | —           | `Map`    | `$carbon--grid-breakpoints` |

- **Group**: [@carbon/layout](#carbonlayout)
- **Returns**: `Number` In rem

### ✅carbon--key-height-scales [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--key-height-scales: (
  sm: (
    carbon--get-column-width(sm),
    carbon--get-column-width(sm) * 2,
    carbon--get-column-width(sm) * 3,
    carbon--get-column-width(sm) * 4,
    carbon--get-column-width(sm) * 5,
    carbon--get-column-width(sm) * 6,
  ),
  md: (
    carbon--get-column-width(md),
    carbon--get-column-width(md) * 2,
    carbon--get-column-width(md) * 3,
    carbon--get-column-width(md) * 4,
    carbon--get-column-width(md) * 5,
    carbon--get-column-width(md) * 6,
  ),
  lg: (
    carbon--get-column-width(lg),
    carbon--get-column-width(lg) * 2,
    carbon--get-column-width(lg) * 3,
    carbon--get-column-width(lg) * 4,
    carbon--get-column-width(lg) * 5,
    carbon--get-column-width(lg) * 6,
    carbon--get-column-width(lg) * 7,
    carbon--get-column-width(lg) * 8,
  ),
  xlg: (
    carbon--get-column-width(xlg),
    carbon--get-column-width(xlg) * 2,
    carbon--get-column-width(xlg) * 3,
    carbon--get-column-width(xlg) * 4,
    carbon--get-column-width(xlg) * 5,
    carbon--get-column-width(xlg) * 6,
    carbon--get-column-width(xlg) * 7,
    carbon--get-column-width(xlg) * 8,
  ),
  max: (
    carbon--get-column-width(max),
    carbon--get-column-width(max) * 2,
    carbon--get-column-width(max) * 3,
    carbon--get-column-width(max) * 4,
    carbon--get-column-width(max) * 5,
    carbon--get-column-width(max) * 6,
    carbon--get-column-width(max) * 7,
    carbon--get-column-width(max) * 8,
  ),
);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Map`
- **Used by**:
  - [carbon--key-height [function]](#carbon--key-height-function)

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
| `$breakpoint` | —           | `String` | —             |
| `$step`       | —           | `Number` | —             |

- **Group**: [@carbon/layout](#carbonlayout)
- **Returns**: `Number` In rem
- **Requires**:
  - [carbon--key-height-scales [variable]](#carbon--key-height-scales-variable)

### ✅carbon--layout-01 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--layout-01: 1rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `layout-01`

### ✅carbon--layout-02 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--layout-02: 1.5rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `layout-02`

### ✅carbon--layout-03 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--layout-03: 2rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `layout-03`

### ✅carbon--layout-04 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--layout-04: 3rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `layout-04`

### ✅carbon--layout-05 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--layout-05: 4rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `layout-05`

### ✅carbon--layout-06 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--layout-06: 6rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `layout-06`

### ✅carbon--layout-07 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--layout-07: 10rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `layout-07`

### ✅carbon--layout [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--layout: (
  $carbon--layout-01,
  $carbon--layout-02,
  $carbon--layout-03,
  $carbon--layout-04,
  $carbon--layout-05,
  $carbon--layout-06,
  $carbon--layout-07
);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `List`

### ✅layout-01 [variable]

<details>
<summary>Source code</summary>

```scss
$layout-01: $carbon--layout-01;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--layout-01`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅layout-02 [variable]

<details>
<summary>Source code</summary>

```scss
$layout-02: $carbon--layout-02;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--layout-02`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅layout-03 [variable]

<details>
<summary>Source code</summary>

```scss
$layout-03: $carbon--layout-03;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--layout-03`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅layout-04 [variable]

<details>
<summary>Source code</summary>

```scss
$layout-04: $carbon--layout-04;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--layout-04`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅layout-05 [variable]

<details>
<summary>Source code</summary>

```scss
$layout-05: $carbon--layout-05;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--layout-05`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅layout-06 [variable]

<details>
<summary>Source code</summary>

```scss
$layout-06: $carbon--layout-06;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--layout-06`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅layout-07 [variable]

<details>
<summary>Source code</summary>

```scss
$layout-07: $carbon--layout-07;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--layout-07`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅carbon--mini-unit-size [variable]

Default mini-unit value

<details>
<summary>Source code</summary>

```scss
$carbon--mini-unit-size: 8px;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Used by**:
  - [carbon--mini-units [function]](#carbon--mini-units-function)

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
| `$count` | The number of units to get the value for | `Number` | —             |

- **Group**: [@carbon/layout](#carbonlayout)
- **Returns**: `Number` In rem units
- **Requires**:
  - [carbon--rem [function]](#carbon--rem-function)
  - [carbon--mini-unit-size [variable]](#carbon--mini-unit-size-variable)

### ✅carbon--spacing-01 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-01: 0.125rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-01`

### ✅carbon--spacing-02 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-02: 0.25rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-02`

### ✅carbon--spacing-03 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-03: 0.5rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-03`

### ✅carbon--spacing-04 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-04: 0.75rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-04`

### ✅carbon--spacing-05 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-05: 1rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-05`

### ✅carbon--spacing-06 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-06: 1.5rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-06`

### ✅carbon--spacing-07 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-07: 2rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-07`

### ✅carbon--spacing-08 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-08: 2.5rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-08`

### ✅carbon--spacing-09 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-09: 3rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-09`

### ✅carbon--spacing-10 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-10: 4rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-10`

### ✅carbon--spacing-11 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-11: 5rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-11`

### ✅carbon--spacing-12 [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-12: 6rem;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-12`

### ✅carbon--spacing [variable]

<details>
<summary>Source code</summary>

```scss
$carbon--spacing: (
  $carbon--spacing-01,
  $carbon--spacing-02,
  $carbon--spacing-03,
  $carbon--spacing-04,
  $carbon--spacing-05,
  $carbon--spacing-06,
  $carbon--spacing-07,
  $carbon--spacing-08,
  $carbon--spacing-09,
  $carbon--spacing-10,
  $carbon--spacing-11,
  $carbon--spacing-12
);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `List`

### ✅spacing-01 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-01: $carbon--spacing-01;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--spacing-01`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅spacing-02 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-02: $carbon--spacing-02;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--spacing-02`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅spacing-03 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-03: $carbon--spacing-03;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--spacing-03`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅spacing-04 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-04: $carbon--spacing-04;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--spacing-04`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅spacing-05 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-05: $carbon--spacing-05;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--spacing-05`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅spacing-06 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-06: $carbon--spacing-06;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--spacing-06`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅spacing-07 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-07: $carbon--spacing-07;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--spacing-07`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅spacing-08 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-08: $carbon--spacing-08;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--spacing-08`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅spacing-09 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-09: $carbon--spacing-09;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--spacing-09`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅spacing-10 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-10: $carbon--spacing-10;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--spacing-10`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅spacing-11 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-11: $carbon--spacing-11;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--spacing-11`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅spacing-12 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-12: $carbon--spacing-12;
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Alias**: `carbon--spacing-12`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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

- **Group**: [@carbon/layout](#carbonlayout)
- **Returns**: `*` Desired value

### ✅carbon--key-by-index [function]

Provide a map and index, and get back the relevant key value

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

- **Group**: [@carbon/layout](#carbonlayout)
- **Returns**: `String` Desired value
- **Used by**:
  - [carbon--largest-breakpoint-name [function]](#carbon--largest-breakpoint-name-function)
  - [last-map-item [function]](#last-map-item-function)

### ✅last-map-item [function]

Pass in a map, and get the last one in the list back

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

- **Group**: [@carbon/layout](#carbonlayout)
- **Returns**: `*` Desired value
- **Requires**:
  - [carbon--key-by-index [function]](#carbon--key-by-index-function)
- **Used by**:
  - [carbon--set-largest-breakpoint [mixin]](#carbon--set-largest-breakpoint-mixin)

## @carbon/motion

### ✅carbon--easings [variable]

Common component easings

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

- **Group**: [@carbon/motion](#carbonmotion)
- **Type**: `Map`

### ✅carbon--motion [function]

Get the transition-timing-function for a given easing and motion mode

<details>
<summary>Source code</summary>

```scss
@function carbon--motion($name, $mode: productive, $easings: $carbon--easings) {
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

| Name       | Description                              | Type     | Default value      |
| ---------- | ---------------------------------------- | -------- | ------------------ |
| `$name`    | Can be `standard`, `entrance`, or `exit` | `String` | —                  |
| `$mode`    | Can be `productive` or `expressive`      | `String` | `productive`       |
| `$easings` | Easings map                              | `Map`    | `$carbon--easings` |

- **Group**: [@carbon/motion](#carbonmotion)
- **Returns**: `Function` CSS `cubic-bezier()` function
- **Used by**:
  - [carbon--motion [mixin]](#carbon--motion-mixin)

### ✅carbon--motion [mixin]

Set the transition-timing-function for a given easing and motion mode

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
| `$name` | The name of the easing curve to apply | `String` | —             |
| `$mode` | The mode for the easing curve to use  | `String` | —             |

- **Group**: [@carbon/motion](#carbonmotion)
- **Requires**:
  - [carbon--motion [function]](#carbon--motion-function)

## @carbon/themes

### ❌custom-property-prefix [variable]

<details>
<summary>Source code</summary>

```scss
$custom-property-prefix: 'cds';
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [custom-properties [mixin]](#custom-properties-mixin)

### ❌custom-property [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin custom-property() {
  @if type-of($value) == map {
    @each $property, $property-value in $value {
      // Only support one-level of depth for values that are maps. This is to
      // avoid bringing properties like `breakpoints` on type tokens
      @if type-of($property-value) != map {
        @include custom-property('#{$name}-#{$property}', $property-value);
      }
    }
  } @else {
    --#{$prefix}-#{$name}: #{$value};
  }
}
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ❌should-emit [function]

<details>
<summary>Source code</summary>

```scss
@function should-emit() {
  @if $emit-difference == false {
    @return true;
  }
  @return map-get($theme-a, $token) != map-get($theme-b, $token);
}
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅carbon--theme [mixin]

Define theme variables from a map of tokens

<details>
<summary>Source code</summary>

```scss
@mixin carbon--theme($theme: $carbon--theme, $emit-custom-properties: false) {
  $interactive-01: map-get($theme, 'interactive-01') !global;
  $interactive-02: map-get($theme, 'interactive-02') !global;
  $interactive-03: map-get($theme, 'interactive-03') !global;
  $interactive-04: map-get($theme, 'interactive-04') !global;
  $ui-background: map-get($theme, 'ui-background') !global;
  $ui-01: map-get($theme, 'ui-01') !global;
  $ui-02: map-get($theme, 'ui-02') !global;
  $ui-03: map-get($theme, 'ui-03') !global;
  $ui-04: map-get($theme, 'ui-04') !global;
  $ui-05: map-get($theme, 'ui-05') !global;
  $text-01: map-get($theme, 'text-01') !global;
  $text-02: map-get($theme, 'text-02') !global;
  $text-03: map-get($theme, 'text-03') !global;
  $text-04: map-get($theme, 'text-04') !global;
  $text-05: map-get($theme, 'text-05') !global;
  $icon-01: map-get($theme, 'icon-01') !global;
  $icon-02: map-get($theme, 'icon-02') !global;
  $icon-03: map-get($theme, 'icon-03') !global;
  $link-01: map-get($theme, 'link-01') !global;
  $inverse-link: map-get($theme, 'inverse-link') !global;
  $field-01: map-get($theme, 'field-01') !global;
  $field-02: map-get($theme, 'field-02') !global;
  $inverse-01: map-get($theme, 'inverse-01') !global;
  $inverse-02: map-get($theme, 'inverse-02') !global;
  $support-01: map-get($theme, 'support-01') !global;
  $support-02: map-get($theme, 'support-02') !global;
  $support-03: map-get($theme, 'support-03') !global;
  $support-04: map-get($theme, 'support-04') !global;
  $inverse-support-01: map-get($theme, 'inverse-support-01') !global;
  $inverse-support-02: map-get($theme, 'inverse-support-02') !global;
  $inverse-support-03: map-get($theme, 'inverse-support-03') !global;
  $inverse-support-04: map-get($theme, 'inverse-support-04') !global;
  $overlay-01: map-get($theme, 'overlay-01') !global;
  $danger: map-get($theme, 'danger') !global;
  $focus: map-get($theme, 'focus') !global;
  $inverse-focus-ui: map-get($theme, 'inverse-focus-ui') !global;
  $hover-primary: map-get($theme, 'hover-primary') !global;
  $active-primary: map-get($theme, 'active-primary') !global;
  $hover-primary-text: map-get($theme, 'hover-primary-text') !global;
  $hover-secondary: map-get($theme, 'hover-secondary') !global;
  $active-secondary: map-get($theme, 'active-secondary') !global;
  $hover-tertiary: map-get($theme, 'hover-tertiary') !global;
  $active-tertiary: map-get($theme, 'active-tertiary') !global;
  $hover-ui: map-get($theme, 'hover-ui') !global;
  $active-ui: map-get($theme, 'active-ui') !global;
  $selected-ui: map-get($theme, 'selected-ui') !global;
  $hover-selected-ui: map-get($theme, 'hover-selected-ui') !global;
  $inverse-hover-ui: map-get($theme, 'inverse-hover-ui') !global;
  $hover-danger: map-get($theme, 'hover-danger') !global;
  $active-danger: map-get($theme, 'active-danger') !global;
  $hover-row: map-get($theme, 'hover-row') !global;
  $visited-link: map-get($theme, 'visited-link') !global;
  $disabled-01: map-get($theme, 'disabled-01') !global;
  $disabled-02: map-get($theme, 'disabled-02') !global;
  $disabled-03: map-get($theme, 'disabled-03') !global;
  $highlight: map-get($theme, 'highlight') !global;
  $skeleton-01: map-get($theme, 'skeleton-01') !global;
  $skeleton-02: map-get($theme, 'skeleton-02') !global;
  $brand-01: map-get($theme, 'brand-01') !global;
  $brand-02: map-get($theme, 'brand-02') !global;
  $brand-03: map-get($theme, 'brand-03') !global;
  $active-01: map-get($theme, 'active-01') !global;
  $hover-field: map-get($theme, 'hover-field') !global;
  $caption-01: map-get($theme, 'caption-01') !global;
  $label-01: map-get($theme, 'label-01') !global;
  $helper-text-01: map-get($theme, 'helper-text-01') !global;
  $body-short-01: map-get($theme, 'body-short-01') !global;
  $body-long-01: map-get($theme, 'body-long-01') !global;
  $body-short-02: map-get($theme, 'body-short-02') !global;
  $body-long-02: map-get($theme, 'body-long-02') !global;
  $code-01: map-get($theme, 'code-01') !global;
  $code-02: map-get($theme, 'code-02') !global;
  $heading-01: map-get($theme, 'heading-01') !global;
  $productive-heading-01: map-get($theme, 'productive-heading-01') !global;
  $heading-02: map-get($theme, 'heading-02') !global;
  $productive-heading-02: map-get($theme, 'productive-heading-02') !global;
  $productive-heading-03: map-get($theme, 'productive-heading-03') !global;
  $productive-heading-04: map-get($theme, 'productive-heading-04') !global;
  $productive-heading-05: map-get($theme, 'productive-heading-05') !global;
  $productive-heading-06: map-get($theme, 'productive-heading-06') !global;
  $productive-heading-07: map-get($theme, 'productive-heading-07') !global;
  $expressive-heading-01: map-get($theme, 'expressive-heading-01') !global;
  $expressive-heading-02: map-get($theme, 'expressive-heading-02') !global;
  $expressive-heading-03: map-get($theme, 'expressive-heading-03') !global;
  $expressive-heading-04: map-get($theme, 'expressive-heading-04') !global;
  $expressive-heading-05: map-get($theme, 'expressive-heading-05') !global;
  $expressive-heading-06: map-get($theme, 'expressive-heading-06') !global;
  $expressive-paragraph-01: map-get($theme, 'expressive-paragraph-01') !global;
  $quotation-01: map-get($theme, 'quotation-01') !global;
  $quotation-02: map-get($theme, 'quotation-02') !global;
  $display-01: map-get($theme, 'display-01') !global;
  $display-02: map-get($theme, 'display-02') !global;
  $display-03: map-get($theme, 'display-03') !global;
  $display-04: map-get($theme, 'display-04') !global;
  $spacing-01: map-get($theme, 'spacing-01') !global;
  $spacing-02: map-get($theme, 'spacing-02') !global;
  $spacing-03: map-get($theme, 'spacing-03') !global;
  $spacing-04: map-get($theme, 'spacing-04') !global;
  $spacing-05: map-get($theme, 'spacing-05') !global;
  $spacing-06: map-get($theme, 'spacing-06') !global;
  $spacing-07: map-get($theme, 'spacing-07') !global;
  $spacing-08: map-get($theme, 'spacing-08') !global;
  $spacing-09: map-get($theme, 'spacing-09') !global;
  $spacing-10: map-get($theme, 'spacing-10') !global;
  $spacing-11: map-get($theme, 'spacing-11') !global;
  $spacing-12: map-get($theme, 'spacing-12') !global;
  $fluid-spacing-01: map-get($theme, 'fluid-spacing-01') !global;
  $fluid-spacing-02: map-get($theme, 'fluid-spacing-02') !global;
  $fluid-spacing-03: map-get($theme, 'fluid-spacing-03') !global;
  $fluid-spacing-04: map-get($theme, 'fluid-spacing-04') !global;
  $layout-01: map-get($theme, 'layout-01') !global;
  $layout-02: map-get($theme, 'layout-02') !global;
  $layout-03: map-get($theme, 'layout-03') !global;
  $layout-04: map-get($theme, 'layout-04') !global;
  $layout-05: map-get($theme, 'layout-05') !global;
  $layout-06: map-get($theme, 'layout-06') !global;
  $layout-07: map-get($theme, 'layout-07') !global;
  $container-01: map-get($theme, 'container-01') !global;
  $container-02: map-get($theme, 'container-02') !global;
  $container-03: map-get($theme, 'container-03') !global;
  $container-04: map-get($theme, 'container-04') !global;
  $container-05: map-get($theme, 'container-05') !global;
  $icon-size-01: map-get($theme, 'icon-size-01') !global;
  $icon-size-02: map-get($theme, 'icon-size-02') !global;

  @if global-variable-exists('feature-flags') and
    map-get($feature-flags, 'enable-css-custom-properties')
  {
    $interactive-01: var(
      --#{$custom-property-prefix}-interactive-01,
      map-get($theme, 'interactive-01')
    ) !global;
    $interactive-02: var(
      --#{$custom-property-prefix}-interactive-02,
      map-get($theme, 'interactive-02')
    ) !global;
    $interactive-03: var(
      --#{$custom-property-prefix}-interactive-03,
      map-get($theme, 'interactive-03')
    ) !global;
    $interactive-04: var(
      --#{$custom-property-prefix}-interactive-04,
      map-get($theme, 'interactive-04')
    ) !global;
    $ui-background: var(
      --#{$custom-property-prefix}-ui-background,
      map-get($theme, 'ui-background')
    ) !global;
    $ui-01: var(
      --#{$custom-property-prefix}-ui-01,
      map-get($theme, 'ui-01')
    ) !global;
    $ui-02: var(
      --#{$custom-property-prefix}-ui-02,
      map-get($theme, 'ui-02')
    ) !global;
    $ui-03: var(
      --#{$custom-property-prefix}-ui-03,
      map-get($theme, 'ui-03')
    ) !global;
    $ui-04: var(
      --#{$custom-property-prefix}-ui-04,
      map-get($theme, 'ui-04')
    ) !global;
    $ui-05: var(
      --#{$custom-property-prefix}-ui-05,
      map-get($theme, 'ui-05')
    ) !global;
    $text-01: var(
      --#{$custom-property-prefix}-text-01,
      map-get($theme, 'text-01')
    ) !global;
    $text-02: var(
      --#{$custom-property-prefix}-text-02,
      map-get($theme, 'text-02')
    ) !global;
    $text-03: var(
      --#{$custom-property-prefix}-text-03,
      map-get($theme, 'text-03')
    ) !global;
    $text-04: var(
      --#{$custom-property-prefix}-text-04,
      map-get($theme, 'text-04')
    ) !global;
    $text-05: var(
      --#{$custom-property-prefix}-text-05,
      map-get($theme, 'text-05')
    ) !global;
    $icon-01: var(
      --#{$custom-property-prefix}-icon-01,
      map-get($theme, 'icon-01')
    ) !global;
    $icon-02: var(
      --#{$custom-property-prefix}-icon-02,
      map-get($theme, 'icon-02')
    ) !global;
    $icon-03: var(
      --#{$custom-property-prefix}-icon-03,
      map-get($theme, 'icon-03')
    ) !global;
    $link-01: var(
      --#{$custom-property-prefix}-link-01,
      map-get($theme, 'link-01')
    ) !global;
    $inverse-link: var(
      --#{$custom-property-prefix}-inverse-link,
      map-get($theme, 'inverse-link')
    ) !global;
    $field-01: var(
      --#{$custom-property-prefix}-field-01,
      map-get($theme, 'field-01')
    ) !global;
    $field-02: var(
      --#{$custom-property-prefix}-field-02,
      map-get($theme, 'field-02')
    ) !global;
    $inverse-01: var(
      --#{$custom-property-prefix}-inverse-01,
      map-get($theme, 'inverse-01')
    ) !global;
    $inverse-02: var(
      --#{$custom-property-prefix}-inverse-02,
      map-get($theme, 'inverse-02')
    ) !global;
    $support-01: var(
      --#{$custom-property-prefix}-support-01,
      map-get($theme, 'support-01')
    ) !global;
    $support-02: var(
      --#{$custom-property-prefix}-support-02,
      map-get($theme, 'support-02')
    ) !global;
    $support-03: var(
      --#{$custom-property-prefix}-support-03,
      map-get($theme, 'support-03')
    ) !global;
    $support-04: var(
      --#{$custom-property-prefix}-support-04,
      map-get($theme, 'support-04')
    ) !global;
    $inverse-support-01: var(
      --#{$custom-property-prefix}-inverse-support-01,
      map-get($theme, 'inverse-support-01')
    ) !global;
    $inverse-support-02: var(
      --#{$custom-property-prefix}-inverse-support-02,
      map-get($theme, 'inverse-support-02')
    ) !global;
    $inverse-support-03: var(
      --#{$custom-property-prefix}-inverse-support-03,
      map-get($theme, 'inverse-support-03')
    ) !global;
    $inverse-support-04: var(
      --#{$custom-property-prefix}-inverse-support-04,
      map-get($theme, 'inverse-support-04')
    ) !global;
    $overlay-01: var(
      --#{$custom-property-prefix}-overlay-01,
      map-get($theme, 'overlay-01')
    ) !global;
    $danger: var(
      --#{$custom-property-prefix}-danger,
      map-get($theme, 'danger')
    ) !global;
    $focus: var(
      --#{$custom-property-prefix}-focus,
      map-get($theme, 'focus')
    ) !global;
    $inverse-focus-ui: var(
      --#{$custom-property-prefix}-inverse-focus-ui,
      map-get($theme, 'inverse-focus-ui')
    ) !global;
    $hover-primary: var(
      --#{$custom-property-prefix}-hover-primary,
      map-get($theme, 'hover-primary')
    ) !global;
    $active-primary: var(
      --#{$custom-property-prefix}-active-primary,
      map-get($theme, 'active-primary')
    ) !global;
    $hover-primary-text: var(
      --#{$custom-property-prefix}-hover-primary-text,
      map-get($theme, 'hover-primary-text')
    ) !global;
    $hover-secondary: var(
      --#{$custom-property-prefix}-hover-secondary,
      map-get($theme, 'hover-secondary')
    ) !global;
    $active-secondary: var(
      --#{$custom-property-prefix}-active-secondary,
      map-get($theme, 'active-secondary')
    ) !global;
    $hover-tertiary: var(
      --#{$custom-property-prefix}-hover-tertiary,
      map-get($theme, 'hover-tertiary')
    ) !global;
    $active-tertiary: var(
      --#{$custom-property-prefix}-active-tertiary,
      map-get($theme, 'active-tertiary')
    ) !global;
    $hover-ui: var(
      --#{$custom-property-prefix}-hover-ui,
      map-get($theme, 'hover-ui')
    ) !global;
    $active-ui: var(
      --#{$custom-property-prefix}-active-ui,
      map-get($theme, 'active-ui')
    ) !global;
    $selected-ui: var(
      --#{$custom-property-prefix}-selected-ui,
      map-get($theme, 'selected-ui')
    ) !global;
    $hover-selected-ui: var(
      --#{$custom-property-prefix}-hover-selected-ui,
      map-get($theme, 'hover-selected-ui')
    ) !global;
    $inverse-hover-ui: var(
      --#{$custom-property-prefix}-inverse-hover-ui,
      map-get($theme, 'inverse-hover-ui')
    ) !global;
    $hover-danger: var(
      --#{$custom-property-prefix}-hover-danger,
      map-get($theme, 'hover-danger')
    ) !global;
    $active-danger: var(
      --#{$custom-property-prefix}-active-danger,
      map-get($theme, 'active-danger')
    ) !global;
    $hover-row: var(
      --#{$custom-property-prefix}-hover-row,
      map-get($theme, 'hover-row')
    ) !global;
    $visited-link: var(
      --#{$custom-property-prefix}-visited-link,
      map-get($theme, 'visited-link')
    ) !global;
    $disabled-01: var(
      --#{$custom-property-prefix}-disabled-01,
      map-get($theme, 'disabled-01')
    ) !global;
    $disabled-02: var(
      --#{$custom-property-prefix}-disabled-02,
      map-get($theme, 'disabled-02')
    ) !global;
    $disabled-03: var(
      --#{$custom-property-prefix}-disabled-03,
      map-get($theme, 'disabled-03')
    ) !global;
    $highlight: var(
      --#{$custom-property-prefix}-highlight,
      map-get($theme, 'highlight')
    ) !global;
    $skeleton-01: var(
      --#{$custom-property-prefix}-skeleton-01,
      map-get($theme, 'skeleton-01')
    ) !global;
    $skeleton-02: var(
      --#{$custom-property-prefix}-skeleton-02,
      map-get($theme, 'skeleton-02')
    ) !global;
    $brand-01: var(
      --#{$custom-property-prefix}-brand-01,
      map-get($theme, 'brand-01')
    ) !global;
    $brand-02: var(
      --#{$custom-property-prefix}-brand-02,
      map-get($theme, 'brand-02')
    ) !global;
    $brand-03: var(
      --#{$custom-property-prefix}-brand-03,
      map-get($theme, 'brand-03')
    ) !global;
    $active-01: var(
      --#{$custom-property-prefix}-active-01,
      map-get($theme, 'active-01')
    ) !global;
    $hover-field: var(
      --#{$custom-property-prefix}-hover-field,
      map-get($theme, 'hover-field')
    ) !global;
    $spacing-01: var(
      --#{$custom-property-prefix}-spacing-01,
      map-get($theme, 'spacing-01')
    ) !global;
    $spacing-02: var(
      --#{$custom-property-prefix}-spacing-02,
      map-get($theme, 'spacing-02')
    ) !global;
    $spacing-03: var(
      --#{$custom-property-prefix}-spacing-03,
      map-get($theme, 'spacing-03')
    ) !global;
    $spacing-04: var(
      --#{$custom-property-prefix}-spacing-04,
      map-get($theme, 'spacing-04')
    ) !global;
    $spacing-05: var(
      --#{$custom-property-prefix}-spacing-05,
      map-get($theme, 'spacing-05')
    ) !global;
    $spacing-06: var(
      --#{$custom-property-prefix}-spacing-06,
      map-get($theme, 'spacing-06')
    ) !global;
    $spacing-07: var(
      --#{$custom-property-prefix}-spacing-07,
      map-get($theme, 'spacing-07')
    ) !global;
    $spacing-08: var(
      --#{$custom-property-prefix}-spacing-08,
      map-get($theme, 'spacing-08')
    ) !global;
    $spacing-09: var(
      --#{$custom-property-prefix}-spacing-09,
      map-get($theme, 'spacing-09')
    ) !global;
    $spacing-10: var(
      --#{$custom-property-prefix}-spacing-10,
      map-get($theme, 'spacing-10')
    ) !global;
    $spacing-11: var(
      --#{$custom-property-prefix}-spacing-11,
      map-get($theme, 'spacing-11')
    ) !global;
    $spacing-12: var(
      --#{$custom-property-prefix}-spacing-12,
      map-get($theme, 'spacing-12')
    ) !global;
    $fluid-spacing-01: var(
      --#{$custom-property-prefix}-fluid-spacing-01,
      map-get($theme, 'fluid-spacing-01')
    ) !global;
    $fluid-spacing-02: var(
      --#{$custom-property-prefix}-fluid-spacing-02,
      map-get($theme, 'fluid-spacing-02')
    ) !global;
    $fluid-spacing-03: var(
      --#{$custom-property-prefix}-fluid-spacing-03,
      map-get($theme, 'fluid-spacing-03')
    ) !global;
    $fluid-spacing-04: var(
      --#{$custom-property-prefix}-fluid-spacing-04,
      map-get($theme, 'fluid-spacing-04')
    ) !global;
    $layout-01: var(
      --#{$custom-property-prefix}-layout-01,
      map-get($theme, 'layout-01')
    ) !global;
    $layout-02: var(
      --#{$custom-property-prefix}-layout-02,
      map-get($theme, 'layout-02')
    ) !global;
    $layout-03: var(
      --#{$custom-property-prefix}-layout-03,
      map-get($theme, 'layout-03')
    ) !global;
    $layout-04: var(
      --#{$custom-property-prefix}-layout-04,
      map-get($theme, 'layout-04')
    ) !global;
    $layout-05: var(
      --#{$custom-property-prefix}-layout-05,
      map-get($theme, 'layout-05')
    ) !global;
    $layout-06: var(
      --#{$custom-property-prefix}-layout-06,
      map-get($theme, 'layout-06')
    ) !global;
    $layout-07: var(
      --#{$custom-property-prefix}-layout-07,
      map-get($theme, 'layout-07')
    ) !global;
    $container-01: var(
      --#{$custom-property-prefix}-container-01,
      map-get($theme, 'container-01')
    ) !global;
    $container-02: var(
      --#{$custom-property-prefix}-container-02,
      map-get($theme, 'container-02')
    ) !global;
    $container-03: var(
      --#{$custom-property-prefix}-container-03,
      map-get($theme, 'container-03')
    ) !global;
    $container-04: var(
      --#{$custom-property-prefix}-container-04,
      map-get($theme, 'container-04')
    ) !global;
    $container-05: var(
      --#{$custom-property-prefix}-container-05,
      map-get($theme, 'container-05')
    ) !global;
    $icon-size-01: var(
      --#{$custom-property-prefix}-icon-size-01,
      map-get($theme, 'icon-size-01')
    ) !global;
    $icon-size-02: var(
      --#{$custom-property-prefix}-icon-size-02,
      map-get($theme, 'icon-size-02')
    ) !global;
  }
  @if $emit-custom-properties == true {
    @if should-emit($theme, $carbon--theme, 'interactive-01', $emit-difference)
    {
      @include custom-property(
        'interactive-01',
        map-get($theme, 'interactive-01')
      );
    }

    @if should-emit($theme, $carbon--theme, 'interactive-02', $emit-difference)
    {
      @include custom-property(
        'interactive-02',
        map-get($theme, 'interactive-02')
      );
    }

    @if should-emit($theme, $carbon--theme, 'interactive-03', $emit-difference)
    {
      @include custom-property(
        'interactive-03',
        map-get($theme, 'interactive-03')
      );
    }

    @if should-emit($theme, $carbon--theme, 'interactive-04', $emit-difference)
    {
      @include custom-property(
        'interactive-04',
        map-get($theme, 'interactive-04')
      );
    }

    @if should-emit($theme, $carbon--theme, 'ui-background', $emit-difference) {
      @include custom-property(
        'ui-background',
        map-get($theme, 'ui-background')
      );
    }

    @if should-emit($theme, $carbon--theme, 'ui-01', $emit-difference) {
      @include custom-property('ui-01', map-get($theme, 'ui-01'));
    }

    @if should-emit($theme, $carbon--theme, 'ui-02', $emit-difference) {
      @include custom-property('ui-02', map-get($theme, 'ui-02'));
    }

    @if should-emit($theme, $carbon--theme, 'ui-03', $emit-difference) {
      @include custom-property('ui-03', map-get($theme, 'ui-03'));
    }

    @if should-emit($theme, $carbon--theme, 'ui-04', $emit-difference) {
      @include custom-property('ui-04', map-get($theme, 'ui-04'));
    }

    @if should-emit($theme, $carbon--theme, 'ui-05', $emit-difference) {
      @include custom-property('ui-05', map-get($theme, 'ui-05'));
    }

    @if should-emit($theme, $carbon--theme, 'text-01', $emit-difference) {
      @include custom-property('text-01', map-get($theme, 'text-01'));
    }

    @if should-emit($theme, $carbon--theme, 'text-02', $emit-difference) {
      @include custom-property('text-02', map-get($theme, 'text-02'));
    }

    @if should-emit($theme, $carbon--theme, 'text-03', $emit-difference) {
      @include custom-property('text-03', map-get($theme, 'text-03'));
    }

    @if should-emit($theme, $carbon--theme, 'text-04', $emit-difference) {
      @include custom-property('text-04', map-get($theme, 'text-04'));
    }

    @if should-emit($theme, $carbon--theme, 'text-05', $emit-difference) {
      @include custom-property('text-05', map-get($theme, 'text-05'));
    }

    @if should-emit($theme, $carbon--theme, 'icon-01', $emit-difference) {
      @include custom-property('icon-01', map-get($theme, 'icon-01'));
    }

    @if should-emit($theme, $carbon--theme, 'icon-02', $emit-difference) {
      @include custom-property('icon-02', map-get($theme, 'icon-02'));
    }

    @if should-emit($theme, $carbon--theme, 'icon-03', $emit-difference) {
      @include custom-property('icon-03', map-get($theme, 'icon-03'));
    }

    @if should-emit($theme, $carbon--theme, 'link-01', $emit-difference) {
      @include custom-property('link-01', map-get($theme, 'link-01'));
    }

    @if should-emit($theme, $carbon--theme, 'inverse-link', $emit-difference) {
      @include custom-property('inverse-link', map-get($theme, 'inverse-link'));
    }

    @if should-emit($theme, $carbon--theme, 'field-01', $emit-difference) {
      @include custom-property('field-01', map-get($theme, 'field-01'));
    }

    @if should-emit($theme, $carbon--theme, 'field-02', $emit-difference) {
      @include custom-property('field-02', map-get($theme, 'field-02'));
    }

    @if should-emit($theme, $carbon--theme, 'inverse-01', $emit-difference) {
      @include custom-property('inverse-01', map-get($theme, 'inverse-01'));
    }

    @if should-emit($theme, $carbon--theme, 'inverse-02', $emit-difference) {
      @include custom-property('inverse-02', map-get($theme, 'inverse-02'));
    }

    @if should-emit($theme, $carbon--theme, 'support-01', $emit-difference) {
      @include custom-property('support-01', map-get($theme, 'support-01'));
    }

    @if should-emit($theme, $carbon--theme, 'support-02', $emit-difference) {
      @include custom-property('support-02', map-get($theme, 'support-02'));
    }

    @if should-emit($theme, $carbon--theme, 'support-03', $emit-difference) {
      @include custom-property('support-03', map-get($theme, 'support-03'));
    }

    @if should-emit($theme, $carbon--theme, 'support-04', $emit-difference) {
      @include custom-property('support-04', map-get($theme, 'support-04'));
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'inverse-support-01',
      $emit-difference
    )
    {
      @include custom-property(
        'inverse-support-01',
        map-get($theme, 'inverse-support-01')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'inverse-support-02',
      $emit-difference
    )
    {
      @include custom-property(
        'inverse-support-02',
        map-get($theme, 'inverse-support-02')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'inverse-support-03',
      $emit-difference
    )
    {
      @include custom-property(
        'inverse-support-03',
        map-get($theme, 'inverse-support-03')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'inverse-support-04',
      $emit-difference
    )
    {
      @include custom-property(
        'inverse-support-04',
        map-get($theme, 'inverse-support-04')
      );
    }

    @if should-emit($theme, $carbon--theme, 'overlay-01', $emit-difference) {
      @include custom-property('overlay-01', map-get($theme, 'overlay-01'));
    }

    @if should-emit($theme, $carbon--theme, 'danger', $emit-difference) {
      @include custom-property('danger', map-get($theme, 'danger'));
    }

    @if should-emit($theme, $carbon--theme, 'focus', $emit-difference) {
      @include custom-property('focus', map-get($theme, 'focus'));
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'inverse-focus-ui',
      $emit-difference
    )
    {
      @include custom-property(
        'inverse-focus-ui',
        map-get($theme, 'inverse-focus-ui')
      );
    }

    @if should-emit($theme, $carbon--theme, 'hover-primary', $emit-difference) {
      @include custom-property(
        'hover-primary',
        map-get($theme, 'hover-primary')
      );
    }

    @if should-emit($theme, $carbon--theme, 'active-primary', $emit-difference)
    {
      @include custom-property(
        'active-primary',
        map-get($theme, 'active-primary')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'hover-primary-text',
      $emit-difference
    )
    {
      @include custom-property(
        'hover-primary-text',
        map-get($theme, 'hover-primary-text')
      );
    }

    @if should-emit($theme, $carbon--theme, 'hover-secondary', $emit-difference)
    {
      @include custom-property(
        'hover-secondary',
        map-get($theme, 'hover-secondary')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'active-secondary',
      $emit-difference
    )
    {
      @include custom-property(
        'active-secondary',
        map-get($theme, 'active-secondary')
      );
    }

    @if should-emit($theme, $carbon--theme, 'hover-tertiary', $emit-difference)
    {
      @include custom-property(
        'hover-tertiary',
        map-get($theme, 'hover-tertiary')
      );
    }

    @if should-emit($theme, $carbon--theme, 'active-tertiary', $emit-difference)
    {
      @include custom-property(
        'active-tertiary',
        map-get($theme, 'active-tertiary')
      );
    }

    @if should-emit($theme, $carbon--theme, 'hover-ui', $emit-difference) {
      @include custom-property('hover-ui', map-get($theme, 'hover-ui'));
    }

    @if should-emit($theme, $carbon--theme, 'active-ui', $emit-difference) {
      @include custom-property('active-ui', map-get($theme, 'active-ui'));
    }

    @if should-emit($theme, $carbon--theme, 'selected-ui', $emit-difference) {
      @include custom-property('selected-ui', map-get($theme, 'selected-ui'));
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'hover-selected-ui',
      $emit-difference
    )
    {
      @include custom-property(
        'hover-selected-ui',
        map-get($theme, 'hover-selected-ui')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'inverse-hover-ui',
      $emit-difference
    )
    {
      @include custom-property(
        'inverse-hover-ui',
        map-get($theme, 'inverse-hover-ui')
      );
    }

    @if should-emit($theme, $carbon--theme, 'hover-danger', $emit-difference) {
      @include custom-property('hover-danger', map-get($theme, 'hover-danger'));
    }

    @if should-emit($theme, $carbon--theme, 'active-danger', $emit-difference) {
      @include custom-property(
        'active-danger',
        map-get($theme, 'active-danger')
      );
    }

    @if should-emit($theme, $carbon--theme, 'hover-row', $emit-difference) {
      @include custom-property('hover-row', map-get($theme, 'hover-row'));
    }

    @if should-emit($theme, $carbon--theme, 'visited-link', $emit-difference) {
      @include custom-property('visited-link', map-get($theme, 'visited-link'));
    }

    @if should-emit($theme, $carbon--theme, 'disabled-01', $emit-difference) {
      @include custom-property('disabled-01', map-get($theme, 'disabled-01'));
    }

    @if should-emit($theme, $carbon--theme, 'disabled-02', $emit-difference) {
      @include custom-property('disabled-02', map-get($theme, 'disabled-02'));
    }

    @if should-emit($theme, $carbon--theme, 'disabled-03', $emit-difference) {
      @include custom-property('disabled-03', map-get($theme, 'disabled-03'));
    }

    @if should-emit($theme, $carbon--theme, 'highlight', $emit-difference) {
      @include custom-property('highlight', map-get($theme, 'highlight'));
    }

    @if should-emit($theme, $carbon--theme, 'skeleton-01', $emit-difference) {
      @include custom-property('skeleton-01', map-get($theme, 'skeleton-01'));
    }

    @if should-emit($theme, $carbon--theme, 'skeleton-02', $emit-difference) {
      @include custom-property('skeleton-02', map-get($theme, 'skeleton-02'));
    }

    @if should-emit($theme, $carbon--theme, 'brand-01', $emit-difference) {
      @include custom-property('brand-01', map-get($theme, 'brand-01'));
    }

    @if should-emit($theme, $carbon--theme, 'brand-02', $emit-difference) {
      @include custom-property('brand-02', map-get($theme, 'brand-02'));
    }

    @if should-emit($theme, $carbon--theme, 'brand-03', $emit-difference) {
      @include custom-property('brand-03', map-get($theme, 'brand-03'));
    }

    @if should-emit($theme, $carbon--theme, 'active-01', $emit-difference) {
      @include custom-property('active-01', map-get($theme, 'active-01'));
    }

    @if should-emit($theme, $carbon--theme, 'hover-field', $emit-difference) {
      @include custom-property('hover-field', map-get($theme, 'hover-field'));
    }

    @if should-emit($theme, $carbon--theme, 'caption-01', $emit-difference) {
      @include custom-property('caption-01', map-get($theme, 'caption-01'));
    }

    @if should-emit($theme, $carbon--theme, 'label-01', $emit-difference) {
      @include custom-property('label-01', map-get($theme, 'label-01'));
    }

    @if should-emit($theme, $carbon--theme, 'helper-text-01', $emit-difference)
    {
      @include custom-property(
        'helper-text-01',
        map-get($theme, 'helper-text-01')
      );
    }

    @if should-emit($theme, $carbon--theme, 'body-short-01', $emit-difference) {
      @include custom-property(
        'body-short-01',
        map-get($theme, 'body-short-01')
      );
    }

    @if should-emit($theme, $carbon--theme, 'body-long-01', $emit-difference) {
      @include custom-property('body-long-01', map-get($theme, 'body-long-01'));
    }

    @if should-emit($theme, $carbon--theme, 'body-short-02', $emit-difference) {
      @include custom-property(
        'body-short-02',
        map-get($theme, 'body-short-02')
      );
    }

    @if should-emit($theme, $carbon--theme, 'body-long-02', $emit-difference) {
      @include custom-property('body-long-02', map-get($theme, 'body-long-02'));
    }

    @if should-emit($theme, $carbon--theme, 'code-01', $emit-difference) {
      @include custom-property('code-01', map-get($theme, 'code-01'));
    }

    @if should-emit($theme, $carbon--theme, 'code-02', $emit-difference) {
      @include custom-property('code-02', map-get($theme, 'code-02'));
    }

    @if should-emit($theme, $carbon--theme, 'heading-01', $emit-difference) {
      @include custom-property('heading-01', map-get($theme, 'heading-01'));
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'productive-heading-01',
      $emit-difference
    )
    {
      @include custom-property(
        'productive-heading-01',
        map-get($theme, 'productive-heading-01')
      );
    }

    @if should-emit($theme, $carbon--theme, 'heading-02', $emit-difference) {
      @include custom-property('heading-02', map-get($theme, 'heading-02'));
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'productive-heading-02',
      $emit-difference
    )
    {
      @include custom-property(
        'productive-heading-02',
        map-get($theme, 'productive-heading-02')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'productive-heading-03',
      $emit-difference
    )
    {
      @include custom-property(
        'productive-heading-03',
        map-get($theme, 'productive-heading-03')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'productive-heading-04',
      $emit-difference
    )
    {
      @include custom-property(
        'productive-heading-04',
        map-get($theme, 'productive-heading-04')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'productive-heading-05',
      $emit-difference
    )
    {
      @include custom-property(
        'productive-heading-05',
        map-get($theme, 'productive-heading-05')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'productive-heading-06',
      $emit-difference
    )
    {
      @include custom-property(
        'productive-heading-06',
        map-get($theme, 'productive-heading-06')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'productive-heading-07',
      $emit-difference
    )
    {
      @include custom-property(
        'productive-heading-07',
        map-get($theme, 'productive-heading-07')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'expressive-heading-01',
      $emit-difference
    )
    {
      @include custom-property(
        'expressive-heading-01',
        map-get($theme, 'expressive-heading-01')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'expressive-heading-02',
      $emit-difference
    )
    {
      @include custom-property(
        'expressive-heading-02',
        map-get($theme, 'expressive-heading-02')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'expressive-heading-03',
      $emit-difference
    )
    {
      @include custom-property(
        'expressive-heading-03',
        map-get($theme, 'expressive-heading-03')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'expressive-heading-04',
      $emit-difference
    )
    {
      @include custom-property(
        'expressive-heading-04',
        map-get($theme, 'expressive-heading-04')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'expressive-heading-05',
      $emit-difference
    )
    {
      @include custom-property(
        'expressive-heading-05',
        map-get($theme, 'expressive-heading-05')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'expressive-heading-06',
      $emit-difference
    )
    {
      @include custom-property(
        'expressive-heading-06',
        map-get($theme, 'expressive-heading-06')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'expressive-paragraph-01',
      $emit-difference
    )
    {
      @include custom-property(
        'expressive-paragraph-01',
        map-get($theme, 'expressive-paragraph-01')
      );
    }

    @if should-emit($theme, $carbon--theme, 'quotation-01', $emit-difference) {
      @include custom-property('quotation-01', map-get($theme, 'quotation-01'));
    }

    @if should-emit($theme, $carbon--theme, 'quotation-02', $emit-difference) {
      @include custom-property('quotation-02', map-get($theme, 'quotation-02'));
    }

    @if should-emit($theme, $carbon--theme, 'display-01', $emit-difference) {
      @include custom-property('display-01', map-get($theme, 'display-01'));
    }

    @if should-emit($theme, $carbon--theme, 'display-02', $emit-difference) {
      @include custom-property('display-02', map-get($theme, 'display-02'));
    }

    @if should-emit($theme, $carbon--theme, 'display-03', $emit-difference) {
      @include custom-property('display-03', map-get($theme, 'display-03'));
    }

    @if should-emit($theme, $carbon--theme, 'display-04', $emit-difference) {
      @include custom-property('display-04', map-get($theme, 'display-04'));
    }

    @if should-emit($theme, $carbon--theme, 'spacing-01', $emit-difference) {
      @include custom-property('spacing-01', map-get($theme, 'spacing-01'));
    }

    @if should-emit($theme, $carbon--theme, 'spacing-02', $emit-difference) {
      @include custom-property('spacing-02', map-get($theme, 'spacing-02'));
    }

    @if should-emit($theme, $carbon--theme, 'spacing-03', $emit-difference) {
      @include custom-property('spacing-03', map-get($theme, 'spacing-03'));
    }

    @if should-emit($theme, $carbon--theme, 'spacing-04', $emit-difference) {
      @include custom-property('spacing-04', map-get($theme, 'spacing-04'));
    }

    @if should-emit($theme, $carbon--theme, 'spacing-05', $emit-difference) {
      @include custom-property('spacing-05', map-get($theme, 'spacing-05'));
    }

    @if should-emit($theme, $carbon--theme, 'spacing-06', $emit-difference) {
      @include custom-property('spacing-06', map-get($theme, 'spacing-06'));
    }

    @if should-emit($theme, $carbon--theme, 'spacing-07', $emit-difference) {
      @include custom-property('spacing-07', map-get($theme, 'spacing-07'));
    }

    @if should-emit($theme, $carbon--theme, 'spacing-08', $emit-difference) {
      @include custom-property('spacing-08', map-get($theme, 'spacing-08'));
    }

    @if should-emit($theme, $carbon--theme, 'spacing-09', $emit-difference) {
      @include custom-property('spacing-09', map-get($theme, 'spacing-09'));
    }

    @if should-emit($theme, $carbon--theme, 'spacing-10', $emit-difference) {
      @include custom-property('spacing-10', map-get($theme, 'spacing-10'));
    }

    @if should-emit($theme, $carbon--theme, 'spacing-11', $emit-difference) {
      @include custom-property('spacing-11', map-get($theme, 'spacing-11'));
    }

    @if should-emit($theme, $carbon--theme, 'spacing-12', $emit-difference) {
      @include custom-property('spacing-12', map-get($theme, 'spacing-12'));
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'fluid-spacing-01',
      $emit-difference
    )
    {
      @include custom-property(
        'fluid-spacing-01',
        map-get($theme, 'fluid-spacing-01')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'fluid-spacing-02',
      $emit-difference
    )
    {
      @include custom-property(
        'fluid-spacing-02',
        map-get($theme, 'fluid-spacing-02')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'fluid-spacing-03',
      $emit-difference
    )
    {
      @include custom-property(
        'fluid-spacing-03',
        map-get($theme, 'fluid-spacing-03')
      );
    }

    @if should-emit(
      $theme,
      $carbon--theme,
      'fluid-spacing-04',
      $emit-difference
    )
    {
      @include custom-property(
        'fluid-spacing-04',
        map-get($theme, 'fluid-spacing-04')
      );
    }

    @if should-emit($theme, $carbon--theme, 'layout-01', $emit-difference) {
      @include custom-property('layout-01', map-get($theme, 'layout-01'));
    }

    @if should-emit($theme, $carbon--theme, 'layout-02', $emit-difference) {
      @include custom-property('layout-02', map-get($theme, 'layout-02'));
    }

    @if should-emit($theme, $carbon--theme, 'layout-03', $emit-difference) {
      @include custom-property('layout-03', map-get($theme, 'layout-03'));
    }

    @if should-emit($theme, $carbon--theme, 'layout-04', $emit-difference) {
      @include custom-property('layout-04', map-get($theme, 'layout-04'));
    }

    @if should-emit($theme, $carbon--theme, 'layout-05', $emit-difference) {
      @include custom-property('layout-05', map-get($theme, 'layout-05'));
    }

    @if should-emit($theme, $carbon--theme, 'layout-06', $emit-difference) {
      @include custom-property('layout-06', map-get($theme, 'layout-06'));
    }

    @if should-emit($theme, $carbon--theme, 'layout-07', $emit-difference) {
      @include custom-property('layout-07', map-get($theme, 'layout-07'));
    }

    @if should-emit($theme, $carbon--theme, 'container-01', $emit-difference) {
      @include custom-property('container-01', map-get($theme, 'container-01'));
    }

    @if should-emit($theme, $carbon--theme, 'container-02', $emit-difference) {
      @include custom-property('container-02', map-get($theme, 'container-02'));
    }

    @if should-emit($theme, $carbon--theme, 'container-03', $emit-difference) {
      @include custom-property('container-03', map-get($theme, 'container-03'));
    }

    @if should-emit($theme, $carbon--theme, 'container-04', $emit-difference) {
      @include custom-property('container-04', map-get($theme, 'container-04'));
    }

    @if should-emit($theme, $carbon--theme, 'container-05', $emit-difference) {
      @include custom-property('container-05', map-get($theme, 'container-05'));
    }

    @if should-emit($theme, $carbon--theme, 'icon-size-01', $emit-difference) {
      @include custom-property('icon-size-01', map-get($theme, 'icon-size-01'));
    }

    @if should-emit($theme, $carbon--theme, 'icon-size-02', $emit-difference) {
      @include custom-property('icon-size-02', map-get($theme, 'icon-size-02'));
    }
  }

  @content;
  // Reset to default theme after apply in content
  @if $theme != $carbon--theme {
    @include carbon--theme();
  }
}
```

</details>

- **Parameters**:

| Name                      | Description                                   | Type   | Default value    |
| ------------------------- | --------------------------------------------- | ------ | ---------------- |
| `$theme`                  | Map of theme tokens                           | `Map`  | `$carbon--theme` |
| `$emit-custom-properties` | Output CSS Custom Properties for theme tokens | `Bool` | `false`          |

**Example**:

<details>
<summary>Example code</summary>

```scss
// Default usage
@include carbon--theme();

// Alternate styling (not white theme)
@include carbon--theme($carbon--theme--g90) {
  // declarations...
}

// Inline styling
@include carbon--theme($carbon--theme--g90) {
  .my-dark-theme {
    // declarations...
  }
}
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Content**: Pass in your custom declaration blocks to be used after the token
  maps set theming variables.
- **Requires**:
  - [custom-property [mixin]](#custom-property-mixin)
  - [should-emit [function]](#should-emit-function)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [interactive-02 [variable]](#interactive-02-variable)
  - [interactive-03 [variable]](#interactive-03-variable)
  - [interactive-04 [variable]](#interactive-04-variable)
  - [ui-background [variable]](#ui-background-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [ui-02 [variable]](#ui-02-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [text-01 [variable]](#text-01-variable)
  - [text-02 [variable]](#text-02-variable)
  - [text-03 [variable]](#text-03-variable)
  - [text-04 [variable]](#text-04-variable)
  - [text-05 [variable]](#text-05-variable)
  - [icon-01 [variable]](#icon-01-variable)
  - [icon-02 [variable]](#icon-02-variable)
  - [icon-03 [variable]](#icon-03-variable)
  - [link-01 [variable]](#link-01-variable)
  - [inverse-link [variable]](#inverse-link-variable)
  - [field-01 [variable]](#field-01-variable)
  - [field-02 [variable]](#field-02-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [inverse-02 [variable]](#inverse-02-variable)
  - [support-01 [variable]](#support-01-variable)
  - [support-02 [variable]](#support-02-variable)
  - [support-03 [variable]](#support-03-variable)
  - [support-04 [variable]](#support-04-variable)
  - [inverse-support-01 [variable]](#inverse-support-01-variable)
  - [inverse-support-02 [variable]](#inverse-support-02-variable)
  - [inverse-support-03 [variable]](#inverse-support-03-variable)
  - [inverse-support-04 [variable]](#inverse-support-04-variable)
  - [overlay-01 [variable]](#overlay-01-variable)
  - [danger [variable]](#danger-variable)
  - [focus [variable]](#focus-variable)
  - [inverse-focus-ui [variable]](#inverse-focus-ui-variable)
  - [hover-primary [variable]](#hover-primary-variable)
  - [active-primary [variable]](#active-primary-variable)
  - [hover-primary-text [variable]](#hover-primary-text-variable)
  - [hover-secondary [variable]](#hover-secondary-variable)
  - [active-secondary [variable]](#active-secondary-variable)
  - [hover-tertiary [variable]](#hover-tertiary-variable)
  - [active-tertiary [variable]](#active-tertiary-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [active-ui [variable]](#active-ui-variable)
  - [selected-ui [variable]](#selected-ui-variable)
  - [hover-selected-ui [variable]](#hover-selected-ui-variable)
  - [inverse-hover-ui [variable]](#inverse-hover-ui-variable)
  - [hover-danger [variable]](#hover-danger-variable)
  - [active-danger [variable]](#active-danger-variable)
  - [hover-row [variable]](#hover-row-variable)
  - [visited-link [variable]](#visited-link-variable)
  - [disabled-01 [variable]](#disabled-01-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [disabled-03 [variable]](#disabled-03-variable)
  - [highlight [variable]](#highlight-variable)
  - [skeleton-01 [variable]](#skeleton-01-variable)
  - [skeleton-02 [variable]](#skeleton-02-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [brand-02 [variable]](#brand-02-variable)
  - [brand-03 [variable]](#brand-03-variable)
  - [active-01 [variable]](#active-01-variable)
  - [hover-field [variable]](#hover-field-variable)
  - [caption-01 [variable]](#caption-01-variable)
  - [label-01 [variable]](#label-01-variable)
  - [helper-text-01 [variable]](#helper-text-01-variable)
  - [body-short-01 [variable]](#body-short-01-variable)
  - [body-long-01 [variable]](#body-long-01-variable)
  - [body-short-02 [variable]](#body-short-02-variable)
  - [body-long-02 [variable]](#body-long-02-variable)
  - [code-01 [variable]](#code-01-variable)
  - [code-02 [variable]](#code-02-variable)
  - [heading-01 [variable]](#heading-01-variable)
  - [productive-heading-01 [variable]](#productive-heading-01-variable)
  - [heading-02 [variable]](#heading-02-variable)
  - [productive-heading-02 [variable]](#productive-heading-02-variable)
  - [productive-heading-03 [variable]](#productive-heading-03-variable)
  - [productive-heading-04 [variable]](#productive-heading-04-variable)
  - [productive-heading-05 [variable]](#productive-heading-05-variable)
  - [productive-heading-06 [variable]](#productive-heading-06-variable)
  - [productive-heading-07 [variable]](#productive-heading-07-variable)
  - [expressive-heading-01 [variable]](#expressive-heading-01-variable)
  - [expressive-heading-02 [variable]](#expressive-heading-02-variable)
  - [expressive-heading-03 [variable]](#expressive-heading-03-variable)
  - [expressive-heading-04 [variable]](#expressive-heading-04-variable)
  - [expressive-heading-05 [variable]](#expressive-heading-05-variable)
  - [expressive-heading-06 [variable]](#expressive-heading-06-variable)
  - [expressive-paragraph-01 [variable]](#expressive-paragraph-01-variable)
  - [quotation-01 [variable]](#quotation-01-variable)
  - [quotation-02 [variable]](#quotation-02-variable)
  - [display-01 [variable]](#display-01-variable)
  - [display-02 [variable]](#display-02-variable)
  - [display-03 [variable]](#display-03-variable)
  - [display-04 [variable]](#display-04-variable)
  - [spacing-01 [variable]](#spacing-01-variable)
  - [spacing-02 [variable]](#spacing-02-variable)
  - [spacing-03 [variable]](#spacing-03-variable)
  - [spacing-04 [variable]](#spacing-04-variable)
  - [spacing-05 [variable]](#spacing-05-variable)
  - [spacing-06 [variable]](#spacing-06-variable)
  - [spacing-07 [variable]](#spacing-07-variable)
  - [spacing-08 [variable]](#spacing-08-variable)
  - [spacing-09 [variable]](#spacing-09-variable)
  - [spacing-10 [variable]](#spacing-10-variable)
  - [spacing-11 [variable]](#spacing-11-variable)
  - [spacing-12 [variable]](#spacing-12-variable)
  - [fluid-spacing-01 [variable]](#fluid-spacing-01-variable)
  - [fluid-spacing-02 [variable]](#fluid-spacing-02-variable)
  - [fluid-spacing-03 [variable]](#fluid-spacing-03-variable)
  - [fluid-spacing-04 [variable]](#fluid-spacing-04-variable)
  - [layout-01 [variable]](#layout-01-variable)
  - [layout-02 [variable]](#layout-02-variable)
  - [layout-03 [variable]](#layout-03-variable)
  - [layout-04 [variable]](#layout-04-variable)
  - [layout-05 [variable]](#layout-05-variable)
  - [layout-06 [variable]](#layout-06-variable)
  - [layout-07 [variable]](#layout-07-variable)
  - [container-01 [variable]](#container-01-variable)
  - [container-02 [variable]](#container-02-variable)
  - [container-03 [variable]](#container-03-variable)
  - [container-04 [variable]](#container-04-variable)
  - [container-05 [variable]](#container-05-variable)
  - [icon-size-01 [variable]](#icon-size-01-variable)
  - [icon-size-02 [variable]](#icon-size-02-variable)
  - [custom-property-prefix [variable]](#custom-property-prefix-variable)
  - [carbon--theme [variable]](#carbon--theme-variable)

### ✅carbon--theme--g10 [variable]

Carbon's g10 color theme

<details>
<summary>Source code</summary>

```scss
$carbon--theme--g10: map-merge(
  $carbon--theme--white,
  (
    ui-background: #f4f4f4,
    ui-01: #ffffff,
    ui-02: #f4f4f4,
    field-01: #ffffff,
    field-02: #f4f4f4,
    disabled-01: #ffffff,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Map`

### ✅carbon--theme--g90 [variable]

Carbon's g90 color theme

<details>
<summary>Source code</summary>

```scss
$carbon--theme--g90: map-merge(
  $carbon--theme--white,
  (
    interactive-02: #6f6f6f,
    interactive-03: #ffffff,
    interactive-04: #4589ff,
    ui-background: #262626,
    ui-01: #393939,
    ui-02: #525252,
    ui-03: #525252,
    ui-05: #f4f4f4,
    text-01: #f4f4f4,
    text-02: #c6c6c6,
    text-03: #6f6f6f,
    text-05: #8d8d8d,
    icon-01: #f4f4f4,
    icon-02: #c6c6c6,
    link-01: #78a9ff,
    inverse-link: #0f62fe,
    field-01: #393939,
    field-02: #525252,
    inverse-01: #161616,
    inverse-02: #f4f4f4,
    support-01: #fa4d56,
    support-02: #42be65,
    support-04: #4589ff,
    inverse-support-01: #da1e28,
    inverse-support-02: #24a148,
    inverse-support-04: #0f62fe,
    overlay-01: rgba(22, 22, 22, 0.7),
    focus: #ffffff,
    inverse-focus-ui: #0f62fe,
    hover-primary-text: #a6c8ff,
    hover-secondary: #606060,
    active-secondary: #393939,
    hover-tertiary: #f4f4f4,
    active-tertiary: #c6c6c6,
    hover-ui: #4c4c4c,
    active-ui: #6f6f6f,
    selected-ui: #525252,
    inverse-hover-ui: #e5e5e5,
    hover-selected-ui: #656565,
    hover-row: #4c4c4c,
    visited-link: #be95ff,
    disabled-01: #393939,
    disabled-02: #6f6f6f,
    highlight: #0043ce,
    skeleton-01: #353535,
    skeleton-02: #525252,
    brand-02: #6f6f6f,
    brand-03: #ffffff,
    active-01: #6f6f6f,
    hover-field: #4c4c4c,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Map`

### ✅carbon--theme--g100 [variable]

Carbon's g100 color theme

<details>
<summary>Source code</summary>

```scss
$carbon--theme--g100: map-merge(
  $carbon--theme--white,
  (
    interactive-02: #6f6f6f,
    interactive-03: #ffffff,
    interactive-04: #4589ff,
    ui-background: #161616,
    ui-01: #262626,
    ui-02: #393939,
    ui-03: #393939,
    ui-04: #6f6f6f,
    ui-05: #f4f4f4,
    text-01: #f4f4f4,
    text-02: #c6c6c6,
    text-03: #6f6f6f,
    text-05: #8d8d8d,
    icon-01: #f4f4f4,
    icon-02: #c6c6c6,
    link-01: #78a9ff,
    inverse-link: #0f62fe,
    field-01: #262626,
    field-02: #393939,
    inverse-01: #161616,
    inverse-02: #f4f4f4,
    support-01: #fa4d56,
    support-02: #42be65,
    support-04: #4589ff,
    inverse-support-01: #da1e28,
    inverse-support-02: #24a148,
    inverse-support-04: #0f62fe,
    overlay-01: rgba(22, 22, 22, 0.7),
    focus: #ffffff,
    inverse-focus-ui: #0f62fe,
    hover-primary-text: #a6c8ff,
    hover-secondary: #606060,
    active-secondary: #393939,
    hover-tertiary: #f4f4f4,
    active-tertiary: #c6c6c6,
    hover-ui: #353535,
    active-ui: #525252,
    selected-ui: #393939,
    inverse-hover-ui: #e5e5e5,
    hover-selected-ui: #4c4c4c,
    hover-row: #353535,
    visited-link: #be95ff,
    disabled-01: #262626,
    disabled-02: #525252,
    disabled-03: #6f6f6f,
    highlight: #002d9c,
    skeleton-01: #353535,
    skeleton-02: #393939,
    brand-02: #6f6f6f,
    brand-03: #ffffff,
    active-01: #525252,
    hover-field: #353535,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Map`

### ✅carbon--theme--v9 [variable]

Carbon's v9 color theme

<details>
<summary>Source code</summary>

```scss
$carbon--theme--v9: map-merge(
  $carbon--theme--white,
  (
    interactive-01: #3d70b2,
    interactive-02: #5a6872,
    interactive-03: #5a6872,
    interactive-04: #3d70b2,
    ui-background: #f4f7fb,
    ui-01: #ffffff,
    ui-02: #f4f7fb,
    ui-03: #dfe3e6,
    ui-04: #8897a2,
    ui-05: #5a6872,
    text-01: #152935,
    text-02: #5a6872,
    text-03: #cdd1d4,
    text-05: #5a6872,
    icon-01: #3d70b2,
    icon-02: #5a6872,
    link-01: #3d70b2,
    inverse-link: #5596e6,
    field-01: #ffffff,
    field-02: #f4f7fb,
    inverse-02: #272d33,
    support-01: #e0182d,
    support-02: #5aa700,
    support-03: #efc100,
    support-04: #5aaafa,
    inverse-support-01: #ff5050,
    inverse-support-02: #8cd211,
    inverse-support-03: #fdd600,
    inverse-support-04: #5aaafa,
    overlay-01: rgba(223, 227, 230, 0.5),
    focus: #3d70b2,
    inverse-focus-ui: #3d70b2,
    hover-primary: #30588c,
    active-primary: #30588c,
    hover-primary-text: #294c86,
    hover-secondary: #4d5b65,
    active-secondary: #414f59,
    hover-tertiary: #5a6872,
    active-tertiary: #414f59,
    hover-ui: #eef4fc,
    active-ui: #dfeafa,
    selected-ui: #eef4fc,
    hover-selected-ui: #dfeafa,
    hover-danger: #c70014,
    active-danger: #ad1625,
    hover-row: #eef4fc,
    visited-link: #294c86,
    disabled-01: #fafbfd,
    disabled-02: #dfe3e6,
    disabled-03: #cdd1d4,
    highlight: #f4f7fb,
    skeleton-01: rgba(61, 112, 178, 0.1),
    skeleton-02: rgba(61, 112, 178, 0.1),
    brand-01: #3d70b2,
    brand-02: #5a6872,
    brand-03: #5a6872,
    active-01: #dfeafa,
    hover-field: #eef4fc,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Map`

### ✅carbon--theme [variable]

Carbon's default theme

<details>
<summary>Source code</summary>

```scss
$carbon--theme: (
  interactive-01: if(global-variable-exists('interactive-01'), $interactive-01, map-get($carbon--theme--white, 'interactive-01')),
  interactive-02: if(global-variable-exists('interactive-02'), $interactive-02, map-get($carbon--theme--white, 'interactive-02')),
  interactive-03: if(global-variable-exists('interactive-03'), $interactive-03, map-get($carbon--theme--white, 'interactive-03')),
  interactive-04: if(global-variable-exists('interactive-04'), $interactive-04, map-get($carbon--theme--white, 'interactive-04')),
  ui-background: if(global-variable-exists('ui-background'), $ui-background, map-get($carbon--theme--white, 'ui-background')),
  ui-01: if(global-variable-exists('ui-01'), $ui-01, map-get($carbon--theme--white, 'ui-01')),
  ui-02: if(global-variable-exists('ui-02'), $ui-02, map-get($carbon--theme--white, 'ui-02')),
  ui-03: if(global-variable-exists('ui-03'), $ui-03, map-get($carbon--theme--white, 'ui-03')),
  ui-04: if(global-variable-exists('ui-04'), $ui-04, map-get($carbon--theme--white, 'ui-04')),
  ui-05: if(global-variable-exists('ui-05'), $ui-05, map-get($carbon--theme--white, 'ui-05')),
  text-01: if(global-variable-exists('text-01'), $text-01, map-get($carbon--theme--white, 'text-01')),
  text-02: if(global-variable-exists('text-02'), $text-02, map-get($carbon--theme--white, 'text-02')),
  text-03: if(global-variable-exists('text-03'), $text-03, map-get($carbon--theme--white, 'text-03')),
  text-04: if(global-variable-exists('text-04'), $text-04, map-get($carbon--theme--white, 'text-04')),
  text-05: if(global-variable-exists('text-05'), $text-05, map-get($carbon--theme--white, 'text-05')),
  icon-01: if(global-variable-exists('icon-01'), $icon-01, map-get($carbon--theme--white, 'icon-01')),
  icon-02: if(global-variable-exists('icon-02'), $icon-02, map-get($carbon--theme--white, 'icon-02')),
  icon-03: if(global-variable-exists('icon-03'), $icon-03, map-get($carbon--theme--white, 'icon-03')),
  link-01: if(global-variable-exists('link-01'), $link-01, map-get($carbon--theme--white, 'link-01')),
  inverse-link: if(global-variable-exists('inverse-link'), $inverse-link, map-get($carbon--theme--white, 'inverse-link')),
  field-01: if(global-variable-exists('field-01'), $field-01, map-get($carbon--theme--white, 'field-01')),
  field-02: if(global-variable-exists('field-02'), $field-02, map-get($carbon--theme--white, 'field-02')),
  inverse-01: if(global-variable-exists('inverse-01'), $inverse-01, map-get($carbon--theme--white, 'inverse-01')),
  inverse-02: if(global-variable-exists('inverse-02'), $inverse-02, map-get($carbon--theme--white, 'inverse-02')),
  support-01: if(global-variable-exists('support-01'), $support-01, map-get($carbon--theme--white, 'support-01')),
  support-02: if(global-variable-exists('support-02'), $support-02, map-get($carbon--theme--white, 'support-02')),
  support-03: if(global-variable-exists('support-03'), $support-03, map-get($carbon--theme--white, 'support-03')),
  support-04: if(global-variable-exists('support-04'), $support-04, map-get($carbon--theme--white, 'support-04')),
  inverse-support-01: if(global-variable-exists('inverse-support-01'), $inverse-support-01, map-get($carbon--theme--white, 'inverse-support-01')),
  inverse-support-02: if(global-variable-exists('inverse-support-02'), $inverse-support-02, map-get($carbon--theme--white, 'inverse-support-02')),
  inverse-support-03: if(global-variable-exists('inverse-support-03'), $inverse-support-03, map-get($carbon--theme--white, 'inverse-support-03')),
  inverse-support-04: if(global-variable-exists('inverse-support-04'), $inverse-support-04, map-get($carbon--theme--white, 'inverse-support-04')),
  overlay-01: if(global-variable-exists('overlay-01'), $overlay-01, map-get($carbon--theme--white, 'overlay-01')),
  danger: if(global-variable-exists('danger'), $danger, map-get($carbon--theme--white, 'danger')),
  focus: if(global-variable-exists('focus'), $focus, map-get($carbon--theme--white, 'focus')),
  inverse-focus-ui: if(global-variable-exists('inverse-focus-ui'), $inverse-focus-ui, map-get($carbon--theme--white, 'inverse-focus-ui')),
  hover-primary: if(global-variable-exists('hover-primary'), $hover-primary, map-get($carbon--theme--white, 'hover-primary')),
  active-primary: if(global-variable-exists('active-primary'), $active-primary, map-get($carbon--theme--white, 'active-primary')),
  hover-primary-text: if(global-variable-exists('hover-primary-text'), $hover-primary-text, map-get($carbon--theme--white, 'hover-primary-text')),
  hover-secondary: if(global-variable-exists('hover-secondary'), $hover-secondary, map-get($carbon--theme--white, 'hover-secondary')),
  active-secondary: if(global-variable-exists('active-secondary'), $active-secondary, map-get($carbon--theme--white, 'active-secondary')),
  hover-tertiary: if(global-variable-exists('hover-tertiary'), $hover-tertiary, map-get($carbon--theme--white, 'hover-tertiary')),
  active-tertiary: if(global-variable-exists('active-tertiary'), $active-tertiary, map-get($carbon--theme--white, 'active-tertiary')),
  hover-ui: if(global-variable-exists('hover-ui'), $hover-ui, map-get($carbon--theme--white, 'hover-ui')),
  active-ui: if(global-variable-exists('active-ui'), $active-ui, map-get($carbon--theme--white, 'active-ui')),
  selected-ui: if(global-variable-exists('selected-ui'), $selected-ui, map-get($carbon--theme--white, 'selected-ui')),
  hover-selected-ui: if(global-variable-exists('hover-selected-ui'), $hover-selected-ui, map-get($carbon--theme--white, 'hover-selected-ui')),
  inverse-hover-ui: if(global-variable-exists('inverse-hover-ui'), $inverse-hover-ui, map-get($carbon--theme--white, 'inverse-hover-ui')),
  hover-danger: if(global-variable-exists('hover-danger'), $hover-danger, map-get($carbon--theme--white, 'hover-danger')),
  active-danger: if(global-variable-exists('active-danger'), $active-danger, map-get($carbon--theme--white, 'active-danger')),
  hover-row: if(global-variable-exists('hover-row'), $hover-row, map-get($carbon--theme--white, 'hover-row')),
  visited-link: if(global-variable-exists('visited-link'), $visited-link, map-get($carbon--theme--white, 'visited-link')),
  disabled-01: if(global-variable-exists('disabled-01'), $disabled-01, map-get($carbon--theme--white, 'disabled-01')),
  disabled-02: if(global-variable-exists('disabled-02'), $disabled-02, map-get($carbon--theme--white, 'disabled-02')),
  disabled-03: if(global-variable-exists('disabled-03'), $disabled-03, map-get($carbon--theme--white, 'disabled-03')),
  highlight: if(global-variable-exists('highlight'), $highlight, map-get($carbon--theme--white, 'highlight')),
  skeleton-01: if(global-variable-exists('skeleton-01'), $skeleton-01, map-get($carbon--theme--white, 'skeleton-01')),
  skeleton-02: if(global-variable-exists('skeleton-02'), $skeleton-02, map-get($carbon--theme--white, 'skeleton-02')),
  brand-01: if(global-variable-exists('brand-01'), $brand-01, map-get($carbon--theme--white, 'brand-01')),
  brand-02: if(global-variable-exists('brand-02'), $brand-02, map-get($carbon--theme--white, 'brand-02')),
  brand-03: if(global-variable-exists('brand-03'), $brand-03, map-get($carbon--theme--white, 'brand-03')),
  active-01: if(global-variable-exists('active-01'), $active-01, map-get($carbon--theme--white, 'active-01')),
  hover-field: if(global-variable-exists('hover-field'), $hover-field, map-get($carbon--theme--white, 'hover-field')),
  caption-01: if(global-variable-exists('caption-01'), $caption-01, map-get($carbon--theme--white, 'caption-01')),
  label-01: if(global-variable-exists('label-01'), $label-01, map-get($carbon--theme--white, 'label-01')),
  helper-text-01: if(global-variable-exists('helper-text-01'), $helper-text-01, map-get($carbon--theme--white, 'helper-text-01')),
  body-short-01: if(global-variable-exists('body-short-01'), $body-short-01, map-get($carbon--theme--white, 'body-short-01')),
  body-long-01: if(global-variable-exists('body-long-01'), $body-long-01, map-get($carbon--theme--white, 'body-long-01')),
  body-short-02: if(global-variable-exists('body-short-02'), $body-short-02, map-get($carbon--theme--white, 'body-short-02')),
  body-long-02: if(global-variable-exists('body-long-02'), $body-long-02, map-get($carbon--theme--white, 'body-long-02')),
  code-01: if(global-variable-exists('code-01'), $code-01, map-get($carbon--theme--white, 'code-01')),
  code-02: if(global-variable-exists('code-02'), $code-02, map-get($carbon--theme--white, 'code-02')),
  heading-01: if(global-variable-exists('heading-01'), $heading-01, map-get($carbon--theme--white, 'heading-01')),
  productive-heading-01: if(global-variable-exists('productive-heading-01'), $productive-heading-01, map-get($carbon--theme--white, 'productive-heading-01')),
  heading-02: if(global-variable-exists('heading-02'), $heading-02, map-get($carbon--theme--white, 'heading-02')),
  productive-heading-02: if(global-variable-exists('productive-heading-02'), $productive-heading-02, map-get($carbon--theme--white, 'productive-heading-02')),
  productive-heading-03: if(global-variable-exists('productive-heading-03'), $productive-heading-03, map-get($carbon--theme--white, 'productive-heading-03')),
  productive-heading-04: if(global-variable-exists('productive-heading-04'), $productive-heading-04, map-get($carbon--theme--white, 'productive-heading-04')),
  productive-heading-05: if(global-variable-exists('productive-heading-05'), $productive-heading-05, map-get($carbon--theme--white, 'productive-heading-05')),
  productive-heading-06: if(global-variable-exists('productive-heading-06'), $productive-heading-06, map-get($carbon--theme--white, 'productive-heading-06')),
  productive-heading-07: if(global-variable-exists('productive-heading-07'), $productive-heading-07, map-get($carbon--theme--white, 'productive-heading-07')),
  expressive-heading-01: if(global-variable-exists('expressive-heading-01'), $expressive-heading-01, map-get($carbon--theme--white, 'expressive-heading-01')),
  expressive-heading-02: if(global-variable-exists('expressive-heading-02'), $expressive-heading-02, map-get($carbon--theme--white, 'expressive-heading-02')),
  expressive-heading-03: if(global-variable-exists('expressive-heading-03'), $expressive-heading-03, map-get($carbon--theme--white, 'expressive-heading-03')),
  expressive-heading-04: if(global-variable-exists('expressive-heading-04'), $expressive-heading-04, map-get($carbon--theme--white, 'expressive-heading-04')),
  expressive-heading-05: if(global-variable-exists('expressive-heading-05'), $expressive-heading-05, map-get($carbon--theme--white, 'expressive-heading-05')),
  expressive-heading-06: if(global-variable-exists('expressive-heading-06'), $expressive-heading-06, map-get($carbon--theme--white, 'expressive-heading-06')),
  expressive-paragraph-01: if(global-variable-exists('expressive-paragraph-01'), $expressive-paragraph-01, map-get($carbon--theme--white, 'expressive-paragraph-01')),
  quotation-01: if(global-variable-exists('quotation-01'), $quotation-01, map-get($carbon--theme--white, 'quotation-01')),
  quotation-02: if(global-variable-exists('quotation-02'), $quotation-02, map-get($carbon--theme--white, 'quotation-02')),
  display-01: if(global-variable-exists('display-01'), $display-01, map-get($carbon--theme--white, 'display-01')),
  display-02: if(global-variable-exists('display-02'), $display-02, map-get($carbon--theme--white, 'display-02')),
  display-03: if(global-variable-exists('display-03'), $display-03, map-get($carbon--theme--white, 'display-03')),
  display-04: if(global-variable-exists('display-04'), $display-04, map-get($carbon--theme--white, 'display-04')),
  spacing-01: if(global-variable-exists('spacing-01'), $spacing-01, map-get($carbon--theme--white, 'spacing-01')),
  spacing-02: if(global-variable-exists('spacing-02'), $spacing-02, map-get($carbon--theme--white, 'spacing-02')),
  spacing-03: if(global-variable-exists('spacing-03'), $spacing-03, map-get($carbon--theme--white, 'spacing-03')),
  spacing-04: if(global-variable-exists('spacing-04'), $spacing-04, map-get($carbon--theme--white, 'spacing-04')),
  spacing-05: if(global-variable-exists('spacing-05'), $spacing-05, map-get($carbon--theme--white, 'spacing-05')),
  spacing-06: if(global-variable-exists('spacing-06'), $spacing-06, map-get($carbon--theme--white, 'spacing-06')),
  spacing-07: if(global-variable-exists('spacing-07'), $spacing-07, map-get($carbon--theme--white, 'spacing-07')),
  spacing-08: if(global-variable-exists('spacing-08'), $spacing-08, map-get($carbon--theme--white, 'spacing-08')),
  spacing-09: if(global-variable-exists('spacing-09'), $spacing-09, map-get($carbon--theme--white, 'spacing-09')),
  spacing-10: if(global-variable-exists('spacing-10'), $spacing-10, map-get($carbon--theme--white, 'spacing-10')),
  spacing-11: if(global-variable-exists('spacing-11'), $spacing-11, map-get($carbon--theme--white, 'spacing-11')),
  spacing-12: if(global-variable-exists('spacing-12'), $spacing-12, map-get($carbon--theme--white, 'spacing-12')),
  fluid-spacing-01: if(global-variable-exists('fluid-spacing-01'), $fluid-spacing-01, map-get($carbon--theme--white, 'fluid-spacing-01')),
  fluid-spacing-02: if(global-variable-exists('fluid-spacing-02'), $fluid-spacing-02, map-get($carbon--theme--white, 'fluid-spacing-02')),
  fluid-spacing-03: if(global-variable-exists('fluid-spacing-03'), $fluid-spacing-03, map-get($carbon--theme--white, 'fluid-spacing-03')),
  fluid-spacing-04: if(global-variable-exists('fluid-spacing-04'), $fluid-spacing-04, map-get($carbon--theme--white, 'fluid-spacing-04')),
  layout-01: if(global-variable-exists('layout-01'), $layout-01, map-get($carbon--theme--white, 'layout-01')),
  layout-02: if(global-variable-exists('layout-02'), $layout-02, map-get($carbon--theme--white, 'layout-02')),
  layout-03: if(global-variable-exists('layout-03'), $layout-03, map-get($carbon--theme--white, 'layout-03')),
  layout-04: if(global-variable-exists('layout-04'), $layout-04, map-get($carbon--theme--white, 'layout-04')),
  layout-05: if(global-variable-exists('layout-05'), $layout-05, map-get($carbon--theme--white, 'layout-05')),
  layout-06: if(global-variable-exists('layout-06'), $layout-06, map-get($carbon--theme--white, 'layout-06')),
  layout-07: if(global-variable-exists('layout-07'), $layout-07, map-get($carbon--theme--white, 'layout-07')),
  container-01: if(global-variable-exists('container-01'), $container-01, map-get($carbon--theme--white, 'container-01')),
  container-02: if(global-variable-exists('container-02'), $container-02, map-get($carbon--theme--white, 'container-02')),
  container-03: if(global-variable-exists('container-03'), $container-03, map-get($carbon--theme--white, 'container-03')),
  container-04: if(global-variable-exists('container-04'), $container-04, map-get($carbon--theme--white, 'container-04')),
  container-05: if(global-variable-exists('container-05'), $container-05, map-get($carbon--theme--white, 'container-05')),
  icon-size-01: if(global-variable-exists('icon-size-01'), $icon-size-01, map-get($carbon--theme--white, 'icon-size-01')),
  icon-size-02: if(global-variable-exists('icon-size-02'), $icon-size-02, map-get($carbon--theme--white, 'icon-size-02')),
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Map`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅interactive-01 [variable]

Primary interactive color; Primary buttons

<details>
<summary>Source code</summary>

```scss
$interactive-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'interactive-01'
    ),
  map-get($carbon--theme, 'interactive-01'),
  #0f62fe
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Aliased**:
  - `brand-01`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅interactive-02 [variable]

Secondary interactive color; Secondary button

<details>
<summary>Source code</summary>

```scss
$interactive-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'interactive-02'
    ),
  map-get($carbon--theme, 'interactive-02'),
  #393939
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Aliased**:
  - `brand-02`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅interactive-03 [variable]

4.5:1 AA contrast; Tertiary button

<details>
<summary>Source code</summary>

```scss
$interactive-03: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'interactive-03'
    ),
  map-get($carbon--theme, 'interactive-03'),
  #0f62fe
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Aliased**:
  - `brand-03`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅interactive-04 [variable]

3:1 AA contrast; Selected elements; Active elements; Accent icons

<details>
<summary>Source code</summary>

```scss
$interactive-04: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'interactive-04'
    ),
  map-get($carbon--theme, 'interactive-04'),
  #0f62fe
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅ui-background [variable]

Default page background

<details>
<summary>Source code</summary>

```scss
$ui-background: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'ui-background'
    ),
  map-get($carbon--theme, 'ui-background'),
  #ffffff
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅ui-01 [variable]

Primary container background; Secondary page background

<details>
<summary>Source code</summary>

```scss
$ui-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'ui-01'
    ),
  map-get($carbon--theme, 'ui-01'),
  #f4f4f4
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅ui-02 [variable]

Primary page background; Secondary container background

<details>
<summary>Source code</summary>

```scss
$ui-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'ui-02'
    ),
  map-get($carbon--theme, 'ui-02'),
  #ffffff
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅ui-03 [variable]

Subtle border; Tertiary background color

<details>
<summary>Source code</summary>

```scss
$ui-03: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'ui-03'
    ),
  map-get($carbon--theme, 'ui-03'),
  #e0e0e0
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅ui-04 [variable]

3:1 AA element contrast; Medium contrast border

<details>
<summary>Source code</summary>

```scss
$ui-04: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'ui-04'
    ),
  map-get($carbon--theme, 'ui-04'),
  #8d8d8d
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅ui-05 [variable]

4.5:1 AA element contrast; High contrast border; Emphasis elements

<details>
<summary>Source code</summary>

```scss
$ui-05: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'ui-05'
    ),
  map-get($carbon--theme, 'ui-05'),
  #161616
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅text-01 [variable]

Primary text; Body copy; Headers; Hover text color for `$text-02`

<details>
<summary>Source code</summary>

```scss
$text-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'text-01'
    ),
  map-get($carbon--theme, 'text-01'),
  #161616
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅text-02 [variable]

Secondary text; Input labels; Help text

<details>
<summary>Source code</summary>

```scss
$text-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'text-02'
    ),
  map-get($carbon--theme, 'text-02'),
  #393939
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅text-03 [variable]

Placeholder text

<details>
<summary>Source code</summary>

```scss
$text-03: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'text-03'
    ),
  map-get($carbon--theme, 'text-03'),
  #a8a8a8
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅text-04 [variable]

Text on interactive colors

<details>
<summary>Source code</summary>

```scss
$text-04: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'text-04'
    ),
  map-get($carbon--theme, 'text-04'),
  #ffffff
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅text-05 [variable]

<details>
<summary>Source code</summary>

```scss
$text-05: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'text-05'
    ),
  map-get($carbon--theme, 'text-05'),
  #6f6f6f
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅icon-01 [variable]

Primary icons

<details>
<summary>Source code</summary>

```scss
$icon-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'icon-01'
    ),
  map-get($carbon--theme, 'icon-01'),
  #161616
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅icon-02 [variable]

Secondary icons

<details>
<summary>Source code</summary>

```scss
$icon-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'icon-02'
    ),
  map-get($carbon--theme, 'icon-02'),
  #525252
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅icon-03 [variable]

Tertiary icons; Icons on interactive colors; Icons on non-ui colors

<details>
<summary>Source code</summary>

```scss
$icon-03: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'icon-03'
    ),
  map-get($carbon--theme, 'icon-03'),
  #ffffff
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅link-01 [variable]

Primary links; Ghost button

<details>
<summary>Source code</summary>

```scss
$link-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'link-01'
    ),
  map-get($carbon--theme, 'link-01'),
  #0f62fe
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅inverse-link [variable]

<details>
<summary>Source code</summary>

```scss
$inverse-link: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'inverse-link'
    ),
  map-get($carbon--theme, 'inverse-link'),
  #78a9ff
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅field-01 [variable]

Default input fields; Field color on \$ui-backgrounds

<details>
<summary>Source code</summary>

```scss
$field-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'field-01'
    ),
  map-get($carbon--theme, 'field-01'),
  #f4f4f4
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅field-02 [variable]

Input field color on `$ui-02` backgrounds

<details>
<summary>Source code</summary>

```scss
$field-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'field-02'
    ),
  map-get($carbon--theme, 'field-02'),
  #ffffff
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅inverse-01 [variable]

Inverse text color; Inverse icon color

<details>
<summary>Source code</summary>

```scss
$inverse-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'inverse-01'
    ),
  map-get($carbon--theme, 'inverse-01'),
  #ffffff
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅inverse-02 [variable]

High contrast backgrounds; High contrast elements

<details>
<summary>Source code</summary>

```scss
$inverse-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'inverse-02'
    ),
  map-get($carbon--theme, 'inverse-02'),
  #393939
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅support-01 [variable]

Error

<details>
<summary>Source code</summary>

```scss
$support-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'support-01'
    ),
  map-get($carbon--theme, 'support-01'),
  #da1e28
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅support-02 [variable]

Success

<details>
<summary>Source code</summary>

```scss
$support-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'support-02'
    ),
  map-get($carbon--theme, 'support-02'),
  #24a148
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅support-03 [variable]

Warning

<details>
<summary>Source code</summary>

```scss
$support-03: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'support-03'
    ),
  map-get($carbon--theme, 'support-03'),
  #f1c21b
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅support-04 [variable]

Information

<details>
<summary>Source code</summary>

```scss
$support-04: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'support-04'
    ),
  map-get($carbon--theme, 'support-04'),
  #0043ce
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅inverse-support-01 [variable]

Error on high contrast backgrounds

<details>
<summary>Source code</summary>

```scss
$inverse-support-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'inverse-support-01'
    ),
  map-get($carbon--theme, 'inverse-support-01'),
  #fa4d56
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅inverse-support-02 [variable]

Success on high contrast backgrounds

<details>
<summary>Source code</summary>

```scss
$inverse-support-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'inverse-support-02'
    ),
  map-get($carbon--theme, 'inverse-support-02'),
  #42be65
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅inverse-support-03 [variable]

Warning on high contrast backgrounds

<details>
<summary>Source code</summary>

```scss
$inverse-support-03: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'inverse-support-03'
    ),
  map-get($carbon--theme, 'inverse-support-03'),
  #f1c21b
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅inverse-support-04 [variable]

Information on high contrast backgrounds

<details>
<summary>Source code</summary>

```scss
$inverse-support-04: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'inverse-support-04'
    ),
  map-get($carbon--theme, 'inverse-support-04'),
  #4589ff
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅overlay-01 [variable]

Background overlay

<details>
<summary>Source code</summary>

```scss
$overlay-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'overlay-01'
    ),
  map-get($carbon--theme, 'overlay-01'),
  rgba(22, 22, 22, 0.5)
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅danger [variable]

<details>
<summary>Source code</summary>

```scss
$danger: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'danger'
    ),
  map-get($carbon--theme, 'danger'),
  #da1e28
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅focus [variable]

Focus border; Focus underline

<details>
<summary>Source code</summary>

```scss
$focus: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'focus'
    ),
  map-get($carbon--theme, 'focus'),
  #0f62fe
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅inverse-focus-ui [variable]

<details>
<summary>Source code</summary>

```scss
$inverse-focus-ui: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'inverse-focus-ui'
    ),
  map-get($carbon--theme, 'inverse-focus-ui'),
  #ffffff
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅hover-primary [variable]

`$interactive-01` hover

<details>
<summary>Source code</summary>

```scss
$hover-primary: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'hover-primary'
    ),
  map-get($carbon--theme, 'hover-primary'),
  #0353e9
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅active-primary [variable]

`$interactive-01` active

<details>
<summary>Source code</summary>

```scss
$active-primary: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'active-primary'
    ),
  map-get($carbon--theme, 'active-primary'),
  #002d9c
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅hover-primary-text [variable]

`$interactive-01` text hover

<details>
<summary>Source code</summary>

```scss
$hover-primary-text: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'hover-primary-text'
    ),
  map-get($carbon--theme, 'hover-primary-text'),
  #0043ce
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅hover-secondary [variable]

`$interactive-02` hover

<details>
<summary>Source code</summary>

```scss
$hover-secondary: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'hover-secondary'
    ),
  map-get($carbon--theme, 'hover-secondary'),
  #4c4c4c
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅active-secondary [variable]

`$interactive-02` active; `$inverse-01` active

<details>
<summary>Source code</summary>

```scss
$active-secondary: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'active-secondary'
    ),
  map-get($carbon--theme, 'active-secondary'),
  #6f6f6f
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅hover-tertiary [variable]

`$interactive-03` hover; `$inverse-01` hover

<details>
<summary>Source code</summary>

```scss
$hover-tertiary: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'hover-tertiary'
    ),
  map-get($carbon--theme, 'hover-tertiary'),
  #0353e9
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅active-tertiary [variable]

`$interactive-03` active

<details>
<summary>Source code</summary>

```scss
$active-tertiary: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'active-tertiary'
    ),
  map-get($carbon--theme, 'active-tertiary'),
  #002d9c
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅hover-ui [variable]

`$ui-01` hover; `$ui-02` hover; Transparent background hover

<details>
<summary>Source code</summary>

```scss
$hover-ui: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'hover-ui'
    ),
  map-get($carbon--theme, 'hover-ui'),
  #e5e5e5
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Aliased**:
  - `hover-field`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅active-ui [variable]

`$ui-01` active; `$ui-02` active

<details>
<summary>Source code</summary>

```scss
$active-ui: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'active-ui'
    ),
  map-get($carbon--theme, 'active-ui'),
  #c6c6c6
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Aliased**:
  - `active-01`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅selected-ui [variable]

Selected UI elements

<details>
<summary>Source code</summary>

```scss
$selected-ui: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'selected-ui'
    ),
  map-get($carbon--theme, 'selected-ui'),
  #e0e0e0
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅hover-selected-ui [variable]

Data table selected row hover

<details>
<summary>Source code</summary>

```scss
$hover-selected-ui: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'hover-selected-ui'
    ),
  map-get($carbon--theme, 'hover-selected-ui'),
  #cacaca
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅inverse-hover-ui [variable]

<details>
<summary>Source code</summary>

```scss
$inverse-hover-ui: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'inverse-hover-ui'
    ),
  map-get($carbon--theme, 'inverse-hover-ui'),
  #4c4c4c
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅hover-danger [variable]

Danger hover; `$support-01` hover

<details>
<summary>Source code</summary>

```scss
$hover-danger: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'hover-danger'
    ),
  map-get($carbon--theme, 'hover-danger'),
  #ba1b23
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅active-danger [variable]

Danger active; `$support-01` active

<details>
<summary>Source code</summary>

```scss
$active-danger: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'active-danger'
    ),
  map-get($carbon--theme, 'active-danger'),
  #750e13
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅hover-row [variable]

Row hover

<details>
<summary>Source code</summary>

```scss
$hover-row: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'hover-row'
    ),
  map-get($carbon--theme, 'hover-row'),
  #e5e5e5
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅visited-link [variable]

Visited links

<details>
<summary>Source code</summary>

```scss
$visited-link: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'visited-link'
    ),
  map-get($carbon--theme, 'visited-link'),
  #8a3ffc
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅disabled-01 [variable]

Disabled fields; Disabled backgrounds; Disabled border

<details>
<summary>Source code</summary>

```scss
$disabled-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'disabled-01'
    ),
  map-get($carbon--theme, 'disabled-01'),
  #f4f4f4
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅disabled-02 [variable]

Disabled elements on `$disabled-01`; Disabled label; Disabled text on
`$disabled-01`; Disabled icons; Disabled border

<details>
<summary>Source code</summary>

```scss
$disabled-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'disabled-02'
    ),
  map-get($carbon--theme, 'disabled-02'),
  #c6c6c6
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅disabled-03 [variable]

Disabled text on `$disabled-02`; Disabled icons on `$disabled-02`

<details>
<summary>Source code</summary>

```scss
$disabled-03: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'disabled-03'
    ),
  map-get($carbon--theme, 'disabled-03'),
  #8d8d8d
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅highlight [variable]

`$interactive-01` high light

<details>
<summary>Source code</summary>

```scss
$highlight: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'highlight'
    ),
  map-get($carbon--theme, 'highlight'),
  #d0e2ff
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅skeleton-01 [variable]

Skeleton state of graphics

<details>
<summary>Source code</summary>

```scss
$skeleton-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'skeleton-01'
    ),
  map-get($carbon--theme, 'skeleton-01'),
  #e5e5e5
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅skeleton-02 [variable]

Skeleton state of text

<details>
<summary>Source code</summary>

```scss
$skeleton-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'skeleton-02'
    ),
  map-get($carbon--theme, 'skeleton-02'),
  #c6c6c6
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅⚠️brand-01 [variable]

<details>
<summary>Source code</summary>

```scss
$brand-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'brand-01'
    ),
  map-get($carbon--theme, 'brand-01'),
  #0f62fe
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Alias**: `interactive-01`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
- **Deprecated**: This may not be available in future releases

### ✅⚠️brand-02 [variable]

<details>
<summary>Source code</summary>

```scss
$brand-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'brand-02'
    ),
  map-get($carbon--theme, 'brand-02'),
  #393939
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Alias**: `interactive-02`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
- **Deprecated**: This may not be available in future releases

### ✅⚠️brand-03 [variable]

<details>
<summary>Source code</summary>

```scss
$brand-03: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'brand-03'
    ),
  map-get($carbon--theme, 'brand-03'),
  #0f62fe
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Alias**: `interactive-03`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
- **Deprecated**: This may not be available in future releases

### ✅⚠️active-01 [variable]

<details>
<summary>Source code</summary>

```scss
$active-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'active-01'
    ),
  map-get($carbon--theme, 'active-01'),
  #c6c6c6
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Alias**: `active-ui`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
- **Deprecated**: This may not be available in future releases

### ✅⚠️hover-field [variable]

<details>
<summary>Source code</summary>

```scss
$hover-field: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'hover-field'
    ),
  map-get($carbon--theme, 'hover-field'),
  #e5e5e5
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{undefined}`
- **Alias**: `hover-ui`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
- **Deprecated**: This may not be available in future releases

### ✅caption-01 [variable]

<details>
<summary>Source code</summary>

```scss
$caption-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'caption-01'
    ),
  map-get($carbon--theme, 'caption-01'),
  (
    font-size: 0.75rem,
    font-weight: 400,
    line-height: 1rem,
    letter-spacing: 0.32px,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅label-01 [variable]

<details>
<summary>Source code</summary>

```scss
$label-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'label-01'
    ),
  map-get($carbon--theme, 'label-01'),
  (
    font-size: 0.75rem,
    font-weight: 400,
    line-height: 1rem,
    letter-spacing: 0.32px,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅helper-text-01 [variable]

<details>
<summary>Source code</summary>

```scss
$helper-text-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'helper-text-01'
    ),
  map-get($carbon--theme, 'helper-text-01'),
  (
    font-size: 0.75rem,
    line-height: 1rem,
    letter-spacing: 0.32px,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅body-short-01 [variable]

<details>
<summary>Source code</summary>

```scss
$body-short-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'body-short-01'
    ),
  map-get($carbon--theme, 'body-short-01'),
  (
    font-size: 0.875rem,
    font-weight: 400,
    line-height: 1.125rem,
    letter-spacing: 0.16px,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅body-long-01 [variable]

<details>
<summary>Source code</summary>

```scss
$body-long-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'body-long-01'
    ),
  map-get($carbon--theme, 'body-long-01'),
  (
    font-size: 0.875rem,
    font-weight: 400,
    line-height: 1.25rem,
    letter-spacing: 0.16px,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅body-short-02 [variable]

<details>
<summary>Source code</summary>

```scss
$body-short-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'body-short-02'
    ),
  map-get($carbon--theme, 'body-short-02'),
  (
    font-size: 1rem,
    font-weight: 400,
    line-height: 1.375rem,
    letter-spacing: 0,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅body-long-02 [variable]

<details>
<summary>Source code</summary>

```scss
$body-long-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'body-long-02'
    ),
  map-get($carbon--theme, 'body-long-02'),
  (
    font-size: 1rem,
    font-weight: 400,
    line-height: 1.5rem,
    letter-spacing: 0,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅code-01 [variable]

<details>
<summary>Source code</summary>

```scss
$code-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'code-01'
    ),
  map-get($carbon--theme, 'code-01'),
  (
    font-family: unquote("'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace"),
    font-size: 0.75rem,
    font-weight: 400,
    line-height: 1rem,
    letter-spacing: 0.32px,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅code-02 [variable]

<details>
<summary>Source code</summary>

```scss
$code-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'code-02'
    ),
  map-get($carbon--theme, 'code-02'),
  (
    font-family: unquote("'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace"),
    font-size: 0.875rem,
    font-weight: 400,
    line-height: 1.25rem,
    letter-spacing: 0.32px,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅heading-01 [variable]

<details>
<summary>Source code</summary>

```scss
$heading-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'heading-01'
    ),
  map-get($carbon--theme, 'heading-01'),
  (
    font-size: 0.875rem,
    font-weight: 600,
    line-height: 1.125rem,
    letter-spacing: 0.16px,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅productive-heading-01 [variable]

<details>
<summary>Source code</summary>

```scss
$productive-heading-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'productive-heading-01'
    ),
  map-get($carbon--theme, 'productive-heading-01'),
  (
    font-size: 0.875rem,
    font-weight: 600,
    line-height: 1.125rem,
    letter-spacing: 0.16px,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅heading-02 [variable]

<details>
<summary>Source code</summary>

```scss
$heading-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'heading-02'
    ),
  map-get($carbon--theme, 'heading-02'),
  (
    font-size: 1rem,
    font-weight: 600,
    line-height: 1.375rem,
    letter-spacing: 0,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅productive-heading-02 [variable]

<details>
<summary>Source code</summary>

```scss
$productive-heading-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'productive-heading-02'
    ),
  map-get($carbon--theme, 'productive-heading-02'),
  (
    font-size: 1rem,
    font-weight: 600,
    line-height: 1.375rem,
    letter-spacing: 0,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅productive-heading-03 [variable]

<details>
<summary>Source code</summary>

```scss
$productive-heading-03: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'productive-heading-03'
    ),
  map-get($carbon--theme, 'productive-heading-03'),
  (
    font-size: 1.25rem,
    font-weight: 400,
    line-height: 1.625rem,
    letter-spacing: 0,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅productive-heading-04 [variable]

<details>
<summary>Source code</summary>

```scss
$productive-heading-04: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'productive-heading-04'
    ),
  map-get($carbon--theme, 'productive-heading-04'),
  (
    font-size: 1.75rem,
    font-weight: 400,
    line-height: 2.25rem,
    letter-spacing: 0,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅productive-heading-05 [variable]

<details>
<summary>Source code</summary>

```scss
$productive-heading-05: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'productive-heading-05'
    ),
  map-get($carbon--theme, 'productive-heading-05'),
  (
    font-size: 2rem,
    font-weight: 400,
    line-height: 2.5rem,
    letter-spacing: 0,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅productive-heading-06 [variable]

<details>
<summary>Source code</summary>

```scss
$productive-heading-06: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'productive-heading-06'
    ),
  map-get($carbon--theme, 'productive-heading-06'),
  (
    font-size: 2.625rem,
    font-weight: 300,
    line-height: 3.125rem,
    letter-spacing: 0,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅productive-heading-07 [variable]

<details>
<summary>Source code</summary>

```scss
$productive-heading-07: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'productive-heading-07'
    ),
  map-get($carbon--theme, 'productive-heading-07'),
  (
    font-size: 3.375rem,
    font-weight: 300,
    line-height: 4rem,
    letter-spacing: 0,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅expressive-heading-01 [variable]

<details>
<summary>Source code</summary>

```scss
$expressive-heading-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'expressive-heading-01'
    ),
  map-get($carbon--theme, 'expressive-heading-01'),
  (
    font-size: 0.875rem,
    font-weight: 600,
    line-height: 1.25rem,
    letter-spacing: 0.16px,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅expressive-heading-02 [variable]

<details>
<summary>Source code</summary>

```scss
$expressive-heading-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'expressive-heading-02'
    ),
  map-get($carbon--theme, 'expressive-heading-02'),
  (
    font-size: 1rem,
    font-weight: 600,
    line-height: 1.5rem,
    letter-spacing: 0,
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅expressive-heading-03 [variable]

<details>
<summary>Source code</summary>

```scss
$expressive-heading-03: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'expressive-heading-03'
    ),
  map-get($carbon--theme, 'expressive-heading-03'),
  (
    font-size: 1.25rem,
    font-weight: 400,
    line-height: 130%,
    letter-spacing: 0,
    breakpoints: (
      xlg: (
        font-size: 1.25rem,
        line-height: 125%,
      ),
      max: (
        font-size: 1.5rem,
      ),
    ),
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅expressive-heading-04 [variable]

<details>
<summary>Source code</summary>

```scss
$expressive-heading-04: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'expressive-heading-04'
    ),
  map-get($carbon--theme, 'expressive-heading-04'),
  (
    font-size: 1.75rem,
    font-weight: 400,
    line-height: 129%,
    letter-spacing: 0,
    breakpoints: (
      xlg: (
        font-size: 1.75rem,
        line-height: 125%,
      ),
      max: (
        font-size: 2rem,
      ),
    ),
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅expressive-heading-05 [variable]

<details>
<summary>Source code</summary>

```scss
$expressive-heading-05: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'expressive-heading-05'
    ),
  map-get($carbon--theme, 'expressive-heading-05'),
  (
    font-size: 2rem,
    font-weight: 400,
    line-height: 125%,
    letter-spacing: 0,
    breakpoints: (
      md: (
        font-size: 2.25rem,
        font-weight: 300,
        line-height: 122%,
        letter-spacing: 0,
      ),
      lg: (
        font-size: 2.625rem,
        font-weight: 300,
        line-height: 119%,
        letter-spacing: 0,
      ),
      xlg: (
        font-size: 3rem,
        font-weight: 300,
        line-height: 117%,
        letter-spacing: 0,
      ),
      max: (
        font-size: 3.75rem,
        font-weight: 300,
        line-height: 4.375rem,
        letter-spacing: 0,
      ),
    ),
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅expressive-heading-06 [variable]

<details>
<summary>Source code</summary>

```scss
$expressive-heading-06: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'expressive-heading-06'
    ),
  map-get($carbon--theme, 'expressive-heading-06'),
  (
    font-size: 2rem,
    font-weight: 600,
    line-height: 125%,
    letter-spacing: 0,
    breakpoints: (
      md: (
        font-size: 2.25rem,
        font-weight: 600,
        line-height: 122%,
        letter-spacing: 0,
      ),
      lg: (
        font-size: 2.625rem,
        font-weight: 600,
        line-height: 119%,
        letter-spacing: 0,
      ),
      xlg: (
        font-size: 3rem,
        font-weight: 600,
        line-height: 117%,
        letter-spacing: 0,
      ),
      max: (
        font-size: 3.75rem,
        font-weight: 600,
        line-height: 4.375rem,
        letter-spacing: 0,
      ),
    ),
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅expressive-paragraph-01 [variable]

<details>
<summary>Source code</summary>

```scss
$expressive-paragraph-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'expressive-paragraph-01'
    ),
  map-get($carbon--theme, 'expressive-paragraph-01'),
  (
    font-size: 1.5rem,
    font-weight: 300,
    line-height: 125%,
    letter-spacing: 0,
    lg: (
      font-size: 1.75rem,
      line-height: 129%,
    ),
    max: (
      font-size: 2rem,
      line-height: 125%,
    ),
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅quotation-01 [variable]

<details>
<summary>Source code</summary>

```scss
$quotation-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'quotation-01'
    ),
  map-get($carbon--theme, 'quotation-01'),
  (
    font-size: 1.25rem,
    font-weight: 400,
    line-height: 130%,
    letter-spacing: 0,
    breakpoints: (
      md: (
        font-size: 1.25rem,
        font-weight: 400,
        letter-spacing: 0,
      ),
      lg: (
        font-size: 1.5rem,
        font-weight: 400,
        line-height: 125%,
        letter-spacing: 0,
      ),
      xlg: (
        font-size: 1.75rem,
        font-weight: 400,
        line-height: 129%,
        letter-spacing: 0,
      ),
      max: (
        font-size: 2rem,
        font-weight: 400,
        line-height: 125%,
        letter-spacing: 0,
      ),
    ),
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅quotation-02 [variable]

<details>
<summary>Source code</summary>

```scss
$quotation-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'quotation-02'
    ),
  map-get($carbon--theme, 'quotation-02'),
  (
    font-size: 2rem,
    font-weight: 300,
    line-height: 125%,
    letter-spacing: 0,
    breakpoints: (
      md: (
        font-size: 2.25rem,
        line-height: 122%,
      ),
      lg: (
        font-size: 2.625rem,
        line-height: 119%,
      ),
      xlg: (
        font-size: 3rem,
        line-height: 117%,
      ),
      max: (
        font-size: 3.75rem,
      ),
    ),
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅display-01 [variable]

<details>
<summary>Source code</summary>

```scss
$display-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'display-01'
    ),
  map-get($carbon--theme, 'display-01'),
  (
    font-size: 2.625rem,
    font-weight: 300,
    line-height: 119%,
    letter-spacing: 0,
    breakpoints: (
      md: (
        font-size: 2.625rem,
      ),
      lg: (
        font-size: 3.375rem,
      ),
      xlg: (
        font-size: 3.75rem,
        line-height: 117%,
      ),
      max: (
        font-size: 4.75rem,
        line-height: 113%,
      ),
    ),
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅display-02 [variable]

<details>
<summary>Source code</summary>

```scss
$display-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'display-02'
    ),
  map-get($carbon--theme, 'display-02'),
  (
    font-size: 2.625rem,
    font-weight: 600,
    line-height: 119%,
    letter-spacing: 0,
    breakpoints: (
      md: (
        font-size: 2.625rem,
      ),
      lg: (
        font-size: 3.375rem,
      ),
      xlg: (
        font-size: 3.75rem,
        line-height: 116%,
      ),
      max: (
        font-size: 4.75rem,
        line-height: 113%,
      ),
    ),
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅display-03 [variable]

<details>
<summary>Source code</summary>

```scss
$display-03: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'display-03'
    ),
  map-get($carbon--theme, 'display-03'),
  (
    font-size: 2.625rem,
    font-weight: 300,
    line-height: 119%,
    letter-spacing: 0,
    breakpoints: (
      md: (
        font-size: 4.25rem,
        line-height: 115%,
      ),
      lg: (
        font-size: 5.75rem,
        line-height: 111%,
        letter-spacing: -0.64px,
      ),
      xlg: (
        font-size: 7.625rem,
        line-height: 107%,
      ),
      max: (
        font-size: 9.75rem,
        line-height: 105%,
        letter-spacing: -0.96px,
      ),
    ),
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅display-04 [variable]

<details>
<summary>Source code</summary>

```scss
$display-04: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'display-04'
    ),
  map-get($carbon--theme, 'display-04'),
  (
    font-size: 2.625rem,
    font-weight: 600,
    line-height: 119%,
    letter-spacing: 0,
    breakpoints: (
      md: (
        font-size: 4.25rem,
        line-height: 115%,
      ),
      lg: (
        font-size: 5.75rem,
        line-height: 111%,
        letter-spacing: -0.64px,
      ),
      xlg: (
        font-size: 7.625rem,
        line-height: 107%,
        letter-spacing: -0.64px,
      ),
      max: (
        font-size: 9.75rem,
        line-height: 105%,
        letter-spacing: -0.96px,
      ),
    ),
  )
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅spacing-01 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'spacing-01'
    ),
  map-get($carbon--theme, 'spacing-01'),
  0.125rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅spacing-02 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'spacing-02'
    ),
  map-get($carbon--theme, 'spacing-02'),
  0.25rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅spacing-03 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-03: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'spacing-03'
    ),
  map-get($carbon--theme, 'spacing-03'),
  0.5rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅spacing-04 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-04: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'spacing-04'
    ),
  map-get($carbon--theme, 'spacing-04'),
  0.75rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅spacing-05 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-05: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'spacing-05'
    ),
  map-get($carbon--theme, 'spacing-05'),
  1rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅spacing-06 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-06: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'spacing-06'
    ),
  map-get($carbon--theme, 'spacing-06'),
  1.5rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅spacing-07 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-07: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'spacing-07'
    ),
  map-get($carbon--theme, 'spacing-07'),
  2rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅spacing-08 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-08: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'spacing-08'
    ),
  map-get($carbon--theme, 'spacing-08'),
  2.5rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅spacing-09 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-09: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'spacing-09'
    ),
  map-get($carbon--theme, 'spacing-09'),
  3rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅spacing-10 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-10: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'spacing-10'
    ),
  map-get($carbon--theme, 'spacing-10'),
  4rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅spacing-11 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-11: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'spacing-11'
    ),
  map-get($carbon--theme, 'spacing-11'),
  5rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅spacing-12 [variable]

<details>
<summary>Source code</summary>

```scss
$spacing-12: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'spacing-12'
    ),
  map-get($carbon--theme, 'spacing-12'),
  6rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅fluid-spacing-01 [variable]

<details>
<summary>Source code</summary>

```scss
$fluid-spacing-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'fluid-spacing-01'
    ),
  map-get($carbon--theme, 'fluid-spacing-01'),
  0
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅fluid-spacing-02 [variable]

<details>
<summary>Source code</summary>

```scss
$fluid-spacing-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'fluid-spacing-02'
    ),
  map-get($carbon--theme, 'fluid-spacing-02'),
  2vw
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅fluid-spacing-03 [variable]

<details>
<summary>Source code</summary>

```scss
$fluid-spacing-03: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'fluid-spacing-03'
    ),
  map-get($carbon--theme, 'fluid-spacing-03'),
  5vw
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅fluid-spacing-04 [variable]

<details>
<summary>Source code</summary>

```scss
$fluid-spacing-04: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'fluid-spacing-04'
    ),
  map-get($carbon--theme, 'fluid-spacing-04'),
  10vw
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅layout-01 [variable]

<details>
<summary>Source code</summary>

```scss
$layout-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'layout-01'
    ),
  map-get($carbon--theme, 'layout-01'),
  1rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅layout-02 [variable]

<details>
<summary>Source code</summary>

```scss
$layout-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'layout-02'
    ),
  map-get($carbon--theme, 'layout-02'),
  1.5rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅layout-03 [variable]

<details>
<summary>Source code</summary>

```scss
$layout-03: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'layout-03'
    ),
  map-get($carbon--theme, 'layout-03'),
  2rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅layout-04 [variable]

<details>
<summary>Source code</summary>

```scss
$layout-04: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'layout-04'
    ),
  map-get($carbon--theme, 'layout-04'),
  3rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅layout-05 [variable]

<details>
<summary>Source code</summary>

```scss
$layout-05: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'layout-05'
    ),
  map-get($carbon--theme, 'layout-05'),
  4rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅layout-06 [variable]

<details>
<summary>Source code</summary>

```scss
$layout-06: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'layout-06'
    ),
  map-get($carbon--theme, 'layout-06'),
  6rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅layout-07 [variable]

<details>
<summary>Source code</summary>

```scss
$layout-07: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'layout-07'
    ),
  map-get($carbon--theme, 'layout-07'),
  10rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅container-01 [variable]

<details>
<summary>Source code</summary>

```scss
$container-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'container-01'
    ),
  map-get($carbon--theme, 'container-01'),
  1.5rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅container-02 [variable]

<details>
<summary>Source code</summary>

```scss
$container-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'container-02'
    ),
  map-get($carbon--theme, 'container-02'),
  2rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅container-03 [variable]

<details>
<summary>Source code</summary>

```scss
$container-03: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'container-03'
    ),
  map-get($carbon--theme, 'container-03'),
  2.5rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅container-04 [variable]

<details>
<summary>Source code</summary>

```scss
$container-04: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'container-04'
    ),
  map-get($carbon--theme, 'container-04'),
  3rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅container-05 [variable]

<details>
<summary>Source code</summary>

```scss
$container-05: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'container-05'
    ),
  map-get($carbon--theme, 'container-05'),
  4rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅icon-size-01 [variable]

<details>
<summary>Source code</summary>

```scss
$icon-size-01: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'icon-size-01'
    ),
  map-get($carbon--theme, 'icon-size-01'),
  1rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

### ✅icon-size-02 [variable]

<details>
<summary>Source code</summary>

```scss
$icon-size-02: if(
  global-variable-exists('carbon--theme') and map-has-key(
      $carbon--theme,
      'icon-size-02'
    ),
  map-get($carbon--theme, 'icon-size-02'),
  1.25rem
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `{Number}`

## @carbon/type

### ✅carbon--type-classes [mixin]

Create type classes for font families, weights, styles

<details>
<summary>Source code</summary>

```scss
@mixin carbon--type-classes() {
  // Font families
  @each $name, $value in $carbon--font-families {
    .#{$prefix}--type-#{$name} {
      font-family: $value;
    }
  }

  // Font weights
  @each $name, $value in $carbon--font-weights {
    .#{$prefix}--type-#{$name} {
      font-weight: $value;
    }
  }

  // Font styles
  .#{$prefix}--type-italic {
    font-style: italic;
  }

  // Type styles
  @each $name, $value in $tokens {
    .#{$prefix}--type-#{$name} {
      @include carbon--type-style($name, map-has-key($value, breakpoints));
    }
  }
}
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Requires**:
  - [carbon--type-style [mixin]](#carbon--type-style-mixin)
  - [carbon--font-families [variable]](#carbon--font-families-variable)
  - [prefix [variable]](#prefix-variable)
  - [carbon--font-weights [variable]](#carbon--font-weights-variable)
  - [tokens [variable]](#tokens-variable)

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

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`
- **Used by**:
  - [carbon--type-classes [mixin]](#carbon--type-classes-mixin)
  - [carbon--font-family [function]](#carbon--font-family-function)

### ✅carbon--font-family [function]

Get the font-family for an IBM Plex font

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

- **Group**: [@carbon/type](#carbontype)
- **Returns**: `String`
- **Requires**:
  - [carbon--font-families [variable]](#carbon--font-families-variable)
- **Used by**:
  - [carbon--font-family [mixin]](#carbon--font-family-mixin)

### ✅carbon--font-family [mixin]

Include the `font-family` definition for the given name in your selector

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

- **Group**: [@carbon/type](#carbontype)
- **Requires**:
  - [carbon--font-family [function]](#carbon--font-family-function)

### ✅carbon--font-weights [variable]

Suggested font weights to be used in product

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

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`
- **Used by**:
  - [carbon--type-classes [mixin]](#carbon--type-classes-mixin)
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

- **Group**: [@carbon/type](#carbontype)
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

- **Group**: [@carbon/type](#carbontype)
- **Requires**:
  - [carbon--font-weight [function]](#carbon--font-weight-function)
- **Used by**:
  - [carbon--type-reset [mixin]](#carbon--type-reset-mixin)

### ✅carbon--font-face-mono [mixin]

Mono `@font-face`'s

<details>
<summary>Source code</summary>

```scss
@mixin carbon--font-face-mono() {
  // .woff support for IE11
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light Italic'), local('IBMPlexMono-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1gMoW.woff)
        format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa1Xdm.woff)
        format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local(
        'IBMPlexMono-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1gMoW.woff)
        format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwlBFhA.woff)
        format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1i8q0Q.woff)
        format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwlBFhA.woff)
        format('woff');
  }

  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light Italic'), local('IBMPlexMono-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1jcoQPttoz6Pz.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light Italic'), local('IBMPlexMono-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1hMoQPttoz6Pz.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light Italic'), local('IBMPlexMono-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1j8oQPttoz6Pz.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light Italic'), local('IBMPlexMono-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1jsoQPttoz6Pz.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light Italic'), local('IBMPlexMono-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1gMoQPttozw.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa2HdgregdFOFh.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa0XdgregdFOFh.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa2ndgregdFOFh.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa23dgregdFOFh.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa1XdgregdFA.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local(
        'IBMPlexMono-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1jcoQPttoz6Pz.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local(
        'IBMPlexMono-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1hMoQPttoz6Pz.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local(
        'IBMPlexMono-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1j8oQPttoz6Pz.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local(
        'IBMPlexMono-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1jsoQPttoz6Pz.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local(
        'IBMPlexMono-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1gMoQPttozw.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwl1FgsAXHNlYzg.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwlRFgsAXHNlYzg.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwl9FgsAXHNlYzg.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwl5FgsAXHNlYzg.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwlBFgsAXHNk.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1iIq131nj-otFQ.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1isq131nj-otFQ.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1iAq131nj-otFQ.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1iEq131nj-otFQ.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1i8q131nj-o.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwl1FgsAXHNlYzg.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwlRFgsAXHNlYzg.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwl9FgsAXHNlYzg.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwl5FgsAXHNlYzg.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwlBFgsAXHNk.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
}
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Requires**:
  - [carbon--font-display [variable]](#carbon--font-display-variable)

### ✅prefix [variable]

<details>
<summary>Source code</summary>

```scss
$prefix: 'bx';
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `String`

### ✅carbon--type-reset [mixin]

Include a type reset for a given body and mono font family

<details>
<summary>Source code</summary>

```scss
@mixin carbon--type-reset(
  $base-font-size: $carbon--base-font-size,
  $body-font-family: carbon--font-family('sans'),
  $mono-font-family: carbon--font-family('mono')
) {
  html {
    font-size: $base-font-size;
  }

  body {
    font-family: $body-font-family;
    @include carbon--font-weight('regular');
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: $mono-font-family;
  }

  strong {
    @include carbon--font-weight('semibold');
  }
}
```

</details>

- **Parameters**:

| Name                | Description                                                                         | Type     | Default value                 |
| ------------------- | ----------------------------------------------------------------------------------- | -------- | ----------------------------- |
| `$base-font-size`   | The base font size for your document                                                | `Number` | `$carbon--base-font-size`     |
| `$body-font-family` | The font family used on the `<body>` element                                        | `String` | `carbon--font-family('sans')` |
| `$mono-font-family` | The font family used on elements that require mono fonts, like the `<code>` element | `String` | `carbon--font-family('mono')` |

- **Group**: [@carbon/type](#carbontype)
- **Requires**:
  - [carbon--font-weight [mixin]](#carbon--font-weight-mixin)

### ✅carbon--default-type [mixin]

Include default type styles

<details>
<summary>Source code</summary>

```scss
@mixin carbon--default-type() {
  h1 {
    @include carbon--type-style('productive-heading-06');
  }

  h2 {
    @include carbon--type-style('productive-heading-05');
  }

  h3 {
    @include carbon--type-style('productive-heading-04');
  }

  h4 {
    @include carbon--type-style('productive-heading-03');
  }

  h5 {
    @include carbon--type-style('productive-heading-02');
  }

  h6 {
    @include carbon--type-style('productive-heading-01');
  }

  p {
    @include carbon--type-style('body-long-02');
  }

  a {
    color: #0062ff;
  }

  em {
    font-style: italic;
  }
}
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Requires**:
  - [carbon--type-style [mixin]](#carbon--type-style-mixin)

### ✅carbon--font-face-sans [mixin]

Sans `@font-face`'s

<details>
<summary>Source code</summary>

```scss
@mixin carbon--font-face-sans() {
  // .woff support for IE11
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRcdvfo.woff)
        format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuF6ZP.woff)
        format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local(
        'IBMPlexSans-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJcdvfo.woff)
        format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIFscg.woff)
        format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhdHeEw.woff)
        format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIFscg.woff)
        format('woff');
  }

  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRce_fuJGl18QRY.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRccvfuJGl18QRY.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRcdffuJGl18QRY.woff2)
        format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRceffuJGl18QRY.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRcePfuJGl18QRY.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRcdvfuJGl18Q.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuGqZJW9XjDlN8.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuE6ZJW9XjDlN8.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuFKZJW9XjDlN8.woff2)
        format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuGKZJW9XjDlN8.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuGaZJW9XjDlN8.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuF6ZJW9XjDg.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local(
        'IBMPlexSans-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJce_fuJGl18QRY.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local(
        'IBMPlexSans-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJccvfuJGl18QRY.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local(
        'IBMPlexSans-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJcdffuJGl18QRY.woff2)
        format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local(
        'IBMPlexSans-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJceffuJGl18QRY.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local(
        'IBMPlexSans-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJcePfuJGl18QRY.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local(
        'IBMPlexSans-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJcdvfuJGl18Q.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIxsdP3pBmtF8A.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIVsdP3pBmtF8A.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIJsdP3pBmtF8A.woff2)
        format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AI5sdP3pBmtF8A.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AI9sdP3pBmtF8A.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIFsdP3pBms.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhdzeFaxOedfTDw.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhdXeFaxOedfTDw.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhdLeFaxOedfTDw.woff2)
        format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhd7eFaxOedfTDw.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhd_eFaxOedfTDw.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhdHeFaxOedc.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIxsdP3pBmtF8A.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIVsdP3pBmtF8A.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIJsdP3pBmtF8A.woff2)
        format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AI5sdP3pBmtF8A.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AI9sdP3pBmtF8A.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIFsdP3pBms.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
}
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Requires**:
  - [carbon--font-display [variable]](#carbon--font-display-variable)

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

- **Group**: [@carbon/type](#carbontype)
- **Returns**: `Number` In px

### ✅carbon--type-scale [variable]

Type scole follows a custom formula for determining each step size and supports
sizes from 12px to 92px

<details>
<summary>Source code</summary>

```scss
$carbon--type-scale: ();
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`
- **Aliased**:
  - `carbon--font-size`
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

- **Group**: [@carbon/type](#carbontype)
- **Returns**: `Number` In rem
- **Requires**:
  - [carbon--type-scale [variable]](#carbon--type-scale-variable)
- **Used by**:
  - [carbon--type-scale [mixin]](#carbon--type-scale-mixin)
  - [carbon--font-size [mixin]](#carbon--font-size-mixin)

### ✅carbon--type-scale [mixin]

Set the font-size value of a selector with the value at the given `$step`

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

- **Group**: [@carbon/type](#carbontype)
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

- **Group**: [@carbon/type](#carbontype)
- **Alias**: `carbon--type-scale`
- **Requires**:
  - [carbon--type-scale [function]](#carbon--type-scale-function)

### ✅carbon--font-face-serif [mixin]

Serif `@font-face`'s

<details>
<summary>Source code</summary>

```scss
@mixin carbon--font-face-serif() {
  // .woff support for IE11
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light Italic'), local(
        'IBMPlexSerif-LightItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm1npiw.woff)
        format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zUTiA.woff)
        format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local(
        'IBMPlexSerif-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m1npiw.woff)
        format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI0q10.woff)
        format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUf2zE.woff)
        format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI0q10.woff)
        format('woff');
  }

  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light Italic'), local(
        'IBMPlexSerif-LightItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm1TpjfGj7oaMBg.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light Italic'), local(
        'IBMPlexSerif-LightItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm13pjfGj7oaMBg.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light Italic'), local(
        'IBMPlexSerif-LightItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm1bpjfGj7oaMBg.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light Italic'), local(
        'IBMPlexSerif-LightItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm1fpjfGj7oaMBg.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light Italic'), local(
        'IBMPlexSerif-LightItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm1npjfGj7oY.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zgTjnTLgNuZ5w.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zETjnTLgNuZ5w.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zoTjnTLgNuZ5w.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zsTjnTLgNuZ5w.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zUTjnTLgNs.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local(
        'IBMPlexSerif-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m1TpjfGj7oaMBg.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local(
        'IBMPlexSerif-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m13pjfGj7oaMBg.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local(
        'IBMPlexSerif-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m1bpjfGj7oaMBg.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local(
        'IBMPlexSerif-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m1fpjfGj7oaMBg.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local(
        'IBMPlexSerif-SemiBoldItalic'
      ),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m1npjfGj7oY.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI5q1vjitOh3oc.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SIwq1vjitOh3oc.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI7q1vjitOh3oc.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI6q1vjitOh3oc.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI0q1vjitOh.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUS2zcZiVbJsNo.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUb2zcZiVbJsNo.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUQ2zcZiVbJsNo.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUR2zcZiVbJsNo.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUf2zcZiVbJ.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI5q1vjitOh3oc.woff2)
        format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yIwq1vjitOh3oc.woff2)
        format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI7q1vjitOh3oc.woff2)
        format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI6q1vjitOh3oc.woff2)
        format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI0q1vjitOh.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
}
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Requires**:
  - [carbon--font-display [variable]](#carbon--font-display-variable)

### ✅carbon--font-display [variable]

Defines how font files are loaded and displayed by the browser

<details>
<summary>Source code</summary>

```scss
$carbon--font-display: auto;
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Used by**:
  - [carbon--font-face-mono [mixin]](#carbon--font-face-mono-mixin)
  - [carbon--font-face-sans [mixin]](#carbon--font-face-sans-mixin)
  - [carbon--font-face-serif [mixin]](#carbon--font-face-serif-mixin)
- **Links**:
  - [Link](https://css-tricks.com/almanac/properties/f/font-display/)

### ✅caption-01 [variable]

<details>
<summary>Source code</summary>

```scss
$caption-01: (
  font-size: carbon--type-scale(1),
  font-weight: carbon--font-weight('regular'),
  line-height: carbon--rem(16px),
  letter-spacing: 0.32px,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅label-01 [variable]

<details>
<summary>Source code</summary>

```scss
$label-01: (
  font-size: carbon--type-scale(1),
  font-weight: carbon--font-weight('regular'),
  line-height: carbon--rem(16px),
  letter-spacing: 0.32px,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅helper-text-01 [variable]

<details>
<summary>Source code</summary>

```scss
$helper-text-01: (
  font-size: carbon--type-scale(1),
  line-height: carbon--rem(16px),
  letter-spacing: 0.32px,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅body-short-01 [variable]

<details>
<summary>Source code</summary>

```scss
$body-short-01: (
  font-size: carbon--type-scale(2),
  font-weight: carbon--font-weight('regular'),
  line-height: carbon--rem(18px),
  letter-spacing: 0.16px,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅body-long-01 [variable]

<details>
<summary>Source code</summary>

```scss
$body-long-01: (
  font-size: carbon--type-scale(2),
  font-weight: carbon--font-weight('regular'),
  line-height: carbon--rem(20px),
  letter-spacing: 0.16px,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅body-short-02 [variable]

<details>
<summary>Source code</summary>

```scss
$body-short-02: (
  font-size: carbon--type-scale(3),
  font-weight: carbon--font-weight('regular'),
  line-height: carbon--rem(22px),
  letter-spacing: 0,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅body-long-02 [variable]

<details>
<summary>Source code</summary>

```scss
$body-long-02: (
  font-size: carbon--type-scale(3),
  font-weight: carbon--font-weight('regular'),
  line-height: carbon--rem(24px),
  letter-spacing: 0,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅code-01 [variable]

<details>
<summary>Source code</summary>

```scss
$code-01: (
  font-family: carbon--font-family('mono'),
  font-size: carbon--type-scale(1),
  font-weight: carbon--font-weight('regular'),
  line-height: carbon--rem(16px),
  letter-spacing: 0.32px,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅code-02 [variable]

<details>
<summary>Source code</summary>

```scss
$code-02: (
  font-family: carbon--font-family('mono'),
  font-size: carbon--type-scale(2),
  font-weight: carbon--font-weight('regular'),
  line-height: carbon--rem(20px),
  letter-spacing: 0.32px,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅heading-01 [variable]

<details>
<summary>Source code</summary>

```scss
$heading-01: (
  font-size: carbon--type-scale(2),
  font-weight: carbon--font-weight('semibold'),
  line-height: carbon--rem(18px),
  letter-spacing: 0.16px,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅productive-heading-01 [variable]

<details>
<summary>Source code</summary>

```scss
$productive-heading-01: $heading-01;
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅heading-02 [variable]

<details>
<summary>Source code</summary>

```scss
$heading-02: (
  font-size: carbon--type-scale(3),
  font-weight: carbon--font-weight('semibold'),
  line-height: carbon--rem(22px),
  letter-spacing: 0,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅productive-heading-02 [variable]

<details>
<summary>Source code</summary>

```scss
$productive-heading-02: $heading-02;
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅productive-heading-03 [variable]

<details>
<summary>Source code</summary>

```scss
$productive-heading-03: (
  font-size: carbon--type-scale(5),
  font-weight: carbon--font-weight('regular'),
  line-height: carbon--rem(26px),
  letter-spacing: 0,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅productive-heading-04 [variable]

<details>
<summary>Source code</summary>

```scss
$productive-heading-04: (
  font-size: carbon--type-scale(7),
  font-weight: carbon--font-weight('regular'),
  line-height: carbon--rem(36px),
  letter-spacing: 0,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅productive-heading-05 [variable]

<details>
<summary>Source code</summary>

```scss
$productive-heading-05: (
  font-size: carbon--type-scale(8),
  font-weight: carbon--font-weight('regular'),
  line-height: carbon--rem(40px),
  letter-spacing: 0,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅productive-heading-06 [variable]

<details>
<summary>Source code</summary>

```scss
$productive-heading-06: (
  font-size: carbon--type-scale(8),
  font-weight: carbon--font-weight('light'),
  line-height: carbon--rem(50px),
  letter-spacing: 0,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅productive-heading-07 [variable]

<details>
<summary>Source code</summary>

```scss
$productive-heading-07: (
  font-size: carbon--type-scale(10),
  font-weight: carbon--font-weight('light'),
  line-height: carbon--rem(64px),
  letter-spacing: 0,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅expressive-heading-01 [variable]

<details>
<summary>Source code</summary>

```scss
$expressive-heading-01: map-merge(
  $heading-01,
  (
    line-height: carbon--rem(20px),
  )
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅expressive-heading-02 [variable]

<details>
<summary>Source code</summary>

```scss
$expressive-heading-02: map-merge(
  $heading-02,
  (
    line-height: carbon--rem(24px),
  )
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅expressive-heading-03 [variable]

<details>
<summary>Source code</summary>

```scss
$expressive-heading-03: (
  font-size: carbon--type-scale(5),
  font-weight: carbon--font-weight('regular'),
  line-height: 130%,
  letter-spacing: 0,
  breakpoints: (
    xlg: (
      font-size: carbon--type-scale(5),
      line-height: 125%,
    ),
    max: (
      font-size: carbon--type-scale(6),
    ),
  ),
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅expressive-heading-04 [variable]

<details>
<summary>Source code</summary>

```scss
$expressive-heading-04: (
  font-size: carbon--type-scale(7),
  font-weight: carbon--font-weight('regular'),
  line-height: 129%,
  letter-spacing: 0,
  breakpoints: (
    xlg: (
      font-size: carbon--type-scale(7),
      line-height: 125%,
    ),
    max: (
      font-size: carbon--type-scale(8),
    ),
  ),
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅expressive-heading-05 [variable]

<details>
<summary>Source code</summary>

```scss
$expressive-heading-05: (
  font-size: carbon--type-scale(8),
  font-weight: carbon--font-weight('regular'),
  line-height: 125%,
  letter-spacing: 0,
  breakpoints: (
    md: (
      font-size: carbon--type-scale(9),
      line-height: 122%,
    ),
    lg: (
      font-size: carbon--type-scale(10),
      line-height: 119%,
    ),
    xlg: (
      font-size: carbon--type-scale(11),
      line-height: 117%,
    ),
    max: (
      font-size: carbon--type-scale(13),
    ),
  ),
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅expressive-heading-06 [variable]

<details>
<summary>Source code</summary>

```scss
$expressive-heading-06: (
  font-size: carbon--type-scale(8),
  font-weight: carbon--font-weight('semibold'),
  line-height: 125%,
  letter-spacing: 0,
  breakpoints: (
    md: (
      font-size: carbon--type-scale(9),
      line-height: 122%,
    ),
    lg: (
      font-size: carbon--type-scale(10),
      line-height: 119%,
    ),
    xlg: (
      font-size: carbon--type-scale(11),
      line-height: 117%,
    ),
    max: (
      font-size: carbon--type-scale(13),
    ),
  ),
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅expressive-paragraph-01 [variable]

<details>
<summary>Source code</summary>

```scss
$expressive-paragraph-01: (
  font-size: carbon--type-scale(6),
  font-weight: carbon--font-weight('light'),
  line-height: 125%,
  letter-spacing: 0,
  breakpoints: (
    lg: (
      font-size: carbon--type-scale(7),
      line-height: 129%,
    ),
    max: (
      font-size: carbon--type-scale(8),
      line-height: 125%,
    ),
  ),
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅quotation-01 [variable]

<details>
<summary>Source code</summary>

```scss
$quotation-01: (
  font-size: carbon--type-scale(5),
  font-weight: carbon--font-weight('regular'),
  line-height: 130%,
  letter-spacing: 0,
  breakpoints: (
    md: (
      font-size: carbon--type-scale(5),
    ),
    lg: (
      font-size: carbon--type-scale(6),
      line-height: 125%,
    ),
    xlg: (
      font-size: carbon--type-scale(7),
      line-height: 129%,
    ),
    max: (
      font-size: carbon--type-scale(8),
      line-height: 125%,
    ),
  ),
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅quotation-02 [variable]

<details>
<summary>Source code</summary>

```scss
$quotation-02: (
  font-size: carbon--type-scale(8),
  font-weight: carbon--font-weight('light'),
  line-height: 125%,
  letter-spacing: 0,
  breakpoints: (
    md: (
      font-size: carbon--type-scale(9),
      line-height: 122%,
    ),
    lg: (
      font-size: carbon--type-scale(10),
      line-height: 119%,
    ),
    xlg: (
      font-size: carbon--type-scale(11),
      line-height: 117%,
    ),
    max: (
      font-size: carbon--type-scale(13),
    ),
  ),
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅display-01 [variable]

<details>
<summary>Source code</summary>

```scss
$display-01: (
  font-size: carbon--type-scale(10),
  font-weight: carbon--font-weight('light'),
  line-height: 119%,
  letter-spacing: 0,
  breakpoints: (
    md: (
      font-size: carbon--type-scale(10),
    ),
    lg: (
      font-size: carbon--type-scale(12),
    ),
    xlg: (
      font-size: carbon--type-scale(13),
      line-height: 117%,
    ),
    max: (
      font-size: carbon--type-scale(15),
      line-height: 113%,
    ),
  ),
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅display-02 [variable]

<details>
<summary>Source code</summary>

```scss
$display-02: (
  font-size: carbon--type-scale(10),
  font-weight: carbon--font-weight('semibold'),
  line-height: 119%,
  letter-spacing: 0,
  breakpoints: (
    md: (
      font-size: carbon--type-scale(10),
    ),
    lg: (
      font-size: carbon--type-scale(12),
    ),
    xlg: (
      font-size: carbon--type-scale(13),
      line-height: 116%,
    ),
    max: (
      font-size: carbon--type-scale(15),
      line-height: 113%,
    ),
  ),
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅display-03 [variable]

<details>
<summary>Source code</summary>

```scss
$display-03: (
  font-size: carbon--type-scale(10),
  font-weight: carbon--font-weight('light'),
  line-height: 119%,
  letter-spacing: 0,
  breakpoints: (
    md: (
      font-size: carbon--type-scale(14),
      line-height: 115%,
    ),
    lg: (
      font-size: carbon--type-scale(17),
      line-height: 111%,
      letter-spacing: -0.64px,
    ),
    xlg: (
      font-size: carbon--type-scale(20),
      line-height: 107%,
      letter-spacing: -0.64px,
    ),
    max: (
      font-size: carbon--type-scale(23),
      line-height: 105%,
      letter-spacing: -0.96px,
    ),
  ),
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅display-04 [variable]

<details>
<summary>Source code</summary>

```scss
$display-04: (
  font-size: carbon--type-scale(10),
  font-weight: carbon--font-weight('semibold'),
  line-height: 119%,
  letter-spacing: 0,
  breakpoints: (
    md: (
      font-size: carbon--type-scale(14),
      line-height: 115%,
    ),
    lg: (
      font-size: carbon--type-scale(17),
      line-height: 111%,
      letter-spacing: -0.64px,
    ),
    xlg: (
      font-size: carbon--type-scale(20),
      line-height: 107%,
      letter-spacing: -0.64px,
    ),
    max: (
      font-size: carbon--type-scale(23),
      line-height: 105%,
      letter-spacing: -0.96px,
    ),
  ),
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`

### ✅tokens [variable]

<details>
<summary>Source code</summary>

```scss
$tokens: (
  caption-01: $caption-01,
  label-01: $label-01,
  helper-text-01: $helper-text-01,
  body-short-01: $body-short-01,
  body-short-02: $body-short-02,
  body-long-01: $body-long-01,
  body-long-02: $body-long-02,
  code-01: $code-01,
  code-02: $code-02,
  heading-01: $heading-01,
  heading-02: $heading-02,
  productive-heading-01: $productive-heading-01,
  productive-heading-02: $productive-heading-02,
  productive-heading-03: $productive-heading-03,
  productive-heading-04: $productive-heading-04,
  productive-heading-05: $productive-heading-05,
  productive-heading-06: $productive-heading-06,
  productive-heading-07: $productive-heading-07,
  expressive-paragraph-01: $expressive-paragraph-01,
  expressive-heading-01: $expressive-heading-01,
  expressive-heading-02: $expressive-heading-02,
  expressive-heading-03: $expressive-heading-03,
  expressive-heading-04: $expressive-heading-04,
  expressive-heading-05: $expressive-heading-05,
  expressive-heading-06: $expressive-heading-06,
  quotation-01: $quotation-01,
  quotation-02: $quotation-02,
  display-01: $display-01,
  display-02: $display-02,
  display-03: $display-03,
  display-04: $display-04,
);
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Type**: `Map`
- **Used by**:
  - [carbon--type-classes [mixin]](#carbon--type-classes-mixin)
  - [carbon--type-style [mixin]](#carbon--type-style-mixin)

### ✅properties [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin properties($map) {
  @each $name, $value in $map {
    #{$name}: $value;
  }
}
```

</details>

- **Parameters**:

| Name   | Description | Type  | Default value |
| ------ | ----------- | ----- | ------------- |
| `$map` | —           | `Map` | —             |

- **Group**: [@carbon/type](#carbontype)
- **Used by**:
  - [fluid-type [mixin]](#fluid-type-mixin)
  - [carbon--type-style [mixin]](#carbon--type-style-mixin)

### ✅strip-unit [function]

<details>
<summary>Source code</summary>

```scss
@function strip-unit($value) {
  @return $value / ($value * 0 + 1);
}
```

</details>

- **Parameters**:

| Name     | Description       | Type     | Default value |
| -------- | ----------------- | -------- | ------------- |
| `$value` | Number with units | `Number` | —             |

- **Group**: [@carbon/type](#carbontype)
- **Returns**: `Number` Without units
- **Used by**:
  - [fluid-type-size [mixin]](#fluid-type-size-mixin)

### ✅fluid-type [mixin]

This helper includes fluid type styles for the given token value. Fluid type
means that the `font-size` is computed using `calc()` in order to be determined
by the screen size instead of a breakpoint. As a result, fluid styles should be
used with caution in fixed width contexts.

In addition, we make use of %-based line-heights so that the line-height of each
type style is computed correctly due to the dynamic nature of the `font-size`.

Most of the logic for this work comes from CSS Tricks:
https://css-tricks.com/snippets/css/fluid-typography/

<details>
<summary>Source code</summary>

```scss
@mixin fluid-type($type-styles, $breakpoints: $carbon--grid-breakpoints) {
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

| Name           | Description                     | Type  | Default value               |
| -------------- | ------------------------------- | ----- | --------------------------- |
| `$type-styles` | The value of a given type token | `Map` | —                           |
| `$breakpoints` | Custom breakpoints to use       | `Map` | `$carbon--grid-breakpoints` |

- **Group**: [@carbon/type](#carbontype)
- **Requires**:
  - [properties [mixin]](#properties-mixin)
  - [fluid-type-size [mixin]](#fluid-type-size-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
- **Used by**:
  - [carbon--type-style [mixin]](#carbon--type-style-mixin)

### ✅fluid-type-size [mixin]

Computes the fluid `font-size` for a given type style and breakpoint

<details>
<summary>Source code</summary>

```scss
@mixin fluid-type-size(
  $type-styles,
  $name,
  $breakpoints: $carbon--grid-breakpoints
) {
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
      $next-breakpoint-available: carbon--breakpoint-next(
        $next-breakpoint-available,
        $breakpoints
      );
    }
  }

  // If we have found the next available fluid breakpoint name, then we know
  // that we have values that we can use to set max-font-size and max-vw as both
  // values derive from the next breakpoint
  @if $next-fluid-breakpoint-name {
    $next-fluid-breakpoint: map-get($breakpoints, $next-fluid-breakpoint-name);
    $max-font-size: map-get(
      map-get($fluid-sizes, $next-fluid-breakpoint-name),
      font-size
    );
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

| Name           | Description                                            | Type     | Default value               |
| -------------- | ------------------------------------------------------ | -------- | --------------------------- |
| `$type-styles` | The styles for a given token                           | `Map`    | —                           |
| `$name`        | The name of the breakpoint to which we apply the fluid | `String` | —                           |
| `$breakpoints` | The breakpoints for the grid system                    | `Map`    | `$carbon--grid-breakpoints` |

- **Group**: [@carbon/type](#carbontype)
- **Requires**:
  - [carbon--breakpoint-next [function]](#carbon--breakpoint-next-function)
  - [strip-unit [function]](#strip-unit-function)
- **Used by**:
  - [fluid-type [mixin]](#fluid-type-mixin)

### ❌custom-property-prefix [variable]

<details>
<summary>Source code</summary>

```scss
$custom-property-prefix: 'cds';
```

</details>

- **Group**: [@carbon/type](#carbontype)

### ❌custom-properties [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin custom-properties() {
  @each $property, $value in $value {
    #{$property}: var(
      --#{$custom-property-prefix}-#{$name}-#{$property},
      #{$value}
    );
  }
}
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Requires**:
  - [custom-property-prefix [variable]](#custom-property-prefix-variable)
- **Used by**:
  - [carbon--type-style [mixin]](#carbon--type-style-mixin)

### ✅carbon--type-style [mixin]

Helper mixin to include the styles for a given token in any selector in your
project. Also includes an optional fluid option that will enable fluid styles
for the token if they are defined. Fluid styles will cause the token's font-size
to be computed based on the viewport size. As a result, use with caution in
fixed contexts.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--type-style(
  $name,
  $fluid: false,
  $breakpoints: $carbon--grid-breakpoints
) {
  @if not map-has-key($tokens, $name) {
    @error 'Unable to find a token with the name: `#{$name}`';
  }

  $token: map-get($tokens, $name);

  // If $fluid is set to true and the token has breakpoints defined for fluid
  // styles, delegate to the fluid-type helper for the given token
  @if $fluid == true and map-has-key($token, 'breakpoints') {
    @include fluid-type($token, $breakpoints);
  } @else {
    @if global-variable-exists('feature-flags') and
      map-get($feature-flags, 'enable-css-custom-properties')
    {
      @include custom-properties($name, $token);
    } @else {
      // Otherwise, we just include all the property declarations directly on the
      // selector
      @include properties(map-remove($token, 'breakpoints'));
    }
  }
}
```

</details>

- **Parameters**:

| Name           | Description                                     | Type      | Default value               |
| -------------- | ----------------------------------------------- | --------- | --------------------------- |
| `$name`        | The name of the token to get the styles for     | `String`  | —                           |
| `$fluid`       | Specify whether to include fluid styles for the | `Boolean` | `false`                     |
| `$breakpoints` | Provide a custom breakpoint map to use          | `Map`     | `$carbon--grid-breakpoints` |

- **Group**: [@carbon/type](#carbontype)
- **Requires**:
  - [fluid-type [mixin]](#fluid-type-mixin)
  - [custom-properties [mixin]](#custom-properties-mixin)
  - [properties [mixin]](#properties-mixin)
  - [tokens [variable]](#tokens-variable)
- **Used by**:
  - [carbon--type-classes [mixin]](#carbon--type-classes-mixin)
  - [carbon--default-type [mixin]](#carbon--default-type-mixin)
