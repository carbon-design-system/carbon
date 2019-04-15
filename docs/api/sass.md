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
- [general](#general)
  - [❌data-table-suffix [variable]](#data-table-suffix-variable)
  - [❌data-table-suffix [variable]](#data-table-suffix-variable)
  - [✅mini-units [function]](#mini-units-function)
  - [✅experimental-focus [mixin]](#experimental-focus-mixin)
  - [✅text-overflow [mixin]](#text-overflow-mixin)
  - [✅expanded [mixin]](#expanded-mixin)
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
@mixin carbon--make-col-ready($gutter: $carbon--grid-gutter, $collapsed-gutter: $carbon--grid-gutter--condensed) {
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
@mixin carbon--make-grid-columns($breakpoints: $carbon--grid-breakpoints, $gutter: $carbon--grid-gutter) {
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
@mixin carbon--make-container-max-widths($breakpoints: $carbon--grid-breakpoints) {
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
  - [css-helpers [mixin]](#css-helpers-mixin)
  - [light-ui [mixin]](#light-ui-mixin)
  - [typography [mixin]](#typography-mixin)
  - [expanded [mixin]](#expanded-mixin)

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
@mixin carbon--make-col-ready($gutter: $carbon--grid-gutter, $collapsed-gutter: $carbon--grid-gutter--condensed) {
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

### ❌carbon--make-grid-columns [mixin]

Output the CSS required for all the columns in a given grid system.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-grid-columns($breakpoints: $carbon--grid-breakpoints, $gutter: $carbon--grid-gutter) {
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

### ❌carbon--make-container-max-widths [mixin]

Add in the max-widths for each breakpoint to the container

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-container-max-widths($breakpoints: $carbon--grid-breakpoints) {
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
@function carbon--breakpoint-prev($name, $breakpoints: $carbon--grid-breakpoints, $breakpoint-names: map-keys($breakpoints)) {
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
@function carbon--is-smallest-breakpoint($name, $breakpoints: $carbon--grid-breakpoints) {
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
@function carbon--largest-breakpoint-name($breakpoints: $carbon--grid-breakpoints) {
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
  - [max-breakpoint [mixin]](#max-breakpoint-mixin)

### ✅carbon--breakpoint-between [mixin]

Generate a media query for the range between the lower and upper breakpoints

<details>
<summary>Source code</summary>

```scss
@mixin carbon--breakpoint-between($lower, $upper, $breakpoints: $carbon--grid-breakpoints) {
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
  - [breakpoint [mixin]](#breakpoint-mixin)

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
@function carbon--get-column-width($breakpoint, $breakpoints: $carbon--grid-breakpoints) {
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
  - `spacing-01`

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
  - `spacing-02`

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
  - `spacing-03`

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
  - `spacing-04`

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
  - `spacing-05`

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
  - `spacing-06`

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
  - `spacing-07`

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
  - `spacing-08`

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
  - `spacing-09`

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

| Name                | Description                                                                                                     | Type     | Default value               |
| ------------------- | --------------------------------------------------------------------------------------------------------------- | -------- | --------------------------- |
| `$name`             | The name of the brekapoint                                                                                      | `String` | —                           |
| `$breakpoints`      | A map of breakpoints where the key is the name of the breakpoint and the value is the values for the breakpoint | `Map`    | `$carbon--grid-breakpoints` |
| `$breakpoint-names` | A list of names from the `$breakpoints` map                                                                     | `List`   | `map-keys($breakpoints)`    |

- **Group**: [@carbon/layout](#carbonlayout)
- **Returns**: `String`

### ✅carbon--breakpoint-prev [function]

Get the value of the previous breakpoint, or null for the first breakpoint

<details>
<summary>Source code</summary>

```scss
@function carbon--breakpoint-prev($name, $breakpoints: $carbon--grid-breakpoints, $breakpoint-names: map-keys($breakpoints)) {
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

### ✅carbon--is-smallest-breakpoint [function]

Check to see if the given breakpoint name

<details>
<summary>Source code</summary>

```scss
@function carbon--is-smallest-breakpoint($name, $breakpoints: $carbon--grid-breakpoints) {
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

### ✅carbon--largest-breakpoint-name [function]

Returns the largest breakpoint name

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
| `$breakpoints` | A map of breakpoints where the key is the name | `Map` | `$carbon--grid-breakpoints` |

- **Group**: [@carbon/layout](#carbonlayout)
- **Returns**: `String`
- **Requires**:
  - [carbon--key-by-index [function]](#carbon--key-by-index-function)
  - [breakpoints [variable]](#breakpoints-variable)

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

### ✅carbon--breakpoint-between [mixin]

Generate a media query for the range between the lower and upper breakpoints

<details>
<summary>Source code</summary>

```scss
@mixin carbon--breakpoint-between($lower, $upper, $breakpoints: $carbon--grid-breakpoints) {
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
@function carbon--get-column-width($breakpoint, $breakpoints: $carbon--grid-breakpoints) {
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

0.125rem (2px) spacing with default mini unit

<details>
<summary>Source code</summary>

```scss
$carbon--spacing-01: carbon--mini-units(0.25);
```

</details>

- **Group**: [@carbon/layout](#carbonlayout)
- **Type**: `Number`

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
  - `brand-01`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
  - `brand-02`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
  - `brand-03`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
  - [css-body [mixin]](#css-body-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)

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
  - [css-body [mixin]](#css-body-mixin)
  - [css-body--x [mixin]](#css-body--x-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)

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
  - [focus-outline [mixin]](#focus-outline-mixin)

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
  - [focus-outline [mixin]](#focus-outline-mixin)

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
  - `hover-field`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
  - `active-01`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
  - [focus-outline [mixin]](#focus-outline-mixin)
  - [typography [mixin]](#typography-mixin)
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
- **Deprecated**: This may not be available in future releases

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
@mixin fluid-type-size($type-styles, $name, $breakpoints: $carbon--grid-breakpoints) {
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
@mixin carbon--type-style($name, $fluid: false, $breakpoints: $carbon--grid-breakpoints) {
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
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1gMoW.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa1Xdm.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local('IBMPlexMono-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1gMoW.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwlBFhA.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1i8q0Q.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwlBFhA.woff) format('woff');
  }

  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light Italic'), local('IBMPlexMono-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1jcoQPttoz6Pz.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light Italic'), local('IBMPlexMono-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1hMoQPttoz6Pz.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light Italic'), local('IBMPlexMono-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1j8oQPttoz6Pz.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light Italic'), local('IBMPlexMono-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1jsoQPttoz6Pz.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light Italic'), local('IBMPlexMono-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1gMoQPttozw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa2HdgregdFOFh.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa0XdgregdFOFh.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa2ndgregdFOFh.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa23dgregdFOFh.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa1XdgregdFA.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local('IBMPlexMono-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1jcoQPttoz6Pz.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local('IBMPlexMono-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1hMoQPttoz6Pz.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local('IBMPlexMono-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1j8oQPttoz6Pz.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local('IBMPlexMono-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1jsoQPttoz6Pz.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local('IBMPlexMono-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1gMoQPttozw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwl1FgsAXHNlYzg.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwlRFgsAXHNlYzg.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwl9FgsAXHNlYzg.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwl5FgsAXHNlYzg.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwlBFgsAXHNk.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1iIq131nj-otFQ.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1isq131nj-otFQ.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1iAq131nj-otFQ.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1iEq131nj-otFQ.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1i8q131nj-o.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwl1FgsAXHNlYzg.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwlRFgsAXHNlYzg.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwl9FgsAXHNlYzg.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwl5FgsAXHNlYzg.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwlBFgsAXHNk.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
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
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRcdvfo.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuF6ZP.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local('IBMPlexSans-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJcdvfo.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIFscg.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhdHeEw.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIFscg.woff) format('woff');
  }

  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRce_fuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRccvfuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRcdffuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRceffuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRcePfuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRcdvfuJGl18Q.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuGqZJW9XjDlN8.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuE6ZJW9XjDlN8.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuFKZJW9XjDlN8.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuGKZJW9XjDlN8.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuGaZJW9XjDlN8.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuF6ZJW9XjDg.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local('IBMPlexSans-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJce_fuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local('IBMPlexSans-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJccvfuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local('IBMPlexSans-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJcdffuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local('IBMPlexSans-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJceffuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local('IBMPlexSans-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJcePfuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local('IBMPlexSans-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJcdvfuJGl18Q.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIxsdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIVsdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIJsdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AI5sdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AI9sdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIFsdP3pBms.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhdzeFaxOedfTDw.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhdXeFaxOedfTDw.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhdLeFaxOedfTDw.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhd7eFaxOedfTDw.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhd_eFaxOedfTDw.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhdHeFaxOedc.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIxsdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIVsdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIJsdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AI5sdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AI9sdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIFsdP3pBms.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
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
    src: local('IBM Plex Serif Light Italic'), local('IBMPlexSerif-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm1npiw.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zUTiA.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local('IBMPlexSerif-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m1npiw.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI0q10.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUf2zE.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI0q10.woff) format('woff');
  }

  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light Italic'), local('IBMPlexSerif-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm1TpjfGj7oaMBg.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light Italic'), local('IBMPlexSerif-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm13pjfGj7oaMBg.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light Italic'), local('IBMPlexSerif-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm1bpjfGj7oaMBg.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light Italic'), local('IBMPlexSerif-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm1fpjfGj7oaMBg.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light Italic'), local('IBMPlexSerif-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm1npjfGj7oY.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zgTjnTLgNuZ5w.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zETjnTLgNuZ5w.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zoTjnTLgNuZ5w.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zsTjnTLgNuZ5w.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zUTjnTLgNs.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local('IBMPlexSerif-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m1TpjfGj7oaMBg.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local('IBMPlexSerif-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m13pjfGj7oaMBg.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local('IBMPlexSerif-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m1bpjfGj7oaMBg.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local('IBMPlexSerif-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m1fpjfGj7oaMBg.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local('IBMPlexSerif-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m1npjfGj7oY.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI5q1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SIwq1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI7q1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI6q1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI0q1vjitOh.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUS2zcZiVbJsNo.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUb2zcZiVbJsNo.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUQ2zcZiVbJsNo.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUR2zcZiVbJsNo.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUf2zcZiVbJ.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI5q1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yIwq1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI7q1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI6q1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI0q1vjitOh.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
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

### ✅fluid-type-size [mixin]

Computes the fluid `font-size` for a given type style and breakpoint

<details>
<summary>Source code</summary>

```scss
@mixin fluid-type-size($type-styles, $name, $breakpoints: $carbon--grid-breakpoints) {
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

### ✅carbon--type-style [mixin]

Helper mixin to include the styles for a given token in any selector in your
project. Also includes an optional fluid option that will enable fluid
styles for the token if they are defined. Fluid styles will cause the
token's font-size to be computed based on the viewport size. As a result, use
with caution in fixed contexts.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--type-style($name, $fluid: false, $breakpoints: $carbon--grid-breakpoints) {
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
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1gMoW.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa1Xdm.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local('IBMPlexMono-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1gMoW.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwlBFhA.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1i8q0Q.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwlBFhA.woff) format('woff');
  }

  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light Italic'), local('IBMPlexMono-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1jcoQPttoz6Pz.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light Italic'), local('IBMPlexMono-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1hMoQPttoz6Pz.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light Italic'), local('IBMPlexMono-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1j8oQPttoz6Pz.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light Italic'), local('IBMPlexMono-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1jsoQPttoz6Pz.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light Italic'), local('IBMPlexMono-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1gMoQPttozw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa2HdgregdFOFh.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa0XdgregdFOFh.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa2ndgregdFOFh.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa23dgregdFOFh.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Italic'), local('IBMPlexMono-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6pfjptAgt5VM-kVkqdyU8n1ioa1XdgregdFA.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local('IBMPlexMono-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1jcoQPttoz6Pz.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local('IBMPlexMono-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1hMoQPttoz6Pz.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local('IBMPlexMono-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1j8oQPttoz6Pz.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local('IBMPlexMono-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1jsoQPttoz6Pz.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold Italic'), local('IBMPlexMono-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6sfjptAgt5VM-kVkqdyU8n1ioSClN1gMoQPttozw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwl1FgsAXHNlYzg.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwlRFgsAXHNlYzg.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwl9FgsAXHNlYzg.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwl5FgsAXHNlYzg.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono Light'), local('IBMPlexMono-Light'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3oQIwlBFgsAXHNk.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1iIq131nj-otFQ.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1isq131nj-otFQ.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1iAq131nj-otFQ.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1iEq131nj-otFQ.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono'), local('IBMPlexMono'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F63fjptAgt5VM-kVkqdyU8n1i8q131nj-o.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwl1FgsAXHNlYzg.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwlRFgsAXHNlYzg.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwl9FgsAXHNlYzg.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwl5FgsAXHNlYzg.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Mono SemiBold'), local('IBMPlexMono-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexmono/v4/-F6qfjptAgt5VM-kVkqdyU8n3vAOwlBFgsAXHNk.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
}
```

</details>

- **Group**: [@carbon/type](#carbontype)
- **Requires**:
  - [carbon--font-display [variable]](#carbon--font-display-variable)

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
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRcdvfo.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuF6ZP.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local('IBMPlexSans-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJcdvfo.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIFscg.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhdHeEw.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIFscg.woff) format('woff');
  }

  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRce_fuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRccvfuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRcdffuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRceffuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRcePfuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light Italic'), local('IBMPlexSans-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRcdvfuJGl18Q.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuGqZJW9XjDlN8.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuE6ZJW9XjDlN8.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuFKZJW9XjDlN8.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuGKZJW9XjDlN8.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuGaZJW9XjDlN8.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX-KVElMYYaJe8bpLHnCwDKhdTuF6ZJW9XjDg.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local('IBMPlexSans-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJce_fuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local('IBMPlexSans-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJccvfuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local('IBMPlexSans-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJcdffuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local('IBMPlexSans-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJceffuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local('IBMPlexSans-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJcePfuJGl18QRY.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold Italic'), local('IBMPlexSans-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJcdvfuJGl18Q.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIxsdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIVsdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIJsdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AI5sdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AI9sdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIFsdP3pBms.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhdzeFaxOedfTDw.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhdXeFaxOedfTDw.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhdLeFaxOedfTDw.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhd7eFaxOedfTDw.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhd_eFaxOedfTDw.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans'), local('IBMPlexSans'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYXgKVElMYYaJe8bpLHnCwDKhdHeFaxOedc.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIxsdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIVsdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIJsdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AI5sdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AI9sdP3pBmtF8A.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIFsdP3pBms.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
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
    src: local('IBM Plex Serif Light Italic'), local('IBMPlexSerif-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm1npiw.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zUTiA.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local('IBMPlexSerif-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m1npiw.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI0q10.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUf2zE.woff) format('woff');
  }
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI0q10.woff) format('woff');
  }

  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light Italic'), local('IBMPlexSerif-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm1TpjfGj7oaMBg.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light Italic'), local('IBMPlexSerif-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm13pjfGj7oaMBg.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light Italic'), local('IBMPlexSerif-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm1bpjfGj7oaMBg.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light Italic'), local('IBMPlexSerif-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm1fpjfGj7oaMBg.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light Italic'), local('IBMPlexSerif-LightItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xm1npjfGj7oY.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zgTjnTLgNuZ5w.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zETjnTLgNuZ5w.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zoTjnTLgNuZ5w.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zsTjnTLgNuZ5w.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Italic'), local('IBMPlexSerif-Italic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizBREVNn1dOx-zrZ2X3pZvkTiUa6zUTjnTLgNs.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local('IBMPlexSerif-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m1TpjfGj7oaMBg.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local('IBMPlexSerif-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m13pjfGj7oaMBg.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local('IBMPlexSerif-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m1bpjfGj7oaMBg.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local('IBMPlexSerif-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m1fpjfGj7oaMBg.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold Italic'), local('IBMPlexSerif-SemiBoldItalic'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3m1npjfGj7oY.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI5q1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SIwq1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI7q1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI6q1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 300;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif Light'), local('IBMPlexSerif-Light'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI0q1vjitOh.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUS2zcZiVbJsNo.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUb2zcZiVbJsNo.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUQ2zcZiVbJsNo.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUR2zcZiVbJsNo.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif'), local('IBMPlexSerif'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUf2zcZiVbJ.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI5q1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yIwq1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI7q1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI6q1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 600;
    font-display: $carbon--font-display;
    src: local('IBM Plex Serif SemiBold'), local('IBMPlexSerif-SemiBold'),
      url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI0q1vjitOh.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
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
- **Links**:
  - [Link](https://css-tricks.com/almanac/properties/f/font-display/)

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
  @if global-variable-exists(feature-flags) == true and map-get($feature-flags, $feature) == true {
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
    '`@include breakpoint()` has been removed. ' + 'Use `@include carbon--breakpoint()` instead.',
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
  - [grid-container [mixin]](#grid-container-mixin)
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
  - [css-body [mixin]](#css-body-mixin)
  - [css-body--x [mixin]](#css-body--x-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
  - [typography [mixin]](#typography-mixin)

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

## global-typography

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
$font-family-mono: 'ibm-plex-mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace;
```

</details>

- **Group**: [global-typography](#global-typography)
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
$font-family-helvetica: 'IBM Helvetica', Helvetica Neue, HelveticaNeue, Helvetica, sans-serif;
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
| `$size` | Value of type size | `String` | —             |

- **Group**: [global-typography](#global-typography)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [carbon--type-scale [mixin]](#carbon--type-scale-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
  - [typescale-map [variable]](#typescale-map-variable)
- **Used by**:
  - [typography [mixin]](#typography-mixin)
- **Deprecated**: (For v10) Use `@include carbon--type-scale()`

### ✅⚠️helvetica [mixin]

Helvetica Neue font-family declaration

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
  - [css-body [mixin]](#css-body-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)
  - [button-reset [mixin]](#button-reset-mixin)
- **Deprecated**: (For v10) Use `@include carbon--font-family()`

### ✅⚠️line-height [mixin]

Line heights for headings body text

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

- **Group**: [global-typography](#global-typography)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [carbon--type-style [mixin]](#carbon--type-style-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
- **Used by**:
  - [typography [mixin]](#typography-mixin)
- **Deprecated**: (For v10) Use `@include carbon--type-style()`

### ✅⚠️font-smoothing [mixin]

Font smoothing declarations

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

- **Group**: [global-typography](#global-typography)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
- **Used by**:
  - [button-reset [mixin]](#button-reset-mixin)
- **Deprecated**: (For v10) The new type styles doesn't use this

### ✅⚠️letter-spacing [mixin]

Letter spacing declaration

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

- **Group**: [global-typography](#global-typography)
- **Requires**:
  - [deprecate [mixin]](#deprecate-mixin)
  - [feature-flag-enabled [function]](#feature-flag-enabled-function)
- **Used by**:
  - [button-reset [mixin]](#button-reset-mixin)
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
  - [css-body--x [mixin]](#css-body--x-mixin)
  - [css-helpers [mixin]](#css-helpers-mixin)

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
- **Deprecated**: @access public

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
