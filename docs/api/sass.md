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
  - [✅carbon--base-font-size [variable]](#carbon--base-font-size-variable)
  - [✅carbon--rem [function]](#carbon--rem-function)
  - [✅carbon--em [function]](#carbon--em-function)
  - [✅carbon--get-column-width [function]](#carbon--get-column-width-function)
  - [✅carbon--key-height-scales [variable]](#carbon--key-height-scales-variable)
  - [✅carbon--key-height [function]](#carbon--key-height-function)
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
  - [✅carbon--fluid-spacing-01 [variable]](#carbon--fluid-spacing-01-variable)
  - [✅carbon--fluid-spacing-02 [variable]](#carbon--fluid-spacing-02-variable)
  - [✅carbon--fluid-spacing-03 [variable]](#carbon--fluid-spacing-03-variable)
  - [✅carbon--fluid-spacing-04 [variable]](#carbon--fluid-spacing-04-variable)
  - [✅carbon--fluid-spacing [variable]](#carbon--fluid-spacing-variable)
  - [✅fluid-spacing-01 [variable]](#fluid-spacing-01-variable)
  - [✅fluid-spacing-02 [variable]](#fluid-spacing-02-variable)
  - [✅fluid-spacing-03 [variable]](#fluid-spacing-03-variable)
  - [✅fluid-spacing-04 [variable]](#fluid-spacing-04-variable)
  - [✅map-deep-get [function]](#map-deep-get-function)
  - [✅carbon--key-by-index [function]](#carbon--key-by-index-function)
  - [✅last-map-item [function]](#last-map-item-function)
- [@carbon/motion](#carbonmotion)
  - [✅carbon--easings [variable]](#carbon--easings-variable)
  - [✅carbon--motion [function]](#carbon--motion-function)
  - [✅carbon--motion [mixin]](#carbon--motion-mixin)
- [@carbon/themes](#carbonthemes)
  - [✅carbon--theme [mixin]](#carbon--theme-mixin)
  - [✅carbon--theme--white [variable]](#carbon--theme--white-variable)
  - [✅carbon--theme--g10 [variable]](#carbon--theme--g10-variable)
  - [✅carbon--theme--g90 [variable]](#carbon--theme--g90-variable)
  - [✅carbon--theme--g100 [variable]](#carbon--theme--g100-variable)
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
  - [✅icon-01 [variable]](#icon-01-variable)
  - [✅icon-02 [variable]](#icon-02-variable)
  - [✅icon-03 [variable]](#icon-03-variable)
  - [✅link-01 [variable]](#link-01-variable)
  - [✅field-01 [variable]](#field-01-variable)
  - [✅field-02 [variable]](#field-02-variable)
  - [✅inverse-01 [variable]](#inverse-01-variable)
  - [✅inverse-02 [variable]](#inverse-02-variable)
  - [✅support-01 [variable]](#support-01-variable)
  - [✅support-02 [variable]](#support-02-variable)
  - [✅support-03 [variable]](#support-03-variable)
  - [✅support-04 [variable]](#support-04-variable)
  - [✅overlay-01 [variable]](#overlay-01-variable)
  - [✅focus [variable]](#focus-variable)
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
  - [✅hover-danger [variable]](#hover-danger-variable)
  - [✅active-danger [variable]](#active-danger-variable)
  - [✅hover-row [variable]](#hover-row-variable)
  - [✅visited-link [variable]](#visited-link-variable)
  - [✅disabled-01 [variable]](#disabled-01-variable)
  - [✅disabled-02 [variable]](#disabled-02-variable)
  - [✅disabled-03 [variable]](#disabled-03-variable)
  - [✅highlight [variable]](#highlight-variable)
  - [✅⚠️brand-01 [variable]](#brand-01-variable)
  - [✅⚠️brand-02 [variable]](#brand-02-variable)
  - [✅⚠️brand-03 [variable]](#brand-03-variable)
  - [✅⚠️active-01 [variable]](#active-01-variable)
  - [✅⚠️hover-field [variable]](#hover-field-variable)
- [@carbon/type](#carbontype)
  - [✅carbon--type-classes [mixin]](#carbon--type-classes-mixin)
  - [✅carbon--font-families [variable]](#carbon--font-families-variable)
  - [✅carbon--font-family [function]](#carbon--font-family-function)
  - [✅carbon--font-family [mixin]](#carbon--font-family-mixin)
  - [✅carbon--font-weights [variable]](#carbon--font-weights-variable)
  - [✅carbon--font-weight [function]](#carbon--font-weight-function)
  - [✅carbon--font-weight [mixin]](#carbon--font-weight-mixin)
  - [✅prefix [variable]](#prefix-variable)
  - [✅carbon--type-reset [mixin]](#carbon--type-reset-mixin)
  - [✅carbon--get-type-size [function]](#carbon--get-type-size-function)
  - [✅carbon--type-scale [variable]](#carbon--type-scale-variable)
  - [✅carbon--type-scale [function]](#carbon--type-scale-function)
  - [✅carbon--type-scale [mixin]](#carbon--type-scale-mixin)
  - [✅carbon--font-size [mixin]](#carbon--font-size-mixin)
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
  - [✅heading-02 [variable]](#heading-02-variable)
  - [✅productive-heading-03 [variable]](#productive-heading-03-variable)
  - [✅productive-heading-04 [variable]](#productive-heading-04-variable)
  - [✅productive-heading-05 [variable]](#productive-heading-05-variable)
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
  - [✅carbon--type-style [mixin]](#carbon--type-style-mixin)
  - [✅carbon--font-face-mono [mixin]](#carbon--font-face-mono-mixin)
  - [✅carbon--font-face-sans [mixin]](#carbon--font-face-sans-mixin)
  - [✅carbon--font-face-serif [mixin]](#carbon--font-face-serif-mixin)
  - [✅carbon--font-display [variable]](#carbon--font-display-variable)
- [accordion](#accordion)
  - [❌accordion [mixin]](#accordion-mixin)
  - [❌accordion--x [mixin]](#accordion--x-mixin)
- [breadcrumb](#breadcrumb)
  - [❌breadcrumb [mixin]](#breadcrumb-mixin)
  - [❌breadcrumb--x [mixin]](#breadcrumb--x-mixin)
- [button](#button)
  - [❌button [mixin]](#button-mixin)
  - [❌button--x [mixin]](#button--x-mixin)
  - [❌button-base [mixin]](#button-base-mixin)
  - [❌button-theme [mixin]](#button-theme-mixin)
  - [❌button-base--x [mixin]](#button-base--x-mixin)
  - [❌button-theme--x [mixin]](#button-theme--x-mixin)
- [checkbox](#checkbox)
  - [❌checkbox [mixin]](#checkbox-mixin)
  - [❌checkbox--x [mixin]](#checkbox--x-mixin)
- [code-snippet](#code-snippet)
  - [❌snippet [mixin]](#snippet-mixin)
  - [❌snippet--x [mixin]](#snippet--x-mixin)
  - [❌bx--snippet [mixin]](#bx--snippet-mixin)
  - [❌bx--snippet--x [mixin]](#bx--snippet--x-mixin)
- [combo-box](#combo-box)
  - [❌combo-box [mixin]](#combo-box-mixin)
  - [❌combo-box--x [mixin]](#combo-box--x-mixin)
- [content-switcher](#content-switcher)
  - [❌content-switcher [mixin]](#content-switcher-mixin)
  - [❌content-switcher--x [mixin]](#content-switcher--x-mixin)
- [data-table](#data-table)
  - [❌assistive-text [mixin]](#assistive-text-mixin)
  - [❌data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [❌data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [❌data-table-v2-core [mixin]](#data-table-v2-core-mixin)
  - [❌data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [❌data-table-v2-expandable [mixin]](#data-table-v2-expandable-mixin)
  - [❌data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [❌data-table-v2-sort [mixin]](#data-table-v2-sort-mixin)
  - [❌data-table-sort--x [mixin]](#data-table-sort--x-mixin)
- [date-picker](#date-picker)
  - [❌date-picker [mixin]](#date-picker-mixin)
  - [❌date-picker--x [mixin]](#date-picker--x-mixin)
- [dropdown](#dropdown)
  - [❌dropdown [mixin]](#dropdown-mixin)
  - [❌dropdown--x [mixin]](#dropdown--x-mixin)
- [feature-flags](#feature-flags)
  - [✅feature-flags [variable]](#feature-flags-variable)
  - [❌default-feature-flags [variable]](#default-feature-flags-variable)
  - [❌did-warn-diverged-feature-flags [variable]](#did-warn-diverged-feature-flags-variable)
  - [❌merge-feature-flags [function]](#merge-feature-flags-function)
  - [✅feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [✅css--font-face [variable]](#css--font-face-variable)
  - [✅css--helpers [variable]](#css--helpers-variable)
  - [✅css--body [variable]](#css--body-variable)
  - [✅css--use-layer [variable]](#css--use-layer-variable)
  - [✅css--reset [variable]](#css--reset-variable)
  - [✅css--typography [variable]](#css--typography-variable)
  - [✅css--plex [variable]](#css--plex-variable)
  - [✅⚠️css--use-experimental-grid [variable]](#css--use-experimental-grid-variable)
  - [✅⚠️css--use-experimental-grid-fallback [variable]](#css--use-experimental-grid-fallback-variable)
- [file-uploader](#file-uploader)
  - [❌file-uploader [mixin]](#file-uploader-mixin)
  - [❌file-uploader--x [mixin]](#file-uploader--x-mixin)
- [form](#form)
  - [❌form [mixin]](#form-mixin)
  - [❌form--x [mixin]](#form--x-mixin)
- [global-body](#global-body)
  - [❌css-body [mixin]](#css-body-mixin)
  - [❌css-body--x [mixin]](#css-body--x-mixin)
- [global-colors](#global-colors)
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
- [global-deprecate](#global-deprecate)
  - [✅deprecate [mixin]](#deprecate-mixin)
  - [❌deprecations--entry [variable]](#deprecations--entry-variable)
  - [❌deprecations--reasons [variable]](#deprecations--reasons-variable)
  - [❌deprecations--message [variable]](#deprecations--message-variable)
- [global-font-face](#global-font-face)
  - [✅⚠️helvetica-font-face [mixin]](#helvetica-font-face-mixin)
  - [❌⚠️unicodes [variable]](#unicodes-variable)
  - [❌⚠️families [variable]](#families-variable)
  - [❌⚠️fallbacks [variable]](#fallbacks-variable)
  - [❌⚠️weights [variable]](#weights-variable)
  - [✅⚠️check-default-font-path [mixin]](#check-default-font-path-mixin)
  - [✅⚠️plex-font-face [mixin]](#plex-font-face-mixin)
- [global-helpers](#global-helpers)
  - [✅css-helpers [mixin]](#css-helpers-mixin)
  - [✅text-overflow [mixin]](#text-overflow-mixin)
  - [✅placeholder-colors [mixin]](#placeholder-colors-mixin)
  - [✅box-shadow [mixin]](#box-shadow-mixin)
  - [✅focus-outline [mixin]](#focus-outline-mixin)
  - [✅rotate [mixin]](#rotate-mixin)
  - [✅hidden [mixin]](#hidden-mixin)
  - [✅button-reset [mixin]](#button-reset-mixin)
  - [✅skeleton [mixin]](#skeleton-mixin)
  - [✅⚠️light-ui [mixin]](#light-ui-mixin)
- [global-layer](#global-layer)
  - [❌box-shadow [variable]](#box-shadow-variable)
  - [❌box-shadow--raised [variable]](#box-shadow--raised-variable)
  - [❌box-shadow--overlay [variable]](#box-shadow--overlay-variable)
  - [❌box-shadow--sticky-nav [variable]](#box-shadow--sticky-nav-variable)
  - [❌box-shadow--temporary-nav [variable]](#box-shadow--temporary-nav-variable)
  - [❌box-shadow--pop-out [variable]](#box-shadow--pop-out-variable)
  - [❌layer-shadows [variable]](#layer-shadows-variable)
  - [✅layer [mixin]](#layer-mixin)
- [global-layout](#global-layout)
  - [❌⚠️breakpoints [variable]](#breakpoints-variable)
  - [❌⚠️padding [variable]](#padding-variable)
  - [✅⚠️padding [function]](#padding-function)
  - [✅⚠️breakpoint [mixin]](#breakpoint-mixin)
  - [✅⚠️max-breakpoint [mixin]](#max-breakpoint-mixin)
  - [✅⚠️grid-container [mixin]](#grid-container-mixin)
  - [❌z-indexes [variable]](#z-indexes-variable)
  - [✅z [function]](#z-function)
- [global-motion](#global-motion)
  - [✅carbon--ease-in [variable]](#carbon--ease-in-variable)
  - [✅carbon--ease-out [variable]](#carbon--ease-out-variable)
  - [✅carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [✅transition--base [variable]](#transition--base-variable)
  - [✅transition--expansion [variable]](#transition--expansion-variable)
  - [✅duration--fast-01 [variable]](#duration--fast-01-variable)
  - [✅duration--fast-02 [variable]](#duration--fast-02-variable)
  - [✅duration--moderate-01 [variable]](#duration--moderate-01-variable)
  - [✅duration--moderate-02 [variable]](#duration--moderate-02-variable)
  - [✅duration--slow-01 [variable]](#duration--slow-01-variable)
  - [✅duration--slow-02 [variable]](#duration--slow-02-variable)
  - [✅⚠️bx--ease-in [variable]](#bx--ease-in-variable)
  - [✅⚠️bx--ease-out [variable]](#bx--ease-out-variable)
  - [✅⚠️bx--standard-easing [variable]](#bx--standard-easing-variable)
  - [✅motion [function]](#motion-function)
  - [✅motion [mixin]](#motion-mixin)
- [global-reset](#global-reset)
  - [✅reset [mixin]](#reset-mixin)
- [global-spacing](#global-spacing)
  - [✅spacing-baseline [variable]](#spacing-baseline-variable)
  - [✅spacing-4xs [variable]](#spacing-4xs-variable)
  - [✅spacing-3xs [variable]](#spacing-3xs-variable)
  - [✅spacing-2xs [variable]](#spacing-2xs-variable)
  - [✅spacing-xs [variable]](#spacing-xs-variable)
  - [✅spacing-sm [variable]](#spacing-sm-variable)
  - [✅spacing-md [variable]](#spacing-md-variable)
  - [✅spacing-lg [variable]](#spacing-lg-variable)
  - [✅spacing-xl [variable]](#spacing-xl-variable)
  - [✅spacing-2xl [variable]](#spacing-2xl-variable)
  - [✅spacing-3xl [variable]](#spacing-3xl-variable)
  - [✅layout-2xs [variable]](#layout-2xs-variable)
  - [✅layout-xs [variable]](#layout-xs-variable)
  - [✅layout-sm [variable]](#layout-sm-variable)
  - [✅layout-md [variable]](#layout-md-variable)
  - [✅layout-lg [variable]](#layout-lg-variable)
  - [✅layout-xl [variable]](#layout-xl-variable)
  - [✅layout-2xl [variable]](#layout-2xl-variable)
- [global-themes](#global-themes)
  - [❌carbon--theme--v9 [variable]](#carbon--theme--v9-variable)
  - [❌theme [mixin]](#theme-mixin)
  - [❌theme--experimental [mixin]](#theme--experimental-mixin)
- [global-typography](#global-typography)
  - [✅⚠️typography [mixin]](#typography-mixin)
  - [✅⚠️font-family-mono [variable]](#font-family-mono-variable)
  - [✅⚠️font-family-sans-serif [variable]](#font-family-sans-serif-variable)
  - [✅⚠️font-family-serif [variable]](#font-family-serif-variable)
  - [✅⚠️font-family-helvetica [variable]](#font-family-helvetica-variable)
  - [✅⚠️base-font-size [variable]](#base-font-size-variable)
  - [✅⚠️typescale-map [variable]](#typescale-map-variable)
  - [✅⚠️typescale [mixin]](#typescale-mixin)
  - [✅⚠️helvetica [mixin]](#helvetica-mixin)
  - [✅⚠️font-family [mixin]](#font-family-mixin)
  - [✅⚠️line-height [mixin]](#line-height-mixin)
  - [✅⚠️font-smoothing [mixin]](#font-smoothing-mixin)
  - [✅⚠️letter-spacing [mixin]](#letter-spacing-mixin)
  - [✅⚠️font-size-map [variable]](#font-size-map-variable)
  - [✅⚠️font-size [mixin]](#font-size-mixin)
  - [✅type-style [mixin]](#type-style-mixin)
- [inline-loading](#inline-loading)
  - [❌inline-loading [mixin]](#inline-loading-mixin)
  - [❌inline-loading--x [mixin]](#inline-loading--x-mixin)
- [link](#link)
  - [❌link [mixin]](#link-mixin)
  - [❌link--x [mixin]](#link--x-mixin)
- [list](#list)
  - [❌lists [mixin]](#lists-mixin)
  - [❌lists--x [mixin]](#lists--x-mixin)
- [list-box](#list-box)
  - [✅list-box-width [variable]](#list-box-width-variable)
  - [✅list-box-height [variable]](#list-box-height-variable)
  - [✅list-box-inline-height [variable]](#list-box-inline-height-variable)
  - [✅list-box-menu-width [variable]](#list-box-menu-width-variable)
  - [❌listbox [mixin]](#listbox-mixin)
  - [❌listbox--x [mixin]](#listbox--x-mixin)
- [loading](#loading)
  - [❌loading [mixin]](#loading-mixin)
  - [❌loading--x [mixin]](#loading--x-mixin)
  - [✅animation\_\_loading--spin [mixin]](#animation__loading--spin-mixin)
  - [✅animation\_\_loading--stop [mixin]](#animation__loading--stop-mixin)
  - [✅loading\_\_gap [variable]](#loading__gap-variable)
  - [✅loading\_\_size [variable]](#loading__size-variable)
- [modal](#modal)
  - [❌modal--color [mixin]](#modal--color-mixin)
  - [❌modal [mixin]](#modal-mixin)
  - [❌modal--x [mixin]](#modal--x-mixin)
- [multi-select](#multi-select)
  - [❌multiselect [mixin]](#multiselect-mixin)
  - [❌multiselect--x [mixin]](#multiselect--x-mixin)
- [notification](#notification)
  - [❌inline-notifications [mixin]](#inline-notifications-mixin)
  - [❌inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [❌inline-notification--color [mixin]](#inline-notification--color-mixin)
  - [❌notification--color [mixin]](#notification--color-mixin)
  - [❌notification--experimental [mixin]](#notification--experimental-mixin)
  - [❌toast-notifications [mixin]](#toast-notifications-mixin)
  - [❌toast-notifications--x [mixin]](#toast-notifications--x-mixin)
- [number-input](#number-input)
  - [❌number-input [mixin]](#number-input-mixin)
  - [❌number-input--x [mixin]](#number-input--x-mixin)
- [overflow-menu](#overflow-menu)
  - [❌overflow-menu [mixin]](#overflow-menu-mixin)
  - [❌overflow-menu--x [mixin]](#overflow-menu--x-mixin)
- [pagination](#pagination)
  - [❌pagination [mixin]](#pagination-mixin)
  - [❌pagination--x [mixin]](#pagination--x-mixin)
- [pagination-nav](#pagination-nav)
  - [❌pseudo-underline [mixin]](#pseudo-underline-mixin)
  - [❌pagination-nav-base [mixin]](#pagination-nav-base-mixin)
  - [❌pagination-nav [mixin]](#pagination-nav-mixin)
  - [❌pagination-nav--x [mixin]](#pagination-nav--x-mixin)
- [progress-indicator](#progress-indicator)
  - [❌progress-indicator [mixin]](#progress-indicator-mixin)
  - [❌progress-indicator--x [mixin]](#progress-indicator--x-mixin)
- [radio-button](#radio-button)
  - [❌radio-button [mixin]](#radio-button-mixin)
  - [❌radio-button--experimental [mixin]](#radio-button--experimental-mixin)
- [search](#search)
  - [❌search [mixin]](#search-mixin)
  - [❌search--x [mixin]](#search--x-mixin)
- [select](#select)
  - [❌select [mixin]](#select-mixin)
  - [❌select--x [mixin]](#select--x-mixin)
- [slider](#slider)
  - [❌slider [mixin]](#slider-mixin)
  - [❌slider--x [mixin]](#slider--x-mixin)
- [structured-list](#structured-list)
  - [❌padding-td--condensed [mixin]](#padding-td--condensed-mixin)
  - [❌padding--data-structured-list [mixin]](#padding--data-structured-list-mixin)
  - [❌padding-td [mixin]](#padding-td-mixin)
  - [❌padding-th [mixin]](#padding-th-mixin)
  - [❌padding-td--condensed--x [mixin]](#padding-td--condensed--x-mixin)
  - [❌padding--data-structured-list--x [mixin]](#padding--data-structured-list--x-mixin)
  - [❌padding-th--x [mixin]](#padding-th--x-mixin)
  - [❌padding-td--x [mixin]](#padding-td--x-mixin)
  - [❌structured-list [mixin]](#structured-list-mixin)
  - [❌structured-list--x [mixin]](#structured-list--x-mixin)
- [tabs](#tabs)
  - [❌tabs [mixin]](#tabs-mixin)
  - [❌tabs--x [mixin]](#tabs--x-mixin)
- [tag](#tag)
  - [❌tags [mixin]](#tags-mixin)
  - [❌tags--x [mixin]](#tags--x-mixin)
- [text-area](#text-area)
  - [❌text-area [mixin]](#text-area-mixin)
  - [❌text-area--x [mixin]](#text-area--x-mixin)
- [text-input](#text-input)
  - [❌text-input [mixin]](#text-input-mixin)
  - [❌text-input--x [mixin]](#text-input--x-mixin)
- [tile](#tile)
  - [❌tile [mixin]](#tile-mixin)
  - [❌tile--x [mixin]](#tile--x-mixin)
- [time-picker](#time-picker)
  - [❌time-picker [mixin]](#time-picker-mixin)
  - [❌time-picker--x [mixin]](#time-picker--x-mixin)
- [toggle](#toggle)
  - [❌toggle [mixin]](#toggle-mixin)
  - [❌toggle--x [mixin]](#toggle--x-mixin)
- [toolbar](#toolbar)
  - [❌toolbar [mixin]](#toolbar-mixin)
  - [❌toolbar--x [mixin]](#toolbar--x-mixin)
- [tooltip](#tooltip)
  - [❌tooltip [mixin]](#tooltip-mixin)
  - [❌tooltip--x [mixin]](#tooltip--x-mixin)
- [ui-shell](#ui-shell)
  - [❌carbon-content [mixin]](#carbon-content-mixin)
  - [✅mini-units [function]](#mini-units-function)
  - [❌carbon-header [mixin]](#carbon-header-mixin)
  - [❌carbon-navigation [mixin]](#carbon-navigation-mixin)
  - [❌product-switcher [mixin]](#product-switcher-mixin)
  - [❌experimental-focus [mixin]](#experimental-focus-mixin)
  - [❌text-overflow [mixin]](#text-overflow-mixin)
  - [❌expanded [mixin]](#expanded-mixin)
  - [❌carbon-side-nav [mixin]](#carbon-side-nav-mixin)
  - [❌shell-header-bg-01 [variable]](#shell-header-bg-01-variable)
  - [❌shell-header-bg-02 [variable]](#shell-header-bg-02-variable)
  - [❌shell-header-bg-03 [variable]](#shell-header-bg-03-variable)
  - [❌shell-header-bg-04 [variable]](#shell-header-bg-04-variable)
  - [❌shell-header-bg-05 [variable]](#shell-header-bg-05-variable)
  - [❌shell-header-bg-06 [variable]](#shell-header-bg-06-variable)
  - [❌shell-header-text-01 [variable]](#shell-header-text-01-variable)
  - [❌shell-header-text-02 [variable]](#shell-header-text-02-variable)
  - [❌shell-header-text-03 [variable]](#shell-header-text-03-variable)
  - [❌shell-header-icon-01 [variable]](#shell-header-icon-01-variable)
  - [❌shell-header-icon-02 [variable]](#shell-header-icon-02-variable)
  - [❌shell-header-link [variable]](#shell-header-link-variable)
  - [❌shell-header-icon-selected [variable]](#shell-header-icon-selected-variable)
  - [❌shell-side-nav-bg-01 [variable]](#shell-side-nav-bg-01-variable)
  - [❌shell-side-nav-bg-02 [variable]](#shell-side-nav-bg-02-variable)
  - [❌shell-side-nav-bg-03 [variable]](#shell-side-nav-bg-03-variable)
  - [❌shell-side-nav-text-01 [variable]](#shell-side-nav-text-01-variable)
  - [❌shell-side-nav-text-02 [variable]](#shell-side-nav-text-02-variable)
  - [❌shell-side-nav-icon-01 [variable]](#shell-side-nav-icon-01-variable)
  - [❌shell-side-nav-accent-01 [variable]](#shell-side-nav-accent-01-variable)
  - [❌shell-brand-01 [variable]](#shell-brand-01-variable)
  - [❌shell-ui-02 [variable]](#shell-ui-02-variable)
  - [❌shell-ui-03 [variable]](#shell-ui-03-variable)
  - [❌unit [variable]](#unit-variable)
- [general](#general)
  - [✅spacing--columns--first [variable]](#spacing--columns--first-variable)
  - [✅spacing--columns--before [variable]](#spacing--columns--before-variable)
  - [✅spacing--cell--activity [variable]](#spacing--cell--activity-variable)
  - [✅spacing--cell--status [variable]](#spacing--cell--status-variable)
  - [✅spacing--cell-actions [variable]](#spacing--cell-actions-variable)
  - [✅input-border [variable]](#input-border-variable)
  - [✅input-label-weight [variable]](#input-label-weight-variable)
  - [✅disabled [variable]](#disabled-variable)
  - [✅disabled-background-color [variable]](#disabled-background-color-variable)
  - [✅focus [variable]](#focus-variable)
  - [✅link-visited [variable]](#link-visited-variable)
  - [✅link-inverse-color [variable]](#link-inverse-color-variable)
  - [✅tooltip-background-color [variable]](#tooltip-background-color-variable)
  - [✅button-font-weight [variable]](#button-font-weight-variable)
  - [✅button-font-size [variable]](#button-font-size-variable)
  - [✅button-border-radius [variable]](#button-border-radius-variable)
  - [✅button-height [variable]](#button-height-variable)
  - [✅button-padding [variable]](#button-padding-variable)
  - [✅button-padding-sm [variable]](#button-padding-sm-variable)
  - [✅button-padding-lg [variable]](#button-padding-lg-variable)
  - [✅button-border-width [variable]](#button-border-width-variable)
  - [✅button-outline-width [variable]](#button-outline-width-variable)
  - [✅button-outline-offset [variable]](#button-outline-offset-variable)
  - [✅button-outline [variable]](#button-outline-variable)
  - [✅accordion-flex-direction [variable]](#accordion-flex-direction-variable)
  - [✅accordion-justify-content [variable]](#accordion-justify-content-variable)
  - [✅accordion-arrow-margin [variable]](#accordion-arrow-margin-variable)
  - [✅accordion-title-margin [variable]](#accordion-title-margin-variable)
  - [✅accordion-content-padding [variable]](#accordion-content-padding-variable)
  - [✅checkbox-border-width [variable]](#checkbox-border-width-variable)
  - [✅snippet-background-color [variable]](#snippet-background-color-variable)
  - [✅snippet-border-color [variable]](#snippet-border-color-variable)
  - [✅content-switcher-border-radius [variable]](#content-switcher-border-radius-variable)
  - [✅content-switcher-option-border [variable]](#content-switcher-option-border-variable)
  - [✅content-switcher-divider [variable]](#content-switcher-divider-variable)
  - [✅data-table-heading-transform [variable]](#data-table-heading-transform-variable)
  - [✅data-table-heading-border-bottom [variable]](#data-table-heading-border-bottom-variable)
  - [✅data-table-row-height [variable]](#data-table-row-height-variable)
  - [✅data-table-zebra-color [variable]](#data-table-zebra-color-variable)
  - [✅data-table-column-hover [variable]](#data-table-column-hover-variable)
  - [✅date-picker-in-range-background-color [variable]](#date-picker-in-range-background-color-variable)
  - [✅modal-border-top [variable]](#modal-border-top-variable)
  - [✅modal-footer-background-color [variable]](#modal-footer-background-color-variable)
  - [✅notification-info-background-color [variable]](#notification-info-background-color-variable)
  - [✅notification-error-background-color [variable]](#notification-error-background-color-variable)
  - [✅notification-warning-background-color [variable]](#notification-warning-background-color-variable)
  - [✅notification-success-background-color [variable]](#notification-success-background-color-variable)
  - [✅progress-indicator-bar-width [variable]](#progress-indicator-bar-width-variable)
  - [✅progress-indicator-stroke-width [variable]](#progress-indicator-stroke-width-variable)
  - [✅progress-indicator-line-offset [variable]](#progress-indicator-line-offset-variable)
  - [✅copy-active [variable]](#copy-active-variable)
  - [✅copy-btn-feedback [variable]](#copy-btn-feedback-variable)
  - [✅radio-border-width [variable]](#radio-border-width-variable)
  - [✅structured-list-padding [variable]](#structured-list-padding-variable)
  - [✅structured-list-text-transform [variable]](#structured-list-text-transform-variable)
  - [✅tab-underline-color [variable]](#tab-underline-color-variable)
  - [✅tab-underline-color-hover [variable]](#tab-underline-color-hover-variable)
  - [✅tab-text-disabled [variable]](#tab-text-disabled-variable)
  - [✅tab-underline-disabled [variable]](#tab-underline-disabled-variable)
  - [✅skeleton [variable]](#skeleton-variable)
  - [✅⚠️hover-field [variable]](#hover-field-variable)
  - [✅⚠️active-01 [variable]](#active-01-variable)
  - [✅⚠️nav-01 [variable]](#nav-01-variable)
  - [✅⚠️nav-02 [variable]](#nav-02-variable)
  - [✅⚠️nav-03 [variable]](#nav-03-variable)
  - [✅⚠️nav-04 [variable]](#nav-04-variable)
  - [✅⚠️nav-05 [variable]](#nav-05-variable)
  - [✅⚠️nav-06 [variable]](#nav-06-variable)
  - [✅⚠️nav-07 [variable]](#nav-07-variable)
  - [✅⚠️nav-08 [variable]](#nav-08-variable)
  - [✅⚠️rem [function]](#rem-function)
  - [✅⚠️em [function]](#em-function)
  - [✅prefix [variable]](#prefix-variable)

<!-- tocstop -->

## @carbon/colors

### ✅⚠️ibm--colors [mixin]

Define color variables

<details>
<summary>Source code</summary>

```scss
@mixin ibm--colors() {
  $ibm-color__black-100: #000000 !default !global;
  $ibm-color__blue-10: #edf4ff !default !global;
  $ibm-color__blue-20: #c9deff !default !global;
  $ibm-color__blue-30: #97c1ff !default !global;
  $ibm-color__blue-40: #6ea6ff !default !global;
  $ibm-color__blue-50: #408bfc !default !global;
  $ibm-color__blue-60: #0062ff !default !global;
  $ibm-color__blue-70: #054ada !default !global;
  $ibm-color__blue-80: #0530ad !default !global;
  $ibm-color__blue-90: #061f80 !default !global;
  $ibm-color__blue-100: #051243 !default !global;
  $ibm-color__cool-gray-10: #f2f4f8 !default !global;
  $ibm-color__cool-gray-20: #d5d9e0 !default !global;
  $ibm-color__cool-gray-30: #b9bfc7 !default !global;
  $ibm-color__cool-gray-40: #9fa5ad !default !global;
  $ibm-color__cool-gray-50: #868d95 !default !global;
  $ibm-color__cool-gray-60: #697077 !default !global;
  $ibm-color__cool-gray-70: #50565b !default !global;
  $ibm-color__cool-gray-80: #373d42 !default !global;
  $ibm-color__cool-gray-90: #242a2e !default !global;
  $ibm-color__cool-gray-100: #13171a !default !global;
  $ibm-color__cyan-10: #e3f6ff !default !global;
  $ibm-color__cyan-20: #b3e6ff !default !global;
  $ibm-color__cyan-30: #6ccaff !default !global;
  $ibm-color__cyan-40: #30b0ff !default !global;
  $ibm-color__cyan-50: #1191e6 !default !global;
  $ibm-color__cyan-60: #0072c3 !default !global;
  $ibm-color__cyan-70: #0058a1 !default !global;
  $ibm-color__cyan-80: #003d73 !default !global;
  $ibm-color__cyan-90: #002b50 !default !global;
  $ibm-color__cyan-100: #07192b !default !global;
  $ibm-color__gray-10: #f3f3f3 !default !global;
  $ibm-color__gray-20: #dcdcdc !default !global;
  $ibm-color__gray-30: #bebebe !default !global;
  $ibm-color__gray-40: #a4a4a4 !default !global;
  $ibm-color__gray-50: #8c8c8c !default !global;
  $ibm-color__gray-60: #6f6f6f !default !global;
  $ibm-color__gray-70: #565656 !default !global;
  $ibm-color__gray-80: #3d3d3d !default !global;
  $ibm-color__gray-90: #282828 !default !global;
  $ibm-color__gray-100: #171717 !default !global;
  $ibm-color__green-10: #dafbe4 !default !global;
  $ibm-color__green-20: #9deeb2 !default !global;
  $ibm-color__green-30: #56d679 !default !global;
  $ibm-color__green-40: #3dbb61 !default !global;
  $ibm-color__green-50: #24a148 !default !global;
  $ibm-color__green-60: #198038 !default !global;
  $ibm-color__green-70: #10642a !default !global;
  $ibm-color__green-80: #054719 !default !global;
  $ibm-color__green-90: #01330f !default !global;
  $ibm-color__green-100: #081b09 !default !global;
  $ibm-color__magenta-10: #fff0f6 !default !global;
  $ibm-color__magenta-20: #ffcfe1 !default !global;
  $ibm-color__magenta-30: #ffa0c2 !default !global;
  $ibm-color__magenta-40: #fa75a6 !default !global;
  $ibm-color__magenta-50: #ee538b !default !global;
  $ibm-color__magenta-60: #d12765 !default !global;
  $ibm-color__magenta-70: #a11950 !default !global;
  $ibm-color__magenta-80: #760a3a !default !global;
  $ibm-color__magenta-90: #57002b !default !global;
  $ibm-color__magenta-100: #2a0a16 !default !global;
  $ibm-color__orange-40: #fc7b1e !default !global;
  $ibm-color__purple-10: #f7f1ff !default !global;
  $ibm-color__purple-20: #e6d6ff !default !global;
  $ibm-color__purple-30: #d0b0ff !default !global;
  $ibm-color__purple-40: #bb8eff !default !global;
  $ibm-color__purple-50: #a66efa !default !global;
  $ibm-color__purple-60: #8a3ffc !default !global;
  $ibm-color__purple-70: #6e32c9 !default !global;
  $ibm-color__purple-80: #4f2196 !default !global;
  $ibm-color__purple-90: #38146b !default !global;
  $ibm-color__purple-100: #1e1033 !default !global;
  $ibm-color__red-10: #fff0f1 !default !global;
  $ibm-color__red-20: #fcd0d3 !default !global;
  $ibm-color__red-30: #ffa4a9 !default !global;
  $ibm-color__red-40: #ff767c !default !global;
  $ibm-color__red-50: #fb4b53 !default !global;
  $ibm-color__red-60: #da1e28 !default !global;
  $ibm-color__red-70: #a51920 !default !global;
  $ibm-color__red-80: #750e13 !default !global;
  $ibm-color__red-90: #570408 !default !global;
  $ibm-color__red-100: #2c080a !default !global;
  $ibm-color__teal-10: #dbfbfb !default !global;
  $ibm-color__teal-20: #92eeee !default !global;
  $ibm-color__teal-30: #20d5d2 !default !global;
  $ibm-color__teal-40: #00bab6 !default !global;
  $ibm-color__teal-50: #009c98 !default !global;
  $ibm-color__teal-60: #007d79 !default !global;
  $ibm-color__teal-70: #006161 !default !global;
  $ibm-color__teal-80: #004548 !default !global;
  $ibm-color__teal-90: #003137 !default !global;
  $ibm-color__teal-100: #081a1c !default !global;
  $ibm-color__warm-gray-10: #f7f3f1 !default !global;
  $ibm-color__warm-gray-20: #e0dbda !default !global;
  $ibm-color__warm-gray-30: #c1bcbb !default !global;
  $ibm-color__warm-gray-40: #a7a2a2 !default !global;
  $ibm-color__warm-gray-50: #8f8b8b !default !global;
  $ibm-color__warm-gray-60: #726e6e !default !global;
  $ibm-color__warm-gray-70: #595555 !default !global;
  $ibm-color__warm-gray-80: #403c3c !default !global;
  $ibm-color__warm-gray-90: #2b2828 !default !global;
  $ibm-color__warm-gray-100: #1a1717 !default !global;
  $ibm-color__white-0: #ffffff !default !global;
  $ibm-color__yellow-20: #fdd13a !default !global;

  $ibm-color-map: (
    'black': (
      100: #000000,
    ),
    'blue': (
      10: #edf4ff,
      20: #c9deff,
      30: #97c1ff,
      40: #6ea6ff,
      50: #408bfc,
      60: #0062ff,
      70: #054ada,
      80: #0530ad,
      90: #061f80,
      100: #051243,
    ),
    'coolGray': (
      10: #f2f4f8,
      20: #d5d9e0,
      30: #b9bfc7,
      40: #9fa5ad,
      50: #868d95,
      60: #697077,
      70: #50565b,
      80: #373d42,
      90: #242a2e,
      100: #13171a,
    ),
    'cyan': (
      10: #e3f6ff,
      20: #b3e6ff,
      30: #6ccaff,
      40: #30b0ff,
      50: #1191e6,
      60: #0072c3,
      70: #0058a1,
      80: #003d73,
      90: #002b50,
      100: #07192b,
    ),
    'gray': (
      10: #f3f3f3,
      20: #dcdcdc,
      30: #bebebe,
      40: #a4a4a4,
      50: #8c8c8c,
      60: #6f6f6f,
      70: #565656,
      80: #3d3d3d,
      90: #282828,
      100: #171717,
    ),
    'green': (
      10: #dafbe4,
      20: #9deeb2,
      30: #56d679,
      40: #3dbb61,
      50: #24a148,
      60: #198038,
      70: #10642a,
      80: #054719,
      90: #01330f,
      100: #081b09,
    ),
    'magenta': (
      10: #fff0f6,
      20: #ffcfe1,
      30: #ffa0c2,
      40: #fa75a6,
      50: #ee538b,
      60: #d12765,
      70: #a11950,
      80: #760a3a,
      90: #57002b,
      100: #2a0a16,
    ),
    'orange': (
      40: #fc7b1e,
    ),
    'purple': (
      10: #f7f1ff,
      20: #e6d6ff,
      30: #d0b0ff,
      40: #bb8eff,
      50: #a66efa,
      60: #8a3ffc,
      70: #6e32c9,
      80: #4f2196,
      90: #38146b,
      100: #1e1033,
    ),
    'red': (
      10: #fff0f1,
      20: #fcd0d3,
      30: #ffa4a9,
      40: #ff767c,
      50: #fb4b53,
      60: #da1e28,
      70: #a51920,
      80: #750e13,
      90: #570408,
      100: #2c080a,
    ),
    'teal': (
      10: #dbfbfb,
      20: #92eeee,
      30: #20d5d2,
      40: #00bab6,
      50: #009c98,
      60: #007d79,
      70: #006161,
      80: #004548,
      90: #003137,
      100: #081a1c,
    ),
    'warmGray': (
      10: #f7f3f1,
      20: #e0dbda,
      30: #c1bcbb,
      40: #a7a2a2,
      50: #8f8b8b,
      60: #726e6e,
      70: #595555,
      80: #403c3c,
      90: #2b2828,
      100: #1a1717,
    ),
    'white': (
      0: #ffffff,
    ),
    'yellow': (
      20: #fdd13a,
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
  $carbon--blue-10: #edf4ff !default !global;
  $carbon--blue-20: #c9deff !default !global;
  $carbon--blue-30: #97c1ff !default !global;
  $carbon--blue-40: #6ea6ff !default !global;
  $carbon--blue-50: #408bfc !default !global;
  $carbon--blue-60: #0062ff !default !global;
  $carbon--blue-70: #054ada !default !global;
  $carbon--blue-80: #0530ad !default !global;
  $carbon--blue-90: #061f80 !default !global;
  $carbon--blue-100: #051243 !default !global;
  $carbon--cool-gray-10: #f2f4f8 !default !global;
  $carbon--cool-gray-20: #d5d9e0 !default !global;
  $carbon--cool-gray-30: #b9bfc7 !default !global;
  $carbon--cool-gray-40: #9fa5ad !default !global;
  $carbon--cool-gray-50: #868d95 !default !global;
  $carbon--cool-gray-60: #697077 !default !global;
  $carbon--cool-gray-70: #50565b !default !global;
  $carbon--cool-gray-80: #373d42 !default !global;
  $carbon--cool-gray-90: #242a2e !default !global;
  $carbon--cool-gray-100: #13171a !default !global;
  $carbon--cyan-10: #e3f6ff !default !global;
  $carbon--cyan-20: #b3e6ff !default !global;
  $carbon--cyan-30: #6ccaff !default !global;
  $carbon--cyan-40: #30b0ff !default !global;
  $carbon--cyan-50: #1191e6 !default !global;
  $carbon--cyan-60: #0072c3 !default !global;
  $carbon--cyan-70: #0058a1 !default !global;
  $carbon--cyan-80: #003d73 !default !global;
  $carbon--cyan-90: #002b50 !default !global;
  $carbon--cyan-100: #07192b !default !global;
  $carbon--gray-10: #f3f3f3 !default !global;
  $carbon--gray-20: #dcdcdc !default !global;
  $carbon--gray-30: #bebebe !default !global;
  $carbon--gray-40: #a4a4a4 !default !global;
  $carbon--gray-50: #8c8c8c !default !global;
  $carbon--gray-60: #6f6f6f !default !global;
  $carbon--gray-70: #565656 !default !global;
  $carbon--gray-80: #3d3d3d !default !global;
  $carbon--gray-90: #282828 !default !global;
  $carbon--gray-100: #171717 !default !global;
  $carbon--green-10: #dafbe4 !default !global;
  $carbon--green-20: #9deeb2 !default !global;
  $carbon--green-30: #56d679 !default !global;
  $carbon--green-40: #3dbb61 !default !global;
  $carbon--green-50: #24a148 !default !global;
  $carbon--green-60: #198038 !default !global;
  $carbon--green-70: #10642a !default !global;
  $carbon--green-80: #054719 !default !global;
  $carbon--green-90: #01330f !default !global;
  $carbon--green-100: #081b09 !default !global;
  $carbon--magenta-10: #fff0f6 !default !global;
  $carbon--magenta-20: #ffcfe1 !default !global;
  $carbon--magenta-30: #ffa0c2 !default !global;
  $carbon--magenta-40: #fa75a6 !default !global;
  $carbon--magenta-50: #ee538b !default !global;
  $carbon--magenta-60: #d12765 !default !global;
  $carbon--magenta-70: #a11950 !default !global;
  $carbon--magenta-80: #760a3a !default !global;
  $carbon--magenta-90: #57002b !default !global;
  $carbon--magenta-100: #2a0a16 !default !global;
  $carbon--orange-40: #fc7b1e !default !global;
  $carbon--purple-10: #f7f1ff !default !global;
  $carbon--purple-20: #e6d6ff !default !global;
  $carbon--purple-30: #d0b0ff !default !global;
  $carbon--purple-40: #bb8eff !default !global;
  $carbon--purple-50: #a66efa !default !global;
  $carbon--purple-60: #8a3ffc !default !global;
  $carbon--purple-70: #6e32c9 !default !global;
  $carbon--purple-80: #4f2196 !default !global;
  $carbon--purple-90: #38146b !default !global;
  $carbon--purple-100: #1e1033 !default !global;
  $carbon--red-10: #fff0f1 !default !global;
  $carbon--red-20: #fcd0d3 !default !global;
  $carbon--red-30: #ffa4a9 !default !global;
  $carbon--red-40: #ff767c !default !global;
  $carbon--red-50: #fb4b53 !default !global;
  $carbon--red-60: #da1e28 !default !global;
  $carbon--red-70: #a51920 !default !global;
  $carbon--red-80: #750e13 !default !global;
  $carbon--red-90: #570408 !default !global;
  $carbon--red-100: #2c080a !default !global;
  $carbon--teal-10: #dbfbfb !default !global;
  $carbon--teal-20: #92eeee !default !global;
  $carbon--teal-30: #20d5d2 !default !global;
  $carbon--teal-40: #00bab6 !default !global;
  $carbon--teal-50: #009c98 !default !global;
  $carbon--teal-60: #007d79 !default !global;
  $carbon--teal-70: #006161 !default !global;
  $carbon--teal-80: #004548 !default !global;
  $carbon--teal-90: #003137 !default !global;
  $carbon--teal-100: #081a1c !default !global;
  $carbon--warm-gray-10: #f7f3f1 !default !global;
  $carbon--warm-gray-20: #e0dbda !default !global;
  $carbon--warm-gray-30: #c1bcbb !default !global;
  $carbon--warm-gray-40: #a7a2a2 !default !global;
  $carbon--warm-gray-50: #8f8b8b !default !global;
  $carbon--warm-gray-60: #726e6e !default !global;
  $carbon--warm-gray-70: #595555 !default !global;
  $carbon--warm-gray-80: #403c3c !default !global;
  $carbon--warm-gray-90: #2b2828 !default !global;
  $carbon--warm-gray-100: #1a1717 !default !global;
  $carbon--white-0: #ffffff !default !global;
  $carbon--yellow-20: #fdd13a !default !global;
  $black-100: #000000 !default !global;
  $blue-10: #edf4ff !default !global;
  $blue-20: #c9deff !default !global;
  $blue-30: #97c1ff !default !global;
  $blue-40: #6ea6ff !default !global;
  $blue-50: #408bfc !default !global;
  $blue-60: #0062ff !default !global;
  $blue-70: #054ada !default !global;
  $blue-80: #0530ad !default !global;
  $blue-90: #061f80 !default !global;
  $blue-100: #051243 !default !global;
  $cool-gray-10: #f2f4f8 !default !global;
  $cool-gray-20: #d5d9e0 !default !global;
  $cool-gray-30: #b9bfc7 !default !global;
  $cool-gray-40: #9fa5ad !default !global;
  $cool-gray-50: #868d95 !default !global;
  $cool-gray-60: #697077 !default !global;
  $cool-gray-70: #50565b !default !global;
  $cool-gray-80: #373d42 !default !global;
  $cool-gray-90: #242a2e !default !global;
  $cool-gray-100: #13171a !default !global;
  $cyan-10: #e3f6ff !default !global;
  $cyan-20: #b3e6ff !default !global;
  $cyan-30: #6ccaff !default !global;
  $cyan-40: #30b0ff !default !global;
  $cyan-50: #1191e6 !default !global;
  $cyan-60: #0072c3 !default !global;
  $cyan-70: #0058a1 !default !global;
  $cyan-80: #003d73 !default !global;
  $cyan-90: #002b50 !default !global;
  $cyan-100: #07192b !default !global;
  $gray-10: #f3f3f3 !default !global;
  $gray-20: #dcdcdc !default !global;
  $gray-30: #bebebe !default !global;
  $gray-40: #a4a4a4 !default !global;
  $gray-50: #8c8c8c !default !global;
  $gray-60: #6f6f6f !default !global;
  $gray-70: #565656 !default !global;
  $gray-80: #3d3d3d !default !global;
  $gray-90: #282828 !default !global;
  $gray-100: #171717 !default !global;
  $green-10: #dafbe4 !default !global;
  $green-20: #9deeb2 !default !global;
  $green-30: #56d679 !default !global;
  $green-40: #3dbb61 !default !global;
  $green-50: #24a148 !default !global;
  $green-60: #198038 !default !global;
  $green-70: #10642a !default !global;
  $green-80: #054719 !default !global;
  $green-90: #01330f !default !global;
  $green-100: #081b09 !default !global;
  $magenta-10: #fff0f6 !default !global;
  $magenta-20: #ffcfe1 !default !global;
  $magenta-30: #ffa0c2 !default !global;
  $magenta-40: #fa75a6 !default !global;
  $magenta-50: #ee538b !default !global;
  $magenta-60: #d12765 !default !global;
  $magenta-70: #a11950 !default !global;
  $magenta-80: #760a3a !default !global;
  $magenta-90: #57002b !default !global;
  $magenta-100: #2a0a16 !default !global;
  $orange-40: #fc7b1e !default !global;
  $purple-10: #f7f1ff !default !global;
  $purple-20: #e6d6ff !default !global;
  $purple-30: #d0b0ff !default !global;
  $purple-40: #bb8eff !default !global;
  $purple-50: #a66efa !default !global;
  $purple-60: #8a3ffc !default !global;
  $purple-70: #6e32c9 !default !global;
  $purple-80: #4f2196 !default !global;
  $purple-90: #38146b !default !global;
  $purple-100: #1e1033 !default !global;
  $red-10: #fff0f1 !default !global;
  $red-20: #fcd0d3 !default !global;
  $red-30: #ffa4a9 !default !global;
  $red-40: #ff767c !default !global;
  $red-50: #fb4b53 !default !global;
  $red-60: #da1e28 !default !global;
  $red-70: #a51920 !default !global;
  $red-80: #750e13 !default !global;
  $red-90: #570408 !default !global;
  $red-100: #2c080a !default !global;
  $teal-10: #dbfbfb !default !global;
  $teal-20: #92eeee !default !global;
  $teal-30: #20d5d2 !default !global;
  $teal-40: #00bab6 !default !global;
  $teal-50: #009c98 !default !global;
  $teal-60: #007d79 !default !global;
  $teal-70: #006161 !default !global;
  $teal-80: #004548 !default !global;
  $teal-90: #003137 !default !global;
  $teal-100: #081a1c !default !global;
  $warm-gray-10: #f7f3f1 !default !global;
  $warm-gray-20: #e0dbda !default !global;
  $warm-gray-30: #c1bcbb !default !global;
  $warm-gray-40: #a7a2a2 !default !global;
  $warm-gray-50: #8f8b8b !default !global;
  $warm-gray-60: #726e6e !default !global;
  $warm-gray-70: #595555 !default !global;
  $warm-gray-80: #403c3c !default !global;
  $warm-gray-90: #2b2828 !default !global;
  $warm-gray-100: #1a1717 !default !global;
  $white-0: #ffffff !default !global;
  $yellow-20: #fdd13a !default !global;
  $carbon--colors: (
    'black': (
      100: #000000,
    ),
    'blue': (
      10: #edf4ff,
      20: #c9deff,
      30: #97c1ff,
      40: #6ea6ff,
      50: #408bfc,
      60: #0062ff,
      70: #054ada,
      80: #0530ad,
      90: #061f80,
      100: #051243,
    ),
    'coolGray': (
      10: #f2f4f8,
      20: #d5d9e0,
      30: #b9bfc7,
      40: #9fa5ad,
      50: #868d95,
      60: #697077,
      70: #50565b,
      80: #373d42,
      90: #242a2e,
      100: #13171a,
    ),
    'cyan': (
      10: #e3f6ff,
      20: #b3e6ff,
      30: #6ccaff,
      40: #30b0ff,
      50: #1191e6,
      60: #0072c3,
      70: #0058a1,
      80: #003d73,
      90: #002b50,
      100: #07192b,
    ),
    'gray': (
      10: #f3f3f3,
      20: #dcdcdc,
      30: #bebebe,
      40: #a4a4a4,
      50: #8c8c8c,
      60: #6f6f6f,
      70: #565656,
      80: #3d3d3d,
      90: #282828,
      100: #171717,
    ),
    'green': (
      10: #dafbe4,
      20: #9deeb2,
      30: #56d679,
      40: #3dbb61,
      50: #24a148,
      60: #198038,
      70: #10642a,
      80: #054719,
      90: #01330f,
      100: #081b09,
    ),
    'magenta': (
      10: #fff0f6,
      20: #ffcfe1,
      30: #ffa0c2,
      40: #fa75a6,
      50: #ee538b,
      60: #d12765,
      70: #a11950,
      80: #760a3a,
      90: #57002b,
      100: #2a0a16,
    ),
    'orange': (
      40: #fc7b1e,
    ),
    'purple': (
      10: #f7f1ff,
      20: #e6d6ff,
      30: #d0b0ff,
      40: #bb8eff,
      50: #a66efa,
      60: #8a3ffc,
      70: #6e32c9,
      80: #4f2196,
      90: #38146b,
      100: #1e1033,
    ),
    'red': (
      10: #fff0f1,
      20: #fcd0d3,
      30: #ffa4a9,
      40: #ff767c,
      50: #fb4b53,
      60: #da1e28,
      70: #a51920,
      80: #750e13,
      90: #570408,
      100: #2c080a,
    ),
    'teal': (
      10: #dbfbfb,
      20: #92eeee,
      30: #20d5d2,
      40: #00bab6,
      50: #009c98,
      60: #007d79,
      70: #006161,
      80: #004548,
      90: #003137,
      100: #081a1c,
    ),
    'warmGray': (
      10: #f7f3f1,
      20: #e0dbda,
      30: #c1bcbb,
      40: #a7a2a2,
      50: #8f8b8b,
      60: #726e6e,
      70: #595555,
      80: #403c3c,
      90: #2b2828,
      100: #1a1717,
    ),
    'white': (
      0: #ffffff,
    ),
    'yellow': (
      20: #fdd13a,
    ),
  ) !default !global;
}
```

</details>

- **Group**: [@carbon/colors](#carboncolors)

## @carbon/grid

### ✅carbon--12-column-grid [variable]

Overrides `$carbon--grid-breakpoints` to use a 12 column grid instead of the default 16

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

Used to initialize the default properties for a column class, most notably
for setting width and default gutters when a column's breakpoint has not been
hit yet.

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
  - [breakpoints [variable]](#breakpoints-variable)
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

The aspect ratios that are used to generate corresponding aspect ratio
classes in code

<details>
<summary>Source code</summary>

```scss
$carbon--aspect-ratios: ((16, 9), (2, 1), (4, 3), (1, 1));
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
  - [breakpoints [variable]](#breakpoints-variable)
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
  - [breakpoints [variable]](#breakpoints-variable)
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
  - [breakpoints [variable]](#breakpoints-variable)

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
  - [breakpoints [variable]](#breakpoints-variable)

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
  - [carbon--type-classes [mixin]](#carbon--type-classes-mixin)
  - [accordion [mixin]](#accordion-mixin)
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [breadcrumb [mixin]](#breadcrumb-mixin)
  - [breadcrumb--x [mixin]](#breadcrumb--x-mixin)
  - [button [mixin]](#button-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [button-base [mixin]](#button-base-mixin)
  - [button-theme [mixin]](#button-theme-mixin)
  - [button-base--x [mixin]](#button-base--x-mixin)
  - [button-theme--x [mixin]](#button-theme--x-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [checkbox--x [mixin]](#checkbox--x-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [combo-box [mixin]](#combo-box-mixin)
  - [combo-box--x [mixin]](#combo-box--x-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-v2-core [mixin]](#data-table-v2-core-mixin)
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [data-table-v2-expandable [mixin]](#data-table-v2-expandable-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [data-table-v2-sort [mixin]](#data-table-v2-sort-mixin)
  - [data-table-sort--x [mixin]](#data-table-sort--x-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [form [mixin]](#form-mixin)
  - [form--x [mixin]](#form--x-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)
  - [light-ui [mixin]](#light-ui-mixin)
  - [typography [mixin]](#typography-mixin)
  - [inline-loading [mixin]](#inline-loading-mixin)
  - [inline-loading--x [mixin]](#inline-loading--x-mixin)
  - [link [mixin]](#link-mixin)
  - [link--x [mixin]](#link--x-mixin)
  - [lists [mixin]](#lists-mixin)
  - [lists--x [mixin]](#lists--x-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [loading [mixin]](#loading-mixin)
  - [loading--x [mixin]](#loading--x-mixin)
  - [modal--color [mixin]](#modal--color-mixin)
  - [modal [mixin]](#modal-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [multiselect [mixin]](#multiselect-mixin)
  - [multiselect--x [mixin]](#multiselect--x-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [inline-notification--color [mixin]](#inline-notification--color-mixin)
  - [notification--experimental [mixin]](#notification--experimental-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pagination--x [mixin]](#pagination--x-mixin)
  - [pseudo-underline [mixin]](#pseudo-underline-mixin)
  - [pagination-nav-base [mixin]](#pagination-nav-base-mixin)
  - [pagination-nav [mixin]](#pagination-nav-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [radio-button--experimental [mixin]](#radio-button--experimental-mixin)
  - [search [mixin]](#search-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [select [mixin]](#select-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [slider [mixin]](#slider-mixin)
  - [slider--x [mixin]](#slider--x-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
  - [structured-list--x [mixin]](#structured-list--x-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [tags [mixin]](#tags-mixin)
  - [tags--x [mixin]](#tags--x-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)
  - [tile [mixin]](#tile-mixin)
  - [tile--x [mixin]](#tile--x-mixin)
  - [time-picker [mixin]](#time-picker-mixin)
  - [time-picker--x [mixin]](#time-picker--x-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [toggle--x [mixin]](#toggle--x-mixin)
  - [toolbar [mixin]](#toolbar-mixin)
  - [toolbar--x [mixin]](#toolbar--x-mixin)
  - [tooltip [mixin]](#tooltip-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)
  - [carbon-content [mixin]](#carbon-content-mixin)
  - [carbon-header [mixin]](#carbon-header-mixin)
  - [carbon-navigation [mixin]](#carbon-navigation-mixin)
  - [product-switcher [mixin]](#product-switcher-mixin)
  - [expanded [mixin]](#expanded-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

## @carbon/icons

### ✅carbon--icons [mixin]

Makes SVGs accessible in high contrast mode

<details>
<summary>Source code</summary>

```scss
@mixin carbon--icons() {
  @media screen and (-ms-high-contract: active) {
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

Module export mixin that helps making sure a module is imported once and only once

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
    margin: carbon--rem(16px),
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
- **Requires**:
  - [breakpoints [variable]](#breakpoints-variable)
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
  - [breakpoints [variable]](#breakpoints-variable)
- **Used by**:
  - [carbon--largest-breakpoint [mixin]](#carbon--largest-breakpoint-mixin)

### ✅carbon--breakpoint-infix [function]

Get the infix for a given breakpoint in a list of breakpoints. Usesful for generate the size part in a selector, for example: `.prefix--col-sm-2`.

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
| `$name`        | —                                              | `String \| Number` | —                           |
| `$breakpoints` | A map of breakpoints where the key is the name | `Map`              | `$carbon--grid-breakpoints` |

- **Group**: [@carbon/layout](#carbonlayout)
- **Requires**:
  - [carbon--is-smallest-breakpoint [function]](#carbon--is-smallest-breakpoint-function)
  - [breakpoints [variable]](#breakpoints-variable)
- **Used by**:
  - [carbon--breakpoint-between [mixin]](#carbon--breakpoint-between-mixin)
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [max-breakpoint [mixin]](#max-breakpoint-mixin)

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
  - [breakpoints [variable]](#breakpoints-variable)

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
  - [breakpoints [variable]](#breakpoints-variable)
- **Used by**:
  - [carbon--make-grid-columns [mixin]](#carbon--make-grid-columns-mixin)
  - [carbon--make-container [mixin]](#carbon--make-container-mixin)
  - [carbon--make-container-max-widths [mixin]](#carbon--make-container-max-widths-mixin)
  - [carbon--largest-breakpoint [mixin]](#carbon--largest-breakpoint-mixin)
  - [fluid-type [mixin]](#fluid-type-mixin)
  - [breadcrumb--x [mixin]](#breadcrumb--x-mixin)
  - [breakpoint [mixin]](#breakpoint-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)
  - [pagination--x [mixin]](#pagination--x-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)

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
  - [structured-list--x [mixin]](#structured-list--x-mixin)

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

| Name  | Description         | Type     | Default value |
| ----- | ------------------- | -------- | ------------- |
| `$px` | Number with px unit | `Number` | —             |

- **Group**: [@carbon/layout](#carbonlayout)
- **Returns**: `Number` Number with em unit
- **Requires**:
  - [carbon--base-font-size [variable]](#carbon--base-font-size-variable)

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
- **Requires**:
  - [breakpoints [variable]](#breakpoints-variable)

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
- **Used by**:
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [multiselect--x [mixin]](#multiselect--x-mixin)

### ✅carbon--spacing-01 [variable]

0.125rem (2px) spacing with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-01: carbon--mini-units(0.25);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-01`
- **Used by**:
  - [time-picker--x [mixin]](#time-picker--x-mixin)

### ✅carbon--spacing-02 [variable]

0.25rem (4px) spacing with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-02: carbon--mini-units(0.5);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-02`
- **Used by**:
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [form--x [mixin]](#form--x-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [pseudo-underline [mixin]](#pseudo-underline-mixin)
  - [tags--x [mixin]](#tags--x-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)

### ✅carbon--spacing-03 [variable]

0.5rem (8px) spacing with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-03: carbon--mini-units(1);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-03`
- **Used by**:
  - [breadcrumb--x [mixin]](#breadcrumb--x-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [form--x [mixin]](#form--x-mixin)
  - [lists--x [mixin]](#lists--x-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [multiselect--x [mixin]](#multiselect--x-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [radio-button--experimental [mixin]](#radio-button--experimental-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [padding-th--x [mixin]](#padding-th--x-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [tags--x [mixin]](#tags--x-mixin)
  - [toggle--x [mixin]](#toggle--x-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)

### ✅carbon--spacing-04 [variable]

0.75rem (12px) spacing with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-04: carbon--mini-units(1.5);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-04`
- **Used by**:
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)

### ✅carbon--spacing-05 [variable]

1rem (16px) spacing with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-05: carbon--mini-units(2);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-05`
- **Used by**:
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [pagination--x [mixin]](#pagination--x-mixin)
  - [pseudo-underline [mixin]](#pseudo-underline-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [radio-button--experimental [mixin]](#radio-button--experimental-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [slider--x [mixin]](#slider--x-mixin)
  - [padding-th--x [mixin]](#padding-th--x-mixin)
  - [padding-td--x [mixin]](#padding-td--x-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)
  - [tile--x [mixin]](#tile--x-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)

### ✅carbon--spacing-06 [variable]

1.5rem (24px) spacing with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-06: carbon--mini-units(3);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-06`
- **Used by**:
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [padding-td--x [mixin]](#padding-td--x-mixin)

### ✅carbon--spacing-07 [variable]

2rem (32px) spacing with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-07: carbon--mini-units(4);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-07`
- **Used by**:
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [form--x [mixin]](#form--x-mixin)
  - [lists--x [mixin]](#lists--x-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)

### ✅carbon--spacing-08 [variable]

2.5rem (40px) spacing with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-08: carbon--mini-units(5);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-08`
- **Used by**:
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)

### ✅carbon--spacing-09 [variable]

3rem (48px) spacing with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-09: carbon--mini-units(6);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-09`
- **Used by**:
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [tile--x [mixin]](#tile--x-mixin)

### ✅carbon--spacing-10 [variable]

4rem (64px) spacing with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-10: carbon--mini-units(8);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-10`

### ✅carbon--spacing-11 [variable]

5rem (80px) spacing with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-11: carbon--mini-units(10);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-11`

### ✅carbon--spacing-12 [variable]

6rem (96px) spacing with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-12: carbon--mini-units(12);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `spacing-12`

### ✅carbon--spacing [variable]

All spacing increments in a map

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
- **Type**: `Map`

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
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)

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
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [data-table-sort--x [mixin]](#data-table-sort--x-mixin)

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
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [data-table-sort--x [mixin]](#data-table-sort--x-mixin)

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
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)

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
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)

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

### ✅carbon--layout-01 [variable]

1rem (16px) layout with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--layout-01: carbon--mini-units(2);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `layout-01`

### ✅carbon--layout-02 [variable]

1.5rem (24px) layout with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--layout-02: carbon--mini-units(3);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `layout-02`

### ✅carbon--layout-03 [variable]

2rem (32px) layout with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--layout-03: carbon--mini-units(4);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `layout-03`

### ✅carbon--layout-04 [variable]

3rem (48px) layout with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--layout-04: carbon--mini-units(6);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `layout-04`

### ✅carbon--layout-05 [variable]

4rem (64px) layout with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--layout-05: carbon--mini-units(8);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `layout-05`

### ✅carbon--layout-06 [variable]

4rem (96px) layout with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--layout-06: carbon--mini-units(12);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `layout-06`

### ✅carbon--layout-07 [variable]

10rem (160px) layout with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--layout-07: carbon--mini-units(20);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`
- **Aliased**:
  - `layout-07`

### ✅carbon--layout [variable]

All layout increments in a map

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
- **Type**: `Map`

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
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [data-table-sort--x [mixin]](#data-table-sort--x-mixin)

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
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)

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
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [data-table-sort--x [mixin]](#data-table-sort--x-mixin)

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

### ✅carbon--fluid-spacing-01 [variable]

0vw fluid spacing

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

2vw fluid spacing

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

5vw fluid spacing

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

10vw fluid spacing

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

All fluid spacing increments in a map

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
- **Type**: `Map`

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
  - [motion [function]](#motion-function)

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
- **Used by**:
  - [motion [mixin]](#motion-mixin)

## @carbon/themes

### ✅carbon--theme [mixin]

Define theme variables from a map of tokens

<details>
<summary>Source code</summary>

```scss
@mixin carbon--theme($theme: $carbon--theme) {
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

| Name     | Description         | Type  | Default value    |
| -------- | ------------------- | ----- | ---------------- |
| `$theme` | Map of theme tokens | `Map` | `$carbon--theme` |

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
- **Content**: Pass in your custom declaration blocks to be used after the token maps set theming variables.
- **Requires**:
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
  - [icon-01 [variable]](#icon-01-variable)
  - [icon-02 [variable]](#icon-02-variable)
  - [icon-03 [variable]](#icon-03-variable)
  - [link-01 [variable]](#link-01-variable)
  - [field-01 [variable]](#field-01-variable)
  - [field-02 [variable]](#field-02-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [inverse-02 [variable]](#inverse-02-variable)
  - [support-01 [variable]](#support-01-variable)
  - [support-02 [variable]](#support-02-variable)
  - [support-03 [variable]](#support-03-variable)
  - [support-04 [variable]](#support-04-variable)
  - [overlay-01 [variable]](#overlay-01-variable)
  - [focus [variable]](#focus-variable)
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
  - [hover-danger [variable]](#hover-danger-variable)
  - [active-danger [variable]](#active-danger-variable)
  - [hover-row [variable]](#hover-row-variable)
  - [visited-link [variable]](#visited-link-variable)
  - [disabled-01 [variable]](#disabled-01-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [disabled-03 [variable]](#disabled-03-variable)
  - [highlight [variable]](#highlight-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [brand-02 [variable]](#brand-02-variable)
  - [brand-03 [variable]](#brand-03-variable)
  - [active-01 [variable]](#active-01-variable)
  - [hover-field [variable]](#hover-field-variable)
  - [carbon--theme [variable]](#carbon--theme-variable)

### ✅carbon--theme--white [variable]

Carbon's white color theme

<details>
<summary>Source code</summary>

```scss
$carbon--theme--white: (
  interactive-01: #0062ff,
  interactive-02: #171717,
  interactive-03: #0062ff,
  interactive-04: #0062ff,
  ui-background: #ffffff,
  ui-01: #f3f3f3,
  ui-02: #ffffff,
  ui-03: #dcdcdc,
  ui-04: #8c8c8c,
  ui-05: #171717,
  text-01: #171717,
  text-02: #565656,
  text-03: #8c8c8c,
  text-04: #ffffff,
  icon-01: #171717,
  icon-02: #565656,
  icon-03: #ffffff,
  link-01: #0062ff,
  field-01: #f3f3f3,
  field-02: #ffffff,
  inverse-01: #ffffff,
  inverse-02: #3d3d3d,
  support-01: #da1e28,
  support-02: #24a148,
  support-03: #fdd13a,
  support-04: #054ada,
  overlay-01: rgba(23, 23, 23, 0.5),
  focus: #0062ff,
  hover-primary: #0353e9,
  active-primary: #0530ad,
  hover-primary-text: #054ada,
  hover-secondary: #4c4c4c,
  active-secondary: #6f6f6f,
  hover-tertiary: #0353e9,
  active-tertiary: #0530ad,
  hover-ui: #e5e5e5,
  active-ui: #bebebe,
  selected-ui: #dcdcdc,
  hover-selected-ui: #cacaca,
  hover-danger: #ba1b23,
  active-danger: #750e13,
  hover-row: #e5e5e5,
  visited-link: #8a3ffc,
  disabled-01: #f3f3f3,
  disabled-02: #bebebe,
  disabled-03: #8c8c8c,
  highlight: #c9deff,
  brand-01: #0062ff,
  brand-02: #171717,
  brand-03: #0062ff,
  active-01: #bebebe,
  hover-field: #e5e5e5,
);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Map`
- **Aliased**:
  - `carbon--theme`

### ✅carbon--theme--g10 [variable]

Carbon's g10 color theme

<details>
<summary>Source code</summary>

```scss
$carbon--theme--g10: (
  interactive-01: #0062ff,
  interactive-02: #171717,
  interactive-03: #0062ff,
  interactive-04: #0062ff,
  ui-background: #f3f3f3,
  ui-01: #ffffff,
  ui-02: #f3f3f3,
  ui-03: #dcdcdc,
  ui-04: #8c8c8c,
  ui-05: #171717,
  text-01: #171717,
  text-02: #565656,
  text-03: #8c8c8c,
  text-04: #ffffff,
  icon-01: #171717,
  icon-02: #565656,
  icon-03: #ffffff,
  link-01: #0062ff,
  field-01: #ffffff,
  field-02: #f3f3f3,
  inverse-01: #ffffff,
  inverse-02: #3d3d3d,
  support-01: #da1e28,
  support-02: #24a148,
  support-03: #fdd13a,
  support-04: #054ada,
  overlay-01: rgba(23, 23, 23, 0.5),
  focus: #0062ff,
  hover-primary: #0353e9,
  active-primary: #0530ad,
  hover-primary-text: #054ada,
  hover-secondary: #4c4c4c,
  active-secondary: #6f6f6f,
  hover-tertiary: #0353e9,
  active-tertiary: #0530ad,
  hover-ui: #e5e5e5,
  active-ui: #bebebe,
  selected-ui: #dcdcdc,
  hover-selected-ui: #cacaca,
  hover-danger: #ba1b23,
  active-danger: #750e13,
  hover-row: #e5e5e5,
  visited-link: #8a3ffc,
  disabled-01: #ffffff,
  disabled-02: #bebebe,
  disabled-03: #8c8c8c,
  highlight: #c9deff,
  brand-01: #0062ff,
  brand-02: #171717,
  brand-03: #0062ff,
  active-01: #bebebe,
  hover-field: #e5e5e5,
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
$carbon--theme--g90: (
  interactive-01: #0062ff,
  interactive-02: #6f6f6f,
  interactive-03: #ffffff,
  interactive-04: #408bfc,
  ui-background: #282828,
  ui-01: #3d3d3d,
  ui-02: #565656,
  ui-03: #565656,
  ui-04: #8c8c8c,
  ui-05: #f3f3f3,
  text-01: #f3f3f3,
  text-02: #bebebe,
  text-03: #8c8c8c,
  text-04: #ffffff,
  icon-01: #f3f3f3,
  icon-02: #bebebe,
  icon-03: #ffffff,
  link-01: #6ea6ff,
  field-01: #3d3d3d,
  field-02: #565656,
  inverse-01: #171717,
  inverse-02: #f3f3f3,
  support-01: #fb4b53,
  support-02: #3dbb61,
  support-03: #fdd13a,
  support-04: #408bfc,
  overlay-01: rgba(23, 23, 23, 0.7),
  focus: #ffffff,
  hover-primary: #0353e9,
  active-primary: #0530ad,
  hover-primary-text: #054ada,
  hover-secondary: #606060,
  active-secondary: #3d3d3d,
  hover-tertiary: #f3f3f3,
  active-tertiary: #bebebe,
  hover-ui: #353535,
  active-ui: #6f6f6f,
  selected-ui: #565656,
  hover-selected-ui: #656565,
  hover-danger: #ba1b23,
  active-danger: #750e13,
  hover-row: #4c4c4c,
  visited-link: #bb8eff,
  disabled-01: #3d3d3d,
  disabled-02: #565656,
  disabled-03: #8c8c8c,
  highlight: #061f80,
  brand-01: #0062ff,
  brand-02: #6f6f6f,
  brand-03: #ffffff,
  active-01: #6f6f6f,
  hover-field: #353535,
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
$carbon--theme--g100: (
  interactive-01: #0062ff,
  interactive-02: #6f6f6f,
  interactive-03: #ffffff,
  interactive-04: #408bfc,
  ui-background: #171717,
  ui-01: #282828,
  ui-02: #3d3d3d,
  ui-03: #3d3d3d,
  ui-04: #6f6f6f,
  ui-05: #f3f3f3,
  text-01: #f3f3f3,
  text-02: #bebebe,
  text-03: #6f6f6f,
  text-04: #ffffff,
  icon-01: #f3f3f3,
  icon-02: #bebebe,
  icon-03: #ffffff,
  link-01: #6ea6ff,
  field-01: #282828,
  field-02: #3d3d3d,
  inverse-01: #171717,
  inverse-02: #f3f3f3,
  support-01: #fb4b53,
  support-02: #3dbb61,
  support-03: #fdd13a,
  support-04: #408bfc,
  overlay-01: rgba(23, 23, 23, 0.7),
  focus: #ffffff,
  hover-primary: #0353e9,
  active-primary: #0530ad,
  hover-primary-text: #054ada,
  hover-secondary: #606060,
  active-secondary: #3d3d3d,
  hover-tertiary: #f3f3f3,
  active-tertiary: #bebebe,
  hover-ui: #353535,
  active-ui: #565656,
  selected-ui: #3d3d3d,
  hover-selected-ui: #4c4c4c,
  hover-danger: #ba1b23,
  active-danger: #750e13,
  hover-row: #353535,
  visited-link: #bb8eff,
  disabled-01: #282828,
  disabled-02: #3d3d3d,
  disabled-03: #6f6f6f,
  highlight: #061f80,
  brand-01: #0062ff,
  brand-02: #6f6f6f,
  brand-03: #ffffff,
  active-01: #565656,
  hover-field: #353535,
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
$carbon--theme: $carbon--theme--white;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Map`
- **Alias**: `carbon--theme--white`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅interactive-01 [variable]

Primary interactive color; Primary buttons

<details>
<summary>Source code</summary>

```scss
$interactive-01: map-get($carbon--theme, interactive-01);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Aliased**:
  - `brand-01`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [checkbox--x [mixin]](#checkbox--x-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [inline-loading--x [mixin]](#inline-loading--x-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [pseudo-underline [mixin]](#pseudo-underline-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [slider--x [mixin]](#slider--x-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)

### ✅interactive-02 [variable]

Secondary interactive color; Secondary button

<details>
<summary>Source code</summary>

```scss
$interactive-02: map-get($carbon--theme, interactive-02);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Aliased**:
  - `brand-02`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [tags--x [mixin]](#tags--x-mixin)
  - [tile--x [mixin]](#tile--x-mixin)

### ✅interactive-03 [variable]

4.5:1 AA contrast; Tertiary button

<details>
<summary>Source code</summary>

```scss
$interactive-03: map-get($carbon--theme, interactive-03);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Aliased**:
  - `brand-03`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button--x [mixin]](#button--x-mixin)

### ✅interactive-04 [variable]

3:1 AA contrast; Selected elements; Active elements; Accent icons

<details>
<summary>Source code</summary>

```scss
$interactive-04: map-get($carbon--theme, interactive-04);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [loading--x [mixin]](#loading--x-mixin)

### ✅ui-background [variable]

Default page background

<details>
<summary>Source code</summary>

```scss
$ui-background: map-get($carbon--theme, ui-background);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [css-body--x [mixin]](#css-body--x-mixin)

### ✅ui-01 [variable]

Primary container background; Secondary page background

<details>
<summary>Source code</summary>

```scss
$ui-01: map-get($carbon--theme, ui-01);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button [mixin]](#button-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-v2-core [mixin]](#data-table-v2-core-mixin)
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [loading [mixin]](#loading-mixin)
  - [modal [mixin]](#modal-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pagination--x [mixin]](#pagination--x-mixin)
  - [search [mixin]](#search-mixin)
  - [select [mixin]](#select-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [slider--x [mixin]](#slider--x-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
  - [structured-list--x [mixin]](#structured-list--x-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [tile [mixin]](#tile-mixin)
  - [tile--x [mixin]](#tile--x-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

### ✅ui-02 [variable]

Primary page background; Secondary container background

<details>
<summary>Source code</summary>

```scss
$ui-02: map-get($carbon--theme, ui-02);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button-theme [mixin]](#button-theme-mixin)
  - [button-theme--x [mixin]](#button-theme--x-mixin)
  - [checkbox--x [mixin]](#checkbox--x-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-v2-core [mixin]](#data-table-v2-core-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [css-body [mixin]](#css-body-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)
  - [theme [mixin]](#theme-mixin)
  - [loading--x [mixin]](#loading--x-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)

### ✅ui-03 [variable]

Subtle border; Tertiary background color

<details>
<summary>Source code</summary>

```scss
$ui-03: map-get($carbon--theme, ui-03);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [accordion [mixin]](#accordion-mixin)
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [combo-box--x [mixin]](#combo-box--x-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [data-table-v2-core [mixin]](#data-table-v2-core-mixin)
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [loading--x [mixin]](#loading--x-mixin)
  - [modal [mixin]](#modal-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pagination--x [mixin]](#pagination--x-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [slider--x [mixin]](#slider--x-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
  - [structured-list--x [mixin]](#structured-list--x-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [tags--x [mixin]](#tags--x-mixin)
  - [tile [mixin]](#tile-mixin)
  - [toggle--x [mixin]](#toggle--x-mixin)
  - [toolbar [mixin]](#toolbar-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

### ✅ui-04 [variable]

3:1 AA element contrast; Medium contrast border

<details>
<summary>Source code</summary>

```scss
$ui-04: map-get($carbon--theme, ui-04);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [button-base--x [mixin]](#button-base--x-mixin)
  - [button-theme--x [mixin]](#button-theme--x-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [slider [mixin]](#slider-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)
  - [tile [mixin]](#tile-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [toggle--x [mixin]](#toggle--x-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

### ✅ui-05 [variable]

4.5:1 AA element contrast; High contrast border; Emphasis elements

<details>
<summary>Source code</summary>

```scss
$ui-05: map-get($carbon--theme, ui-05);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [accordion [mixin]](#accordion-mixin)
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [button [mixin]](#button-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [checkbox--x [mixin]](#checkbox--x-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-v2-expandable [mixin]](#data-table-v2-expandable-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [data-table-v2-sort [mixin]](#data-table-v2-sort-mixin)
  - [data-table-sort--x [mixin]](#data-table-sort--x-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [loading [mixin]](#loading-mixin)
  - [modal [mixin]](#modal-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pagination--x [mixin]](#pagination--x-mixin)
  - [pagination-nav [mixin]](#pagination-nav-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [radio-button--experimental [mixin]](#radio-button--experimental-mixin)
  - [search [mixin]](#search-mixin)
  - [select [mixin]](#select-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [slider--x [mixin]](#slider--x-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [tile [mixin]](#tile-mixin)
  - [tile--x [mixin]](#tile--x-mixin)
  - [time-picker [mixin]](#time-picker-mixin)
  - [toggle [mixin]](#toggle-mixin)

### ✅text-01 [variable]

Primary text; Body copy; Headers; Hover text color for `$text-02`

<details>
<summary>Source code</summary>

```scss
$text-01: map-get($carbon--theme, text-01);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [accordion [mixin]](#accordion-mixin)
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [breadcrumb--x [mixin]](#breadcrumb--x-mixin)
  - [checkbox--x [mixin]](#checkbox--x-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [data-table-v2-core [mixin]](#data-table-v2-core-mixin)
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [data-table-v2-sort [mixin]](#data-table-v2-sort-mixin)
  - [data-table-sort--x [mixin]](#data-table-sort--x-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [form [mixin]](#form-mixin)
  - [css-body [mixin]](#css-body-mixin)
  - [css-body--x [mixin]](#css-body--x-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)
  - [link--x [mixin]](#link--x-mixin)
  - [lists [mixin]](#lists-mixin)
  - [lists--x [mixin]](#lists--x-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [modal [mixin]](#modal-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [multiselect--x [mixin]](#multiselect--x-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pagination--x [mixin]](#pagination--x-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [search [mixin]](#search-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [select [mixin]](#select-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [slider--x [mixin]](#slider--x-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
  - [structured-list--x [mixin]](#structured-list--x-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [tags--x [mixin]](#tags--x-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)
  - [time-picker [mixin]](#time-picker-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [tooltip [mixin]](#tooltip-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)

### ✅text-02 [variable]

Secondary text; Input labels; Help text

<details>
<summary>Source code</summary>

```scss
$text-02: map-get($carbon--theme, text-02);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [breadcrumb [mixin]](#breadcrumb-mixin)
  - [combo-box--x [mixin]](#combo-box--x-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [form [mixin]](#form-mixin)
  - [form--x [mixin]](#form--x-mixin)
  - [inline-loading--x [mixin]](#inline-loading--x-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [modal [mixin]](#modal-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [search [mixin]](#search-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [slider [mixin]](#slider-mixin)
  - [structured-list--x [mixin]](#structured-list--x-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [time-picker [mixin]](#time-picker-mixin)
  - [toolbar [mixin]](#toolbar-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)

### ✅text-03 [variable]

Placeholder text

<details>
<summary>Source code</summary>

```scss
$text-03: map-get($carbon--theme, text-03);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [placeholder-colors [mixin]](#placeholder-colors-mixin)
  - [search--x [mixin]](#search--x-mixin)

### ✅text-04 [variable]

Text on interactive colors

<details>
<summary>Source code</summary>

```scss
$text-04: map-get($carbon--theme, text-04);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)

### ✅icon-01 [variable]

Primary icons

<details>
<summary>Source code</summary>

```scss
$icon-01: map-get($carbon--theme, icon-01);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [search--x [mixin]](#search--x-mixin)

### ✅icon-02 [variable]

Secondary icons

<details>
<summary>Source code</summary>

```scss
$icon-02: map-get($carbon--theme, icon-02);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [tags--x [mixin]](#tags--x-mixin)
  - [tile--x [mixin]](#tile--x-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)

### ✅icon-03 [variable]

Tertiary icons; Icons on interactive colors; Icons on non-ui colors

<details>
<summary>Source code</summary>

```scss
$icon-03: map-get($carbon--theme, icon-03);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [toggle--x [mixin]](#toggle--x-mixin)

### ✅link-01 [variable]

Primary links; Ghost button

<details>
<summary>Source code</summary>

```scss
$link-01: map-get($carbon--theme, link-01);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [link--x [mixin]](#link--x-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)

### ✅field-01 [variable]

Default input fields; Field color on \$ui-backgrounds

<details>
<summary>Source code</summary>

```scss
$field-01: map-get($carbon--theme, field-01);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [search [mixin]](#search-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [select [mixin]](#select-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)
  - [time-picker [mixin]](#time-picker-mixin)

### ✅field-02 [variable]

Input field color on `$ui-02` backgrounds

<details>
<summary>Source code</summary>

```scss
$field-02: map-get($carbon--theme, field-02);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [form [mixin]](#form-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [search [mixin]](#search-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [select [mixin]](#select-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)
  - [time-picker [mixin]](#time-picker-mixin)
  - [toolbar [mixin]](#toolbar-mixin)

### ✅inverse-01 [variable]

Inverse text color; Inverse icon color

<details>
<summary>Source code</summary>

```scss
$inverse-01: map-get($carbon--theme, inverse-01);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button [mixin]](#button-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [checkbox--x [mixin]](#checkbox--x-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tags--x [mixin]](#tags--x-mixin)
  - [tooltip [mixin]](#tooltip-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)

### ✅inverse-02 [variable]

High contrast backgrounds; High contrast elements

<details>
<summary>Source code</summary>

```scss
$inverse-02: map-get($carbon--theme, inverse-02);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [tooltip [mixin]](#tooltip-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)

### ✅support-01 [variable]

Error

<details>
<summary>Source code</summary>

```scss
$support-01: map-get($carbon--theme, support-01);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button [mixin]](#button-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [form [mixin]](#form-mixin)
  - [form--x [mixin]](#form--x-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [modal [mixin]](#modal-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [select [mixin]](#select-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)
  - [time-picker [mixin]](#time-picker-mixin)

### ✅support-02 [variable]

Success

<details>
<summary>Source code</summary>

```scss
$support-02: map-get($carbon--theme, support-02);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)
  - [toggle--x [mixin]](#toggle--x-mixin)

### ✅support-03 [variable]

Warning

<details>
<summary>Source code</summary>

```scss
$support-03: map-get($carbon--theme, support-03);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)

### ✅support-04 [variable]

Information

<details>
<summary>Source code</summary>

```scss
$support-04: map-get($carbon--theme, support-04);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)

### ✅overlay-01 [variable]

Background overlay

<details>
<summary>Source code</summary>

```scss
$overlay-01: map-get($carbon--theme, overlay-01);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [modal--x [mixin]](#modal--x-mixin)

### ✅focus [variable]

Focus border; Focus underline

<details>
<summary>Source code</summary>

```scss
$focus: map-get($carbon--theme, focus);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button-theme--x [mixin]](#button-theme--x-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [radio-button--experimental [mixin]](#radio-button--experimental-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [toggle--x [mixin]](#toggle--x-mixin)

### ✅hover-primary [variable]

`$interactive-01` hover

<details>
<summary>Source code</summary>

```scss
$hover-primary: map-get($carbon--theme, hover-primary);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button [mixin]](#button-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [search [mixin]](#search-mixin)
  - [tags [mixin]](#tags-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)
  - [tooltip [mixin]](#tooltip-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)

### ✅active-primary [variable]

`$interactive-01` active

<details>
<summary>Source code</summary>

```scss
$active-primary: map-get($carbon--theme, active-primary);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button--x [mixin]](#button--x-mixin)

### ✅hover-primary-text [variable]

`$interactive-01` text hover

<details>
<summary>Source code</summary>

```scss
$hover-primary-text: map-get($carbon--theme, hover-primary-text);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [breadcrumb [mixin]](#breadcrumb-mixin)
  - [link [mixin]](#link-mixin)

### ✅hover-secondary [variable]

`$interactive-02` hover

<details>
<summary>Source code</summary>

```scss
$hover-secondary: map-get($carbon--theme, hover-secondary);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button [mixin]](#button-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [slider [mixin]](#slider-mixin)
  - [tabs [mixin]](#tabs-mixin)

### ✅active-secondary [variable]

`$interactive-02` active; `$inverse-01` active

<details>
<summary>Source code</summary>

```scss
$active-secondary: map-get($carbon--theme, active-secondary);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button--x [mixin]](#button--x-mixin)

### ✅hover-tertiary [variable]

`$interactive-03` hover; `$inverse-01` hover

<details>
<summary>Source code</summary>

```scss
$hover-tertiary: map-get($carbon--theme, hover-tertiary);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button--x [mixin]](#button--x-mixin)

### ✅active-tertiary [variable]

`$interactive-03` active

<details>
<summary>Source code</summary>

```scss
$active-tertiary: map-get($carbon--theme, active-tertiary);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button--x [mixin]](#button--x-mixin)

### ✅hover-ui [variable]

`$ui-01` hover; `$ui-02` hover; Transparent background hover

<details>
<summary>Source code</summary>

```scss
$hover-ui: map-get($carbon--theme, hover-ui);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Aliased**:
  - `hover-field`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [pagination--x [mixin]](#pagination--x-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [tile--x [mixin]](#tile--x-mixin)

### ✅active-ui [variable]

`$ui-01` active; `$ui-02` active

<details>
<summary>Source code</summary>

```scss
$active-ui: map-get($carbon--theme, active-ui);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Aliased**:
  - `active-01`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅selected-ui [variable]

Selected UI elements

<details>
<summary>Source code</summary>

```scss
$selected-ui: map-get($carbon--theme, selected-ui);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [search--x [mixin]](#search--x-mixin)

### ✅hover-selected-ui [variable]

Data table selected row hover

<details>
<summary>Source code</summary>

```scss
$hover-selected-ui: map-get($carbon--theme, hover-selected-ui);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅hover-danger [variable]

Danger hover; `$support-01` hover

<details>
<summary>Source code</summary>

```scss
$hover-danger: map-get($carbon--theme, hover-danger);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button--x [mixin]](#button--x-mixin)

### ✅active-danger [variable]

Danger active; `$support-01` active

<details>
<summary>Source code</summary>

```scss
$active-danger: map-get($carbon--theme, active-danger);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button--x [mixin]](#button--x-mixin)

### ✅hover-row [variable]

Row hover

<details>
<summary>Source code</summary>

```scss
$hover-row: map-get($carbon--theme, hover-row);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [data-table-v2-expandable [mixin]](#data-table-v2-expandable-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [pagination-nav [mixin]](#pagination-nav-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
  - [tabs [mixin]](#tabs-mixin)

### ✅visited-link [variable]

Visited links

<details>
<summary>Source code</summary>

```scss
$visited-link: map-get($carbon--theme, visited-link);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [link--x [mixin]](#link--x-mixin)

### ✅disabled-01 [variable]

Disabled fields; Disabled backgrounds; Disabled border

<details>
<summary>Source code</summary>

```scss
$disabled-01: map-get($carbon--theme, disabled-01);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [slider--x [mixin]](#slider--x-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)
  - [toggle--x [mixin]](#toggle--x-mixin)

### ✅disabled-02 [variable]

Disabled elements on `$disabled-01`; Disabled label; Disabled text on `$disabled-01`; Disabled icons; Disabled border

<details>
<summary>Source code</summary>

```scss
$disabled-02: map-get($carbon--theme, disabled-02);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [checkbox--x [mixin]](#checkbox--x-mixin)
  - [combo-box--x [mixin]](#combo-box--x-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [form--x [mixin]](#form--x-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [link--x [mixin]](#link--x-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [pagination--x [mixin]](#pagination--x-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [slider--x [mixin]](#slider--x-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)
  - [toggle--x [mixin]](#toggle--x-mixin)

### ✅disabled-03 [variable]

Disabled text on `$disabled-02`; Disabled icons on `$disabled-02`

<details>
<summary>Source code</summary>

```scss
$disabled-03: map-get($carbon--theme, disabled-03);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [button--x [mixin]](#button--x-mixin)

### ✅highlight [variable]

`$interactive-01` high light

<details>
<summary>Source code</summary>

```scss
$highlight: map-get($carbon--theme, highlight);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅⚠️brand-01 [variable]

<details>
<summary>Source code</summary>

```scss
$brand-01: map-get($carbon--theme, brand-01);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Alias**: `interactive-01`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [accordion [mixin]](#accordion-mixin)
  - [button [mixin]](#button-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-v2-core [mixin]](#data-table-v2-core-mixin)
  - [data-table-v2-expandable [mixin]](#data-table-v2-expandable-mixin)
  - [data-table-v2-sort [mixin]](#data-table-v2-sort-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [typography [mixin]](#typography-mixin)
  - [inline-loading [mixin]](#inline-loading-mixin)
  - [link [mixin]](#link-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [pagination-nav [mixin]](#pagination-nav-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [search [mixin]](#search-mixin)
  - [select [mixin]](#select-mixin)
  - [slider [mixin]](#slider-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tags [mixin]](#tags-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)
  - [tile [mixin]](#tile-mixin)
  - [time-picker [mixin]](#time-picker-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [toolbar [mixin]](#toolbar-mixin)
  - [tooltip [mixin]](#tooltip-mixin)
- **Deprecated**: This may not be available in future releases

### ✅⚠️brand-02 [variable]

<details>
<summary>Source code</summary>

```scss
$brand-02: map-get($carbon--theme, brand-02);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Alias**: `interactive-02`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [data-table-v2-core [mixin]](#data-table-v2-core-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
- **Deprecated**: This may not be available in future releases

### ✅⚠️brand-03 [variable]

<details>
<summary>Source code</summary>

```scss
$brand-03: map-get($carbon--theme, brand-03);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Alias**: `interactive-03`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [loading [mixin]](#loading-mixin)
- **Deprecated**: This may not be available in future releases

### ✅⚠️active-01 [variable]

<details>
<summary>Source code</summary>

```scss
$active-01: map-get($carbon--theme, active-01);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Alias**: `active-ui`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: This may not be available in future releases

### ✅⚠️hover-field [variable]

<details>
<summary>Source code</summary>

```scss
$hover-field: map-get($carbon--theme, hover-field);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Alias**: `hover-ui`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: This may not be available in future releases

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
  - [form--x [mixin]](#form--x-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)

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
    font-weight: 400;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  // IBM Plex uses semibold instead of bold, as a result we need to map
  // tags that use `font-weight: bold` to the semibold value
  strong {
    font-weight: 600;
  }

  code {
    font-family: $mono-font-family;
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
  - [base-font-size [variable]](#base-font-size-variable)

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

Type scole follows a custom formula for determining each step size and supports sizes from 12px to 92px

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
  - [search--x [mixin]](#search--x-mixin)

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

- **Group**: [@carbon/type](#carbontype)
- **Alias**: `carbon--type-scale`
- **Requires**:
  - [carbon--type-scale [function]](#carbon--type-scale-function)

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
  font-style: italic,
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
  productive-heading-03: $productive-heading-03,
  productive-heading-04: $productive-heading-04,
  productive-heading-05: $productive-heading-05,
  expressive-paragraph-01: $expressive-paragraph-01,
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
  - [breakpoints [variable]](#breakpoints-variable)
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
    // Otherwise, we just include all the property declarations directly on the
    // selector
    @include properties(map-remove($token, 'breakpoints'));
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
  - [properties [mixin]](#properties-mixin)
  - [tokens [variable]](#tokens-variable)
  - [breakpoints [variable]](#breakpoints-variable)
- **Used by**:
  - [carbon--type-classes [mixin]](#carbon--type-classes-mixin)
  - [line-height [mixin]](#line-height-mixin)
  - [type-style [mixin]](#type-style-mixin)

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
- **Used by**:
  - [plex-font-face [mixin]](#plex-font-face-mixin)

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

## accordion

### ❌accordion [mixin]

v9 accordion

<details>
<summary>Source code</summary>

```scss
@mixin accordion() {
  .#{$prefix}--accordion {
    @include reset;
    @include font-family;
    list-style: none;
    width: 100%;
  }

  .#{$prefix}--accordion__item {
    transition: all $transition--base $carbon--standard-easing;
    border-top: 1px solid $ui-03;
    overflow: hidden;

    &:focus {
      outline: none;

      .#{$prefix}--accordion__arrow {
        @include focus-outline('border');
        overflow: visible; // safari fix
        outline-offset: -0.5px; // safari fix
      }
    }

    &:last-child {
      border-bottom: 1px solid $ui-03;
    }
  }

  .#{$prefix}--accordion__heading {
    @include button-reset;
    color: $text-01;
    display: flex;
    align-items: center;
    justify-content: $accordion-justify-content;
    flex-direction: $accordion-flex-direction;
    cursor: pointer;
    padding: $spacing-xs 0;

    // new version of markup uses focus on the heading,
    // not the list element itself
    &:focus {
      outline: none;

      .#{$prefix}--accordion__arrow {
        @include focus-outline('border');
        overflow: visible; // safari fix
        outline-offset: -0.5px; // safari fix
      }
    }
  }

  .#{$prefix}--accordion__arrow {
    transition: all $transition--base $carbon--standard-easing;
    height: 1.25rem;
    width: 1.25rem;
    padding: $spacing-2xs $spacing-3xs $spacing-2xs $spacing-2xs;
    margin: $accordion-arrow-margin;
    fill: $ui-05;
    transform: rotate(0) /*rtl:rotate(180deg)*/;
  }

  .#{$prefix}--accordion__title {
    @include typescale('epsilon');
    @include line-height('body');
    margin: $accordion-title-margin;
    font-weight: 400;
    text-align: left;
  }

  .#{$prefix}--accordion__content {
    transition: all $transition--expansion $carbon--ease-out;
    padding: $accordion-content-padding;
    height: 0;
    visibility: hidden;
    opacity: 0;

    p {
      @include typescale('zeta');
    }
  }

  .#{$prefix}--accordion__item--active {
    overflow: visible;

    > .#{$prefix}--accordion__content {
      padding-top: $spacing-md;
      padding-bottom: $spacing-lg;
      height: auto;
      visibility: visible;
      opacity: 1;
      transition: all $transition--expansion $carbon--ease-in;
    }

    > .#{$prefix}--accordion__heading > .#{$prefix}--accordion__arrow {
      /*rtl:ignore*/
      transform: rotate(90deg);
      fill: $brand-01;
    }
  }

  // Skeleton state
  .#{$prefix}--accordion.#{$prefix}--skeleton .#{$prefix}--accordion__heading,
  .#{$prefix}--accordion.#{$prefix}--skeleton .#{$prefix}--accordion__button {
    cursor: default;
  }

  .#{$prefix}--accordion.#{$prefix}--skeleton .#{$prefix}--accordion__arrow {
    pointer-events: none;
    fill: $ui-05;
    cursor: default;

    &:hover,
    &:focus,
    &:active {
      border: none;
      outline: none;
      cursor: default;
    }
  }

  .#{$prefix}--skeleton
    .#{$prefix}--accordion__heading:focus
    .#{$prefix}--accordion__arrow {
    border: none;
    outline: none;
    cursor: default;
  }

  .#{$prefix}--accordion__title.#{$prefix}--skeleton__text {
    margin-bottom: 0;
  }
}
```

</details>

- **Group**: [accordion](#accordion)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [line-height [mixin]](#line-height-mixin)
  - [prefix [variable]](#prefix-variable)
  - [transition--base [variable]](#transition--base-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [text-01 [variable]](#text-01-variable)
  - [accordion-justify-content [variable]](#accordion-justify-content-variable)
  - [accordion-flex-direction [variable]](#accordion-flex-direction-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [spacing-3xs [variable]](#spacing-3xs-variable)
  - [accordion-arrow-margin [variable]](#accordion-arrow-margin-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [accordion-title-margin [variable]](#accordion-title-margin-variable)
  - [transition--expansion [variable]](#transition--expansion-variable)
  - [carbon--ease-out [variable]](#carbon--ease-out-variable)
  - [accordion-content-padding [variable]](#accordion-content-padding-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [spacing-lg [variable]](#spacing-lg-variable)
  - [carbon--ease-in [variable]](#carbon--ease-in-variable)
  - [brand-01 [variable]](#brand-01-variable)

### ❌accordion--x [mixin]

v10 accordion

<details>
<summary>Source code</summary>

```scss
@mixin accordion--x() {
  .#{$prefix}--accordion {
    @include reset;

    list-style: none;
    width: 100%;
  }

  .#{$prefix}--accordion__item {
    transition: all $duration--fast-02 motion(standard, productive);
    border-top: 1px solid $ui-03;
    overflow: visible;

    &:last-child {
      border-bottom: 1px solid $ui-03;
    }
  }

  .#{$prefix}--accordion__heading {
    @include button-reset;
    color: $text-01;
    display: flex;
    align-items: center;
    justify-content: $accordion-justify-content;
    cursor: pointer;
    padding: rem(6px) 0;
    flex-direction: $accordion-flex-direction;
    position: relative;
    width: 100%;
    margin: 0;
    transition: background-color motion(standard, productive) $duration--fast-02;

    &:hover:before,
    &:focus:before {
      content: '';
      position: absolute;
      top: -1px;
      left: 0;
      width: 100%;
      height: calc(100% + 2px);
    }

    &:hover:before {
      background-color: $hover-ui;
    }

    &:focus {
      outline: none;
    }

    &:focus:before {
      @include focus-outline('outline');
    }
  }

  .#{$prefix}--accordion__arrow {
    @include focus-outline('reset');
    // Without flex basis and flex shrink being set here, our icon width can go
    // <16px and cause the icon to render in the incorrect artboard size
    flex: 0 0 1rem;
    width: 1rem;
    height: 1rem;
    margin: $accordion-arrow-margin;
    fill: $ui-05;
    // TODO: RTL rotate(180deg);
    transform: rotate(90deg);
    transition: all $duration--fast-02 motion(standard, productive);
  }

  .#{$prefix}--accordion__title {
    @include type-style('body-long-01');

    margin: $accordion-title-margin;
    width: 100%;
    text-align: left;
    z-index: 0;
  }

  .#{$prefix}--accordion__content {
    // Transition property for when the accordion closes
    transition: height motion(standard, productive) $duration--fast-02, padding
        motion(standard, productive) $duration--fast-02;
    padding-left: $carbon--spacing-05;

    padding-right: 25%;
    height: 0;
    visibility: hidden;
    opacity: 0;

    @include carbon--breakpoint-down('md') {
      padding-right: $carbon--spacing-09;
    }

    p {
      @include type-style('body-long-01');
    }
  }

  .#{$prefix}--accordion__item--active {
    overflow: visible;

    .#{$prefix}--accordion__content {
      padding-bottom: $carbon--spacing-06;
      padding-top: $spacing-xs;
      height: auto;
      visibility: visible;
      opacity: 1;
      // Transition property for when the accordion opens
      transition: height motion(entrance, productive) $duration--fast-02, padding-top
          motion(entrance, productive) $duration--fast-02,
        padding-bottom motion(entrance, productive) $duration--fast-02;
    }

    .#{$prefix}--accordion__arrow {
      /*rtl:ignore*/
      transform: rotate(-90deg);
      fill: $ui-05;
    }
  }

  // Skeleton state
  .#{$prefix}--accordion.#{$prefix}--skeleton .#{$prefix}--accordion__heading,
  .#{$prefix}--accordion.#{$prefix}--skeleton .#{$prefix}--accordion__button {
    cursor: default;
  }

  .#{$prefix}--accordion.#{$prefix}--skeleton .#{$prefix}--accordion__arrow {
    pointer-events: none;
    fill: $ui-05;
    cursor: default;

    &:hover,
    &:focus,
    &:active {
      border: none;
      outline: none;
      cursor: default;
    }
  }

  .#{$prefix}--skeleton
    .#{$prefix}--accordion__heading:focus
    .#{$prefix}--accordion__arrow {
    border: none;
    outline: none;
    cursor: default;
  }

  .#{$prefix}--accordion__title.#{$prefix}--skeleton__text {
    margin-bottom: 0;
  }
}
```

</details>

- **Group**: [accordion](#accordion)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [carbon--breakpoint-down [mixin]](#carbon--breakpoint-down-mixin)
  - [motion [function]](#motion-function)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [duration--fast-02 [variable]](#duration--fast-02-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [text-01 [variable]](#text-01-variable)
  - [accordion-justify-content [variable]](#accordion-justify-content-variable)
  - [accordion-flex-direction [variable]](#accordion-flex-direction-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [accordion-arrow-margin [variable]](#accordion-arrow-margin-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [accordion-title-margin [variable]](#accordion-title-margin-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [carbon--spacing-09 [variable]](#carbon--spacing-09-variable)
  - [carbon--spacing-06 [variable]](#carbon--spacing-06-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)

## breadcrumb

### ❌breadcrumb [mixin]

v9 breadcrumb

<details>
<summary>Source code</summary>

```scss
@mixin breadcrumb() {
  .#{$prefix}--breadcrumb {
    @include typescale('zeta');
    @include font-family;
    display: inline;

    @include breakpoint(bp--xs--major) {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .#{$prefix}--breadcrumb-item {
    margin-right: $spacing-md;
    display: flex;
    align-items: center;
  }

  .#{$prefix}--breadcrumb-item::after {
    content: '/';
    margin-left: $spacing-md;
    color: $text-02;
  }

  .#{$prefix}--breadcrumb--no-trailing-slash
    .#{$prefix}--breadcrumb-item:last-child::after {
    content: '';
  }

  .#{$prefix}--breadcrumb-item:last-child {
    margin-right: 0;

    &::after {
      margin-right: 0;
    }
  }

  .#{$prefix}--breadcrumb .#{$prefix}--link {
    white-space: nowrap;
    font-weight: 400;
    text-decoration: none;
    border-bottom: 1px solid transparent;

    &:hover,
    &:focus {
      outline: none;
      color: $hover-primary-text;
      border-bottom: 1px solid $hover-primary-text;
    }
  }

  // Skeleton State
  .#{$prefix}--breadcrumb.#{$prefix}--skeleton .#{$prefix}--link {
    @include skeleton;
    width: rem(100px);
    height: 1rem;
  }
}
```

</details>

- **Group**: [breadcrumb](#breadcrumb)
- **Requires**:
  - [typescale [mixin]](#typescale-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [breakpoint [mixin]](#breakpoint-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [text-02 [variable]](#text-02-variable)
  - [hover-primary-text [variable]](#hover-primary-text-variable)

### ❌breadcrumb--x [mixin]

v10 breadcrumb

<details>
<summary>Source code</summary>

```scss
@mixin breadcrumb--x() {
  .#{$prefix}--breadcrumb {
    @include type-style('body-short-01');
    display: inline;
    @if feature-flag-enabled('grid') {
      @include carbon--breakpoint(md) {
        display: flex;
        flex-wrap: wrap;
      }
    } @else {
      @include breakpoint(bp--xs--major) {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }

  .#{$prefix}--breadcrumb-item {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: $carbon--spacing-03;
  }

  .#{$prefix}--breadcrumb-item::after {
    content: '/';
    color: $text-01;
    margin-left: $carbon--spacing-03;
  }

  .#{$prefix}--breadcrumb--no-trailing-slash
    .#{$prefix}--breadcrumb-item:last-child::after {
    content: '';
  }

  .#{$prefix}--breadcrumb-item:last-child,
  .#{$prefix}--breadcrumb-item:last-child::after {
    margin-right: 0;
  }

  .#{$prefix}--breadcrumb .#{$prefix}--link {
    white-space: nowrap;
  }

  .#{$prefix}--breadcrumb-item [aria-current='page'],
  .#{$prefix}--breadcrumb-item.#{$prefix}--breadcrumb-item--current
    .#{$prefix}--link {
    color: $text-01;
  }

  // Skeleton State
  .#{$prefix}--breadcrumb.#{$prefix}--skeleton .#{$prefix}--link {
    @include skeleton;
    width: rem(100px);
    height: 1rem;
  }
}
```

</details>

- **Group**: [breadcrumb](#breadcrumb)
- **Requires**:
  - [type-style [mixin]](#type-style-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [breakpoint [mixin]](#breakpoint-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [text-01 [variable]](#text-01-variable)

## button

### ❌button [mixin]

v9 button

<details>
<summary>Source code</summary>

```scss
@mixin button() {
  // <button> elements cannot be used as flex containers
  button.#{$prefix}--btn {
    display: inline-block;
  }

  // Reset intrisic padding in Firefox (see #731)
  button.#{$prefix}--btn::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  // Vertically center icon inside <button>
  button.#{$prefix}--btn .#{$prefix}--btn__icon {
    position: relative;
    vertical-align: middle;
    top: -1px;

    // Targets IE10+ browsers: Reset <svg> position for vertical centering
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      top: 0;
    }
  }

  .#{$prefix}--btn {
    @include button-base;
  }

  .#{$prefix}--btn--primary {
    @include button-theme(
      $brand-01,
      transparent,
      $inverse-01,
      $hover-primary,
      $ui-01
    );
  }

  .#{$prefix}--btn--secondary {
    @include button-theme(
      transparent,
      $brand-01,
      $brand-01,
      $hover-secondary,
      $brand-01
    );

    &:hover,
    &:focus {
      color: $inverse-01;
    }

    &:active {
      color: $brand-01;
    }

    &:hover > .#{$prefix}--btn__icon,
    &:focus > .#{$prefix}--btn__icon {
      fill: $inverse-01;
    }

    &:hover:disabled,
    &:focus:disabled {
      color: $brand-01;
    }
  }

  .#{$prefix}--btn--tertiary {
    @include button-theme(transparent, $ui-05, $ui-05, $ui-05, $ui-05);

    &:hover,
    &:focus {
      color: $inverse-01;
    }

    &:active {
      color: $ui-05;
    }

    &:hover:disabled,
    &:focus:disabled {
      color: $ui-05;
    }

    &:hover > .#{$prefix}--btn__icon,
    &:focus > .#{$prefix}--btn__icon {
      fill: $inverse-01;
    }
  }

  .#{$prefix}--btn--ghost {
    @include button-theme(
      transparent,
      transparent,
      $brand-01,
      $brand-01,
      $brand-01
    );

    &:hover,
    &:focus {
      color: $inverse-01;

      .#{$prefix}--btn__icon {
        fill: $inverse-01;
      }
    }

    &:active {
      color: $ui-05;
    }

    .#{$prefix}--btn__icon {
      margin-left: $spacing-xs;
    }

    &:hover:disabled,
    &:focus:disabled {
      color: $brand-01;

      .#{$prefix}--btn__icon {
        fill: $brand-01;
      }
    }
  }

  .#{$prefix}--btn--danger {
    @include button-theme(
      transparent,
      $support-01,
      $support-01,
      $support-01,
      $support-01
    );

    &:hover {
      color: $inverse-01;
      border: $button-border-width solid transparent;
    }

    &:focus {
      color: $inverse-01;
    }

    &:active {
      color: $support-01;
    }

    &:hover:disabled,
    &:focus:disabled {
      color: $support-01;
      border: $button-border-width solid $support-01;
    }

    &:hover > .#{$prefix}--btn__icon,
    &:focus > .#{$prefix}--btn__icon {
      fill: $inverse-01;
    }
  }

  .#{$prefix}--btn--danger--primary {
    @include button-theme(
      $support-01,
      transparent,
      $inverse-01,
      darken($support-01, 10%),
      $ui-01
    );

    &:hover:disabled,
    &:focus:disabled {
      color: $ui-01;
      border: $button-border-width solid $support-01;
    }
  }

  .#{$prefix}--btn--sm {
    @include letter-spacing;
    height: 2rem;
    padding: $button-padding-sm;
  }

  .#{$prefix}--btn--secondary + .#{$prefix}--btn--primary,
  .#{$prefix}--btn--tertiary + .#{$prefix}--btn--danger--primary {
    margin-left: $spacing-md;
  }

  // Skeleton State
  .#{$prefix}--btn.#{$prefix}--skeleton {
    @include skeleton;
    width: rem(150px);
  }
}
```

</details>

- **Group**: [button](#button)
- **Requires**:
  - [button-base [mixin]](#button-base-mixin)
  - [button-theme [mixin]](#button-theme-mixin)
  - [letter-spacing [mixin]](#letter-spacing-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [hover-primary [variable]](#hover-primary-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [hover-secondary [variable]](#hover-secondary-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [support-01 [variable]](#support-01-variable)
  - [button-border-width [variable]](#button-border-width-variable)
  - [button-padding-sm [variable]](#button-padding-sm-variable)
  - [spacing-md [variable]](#spacing-md-variable)

### ❌button--x [mixin]

v10 button

<details>
<summary>Source code</summary>

```scss
@mixin button--x() {
  // button set styles
  .#{$prefix}--btn-set {
    display: flex;
  }

  .#{$prefix}--btn-set > .#{$prefix}--btn {
    max-width: rem(196px); // taken from design kit
    width: 100%;
  }

  .#{$prefix}--btn--secondary.#{$prefix}--btn--disabled
    + .#{$prefix}--btn--primary.#{$prefix}--btn--disabled,
  .#{$prefix}--btn--tertiary.#{$prefix}--btn--disabled
    + .#{$prefix}--btn--danger.#{$prefix}--btn--disabled {
    border-left: rem(1px) solid $disabled-03;
  }

  .#{$prefix}--btn {
    @include button-base--x;

    &.#{$prefix}--btn--disabled > .#{$prefix}--btn__icon,
    &:disabled > .#{$prefix}--btn__icon {
      fill: $ui-04;
    }
  }

  // Reset intrisic padding in Firefox (see #731)
  .#{$prefix}--btn::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  .#{$prefix}--btn--primary {
    @include button-theme--x(
      $interactive-01,
      transparent,
      $text-04,
      $hover-primary,
      $text-04,
      $active-primary
    );

    &:hover {
      color: $text-04;
    }
  }

  .#{$prefix}--btn--secondary {
    @include button-theme--x(
      $interactive-02,
      transparent,
      $text-04,
      $hover-secondary,
      $text-04,
      $active-secondary
    );

    &:hover,
    &:focus {
      color: $inverse-01;
    }
  }

  .#{$prefix}--btn--tertiary {
    @include button-theme--x(
      transparent,
      $interactive-03,
      $interactive-03,
      $hover-tertiary,
      $interactive-03,
      $active-tertiary
    );

    &:hover {
      color: $inverse-01;
    }

    &:disabled,
    &:hover:disabled,
    &:focus:disabled,
    &.#{$prefix}--btn--disabled,
    &.#{$prefix}--btn--disabled:hover,
    &.#{$prefix}--btn--disabled:focus {
      background: transparent;
      color: $disabled;

      & > .#{$prefix}--btn__icon {
        fill: $disabled;
      }
    }

    &:hover > .#{$prefix}--btn__icon {
      fill: $inverse-01;
    }
  }

  .#{$prefix}--btn--ghost {
    @include button-theme--x(
      transparent,
      transparent,
      $interactive-04,
      $hover-ui,
      $interactive-04,
      $active-ui
    );
    padding: rem(14px) rem(16px);

    .#{$prefix}--btn__icon {
      position: static;
      margin-left: $carbon--spacing-03;
    }

    &:hover,
    &:active {
      color: $ibm-color__blue-70;

      .#{$prefix}--btn__icon {
        fill: $ibm-color__blue-70;
      }
    }

    &:active {
      background-color: $active-ui;
    }

    &:disabled,
    &:hover:disabled,
    &:focus:disabled,
    &.#{$prefix}--btn--disabled,
    &.#{$prefix}--btn--disabled:hover,
    &.#{$prefix}--btn--disabled:focus {
      color: $disabled;
      background: transparent;
      border-color: transparent;

      .#{$prefix}--btn__icon {
        fill: $disabled;
      }
    }

    &.#{$prefix}--btn--sm {
      padding: 0.375rem 1rem;
    }
  }

  .#{$prefix}--btn--icon-only,
  .#{$prefix}--btn--sm.#{$prefix}--btn--icon-only {
    padding-right: rem(15px);

    .#{$prefix}--btn__icon {
      position: static;
    }

    &.#{$prefix}--btn--ghost .#{$prefix}--btn__icon {
      margin: 0;
    }
  }

  .#{$prefix}--btn--danger {
    @include button-theme--x(
      $support-01,
      $support-01,
      $text-04,
      $hover-danger,
      $icon-03,
      $active-danger
    );

    &:hover {
      color: $text-04;
      border: $button-border-width solid transparent;
    }
  }

  .#{$prefix}--btn--sm {
    min-height: rem(32px);
    padding: $button-padding-sm;
  }

  // Skeleton State
  .#{$prefix}--btn.#{$prefix}--skeleton {
    @include skeleton;
    width: rem(150px);
  }
}
```

</details>

- **Group**: [button](#button)
- **Requires**:
  - [button-base--x [mixin]](#button-base--x-mixin)
  - [button-theme--x [mixin]](#button-theme--x-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [disabled-03 [variable]](#disabled-03-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [text-04 [variable]](#text-04-variable)
  - [hover-primary [variable]](#hover-primary-variable)
  - [active-primary [variable]](#active-primary-variable)
  - [interactive-02 [variable]](#interactive-02-variable)
  - [hover-secondary [variable]](#hover-secondary-variable)
  - [active-secondary [variable]](#active-secondary-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [interactive-03 [variable]](#interactive-03-variable)
  - [hover-tertiary [variable]](#hover-tertiary-variable)
  - [active-tertiary [variable]](#active-tertiary-variable)
  - [disabled [variable]](#disabled-variable)
  - [interactive-04 [variable]](#interactive-04-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [active-ui [variable]](#active-ui-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [support-01 [variable]](#support-01-variable)
  - [hover-danger [variable]](#hover-danger-variable)
  - [icon-03 [variable]](#icon-03-variable)
  - [active-danger [variable]](#active-danger-variable)
  - [button-border-width [variable]](#button-border-width-variable)
  - [button-padding-sm [variable]](#button-padding-sm-variable)

### ❌button-base [mixin]

v9 button base styles

<details>
<summary>Source code</summary>

```scss
@mixin button-base() {
  @include reset;
  @include font-family;
  @include font-smoothing;
  @include letter-spacing;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: $button-font-size;
  font-weight: $button-font-weight;
  min-height: rem($button-height);
  padding: $button-padding;
  border-radius: $button-border-radius;
  text-align: center;
  text-decoration: none;
  transition-duration: $transition--base;
  transition-timing-function: ease-in;
  white-space: nowrap;
  line-height: 16px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .#{$prefix}--btn__icon {
    width: rem(16px);
    height: rem(16px);
    margin-left: 0.5rem;
    transition-duration: $transition--base;
    transition-timing-function: ease-in;
  }
}
```

</details>

- **Group**: [button](#button)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [font-smoothing [mixin]](#font-smoothing-mixin)
  - [letter-spacing [mixin]](#letter-spacing-mixin)
  - [rem [function]](#rem-function)
  - [button-font-size [variable]](#button-font-size-variable)
  - [button-font-weight [variable]](#button-font-weight-variable)
  - [button-height [variable]](#button-height-variable)
  - [button-padding [variable]](#button-padding-variable)
  - [button-border-radius [variable]](#button-border-radius-variable)
  - [transition--base [variable]](#transition--base-variable)
  - [prefix [variable]](#prefix-variable)
- **Used by**:
  - [button [mixin]](#button-mixin)

### ❌button-theme [mixin]

v9 button variant styles

<details>
<summary>Source code</summary>

```scss
@mixin button-theme() {
  background-color: $bg-color;
  border-width: $button-border-width;
  border-style: solid;
  border-color: $border-color;
  color: $font-color;

  &:focus,
  &:hover {
    background-color: $hover-bg-color;
  }

  &:focus {
    border: $button-border-width solid $ui-02;
    outline: $button-border-width solid $hover-bg-color;
  }

  &:disabled:hover,
  &:disabled:focus {
    background-color: $bg-color;
  }

  &:active {
    background-color: darken($bg-color, 20%);
  }

  .#{$prefix}--btn__icon {
    fill: $icon-color;
  }
}
```

</details>

- **Group**: [button](#button)
- **Requires**:
  - [button-border-width [variable]](#button-border-width-variable)
  - [ui-02 [variable]](#ui-02-variable)
  - [prefix [variable]](#prefix-variable)
- **Used by**:
  - [button [mixin]](#button-mixin)

### ❌button-base--x [mixin]

v10 button base styles

<details>
<summary>Source code</summary>

```scss
@mixin button-base--x() {
  @include reset;
  @include type-style('body-short-01');

  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  min-height: rem($button-height);
  padding: $button-padding;
  border-radius: $button-border-radius;
  text-align: left;
  text-decoration: none;
  transition: $duration--fast-01 motion(entrance, productive);
  outline: $button-outline-width solid transparent;
  position: relative;
  max-width: rem(320px);

  &:disabled,
  &.#{$prefix}--btn--disabled {
    cursor: not-allowed;
    color: $ui-04;
    background: $ibm-color__gray-30;
    border-color: $ibm-color__gray-30;
  }

  .#{$prefix}--btn__icon {
    position: absolute;
    right: rem(16px);
    flex-shrink: 0;
    width: rem(16px);
    height: rem(16px);
    transition: $duration--fast-01 motion(entrance, productive);
  }
}
```

</details>

- **Group**: [button](#button)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [rem [function]](#rem-function)
  - [motion [function]](#motion-function)
  - [button-height [variable]](#button-height-variable)
  - [button-padding [variable]](#button-padding-variable)
  - [button-border-radius [variable]](#button-border-radius-variable)
  - [duration--fast-01 [variable]](#duration--fast-01-variable)
  - [button-outline-width [variable]](#button-outline-width-variable)
  - [prefix [variable]](#prefix-variable)
  - [ui-04 [variable]](#ui-04-variable)
- **Used by**:
  - [button--x [mixin]](#button--x-mixin)

### ❌button-theme--x [mixin]

v10 button variant styles

<details>
<summary>Source code</summary>

```scss
@mixin button-theme--x() {
  background-color: $bg-color;
  border-width: $button-border-width;
  border-style: solid;
  border-color: $border-color;
  color: $font-color;

  &:hover {
    background-color: $hover-bg-color;
  }

  &::before,
  &::after {
    box-sizing: border-box;
    position: absolute;
    content: '';
    transition: $duration--fast-01 motion(entrance, productive);
  }

  &:not(.#{$prefix}--btn--disabled)::before {
    top: calc(-#{$button-border-width} + #{$button-outline-width});
    left: -$button-border-width + $button-outline-width;
    width: calc(
      100% + (2 * #{$button-border-width}) - (2 * #{$button-outline-width})
    );
    height: calc(
      100% + (2 * #{$button-border-width}) - (2 * #{$button-outline-width})
    );
    border: 1px solid transparent;
  }

  &:focus::before {
    border-color: $ui-02;
  }

  &:not(.#{$prefix}--btn--disabled)::after {
    top: -#{$button-border-width};
    left: -#{$button-border-width};
    height: calc(100% + 2 * #{$button-border-width});
    width: calc(100% + 2 * #{$button-border-width});
    border: $button-outline-width solid transparent;
  }

  &:focus::after {
    border-color: $focus;
  }

  &:disabled:hover,
  &:disabled:focus,
  &:hover.#{$prefix}--btn--disabled,
  &:focus.#{$prefix}--btn--disabled {
    color: $ui-04;
    background: $ibm-color__gray-30;
    border-color: $ibm-color__gray-30;
    text-decoration: none;
  }

  &:active {
    background-color: $active-color;
  }

  .#{$prefix}--btn__icon {
    fill: $icon-color;
  }
}
```

</details>

- **Group**: [button](#button)
- **Requires**:
  - [motion [function]](#motion-function)
  - [button-border-width [variable]](#button-border-width-variable)
  - [duration--fast-01 [variable]](#duration--fast-01-variable)
  - [prefix [variable]](#prefix-variable)
  - [button-outline-width [variable]](#button-outline-width-variable)
  - [ui-02 [variable]](#ui-02-variable)
  - [focus [variable]](#focus-variable)
  - [ui-04 [variable]](#ui-04-variable)
- **Used by**:
  - [button--x [mixin]](#button--x-mixin)

## checkbox

### ❌checkbox [mixin]

v9 checkbox

<details>
<summary>Source code</summary>

```scss
@mixin checkbox() {
  .#{$prefix}--form-item.#{$prefix}--checkbox-wrapper {
    margin-bottom: $spacing-md;

    &:first-of-type {
      margin-top: $spacing-xs;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .#{$prefix}--checkbox {
    @include hidden;
  }

  .#{$prefix}--checkbox-label {
    @include reset;
    @include font-family;
    @include font-smoothing;
    @include typescale('zeta');
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    padding-left: $spacing-lg;
    min-height: rem(16px);
  }

  .#{$prefix}--checkbox-label::before {
    box-sizing: border-box;
    content: '';
    position: absolute;
    left: 0;
    top: calc(50% - 9px);
    height: rem(18px);
    width: rem(18px);
    border: $checkbox-border-width solid $ui-05;
    background-color: $ui-01;
  }

  // Checkmark
  .#{$prefix}--checkbox-label::after {
    box-sizing: border-box;
    content: '';
    width: 9px;
    height: 5px;
    background: none;
    /*rtl:ignore*/
    border-left: 1px solid $inverse-01;
    border-bottom: 1px solid $inverse-01;
    /*rtl:ignore*/
    transform: scale(0) rotate(-45deg);
    position: absolute;
    left: rem(5px);
    top: 50%;
    margin-top: rem(-3px);
  }

  .#{$prefix}--checkbox:checked + .#{$prefix}--checkbox-label::before,
  .#{$prefix}--checkbox:indeterminate + .#{$prefix}--checkbox-label::before,
  .#{$prefix}--checkbox-label[data-contained-checkbox-state='true']::before,
  .#{$prefix}--checkbox-label[data-contained-checkbox-state='mixed']::before {
    background-color: $brand-01;
    border-color: $brand-01;
  }

  .#{$prefix}--checkbox:checked + .#{$prefix}--checkbox-label::after,
  .#{$prefix}--checkbox-label[data-contained-checkbox-state='true']::after {
    opacity: 1;
    /*rtl:ignore*/
    transform: scale(1) rotate(-45deg);
  }

  .#{$prefix}--checkbox:not(:checked) + .#{$prefix}--checkbox-label::after {
    opacity: 0;
    /*rtl:ignore*/
    transform: scale(0) rotate(-45deg);
  }

  .#{$prefix}--checkbox:focus + .#{$prefix}--checkbox-label::before,
  .#{$prefix}--checkbox-label__focus::before {
    @include focus-outline('blurred');
  }

  // Indeterminate dash
  .#{$prefix}--checkbox:indeterminate + .#{$prefix}--checkbox-label::after,
  .#{$prefix}--checkbox-label[data-contained-checkbox-state='mixed']::after {
    transform: scale(1) rotate(0deg);
    /*rtl:ignore*/
    border-left: 0 solid $inverse-01;
    border-bottom: 2px solid $inverse-01;
    opacity: 1;
    width: rem(10px);
    margin-top: rem(-4px);
    left: rem(4px);
  }

  //Disabled
  .#{$prefix}--checkbox:disabled + .#{$prefix}--checkbox-label,
  .#{$prefix}--checkbox:disabled ~ .#{$prefix}--checkbox-label-text,
  .#{$prefix}--checkbox-label[data-contained-checkbox-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .#{$prefix}--checkbox-appearance {
    position: absolute;
    left: 0;
    top: calc(50% - 9px);
    display: inline-block;
    height: rem(18px);
    width: rem(18px);
    margin-right: $spacing-xs;
    background-color: $ui-01;
    border: $checkbox-border-width solid $ui-05;
    min-width: rem(18px);
  }

  // Backwards compatibilty for old checkbox html using .#{$prefix}--checkbox-appearance
  .#{$prefix}--checkbox:checked
    + .#{$prefix}--checkbox-label
    .#{$prefix}--checkbox-appearance {
    top: rem(-1px);
  }

  .#{$prefix}--checkbox:checked + .#{$prefix}--checkbox-appearance,
  .#{$prefix}--checkbox:checked
    + .#{$prefix}--checkbox-label
    .#{$prefix}--checkbox-appearance {
    display: flex;
    align-items: baseline;
    background-color: $brand-01;
    border-color: $brand-01;
  }

  .#{$prefix}--checkbox:focus
    + .#{$prefix}--checkbox-label
    .#{$prefix}--checkbox-appearance,
  .#{$prefix}--checkbox:focus + .#{$prefix}--checkbox-appearance {
    @include focus-outline('blurred');
  }

  .#{$prefix}--checkbox:disabled + .#{$prefix}--checkbox-appearance {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .#{$prefix}--checkbox-checkmark {
    display: none;
    fill: $inverse-01;
    width: 100%;
    height: 100%;
  }

  .#{$prefix}--checkbox:checked
    + .#{$prefix}--checkbox-appearance
    .#{$prefix}--checkbox-checkmark,
  .#{$prefix}--checkbox:checked
    + .#{$prefix}--checkbox-label
    .#{$prefix}--checkbox-appearance
    .#{$prefix}--checkbox-checkmark {
    display: block;

    @-moz-document url-prefix() {
      & {
        stroke: $brand-01;
      }
    }
  }

  // Skeleton state
  .#{$prefix}--checkbox-label.#{$prefix}--skeleton {
    @include skeleton;
    width: rem(100px);
    height: rem(18px);

    &:after,
    &:before {
      border: none;
    }
  }
}
```

</details>

- **Group**: [checkbox](#checkbox)
- **Requires**:
  - [hidden [mixin]](#hidden-mixin)
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [font-smoothing [mixin]](#font-smoothing-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [spacing-lg [variable]](#spacing-lg-variable)
  - [checkbox-border-width [variable]](#checkbox-border-width-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [brand-01 [variable]](#brand-01-variable)

### ❌checkbox--x [mixin]

v10 checkbox

<details>
<summary>Source code</summary>

```scss
@mixin checkbox--x() {
  // Spacing between checkboxes
  .#{$prefix}--form-item.#{$prefix}--checkbox-wrapper {
    margin-bottom: rem(8px);
  }

  // Spacing above collection of checkboxes
  .#{$prefix}--form-item.#{$prefix}--checkbox-wrapper:first-of-type {
    margin-top: rem(3px);
  }

  // Remove spacing above collection of checkboxes if label is present
  .#{$prefix}--label + .#{$prefix}--form-item.#{$prefix}--checkbox-wrapper {
    margin-top: 0;
  }

  // Spacing below collection of checkboxes
  .#{$prefix}--form-item.#{$prefix}--checkbox-wrapper:last-of-type {
    margin-bottom: rem(3px);
  }

  // Visually, we'll hide the checkbox input and create our own styled version
  // to match the specs.
  .#{$prefix}--checkbox {
    @include hidden;
  }

  // The label corresponds to the content inside of the `label` tag. Since we're
  // creating our own checkbox style, we'll need to position this in order to
  // accomodate the spacing needed for the checkbox.
  .#{$prefix}--checkbox-label {
    @include reset;
    @include type-style('body-short-01');

    line-height: 1.5rem;
    position: relative;
    display: flex;
    cursor: pointer;
    padding-left: rem(26px); //width of checkbox 16px + 10px of padding
    min-height: rem(24px);
    user-select: none;
  }

  // Spacing for presentational checkbox
  .#{$prefix}--checkbox-label::before {
    box-sizing: border-box;
    content: '';

    // According to the spec, we'll want the bounding box for our checkbox to
    // be 16px. The border size will be what will be updated during the
    // different checkbox states.
    width: rem(16px);
    height: rem(16px);
    margin: rem(2px);

    // We need to position the pseudo-element absolutely in the space that we've
    // created with the padding from the label itself. We position only with
    // `top` since we don't want the checkbox to be centered vertically with the
    // text overflows.
    position: absolute;
    left: 0;
    top: rem(2px);

    // Checkboxes with a background color look visually off against a parent container.
    background-color: transparent;
    border: 1px solid $ui-05;
    border-radius: 1px;
  }

  // Create the appearance of the check in the `after` pseudo-element
  .#{$prefix}--checkbox-label::after {
    content: '';
    position: absolute;
    left: rem(6px);
    top: rem(8px);
    width: rem(7px);
    height: rem(3px);
    background: none;
    border-left: 2px solid $ui-02;
    border-bottom: 2px solid $ui-02;
    transform: scale(0) rotate(-45deg);
    transform-origin: bottom right;
    margin-top: rem(-3px);
  }

  //----------------------------------------------
  // Checked
  // ---------------------------------------------

  // Update properties for checked checkbox
  .#{$prefix}--checkbox:checked + .#{$prefix}--checkbox-label::before,
  .#{$prefix}--checkbox:indeterminate + .#{$prefix}--checkbox-label::before,
  .#{$prefix}--checkbox-label[data-contained-checkbox-state='true']::before,
  .#{$prefix}--checkbox-label[data-contained-checkbox-state='mixed']::before {
    background-color: $text-01;
    border-color: $text-01;
    border-width: 1px;
  }

  // Display the check
  .#{$prefix}--checkbox:checked + .#{$prefix}--checkbox-label::after,
  .#{$prefix}--checkbox-label[data-contained-checkbox-state='true']::after {
    transform: scale(1) rotate(-45deg);
  }

  // Indeterminate symbol
  .#{$prefix}--checkbox:indeterminate + .#{$prefix}--checkbox-label::after,
  .#{$prefix}--checkbox-label[data-contained-checkbox-state='mixed']::after {
    transform: scale(1) rotate(0deg);
    border-left: 0 solid $inverse-01;
    border-bottom: 2px solid $inverse-01;
    width: rem(8px);
    top: rem(11px);
  }

  //----------------------------------------------
  // Focus
  // ---------------------------------------------

  // Unchecked
  .#{$prefix}--checkbox:focus + .#{$prefix}--checkbox-label::before,
  .#{$prefix}--checkbox-label__focus::before,
  // Checked
  .#{$prefix}--checkbox:checked:focus + .#{$prefix}--checkbox-label::before,
  .#{$prefix}--checkbox-label[data-contained-checkbox-state='true'].#{$prefix}--checkbox-label__focus::before,
  // Indeterminate
  .#{$prefix}--checkbox:indeterminate:focus + .#{$prefix}--checkbox-label::before,
  .#{$prefix}--checkbox-label[data-contained-checkbox-state='mixed'].#{$prefix}--checkbox-label__focus::before {
    // We can't use outline here because of the rounded corners so have to increase the width/height to fake an outline.
    border-color: $interactive-01;
    border-width: 3px;
    width: rem(20px);
    height: rem(20px);
    left: -2px;
    top: 0;
  }

  //----------------------------------------------
  // Disabled
  // ---------------------------------------------

  // Workaround for: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11295231
  [disabled] ~ _ {
    font-size: inherit;
  }

  .#{$prefix}--checkbox:disabled + .#{$prefix}--checkbox-label,
  .#{$prefix}--checkbox-label[data-contained-checkbox-disabled='true'] {
    cursor: not-allowed;
    color: $disabled-02;
  }

  .#{$prefix}--checkbox:disabled + .#{$prefix}--checkbox-label::before,
  .#{$prefix}--checkbox-label[data-contained-checkbox-disabled='true']::before {
    border-color: $disabled-02;
  }

  .#{$prefix}--checkbox:checked:disabled + .#{$prefix}--checkbox-label::before,
  .#{$prefix}--checkbox:indeterminate:disabled
    + .#{$prefix}--checkbox-label::before,
  .#{$prefix}--checkbox-label[data-contained-checkbox-state='true'][data-contained-checkbox-disabled='true']::before,
  .#{$prefix}--checkbox-label[data-contained-checkbox-state='mixed'][data-contained-checkbox-disabled='true']::before {
    background-color: $disabled-02;
  }
}
```

</details>

- **Group**: [checkbox](#checkbox)
- **Requires**:
  - [hidden [mixin]](#hidden-mixin)
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [ui-02 [variable]](#ui-02-variable)
  - [text-01 [variable]](#text-01-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [disabled-02 [variable]](#disabled-02-variable)

## code-snippet

### ❌snippet [mixin]

v9 code-snippet

<details>
<summary>Source code</summary>

```scss
@mixin snippet() {
  .#{$prefix}--snippet code {
    font-family: $font-family-mono;
  }

  // Inline Code Snippet
  .#{$prefix}--snippet--inline {
    @include reset;
    position: relative;
    display: inline;
    padding: 0;
    background: transparent;
    font-size: inherit;
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: $field-01;
    color: $text-01;
    font-size: 85%;
    cursor: pointer;

    &:hover {
      background-color: darken($field-01, 10%);
    }

    &:focus {
      @include focus-outline;
      outline: none;
      border: 1px solid $brand-01;
    }
  }

  .#{$prefix}--snippet--inline code {
    padding: rem(1px) $spacing-xs;
  }

  .#{$prefix}--snippet--inline.#{$prefix}--snippet--light {
    background-color: $field-02;

    &:hover {
      background-color: rgba($brand-02, 0.1);
    }
  }

  // Single Line Snippet
  .#{$prefix}--snippet--single {
    @include bx--snippet;
    height: rem(56px);
    padding: 0 $spacing-2xl 0 $spacing-md;
  }

  .#{$prefix}--snippet--single .#{$prefix}--snippet-container {
    display: flex;
    align-items: center;
    height: 130%;
    overflow-x: scroll;
    position: relative;
    padding-bottom: $spacing-md;
  }

  .#{$prefix}--snippet--single pre {
    white-space: nowrap;
  }

  // Multi Line Snippet
  .#{$prefix}--snippet--multi {
    @include bx--snippet;
    padding: $spacing-md $spacing-3xl $spacing-xl $spacing-lg;
  }

  .#{$prefix}--snippet--multi .#{$prefix}--snippet-container {
    overflow: hidden;
    position: relative;
    max-height: rem(238px);
    min-height: rem(56px);
    transition: all $transition--base $carbon--standard-easing;
  }

  .#{$prefix}--snippet--expand.#{$prefix}--snippet--multi
    .#{$prefix}--snippet-container {
    max-height: rem(1500px);
  }

  .#{$prefix}--snippet--multi .#{$prefix}--snippet-container pre {
    white-space: pre-wrap;
  }

  .#{$prefix}--snippet__icon {
    fill: $brand-01;
    height: rem(24px);
    width: rem(18px);
    transition: all $transition--base $carbon--standard-easing;

    &:hover {
      fill: $hover-primary;
    }
  }

  .#{$prefix}--snippet-button {
    @include reset;
    cursor: pointer;
    position: absolute;
    top: 0.675rem;
    right: 0.5rem;
    border: none;
    background-color: transparent;
    outline: none;
    padding: 0;
    height: rem(32px);
    width: rem(32px);
    overflow: visible;

    &:focus {
      @include focus-outline('border');
    }
  }

  .#{$prefix}--snippet .#{$prefix}--btn--copy__feedback {
    @include font-family;
    z-index: z('overlay');
    font-weight: 400;
    left: inherit;
    top: 0.75rem;
    right: 1.25rem;
  }

  // Skeleton State
  .#{$prefix}--snippet--code.#{$prefix}--skeleton {
    height: rem(98px);
  }

  .#{$prefix}--snippet--terminal.#{$prefix}--skeleton {
    height: rem(56px);
  }

  .#{$prefix}--snippet.#{$prefix}--skeleton .#{$prefix}--snippet-container {
    height: 100%;
  }

  .#{$prefix}--snippet.#{$prefix}--skeleton code {
    @include skeleton;
    width: 100%;
    height: 1rem;
    display: block;
  }

  .#{$prefix}--snippet-button .#{$prefix}--btn--copy__feedback {
    top: rem(25px);
    left: 1rem;
    right: auto;
  }

  .#{$prefix}--snippet--inline .#{$prefix}--btn--copy__feedback {
    right: auto;
    left: 50%;
  }

  // Show more / less button
  .#{$prefix}--snippet-btn--expand {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .#{$prefix}--snippet-btn--expand--hide .#{$prefix}--snippet-btn--expand {
    display: none;
  }

  .#{$prefix}--snippet-btn--expand .#{$prefix}--icon-chevron--down {
    fill: $brand-01;
    margin-left: $spacing-2xs;
    transform: rotate(0deg);
    transition: $transition--base;
  }

  .#{$prefix}--snippet-btn--expand:hover .#{$prefix}--icon-chevron--down,
  .#{$prefix}--snippet-btn--expand:focus .#{$prefix}--icon-chevron--down {
    fill: $inverse-01;
  }

  .#{$prefix}--snippet--expand
    .#{$prefix}--snippet-btn--expand
    .#{$prefix}--icon-chevron--down {
    transform: rotate(180deg);
  }

  // Skeleton

  #{$prefix}--snippet--multi.#{$prefix}--skeleton {
    height: rem(98px);
  }

  .#{$prefix}--snippet--single.#{$prefix}--skeleton {
    height: rem(56px);
  }

  .#{$prefix}--snippet.#{$prefix}--skeleton .#{$prefix}--snippet-container {
    height: 100%;
  }

  .#{$prefix}--snippet.#{$prefix}--skeleton span {
    @include skeleton;
    width: 100%;
    height: 1rem;
    display: block;
    margin-top: 0.5rem;

    &:first-child {
      margin: 0;
    }

    &:nth-child(2) {
      width: 85%;
    }

    &:nth-child(3) {
      width: 95%;
    }
  }

  .#{$prefix}--snippet--single.#{$prefix}--skeleton
    .#{$prefix}--snippet-container {
    padding-bottom: 0;
  }

  /*
    Deprecated class names will be removed in v10.x
  */

  .#{$prefix}--snippet--terminal {
    @include bx--snippet;
    height: rem(56px);
    padding: 0 $spacing-2xl 0 $spacing-md;
  }

  .#{$prefix}--snippet--terminal .#{$prefix}--snippet-container {
    display: flex;
    align-items: center;
    height: 130%;
    white-space: nowrap;
    overflow-x: scroll;
    position: relative;
    padding-bottom: $spacing-md;
  }

  .#{$prefix}--snippet--code {
    @include bx--snippet;
    padding: $spacing-md $spacing-3xl $spacing-md $spacing-lg;
  }

  .#{$prefix}--snippet--code .#{$prefix}--snippet-container {
    overflow: hidden;
    position: relative;
    max-height: rem(254px);
    min-height: rem(56px);
    transition: all $transition--base $carbon--standard-easing;
  }

  .#{$prefix}--snippet--expand.#{$prefix}--snippet--code
    .#{$prefix}--snippet-container {
    max-height: rem(1500px);
  }

  .#{$prefix}--snippet--code .#{$prefix}--snippet-container pre {
    white-space: pre-wrap;
  }

  .#{$prefix}--snippet--inline .#{$prefix}--btn--copy__feedback {
    right: auto;
  }

  // Skeleton State
  .#{$prefix}--snippet--code.#{$prefix}--skeleton {
    height: rem(98px);
  }

  .#{$prefix}--snippet--terminal.#{$prefix}--skeleton {
    height: rem(56px);
  }

  .#{$prefix}--snippet.#{$prefix}--skeleton .#{$prefix}--snippet-container {
    height: 100%;
  }

  .#{$prefix}--snippet.#{$prefix}--skeleton code {
    @include skeleton;
    width: 100%;
    height: 1rem;
    display: block;
  }
}
```

</details>

- **Group**: [code-snippet](#code-snippet)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [bx--snippet [mixin]](#bx--snippet-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [z [function]](#z-function)
  - [prefix [variable]](#prefix-variable)
  - [font-family-mono [variable]](#font-family-mono-variable)
  - [field-01 [variable]](#field-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [field-02 [variable]](#field-02-variable)
  - [brand-02 [variable]](#brand-02-variable)
  - [spacing-2xl [variable]](#spacing-2xl-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [spacing-3xl [variable]](#spacing-3xl-variable)
  - [spacing-xl [variable]](#spacing-xl-variable)
  - [spacing-lg [variable]](#spacing-lg-variable)
  - [transition--base [variable]](#transition--base-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [hover-primary [variable]](#hover-primary-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [inverse-01 [variable]](#inverse-01-variable)

### ❌snippet--x [mixin]

v10 code-snippet

<details>
<summary>Source code</summary>

```scss
@mixin snippet--x() {
  .#{$prefix}--snippet code {
    @include type-style('code-01');
  }

  // Inline Code Snippet
  .#{$prefix}--snippet--inline {
    @include reset;
    // Note: originally this inline snippet inherited font-size, we might need
    // a more flexible strategy than explicitly setting font-size with this
    // type style
    @include type-style('code-01');

    position: relative;
    display: inline;
    padding: 0;
    border: 2px solid transparent;
    border-radius: 4px;
    background-color: $ui-01;
    color: $text-01;
    cursor: pointer;

    &:hover {
      background-color: $ui-03;
    }

    &:active {
      background-color: $copy-active;
    }

    &:focus {
      outline: none;
      border: 2px solid $interactive-01;
    }
  }

  .#{$prefix}--snippet--inline code {
    padding: 0 $spacing-xs;
  }

  .#{$prefix}--snippet--inline.#{$prefix}--snippet--light {
    background-color: $field-02;

    &:hover {
      background-color: rgba($interactive-02, 0.1);
    }
  }

  // Single Line Snippet
  .#{$prefix}--snippet--single {
    @include bx--snippet--x;
    border: none;
    max-width: rem(760px);
    min-width: rem(320px);
    height: $carbon--spacing-08;
    padding: 0 56px 0 $carbon--spacing-05;
  }

  .#{$prefix}--snippet--single .#{$prefix}--snippet-container {
    display: flex;
    align-items: center;
    overflow-x: scroll;
    position: relative;
    padding: 0 0 $carbon--spacing-05 0;
    height: rem(56px);
  }

  .#{$prefix}--snippet--single pre {
    white-space: nowrap;
    @include type-style('code-01');
    padding-right: $spacing-xs;
  }

  .#{$prefix}--snippet--single::after {
    width: rem(16px);
    height: 100%;
    content: '';
    position: absolute;
    top: 0;
    right: rem(56px);
    background-image: linear-gradient(
      to right,
      rgba(243, 243, 243, 0),
      rgba(243, 243, 243, 1)
    );
  }

  // Multi Line Snippet
  .#{$prefix}--snippet--multi {
    @include bx--snippet--x;
    border: none;
    padding: $carbon--spacing-05;
    min-width: rem(320px);
    max-width: 100%;
  }

  //closed snippet container
  .#{$prefix}--snippet--multi .#{$prefix}--snippet-container {
    overflow: hidden;
    position: relative;
    max-height: rem(238px);
    min-height: rem(56px);
    transition: max-height $duration--moderate-01 motion(standard, productive);
  }

  // expanded snippet container
  .#{$prefix}--snippet--multi.#{$prefix}--snippet--expand
    .#{$prefix}--snippet-container {
    max-height: rem(1500px);
    transition: max-height $duration--moderate-01 motion(standard, productive);
  }

  // closed pre
  .#{$prefix}--snippet--multi .#{$prefix}--snippet-container pre {
    overflow: hidden;
    padding-bottom: rem(24px);
  }

  // expanded pre
  .#{$prefix}--snippet--multi.#{$prefix}--snippet--expand
    .#{$prefix}--snippet-container
    pre {
    overflow-x: scroll;
  }

  .#{$prefix}--snippet--multi .#{$prefix}--snippet-container pre::after {
    width: rem(16px);
    height: 100%;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    background-image: linear-gradient(
      to right,
      rgba(243, 243, 243, 0),
      rgba(243, 243, 243, 1)
    );
  }

  .#{$prefix}--snippet--multi .#{$prefix}--snippet-container pre code {
    overflow: hidden;
  }

  //Copy Button
  .#{$prefix}--snippet__icon {
    fill: $icon-01;
    height: rem(16px);
    width: rem(16px);
    transition: all $duration--fast-01 motion(standard, productive);
  }

  .#{$prefix}--snippet-button {
    @include reset;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background-color: $ui-01;
    outline: none;
    padding: 0;
    height: $carbon--spacing-08;
    width: $carbon--spacing-08;
    overflow: visible;

    &:focus {
      @include focus-outline('outline');
      outline-color: $focus;
    }
  }

  .#{$prefix}--snippet--multi .#{$prefix}--snippet-button {
    height: $carbon--spacing-07;
    width: $carbon--spacing-07;
    top: $spacing-xs;
    right: $spacing-xs;
  }

  .#{$prefix}--snippet-button:hover {
    background: $hover-ui;
  }

  .#{$prefix}--snippet-button:active {
    background-color: $copy-active;
  }

  .#{$prefix}--btn--copy__feedback {
    @include type-style('body-short-01');
    z-index: z('overlay');
    font-weight: 400;
    left: inherit;
    top: 0.75rem;
    right: 1.25rem;
  }

  .#{$prefix}--btn--copy__feedback:before,
  .#{$prefix}--btn--copy__feedback:after {
    background: $copy-btn-feedback;
  }

  .#{$prefix}--btn--copy__feedback:after {
    border: none;
  }

  // Show more / less button
  button.#{$prefix}--btn.#{$prefix}--snippet-btn--expand {
    display: inline-flex;
    align-items: center;
    position: absolute;
    right: $spacing-xs;
    bottom: $spacing-xs;
    padding: $spacing-xs;
    padding-left: $carbon--spacing-05;
    color: $text-01;
    background-color: $field-01;
  }

  button.#{$prefix}--btn.#{$prefix}--snippet-btn--expand
    .#{$prefix}--snippet-btn--text {
    position: relative;
    top: rem(-1px);
  }

  .#{$prefix}--snippet-btn--expand--hide.#{$prefix}--snippet-btn--expand {
    display: none;
  }

  .#{$prefix}--snippet-btn--expand .#{$prefix}--icon-chevron--down {
    fill: $text-01;
    margin-left: $spacing-xs;
    margin-bottom: rem(1px);
    transform: rotate(0deg);
    transition: $duration--moderate-01 motion(standard, productive);
  }

  button.#{$prefix}--btn.#{$prefix}--snippet-btn--expand:hover {
    background: $hover-ui;
    color: $text-01;
  }

  .#{$prefix}--snippet-btn--expand:active {
    background-color: $copy-active;
  }

  .#{$prefix}--snippet-btn--expand:focus {
    @include focus-outline('outline');
  }

  .#{$prefix}--snippet--expand
    .#{$prefix}--snippet-btn--expand
    .#{$prefix}--icon-chevron--down {
    transform: rotate(180deg);
    transition: transform $transition--expansion;
  }

  // Skeleton State
  .#{$prefix}--snippet--code.#{$prefix}--skeleton {
    height: rem(98px);
  }

  .#{$prefix}--snippet--terminal.#{$prefix}--skeleton {
    height: rem(56px);
  }

  .#{$prefix}--snippet.#{$prefix}--skeleton .#{$prefix}--snippet-container {
    height: 100%;
  }

  .#{$prefix}--snippet.#{$prefix}--skeleton code {
    @include skeleton;
    width: 100%;
    height: 1rem;
    display: block;
  }

  .#{$prefix}--snippet-button .#{$prefix}--btn--copy__feedback {
    top: rem(25px);
    left: 1rem;
    right: auto;
  }

  .#{$prefix}--snippet--inline .#{$prefix}--btn--copy__feedback {
    right: auto;
    left: 50%;
  }

  #{$prefix}--snippet--multi.#{$prefix}--skeleton {
    height: rem(98px);
  }

  .#{$prefix}--snippet--single.#{$prefix}--skeleton {
    height: rem(56px);
  }

  .#{$prefix}--snippet.#{$prefix}--skeleton .#{$prefix}--snippet-container {
    height: 100%;
  }

  .#{$prefix}--snippet.#{$prefix}--skeleton span {
    @include skeleton;
    width: 100%;
    height: 1rem;
    display: block;
    margin-top: 0.5rem;

    &:first-child {
      margin: 0;
    }

    &:nth-child(2) {
      width: 85%;
    }

    &:nth-child(3) {
      width: 95%;
    }
  }

  .#{$prefix}--snippet--single.#{$prefix}--skeleton
    .#{$prefix}--snippet-container {
    padding-bottom: 0;
  }

  .#{$prefix}--snippet--inline .#{$prefix}--btn--copy__feedback {
    right: auto;
  }

  // Skeleton State
  .#{$prefix}--snippet--code.#{$prefix}--skeleton {
    height: rem(98px);
  }

  .#{$prefix}--snippet--terminal.#{$prefix}--skeleton {
    height: rem(56px);
  }

  .#{$prefix}--snippet.#{$prefix}--skeleton .#{$prefix}--snippet-container {
    height: 100%;
  }

  .#{$prefix}--snippet.#{$prefix}--skeleton code {
    @include skeleton;
    width: 100%;
    height: 1rem;
    display: block;
  }
}
```

</details>

- **Group**: [code-snippet](#code-snippet)
- **Requires**:
  - [type-style [mixin]](#type-style-mixin)
  - [reset [mixin]](#reset-mixin)
  - [bx--snippet--x [mixin]](#bx--snippet--x-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [motion [function]](#motion-function)
  - [z [function]](#z-function)
  - [prefix [variable]](#prefix-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [copy-active [variable]](#copy-active-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [field-02 [variable]](#field-02-variable)
  - [interactive-02 [variable]](#interactive-02-variable)
  - [carbon--spacing-08 [variable]](#carbon--spacing-08-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [duration--moderate-01 [variable]](#duration--moderate-01-variable)
  - [icon-01 [variable]](#icon-01-variable)
  - [duration--fast-01 [variable]](#duration--fast-01-variable)
  - [focus [variable]](#focus-variable)
  - [carbon--spacing-07 [variable]](#carbon--spacing-07-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [copy-btn-feedback [variable]](#copy-btn-feedback-variable)
  - [field-01 [variable]](#field-01-variable)
  - [transition--expansion [variable]](#transition--expansion-variable)

### ❌bx--snippet [mixin]

v9 code-snippet base styles

<details>
<summary>Source code</summary>

```scss
@mixin bx--snippet() {
  @include typescale('omega');
  line-height: 1.45;
  background: $snippet-background-color;
  border: 1px solid $snippet-border-color;
  font-family: $font-family-mono;
  position: relative;
  max-width: rem(600px);
  width: 100%;
}
```

</details>

- **Group**: [code-snippet](#code-snippet)
- **Requires**:
  - [typescale [mixin]](#typescale-mixin)
  - [rem [function]](#rem-function)
  - [snippet-background-color [variable]](#snippet-background-color-variable)
  - [snippet-border-color [variable]](#snippet-border-color-variable)
  - [font-family-mono [variable]](#font-family-mono-variable)
- **Used by**:
  - [snippet [mixin]](#snippet-mixin)

### ❌bx--snippet--x [mixin]

v10 code-snippet base styles

<details>
<summary>Source code</summary>

```scss
@mixin bx--snippet--x() {
  @include type-style('code-01');
  background: $snippet-background-color;
  border: 1px solid $snippet-border-color;
  position: relative;
  max-width: rem(600px);
  width: 100%;
}
```

</details>

- **Group**: [code-snippet](#code-snippet)
- **Requires**:
  - [type-style [mixin]](#type-style-mixin)
  - [rem [function]](#rem-function)
  - [snippet-background-color [variable]](#snippet-background-color-variable)
  - [snippet-border-color [variable]](#snippet-border-color-variable)
- **Used by**:
  - [snippet--x [mixin]](#snippet--x-mixin)

## combo-box

### ❌combo-box [mixin]

v9 combo-box

<details>
<summary>Source code</summary>

```scss
@mixin combo-box() {
  .#{$prefix}--combo-box > .#{$prefix}--list-box__field {
    padding: 0;
  }
}
```

</details>

- **Group**: [combo-box](#combo-box)
- **Requires**:
  - [prefix [variable]](#prefix-variable)

### ❌combo-box--x [mixin]

v10 combo-box

<details>
<summary>Source code</summary>

```scss
@mixin combo-box--x() {
  .#{$prefix}--combo-box .#{$prefix}--text-input {
    &::placeholder {
      color: $text-02;
      opacity: 1;
    }

    &[disabled]::placeholder {
      color: $disabled-02;
    }
  }

  .#{$prefix}--combo-box.#{$prefix}--list-box--expanded
    .#{$prefix}--text-input {
    border-bottom-color: $ui-03;
  }

  .#{$prefix}--combo-box .#{$prefix}--list-box__field,
  .#{$prefix}--combo-box.#{$prefix}--list-box[data-invalid]
    .#{$prefix}--list-box__field {
    padding: 0;
  }
}
```

</details>

- **Group**: [combo-box](#combo-box)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
  - [text-02 [variable]](#text-02-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [ui-03 [variable]](#ui-03-variable)

## content-switcher

### ❌content-switcher [mixin]

v9 content-switcher

<details>
<summary>Source code</summary>

```scss
@mixin content-switcher() {
  .#{$prefix}--content-switcher {
    @include font-family;
    display: flex;
    height: rem(40px);
  }

  .#{$prefix}--content-switcher-btn {
    @include reset;
    @include font-smoothing;
    @include typescale('zeta');
    @include font-family;
    background-color: transparent;
    display: flex;
    align-items: center;
    padding: 0 $spacing-xl;
    margin: 0;
    text-decoration: none;
    border: 1px solid $brand-01;
    color: $brand-01;

    &:focus {
      outline: 1px solid transparent;
      background-color: $hover-primary;
      z-index: 2;
      border-color: $hover-primary;
      text-decoration: underline;
      color: $inverse-01;
    }

    &:hover {
      cursor: pointer;
    }

    &:hover,
    &:active {
      background-color: $hover-primary;
      border-color: $hover-primary;
      color: $inverse-01;
    }
  }

  .#{$prefix}--content-switcher__icon {
    margin-right: $spacing-xs;
    fill: currentColor;
    // need to color any child path or g
    * {
      fill: currentColor;
    }
  }

  .#{$prefix}--content-switcher-btn:not(:last-of-type) {
    border-right: none;
  }

  .#{$prefix}--content-switcher-btn:not(:first-of-type) {
    border-left: $content-switcher-option-border;

    &:hover {
      border-left-color: $hover-primary;
    }
  }

  .#{$prefix}--content-switcher-btn:first-of-type {
    border-bottom-left-radius: $content-switcher-border-radius;
    border-top-left-radius: $content-switcher-border-radius;

    &:hover {
      border-color: $hover-primary;
    }

    &:focus {
      z-index: 0;
    }
  }

  .#{$prefix}--content-switcher-btn:last-of-type {
    border-top-right-radius: $content-switcher-border-radius;
    border-bottom-right-radius: $content-switcher-border-radius;

    &:hover {
      border-color: $hover-primary;
    }

    &:focus {
      z-index: 0;
    }
  }

  .#{$prefix}--content-switcher-btn.#{$prefix}--content-switcher--selected {
    background-color: $brand-01;
    color: $inverse-01;
    font-weight: 400;
    outline: 1px solid transparent;

    &:hover,
    &:focus {
      border-color: $hover-primary;
      background-color: $hover-primary;
    }
  }
}
```

</details>

- **Group**: [content-switcher](#content-switcher)
- **Requires**:
  - [font-family [mixin]](#font-family-mixin)
  - [reset [mixin]](#reset-mixin)
  - [font-smoothing [mixin]](#font-smoothing-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-xl [variable]](#spacing-xl-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [hover-primary [variable]](#hover-primary-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [content-switcher-option-border [variable]](#content-switcher-option-border-variable)
  - [content-switcher-border-radius [variable]](#content-switcher-border-radius-variable)

### ❌content-switcher--x [mixin]

v10 content-switcher

<details>
<summary>Source code</summary>

```scss
@mixin content-switcher--x() {
  .#{$prefix}--content-switcher {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: rem(32px);
  }

  .#{$prefix}--content-switcher--disabled {
    cursor: not-allowed;
  }

  .#{$prefix}--content-switcher-btn {
    @include reset;
    @include type-style('body-short-01');
    @include focus-outline('reset');

    background-color: $ui-01;
    display: inline-flex;
    align-items: center;
    width: 100%;
    height: rem(40px);
    padding: $carbon--spacing-03 $carbon--spacing-05;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
    text-decoration: none;
    border: none;
    color: $text-02;
    transition: all $duration--fast-01 motion(standard, productive);
    position: relative;

    &:focus {
      box-shadow: inset 0 0 0 2px $focus;
      z-index: 3;
    }

    &:hover {
      cursor: pointer;
    }

    &:hover,
    &:active {
      background-color: $hover-ui;
      color: $text-01;
      z-index: 3;
    }

    &:disabled {
      color: $ui-03;
      pointer-events: none;

      &:hover {
        cursor: not-allowed;
      }
    }
  }

  .#{$prefix}--content-switcher-btn:first-child {
    border-top-left-radius: rem(4px);
    border-bottom-left-radius: rem(4px);
  }

  .#{$prefix}--content-switcher-btn:last-child {
    border-top-right-radius: rem(4px);
    border-bottom-right-radius: rem(4px);
  }

  .#{$prefix}--content-switcher-btn:not(:first-of-type)::before {
    content: '';
    display: block;
    height: rem(16px);
    width: rem(1px);
    background-color: $content-switcher-divider;
    position: absolute;
    z-index: 2;
    left: 0;
  }

  .#{$prefix}--content-switcher-btn.#{$prefix}--content-switcher--selected::before,
  .#{$prefix}--content-switcher-btn.#{$prefix}--content-switcher--selected
    + .#{$prefix}--content-switcher-btn::before,
  .#{$prefix}--content-switcher-btn:focus::before,
  .#{$prefix}--content-switcher-btn:focus
    + .#{$prefix}--content-switcher-btn::before,
  .#{$prefix}--content-switcher-btn:hover::before,
  .#{$prefix}--content-switcher-btn:hover
    + .#{$prefix}--content-switcher-btn::before {
    background-color: transparent;
  }

  .#{$prefix}--content-switcher__icon {
    fill: $text-02;
    transition: fill $duration--fast-01 motion(standard, productive);
  }

  .#{$prefix}--content-switcher__icon + span {
    margin-left: $carbon--spacing-03;
  }

  .#{$prefix}--content-switcher__label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .#{$prefix}--content-switcher-btn:hover .#{$prefix}--content-switcher__icon,
  .#{$prefix}--content-switcher-btn:focus .#{$prefix}--content-switcher__icon {
    fill: $text-01;
  }

  .#{$prefix}--content-switcher-btn.#{$prefix}--content-switcher--selected {
    background-color: $ui-05;
    color: $inverse-01;
    z-index: 3;

    // TODO: replace with new disabled color token when finalized
    &:disabled {
      background-color: $ibm-color__gray-30;
    }
  }

  .#{$prefix}--content-switcher-btn.#{$prefix}--content-switcher--selected
    .#{$prefix}--content-switcher__icon {
    fill: $inverse-01;
  }
}
```

</details>

- **Group**: [content-switcher](#content-switcher)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [rem [function]](#rem-function)
  - [motion [function]](#motion-function)
  - [prefix [variable]](#prefix-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [text-02 [variable]](#text-02-variable)
  - [duration--fast-01 [variable]](#duration--fast-01-variable)
  - [focus [variable]](#focus-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [content-switcher-divider [variable]](#content-switcher-divider-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [inverse-01 [variable]](#inverse-01-variable)

## data-table

### ❌assistive-text [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin assistive-text() {
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

- **Group**: [data-table](#data-table)

### ❌data-table-v2-action [mixin]

v9 data table action

<details>
<summary>Source code</summary>

```scss
@mixin data-table-v2-action() {
  .#{$prefix}--table-toolbar {
    display: flex;
    padding-top: $spacing-xs;
    padding-bottom: $spacing-xs;
    width: 100%;
    position: relative;

    .#{$prefix}--search-input {
      position: relative;

      &:focus {
        box-shadow: inset 0px 0px 0px 1px $brand-01;
        outline: 0;
      }
    }
  }

  .#{$prefix}--toolbar-content {
    display: flex;
    margin-left: auto;
  }

  .#{$prefix}--toolbar-action {
    @include button-reset;
    cursor: pointer;
    padding-left: $spacing-sm;
    padding-right: $spacing-sm;

    &:hover {
      > .#{$prefix}--toolbar-action__icon {
        fill: $hover-secondary;
      }
    }

    &:focus {
      @include focus-outline;
      > .#{$prefix}--toolbar-action__icon {
        fill: $hover-secondary;
      }
    }

    &:active {
      > .#{$prefix}--toolbar-action__icon {
        fill: $hover-secondary;
      }
    }

    &:last-of-type {
      padding-right: 0;
    }

    ~ .#{$prefix}--btn {
      margin-left: $spacing-sm;
      margin-right: $spacing-sm;
    }
  }

  .#{$prefix}--toolbar-action__icon {
    height: rem(16px);
    width: auto;
    max-width: 16px;
    fill: $ui-05;
    transition: $transition--base;
  }

  .#{$prefix}--batch-actions {
    display: flex;
    align-items: center;
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
    padding-left: $spacing-lg;
    padding-right: $spacing-lg;
    width: 100%;
    height: 100%;
    z-index: z('header');
    background-color: transparent;
    transition: opacity 200ms $carbon--standard-easing, background-color 200ms
        $carbon--standard-easing;
    pointer-events: none;
    visibility: hidden;

    &:focus {
      @include focus-outline;
    }

    .#{$prefix}--btn {
      color: $ui-01;
    }

    .#{$prefix}--btn__icon {
      fill: $ui-01;
    }

    .#{$prefix}--btn--ghost {
      &:hover,
      &:focus {
        background-color: $ui-01;
        color: $brand-01;

        .#{$prefix}--btn__icon {
          fill: $brand-01;
        }
      }

      &:focus {
        border: 2px solid $brand-01;
        outline: 2px solid $ui-02;
      }
    }
  }

  .#{$prefix}--batch-actions--active {
    visibility: visible;
    background-color: $brand-01;
    pointer-events: all;
    transition: opacity 200ms cubic-bezier(0.5, 0, 0.1, 1), background-color
        200ms cubic-bezier(0.5, 0, 0.1, 1);
    opacity: 1;
  }

  .#{$prefix}--action-list {
    margin-left: -0.5rem;
  }

  .#{$prefix}--action-icons {
    margin-left: auto;
    svg {
      padding: 0 $spacing-sm;
      fill: $ui-01;
      height: rem(16px);
      width: auto;
    }
  }

  .#{$prefix}--batch-summary {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: $ui-01;
  }

  .#{$prefix}--batch-summary__para {
    @include typescale('zeta');
    margin-right: $spacing-lg;
  }

  .#{$prefix}--batch-summary__cancel {
    @include button-reset(auto);
    @include typescale('zeta');
    color: $ui-01;
    border-bottom: 1px solid transparent;
    font-weight: 600;
    cursor: pointer;
    transition: border $transition--base $carbon--standard-easing;

    &:hover,
    &:focus {
      border-bottom: 1px solid $ui-01;
    }
  }

  .#{$prefix}--batch-actions ~ .#{$prefix}--toolbar-search-container,
  .#{$prefix}--batch-actions ~ .#{$prefix}--toolbar-content {
    opacity: 1;
    transition: opacity $transition--base;
  }

  .#{$prefix}--batch-actions--active ~ .#{$prefix}--toolbar-search-container,
  .#{$prefix}--batch-actions--active ~ .#{$prefix}--toolbar-content {
    opacity: 0;
  }
}
```

</details>

- **Group**: [data-table](#data-table)
- **Requires**:
  - [button-reset [mixin]](#button-reset-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [rem [function]](#rem-function)
  - [z [function]](#z-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [spacing-sm [variable]](#spacing-sm-variable)
  - [hover-secondary [variable]](#hover-secondary-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [transition--base [variable]](#transition--base-variable)
  - [spacing-lg [variable]](#spacing-lg-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [ui-02 [variable]](#ui-02-variable)

### ❌data-table-v2-action--x [mixin]

v10 data table action

<details>
<summary>Source code</summary>

```scss
@mixin data-table-v2-action--x() {
  //-------------------------------------------------
  //TOOLBAR
  //-------------------------------------------------
  .#{$prefix}--table-toolbar {
    display: flex;
    width: 100%;
    background: $ui-01;
    height: $layout-04;
    position: relative; //need for batch actions
  }

  .#{$prefix}--toolbar-content {
    display: flex;
    height: $layout-04;
    width: 100%;
    justify-content: flex-end;
  }

  //-------------------------------------------------
  //HIDDEN SEARCH - DEFAULT TOOLBAR
  //-------------------------------------------------
  .#{$prefix}--toolbar-search-container-expandable {
    height: $layout-04;
    width: $layout-04;
    position: relative;
    transition: flex $transition--expansion $carbon--standard-easing;
    box-shadow: none;
  }

  .#{$prefix}--toolbar-search-container-expandable .#{$prefix}--search {
    width: $layout-04;
    height: 100%;
  }

  .#{$prefix}--toolbar-search-container-expandable
    .#{$prefix}--search
    .#{$prefix}--search-magnifier {
    height: $layout-04;
    width: $layout-04;
    padding: $spacing-md;
    left: 0;
  }

  .#{$prefix}--toolbar-search-container-expandable
    .#{$prefix}--search
    .#{$prefix}--search-magnifier:focus {
    @include focus-outline('outline');
  }

  .#{$prefix}--toolbar-search-container-expandable
    .#{$prefix}--search
    .#{$prefix}--search-magnifier:hover {
    background: $hover-field;
  }

  .#{$prefix}--toolbar-search-container-expandable
    .#{$prefix}--search
    .#{$prefix}--search-input {
    border: none;
    height: 100%;
    visibility: hidden;
    padding: 0;
    background-color: transparent;
  }

  .#{$prefix}--toolbar-search-container-expandable
    .#{$prefix}--search
    .#{$prefix}--search-close {
    height: $layout-04;
    width: $layout-04;
  }

  //-------------------------------------------------
  //ACTIVE SEARCH - DEFAULT TOOLBAR
  //-------------------------------------------------
  .#{$prefix}--toolbar-search-container-active {
    flex: auto;
    transition: flex $transition--expansion $carbon--standard-easing;
  }

  .#{$prefix}--toolbar-search-container-active .#{$prefix}--search {
    width: 100%;
  }

  .#{$prefix}--toolbar-search-container-active
    .#{$prefix}--search
    .#{$prefix}--search-input {
    padding-left: $spacing-3xl;
    visibility: visible;
  }

  .#{$prefix}--toolbar-search-container-active
    .#{$prefix}--search
    .#{$prefix}--search-input:focus {
    @include focus-outline('outline');
  }

  .#{$prefix}--toolbar-search-container-active
    .#{$prefix}--search
    .#{$prefix}--search-input:focus
    + .#{$prefix}--search-close {
    border: none;
    box-shadow: none;
    outline: none;
  }

  .#{$prefix}--toolbar-search-container-active
    .#{$prefix}--search
    .#{$prefix}--search-input:not(:placeholder-shown) {
    background: $hover-field;
    border: none;
  }

  .#{$prefix}--toolbar-search-container-active
    .#{$prefix}--search
    .#{$prefix}--search-magnifier:focus,
  .#{$prefix}--toolbar-search-container-active
    .#{$prefix}--search
    .#{$prefix}--search-magnifier:active,
  .#{$prefix}--toolbar-search-container-active
    .#{$prefix}--search
    .#{$prefix}--search-magnifier:hover {
    outline: none;
    border: none;
    background: transparent;
  }

  //-------------------------------------------------
  //SEARCH CLOSE BUTTON
  //-------------------------------------------------
  .#{$prefix}--toolbar-search-container-persistent .#{$prefix}--search-close,
  .#{$prefix}--toolbar-search-container-persistent
    .#{$prefix}--search-close:hover,
  .#{$prefix}--toolbar-search-container-active
    .#{$prefix}--search
    .#{$prefix}--search-close,
  .#{$prefix}--toolbar-search-container-active
    .#{$prefix}--search
    .#{$prefix}--search-close:hover {
    border: none; //to-do: is there a spec for close button on hover?
    background-color: transparent;
  }

  //-------------------------------------------------
  //TOOLBAR BUTTONS
  //-------------------------------------------------
  .#{$prefix}--overflow-menu.#{$prefix}--toolbar-action {
    @include button-reset;
    display: flex;
    cursor: pointer;
    height: $layout-04;
    width: $layout-04;
    padding: $spacing-md;
  }

  .#{$prefix}--toolbar-action:hover:not([disabled]) {
    background: $hover-field;
  }

  .#{$prefix}--toolbar-action:hover[aria-expanded='true'] {
    background: $ui-01;
  }

  .#{$prefix}--toolbar-action[disabled] {
    cursor: not-allowed;
  }

  .#{$prefix}--toolbar-action[disabled] .#{$prefix}--toolbar-action__icon {
    fill: $disabled;
    cursor: not-allowed;
  }

  .#{$prefix}--toolbar-action:focus:not([disabled]),
  .#{$prefix}--toolbar-action:active:not([disabled]) {
    @include focus-outline('outline');
  }

  .#{$prefix}--toolbar-action ~ .#{$prefix}--btn {
    margin: 0;
    height: $layout-04;
  }

  .#{$prefix}--overflow-menu--data-table {
    height: $layout-04;
  }

  //-------------------------------------------------
  //TOOLBAR BUTTON ICONS
  //-------------------------------------------------
  .#{$prefix}--toolbar-action__icon {
    height: $layout-01;
    width: auto;
    max-width: $layout-01;
    fill: $ui-05;
    transition: $transition--base;
  }

  //-------------------------------------------------
  //PERSISTENT SEARCH - OPTIONAL TOOLBAR
  //-------------------------------------------------
  .#{$prefix}--toolbar-search-container-persistent {
    width: 100%;
    height: $layout-04;
    opacity: 1;
    position: relative;
    transition: opacity $transition--base;
  }

  .#{$prefix}--toolbar-search-container-persistent
    + .#{$prefix}--toolbar-content {
    position: relative;
    width: auto;
  }

  .#{$prefix}--toolbar-search-container-persistent .#{$prefix}--search {
    position: initial;
  }

  .#{$prefix}--toolbar-search-container-persistent
    .#{$prefix}--search
    .#{$prefix}--search-magnifier {
    left: $spacing-md;
  }

  .#{$prefix}--toolbar-search-container-persistent
    .#{$prefix}--search
    .#{$prefix}--search-input {
    height: $layout-04;
    padding-left: $spacing-3xl;
    border: none;
  }

  .#{$prefix}--toolbar-search-container-persistent
    .#{$prefix}--search
    .#{$prefix}--search-input:focus:not([disabled]) {
    @include focus-outline('outline');
  }

  .#{$prefix}--toolbar-search-container-persistent
    .#{$prefix}--search
    .#{$prefix}--search-input:hover:not([disabled]) {
    background: $hover-field;
  }

  .#{$prefix}--toolbar-search-container-persistent
    .#{$prefix}--search
    .#{$prefix}--search-input:active:not([disabled]),
  .#{$prefix}--toolbar-search-container-persistent
    .#{$prefix}--search
    .#{$prefix}--search-input:not(:placeholder-shown) {
    background: $hover-field;
  }

  .#{$prefix}--toolbar-search-container-persistent
    .#{$prefix}--search
    .#{$prefix}--search-close {
    height: $layout-04;
    width: $layout-04;
  }

  .#{$prefix}--batch-actions--active ~ .#{$prefix}--toolbar-search-container,
  .#{$prefix}--batch-actions--active ~ .#{$prefix}--toolbar-content {
    opacity: 0;
  }

  //-------------------------------------------------
  //BATCH ACTIONS
  //-------------------------------------------------
  .#{$prefix}--batch-actions {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    align-items: center;
    opacity: 0;
    padding-left: $spacing-lg;
    padding-right: $spacing-lg;
    width: 100%;
    height: 100%;
    z-index: z('header');
    background-color: transparent;
    transition: opacity $transition--base $carbon--standard-easing, background-color
        $transition--base $carbon--standard-easing;
    pointer-events: none;
    visibility: hidden;
  }

  .#{$prefix}--batch-actions:focus {
    @include focus-outline;
  }

  .#{$prefix}--batch-actions--active {
    visibility: visible;
    background-color: $brand-01;
    pointer-events: all;
    transition: opacity $transition--base $carbon--standard-easing, background-color
        $transition--base $carbon--standard-easing;
    opacity: 1;
  }

  //btns container
  .#{$prefix}--action-list {
    position: absolute;
    right: 0;
    display: flex;
  }

  .#{$prefix}--action-list .#{$prefix}--btn {
    color: $ui-01;
  }

  .#{$prefix}--action-list .#{$prefix}--btn .#{$prefix}--btn__icon {
    fill: $ui-01;
    margin-left: $spacing-03;
  }

  .#{$prefix}--action-list .#{$prefix}--btn .#{$prefix}--btn__icon .st0 {
    fill: none;
  }

  .#{$prefix}--batch-download {
    padding: rem(1px); //makes it smaller to match other icons
  }

  //override btn styles
  .#{$prefix}--action-list .#{$prefix}--btn--primary:focus::before,
  .#{$prefix}--action-list .#{$prefix}--btn--primary:focus::before,
  .#{$prefix}--action-list .#{$prefix}--btn--primary::before,
  .#{$prefix}--action-list .#{$prefix}--btn--primary::before,
  .#{$prefix}--action-list .#{$prefix}--btn--primary:focus::after,
  .#{$prefix}--action-list .#{$prefix}--btn--primary:focus::after,
  .#{$prefix}--action-list .#{$prefix}--btn--primary::after,
  .#{$prefix}--action-list .#{$prefix}--btn--primary::after {
    display: none;
  }

  .#{$prefix}--action-list .#{$prefix}--btn--primary:focus {
    outline: 2px solid $ui-01;
    outline-offset: rem(-2px);
  }

  .#{$prefix}--action-list .#{$prefix}--btn {
    min-width: 0;
  }

  // cancel btn pseudo element
  .#{$prefix}--action-list
    .#{$prefix}--btn--primary:nth-child(3):hover
    + .#{$prefix}--btn--primary.#{$prefix}--batch-summary__cancel::before,
  .#{$prefix}--action-list
    .#{$prefix}--btn--primary:nth-child(3):focus
    + .#{$prefix}--btn--primary.#{$prefix}--batch-summary__cancel::before {
    opacity: 0;
  }

  .#{$prefix}--btn--primary.#{$prefix}--batch-summary__cancel::before {
    display: block;
    position: absolute;
    opacity: 1;
    top: rem(15px); //visually 16px spacing is 1px too low
    left: 0;
    height: $layout-01;
    width: rem(1px);
    content: '';
    background-color: $ui-01;
    border: none;
  }

  .#{$prefix}--btn--primary.#{$prefix}--batch-summary__cancel:hover::before {
    opacity: 0;
    transition: opacity $transition--base $carbon--standard-easing;
  }

  // cancel btn
  .#{$prefix}--batch-summary__cancel {
    padding-right: $spacing-05;
    position: relative;
  }

  // items selected text
  .#{$prefix}--batch-summary {
    position: absolute;
    left: 0;
    margin-left: $spacing-05;
    display: flex;
    align-items: center;
    color: $ui-01;
  }

  .#{$prefix}--batch-summary__para {
    @include type-style('body-short-01');
  }
}
```

</details>

- **Group**: [data-table](#data-table)
- **Requires**:
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [z [function]](#z-function)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [layout-04 [variable]](#layout-04-variable)
  - [transition--expansion [variable]](#transition--expansion-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [hover-field [variable]](#hover-field-variable)
  - [spacing-3xl [variable]](#spacing-3xl-variable)
  - [disabled [variable]](#disabled-variable)
  - [layout-01 [variable]](#layout-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [transition--base [variable]](#transition--base-variable)
  - [spacing-lg [variable]](#spacing-lg-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [spacing-03 [variable]](#spacing-03-variable)
  - [spacing-05 [variable]](#spacing-05-variable)

### ❌data-table-v2-core [mixin]

v9 data table core

<details>
<summary>Source code</summary>

```scss
@mixin data-table-v2-core() {
  .#{$prefix}--data-table-v2-container {
    width: 100%;
    min-width: rem(500px);
    overflow-x: auto;
    padding-top: $spacing-3xs; // allow space for focus styles
  }

  .#{$prefix}--data-table-v2 {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border-bottom: 1px solid $ui-03;

    @if feature-flag-enabled('breaking-changes-x') {
      min-width: rem(500px);
    }

    thead {
      @include typescale('zeta');
      background-color: $ui-02;
      font-weight: 700;
      border-right: 1px solid $ui-03;
    }

    tbody {
      @include typescale('zeta');
      background-color: $ui-01;
      border-right: 1px solid $ui-03;
    }

    tr {
      height: rem(48px);

      &:hover {
        td {
          background-color: rgba($brand-02, 0.1);
          border-top: 1px solid $brand-01;
          border-bottom: 1px solid $brand-01;

          &:first-of-type {
            border-left: 1px solid $brand-01;
          }

          &:last-of-type {
            border-right: 1px solid $brand-01;
          }
        }

        .#{$prefix}--overflow-menu {
          opacity: 1;
        }
      }
    }

    th {
      border-top: 1px solid $ui-03;
    }

    th,
    td {
      @include typescale('zeta');
      border-top: 1px solid $ui-03;
      padding-left: $spacing-sm;
      vertical-align: middle;
      text-align: left;
      color: $text-01;

      &:first-of-type {
        padding-left: rem(24px);
        border-left: 1px solid $ui-03;
      }

      &:last-of-type {
        padding-right: $spacing-lg;
      }
    }

    // Overrrides
    .#{$prefix}--checkbox-label {
      padding-left: rem(28px);
    }

    .#{$prefix}--overflow-menu {
      opacity: 0;

      &:focus {
        outline: 0;
        opacity: 1;
        box-shadow: none;

        .#{$prefix}--overflow-menu__icon {
          box-shadow: inset 0px 0px 0px 1px $brand-01;
        }
      }
    }

    .#{$prefix}--overflow-menu__icon {
      transform: rotate(90deg);
    }
  }

  // Options

  .#{$prefix}--data-table-v2-header {
    margin-bottom: $spacing-xs;
    color: $text-01;
  }

  .#{$prefix}--data-table-v2--zebra {
    tbody tr:nth-child(even) {
      background-color: $ui-02;
    }
  }

  .#{$prefix}--data-table-v2--no-border {
    & {
      border-bottom-color: transparent;
    }

    thead,
    tbody {
      border-right-color: transparent;
    }

    th,
    td {
      &:first-of-type {
        border-left-color: transparent;
      }
    }
  }

  .#{$prefix}--data-table-v2--compact {
    tbody tr {
      height: rem(24px);
    }
  }

  .#{$prefix}--data-table-v2--short {
    tbody tr {
      height: rem(32px);
    }
  }

  .#{$prefix}--data-table-v2--tall {
    tbody tr {
      height: rem(64px);
    }
  }

  .#{$prefix}--data-table-v2--static {
    width: auto;
  }

  .#{$prefix}--data-table-v2--zebra
    tbody
    tr.#{$prefix}--data-table-v2--selected,
  tbody tr.#{$prefix}--data-table-v2--selected {
    background-color: rgba($brand-02, 0.1);
  }
}
```

</details>

- **Group**: [data-table](#data-table)
- **Requires**:
  - [typescale [mixin]](#typescale-mixin)
  - [rem [function]](#rem-function)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-3xs [variable]](#spacing-3xs-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [ui-02 [variable]](#ui-02-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [brand-02 [variable]](#brand-02-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [spacing-sm [variable]](#spacing-sm-variable)
  - [text-01 [variable]](#text-01-variable)
  - [spacing-lg [variable]](#spacing-lg-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)

### ❌data-table-core--x [mixin]

v10 data table core

<details>
<summary>Source code</summary>

```scss
@mixin data-table-core--x() {
  //----------------------------------------------------------------------------
  // Container
  //----------------------------------------------------------------------------
  .#{$prefix}--data-table-container {
    min-width: rem(500px);
    overflow-x: auto;
    padding-top: $spacing-01; // allow space for focus styles
  }

  //----------------------------------------------------------------------------
  // Table title text
  //----------------------------------------------------------------------------
  .#{$prefix}--data-table-header {
    background: $ui-01;
    padding: $spacing-05 0 $spacing-06 $spacing-05;
  }

  .#{$prefix}--data-table-header__title {
    @include type-style('productive-heading-03');
    color: $text-01;
  }

  .#{$prefix}--data-table-header__description {
    @include type-style('body-short-01');
    color: $text-02;
  }

  //----------------------------------------------------------------------------
  // Data table
  //----------------------------------------------------------------------------
  .#{$prefix}--data-table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
  }

  .#{$prefix}--data-table thead {
    @include type-style('heading-01');
    background-color: $ui-03;
  }

  .#{$prefix}--data-table tbody {
    @include type-style('body-short-01');
    background-color: $ui-01;
    width: 100%;
  }

  .#{$prefix}--data-table tr {
    border: none;
    height: $layout-04;
    width: 100%;
  }

  .#{$prefix}--data-table tbody tr:hover {
    background: $hover-field;
  }

  .#{$prefix}--data-table tbody tr:hover td {
    color: $text-01;
    background: $hover-field;
    border-bottom: 1px solid $hover-field;
    border-top: 1px solid $hover-field;
  }

  .#{$prefix}--data-table th,
  .#{$prefix}--data-table td {
    padding-left: $spacing-04;
    padding-right: $spacing-04;
    vertical-align: top;
    text-align: left;
  }

  .#{$prefix}--data-table th {
    color: $text-01;
    background-color: $ui-03;
    border-top: 1px solid $ui-03;
    border-bottom: 1px solid $ui-03;
  }

  .#{$prefix}--data-table th:first-of-type {
    padding-left: $spacing-05;
  }

  .#{$prefix}--data-table .#{$prefix}--table-header-label {
    display: block;
    padding: rem(14px) 0;
  }

  .#{$prefix}--data-table td {
    background: $ui-01;
    color: $text-02;
    border-top: 1px solid $ui-01;
    border-bottom: 1px solid $ui-03;
    padding: rem(14px) $spacing-04;
    padding-bottom: rem(13px);
  }

  @supports (-moz-appearance: none) {
    .#{$prefix}--data-table td {
      background-clip: padding-box; // fix to show borders in ff
    }
  }

  .#{$prefix}--data-table td:first-of-type {
    padding-left: $spacing-05;
  }

  .#{$prefix}--data-table td:last-of-type {
    padding-right: $spacing-05;
  }

  // specific padding for overflow menu columns
  .#{$prefix}--data-table .#{$prefix}--table-column-menu,
  .#{$prefix}--data-table .#{$prefix}--table-column-menu:last-of-type {
    padding-top: $spacing-03;
    padding-right: $spacing-03;
  }

  .#{$prefix}--data-table td.#{$prefix}--table-column-menu {
    padding-bottom: 0;
  }

  .#{$prefix}--data-table
    td.#{$prefix}--table-column-menu
    .#{$prefix}--overflow-menu[aria-expanded='false']:hover {
    background: $ui-03;
  }

  // Overflow Menu Overrides
  .#{$prefix}--data-table
    td.#{$prefix}--table-column-menu
    .#{$prefix}--overflow-menu[aria-expanded='false']:focus {
    @include focus-outline('outline');
  }

  .#{$prefix}--data-table
    td.#{$prefix}--table-column-menu
    .#{$prefix}--overflow-menu[aria-expanded='true']:focus {
    outline: none;
  }

  .#{$prefix}--data-table
    td.#{$prefix}--table-column-menu
    .#{$prefix}--overflow-menu
    .#{$prefix}--overflow-menu__icon {
    opacity: 0;
  }

  .#{$prefix}--data-table
    td.#{$prefix}--table-column-menu
    .#{$prefix}--overflow-menu:hover
    .#{$prefix}--overflow-menu__icon,
  .#{$prefix}--data-table
    td.#{$prefix}--table-column-menu
    .#{$prefix}--overflow-menu:focus
    .#{$prefix}--overflow-menu__icon,
  .#{$prefix}--data-table
    tr:hover
    td.#{$prefix}--table-column-menu
    .#{$prefix}--overflow-menu
    .#{$prefix}--overflow-menu__icon {
    opacity: 1;
  }

  .#{$prefix}--table-row--menu-option
    .#{$prefix}--overflow-menu-options__btn
    .#{$prefix}--overflow-menu-options__option-content
    svg {
    margin-right: $spacing-03;
    position: relative;
    top: rem(
      3px
    ); //used to center svg without setting display flex //display block needed for overflow text truncation
  }

  //----------------------------------------------------------------------------
  //ZEBRA
  //----------------------------------------------------------------------------

  .#{$prefix}--data-table--zebra tbody tr:nth-child(even) td {
    border-bottom: 1px solid $ui-01;
  }

  .#{$prefix}--data-table--zebra tbody tr:nth-child(odd) td {
    background-color: $data-table-zebra-color;
    border-bottom: 1px solid $data-table-zebra-color;
    border-top: 1px solid $data-table-zebra-color;
  }

  .#{$prefix}--data-table--zebra tbody tr:hover td {
    background-color: $hover-field;
    border-bottom: 1px solid $hover-field;
    border-top: 1px solid $hover-field;
  }

  //----------------------------------------------------------------------------
  // Select
  //----------------------------------------------------------------------------
  .#{$prefix}--table-column-checkbox .#{$prefix}--checkbox-label {
    padding-left: $spacing-05;
  }

  .#{$prefix}--data-table th.#{$prefix}--table-column-checkbox {
    padding: rem(12px) $spacing-03 0 $spacing-05;
    width: rem(
      44px
    ); // 16px padding left + 8px padding right + 20px checkbox width
  }

  .#{$prefix}--data-table td.#{$prefix}--table-column-checkbox {
    padding-top: rem(11px);
    padding-bottom: 0;
  }

  th.#{$prefix}--table-column-checkbox:hover {
    background: $data-table-column-hover;
  }

  // default selected row + zebra select - even child
  .#{$prefix}--data-table--zebra
    tbody
    tr:nth-child(odd).#{$prefix}--data-table--selected
    td,
  tr.#{$prefix}--data-table--selected td {
    color: $text-01;
    background-color: $ui-03;
    border-top: 1px solid $ui-03;
    border-bottom: 1px solid $active-01; //bottom border acts as separator from other rows
  }

  // first row
  .#{$prefix}--data-table--zebra
    tbody
    tr:first-of-type:nth-child(odd).#{$prefix}--data-table--selected
    td,
  tr.#{$prefix}--data-table--selected:first-of-type td {
    border-top: 1px solid $active-01; //top border acts as separator from thead
  }

  // last row + zebra select last
  .#{$prefix}--data-table--zebra
    tbody
    tr:last-of-type:nth-child(odd).#{$prefix}--data-table--selected
    td,
  .#{$prefix}--data-table--zebra
    tbody
    tr:last-of-type:nth-child(even).#{$prefix}--data-table--selected
    td,
  tr.#{$prefix}--data-table--selected:last-of-type td {
    border-top: 1px solid $ui-03; // doesn't need separators
    border-bottom: 1px solid $ui-03;
  }

  // zebra select - odd child
  .#{$prefix}--data-table--zebra
    tbody
    tr:nth-child(even).#{$prefix}--data-table--selected
    td {
    border-bottom: 1px solid $active-01;
  }

  .#{$prefix}--data-table--zebra
    tbody
    tr:nth-child(even).#{$prefix}--data-table--selected:hover
    td {
    border-bottom: 1px solid $data-table-column-hover;
  }

  // hover + zebra select - even child
  .#{$prefix}--data-table--zebra
    tbody
    tr:nth-child(odd).#{$prefix}--data-table--selected:hover
    td,
  .#{$prefix}--data-table tbody .#{$prefix}--data-table--selected:hover td {
    color: $text-01;
    background: $data-table-column-hover;
    border-top: 1px solid $data-table-column-hover;
    border-bottom: 1px solid $data-table-column-hover;
  }

  // selected overflow menu
  .#{$prefix}--data-table--selected
    .#{$prefix}--overflow-menu
    .#{$prefix}--overflow-menu__icon {
    opacity: 1;
  }
}
```

</details>

- **Group**: [data-table](#data-table)
- **Requires**:
  - [type-style [mixin]](#type-style-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-01 [variable]](#spacing-01-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [spacing-05 [variable]](#spacing-05-variable)
  - [spacing-06 [variable]](#spacing-06-variable)
  - [text-01 [variable]](#text-01-variable)
  - [text-02 [variable]](#text-02-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [layout-04 [variable]](#layout-04-variable)
  - [hover-field [variable]](#hover-field-variable)
  - [spacing-04 [variable]](#spacing-04-variable)
  - [spacing-03 [variable]](#spacing-03-variable)
  - [data-table-zebra-color [variable]](#data-table-zebra-color-variable)
  - [data-table-column-hover [variable]](#data-table-column-hover-variable)
  - [active-01 [variable]](#active-01-variable)

### ❌data-table-v2-expandable [mixin]

v9 data table expandable

<details>
<summary>Source code</summary>

```scss
@mixin data-table-v2-expandable() {
  tr.#{$prefix}--expandable-row-v2 {
    // hide on init
    &.#{$prefix}--expandable-row--hidden-v2 {
      display: none;
    }

    > td:first-of-type {
      position: relative;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 2px;
        background-color: $brand-01;
      }
    }

    + tr[data-child-row] {
      td {
        border-top: 0;
        padding-bottom: $spacing-xs;
      }
    }

    &:hover {
      > td {
        background-color: $hover-row;
      }

      > td:first-of-type {
        border-left: 1px solid transparent;
      }

      > td:last-of-type {
        border-right: 1px solid $brand-01;
      }

      &[data-parent-row] > td {
        border-bottom: 0;
      }

      + tr[data-child-row] {
        > td {
          background-color: $hover-row;
          border-bottom: 1px solid $brand-01;
          border-right: 1px solid $brand-01;
        }
      }
    }
  }

  tr.#{$prefix}--expandable-row--hover-v2 {
    > td {
      background-color: $hover-row;
      border-top: 1px solid $brand-01;
    }

    > td:last-of-type {
      border-right: 1px solid $brand-01;
    }
  }

  .#{$prefix}--table-expand-v2 {
    width: 2.5rem;
  }

  .#{$prefix}--table-expand-v2[data-previous-value='collapsed']
    .#{$prefix}--table-expand-v2__svg {
    transform: rotate(90deg);
    transition: transform 200ms $carbon--standard-easing;
  }

  .#{$prefix}--table-expand-v2__button {
    @include button-reset(false);

    &:focus {
      outline: 1px solid transparent;

      svg {
        box-shadow: inset 0px 0px 0px 1px $brand-01;
      }
    }
  }

  .#{$prefix}--table-expand-v2__svg {
    fill: $ui-05;
    transform: rotate(0deg);
    transition: transform 200ms $carbon--standard-easing;
    height: 16px;
    width: auto;
    max-width: 16px;
    padding: $spacing-3xs;
  }
}
```

</details>

- **Group**: [data-table](#data-table)
- **Requires**:
  - [button-reset [mixin]](#button-reset-mixin)
  - [prefix [variable]](#prefix-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [hover-row [variable]](#hover-row-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [spacing-3xs [variable]](#spacing-3xs-variable)

### ❌data-table-expandable--x [mixin]

v10 data table expandable

<details>
<summary>Source code</summary>

```scss
@mixin data-table-expandable--x() {
  //----------------------------------------------------------------------------
  // Parent row
  //----------------------------------------------------------------------------
  //first row top border
  .#{$prefix}--data-table tr.#{$prefix}--parent-row:first-of-type td {
    border-top: 1px solid $ui-03;
  }

  //----------------------------------------------------------------------------
  // Child row
  //----------------------------------------------------------------------------
  // default styles
  .#{$prefix}--expandable-row--hidden td {
    border-top: 0;
    width: auto;
    padding: $spacing-05;
  }

  //child row hidden
  tr.#{$prefix}--parent-row:not(.#{$prefix}--expandable-row)
    + tr[data-child-row] {
    height: 0;
    transition: height $transition--expansion $carbon--standard-easing;
  }

  tr.#{$prefix}--parent-row:not(.#{$prefix}--expandable-row)
    + tr[data-child-row]
    td {
    padding-top: 0;
    padding-bottom: 0;
    border: 0;
    background-color: $hover-field;
    transition: padding $transition--expansion $carbon--standard-easing, background-color
        $transition--expansion $carbon--standard-easing;
  }

  tr.#{$prefix}--parent-row:not(.#{$prefix}--expandable-row)
    + tr[data-child-row]
    td
    .#{$prefix}--child-row-inner-container {
    overflow: hidden;
    max-height: 0;
  }

  //child row visible
  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row + tr[data-child-row] {
    transition: height $transition--expansion $carbon--standard-easing;
  }

  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row + tr[data-child-row] td {
    padding-bottom: rem(23px);
    transition: padding $transition--expansion $carbon--standard-easing;
  }

  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row
    + tr[data-child-row]
    td
    .#{$prefix}--child-row-inner-container {
    max-height: 100%;
  }

  // bottom border overrides
  .#{$prefix}--parent-row.#{$prefix}--expandable-row > td,
  .#{$prefix}--parent-row.#{$prefix}--expandable-row + tr[data-child-row] > td {
    border-bottom: 1px solid transparent;
    box-shadow: 0 1px $ui-03;
  }

  .#{$prefix}--parent-row:not(.#{$prefix}--expandable-row)
    + tr[data-child-row]
    > td {
    box-shadow: none;
  }

  .#{$prefix}--parent-row.#{$prefix}--expandable-row > td:first-of-type {
    box-shadow: none; // first td doesn't have a visible border
  }

  //----------------------------------------------------------------------------
  // Hover styles
  //----------------------------------------------------------------------------
  //hovering on collapsed parent
  tr.#{$prefix}--parent-row:not(.#{$prefix}--expandable-row):first-of-type:hover
    td {
    border-top: 1px solid $hover-field;
    border-bottom: 1px solid $hover-field;
  }

  // hovering on expanded parent
  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row:hover td {
    background-color: $hover-field;
    border-top: 1px solid $hover-field;
    border-bottom: 1px solid $ui-03;
    color: $text-01;
  }

  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row:hover td:first-of-type {
    border-bottom: 1px solid $hover-field; // first td doesn't have a visible border
  }

  // child row when hovering on expanded parent
  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row:hover
    + tr[data-child-row]
    td {
    background-color: $hover-field;
    color: $text-01;
    border-bottom: 1px solid $ui-03;
  }

  //hovering on expanded child row
  tr.#{$prefix}--expandable-row--hover + tr[data-child-row] td {
    border-bottom: 1px solid $ui-03;
  }

  //hovering on expanded child row (class added to parent)
  tr.#{$prefix}--expandable-row--hover {
    background-color: $hover-field;
  }

  tr.#{$prefix}--expandable-row--hover td {
    background-color: $hover-field;
    border-bottom: 1px solid $ui-03;
    border-top: 1px solid $hover-field;
    color: $text-01;
  }

  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row.#{$prefix}--expandable-row--hover
    td:first-of-type {
    border-bottom: 1px solid $hover-field; // first parent td doesnt have visible bottom border
  }

  //----------------------------------------------------------------------------
  // Expand icon column
  //----------------------------------------------------------------------------
  .#{$prefix}--data-table td.#{$prefix}--table-expand {
    width: 2.5rem;
    min-width: 2.5rem;
    vertical-align: top;
    padding-top: rem(7px);
    padding-bottom: 0;
  }

  @supports (-moz-appearance: none) {
    .#{$prefix}--data-table td.#{$prefix}--table-expand {
      padding-top: rem(14px);
    }
  }

  .#{$prefix}--table-expand[data-previous-value='collapsed']
    .#{$prefix}--table-expand__svg {
    transform: rotate(270deg);
    transition: transform $transition--expansion $carbon--standard-easing;
  }

  .#{$prefix}--table-expand__button {
    @include button-reset('false');
    display: flex;
    justify-content: space-around;
    height: $layout-03;
    width: $layout-01;
  }

  .#{$prefix}--table-expand__button:focus {
    outline: 1px solid transparent;
  }

  .#{$prefix}--table-expand__button:focus .#{$prefix}--table-expand__svg {
    box-shadow: inset 0px 0px 0px 1px $focus;
  }

  .#{$prefix}--table-expand__svg {
    fill: $ui-05;
    transform: rotate(90deg);
    transition: transform $transition--expansion $carbon--standard-easing;
  }

  th.#{$prefix}--table-expand + th.#{$prefix}--table-column-checkbox {
    padding-left: $spacing-03;
  }

  // fix expanded parent separating border length
  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row
    td.#{$prefix}--table-expand
    + td::after {
    position: absolute;
    content: '';
    left: 0;
    bottom: rem(-1px);
    height: rem(1px);
    width: rem(8px);
    background: $ui-01;
  }

  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row:hover
    td.#{$prefix}--table-expand
    + td::after,
  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row.#{$prefix}--expandable-row--hover
    td.#{$prefix}--table-expand
    + td::after {
    background: $hover-field;
  }

  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected
    td.#{$prefix}--table-expand
    + td::after {
    display: none;
  }

  //----------------------------------------------------------------------------
  // Selected
  //----------------------------------------------------------------------------
  // parent collapsed
  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected:first-of-type td {
    background: $ui-03;
    border-top: 1px solid $active-01;
    border-bottom: 1px solid transparent;
    box-shadow: 0 1px $active-01;
  }

  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected td {
    background: $ui-03;
    color: $text-01;
    border-bottom: 1px solid transparent;
    box-shadow: 0 1px $active-01;
  }

  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected:last-of-type td {
    background: $ui-03;
    border-bottom: 1px solid transparent;
    box-shadow: 0 1px $ui-03;
  }

  // parent collapsed hover
  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected:not(.#{$prefix}--expandable-row):hover
    td {
    background: $hover-selected-ui;
    border-top: 1px solid $hover-selected-ui;
    border-bottom: 1px solid transparent;
    box-shadow: 0 1px $hover-selected-ui;
  }

  // parent expanded
  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected.#{$prefix}--expandable-row
    td,
  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected.#{$prefix}--expandable-row
    td:first-of-type {
    border-bottom: 1px solid transparent;
    box-shadow: 0 1px $ui-03; //no visible border when expanded
  }

  // parent expanded hover
  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected.#{$prefix}--expandable-row:hover
    td,
  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected.#{$prefix}--expandable-row:hover
    td:first-of-type,
  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected.#{$prefix}--expandable-row--hover
    td,
  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected.#{$prefix}--expandable-row--hover
    td:first-of-type {
    background: $hover-selected-ui;
    border-top: 1px solid $hover-selected-ui;
    border-bottom: 1px solid transparent;
    box-shadow: 0 1px $hover-selected-ui;
  }

  // child row expanded
  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected.#{$prefix}--expandable-row
    + tr[data-child-row]
    td {
    color: $text-01;
    background-color: $hover-field;
    border-bottom: 1px solid transparent;
    box-shadow: 0 1px $active-01;
    border-top: 1px solid $active-ui;
  }

  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected.#{$prefix}--expandable-row
    + tr[data-child-row]:last-of-type
    td {
    box-shadow: inset 0 -1px $active-01;
    padding-bottom: rem(24px);
  }

  // child row expanded hover
  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected.#{$prefix}--expandable-row:hover
    + tr[data-child-row]
    td,
  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected.#{$prefix}--expandable-row--hover
    + tr[data-child-row]
    td {
    background: $ui-03;
  }
}
```

</details>

- **Group**: [data-table](#data-table)
- **Requires**:
  - [button-reset [mixin]](#button-reset-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [spacing-05 [variable]](#spacing-05-variable)
  - [transition--expansion [variable]](#transition--expansion-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [hover-field [variable]](#hover-field-variable)
  - [text-01 [variable]](#text-01-variable)
  - [layout-03 [variable]](#layout-03-variable)
  - [layout-01 [variable]](#layout-01-variable)
  - [focus [variable]](#focus-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [spacing-03 [variable]](#spacing-03-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [active-01 [variable]](#active-01-variable)
  - [hover-selected-ui [variable]](#hover-selected-ui-variable)
  - [active-ui [variable]](#active-ui-variable)

### ❌data-table-v2-sort [mixin]

v9 data table sort

<details>
<summary>Source code</summary>

```scss
@mixin data-table-v2-sort() {
  .#{$prefix}--table-sort-v2--ascending {
    .#{$prefix}--table-sort-v2__icon {
      transform: rotate(180deg);
      transition: transform 200ms $carbon--standard-easing;
    }
  }

  .#{$prefix}--table-sort-v2--active {
    .#{$prefix}--table-sort-v2__icon {
      opacity: 1;
    }
  }

  .#{$prefix}--data-table-v2 th {
    &:hover {
      .#{$prefix}--table-sort-v2__icon {
        opacity: 1;
      }
    }
  }

  .#{$prefix}--table-sort-v2 {
    @include button-reset(false);
    position: relative;
    font: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    color: $text-01;

    &:focus {
      outline: 0;

      svg {
        opacity: 1;
        outline: 1px solid $brand-01;
        fill: $brand-01;
        outline-offset: -0.5px; // safari fix
      }
    }
  }

  .#{$prefix}--table-sort-v2__icon {
    position: relative;
    left: 2px;
    transition: transform 200ms $carbon--standard-easing;
    transform: rotate(0);
    opacity: 0;
    fill: $ui-05;
    height: rem(9px);
    padding: $spacing-3xs;
    width: auto;
    min-width: 14px;
  }
}
```

</details>

- **Group**: [data-table](#data-table)
- **Requires**:
  - [button-reset [mixin]](#button-reset-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [text-01 [variable]](#text-01-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [spacing-3xs [variable]](#spacing-3xs-variable)

### ❌data-table-sort--x [mixin]

v10 data table sort

<details>
<summary>Source code</summary>

```scss
@mixin data-table-sort--x() {
  // -------------------------------------
  // Sortable table
  // -------------------------------------
  .#{$prefix}--data-table--sort th,
  .#{$prefix}--data-table--sort
    th:first-of-type:not(.#{$prefix}--table-column-checkbox) {
    padding: 0;
    height: $layout-04;
    border-top: none;
    border-bottom: none;
  }

  .#{$prefix}--data-table--sort td {
    padding-left: $spacing-03;
    padding-right: $spacing-03;
  }

  .#{$prefix}--data-table--sort th:first-of-type .#{$prefix}--table-sort {
    padding-left: $spacing-04;
  }

  // -------------------------------------
  // Th > Button
  // -------------------------------------
  .#{$prefix}--table-sort {
    @include button-reset(false);
    position: relative;
    font: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: $text-01;
    padding: 0 $spacing-03;
    height: 100%;
  }

  .#{$prefix}--table-sort:focus {
    @include focus-outline('outline');
  }

  .#{$prefix}--table-sort:hover {
    background: $data-table-column-hover;
  }

  // changes opacity when th is inactive (see line 161)
  .#{$prefix}--table-sort:focus svg,
  .#{$prefix}--table-sort:hover svg {
    opacity: 1;
  }

  // -------------------------------------
  //Th > Button > Svg (Sort Icons)
  // -------------------------------------
  // inactive icons
  .#{$prefix}--table-sort .#{$prefix}--table-sort__icon-inactive {
    display: block;
  }

  .#{$prefix}--table-sort .#{$prefix}--table-sort__icon {
    display: none;
  }

  .#{$prefix}--table-sort__icon-unsorted {
    position: relative;
    left: rem(2px);
    margin-left: $spacing-03;
    margin-right: 0;
    opacity: 0;
    fill: $ui-05;
    width: auto;
    min-width: $layout-01;
  }

  // active icons
  .#{$prefix}--table-sort.#{$prefix}--table-sort--active
    .#{$prefix}--table-sort__icon-unsorted {
    display: none;
  }

  .#{$prefix}--table-sort.#{$prefix}--table-sort--active
    .#{$prefix}--table-sort__icon {
    display: block;
    opacity: 1; //changes opacity when th is active (see line 125)
  }

  .#{$prefix}--table-sort--ascending .#{$prefix}--table-sort__icon {
    transform: rotate(180deg);
  }

  .#{$prefix}--table-sort__icon {
    position: relative;
    left: rem(2px);
    margin-left: $spacing-03;
    margin-right: 0;
    transition: transform $transition--base $carbon--standard-easing;
    transform: rotate(0);
    opacity: 0;
    fill: $ui-05;
    width: auto;
    min-width: $layout-01;
  }
}
```

</details>

- **Group**: [data-table](#data-table)
- **Requires**:
  - [button-reset [mixin]](#button-reset-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [layout-04 [variable]](#layout-04-variable)
  - [spacing-03 [variable]](#spacing-03-variable)
  - [spacing-04 [variable]](#spacing-04-variable)
  - [text-01 [variable]](#text-01-variable)
  - [data-table-column-hover [variable]](#data-table-column-hover-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [layout-01 [variable]](#layout-01-variable)
  - [transition--base [variable]](#transition--base-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)

## date-picker

### ❌date-picker [mixin]

v9 date-picker

<details>
<summary>Source code</summary>

```scss
@mixin date-picker() {
  .#{$prefix}--date-picker {
    display: flex;
  }

  .#{$prefix}--date-picker--light .#{$prefix}--date-picker__input {
    background: $field-02;
  }

  .#{$prefix}--date-picker ~ .#{$prefix}--label {
    order: 1;
  }

  .#{$prefix}--date-picker-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .#{$prefix}--date-picker.#{$prefix}--date-picker--simple {
    .#{$prefix}--date-picker__input {
      width: 7.125rem;
    }
  }

  .#{$prefix}--date-picker.#{$prefix}--date-picker--simple.#{$prefix}--date-picker--short {
    .#{$prefix}--date-picker__input {
      width: 5.7rem;
    }
  }

  .#{$prefix}--date-picker.#{$prefix}--date-picker--single {
    .#{$prefix}--date-picker__input {
      width: 9rem;
    }
  }

  .#{$prefix}--date-picker__input {
    @include reset;
    @include font-family;
    @include typescale('zeta');
    display: block;
    position: relative;
    height: rem(40px);
    max-width: 9rem;
    padding: 0 $spacing-md;
    background-color: $field-01;
    border: none;
    box-shadow: 0 1px 0 0 $ui-05;
    order: 2;
    color: $text-01;
    border-bottom: 1px solid transparent;

    &:focus,
    &.#{$prefix}--focused {
      outline: none;
      box-shadow: 0 2px 0 0 $brand-01;
    }

    &:focus ~ .#{$prefix}--label {
      color: $brand-01;
    }

    &[data-invalid],
    &[data-invalid]:focus {
      box-shadow: 0 2px 0 0 $support-01;
    }

    &[data-invalid]:focus + .#{$prefix}--label {
      color: $support-01;
    }

    & ~ .#{$prefix}--form-requirement {
      order: 3;
      color: $support-01;
      font-weight: 400;
      margin-top: $spacing-2xs;
      overflow: visible;

      &::before {
        display: none;
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:disabled:hover {
      border: 1px solid transparent;
    }

    &::placeholder {
      color: $text-02;
    }
  }

  .#{$prefix}--date-picker__icon {
    position: absolute;
    top: 2.25rem;
    left: 1rem;
    fill: $brand-01;
    cursor: pointer;
    z-index: 1;

    &:hover {
      fill: $hover-primary;
    }
  }

  .#{$prefix}--date-picker--nolabel .#{$prefix}--date-picker__icon {
    top: rem(14px);
  }

  .#{$prefix}--date-picker__icon ~ .#{$prefix}--date-picker__input {
    padding-left: $spacing-3xl;
  }

  .#{$prefix}--date-picker--range {
    display: flex;
    position: relative;
  }

  .#{$prefix}--date-picker--range
    > .#{$prefix}--date-picker-container:first-child {
    margin-right: $spacing-xs;
  }

  .#{$prefix}--date-picker--range .#{$prefix}--date-picker__icon {
    top: initial;
    right: -1.75rem;
    bottom: 0.6rem;
    left: auto;
  }

  .#{$prefix}--date-picker--range .#{$prefix}--label,
  .#{$prefix}--date-picker--range .#{$prefix}--date-picker__input {
    width: 7.075rem;
  }

  .#{$prefix}--date-picker__calendar.flatpickr-calendar.open {
    @include layer('pop-out');
    background-color: $ui-01;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $spacing-md $spacing-md $spacing-2xs;
    width: rem(285px) !important;
    height: rem(262px);
    border-radius: 0;
    border: none;
    overflow: hidden;
    margin-top: 1px;

    &:before,
    &:after {
      display: none;
    }

    &:focus {
      outline: 1px solid $brand-01;
    }
  }

  .#{$prefix}--date-picker__month,
  .flatpickr-month {
    width: 100%;
    margin-bottom: $spacing-2xs;
  }

  .#{$prefix}--date-picker__month .flatpickr-prev-month,
  .#{$prefix}--date-picker__month .flatpickr-next-month,
  .flatpickr-month .flatpickr-prev-month,
  .flatpickr-month .flatpickr-next-month {
    padding: 0;
    line-height: rem(20px);
    fill: $text-01;

    &:hover svg {
      fill: $hover-secondary;
    }
  }

  .#{$prefix}--date-picker__month .flatpickr-current-month,
  .flatpickr-month .flatpickr-current-month {
    @include typescale('omega');
    text-transform: uppercase;
    padding: 0;
  }

  .#{$prefix}--date-picker__month .flatpickr-current-month svg,
  .flatpickr-month .flatpickr-current-month svg {
    fill: $text-01;
  }

  .#{$prefix}--date-picker__month .flatpickr-current-month .cur-month,
  .flatpickr-month .flatpickr-current-month .cur-month {
    margin-right: 0.25rem;
    color: $text-01;
  }

  .numInputWrapper,
  .flatpickr-current-month .numInputWrapper {
    min-width: rem(38px);
    width: rem(38px);
  }

  .#{$prefix}--date-picker__month .numInputWrapper .numInput,
  .flatpickr-month .numInputWrapper .numInput {
    font-weight: 600;
    color: $text-01;
    background-color: $field-01;
    border: none;
    border-radius: 0;
    min-width: rem(38px);
    width: rem(38px);
    padding: $spacing-2xs;
    // Added in when upgraded to Flatpickr 4.5.5
    -moz-appearance: textfield; /* Firefox */

    &:focus {
      outline: 1px solid $brand-01;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }
  }

  .#{$prefix}--date-picker__month .numInputWrapper span.arrowUp,
  .#{$prefix}--date-picker__month .numInputWrapper span.arrowDown,
  .flatpickr-month .numInputWrapper span.arrowUp,
  .flatpickr-month .numInputWrapper span.arrowDown {
    left: 2.6rem;
    border: none;
    width: rem(12px);

    &:hover {
      background: none;

      &:after {
        border-bottom-color: $brand-02;
        border-top-color: $brand-02;
      }
    }

    &:after {
      border-bottom-color: $brand-01;
      border-top-color: $brand-01;
    }
  }

  .#{$prefix}--date-picker__month .numInputWrapper span.arrowUp,
  .flatpickr-month .numInputWrapper span.arrowUp {
    top: 1px;
  }

  .#{$prefix}--date-picker__month .numInputWrapper span.arrowDown,
  .flatpickr-month .numInputWrapper span.arrowDown {
    top: 9px;
  }

  span.#{$prefix}--date-picker__weekday,
  span.flatpickr-weekday {
    @include typescale('omega');
    font-weight: 600;
    color: $text-01;
  }

  .#{$prefix}--date-picker__day,
  .flatpickr-day {
    @include typescale('omega');
    height: rem(25px);
    width: 1.8rem;
    line-height: rem(25px);
    flex-basis: 1.8rem;
    max-width: 1.8rem;
    margin: rem(0.5px) 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-01;
    border-radius: 0;
    border: 2px solid transparent;

    &:hover {
      background: $hover-row;
    }

    &:focus {
      outline: none;
      background: $ui-03;
    }
  }

  .#{$prefix}--date-picker__days .nextMonthDay,
  .#{$prefix}--date-picker__days .prevMonthDay {
    opacity: 0.5;
    color: $ui-05;
  }

  .#{$prefix}--date-picker__day.today,
  .flatpickr-day.today {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      display: block;
      top: 90%;
      left: 50%;
      transform: translateX(-50%);
      height: 3px;
      width: 3px;
      border-radius: 50%;
      background: $brand-01;
    }
  }

  .#{$prefix}--date-picker__day.today.no-border,
  .flatpickr-day.today.no-border {
    border: none;
  }

  .#{$prefix}--date-picker__day.today.selected {
    border: 2px solid $brand-01;
    &::after {
      display: none;
    }
  }

  .#{$prefix}--date-picker__day.disabled,
  .flatpickr-day.disabled {
    cursor: not-allowed;
    opacity: 0.5;
    color: $ui-05;

    &:hover {
      background: transparent;
    }
  }

  .#{$prefix}--date-picker__day.inRange,
  .flatpickr-day.inRange {
    background: $ui-02;
    box-shadow: -6px 0 0 $ui-02, 6px 0 0 $ui-02;
  }

  .#{$prefix}--date-picker__day.selected,
  .flatpickr-day.selected {
    border: 2px solid $brand-01;
    background: $ui-01;
  }

  .#{$prefix}--date-picker__day.startRange.selected,
  .flatpickr-day.startRange.selected {
    box-shadow: none;
    z-index: 2;
  }

  .#{$prefix}--date-picker__day.endRange.inRange,
  .flatpickr-day.endRange.inRange {
    background: $ui-01;
    color: $text-01;
    border: 2px solid $brand-01;
    z-index: 3;
    box-shadow: none;
  }

  .#{$prefix}--date-picker__day.endRange.inRange.selected,
  .flatpickr-day.endRange.inRange.selected {
    box-shadow: none;
    border: 2px solid $brand-01;
    background: $ui-01;
  }

  .#{$prefix}--date-picker__day.startRange.inRange:not(.selected),
  .flatpickr-day.startRange.inRange:not(.selected) {
    box-shadow: none;
    background: $ui-01;
    border: 2px solid $brand-01;
    z-index: 3;
  }

  .#{$prefix}--date-picker__days,
  .dayContainer {
    width: rem(225px);
    min-width: rem(225px);
    max-width: rem(225px);
    height: rem(164px);
  }

  .flatpickr-innerContainer,
  .flatpickr-rContainer {
    width: rem(225px);
    height: rem(200px);
  }

  .#{$prefix}--date-picker__weekdays,
  .flatpickr-weekdays,
  .flatpickr-weekdaycontainer {
    width: rem(225px);
    margin-bottom: $spacing-2xs;
  }

  .flatpickr-weekdaycontainer {
    display: flex;
  }

  .flatpickr-months {
    display: flex;
    width: 100%;
    position: relative;
  }

  .flatpickr-prev-month,
  .flatpickr-next-month {
    padding-top: 5px;
  }

  .flatpickr-prev-month:hover svg,
  .flatpickr-next-month:hover svg {
    fill: $brand-01;
  }

  .flatpickr-next-month.disabled,
  .flatpickr-prev-month.disabled {
    svg {
      fill: $ui-05;
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover {
      svg {
        fill: $ui-05;
      }
    }
  }

  // Skeleton State
  .#{$prefix}--date-picker.#{$prefix}--skeleton input,
  .#{$prefix}--date-picker__input.#{$prefix}--skeleton {
    @include skeleton;
    width: 100%;

    &::-webkit-input-placeholder {
      color: transparent;
    }
  }

  .#{$prefix}--date-picker.#{$prefix}--skeleton .#{$prefix}--label {
    @include skeleton;
    width: rem(75px);
    height: rem(14px);
  }
}
```

</details>

- **Group**: [date-picker](#date-picker)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [layer [mixin]](#layer-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [field-02 [variable]](#field-02-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [text-01 [variable]](#text-01-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [support-01 [variable]](#support-01-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [text-02 [variable]](#text-02-variable)
  - [hover-primary [variable]](#hover-primary-variable)
  - [spacing-3xl [variable]](#spacing-3xl-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [hover-secondary [variable]](#hover-secondary-variable)
  - [brand-02 [variable]](#brand-02-variable)
  - [hover-row [variable]](#hover-row-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [ui-02 [variable]](#ui-02-variable)

### ❌date-picker--x [mixin]

v10 date-picker

<details>
<summary>Source code</summary>

```scss
@mixin date-picker--x() {
  .#{$prefix}--date-picker {
    display: flex;
  }

  .#{$prefix}--date-picker--light .#{$prefix}--date-picker__input {
    background: $field-02;
  }

  .#{$prefix}--date-picker ~ .#{$prefix}--label {
    order: 1;
  }

  .#{$prefix}--date-picker-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .#{$prefix}--date-picker-input__wrapper {
    display: flex;
    align-items: center;

    ~ .#{$prefix}--form-requirement {
      max-height: rem(200px);
      display: block;
      color: $support-01;
      font-weight: 400;
      margin-top: $carbon--spacing-02;
      overflow: visible;

      &::before {
        display: none;
      }
    }
  }

  .#{$prefix}--date-picker.#{$prefix}--date-picker--simple {
    .#{$prefix}--date-picker__input {
      width: rem(120px);
    }
  }

  .#{$prefix}--date-picker.#{$prefix}--date-picker--simple.#{$prefix}--date-picker--short {
    .#{$prefix}--date-picker__input {
      width: 5.7rem;
    }
  }

  .#{$prefix}--date-picker.#{$prefix}--date-picker--single {
    .#{$prefix}--date-picker-container {
      max-width: rem(288px);
    }

    .#{$prefix}--date-picker__input {
      width: rem(288px);
    }
  }

  .#{$prefix}--date-picker__input {
    @include reset;
    @include type-style('code-02');
    @include focus-outline('reset');

    display: block;
    position: relative;
    height: rem(40px);
    max-width: rem(288px);
    padding: 0 $carbon--spacing-05;
    background-color: $field-01;
    border: none;
    color: $text-01;
    border-bottom: 1px solid $ui-04;
    transition: $duration--fast-01 motion(standard, productive) all;

    &:focus,
    &.#{$prefix}--focused {
      @include focus-outline('outline');
    }

    &[data-invalid],
    &[data-invalid]:focus {
      @include focus-outline('invalid');
    }

    &:disabled {
      color: $disabled;
      background-color: $disabled-background-color;
      border-bottom: 1px solid transparent;
      cursor: not-allowed;
    }

    &:disabled:hover {
      border-bottom: 1px solid transparent;
    }

    &::placeholder {
      @include placeholder-colors;
    }
  }

  .#{$prefix}--date-picker__icon {
    position: absolute;
    right: 1rem;
    fill: $icon-01;
    cursor: pointer;
    z-index: 1;
  }

  .#{$prefix}--date-picker__icon ~ .#{$prefix}--date-picker__input {
    padding-right: $carbon--spacing-09;
  }

  .#{$prefix}--date-picker--range
    > .#{$prefix}--date-picker-container:first-child {
    margin-right: rem(1px);
  }

  .#{$prefix}--date-picker--range .#{$prefix}--date-picker-container,
  .#{$prefix}--date-picker--range .#{$prefix}--date-picker__input {
    width: rem(143.5px);
  }

  .#{$prefix}--date-picker__calendar,
  .flatpickr-calendar.open {
    @include layer('pop-out');
    background-color: $ui-01;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $carbon--spacing-02 $carbon--spacing-02 $carbon--spacing-03
      $carbon--spacing-02;
    width: rem(288px) !important;
    height: rem(336px);
    border-radius: 0;
    border: none;
    overflow: hidden;
    margin-top: -2px;

    &:before,
    &:after {
      display: none;
    }

    &:focus {
      outline: 1px solid $interactive-01;
    }
  }

  .#{$prefix}--date-picker__month,
  .flatpickr-month {
    display: flex;
    align-items: center;
    width: 100%;
    height: rem(40px);
    margin-bottom: $carbon--spacing-02;
  }

  .#{$prefix}--date-picker__month .flatpickr-prev-month,
  .#{$prefix}--date-picker__month .flatpickr-next-month,
  .flatpickr-months .flatpickr-prev-month,
  .flatpickr-months .flatpickr-next-month {
    display: flex !important;
    align-items: center;
    justify-content: center;
    height: rem(40px);
    width: rem(40px);
    padding: 0;
    fill: $text-01;
    transition: background-color $duration--fast-01 motion(standard, productive);

    &:hover {
      background-color: $hover-ui;
    }
  }

  .flatpickr-current-month .numInputWrapper {
    width: 7ch;
  }

  .#{$prefix}--date-picker__month .flatpickr-current-month,
  .flatpickr-month .flatpickr-current-month {
    @include type-style('heading-01');
    padding: 0;
  }

  .#{$prefix}--date-picker__month .flatpickr-current-month svg,
  .flatpickr-month .flatpickr-current-month svg {
    fill: $text-01;
  }

  .#{$prefix}--date-picker__month .flatpickr-current-month .cur-month,
  .flatpickr-month .flatpickr-current-month .cur-month {
    margin-right: $carbon--spacing-02;
    color: $text-01;
  }

  .#{$prefix}--date-picker__month .numInputWrapper .numInput,
  .flatpickr-month .numInputWrapper .numInput {
    font-weight: 600;
    color: $text-01;
    background-color: $field-01;
    border: none;
    border-radius: 0;
    padding: $carbon--spacing-02;
    // Added in when upgraded to Flatpickr 4.5.5
    -moz-appearance: textfield; /* Firefox */

    &:focus {
      outline: 1px solid $interactive-01;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      // Added in when upgraded to Flatpickr 4.5.5
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }
  }

  .#{$prefix}--date-picker__month .numInputWrapper span.arrowUp,
  .#{$prefix}--date-picker__month .numInputWrapper span.arrowDown,
  .flatpickr-month .numInputWrapper span.arrowUp,
  .flatpickr-month .numInputWrapper span.arrowDown {
    left: 2.6rem;
    border: none;
    width: rem(12px);

    &:hover {
      background: none;

      &:after {
        border-bottom-color: $interactive-01;
        border-top-color: $interactive-01;
      }
    }

    &:after {
      border-bottom-color: $icon-01;
      border-top-color: $icon-01;
    }
  }

  .#{$prefix}--date-picker__month .numInputWrapper span.arrowUp,
  .flatpickr-month .numInputWrapper span.arrowUp {
    top: 4px;
  }

  .#{$prefix}--date-picker__month .numInputWrapper span.arrowDown,
  .flatpickr-month .numInputWrapper span.arrowDown {
    top: 11px;
  }

  span.#{$prefix}--date-picker__weekday,
  span.flatpickr-weekday {
    @include type-style('body-short-01');
    color: $text-01;
    font-weight: 400;
  }

  .#{$prefix}--date-picker__day,
  .flatpickr-day {
    @include type-style('body-short-01');
    height: rem(40px);
    width: rem(40px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-01;
    border-radius: 0;
    border: none;
    transition: all $duration--fast-01 motion(standard, productive);

    &:hover {
      background: $hover-ui;
    }

    &:focus {
      @include focus-outline('outline');
    }
  }

  .#{$prefix}--date-picker__days .nextMonthDay,
  .#{$prefix}--date-picker__days .prevMonthDay {
    color: $text-02;
  }

  .#{$prefix}--date-picker__day.today,
  .flatpickr-day.today {
    position: relative;
    color: $interactive-01;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      display: block;
      bottom: rem(7px);
      left: 50%;
      transform: translateX(-50%);
      height: rem(4px);
      width: rem(4px);
      background: $interactive-01;
    }
  }

  .#{$prefix}--date-picker__day.today.no-border,
  .flatpickr-day.today.no-border {
    border: none;
  }

  .#{$prefix}--date-picker__day.today.selected {
    border: 2px solid $interactive-01;
    &::after {
      display: none;
    }
  }

  .#{$prefix}--date-picker__day.disabled,
  .flatpickr-day.disabled {
    cursor: not-allowed;
    opacity: 0.5;
    color: $ui-05;

    &:hover {
      background: transparent;
    }
  }

  .#{$prefix}--date-picker__day.inRange,
  .flatpickr-day.inRange {
    background: $date-picker-in-range-background-color;
    color: $text-01;
  }

  .#{$prefix}--date-picker__day.selected,
  .flatpickr-day.selected {
    color: $inverse-01;
    background: $interactive-01;

    &:hover {
      color: $text-01;
    }
  }

  .#{$prefix}--date-picker__day.startRange.selected,
  .flatpickr-day.startRange.selected {
    box-shadow: none;
    z-index: 2;
  }

  .#{$prefix}--date-picker__day.endRange,
  .flatpickr-day.endRange {
    &:hover {
      background: $ui-01;
      @include focus-outline('outline');
    }
  }

  .#{$prefix}--date-picker__day.endRange.inRange,
  .flatpickr-day.endRange.inRange {
    @include focus-outline('outline');
    background: $ui-01;
    z-index: 3;
  }

  .#{$prefix}--date-picker__day.endRange.inRange.selected,
  .flatpickr-day.endRange.inRange.selected {
    color: $inverse-01;
    background: $interactive-01;
  }

  .#{$prefix}--date-picker__day.startRange.inRange:not(.selected),
  .flatpickr-day.startRange.inRange:not(.selected) {
    @include focus-outline('outline');
    background: $ui-01;
    z-index: 3;
  }

  .#{$prefix}--date-picker__days,
  .dayContainer {
    width: 100%;
    min-width: 100%;
    height: rem(246px);
  }

  .flatpickr-innerContainer,
  .flatpickr-rContainer {
    width: 100%;
    height: rem(336px);
  }

  .#{$prefix}--date-picker__weekdays,
  .flatpickr-weekdays,
  .flatpickr-weekdaycontainer {
    width: 100%;
  }

  .flatpickr-weekdays {
    height: rem(40px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flatpickr-weekdaycontainer {
    display: flex;
  }

  .flatpickr-months {
    display: flex;
    width: 100%;
    position: relative;
  }

  .flatpickr-prev-month,
  .flatpickr-next-month {
    padding-top: 12px;
  }

  .flatpickr-prev-month:hover svg,
  .flatpickr-next-month:hover svg {
    fill: $text-01;
  }

  .flatpickr-next-month.disabled,
  .flatpickr-prev-month.disabled {
    svg {
      fill: $ui-05;
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover {
      svg {
        fill: $ui-05;
      }
    }
  }

  // Skeleton State
  .#{$prefix}--date-picker.#{$prefix}--skeleton input,
  .#{$prefix}--date-picker__input.#{$prefix}--skeleton {
    @include skeleton;
    width: 100%;

    &::-webkit-input-placeholder {
      color: transparent;
    }
  }

  .#{$prefix}--date-picker.#{$prefix}--skeleton .#{$prefix}--label {
    @include skeleton;
    width: rem(75px);
    height: rem(14px);
  }
}
```

</details>

- **Group**: [date-picker](#date-picker)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [placeholder-colors [mixin]](#placeholder-colors-mixin)
  - [layer [mixin]](#layer-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [motion [function]](#motion-function)
  - [prefix [variable]](#prefix-variable)
  - [field-02 [variable]](#field-02-variable)
  - [support-01 [variable]](#support-01-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [field-01 [variable]](#field-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [duration--fast-01 [variable]](#duration--fast-01-variable)
  - [disabled [variable]](#disabled-variable)
  - [disabled-background-color [variable]](#disabled-background-color-variable)
  - [icon-01 [variable]](#icon-01-variable)
  - [carbon--spacing-09 [variable]](#carbon--spacing-09-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [text-02 [variable]](#text-02-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [date-picker-in-range-background-color [variable]](#date-picker-in-range-background-color-variable)
  - [inverse-01 [variable]](#inverse-01-variable)

## dropdown

### ❌dropdown [mixin]

v9 dropdown

<details>
<summary>Source code</summary>

```scss
@mixin dropdown() {
  .#{$prefix}--dropdown {
    @include reset;
    @include font-family;
    @include typescale('zeta');
    position: relative;
    list-style: none;
    display: block;
    background-color: $field-01;
    border: none;
    box-shadow: 0 1px 0 0 $ui-05;
    order: 1;
    width: 100%;
    height: rem(40px);
    cursor: pointer;
    color: $text-01;

    &:focus {
      outline: none;
      box-shadow: 0 2px 0 0 $brand-01;
    }

    &.#{$prefix}--dropdown--open:focus {
      outline: 1px solid transparent;
      box-shadow: none;
    }

    .#{$prefix}--dropdown--open .#{$prefix}--dropdown-list {
      @include layer('overlay');
    }
  }

  .#{$prefix}--dropdown--light {
    background-color: $field-02;
  }

  .#{$prefix}--dropdown--up {
    .#{$prefix}--dropdown-list {
      bottom: 2.5rem;
    }
  }

  .#{$prefix}--dropdown__arrow {
    fill: $brand-01;
    position: absolute;
    right: 1rem;
    top: 1.175rem;
    width: rem(10px);
    height: rem(5px);
    pointer-events: none;
    transition: transform $transition--expansion $carbon--standard-easing;
    transform-origin: 50% 45%;
  }

  .#{$prefix}--dropdown[data-value=''] .#{$prefix}--dropdown-text {
    color: $text-01;
  }

  .#{$prefix}--dropdown-text {
    height: rem(40px);
    padding-top: rem(13px);
    padding-bottom: rem(13px);
    padding-left: $spacing-md;
    padding-right: $spacing-2xl;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: $input-border;
  }

  .#{$prefix}--dropdown-list {
    @include reset;
    @include layer('overlay');
    @include typescale('zeta');
    background-color: $ui-01;
    display: flex;
    flex-direction: column;
    width: 100%;
    list-style: none;
    position: absolute;
    z-index: z('dropdown');
    max-height: 0;
    transition: max-height $transition--expansion $carbon--ease-out;
    overflow: hidden;
  }

  .#{$prefix}--dropdown-item {
    transition: opacity $transition--expansion $carbon--ease-out;
    opacity: 0;
  }

  .#{$prefix}--dropdown-link {
    display: block;
    color: currentColor;
    text-decoration: none;
    font-weight: normal;
    padding: $spacing-md $spacing-lg $spacing-md $spacing-md;
    text-overflow: ellipsis;
    overflow: hidden;

    &:hover,
    &:focus {
      background-color: $hover-row;
      outline: 1px solid transparent;
      text-decoration: underline;
      color: $text-01;
    }
  }

  .#{$prefix}--dropdown--selected {
    display: none;
  }

  .#{$prefix}--dropdown--open {
    .#{$prefix}--dropdown__arrow {
      transform: rotate(-180deg);
    }

    .#{$prefix}--dropdown-list {
      max-height: 15rem;

      &:hover {
        overflow: auto;
      }
    }

    .#{$prefix}--dropdown-item {
      opacity: 1;
    }
  }

  .#{$prefix}--dropdown--disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:focus {
      outline: none;
    }
  }

  .#{$prefix}--dropdown--auto-width {
    width: auto;
    max-width: rem(400px);
  }

  .#{$prefix}--dropdown--inline {
    background-color: transparent;
    box-shadow: none;

    &:focus {
      outline: none;
      box-shadow: none;
    }

    &:focus .#{$prefix}--dropdown-text {
      @include focus-outline('border');
    }

    &[data-value=''] .#{$prefix}--dropdown-text {
      color: $brand-01;
    }

    .#{$prefix}--dropdown-text {
      display: inline-block;
      padding-right: 1.5rem;
      overflow: visible;
      color: $brand-01;
    }

    .#{$prefix}--dropdown-text:hover {
      background-color: $field-01;
    }

    &.#{$prefix}--dropdown--open:focus {
      box-shadow: none;
    }

    &.#{$prefix}--dropdown--open:focus .#{$prefix}--dropdown-list {
      @include layer('overlay');
    }

    &.#{$prefix}--dropdown--open:focus .#{$prefix}--dropdown-text {
      outline: none;
    }

    .#{$prefix}--dropdown__arrow {
      position: relative;
      top: -2px;
      left: 8px;
      right: 0;
      bottom: 0;
    }

    .#{$prefix}--dropdown-link {
      font-weight: normal;
    }

    .#{$prefix}--dropdown-link:hover {
      background-color: $field-01;
      color: $text-01;
    }
  }

  // Skeleton State
  .#{$prefix}--dropdown-v2.#{$prefix}--skeleton,
  .#{$prefix}--dropdown.#{$prefix}--skeleton {
    @include skeleton;
  }
}
```

</details>

- **Group**: [dropdown](#dropdown)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [layer [mixin]](#layer-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [z [function]](#z-function)
  - [prefix [variable]](#prefix-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [text-01 [variable]](#text-01-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [field-02 [variable]](#field-02-variable)
  - [transition--expansion [variable]](#transition--expansion-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [spacing-2xl [variable]](#spacing-2xl-variable)
  - [input-border [variable]](#input-border-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [carbon--ease-out [variable]](#carbon--ease-out-variable)
  - [spacing-lg [variable]](#spacing-lg-variable)
  - [hover-row [variable]](#hover-row-variable)

### ❌dropdown--x [mixin]

v10 dropdown

<details>
<summary>Source code</summary>

```scss
@mixin dropdown--x() {
  .#{$prefix}--dropdown__wrapper--inline {
    display: inline-grid;
    align-items: center;
    grid-template: auto auto / auto min-content;
    grid-gap: rem(4px);

    .#{$prefix}--label {
      @include type-style('body-short-01');
    }

    .#{$prefix}--label,
    .#{$prefix}--form__helper-text,
    .#{$prefix}--form-requirement {
      margin: 0;
    }

    .#{$prefix}--form-requirement {
      grid-column: 2;
    }
  }

  .#{$prefix}--dropdown {
    @include reset;
    @include focus-outline('reset');
    position: relative;
    list-style: none;
    display: block;
    background-color: $field-01;
    border: none;
    border-bottom: 1px solid $ui-04;
    width: 100%;
    height: rem(40px);
    cursor: pointer;
    color: $text-01;
    outline: 2px solid transparent;
    transition: $duration--fast-02 motion(standard, productive) all;

    &:focus {
      @include focus-outline('outline');
    }

    &:hover {
      background-color: $hover-ui;
    }
  }

  .#{$prefix}--dropdown--open {
    border-bottom-color: $ui-03;
  }

  .#{$prefix}--dropdown--invalid {
    @include focus-outline('invalid');

    .#{$prefix}--dropdown-text {
      padding-right: rem(56px); // TODO: spacing token
    }

    + .#{$prefix}--form-requirement {
      display: inline-block;
      max-height: rem(200px);
      color: $support-01;
    }
  }

  .#{$prefix}--dropdown__invalid-icon {
    position: absolute;
    top: 50%;
    right: rem(40px); // TODO: spacing token
    fill: $support-01;
    transform: translateY(-50%);
  }

  .#{$prefix}--dropdown--open:hover {
    background-color: $field-01;
  }

  .#{$prefix}--dropdown--open:focus {
    outline: 1px solid transparent;
  }

  .#{$prefix}--dropdown--open .#{$prefix}--dropdown-list {
    @include layer('overlay');
  }

  .#{$prefix}--dropdown--light {
    background-color: $field-02;
  }

  .#{$prefix}--dropdown--up .#{$prefix}--dropdown-list {
    bottom: 2rem;
  }

  .#{$prefix}--dropdown__arrow {
    fill: $ui-05;
    position: absolute;
    right: 1rem;
    top: rem(13px);
    pointer-events: none;
    transition: transform $duration--fast-02 motion(standard, productive);
    transform-origin: 50% 45%;
  }

  .#{$prefix}--dropdown-text {
    @include type-style('body-short-01');
    display: block;
    height: rem(40px);
    padding-top: $carbon--spacing-04;
    padding-bottom: $carbon--spacing-04;
    padding-left: $carbon--spacing-05;
    padding-right: rem(42px); // 2rem + SVG width
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .#{$prefix}--dropdown-list {
    @include reset;
    @include layer('overlay');
    @include type-style('body-short-01');
    background-color: $ui-01;
    display: flex;
    flex-direction: column;
    width: 100%;
    list-style: none;
    position: absolute;
    z-index: z('dropdown');
    max-height: 0;
    transition: max-height $duration--fast-02 motion(standard, productive);
    overflow: hidden;
  }

  .#{$prefix}--dropdown-item {
    transition: opacity $duration--fast-02 motion(standard, productive), background-color
        $duration--fast-02 motion(standard, productive);
    opacity: 0;

    &:hover {
      background-color: $hover-ui;

      + .#{$prefix}--dropdown-item .#{$prefix}--dropdown-link {
        border-color: transparent;
      }
    }

    &:active {
      background-color: $selected-ui;
    }

    &:first-of-type .#{$prefix}--dropdown-link {
      border-top-color: transparent;
    }
  }

  .#{$prefix}--dropdown-item:last-of-type .#{$prefix}--dropdown-link {
    border-bottom: none;
  }

  .#{$prefix}--dropdown-link {
    @include focus-outline('reset');
    display: block;
    height: rem(40px);
    color: $text-02;
    text-decoration: none;
    font-weight: normal;
    line-height: rem(16px);
    padding: rem(11px) 0;
    margin: 0 $carbon--spacing-05;
    border: 1px solid transparent;
    border-top-color: $ui-03;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    &:focus {
      @include focus-outline('outline');
      margin: 0;
      padding: rem(11px) rem(16px);
    }

    &:hover {
      color: $text-01;
      border-color: transparent;
    }
  }

  .#{$prefix}--dropdown-item:hover .#{$prefix}--dropdown-link {
    border-bottom-color: $hover-ui;
  }

  .#{$prefix}--dropdown--selected {
    display: none;
  }

  .#{$prefix}--dropdown--open .#{$prefix}--dropdown__arrow {
    transform: rotate(-180deg);
  }

  .#{$prefix}--dropdown--open .#{$prefix}--dropdown-list {
    max-height: 15rem;

    &:hover {
      overflow: auto;
    }
  }

  .#{$prefix}--dropdown--open .#{$prefix}--dropdown-item {
    opacity: 1;
  }

  .#{$prefix}--dropdown--disabled {
    border-bottom-color: transparent;
    cursor: not-allowed;

    &:hover {
      background-color: $field-01;
    }

    &:focus {
      outline: none;
    }

    .#{$prefix}--dropdown-text {
      color: $disabled-02;
    }

    .#{$prefix}--dropdown__arrow {
      fill: $disabled-02;
    }

    &.#{$prefix}--dropdown--light:hover {
      background-color: $field-02;
    }
  }

  .#{$prefix}--dropdown--auto-width {
    width: auto;
    max-width: rem(400px);
  }

  .#{$prefix}--dropdown--inline {
    justify-self: start;
    display: inline-block;
    border-bottom-color: transparent;
    transition-property: none;
    width: auto;
    height: rem(32px);
    background-color: $field-02;

    &:hover {
      background-color: $hover-ui;
    }

    &.#{$prefix}--dropdown--disabled {
      background-color: $field-02;
    }

    .#{$prefix}--dropdown__arrow {
      top: rem(8px);
      right: rem(8px);
    }
  }

  .#{$prefix}--dropdown--inline.#{$prefix}--dropdown--open {
    background-color: transparent;
  }

  .#{$prefix}--dropdown--inline .#{$prefix}--dropdown-text {
    display: inline-block;
    padding: rem(7px) rem(32px) rem(7px) $carbon--spacing-04; // TODO: spacing token
    height: rem(32px);
    overflow: visible;
    color: $text-01;
  }

  .#{$prefix}--dropdown--inline.#{$prefix}--dropdown--disabled
    .#{$prefix}--dropdown-text {
    color: $disabled-02;
  }

  .#{$prefix}--dropdown--inline.#{$prefix}--dropdown--disabled:focus
    .#{$prefix}--dropdown-text {
    outline: 0;
  }

  .#{$prefix}--dropdown--inline.#{$prefix}--dropdown--invalid
    .#{$prefix}--dropdown__invalid-icon {
    right: rem(32px);
  }

  .#{$prefix}--dropdown--inline.#{$prefix}--dropdown--invalid
    .#{$prefix}--dropdown-text {
    padding-right: rem(56px);
  }

  .#{$prefix}--dropdown--inline.#{$prefix}--dropdown--open:focus
    .#{$prefix}--dropdown-list {
    @include layer('overlay');
  }

  .#{$prefix}--dropdown--inline .#{$prefix}--dropdown-link {
    font-weight: normal;
    margin-right: $carbon--spacing-04;
    margin-left: rem(10px);

    &:focus {
      margin: 0;
      padding-left: rem(10px);
    }
  }

  // Skeleton State
  .#{$prefix}--dropdown-v2.#{$prefix}--skeleton,
  .#{$prefix}--dropdown.#{$prefix}--skeleton {
    @include skeleton;
  }
}
```

</details>

- **Group**: [dropdown](#dropdown)
- **Requires**:
  - [type-style [mixin]](#type-style-mixin)
  - [reset [mixin]](#reset-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [layer [mixin]](#layer-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [motion [function]](#motion-function)
  - [z [function]](#z-function)
  - [prefix [variable]](#prefix-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [text-01 [variable]](#text-01-variable)
  - [duration--fast-02 [variable]](#duration--fast-02-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [support-01 [variable]](#support-01-variable)
  - [field-02 [variable]](#field-02-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [carbon--spacing-04 [variable]](#carbon--spacing-04-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [selected-ui [variable]](#selected-ui-variable)
  - [text-02 [variable]](#text-02-variable)
  - [disabled-02 [variable]](#disabled-02-variable)

## feature-flags

### ✅feature-flags [variable]

Initialize the feature flag map with default values.

<details>
<summary>Source code</summary>

```scss
$feature-flags: ();
```

</details>

**Example**: Overriding defaults from the `$default-feature-flags` map

<details>
<summary>Example code</summary>

```scss
$feature-flags: (
  components-x: true,
  breaking-changes-x: true,
  ui-shell: false,
  grid: true,
  grid-columns-16: false,
  grid--fallback: false,
);
```

</details>

- **Group**: [feature-flags](#feature-flags)
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

- **Group**: [feature-flags](#feature-flags)
- **Type**: `Map`

### ❌did-warn-diverged-feature-flags [variable]

<details>
<summary>Source code</summary>

```scss
$did-warn-diverged-feature-flags: false !default;
```

</details>

- **Group**: [feature-flags](#feature-flags)
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
      @if (
        map-has-key($dst, $name) == true and map-get($dst, $name) != $value
      ) {
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

| Name   | Description                                                  | Type  | Default value |
| ------ | ------------------------------------------------------------ | ----- | ------------- |
| `$dst` | The feature flags to merge to (default feature flags)        | `Map` | —             |
| `$src` | The feature flags to merge from (user-defined feature flags) | `Map` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
$feature-flags: merge-feature-flags($default-feature-flags, $feature-flags);
```

</details>

- **Group**: [feature-flags](#feature-flags)
- **Returns**: `Map` The result of `map-merge($dst, $src)`
- **Requires**:
  - [did-warn-diverged-feature-flags [variable]](#did-warn-diverged-feature-flags-variable)

### ✅feature-flag-enabled [function]

Used for enabling features

<details>
<summary>Source code</summary>

```scss
@function feature-flag-enabled($feature) {
  @if global-variable-exists(feature-flags) ==
    true and
    map-get($feature-flags, $feature) ==
    true
  {
    @return true;
  }
  @return false;
}
```

</details>

- **Parameters**:

| Name       | Description                           | Type     | Default value |
| ---------- | ------------------------------------- | -------- | ------------- |
| `$feature` | Feature from `$default-feature-flags` | `String` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
// Will include code inside of { } only if `components-x` is true
@if feature-flag-enabled('components-x') { ... }
```

</details>

- **Group**: [feature-flags](#feature-flags)
- **Returns**: `Bool`
- **Requires**:
  - [feature-flags [variable]](#feature-flags-variable)
- **Used by**:
  - [breadcrumb--x [mixin]](#breadcrumb--x-mixin)
  - [data-table-v2-core [mixin]](#data-table-v2-core-mixin)
  - [plex-font-face [mixin]](#plex-font-face-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [light-ui [mixin]](#light-ui-mixin)
  - [padding [function]](#padding-function)
  - [breakpoint [mixin]](#breakpoint-mixin)
  - [max-breakpoint [mixin]](#max-breakpoint-mixin)
  - [grid-container [mixin]](#grid-container-mixin)
  - [typography [mixin]](#typography-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [helvetica [mixin]](#helvetica-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [line-height [mixin]](#line-height-mixin)
  - [font-smoothing [mixin]](#font-smoothing-mixin)
  - [letter-spacing [mixin]](#letter-spacing-mixin)
  - [font-size [mixin]](#font-size-mixin)
  - [pseudo-underline [mixin]](#pseudo-underline-mixin)
  - [pagination-nav-base [mixin]](#pagination-nav-base-mixin)
  - [toolbar [mixin]](#toolbar-mixin)

### ✅css--font-face [variable]

If true, includes font face mixins in `_css--font-face.scss` depending on `css--plex` and `components-x` feature flags

<details>
<summary>Source code</summary>

```scss
$css--font-face: true;
```

</details>

- **Group**: [feature-flags](#feature-flags)
- **Type**: `Bool`

### ✅css--helpers [variable]

If true, includes the `css-helpers()` mixin

<details>
<summary>Source code</summary>

```scss
$css--helpers: true;
```

</details>

- **Group**: [feature-flags](#feature-flags)
- **Type**: `Bool`

### ✅css--body [variable]

If true, includes the `css-body()` mixin

<details>
<summary>Source code</summary>

```scss
$css--body: true;
```

</details>

- **Group**: [feature-flags](#feature-flags)
- **Type**: `Bool`

### ✅css--use-layer [variable]

If true, the `layer()` mixin sets `box-shadow` values

<details>
<summary>Source code</summary>

```scss
$css--use-layer: true;
```

</details>

- **Group**: [feature-flags](#feature-flags)
- **Type**: `Bool`
- **Used by**:
  - [layer [mixin]](#layer-mixin)

### ✅css--reset [variable]

If true, include reset CSS

<details>
<summary>Source code</summary>

```scss
$css--reset: true;
```

</details>

- **Group**: [feature-flags](#feature-flags)
- **Type**: `Bool`
- **Used by**:
  - [reset [mixin]](#reset-mixin)

### ✅css--typography [variable]

If true and `components-x` feature flag is false, include the deprecated `typography()` mixin

<details>
<summary>Source code</summary>

```scss
$css--typography: true;
```

</details>

- **Group**: [feature-flags](#feature-flags)
- **Type**: `Bool`

### ✅css--plex [variable]

Used with `css--font-face` feature flag, if true, uses Plex font families instead of Helvetica

<details>
<summary>Source code</summary>

```scss
$css--plex: true;
```

</details>

- **Group**: [feature-flags](#feature-flags)
- **Type**: `Bool`
- **Used by**:
  - [font-family [mixin]](#font-family-mixin)

### ✅⚠️css--use-experimental-grid [variable]

This feature flag was used during development of the v10 experimental grid.
TODO: remove in next major release. Synced in `feature-flags` as an adapter in the interim.

<details>
<summary>Source code</summary>

```scss
$css--use-experimental-grid: false;
```

</details>

- **Group**: [feature-flags](#feature-flags)
- **Type**: `Bool`
- **Deprecated**: (For v10) v10 always uses `@carbon/grid`

### ✅⚠️css--use-experimental-grid-fallback [variable]

This feature flag was used during development of the v10 experimental grid.
TODO: remove in next major release. Synced in `feature-flags` as an adapter in the interim.

<details>
<summary>Source code</summary>

```scss
$css--use-experimental-grid-fallback: false;
```

</details>

- **Group**: [feature-flags](#feature-flags)
- **Type**: `Bool`
- **Deprecated**: (For v10) v10 always uses `@carbon/grid`

## file-uploader

### ❌file-uploader [mixin]

v9 file-uploader

<details>
<summary>Source code</summary>

```scss
@mixin file-uploader() {
  .#{$prefix}--file {
    width: 100%;
  }

  .#{$prefix}--file-input {
    @include hidden;
  }

  .#{$prefix}--file-btn {
    display: inline-flex;
    margin: 0;
  }

  .#{$prefix}--label-description {
    @include reset;
    @include typescale('zeta');
    @include line-height('body');
    color: $text-02;
    margin-bottom: $spacing-lg;
  }

  .#{$prefix}--file-container {
    display: block;
    width: 100%;
    margin-top: $spacing-lg;
  }

  .#{$prefix}--file__selected-file {
    @include text-overflow(300px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: rem(30px);
    background-color: $field-02;
    border: 1px solid $ui-03;
    padding: 0 $spacing-md;
    margin-bottom: $spacing-md;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .#{$prefix}--file-filename {
    @include typescale('omega');
    @include text-overflow(100%);
    display: inline-flex;
    align-items: center;
    color: $text-01;
    margin-right: $spacing-md;
    height: 1.875rem;
    /*rtl:ignore*/
    direction: ltr;
    justify-content: flex-start; /*rtl:{flex-end}*/
  }

  .#{$prefix}--file__state-container {
    display: flex;
    align-items: center;

    .#{$prefix}--loading {
      width: 1rem;
      height: 1rem;
      margin-right: $spacing-xs;
    }

    .#{$prefix}--loading__svg {
      stroke: $ui-05;
    }
  }

  .#{$prefix}--file__state-container .#{$prefix}--file-close,
  .#{$prefix}--file__state-container .#{$prefix}--file-complete {
    width: 1rem;
    height: 1rem;
    fill: $text-01;
    cursor: pointer;

    &:focus {
      @include focus-outline('border');
    }
  }

  .#{$prefix}--file__state-container .#{$prefix}--file-close {
    fill: $ui-05;
  }

  .#{$prefix}--file__state-container .#{$prefix}--file-complete {
    fill: $support-02;
  }
}
```

</details>

- **Group**: [file-uploader](#file-uploader)
- **Requires**:
  - [hidden [mixin]](#hidden-mixin)
  - [reset [mixin]](#reset-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [line-height [mixin]](#line-height-mixin)
  - [text-overflow [mixin]](#text-overflow-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [text-02 [variable]](#text-02-variable)
  - [spacing-lg [variable]](#spacing-lg-variable)
  - [field-02 [variable]](#field-02-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [text-01 [variable]](#text-01-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [support-02 [variable]](#support-02-variable)

### ❌file-uploader--x [mixin]

v10 file-uploader

<details>
<summary>Source code</summary>

```scss
@mixin file-uploader--x() {
  .#{$prefix}--file {
    width: 100%;
  }

  .#{$prefix}--file--invalid {
    margin-right: $carbon--spacing-03;
    fill: $support-01;
  }

  // TODO: sync with type
  .#{$prefix}--file--label {
    @include reset;
    @include type-style('heading-01');

    color: $text-01;
    margin-bottom: $carbon--spacing-03;
  }

  .#{$prefix}--file-input {
    @include hidden;
  }

  .#{$prefix}--file-btn {
    display: inline-flex;
    margin: 0;
    padding-right: rem(64px);
  }

  .#{$prefix}--label-description {
    @include reset;
    @include type-style('body-short-01');

    color: $text-02;
    margin-bottom: $carbon--spacing-05;
  }

  .#{$prefix}--file-container {
    display: block;
    width: 100%;
    margin-top: $carbon--spacing-06;
  }

  .#{$prefix}--file__selected-file {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: rem(40px);
    max-width: rem(300px);
    margin-bottom: $carbon--spacing-03;
    padding: 0 $carbon--spacing-03 0 $carbon--spacing-05;
    background-color: $field-01;
    overflow: hidden;

    &:last-child {
      margin-bottom: 0;
    }

    .#{$prefix}--inline-loading__animation,
    .#{$prefix}--loading {
      right: -0.25rem; // offset for loading svg container
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .#{$prefix}--file__selected-file--invalid {
    @include focus-outline('invalid');
    margin-bottom: $carbon--spacing-02;
  }

  .#{$prefix}--file__selected-file--invalid + .#{$prefix}--form-requirement {
    display: block;
    max-height: rem(200px);
    color: $support-01;
    font-weight: 400;
    margin: 0 0 $carbon--spacing-03 0;
    overflow: visible;
  }

  .#{$prefix}--file-filename {
    @include type-style('body-short-01');
    @include text-overflow(300px);
    display: inline-block;
    align-items: center;
    color: $text-01;
    margin-right: $carbon--spacing-05;
    /*rtl:ignore*/
    direction: ltr;
    justify-content: flex-start; /*rtl:{flex-end}*/
  }

  .#{$prefix}--file__state-container {
    display: flex;
    align-items: center;

    .#{$prefix}--loading__svg {
      stroke: $ui-05;
    }
  }

  .#{$prefix}--file__state-container .#{$prefix}--file-complete {
    fill: $support-02;
    cursor: pointer;

    &:focus {
      @include focus-outline('border');
    }
  }

  .#{$prefix}--file__state-container .#{$prefix}--file-close {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }
}
```

</details>

- **Group**: [file-uploader](#file-uploader)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [hidden [mixin]](#hidden-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [text-overflow [mixin]](#text-overflow-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [support-01 [variable]](#support-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [text-02 [variable]](#text-02-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [carbon--spacing-06 [variable]](#carbon--spacing-06-variable)
  - [field-01 [variable]](#field-01-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [support-02 [variable]](#support-02-variable)

## form

### ❌form [mixin]

v9 form

<details>
<summary>Source code</summary>

```scss
@mixin form() {
  .#{$prefix}--fieldset {
    @include reset;
    margin-bottom: $spacing-xl;
  }

  .#{$prefix}--form-item {
    @include font-family;
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: flex-start;
  }

  .#{$prefix}--form-item--light input,
  .#{$prefix}--form-item--light input[type='number'] {
    background: $field-02 !important;
  }

  .#{$prefix}--label {
    @include reset;
    @include font-family;
    @include typescale('zeta');
    color: $text-01;
    font-weight: $input-label-weight;
    display: inline-block;
    vertical-align: baseline;
    margin-bottom: $spacing-xs;
  }

  .#{$prefix}--label--with-helper {
    margin-bottom: 0;
  }

  .#{$prefix}--label .#{$prefix}--tooltip__trigger {
    @include typescale('zeta');
  }

  // Skeleton State
  .#{$prefix}--label.#{$prefix}--skeleton {
    @include skeleton;
    width: rem(75px);
    height: rem(14px);
  }

  input[data-invalid],
  textarea[data-invalid],
  select[data-invalid],
  .#{$prefix}--list-box[data-invalid] {
    box-shadow: 0 2px 0px 0px $support-01;

    ~ .#{$prefix}--form-requirement {
      max-height: rem(200px);
      display: block;
    }
  }

  // Fix for red ring when input is marked required in Firefox, refs #744
  input:not(output):not([data-invalid]):-moz-ui-invalid {
    box-shadow: none;
  }

  .#{$prefix}--form-requirement {
    @include reset;
    @include typescale('omega');
    margin: $spacing-sm 0 0;
    max-height: 0;
    overflow: hidden;
    font-weight: 600;
    line-height: 1.5;
    display: none;

    &::before {
      content: '*';
      display: inline-block;
      color: $support-01;
    }
  }

  .#{$prefix}--form__helper-text {
    @include typescale('omega');
    color: $text-02;
    order: 1;
    line-height: 1.5;
    z-index: 0;
    max-height: 3rem;
    opacity: 1;
    margin-bottom: $spacing-xs;
  }

  .#{$prefix}--label--disabled,
  .#{$prefix}--form__helper-text--disabled {
    opacity: 0.5;
  }
}
```

</details>

- **Group**: [form](#form)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-xl [variable]](#spacing-xl-variable)
  - [field-02 [variable]](#field-02-variable)
  - [text-01 [variable]](#text-01-variable)
  - [input-label-weight [variable]](#input-label-weight-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [support-01 [variable]](#support-01-variable)
  - [spacing-sm [variable]](#spacing-sm-variable)
  - [text-02 [variable]](#text-02-variable)

### ❌form--x [mixin]

v10 form

<details>
<summary>Source code</summary>

```scss
@mixin form--x() {
  .#{$prefix}--fieldset {
    @include reset;
    margin-bottom: $carbon--spacing-07;
  }

  .#{$prefix}--form-item {
    @include type-style('body-short-01');
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: flex-start;
  }

  .#{$prefix}--label {
    @include reset;
    @include type-style('label-01');

    color: $text-02;
    font-weight: $input-label-weight;
    display: inline-block;
    vertical-align: baseline;
    margin-bottom: $carbon--spacing-03;
    line-height: rem(16px);
  }

  .#{$prefix}--label .#{$prefix}--tooltip__trigger {
    // When tooltip trigger is put in form label the trigger button should fit in the size of label
    // https://github.com/IBM/carbon-components-react/issues/115
    @include type-style('label-01');
  }

  // Skeleton State
  .#{$prefix}--label.#{$prefix}--skeleton {
    @include skeleton;
    width: rem(75px);
    height: rem(14px);
  }

  input[type='number'] {
    font-family: carbon--font-family('mono');
  }

  input[data-invalid],
  .#{$prefix}--text-input__field-wrapper[data-invalid],
  .#{$prefix}--text-area__wrapper[data-invalid]
    > .#{$prefix}--text-area--invalid,
  .#{$prefix}--select-input__wrapper[data-invalid],
  .#{$prefix}--list-box[data-invalid],
  .#{$prefix}--combo-box[data-invalid] .#{$prefix}--text-input {
    @include focus-outline('invalid');
  }

  input[data-invalid],
  .#{$prefix}--text-input__field-wrapper[data-invalid],
  .#{$prefix}--text-area__wrapper[data-invalid],
  .#{$prefix}--select-input__wrapper[data-invalid],
  .#{$prefix}--time-picker[data-invalid],
  .#{$prefix}--list-box[data-invalid] {
    ~ .#{$prefix}--form-requirement {
      max-height: rem(200px);
      display: block;
      color: $support-01;
    }
  }

  // Fix for red ring when input is marked required in Firefox, refs #744
  input:not(output):not([data-invalid]):-moz-ui-invalid {
    box-shadow: none;
  }

  .#{$prefix}--form-requirement {
    @include reset;
    @include type-style('caption-01');
    margin: $carbon--spacing-02 0 0;
    max-height: 0;
    overflow: hidden;
    line-height: 1.5;
    display: none;
  }

  .#{$prefix}--label + .#{$prefix}--form__helper-text {
    margin-top: rem(-6px); // when both helper text and label are rendered
  }

  .#{$prefix}--form__helper-text {
    @include type-style('helper-text-01');
    font-style: italic;
    color: $text-02;
    z-index: 0;
    opacity: 1;
    margin-bottom: $carbon--spacing-03;
  }

  .#{$prefix}--label--disabled,
  .#{$prefix}--form__helper-text--disabled {
    color: $disabled-02;
  }

  @media (min-width: breakpoint('sm')) {
    .#{$prefix}--form__helper-text {
      max-width: 75%;
    }
  }
}
```

</details>

- **Group**: [form](#form)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [rem [function]](#rem-function)
  - [carbon--font-family [function]](#carbon--font-family-function)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-07 [variable]](#carbon--spacing-07-variable)
  - [text-02 [variable]](#text-02-variable)
  - [input-label-weight [variable]](#input-label-weight-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [support-01 [variable]](#support-01-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [disabled-02 [variable]](#disabled-02-variable)

## global-body

### ❌css-body [mixin]

v9 body declarations

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

- **Group**: [global-body](#global-body)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [text-01 [variable]](#text-01-variable)
  - [ui-02 [variable]](#ui-02-variable)

### ❌css-body--x [mixin]

v10 body declarations

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

- **Group**: [global-body](#global-body)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [text-01 [variable]](#text-01-variable)
  - [ui-background [variable]](#ui-background-variable)

## global-colors

### ✅⚠️color\_\_blue-20 [variable]

<details>
<summary>Source code</summary>

```scss
$color__blue-20: #7cc7ff;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_blue-30 [variable]

<details>
<summary>Source code</summary>

```scss
$color__blue-30: #5aaafa;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_blue-40 [variable]

<details>
<summary>Source code</summary>

```scss
$color__blue-40: #5596e6;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_blue-50 [variable]

<details>
<summary>Source code</summary>

```scss
$color__blue-50: #4178be;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_blue-90 [variable]

<details>
<summary>Source code</summary>

```scss
$color__blue-90: #152935;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-1 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-1: #0f212e;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-2 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-2: #20343e;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-3 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-3: #2d3f49;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-4 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-4: #394b54;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [tags [mixin]](#tags-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-5 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-5: #42535c;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-6 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-6: #5a6872;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-7 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-7: #8c9ba5;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-8 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-8: #dfe6eb;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_navy-gray-9 [variable]

<details>
<summary>Source code</summary>

```scss
$color__navy-gray-9: #eff2f5;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_white [variable]

<details>
<summary>Source code</summary>

```scss
$color__white: #fff;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [pagination-nav [mixin]](#pagination-nav-mixin)
  - [select [mixin]](#select-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_blue-51 [variable]

<details>
<summary>Source code</summary>

```scss
$color__blue-51: #3d70b2;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_gray-1 [variable]

<details>
<summary>Source code</summary>

```scss
$color__gray-1: #dfe3e6;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [tags [mixin]](#tags-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_gray-2 [variable]

<details>
<summary>Source code</summary>

```scss
$color__gray-2: #f0f3f6;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_gray-3 [variable]

<details>
<summary>Source code</summary>

```scss
$color__gray-3: #f5f7fa;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_blue-10 [variable]

<details>
<summary>Source code</summary>

```scss
$color__blue-10: #c0e6ff;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [tags [mixin]](#tags-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_blue-60 [variable]

<details>
<summary>Source code</summary>

```scss
$color__blue-60: #325c80;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [tags [mixin]](#tags-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_teal-10 [variable]

<details>
<summary>Source code</summary>

```scss
$color__teal-10: #a7fae6;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [tags [mixin]](#tags-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_teal-20 [variable]

<details>
<summary>Source code</summary>

```scss
$color__teal-20: #6eedd8;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_teal-30 [variable]

<details>
<summary>Source code</summary>

```scss
$color__teal-30: #41d6c3;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_teal-40 [variable]

<details>
<summary>Source code</summary>

```scss
$color__teal-40: #00b4a0;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_teal-50 [variable]

<details>
<summary>Source code</summary>

```scss
$color__teal-50: #008571;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_teal-60 [variable]

<details>
<summary>Source code</summary>

```scss
$color__teal-60: #006d5d;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [tags [mixin]](#tags-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_green-10 [variable]

<details>
<summary>Source code</summary>

```scss
$color__green-10: #c8f08f;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [tags [mixin]](#tags-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_green-20 [variable]

<details>
<summary>Source code</summary>

```scss
$color__green-20: #b4e051;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_green-30 [variable]

<details>
<summary>Source code</summary>

```scss
$color__green-30: #8cd211;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_green-40 [variable]

<details>
<summary>Source code</summary>

```scss
$color__green-40: #5aa700;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_green-50 [variable]

<details>
<summary>Source code</summary>

```scss
$color__green-50: #4b8400;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_green-60 [variable]

<details>
<summary>Source code</summary>

```scss
$color__green-60: #2d660a;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [tags [mixin]](#tags-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_yellow-10 [variable]

<details>
<summary>Source code</summary>

```scss
$color__yellow-10: #fde876;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [tags [mixin]](#tags-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_yellow-20 [variable]

<details>
<summary>Source code</summary>

```scss
$color__yellow-20: #fdd600;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_yellow-30 [variable]

<details>
<summary>Source code</summary>

```scss
$color__yellow-30: #efc100;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_yellow-60 [variable]

<details>
<summary>Source code</summary>

```scss
$color__yellow-60: #735f00;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [tags [mixin]](#tags-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_orange-10 [variable]

<details>
<summary>Source code</summary>

```scss
$color__orange-10: #ffd4a0;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [tags [mixin]](#tags-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_orange-20 [variable]

<details>
<summary>Source code</summary>

```scss
$color__orange-20: #ffa573;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_orange-30 [variable]

<details>
<summary>Source code</summary>

```scss
$color__orange-30: #ff7832;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_orange-60 [variable]

<details>
<summary>Source code</summary>

```scss
$color__orange-60: #a53725;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [tags [mixin]](#tags-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_red-10 [variable]

<details>
<summary>Source code</summary>

```scss
$color__red-10: #ffd2dd;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_red-30 [variable]

<details>
<summary>Source code</summary>

```scss
$color__red-30: #ff7d87;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_red-40 [variable]

<details>
<summary>Source code</summary>

```scss
$color__red-40: #ff5050;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_red-50 [variable]

<details>
<summary>Source code</summary>

```scss
$color__red-50: #e71d32;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_red-60 [variable]

<details>
<summary>Source code</summary>

```scss
$color__red-60: #ad1625;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_purple-10 [variable]

<details>
<summary>Source code</summary>

```scss
$color__purple-10: #eed2ff;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [tags [mixin]](#tags-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_purple-20 [variable]

<details>
<summary>Source code</summary>

```scss
$color__purple-20: #d7aaff;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_purple-30 [variable]

<details>
<summary>Source code</summary>

```scss
$color__purple-30: #ba8ff7;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_purple-40 [variable]

<details>
<summary>Source code</summary>

```scss
$color__purple-40: #af6ee8;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Deprecated**: (For v10) Use `@include carbon--colors()`

### ✅⚠️color\_\_purple-60 [variable]

<details>
<summary>Source code</summary>

```scss
$color__purple-60: #734098;
```

</details>

- **Group**: [global-colors](#global-colors)
- **Type**: `Color`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [tags [mixin]](#tags-mixin)
- **Deprecated**: (For v10) Use `@include carbon--colors()`

## global-deprecate

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

- **Group**: [global-deprecate](#global-deprecate)
- **Requires**:
  - [deprecations--entry [variable]](#deprecations--entry-variable)
  - [deprecations--reasons [variable]](#deprecations--reasons-variable)
- **Used by**:
  - [helvetica-font-face [mixin]](#helvetica-font-face-mixin)
  - [plex-font-face [mixin]](#plex-font-face-mixin)
  - [light-ui [mixin]](#light-ui-mixin)
  - [breakpoint [mixin]](#breakpoint-mixin)
  - [max-breakpoint [mixin]](#max-breakpoint-mixin)
  - [grid-container [mixin]](#grid-container-mixin)
  - [typography [mixin]](#typography-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [helvetica [mixin]](#helvetica-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [line-height [mixin]](#line-height-mixin)
  - [font-smoothing [mixin]](#font-smoothing-mixin)
  - [letter-spacing [mixin]](#letter-spacing-mixin)
  - [font-size [mixin]](#font-size-mixin)

### ❌deprecations--entry [variable]

We flag this variable as true if someone uses the globals/scss/styles.scss
entry-point. This allows us to collect all the messages and display them at
the end of the file instead of bringing it up per-component.

If a consumer instead gets the components by importing the partial directly,
this variable _will not_ be set to true, so the deprecation message will be
displayed after the @import.

<details>
<summary>Source code</summary>

```scss
$deprecations--entry: true;
```

</details>

- **Group**: [global-deprecate](#global-deprecate)
- **Type**: `Bool`
- **Used by**:
  - [deprecate [mixin]](#deprecate-mixin)

### ❌deprecations--reasons [variable]

Collect all deprecation reasons into this list throughout the import cycle.

<details>
<summary>Source code</summary>

```scss
$deprecations--reasons: ();
```

</details>

- **Group**: [global-deprecate](#global-deprecate)
- **Type**: `Map`
- **Used by**:
  - [deprecate [mixin]](#deprecate-mixin)

### ❌deprecations--message [variable]

This message will be prepended to any deprecation notice.

<details>
<summary>Source code</summary>

```scss
$deprecations--message: 'Deprecated code was found, this code will be removed before the next release of Carbon.';
```

</details>

- **Group**: [global-deprecate](#global-deprecate)
- **Type**: `String`

## global-font-face

### ✅⚠️helvetica-font-face [mixin]

Helvetica Neue font face declarations

<details>
<summary>Source code</summary>

```scss
@mixin helvetica-font-face() {
  // Default font directory, `!default` flag allows user override.
  // (font files are configured to be served as static assets from server.js)
  @include deprecate(
    'Usage of Helvetica font in `carbon-components` has been deprecated.'
  ) {
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
        src: url('#{$font-path}/helvetica-neue-light-italic.woff2') format('woff2'),
          url('#{$font-path}/helvetica-neue-light-italic.woff') format('woff');
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
        src: url('#{$font-path}/helvetica-neue-roman-italic.woff2') format('woff2'),
          url('#{$font-path}/helvetica-neue-roman-italic.woff') format('woff');
      }

      @font-face {
        font-family: 'IBM Helvetica';
        font-style: normal;
        font-weight: 700;
        src: url('#{$font-path}/helvetica-neue-bold.woff2') format('woff2'), url('#{$font-path}/helvetica-neue-bold.woff')
            format('woff');
      }

      @font-face {
        font-family: 'IBM Helvetica';
        font-style: italic;
        font-weight: 700;
        src: url('#{$font-path}/helvetica-neue-bold-italic.woff2') format('woff2'),
          url('#{$font-path}/helvetica-neue-bold-italic.woff') format('woff');
      }
    }
  }
}
```

</details>

- **Group**: [global-font-face](#global-font-face)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
- **Deprecated**: (For v10) Use `@include carbon--font-face-sans()`, `@include carbon--font-face-mono()`, etc.

### ❌⚠️unicodes [variable]

<details>
<summary>Source code</summary>

```scss
$unicodes: (
  Pi:
    'U+03C0, U+0E3F, U+2070, U+2074-2079, U+2080-2089, U+2113, U+2116, U+2126, U+212E, U+2150-2151, U+2153-215E, U+2190-2199, U+21A9-21AA, U+21B0-21B3, U+21B6-21B7, U+21BA-21BB, U+21C4, U+21C6, U+2202, U+2206, U+220F, U+2211, U+221A, U+221E, U+222B, U+2248, U+2260, U+2264-2265, U+25CA, U+2713, U+274C, U+2B0E-2B11, U+EBE1, U+EBE3-EBE4, U+EBE6-EBE7, U+ECE0, U+EFCC',
  Latin3: 'U+0102-0103, U+1EA0-1EF9, U+20AB',
  Latin2:
    'U+0100-024F, U+0259, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF, U+FB01-FB02',
  Latin1:
    'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2212, U+FB01-FB02',
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

- **Group**: [global-font-face](#global-font-face)
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

- **Group**: [global-font-face](#global-font-face)
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

- **Group**: [global-font-face](#global-font-face)
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

- **Group**: [global-font-face](#global-font-face)
- **Type**: `Map`
- **Used by**:
  - [plex-font-face [mixin]](#plex-font-face-mixin)
- **Deprecated**: (For v10) Superseded by `@include carbon--font-face-sans()`, `@include carbon--font-face-mono()`, etc.

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

- **Group**: [global-font-face](#global-font-face)
- **Deprecated**: (For v10) Superseded by `@include carbon--font-face-sans()`, `@include carbon--font-face-mono()`, etc.

### ✅⚠️plex-font-face [mixin]

Plex font face declarations

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
              src: url('#{$font-path}/IBMPlex#{$family}-#{$weight}-#{$unicode}.woff2')
                format('woff2');
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

- **Group**: [global-font-face](#global-font-face)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [carbon--font-face-mono [mixin]](#carbon--font-face-mono-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [families [variable]](#families-variable)
  - [weights [variable]](#weights-variable)
  - [unicodes [variable]](#unicodes-variable)
- **Deprecated**: (For v10) Use `@include carbon--font-face-sans()`, `@include carbon--font-face-mono()`, etc.

## global-helpers

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

- **Group**: [global-helpers](#global-helpers)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [prefix [variable]](#prefix-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-02 [variable]](#ui-02-variable)

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

| Name     | Description                                           | Type     | Default value |
| -------- | ----------------------------------------------------- | -------- | ------------- |
| `$width` | Value of width if you want to set width, else nothing | `Number` | `false`       |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include text-overflow(300px);
```

</details>

- **Group**: [global-helpers](#global-helpers)
- **Used by**:
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

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

- **Group**: [global-helpers](#global-helpers)
- **Requires**:
  - [text-03 [variable]](#text-03-variable)
- **Used by**:
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)

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
| `$size` | Size of box shadow | `String` | `'small'`     |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include box-shadow();
@include box-shadow('large');
```

</details>

- **Group**: [global-helpers](#global-helpers)
- **Requires**:
  - [box-shadow [variable]](#box-shadow-variable)
- **Used by**:
  - [listbox [mixin]](#listbox-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)

### ✅focus-outline [mixin]

Adds outline styles depending on specific type

<details>
<summary>Source code</summary>

```scss
@mixin focus-outline($type: 'border') {
  @if ($type == 'border') {
    outline: 1px
      solid
      if(not feature-flag-enabled('components-x'), $brand-01, $focus);
  }

  @if ($type == 'blurred') {
    box-shadow: 0 0 0 3px $focus;
    outline: 1px solid transparent;
  }

  @if ($type == 'outline') {
    outline: 2px
      solid
      if(not feature-flag-enabled('components-x'), $brand-01, $focus);
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

| Name    | Description                                                              | Type     | Default value |
| ------- | ------------------------------------------------------------------------ | -------- | ------------- |
| `$type` | Type of outline from: `border`, `blurred`, `outline`, `invalid`, `reset` | `String` | `'border'`    |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include focus-outline('outline');
```

</details>

- **Group**: [global-helpers](#global-helpers)
- **Requires**:
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [brand-01 [variable]](#brand-01-variable)
  - [focus [variable]](#focus-variable)
  - [support-01 [variable]](#support-01-variable)
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [data-table-sort--x [mixin]](#data-table-sort--x-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [form--x [mixin]](#form--x-mixin)
  - [link [mixin]](#link-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [modal [mixin]](#modal-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pagination--x [mixin]](#pagination--x-mixin)
  - [pagination-nav-base [mixin]](#pagination-nav-base-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [select [mixin]](#select-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [slider [mixin]](#slider-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
  - [structured-list--x [mixin]](#structured-list--x-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)
  - [tile [mixin]](#tile-mixin)
  - [tile--x [mixin]](#tile--x-mixin)
  - [time-picker--x [mixin]](#time-picker--x-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [toolbar [mixin]](#toolbar-mixin)
  - [tooltip [mixin]](#tooltip-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)

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

| Name      | Description                | Type     | Default value |
| --------- | -------------------------- | -------- | ------------- |
| `$deg`    | How many degrees to rotate | `Number` | —             |
| `$speed`  | Speed of rotation          | `Number` | —             |
| `$origin` | `transform-origin`         | `Value`  | `center`      |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include rotate(90deg, 300ms);
```

</details>

- **Group**: [global-helpers](#global-helpers)
- **Used by**:
  - [tabs--x [mixin]](#tabs--x-mixin)

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

- **Group**: [global-helpers](#global-helpers)
- **Used by**:
  - [checkbox [mixin]](#checkbox-mixin)
  - [checkbox--x [mixin]](#checkbox--x-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [pagination-nav-base [mixin]](#pagination-nav-base-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [radio-button--experimental [mixin]](#radio-button--experimental-mixin)
  - [search [mixin]](#search-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [tile [mixin]](#tile-mixin)
  - [tile--x [mixin]](#tile--x-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [toggle--x [mixin]](#toggle--x-mixin)

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
| `$width` | Sets width to 100% if true | `Bool` | `true`        |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include button-reset($width: false);
```

</details>

- **Group**: [global-helpers](#global-helpers)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [font-smoothing [mixin]](#font-smoothing-mixin)
  - [letter-spacing [mixin]](#letter-spacing-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-v2-expandable [mixin]](#data-table-v2-expandable-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [data-table-v2-sort [mixin]](#data-table-v2-sort-mixin)
  - [data-table-sort--x [mixin]](#data-table-sort--x-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [pagination-nav-base [mixin]](#pagination-nav-base-mixin)
  - [search [mixin]](#search-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [tooltip [mixin]](#tooltip-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)
  - [carbon-header [mixin]](#carbon-header-mixin)
  - [carbon-navigation [mixin]](#carbon-navigation-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ✅skeleton [mixin]

Skeleton loading animation

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

- **Group**: [global-helpers](#global-helpers)
- **Requires**:
  - [skeleton [variable]](#skeleton-variable)
- **Used by**:
  - [breadcrumb [mixin]](#breadcrumb-mixin)
  - [breadcrumb--x [mixin]](#breadcrumb--x-mixin)
  - [button [mixin]](#button-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [form [mixin]](#form-mixin)
  - [form--x [mixin]](#form--x-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [radio-button--experimental [mixin]](#radio-button--experimental-mixin)
  - [search [mixin]](#search-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [select [mixin]](#select-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [slider [mixin]](#slider-mixin)
  - [slider--x [mixin]](#slider--x-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
  - [structured-list--x [mixin]](#structured-list--x-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [tags [mixin]](#tags-mixin)
  - [tags--x [mixin]](#tags--x-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [toggle [mixin]](#toggle-mixin)

### ✅⚠️light-ui [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin light-ui() {
  @include deprecate(
    '`@include light-ui` has been removed.',
    feature-flag-enabled('breaking-changes-x'),
    true
  ) {
    .#{$prefix}--global-light-ui & {
      @content;
    }
  }
}
```

</details>

- **Group**: [global-helpers](#global-helpers)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [prefix [variable]](#prefix-variable)
- **Deprecated**: A legacy class used for our older way of dark/light theme switch

## global-layer

### ❌box-shadow [variable]

Box shadow color

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

- **Group**: [global-layer](#global-layer)
- **Type**: `Value`
- **Used by**:
  - [box-shadow [mixin]](#box-shadow-mixin)

### ❌box-shadow--raised [variable]

Raised box shadow

<details>
<summary>Source code</summary>

```scss
$box-shadow--raised: 0 1px 2px 0 $box-shadow;
```

</details>

- **Group**: [global-layer](#global-layer)
- **Type**: `Value`

### ❌box-shadow--overlay [variable]

Overlay box shadow

<details>
<summary>Source code</summary>

```scss
$box-shadow--overlay: 0 4px 8px 0 $box-shadow;
```

</details>

- **Group**: [global-layer](#global-layer)
- **Type**: `Value`

### ❌box-shadow--sticky-nav [variable]

Sticky nav box shadow

<details>
<summary>Source code</summary>

```scss
$box-shadow--sticky-nav: 0 6px 12px 0 $box-shadow;
```

</details>

- **Group**: [global-layer](#global-layer)
- **Type**: `Value`

### ❌box-shadow--temporary-nav [variable]

Temporary nav box shadow

<details>
<summary>Source code</summary>

```scss
$box-shadow--temporary-nav: 0 8px 16px 0 $box-shadow;
```

</details>

- **Group**: [global-layer](#global-layer)
- **Type**: `Value`

### ❌box-shadow--pop-out [variable]

Pop out box shadow

<details>
<summary>Source code</summary>

```scss
$box-shadow--pop-out: 0 12px 24px 0 $box-shadow;
```

</details>

- **Group**: [global-layer](#global-layer)
- **Type**: `Value`

### ❌layer-shadows [variable]

Map of box shadows used in the `layer()` mixin

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

- **Group**: [global-layer](#global-layer)
- **Type**: `Map`
- **Used by**:
  - [layer [mixin]](#layer-mixin)

### ✅layer [mixin]

Layer mixin to set `box-shadow`

<details>
<summary>Source code</summary>

```scss
@mixin layer($layer) {
  @if global-variable-exists('css--use-layer') ==
    false or
    $css--use-layer ==
    true
  {
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

| Name     | Description                           | Type     | Default value |
| -------- | ------------------------------------- | -------- | ------------- |
| `$layer` | A value from the `$layer-shadows` map | `String` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
- @include layer('raised');
```

</details>

- **Group**: [global-layer](#global-layer)
- **Requires**:
  - [css--use-layer [variable]](#css--use-layer-variable)
  - [layer-shadows [variable]](#layer-shadows-variable)
- **Used by**:
  - [date-picker [mixin]](#date-picker-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [modal [mixin]](#modal-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [tile [mixin]](#tile-mixin)
  - [tooltip [mixin]](#tooltip-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)

## global-layout

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

- **Group**: [global-layout](#global-layout)
- **Type**: `Map`
- **Used by**:
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
  - [breakpoint [mixin]](#breakpoint-mixin)
  - [max-breakpoint [mixin]](#max-breakpoint-mixin)
- **Deprecated**: (For v10) Superseded by `$carbon--grid-breakpoints`

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

- **Group**: [global-layout](#global-layout)
- **Type**: `Map`
- **Used by**:
  - [padding [function]](#padding-function)
  - [padding-td--condensed [mixin]](#padding-td--condensed-mixin)
  - [padding--data-structured-list [mixin]](#padding--data-structured-list-mixin)
  - [padding-td [mixin]](#padding-td-mixin)
  - [padding-th [mixin]](#padding-th-mixin)
  - [padding-td--condensed--x [mixin]](#padding-td--condensed--x-mixin)
  - [padding--data-structured-list--x [mixin]](#padding--data-structured-list--x-mixin)
- **Deprecated**: (For v10) Was used primary for older grid

### ✅⚠️padding [function]

<details>
<summary>Source code</summary>

```scss
@function padding($value) {
  @if feature-flag-enabled('breaking-changes-x') {
    @warn ('`@function padding()` has been removed.');
  } @else {
    @if map-has-key($padding, $value) {
      @return map-get($padding, $value);
    } @else {
      @warn 'padding: could not find #{$value} in $padding map. Please make sure it is defined';
    }
  }
}
```

</details>

- **Parameters**:

| Name     | Description      | Type     | Default value |
| -------- | ---------------- | -------- | ------------- |
| `$value` | `mobile` or `xs` | `String` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
.container {
  padding: padding(mobile);
}
```

</details>

- **Group**: [global-layout](#global-layout)
- **Requires**:
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [padding [variable]](#padding-variable)
- **Used by**:
  - [grid-container [mixin]](#grid-container-mixin)
- **Deprecated**: (For v10) Was used primary for older grid

### ✅⚠️breakpoint [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin breakpoint($size) {
  @include deprecate(
    '`@include breakpoint()` has been removed. ' +
      'Use `@include carbon--breakpoint()` instead.',
    feature-flag-enabled('breaking-changes-x'),
    true
  ) {
    @if map-has-key($breakpoints, $size) {
      @media screen and (min-width: map-get($breakpoints, $size)) {
        @content;
      }
    } @else {
      @media (min-width: $size) {
        @content;
      }
    }
  }
}
```

</details>

- **Parameters**:

| Name    | Description             | Type     | Default value |
| ------- | ----------------------- | -------- | ------------- |
| `$size` | From `$breakpoints` map | `String` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include breakpoint(bp--md--major) { ... };
```

</details>

- **Group**: [global-layout](#global-layout)
- **Content**: Will add media query for styles using breakpoint as min-width
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [breakpoints [variable]](#breakpoints-variable)
- **Used by**:
  - [breadcrumb [mixin]](#breadcrumb-mixin)
  - [breadcrumb--x [mixin]](#breadcrumb--x-mixin)
  - [grid-container [mixin]](#grid-container-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [tabs [mixin]](#tabs-mixin)
- **Deprecated**: (For v10) Use `@include carbon--breakpoint()`

### ✅⚠️max-breakpoint [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin max-breakpoint($size) {
  @include deprecate(
    '`@include max-breakpoint()` has been removed. ' +
      'Use `@include carbon--breakpoint-down()` instead.',
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

| Name    | Description             | Type     | Default value |
| ------- | ----------------------- | -------- | ------------- |
| `$size` | From `$breakpoints` map | `String` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include max-breakpoint('bp--xs--major') { ... };
```

</details>

- **Group**: [global-layout](#global-layout)
- **Content**: Will add media query for styles using breakpoint as max-width
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
    '`@include grid-container` has been removed. ' +
      'Use `@include carbon--make-container()` instead.',
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

- **Group**: [global-layout](#global-layout)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [breakpoint [mixin]](#breakpoint-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [padding [function]](#padding-function)
- **Deprecated**: (For v10) Use `@include carbon--make-container()`

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

- **Group**: [global-layout](#global-layout)
- **Type**: `Map`
- **Used by**:
  - [z [function]](#z-function)

### ✅z [function]

<details>
<summary>Source code</summary>

```scss
@function z($layer) {
  @if not map-has-key($z-indexes, $layer) {
    @warn 'No layer found for `#{$layer}` in $z-indexes map. Property omitted.';
  }

  @return map-get($z-indexes, $layer);
}
```

</details>

- **Parameters**:

| Name     | Description                 | Type     | Default value |
| -------- | --------------------------- | -------- | ------------- |
| `$layer` | Value from `$z-indexes` map | `String` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
.modal {
  z-index: z('modal');
}
```

</details>

- **Group**: [global-layout](#global-layout)
- **Requires**:
  - [z-indexes [variable]](#z-indexes-variable)
- **Used by**:
  - [snippet [mixin]](#snippet-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [loading [mixin]](#loading-mixin)
  - [loading--x [mixin]](#loading--x-mixin)
  - [modal [mixin]](#modal-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [tooltip [mixin]](#tooltip-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)
  - [carbon-header [mixin]](#carbon-header-mixin)
  - [carbon-navigation [mixin]](#carbon-navigation-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

## global-motion

### ✅carbon--ease-in [variable]

Used primarily for removing elements from the screen

<details>
<summary>Source code</summary>

```scss
$carbon--ease-in: cubic-bezier(0.25, 0, 1, 1);
```

</details>

- **Group**: [global-motion](#global-motion)
- **Type**: `Function`
- **Aliased**:
  - `bx--ease-in`
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ✅carbon--ease-out [variable]

Used for adding elements to the screen or changing on-screen states at a users's input

<details>
<summary>Source code</summary>

```scss
$carbon--ease-out: cubic-bezier(0, 0, 0.25, 1);
```

</details>

- **Group**: [global-motion](#global-motion)
- **Type**: `Function`
- **Aliased**:
  - `bx--ease-out`
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [animation\_\_loading--stop [mixin]](#animation__loading--stop-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ✅carbon--standard-easing [variable]

Used for the majority of animations

<details>
<summary>Source code</summary>

```scss
$carbon--standard-easing: cubic-bezier(0.5, 0, 0.1, 1);
```

</details>

- **Group**: [global-motion](#global-motion)
- **Type**: `Function`
- **Aliased**:
  - `bx--standard-easing`
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-v2-expandable [mixin]](#data-table-v2-expandable-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [data-table-v2-sort [mixin]](#data-table-v2-sort-mixin)
  - [data-table-sort--x [mixin]](#data-table-sort--x-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [loading [mixin]](#loading-mixin)
  - [animation\_\_loading--spin [mixin]](#animation__loading--spin-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [slider [mixin]](#slider-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
  - [tile [mixin]](#tile-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [toolbar [mixin]](#toolbar-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ✅transition--base [variable]

Base transition duration

<details>
<summary>Source code</summary>

```scss
$transition--base: 250ms;
```

</details>

- **Group**: [global-motion](#global-motion)
- **Type**: `Number`
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [button-base [mixin]](#button-base-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-sort--x [mixin]](#data-table-sort--x-mixin)
  - [link [mixin]](#link-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [search [mixin]](#search-mixin)
  - [slider [mixin]](#slider-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
  - [tile [mixin]](#tile-mixin)
  - [toggle [mixin]](#toggle-mixin)

### ✅transition--expansion [variable]

Expansion duration

<details>
<summary>Source code</summary>

```scss
$transition--expansion: 300ms;
```

</details>

- **Group**: [global-motion](#global-motion)
- **Type**: `Number`
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ✅duration--fast-01 [variable]

Expansion duration

<details>
<summary>Source code</summary>

```scss
$duration--fast-01: 70ms;
```

</details>

- **Group**: [global-motion](#global-motion)
- **Type**: `Number`
- **Used by**:
  - [button-base--x [mixin]](#button-base--x-mixin)
  - [button-theme--x [mixin]](#button-theme--x-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [link--x [mixin]](#link--x-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [slider--x [mixin]](#slider--x-mixin)
  - [time-picker--x [mixin]](#time-picker--x-mixin)
  - [toggle--x [mixin]](#toggle--x-mixin)

### ✅duration--fast-02 [variable]

Expansion duration

<details>
<summary>Source code</summary>

```scss
$duration--fast-02: 110ms;
```

</details>

- **Group**: [global-motion](#global-motion)
- **Type**: `Number`
- **Used by**:
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [pagination--x [mixin]](#pagination--x-mixin)
  - [pseudo-underline [mixin]](#pseudo-underline-mixin)
  - [pagination-nav-base [mixin]](#pagination-nav-base-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [structured-list--x [mixin]](#structured-list--x-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)
  - [tile--x [mixin]](#tile--x-mixin)

### ✅duration--moderate-01 [variable]

Expansion duration

<details>
<summary>Source code</summary>

```scss
$duration--moderate-01: 150ms;
```

</details>

- **Group**: [global-motion](#global-motion)
- **Type**: `Number`
- **Used by**:
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [tile--x [mixin]](#tile--x-mixin)

### ✅duration--moderate-02 [variable]

Expansion duration

<details>
<summary>Source code</summary>

```scss
$duration--moderate-02: 240ms;
```

</details>

- **Group**: [global-motion](#global-motion)
- **Type**: `Number`

### ✅duration--slow-01 [variable]

Expansion duration

<details>
<summary>Source code</summary>

```scss
$duration--slow-01: 400ms;
```

</details>

- **Group**: [global-motion](#global-motion)
- **Type**: `Number`
- **Used by**:
  - [modal--x [mixin]](#modal--x-mixin)

### ✅duration--slow-02 [variable]

Expansion duration

<details>
<summary>Source code</summary>

```scss
$duration--slow-02: 720ms;
```

</details>

- **Group**: [global-motion](#global-motion)
- **Type**: `Number`
- **Used by**:
  - [loading--x [mixin]](#loading--x-mixin)

### ✅⚠️bx--ease-in [variable]

Default ease-in for components

<details>
<summary>Source code</summary>

```scss
$bx--ease-in: $carbon--ease-in;
```

</details>

- **Group**: [global-motion](#global-motion)
- **Type**: `Function`
- **Alias**: `carbon--ease-in`
- **Deprecated**: Updated to `$carbon--ease-in`

### ✅⚠️bx--ease-out [variable]

Default ease-out for components

<details>
<summary>Source code</summary>

```scss
$bx--ease-out: $carbon--ease-out;
```

</details>

- **Group**: [global-motion](#global-motion)
- **Type**: `Function`
- **Alias**: `carbon--ease-out`
- **Deprecated**: Updated to `$carbon--ease-out`

### ✅⚠️bx--standard-easing [variable]

Standard easing for components

<details>
<summary>Source code</summary>

```scss
$bx--standard-easing: $carbon--standard-easing;
```

</details>

- **Group**: [global-motion](#global-motion)
- **Type**: `Function`
- **Alias**: `carbon--standard-easing`
- **Deprecated**: Updated to `$carbon--standard-easing`

### ✅motion [function]

Get the transition-timing-function for a given easing and motion mode.
Easings that are currently supported include: `standard`, `entrance`, and `exit`.
We also offer two modes: `productive` and `expressive`.

<details>
<summary>Source code</summary>

```scss
@function motion($name, $mode: productive, $easings: $carbon--easings) {
  @return carbon--motion($name, $mode, $easings);
}
```

</details>

- **Parameters**:

| Name       | Description                           | Type     | Default value      |
| ---------- | ------------------------------------- | -------- | ------------------ |
| `$name`    | The name of the easing curve to apply | `String` | —                  |
| `$mode`    | The mode for the easing curve to use  | `String` | `productive`       |
| `$easings` | Map of component easings              | `Map`    | `$carbon--easings` |

- **Group**: [global-motion](#global-motion)
- **Returns**: `Function` A CSS cubic-bezier function
- **Requires**:
  - [carbon--motion [function]](#carbon--motion-function)
- **Used by**:
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [button-base--x [mixin]](#button-base--x-mixin)
  - [button-theme--x [mixin]](#button-theme--x-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [link--x [mixin]](#link--x-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [loading--x [mixin]](#loading--x-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [pagination--x [mixin]](#pagination--x-mixin)
  - [pseudo-underline [mixin]](#pseudo-underline-mixin)
  - [pagination-nav-base [mixin]](#pagination-nav-base-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [slider--x [mixin]](#slider--x-mixin)
  - [structured-list--x [mixin]](#structured-list--x-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [tile--x [mixin]](#tile--x-mixin)
  - [toggle--x [mixin]](#toggle--x-mixin)

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
| `$name` | The name of the easing curve to apply | `String` | —             |
| `$mode` | The mode for the easing curve to use  | `String` | —             |

- **Group**: [global-motion](#global-motion)
- **Requires**:
  - [carbon--motion [mixin]](#carbon--motion-mixin)

## global-reset

### ✅reset [mixin]

Resets default browser styling

<details>
<summary>Source code</summary>

```scss
@mixin reset() {
  @if global-variable-exists(css--reset) == false or $css--reset == false {
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

- **Group**: [global-reset](#global-reset)
- **Requires**:
  - [css--reset [variable]](#css--reset-variable)
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [button-base [mixin]](#button-base-mixin)
  - [button-base--x [mixin]](#button-base--x-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [checkbox--x [mixin]](#checkbox--x-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [form [mixin]](#form-mixin)
  - [form--x [mixin]](#form--x-mixin)
  - [css-body [mixin]](#css-body-mixin)
  - [css-body--x [mixin]](#css-body--x-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [typography [mixin]](#typography-mixin)
  - [link [mixin]](#link-mixin)
  - [link--x [mixin]](#link--x-mixin)
  - [lists [mixin]](#lists-mixin)
  - [lists--x [mixin]](#lists--x-mixin)
  - [loading [mixin]](#loading-mixin)
  - [loading--x [mixin]](#loading--x-mixin)
  - [modal [mixin]](#modal-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pagination--x [mixin]](#pagination--x-mixin)
  - [pagination-nav-base [mixin]](#pagination-nav-base-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [radio-button--experimental [mixin]](#radio-button--experimental-mixin)
  - [search [mixin]](#search-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [select [mixin]](#select-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
  - [structured-list--x [mixin]](#structured-list--x-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)
  - [time-picker [mixin]](#time-picker-mixin)
  - [time-picker--x [mixin]](#time-picker--x-mixin)
  - [tooltip [mixin]](#tooltip-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)

## global-spacing

### ✅spacing-baseline [variable]

1rem baseline spacing

<details>
<summary>Source code</summary>

```scss
$spacing-baseline: 1rem;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`

### ✅spacing-4xs [variable]

1px spacing in rem units

<details>
<summary>Source code</summary>

```scss
$spacing-4xs: $spacing-baseline * 0.0625;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`
- **Used by**:
  - [pagination--x [mixin]](#pagination--x-mixin)

### ✅spacing-3xs [variable]

2px spacing in rem units

<details>
<summary>Source code</summary>

```scss
$spacing-3xs: $spacing-baseline * 0.125;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [data-table-v2-core [mixin]](#data-table-v2-core-mixin)
  - [data-table-v2-expandable [mixin]](#data-table-v2-expandable-mixin)
  - [data-table-v2-sort [mixin]](#data-table-v2-sort-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tags [mixin]](#tags-mixin)

### ✅spacing-2xs [variable]

4px spacing in rem units

<details>
<summary>Source code</summary>

```scss
$spacing-2xs: $spacing-baseline * 0.25;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [theme [mixin]](#theme-mixin)
  - [lists [mixin]](#lists-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pagination-nav [mixin]](#pagination-nav-mixin)
  - [search [mixin]](#search-mixin)
  - [select [mixin]](#select-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [time-picker [mixin]](#time-picker-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

### ✅spacing-xs [variable]

8px spacing in rem units

<details>
<summary>Source code</summary>

```scss
$spacing-xs: $spacing-baseline * 0.5;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [button [mixin]](#button-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-v2-core [mixin]](#data-table-v2-core-mixin)
  - [data-table-v2-expandable [mixin]](#data-table-v2-expandable-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [form [mixin]](#form-mixin)
  - [theme [mixin]](#theme-mixin)
  - [lists [mixin]](#lists-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [modal [mixin]](#modal-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pagination-nav [mixin]](#pagination-nav-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [select [mixin]](#select-mixin)
  - [tags [mixin]](#tags-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

### ✅spacing-sm [variable]

12px spacing in rem units

<details>
<summary>Source code</summary>

```scss
$spacing-sm: $spacing-baseline * 0.75;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`
- **Used by**:
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-v2-core [mixin]](#data-table-v2-core-mixin)
  - [form [mixin]](#form-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

### ✅spacing-md [variable]

16px spacing in rem units

<details>
<summary>Source code</summary>

```scss
$spacing-md: $spacing-baseline;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [breadcrumb [mixin]](#breadcrumb-mixin)
  - [button [mixin]](#button-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [theme [mixin]](#theme-mixin)
  - [lists [mixin]](#lists-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pagination--x [mixin]](#pagination--x-mixin)
  - [pagination-nav [mixin]](#pagination-nav-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [select [mixin]](#select-mixin)
  - [slider [mixin]](#slider-mixin)
  - [padding-td [mixin]](#padding-td-mixin)
  - [padding-th [mixin]](#padding-th-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [tile [mixin]](#tile-mixin)
  - [time-picker [mixin]](#time-picker-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

### ✅spacing-lg [variable]

24px spacing in rem units

<details>
<summary>Source code</summary>

```scss
$spacing-lg: $spacing-baseline * 1.5;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-v2-core [mixin]](#data-table-v2-core-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [modal [mixin]](#modal-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pagination-nav [mixin]](#pagination-nav-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

### ✅spacing-xl [variable]

32px spacing in rem units

<details>
<summary>Source code</summary>

```scss
$spacing-xl: $spacing-baseline * 2;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`
- **Used by**:
  - [snippet [mixin]](#snippet-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [form [mixin]](#form-mixin)
  - [lists [mixin]](#lists-mixin)
  - [modal [mixin]](#modal-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [time-picker [mixin]](#time-picker-mixin)

### ✅spacing-2xl [variable]

40px spacing in rem units

<details>
<summary>Source code</summary>

```scss
$spacing-2xl: $spacing-baseline * 2.5;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`
- **Used by**:
  - [snippet [mixin]](#snippet-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [theme [mixin]](#theme-mixin)
  - [modal [mixin]](#modal-mixin)
  - [search [mixin]](#search-mixin)
  - [select [mixin]](#select-mixin)

### ✅spacing-3xl [variable]

48px spacing in rem units

<details>
<summary>Source code</summary>

```scss
$spacing-3xl: $spacing-baseline * 3;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`
- **Used by**:
  - [snippet [mixin]](#snippet-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [modal [mixin]](#modal-mixin)
  - [tile [mixin]](#tile-mixin)

### ✅layout-2xs [variable]

16px layout in rem units

<details>
<summary>Source code</summary>

```scss
$layout-2xs: $spacing-baseline;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`

### ✅layout-xs [variable]

24px layout in rem units

<details>
<summary>Source code</summary>

```scss
$layout-xs: $spacing-baseline * 1.5;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`

### ✅layout-sm [variable]

32px layout in rem units

<details>
<summary>Source code</summary>

```scss
$layout-sm: $spacing-baseline * 2;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`

### ✅layout-md [variable]

48px layout in rem units

<details>
<summary>Source code</summary>

```scss
$layout-md: $spacing-baseline * 3;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`

### ✅layout-lg [variable]

64px layout in rem units

<details>
<summary>Source code</summary>

```scss
$layout-lg: $spacing-baseline * 4;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`

### ✅layout-xl [variable]

96px layout in rem units

<details>
<summary>Source code</summary>

```scss
$layout-xl: $spacing-baseline * 6;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`

### ✅layout-2xl [variable]

160px layout in rem units

<details>
<summary>Source code</summary>

```scss
$layout-2xl: $spacing-baseline * 10;
```

</details>

- **Group**: [global-spacing](#global-spacing)
- **Type**: `Number`

## global-themes

### ❌carbon--theme--v9 [variable]

v9 theme tokens

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

- **Group**: [global-themes](#global-themes)
- **Type**: `Map`

### ❌theme [mixin]

v9 theme mixin

<details>
<summary>Source code</summary>

```scss
@mixin theme() {
  // Nav
  $nav-01: $color__navy-gray-1 !default !global;
  $nav-02: $color__blue-90 !default !global;
  $nav-03: $color__purple-30 !default !global;
  $nav-04: $color__purple-60 !default !global;
  $nav-05: $color__teal-40 !default !global;
  $nav-06: $color__teal-50 !default !global;
  $nav-07: $color__blue-30 !default !global;
  $nav-08: $color__blue-51 !default !global;

  // Global
  $input-border: 1px solid transparent !default !global;
  $input-label-weight: 600 !default !global;
  $focus: $color__blue-20 !default !global;

  // Button Theme Variables
  $button-font-weight: 600 !default !global;
  $button-font-size: 0.875rem !default !global;
  $button-border-radius: 0 !default !global;
  $button-height: 40px !default !global;
  $button-padding: 0 $spacing-md !default !global;
  $button-padding-sm: 0 $spacing-xs !default !global;
  $button-border-width: 2px !default !global;
  $button-outline-width: 1px !default !global;

  // Accordion (Reverse)
  $accordion-flex-direction: row !default !global;
  $accordion-justify-content: flex-start !default !global;
  $accordion-arrow-margin: 0 0 0 $spacing-2xs !default !global;
  $accordion-title-margin: 0 0 0 $spacing-md !default !global;
  $accordion-content-padding: 0 $spacing-md 0 $spacing-2xl !default !global;

  // Card
  $card-text-align: center !default !global;
  $card-flex-align: center !default !global;

  // Checkbox
  $checkbox-border-width: 2px !default !global;

  // Code Snippet
  $snippet-background-color: $ui-01 !default !global;
  $snippet-border-color: $ui-03 !default !global;

  // Content Switcher
  $content-switcher-border-radius: 8px !default !global;
  $content-switcher-option-border: 1px solid $brand-01 !default !global;

  // Data Table
  $data-table-heading-transform: uppercase !default !global;
  $data-table-heading-border-bottom: 1px solid $brand-01 !default !global;
  $data-table-row-height: 2rem !default !global;

  // Modal
  $modal-border-top: $brand-01 4px solid !default !global;
  $modal-footer-background-color: $ui-02 !default !global;

  // Progress Indicator
  $progress-indicator-bar-width: 1px inset transparent !default !global;
  $progress-indicator-stroke-width: 5 !default !global;
  $progress-indicator-line-offset: 0.625rem !default !global;

  // Radio Button
  $radio-border-width: 2px !default !global;

  // Structured Theme Variables
  $structured-list-padding: 2rem !default !global;
  $structured-list-text-transform: none !default !global;

  // Skeleton Loading
  $skeleton: rgba($color__blue-51, 0.1) !default !global; //old $field-01
}
```

</details>

- **Group**: [global-themes](#global-themes)
- **Requires**:
  - [nav-01 [variable]](#nav-01-variable)
  - [color\_\_navy-gray-1 [variable]](#color__navy-gray-1-variable)
  - [nav-02 [variable]](#nav-02-variable)
  - [color\_\_blue-90 [variable]](#color__blue-90-variable)
  - [nav-03 [variable]](#nav-03-variable)
  - [color\_\_purple-30 [variable]](#color__purple-30-variable)
  - [nav-04 [variable]](#nav-04-variable)
  - [color\_\_purple-60 [variable]](#color__purple-60-variable)
  - [nav-05 [variable]](#nav-05-variable)
  - [color\_\_teal-40 [variable]](#color__teal-40-variable)
  - [nav-06 [variable]](#nav-06-variable)
  - [color\_\_teal-50 [variable]](#color__teal-50-variable)
  - [nav-07 [variable]](#nav-07-variable)
  - [color\_\_blue-30 [variable]](#color__blue-30-variable)
  - [nav-08 [variable]](#nav-08-variable)
  - [color\_\_blue-51 [variable]](#color__blue-51-variable)
  - [input-border [variable]](#input-border-variable)
  - [input-label-weight [variable]](#input-label-weight-variable)
  - [focus [variable]](#focus-variable)
  - [color\_\_blue-20 [variable]](#color__blue-20-variable)
  - [button-font-weight [variable]](#button-font-weight-variable)
  - [button-font-size [variable]](#button-font-size-variable)
  - [button-border-radius [variable]](#button-border-radius-variable)
  - [button-height [variable]](#button-height-variable)
  - [button-padding [variable]](#button-padding-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [button-padding-sm [variable]](#button-padding-sm-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [button-border-width [variable]](#button-border-width-variable)
  - [button-outline-width [variable]](#button-outline-width-variable)
  - [accordion-flex-direction [variable]](#accordion-flex-direction-variable)
  - [accordion-justify-content [variable]](#accordion-justify-content-variable)
  - [accordion-arrow-margin [variable]](#accordion-arrow-margin-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [accordion-title-margin [variable]](#accordion-title-margin-variable)
  - [accordion-content-padding [variable]](#accordion-content-padding-variable)
  - [spacing-2xl [variable]](#spacing-2xl-variable)
  - [checkbox-border-width [variable]](#checkbox-border-width-variable)
  - [snippet-background-color [variable]](#snippet-background-color-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [snippet-border-color [variable]](#snippet-border-color-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [content-switcher-border-radius [variable]](#content-switcher-border-radius-variable)
  - [content-switcher-option-border [variable]](#content-switcher-option-border-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [data-table-heading-transform [variable]](#data-table-heading-transform-variable)
  - [data-table-heading-border-bottom [variable]](#data-table-heading-border-bottom-variable)
  - [data-table-row-height [variable]](#data-table-row-height-variable)
  - [modal-border-top [variable]](#modal-border-top-variable)
  - [modal-footer-background-color [variable]](#modal-footer-background-color-variable)
  - [ui-02 [variable]](#ui-02-variable)
  - [progress-indicator-bar-width [variable]](#progress-indicator-bar-width-variable)
  - [progress-indicator-stroke-width [variable]](#progress-indicator-stroke-width-variable)
  - [progress-indicator-line-offset [variable]](#progress-indicator-line-offset-variable)
  - [radio-border-width [variable]](#radio-border-width-variable)
  - [structured-list-padding [variable]](#structured-list-padding-variable)
  - [structured-list-text-transform [variable]](#structured-list-text-transform-variable)
  - [skeleton [variable]](#skeleton-variable)
  - [field-01 [variable]](#field-01-variable)

### ❌theme--experimental [mixin]

v10 theme mixin

<details>
<summary>Source code</summary>

```scss
@mixin theme--experimental() {
  // Global

  /// @type Value
  /// @access public
  /// @group global
  $input-border: 1px solid transparent !default !global;

  /// @type Number
  /// @access public
  /// @group global
  $input-label-weight: 400 !default !global;

  /// @type Color
  /// @access public
  /// @group global
  $disabled: $disabled-02 !default !global;

  /// @type Color
  /// @access public
  /// @group global
  $disabled-background-color: $disabled-01 !default !global;

  /// @type Color
  /// @access public
  /// @group global
  $focus: $ibm-color__blue-60 !default !global;

  // Link

  /// @type Color
  /// @access public
  /// @group link
  $link-visited: $ibm-color__purple-60 !default !global;

  /// @type Color
  /// @access public
  /// @group link
  $link-inverse-color: #6ea6ff !default !global;

  // Tooltip

  /// @type Color
  /// @access public
  /// @group tooltip
  $tooltip-background-color: $inverse-02 !default !global;

  // Button

  /// @type Number
  /// @access public
  /// @group button
  $button-font-weight: 400 !default !global;

  /// @type Number
  /// @access public
  /// @group button
  $button-font-size: 0.875rem !default !global;

  /// @type Number
  /// @access public
  /// @group
  $button-border-radius: 0 !default !global;

  /// @type Number
  /// @access public
  /// @group
  $button-height: 48px !default !global;

  /// @type Value
  /// @access public
  /// @group button
  $button-padding: 0.875rem 63px 0.875rem 15px !default !global;

  /// @type Value
  /// @access public
  /// @group button
  $button-padding-sm: 0.375rem 63px 0.375rem 15px !default !global;

  /// @type Number
  /// @access public
  /// @group button
  $button-padding-lg: $carbon--spacing-04 !default !global;

  /// @type Number
  /// @access public
  /// @group button
  $button-border-width: 1px !default !global;

  /// @type Number
  /// @access public
  /// @group button
  $button-outline-width: 3px !default !global;

  /// @type Number
  /// @access public
  /// @group button
  $button-outline-offset: -5px !default !global;

  /// @type Value
  /// @access public
  /// @group button
  $button-outline: 1px solid $ibm-color__white-0 !default !global;

  // Accordion

  /// @type Value
  /// @access public
  /// @group accordion
  $accordion-flex-direction: row-reverse !default !global;

  /// @type Value
  /// @access public
  /// @group accordion
  $accordion-justify-content: flex-start !default !global;

  /// @type Value
  /// @access public
  /// @group accordion
  $accordion-arrow-margin: 0 $carbon--spacing-05 0 0 !default !global;

  /// @type Value
  /// @access public
  /// @group accordion
  $accordion-title-margin: 0 0 0 $carbon--spacing-05 !default !global;

  /// @type Value
  /// @access public
  /// @group accordion
  $accordion-content-padding: 0 0 0 $carbon--spacing-05 !default !global;

  // Checkbox

  /// @type Number
  /// @access public
  /// @group checkbox
  $checkbox-border-width: 2px !default !global;

  // Code Snippet

  /// @type Color
  /// @access public
  /// @group code-snippet
  $snippet-background-color: $ui-01 !default !global; // TODO: Define for experimental

  /// @type Color
  /// @access public
  /// @group code-snippet
  $snippet-border-color: $ui-03 !default !global; // TODO: Define for experimental

  // Content Switcher

  /// @type Number
  /// @access public
  /// @group content-switcher
  $content-switcher-border-radius: 0px !default !global;

  /// @type Number
  /// @access public
  /// @group content-switcher
  $content-switcher-option-border: 1px solid $brand-01 !default !global;

  /// @type Color
  /// @access public
  /// @group content-switcher
  $content-switcher-divider: $ui-03 !default !global;

  // Data Table

  /// @type Value
  /// @access public
  /// @group data-table
  $data-table-heading-transform: uppercase !default !global;

  /// @type Value
  /// @access public
  /// @group data-table
  $data-table-heading-border-bottom: 1px solid $brand-01 !default !global;

  /// @type Number
  /// @access public
  /// @group data-table
  $data-table-row-height: 2rem !default !global;

  /// @type Color
  /// @access public
  /// @group data-table
  $data-table-zebra-color: #fcfcfc !default !global;

  /// @type Color
  /// @access public
  /// @group data-table
  $data-table-column-hover: $hover-selected-ui !default !global;

  // Date Picker

  /// @type Color
  /// @access public
  /// @group data-table
  $date-picker-in-range-background-color: $ibm-color__blue-20 !default !global;

  // Modal

  /// @type Color
  /// @access public
  /// @group modal
  $modal-border-top: $brand-01 4px solid !default !global;

  /// @type Color
  /// @access public
  /// @group modal
  $modal-footer-background-color: $ui-03 !default !global;

  // Notification

  /// @type Color
  /// @access public
  /// @group notification
  $notification-info-background-color: $ibm-color__blue-10 !default !global;

  /// @type Color
  /// @access public
  /// @group notification
  $notification-error-background-color: $ibm-color__red-10 !default !global;

  /// @type Color
  /// @access public
  /// @group notification
  $notification-warning-background-color: rgba(#fdd13a, 0.15) !default !global;

  /// @type Color
  /// @access public
  /// @group notification
  $notification-success-background-color: $ibm-color__green-10 !default !global;

  // Progress Indicator

  /// @type Value
  /// @access public
  /// @group progress-indicator
  $progress-indicator-bar-width: 1px inset transparent !default !global;

  /// @type Number
  /// @access public
  /// @group progress-indicator
  $progress-indicator-stroke-width: 5 !default !global;

  /// @type Number
  /// @access public
  /// @group progress-indicator
  $progress-indicator-line-offset: 0.625rem !default !global;

  // Copy Button

  /// @type Color
  /// @access public
  /// @group copy-button
  $copy-active: $active-ui !default !global;

  /// @type Color
  /// @access public
  /// @group copy-button
  $copy-btn-feedback: $ibm-color__gray-80 !default !global;

  // Radio Button

  /// @type Number
  /// @access public
  /// @group radio-button
  $radio-border-width: 1px !default !global;

  // Structured List

  /// @type Number
  /// @access public
  /// @group structured-list
  $structured-list-padding: 2rem !default !global;

  /// @type Value
  /// @access public
  /// @group structured-list
  $structured-list-text-transform: none !default !global;

  // Tabs

  /// @type Value
  /// @access public
  /// @group tabs
  $tab-underline-color: 3px solid $ibm-color__gray-30 !default !global;

  /// @type Value
  /// @access public
  /// @group tabs
  $tab-underline-color-hover: 3px solid $ibm-color__gray-60 !default !global;

  /// @type Color
  /// @access public
  /// @group tabs
  $tab-text-disabled: $ibm-color__gray-30 !default !global;

  /// @type Value
  /// @access public
  /// @group tabs
  $tab-underline-disabled: 3px solid $ibm-color__gray-10 !default !global;

  // Skeleton Loading

  /// @type Color
  /// @access public
  /// @group skeleton
  $skeleton: rgba(
    $color__blue-51,
    0.1
  ) !default !global; //old $field-01 TODO: Define for experimental

  // ☠️ Deprecated

  /// @deprecated
  /// @type Color
  /// @access public
  /// @group global
  $hover-field: $hover-ui !default !global;

  /// @deprecated
  /// @type Color
  /// @access public
  /// @group global
  $active-01: $active-ui !default !global;

  /// @deprecated
  /// @type Color
  /// @access public
  /// @group global
  $nav-01: $color__navy-gray-1 !default !global;

  /// @deprecated
  /// @type Color
  /// @access public
  /// @group
  $nav-02: $color__blue-90 !default !global;

  /// @deprecated
  /// @type Color
  /// @access public
  /// @group global
  $nav-03: $color__purple-30 !default !global;

  /// @deprecated
  /// @type Color
  /// @access public
  /// @group global
  $nav-04: $color__purple-60 !default !global;

  /// @deprecated
  /// @type Color
  /// @access public
  /// @group global
  $nav-05: $color__teal-40 !default !global;

  /// @deprecated
  /// @type Color
  /// @access public
  /// @group global
  $nav-06: $color__teal-50 !default !global;

  /// @deprecated
  /// @type Color
  /// @access public
  /// @group global
  $nav-07: $color__blue-30 !default !global;

  /// @deprecated
  /// @type Color
  /// @access public
  /// @group global
  $nav-08: $color__blue-51 !default !global;
}
```

</details>

- **Group**: [global-themes](#global-themes)
- **Requires**:
  - [input-border [variable]](#input-border-variable)
  - [input-label-weight [variable]](#input-label-weight-variable)
  - [disabled [variable]](#disabled-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [disabled-background-color [variable]](#disabled-background-color-variable)
  - [disabled-01 [variable]](#disabled-01-variable)
  - [focus [variable]](#focus-variable)
  - [link-visited [variable]](#link-visited-variable)
  - [link-inverse-color [variable]](#link-inverse-color-variable)
  - [tooltip-background-color [variable]](#tooltip-background-color-variable)
  - [inverse-02 [variable]](#inverse-02-variable)
  - [button-font-weight [variable]](#button-font-weight-variable)
  - [button-font-size [variable]](#button-font-size-variable)
  - [button-border-radius [variable]](#button-border-radius-variable)
  - [button-height [variable]](#button-height-variable)
  - [button-padding [variable]](#button-padding-variable)
  - [button-padding-sm [variable]](#button-padding-sm-variable)
  - [button-padding-lg [variable]](#button-padding-lg-variable)
  - [carbon--spacing-04 [variable]](#carbon--spacing-04-variable)
  - [button-border-width [variable]](#button-border-width-variable)
  - [button-outline-width [variable]](#button-outline-width-variable)
  - [button-outline-offset [variable]](#button-outline-offset-variable)
  - [button-outline [variable]](#button-outline-variable)
  - [accordion-flex-direction [variable]](#accordion-flex-direction-variable)
  - [accordion-justify-content [variable]](#accordion-justify-content-variable)
  - [accordion-arrow-margin [variable]](#accordion-arrow-margin-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [accordion-title-margin [variable]](#accordion-title-margin-variable)
  - [accordion-content-padding [variable]](#accordion-content-padding-variable)
  - [checkbox-border-width [variable]](#checkbox-border-width-variable)
  - [snippet-background-color [variable]](#snippet-background-color-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [snippet-border-color [variable]](#snippet-border-color-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [content-switcher-border-radius [variable]](#content-switcher-border-radius-variable)
  - [content-switcher-option-border [variable]](#content-switcher-option-border-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [content-switcher-divider [variable]](#content-switcher-divider-variable)
  - [data-table-heading-transform [variable]](#data-table-heading-transform-variable)
  - [data-table-heading-border-bottom [variable]](#data-table-heading-border-bottom-variable)
  - [data-table-row-height [variable]](#data-table-row-height-variable)
  - [data-table-zebra-color [variable]](#data-table-zebra-color-variable)
  - [data-table-column-hover [variable]](#data-table-column-hover-variable)
  - [hover-selected-ui [variable]](#hover-selected-ui-variable)
  - [date-picker-in-range-background-color [variable]](#date-picker-in-range-background-color-variable)
  - [modal-border-top [variable]](#modal-border-top-variable)
  - [modal-footer-background-color [variable]](#modal-footer-background-color-variable)
  - [notification-info-background-color [variable]](#notification-info-background-color-variable)
  - [notification-error-background-color [variable]](#notification-error-background-color-variable)
  - [notification-warning-background-color [variable]](#notification-warning-background-color-variable)
  - [notification-success-background-color [variable]](#notification-success-background-color-variable)
  - [progress-indicator-bar-width [variable]](#progress-indicator-bar-width-variable)
  - [progress-indicator-stroke-width [variable]](#progress-indicator-stroke-width-variable)
  - [progress-indicator-line-offset [variable]](#progress-indicator-line-offset-variable)
  - [copy-active [variable]](#copy-active-variable)
  - [active-ui [variable]](#active-ui-variable)
  - [copy-btn-feedback [variable]](#copy-btn-feedback-variable)
  - [radio-border-width [variable]](#radio-border-width-variable)
  - [structured-list-padding [variable]](#structured-list-padding-variable)
  - [structured-list-text-transform [variable]](#structured-list-text-transform-variable)
  - [tab-underline-color [variable]](#tab-underline-color-variable)
  - [tab-underline-color-hover [variable]](#tab-underline-color-hover-variable)
  - [tab-text-disabled [variable]](#tab-text-disabled-variable)
  - [tab-underline-disabled [variable]](#tab-underline-disabled-variable)
  - [skeleton [variable]](#skeleton-variable)
  - [color\_\_blue-51 [variable]](#color__blue-51-variable)
  - [field-01 [variable]](#field-01-variable)
  - [hover-field [variable]](#hover-field-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [active-01 [variable]](#active-01-variable)
  - [nav-01 [variable]](#nav-01-variable)
  - [color\_\_navy-gray-1 [variable]](#color__navy-gray-1-variable)
  - [nav-02 [variable]](#nav-02-variable)
  - [color\_\_blue-90 [variable]](#color__blue-90-variable)
  - [nav-03 [variable]](#nav-03-variable)
  - [color\_\_purple-30 [variable]](#color__purple-30-variable)
  - [nav-04 [variable]](#nav-04-variable)
  - [color\_\_purple-60 [variable]](#color__purple-60-variable)
  - [nav-05 [variable]](#nav-05-variable)
  - [color\_\_teal-40 [variable]](#color__teal-40-variable)
  - [nav-06 [variable]](#nav-06-variable)
  - [color\_\_teal-50 [variable]](#color__teal-50-variable)
  - [nav-07 [variable]](#nav-07-variable)
  - [color\_\_blue-30 [variable]](#color__blue-30-variable)
  - [nav-08 [variable]](#nav-08-variable)

## global-typography

### ✅⚠️typography [mixin]

Includes type styles for different elements and classes

<details>
<summary>Source code</summary>

```scss
@mixin typography() {
  @include deprecate(
    '`@include typography` has been removed. ' +
      'Use `@include carbon--type-classes` instead.',
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

- **Group**: [global-typography](#global-typography)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [reset [mixin]](#reset-mixin)
  - [line-height [mixin]](#line-height-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [prefix [variable]](#prefix-variable)
  - [brand-01 [variable]](#brand-01-variable)
- **Deprecated**: (For v10) Use `@include carbon--type-classes`

### ✅⚠️font-family-mono [variable]

Mono font-family

<details>
<summary>Source code</summary>

```scss
$font-family-mono: 'ibm-plex-mono', 'Menlo', 'DejaVu Sans Mono',
  'Bitstream Vera Sans Mono', Courier, monospace;
```

</details>

- **Group**: [global-typography](#global-typography)
- **Used by**:
  - [snippet [mixin]](#snippet-mixin)
  - [bx--snippet [mixin]](#bx--snippet-mixin)
- **Deprecated**: (For v10) Use `$carbon--font-families`

### ✅⚠️font-family-sans-serif [variable]

Sans serif font-family

<details>
<summary>Source code</summary>

```scss
$font-family-sans-serif: 'ibm-plex-sans', Helvetica Neue, Arial, sans-serif;
```

</details>

- **Group**: [global-typography](#global-typography)
- **Used by**:
  - [font-family [mixin]](#font-family-mixin)
- **Deprecated**: (For v10) Use `$carbon--font-families`

### ✅⚠️font-family-serif [variable]

Plex font-family

<details>
<summary>Source code</summary>

```scss
$font-family-serif: 'ibm-plex-serif', 'Georgia', Times, serif;
```

</details>

- **Group**: [global-typography](#global-typography)
- **Deprecated**: (For v10) Use `$carbon--font-families`

### ✅⚠️font-family-helvetica [variable]

Plex font-family

<details>
<summary>Source code</summary>

```scss
$font-family-helvetica: 'IBM Helvetica', Helvetica Neue, HelveticaNeue, Helvetica,
  sans-serif;
```

</details>

- **Group**: [global-typography](#global-typography)
- **Used by**:
  - [helvetica [mixin]](#helvetica-mixin)
  - [font-family [mixin]](#font-family-mixin)
- **Deprecated**: (For v10) Use Plex fonts

### ✅⚠️base-font-size [variable]

16px font size

<details>
<summary>Source code</summary>

```scss
$base-font-size: 16px;
```

</details>

- **Group**: [global-typography](#global-typography)
- **Used by**:
  - [carbon--type-reset [mixin]](#carbon--type-reset-mixin)
  - [rem [function]](#rem-function)
  - [em [function]](#em-function)
- **Deprecated**: (For v10) Superseded by `$carbon--base-font-size`

### ✅⚠️typescale-map [variable]

Different type sizes in rem

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

- **Group**: [global-typography](#global-typography)
- **Type**: `Map`
- **Used by**:
  - [typescale [mixin]](#typescale-mixin)
- **Deprecated**: (For v10) Superseded by `$carbon--base-font-size`

### ✅⚠️typescale [mixin]

Type size in rem from typescale-map

<details>
<summary>Source code</summary>

```scss
@mixin typescale($size) {
  @include deprecate(
    '`@include typescale()` has been removed. ' +
      'Use `@include carbon--type-scale()` instead.',
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
| `$size` | Value of type size | `String` | —             |

- **Group**: [global-typography](#global-typography)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [carbon--type-scale [mixin]](#carbon--type-scale-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [typescale-map [variable]](#typescale-map-variable)
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [breadcrumb [mixin]](#breadcrumb-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [bx--snippet [mixin]](#bx--snippet-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-v2-core [mixin]](#data-table-v2-core-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [form [mixin]](#form-mixin)
  - [typography [mixin]](#typography-mixin)
  - [inline-loading [mixin]](#inline-loading-mixin)
  - [link [mixin]](#link-mixin)
  - [lists [mixin]](#lists-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [modal [mixin]](#modal-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pagination-nav-base [mixin]](#pagination-nav-base-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [search [mixin]](#search-mixin)
  - [select [mixin]](#select-mixin)
  - [slider [mixin]](#slider-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tags [mixin]](#tags-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [time-picker [mixin]](#time-picker-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [toolbar [mixin]](#toolbar-mixin)
  - [tooltip [mixin]](#tooltip-mixin)
- **Deprecated**: (For v10) Use `@include carbon--type-scale()`

### ✅⚠️helvetica [mixin]

Helvetica Neue font-family declaration

<details>
<summary>Source code</summary>

```scss
@mixin helvetica() {
  @include deprecate(
    '`@include helvetica` has been removed. ' +
      'Use `@include carbon--font-family()` instead.',
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
@include helvetica;
```

</details>

- **Group**: [global-typography](#global-typography)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [font-family-helvetica [variable]](#font-family-helvetica-variable)
- **Deprecated**: (For v10) Use Plex fonts

### ✅⚠️font-family [mixin]

Uses sans-serif font type if `$css--plex` is true, else uses Helvetica

<details>
<summary>Source code</summary>

```scss
@mixin font-family() {
  @include deprecate(
    '`@include font-family` has been removed. ' +
      'Use `@include carbon--font-family()` instead.',
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
@include font-family;
```

</details>

- **Group**: [global-typography](#global-typography)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [css--plex [variable]](#css--plex-variable)
  - [font-family-sans-serif [variable]](#font-family-sans-serif-variable)
  - [font-family-helvetica [variable]](#font-family-helvetica-variable)
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [breadcrumb [mixin]](#breadcrumb-mixin)
  - [button-base [mixin]](#button-base-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [form [mixin]](#form-mixin)
  - [css-body [mixin]](#css-body-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [link [mixin]](#link-mixin)
  - [lists [mixin]](#lists-mixin)
  - [modal [mixin]](#modal-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pagination-nav-base [mixin]](#pagination-nav-base-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [search [mixin]](#search-mixin)
  - [select [mixin]](#select-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tags [mixin]](#tags-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [time-picker [mixin]](#time-picker-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [toolbar [mixin]](#toolbar-mixin)
  - [tooltip [mixin]](#tooltip-mixin)
- **Deprecated**: (For v10) Use `@include carbon--font-family()`

### ✅⚠️line-height [mixin]

Line heights for headings body text

<details>
<summary>Source code</summary>

```scss
@mixin line-height($el) {
  @include deprecate(
    '`@include line-height()` has been removed. ' +
      'Use `@include carbon--type-style()` instead.',
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

- **Group**: [global-typography](#global-typography)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [carbon--type-style [mixin]](#carbon--type-style-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [typography [mixin]](#typography-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
- **Deprecated**: (For v10) Use `@include carbon--type-style()`

### ✅⚠️font-smoothing [mixin]

Font smoothing declarations

<details>
<summary>Source code</summary>

```scss
@mixin font-smoothing() {
  @include deprecate(
    '`@include font-smoothing` has been removed.',
    feature-flag-enabled('breaking-changes-x'),
    true
  ) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

</details>

- **Group**: [global-typography](#global-typography)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
- **Used by**:
  - [button-base [mixin]](#button-base-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [link [mixin]](#link-mixin)
  - [lists [mixin]](#lists-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [pagination-nav-base [mixin]](#pagination-nav-base-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [tabs [mixin]](#tabs-mixin)
- **Deprecated**: (For v10) The new type styles doesn't use this

### ✅⚠️letter-spacing [mixin]

Letter spacing declaration

<details>
<summary>Source code</summary>

```scss
@mixin letter-spacing() {
  @include deprecate(
    '`@include letter-spacing` has been removed.',
    feature-flag-enabled('breaking-changes-x'),
    true
  ) {
    letter-spacing: 0;
  }
}
```

</details>

- **Group**: [global-typography](#global-typography)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
- **Used by**:
  - [button [mixin]](#button-mixin)
  - [button-base [mixin]](#button-base-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [modal [mixin]](#modal-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [toolbar [mixin]](#toolbar-mixin)
- **Deprecated**: (For v10) The new type styles doesn't use this

### ✅⚠️font-size-map [variable]

Mapped out pixel equivalent in rem

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

- **Group**: [global-typography](#global-typography)
- **Type**: `Map`
- **Used by**:
  - [font-size [mixin]](#font-size-mixin)
- **Deprecated**: (For v10) Superseded by `$carbon--type-scale`

### ✅⚠️font-size [mixin]

Font size in rem from `$font-size-map`

<details>
<summary>Source code</summary>

```scss
@mixin font-size($size) {
  @include deprecate(
    '`@include font-size()` has been removed. ' +
      'Use `@include carbon--type-scale()` instead.',
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

| Name    | Description                 | Type     | Default value |
| ------- | --------------------------- | -------- | ------------- |
| `$size` | Value from `$font-size-map` | `String` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include font-size('76');
```

</details>

- **Group**: [global-typography](#global-typography)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [carbon--type-scale [mixin]](#carbon--type-scale-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [font-size-map [variable]](#font-size-map-variable)
- **Deprecated**: (For v10) Use `@include carbon--type-scale()`

### ✅type-style [mixin]

Different type styles per token

<details>
<summary>Source code</summary>

```scss
@mixin type-style($name, $fluid: false) {
  @include carbon--type-style($name, $fluid);
}
```

</details>

- **Parameters**:

| Name     | Description                                 | Type     | Default value |
| -------- | ------------------------------------------- | -------- | ------------- |
| `$name`  | The name of the token to get the styles for | `String` | —             |
| `$fluid` | Specify whether to include fluid styles     | `Bool`   | `false`       |

**Example**:

<details>
<summary>Example code</summary>

```scss
@include type-style('body-short-01');
```

</details>

- **Group**: [global-typography](#global-typography)
- **Requires**:
  - [carbon--type-style [mixin]](#carbon--type-style-mixin)
- **Used by**:
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [breadcrumb--x [mixin]](#breadcrumb--x-mixin)
  - [button-base--x [mixin]](#button-base--x-mixin)
  - [checkbox--x [mixin]](#checkbox--x-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [bx--snippet--x [mixin]](#bx--snippet--x-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [form--x [mixin]](#form--x-mixin)
  - [css-body--x [mixin]](#css-body--x-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)
  - [inline-loading--x [mixin]](#inline-loading--x-mixin)
  - [link--x [mixin]](#link--x-mixin)
  - [lists--x [mixin]](#lists--x-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pagination--x [mixin]](#pagination--x-mixin)
  - [pagination-nav-base [mixin]](#pagination-nav-base-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [radio-button--experimental [mixin]](#radio-button--experimental-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [slider--x [mixin]](#slider--x-mixin)
  - [structured-list--x [mixin]](#structured-list--x-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [tags--x [mixin]](#tags--x-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)
  - [time-picker--x [mixin]](#time-picker--x-mixin)
  - [toggle--x [mixin]](#toggle--x-mixin)
  - [toolbar [mixin]](#toolbar-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)
  - [carbon-header [mixin]](#carbon-header-mixin)
  - [product-switcher [mixin]](#product-switcher-mixin)

## inline-loading

### ❌inline-loading [mixin]

v9 inline-loading

<details>
<summary>Source code</summary>

```scss
@mixin inline-loading() {
  .#{$prefix}--inline-loading {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .#{$prefix}--inline-loading__text {
    @include typescale('zeta');
  }

  .#{$prefix}--inline-loading__animation {
    position: relative;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .#{$prefix}--inline-loading__checkmark-container {
    width: 0.75rem;
    position: absolute;
    top: 0.75rem;

    &[hidden] {
      display: none;
    }
  }

  .#{$prefix}--inline-loading__checkmark {
    fill: none;
    stroke: $brand-01;
    transform-origin: 50% 50%;
    stroke-width: 2.1;
    stroke-dasharray: 12;
    stroke-dashoffset: 12;
    animation-name: stroke;
    animation-duration: 0.25s;
    animation-fill-mode: forwards;
  }

  .#{$prefix}--loading--small .#{$prefix}--inline-loading__svg {
    stroke: $brand-01;
  }
  /* If IE11 Don't show check animation */
  @media screen and (-ms-high-contrast: active),
    screen and (-ms-high-contrast: none) {
    .#{$prefix}--inline-loading__checkmark-container {
      top: 1px;
      right: 0.5rem;
    }

    .#{$prefix}--inline-loading__checkmark {
      animation: none;
      stroke-dashoffset: 0;
      stroke-dasharray: 0;
    }
  }
}
```

</details>

- **Group**: [inline-loading](#inline-loading)
- **Requires**:
  - [typescale [mixin]](#typescale-mixin)
  - [prefix [variable]](#prefix-variable)
  - [brand-01 [variable]](#brand-01-variable)

### ❌inline-loading--x [mixin]

v10 inline-loading

<details>
<summary>Source code</summary>

```scss
@mixin inline-loading--x() {
  .#{$prefix}--inline-loading {
    display: flex;
    width: 100%;
    align-items: center;

    .#{$prefix}--loading__svg circle {
      stroke-width: 12;
    }

    .#{$prefix}--loading__stroke {
      stroke-dashoffset: 99;
    }
  }

  .#{$prefix}--inline-loading__text {
    @include type-style('body-short-01');
    color: $text-02;
  }

  .#{$prefix}--inline-loading__animation {
    position: relative;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .#{$prefix}--inline-loading__checkmark-container {
    width: 0.75rem;
    position: absolute;
    top: 0.75rem;

    &[hidden] {
      display: none;
    }
  }

  .#{$prefix}--inline-loading__checkmark {
    fill: none;
    stroke: $interactive-01;
    transform-origin: 50% 50%;
    stroke-width: 1.8;
    stroke-dasharray: 12;
    stroke-dashoffset: 12;
    animation-name: stroke;
    animation-duration: 0.25s;
    animation-fill-mode: forwards;
  }

  .#{$prefix}--loading--small .#{$prefix}--inline-loading__svg {
    stroke: $interactive-01;
  }
  /* If IE11 Don't show check animation */
  @media screen and (-ms-high-contrast: active),
    screen and (-ms-high-contrast: none) {
    .#{$prefix}--inline-loading__checkmark-container {
      top: 1px;
      right: 0.5rem;
    }

    .#{$prefix}--inline-loading__checkmark {
      animation: none;
      stroke-dashoffset: 0;
      stroke-dasharray: 0;
    }
  }
}
```

</details>

- **Group**: [inline-loading](#inline-loading)
- **Requires**:
  - [type-style [mixin]](#type-style-mixin)
  - [prefix [variable]](#prefix-variable)
  - [text-02 [variable]](#text-02-variable)
  - [interactive-01 [variable]](#interactive-01-variable)

## link

### ❌link [mixin]

v9 link

<details>
<summary>Source code</summary>

```scss
@mixin link() {
  .#{$prefix}--link {
    @include reset;
    @include font-family;
    @include typescale('zeta');
    @include font-smoothing;
    font-weight: 600;
    color: $brand-01;
    text-decoration: underline;
    transition: $transition--base;

    &:visited {
      color: $brand-01;
    }

    &:active,
    &:hover,
    &:focus {
      color: $hover-primary-text;
    }

    &:focus {
      @include focus-outline('border');
    }

    &[aria-disabled='true'] {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
```

</details>

- **Group**: [link](#link)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [font-smoothing [mixin]](#font-smoothing-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [prefix [variable]](#prefix-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [transition--base [variable]](#transition--base-variable)
  - [hover-primary-text [variable]](#hover-primary-text-variable)

### ❌link--x [mixin]

v10 link

<details>
<summary>Source code</summary>

```scss
@mixin link--x() {
  .#{$prefix}--link {
    @include reset;
    @include type-style('body-long-01');
    color: $link-01;
    text-decoration: none;
    outline: none;
    transition: $duration--fast-01 motion(standard, productive);

    &:hover {
      color: $link-01;
      box-shadow: 0 1px currentColor;
    }

    &:active,
    &:active:visited {
      color: $text-01;
      box-shadow: 0 1px currentColor;
    }

    &:focus {
      box-shadow: 0 3px currentColor;
    }

    &:not([href]) {
      color: $disabled-02;
      cursor: not-allowed;
      pointer-events: none;
      touch-action: none;

      &:hover {
        box-shadow: none;
      }
    }

    &:visited {
      color: $link-01;
    }
  }

  .#{$prefix}--link--visited {
    color: $visited-link;
  }

  .#{$prefix}--link--disabled {
    @include reset;
    @include type-style('body-long-01');
    display: inline;
    color: $disabled-02;
    font-weight: 400;
    cursor: not-allowed;
  }
}
```

</details>

- **Group**: [link](#link)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [motion [function]](#motion-function)
  - [prefix [variable]](#prefix-variable)
  - [link-01 [variable]](#link-01-variable)
  - [duration--fast-01 [variable]](#duration--fast-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [visited-link [variable]](#visited-link-variable)

## list

### ❌lists [mixin]

v9 list

<details>
<summary>Source code</summary>

```scss
@mixin lists() {
  .#{$prefix}--list--nested,
  .#{$prefix}--list--unordered,
  .#{$prefix}--list--ordered {
    @include reset;
    @include font-family;
    @include typescale('zeta');
    @include font-smoothing;
    margin-left: $spacing-xl;
    line-height: 1.5;
  }

  .#{$prefix}--list--unordered,
  .#{$prefix}--list--ordered {
    padding: $spacing-md;
  }

  .#{$prefix}--list__item {
    font-weight: 600;
    padding-left: $spacing-2xs;
    color: $text-01;
  }

  .#{$prefix}--list--unordered > .#{$prefix}--list__item {
    list-style-type: disc;
  }

  .#{$prefix}--list--ordered > .#{$prefix}--list__item {
    list-style-type: decimal;
  }

  .#{$prefix}--list--nested {
    margin-left: $spacing-xs;
  }

  .#{$prefix}--list--nested > .#{$prefix}--list__item {
    list-style-type: none;
    font-weight: 400;
  }

  .#{$prefix}--list--nested > .#{$prefix}--list__item:before {
    content: '-';
    padding-right: $spacing-2xs;
  }
}
```

</details>

- **Group**: [list](#list)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [font-smoothing [mixin]](#font-smoothing-mixin)
  - [prefix [variable]](#prefix-variable)
  - [spacing-xl [variable]](#spacing-xl-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [text-01 [variable]](#text-01-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)

### ❌lists--x [mixin]

v10 list

<details>
<summary>Source code</summary>

```scss
@mixin lists--x() {
  .#{$prefix}--list--nested,
  .#{$prefix}--list--unordered,
  .#{$prefix}--list--ordered {
    @include reset;
    @include type-style('body-short-01');

    counter-reset: listitem;
  }

  .#{$prefix}--list__item {
    font-weight: 400;
    color: $text-01;
    list-style-type: none;
    counter-increment: listitem;
  }

  .#{$prefix}--list--nested {
    margin-bottom: rem(4px);
    margin-left: $carbon--spacing-07;
  }

  .#{$prefix}--list--unordered > .#{$prefix}--list__item:before,
  .#{$prefix}--list--ordered > .#{$prefix}--list__item:before {
    display: inline-block;
    margin-right: $carbon--spacing-03;
    margin-bottom: rem(4px);
  }

  .#{$prefix}--list--unordered
    .#{$prefix}--list--nested
    > .#{$prefix}--list__item:before,
  .#{$prefix}--list--ordered
    .#{$prefix}--list--nested
    > .#{$prefix}--list__item:before {
    margin-right: $carbon--spacing-03;
    display: inline-block;
  }

  .#{$prefix}--list--unordered > .#{$prefix}--list__item:before {
    content: '\002013';
  }

  .#{$prefix}--list--unordered
    .#{$prefix}--list--nested
    > .#{$prefix}--list__item:before {
    content: '\0025AA';
  }

  .#{$prefix}--list--ordered > .#{$prefix}--list__item:before {
    content: counter(listitem) '.';
  }

  .#{$prefix}--list--ordered
    .#{$prefix}--list--nested
    > .#{$prefix}--list__item {
    counter-increment: sub-list-item;
  }

  .#{$prefix}--list--ordered
    .#{$prefix}--list--nested
    > .#{$prefix}--list__item:before {
    content: counter(sub-list-item, lower-alpha) '.';
    width: 0.6rem;
  }
}
```

</details>

- **Group**: [list](#list)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [text-01 [variable]](#text-01-variable)
  - [carbon--spacing-07 [variable]](#carbon--spacing-07-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)

## list-box

### ✅list-box-width [variable]

<details>
<summary>Source code</summary>

```scss
$list-box-width: 100%;
```

</details>

- **Group**: [list-box](#list-box)
- **Type**: `Number`
- **Used by**:
  - [listbox [mixin]](#listbox-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)

### ✅list-box-height [variable]

<details>
<summary>Source code</summary>

```scss
$list-box-height: rem(40px);
```

</details>

- **Group**: [list-box](#list-box)
- **Type**: `Number`
- **Used by**:
  - [listbox [mixin]](#listbox-mixin)

### ✅list-box-inline-height [variable]

<details>
<summary>Source code</summary>

```scss
$list-box-inline-height: if(
  not feature-flag-enabled('components-x'),
  rem(32px),
  $list-box-height
);
```

</details>

- **Group**: [list-box](#list-box)
- **Type**: `Number`
- **Used by**:
  - [listbox [mixin]](#listbox-mixin)

### ✅list-box-menu-width [variable]

<details>
<summary>Source code</summary>

```scss
$list-box-menu-width: rem(300px);
```

</details>

- **Group**: [list-box](#list-box)
- **Type**: `Number`
- **Used by**:
  - [listbox [mixin]](#listbox-mixin)

### ❌listbox [mixin]

v9 list-box

<details>
<summary>Source code</summary>

```scss
@mixin listbox() {
  // The overall container element for a `list-box`. Has two variants,
  // `disabled` and `inline`.
  .#{$prefix}--list-box {
    position: relative;
    width: $list-box-width;
    height: $list-box-height;
    max-height: $list-box-height;
    background-color: $field-01;
    border: none;
    box-shadow: 0 1px 0 0 $ui-05;
    cursor: pointer;
    color: $text-01;
  }

  // invalid states
  .#{$prefix}--list-box[data-invalid],
  .#{$prefix}--list-box[data-invalid] .#{$prefix}--list-box__field:focus {
    box-shadow: 0 2px 0 0 $support-01;
  }

  .#{$prefix}--list-box[data-invalid]
    .#{$prefix}--list-box__field:focus
    .#{$prefix}--list-box__label {
    color: $support-01;
  }

  .#{$prefix}--list-box ~ .#{$prefix}--form-requirement {
    order: 3;
    color: $support-01;
    font-weight: 400;
    margin-top: $spacing-2xs;

    &::before {
      display: none;
    }
  }

  // Light variation for 'list-box'
  .#{$prefix}--list-box--light {
    background-color: $field-02;
  }

  // Disabled state for a `list-box`
  .#{$prefix}--list-box--disabled {
    opacity: 0.5;
  }

  .#{$prefix}--list-box--disabled,
  .#{$prefix}--list-box--disabled .#{$prefix}--list-box__field,
  .#{$prefix}--list-box--disabled .#{$prefix}--list-box__menu-icon {
    cursor: not-allowed;
  }

  .#{$prefix}--list-box--disabled .#{$prefix}--list-box__menu-item:hover,
  .#{$prefix}--list-box--disabled
    .#{$prefix}--list-box__menu-item--highlighted {
    background-color: transparent;
    text-decoration: none;
  }

  // Inline variant for a `list-box`
  .#{$prefix}--list-box.#{$prefix}--list-box--inline {
    background-color: inherit;
    width: auto;
    height: $list-box-inline-height;
    box-shadow: none;
  }

  .#{$prefix}--list-box--inline .#{$prefix}--list-box__label {
    color: $brand-01;
  }

  .#{$prefix}--list-box--inline .#{$prefix}--list-box__field {
    padding: 0 0 0 rem(10px);
  }

  .#{$prefix}--list-box--inline .#{$prefix}--list-box__menu-icon {
    position: static;
    padding: 0 $spacing-xs;
  }

  .#{$prefix}--list-box--inline > .#{$prefix}--list-box__menu {
    top: $list-box-inline-height;
    width: $list-box-menu-width;
  }

  .#{$prefix}--list-box--inline
    > .#{$prefix}--list-box__field[aria-expanded='true']
    ~ .#{$prefix}--list-box__menu {
    outline: 1px solid $brand-01;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  }

  .#{$prefix}--list-box--inline
    > .#{$prefix}--list-box__field[aria-expanded='true'],
  .#{$prefix}--list-box.#{$prefix}--list-box--inline
    > .#{$prefix}--list-box__field:focus {
    outline: none;
    box-shadow: none;
  }

  // The field we use for input, showing selection, etc.
  .#{$prefix}--list-box__field {
    @include button-reset;
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 100%;
    padding: 0 2rem 0 1rem;
    cursor: pointer;
  }

  .#{$prefix}--list-box__field:focus,
  .#{$prefix}--list-box__field[aria-expanded='true'] {
    outline: none;
    box-shadow: 0 2px 0 0 $brand-01;
  }

  .#{$prefix}--list-box__field[disabled] {
    outline: none;
    opacity: 0.5;
  }

  // Label for a `list-box__field`
  .#{$prefix}--list-box__label {
    @include typescale('zeta');

    color: $text-01;
    font-weight: 600;
    user-select: none;
  }

  // Menu status inside of a `list-box__field`
  .#{$prefix}--list-box__menu-icon {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    padding: 0 1rem;
    transition: transform 200ms $carbon--standard-easing;
    cursor: pointer;
  }

  .#{$prefix}--list-box__menu-icon > svg {
    fill: $brand-01;
    height: 100%;
  }

  .#{$prefix}--list-box__menu-icon--open {
    transform: rotate(180deg);
  }

  // Selection indicator for a `list-box__field`
  .#{$prefix}--list-box__selection {
    display: inline-block;
    position: absolute;
    top: 0;
    right: rem(26px);
    bottom: 0;
    height: rem(40px);
    padding: 0 1rem;
    cursor: pointer;
    user-select: none;
    transition: background-color 200ms $carbon--standard-easing;
  }

  .#{$prefix}--list-box__selection > svg {
    fill: $ui-05;
    height: 100%;
  }

  .#{$prefix}--list-box__selection:focus {
    outline: 1px solid $brand-01;
  }

  // Modifier for a selection to show that multiple selections have been made
  .#{$prefix}--list-box__selection--multi {
    @include typescale('omega');

    position: static;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background-color: $brand-01;
    height: rem(18px);
    color: white;
    line-height: 0;
    padding: rem(5px);
    margin-right: rem(10px);
    border-radius: rem(13px);
  }

  .#{$prefix}--list-box__selection--multi > svg {
    fill: white;
    width: 0.5rem;
    height: 0.5rem;
    margin-left: rem(5px);
  }

  .#{$prefix}--list-box__selection--multi:focus,
  .#{$prefix}--list-box__selection--multi:hover {
    background-color: $hover-primary;
    outline: none;
  }

  // Descendant of a `list-box` that displays a list of options to select
  .#{$prefix}--list-box__menu {
    @include box-shadow();

    position: absolute;
    left: 0;
    right: 0;
    top: $list-box-height;
    width: $list-box-width;
    background-color: $ui-01;
    max-height: rem(120px);
    overflow-y: auto;
    z-index: z('dropdown');
  }

  // Descendant of a `list-box__menu` that represents a selection for a control
  .#{$prefix}--list-box__menu-item {
    @include typescale('zeta');

    display: flex;
    align-items: center;
    height: rem(40px);
    padding: 0 1rem;
    cursor: pointer;
    user-select: none;
  }

  .#{$prefix}--list-box__menu-item:hover,
  .#{$prefix}--list-box__menu-item--highlighted {
    background-color: $hover-row;
    outline: 1px solid transparent;
    text-decoration: underline;
    color: $text-01;
  }

  .#{$prefix}--list-box__menu-item .#{$prefix}--checkbox-label {
    width: 100%;
  }

  .#{$prefix}--list-box__menu-item .#{$prefix}--checkbox-label-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  // Tweaks for descendants

  // In multi-select scenarios, we need to target checkbox inputs
  .#{$prefix}--list-box__menu-item
    > .#{$prefix}--form-item.#{$prefix}--checkbox-wrapper {
    margin: 0;
    width: 100%;
  }

  // When handling input, we need to target nodes that specifically opt-in to
  // the `combobox` role in order to make sure the text input is styled
  // correctly.
  .#{$prefix}--list-box input[role='combobox'] {
    background-color: inherit;
    font-weight: 600;
    outline-offset: 0;
    min-width: 0;
  }

  .#{$prefix}--list-box input[role='combobox']::placeholder {
    @include placeholder-colors;
    font-weight: 400;
  }

  .#{$prefix}--list-box--disabled input[role='combobox'] {
    opacity: 1;
  }
}
```

</details>

- **Group**: [list-box](#list-box)
- **Requires**:
  - [button-reset [mixin]](#button-reset-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [box-shadow [mixin]](#box-shadow-mixin)
  - [placeholder-colors [mixin]](#placeholder-colors-mixin)
  - [rem [function]](#rem-function)
  - [z [function]](#z-function)
  - [prefix [variable]](#prefix-variable)
  - [list-box-width [variable]](#list-box-width-variable)
  - [list-box-height [variable]](#list-box-height-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [text-01 [variable]](#text-01-variable)
  - [support-01 [variable]](#support-01-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [field-02 [variable]](#field-02-variable)
  - [list-box-inline-height [variable]](#list-box-inline-height-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [list-box-menu-width [variable]](#list-box-menu-width-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [hover-primary [variable]](#hover-primary-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [hover-row [variable]](#hover-row-variable)

### ❌listbox--x [mixin]

v10 list-box

<details>
<summary>Source code</summary>

```scss
@mixin listbox--x() {
  // The overall container element for a `list-box`. Has two variants,
  // `disabled` and `inline`.
  .#{$prefix}--list-box__wrapper--inline {
    display: inline-grid;
    align-items: center;
    grid-template: auto auto / auto auto;
    grid-gap: rem(4px);

    .#{$prefix}--label {
      @include type-style('body-short-01');
    }

    .#{$prefix}--label,
    .#{$prefix}--form__helper-text,
    .#{$prefix}--form-requirement {
      margin: 0;
    }

    .#{$prefix}--form__helper-text {
      max-width: none;
    }

    .#{$prefix}--form-requirement {
      grid-column: 2;
    }
  }

  .#{$prefix}--list-box {
    position: relative;
    width: $list-box-width;
    height: rem(40px);
    max-height: rem(40px);
    background-color: $field-01;
    border: none;
    border-bottom: 1px solid $ui-04;
    cursor: pointer;
    color: $text-01;
    transition: all $duration--fast-02 motion(standard, productive);

    &:hover {
      background-color: $hover-ui;
    }
  }

  .#{$prefix}--list-box--expanded {
    border-bottom-color: $ui-03;
  }

  .#{$prefix}--list-box--expanded:hover {
    background-color: $field-01;
  }

  .#{$prefix}--list-box--expanded:hover.#{$prefix}--list-box--light:hover {
    background-color: $field-02;
  }

  .#{$prefix}--list-box .#{$prefix}--text-input {
    height: 100%;
  }

  // invalid states
  .#{$prefix}--list-box__invalid-icon {
    position: absolute;
    top: $carbon--spacing-04;
    right: $carbon--spacing-08;
    fill: $support-01;
  }

  .#{$prefix}--list-box--inline .#{$prefix}--list-box__invalid-icon {
    top: $carbon--spacing-03;
  }

  .#{$prefix}--list-box[data-invalid] .#{$prefix}--list-box__field {
    border-bottom: 0;
    padding-right: carbon--mini-units(8);
  }

  .#{$prefix}--list-box[data-invalid].#{$prefix}--list-box--inline
    .#{$prefix}--list-box__field {
    padding-right: carbon--mini-units(7);
  }

  // Light variation for 'list-box'
  .#{$prefix}--list-box--light {
    background-color: $field-02;
  }

  .#{$prefix}--list-box--light.#{$prefix}--list-box--expanded {
    border-bottom-width: 0;
  }

  // Disabled state for `list-box`
  .#{$prefix}--list-box--disabled:hover {
    background-color: $field-01;
  }

  .#{$prefix}--list-box--light.#{$prefix}--list-box--disabled {
    background-color: $field-02;
  }

  .#{$prefix}--list-box--disabled,
  .#{$prefix}--list-box--disabled .#{$prefix}--list-box__field,
  .#{$prefix}--list-box--disabled .#{$prefix}--list-box__field:focus {
    border-bottom-width: 0;
    outline: none;
  }

  .#{$prefix}--list-box--disabled .#{$prefix}--list-box__label,
  .#{$prefix}--list-box--disabled.#{$prefix}--list-box--inline
    .#{$prefix}--list-box__label {
    color: $disabled-02;
  }

  .#{$prefix}--list-box--disabled .#{$prefix}--list-box__menu-icon > svg {
    fill: $disabled-02;
  }

  .#{$prefix}--list-box--disabled,
  .#{$prefix}--list-box--disabled .#{$prefix}--list-box__field,
  .#{$prefix}--list-box--disabled .#{$prefix}--list-box__menu-icon {
    cursor: not-allowed;
  }

  .#{$prefix}--list-box--disabled .#{$prefix}--list-box__menu-item,
  .#{$prefix}--list-box--disabled .#{$prefix}--list-box__menu-item:hover,
  .#{$prefix}--list-box--disabled
    .#{$prefix}--list-box__menu-item--highlighted {
    color: $disabled-02;
    text-decoration: none;
  }

  .#{$prefix}--list-box--disabled .#{$prefix}--list-box__selection:hover {
    cursor: not-allowed;
  }

  // disabled && invalid
  .#{$prefix}--list-box--disabled.#{$prefix}--list-box[data-invalid]
    .#{$prefix}--list-box__field {
    padding-right: $carbon--spacing-09;
  }

  .#{$prefix}--list-box--disabled.#{$prefix}--list-box[data-invalid].#{$prefix}--list-box--inline
    .#{$prefix}--list-box__field {
    padding-right: carbon--mini-units(4);
  }

  // Inline variant for a `list-box`
  .#{$prefix}--list-box.#{$prefix}--list-box--inline {
    background-color: $field-02;
    border-width: 0;

    &:hover {
      background-color: $hover-ui;
    }
  }

  .#{$prefix}--list-box.#{$prefix}--list-box--inline.#{$prefix}--list-box--expanded {
    border-bottom-width: 0;
  }

  .#{$prefix}--list-box.#{$prefix}--list-box--inline.#{$prefix}--list-box--expanded
    .#{$prefix}--list-box__field[aria-expanded='true'] {
    border-width: 0;
  }

  .#{$prefix}--list-box.#{$prefix}--list-box--inline.#{$prefix}--list-box--disabled:hover,
  .#{$prefix}--list-box.#{$prefix}--list-box--inline.#{$prefix}--list-box--expanded:hover {
    background-color: $field-02;
  }

  .#{$prefix}--list-box.#{$prefix}--list-box--inline,
  .#{$prefix}--list-box.#{$prefix}--list-box--inline
    .#{$prefix}--list-box__field {
    height: rem(32px);
  }

  .#{$prefix}--list-box.#{$prefix}--list-box--inline
    .#{$prefix}--list-box__field {
    padding: 0 carbon--mini-units(4) 0 $carbon--spacing-03;
  }

  .#{$prefix}--list-box.#{$prefix}--list-box--inline
    .#{$prefix}--list-box__menu-icon {
    right: $carbon--spacing-03;
  }

  .#{$prefix}--list-box.#{$prefix}--list-box--inline
    .#{$prefix}--list-box__invalid-icon {
    right: $carbon--spacing-07;
  }

  .#{$prefix}--list-box--inline .#{$prefix}--list-box__label {
    color: $text-01;
  }

  // The field we use for input, showing selection, etc.
  .#{$prefix}--list-box__field {
    @include button-reset;
    position: relative;
    display: inline-flex;
    align-items: center;
    vertical-align: top;
    height: rem(40px);
    padding: 0 $carbon--spacing-09 0 $carbon--spacing-05;
    cursor: pointer;
    outline: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .#{$prefix}--list-box__field:focus {
    @include focus-outline('outline');
  }

  .#{$prefix}--list-box__field[disabled] {
    outline: none;
    color: $disabled-02;
  }

  // populated input field
  .#{$prefix}--list-box__field .#{$prefix}--text-input[value] {
    padding-right: carbon--mini-units(9);
  }

  // invalid && populated input field
  .#{$prefix}--list-box[data-invalid]
    .#{$prefix}--list-box__field
    .#{$prefix}--text-input[value] {
    padding-right: rem(98px); // to account for clear input button outline
  }

  .#{$prefix}--list-box[data-invalid]
    .#{$prefix}--list-box__field
    .#{$prefix}--text-input[value]
    + .#{$prefix}--list-box__invalid-icon {
    right: rem(66px); // to account for clear input button outline
  }

  // empty input field
  .#{$prefix}--list-box__field .#{$prefix}--text-input[value=''] {
    padding-right: $carbon--spacing-09;
  }

  // invalid && empty input field
  .#{$prefix}--list-box[data-invalid]
    .#{$prefix}--list-box__field
    .#{$prefix}--text-input[value=''] {
    padding-right: carbon--mini-units(9);
  }

  .#{$prefix}--list-box[data-invalid]
    .#{$prefix}--list-box__field
    .#{$prefix}--text-input[value='']
    + .#{$prefix}--list-box__invalid-icon {
    right: rem(40px); // to account for clear input button outline
  }

  // Label for a `list-box__field`
  .#{$prefix}--list-box__label {
    @include type-style('body-short-01');
    color: $text-01;
    user-select: none;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  // Menu status inside of a `list-box__field`
  .#{$prefix}--list-box__menu-icon {
    position: absolute;
    right: $carbon--spacing-05;
    height: 100%;
    transition: transform $duration--fast-02 motion(standard, productive);
    cursor: pointer;
  }

  .#{$prefix}--list-box__menu-icon > svg {
    fill: $icon-01;
    height: 100%;
  }

  .#{$prefix}--list-box__menu-icon--open {
    transform: rotate(180deg);
  }

  // Selection indicator for a `list-box__field`
  .#{$prefix}--list-box__selection {
    position: absolute;
    right: rem(33px); // to preserve .5rem space between icons according to spec
    display: flex;
    justify-content: center;
    align-items: center;
    height: rem(30px);
    width: rem(30px);
    cursor: pointer;
    user-select: none;
    transition: background-color $duration--fast-02 motion(standard, productive);

    &:focus {
      @include focus-outline('outline');
    }
  }

  .#{$prefix}--list-box__selection > svg {
    fill: $icon-02;
  }

  .#{$prefix}--list-box--disabled .#{$prefix}--list-box__selection:focus {
    outline: none;
  }

  .#{$prefix}--list-box--disabled .#{$prefix}--list-box__selection > svg {
    fill: $disabled-02;
  }

  // Modifier for a selection to show that multiple selections have been made
  .#{$prefix}--list-box__selection--multi {
    @include type-style('label-01');
    position: static;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    background-color: $inverse-02;
    height: rem(24px);
    width: auto;
    color: $inverse-01;
    line-height: 0;
    padding: rem(8px);
    padding-right: rem(2px); // Align with hover circle of X button
    margin-right: rem(10px);
    border-radius: rem(12px);
  }

  .#{$prefix}--list-box__selection--multi > svg {
    fill: white;
    margin-left: rem(4px);
    width: rem(20px);
    height: rem(20px);
    padding: rem(2px);
  }

  .#{$prefix}--list-box__selection--multi > svg:hover {
    border-radius: 50%;
    background-color: $hover-secondary;
  }

  .#{$prefix}--list-box__selection--multi:focus,
  .#{$prefix}--list-box__selection--multi:hover {
    outline: none;
  }

  // Descendant of a `list-box` that displays a list of options to select
  .#{$prefix}--list-box__menu {
    @include box-shadow();
    position: absolute;
    left: 0;
    right: 0;
    width: $list-box-width;
    background-color: $ui-01;
    max-height: rem(140px);
    overflow-y: auto;
    z-index: z('dropdown');
  }

  // Descendant of a `list-box__menu` that represents a selection for a control
  .#{$prefix}--list-box__menu-item {
    @include type-style('body-short-01');
    height: rem(40px);
    color: $text-02;
    cursor: pointer;
    user-select: none;
    position: relative;

    &:hover {
      background-color: $hover-ui;

      + .#{$prefix}--list-box__menu-item
        .#{$prefix}--list-box__menu-item__option {
        border-color: transparent;
      }
    }

    &:active {
      background-color: $selected-ui;
    }
  }

  .#{$prefix}--list-box__menu-item:first-of-type
    .#{$prefix}--list-box__menu-item__option {
    border-top-color: transparent;
  }

  .#{$prefix}--list-box__menu-item:hover
    .#{$prefix}--list-box__menu-item__option {
    color: $text-01;
  }

  .#{$prefix}--list-box__menu-item__option {
    @include focus-outline('reset');
    display: block;
    height: rem(40px);
    color: $text-02;
    text-decoration: none;
    font-weight: normal;
    line-height: rem(16px);
    padding: rem(11px) 0;
    margin: 0 $carbon--spacing-05;
    border: 1px solid transparent;
    border-top-color: $ui-03;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    &:focus {
      @include focus-outline('outline');
      margin: 0;
      padding: rem(11px) rem(16px);
      border-color: transparent;
    }

    &:hover {
      color: $text-01;
      border-color: transparent;
    }
  }

  .#{$prefix}--list-box.#{$prefix}--list-box--inline
    .#{$prefix}--list-box__menu-item__option {
    margin: 0 $carbon--spacing-03;

    &:focus {
      margin: 0;
      padding-left: $carbon--spacing-03;
      padding-right: $carbon--spacing-03;
    }
  }

  .#{$prefix}--list-box__menu-item--highlighted {
    background-color: $hover-ui;
    color: $text-01;
    border-color: transparent;

    > .#{$prefix}--list-box__menu-item__option,
    + .#{$prefix}--list-box__menu-item
      .#{$prefix}--list-box__menu-item__option {
      border-color: transparent;
    }
  }

  .#{$prefix}--list-box__menu-item--highlighted
    .#{$prefix}--list-box__menu-item__option {
    color: $text-01;
  }

  .#{$prefix}--list-box__menu-item--active,
  .#{$prefix}--list-box__menu-item--active:hover {
    color: $text-01;
    background-color: $selected-ui;
    border-bottom-color: $selected-ui;
  }

  .#{$prefix}--list-box__menu-item .#{$prefix}--checkbox-label {
    width: 100%;
  }

  .#{$prefix}--list-box__menu-item .#{$prefix}--checkbox-label-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  // Tweaks for descendants
  // When handling input, we need to target nodes that specifically opt-in to
  // the `combobox` role in order to make sure the text input is styled
  // correctly.
  .#{$prefix}--list-box input[role='combobox'] {
    background-color: inherit;
    min-width: 0;
  }
}
```

</details>

- **Group**: [list-box](#list-box)
- **Requires**:
  - [type-style [mixin]](#type-style-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [box-shadow [mixin]](#box-shadow-mixin)
  - [rem [function]](#rem-function)
  - [motion [function]](#motion-function)
  - [carbon--mini-units [function]](#carbon--mini-units-function)
  - [z [function]](#z-function)
  - [prefix [variable]](#prefix-variable)
  - [list-box-width [variable]](#list-box-width-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [text-01 [variable]](#text-01-variable)
  - [duration--fast-02 [variable]](#duration--fast-02-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [field-02 [variable]](#field-02-variable)
  - [carbon--spacing-04 [variable]](#carbon--spacing-04-variable)
  - [carbon--spacing-08 [variable]](#carbon--spacing-08-variable)
  - [support-01 [variable]](#support-01-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [carbon--spacing-09 [variable]](#carbon--spacing-09-variable)
  - [carbon--spacing-07 [variable]](#carbon--spacing-07-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [icon-01 [variable]](#icon-01-variable)
  - [icon-02 [variable]](#icon-02-variable)
  - [inverse-02 [variable]](#inverse-02-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [hover-secondary [variable]](#hover-secondary-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [text-02 [variable]](#text-02-variable)
  - [selected-ui [variable]](#selected-ui-variable)

## loading

### ❌loading [mixin]

v9 loading

<details>
<summary>Source code</summary>

```scss
@mixin loading() {
  .#{$prefix}--loading {
    @include reset;
    @include animation__loading--spin;
    width: $loading__size;
    height: $loading__size;
  }

  // Animation (Spin by default)
  .#{$prefix}--loading__svg {
    fill: transparent;
    stroke: $brand-03;
    stroke-width: 7;
    stroke-linecap: butt;
    stroke-dasharray: 240;
    stroke-dashoffset: $loading__gap;
  }

  .#{$prefix}--loading--stop {
    @include animation__loading--stop;
  }

  .#{$prefix}--loading--small {
    width: 2rem;
    height: 2rem;

    .#{$prefix}--loading__svg {
      stroke: $ui-05;
    }
  }

  .#{$prefix}--loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba($ui-01, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 2000ms $carbon--standard-easing;
    z-index: z('overlay');
  }

  .#{$prefix}--loading-overlay--stop {
    display: none;
  }
}
```

</details>

- **Group**: [loading](#loading)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [animation\_\_loading--spin [mixin]](#animation__loading--spin-mixin)
  - [animation\_\_loading--stop [mixin]](#animation__loading--stop-mixin)
  - [z [function]](#z-function)
  - [prefix [variable]](#prefix-variable)
  - [loading\_\_size [variable]](#loading__size-variable)
  - [brand-03 [variable]](#brand-03-variable)
  - [loading\_\_gap [variable]](#loading__gap-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)

### ❌loading--x [mixin]

v10 loading

<details>
<summary>Source code</summary>

```scss
@mixin loading--x() {
  .#{$prefix}--loading {
    @include reset;
    @include animation__loading--spin;
    width: $loading__size;
    height: $loading__size;
  }

  // Animation (Spin by default)
  .#{$prefix}--loading__svg {
    fill: transparent;
  }

  .#{$prefix}--loading__svg circle {
    stroke-width: 8;
    stroke-linecap: butt;
    stroke-dasharray: 240;
  }

  .#{$prefix}--loading__stroke {
    stroke: $interactive-04;
    stroke-dashoffset: $loading__gap;
  }

  .#{$prefix}--loading--stop {
    @include animation__loading--stop;
  }

  .#{$prefix}--loading--small {
    width: 2rem;
    height: 2rem;
    circle {
      stroke-width: 12;
    }
  }

  .#{$prefix}--loading--small .#{$prefix}--loading__svg {
    stroke: $interactive-04;
  }

  .#{$prefix}--loading__background {
    stroke: $ui-03;
    stroke-dashoffset: 0;
  }

  .#{$prefix}--loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba($ui-02, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color $duration--slow-02 motion(standard, expressive);
    z-index: z('overlay');
  }

  .#{$prefix}--loading-overlay--stop {
    display: none;
  }
}
```

</details>

- **Group**: [loading](#loading)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [animation\_\_loading--spin [mixin]](#animation__loading--spin-mixin)
  - [animation\_\_loading--stop [mixin]](#animation__loading--stop-mixin)
  - [motion [function]](#motion-function)
  - [z [function]](#z-function)
  - [prefix [variable]](#prefix-variable)
  - [loading\_\_size [variable]](#loading__size-variable)
  - [interactive-04 [variable]](#interactive-04-variable)
  - [loading\_\_gap [variable]](#loading__gap-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [ui-02 [variable]](#ui-02-variable)
  - [duration--slow-02 [variable]](#duration--slow-02-variable)

### ✅animation\_\_loading--spin [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin animation__loading--spin() {
  // Animate the container
  animation-name: rotate;
  animation-duration: 690ms;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;

  // Animate the stroke
  svg circle {
    animation-name: init-stroke;
    animation-duration: 10ms;
    animation-timing-function: $carbon--standard-easing;
  }
}
```

</details>

- **Group**: [loading](#loading)
- **Requires**:
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
- **Used by**:
  - [loading [mixin]](#loading-mixin)
  - [loading--x [mixin]](#loading--x-mixin)

### ✅animation\_\_loading--stop [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin animation__loading--stop() {
  // Animate the container
  animation: rotate-end-p1 700ms $carbon--ease-out forwards, rotate-end-p2 700ms
      $carbon--ease-out 700ms forwards;

  // Animate the stroke
  & svg circle {
    animation-name: stroke-end;
    animation-duration: 700ms;
    animation-timing-function: $carbon--ease-out;
    animation-delay: 700ms;
    animation-fill-mode: forwards;
  }
}
```

</details>

- **Group**: [loading](#loading)
- **Requires**:
  - [carbon--ease-out [variable]](#carbon--ease-out-variable)
- **Used by**:
  - [loading [mixin]](#loading-mixin)
  - [loading--x [mixin]](#loading--x-mixin)

### ✅loading\_\_gap [variable]

<details>
<summary>Source code</summary>

```scss
$loading__gap: 40;
```

</details>

- **Group**: [loading](#loading)
- **Type**: `Number`
- **Used by**:
  - [loading [mixin]](#loading-mixin)
  - [loading--x [mixin]](#loading--x-mixin)

### ✅loading\_\_size [variable]

<details>
<summary>Source code</summary>

```scss
$loading__size: 10.5rem;
```

</details>

- **Group**: [loading](#loading)
- **Type**: `Number`
- **Used by**:
  - [loading [mixin]](#loading-mixin)
  - [loading--x [mixin]](#loading--x-mixin)

## modal

### ❌modal--color [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin modal--color() {
  .#{$prefix}--modal-container {
    border-top-color: $color;
  }
}
```

</details>

- **Group**: [modal](#modal)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
- **Used by**:
  - [modal [mixin]](#modal-mixin)
  - [modal--x [mixin]](#modal--x-mixin)

### ❌modal [mixin]

v9 modal

<details>
<summary>Source code</summary>

```scss
@mixin modal() {
  .#{$prefix}--modal {
    @include reset;
    @include font-family;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: z('hidden');
    display: flex;
    align-items: center;
    justify-content: center;
    content: '';
    opacity: 0;
    background-color: rgba($ui-03, 0.5);
    transition: opacity 200ms, z-index 0s 200ms, visibility 0s 200ms;
    visibility: hidden;

    &.is-visible {
      z-index: z('modal');
      opacity: 1;
      transition: opacity 200ms;
      visibility: visible;
    }
  }

  .#{$prefix}--modal--danger {
    @include modal--color($support-01);
  }

  .#{$prefix}--modal-container {
    @include reset;
    @include layer('pop-out');
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: $ui-01;
    border-top: $modal-border-top;
    min-width: 100%;
    max-height: 100%;
    height: 100%;
    padding: $spacing-xl 3% 0rem 3%;

    @media (min-width: 600px) {
      height: auto;
      min-width: 500px;
      max-width: 75%;
      max-height: 90%;
      padding: $spacing-2xl $spacing-3xl 0 $spacing-3xl;
    }

    @media (min-width: 1024px) {
      max-width: 50%;
      max-height: 80%;
    }
  }

  .#{$prefix}--modal-header {
    margin-bottom: $spacing-lg;
  }

  .#{$prefix}--modal-header,
  .#{$prefix}--modal-footer {
    flex-shrink: 0;
  }

  .#{$prefix}--modal-header__label {
    @include reset;
    @include typescale('omega');
    @include letter-spacing;
    color: $text-01;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: $spacing-xs;
  }

  .#{$prefix}--modal-header__heading {
    @include reset;
    @include typescale('beta');
    font-weight: 300;
    color: $text-02;
  }

  .#{$prefix}--modal-content {
    overflow-y: auto;
    margin-bottom: $spacing-3xl;
    color: $text-01;
    font-weight: 400;

    > * {
      @include reset;
    }
  }

  .#{$prefix}--modal-footer {
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
    background-color: $modal-footer-background-color;
    margin-left: rem(-24px);
    margin-right: rem(-24px);
    padding: $spacing-xl $spacing-xl;

    @media (min-width: 600px) {
      margin-left: rem(-48px);
      margin-right: rem(-48px);
      padding: $spacing-xl $spacing-3xl;
    }
  }

  .#{$prefix}--modal-close {
    position: absolute;
    top: rem(16px);
    right: rem(16px);
    padding: 0;
    overflow: hidden;
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 0.25rem 0.25rem 0.125rem;

    &:focus {
      @include focus-outline('border');
    }
  }

  .#{$prefix}--modal-close__icon {
    fill: $ui-05;
  }
}
```

</details>

- **Group**: [modal](#modal)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [modal--color [mixin]](#modal--color-mixin)
  - [layer [mixin]](#layer-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [letter-spacing [mixin]](#letter-spacing-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [z [function]](#z-function)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [support-01 [variable]](#support-01-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [modal-border-top [variable]](#modal-border-top-variable)
  - [spacing-xl [variable]](#spacing-xl-variable)
  - [spacing-2xl [variable]](#spacing-2xl-variable)
  - [spacing-3xl [variable]](#spacing-3xl-variable)
  - [spacing-lg [variable]](#spacing-lg-variable)
  - [text-01 [variable]](#text-01-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [text-02 [variable]](#text-02-variable)
  - [modal-footer-background-color [variable]](#modal-footer-background-color-variable)
  - [ui-05 [variable]](#ui-05-variable)

### ❌modal--x [mixin]

v10 modal

<details>
<summary>Source code</summary>

```scss
@mixin modal--x() {
  .#{$prefix}--modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: z('hidden');
    display: flex;
    align-items: center;
    justify-content: center;
    content: '';
    opacity: 0;
    background-color: $overlay-01;
    transition: opacity $duration--moderate-01 motion(exit, expressive), z-index
        0s $duration--moderate-01 motion(exit, expressive),
      visibility 0s $duration--moderate-01 motion(exit, expressive);
    visibility: hidden;

    &.is-visible {
      z-index: z('modal');
      opacity: 1;
      transition: opacity $duration--slow-01 motion(entrance, expressive);
      visibility: visible;
    }

    .#{$prefix}--text-input,
    .#{$prefix}--select-input {
      background-color: $field-02;
    }
  }

  .#{$prefix}--modal--danger {
    @include modal--color($support-01);
  }

  .#{$prefix}--modal-container {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: $ui-01;
    width: 100%;
    max-height: 100%;
    height: 100%;

    @include carbon--breakpoint(md) {
      height: auto;
      width: 50%;
      max-width: 768px;
      max-height: 90%;
    }

    @include carbon--breakpoint(lg) {
      max-height: 80%;
    }
  }

  .#{$prefix}--modal-header,
  .#{$prefix}--modal-content {
    width: 75%;
    padding-left: 1rem;
  }

  .#{$prefix}--modal-header,
  .#{$prefix}--modal-footer {
    flex-shrink: 0;
  }

  .#{$prefix}--modal-header {
    padding-top: 1rem;
    margin-bottom: $carbon--spacing-05;
  }

  .#{$prefix}--modal-header__label {
    @include type-style('label-01');

    color: $text-02;
    margin-bottom: $carbon--spacing-02;
  }

  .#{$prefix}--modal-header__heading {
    @include type-style('productive-heading-03');

    color: $text-01;
  }

  .#{$prefix}--modal-content {
    @include type-style('body-long-01');

    overflow-y: auto;
    margin-bottom: $carbon--spacing-09;
    color: $text-01;
    font-weight: 400;
  }

  .#{$prefix}--modal-content > * {
    @include type-style('body-long-01');
  }

  .#{$prefix}--modal-footer {
    display: flex;
    margin-top: auto;
    height: 4rem;
    background-color: $modal-footer-background-color;

    button.#{$prefix}--btn {
      max-width: none;
      width: 50%;
      height: 4rem;
      margin: 0;
      padding-top: 1rem;
      padding-bottom: 2rem;
    }
  }

  .#{$prefix}--modal-close {
    position: absolute;
    top: 0;
    right: 0;
    height: 3rem;
    width: 3rem;
    padding: rem(12px);
    border: 2px solid transparent;
    overflow: hidden;
    cursor: pointer;
    background-color: transparent;

    &:hover {
      background-color: $hover-ui;
    }

    &:focus {
      outline: none;
      border-color: $interactive-01;
    }
  }

  .#{$prefix}--modal-close__icon {
    fill: $icon-01;
    height: rem(20px);
    width: rem(20px);
  }
}
```

</details>

- **Group**: [modal](#modal)
- **Requires**:
  - [modal--color [mixin]](#modal--color-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [z [function]](#z-function)
  - [motion [function]](#motion-function)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [overlay-01 [variable]](#overlay-01-variable)
  - [duration--moderate-01 [variable]](#duration--moderate-01-variable)
  - [duration--slow-01 [variable]](#duration--slow-01-variable)
  - [field-02 [variable]](#field-02-variable)
  - [support-01 [variable]](#support-01-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [text-02 [variable]](#text-02-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [text-01 [variable]](#text-01-variable)
  - [carbon--spacing-09 [variable]](#carbon--spacing-09-variable)
  - [modal-footer-background-color [variable]](#modal-footer-background-color-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [icon-01 [variable]](#icon-01-variable)

## multi-select

### ❌multiselect [mixin]

v9 multi-select

<details>
<summary>Source code</summary>

```scss
@mixin multiselect() {
  .#{$prefix}--multi-select.#{$prefix}--combo-box
    > .#{$prefix}--list-box__field {
    padding: 0 1rem;
  }

  .#{$prefix}--multi-select.#{$prefix}--combo-box input[role='combobox'] {
    padding: 0;
    outline: none;
  }
}
```

</details>

- **Group**: [multi-select](#multi-select)
- **Requires**:
  - [prefix [variable]](#prefix-variable)

### ❌multiselect--x [mixin]

v10 multi-select

<details>
<summary>Source code</summary>

```scss
@mixin multiselect--x() {
  .#{$prefix}--multi-select .#{$prefix}--list-box__menu {
    min-width: auto;
  }

  .#{$prefix}--multi-select
    .#{$prefix}--list-box__menu-item__option
    .#{$prefix}--checkbox-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .#{$prefix}--multi-select
    .#{$prefix}--list-box__menu-item__option
    > .#{$prefix}--form-item {
    margin: 0;
    flex-direction: row;
  }

  .#{$prefix}--multi-select
    .#{$prefix}--list-box__menu-item
    .#{$prefix}--checkbox:checked
    ~ .#{$prefix}--checkbox-label-text {
    color: $text-01;
  }

  .#{$prefix}--multi-select.#{$prefix}--multi-select--selected
    .#{$prefix}--list-box__field {
    padding-left: $carbon--spacing-03;
  }

  .#{$prefix}--multi-select--filterable {
    .#{$prefix}--list-box__selection--multi {
      position: absolute;
      left: $carbon--spacing-03;
      right: auto;
    }
  }

  .#{$prefix}--multi-select--selected .#{$prefix}--text-input {
    // this value will need to change based on the number of digits in
    // the number of items selected
    //
    // i.e. the input field needs adjusted padding to account for the width of
    // the number in <ListBox.Selection>
    padding-left: carbon--mini-units(6);
  }
}
```

</details>

- **Group**: [multi-select](#multi-select)
- **Requires**:
  - [carbon--mini-units [function]](#carbon--mini-units-function)
  - [prefix [variable]](#prefix-variable)
  - [text-01 [variable]](#text-01-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)

## notification

### ❌inline-notifications [mixin]

v9 inline notification

<details>
<summary>Source code</summary>

```scss
@mixin inline-notifications() {
  .#{$prefix}--inline-notification {
    @include reset;
    @include font-family;
    @include font-smoothing;
    @include typescale('zeta');
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    padding: $spacing-sm $spacing-md;
    min-height: rem(40px);
    color: $text-02;
    margin-top: $spacing-md;
    margin-bottom: $spacing-md;
  }

  .#{$prefix}--inline-notification--error {
    @include inline-notification--color($support-01);
  }

  .#{$prefix}--inline-notification--success {
    @include inline-notification--color($support-02);
  }

  .#{$prefix}--inline-notification--info {
    @include inline-notification--color($support-04);
  }

  .#{$prefix}--inline-notification--warning {
    @include inline-notification--color($support-03);
  }

  .#{$prefix}--inline-notification__details {
    display: flex;
    align-items: center;
  }

  .#{$prefix}--inline-notification__icon {
    height: 16px;
    width: 16px;
    min-width: 22px;
  }

  .#{$prefix}--inline-notification__text-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 0 $spacing-md;

    @media (max-width: 640px) {
      flex-direction: column;
      width: 100%;
    }
  }

  .#{$prefix}--inline-notification__title {
    @include typescale('zeta');
    color: $text-01;
    font-weight: 600;
    margin: 0 $spacing-2xs 0 0;
    line-height: 1.125;
  }

  .#{$prefix}--inline-notification__subtitle {
    @include typescale('zeta');
    line-height: 1.125;
  }

  .#{$prefix}--inline-notification__close-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    height: 16px;
    width: 12px;
    position: relative;

    &:focus {
      @include focus-outline('border');
    }
  }

  .#{$prefix}--inline-notification__close-icon {
    height: 10px;
    width: 10px;
    fill: $ui-05;
    position: absolute;
    top: 3px;
    right: 1px;
  }
}
```

</details>

- **Group**: [notification](#notification)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [font-smoothing [mixin]](#font-smoothing-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [inline-notification--color [mixin]](#inline-notification--color-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-sm [variable]](#spacing-sm-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [text-02 [variable]](#text-02-variable)
  - [support-01 [variable]](#support-01-variable)
  - [support-02 [variable]](#support-02-variable)
  - [support-04 [variable]](#support-04-variable)
  - [support-03 [variable]](#support-03-variable)
  - [text-01 [variable]](#text-01-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [ui-05 [variable]](#ui-05-variable)

### ❌inline-notifications--x [mixin]

v10 inline notification

<details>
<summary>Source code</summary>

```scss
@mixin inline-notifications--x() {
  .#{$prefix}--inline-notification {
    @include reset;

    display: flex;
    justify-content: space-between;
    height: auto;
    min-height: rem(48px);
    min-width: rem(288px);
    max-width: rem(288px);
    color: $text-01;
    margin-top: $carbon--spacing-05;
    margin-bottom: $carbon--spacing-05;

    @include carbon--breakpoint(md) {
      max-width: rem(608px);
    }

    @include carbon--breakpoint(lg) {
      max-width: rem(736px);
    }

    @include carbon--breakpoint(max) {
      max-width: rem(832px);
    }
  }

  .#{$prefix}--inline-notification--error {
    @include notification--experimental(
      $support-01,
      $notification-error-background-color
    );
  }

  .#{$prefix}--inline-notification--success {
    @include notification--experimental(
      $support-02,
      $notification-success-background-color
    );
  }

  .#{$prefix}--inline-notification--info {
    @include notification--experimental(
      $support-04,
      $notification-info-background-color
    );
  }

  .#{$prefix}--inline-notification--info .bx--inline-notification__icon {
    display: none;
  }

  .#{$prefix}--inline-notification--warning {
    @include notification--experimental(
      $support-03,
      $notification-warning-background-color
    );
  }

  .#{$prefix}--inline-notification--warning
    .#{$prefix}--inline-notification__icon
    path[opacity='0'] {
    fill: $text-01;
    opacity: 1;
  }

  .#{$prefix}--inline-notification__details {
    display: flex;
    margin: 0 $carbon--spacing-05;
  }

  .#{$prefix}--inline-notification__icon {
    flex-shrink: 0;
    margin-right: $carbon--spacing-05;
    margin-top: rem(14px);
  }

  .#{$prefix}--inline-notification__text-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: $carbon--spacing-04 0;
  }

  .#{$prefix}--inline-notification__title {
    @include type-style('heading-01');
    margin: 0 $carbon--spacing-02 0 0;
    white-space: nowrap;
  }

  .#{$prefix}--inline-notification__subtitle {
    @include type-style('body-short-01');
    word-break: break-word;
  }

  .#{$prefix}--inline-notification__close-button {
    @include focus-outline('reset');
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    height: rem(48px);
    width: rem(48px);
    min-width: rem(48px);
    max-width: rem(48px);
    transition: outline $duration--fast-02 motion(standard, productive), background-color
        $duration--fast-02 motion(standard, productive);

    &:focus {
      @include focus-outline('outline');
    }

    .#{$prefix}--inline-notification__close-icon {
      height: 1rem;
      width: 1rem;
      fill: $ui-05;
    }
  }
}
```

</details>

- **Group**: [notification](#notification)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [notification--experimental [mixin]](#notification--experimental-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [rem [function]](#rem-function)
  - [motion [function]](#motion-function)
  - [prefix [variable]](#prefix-variable)
  - [text-01 [variable]](#text-01-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [support-01 [variable]](#support-01-variable)
  - [notification-error-background-color [variable]](#notification-error-background-color-variable)
  - [support-02 [variable]](#support-02-variable)
  - [notification-success-background-color [variable]](#notification-success-background-color-variable)
  - [support-04 [variable]](#support-04-variable)
  - [notification-info-background-color [variable]](#notification-info-background-color-variable)
  - [support-03 [variable]](#support-03-variable)
  - [notification-warning-background-color [variable]](#notification-warning-background-color-variable)
  - [carbon--spacing-04 [variable]](#carbon--spacing-04-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [duration--fast-02 [variable]](#duration--fast-02-variable)
  - [ui-05 [variable]](#ui-05-variable)

### ❌inline-notification--color [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin inline-notification--color() {
  border: 1px solid $color;
  border-left: 6px solid $color;

  .#{$prefix}--inline-notification__icon {
    fill: $color;
  }
}
```

</details>

- **Group**: [notification](#notification)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
- **Used by**:
  - [inline-notifications [mixin]](#inline-notifications-mixin)

### ❌notification--color [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin notification--color() {
  border-left: 6px solid $color;
}
```

</details>

- **Group**: [notification](#notification)
- **Used by**:
  - [toast-notifications [mixin]](#toast-notifications-mixin)

### ❌notification--experimental [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin notification--experimental() {
  border-left: 3px solid $color;
  background: $background-color;

  .#{$prefix}--inline-notification__icon,
  .#{$prefix}--toast-notification__icon {
    fill: $color;
  }
}
```

</details>

- **Group**: [notification](#notification)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
- **Used by**:
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)

### ❌toast-notifications [mixin]

v9 toast notification

<details>
<summary>Source code</summary>

```scss
@mixin toast-notifications() {
  .#{$prefix}--toast-notification {
    @include reset;
    @include font-family;
    @include font-smoothing;
    @include layer('overlay');
    display: flex;
    justify-content: space-between;
    width: 16.875rem;
    padding: $spacing-md $spacing-md $spacing-xs $spacing-md;
    background-color: $ui-01;
    color: $text-01;
    margin-top: $spacing-xs;
    margin-bottom: $spacing-xs;
    margin-right: $spacing-md;

    &:first-child {
      margin-top: $spacing-md;
    }
  }

  .#{$prefix}--toast-notification--error {
    @include notification--color($support-01);
  }

  .#{$prefix}--toast-notification--success {
    @include notification--color($support-02);
  }

  .#{$prefix}--toast-notification--info {
    @include notification--color($support-04);
  }

  .#{$prefix}--toast-notification--warning {
    @include notification--color($support-03);
  }

  .#{$prefix}--toast-notification__close-button {
    background-color: $ui-01;
    border: none;
    cursor: pointer;
    margin: 0;
    width: 12px;
    height: 12px;
    position: relative;

    &:focus {
      @include focus-outline('border');
    }
  }

  .#{$prefix}--toast-notification__close-icon,
  .#{$prefix}--toast-notification__icon {
    height: 1rem;
    width: 1rem;
    height: 10px;
    width: 10px;
    fill: $ui-05;
    position: absolute;
    top: 1px;
    right: 1px;
  }

  .#{$prefix}--toast-notification__title {
    @include typescale('zeta');
    @include letter-spacing;
    font-weight: 600;
    line-height: 1;
    padding-bottom: $spacing-3xs;
  }

  .#{$prefix}--toast-notification__subtitle {
    @include typescale('omega');
    color: $text-02;
    margin-top: 0;
    margin-bottom: $spacing-md;
    line-height: 1.2;
  }

  .#{$prefix}--toast-notification__caption {
    @include typescale('omega');
    color: $text-02;
    line-height: 1;
  }
}
```

</details>

- **Group**: [notification](#notification)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [font-smoothing [mixin]](#font-smoothing-mixin)
  - [layer [mixin]](#layer-mixin)
  - [notification--color [mixin]](#notification--color-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [letter-spacing [mixin]](#letter-spacing-mixin)
  - [prefix [variable]](#prefix-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [support-01 [variable]](#support-01-variable)
  - [support-02 [variable]](#support-02-variable)
  - [support-04 [variable]](#support-04-variable)
  - [support-03 [variable]](#support-03-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [spacing-3xs [variable]](#spacing-3xs-variable)
  - [text-02 [variable]](#text-02-variable)

### ❌toast-notifications--x [mixin]

v10 toast notification

<details>
<summary>Source code</summary>

```scss
@mixin toast-notifications--x() {
  .#{$prefix}--toast-notification {
    @include reset;

    display: flex;
    width: rem(288px);
    height: auto;
    padding-left: $carbon--spacing-05;
    color: $text-01;
    margin-top: $carbon--spacing-03;
    margin-bottom: $carbon--spacing-03;
    margin-right: $carbon--spacing-05;

    &:first-child {
      margin-top: $carbon--spacing-05;
    }

    @include carbon--breakpoint(max) {
      width: rem(352px);
    }
  }

  .#{$prefix}--toast-notification--error {
    @include notification--experimental(
      $support-01,
      $notification-error-background-color
    );
  }

  .#{$prefix}--toast-notification--success {
    @include notification--experimental(
      $support-02,
      $notification-success-background-color
    );
  }

  .#{$prefix}--toast-notification--info {
    @include notification--experimental(
      $support-04,
      $notification-info-background-color
    );
  }

  .#{$prefix}--toast-notification--warning {
    @include notification--experimental(
      $support-03,
      $notification-warning-background-color
    );
  }

  .#{$prefix}--toast-notification--warning
    .#{$prefix}--toast-notification__icon
    path[opacity='0'] {
    fill: $text-01;
    opacity: 1;
  }

  .#{$prefix}--toast-notification__icon {
    flex-shrink: 0;
    margin-right: $carbon--spacing-05;
    margin-top: $carbon--spacing-05;
  }

  .#{$prefix}--toast-notification__details {
    margin-right: $carbon--spacing-05;
  }

  .#{$prefix}--toast-notification__close-button {
    @include focus-outline('reset');
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-left: auto;
    padding: 0;
    height: rem(48px);
    width: rem(48px);
    min-height: rem(48px);
    min-width: rem(48px);
    transition: outline $transition--base, background-color $transition--base;

    &:focus {
      @include focus-outline('outline');
    }

    .#{$prefix}--toast-notification__close-icon {
      height: 1rem;
      width: 1rem;
      fill: $ui-05;
    }
  }

  .#{$prefix}--toast-notification__title {
    @include type-style('heading-01');

    font-weight: 600;
    margin-top: 1rem;
  }

  .#{$prefix}--toast-notification__subtitle {
    @include type-style('body-short-01');

    color: $text-01;
    margin-top: 0;
    margin-bottom: $carbon--spacing-06;
  }

  .#{$prefix}--toast-notification__caption {
    @include type-style('body-short-01');

    color: $text-01;
    margin-bottom: $carbon--spacing-05;
  }
}
```

</details>

- **Group**: [notification](#notification)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [notification--experimental [mixin]](#notification--experimental-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [text-01 [variable]](#text-01-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [support-01 [variable]](#support-01-variable)
  - [notification-error-background-color [variable]](#notification-error-background-color-variable)
  - [support-02 [variable]](#support-02-variable)
  - [notification-success-background-color [variable]](#notification-success-background-color-variable)
  - [support-04 [variable]](#support-04-variable)
  - [notification-info-background-color [variable]](#notification-info-background-color-variable)
  - [support-03 [variable]](#support-03-variable)
  - [notification-warning-background-color [variable]](#notification-warning-background-color-variable)
  - [transition--base [variable]](#transition--base-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [carbon--spacing-06 [variable]](#carbon--spacing-06-variable)

## number-input

### ❌number-input [mixin]

v9 number-input

<details>
<summary>Source code</summary>

```scss
@mixin number-input() {
  .#{$prefix}--number {
    @include reset;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .#{$prefix}--number input[type='number'] {
    @include typescale('zeta');
    @include font-family;
    box-sizing: border-box;
    display: inline-flex;
    width: 100%;
    min-width: 9.375rem;
    padding-left: $spacing-md;
    padding-right: $spacing-xl;
    font-weight: 300;
    height: rem(40px);
    color: $text-01;
    background-color: $field-01;
    border: none;
    box-shadow: 0 1px 0 0 $ui-05;
    order: 2;
    border-radius: 0;
    border-bottom: 1px solid transparent;

    & ~ .#{$prefix}--label {
      order: 1;
    }

    &:focus {
      outline: none;
      box-shadow: 0 2px 0 0 $brand-01;
    }

    &:focus ~ .#{$prefix}--label {
      color: $brand-01;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:disabled ~ .#{$prefix}--number__controls {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    & ~ .#{$prefix}--form-requirement {
      order: 3;
      color: $support-01;
      font-weight: 400;
      margin-top: $spacing-2xs;
      overflow: visible;

      &::before {
        display: none;
      }
    }
  }

  .#{$prefix}--number input[type='number'] {
    appearance: textfield; // Firefox: Hide spinner (up and down buttons)

    &::-ms-clear {
      display: none; // IE: Hide "clear-field" `x` button on input field
    }

    &::-webkit-inner-spin-button {
      appearance: none; // Safari: Hide number spinner
    }
  }

  .#{$prefix}--number__controls {
    @include reset;
    position: absolute;
    left: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    right: 0.5rem;
    top: 2rem;
  }

  .#{$prefix}--number__control-btn {
    @include button-reset;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: rem(20px);
    height: rem(10px);

    &:focus {
      @include focus-outline;
    }

    &:hover {
      cursor: pointer;
    }

    &:hover svg {
      fill: $hover-primary;
    }
  }

  .#{$prefix}--number__controls svg {
    fill: $brand-01;

    // Hover styles for use with old HTML w/o button
    &:hover {
      cursor: pointer;
      fill: $hover-primary;
    }
  }

  .#{$prefix}--number[data-invalid] {
    .#{$prefix}--form-requirement {
      display: inline-block;
      max-height: rem(200px);
    }

    input[type='number'],
    input[type='number']:focus {
      outline: none;
      box-shadow: 0 2px 0px 0px $support-01;
    }

    input[type='number']:focus ~ .#{$prefix}--label {
      color: $support-01;
    }
  }

  .#{$prefix}--number--nolabel .#{$prefix}--number__controls {
    top: 0.625rem;
  }

  .#{$prefix}--number--helpertext .#{$prefix}--number__controls {
    top: 2.25rem;
  }

  .#{$prefix}--number--helpertext:not([data-invalid])
    .#{$prefix}--number__controls {
    top: auto;
    bottom: 0.625rem;
  }

  .#{$prefix}--number--helpertext[data-invalid] .#{$prefix}--number__controls {
    top: auto;
    bottom: 2rem;
  }

  .#{$prefix}--number--light input[type='number'] {
    background: $field-02;
  }

  // Skeleton State
  .#{$prefix}--number.#{$prefix}--skeleton {
    @include skeleton;
    width: 100%;
    height: 2.5rem;

    input[type='number'] {
      display: none;
    }
  }
}
```

</details>

- **Group**: [number-input](#number-input)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [spacing-xl [variable]](#spacing-xl-variable)
  - [text-01 [variable]](#text-01-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [support-01 [variable]](#support-01-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [hover-primary [variable]](#hover-primary-variable)
  - [field-02 [variable]](#field-02-variable)

### ❌number-input--x [mixin]

v10 number-input

<details>
<summary>Source code</summary>

```scss
@mixin number-input--x() {
  .#{$prefix}--number {
    @include reset;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .#{$prefix}--number input[type='number'] {
    @include type-style('body-short-01');
    @include focus-outline('reset');
    font-family: carbon--font-family('mono');
    box-sizing: border-box;
    display: inline-flex;
    width: 100%;
    min-width: 9.375rem;
    padding-left: $carbon--spacing-05;
    padding-right: $carbon--spacing-07;
    font-weight: 300;
    height: rem(40px);
    color: $text-01;
    background-color: $field-01;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid $ui-04;
    transition: all $duration--fast-02 motion(standard, productive);

    &:focus {
      @include focus-outline('outline');
    }

    &:disabled {
      cursor: not-allowed;
      background-color: $disabled-background-color;
      color: $disabled;
    }

    &:disabled ~ .#{$prefix}--number__controls {
      cursor: not-allowed;
      pointer-events: none;
    }

    &:disabled ~ .#{$prefix}--number__controls svg {
      fill: $disabled;
    }

    appearance: textfield; // Firefox: Hide spinner (up and down buttons)

    &::-ms-clear {
      display: none; // IE: Hide "clear-field" `x` button on input field
    }

    &::-webkit-inner-spin-button {
      appearance: none; // Safari: Hide number spinner
    }
  }

  .#{$prefix}--number__input-wrapper {
    display: flex;
    align-items: center;

    ~ .#{$prefix}--form-requirement {
      color: $support-01;
      font-weight: 400;
      margin-top: $carbon--spacing-02;
      overflow: visible;

      &::before {
        display: none;
      }
    }
  }

  .#{$prefix}--number__controls {
    @include reset;
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .#{$prefix}--number__control-btn {
    @include button-reset;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: rem(32px);
    height: rem(20px);
    color: $icon-01;

    svg {
      fill: currentColor;
      position: relative;
    }

    &.up-icon svg {
      top: rem(5px);
    }

    &.down-icon svg {
      top: rem(-5px);
    }

    &:focus {
      @include focus-outline;
      color: $icon-01;
      outline-width: 2px;
      outline-offset: -2px;
    }

    &:hover {
      cursor: pointer;
    }

    &:hover {
      color: $icon-01;
    }

    &:disabled {
      cursor: not-allowed;
      color: $disabled;
    }
  }

  .#{$prefix}--number[data-invalid] {
    .#{$prefix}--form-requirement {
      display: inline-block;
      max-height: rem(200px);
    }

    input[type='number'] {
      @include focus-outline('invalid');
    }
  }

  .#{$prefix}--number__invalid {
    position: absolute;
    right: 2rem;
    fill: $support-01;
  }

  .#{$prefix}--number--light input[type='number'] {
    background-color: $field-02;
  }

  .#{$prefix}--number--mobile {
    min-width: rem(144px);
    width: auto;

    .#{$prefix}--number__control-btn,
    &.#{$prefix}--number--light .#{$prefix}--number__control-btn {
      position: static;
      width: rem(40px);
      height: rem(40px);
      background-color: $ui-01;

      &:hover,
      &:focus {
        background-color: $hover-ui;
      }

      &:focus {
        outline-width: 2px;
        outline-offset: -2px;
      }

      svg {
        position: static;
      }
    }

    input[type='number'] {
      min-width: rem(64px);
      width: auto;
      margin: 0;
      border-right: 1px solid $ui-03;
      border-left: 1px solid $ui-03;
      padding: 0;
      text-align: center;
      background-color: $field-01;
    }

    &.#{$prefix}--number--light {
      input[type='number'] {
        background-color: $field-02;
      }

      .#{$prefix}--number__control-btn {
        background-color: $ui-02;
      }
    }
  }

  // Skeleton State
  .#{$prefix}--number.#{$prefix}--skeleton {
    @include skeleton;
    width: 100%;
    height: 2.5rem;

    input[type='number'] {
      display: none;
    }
  }
}
```

</details>

- **Group**: [number-input](#number-input)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [carbon--font-family [function]](#carbon--font-family-function)
  - [rem [function]](#rem-function)
  - [motion [function]](#motion-function)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [carbon--spacing-07 [variable]](#carbon--spacing-07-variable)
  - [text-01 [variable]](#text-01-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [duration--fast-02 [variable]](#duration--fast-02-variable)
  - [disabled-background-color [variable]](#disabled-background-color-variable)
  - [disabled [variable]](#disabled-variable)
  - [support-01 [variable]](#support-01-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [icon-01 [variable]](#icon-01-variable)
  - [field-02 [variable]](#field-02-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [ui-02 [variable]](#ui-02-variable)

## overflow-menu

### ❌overflow-menu [mixin]

v9 overflow-menu

<details>
<summary>Source code</summary>

```scss
@mixin overflow-menu() {
  .#{$prefix}--overflow-menu {
    @include reset;
    position: relative;
    width: rem(20px);
    height: rem(38px);
    cursor: pointer;

    &:focus {
      outline: 1px solid transparent;
      box-shadow: 0 0 0 1px $brand-01;
    }
  }

  .#{$prefix}--overflow-menu__icon {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    fill: $ui-05;

    &:hover,
    &:focus {
      fill: $hover-secondary;
    }
  }

  .#{$prefix}--overflow-menu-options {
    @include reset;
    @include layer('overlay');
    display: none;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    z-index: z('floating');
    background-color: $inverse-01;
    border: 1px solid $ui-03;
    width: 11.25rem;
    list-style: none;
    margin-top: $spacing-2xs;
    padding: $spacing-2xs 0 $spacing-xs;
    left: -20px;
  }

  .#{$prefix}--overflow-menu-options--open {
    display: flex;
  }

  .#{$prefix}--overflow-menu-options {
    &:before {
      content: '';
      position: absolute;
      display: block;
      width: rem(8px);
      height: rem(8px);
      z-index: -1;
      transform: rotate(45deg);
      background-color: $inverse-01;
      border-top: 1px solid $ui-03;
      border-left: 1px solid $ui-03;
      top: -5px;
      left: 24px;
    }

    &[data-floating-menu-direction='top']:before {
      transform: rotate(225deg);
      top: auto;
      bottom: -5px;
    }
  }

  .#{$prefix}--overflow-menu-options__option {
    @include reset;
    display: flex;
    background-color: transparent;
    align-items: center;
    width: 100%;
    padding: 0;
  }

  .#{$prefix}--overflow-menu--divider {
    border-top: 1px solid $ui-03;
  }

  .#{$prefix}--overflow-menu-options__btn {
    @include reset;
    @include typescale('zeta');
    @include font-family;
    font-weight: 400;
    width: 100%;
    height: 100%;
    border: none;
    display: inline-block;
    background-color: transparent;
    text-align: left;
    padding: $spacing-xs $spacing-md;
    cursor: pointer;
    color: $text-01;
    max-width: 11.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:focus {
      outline: 1px solid transparent;
      text-decoration: underline;
      background-color: $hover-row;
      text-decoration: underline;
    }

    .#{$prefix}--overflow-menu-options__option--danger & {
      &:focus {
        outline: 1px solid transparent;
        text-decoration: underline;
      }
    }
  }

  .#{$prefix}--overflow-menu-options__option:hover {
    background-color: $hover-row;
  }

  .#{$prefix}--overflow-menu-options__option:hover
    .#{$prefix}--overflow-menu-options__btn {
    text-decoration: none;
    background-color: $hover-row;
    text-decoration: none;
  }

  .#{$prefix}--overflow-menu-options__option--danger {
    border-top: 1px solid $ui-03;
  }

  .#{$prefix}--overflow-menu-options__option--danger {
    .#{$prefix}--overflow-menu-options__btn {
      &:hover,
      &:focus {
        color: $inverse-01;
        background-color: $support-01;
      }
    }
  }

  .#{$prefix}--overflow-menu-options__option--disabled:hover {
    background-color: $ui-01;
  }

  .#{$prefix}--overflow-menu-options__option--disabled
    .#{$prefix}--overflow-menu-options__btn {
    color: $text-01;
    cursor: not-allowed;
    opacity: 0.5;
  }

  .#{$prefix}--overflow-menu-options__option--disabled:hover
    .#{$prefix}--overflow-menu-options__btn {
    color: $text-01;
    opacity: 0.5;
    background-color: $ui-01;

    &:active,
    &:focus {
      background-color: $ui-01;
      pointer-events: none;
    }
  }

  .#{$prefix}--overflow-menu--flip {
    left: -140px;

    &:before {
      left: 145px;
    }
  }
}
```

</details>

- **Group**: [overflow-menu](#overflow-menu)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [layer [mixin]](#layer-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [rem [function]](#rem-function)
  - [z [function]](#z-function)
  - [prefix [variable]](#prefix-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [hover-secondary [variable]](#hover-secondary-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [text-01 [variable]](#text-01-variable)
  - [hover-row [variable]](#hover-row-variable)
  - [support-01 [variable]](#support-01-variable)
  - [ui-01 [variable]](#ui-01-variable)

### ❌overflow-menu--x [mixin]

v10 overflow-menu

<details>
<summary>Source code</summary>

```scss
@mixin overflow-menu--x() {
  .#{$prefix}--overflow-menu {
    @include reset;
    @include focus-outline('reset');
    position: relative;
    width: rem(32px);
    height: rem(32px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: outline $duration--fast-02 motion(entrance, productive), background-color
        $duration--fast-02 motion(entrance, productive);

    &:focus {
      @include focus-outline('outline');
    }

    &:hover {
      background-color: $hover-ui;
    }
  }

  .#{$prefix}--overflow-menu.#{$prefix}--overflow-menu--open {
    background-color: $ui-01;
    transition: none;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
  }

  .#{$prefix}--overflow-menu__icon {
    height: rem(16px);
    width: rem(16px);
    fill: $icon-01;
  }

  .#{$prefix}--overflow-menu-options {
    @include reset;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
    display: none;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    z-index: z('floating');
    background-color: $ui-01;
    width: rem(160px);
    list-style: none;
    top: 32px;
    left: 0;

    &::after {
      content: '';
      position: absolute;
      display: block;
      background-color: $ui-01;
      transition: background-color $duration--fast-02 motion(entrance, productive);
    }
  }

  .#{$prefix}--overflow-menu-options[data-floating-menu-direction='bottom']::after {
    top: rem(-3px);
    left: 0;
    width: rem(32px);
    height: rem(3px);
  }

  .#{$prefix}--overflow-menu-options[data-floating-menu-direction='top']::after {
    bottom: rem(-6px);
    left: 0;
    width: rem(32px);
    height: rem(6px);
  }

  .#{$prefix}--overflow-menu-options[data-floating-menu-direction='left']::after {
    right: rem(-6px);
    top: 0;
    height: rem(32px);
    width: rem(6px);
  }

  .#{$prefix}--overflow-menu-options[data-floating-menu-direction='right']::after {
    top: 0;
    left: rem(-6px);
    height: rem(32px);
    width: rem(6px);
  }

  .#{$prefix}--overflow-menu--flip.#{$prefix}--overflow-menu-options[data-floating-menu-direction='top']::after,
  .#{$prefix}--overflow-menu--flip.#{$prefix}--overflow-menu-options[data-floating-menu-direction='bottom']::after {
    left: auto;
    right: 0;
  }

  .#{$prefix}--overflow-menu--flip.#{$prefix}--overflow-menu-options[data-floating-menu-direction='left']::after,
  .#{$prefix}--overflow-menu--flip.#{$prefix}--overflow-menu-options[data-floating-menu-direction='right']::after {
    top: auto;
    bottom: 0;
  }

  .#{$prefix}--overflow-menu-options--open {
    display: flex;
  }

  .#{$prefix}--overflow-menu-options__option {
    @include reset;
    display: flex;
    background-color: transparent;
    align-items: center;
    width: 100%;
    height: rem(40px);
    padding: 0;
    transition: background-color $duration--fast-02 motion(entrance, productive);
  }

  .#{$prefix}--overflow-menu--divider {
    border-top: 1px solid $ui-03;
  }

  a.#{$prefix}--overflow-menu-options__btn::before {
    content: '';
    height: 100%;
    vertical-align: middle;
    display: inline-block;
  }

  .#{$prefix}--overflow-menu-options__btn {
    @include type-style('body-short-01');
    @include focus-outline('reset');
    font-weight: 400;
    width: 100%;
    height: 100%;
    border: none;
    display: inline-flex;
    align-items: center;
    background-color: transparent;
    text-align: left;
    padding: 0 $carbon--spacing-05;
    cursor: pointer;
    color: $text-02;
    max-width: 11.25rem;
    transition: outline $duration--fast-02 motion(entrance, productive), background-color
        $duration--fast-02 motion(entrance, productive),
      color $duration--fast-02 motion(entrance, productive);

    &:hover {
      color: $text-01;
    }

    &:focus {
      @include focus-outline('outline');
    }

    &::-moz-focus-inner {
      border: none;
    }
  }

  .#{$prefix}--overflow-menu-options__btn svg {
    fill: $icon-02;
  }

  .#{$prefix}--overflow-menu-options__btn:hover svg {
    fill: $icon-01;
  }

  .#{$prefix}--overflow-menu-options__option-content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .#{$prefix}--overflow-menu-options__option:hover {
    background-color: $hover-ui;
  }

  .#{$prefix}--overflow-menu-options__option--danger {
    border-top: 1px solid $ui-03;
  }

  .#{$prefix}--overflow-menu-options__option--danger
    .#{$prefix}--overflow-menu-options__btn:hover,
  .#{$prefix}--overflow-menu-options__option--danger
    .#{$prefix}--overflow-menu-options__btn:focus {
    color: $text-04;
    background-color: $support-01;
  }

  .#{$prefix}--overflow-menu-options__option--disabled:hover {
    background-color: $ui-01;
    cursor: not-allowed;
  }

  .#{$prefix}--overflow-menu-options__option--disabled
    .#{$prefix}--overflow-menu-options__btn {
    color: $disabled-02;
    pointer-events: none;

    &:hover,
    &:active,
    &:focus {
      @include focus-outline('reset');
      background-color: $ui-01;
    }
  }

  .#{$prefix}--overflow-menu-options__option--disabled
    .#{$prefix}--overflow-menu-options__btn
    svg {
    fill: $disabled-02;
  }

  .#{$prefix}--overflow-menu--flip {
    left: -140px;

    &:before {
      left: 145px;
    }
  }
}
```

</details>

- **Group**: [overflow-menu](#overflow-menu)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [rem [function]](#rem-function)
  - [motion [function]](#motion-function)
  - [z [function]](#z-function)
  - [prefix [variable]](#prefix-variable)
  - [duration--fast-02 [variable]](#duration--fast-02-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [icon-01 [variable]](#icon-01-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [text-02 [variable]](#text-02-variable)
  - [text-01 [variable]](#text-01-variable)
  - [icon-02 [variable]](#icon-02-variable)
  - [text-04 [variable]](#text-04-variable)
  - [support-01 [variable]](#support-01-variable)
  - [disabled-02 [variable]](#disabled-02-variable)

## pagination

### ❌pagination [mixin]

v9 pagination

<details>
<summary>Source code</summary>

```scss
@mixin pagination() {
  .#{$prefix}--data-table-v2-container + .#{$prefix}--pagination {
    border-top: 0;
  }

  .#{$prefix}--pagination {
    @include reset;
    @include font-family;
    width: 100%;
    background-color: $ui-01;
    padding: $spacing-xs $spacing-md;
    display: flex;
    align-items: center;
    border: 1px solid $ui-03;
    height: rem(40px);

    .#{$prefix}--form-item {
      flex: auto;
    }
  }

  .#{$prefix}--pagination__left {
    display: flex;
    align-items: center;
  }

  .#{$prefix}--pagination__right {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .#{$prefix}--pagination__text {
    @include typescale('omega');
    @include type-style('body-short-01');
    color: $text-01;
    display: none;
    padding-right: $spacing-2xs;

    @include breakpoint('530px') {
      display: block;
    }
  }

  .#{$prefix}--pagination__button-icon {
    height: rem(12px);
    width: rem(12px);
    fill: $ui-05;
    pointer-events: none;
    transition: $transition--base;
    margin-top: $spacing-3xs;
  }

  .#{$prefix}--pagination__button {
    @include reset;
    border: none;
    background: none;
    cursor: pointer;

    &:hover {
      .#{$prefix}--pagination__button-icon {
        fill: $hover-secondary;
      }
    }

    &:focus {
      @include focus-outline('border');
    }

    &:disabled:hover {
      cursor: default;

      .#{$prefix}--pagination__button-icon {
        fill: $ui-05;
      }
    }
  }

  .#{$prefix}--pagination__button--backward {
    margin-left: $spacing-md;
    margin-right: $spacing-lg;
  }

  .#{$prefix}--pagination__button--forward {
    margin-left: $spacing-lg;
  }

  .#{$prefix}--pagination__button--no-index {
    border-right: 0;
    margin-right: 1px;
  }

  .#{$prefix}--pagination {
    .#{$prefix}--select {
      margin-right: $spacing-xs;
    }

    .#{$prefix}--select--inline {
      margin-right: 0;
      width: auto;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .#{$prefix}--select-input {
      height: rem(24px);
      width: auto;
      padding: 0 1.25rem 0 0;
      margin: 0;
      font-weight: 600;
      text-align-last: center;
      box-shadow: none;

      &:focus {
        @include focus-outline('border');
      }
    }

    .#{$prefix}--select .#{$prefix}--select-input ~ .#{$prefix}--select__arrow {
      right: 0.3rem;
      top: 0.625rem;
    }

    .#{$prefix}--text-input {
      background-color: $field-01;
      height: rem(24px);
      min-width: rem(24px);
      width: rem(24px);
      padding: 0;
      margin: 0;
      font-weight: 600;
      text-align: center;
      box-shadow: none;
      order: 0;

      &:focus {
        @include focus-outline('border');
      }
    }
  }

  .#{$prefix}--pagination--inline {
    height: 42px;
    margin-top: -0.5rem;
    margin-bottom: -0.5rem;
    margin-right: -1rem;

    .#{$prefix}--pagination__button {
      height: rem(40px);
      border-left: 1px solid $ui-03;
      border-right: 1px solid $ui-03;
      margin: 0;
    }

    .#{$prefix}--pagination__button--forward {
      border-right: 0;
      padding: 0 $spacing-md;
      margin-left: $spacing-md;
    }

    .#{$prefix}--pagination__button--backward {
      margin: 0 $spacing-md;
      padding: 0 $spacing-md;
    }

    .#{$prefix}--select__arrow {
      right: 0;
      top: 0.6rem;
    }
  }

  // Skeleton state
  .#{$prefix}--pagination.#{$prefix}--skeleton .#{$prefix}--skeleton__text {
    margin-right: 1rem;
    margin-bottom: 0;
  }
}
```

</details>

- **Group**: [pagination](#pagination)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [breakpoint [mixin]](#breakpoint-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [text-01 [variable]](#text-01-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [transition--base [variable]](#transition--base-variable)
  - [spacing-3xs [variable]](#spacing-3xs-variable)
  - [hover-secondary [variable]](#hover-secondary-variable)
  - [spacing-lg [variable]](#spacing-lg-variable)
  - [field-01 [variable]](#field-01-variable)

### ❌pagination--x [mixin]

v10 pagination

<details>
<summary>Source code</summary>

```scss
@mixin pagination--x() {
  .#{$prefix}--data-table-container + .#{$prefix}--pagination {
    border-top: 0;
  }

  .#{$prefix}--pagination {
    @include reset;
    @include type-style('body-short-01');
    width: 100%;
    background-color: $ui-01;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid $ui-03;
    height: rem(48px);
  }

  .#{$prefix}--pagination .#{$prefix}--select {
    height: 100%;
    align-items: center;
    grid-template-columns: auto 0;
  }

  .#{$prefix}--select-input__wrapper,
  .#{$prefix}--select-input--inline__wrapper {
    height: 100%;
  }

  .#{$prefix}--pagination .#{$prefix}--select-input {
    @include type-style('body-short-01');
    width: auto;
    min-width: auto;
    height: 100%;
    padding: 0 2.5rem 0 $spacing-md;
    margin-right: -0.65rem;
    @include carbon--breakpoint('md') {
      padding: 0 1.5rem 0 0.5rem;
      margin-right: 0;
    }
  }

  .#{$prefix}--pagination .#{$prefix}--select-input:hover {
    background: $hover-ui;
  }

  .#{$prefix}--pagination .#{$prefix}--select__arrow {
    position: relative;
    top: auto;
    right: 1.1rem;
    bottom: auto;
  }

  .#{$prefix}--pagination
    .#{$prefix}--select__item-count
    .#{$prefix}--select-input {
    border-right: $spacing-4xs solid $ui-03;
    @include carbon--breakpoint('md') {
      padding-right: 2rem;
      margin-right: -0.65rem;
    }
  }

  .#{$prefix}--pagination
    .#{$prefix}--select__page-number
    .#{$prefix}--select-input {
    border-left: 1px solid $ui-03;
    @include carbon--breakpoint('md') {
      padding-left: 1rem;
      padding-right: 2rem;
    }
  }

  .#{$prefix}--pagination
    .#{$prefix}--select__page-number
    .#{$prefix}--select__arrow {
    @include carbon--breakpoint('md') {
      right: 1.8rem;
    }
  }

  .#{$prefix}--pagination__left,
  .#{$prefix}--pagination__right {
    display: flex;
    height: 100%;
    align-items: center;
  }

  .#{$prefix}--pagination__left > .#{$prefix}--form-item,
  .#{$prefix}--pagination__right > .#{$prefix}--form-item {
    height: 100%;
  }

  .#{$prefix}--pagination__left .#{$prefix}--pagination__text {
    margin-right: rem(1px);
  }

  .#{$prefix}--pagination__right .#{$prefix}--pagination__text {
    margin-right: 1rem;
    margin-left: rem(1px);
  }

  .#{$prefix}--pagination__left {
    @include carbon--breakpoint('md') {
      padding: 0 $carbon--spacing-05;
    }
  }

  .#{$prefix}--pagination__text {
    display: none;

    @include carbon--breakpoint('md') {
      display: inline-block;
    }
  }

  span.#{$prefix}--pagination__text {
    margin-left: $carbon--spacing-05;
    color: $text-01;
  }

  .#{$prefix}--pagination__right span.#{$prefix}--pagination__text {
    margin-left: -0.5rem;
  }

  .#{$prefix}--pagination__button {
    @include reset;
    border: none;
    background: none;
    cursor: pointer;
    height: 100%;
    margin: 0;
    padding: 0 rem(14px);
    border-left: 1px solid $ui-03;
    display: flex;
    justify-content: center;
    align-items: center;
    fill: $ui-05;
    transition: outline $duration--fast-02 motion(standard, productive);
    transition: background-color $duration--fast-02 motion(standard, productive);
  }

  .#{$prefix}--pagination__button:focus {
    @include focus-outline('outline');
  }

  .#{$prefix}--pagination__button:hover {
    background: $hover-ui;
  }

  .#{$prefix}--pagination__button--no-index {
    fill: $disabled-02;
    cursor: not-allowed;
  }

  .#{$prefix}--pagination__button:disabled:hover,
  .#{$prefix}--pagination__button--no-index:hover {
    cursor: not-allowed;
    fill: $disabled-02;
    background: $ui-01;
  }

  .#{$prefix}--pagination--inline {
    height: rem(42px);
    margin-top: -0.5rem;
    margin-bottom: -0.5rem;
    margin-right: -1rem;
  }

  .#{$prefix}--pagination--inline .#{$prefix}--pagination__button {
    height: rem(40px);
    border-left: 1px solid $ui-03;
    border-right: 1px solid $ui-03;
    margin: 0;
  }

  .#{$prefix}--pagination--inline .#{$prefix}--pagination__button--forward {
    border-right: 0;
    padding: 0 $carbon--spacing-05;
    margin-left: $carbon--spacing-05;
  }

  .#{$prefix}--pagination--inline .#{$prefix}--pagination__button--backward {
    margin: 0 $carbon--spacing-05;
    padding: 0 $carbon--spacing-05;
  }

  // Skeleton state
  .#{$prefix}--pagination.#{$prefix}--skeleton .#{$prefix}--skeleton__text {
    margin-right: 1rem;
    margin-bottom: 0;
  }
}
```

</details>

- **Group**: [pagination](#pagination)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [rem [function]](#rem-function)
  - [motion [function]](#motion-function)
  - [prefix [variable]](#prefix-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [spacing-4xs [variable]](#spacing-4xs-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [duration--fast-02 [variable]](#duration--fast-02-variable)
  - [disabled-02 [variable]](#disabled-02-variable)

## pagination-nav

### ❌pseudo-underline [mixin]

v10 pseudo underline

<details>
<summary>Source code</summary>

```scss
@mixin pseudo-underline() {
  @if feature-flag-enabled('components-x') {
    &:not(.#{$prefix}--pagination-nav__page--direction) {
      &::after {
        background-color: $interactive-01;
        bottom: 0;
        content: '';
        display: block;
        height: $carbon--spacing-02;
        left: 50%;
        position: absolute;
        opacity: 0;
        transition: width $duration--fast-02 motion(standard, productive);
        width: 0;
      }
    }

    .#{$prefix}--pagination-nav__page--active + &::after,
    &.#{$prefix}--pagination-nav__page--active::after {
      left: calc(50% - #{$carbon--spacing-05/2});
      opacity: 1;
      width: $carbon--spacing-05;
    }
  }
}
```

</details>

- **Group**: [pagination-nav](#pagination-nav)
- **Requires**:
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [motion [function]](#motion-function)
  - [prefix [variable]](#prefix-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [duration--fast-02 [variable]](#duration--fast-02-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
- **Used by**:
  - [pagination-nav-base [mixin]](#pagination-nav-base-mixin)

### ❌pagination-nav-base [mixin]

Pagination nav base styles

<details>
<summary>Source code</summary>

```scss
@mixin pagination-nav-base(
  $text-color: $text-02,
  $text-color-active: $text-02,
  $background-color-hover: $hover-ui,
  $background-color-active: initial,
  $font-weight: 400,
  $item-padding: 0,
  $button-min-width: $carbon--spacing-09,
  $button-padding: 1.0625rem $carbon--spacing-02,
  $button-direction-size: $carbon--spacing-09,
  $select-icon-top-position: $carbon--spacing-05,
  $select-icon-left-position: $carbon--spacing-05
) {
  .#{$prefix}--pagination-nav {
    @include reset;
    @if not feature-flag-enabled('components-x') {
      @include font-family;
      @include font-smoothing;
      @include typescale('zeta');
    } @else {
      @include type-style('body-short-01');
    }
    line-height: 0;
  }

  .#{$prefix}--pagination-nav__list {
    align-items: center;
    display: flex;
    list-style: none;
  }

  .#{$prefix}--pagination-nav__list-item {
    padding: $item-padding;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }

  .#{$prefix}--pagination-nav__page {
    @if not feature-flag-enabled('components-x') {
      @include typescale('zeta');
    } @else {
      @include type-style('body-short-01');
    }
    @include button-reset($width: false);
    border-radius: 0;
    color: $text-color;
    display: block;
    font-weight: $font-weight;
    line-height: 1;
    min-width: $button-min-width;
    outline: 0;
    padding: $button-padding;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: background-color, color;
    transition: $duration--fast-02 motion(standard, productive);
    user-select: none;

    &:hover {
      background-color: $background-color-hover;
      color: $text-color;
    }

    &:focus {
      @include focus-outline('outline');
    }

    &:disabled,
    &.#{$prefix}--pagination-nav__page--disabled {
      background: none;
      color: rgba($text-color, 0.5);
      outline: none;
      pointer-events: none;
    }

    @include pseudo-underline();

    &.#{$prefix}--pagination-nav__page--active {
      background-color: $background-color-active;
      color: $text-color-active;
      font-weight: 600;
      outline: none;
    }

    .#{$prefix}--pagination-nav__icon {
      fill: currentColor;
      pointer-events: none;
    }
  }

  .#{$prefix}--pagination-nav__page--direction {
    align-items: center;
    display: flex;
    height: $button-direction-size;
    justify-content: center;
    line-height: 0;
    width: $button-direction-size;
  }

  .#{$prefix}--pagination-nav__select {
    position: relative;
  }

  .#{$prefix}--pagination-nav__page--select {
    appearance: none;
    max-height: $button-min-width;
    text-indent: calc(50% - 4.5px);
    // Override some Firefox user-agent styles
    @-moz-document url-prefix() {
      text-indent: 0;
    }
  }

  .#{$prefix}--pagination-nav__select-icon-wrapper {
    height: 100%;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;

    @include pseudo-underline();

    .#{$prefix}--pagination-nav__page--active + & {
      .#{$prefix}--pagination-nav__select-icon {
        display: none;
      }
    }
  }

  .#{$prefix}--pagination-nav__select-icon {
    left: calc(50% - #{$select-icon-top-position/2});
    pointer-events: none;
    position: absolute;
    top: calc(50% - #{$select-icon-top-position/2});
  }

  .#{$prefix}--pagination-nav__accessibility-label {
    @include hidden();
  }

  @content;
}
```

</details>

- **Parameters**:

| Name                         | Description | Type     | Default value                   |
| ---------------------------- | ----------- | -------- | ------------------------------- |
| `$text-color`                | —           | `Color`  | `$text-02`                      |
| `$text-color-active`         | —           | `Color`  | `$text-02`                      |
| `$background-color-hover`    | —           | `Color`  | `$hover-ui`                     |
| `$background-color-active`   | —           | `Color`  | `initial`                       |
| `$font-weight`               | —           | `Number` | `400`                           |
| `$item-padding`              | —           | `Number` | `0`                             |
| `$button-min-width`          | —           | `Number` | `$carbon--spacing-09`           |
| `$button-padding`            | —           | `Value`  | `1.0625rem $carbon--spacing-02` |
| `$button-direction-size`     | —           | `Number` | `$carbon--spacing-09`           |
| `$select-icon-top-position`  | —           | `Number` | `$carbon--spacing-05`           |
| `$select-icon-left-position` | —           | `Number` | `$carbon--spacing-05`           |

- **Group**: [pagination-nav](#pagination-nav)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [font-smoothing [mixin]](#font-smoothing-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [pseudo-underline [mixin]](#pseudo-underline-mixin)
  - [hidden [mixin]](#hidden-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [motion [function]](#motion-function)
  - [prefix [variable]](#prefix-variable)
  - [button-padding [variable]](#button-padding-variable)
  - [duration--fast-02 [variable]](#duration--fast-02-variable)
- **Used by**:
  - [pagination-nav [mixin]](#pagination-nav-mixin)
  - [pagination-nav--x [mixin]](#pagination-nav--x-mixin)

### ❌pagination-nav [mixin]

v9 pagination-nav

<details>
<summary>Source code</summary>

```scss
@mixin pagination-nav() {
  @include pagination-nav-base(
    $text-color: $ui-05,
    $text-color-active: $color__white,
    $background-color-hover: $hover-row,
    $background-color-active: $brand-01,
    $font-weight: 600,
    $item-padding: 0 $spacing-xs,
    $button-min-width: $spacing-lg,
    $button-padding: 0.3125rem $spacing-2xs,
    $button-direction-size: $spacing-lg,
    $select-icon-top-position: $spacing-md,
    $select-icon-left-position: $spacing-md
  );

  .#{$prefix}--pagination-nav__list-item {
    &:first-child {
      .#{$prefix}--pagination-nav__page--direction {
        margin-right: $spacing-xs;
      }
    }

    &:last-child {
      .#{$prefix}--pagination-nav__page--direction {
        margin-left: $spacing-xs;
      }
    }
  }
}
```

</details>

- **Group**: [pagination-nav](#pagination-nav)
- **Requires**:
  - [pagination-nav-base [mixin]](#pagination-nav-base-mixin)
  - [ui-05 [variable]](#ui-05-variable)
  - [color\_\_white [variable]](#color__white-variable)
  - [hover-row [variable]](#hover-row-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [spacing-lg [variable]](#spacing-lg-variable)
  - [button-padding [variable]](#button-padding-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [prefix [variable]](#prefix-variable)

### ❌pagination-nav--x [mixin]

v10 pagination-nav

<details>
<summary>Source code</summary>

```scss
@mixin pagination-nav--x() {
  @include pagination-nav-base();
}
```

</details>

- **Group**: [pagination-nav](#pagination-nav)
- **Requires**:
  - [pagination-nav-base [mixin]](#pagination-nav-base-mixin)

## progress-indicator

### ❌progress-indicator [mixin]

v9 progress-indicator

<details>
<summary>Source code</summary>

```scss
@mixin progress-indicator() {
  .#{$prefix}--progress {
    @include reset;
    @include font-family;
    display: flex;
    list-style: none;
  }

  .#{$prefix}--progress-step {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    flex: 1;
    min-width: 7rem;
    transition: $transition--base all $carbon--standard-easing;
    overflow: visible;

    &:first-child .#{$prefix}--progress-line {
      display: none;
    }
  }

  .#{$prefix}--progress-line {
    position: absolute;
    top: $progress-indicator-line-offset;
    right: 100%;
    height: 1px;
    width: calc(100% - 24px);
    border: $progress-indicator-bar-width;
  }

  .#{$prefix}--progress-step svg {
    position: relative;
    z-index: 1;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    margin-bottom: $spacing-xs;
    fill: $brand-01;
  }

  .#{$prefix}--progress-label {
    line-height: 1;
    width: 75%;
  }

  //interactive button
  .#{$prefix}--progress-step-button {
    display: inline-flex;
    flex-flow: column nowrap;
  }

  //unclickable button
  .#{$prefix}--progress-step-button--unclickable {
    outline: none;
  }

  .#{$prefix}--progress-step--current {
    circle:first-child {
      stroke: $brand-01;
      stroke-width: $progress-indicator-stroke-width;
      fill: transparent;
    }

    .#{$prefix}--progress-label {
      @include font-smoothing;
      color: $brand-01;
      font-weight: 600;
    }
    .#{$prefix}--progress-line {
      background-color: $brand-01;
    }
  }

  .#{$prefix}--progress-step--incomplete {
    circle {
      stroke: $ui-04;
      stroke-width: $progress-indicator-stroke-width;
      fill: transparent;
    }

    .#{$prefix}--progress-label {
      color: $text-02;
    }

    .#{$prefix}--progress-line {
      background-color: $ui-04;
    }
  }

  .#{$prefix}--progress-step--complete {
    circle {
      stroke: $brand-01;
      stroke-width: $progress-indicator-stroke-width;
      fill: transparent;
    }

    polygon {
      fill: $brand-01;
    }

    .#{$prefix}--progress-label {
      @include font-smoothing;
      color: $brand-01;
      font-weight: 600;
    }
    .#{$prefix}--progress-line {
      background-color: $brand-01;
    }
  }

  // Skeleton State
  .#{$prefix}--progress.#{$prefix}--skeleton .#{$prefix}--progress-label {
    @include skeleton;
    height: rem(12px);
    width: rem(40px);
  }

  // Vertical variant
  .#{$prefix}--progress--vertical {
    display: block;
  }

  .#{$prefix}--progress--vertical .#{$prefix}--progress-step {
    display: list-item;
    min-height: 6rem;

    svg {
      display: inline-block;
    }
  }

  .#{$prefix}--progress--vertical .#{$prefix}--progress-label {
    display: inline-block;
    width: auto;
    vertical-align: top;
    margin-top: 0.26rem;
    margin-left: 0.5rem;
  }

  .#{$prefix}--progress--vertical .#{$prefix}--progress-line {
    top: 22px;
    left: 0.69rem;
    height: calc(100% - 22px);
    width: 1px;
  }

  .#{$prefix}--progress--vertical
    .#{$prefix}--progress-step:first-child
    .#{$prefix}--progress-line {
    display: block;
  }
  .#{$prefix}--progress--vertical
    .#{$prefix}--progress-step:last-child
    .#{$prefix}--progress-line {
    display: none;
  }
}
```

</details>

- **Group**: [progress-indicator](#progress-indicator)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [font-smoothing [mixin]](#font-smoothing-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [transition--base [variable]](#transition--base-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [progress-indicator-line-offset [variable]](#progress-indicator-line-offset-variable)
  - [progress-indicator-bar-width [variable]](#progress-indicator-bar-width-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [progress-indicator-stroke-width [variable]](#progress-indicator-stroke-width-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [text-02 [variable]](#text-02-variable)

### ❌progress-indicator--x [mixin]

v10 progress-indicator

<details>
<summary>Source code</summary>

```scss
@mixin progress-indicator--x() {
  .#{$prefix}--progress {
    @include reset;
    display: flex;
    list-style: none;
  }

  .#{$prefix}--progress-step {
    position: relative;
    display: inline-flex;
    flex-direction: row;
    flex: 1;
    min-width: 7rem;
    width: rem(128px);
    transition: $duration--fast-02 all motion(standard, productive);
    overflow: visible;

    .#{$prefix}--tooltip__label {
      display: block;
    }
  }

  .#{$prefix}--progress-line {
    position: absolute;
    height: 1px;
    width: rem(128px);
    border: $progress-indicator-bar-width;
  }

  .#{$prefix}--progress-step svg {
    position: relative;
    z-index: 1;
    width: $carbon--spacing-05;
    height: $carbon--spacing-05;
    border-radius: 50%;
    margin: 9px $carbon--spacing-03 0 0;
    fill: $interactive-01;
  }

  .#{$prefix}--progress-label {
    line-height: 1.45;
    max-width: rem(88px);
    margin: $carbon--spacing-03 0 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @include type-style('body-short-01');
    transition: box-shadow $transition--base $carbon--standard-easing;

    &::before {
      content: '';
      display: block;
    }
  }

  .#{$prefix}--progress-label:hover {
    color: $link-01;
    cursor: pointer;
    box-shadow: 0 rem(1px) $link-01;
  }

  .#{$prefix}--progress-label:focus {
    outline: none;
    color: $link-01;
    box-shadow: 0 rem(3px) 0 0 $link-01;
    transition: box-shadow 0.05s $carbon--standard-easing;
  }

  .#{$prefix}--progress-label:active {
    color: $interactive-01;
    box-shadow: 0 rem(3px) 0 0 $interactive-01;
  }

  //OVERFLOW STYLING
  .#{$prefix}--progress-label-overflow:hover ~ .#{$prefix}--tooltip,
  .#{$prefix}--progress-label-overflow:focus ~ .#{$prefix}--tooltip {
    visibility: visible;
  }

  .#{$prefix}--progress-step .#{$prefix}--tooltip .#{$prefix}--tooltip__caret {
    margin-left: rem(10px);
  }

  .#{$prefix}--tooltip__text {
    padding: 0;
    margin: 0;
    font-weight: normal;
  }

  //single line tooltip
  .#{$prefix}--progress-step .#{$prefix}--tooltip {
    min-width: rem(115px);
    width: rem(125px);
    min-height: $carbon--spacing-06;
    margin-left: rem(22px);
    margin-top: rem(40px);
    padding: $carbon--spacing-03 $carbon--spacing-05;
    display: block;
    visibility: hidden;
    @include type-style('body-long-01');
    color: $inverse-01;
  }

  //multiline tooltip
  .#{$prefix}--progress-step .#{$prefix}--tooltip_multi {
    width: rem(150px);
    height: auto;
    @include type-style('body-long-01');
    color: $inverse-01;
  }

  //OPTIONAL HELPER TEXT STYLING
  .#{$prefix}--progress-optional {
    position: absolute;
    margin-left: $carbon--spacing-06;
    margin-top: rem(28px);
    @include type-style('label-01');
    color: $text-01;
  }

  //CURRENT STYLING
  .#{$prefix}--progress-step--current {
    .#{$prefix}--progress-line {
      background-color: $interactive-01;
    }
  }

  .#{$prefix}--progress-step--current svg {
    width: 14px;
    height: 14px;
    fill: $interactive-01;
    margin-top: rem(9.5px);
  }

  //INCOMPLETE STYLING
  .#{$prefix}--progress-step--incomplete {
    svg {
      fill: $ui-05;
    }

    .#{$prefix}--progress-line {
      background-color: $ui-03;
    }
  }

  //COMPLETED STYLING
  .#{$prefix}--progress-step--complete {
    .#{$prefix}--progress-line {
      background-color: $interactive-01;
    }
  }

  //interactive button
  .#{$prefix}--progress-step-button {
    display: flex;
  }

  //unclickable button
  .#{$prefix}--progress-step-button--unclickable {
    outline: none;
  }

  //DISABLED STYLING
  .#{$prefix}--progress-step--disabled {
    cursor: not-allowed;

    svg {
      fill: $disabled;
      cursor: not-allowed;
    }

    .#{$prefix}--progress-label,
    .#{$prefix}--progress-label:hover {
      color: $disabled;
      cursor: not-allowed;
      box-shadow: none;
    }

    .#{$prefix}--progress-label:focus,
    .#{$prefix}--progress-label:active {
      outline: none;
      box-shadow: none;
    }

    .#{$prefix}--progress-line {
      cursor: not-allowed;
    }

    .#{$prefix}--progress-label-overflow:hover
      ~ .#{$prefix}--tooltip--definition
      .#{$prefix}--tooltip--definition__bottom {
      display: none;
    }
  }

  //ERROR STYLING
  .#{$prefix}--progress__warning > path {
    fill: $support-01;
  }

  // Skeleton State
  .#{$prefix}--progress.#{$prefix}--skeleton .#{$prefix}--progress-label {
    @include skeleton;
    height: rem(12px);
    width: rem(40px);
  }

  .#{$prefix}--progress--vertical {
    display: block;
  }

  .#{$prefix}--progress--vertical .#{$prefix}--progress-step {
    display: list-item;
    min-height: 6rem;
    width: initial;
    min-width: initial;

    svg {
      display: inline-block;
      margin: 0.1rem 0.5rem;
    }
  }

  .#{$prefix}--progress--vertical .#{$prefix}--progress-step--current svg {
    margin-left: 0.563rem;
  }

  .#{$prefix}--progress--vertical .#{$prefix}--progress-label {
    display: inline-block;
    width: initial;
    max-width: none;
    vertical-align: top;
    margin: 0;
  }

  .#{$prefix}--progress--vertical .#{$prefix}--progress-step .bx--tooltip {
    margin-top: 0.5rem;
  }

  .#{$prefix}--progress--vertical .#{$prefix}--progress-optional {
    margin-top: initial;
    position: initial;
    margin-left: 2.25rem;
  }

  .#{$prefix}--progress--vertical .#{$prefix}--progress-line {
    top: 0;
    left: 0;
    height: 100%;
    width: 1px;
  }
}
```

</details>

- **Group**: [progress-indicator](#progress-indicator)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [motion [function]](#motion-function)
  - [prefix [variable]](#prefix-variable)
  - [duration--fast-02 [variable]](#duration--fast-02-variable)
  - [progress-indicator-bar-width [variable]](#progress-indicator-bar-width-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [transition--base [variable]](#transition--base-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [link-01 [variable]](#link-01-variable)
  - [carbon--spacing-06 [variable]](#carbon--spacing-06-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [disabled [variable]](#disabled-variable)
  - [support-01 [variable]](#support-01-variable)

## radio-button

### ❌radio-button [mixin]

v9 radio-button

<details>
<summary>Source code</summary>

```scss
@mixin radio-button() {
  .#{$prefix}--radio-button-group {
    display: flex;
    align-items: center;
    margin-top: $spacing-xs;
  }

  .#{$prefix}--radio-button {
    @include hidden;
    visibility: unset;
  }

  .#{$prefix}--radio-button__label {
    @include typescale('zeta');
    @include font-family;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: $spacing-md;
  }

  .#{$prefix}--radio-button__appearance {
    @include reset;
    background-color: $inverse-01;
    border-radius: 50%;
    border: $radio-border-width solid $ui-05;
    flex-shrink: 0;
    height: rem(18px);
    width: rem(18px);
    margin-right: $spacing-xs;
  }

  .#{$prefix}--radio-button:checked
    + .#{$prefix}--radio-button__label
    .#{$prefix}--radio-button__appearance {
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: $brand-01;

    &:before {
      content: '';
      display: inline-block;
      position: relative;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: $brand-01;
    }
  }

  .#{$prefix}--radio-button:disabled + .#{$prefix}--radio-button__label {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .#{$prefix}--radio-button:focus
    + .#{$prefix}--radio-button__label
    .#{$prefix}--radio-button__appearance {
    @include focus-outline('blurred');
  }

  // Skeleton State
  .#{$prefix}--radio-button__label.#{$prefix}--skeleton {
    @include skeleton;
    width: rem(100px);
    height: rem(18px);
  }

  .#{$prefix}--radio-button__label.#{$prefix}--skeleton
    .#{$prefix}--radio-button__appearance {
    display: none;
  }

  .#{$prefix}--radio-button-wrapper .#{$prefix}--radio-button__label {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px;
  }

  .#{$prefix}--radio-button-wrapper:not(:last-of-type) {
    margin-right: $spacing-md;
  }

  .#{$prefix}--radio-button-wrapper.#{$prefix}--radio-button-wrapper--label-right
    .#{$prefix}--radio-button__label {
    flex-direction: row;
  }

  .#{$prefix}--radio-button-wrapper.#{$prefix}--radio-button-wrapper--label-left
    .#{$prefix}--radio-button__label {
    flex-direction: row-reverse;
  }

  .#{$prefix}--radio-button-wrapper.#{$prefix}--radio-button-wrapper--label-left
    .#{$prefix}--radio-button__appearance {
    margin-right: 0;
    margin-left: $spacing-xs;
  }

  .#{$prefix}--radio-button-wrapper.#{$prefix}--radio-button-wrapper--label-top
    .#{$prefix}--radio-button__label {
    flex-direction: column-reverse;
    text-align: center;
  }

  .#{$prefix}--radio-button-wrapper.#{$prefix}--radio-button-wrapper--label-top
    .#{$prefix}--radio-button__appearance {
    margin-right: 0;
  }

  .#{$prefix}--radio-button-wrapper.#{$prefix}--radio-button-wrapper--label-top
    .#{$prefix}--radio-button__label-text {
    margin-bottom: 5px;
  }

  .#{$prefix}--radio-button-wrapper.#{$prefix}--radio-button-wrapper--label-bottom
    .#{$prefix}--radio-button__label {
    flex-direction: column;
    text-align: center;
  }

  .#{$prefix}--radio-button-wrapper.#{$prefix}--radio-button-wrapper--label-bottom
    .#{$prefix}--radio-button__label-text {
    margin-top: 5px;
  }

  .#{$prefix}--radio-button-wrapper.#{$prefix}--radio-button-wrapper--label-bottom
    .#{$prefix}--radio-button__appearance {
    margin-right: 0;
  }
}
```

</details>

- **Group**: [radio-button](#radio-button)
- **Requires**:
  - [hidden [mixin]](#hidden-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [reset [mixin]](#reset-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [radio-border-width [variable]](#radio-border-width-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [brand-01 [variable]](#brand-01-variable)

### ❌radio-button--experimental [mixin]

v10 radio-button

<details>
<summary>Source code</summary>

```scss
@mixin radio-button--experimental() {
  .#{$prefix}--radio-button-group {
    display: flex;
    align-items: center;
    margin-top: rem(6px);
  }

  // vertical radio button
  .#{$prefix}--radio-button-group--vertical {
    flex-direction: column;

    .#{$prefix}--radio-button__label {
      margin-right: 0;
    }

    .#{$prefix}--radio-button__label:not(:last-of-type) {
      margin-bottom: $carbon--spacing-03;
    }
  }

  .#{$prefix}--radio-button {
    @include hidden;
    visibility: unset;
  }

  .#{$prefix}--radio-button__label {
    @include type-style('body-short-01');
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: $carbon--spacing-05;
  }

  .#{$prefix}--radio-button__appearance {
    @include reset;
    background-color: transparent;
    border-radius: 50%;
    border: $radio-border-width solid $ui-05;
    flex-shrink: 0;
    height: rem(18px);
    width: rem(18px);
    margin-right: $carbon--spacing-03;
  }

  .#{$prefix}--radio-button:checked
    + .#{$prefix}--radio-button__label
    .#{$prefix}--radio-button__appearance {
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: $ui-05;

    &:before {
      content: '';
      display: inline-block;
      position: relative;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: $ui-05;
    }
  }

  // Workaround for: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11295231
  [disabled] ~ _ {
    font-size: inherit;
  }

  .#{$prefix}--radio-button:disabled + .#{$prefix}--radio-button__label {
    color: $disabled;
    cursor: not-allowed;
  }

  .#{$prefix}--radio-button:disabled
    + .#{$prefix}--radio-button__label
    .#{$prefix}--radio-button__appearance,
  .#{$prefix}--radio-button:disabled:checked
    + .#{$prefix}--radio-button__label
    .#{$prefix}--radio-button__appearance {
    border-color: $disabled;

    &::before {
      background-color: $disabled;
    }
  }

  // Focus

  .#{$prefix}--radio-button:focus
    + .#{$prefix}--radio-button__label
    .#{$prefix}--radio-button__appearance {
    box-shadow: 0 0 0 2px $focus;
    outline: 1px solid transparent;
  }

  // Skeleton State
  .#{$prefix}--radio-button__label.#{$prefix}--skeleton {
    @include skeleton;
    width: rem(100px);
    height: rem(18px);
  }

  .#{$prefix}--radio-button__label.#{$prefix}--skeleton
    .#{$prefix}--radio-button__appearance {
    display: none;
  }

  .#{$prefix}--radio-button-wrapper .#{$prefix}--radio-button__label {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  .#{$prefix}--radio-button-wrapper:not(:last-of-type) {
    margin-right: $carbon--spacing-05;
  }

  .#{$prefix}--radio-button-group--vertical
    .#{$prefix}--radio-button-wrapper:not(:last-of-type) {
    margin-right: 0;
    margin-bottom: $carbon--spacing-03;
  }

  .#{$prefix}--radio-button-wrapper.#{$prefix}--radio-button-wrapper--label-right
    .#{$prefix}--radio-button__label {
    flex-direction: row;
  }

  .#{$prefix}--radio-button-wrapper.#{$prefix}--radio-button-wrapper--label-left
    .#{$prefix}--radio-button__label {
    flex-direction: row-reverse;
  }

  .#{$prefix}--radio-button-wrapper.#{$prefix}--radio-button-wrapper--label-left
    .#{$prefix}--radio-button__appearance {
    margin-right: 0;
    margin-left: $carbon--spacing-03;
  }
}
```

</details>

- **Group**: [radio-button](#radio-button)
- **Requires**:
  - [hidden [mixin]](#hidden-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [reset [mixin]](#reset-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [radio-border-width [variable]](#radio-border-width-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [disabled [variable]](#disabled-variable)
  - [focus [variable]](#focus-variable)

## search

### ❌search [mixin]

v9 search

<details>
<summary>Source code</summary>

```scss
@mixin search() {
  .#{$prefix}--search {
    display: flex;
    position: relative;
    width: 100%;
  }

  .#{$prefix}--search .#{$prefix}--label {
    @include hidden;
  }

  .#{$prefix}--search-input {
    @include reset;
    @include font-family;
    appearance: none;
    border: none;
    background-color: $field-01;
    color: $text-01;
    font-weight: 600;
    padding: 0 $spacing-2xl;
    text-overflow: ellipsis;
    width: 100%;
    order: 1;

    &:focus {
      outline: none;
    }

    &:focus ~ .#{$prefix}--search-magnifier {
      fill: $brand-01;
    }

    &::placeholder {
      color: $text-02;
      font-weight: 400;
    }

    &::-ms-clear {
      display: none;
    }
  }

  .#{$prefix}--search--light .#{$prefix}--search-input {
    background: $field-02;
  }

  .#{$prefix}--search--sm .#{$prefix}--search-input {
    @include typescale('zeta');
    height: rem(32px);
  }

  .#{$prefix}--search--lg .#{$prefix}--search-input {
    @include typescale('zeta');
    height: rem(40px);
  }

  .#{$prefix}--search-magnifier,
  .#{$prefix}--search-close {
    position: absolute;
    height: 1rem;
    width: 1rem;
    top: calc(50% - 0.5rem);
    // Ensure clear icon is rendered in Firefox (#1127)
    z-index: 1;
  }

  .#{$prefix}--search-magnifier {
    left: 0.75rem;
    fill: $ui-05;
    z-index: 2;
  }

  .#{$prefix}--search-close {
    @include button-reset(false);

    transition: opacity $transition--base;
    fill: $ui-05;
    cursor: pointer;
    visibility: visible;
    opacity: 1;
  }

  .#{$prefix}--search-close:focus {
    outline: 1px solid $brand-01;
    outline-offset: 2px;
  }

  .#{$prefix}--search-close {
    right: 0.75rem;
  }

  .#{$prefix}--search--lg .#{$prefix}--search-close {
    right: rem(12px);
  }

  .#{$prefix}--search-button {
    @include reset;
    border: 0;
    transition: $transition--base;
    height: rem(40px);
    width: rem(40px);
    min-width: rem(40px);
    margin-left: $spacing-2xs;
    background-color: $ui-01;
    position: relative;
    padding: 0;
    outline: 1px solid transparent;
    order: 2;
  }

  .#{$prefix}--search-button svg {
    position: relative;
    top: -1px;
    box-sizing: border-box;
    vertical-align: middle;
    transition: $transition--base;
    fill: $hover-primary;
    height: 1rem;
    width: 1rem;
  }

  .#{$prefix}--search-button:hover,
  .#{$prefix}--search-button:focus {
    cursor: pointer;
    background-color: $brand-01;
    outline: 1px solid transparent;
  }

  .#{$prefix}--search-button:hover svg,
  .#{$prefix}--search-button:focus svg {
    fill: $ui-01;
  }

  .#{$prefix}--search-close--hidden {
    visibility: hidden;
    opacity: 0;
  }

  .#{$prefix}--search-view--hidden {
    display: none;
  }

  .#{$prefix}--search--lg.#{$prefix}--skeleton .#{$prefix}--search-input,
  .#{$prefix}--search--sm.#{$prefix}--skeleton .#{$prefix}--search-input {
    @include skeleton;
    width: 100%;

    &::placeholder {
      color: transparent;
    }
  }
}
```

</details>

- **Group**: [search](#search)
- **Requires**:
  - [hidden [mixin]](#hidden-mixin)
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [field-01 [variable]](#field-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [spacing-2xl [variable]](#spacing-2xl-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [text-02 [variable]](#text-02-variable)
  - [field-02 [variable]](#field-02-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [transition--base [variable]](#transition--base-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [hover-primary [variable]](#hover-primary-variable)

### ❌search--x [mixin]

v10 search

<details>
<summary>Source code</summary>

```scss
@mixin search--x() {
  .#{$prefix}--search {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
  }

  .#{$prefix}--search .#{$prefix}--label {
    @include hidden;
  }

  .#{$prefix}--search-input {
    @include reset;
    @include type-style('body-short-02');
    @include focus-outline('reset');
    appearance: none;
    border: none;
    background-color: $field-01;
    color: $text-01;
    padding: 0 $carbon--spacing-08;
    text-overflow: ellipsis;
    width: 100%;
    order: 1;
    transition: background-color $duration--fast-01, outline $duration--fast-01;
    border-bottom: 1px solid $ui-04;

    &:focus {
      @include focus-outline('outline');
    }

    &::placeholder {
      color: $text-03;
      font-weight: 400;
    }

    &::-ms-clear {
      display: none;
    }
  }

  .#{$prefix}--search-input[disabled] {
    color: $disabled;
    background-color: $disabled-background-color;
    border-bottom: 1px solid transparent;
    cursor: not-allowed;

    &::placeholder {
      color: $disabled;
      font-weight: 400;
    }
  }

  .#{$prefix}--search-input[disabled] ~ .#{$prefix}--search-magnifier {
    fill: $disabled;
  }

  .#{$prefix}--search--light .#{$prefix}--search-input {
    background: $field-02;
  }

  .#{$prefix}--search--sm .#{$prefix}--search-input {
    @include type-style('body-short-01');
    height: rem(32px);
  }

  .#{$prefix}--search--xl .#{$prefix}--search-input {
    @include type-style('body-short-02');
    font-size: carbon--type-scale(4);
    height: rem(48px);
    padding: 0 rem(64px) 0 rem(48px);
  }

  .#{$prefix}--search-magnifier {
    left: 0.75rem;
    z-index: 2;
    position: absolute;
    height: rem(16px);
    width: rem(16px);
    top: 50%;
    transform: translateY(-50%);
    // Ensure clear icon is rendered in Firefox (#1127)
    fill: $text-02;
  }

  .#{$prefix}--search--xl .#{$prefix}--search-magnifier {
    height: rem(20px);
    width: rem(20px);
    left: rem(24px);
    transform: translate(-50%, -50%);
  }

  .#{$prefix}--search-close {
    @include button-reset(false);
    @include focus-outline('reset');
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity $duration--fast-02, outline $duration--fast-02,
      background-color $duration--fast-02, border-color $duration--fast-02;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    visibility: visible;
    opacity: 1;
    position: absolute;
    height: rem(40px);
    width: rem(40px);
    right: 0;
    fill: $icon-01;
    border: 2px solid transparent;
    border-left: 0;

    &:hover {
      background-color: $hover-ui;
      border-bottom: 1px solid $ui-04;
    }
    &:active {
      @include focus-outline('outline');
      background-color: $selected-ui;
    }
  }

  .#{$prefix}--search-input:focus ~ .#{$prefix}--search-close:hover {
    border: 2px solid $focus;
    border-left: 0;
  }

  .#{$prefix}--search--sm .#{$prefix}--search-close {
    height: rem(32px);
    width: rem(32px);
  }

  .#{$prefix}--search--xl .#{$prefix}--search-close {
    height: rem(48px);
    width: rem(48px);
  }

  .#{$prefix}--search-close:focus {
    @include focus-outline('outline');
  }

  .#{$prefix}--search-close--hidden {
    visibility: hidden;
    opacity: 0;
  }

  .#{$prefix}--search--lg.#{$prefix}--skeleton .#{$prefix}--search-input,
  .#{$prefix}--search--sm.#{$prefix}--skeleton .#{$prefix}--search-input {
    @include skeleton;
    width: 100%;

    &::placeholder {
      color: transparent;
    }
  }
}
```

</details>

- **Group**: [search](#search)
- **Requires**:
  - [hidden [mixin]](#hidden-mixin)
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [carbon--type-scale [function]](#carbon--type-scale-function)
  - [prefix [variable]](#prefix-variable)
  - [field-01 [variable]](#field-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [carbon--spacing-08 [variable]](#carbon--spacing-08-variable)
  - [duration--fast-01 [variable]](#duration--fast-01-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [text-03 [variable]](#text-03-variable)
  - [disabled [variable]](#disabled-variable)
  - [disabled-background-color [variable]](#disabled-background-color-variable)
  - [field-02 [variable]](#field-02-variable)
  - [text-02 [variable]](#text-02-variable)
  - [duration--fast-02 [variable]](#duration--fast-02-variable)
  - [icon-01 [variable]](#icon-01-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [selected-ui [variable]](#selected-ui-variable)
  - [focus [variable]](#focus-variable)

## select

### ❌select [mixin]

v9 select

<details>
<summary>Source code</summary>

```scss
@mixin select() {
  .#{$prefix}--select {
    @include reset;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .#{$prefix}--form__helper-text {
    order: 0;
  }

  .#{$prefix}--select-input {
    @include font-family;
    @include typescale('zeta');
    height: rem(40px);
    appearance: none;
    display: block;
    width: 100%;
    padding: 0 $spacing-2xl 0 $spacing-md;
    color: $text-01;
    background-color: $field-01;
    border: none;
    box-shadow: 0 1px 0 0 $ui-05;
    border-radius: 0;
    cursor: pointer;
    border-bottom: 1px solid transparent;

    // Hide default select arrow in IE10+
    &::-ms-expand {
      display: none;
    }

    &:focus {
      outline: none;
      box-shadow: 0 2px 0 0 $brand-01;
    }

    &[data-invalid],
    &[data-invalid]:focus {
      box-shadow: 0 2px 0 0 $support-01;
    }

    &:focus ~ .#{$prefix}--label {
      color: $brand-01;
    }

    &[data-invalid]:focus ~ .#{$prefix}--label {
      color: $support-01;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    ~ .#{$prefix}--form-requirement {
      color: $support-01;
      font-weight: 400;
      margin-top: $spacing-2xs;

      &::before {
        display: none;
      }
    }
  }

  .#{$prefix}--select--light .#{$prefix}--select-input {
    background: $field-02;
  }

  .#{$prefix}--select__arrow {
    fill: $brand-01;
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    width: rem(10px);
    height: rem(5px);
    pointer-events: none;
  }

  &[data-invalid] ~ .#{$prefix}--select__arrow {
    bottom: 2.25rem;
  }

  .#{$prefix}--select-optgroup,
  .#{$prefix}--select-option {
    color: $text-01; // For the options to show in IE11
  }

  .#{$prefix}--select-option[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // Override some Firefox user-agent styles
  @-moz-document url-prefix() {
    .#{$prefix}--select-option {
      background-color: $ui-01;
      color: $text-01;
    }

    .#{$prefix}--select-optgroup {
      color: $text-01;
    }
  }

  .#{$prefix}--select--inline {
    display: grid;
    grid-template-columns: auto auto auto;

    // Targets IE10+ browsers: Display grid auto not supported
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .#{$prefix}--label,
    .#{$prefix}--form__helper-text,
    .#{$prefix}--select-input {
      grid-row-start: 2;
    }

    .#{$prefix}--label {
      white-space: nowrap;
      margin: 0 $spacing-xs 0 0;
      font-weight: 400;
      align-self: center;
    }

    .#{$prefix}--form__helper-text {
      grid-column-start: 3;
      align-self: center;
      margin-bottom: 0;
    }

    .#{$prefix}--select-input {
      background-color: transparent;
      color: $brand-01;
      font-weight: 600;
      box-shadow: none;

      &:hover {
        background-color: $color__white;
      }

      &:focus {
        @include focus-outline('border');
      }

      ~ .#{$prefix}--select__arrow,
      ~ .#{$prefix}--form-requirement {
        grid-column-start: 2;
      }

      ~ .#{$prefix}--select__arrow {
        position: relative;
        top: calc(100% + 1rem);
        grid-row-start: 1;
        justify-self: end;
      }

      &[data-invalid] {
        color: $text-01;
        outline-offset: 2px;

        &:focus {
          outline: 1px solid $support-01;
          box-shadow: none;
        }
      }

      &:disabled ~ * {
        opacity: 0.5;
        cursor: not-allowed;
      }

      ~ .#{$prefix}--form-requirement {
        grid-row-start: 3;

        // Targets IE10+ browsers: Display grid auto not supported
        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
          position: absolute;
          bottom: -1.5rem;
        }
      }
    }
  }

  //Skeleton State
  .#{$prefix}--select.#{$prefix}--skeleton {
    @include skeleton;
    width: 100%;
    height: 2.5rem;
  }

  .#{$prefix}--select.#{$prefix}--skeleton .#{$prefix}--select-input {
    display: none;
  }
}
```

</details>

- **Group**: [select](#select)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-2xl [variable]](#spacing-2xl-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [text-01 [variable]](#text-01-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [support-01 [variable]](#support-01-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [field-02 [variable]](#field-02-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [color\_\_white [variable]](#color__white-variable)

### ❌select--x [mixin]

v10 select

<details>
<summary>Source code</summary>

```scss
@mixin select--x() {
  .#{$prefix}--select {
    @include reset;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .#{$prefix}--select-input__wrapper {
    position: relative;
    display: flex;
    align-items: center;

    &:hover .#{$prefix}--select-input {
      background-color: $hover-ui;
    }
  }

  .#{$prefix}--select-input {
    @include type-style('body-short-01');
    @include focus-outline('reset');
    height: rem(40px);
    appearance: none;
    display: block;
    width: rem(224px);
    min-width: rem(128px);
    max-width: rem(448px);
    padding: 0 rem(42px) 0 $carbon--spacing-05; // 1.5rem + chevron width
    color: $text-01;
    background-color: $field-01;
    border: none;
    border-bottom: 1px solid $ui-04;
    border-radius: 0;
    cursor: pointer;
    transition: outline $duration--fast-01, background-color $duration--fast-01;

    &:hover {
      background-color: $hover-ui;
    }

    // Hide default select arrow in IE10+
    &::-ms-expand {
      display: none;
    }

    // Select text renders a little high on Firefox
    @-moz-document url-prefix() {
      padding-top: rem(4px);
    }

    &:focus {
      @include focus-outline('outline');
    }

    &:disabled,
    &:hover:disabled {
      cursor: not-allowed;
      background-color: $disabled-background-color;
      color: $disabled-02;
      border-bottom-color: $disabled-background-color;
    }
  }

  .#{$prefix}--select--disabled .#{$prefix}--label,
  .#{$prefix}--select--disabled .#{$prefix}--form__helper-text {
    color: $disabled-02;
  }

  .#{$prefix}--select-input__wrapper[data-invalid] .#{$prefix}--select-input {
    padding-right: rem(64px); // 1rem + chevron width + invalid icon width
  }

  .#{$prefix}--select-input__wrapper[data-invalid] .#{$prefix}--select-input,
  .#{$prefix}--select-input__wrapper[data-invalid]
    .#{$prefix}--select-input:focus {
    @include focus-outline('invalid');
  }

  .#{$prefix}--form-requirement {
    display: block;
    color: $support-01;
    font-weight: 400;
    overflow: visible;
  }

  .#{$prefix}--select-input:disabled ~ .#{$prefix}--select__arrow {
    fill: $disabled-02;
  }

  .#{$prefix}--select--light .#{$prefix}--select-input {
    background-color: $field-02;

    &:hover {
      background-color: $ui-01;
    }

    &:disabled,
    &:hover:disabled {
      cursor: not-allowed;
      background-color: $disabled-background-color;
      color: $disabled-02;
    }
  }

  .#{$prefix}--select__arrow {
    fill: $ui-05;
    position: absolute;
    right: 1rem;
    pointer-events: none;
  }

  .#{$prefix}--select-input__wrapper[data-invalid]
    .#{$prefix}--select-input
    ~ .#{$prefix}--select__invalid-icon {
    position: absolute;
    right: rem(34px); // 1.5rem + chevron width
  }

  .#{$prefix}--select-input__wrapper[data-invalid]
    .#{$prefix}--select-input
    ~ .#{$prefix}--select__invalid-icon {
    fill: $support-01;
  }

  .#{$prefix}--select-optgroup,
  .#{$prefix}--select-option {
    color: $text-01; // For the options to show in IE11
  }

  .#{$prefix}--select-option[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // Override some Firefox user-agent styles
  @-moz-document url-prefix() {
    .#{$prefix}--select-option {
      background-color: $ui-01;
      color: $text-01;
    }

    .#{$prefix}--select-optgroup {
      color: $text-01;
    }
  }

  .#{$prefix}--select--inline {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .#{$prefix}--select--inline.#{$prefix}--select--invalid .#{$prefix}--label,
  .#{$prefix}--select--inline.#{$prefix}--select--invalid
    .#{$prefix}--form__helper-text {
    margin-top: rem(13px);
    align-self: flex-start;
  }

  .#{$prefix}--select--inline .#{$prefix}--form__helper-text {
    margin-bottom: 0;
    margin-left: rem(8px);
  }

  .#{$prefix}--select--inline .#{$prefix}--label {
    white-space: nowrap;
    margin: 0 $carbon--spacing-03 0 0;
  }

  .#{$prefix}--select--inline .#{$prefix}--select-input {
    background-color: transparent;
    color: $text-01;
    border-bottom: none;
    padding-left: $carbon--spacing-03;
    padding-right: rem(26px);

    @-moz-document url-prefix() {
      padding-top: 0;
    }

    &:hover {
      background-color: $hover-ui;
    }
  }

  .#{$prefix}--select--inline .#{$prefix}--select__arrow {
    bottom: auto;
    top: 1.125rem;
    right: $carbon--spacing-03;
  }

  .#{$prefix}--select--inline.#{$prefix}--select--invalid
    .#{$prefix}--select-input {
    padding-right: rem(50px);
  }

  .#{$prefix}--select--inline.#{$prefix}--select--invalid
    .#{$prefix}--select-input
    ~ .#{$prefix}--select__invalid-icon {
    right: rem(24px);
  }

  .#{$prefix}--select--inline .#{$prefix}--select-input:disabled {
    color: $disabled;
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
    }

    ~ * {
      cursor: not-allowed;
    }
  }

  .#{$prefix}--select--inline .#{$prefix}--select-input:disabled {
    cursor: not-allowed;
  }

  //Skeleton State
  .#{$prefix}--select.#{$prefix}--skeleton {
    @include skeleton;
    width: 100%;
    height: 2.5rem;
  }

  .#{$prefix}--select.#{$prefix}--skeleton .#{$prefix}--select-input {
    display: none;
  }
}
```

</details>

- **Group**: [select](#select)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [text-01 [variable]](#text-01-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [duration--fast-01 [variable]](#duration--fast-01-variable)
  - [disabled-background-color [variable]](#disabled-background-color-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [support-01 [variable]](#support-01-variable)
  - [field-02 [variable]](#field-02-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [disabled [variable]](#disabled-variable)

## slider

### ❌slider [mixin]

v9 slider

<details>
<summary>Source code</summary>

```scss
@mixin slider() {
  .#{$prefix}--slider-container {
    display: flex;
    align-items: center;
    user-select: none;
  }

  .#{$prefix}--slider {
    position: relative;
    width: 100%;
    margin: 0 $spacing-md;
    max-width: rem(640px);
    min-width: rem(200px);
    order: 1;
  }

  .#{$prefix}--slider__range-label:first-of-type {
    order: 0;
  }

  .#{$prefix}--slider-text-input {
    order: 3;
  }

  .#{$prefix}--slider--disabled {
    opacity: 0.5;
  }

  .#{$prefix}--slider--disabled .#{$prefix}--slider__thumb {
    &:hover {
      transform: translate(-50%, -50%);
    }
    &:focus {
      box-shadow: none;
      outline: none;
    }
    &:active {
      background: $hover-secondary;
      transform: translate(-50%, -50%);
    }
  }

  .#{$prefix}--slider__range-label {
    @include typescale('zeta');
    color: $text-02;

    &:last-of-type {
      margin-right: $spacing-md;
      order: 2;
    }
  }

  .#{$prefix}--slider__track {
    position: absolute;
    width: 100%;
    height: rem(4px);
    background: $ui-04;
    cursor: pointer;
    transform: translate(0%, -50%);
  }

  .#{$prefix}--slider__filled-track {
    position: absolute;
    width: 100%;
    height: rem(4px);
    background: $brand-01;
    transform-origin: left;
    pointer-events: none;
    transform: translate(0%, -50%);
  }

  .#{$prefix}--slider__thumb {
    position: absolute;
    height: rem(24px);
    width: rem(24px);
    background: $brand-01;
    border-radius: 50%;
    top: 0;
    transform: translate(-50%, -50%);
    transition: transform 100ms $carbon--standard-easing, background 100ms
        $carbon--standard-easing;
    cursor: pointer;
    outline: none;
    z-index: 2;

    &--clicked {
      transition: left $transition--base $carbon--standard-easing;
    }

    &:hover {
      transform: translate(-50%, -50%) scale(1.05);
    }
    &:focus {
      @include focus-outline('blurred');
    }
    &:active {
      background: darken($brand-01, 5%);
      transform: translate(-50%, -50%) scale(1.25);
    }
  }

  .#{$prefix}--slider__input {
    display: none;
  }

  .#{$prefix}--slider-text-input,
  .#{$prefix}-slider-text-input {
    width: rem(60px);
    min-width: rem(60px);
    height: 2rem;
    padding: 0;
    text-align: center;
    font-weight: 600;
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      display: none;
    }
  }

  // Skeleton state
  .#{$prefix}--slider-container.#{$prefix}--skeleton
    .#{$prefix}--slider__range-label {
    @include skeleton;
    width: rem(20px);
    height: rem(12px);
  }

  .#{$prefix}--slider-container.#{$prefix}--skeleton
    .#{$prefix}--slider__track {
    cursor: default;
    pointer-events: none;
  }

  .#{$prefix}--slider-container.#{$prefix}--skeleton
    .#{$prefix}--slider__thumb {
    left: 50%;
    cursor: default;
    pointer-events: none;
  }
}
```

</details>

- **Group**: [slider](#slider)
- **Requires**:
  - [typescale [mixin]](#typescale-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [hover-secondary [variable]](#hover-secondary-variable)
  - [text-02 [variable]](#text-02-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [transition--base [variable]](#transition--base-variable)

### ❌slider--x [mixin]

v10 slider

<details>
<summary>Source code</summary>

```scss
@mixin slider--x() {
  .#{$prefix}--slider-container {
    display: flex;
    align-items: center;
    user-select: none;
  }

  .#{$prefix}--slider {
    position: relative;
    width: 100%;
    margin: 0 $carbon--spacing-05;
    max-width: rem(640px);
    min-width: rem(200px);
  }

  .#{$prefix}--slider__range-label {
    @include type-style('code-02');
    color: $text-01;

    &:last-of-type {
      margin-right: $carbon--spacing-05;
    }
  }

  .#{$prefix}--slider__track {
    position: absolute;
    width: 100%;
    height: rem(2px);
    background: $ui-03;
    cursor: pointer;
    transform: translate(0%, -50%);
  }

  .#{$prefix}--slider__track:before {
    content: '';
    position: absolute;
    display: inline-block;
    height: rem(4px);
    width: rem(2px);
    left: 50%;
    transform: translate(-50%, 0);
    top: rem(-5px);
    background: $ui-03;
  }

  .#{$prefix}--slider__filled-track {
    position: absolute;
    width: 100%;
    height: rem(2px);
    background: $ui-05;
    transform-origin: left;
    pointer-events: none;
    transform: translate(0%, -50%);
    transition: background $duration--fast-01 motion(standard, productive);
  }

  .#{$prefix}--slider__thumb {
    position: absolute;
    height: rem(14px);
    width: rem(14px);
    background: $ui-05;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px transparent, inset 0 0 0 2px transparent;
    top: 0;
    transform: translate(-50%, -50%);
    transition: transform $duration--fast-01 motion(standard, productive), background
        $duration--fast-01 motion(standard, productive),
      box-shadow $duration--fast-01 motion(standard, productive);
    cursor: pointer;
    outline: none;
    z-index: 3;

    &:hover {
      // 20px / 14px = 1.4285714286
      transform: translate(-50%, -50%) scale(1.4285714286);
    }

    &:focus {
      // 20px / 14px = 1.4285714286
      transform: translate(-50%, -50%) scale(1.4285714286);
      box-shadow: inset 0 0 0 2px $interactive-01, inset 0 0 0 3px $ui-01;
      background-color: $interactive-01;
    }

    &:active {
      transform: translate(-50%, -50%) scale(1.4285714286);
      box-shadow: inset 0 0 0 2px $interactive-01;
    }
  }

  .#{$prefix}--slider__input {
    display: none;
  }

  .#{$prefix}--slider-text-input,
  .#{$prefix}-slider-text-input {
    width: rem(64px);
    height: rem(40px);
    padding: 0;
    text-align: center;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      display: none;
    }
  }

  .#{$prefix}--slider__thumb:focus ~ .#{$prefix}--slider__filled-track {
    background-color: $interactive-01;
  }

  // Disabled state
  .#{$prefix}--label--disabled
    ~ .#{$prefix}--slider-container
    > .#{$prefix}--slider__range-label {
    color: $disabled-02;
  }

  .#{$prefix}--slider--disabled .#{$prefix}--slider__thumb {
    background-color: $ui-03;

    &:hover {
      transform: translate(-50%, -50%);
      cursor: not-allowed;
    }

    &:focus {
      box-shadow: none;
      outline: none;
      background-color: $ui-03;
      transform: translate(-50%, -50%);
    }

    &:active {
      background: $ui-03;
      transform: translate(-50%, -50%);
    }
  }

  .#{$prefix}--slider--disabled .#{$prefix}--slider__track,
  .#{$prefix}--slider--disabled .#{$prefix}--slider__filled-track,
  .#{$prefix}--slider--disabled
    .#{$prefix}--slider__thumb:focus
    ~ .#{$prefix}--slider__filled-track {
    background-color: $ui-03;
    cursor: not-allowed;
  }

  .#{$prefix}--slider--disabled
    ~ .#{$prefix}--form-item
    .#{$prefix}--slider-text-input,
  .#{$prefix}--slider--disabled ~ .#{$prefix}--slider-text-input {
    background-color: $disabled-01;
    color: $disabled-02;
    transition: none;

    &:active,
    &:focus,
    &:hover {
      outline: none;
      color: $disabled-02;
    }
  }

  // Skeleton state
  .#{$prefix}--slider-container.#{$prefix}--skeleton
    .#{$prefix}--slider__range-label {
    @include skeleton;
    width: rem(20px);
    height: rem(12px);
  }

  .#{$prefix}--slider-container.#{$prefix}--skeleton
    .#{$prefix}--slider__track {
    cursor: default;
    pointer-events: none;
  }

  .#{$prefix}--slider-container.#{$prefix}--skeleton
    .#{$prefix}--slider__thumb {
    left: 50%;
    cursor: default;
    pointer-events: none;
  }
}
```

</details>

- **Group**: [slider](#slider)
- **Requires**:
  - [type-style [mixin]](#type-style-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [motion [function]](#motion-function)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [duration--fast-01 [variable]](#duration--fast-01-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [disabled-01 [variable]](#disabled-01-variable)

## structured-list

### ❌padding-td--condensed [mixin]

Used only for `.#{prefix}--structured-list--condensed`

<details>
<summary>Source code</summary>

```scss
@mixin padding-td--condensed($padding: $structured-list-padding) {
  padding: $padding / 4;
  padding-left: 0;
}
```

</details>

- **Parameters**:

| Name       | Description | Type     | Default value              |
| ---------- | ----------- | -------- | -------------------------- |
| `$padding` | —           | `Number` | `$structured-list-padding` |

- **Group**: [structured-list](#structured-list)
- **Requires**:
  - [padding [variable]](#padding-variable)
- **Used by**:
  - [structured-list [mixin]](#structured-list-mixin)

### ❌padding--data-structured-list [mixin]

Used only for [data-structured-list]

<details>
<summary>Source code</summary>

```scss
@mixin padding--data-structured-list($padding: $structured-list-padding) {
  padding-left: $padding / 2;
  padding-right: $padding / 2;

  // Controls gutter sizes for check
  &:first-child {
    padding-left: $padding / 2;
    padding-right: $padding / 4;
  }

  &:last-child {
    padding-right: $padding;
  }
}
```

</details>

- **Parameters**:

| Name       | Description | Type     | Default value              |
| ---------- | ----------- | -------- | -------------------------- |
| `$padding` | —           | `Number` | `$structured-list-padding` |

- **Group**: [structured-list](#structured-list)
- **Requires**:
  - [padding [variable]](#padding-variable)
- **Used by**:
  - [structured-list [mixin]](#structured-list-mixin)

### ❌padding-td [mixin]

Used only for normal structured-list

<details>
<summary>Source code</summary>

```scss
@mixin padding-td($padding: $structured-list-padding) {
  padding-left: 0;
  padding-right: $padding;
  padding-top: $spacing-md;
  padding-bottom: $spacing-md;

  &:last-child {
    padding-right: $padding;
  }
}
```

</details>

- **Parameters**:

| Name       | Description | Type     | Default value              |
| ---------- | ----------- | -------- | -------------------------- |
| `$padding` | —           | `Number` | `$structured-list-padding` |

- **Group**: [structured-list](#structured-list)
- **Requires**:
  - [padding [variable]](#padding-variable)
  - [spacing-md [variable]](#spacing-md-variable)
- **Used by**:
  - [structured-list [mixin]](#structured-list-mixin)

### ❌padding-th [mixin]

Used only for normal structured-list

<details>
<summary>Source code</summary>

```scss
@mixin padding-th($padding: $structured-list-padding) {
  padding-left: 0;
  padding-right: $padding;
  padding-top: $spacing-md;
  padding-bottom: $spacing-md;

  &:last-child {
    padding-right: 0;
  }
}
```

</details>

- **Parameters**:

| Name       | Description | Type     | Default value              |
| ---------- | ----------- | -------- | -------------------------- |
| `$padding` | —           | `Number` | `$structured-list-padding` |

- **Group**: [structured-list](#structured-list)
- **Requires**:
  - [padding [variable]](#padding-variable)
  - [spacing-md [variable]](#spacing-md-variable)
- **Used by**:
  - [structured-list [mixin]](#structured-list-mixin)

### ❌padding-td--condensed--x [mixin]

Used only for experimental `.#{prefix}--structured-list--condensed`

<details>
<summary>Source code</summary>

```scss
@mixin padding-td--condensed--x($padding: $structured-list-padding) {
  padding: $padding / 4;
  padding-left: 0;
}
```

</details>

- **Parameters**:

| Name       | Description | Type     | Default value              |
| ---------- | ----------- | -------- | -------------------------- |
| `$padding` | —           | `Number` | `$structured-list-padding` |

- **Group**: [structured-list](#structured-list)
- **Requires**:
  - [padding [variable]](#padding-variable)
- **Used by**:
  - [structured-list--x [mixin]](#structured-list--x-mixin)

### ❌padding--data-structured-list--x [mixin]

Used only for experimental [data-structured-list]

<details>
<summary>Source code</summary>

```scss
@mixin padding--data-structured-list--x($padding: $structured-list-padding) {
  padding-left: $padding / 2;
  padding-right: $padding / 2;

  // Controls gutter sizes for check
  &:first-child {
    padding-left: $padding / 2;
    padding-right: $padding / 2;
  }
}
```

</details>

- **Parameters**:

| Name       | Description | Type     | Default value              |
| ---------- | ----------- | -------- | -------------------------- |
| `$padding` | —           | `Number` | `$structured-list-padding` |

- **Group**: [structured-list](#structured-list)
- **Requires**:
  - [padding [variable]](#padding-variable)
- **Used by**:
  - [structured-list--x [mixin]](#structured-list--x-mixin)

### ❌padding-th--x [mixin]

Used only for experimental normal structured-list

<details>
<summary>Source code</summary>

```scss
@mixin padding-th--x($padding: $structured-list-padding) {
  padding-left: $carbon--spacing-05;
  padding-right: $carbon--spacing-05;
  padding-top: $carbon--spacing-05;
  padding-bottom: $carbon--spacing-03;
}
```

</details>

- **Parameters**:

| Name       | Description | Type     | Default value              |
| ---------- | ----------- | -------- | -------------------------- |
| `$padding` | —           | `Number` | `$structured-list-padding` |

- **Group**: [structured-list](#structured-list)
- **Requires**:
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
- **Used by**:
  - [structured-list--x [mixin]](#structured-list--x-mixin)

### ❌padding-td--x [mixin]

Used only for experimental normal structured-list

<details>
<summary>Source code</summary>

```scss
@mixin padding-td--x($padding: $structured-list-padding) {
  padding-top: $carbon--spacing-05;
  padding-right: $carbon--spacing-05;
  padding-bottom: $carbon--spacing-06;
  padding-left: $carbon--spacing-05;
}
```

</details>

- **Parameters**:

| Name       | Description | Type     | Default value              |
| ---------- | ----------- | -------- | -------------------------- |
| `$padding` | —           | `Number` | `$structured-list-padding` |

- **Group**: [structured-list](#structured-list)
- **Requires**:
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [carbon--spacing-06 [variable]](#carbon--spacing-06-variable)
- **Used by**:
  - [structured-list--x [mixin]](#structured-list--x-mixin)

### ❌structured-list [mixin]

v9 structured-list

<details>
<summary>Source code</summary>

```scss
@mixin structured-list() {
  .#{$prefix}--structured-list--selection .#{$prefix}--structured-list-td,
  .#{$prefix}--structured-list--selection .#{$prefix}--structured-list-th {
    @include padding--data-structured-list;
  }

  // Deprecated
  [data-structured-list] .#{$prefix}--structured-list-td,
  [data-structured-list] .#{$prefix}--structured-list-th {
    @include padding--data-structured-list;
  }

  .#{$prefix}--structured-list-input {
    display: none;

    &:checked
      + .#{$prefix}--structured-list-row
      .#{$prefix}--structured-list-svg,
    &:checked
      + .#{$prefix}--structured-list-td
      .#{$prefix}--structured-list-svg {
      fill: $brand-02;
    }
  }

  .#{$prefix}--structured-list {
    @include reset;
    @include font-family;
    display: table;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    min-width: 500px;
    border-collapse: collapse;
    border-spacing: 0;
    margin-bottom: 5rem;
    background-color: transparent;

    &.#{$prefix}--structured-list--border {
      border: 1px solid $ui-03;
      background-color: $ui-01;
    }

    &.#{$prefix}--structured-list--condensed .#{$prefix}--structured-list-td,
    &.#{$prefix}--structured-list--condensed .#{$prefix}--structured-list-th {
      @include padding-td--condensed;
    }
  }

  .#{$prefix}--structured-list-row {
    display: table-row;
    border-bottom: 1px solid $ui-03;
    transition: $transition--base $carbon--standard-easing;

    // Deprecated
    [data-structured-list]
      &:hover:not(.#{$prefix}--structured-list-row--header-row) {
      background-color: $hover-row;
      cursor: pointer;
    }

    &.#{$prefix}--structured-list-row--selected {
      background-color: $hover-row;
    }

    &.#{$prefix}--structured-list-row--header-row {
      border-bottom: 2px solid $brand-01;
      cursor: inherit;
    }

    &:focus:not(.#{$prefix}--structured-list-row--header-row) {
      @include focus-outline('border');
    }

    &:hover .#{$prefix}--structured-list-svg {
      fill: $hover-row;
    }
  }

  .#{$prefix}--structured-list--selection
    .#{$prefix}--structured-list-row:hover:not(.#{$prefix}--structured-list-row--header-row) {
    background-color: $hover-row;
    cursor: pointer;
  }

  .#{$prefix}--structured-list-thead {
    display: table-header-group;
    vertical-align: middle;
  }

  .#{$prefix}--structured-list-th {
    @include reset;
    @include padding-th;
    @include typescale('omega');
    display: table-cell;
    font-weight: 600;
    height: rem(40px);
    text-align: left;
    text-transform: $structured-list-text-transform;
    vertical-align: bottom;
  }

  .#{$prefix}--structured-list-tbody {
    display: table-row-group;
    vertical-align: middle;
  }

  .#{$prefix}--structured-list-td {
    @include reset;
    @include typescale('zeta');
    @include line-height('body');
    @include padding-td;
    position: relative;
    display: table-cell;
  }

  .#{$prefix}--structured-list-th,
  .#{$prefix}--structured-list-td {
    color: $text-01;
  }

  .#{$prefix}--structured-list-content--nowrap {
    white-space: nowrap;
  }

  .#{$prefix}--structured-list-svg {
    display: inline-block;
    fill: transparent;
    vertical-align: middle;
    transition: $transition--base $carbon--standard-easing;
  }

  // Skeleton State
  .#{$prefix}--structured-list.#{$prefix}--skeleton {
    .#{$prefix}--structured-list-th {
      &:first-child {
        width: 8%;
      }

      &:nth-child(3n + 2) {
        width: 30%;
      }

      &:nth-child(3n + 3) {
        width: 15%;
      }
    }

    .#{$prefix}--structured-list-th span {
      @include skeleton;
      width: 75%;
      height: 1rem;
      display: block;
    }
  }

  .#{$prefix}--structured-list.#{$prefix}--structured-list--border.#{$prefix}--skeleton {
    .#{$prefix}--structured-list-th:first-child {
      width: 5%;

      span {
        display: none;
      }
    }
  }

  // Deprecated class
  .#{$prefix}--structured-list-content {
    @include typescale('zeta');
  }
}
```

</details>

- **Group**: [structured-list](#structured-list)
- **Requires**:
  - [padding--data-structured-list [mixin]](#padding--data-structured-list-mixin)
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [padding-td--condensed [mixin]](#padding-td--condensed-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [padding-th [mixin]](#padding-th-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [line-height [mixin]](#line-height-mixin)
  - [padding-td [mixin]](#padding-td-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [brand-02 [variable]](#brand-02-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [transition--base [variable]](#transition--base-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [hover-row [variable]](#hover-row-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [structured-list-text-transform [variable]](#structured-list-text-transform-variable)
  - [text-01 [variable]](#text-01-variable)

### ❌structured-list--x [mixin]

v10 structured-list

<details>
<summary>Source code</summary>

```scss
@mixin structured-list--x() {
  .#{$prefix}--structured-list--selection .#{$prefix}--structured-list-td,
  .#{$prefix}--structured-list--selection .#{$prefix}--structured-list-th {
    @include padding--data-structured-list--x;
  }

  .#{$prefix}--structured-list-input {
    display: none;
  }

  .#{$prefix}--structured-list {
    @include reset;
    display: table;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    min-width: 500px;
    border-collapse: collapse;
    border-spacing: 0;
    margin-bottom: 5rem;
    background-color: transparent;

    &.#{$prefix}--structured-list--condensed .#{$prefix}--structured-list-td,
    &.#{$prefix}--structured-list--condensed .#{$prefix}--structured-list-th {
      @include padding-td--condensed--x;
    }
  }

  .#{$prefix}--structured-list-row {
    display: table-row;
    border-bottom: 1px solid $ui-03;
  }

  .#{$prefix}--structured-list--selection
    .#{$prefix}--structured-list-row:hover:not(.#{$prefix}--structured-list-row--header-row):not(.#{$prefix}--structured-list-row--selected) {
    background-color: $ui_01;
    cursor: pointer;
    border-bottom: 1px solid $ui-01;
  }

  .#{$prefix}--structured-list-row.#{$prefix}--structured-list-row--selected {
    background-color: $ui-03;
  }

  .#{$prefix}--structured-list-row.#{$prefix}--structured-list-row--header-row {
    border-bottom: 1px solid $ui-03;
    cursor: inherit;
  }

  .#{$prefix}--structured-list-row:focus:not(.#{$prefix}--structured-list-row--header-row) {
    @include focus-outline('outline');
  }

  .#{$prefix}--structured-list--selection
    .#{$prefix}--structured-list-row:hover:not(.#{$prefix}--structured-list-row--header-row)
    > .#{$prefix}--structured-list-td,
  .#{$prefix}--structured-list-row.#{$prefix}--structured-list-row--selected
    > .#{$prefix}--structured-list-td {
    color: $text-01;
  }

  .#{$prefix}--structured-list--selection
    .#{$prefix}--structured-list-row:hover:not(.#{$prefix}--structured-list-row--header-row)
    > .#{$prefix}--structured-list-td {
    border-top: 1px solid $ui-01;
  }

  .#{$prefix}--structured-list-thead {
    display: table-header-group;
    vertical-align: middle;
  }

  .#{$prefix}--structured-list-th {
    @include reset;
    @include padding-th--x;
    @include type-style('heading-01');
    display: table-cell;
    font-weight: 600;
    height: rem(40px);
    text-align: left;
    text-transform: $structured-list-text-transform;
    vertical-align: bottom;
  }

  .#{$prefix}--structured-list-tbody {
    display: table-row-group;
    vertical-align: middle;
  }

  .#{$prefix}--structured-list-td {
    @include reset;
    @include type-style('body-long-01');
    @include padding-td--x;
    line-height: carbon--rem(21px);
    position: relative;
    display: table-cell;
    max-width: 36rem;
  }

  .#{$prefix}--structured-list-th {
    color: $text-01;
  }
  .#{$prefix}--structured-list-td {
    color: $text-02;
  }

  .#{$prefix}--structured-list-content--nowrap {
    white-space: nowrap;
  }

  .#{$prefix}--structured-list-svg {
    display: inline-block;
    fill: transparent;
    vertical-align: middle;
    transition: $duration--fast-02 motion(standard, productive);
  }

  .#{$prefix}--structured-list-row:hover .#{$prefix}--structured-list-svg {
    fill: $ibm-color__gray-40;
  }

  .#{$prefix}--structured-list-input:checked
    + .#{$prefix}--structured-list-row
    .#{$prefix}--structured-list-svg,
  .#{$prefix}--structured-list-input:checked
    + .#{$prefix}--structured-list-td
    .#{$prefix}--structured-list-svg {
    fill: $text-01;
  }

  // Skeleton State
  .#{$prefix}--structured-list.#{$prefix}--skeleton {
    .#{$prefix}--structured-list-th {
      &:first-child {
        width: 8%;
      }

      &:nth-child(3n + 2) {
        width: 30%;
      }

      &:nth-child(3n + 3) {
        width: 15%;
      }
    }

    .#{$prefix}--structured-list-th span {
      @include skeleton;
      width: 75%;
      height: 1rem;
      display: block;
    }
  }

  .#{$prefix}--structured-list.#{$prefix}--skeleton
    .#{$prefix}--structured-list-th
    span {
    @include skeleton;
    width: 75%;
    height: 1rem;
    display: block;
  }

  .#{$prefix}--structured-list.#{$prefix}--structured-list--border.#{$prefix}--skeleton
    .#{$prefix}--structured-list-th:first-child {
    width: 5%;

    span {
      display: none;
    }
  }
}
```

</details>

- **Group**: [structured-list](#structured-list)
- **Requires**:
  - [padding--data-structured-list--x [mixin]](#padding--data-structured-list--x-mixin)
  - [reset [mixin]](#reset-mixin)
  - [padding-td--condensed--x [mixin]](#padding-td--condensed--x-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [padding-th--x [mixin]](#padding-th--x-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [padding-td--x [mixin]](#padding-td--x-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [carbon--rem [function]](#carbon--rem-function)
  - [motion [function]](#motion-function)
  - [prefix [variable]](#prefix-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [structured-list-text-transform [variable]](#structured-list-text-transform-variable)
  - [text-02 [variable]](#text-02-variable)
  - [duration--fast-02 [variable]](#duration--fast-02-variable)

## tabs

### ❌tabs [mixin]

v9 tabs

<details>
<summary>Source code</summary>

```scss
@mixin tabs() {
  .#{$prefix}--tabs {
    @include typescale('zeta');
    @include font-smoothing;
    @include font-family;
    color: $text-01;
    font-weight: 600;
    height: auto;
    width: 100%;
    position: relative;

    @include breakpoint(bp--sm--major) {
      background: none;
      min-height: rem(49px);
    }
  }

  .#{$prefix}--tabs-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $spacing-md;
    height: rem(40px);
    cursor: pointer;
    background-color: $field-01;
    box-shadow: 0 1px 0 0 $ui-05;

    svg {
      width: rem(10px);
      height: rem(5px);
      fill: $brand-01;
    }

    &:focus {
      outline: none;
      box-shadow: 0 2px 0 0 $brand-01;
    }

    @include breakpoint(bp--sm--major) {
      display: none;
    }
  }

  // There is only a difference in tab color when in mobile/dropdown view
  .#{$prefix}--tabs--light.#{$prefix}--tabs-trigger {
    background-color: $field-02;
  }

  .#{$prefix}--tabs-trigger-text {
    text-decoration: none;
    font-weight: 600;
    color: $text-01;

    &:focus {
      @include focus-outline('border');
    }
  }

  .#{$prefix}--tabs__nav {
    @include layer('overlay');
    margin: 0;
    padding: 0;
    position: absolute;
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    z-index: z('dropdown');
    background: $ui-01;

    @include breakpoint(bp--sm--major) {
      @include typescale('epsilon');
      flex-direction: row;
      padding-right: $spacing-md;
      padding-left: $spacing-md;
      background: none;
      box-shadow: none;
      z-index: auto;
    }

    @include breakpoint(bp--lg--major) {
      padding-left: 0;
    }
  }

  .#{$prefix}--tabs__nav--hidden {
    display: none;

    @include breakpoint(bp--sm--major) {
      display: flex;
    }
  }

  .#{$prefix}--tabs__nav-item {
    @include typescale('zeta');
    background-color: $ui-01;
    padding: 0;
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: $hover-row;

      @include breakpoint(bp--sm--major) {
        outline: 1px solid transparent;
        background: transparent;
      }
    }

    @include breakpoint(bp--sm--major) {
      background: transparent;
      padding: $spacing-sm 0 $spacing-sm;

      & + .#{$prefix}--tabs__nav-item {
        margin-left: rem(48px);
      }
    }
  }

  .#{$prefix}--tabs__nav-item--selected {
    border: none;

    @include breakpoint(bp--sm--major) {
      border-bottom: 2px solid $brand-01;

      .#{$prefix}--tabs__nav-link {
        color: $brand-01;

        &:focus {
          color: $brand-01;
        }
      }
    }
  }

  .#{$prefix}--tabs__nav-item:hover .#{$prefix}--tabs__nav-link {
    color: $text-01;

    @include breakpoint(bp--sm--major) {
      color: $hover-secondary;
    }
  }

  .#{$prefix}--tabs__nav-link {
    display: inline-block;
    color: $text-01;
    text-decoration: none;
    padding: $spacing-md;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:focus,
    &:active {
      outline: 1px solid transparent;
      background-color: $brand-01;
      color: $inverse-01;
    }

    @include breakpoint(bp--sm--major) {
      padding: 0 $spacing-3xs;
      width: auto;

      &:hover {
        color: $brand-01;
      }

      &:focus,
      &:active {
        background-color: transparent;
        color: $text-01;
        outline: 1px solid transparent;
        box-shadow: 0 0 0 1px $brand-01;
      }
    }
  }

  // Skeleton state
  .#{$prefix}--tabs.#{$prefix}--skeleton {
    pointer-events: none;
    cursor: default;
  }

  .#{$prefix}--tabs.#{$prefix}--skeleton .#{$prefix}--tabs__nav-link {
    @include skeleton;
    width: rem(75px);
    height: rem(12px);
  }

  .#{$prefix}--tabs.#{$prefix}--skeleton .#{$prefix}--tabs-trigger {
    @include skeleton;
    width: rem(100px);
  }

  .#{$prefix}--tabs.#{$prefix}--skeleton .#{$prefix}--tabs-trigger svg {
    @include hidden;
  }
}
```

</details>

- **Group**: [tabs](#tabs)
- **Requires**:
  - [typescale [mixin]](#typescale-mixin)
  - [font-smoothing [mixin]](#font-smoothing-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [breakpoint [mixin]](#breakpoint-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [layer [mixin]](#layer-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [hidden [mixin]](#hidden-mixin)
  - [rem [function]](#rem-function)
  - [z [function]](#z-function)
  - [prefix [variable]](#prefix-variable)
  - [text-01 [variable]](#text-01-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [field-02 [variable]](#field-02-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [hover-row [variable]](#hover-row-variable)
  - [spacing-sm [variable]](#spacing-sm-variable)
  - [hover-secondary [variable]](#hover-secondary-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [spacing-3xs [variable]](#spacing-3xs-variable)

### ❌tabs--x [mixin]

v10 tabs

<details>
<summary>Source code</summary>

```scss
@mixin tabs--x() {
  .#{$prefix}--tabs {
    @include type-style('body-short-01');
    color: $text-01;
    height: auto;
    width: 100%;
    position: relative;
    @include carbon--breakpoint(md) {
      background: none;
      min-height: rem(48px);
    }
  }

  .#{$prefix}--tabs-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $carbon--spacing-05;
    height: rem(40px);
    cursor: pointer;
    color: $text-01;
    outline: 2px solid transparent;
    border-bottom: 1px solid $ui-04;
    background-color: $field-01;
    @include carbon--breakpoint(md) {
      display: none;
    }
  }

  .#{$prefix}--tabs-trigger:focus,
  .#{$prefix}--tabs-trigger:active {
    @include focus-outline('outline');
  }

  .#{$prefix}--tabs-trigger svg {
    width: rem(12px);
    height: rem(7px);
    fill: $ui-05;
    transition: transform $duration--moderate-01 motion(standard, productive);
  }

  .#{$prefix}--tabs-trigger--open:focus,
  .#{$prefix}--tabs-trigger--open:active {
    @include focus-outline('reset');
    transition: outline $duration--moderate-01 motion(standard, productive);
  }

  .#{$prefix}--tabs-trigger--open {
    background: $ui-03;
  }

  .#{$prefix}--tabs-trigger--open svg {
    @include rotate(-180deg, $duration--moderate-01, 50% 45%);
  }

  // There is only a difference in tab color when in mobile/dropdown view
  .#{$prefix}--tabs--light.#{$prefix}--tabs-trigger {
    background-color: $field-02;
  }

  .#{$prefix}--tabs-trigger-text {
    text-decoration: none;
    padding-top: 2px;
    color: $text-01;
    font-weight: 400;
  }

  .#{$prefix}--tabs-trigger-text:hover {
    color: $text-01;
  }

  .#{$prefix}--tabs-trigger-text:focus {
    outline: none;
  }

  .#{$prefix}--tabs__nav {
    @include layer('overlay');
    margin: 0;
    padding: 0;
    position: absolute;
    list-style: none;
    display: flex;
    flex-direction: column;
    z-index: z('dropdown');
    background: $ui-01;
    transition: max-height $duration--moderate-01 motion(standard, productive);
    max-height: 600px;
    width: 100%;

    @include carbon--breakpoint(md) {
      flex-direction: row;
      background: none;
      box-shadow: none;
      z-index: auto;
      transition: inherit;
      max-height: auto;
      width: auto;
    }
  }

  .#{$prefix}--tabs__nav--hidden {
    transition: max-height $duration--moderate-01 motion(standard, productive);
    overflow: hidden;
    max-height: 0;

    @include carbon--breakpoint(md) {
      display: flex;
      transition: inherit;
      overflow: visible;
      max-height: none;
    }
  }

  //-----------------------------
  // Item
  //-----------------------------
  .#{$prefix}--tabs__nav-item {
    background-color: $ui-01;
    padding: 0;
    cursor: pointer;
    width: 100%;
    height: rem(40px);
    @include carbon--breakpoint(md) {
      background: transparent;
      height: auto;
      & + .#{$prefix}--tabs__nav-item {
        margin-left: rem(2px);
      }
    }
  }

  //-----------------------------
  // Item Hover
  //-----------------------------
  .#{$prefix}--tabs__nav-item:hover:not(.#{$prefix}--tabs__nav-item--selected) {
    @include carbon--breakpoint(md) {
      background: transparent;
    }
  }

  .#{$prefix}--tabs__nav-item:hover:not(.#{$prefix}--tabs__nav-item--disabled) {
    background-color: $hover-ui;
    box-shadow: 0 -1px 0 $hover-ui;

    @include carbon--breakpoint(md) {
      background-color: transparent;
      box-shadow: none;
    }
  }

  //---------------------------------------------
  // Item Disabled
  //---------------------------------------------
  .#{$prefix}--tabs__nav-item--disabled,
  .#{$prefix}--tabs__nav-item--disabled:hover {
    cursor: not-allowed;
  }

  //-----------------------------
  // Item Selected
  //-----------------------------
  .#{$prefix}--tabs__nav-item--selected:not(.#{$prefix}--tabs__nav-item--disabled) {
    border: none;
    display: none;
    @include carbon--breakpoint(md) {
      display: list-item;
      .#{$prefix}--tabs__nav-link {
        color: $text-01;
        @include type-style('heading-01');
        border-bottom: 3px solid $interactive-01;
      }

      .#{$prefix}--tabs__nav-link:focus,
      .#{$prefix}--tabs__nav-link:active {
        color: $text-01;
        border-bottom: 2px;
      }
    }
  }

  //-----------------------------
  // Link
  //-----------------------------
  a.#{$prefix}--tabs__nav-link {
    display: inline-block;
    color: $text-02;
    text-decoration: none;
    font-weight: 400;
    padding: $carbon--spacing-04 0;
    width: calc(100% - 32px);
    height: rem(40px);
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0 $carbon--spacing-05;
    line-height: rem(16px);
    border-bottom: 1px solid $ui-03;
    overflow: hidden;

    &:focus,
    &:active {
      width: 100%;
      margin: 0;
      padding-left: 16px;
      outline: 2px solid $interactive-01;
      outline-offset: -2px;
    }

    @include carbon--breakpoint(md) {
      border-bottom: $tab-underline-color;
      padding: $carbon--spacing-03 $carbon--spacing-05;
      width: rem(160px);
      margin: 0;
      line-height: inherit;

      &:focus,
      &:active {
        width: rem(160px);
        padding: $carbon--spacing-03 $carbon--spacing-05;
        border-bottom: 2px;
      }
    }
  }

  //-----------------------------
  //  Link Hover
  //-----------------------------
  .#{$prefix}--tabs__nav-item:hover:not(.#{$prefix}--tabs__nav-item--selected):not(.#{$prefix}--tabs__nav-item--disabled)
    .#{$prefix}--tabs__nav-link {
    color: $text-01;
    @include carbon--breakpoint(md) {
      color: $text-01;
      border-bottom: $tab-underline-color-hover;
    }
  }

  //-----------------------------
  //  Link Disabled
  //-----------------------------
  .#{$prefix}--tabs__nav-item--disabled .#{$prefix}--tabs__nav-link {
    color: $tab-text-disabled;
    border-bottom: $tab-underline-disabled;
  }

  .#{$prefix}--tabs__nav-item--disabled:hover .#{$prefix}--tabs__nav-link {
    cursor: no-drop;
    border-bottom: $tab-underline-disabled;
  }

  .#{$prefix}--tabs__nav-item--disabled .#{$prefix}--tabs__nav-link:focus,
  .#{$prefix}--tabs__nav-item--disabled a.#{$prefix}--tabs__nav-link:active {
    outline: none;
    border-bottom: $tab-underline-disabled;
  }

  //-----------------------------
  //  Link Focus
  //-----------------------------
  .#{$prefix}--tabs__nav-item:not(.#{$prefix}--tabs__nav-item--selected):not(.#{$prefix}--tabs__nav-item--disabled):not(.#{$prefix}--tabs__nav-item--selected)
    .#{$prefix}--tabs__nav-link:focus,
  .#{$prefix}--tabs__nav-item:not(.#{$prefix}--tabs__nav-item--selected):not(.#{$prefix}--tabs__nav-item--disabled):not(.#{$prefix}--tabs__nav-item--selected)
    a.#{$prefix}--tabs__nav-link:active {
    color: $text-02;
  }

  //-----------------------------
  // Skeleton state
  //-----------------------------
  .#{$prefix}--tabs.#{$prefix}--skeleton {
    pointer-events: none;
    cursor: default;
  }

  .#{$prefix}--tabs.#{$prefix}--skeleton .#{$prefix}--tabs__nav-link {
    @include skeleton;
    width: rem(75px);
    height: rem(12px);
  }

  .#{$prefix}--tabs.#{$prefix}--skeleton .#{$prefix}--tabs-trigger {
    @include skeleton;
    width: rem(100px);
  }

  .#{$prefix}--tabs.#{$prefix}--skeleton .#{$prefix}--tabs-trigger svg {
    @include hidden;
  }
}
```

</details>

- **Group**: [tabs](#tabs)
- **Requires**:
  - [type-style [mixin]](#type-style-mixin)
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [rotate [mixin]](#rotate-mixin)
  - [layer [mixin]](#layer-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [hidden [mixin]](#hidden-mixin)
  - [rem [function]](#rem-function)
  - [motion [function]](#motion-function)
  - [z [function]](#z-function)
  - [prefix [variable]](#prefix-variable)
  - [text-01 [variable]](#text-01-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [duration--moderate-01 [variable]](#duration--moderate-01-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [field-02 [variable]](#field-02-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [text-02 [variable]](#text-02-variable)
  - [carbon--spacing-04 [variable]](#carbon--spacing-04-variable)
  - [tab-underline-color [variable]](#tab-underline-color-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [tab-underline-color-hover [variable]](#tab-underline-color-hover-variable)
  - [tab-text-disabled [variable]](#tab-text-disabled-variable)
  - [tab-underline-disabled [variable]](#tab-underline-disabled-variable)

## tag

### ❌tags [mixin]

v9 tag

<details>
<summary>Source code</summary>

```scss
@mixin tags() {
  .#{$prefix}--tag {
    @include font-family;
    @include typescale('omega');
    display: inline-flex;
    align-items: center;
    padding: 0 $spacing-xs;
    height: 1.25rem;
    margin: $spacing-3xs;
    border-radius: rem(15px);

    &:not(:first-child) {
      margin-left: 0;
    }
  }

  .#{$prefix}--tag--ibm {
    @include tag-theme($color__blue-10, $color__blue-60);
  }

  .#{$prefix}--tag--beta {
    @include tag-theme($color__gray-1, $color__navy-gray-4);
  }

  .#{$prefix}--tag--third-party {
    @include tag-theme($color__teal-10, $color__teal-60);
  }

  .#{$prefix}--tag--local,
  .#{$prefix}--tag--dedicated,
  .#{$prefix}--tag--custom {
    @include tag-theme($color__purple-10, $color__purple-60);
  }

  .#{$prefix}--tag--experimental {
    @include tag-theme($color__orange-10, $color__orange-60);
  }

  .#{$prefix}--tag--community {
    @include tag-theme($color__green-10, $color__green-60);
  }

  .#{$prefix}--tag--private {
    @include tag-theme($color__yellow-10, $color__yellow-60);
  }

  // tags used for filtering
  .#{$prefix}--tag--filter {
    @include tag-theme($brand-01, white);
    cursor: pointer;
  }

  .#{$prefix}--tag--filter > svg {
    fill: white;
    width: 0.5rem;
    height: 0.5rem;
    margin-left: rem(5px);
  }

  .#{$prefix}--tag--filter:focus,
  .#{$prefix}--tag--filter:hover {
    background-color: $hover-primary;
    outline: none;
  }

  // Skeleton state
  .#{$prefix}--tag.#{$prefix}--skeleton {
    @include tag-theme($color__gray-1, $color__navy-gray-4);
    width: rem(60px);

    &:after {
      @include skeleton;
      content: '';
      height: rem(6px);
      width: 100%;
    }
  }
}
```

</details>

- **Group**: [tag](#tag)
- **Requires**:
  - [font-family [mixin]](#font-family-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [spacing-3xs [variable]](#spacing-3xs-variable)
  - [color\_\_blue-10 [variable]](#color__blue-10-variable)
  - [color\_\_blue-60 [variable]](#color__blue-60-variable)
  - [color\_\_gray-1 [variable]](#color__gray-1-variable)
  - [color\_\_navy-gray-4 [variable]](#color__navy-gray-4-variable)
  - [color\_\_teal-10 [variable]](#color__teal-10-variable)
  - [color\_\_teal-60 [variable]](#color__teal-60-variable)
  - [color\_\_purple-10 [variable]](#color__purple-10-variable)
  - [color\_\_purple-60 [variable]](#color__purple-60-variable)
  - [color\_\_orange-10 [variable]](#color__orange-10-variable)
  - [color\_\_orange-60 [variable]](#color__orange-60-variable)
  - [color\_\_green-10 [variable]](#color__green-10-variable)
  - [color\_\_green-60 [variable]](#color__green-60-variable)
  - [color\_\_yellow-10 [variable]](#color__yellow-10-variable)
  - [color\_\_yellow-60 [variable]](#color__yellow-60-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [hover-primary [variable]](#hover-primary-variable)

### ❌tags--x [mixin]

v10 tag

<details>
<summary>Source code</summary>

```scss
@mixin tags--x() {
  .#{$prefix}--tag {
    @include type-style('label-01');
    display: inline-flex;
    align-items: center;
    padding: 0 $carbon--spacing-03;
    height: 1.5rem;
    margin: $carbon--spacing-02;
    border-radius: rem(15px);

    &:not(:first-child) {
      margin-left: 0;
    }

    &.#{$prefix}--skeleton {
      @include tag-theme--x($bg-color: $ui-03, $text-color: $text-01);
    }
  }

  .#{$prefix}--tag--red {
    @include tag-theme--x($ibm-color__red-20, $ibm-color__red-70);
  }

  .#{$prefix}--tag--magenta {
    @include tag-theme--x($ibm-color__magenta-20, $ibm-color__magenta-70);
  }

  .#{$prefix}--tag--purple {
    @include tag-theme--x($ibm-color__purple-20, $ibm-color__purple-70);
  }

  .#{$prefix}--tag--blue {
    @include tag-theme--x($ibm-color__blue-20, $ibm-color__blue-70);
  }

  .#{$prefix}--tag--cyan {
    @include tag-theme--x($ibm-color__cyan-20, $ibm-color__cyan-70);
  }

  .#{$prefix}--tag--teal {
    @include tag-theme--x($ibm-color__teal-20, $ibm-color__teal-70);
  }

  .#{$prefix}--tag--green {
    @include tag-theme--x($ibm-color__green-20, $ibm-color__green-70);
  }

  .#{$prefix}--tag--gray {
    @include tag-theme--x($ibm-color__gray-20, $ibm-color__gray-100);
  }

  .#{$prefix}--tag--cool-gray {
    @include tag-theme--x($ibm-color__cool-gray-20, $ibm-color__cool-gray-100);
  }

  .#{$prefix}--tag--warm-gray {
    @include tag-theme--x($ibm-color__warm-gray-20, $ibm-color__warm-gray-100);
  }

  .#{$prefix}--tag--disabled {
    @include tag-theme--x($ibm-color__gray-10, $ibm-color__gray-30);

    &:hover {
      cursor: not-allowed;
    }
  }

  // tags used for filtering
  .#{$prefix}--tag--filter {
    @include tag-theme--x($interactive-02, $inverse-01);
    cursor: pointer;
    padding-right: rem(2px); // Align with hover circle of X button
  }

  .#{$prefix}--tag--filter > svg {
    fill: $inverse-01;
    margin-left: rem(4px);
    padding: rem(2px);
    width: rem(20px);
    height: rem(20px);
  }

  .#{$prefix}--tag--filter > svg:hover {
    border-radius: 50%;
    background-color: $icon-02;
  }

  .#{$prefix}--tag--filter:focus,
  .#{$prefix}--tag--filter:hover {
    outline: none;
  }

  // Skeleton state
  .#{$prefix}--tag.#{$prefix}--skeleton {
    width: rem(60px);

    &:after {
      @include skeleton;
      content: '';
      height: rem(6px);
      width: 100%;
    }
  }
}
```

</details>

- **Group**: [tag](#tag)
- **Requires**:
  - [type-style [mixin]](#type-style-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [text-01 [variable]](#text-01-variable)
  - [interactive-02 [variable]](#interactive-02-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [icon-02 [variable]](#icon-02-variable)

## text-area

### ❌text-area [mixin]

v9 text-area

<details>
<summary>Source code</summary>

```scss
@mixin text-area() {
  .#{$prefix}--text-area {
    @include reset;
    @include font-family;
    @include typescale('zeta');
    width: 100%;
    min-width: 10rem;
    padding: $spacing-md;
    color: $text-01;
    background-color: $field-01;
    border: none;
    box-shadow: 0 1px 0 0 $ui-05;
    order: 2;
    resize: vertical;
    border-bottom: 1px solid transparent;

    & ~ .#{$prefix}--label {
      order: 1;
    }

    &:focus {
      outline: none;
      box-shadow: 0 2px 0 0 $brand-01;
    }

    &::placeholder {
      @include placeholder-colors;
      opacity: 1;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:disabled:hover {
      border: $input-border;
    }

    &[data-invalid],
    &[data-invalid]:focus {
      box-shadow: 0 2px 0 0 $support-01;
    }

    &:focus ~ .#{$prefix}--label {
      color: $brand-01;
    }

    &[data-invalid]:focus + .#{$prefix}--label {
      color: $support-01;
    }

    & ~ .#{$prefix}--form-requirement {
      order: 3;
      color: $support-01;
      font-weight: 400;
      margin-top: $spacing-2xs;

      &::before {
        display: none;
      }
    }
  }

  .#{$prefix}--text-area--light {
    background: $field-02;
  }

  // Skeleton State
  #{$prefix}--text-area.#{$prefix}--skeleton {
    @include skeleton;
    height: rem(100px);

    &::-webkit-input-placeholder {
      color: transparent;
    }
  }
}
```

</details>

- **Group**: [text-area](#text-area)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [placeholder-colors [mixin]](#placeholder-colors-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [text-01 [variable]](#text-01-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [input-border [variable]](#input-border-variable)
  - [support-01 [variable]](#support-01-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [field-02 [variable]](#field-02-variable)

### ❌text-area--x [mixin]

v10 text-area

<details>
<summary>Source code</summary>

```scss
@mixin text-area--x() {
  .#{$prefix}--text-area {
    @include reset;
    @include type-style('body-long-01');
    @include focus-outline('reset');

    background-color: $field-01;
    width: 100%;
    min-width: 10rem;
    min-height: rem(40px);
    padding: rem(11px) $carbon--spacing-05;
    color: $text-01;
    order: 3;
    resize: vertical;
    border: none;
    border-bottom: 1px solid $ui-04;
    transition: $duration--fast-02 all;

    & ~ .#{$prefix}--form__helper-text {
      margin-top: 0;
      order: 2;
      font-style: italic;
    }

    & ~ .#{$prefix}--form-requirement {
      order: 4;
      color: $support-01;
      font-weight: 400;
      margin-top: $carbon--spacing-02;

      &::before {
        display: none;
      }
    }
  }

  .#{$prefix}--text-area:focus,
  .#{$prefix}--text-area:active {
    @include focus-outline('outline');
  }

  .#{$prefix}--text-area::placeholder {
    @include placeholder-colors;
    @include type-style('body-long-01');
    opacity: 1;
  }

  .#{$prefix}--text-area--light {
    background-color: $field-02;
  }

  .#{$prefix}--text-area--invalid {
    padding-right: $carbon--spacing-08;
  }

  .#{$prefix}--text-area__wrapper {
    position: relative;
    display: flex;
  }

  .#{$prefix}--text-area__invalid-icon {
    position: absolute;
    right: $carbon--spacing-05;
    top: $carbon--spacing-04;
    fill: $support-01;
  }

  //-----------------------------
  // Disabled
  //-----------------------------
  .#{$prefix}--text-area:disabled {
    cursor: not-allowed;
    outline: none;
    background-color: $disabled-background-color;
    border-bottom: 1px solid transparent;
  }

  .#{$prefix}--text-area:disabled::placeholder {
    color: $disabled-02;
  }

  // Skeleton State
  #{$prefix}--text-area.#{$prefix}--skeleton {
    @include skeleton;
    height: rem(100px);

    &::placeholder {
      color: transparent;
    }
  }
}
```

</details>

- **Group**: [text-area](#text-area)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [placeholder-colors [mixin]](#placeholder-colors-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [field-01 [variable]](#field-01-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [duration--fast-02 [variable]](#duration--fast-02-variable)
  - [support-01 [variable]](#support-01-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [field-02 [variable]](#field-02-variable)
  - [carbon--spacing-08 [variable]](#carbon--spacing-08-variable)
  - [carbon--spacing-04 [variable]](#carbon--spacing-04-variable)
  - [disabled-background-color [variable]](#disabled-background-color-variable)
  - [disabled-02 [variable]](#disabled-02-variable)

## text-input

### ❌text-input [mixin]

v9 text-input

<details>
<summary>Source code</summary>

```scss
@mixin text-input() {
  .#{$prefix}--text-input {
    @include reset;
    @include font-family;
    @include typescale('zeta');
    display: block;
    width: 100%;
    height: rem(40px);
    min-width: rem(300px);
    padding: 0 $spacing-md;
    color: $text-01;
    background-color: $field-01;
    border: none;
    box-shadow: 0 1px 0 0 $ui-05;
    order: 2;
    border-bottom: 1px solid transparent;

    & ~ .#{$prefix}--label {
      order: 1;
    }

    &::placeholder {
      @include placeholder-colors;
      opacity: 1;
    }

    &:focus {
      outline: none;
      box-shadow: 0 2px 0 0 $brand-01;
    }

    &[data-invalid],
    &[data-invalid]:focus {
      box-shadow: 0 2px 0 0 $support-01;
    }

    &:focus ~ .#{$prefix}--label {
      color: $brand-01;
    }

    &[data-invalid]:focus + .#{$prefix}--label {
      color: $support-01;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:disabled:hover {
      border: none;
    }

    & ~ .#{$prefix}--form-requirement {
      order: 3;
      color: $support-01;
      font-weight: 400;
      margin-top: $spacing-2xs;

      &::before {
        display: none;
      }
    }

    &-wrapper svg[hidden] {
      display: none;
    }

    &[data-toggle-password-visibility]
      + .#{$prefix}--text-input--password__visibility {
      top: rem(-28px);
      right: rem(12px);
      display: flex;
      justify-content: center;
      align-self: flex-end;
      align-items: center;
      order: 3;
      height: rem(16px);
      width: rem(16px);
      padding: 0;
      margin-bottom: -1rem;
      border: 0;
      background: none;
      cursor: pointer;
      outline: inherit;

      svg {
        fill: $brand-01;

        &:hover {
          fill: $hover-primary;
        }
      }
    }
  }

  .#{$prefix}--text-input--light {
    background-color: $field-02;
  }

  // Skeleton State
  .#{$prefix}--text-input.#{$prefix}--skeleton {
    @include skeleton;
    width: 100%;

    &::-webkit-input-placeholder {
      color: transparent;
    }
  }
}
```

</details>

- **Group**: [text-input](#text-input)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [placeholder-colors [mixin]](#placeholder-colors-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [text-01 [variable]](#text-01-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [support-01 [variable]](#support-01-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [hover-primary [variable]](#hover-primary-variable)
  - [field-02 [variable]](#field-02-variable)

### ❌text-input--x [mixin]

v10 text-input

<details>
<summary>Source code</summary>

```scss
@mixin text-input--x() {
  .#{$prefix}--text-input {
    @include reset;
    @include type-style('body-short-01');
    @include focus-outline('reset');
    background-color: $field-01;
    width: 100%;
    height: rem(40px);
    padding: 0 $carbon--spacing-05;
    color: $text-01;
    border: none;
    border-bottom: 1px solid $ui-04;
    transition: $duration--fast-02 all;

    &:focus,
    &:active {
      @include focus-outline('outline');
    }

    &-wrapper svg[hidden] {
      display: none;
    }
  }

  .#{$prefix}--password-input {
    padding-right: rem(40px);
  }

  .#{$prefix}--text-input::-webkit-input-placeholder {
    @include placeholder-colors;
  }

  .#{$prefix}--text-input--light {
    background-color: $field-02;
  }

  //-----------------------------
  // Disabled & Error icon spacing
  //-----------------------------
  .#{$prefix}--text-input__field-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    .#{$prefix}--text-input__invalid-icon {
      position: absolute;
      right: rem(16px);
      fill: $support-01;
    }

    .#{$prefix}--text-input--password__visibility {
      position: absolute;
      height: rem(16px);
      width: rem(16px);
      right: rem(16px);
      padding: 0;
      border: 0;
      background: none;
      cursor: pointer;

      svg {
        fill: $brand-01;

        &:hover {
          fill: $hover-primary;
        }
      }
    }

    .#{$prefix}--text-input--invalid {
      padding-right: rem(40px);
    }

    .#{$prefix}--text-input--invalid.#{$prefix}--password-input {
      padding-right: rem(64px);
    }

    .#{$prefix}--text-input--invalid
      + .#{$prefix}--text-input--password__visibility {
      right: rem(40px);
    }
  }

  .#{$prefix}--text-input:disabled
    + .#{$prefix}--text-input--password__visibility
    svg {
    opacity: 0.5;
    cursor: not-allowed;
  }

  //-----------------------------
  // Disabled
  //-----------------------------
  .#{$prefix}--text-input:disabled {
    cursor: not-allowed;
    outline: none;
    background-color: $disabled-01;
    border-bottom: 1px solid transparent;
    color: $disabled-02;
  }

  .#{$prefix}--text-input--light:disabled {
    background-color: $field-02;
  }

  .#{$prefix}--text-input:disabled::placeholder {
    opacity: 1;
    color: $disabled-02;
  }

  //-----------------------------
  // Error
  //-----------------------------
  .#{$prefix}--text-input--invalid {
    @include focus-outline('invalid');
    box-shadow: none;

    .#{$prefix}--text-input--password__visibility {
      right: rem(40px);
    }
  }
}
```

</details>

- **Group**: [text-input](#text-input)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [placeholder-colors [mixin]](#placeholder-colors-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [field-01 [variable]](#field-01-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [duration--fast-02 [variable]](#duration--fast-02-variable)
  - [field-02 [variable]](#field-02-variable)
  - [support-01 [variable]](#support-01-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [hover-primary [variable]](#hover-primary-variable)
  - [disabled-01 [variable]](#disabled-01-variable)
  - [disabled-02 [variable]](#disabled-02-variable)

## tile

### ❌tile [mixin]

v9 tile

<details>
<summary>Source code</summary>

```scss
@mixin tile() {
  .#{$prefix}--tile {
    @include layer('raised');
    display: block;
    min-width: 8rem;
    min-height: 4rem;
    background-color: $ui-01;
    border: 1px solid $ui-03;
    position: relative;
    padding: $spacing-md;

    &:focus {
      @include focus-outline('border');
    }
  }

  .#{$prefix}--tile--clickable,
  .#{$prefix}--tile--selectable,
  .#{$prefix}--tile--expandable {
    transition: $transition--base $carbon--standard-easing;
    cursor: pointer;

    &:hover {
      border: 1px solid $ui-04;
    }

    &:hover,
    &:focus {
      .#{$prefix}--tile__checkmark {
        opacity: 1;
      }

      .#{$prefix}--tile__chevron svg {
        fill: $brand-01;
      }
    }
  }

  .#{$prefix}--tile--clickable,
  .#{$prefix}--tile--expandable {
    &:focus {
      @include focus-outline('border');
    }
  }

  .#{$prefix}--tile--selectable {
    padding-right: $spacing-3xl;
  }

  .#{$prefix}--tile--selectable:focus {
    outline: none;
    border: 1px solid $brand-01;
  }

  .#{$prefix}--tile--is-clicked {
    @include layer('flat');
    border: 1px solid $ui-04;
  }

  .#{$prefix}--tile__checkmark,
  .#{$prefix}--tile__chevron {
    position: absolute;
    transition: $transition--base $carbon--standard-easing;
    border: none;
    background: transparent;

    &:focus {
      @include focus-outline;
    }
  }

  .#{$prefix}--tile__checkmark {
    height: 1rem;
    top: 1rem;
    right: 1rem;
    opacity: 0;

    svg {
      border-radius: 50%;
      background-color: rgba($ui-01, 0.25);
      fill: rgba($brand-01, 0.25);
    }
  }

  .#{$prefix}--tile__chevron {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    height: 1rem;

    svg {
      transform-origin: center;
      transition: $transition--base $carbon--standard-easing;
      fill: $ui-05;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .#{$prefix}--tile--expandable {
    overflow: hidden;
    cursor: default;
    transition: $transition--base $carbon--standard-easing;
  }

  .#{$prefix}--tile-content__above-the-fold {
    display: block;
  }

  .#{$prefix}--tile-content__below-the-fold {
    display: block;
    opacity: 0;
    transition: $transition--base $carbon--standard-easing;
  }

  .#{$prefix}--tile--is-expanded {
    overflow: visible;
    transition: $transition--base $carbon--standard-easing;

    .#{$prefix}--tile__chevron svg {
      transform: rotate(-180deg);
    }

    .#{$prefix}--tile-content__below-the-fold {
      opacity: 1;
      transition: $transition--base $carbon--standard-easing;
    }
  }

  .#{$prefix}--tile--is-selected,
  .#{$prefix}--tile--is-selected:hover,
  .#{$prefix}--tile--is-selected:focus {
    border: 1px solid $brand-01;
    outline: none;
  }

  .#{$prefix}--tile--is-selected .#{$prefix}--tile__checkmark {
    opacity: 1;

    svg {
      fill: $brand-01;
    }
  }

  .#{$prefix}--tile-input:checked {
    & + .#{$prefix}--tile__checkmark {
      opacity: 1;
    }

    & + .#{$prefix}--tile__checkmark svg {
      fill: $brand-01;
      background-color: $ui-01;
    }
  }

  .#{$prefix}--tile-content {
    width: 100%;
    height: 100%;
  }

  .#{$prefix}--tile-input {
    @include hidden();
  }
}
```

</details>

- **Group**: [tile](#tile)
- **Requires**:
  - [layer [mixin]](#layer-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [hidden [mixin]](#hidden-mixin)
  - [prefix [variable]](#prefix-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [transition--base [variable]](#transition--base-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [spacing-3xl [variable]](#spacing-3xl-variable)
  - [ui-05 [variable]](#ui-05-variable)

### ❌tile--x [mixin]

v10 tile

<details>
<summary>Source code</summary>

```scss
@mixin tile--x() {
  .#{$prefix}--tile {
    display: block;
    min-width: 8rem;
    min-height: 4rem;
    background-color: $ui-01;
    position: relative;
    padding: $carbon--spacing-05;
    outline: 2px solid transparent;
    outline-offset: -2px;

    &:focus {
      @include focus-outline('outline');
    }
  }

  .#{$prefix}--tile--clickable,
  .#{$prefix}--tile--selectable,
  .#{$prefix}--tile--expandable {
    transition: $duration--moderate-01 motion(standard, productive);
    cursor: pointer;

    &:hover {
      background: $hover-ui;
    }

    &:hover,
    &:focus {
      .#{$prefix}--tile__checkmark {
        opacity: 1;
      }
    }
  }

  .#{$prefix}--tile--clickable,
  .#{$prefix}--tile--expandable {
    &:focus {
      @include focus-outline('outline');
    }
  }

  .#{$prefix}--tile--selectable {
    padding-right: $carbon--spacing-09;
  }

  .#{$prefix}--tile__checkmark,
  .#{$prefix}--tile__chevron {
    position: absolute;
    transition: $duration--fast-02 motion(standard, productive);
    border: none;
    background: transparent;
  }

  .#{$prefix}--tile__checkmark {
    height: 1rem;
    top: 1rem;
    right: 1rem;
    opacity: 0;

    svg {
      border-radius: 50%;
      fill: $icon-02;
    }

    &:focus {
      @include focus-outline('outline');
    }
  }

  .#{$prefix}--tile__chevron {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    height: 1rem;

    svg {
      transform-origin: center;
      transition: $duration--fast-02 motion(standard, productive);
      fill: $ui-05;
    }

    &:hover {
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
  }

  .#{$prefix}--tile--expandable {
    overflow: hidden;
    transition: $duration--moderate-01 motion(standard, productive);
  }

  .#{$prefix}--tile-content__above-the-fold {
    display: block;
  }

  .#{$prefix}--tile-content__below-the-fold {
    display: block;
    opacity: 0;
    transition: $duration--fast-02 motion(standard, productive);
  }

  .#{$prefix}--tile--is-expanded {
    overflow: visible;
    transition: $duration--fast-02 motion(standard, productive);

    .#{$prefix}--tile__chevron svg {
      transform: rotate(-180deg);
    }

    .#{$prefix}--tile-content__below-the-fold {
      opacity: 1;
      transition: $duration--fast-02 motion(standard, productive);
    }
  }

  .#{$prefix}--tile--is-selected {
    outline: 1px solid $interactive-02;
    outline-offset: -1px;
  }

  .#{$prefix}--tile--is-selected .#{$prefix}--tile__checkmark {
    opacity: 1;
  }

  .#{$prefix}--tile-input:checked
    + .#{$prefix}--tile
    > .#{$prefix}--tile__checkmark
    svg {
    fill: $ui-05;
  }

  .#{$prefix}--tile-content {
    width: 100%;
    height: 100%;
  }

  .#{$prefix}--tile-input {
    @include hidden;
  }
}
```

</details>

- **Group**: [tile](#tile)
- **Requires**:
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [hidden [mixin]](#hidden-mixin)
  - [motion [function]](#motion-function)
  - [prefix [variable]](#prefix-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [duration--moderate-01 [variable]](#duration--moderate-01-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [carbon--spacing-09 [variable]](#carbon--spacing-09-variable)
  - [duration--fast-02 [variable]](#duration--fast-02-variable)
  - [icon-02 [variable]](#icon-02-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [interactive-02 [variable]](#interactive-02-variable)

## time-picker

### ❌time-picker [mixin]

v9 time-picker

<details>
<summary>Source code</summary>

```scss
@mixin time-picker() {
  .#{$prefix}--time-picker {
    display: flex;
    align-items: flex-end;

    .#{$prefix}--label {
      order: 1;
    }
  }

  .#{$prefix}--time-picker__input {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid transparent;
  }

  .#{$prefix}--time-picker .#{$prefix}--select-input {
    padding-right: $spacing-xl;
  }

  .#{$prefix}--time-picker .#{$prefix}--select__arrow {
    right: 0.875rem;
  }

  .#{$prefix}--time-picker__input-field {
    @include reset;
    @include font-family;
    @include typescale('zeta');
    display: flex;
    align-items: center;
    background-color: $field-01;
    border: none;
    width: 4.875rem;
    color: $text-01;
    height: rem(40px);
    padding: 0 $spacing-md;
    order: 2;
    box-shadow: 0 1px 0 0 $ui-05;

    &:focus {
      outline: none;
      box-shadow: 0 2px 0 0 $brand-01;
    }

    &:focus ~ .#{$prefix}--label {
      color: $brand-01;
    }

    &::placeholder {
      color: $text-02;
    }

    &[data-invalid],
    &[data-invalid]:focus {
      box-shadow: 0 2px 0 0 $support-01;
    }

    &[data-invalid]:focus ~ .#{$prefix}--label {
      color: $support-01;
    }

    & ~ .#{$prefix}--form-requirement {
      order: 3;
      color: $support-01;
      font-weight: 400;
      margin-top: 0;
      max-height: 0;

      &::before {
        display: none;
      }
    }

    &[data-invalid] ~ .#{$prefix}--form-requirement {
      overflow: visible;
      max-height: 0;
      margin-top: $spacing-2xs;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .#{$prefix}--time-picker--light .#{$prefix}--time-picker__input-field {
    background: $field-02;
  }
}
```

</details>

- **Group**: [time-picker](#time-picker)
- **Requires**:
  - [reset [mixin]](#reset-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-xl [variable]](#spacing-xl-variable)
  - [field-01 [variable]](#field-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [text-02 [variable]](#text-02-variable)
  - [support-01 [variable]](#support-01-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [field-02 [variable]](#field-02-variable)

### ❌time-picker--x [mixin]

v10 time-picker

<details>
<summary>Source code</summary>

```scss
@mixin time-picker--x() {
  .#{$prefix}--time-picker {
    display: flex;
    align-items: flex-end;
  }

  .#{$prefix}--time-picker[data-invalid] .#{$prefix}--time-picker__input-field {
    @include focus-outline('invalid');
  }

  .#{$prefix}--time-picker__select {
    justify-content: center;

    &:not(:last-of-type) {
      margin: 0 $carbon--spacing-01;
    }
  }

  .#{$prefix}--time-picker__input {
    display: flex;
    flex-direction: column;
  }

  .#{$prefix}--time-picker .#{$prefix}--select-input {
    min-width: auto;
    width: auto;
    padding-right: rem(48px);
    line-height: 1;
  }

  .#{$prefix}--time-picker__input-field {
    @include reset;
    @include focus-outline('reset');
    @include type-style('code-02');
    display: flex;
    align-items: center;
    width: 4.875rem;
    height: rem(40px);
    transition: outline $duration--fast-01;
  }
}
```

</details>

- **Group**: [time-picker](#time-picker)
- **Requires**:
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [reset [mixin]](#reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-01 [variable]](#carbon--spacing-01-variable)
  - [duration--fast-01 [variable]](#duration--fast-01-variable)

## toggle

### ❌toggle [mixin]

v9 toggle

<details>
<summary>Source code</summary>

```scss
@mixin toggle() {
  .#{$prefix}--toggle {
    @include hidden;
  }

  .#{$prefix}--toggle__label {
    @include font-family;
    position: relative;
    display: flex;
    align-items: center;
    transition: $transition--base $carbon--standard-easing;
    cursor: pointer;
    margin: $spacing-md 0;
    color: $text-01;
  }

  .#{$prefix}--toggle__appearance {
    position: relative;
    width: rem(48px);

    &:before {
      position: absolute;
      display: block;
      content: '';
      width: 100%;
      height: rem(4px);
      top: -2px;
      background-color: $ui-04;
      transition: $transition--base $carbon--standard-easing;
      cursor: pointer;
    }

    &:after {
      box-sizing: border-box;
      position: absolute;
      display: block;
      border: 2px solid $ui-04;
      cursor: pointer;
      top: -12px;
      width: rem(24px);
      height: rem(24px);
      background-color: $ui-01;
      border-radius: 50%;
      content: '';
      transition: $transition--base $carbon--standard-easing;
    }
  }

  .#{$prefix}--toggle--small + .#{$prefix}--toggle__label {
    width: rem(32px);
  }

  .#{$prefix}--toggle--small
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__appearance {
    width: rem(32px);
    height: rem(16px);

    &:before {
      box-sizing: border-box;
      height: rem(16px);
      width: rem(32px);
      border-radius: 0.9375rem;
      background-color: transparent;
      border: 2px solid $ui-04;
      top: 0;
    }

    &:after {
      width: rem(10px);
      height: rem(10px);
      background-color: $ui-04;
      border: none;
      top: 3px;
      left: 3px;
    }
  }

  .#{$prefix}--toggle__check {
    fill: $ui-04;
    position: absolute;
    left: 6px;
    top: 6px;
    z-index: 1;
    transition: $transition--base $carbon--standard-easing;
    transform: scale(0.2);
  }

  .#{$prefix}--toggle--small:checked
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__check {
    fill: $brand-01;
    transform: scale(1) translateX(16px);
  }

  .#{$prefix}--toggle__text--left,
  .#{$prefix}--toggle__text--right {
    @include typescale('zeta');
    position: relative;
    color: $text-01;
  }

  .#{$prefix}--toggle__text--left {
    margin-right: $spacing-xs;
  }

  .#{$prefix}--toggle__text--right {
    margin-left: $spacing-xs;
  }

  .#{$prefix}--toggle:checked
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__appearance {
    &:before {
      background-color: $brand-01;
    }

    &:after {
      transform: translateX(24px);
      background-color: $brand-01;
      box-shadow: none;
      border-color: $brand-01;
    }
  }

  .#{$prefix}--toggle--small:checked
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__appearance {
    &:before {
      background-color: $brand-01;
      border-color: $brand-01;
    }

    &:after {
      background-color: $ui-01;
      border-color: $ui-01;
      margin-left: 0px;
      transform: translateX(17px);
    }
  }

  .#{$prefix}--toggle:focus + .#{$prefix}--toggle__label {
    .#{$prefix}--toggle__appearance:before {
      outline: 1px solid transparent;
    }

    .#{$prefix}--toggle__appearance:after {
      @include focus-outline('blurred');
    }
  }

  .#{$prefix}--toggle--small:focus + .#{$prefix}--toggle__label {
    .#{$prefix}--toggle__appearance:before {
      @include focus-outline('blurred');
    }

    .#{$prefix}--toggle__appearance:after {
      outline: none;
      box-shadow: none;
    }
  }

  .#{$prefix}--toggle:disabled + .#{$prefix}--toggle__label {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .#{$prefix}--toggle:disabled
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__appearance {
    &:before,
    &:after {
      cursor: not-allowed;
      transition: $transition--base $carbon--standard-easing;
    }
  }

  // Hide labels for small toggle for default theme
  .#{$prefix}--toggle.#{$prefix}--toggle--small
    + .#{$prefix}--toggle__label
    > .#{$prefix}--toggle__text--left,
  .#{$prefix}--toggle.#{$prefix}--toggle--small
    + .#{$prefix}--toggle__label
    > .#{$prefix}--toggle__text--right {
    @include hidden;
  }

  // Skeleton state
  .#{$prefix}--toggle.#{$prefix}--skeleton + .#{$prefix}--toggle__label {
    cursor: default;
  }

  .#{$prefix}--toggle.#{$prefix}--skeleton
    + .#{$prefix}--toggle__label
    > .#{$prefix}--toggle__appearance {
    &:before,
    &:after {
      background-color: $brand-01;
      border-color: $brand-01;
      cursor: default;
    }
  }

  .#{$prefix}--toggle.#{$prefix}--skeleton
    + .#{$prefix}--toggle__label
    > .#{$prefix}--toggle__text--left,
  .#{$prefix}--toggle.#{$prefix}--skeleton
    + .#{$prefix}--toggle__label
    > .#{$prefix}--toggle__text--right {
    @include skeleton;
    width: rem(20px);
    height: rem(12px);
  }

  .#{$prefix}--toggle.#{$prefix}--skeleton
    + .#{$prefix}--toggle__label
    > .#{$prefix}--toggle__appearance {
    &:before {
      background: transparent;
      border-color: $ui-05;
    }

    &:after {
      background-color: $ui-05;
      border: none;
    }
  }
}
```

</details>

- **Group**: [toggle](#toggle)
- **Requires**:
  - [hidden [mixin]](#hidden-mixin)
  - [font-family [mixin]](#font-family-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [skeleton [mixin]](#skeleton-mixin)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [transition--base [variable]](#transition--base-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [ui-05 [variable]](#ui-05-variable)

### ❌toggle--x [mixin]

v10 toggle

<details>
<summary>Source code</summary>

```scss
@mixin toggle--x() {
  .#{$prefix}--toggle {
    @include hidden;

    &:focus {
      outline: none;
    }
  }

  .#{$prefix}--toggle__label {
    @include type-style('label-01');

    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: $carbon--spacing-03 0;
  }

  .#{$prefix}--toggle__appearance {
    position: relative;
    width: rem(48px);
    height: rem(24px);

    // Toggle background oval
    &:before {
      position: absolute;
      display: block;
      content: '';
      background-color: $ui-04;
      cursor: pointer;
      box-sizing: border-box;
      height: rem(24px);
      width: rem(48px);
      border-radius: rem(15px);
      top: 0;
    }

    // Toggle circle
    &:after {
      box-sizing: border-box;
      position: absolute;
      display: block;
      cursor: pointer;
      left: 3px;
      top: 3px;
      width: rem(18px);
      height: rem(18px);
      background-color: $ui-03;
      border-radius: 50%;
      content: '';
      transition: $duration--fast-01 motion(exit, productive);
    }
  }

  .#{$prefix}--toggle--small
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__appearance {
    width: rem(32px);
    height: rem(16px);

    &:before {
      box-sizing: border-box;
      height: rem(16px);
      width: rem(32px);
      border-radius: 0.9375rem;
      top: 0;
    }

    &:after {
      width: rem(10px);
      height: rem(10px);
      top: 3px;
      left: 3px;
    }
  }

  .#{$prefix}--toggle__check {
    fill: $ui-03;
    position: absolute;
    left: 6px;
    top: 6px;
    z-index: 1;
    transition: $duration--fast-01 motion(exit, productive);
    transform: scale(0.2);
  }

  .#{$prefix}--toggle--small:checked
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__check {
    fill: $support-02;
    transform: scale(1) translateX(16px);
  }

  .#{$prefix}--toggle__text--left,
  .#{$prefix}--toggle__text--right {
    @include type-style('body-short-01');
    position: relative;
    margin-left: $carbon--spacing-03;
  }

  .#{$prefix}--toggle__text--left {
    position: absolute;
    left: rem(48px);
  }

  .#{$prefix}--toggle--small
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__text--left {
    left: rem(32px);
  }

  .#{$prefix}--toggle:checked
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__text--left,
  .#{$prefix}--toggle:not(:checked)
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__text--right {
    visibility: hidden;
  }

  .#{$prefix}--toggle:checked
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__text--right,
  .#{$prefix}--toggle:not(:checked)
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__text--left {
    display: inline;
  }

  .#{$prefix}--toggle:checked
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__appearance {
    &:before {
      background-color: $support-02;
    }

    &:after {
      background-color: $icon-03;
      transform: translateX(24px);
    }
  }

  .#{$prefix}--toggle--small:checked
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__appearance {
    &:after {
      margin-left: 0px;
      transform: translateX(17px);
    }
  }

  //----------------------------------------------
  // Focus
  // ---------------------------------------------
  .#{$prefix}--toggle + .#{$prefix}--toggle__label,
  .#{$prefix}--toggle + .#{$prefix}--toggle__label {
    .#{$prefix}--toggle__appearance:before {
      box-shadow: 0 0 0 2px transparent;
    }
  }
  .#{$prefix}--toggle:focus + .#{$prefix}--toggle__label,
  .#{$prefix}--toggle:active + .#{$prefix}--toggle__label {
    .#{$prefix}--toggle__appearance:before {
      box-shadow: 0 0 0 2px $focus;
    }
  }

  //----------------------------------------------
  // Disabled
  // ---------------------------------------------
  .#{$prefix}--toggle:disabled + .#{$prefix}--toggle__label {
    cursor: not-allowed;
  }

  .#{$prefix}--toggle:disabled
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__appearance {
    &:before {
      background-color: $disabled-01;
    }

    &:after {
      background-color: $disabled-02;
    }

    &:before,
    &:after {
      cursor: not-allowed;
      transition: $duration--fast-01 motion(exit, productive);
    }
  }

  .#{$prefix}--toggle:disabled
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__text--left,
  .#{$prefix}--toggle:disabled
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__text--right {
    color: $disabled;
  }

  .#{$prefix}--toggle:disabled:active
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__appearance:before {
    box-shadow: none;
  }

  .#{$prefix}--toggle:disabled
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__check {
    fill: $disabled-02;
  }
}
```

</details>

- **Group**: [toggle](#toggle)
- **Requires**:
  - [hidden [mixin]](#hidden-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [rem [function]](#rem-function)
  - [motion [function]](#motion-function)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [duration--fast-01 [variable]](#duration--fast-01-variable)
  - [support-02 [variable]](#support-02-variable)
  - [icon-03 [variable]](#icon-03-variable)
  - [focus [variable]](#focus-variable)
  - [disabled-01 [variable]](#disabled-01-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [disabled [variable]](#disabled-variable)

## toolbar

### ❌toolbar [mixin]

v9 toolbar

<details>
<summary>Source code</summary>

```scss
@mixin toolbar() {
  .#{$prefix}--toolbar {
    @if not feature-flag-enabled('components-x') {
      @include font-family;
    }
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin: 1rem 0;

    > div {
      margin: 0 rem(4px);
    }

    .#{$prefix}--search-input {
      height: rem(32px);
      background-color: transparent;
      outline: none;
    }

    .#{$prefix}--search-close {
      display: none;
    }

    .#{$prefix}--overflow-menu__icon {
      fill: $text-02;
      transition: fill 50ms $carbon--standard-easing;
    }

    .#{$prefix}--search-magnifier {
      fill: $text-02;
      transform: scale(1.15);
      transition: all 175ms $carbon--standard-easing;
      top: rem(8px);
      left: rem(6px);
      cursor: pointer;
    }

    fieldset {
      border: 0;
      padding: 0;
    }

    .#{$prefix}--toolbar-search--active {
      width: rem(250px);

      .#{$prefix}--search-magnifier {
        transform: scale(1);
        top: rem(9px);
      }

      .#{$prefix}--search-input {
        background-color: $field-02;
      }

      .#{$prefix}--search-close {
        display: block;
      }
    }

    .#{$prefix}--checkbox-label {
      margin-bottom: 0;
    }

    .#{$prefix}--overflow-menu--open > .#{$prefix}--overflow-menu__icon {
      fill: $brand-01;
    }
  }

  .#{$prefix}--toolbar-search {
    width: 1.8rem;
    transition: all 175ms $carbon--standard-easing;
  }

  .#{$prefix}--toolbar-search__btn {
    position: absolute;
    left: 0;
    top: 0;
    background: transparent;
    border: 0;
    height: rem(32px);
    width: rem(32px);

    &:focus {
      @include focus-outline;
    }
  }

  .#{$prefix}--toolbar-filter-icon {
    padding-left: 0;
    padding-right: 0;
  }

  .#{$prefix}--toolbar-menu__title {
    @if not feature-flag-enabled('components-x') {
      @include typescale('omega');
      @include letter-spacing;
    } @else {
      @include type-style('caption-01');
    }
    font-weight: 600;
    padding: 0.5rem 1.25rem;
  }

  .#{$prefix}--toolbar-menu__option {
    padding: 0.5rem 1.25rem;
  }

  .#{$prefix}--toolbar-menu__divider {
    width: 100%;
    border: 0;
    border-top: 1px solid $ui-03;
  }

  .#{$prefix}--radio-button-group {
    border: none;
  }
}
```

</details>

- **Group**: [toolbar](#toolbar)
- **Requires**:
  - [font-family [mixin]](#font-family-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [letter-spacing [mixin]](#letter-spacing-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [text-02 [variable]](#text-02-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [field-02 [variable]](#field-02-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [ui-03 [variable]](#ui-03-variable)
- **Used by**:
  - [toolbar--x [mixin]](#toolbar--x-mixin)

### ❌toolbar--x [mixin]

v10 toolbar

<details>
<summary>Source code</summary>

```scss
@mixin toolbar--x() {
  @include toolbar;
  .#{$prefix}--toolbar-search:not(.#{$prefix}--toolbar-search--active)
    .#{$prefix}--search-input {
    border-bottom: none;
  }
}
```

</details>

- **Group**: [toolbar](#toolbar)
- **Requires**:
  - [toolbar [mixin]](#toolbar-mixin)
  - [prefix [variable]](#prefix-variable)

## tooltip

### ❌tooltip [mixin]

v9 tooltip

<details>
<summary>Source code</summary>

```scss
@mixin tooltip() {
  .#{$prefix}--tooltip--icon {
    display: flex;
    align-items: center;
  }

  .#{$prefix}--tooltip__label {
    @include font-family;
    @include typescale('epsilon');
    display: inline-flex;
    align-items: center;
    color: $text-01;
    font-weight: normal;

    .#{$prefix}--tooltip__trigger {
      margin-left: $spacing-xs;
    }
  }

  .#{$prefix}--tooltip__trigger {
    @include button-reset($width: false);
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    font-size: 1rem;

    &:focus {
      @include focus-outline('border');
      fill: $hover-primary;
    }

    path,
    polygon,
    circle {
      fill: $brand-01;
    }

    &:hover,
    &:focus {
      color: $text-01;

      path,
      polygon,
      circle {
        fill: $hover-primary;
      }
    }
  }

  .#{$prefix}--tooltip__label--bold {
    font-weight: 600;
  }

  .#{$prefix}--tooltip {
    @include layer('overlay');
    @include reset;
    position: absolute;
    display: none;
    max-width: rem(240px);
    background: $ui-01;
    margin-top: $spacing-2xs;
    padding: $spacing-md;
    border: 1px solid $ui-03;
    border-radius: rem(4px);
    z-index: z('floating');
    word-wrap: break-word;
    color: $text-01;

    p {
      @include font-family;
      @include typescale('zeta');
    }

    .#{$prefix}--tooltip__footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 1rem;
    }

    .#{$prefix}--tooltip__caret {
      position: absolute;
      background: $ui-01;
      left: 0;
      top: rem(-5px);
      right: 0;
      transform: rotate(-135deg);
      width: 0.6rem;
      height: 0.6rem;
      border-right: 1px solid $ui-03;
      border-bottom: 1px solid $ui-03;
      margin: 0 auto;
      content: '';
    }

    &[data-floating-menu-direction='left'] {
      .#{$prefix}--tooltip__caret {
        left: auto;
        top: 50%;
        right: rem(-5px);
        transform: rotate(-45deg) translate(50%, -50%);
      }
    }

    &[data-floating-menu-direction='top'] {
      .#{$prefix}--tooltip__caret {
        top: auto;
        bottom: rem(-6px);
        transform: rotate(45deg);
      }
    }

    &[data-floating-menu-direction='right'] {
      .#{$prefix}--tooltip__caret {
        left: rem(-5px);
        top: 50%;
        right: auto;
        transform: rotate(135deg) translate(-50%, 50%);
      }
    }
  }

  .#{$prefix}--tooltip--shown {
    display: block;
  }

  // Tooltip Definition
  // Definition CSS only tooltip
  .#{$prefix}--tooltip--definition {
    @include font-family;
    @include reset;
    @include typescale('delta');

    position: relative;

    .#{$prefix}--tooltip__trigger {
      display: inline-flex;
      position: relative;
      border-bottom: 2px dotted $ui-04;

      &:hover {
        border-bottom: 2px dotted $hover-primary;
        cursor: pointer;

        + .#{$prefix}--tooltip--definition__top,
        + .#{$prefix}--tooltip--definition__bottom {
          display: block;
        }
      }

      &:focus {
        @include focus-outline('border');

        + .#{$prefix}--tooltip--definition__top,
        + .#{$prefix}--tooltip--definition__bottom {
          display: block;
        }
      }
    }
  }

  .#{$prefix}--tooltip--definition__bottom,
  .#{$prefix}--tooltip--definition__top {
    @include layer('overlay');
    position: absolute;
    z-index: 1;
    display: none;
    background: $inverse-02;
    max-width: rem(176px);
    margin-top: $spacing-sm;
    padding: $spacing-xs;
    border-radius: rem(4px);
    pointer-events: none;
    cursor: pointer;

    p {
      @include font-family;
      @include typescale('omega');
      color: $inverse-01;
    }

    .#{$prefix}--tooltip__caret {
      position: absolute;
      right: 0;
      left: 0;
      width: 0.6rem;
      height: 0.6rem;
      background: $inverse-02;
      margin-left: $spacing-lg;
    }
  }

  // Tooltip Definition caret - bottom position
  .#{$prefix}--tooltip--definition__bottom {
    .#{$prefix}--tooltip__caret {
      top: -0.2rem;
      transform: rotate(-135deg);
    }
  }

  // Tooltip Definition caret - top position
  .#{$prefix}--tooltip--definition__top {
    transform: translateY(-100%);
    margin-top: rem(-32px);

    .#{$prefix}--tooltip__caret {
      bottom: -0.2rem;
      transform: rotate(45deg);
    }
  }

  // Tooltip Icon
  // Icon CSS only tooltip
  .#{$prefix}--tooltip--icon__top,
  .#{$prefix}--tooltip--icon__bottom {
    @include font-family;
    @include reset;
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    overflow: visible;

    path {
      fill: $brand-01;
    }

    // Tooltip - renders as a combo of :before and :after elements
    &:before,
    &:after {
      @include font-family;
      position: absolute;
      display: none;
      background-color: $inverse-02;
    }

    &:before {
      right: 0;
      left: 0;
      width: 0.6rem;
      height: 0.6rem;
      margin: 0 auto;
      content: '';
      margin-top: 1px;
      margin-left: 50%;
    }

    &:after {
      @include typescale('omega');
      @include layer('overlay');
      max-width: rem(176px);
      margin-left: 50%;
      padding: $spacing-2xs;
      border-radius: 4px;
      color: $inverse-01;
      font-weight: 400;
      content: attr(aria-label);
      transform: translateX(-50%);
      white-space: nowrap;
      pointer-events: none;
      margin-left: 50%;
    }

    &:hover,
    &:focus {
      path {
        fill: $hover-primary;
      }

      &:before,
      &:after {
        position: absolute;
        display: block;
      }
    }

    &:focus {
      outline: 1px solid transparent;

      svg {
        @include focus-outline('border');
      }
    }
  }

  // Tooltip Icon caret - top position
  .#{$prefix}--tooltip--icon__top {
    &:before {
      top: 0;
      transform: translate(-50%, calc(-100% - 10px)) rotate(45deg);
    }

    &:after {
      top: 0;
      transform: translate(-50%, calc(-100% - 10px));
    }
  }

  // Tooltip Icon caret - bottom position
  .#{$prefix}--tooltip--icon__bottom {
    &:before {
      bottom: 0;
      transform: translate(-50%, calc(100% + 10px)) rotate(135deg);
    }

    &:after {
      bottom: 0;
      transform: translate(-50%, calc(100% + 10px));
    }
  }

  // Tooltip position - icon only
  .#{$prefix}--tooltip--icon {
    .#{$prefix}--tooltip__trigger {
      svg {
        margin-left: 0;
      }
    }
  }
}
```

</details>

- **Group**: [tooltip](#tooltip)
- **Requires**:
  - [font-family [mixin]](#font-family-mixin)
  - [typescale [mixin]](#typescale-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [layer [mixin]](#layer-mixin)
  - [reset [mixin]](#reset-mixin)
  - [rem [function]](#rem-function)
  - [z [function]](#z-function)
  - [prefix [variable]](#prefix-variable)
  - [text-01 [variable]](#text-01-variable)
  - [spacing-xs [variable]](#spacing-xs-variable)
  - [hover-primary [variable]](#hover-primary-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [spacing-2xs [variable]](#spacing-2xs-variable)
  - [spacing-md [variable]](#spacing-md-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [inverse-02 [variable]](#inverse-02-variable)
  - [spacing-sm [variable]](#spacing-sm-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [spacing-lg [variable]](#spacing-lg-variable)

### ❌tooltip--x [mixin]

v10 tooltip

<details>
<summary>Source code</summary>

```scss
@mixin tooltip--x() {
  .#{$prefix}--tooltip--icon {
    display: flex;
    align-items: center;
  }

  .#{$prefix}--tooltip__label {
    @include type-style('label-01');
    display: inline-flex;
    align-items: center;
    color: $text-02;

    .#{$prefix}--tooltip__trigger {
      margin-left: $carbon--spacing-03;
    }
  }

  .#{$prefix}--tooltip__label:focus {
    @include focus-outline('border');
  }

  .#{$prefix}--tooltip__trigger {
    @include button-reset($width: false);
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    font-size: 1rem;

    &:focus {
      @include focus-outline('border');
      fill: $hover-primary;
    }

    path,
    polygon,
    circle {
      fill: $icon-02;
    }
  }

  .#{$prefix}--tooltip__label--bold {
    font-weight: 600;
  }

  .#{$prefix}--tooltip {
    @include layer('overlay');
    @include reset;
    position: absolute;
    display: none;
    min-width: rem(208px);
    max-width: rem(288px);
    background: $inverse-02;
    margin-top: $carbon--spacing-02;
    padding: 1rem;
    border-radius: rem(2px);
    z-index: z('floating');
    word-wrap: break-word;
    color: $inverse-01;

    p {
      @include type-style('body-short-01');
    }

    button {
      padding-right: $carbon--spacing-07;
    }

    .#{$prefix}--link {
      // Need to add new link / UI color -- IBM Color Blue 40
      color: $link-inverse-color;
      font-size: rem(14px);

      &:active {
        color: $inverse-01;
      }

      &:visited {
        color: $link-inverse-color;
      }
    }

    .#{$prefix}--tooltip__caret {
      position: absolute;
      background: $inverse-02;
      left: 0;
      top: rem(-4px);
      right: 0;
      transform: rotate(-135deg);
      width: 0.6rem;
      height: 0.6rem;
      margin: 0 auto;
      content: '';
    }

    .#{$prefix}--tooltip__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1rem;
    }

    &[data-floating-menu-direction='left'] {
      .#{$prefix}--tooltip__caret {
        left: auto;
        top: 50%;
        right: rem(-4px);
        transform: rotate(-45deg) translate(50%, -50%);
      }
    }

    &[data-floating-menu-direction='top'] {
      .#{$prefix}--tooltip__caret {
        top: auto;
        bottom: rem(-4px);
        transform: rotate(45deg);
      }
    }

    &[data-floating-menu-direction='right'] {
      .#{$prefix}--tooltip__caret {
        left: rem(-4px);
        top: 50%;
        right: auto;
        transform: rotate(135deg) translate(-50%, 50%);
      }
    }
  }

  .#{$prefix}--tooltip--shown {
    display: block;
  }

  // Tooltip Definition
  // Definition CSS only tooltip
  .#{$prefix}--tooltip--definition {
    @include reset;
    position: relative;

    .#{$prefix}--tooltip__trigger {
      @include type-style('label-01');
      display: inline-flex;
      position: relative;
      border-bottom: 1px dotted $interactive-01;
      color: $text-01;

      &:hover {
        cursor: pointer;

        + .#{$prefix}--tooltip--definition__top,
        + .#{$prefix}--tooltip--definition__bottom {
          display: block;
        }
      }

      &:focus {
        @include focus-outline('border');

        + .#{$prefix}--tooltip--definition__top,
        + .#{$prefix}--tooltip--definition__bottom {
          display: block;
        }
      }
    }
  }

  .#{$prefix}--tooltip--definition__bottom,
  .#{$prefix}--tooltip--definition__top {
    @include layer('overlay');
    position: absolute;
    z-index: 1;
    display: none;
    background: $inverse-02;
    width: rem(208px);
    margin-top: $carbon--spacing-04;
    padding: $carbon--spacing-03 $carbon--spacing-05;
    border-radius: rem(2px);
    pointer-events: none;
    cursor: pointer;

    p {
      @include type-style('body-short-01');
      color: $inverse-01;
    }

    .#{$prefix}--tooltip__caret {
      position: absolute;
      right: 0;
      left: 0;
      width: 0.6rem;
      height: 0.6rem;
      background: $inverse-02;
      margin-left: $carbon--spacing-05;
    }
  }

  // Tooltip Definition caret - bottom position
  .#{$prefix}--tooltip--definition__bottom .#{$prefix}--tooltip__caret {
    top: -0.2rem;
    transform: rotate(-135deg);
  }

  // Tooltip Definition caret - top position
  .#{$prefix}--tooltip--definition__top {
    transform: translateY(-100%);
    margin-top: rem(-32px);

    .#{$prefix}--tooltip__caret {
      bottom: -0.2rem;
      transform: rotate(45deg);
    }
  }

  // Tooltip Icon
  // Icon CSS only tooltip
  .#{$prefix}--tooltip--icon__top,
  .#{$prefix}--tooltip--icon__bottom {
    @include reset;
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    overflow: visible;

    path {
      fill: $icon-02;
    }

    // Tooltip - renders as a combo of ::before and ::after elements
    &::before,
    &::after {
      @include type-style('body-short-01');
      position: absolute;
      display: none;
      background-color: $inverse-02;
    }

    &::before {
      right: 0;
      left: 0;
      width: rem(18px);
      height: rem(18px);
      margin: 0 auto;
      content: '';
      margin-top: 1px;
      margin-left: 50%;
    }

    &::after {
      @include layer('overlay');
      min-width: rem(24px);
      max-width: rem(208px);
      height: rem(24px);
      margin-left: 50%;
      padding: 0 1rem;
      border-radius: rem(2px);
      color: $inverse-01;
      font-weight: 400;
      content: attr(aria-label);
      transform: translateX(-50%);
      white-space: nowrap;
      pointer-events: none;
      margin-left: 50%;
    }

    &:hover,
    &:focus {
      path {
        fill: $icon-02;
      }

      &::before,
      &::after {
        position: absolute;
        display: flex;
        align-items: center;
      }
    }

    &:focus {
      outline: 1px solid transparent;

      svg {
        @include focus-outline('border');
      }
    }
  }

  // Tooltip Icon caret - top position
  .#{$prefix}--tooltip--icon__top {
    &::before {
      top: 1px;
      transform: translate(-50%, calc(-100% - 12px)) rotate(45deg);
    }

    &::after {
      top: 0;
      transform: translate(-50%, calc(-100% - 12px));
    }
  }

  // Tooltip Icon caret - bottom position
  .#{$prefix}--tooltip--icon__bottom {
    &::before {
      bottom: 0;
      transform: translate(-50%, calc(100% + 9px)) rotate(135deg);
    }

    &::after {
      bottom: 0;
      transform: translate(-50%, calc(100% + 10px));
    }
  }

  // Tooltip position - icon only
  .#{$prefix}--tooltip--icon .#{$prefix}--tooltip__trigger svg {
    margin-left: 0;
  }
}
```

</details>

- **Group**: [tooltip](#tooltip)
- **Requires**:
  - [type-style [mixin]](#type-style-mixin)
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [layer [mixin]](#layer-mixin)
  - [reset [mixin]](#reset-mixin)
  - [rem [function]](#rem-function)
  - [z [function]](#z-function)
  - [prefix [variable]](#prefix-variable)
  - [text-02 [variable]](#text-02-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [hover-primary [variable]](#hover-primary-variable)
  - [icon-02 [variable]](#icon-02-variable)
  - [inverse-02 [variable]](#inverse-02-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [carbon--spacing-07 [variable]](#carbon--spacing-07-variable)
  - [link-inverse-color [variable]](#link-inverse-color-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [carbon--spacing-04 [variable]](#carbon--spacing-04-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)

## ui-shell

### ❌carbon-content [mixin]

UI shell content

<details>
<summary>Source code</summary>

```scss
@mixin carbon-content() {
  .#{$prefix}--content {
    transform: translate3d(0, 0, 0);
    will-change: margin-left;
  }

  .#{$prefix}--header ~ .#{$prefix}--content {
    margin-top: mini-units(6);
  }

  .#{$prefix}--side-nav ~ .#{$prefix}--content {
    margin-left: mini-units(6);
  }

  .#{$prefix}--side-nav.#{$prefix}--side-nav--expanded ~ .#{$prefix}--content {
    margin-left: mini-units(32);
  }
}
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Requires**:
  - [mini-units [function]](#mini-units-function)
  - [prefix [variable]](#prefix-variable)

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
| `$count` | —           | `Number` | —             |

- **Group**: [ui-shell](#ui-shell)
- **Returns**: `Number` In rem
- **Requires**:
  - [unit [variable]](#unit-variable)
- **Used by**:
  - [carbon-content [mixin]](#carbon-content-mixin)
  - [carbon-header [mixin]](#carbon-header-mixin)
  - [carbon-navigation [mixin]](#carbon-navigation-mixin)
  - [product-switcher [mixin]](#product-switcher-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌carbon-header [mixin]

UI shell header

<details>
<summary>Source code</summary>

```scss
@mixin carbon-header() {
  .#{$prefix}--header {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: mini-units(6);
    background-color: $shell-header-bg-01;
    color: $shell-header-text-01;
    z-index: z('header');
  }

  .#{$prefix}--header__action {
    @include button-reset();
    width: mini-units(6);
    height: mini-units(6);
    border: rem(3px) solid transparent;
  }

  .#{$prefix}--header__action
    > svg.#{$prefix}--navigation-menu-panel-collapse-icon,
  .#{$prefix}--header__action--active
    > svg.#{$prefix}--navigation-menu-panel-expand-icon {
    display: none;
  }

  .#{$prefix}--header__action--active
    > svg.#{$prefix}--navigation-menu-panel-collapse-icon {
    display: inline;
  }

  .#{$prefix}--header__action
    > svg.#{$prefix}--navigation-menu-panel-collapse-icon,
  .#{$prefix}--header__action--active
    > svg.#{$prefix}--navigation-menu-panel-expand-icon {
    display: none;
  }

  .#{$prefix}--header__action--active
    > svg.#{$prefix}--navigation-menu-panel-collapse-icon {
    display: inline;
  }

  .#{$prefix}--header__action:hover {
    background-color: #333333;
  }

  .#{$prefix}--header__action--active,
  .#{$prefix}--header__action--active:hover {
    background-color: $shell-brand-01;
  }

  .#{$prefix}--header__action--active,
  .#{$prefix}--header__action:focus {
    border-color: $shell-brand-01;
    outline: none;
  }

  .#{$prefix}--header__action > svg {
    fill: $shell-header-icon-01;
  }

  //--------------------------------------------------------------------------
  // Header - Name
  //--------------------------------------------------------------------------
  a.#{$prefix}--header__name {
    @include type-style('body-short-01');
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 mini-units(2);
    text-decoration: none;
    font-weight: 600;
    letter-spacing: 0.1px;
    line-height: 20px;
    user-select: none;
  }

  .#{$prefix}--header__name--prefix {
    font-weight: 400;
  }

  a.#{$prefix}--header__name,
  a.#{$prefix}--header__name:hover {
    color: $shell-header-text-01;
  }

  a.#{$prefix}--header__name:focus {
    outline: none;
    box-shadow: inset 0 0 0 4px $shell-brand-01;
  }

  //--------------------------------------------------------------------------
  // Header - Navigation
  //--------------------------------------------------------------------------
  .#{$prefix}--header__nav {
    height: 100%;
  }

  .#{$prefix}--header__menu-bar[role='menubar'] {
    display: flex;
    margin-left: mini-units(1);
    height: 100%;
  }

  a.#{$prefix}--header__menu-item[role='menuitem'] {
    display: flex;
    align-items: center;
    color: $shell-header-text-01;
    padding: 0 mini-units(2);
    // Used for links that are directly in the menubar to span the full height
    height: 100%;
    // Text styles
    font-size: rem(14px);
    font-weight: 400;
    letter-spacing: 0;
    line-height: rem(18px);
    // Reset link styles and make sure the text isn't selectable
    text-decoration: none;
    user-select: none;
    // Used for focus styles
    border: 4px solid transparent;
  }

  a.#{$prefix}--header__menu-item[role='menuitem']:hover {
    background-color: #333333;
  }

  .#{$prefix}--header__action:active,
  a.#{$prefix}--header__menu-item[role='menuitem']:active {
    background-color: $ibm-color__gray-80;
  }

  a.#{$prefix}--header__menu-item[role='menuitem']:focus {
    border-color: $ibm-color__blue-60;
    outline: none;
  }

  .#{$prefix}--header__submenu {
    position: relative;
  }

  .#{$prefix}--header__menu-title[role='menuitem'][aria-haspopup='true'] {
    position: relative;
  }

  .#{$prefix}--header__menu-title[role='menuitem'][aria-expanded='true'] {
    background-color: $ibm-color__gray-80;
    // Note: needs to be higher than menu. Adding 1 here instead of moving to
    // the next level.
    z-index: #{z('header') + 1};
  }

  .#{$prefix}--header__menu-title[role='menuitem'][aria-expanded='true']
    > .#{$prefix}--header__menu-arrow {
    transform: rotate(180deg);
  }

  .#{$prefix}--header__menu[role='menu'] {
    display: none;
  }

  .#{$prefix}--header__menu-title[role='menuitem'][aria-expanded='true']
    + .#{$prefix}--header__menu {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    width: mini-units(25);
    flex-direction: column;
    transform: translateY(100%);
    background-color: $ibm-color__gray-80;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    z-index: z('header');
  }

  .#{$prefix}--header__menu .#{$prefix}--header__menu-item[role='menuitem'] {
    height: mini-units(6);
  }

  .#{$prefix}--header__menu
    .#{$prefix}--header__menu-item[role='menuitem']:hover {
    background-color: #4c4c4c;
    color: #fff;
  }

  .#{$prefix}--header__menu-arrow {
    fill: $ibm-color__gray-10;
    margin-left: mini-units(1);
  }

  //--------------------------------------------------------------------------
  // Header - Global
  //--------------------------------------------------------------------------
  .#{$prefix}--header__global {
    display: flex;
    justify-content: flex-end;
    flex: 1 1 0%;
    height: 100%;
  }

  //--------------------------------------------------------------------------
  // Header - Skip to content
  //--------------------------------------------------------------------------
  .#{$prefix}--skip-to-content {
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

  .#{$prefix}--skip-to-content:focus {
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    width: auto;
    height: 3rem;
    clip: auto;
    border: 4px solid $ibm-color__blue-60;
    z-index: 9999;
    background-color: $shell-header-bg-01;
    color: $shell-header-text-01;
    outline: none;
    padding: 0 1rem;
  }
}
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Requires**:
  - [button-reset [mixin]](#button-reset-mixin)
  - [type-style [mixin]](#type-style-mixin)
  - [mini-units [function]](#mini-units-function)
  - [z [function]](#z-function)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [shell-header-bg-01 [variable]](#shell-header-bg-01-variable)
  - [shell-header-text-01 [variable]](#shell-header-text-01-variable)
  - [shell-brand-01 [variable]](#shell-brand-01-variable)
  - [shell-header-icon-01 [variable]](#shell-header-icon-01-variable)

### ❌carbon-navigation [mixin]

UI shell navigation

<details>
<summary>Source code</summary>

```scss
@mixin carbon-navigation() {
  //----------------------------------------------------------------------------
  // Navigation
  //----------------------------------------------------------------------------
  .#{$prefix}--navigation {
    position: fixed;
    top: mini-units(6);
    bottom: 0;
    left: 0;
    background-color: $ibm-color__gray-90;
    width: mini-units(32);
    z-index: z('dropdown');
    box-shadow: 0 mini-units(1) mini-units(2) 0 rgba(0, 0, 0, 0.25);
    color: $ibm-color__gray-10;
  }

  .#{$prefix}--navigation--right {
    left: auto;
    right: 0;
  }

  .#{$prefix}--navigation svg {
    fill: $ibm-color__gray-10;
  }

  //----------------------------------------------------------------------------
  // Nav Section
  //----------------------------------------------------------------------------
  .#{$prefix}--navigation-section:not(:last-child)::after {
    display: block;
    content: '';
    height: 1px;
    background-color: $ibm-color__gray-80;
    margin: 0 mini-units(2);
  }

  //----------------------------------------------------------------------------
  // Nav Item
  //----------------------------------------------------------------------------
  .#{$prefix}--navigation-item {
    position: relative;
    display: flex;
    align-items: center;
  }

  .#{$prefix}--navigation-item--active > a.#{$prefix}--navigation-link {
    color: $ibm-color__white-0;
    font-weight: 600;
  }

  .#{$prefix}--navigation-item--active::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    background-color: $ibm-color__blue-60;
  }

  //----------------------------------------------------------------------------
  // Nav Link
  //----------------------------------------------------------------------------
  a.#{$prefix}--navigation-link {
    display: flex;
    align-items: center;
    color: $ibm-color__gray-10;
    text-decoration: none;
    font-size: rem(14px);
    font-weight: 400;
    width: 100%;
    min-height: mini-units(5);
    padding-left: mini-units(2);
  }

  a.#{$prefix}--navigation-link:hover {
    background-color: #333333;
    color: $ibm-color__white-0;
  }

  a.#{$prefix}--navigation-link:focus {
    outline: rem(3px) solid $ibm-color__blue-60;
    outline-offset: rem(-3px);
  }

  .#{$prefix}--navigation-item--icon > a.#{$prefix}--navigation-link {
    padding-left: 0;
  }

  //----------------------------------------------------------------------------
  // Nav Category
  //----------------------------------------------------------------------------
  .#{$prefix}--navigation__category {
    width: 100%;
  }

  .#{$prefix}--navigation__category-toggle {
    @include button-reset($width: true);

    display: flex;
    align-items: center;
  }

  .#{$prefix}--navigation__category-toggle:hover {
    background-color: #333333;
  }

  .#{$prefix}--navigation__category-toggle:focus {
    outline: rem(3px) solid $ibm-color__blue-60;
    outline-offset: rem(-3px);
  }

  .#{$prefix}--navigation__category-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: mini-units(2);
    width: 100%;
    color: $ibm-color__gray-10;
    font-size: rem(14px);
    font-weight: 400;
    min-height: mini-units(5);
    padding-left: mini-units(2);
  }

  .#{$prefix}--navigation-item--icon .#{$prefix}--navigation__category-title {
    padding-left: 0;
  }

  .#{$prefix}--navigation__category-items {
    display: none;
    visibility: hidden;
  }

  .#{$prefix}--navigation__category-item > a.#{$prefix}--navigation-link {
    display: flex;
    align-items: center;
    min-height: mini-units(4);
    padding-left: mini-units(4);
  }

  .#{$prefix}--navigation__category-item {
    position: relative;
  }

  .#{$prefix}--navigation-item--icon
    .#{$prefix}--navigation__category-item
    > a.#{$prefix}--navigation-link {
    padding-left: mini-units(7);
  }

  .#{$prefix}--navigation__category-item--active::after {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    background-color: $ibm-color__blue-60;
  }

  .#{$prefix}--navigation__category-item--active
    > a.#{$prefix}--navigation-link {
    font-weight: 600;
    color: $ibm-color__white-0;
  }

  .#{$prefix}--navigation__category--expanded
    .#{$prefix}--navigation__category-title {
    font-weight: 600;
  }

  .#{$prefix}--navigation__category--expanded
    .#{$prefix}--navigation__category-title
    > svg {
    transform: rotate(180deg);
  }

  .#{$prefix}--navigation__category--expanded
    .#{$prefix}--navigation__category-items {
    display: block;
    visibility: inherit;
  }

  //----------------------------------------------------------------------------
  // Nav Icon
  //----------------------------------------------------------------------------
  .#{$prefix}--navigation-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: mini-units(6);
    min-width: mini-units(6);
    height: mini-units(5);
    margin-right: mini-units(1);
  }
}
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Requires**:
  - [button-reset [mixin]](#button-reset-mixin)
  - [mini-units [function]](#mini-units-function)
  - [z [function]](#z-function)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)

### ❌product-switcher [mixin]

UI shell product switcher

<details>
<summary>Source code</summary>

```scss
@mixin product-switcher() {
  //--------------------------------------------------------------------------
  // Global Panel
  //--------------------------------------------------------------------------
  .#{$prefix}--panel--overlay {
    position: fixed;
    top: mini-units(6);
    right: 0;
    bottom: 0;
    width: mini-units(32);
    will-change: transform;
    transform: translate3d(100%, 0, 0);
    padding: 1rem 0;
    overflow-y: auto;
    z-index: 1000;
    background-color: $shell-header-bg-02;
    height: 100%;
    overflow-x: hidden;
    transition: transform 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);
  }

  .#{$prefix}--panel--expanded {
    box-shadow: 0 8px 16px 0 rgba($shell-ui-03, 0.25);
    transform: translate3d(0, 0, 0);
  }

  //--------------------------------------------------------------------------
  // Switcher - Search
  //--------------------------------------------------------------------------
  .#{$prefix}--product-switcher__search {
    padding: 0 mini-units(2);
    margin-bottom: mini-units(3);
  }

  .#{$prefix}--search--shell input {
    background-color: $shell-header-bg-05;
  }

  //--------------------------------------------------------------------------
  // Switcher - Buttons
  //--------------------------------------------------------------------------
  .#{$prefix}--product-switcher__subheader,
  .#{$prefix}--product-switcher__all-btn {
    @include type-style('body-short-01');
    padding: mini-units(1);
    color: $shell-header-text-03;
  }

  .#{$prefix}--product-switcher__subheader {
    padding-left: mini-units(7);
  }

  .#{$prefix}--product-switcher__all-btn {
    padding-left: mini-units(7);
  }

  .#{$prefix}--product-switcher__all-btn,
  .#{$prefix}--product-switcher__back-btn {
    display: inline-block;
    background: transparent;
    width: 100%;
    border: none;
    color: $shell-header-link;
    cursor: pointer;
    text-align: left;
  }

  .#{$prefix}--product-switcher__all-btn:hover,
  .#{$prefix}--product-switcher__back-btn:hover {
    text-decoration: underline;
  }

  .#{$prefix}--product-switcher__all-btn:focus,
  .#{$prefix}--product-switcher__back-btn:focus {
    outline: none;
    box-shadow: inset 0 0 0 3px $shell-header-link;
  }

  .#{$prefix}--product-switcher__back-btn {
    display: flex;
    align-items: center;
    @include type-style('body-short-01');
    padding: mini-units(1) mini-units(2);
  }

  .#{$prefix}--product-switcher__back-arrow {
    fill: $shell-header-link;
    margin-right: mini-units(2);
  }

  //--------------------------------------------------------------------------
  // Switcher - Product List
  //--------------------------------------------------------------------------
  .#{$prefix}--product-list__item {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .#{$prefix}--product-list__item:hover {
    background: $shell-header-bg-03;
  }

  .#{$prefix}--product-link {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: mini-units(1) mini-units(2);
    text-decoration: none;
  }

  .#{$prefix}--product-link:focus {
    outline: none;
    box-shadow: inset 0 0 0 3px $shell-header-link;
  }

  .#{$prefix}--product-switcher__icon {
    margin-right: mini-units(2);
  }

  .#{$prefix}--product-link__name {
    @include type-style('body-short-01');
    margin-left: 0.25rem;
    font-weight: 400;
    color: $shell-header-text-02;
  }

  .#{$prefix}--product-switcher__product-list .#{$prefix}--overflow-menu {
    display: none;
    justify-content: center;
    align-items: center;
    width: mini-units(5);

    &.#{$prefix}--overflow-menu--open {
      display: flex;
    }
  }

  .#{$prefix}--product-switcher__product-list .#{$prefix}--overflow-menu > svg {
    fill: $shell-header-text-02;
  }

  .#{$prefix}--product-switcher__product-list .#{$prefix}--overflow-menu:hover {
    background: $shell-header-bg-04;
  }

  .#{$prefix}--product-switcher__product-list
    .#{$prefix}--overflow-menu:hover
    > svg {
    fill: $shell-header-text-02;
  }

  .#{$prefix}--product-switcher__product-list .#{$prefix}--overflow-menu:focus {
    display: flex;
    outline: none;
    box-shadow: inset 0 0 0 3px $shell-header-link;
  }

  .#{$prefix}--product-switcher__product-list
    .#{$prefix}--overflow-menu-options__option:hover {
    background: $shell-header-bg-03;
  }

  .#{$prefix}--product-list__item:hover .#{$prefix}--overflow-menu {
    display: flex;
  }
}
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Requires**:
  - [type-style [mixin]](#type-style-mixin)
  - [mini-units [function]](#mini-units-function)
  - [prefix [variable]](#prefix-variable)
  - [shell-header-bg-02 [variable]](#shell-header-bg-02-variable)
  - [shell-ui-03 [variable]](#shell-ui-03-variable)
  - [shell-header-bg-05 [variable]](#shell-header-bg-05-variable)
  - [shell-header-text-03 [variable]](#shell-header-text-03-variable)
  - [shell-header-link [variable]](#shell-header-link-variable)
  - [shell-header-bg-03 [variable]](#shell-header-bg-03-variable)
  - [shell-header-text-02 [variable]](#shell-header-text-02-variable)
  - [shell-header-bg-04 [variable]](#shell-header-bg-04-variable)

### ❌experimental-focus [mixin]

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

- **Group**: [ui-shell](#ui-shell)
- **Requires**:
  - [shell-side-nav-accent-01 [variable]](#shell-side-nav-accent-01-variable)
- **Used by**:
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌text-overflow [mixin]

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

- **Group**: [ui-shell](#ui-shell)

### ❌expanded [mixin]

Helper for handling selectors for the expansion state of the side-nav.
This helper makes it easier to write code for children that need to respond
to whether the side-nav is open, or closed. For convenience, we also
optionally set properties for opacity and visibility to help with the
transition animation.

<details>
<summary>Source code</summary>

```scss
@mixin expanded($opacity: false, $visibility: false) {
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

| Name          | Description | Type   | Default value |
| ------------- | ----------- | ------ | ------------- |
| `$opacity`    | —           | `Bool` | `false`       |
| `$visibility` | —           | `Bool` | `false`       |

- **Group**: [ui-shell](#ui-shell)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
- **Used by**:
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌carbon-side-nav [mixin]

UI shell side nav

<details>
<summary>Source code</summary>

```scss
@mixin carbon-side-nav() {
  //----------------------------------------------------------------------------
  // Side-nav > Panel
  //----------------------------------------------------------------------------
  // Used for rendering the actual side rail. There are two states that we have
  // to style for, namely for when the rail is collapsed and expanded. When
  // collapsed, the rail is intended to expand on hover. When expanded, it
  // should have the same dimensions as when expanded on hover.
  .#{$prefix}--side-nav {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: mini-units(6);
    max-width: mini-units(32);
    color: $shell-side-nav-text-01;
    background-color: $shell-side-nav-bg-01;
    will-change: width;
    // TODO: sync with motion work
    transition: width 0.11s cubic-bezier(0.2, 0, 1, 0.9);
    // Useful to toggle this property to see what's going on when not expanded
    overflow: hidden;
    // Separates out the panel from the header of the same color
    border-top: 1px solid $ibm-color__gray-80;
    z-index: z('header');
  }

  .#{$prefix}--side-nav:not(.#{$prefix}--side-nav--fixed):hover,
  .#{$prefix}--side-nav--expanded {
    width: mini-units(32);
  }

  // When used alongside the header, we update the `top` positioning so that we
  // can fit both widgets on the same page without overlapping.
  .#{$prefix}--header ~ .#{$prefix}--side-nav {
    top: mini-units(6);
  }

  .#{$prefix}--side-nav--fixed {
    width: mini-units(26);
  }

  //----------------------------------------------------------------------------
  // Side-nav > Navigation
  //----------------------------------------------------------------------------
  .#{$prefix}--side-nav__navigation {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  //----------------------------------------------------------------------------
  // Side-nav > Navigation > Header
  //----------------------------------------------------------------------------
  .#{$prefix}--side-nav__header {
    display: flex;
    border-bottom: 1px solid $ibm-color__gray-80;
    width: 100%;
    height: mini-units(6);
    max-width: 100%;

    @include expanded() {
      height: auto;
    }
  }

  //----------------------------------------------------------------------------
  // Side-nav > Navigation > Header > Details
  //----------------------------------------------------------------------------
  .#{$prefix}--side-nav__details {
    display: flex;
    flex-direction: column;
    padding-right: mini-units(2);
    // Necessary for text truncation in title
    // https://css-tricks.com/flexbox-truncated-text/#article-header-id-3
    flex: 1;
    min-width: 0;

    @include expanded($opacity: true, $visibility: true);
  }

  .#{$prefix}--side-nav__title {
    @include text-overflow();

    // TODO: sync with type styles
    font-size: rem(14px);
    font-weight: 600;
    letter-spacing: 0.1px;
    margin-top: mini-units(2);
    user-select: none;
  }

  // Sync up between our title and select field to get position logic for
  // text
  .#{$prefix}--side-nav__title,
  .#{$prefix}--side-nav__select {
    padding-left: mini-units(1);
  }

  //----------------------------------------------------------------------------
  // Side-nav > Navigation > Header > Switcher
  //----------------------------------------------------------------------------
  .#{$prefix}--side-nav__switcher {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .#{$prefix}--side-nav__switcher-chevron {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: mini-units(1);
    bottom: 0;
    fill: $shell-side-nav-icon-01;
  }

  .#{$prefix}--side-nav__select {
    appearance: none;
    flex: 1 1 0%;
    background-color: $shell-header-bg-01;
    color: $shell-header-text-01;
    height: 100%;
    border: none;
    border-radius: 0;
    cursor: pointer;
    font-size: rem(12px);
    height: mini-units(4);
    // Flex bug, used to have the select node respect the width if a child has a
    // value that is longer than the width of the select
    min-width: 0;
    // Buffer the right hand side of select so text doesn't overlay the chevron
    padding-right: mini-units(4);
  }

  .#{$prefix}--side-nav__select:focus {
    @include experimental-focus();
  }

  //----------------------------------------------------------------------------
  // Side-nav > Navigation > Footer
  //----------------------------------------------------------------------------
  .#{$prefix}--side-nav__footer {
    flex: 0 0 rem(48px);
    width: 100%;
    background-color: $shell-side-nav-bg-02;
  }

  .#{$prefix}--side-nav__toggle {
    @include button-reset($width: true);
    height: 100%;
    text-align: left;
  }

  .#{$prefix}--side-nav__toggle:hover {
    background-color: $shell-side-nav-bg-03;
  }

  .#{$prefix}--side-nav__toggle:focus {
    @include experimental-focus();
  }

  .#{$prefix}--side-nav__toggle:active {
    background-color: $shell-side-nav-accent-01;
  }

  //----------------------------------------------------------------------------
  // Side-nav > Navigation > Item(s)
  //----------------------------------------------------------------------------
  .#{$prefix}--side-nav__items {
    flex: 1 1 0%;
    overflow: hidden;

    @include expanded() {
      overflow-y: auto;
    }
  }

  // Force all of our side navigation items to be the same dimensions. When our
  // menu expands, we can undo the forced dimensions.
  .#{$prefix}--side-nav__item {
    width: mini-units(6);
    height: mini-units(6);
    overflow: hidden;

    @include expanded() {
      width: auto;
      height: auto;
    }
  }

  .#{$prefix}--side-nav__item:not(.#{$prefix}--side-nav__item--active):hover {
    // TODO: sync color
    background-color: #333333;
  }

  .#{$prefix}--side-nav__item--active {
    // TODO: sync color
    background-color: #3d3d3d;
  }

  //----------------------------------------------------------------------------
  // Side-nav > Navigation > {Menu,Submenu}
  //----------------------------------------------------------------------------
  .#{$prefix}--side-nav__submenu[aria-haspopup='true'] {
    @include button-reset($width: true);

    display: flex;
    align-items: center;
    color: $shell-side-nav-text-01;
    // TODO: sync type
    font-size: rem(14px);
    line-height: rem(20px);
    height: mini-units(6);
    user-select: none;
  }

  .#{$prefix}--side-nav__submenu:focus {
    @include experimental-focus();
  }

  .#{$prefix}--side-nav__submenu-title {
    @include text-overflow();
  }

  .#{$prefix}--side-nav__icon.#{$prefix}--side-nav__submenu-chevron {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: mini-units(2);
  }

  .#{$prefix}--side-nav__submenu[aria-expanded='true']
    .#{$prefix}--side-nav__submenu-chevron
    > svg {
    transform: rotate(180deg);
  }

  .#{$prefix}--side-nav__menu[role='menu'] {
    display: block;
    visibility: hidden;
    max-height: 0;
    transition: $transition--expansion max-height $carbon--ease-out, $transition--expansion
        visibility $carbon--standard-easing;
  }

  .#{$prefix}--side-nav__submenu[aria-expanded='true']
    + .#{$prefix}--side-nav__menu[role='menu'] {
    max-height: 1500px;
    visibility: inherit;
    transition: $transition--expansion max-height $carbon--ease-in, $transition--expansion
        visibility $carbon--standard-easing;
  }

  .#{$prefix}--side-nav__menu[role='menu']
    a.#{$prefix}--side-nav__link[role='menuitem'] {
    height: mini-units(4);
    min-height: mini-units(4);
    padding-left: mini-units(7);
  }

  .#{$prefix}--side-nav__menu[role='menu']
    a.#{$prefix}--side-nav__link[role='menuitem']:not(.#{$prefix}--side-nav__link--current):not([aria-current='page']):hover {
    // TODO: sync with color
    background-color: #4c4c4c;
  }

  .#{$prefix}--side-nav__menu[role='menu']
    a.#{$prefix}--side-nav__link--current,
  .#{$prefix}--side-nav__menu[role='menu']
    a.#{$prefix}--side-nav__link[aria-current='page'] {
    background-color: $ibm-color__gray-70;
  }

  //----------------------------------------------------------------------------
  // Side-nav > Link
  //----------------------------------------------------------------------------
  a.#{$prefix}--side-nav__link {
    position: relative;
    display: flex;
    align-items: center;
    text-decoration: none;
    min-height: mini-units(6);
    padding-right: mini-units(2);
    font-weight: 400;
  }

  .#{$prefix}--side-nav__submenu > .#{$prefix}--side-nav__icon,
  a.#{$prefix}--side-nav__link > .#{$prefix}--side-nav__icon {
    margin-right: mini-units(1);
  }

  a.#{$prefix}--side-nav__link > .#{$prefix}--side-nav__link-text {
    @include text-overflow();
    color: $shell-side-nav-text-01;
    font-size: rem(14px);
    letter-spacing: 0.1px;
    line-height: rem(20px);
    user-select: none;
  }

  a.#{$prefix}--side-nav__link:focus {
    @include experimental-focus();
  }

  a.#{$prefix}--side-nav__link[aria-current='page'],
  a.#{$prefix}--side-nav__link--current {
    font-weight: 600;
  }

  a.#{$prefix}--side-nav__link[aria-current='page']::before,
  a.#{$prefix}--side-nav__link--current::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    background-color: $shell-side-nav-accent-01;
  }

  //----------------------------------------------------------------------------
  // Side-nav > Icons
  //----------------------------------------------------------------------------
  .#{$prefix}--side-nav__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: mini-units(6);
    height: mini-units(6);
    // Helpful in flex containers so the icon does not have less than the
    // expected width
    flex: 0 0 mini-units(6);
  }

  .#{$prefix}--side-nav__icon > svg {
    fill: $shell-side-nav-icon-01;
  }

  .#{$prefix}--side-nav__icon > svg.#{$prefix}--side-nav-collapse-icon {
    display: none;
  }

  .#{$prefix}--side-nav--expanded
    .#{$prefix}--side-nav__icon
    > svg.#{$prefix}--side-nav-expand-icon {
    display: none;
  }

  .#{$prefix}--side-nav--expanded
    .#{$prefix}--side-nav__icon
    > svg.#{$prefix}--side-nav-collapse-icon {
    display: block;
  }

  //----------------------------------------------------------------------------
  // Variants - Fixed
  //----------------------------------------------------------------------------
  .#{$prefix}--side-nav--fixed a.#{$prefix}--side-nav__link,
  .#{$prefix}--side-nav--fixed
    .#{$prefix}--side-nav__submenu[aria-haspopup='true'] {
    padding-left: mini-units(2);
  }

  .#{$prefix}--side-nav--fixed
    .#{$prefix}--side-nav__menu[role='menu']
    a.#{$prefix}--side-nav__link {
    padding-left: mini-units(4);
  }
}
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Requires**:
  - [expanded [mixin]](#expanded-mixin)
  - [text-overflow [mixin]](#text-overflow-mixin)
  - [experimental-focus [mixin]](#experimental-focus-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [mini-units [function]](#mini-units-function)
  - [z [function]](#z-function)
  - [rem [function]](#rem-function)
  - [prefix [variable]](#prefix-variable)
  - [shell-side-nav-text-01 [variable]](#shell-side-nav-text-01-variable)
  - [shell-side-nav-bg-01 [variable]](#shell-side-nav-bg-01-variable)
  - [shell-side-nav-icon-01 [variable]](#shell-side-nav-icon-01-variable)
  - [shell-header-bg-01 [variable]](#shell-header-bg-01-variable)
  - [shell-header-text-01 [variable]](#shell-header-text-01-variable)
  - [shell-side-nav-bg-02 [variable]](#shell-side-nav-bg-02-variable)
  - [shell-side-nav-bg-03 [variable]](#shell-side-nav-bg-03-variable)
  - [shell-side-nav-accent-01 [variable]](#shell-side-nav-accent-01-variable)
  - [transition--expansion [variable]](#transition--expansion-variable)
  - [carbon--ease-out [variable]](#carbon--ease-out-variable)
  - [carbon--standard-easing [variable]](#carbon--standard-easing-variable)
  - [carbon--ease-in [variable]](#carbon--ease-in-variable)

### ❌shell-header-bg-01 [variable]

Header bar background

<details>
<summary>Source code</summary>

```scss
$shell-header-bg-01: #252525;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header [mixin]](#carbon-header-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌shell-header-bg-02 [variable]

Header-panel background

<details>
<summary>Source code</summary>

```scss
$shell-header-bg-02: #f3f3f3;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [product-switcher [mixin]](#product-switcher-mixin)

### ❌shell-header-bg-03 [variable]

Panel item hover

<details>
<summary>Source code</summary>

```scss
$shell-header-bg-03: #dcdcdc;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [product-switcher [mixin]](#product-switcher-mixin)

### ❌shell-header-bg-04 [variable]

Panel overflow hover

<details>
<summary>Source code</summary>

```scss
$shell-header-bg-04: #bebebe;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [product-switcher [mixin]](#product-switcher-mixin)

### ❌shell-header-bg-05 [variable]

Panel input background

<details>
<summary>Source code</summary>

```scss
$shell-header-bg-05: #fff;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [product-switcher [mixin]](#product-switcher-mixin)

### ❌shell-header-bg-06 [variable]

Header Nav Link hober

<details>
<summary>Source code</summary>

```scss
$shell-header-bg-06: #4c4c4c;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`

### ❌shell-header-text-01 [variable]

Primary text in header-panel, Item text

<details>
<summary>Source code</summary>

```scss
$shell-header-text-01: #f3f3f3;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header [mixin]](#carbon-header-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌shell-header-text-02 [variable]

Secondary text in header-panel, Item text

<details>
<summary>Source code</summary>

```scss
$shell-header-text-02: #171717;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [product-switcher [mixin]](#product-switcher-mixin)

### ❌shell-header-text-03 [variable]

Secondary text in header-panel, Category label

<details>
<summary>Source code</summary>

```scss
$shell-header-text-03: #8c8c8c;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [product-switcher [mixin]](#product-switcher-mixin)

### ❌shell-header-icon-01 [variable]

Header bar icons

<details>
<summary>Source code</summary>

```scss
$shell-header-icon-01: #f3f3f3;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header [mixin]](#carbon-header-mixin)

### ❌shell-header-icon-02 [variable]

Icons in header panel

<details>
<summary>Source code</summary>

```scss
$shell-header-icon-02: #252525;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`

### ❌shell-header-link [variable]

Item link

<details>
<summary>Source code</summary>

```scss
$shell-header-link: #0062ff;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [product-switcher [mixin]](#product-switcher-mixin)

### ❌shell-header-icon-selected [variable]

Header icon selected state background

<details>
<summary>Source code</summary>

```scss
$shell-header-icon-selected: #0062ff;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`

### ❌shell-side-nav-bg-01 [variable]

Side-nav panel background

<details>
<summary>Source code</summary>

```scss
$shell-side-nav-bg-01: $ibm-color__gray-90;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌shell-side-nav-bg-02 [variable]

Selected category background
Select L2 flatted item background
Item hover background
Footer-bar background

<details>
<summary>Source code</summary>

```scss
$shell-side-nav-bg-02: $ibm-color__gray-80;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌shell-side-nav-bg-03 [variable]

Selected L2 nested item

<details>
<summary>Source code</summary>

```scss
$shell-side-nav-bg-03: $ibm-color__gray-70;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌shell-side-nav-text-01 [variable]

Primary text in side-nav
L2 Flatten item text
L2 Nested item text
L1 title text

<details>
<summary>Source code</summary>

```scss
$shell-side-nav-text-01: $ibm-color__gray-10;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌shell-side-nav-text-02 [variable]

Secondary text in side nav
L2 Category label

<details>
<summary>Source code</summary>

```scss
$shell-side-nav-text-02: $ibm-color__gray-30;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`

### ❌shell-side-nav-icon-01 [variable]

side-nav icon color

<details>
<summary>Source code</summary>

```scss
$shell-side-nav-icon-01: $ibm-color__gray-10;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌shell-side-nav-accent-01 [variable]

item highlight bar

<details>
<summary>Source code</summary>

```scss
$shell-side-nav-accent-01: $ibm-color__blue-60;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [experimental-focus [mixin]](#experimental-focus-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌shell-brand-01 [variable]

Temporary token

<details>
<summary>Source code</summary>

```scss
$shell-brand-01: #0062ff;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header [mixin]](#carbon-header-mixin)

### ❌shell-ui-02 [variable]

Temporary token

<details>
<summary>Source code</summary>

```scss
$shell-ui-02: #3d3d3d;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`

### ❌shell-ui-03 [variable]

Temporary token

<details>
<summary>Source code</summary>

```scss
$shell-ui-03: #000;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [product-switcher [mixin]](#product-switcher-mixin)

### ❌unit [variable]

Use rem here to accomodate zoom behavior

<details>
<summary>Source code</summary>

```scss
$unit: 0.5rem;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Used by**:
  - [mini-units [function]](#mini-units-function)
- **Links**:
  - [Link](https://github.com/IBM/carbon-components/pull/1032#discussion_r210418579)

## general

### ✅spacing--columns--first [variable]

Spacing for cells that are the first in their row
@access private
@group data-table

<details>
<summary>Source code</summary>

```scss
$spacing--columns--first: 1.5rem;
```

</details>

- **Group**: [general](#general)

### ✅spacing--columns--before [variable]

Spacing before columns in cell
@access private
@group data-table

<details>
<summary>Source code</summary>

```scss
$spacing--columns--before: 0.75rem;
```

</details>

- **Group**: [general](#general)

### ✅spacing--cell--activity [variable]

Spacing for activity areas in a cell, namely status and actions
@access private
@group data-table

<details>
<summary>Source code</summary>

```scss
$spacing--cell--activity: 3.5rem;
```

</details>

- **Group**: [general](#general)

### ✅spacing--cell--status [variable]

Offset used on input nodes to offer space to activity indicators such that
the input doesn't overlap with the status
@access private
@group data-table

<details>
<summary>Source code</summary>

```scss
$spacing--cell--status: 2rem;
```

</details>

- **Group**: [general](#general)

### ✅spacing--cell-actions [variable]

Spacing that should exist around, and in-between, elements in the action
bar
@access private
@group data-table

<details>
<summary>Source code</summary>

```scss
$spacing--cell-actions: 0.5rem;
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
- **Type**: `Value @access public @group global`
- **Used by**:
  - [dropdown [mixin]](#dropdown-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [text-area [mixin]](#text-area-mixin)

### ✅input-label-weight [variable]

<details>
<summary>Source code</summary>

```scss
$input-label-weight: 400 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group global`
- **Used by**:
  - [form [mixin]](#form-mixin)
  - [form--x [mixin]](#form--x-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅disabled [variable]

<details>
<summary>Source code</summary>

```scss
$disabled: $disabled-02 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group global`
- **Used by**:
  - [button--x [mixin]](#button--x-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [radio-button--experimental [mixin]](#radio-button--experimental-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [toggle--x [mixin]](#toggle--x-mixin)

### ✅disabled-background-color [variable]

<details>
<summary>Source code</summary>

```scss
$disabled-background-color: $disabled-01 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group global`
- **Used by**:
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)

### ✅focus [variable]

<details>
<summary>Source code</summary>

```scss
$focus: $ibm-color__blue-60 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group global`

### ✅link-visited [variable]

<details>
<summary>Source code</summary>

```scss
$link-visited: $ibm-color__purple-60 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group link`
- **Used by**:
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅link-inverse-color [variable]

<details>
<summary>Source code</summary>

```scss
$link-inverse-color: #6ea6ff !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group link`
- **Used by**:
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)

### ✅tooltip-background-color [variable]

<details>
<summary>Source code</summary>

```scss
$tooltip-background-color: $inverse-02 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group tooltip`
- **Used by**:
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅button-font-weight [variable]

<details>
<summary>Source code</summary>

```scss
$button-font-weight: 400 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group button`
- **Used by**:
  - [button-base [mixin]](#button-base-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅button-font-size [variable]

<details>
<summary>Source code</summary>

```scss
$button-font-size: 0.875rem !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group button`
- **Used by**:
  - [button-base [mixin]](#button-base-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅button-border-radius [variable]

<details>
<summary>Source code</summary>

```scss
$button-border-radius: 0 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group`
- **Used by**:
  - [button-base [mixin]](#button-base-mixin)
  - [button-base--x [mixin]](#button-base--x-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅button-height [variable]

<details>
<summary>Source code</summary>

```scss
$button-height: 48px !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group`
- **Used by**:
  - [button-base [mixin]](#button-base-mixin)
  - [button-base--x [mixin]](#button-base--x-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅button-padding [variable]

<details>
<summary>Source code</summary>

```scss
$button-padding: 0.875rem 63px 0.875rem 15px !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Value @access public @group button`
- **Used by**:
  - [button-base [mixin]](#button-base-mixin)
  - [button-base--x [mixin]](#button-base--x-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [pagination-nav-base [mixin]](#pagination-nav-base-mixin)
  - [pagination-nav [mixin]](#pagination-nav-mixin)

### ✅button-padding-sm [variable]

<details>
<summary>Source code</summary>

```scss
$button-padding-sm: 0.375rem 63px 0.375rem 15px !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Value @access public @group button`
- **Used by**:
  - [button [mixin]](#button-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅button-padding-lg [variable]

<details>
<summary>Source code</summary>

```scss
$button-padding-lg: $carbon--spacing-04 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group button`
- **Used by**:
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅button-border-width [variable]

<details>
<summary>Source code</summary>

```scss
$button-border-width: 1px !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group button`
- **Used by**:
  - [button [mixin]](#button-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [button-theme [mixin]](#button-theme-mixin)
  - [button-theme--x [mixin]](#button-theme--x-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅button-outline-width [variable]

<details>
<summary>Source code</summary>

```scss
$button-outline-width: 3px !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group button`
- **Used by**:
  - [button-base--x [mixin]](#button-base--x-mixin)
  - [button-theme--x [mixin]](#button-theme--x-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅button-outline-offset [variable]

<details>
<summary>Source code</summary>

```scss
$button-outline-offset: -5px !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group button`
- **Used by**:
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅button-outline [variable]

<details>
<summary>Source code</summary>

```scss
$button-outline: 1px solid $ibm-color__white-0 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Value @access public @group button`
- **Used by**:
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅accordion-flex-direction [variable]

<details>
<summary>Source code</summary>

```scss
$accordion-flex-direction: row-reverse !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Value @access public @group accordion`
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅accordion-justify-content [variable]

<details>
<summary>Source code</summary>

```scss
$accordion-justify-content: flex-start !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Value @access public @group accordion`
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅accordion-arrow-margin [variable]

<details>
<summary>Source code</summary>

```scss
$accordion-arrow-margin: 0 $carbon--spacing-05 0 0 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Value @access public @group accordion`
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅accordion-title-margin [variable]

<details>
<summary>Source code</summary>

```scss
$accordion-title-margin: 0 0 0 $carbon--spacing-05 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Value @access public @group accordion`
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅accordion-content-padding [variable]

<details>
<summary>Source code</summary>

```scss
$accordion-content-padding: 0 0 0 $carbon--spacing-05 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Value @access public @group accordion`
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅checkbox-border-width [variable]

<details>
<summary>Source code</summary>

```scss
$checkbox-border-width: 2px !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group checkbox`
- **Used by**:
  - [checkbox [mixin]](#checkbox-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅snippet-background-color [variable]

<details>
<summary>Source code</summary>

```scss
$snippet-background-color: $ui-01 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group code-snippet`
- **Used by**:
  - [bx--snippet [mixin]](#bx--snippet-mixin)
  - [bx--snippet--x [mixin]](#bx--snippet--x-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅snippet-border-color [variable]

<details>
<summary>Source code</summary>

```scss
$snippet-border-color: $ui-03 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group code-snippet`
- **Used by**:
  - [bx--snippet [mixin]](#bx--snippet-mixin)
  - [bx--snippet--x [mixin]](#bx--snippet--x-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅content-switcher-border-radius [variable]

<details>
<summary>Source code</summary>

```scss
$content-switcher-border-radius: 0px !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group content-switcher`
- **Used by**:
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅content-switcher-option-border [variable]

<details>
<summary>Source code</summary>

```scss
$content-switcher-option-border: 1px solid $brand-01 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group content-switcher`
- **Used by**:
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅content-switcher-divider [variable]

<details>
<summary>Source code</summary>

```scss
$content-switcher-divider: $ui-03 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group content-switcher`
- **Used by**:
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅data-table-heading-transform [variable]

<details>
<summary>Source code</summary>

```scss
$data-table-heading-transform: uppercase !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Value @access public @group data-table`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅data-table-heading-border-bottom [variable]

<details>
<summary>Source code</summary>

```scss
$data-table-heading-border-bottom: 1px solid $brand-01 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Value @access public @group data-table`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅data-table-row-height [variable]

<details>
<summary>Source code</summary>

```scss
$data-table-row-height: 2rem !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group data-table`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅data-table-zebra-color [variable]

<details>
<summary>Source code</summary>

```scss
$data-table-zebra-color: #fcfcfc !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group data-table`
- **Used by**:
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅data-table-column-hover [variable]

<details>
<summary>Source code</summary>

```scss
$data-table-column-hover: $hover-selected-ui !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group data-table`
- **Used by**:
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [data-table-sort--x [mixin]](#data-table-sort--x-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅date-picker-in-range-background-color [variable]

<details>
<summary>Source code</summary>

```scss
$date-picker-in-range-background-color: $ibm-color__blue-20 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group data-table`
- **Used by**:
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅modal-border-top [variable]

<details>
<summary>Source code</summary>

```scss
$modal-border-top: $brand-01 4px solid !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group modal`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [modal [mixin]](#modal-mixin)

### ✅modal-footer-background-color [variable]

<details>
<summary>Source code</summary>

```scss
$modal-footer-background-color: $ui-03 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group modal`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [modal [mixin]](#modal-mixin)
  - [modal--x [mixin]](#modal--x-mixin)

### ✅notification-info-background-color [variable]

<details>
<summary>Source code</summary>

```scss
$notification-info-background-color: $ibm-color__blue-10 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group notification`
- **Used by**:
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)

### ✅notification-error-background-color [variable]

<details>
<summary>Source code</summary>

```scss
$notification-error-background-color: $ibm-color__red-10 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group notification`
- **Used by**:
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)

### ✅notification-warning-background-color [variable]

<details>
<summary>Source code</summary>

```scss
$notification-warning-background-color: rgba(#fdd13a, 0.15) !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group notification`
- **Used by**:
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)

### ✅notification-success-background-color [variable]

<details>
<summary>Source code</summary>

```scss
$notification-success-background-color: $ibm-color__green-10 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group notification`
- **Used by**:
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)

### ✅progress-indicator-bar-width [variable]

<details>
<summary>Source code</summary>

```scss
$progress-indicator-bar-width: 1px inset transparent !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Value @access public @group progress-indicator`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)

### ✅progress-indicator-stroke-width [variable]

<details>
<summary>Source code</summary>

```scss
$progress-indicator-stroke-width: 5 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group progress-indicator`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)

### ✅progress-indicator-line-offset [variable]

<details>
<summary>Source code</summary>

```scss
$progress-indicator-line-offset: 0.625rem !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group progress-indicator`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)

### ✅copy-active [variable]

<details>
<summary>Source code</summary>

```scss
$copy-active: $active-ui !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group copy-button`
- **Used by**:
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅copy-btn-feedback [variable]

<details>
<summary>Source code</summary>

```scss
$copy-btn-feedback: $ibm-color__gray-80 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group copy-button`
- **Used by**:
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅radio-border-width [variable]

<details>
<summary>Source code</summary>

```scss
$radio-border-width: 1px !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group radio-button`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [radio-button--experimental [mixin]](#radio-button--experimental-mixin)

### ✅structured-list-padding [variable]

<details>
<summary>Source code</summary>

```scss
$structured-list-padding: 2rem !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Number @access public @group structured-list`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅structured-list-text-transform [variable]

<details>
<summary>Source code</summary>

```scss
$structured-list-text-transform: none !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Value @access public @group structured-list`
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
  - [structured-list--x [mixin]](#structured-list--x-mixin)

### ✅tab-underline-color [variable]

<details>
<summary>Source code</summary>

```scss
$tab-underline-color: 3px solid $ibm-color__gray-30 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Value @access public @group tabs`
- **Used by**:
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)

### ✅tab-underline-color-hover [variable]

<details>
<summary>Source code</summary>

```scss
$tab-underline-color-hover: 3px solid $ibm-color__gray-60 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Value @access public @group tabs`
- **Used by**:
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)

### ✅tab-text-disabled [variable]

<details>
<summary>Source code</summary>

```scss
$tab-text-disabled: $ibm-color__gray-30 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group tabs`
- **Used by**:
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)

### ✅tab-underline-disabled [variable]

<details>
<summary>Source code</summary>

```scss
$tab-underline-disabled: 3px solid $ibm-color__gray-10 !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Value @access public @group tabs`
- **Used by**:
  - [theme--experimental [mixin]](#theme--experimental-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)

### ✅skeleton [variable]

<details>
<summary>Source code</summary>

```scss
$skeleton: rgba($color__blue-51, 0.1) !default;
```

</details>

- **Group**: [general](#general)
- **Type**: `Color @access public @group skeleton`
- **Used by**:
  - [skeleton [mixin]](#skeleton-mixin)
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)

### ✅⚠️hover-field [variable]

<details>
<summary>Source code</summary>

```scss
$hover-field: $hover-ui !default;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: @type Color
  @access public
  @group global

### ✅⚠️active-01 [variable]

<details>
<summary>Source code</summary>

```scss
$active-01: $active-ui !default;
```

</details>

- **Group**: [general](#general)
- **Deprecated**: @type Color
  @access public
  @group global

### ✅⚠️nav-01 [variable]

<details>
<summary>Source code</summary>

```scss
$nav-01: $color__navy-gray-1 !default;
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: @type Color
  @access public
  @group global

### ✅⚠️nav-02 [variable]

<details>
<summary>Source code</summary>

```scss
$nav-02: $color__blue-90 !default;
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: @type Color
  @access public
  @group

### ✅⚠️nav-03 [variable]

<details>
<summary>Source code</summary>

```scss
$nav-03: $color__purple-30 !default;
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: @type Color
  @access public
  @group global

### ✅⚠️nav-04 [variable]

<details>
<summary>Source code</summary>

```scss
$nav-04: $color__purple-60 !default;
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: @type Color
  @access public
  @group global

### ✅⚠️nav-05 [variable]

<details>
<summary>Source code</summary>

```scss
$nav-05: $color__teal-40 !default;
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: @type Color
  @access public
  @group global

### ✅⚠️nav-06 [variable]

<details>
<summary>Source code</summary>

```scss
$nav-06: $color__teal-50 !default;
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: @type Color
  @access public
  @group global

### ✅⚠️nav-07 [variable]

<details>
<summary>Source code</summary>

```scss
$nav-07: $color__blue-30 !default;
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: @type Color
  @access public
  @group global

### ✅⚠️nav-08 [variable]

<details>
<summary>Source code</summary>

```scss
$nav-08: $color__blue-51 !default;
```

</details>

- **Group**: [general](#general)
- **Used by**:
  - [theme [mixin]](#theme-mixin)
  - [theme--experimental [mixin]](#theme--experimental-mixin)
- **Deprecated**: @type Color
  @access public
  @group global

### ✅⚠️rem [function]

Convert px to rem

<details>
<summary>Source code</summary>

```scss
@function rem($px) {
  @return ($px / $base-font-size) * 1rem;
}
```

</details>

- **Parameters**:

| Name  | Description             | Type     | Default value |
| ----- | ----------------------- | -------- | ------------- |
| `$px` | Value of type in pixels | `Number` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
rem(48px);
```

</details>

- **Group**: [general](#general)
- **Returns**: `Number` Type size converted to rem
- **Requires**:
  - [base-font-size [variable]](#base-font-size-variable)
- **Used by**:
  - [accordion--x [mixin]](#accordion--x-mixin)
  - [breadcrumb [mixin]](#breadcrumb-mixin)
  - [breadcrumb--x [mixin]](#breadcrumb--x-mixin)
  - [button [mixin]](#button-mixin)
  - [button--x [mixin]](#button--x-mixin)
  - [button-base [mixin]](#button-base-mixin)
  - [button-base--x [mixin]](#button-base--x-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [checkbox--x [mixin]](#checkbox--x-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [snippet--x [mixin]](#snippet--x-mixin)
  - [bx--snippet [mixin]](#bx--snippet-mixin)
  - [bx--snippet--x [mixin]](#bx--snippet--x-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [content-switcher--x [mixin]](#content-switcher--x-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-v2-action--x [mixin]](#data-table-v2-action--x-mixin)
  - [data-table-v2-core [mixin]](#data-table-v2-core-mixin)
  - [data-table-core--x [mixin]](#data-table-core--x-mixin)
  - [data-table-expandable--x [mixin]](#data-table-expandable--x-mixin)
  - [data-table-v2-sort [mixin]](#data-table-v2-sort-mixin)
  - [data-table-sort--x [mixin]](#data-table-sort--x-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [date-picker--x [mixin]](#date-picker--x-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [dropdown--x [mixin]](#dropdown--x-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [file-uploader--x [mixin]](#file-uploader--x-mixin)
  - [form [mixin]](#form-mixin)
  - [form--x [mixin]](#form--x-mixin)
  - [lists--x [mixin]](#lists--x-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [listbox--x [mixin]](#listbox--x-mixin)
  - [modal [mixin]](#modal-mixin)
  - [modal--x [mixin]](#modal--x-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [inline-notifications--x [mixin]](#inline-notifications--x-mixin)
  - [toast-notifications--x [mixin]](#toast-notifications--x-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [number-input--x [mixin]](#number-input--x-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [overflow-menu--x [mixin]](#overflow-menu--x-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pagination--x [mixin]](#pagination--x-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [progress-indicator--x [mixin]](#progress-indicator--x-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [radio-button--experimental [mixin]](#radio-button--experimental-mixin)
  - [search [mixin]](#search-mixin)
  - [search--x [mixin]](#search--x-mixin)
  - [select [mixin]](#select-mixin)
  - [select--x [mixin]](#select--x-mixin)
  - [slider [mixin]](#slider-mixin)
  - [slider--x [mixin]](#slider--x-mixin)
  - [structured-list [mixin]](#structured-list-mixin)
  - [structured-list--x [mixin]](#structured-list--x-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tabs--x [mixin]](#tabs--x-mixin)
  - [tags [mixin]](#tags-mixin)
  - [tags--x [mixin]](#tags--x-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-area--x [mixin]](#text-area--x-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [text-input--x [mixin]](#text-input--x-mixin)
  - [time-picker [mixin]](#time-picker-mixin)
  - [time-picker--x [mixin]](#time-picker--x-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [toggle--x [mixin]](#toggle--x-mixin)
  - [toolbar [mixin]](#toolbar-mixin)
  - [tooltip [mixin]](#tooltip-mixin)
  - [tooltip--x [mixin]](#tooltip--x-mixin)
  - [carbon-header [mixin]](#carbon-header-mixin)
  - [carbon-navigation [mixin]](#carbon-navigation-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)
- **Deprecated**: (For v10) Use `carbon--rem()`

### ✅⚠️em [function]

Convert px to em

<details>
<summary>Source code</summary>

```scss
@function em($px) {
  @return ($px / $base-font-size) * 1em;
}
```

</details>

- **Parameters**:

| Name  | Description             | Type     | Default value |
| ----- | ----------------------- | -------- | ------------- |
| `$px` | Value of type in pixels | `Number` | —             |

**Example**:

<details>
<summary>Example code</summary>

```scss
em(48px);
```

</details>

- **Group**: [general](#general)
- **Returns**: `Number` Type size converted to em
- **Requires**:
  - [base-font-size [variable]](#base-font-size-variable)
- **Deprecated**: (For v10) Use `carbon--em()`

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
- **Type**: `String`
