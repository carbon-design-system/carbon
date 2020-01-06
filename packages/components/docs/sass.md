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
- [accordion](#accordion)
  - [❌accordion [mixin]](#accordion-mixin)
- [breadcrumb](#breadcrumb)
  - [❌breadcrumb [mixin]](#breadcrumb-mixin)
- [button](#button)
  - [❌button [mixin]](#button-mixin)
  - [❌button-base [mixin]](#button-base-mixin)
  - [❌button-theme [mixin]](#button-theme-mixin)
- [checkbox](#checkbox)
  - [❌checkbox [mixin]](#checkbox-mixin)
- [code-snippet](#code-snippet)
  - [❌snippet [mixin]](#snippet-mixin)
  - [❌bx--snippet [mixin]](#bx--snippet-mixin)
- [combo-box](#combo-box)
  - [❌combo-box [mixin]](#combo-box-mixin)
- [content-switcher](#content-switcher)
  - [❌content-switcher [mixin]](#content-switcher-mixin)
- [data-table](#data-table)
  - [❌data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [❌data-table-core [mixin]](#data-table-core-mixin)
  - [❌data-table-expandable [mixin]](#data-table-expandable-mixin)
  - [❌assistive-text [mixin]](#assistive-text-mixin)
  - [❌data-table-sort [mixin]](#data-table-sort-mixin)
- [date-picker](#date-picker)
  - [❌date-picker [mixin]](#date-picker-mixin)
- [dropdown](#dropdown)
  - [❌dropdown [mixin]](#dropdown-mixin)
- [file-uploader](#file-uploader)
  - [❌file-uploader [mixin]](#file-uploader-mixin)
- [form](#form)
  - [❌form [mixin]](#form-mixin)
- [inline-loading](#inline-loading)
  - [❌inline-loading [mixin]](#inline-loading-mixin)
- [link](#link)
  - [❌link [mixin]](#link-mixin)
- [list](#list)
  - [❌lists [mixin]](#lists-mixin)
- [list-box](#list-box)
  - [❌list-box-width [variable]](#list-box-width-variable)
  - [❌list-box-height [variable]](#list-box-height-variable)
  - [❌list-box-inline-height [variable]](#list-box-inline-height-variable)
  - [❌list-box-menu-width [variable]](#list-box-menu-width-variable)
  - [❌listbox [mixin]](#listbox-mixin)
- [loading](#loading)
  - [❌loading [mixin]](#loading-mixin)
  - [❌animation\_\_loading--spin [mixin]](#animation__loading--spin-mixin)
  - [❌animation\_\_loading--stop [mixin]](#animation__loading--stop-mixin)
  - [❌loading\_\_gap [variable]](#loading__gap-variable)
  - [❌loading--small\_\_gap [variable]](#loading--small__gap-variable)
  - [❌loading\_\_size [variable]](#loading__size-variable)
- [modal](#modal)
  - [❌modal [mixin]](#modal-mixin)
- [multi-select](#multi-select)
  - [❌multiselect [mixin]](#multiselect-mixin)
- [notification](#notification)
  - [❌inline-notifications [mixin]](#inline-notifications-mixin)
  - [❌inline-notification--color [mixin]](#inline-notification--color-mixin)
  - [❌notification--color [mixin]](#notification--color-mixin)
  - [❌notification--experimental [mixin]](#notification--experimental-mixin)
  - [❌toast-notifications [mixin]](#toast-notifications-mixin)
- [number-input](#number-input)
  - [❌number-input [mixin]](#number-input-mixin)
- [overflow-menu](#overflow-menu)
  - [❌overflow-menu [mixin]](#overflow-menu-mixin)
- [pagination](#pagination)
  - [❌pagination [mixin]](#pagination-mixin)
- [pagination-nav](#pagination-nav)
  - [❌pseudo-underline [mixin]](#pseudo-underline-mixin)
  - [❌pagination-nav [mixin]](#pagination-nav-mixin)
- [progress-indicator](#progress-indicator)
  - [❌progress-indicator [mixin]](#progress-indicator-mixin)
- [radio-button](#radio-button)
  - [❌radio-button [mixin]](#radio-button-mixin)
- [search](#search)
  - [❌search [mixin]](#search-mixin)
- [select](#select)
  - [❌select [mixin]](#select-mixin)
- [slider](#slider)
  - [❌slider [mixin]](#slider-mixin)
- [structured-list](#structured-list)
  - [❌padding-td--condensed [mixin]](#padding-td--condensed-mixin)
  - [❌padding--data-structured-list [mixin]](#padding--data-structured-list-mixin)
  - [❌padding-th [mixin]](#padding-th-mixin)
  - [❌padding-td [mixin]](#padding-td-mixin)
- [tabs](#tabs)
  - [❌tabs [mixin]](#tabs-mixin)
- [tag](#tag)
  - [❌tag-theme [mixin]](#tag-theme-mixin)
  - [❌tags [mixin]](#tags-mixin)
- [text-area](#text-area)
  - [❌text-area [mixin]](#text-area-mixin)
- [text-input](#text-input)
  - [❌text-input [mixin]](#text-input-mixin)
- [tile](#tile)
  - [❌tile [mixin]](#tile-mixin)
- [time-picker](#time-picker)
  - [❌time-picker [mixin]](#time-picker-mixin)
- [toggle](#toggle)
  - [❌toggle [mixin]](#toggle-mixin)
- [toolbar](#toolbar)
  - [❌toolbar [mixin]](#toolbar-mixin)
- [tooltip](#tooltip)
  - [❌⚠️tooltip--icon [mixin]](#tooltip--icon-mixin)
  - [❌⚠️tooltip--icon-placement [mixin]](#tooltip--icon-placement-mixin)
  - [❌⚠️tooltip--definition--legacy [mixin]](#tooltip--definition--legacy-mixin)
  - [❌⚠️tooltip--icon--legacy [mixin]](#tooltip--icon--legacy-mixin)
  - [❌tooltip [mixin]](#tooltip-mixin)
- [ui-shell](#ui-shell)
  - [❌carbon-content [mixin]](#carbon-content-mixin)
  - [✅mini-units [function]](#mini-units-function)
  - [❌carbon-header-panel [mixin]](#carbon-header-panel-mixin)
  - [❌carbon-header [mixin]](#carbon-header-mixin)
  - [❌carbon-navigation [mixin]](#carbon-navigation-mixin)
  - [❌product-switcher [mixin]](#product-switcher-mixin)
  - [❌text-overflow [mixin]](#text-overflow-mixin)
  - [❌expanded [mixin]](#expanded-mixin)
  - [❌carbon-side-nav [mixin]](#carbon-side-nav-mixin)
  - [❌carbon-switcher [mixin]](#carbon-switcher-mixin)
  - [❌shell-header-bg-01 [variable]](#shell-header-bg-01-variable)
  - [❌shell-header-bg-02 [variable]](#shell-header-bg-02-variable)
  - [❌shell-header-bg-03 [variable]](#shell-header-bg-03-variable)
  - [❌shell-header-bg-04 [variable]](#shell-header-bg-04-variable)
  - [❌shell-header-bg-05 [variable]](#shell-header-bg-05-variable)
  - [❌shell-header-bg-06 [variable]](#shell-header-bg-06-variable)
  - [❌shell-header-border-01 [variable]](#shell-header-border-01-variable)
  - [❌shell-header-focus [variable]](#shell-header-focus-variable)
  - [❌shell-header-text-01 [variable]](#shell-header-text-01-variable)
  - [❌shell-header-text-02 [variable]](#shell-header-text-02-variable)
  - [❌shell-header-icon-01 [variable]](#shell-header-icon-01-variable)
  - [❌shell-header-icon-02 [variable]](#shell-header-icon-02-variable)
  - [❌shell-header-icon-03 [variable]](#shell-header-icon-03-variable)
  - [❌shell-header-link [variable]](#shell-header-link-variable)
  - [❌shell-panel-bg-01 [variable]](#shell-panel-bg-01-variable)
  - [❌shell-panel-bg-02 [variable]](#shell-panel-bg-02-variable)
  - [❌shell-panel-bg-03 [variable]](#shell-panel-bg-03-variable)
  - [❌shell-panel-bg-04 [variable]](#shell-panel-bg-04-variable)
  - [❌shell-panel-border [variable]](#shell-panel-border-variable)
  - [❌shell-panel-text-01 [variable]](#shell-panel-text-01-variable)
  - [❌shell-panel-text-02 [variable]](#shell-panel-text-02-variable)
  - [❌shell-panel-focus [variable]](#shell-panel-focus-variable)
  - [❌shell-side-nav-bg-01 [variable]](#shell-side-nav-bg-01-variable)
  - [❌shell-side-nav-bg-02 [variable]](#shell-side-nav-bg-02-variable)
  - [❌shell-side-nav-bg-03 [variable]](#shell-side-nav-bg-03-variable)
  - [❌shell-side-nav-bg-04 [variable]](#shell-side-nav-bg-04-variable)
  - [❌shell-side-nav-bg-05 [variable]](#shell-side-nav-bg-05-variable)
  - [❌shell-side-nav-text-01 [variable]](#shell-side-nav-text-01-variable)
  - [❌shell-side-nav-text-02 [variable]](#shell-side-nav-text-02-variable)
  - [❌shell-side-nav-icon-01 [variable]](#shell-side-nav-icon-01-variable)
  - [❌shell-side-nav-accent-01 [variable]](#shell-side-nav-accent-01-variable)
  - [❌unit [variable]](#unit-variable)
- [general](#general)
  - [✅spacing--columns--first [variable]](#spacing--columns--first-variable)
  - [✅spacing--columns--before [variable]](#spacing--columns--before-variable)
  - [✅spacing--cell--activity [variable]](#spacing--cell--activity-variable)
  - [✅spacing--cell--status [variable]](#spacing--cell--status-variable)
  - [✅spacing--cell-actions [variable]](#spacing--cell-actions-variable)

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
  - [accordion [mixin]](#accordion-mixin)
  - [breadcrumb [mixin]](#breadcrumb-mixin)
  - [button [mixin]](#button-mixin)
  - [button-base [mixin]](#button-base-mixin)
  - [button-theme [mixin]](#button-theme-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [combo-box [mixin]](#combo-box-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-core [mixin]](#data-table-core-mixin)
  - [data-table-expandable [mixin]](#data-table-expandable-mixin)
  - [data-table-sort [mixin]](#data-table-sort-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [form [mixin]](#form-mixin)
  - [inline-loading [mixin]](#inline-loading-mixin)
  - [link [mixin]](#link-mixin)
  - [lists [mixin]](#lists-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [loading [mixin]](#loading-mixin)
  - [modal [mixin]](#modal-mixin)
  - [multiselect [mixin]](#multiselect-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [inline-notification--color [mixin]](#inline-notification--color-mixin)
  - [notification--experimental [mixin]](#notification--experimental-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pseudo-underline [mixin]](#pseudo-underline-mixin)
  - [pagination-nav [mixin]](#pagination-nav-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [search [mixin]](#search-mixin)
  - [select [mixin]](#select-mixin)
  - [slider [mixin]](#slider-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tags [mixin]](#tags-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [tile [mixin]](#tile-mixin)
  - [time-picker [mixin]](#time-picker-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [toolbar [mixin]](#toolbar-mixin)
  - [tooltip--definition--legacy [mixin]](#tooltip--definition--legacy-mixin)
  - [tooltip--icon--legacy [mixin]](#tooltip--icon--legacy-mixin)
  - [tooltip [mixin]](#tooltip-mixin)
  - [carbon-content [mixin]](#carbon-content-mixin)
  - [carbon-header-panel [mixin]](#carbon-header-panel-mixin)
  - [carbon-header [mixin]](#carbon-header-mixin)
  - [carbon-navigation [mixin]](#carbon-navigation-mixin)
  - [product-switcher [mixin]](#product-switcher-mixin)
  - [expanded [mixin]](#expanded-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)
  - [carbon-switcher [mixin]](#carbon-switcher-mixin)

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
  - [accordion [mixin]](#accordion-mixin)
  - [carbon-header [mixin]](#carbon-header-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

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
  - [breadcrumb [mixin]](#breadcrumb-mixin)
  - [form [mixin]](#form-mixin)
  - [modal [mixin]](#modal-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [carbon-header [mixin]](#carbon-header-mixin)

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
  - [toggle [mixin]](#toggle-mixin)

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
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-sort [mixin]](#data-table-sort-mixin)

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
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-core [mixin]](#data-table-core-mixin)
  - [data-table-sort [mixin]](#data-table-sort-mixin)

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
- **Used by**:
  - [listbox [mixin]](#listbox-mixin)
  - [multiselect [mixin]](#multiselect-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [select [mixin]](#select-mixin)
  - [carbon-header-panel [mixin]](#carbon-header-panel-mixin)

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
- **Used by**:
  - [checkbox [mixin]](#checkbox-mixin)
  - [search [mixin]](#search-mixin)
  - [time-picker [mixin]](#time-picker-mixin)

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
- **Used by**:
  - [checkbox [mixin]](#checkbox-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [form [mixin]](#form-mixin)
  - [lists [mixin]](#lists-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [pseudo-underline [mixin]](#pseudo-underline-mixin)
  - [tags [mixin]](#tags-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

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
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [breadcrumb [mixin]](#breadcrumb-mixin)
  - [button [mixin]](#button-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [form [mixin]](#form-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [multiselect [mixin]](#multiselect-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [select [mixin]](#select-mixin)
  - [padding-th [mixin]](#padding-th-mixin)
  - [tags [mixin]](#tags-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [tooltip--definition--legacy [mixin]](#tooltip--definition--legacy-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

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
- **Used by**:
  - [dropdown [mixin]](#dropdown-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [lists [mixin]](#lists-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [tooltip--definition--legacy [mixin]](#tooltip--definition--legacy-mixin)

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
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [lists [mixin]](#lists-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [pseudo-underline [mixin]](#pseudo-underline-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [slider [mixin]](#slider-mixin)
  - [padding-th [mixin]](#padding-th-mixin)
  - [padding-td [mixin]](#padding-td-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [tile [mixin]](#tile-mixin)
  - [tooltip--definition--legacy [mixin]](#tooltip--definition--legacy-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

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
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [lists [mixin]](#lists-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [padding-td [mixin]](#padding-td-mixin)

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
- **Used by**:
  - [snippet [mixin]](#snippet-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [form [mixin]](#form-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

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
- **Used by**:
  - [snippet [mixin]](#snippet-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [search [mixin]](#search-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-input [mixin]](#text-input-mixin)

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
- **Used by**:
  - [accordion [mixin]](#accordion-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [modal [mixin]](#modal-mixin)
  - [tile [mixin]](#tile-mixin)

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
  - [data-table-core [mixin]](#data-table-core-mixin)

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
  - [modal [mixin]](#modal-mixin)

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
  - [accordion [mixin]](#accordion-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-core [mixin]](#data-table-core-mixin)
  - [data-table-expandable [mixin]](#data-table-expandable-mixin)
  - [data-table-sort [mixin]](#data-table-sort-mixin)
  - [modal [mixin]](#modal-mixin)
  - [select [mixin]](#select-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tooltip [mixin]](#tooltip-mixin)
  - [carbon-switcher [mixin]](#carbon-switcher-mixin)

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
  - [data-table-core [mixin]](#data-table-core-mixin)
  - [data-table-sort [mixin]](#data-table-sort-mixin)
  - [tabs [mixin]](#tabs-mixin)

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
  - [snippet [mixin]](#snippet-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-core [mixin]](#data-table-core-mixin)
  - [data-table-expandable [mixin]](#data-table-expandable-mixin)
  - [modal [mixin]](#modal-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [select [mixin]](#select-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [carbon-switcher [mixin]](#carbon-switcher-mixin)

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
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-core [mixin]](#data-table-core-mixin)

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
  - [modal [mixin]](#modal-mixin)
  - [select [mixin]](#select-mixin)
  - [carbon-switcher [mixin]](#carbon-switcher-mixin)

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
  - [modal [mixin]](#modal-mixin)

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
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [modal [mixin]](#modal-mixin)
  - [select [mixin]](#select-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

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
- **Used by**:
  - [carbon-header-panel [mixin]](#carbon-header-panel-mixin)

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
  - [button [mixin]](#button-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [pseudo-underline [mixin]](#pseudo-underline-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tooltip--definition--legacy [mixin]](#tooltip--definition--legacy-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

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
  - [button [mixin]](#button-mixin)
  - [tile [mixin]](#tile-mixin)

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
  - [button [mixin]](#button-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)

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
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [inline-loading [mixin]](#inline-loading-mixin)
  - [loading [mixin]](#loading-mixin)
  - [slider [mixin]](#slider-mixin)
  - [tabs [mixin]](#tabs-mixin)

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
  - [dropdown [mixin]](#dropdown-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

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
  - [snippet [mixin]](#snippet-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-core [mixin]](#data-table-core-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [modal [mixin]](#modal-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [select [mixin]](#select-mixin)
  - [slider [mixin]](#slider-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tile [mixin]](#tile-mixin)

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
  - [button [mixin]](#button-mixin)
  - [button-theme [mixin]](#button-theme-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [loading [mixin]](#loading-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [tile [mixin]](#tile-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [carbon-content [mixin]](#carbon-content-mixin)

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
  - [accordion [mixin]](#accordion-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [combo-box [mixin]](#combo-box-mixin)
  - [data-table-core [mixin]](#data-table-core-mixin)
  - [data-table-expandable [mixin]](#data-table-expandable-mixin)
  - [data-table-sort [mixin]](#data-table-sort-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [loading [mixin]](#loading-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [slider [mixin]](#slider-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tags [mixin]](#tags-mixin)
  - [toolbar [mixin]](#toolbar-mixin)

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
  - [button-theme [mixin]](#button-theme-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [search [mixin]](#search-mixin)
  - [select [mixin]](#select-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [toggle [mixin]](#toggle-mixin)

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
  - [accordion [mixin]](#accordion-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [data-table-expandable [mixin]](#data-table-expandable-mixin)
  - [data-table-sort [mixin]](#data-table-sort-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [select [mixin]](#select-mixin)
  - [slider [mixin]](#slider-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tile [mixin]](#tile-mixin)

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
  - [accordion [mixin]](#accordion-mixin)
  - [breadcrumb [mixin]](#breadcrumb-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [data-table-core [mixin]](#data-table-core-mixin)
  - [data-table-expandable [mixin]](#data-table-expandable-mixin)
  - [data-table-sort [mixin]](#data-table-sort-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [link [mixin]](#link-mixin)
  - [lists [mixin]](#lists-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [modal [mixin]](#modal-mixin)
  - [multiselect [mixin]](#multiselect-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [search [mixin]](#search-mixin)
  - [select [mixin]](#select-mixin)
  - [slider [mixin]](#slider-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tags [mixin]](#tags-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [tooltip--definition--legacy [mixin]](#tooltip--definition--legacy-mixin)

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
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [data-table-core [mixin]](#data-table-core-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [form [mixin]](#form-mixin)
  - [inline-loading [mixin]](#inline-loading-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [modal [mixin]](#modal-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [search [mixin]](#search-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [toggle [mixin]](#toggle-mixin)
  - [toolbar [mixin]](#toolbar-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

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
  - [button [mixin]](#button-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)

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
  - [combo-box [mixin]](#combo-box-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [form [mixin]](#form-mixin)
  - [search [mixin]](#search-mixin)
  - [time-picker [mixin]](#time-picker-mixin)

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
  - [checkbox [mixin]](#checkbox-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [modal [mixin]](#modal-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [search [mixin]](#search-mixin)

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
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [tile [mixin]](#tile-mixin)
  - [tooltip--icon--legacy [mixin]](#tooltip--icon--legacy-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

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
  - [button [mixin]](#button-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [toggle [mixin]](#toggle-mixin)

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
  - [button [mixin]](#button-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [link [mixin]](#link-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)

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
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

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
  - [snippet [mixin]](#snippet-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [search [mixin]](#search-mixin)
  - [select [mixin]](#select-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-input [mixin]](#text-input-mixin)

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
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [modal [mixin]](#modal-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [search [mixin]](#search-mixin)
  - [select [mixin]](#select-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [toolbar [mixin]](#toolbar-mixin)

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
  - [button [mixin]](#button-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [tags [mixin]](#tags-mixin)
  - [tooltip--icon [mixin]](#tooltip--icon-mixin)
  - [tooltip--definition--legacy [mixin]](#tooltip--definition--legacy-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

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
  - [listbox [mixin]](#listbox-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [tags [mixin]](#tags-mixin)
  - [tooltip--icon [mixin]](#tooltip--icon-mixin)
  - [tooltip--definition--legacy [mixin]](#tooltip--definition--legacy-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

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
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [form [mixin]](#form-mixin)
  - [inline-loading [mixin]](#inline-loading-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [progress-indicator [mixin]](#progress-indicator-mixin)
  - [select [mixin]](#select-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-input [mixin]](#text-input-mixin)

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
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [toggle [mixin]](#toggle-mixin)

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
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)

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
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)

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
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)

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
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)

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
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)

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
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)

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
  - [modal [mixin]](#modal-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

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
  - [button [mixin]](#button-mixin)

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
  - [button [mixin]](#button-mixin)
  - [button-theme [mixin]](#button-theme-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [data-table-expandable [mixin]](#data-table-expandable-mixin)
  - [modal [mixin]](#modal-mixin)
  - [radio-button [mixin]](#radio-button-mixin)
  - [search [mixin]](#search-mixin)
  - [toggle [mixin]](#toggle-mixin)

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
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)
  - [tags [mixin]](#tags-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

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
  - [button [mixin]](#button-mixin)
  - [tooltip [mixin]](#tooltip-mixin)

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
  - [button [mixin]](#button-mixin)

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
  - [button [mixin]](#button-mixin)
  - [link [mixin]](#link-mixin)

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
  - [button [mixin]](#button-mixin)
  - [listbox [mixin]](#listbox-mixin)

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
  - [button [mixin]](#button-mixin)

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
  - [button [mixin]](#button-mixin)

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
  - [button [mixin]](#button-mixin)

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
  - [accordion [mixin]](#accordion-mixin)
  - [button [mixin]](#button-mixin)
  - [snippet [mixin]](#snippet-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-expandable [mixin]](#data-table-expandable-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [modal [mixin]](#modal-mixin)
  - [number-input [mixin]](#number-input-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [select [mixin]](#select-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [tile [mixin]](#tile-mixin)

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
  - [button [mixin]](#button-mixin)
  - [data-table-core [mixin]](#data-table-core-mixin)
  - [data-table-expandable [mixin]](#data-table-expandable-mixin)

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
  - [data-table-core [mixin]](#data-table-core-mixin)
  - [data-table-expandable [mixin]](#data-table-expandable-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [search [mixin]](#search-mixin)

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
  - [data-table-expandable [mixin]](#data-table-expandable-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [tabs [mixin]](#tabs-mixin)

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
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [tags [mixin]](#tags-mixin)

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
  - [button [mixin]](#button-mixin)

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
  - [button [mixin]](#button-mixin)

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
  - [link [mixin]](#link-mixin)

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
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [slider [mixin]](#slider-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [toggle [mixin]](#toggle-mixin)

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
  - [button-base [mixin]](#button-base-mixin)
  - [button-theme [mixin]](#button-theme-mixin)
  - [checkbox [mixin]](#checkbox-mixin)
  - [combo-box [mixin]](#combo-box-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [date-picker [mixin]](#date-picker-mixin)
  - [dropdown [mixin]](#dropdown-mixin)
  - [file-uploader [mixin]](#file-uploader-mixin)
  - [form [mixin]](#form-mixin)
  - [link [mixin]](#link-mixin)
  - [listbox [mixin]](#listbox-mixin)
  - [overflow-menu [mixin]](#overflow-menu-mixin)
  - [pagination [mixin]](#pagination-mixin)
  - [select [mixin]](#select-mixin)
  - [slider [mixin]](#slider-mixin)
  - [tabs [mixin]](#tabs-mixin)
  - [text-area [mixin]](#text-area-mixin)
  - [text-input [mixin]](#text-input-mixin)
  - [toggle [mixin]](#toggle-mixin)

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
  - [button [mixin]](#button-mixin)
  - [button-base [mixin]](#button-base-mixin)
  - [content-switcher [mixin]](#content-switcher-mixin)
  - [tabs [mixin]](#tabs-mixin)

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
  - [toolbar [mixin]](#toolbar-mixin)
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
  - [data-table-v2-action [mixin]](#data-table-v2-action-mixin)
  - [data-table-core [mixin]](#data-table-core-mixin)
  - [search [mixin]](#search-mixin)
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
  - [form [mixin]](#form-mixin)
  - [number-input [mixin]](#number-input-mixin)

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
- **Used by**:
  - [snippet [mixin]](#snippet-mixin)

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
  - [tooltip [mixin]](#tooltip-mixin)
  - [carbon-switcher [mixin]](#carbon-switcher-mixin)

## accordion

### ❌accordion [mixin]

Accordion styles

<details>
<summary>Source code</summary>

```scss
@mixin accordion() {
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
    align-items: flex-start;
    justify-content: $accordion-justify-content;
    cursor: pointer;
    padding: rem(6px) 0;
    flex-direction: $accordion-flex-direction;
    position: relative;
    width: 100%;
    margin: 0;
    transition: background-color motion(standard, productive) $duration--fast-02;

    &:hover::before,
    &:focus::before {
      content: '';
      position: absolute;
      top: -1px;
      left: 0;
      width: 100%;
      height: calc(100% + 2px);
    }

    &:hover::before {
      background-color: $hover-ui;
    }

    &:focus {
      outline: none;
    }

    &:focus:before {
      @include focus-outline('outline-compat');
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
    display: none;
    // Transition property for when the accordion closes
    transition: padding motion(standard, productive) $duration--fast-02;
    padding-left: $carbon--spacing-05;
    padding-right: 25%;

    @include carbon--breakpoint-down('md') {
      padding-right: $carbon--spacing-09;
    }

    p {
      @include type-style('body-long-01');
    }
  }

  .#{$prefix}--accordion--start .#{$prefix}--accordion__heading {
    // Reverse `$accordion-flex-direction` token:
    flex-direction: row;
  }

  .#{$prefix}--accordion--start .#{$prefix}--accordion__arrow {
    // Alters `$accordion-arrow-margin` token:
    margin: 2px 0 0 $carbon--spacing-03;
  }

  .#{$prefix}--accordion--start .#{$prefix}--accordion__content {
    margin-left: $carbon--spacing-06;
  }

  .#{$prefix}--accordion__item--collapsing .#{$prefix}--accordion__content,
  .#{$prefix}--accordion__item--expanding .#{$prefix}--accordion__content {
    display: block;
  }

  .#{$prefix}--accordion__item--collapsing .#{$prefix}--accordion__content {
    animation: $duration--fast-02 motion(standard, productive) collapse-accordion;
  }

  .#{$prefix}--accordion__item--expanding .#{$prefix}--accordion__content {
    animation: $duration--fast-02 motion(standard, productive) expand-accordion;
  }

  .#{$prefix}--accordion__item--active {
    overflow: visible;

    .#{$prefix}--accordion__content {
      display: block;
      padding-bottom: $carbon--spacing-06;
      padding-top: $spacing-03;
      // Transition property for when the accordion opens
      transition: padding-top motion(entrance, productive) $duration--fast-02, padding-bottom
          motion(entrance, productive) $duration--fast-02;
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
  - [carbon--breakpoint-down [mixin]](#carbon--breakpoint-down-mixin)
  - [prefix [variable]](#prefix-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [text-01 [variable]](#text-01-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [carbon--spacing-09 [variable]](#carbon--spacing-09-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [carbon--spacing-06 [variable]](#carbon--spacing-06-variable)
  - [spacing-03 [variable]](#spacing-03-variable)

## breadcrumb

### ❌breadcrumb [mixin]

Breadcrumb styles

<details>
<summary>Source code</summary>

```scss
@mixin breadcrumb() {
  .#{$prefix}--breadcrumb {
    @include type-style('body-short-01');
    display: inline;
    @include carbon--breakpoint(md) {
      display: flex;
      flex-wrap: wrap;
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
    cursor: auto;

    &:hover {
      text-decoration: none;
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
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [text-01 [variable]](#text-01-variable)

## button

### ❌button [mixin]

Button styles

<details>
<summary>Source code</summary>

```scss
@mixin button() {
  // button set styles
  .#{$prefix}--btn-set {
    display: flex;
  }

  .#{$prefix}--btn-set > .#{$prefix}--btn {
    max-width: rem(196px); // 196px from design kit
    width: 100%;
  }

  .#{$prefix}--btn--secondary.#{$prefix}--btn--disabled
    + .#{$prefix}--btn--primary.#{$prefix}--btn--disabled,
  .#{$prefix}--btn--tertiary.#{$prefix}--btn--disabled
    + .#{$prefix}--btn--danger.#{$prefix}--btn--disabled {
    border-left: rem(1px) solid $disabled-03;
  }

  .#{$prefix}--btn {
    @include button-base;

    &.#{$prefix}--btn--disabled > svg.#{$prefix}--btn__icon,
    &:disabled > svg.#{$prefix}--btn__icon {
      fill: $disabled-03;
    }
  }

  // Reset intrisic padding in Firefox (see #731)
  .#{$prefix}--btn::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  .#{$prefix}--btn--primary {
    @include button-theme(
      $interactive-01,
      transparent,
      $text-04,
      $hover-primary,
      currentColor,
      $active-primary
    );

    &:hover {
      color: $text-04;
    }
  }

  .#{$prefix}--btn--secondary {
    @include button-theme(
      $interactive-02,
      transparent,
      $text-04,
      $hover-secondary,
      currentColor,
      $active-secondary
    );

    &:hover,
    &:focus {
      color: $text-04;
    }
  }

  .#{$prefix}--btn--tertiary {
    @include button-theme(
      transparent,
      $interactive-03,
      $interactive-03,
      $hover-tertiary,
      currentColor,
      $active-tertiary,
      1px
    );

    &:hover {
      color: $inverse-01;
    }

    &:focus {
      color: $inverse-01;
      background-color: $interactive-03;
    }

    &:active {
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
      outline: none;

      & > .#{$prefix}--btn__icon path {
        fill: $disabled;
      }
    }

    &:hover > .#{$prefix}--btn__icon path {
      fill: $inverse-01;
    }
  }

  .#{$prefix}--btn--ghost {
    @include button-theme(
      transparent,
      transparent,
      $link-01,
      $hover-ui,
      currentColor,
      $active-ui
    );
    padding: $button-padding-ghost;

    .#{$prefix}--btn__icon {
      position: static;
      margin-left: $carbon--spacing-03;
    }

    &:hover,
    &:active {
      color: $hover-primary-text;

      .#{$prefix}--btn__icon path {
        fill: $hover-primary-text;
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
      outline: none;

      .#{$prefix}--btn__icon path {
        fill: $disabled;
      }
    }

    &.#{$prefix}--btn--sm {
      padding: $button-padding-ghost-sm;
    }

    &.#{$prefix}--btn--field {
      padding: $button-padding-ghost-field;
    }
  }

  .#{$prefix}--btn.#{$prefix}--btn--icon-only.#{$prefix}--tooltip__trigger {
    @include tooltip--trigger('icon', 'bottom');
    outline: $button-outline-width solid transparent;
    outline-offset: -4px;
  }

  .#{$prefix}--btn.#{$prefix}--btn--icon-only.#{$prefix}--tooltip__trigger:focus {
    border-color: $focus;
    outline-color: $ui-02;
  }

  .#{$prefix}--btn.#{$prefix}--btn--icon-only.#{$prefix}--tooltip__trigger:focus
    svg {
    outline-color: transparent;
  }

  .#{$prefix}--btn--icon-only--top {
    @include tooltip--trigger('icon', 'top');
    @include tooltip--placement('icon', 'top', 'center');
  }

  .#{$prefix}--btn--icon-only--bottom {
    @include tooltip--placement('icon', 'bottom', 'center');
  }

  .#{$prefix}--btn--icon-only,
  .#{$prefix}--btn--sm.#{$prefix}--btn--icon-only,
  .#{$prefix}--btn--field.#{$prefix}--btn--icon-only {
    padding-right: rem(13px);

    .#{$prefix}--btn__icon {
      position: static;
    }

    &.#{$prefix}--btn--ghost .#{$prefix}--btn__icon {
      margin: 0;
    }
  }

  .#{$prefix}--btn--danger {
    @include button-theme(
      $danger,
      $danger,
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

  .#{$prefix}--btn--field {
    height: 40px;
    min-height: 40px;
    padding: $button-padding-field;
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
  - [prefix [variable]](#prefix-variable)
  - [disabled-03 [variable]](#disabled-03-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [text-04 [variable]](#text-04-variable)
  - [hover-primary [variable]](#hover-primary-variable)
  - [active-primary [variable]](#active-primary-variable)
  - [interactive-02 [variable]](#interactive-02-variable)
  - [hover-secondary [variable]](#hover-secondary-variable)
  - [active-secondary [variable]](#active-secondary-variable)
  - [interactive-03 [variable]](#interactive-03-variable)
  - [hover-tertiary [variable]](#hover-tertiary-variable)
  - [active-tertiary [variable]](#active-tertiary-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [link-01 [variable]](#link-01-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [active-ui [variable]](#active-ui-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [hover-primary-text [variable]](#hover-primary-text-variable)
  - [focus [variable]](#focus-variable)
  - [ui-02 [variable]](#ui-02-variable)
  - [danger [variable]](#danger-variable)
  - [hover-danger [variable]](#hover-danger-variable)
  - [icon-03 [variable]](#icon-03-variable)
  - [active-danger [variable]](#active-danger-variable)

### ❌button-base [mixin]

Button base styles

<details>
<summary>Source code</summary>

```scss
@mixin button-base() {
  @include reset;
  @include type-style('body-short-01');

  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  vertical-align: top;
  flex-shrink: 0;
  min-height: rem($button-height);
  padding: $button-padding;
  border-radius: $button-border-radius;
  text-align: left;
  text-decoration: none;
  transition: all $duration--fast-01 motion(entrance, productive);
  outline: none;
  position: relative;
  max-width: rem(320px);

  &:disabled,
  &.#{$prefix}--btn--disabled {
    cursor: not-allowed;
    color: $disabled-03;
    background: $disabled-02;
    border-color: $disabled-02;
  }

  .#{$prefix}--btn__icon {
    position: absolute;
    right: rem(16px);
    flex-shrink: 0;
    width: rem(16px);
    height: rem(16px);
  }
}
```

</details>

- **Group**: [button](#button)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
  - [disabled-03 [variable]](#disabled-03-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
- **Used by**:
  - [button [mixin]](#button-mixin)

### ❌button-theme [mixin]

Button variant styles

<details>
<summary>Source code</summary>

```scss
@mixin button-theme() {
  background-color: $bg-color;
  border-width: $border-width;
  border-style: solid;
  border-color: $border-color;
  color: $font-color;

  &:hover {
    background-color: $hover-bg-color;
  }

  &:focus {
    border-color: $focus;
    box-shadow: inset 0 0 0 $button-outline-width $ui-02;
  }

  &:disabled:hover,
  &:disabled:focus,
  &:hover.#{$prefix}--btn--disabled,
  &:focus.#{$prefix}--btn--disabled {
    color: $ui-04;
    background-color: $disabled-02;
    border-color: $disabled-02;
    text-decoration: none;
    box-shadow: none;
  }

  &:active {
    background-color: $active-color;
  }

  .#{$prefix}--btn__icon,
  .#{$prefix}--btn__icon path {
    fill: $icon-color;
  }
}
```

</details>

- **Group**: [button](#button)
- **Requires**:
  - [focus [variable]](#focus-variable)
  - [ui-02 [variable]](#ui-02-variable)
  - [prefix [variable]](#prefix-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
- **Used by**:
  - [button [mixin]](#button-mixin)

## checkbox

### ❌checkbox [mixin]

Checkbox styles

<details>
<summary>Source code</summary>

```scss
@mixin checkbox() {
  // Spacing between checkboxes
  .#{$prefix}--form-item.#{$prefix}--checkbox-wrapper {
    margin-bottom: $carbon--spacing-02;
  }

  // Spacing above collection of checkboxes
  .#{$prefix}--form-item.#{$prefix}--checkbox-wrapper:first-of-type {
    margin-top: rem(3px);
  }

  // Shift collection of checkboxes up if label is present
  // to account for the 2px top margin for the first checkbox
  .#{$prefix}--label + .#{$prefix}--form-item.#{$prefix}--checkbox-wrapper {
    margin-top: -#{$carbon--spacing-01};
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

  // Required because `$css--reset: true` cannot currently apply to this `::before` and `::after`
  .#{$prefix}--checkbox-label::before,
  .#{$prefix}--checkbox-label::after {
    box-sizing: border-box;
  }

  // Spacing for presentational checkbox
  .#{$prefix}--checkbox-label::before {
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
    width: rem(9px);
    height: rem(5px);
    background: none;
    border-left: 2px solid $inverse-01;
    border-bottom: 2px solid $inverse-01;
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
    background-color: $icon-01;
    border-color: $icon-01;
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
    border-color: $focus;
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
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [carbon--spacing-01 [variable]](#carbon--spacing-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [icon-01 [variable]](#icon-01-variable)
  - [focus [variable]](#focus-variable)
  - [disabled-02 [variable]](#disabled-02-variable)

## code-snippet

### ❌snippet [mixin]

Code snippet styles

<details>
<summary>Source code</summary>

```scss
@mixin snippet() {
  .#{$prefix}--snippet {
    @include reset;
  }

  .#{$prefix}--snippet code {
    @include type-style('code-01');
  }

  // Inline Code Snippet
  .#{$prefix}--snippet--inline {
    @include reset;

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
      border: 2px solid $focus;
    }
  }

  .#{$prefix}--snippet--inline code {
    padding: 0 $spacing-03;
  }

  // Single Line Snippet
  .#{$prefix}--snippet--single {
    @include bx--snippet;
    border: none;
    max-width: rem(760px);
    min-width: rem(320px);
    height: $carbon--spacing-08;
    padding: 0 56px 0 $carbon--spacing-05;
  }

  .#{$prefix}--snippet--single .#{$prefix}--snippet-container {
    display: flex;
    align-items: center;
    overflow-x: auto;
    position: relative;
    padding: 0 0 $carbon--spacing-05 0;
    height: rem(56px);
  }

  .#{$prefix}--snippet--single pre {
    white-space: nowrap;
    @include type-style('code-01');
    padding-right: $spacing-03;
  }

  .#{$prefix}--snippet--single::after {
    width: rem(16px);
    height: 100%;
    content: '';
    position: absolute;
    top: 0;
    right: rem(56px);

    // Safari interprets `transparent` differently, so make color token value transparent instead:
    background-image: linear-gradient(to right, rgba($ui-01, 0), $ui-01);
  }

  // Multi Line Snippet
  .#{$prefix}--snippet--multi {
    @include bx--snippet;
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
    max-height: 100%;
    transition: max-height $duration--moderate-01 motion(standard, productive);
    padding-bottom: $spacing-05;
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
    overflow-x: auto;
  }

  .#{$prefix}--snippet--multi .#{$prefix}--snippet-container pre::after {
    width: rem(16px);
    height: 100%;
    content: '';
    position: absolute;
    top: 0;
    right: 0;

    // Safari interprets `transparent` differently, so make color token value transparent instead:
    background-image: linear-gradient(to right, rgba($ui-01, 0), $ui-01);
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
    display: flex;
    justify-content: center;
    align-items: center;

    &:focus {
      @include focus-outline('outline');
      outline-color: $focus;
    }
  }

  .#{$prefix}--snippet--multi .#{$prefix}--snippet-button {
    height: $carbon--spacing-07;
    width: $carbon--spacing-07;
    top: $spacing-03;
    right: $spacing-03;
  }

  .#{$prefix}--snippet-button:hover {
    background: $hover-ui;
  }

  .#{$prefix}--snippet-button:active {
    background-color: $copy-active;
  }

  .#{$prefix}--btn--copy__feedback {
    @include type-style('body-short-01');
    @include carbon--font-family('sans'); // Override one in code snippet
    z-index: z('overlay');
    font-weight: 400;
    left: inherit;
    top: 0.75rem;
    right: 1.25rem;
  }

  .#{$prefix}--btn--copy__feedback::before,
  .#{$prefix}--btn--copy__feedback::after {
    background: $copy-btn-feedback;
  }

  .#{$prefix}--btn--copy__feedback::after {
    border: none;
  }

  // Show more / less button
  button.#{$prefix}--btn.#{$prefix}--snippet-btn--expand {
    display: inline-flex;
    align-items: center;
    position: absolute;
    right: $spacing-03;
    bottom: $spacing-03;
    padding: $spacing-03;
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
    margin-left: $spacing-03;
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

  // Light version
  .#{$prefix}--snippet.#{$prefix}--snippet--light,
  .#{$prefix}--snippet.#{$prefix}--snippet--light .#{$prefix}--snippet-button,
  .#{$prefix}--snippet.#{$prefix}--snippet--light
    .#{$prefix}--snippet-btn--expand {
    background-color: $ui-02;
  }

  .#{$prefix}--snippet.#{$prefix}--snippet--light.#{$prefix}--snippet--inline:hover,
  .#{$prefix}--snippet.#{$prefix}--snippet--light
    .#{$prefix}--snippet-button:hover,
  .#{$prefix}--snippet.#{$prefix}--snippet--light
    .#{$prefix}--snippet-btn--expand:hover {
    background-color: $hover-ui-light;
  }

  .#{$prefix}--snippet.#{$prefix}--snippet--light.#{$prefix}--snippet--single::after,
  .#{$prefix}--snippet.#{$prefix}--snippet--light.#{$prefix}--snippet--multi
    .#{$prefix}--snippet-container
    pre::after {
    // Safari interprets `transparent` differently, so make color token value transparent instead:
    background-image: linear-gradient(to right, rgba($ui-02, 0), $ui-02);
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
    top: rem(
      50.8px
    ); // (The height of button) + (The height of the tooltip's triangle) + 4px
    left: 50%;
    right: auto;

    &::before {
      top: 0;
    }

    &:after {
      top: rem(-4px);
    }
  }

  .#{$prefix}--snippet--multi
    .#{$prefix}--snippet-button
    .#{$prefix}--btn--copy__feedback {
    top: rem(
      42.8px
    ); // (The height of button) + (The height of the tooltip's triangle) + 4px
  }

  .#{$prefix}--snippet--inline .#{$prefix}--btn--copy__feedback {
    // TODO: use updated global tooltip mixins under the hood
    // since all of the positioning values for the copy button tooltip are arbitrary hard coded rem values, we need this arbitrary 4px offset to keep the proper tooltip spacing according to the spec
    top: calc(100% - #{rem(4px)});
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
  - [bx--snippet [mixin]](#bx--snippet-mixin)
  - [carbon--font-family [mixin]](#carbon--font-family-mixin)
  - [prefix [variable]](#prefix-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [focus [variable]](#focus-variable)
  - [spacing-03 [variable]](#spacing-03-variable)
  - [carbon--spacing-08 [variable]](#carbon--spacing-08-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [spacing-05 [variable]](#spacing-05-variable)
  - [icon-01 [variable]](#icon-01-variable)
  - [carbon--spacing-07 [variable]](#carbon--spacing-07-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-02 [variable]](#ui-02-variable)

### ❌bx--snippet [mixin]

Code snippet base styles

<details>
<summary>Source code</summary>

```scss
@mixin bx--snippet() {
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
- **Used by**:
  - [snippet [mixin]](#snippet-mixin)

## combo-box

### ❌combo-box [mixin]

Combo box styles

<details>
<summary>Source code</summary>

```scss
@mixin combo-box() {
  .#{$prefix}--combo-box .#{$prefix}--text-input {
    &::placeholder {
      color: $text-05;
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
  - [text-05 [variable]](#text-05-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [ui-03 [variable]](#ui-03-variable)

## content-switcher

### ❌content-switcher [mixin]

Content switcher styles

<details>
<summary>Source code</summary>

```scss
@mixin content-switcher() {
  .#{$prefix}--content-switcher {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: rem(40px);
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
      color: $disabled-02;
      background-color: $disabled-01;
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

    &:disabled {
      background-color: $disabled-03;
      color: $disabled-02;
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
  - [prefix [variable]](#prefix-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [text-02 [variable]](#text-02-variable)
  - [focus [variable]](#focus-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [text-01 [variable]](#text-01-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [disabled-01 [variable]](#disabled-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [disabled-03 [variable]](#disabled-03-variable)

## data-table

### ❌data-table-v2-action [mixin]

Data table action styles

<details>
<summary>Source code</summary>

```scss
@mixin data-table-v2-action() {
  //-------------------------------------------------
  //TOOLBAR
  //-------------------------------------------------
  .#{$prefix}--table-toolbar {
    background: $ui-01;
    display: flex;
    height: $layout-04;
    overflow: hidden;
    position: relative; //need for batch actions
    width: 100%;
  }

  .#{$prefix}--toolbar-content {
    display: flex;
    height: $layout-04;
    width: 100%;
    justify-content: flex-end;
    transform: translate3d(0, 0, 0);
    transition: transform $duration--fast-02 motion(standard, productive), clip-path
        $duration--fast-02 motion(standard, productive);
  }

  .#{$prefix}--batch-actions ~ .#{$prefix}--toolbar-content {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }

  .#{$prefix}--toolbar-content .#{$prefix}--search .#{$prefix}--search-input {
    background-color: transparent; // For tool bar animation with (esp.) persistent search box
  }

  //-------------------------------------------------
  //DEPRECATED v10/v9 search behaviour
  //-------------------------------------------------
  .#{$prefix}--batch-actions ~ .#{$prefix}--toolbar-search-container {
    opacity: 1;
    transition: opacity 110ms;
    display: flex;
    align-items: center;
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
    position: initial;
  }

  .#{$prefix}--toolbar-search-container-expandable
    .#{$prefix}--search
    .#{$prefix}--search-magnifier {
    height: $layout-04;
    width: $layout-04;
    padding: $spacing-05;
    left: 0;
    cursor: pointer;
    pointer-events: all;
    transition: background $duration--fast-02 motion(entrance, productive);
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
    .#{$prefix}--label {
    visibility: hidden;
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

    &:before {
      top: 2px;
      height: calc(100% - 4px);
      background-color: $hover-ui;
    }
  }

  //-------------------------------------------------
  //ACTIVE SEARCH - DEFAULT TOOLBAR
  //-------------------------------------------------
  .#{$prefix}--toolbar-search-container-active {
    flex: auto;
    transition: flex $duration--moderate-01 motion(standard, productive);
  }

  .#{$prefix}--toolbar-search-container-active .#{$prefix}--search {
    width: 100%;
  }

  .#{$prefix}--toolbar-search-container-active
    .#{$prefix}--search
    .#{$prefix}--label,
  .#{$prefix}--toolbar-search-container-active
    .#{$prefix}--search
    .#{$prefix}--search-input {
    padding-left: $spacing-09;
    visibility: inherit;
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
    padding: $spacing-05;
    transition: background $duration--fast-02 motion(entrance, productive);
  }

  // DEPRECATED prefer .#{$prefix}--overflow-menu.#{$prefix}--toolbar-action instead
  .#{$prefix}--toolbar-action {
    @include button-reset;
    display: flex;
    cursor: pointer;
    height: $layout-04;
    width: $layout-04;
    transition: background $duration--fast-02 motion(entrance, productive);
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

    &.#{$prefix}--toolbar-search-container-expandable {
      // The focus style is handled by search input in it, need to avoid duplicate animation
      outline: none;
    }
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
    fill: $icon-01;
  }

  //-------------------------------------------------
  //PERSISTENT SEARCH - OPTIONAL TOOLBAR
  //-------------------------------------------------
  .#{$prefix}--toolbar-search-container-persistent {
    width: 100%;
    height: $layout-04;
    opacity: 1;
    position: relative;
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
    left: $spacing-05;
  }

  .#{$prefix}--toolbar-search-container-persistent
    .#{$prefix}--search
    .#{$prefix}--search-input {
    height: $layout-04;
    padding-left: $spacing-09;
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
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    transform: translate3d(0, 48px, 0);
    transition: transform $duration--fast-02 motion(standard, productive), clip-path
        $duration--fast-02 motion(standard, productive);
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
    padding-left: $spacing-06;
    padding-right: $spacing-06;
    width: 100%;
    height: 100%;
    pointer-events: none;
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    will-change: transform;
    background-color: $interactive-01;
    transition: transform $duration--fast-02 motion(standard, productive), clip-path
        $duration--fast-02 motion(standard, productive),
      opacity $duration--fast-02 motion(standard, productive);
    transform: translate3d(0, 48px, 0);
  }

  .#{$prefix}--batch-actions:focus {
    @include focus-outline;
  }

  .#{$prefix}--batch-actions--active {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    pointer-events: all;
    transform: translate3d(0, 0, 0);
  }

  //btns container
  .#{$prefix}--action-list {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
  }

  .#{$prefix}--action-list .#{$prefix}--btn {
    color: $text-04;
  }

  .#{$prefix}--action-list .#{$prefix}--btn .#{$prefix}--btn__icon {
    fill: $icon-03;
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
    background-color: $text-04;
    border: none;
    transition: opacity $duration--fast-02 motion(standard, productive);
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
    color: $text-04;
  }

  .#{$prefix}--batch-summary__para {
    @include type-style('body-short-01');
  }

  //-------------------------------------------------
  //SMALL TOOLBAR
  //-------------------------------------------------
  .#{$prefix}--table-toolbar--small {
    height: rem(32px);

    .#{$prefix}--toolbar-search-container-expandable,
    .#{$prefix}--toolbar-search-container-persistent {
      height: rem(32px);
    }

    .#{$prefix}--toolbar-search-container-expandable
      .#{$prefix}--search
      .#{$prefix}--search-input,
    .#{$prefix}--toolbar-search-container-persistent
      .#{$prefix}--search
      .#{$prefix}--search-input {
      height: rem(32px);
    }

    .#{$prefix}--toolbar-search-container-expandable
      .#{$prefix}--search
      .#{$prefix}--search-close,
    .#{$prefix}--toolbar-search-container-persistent
      .#{$prefix}--search
      .#{$prefix}--search-close {
      height: rem(32px);
      width: rem(32px);
    }

    .#{$prefix}--toolbar-search-container-expandable
      .#{$prefix}--search
      .#{$prefix}--search-magnifier,
    .#{$prefix}--toolbar-search-container-persistent
      .#{$prefix}--search
      .#{$prefix}--search-magnifier {
      height: rem(32px);
      width: rem(32px);
      padding: $spacing-03;
    }

    //hidden
    .#{$prefix}--toolbar-search-container-expandable {
      width: rem(32px);
    }

    .#{$prefix}--toolbar-search-container-expandable
      .#{$prefix}--search
      .#{$prefix}--search-input {
      padding-left: $spacing-xl;
    }

    //active
    .#{$prefix}--toolbar-search-container-active {
      flex: auto;
      transition: flex 175ms $carbon--standard-easing;
    }

    .#{$prefix}--toolbar-search-container-active
      .#{$prefix}--search
      .#{$prefix}--search-input {
      visibility: visible;
    }

    .#{$prefix}--toolbar-search-container-active
      .#{$prefix}--search
      .#{$prefix}--search-input:focus {
      @include focus-outline('outline');
      background: $hover-field;
    }

    .#{$prefix}--toolbar-search-container-active
      .#{$prefix}--search
      .#{$prefix}--search-input:active,
    .#{$prefix}--toolbar-search-container-active
      .#{$prefix}--search
      .#{$prefix}--search-input:not(:placeholder-shown) {
      background: $hover-field;
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
      @include focus-outline('reset');
      background: transparent;
    }
  }

  //-------------------------------------------------
  // SMALL BATCH ACTIONS
  //-------------------------------------------------
  .#{$prefix}--table-toolbar--small
    .#{$prefix}--batch-actions
    .#{$prefix}--action-list {
    height: rem(32px);
  }

  .#{$prefix}--table-toolbar--small .#{$prefix}--toolbar-action {
    height: rem(32px);
    width: rem(32px);
    padding: $spacing-03;
  }

  .#{$prefix}--table-toolbar--small .#{$prefix}--btn--primary {
    padding-top: rem(3px);
    height: rem(32px);
  }

  .#{$prefix}--table-toolbar--small
    .#{$prefix}--btn--primary.#{$prefix}--batch-summary__cancel::before {
    top: rem(8px);
  }

  .#{$prefix}--table-toolbar--small
    .#{$prefix}--toolbar-action
    ~ .#{$prefix}--btn {
    height: rem(32px);
    width: rem(160px);
    overflow: hidden;
  }
}
```

</details>

- **Group**: [data-table](#data-table)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [layout-04 [variable]](#layout-04-variable)
  - [spacing-05 [variable]](#spacing-05-variable)
  - [hover-field [variable]](#hover-field-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [spacing-09 [variable]](#spacing-09-variable)
  - [layout-01 [variable]](#layout-01-variable)
  - [icon-01 [variable]](#icon-01-variable)
  - [spacing-06 [variable]](#spacing-06-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [text-04 [variable]](#text-04-variable)
  - [icon-03 [variable]](#icon-03-variable)
  - [spacing-03 [variable]](#spacing-03-variable)

### ❌data-table-core [mixin]

Data table core styles

<details>
<summary>Source code</summary>

```scss
@mixin data-table-core() {
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
    @include type-style('productive-heading-01');
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

  .#{$prefix}--data-table tbody tr,
  .#{$prefix}--data-table tbody tr td,
  .#{$prefix}--data-table tbody tr th {
    transition: background-color $duration--fast-01 motion(entrance, productive);
  }

  .#{$prefix}--data-table tbody tr:hover {
    background: $hover-field;
  }

  .#{$prefix}--data-table tbody tr:hover td,
  .#{$prefix}--data-table tbody tr:hover th {
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
  }

  .#{$prefix}--data-table th:first-of-type:not(.#{$prefix}--table-expand) {
    padding-left: $spacing-05;
  }

  .#{$prefix}--data-table th:last-of-type {
    // Do not use `position: relative`, as its behavior is undefined for many table elements: https://www.w3.org/TR/CSS21/visuren.html#propdef-position
    position: static;
    width: auto;
  }

  .#{$prefix}--data-table .#{$prefix}--table-header-label {
    display: block;
    padding: rem(14px) 0;
    text-align: left;
  }

  .#{$prefix}--data-table td,
  .#{$prefix}--data-table tbody th {
    background: $ui-01;
    color: $text-02;
    border-top: 1px solid $ui-01;
    border-bottom: 1px solid $ui-03;
    padding: rem(14px) $spacing-04;
    padding-bottom: rem(13px);

    & + td:first-of-type {
      padding-left: $spacing-04;
    }
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

  // specific padding/width for overflow menu columns
  .#{$prefix}--data-table .#{$prefix}--table-column-menu,
  .#{$prefix}--data-table .#{$prefix}--table-column-menu:last-of-type {
    width: rem(52px);
    min-width: rem(52px);
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

  @media screen and (hover: hover),
    (-ms-high-contrast: active),
    (-ms-high-contrast: none) {
    .#{$prefix}--data-table
      td.#{$prefix}--table-column-menu
      .#{$prefix}--overflow-menu
      .#{$prefix}--overflow-menu__icon {
      opacity: 0;
    }
  }

  .#{$prefix}--data-table.#{$prefix}--data-table--visible-overflow-menu
    td.#{$prefix}--table-column-menu
    .#{$prefix}--overflow-menu
    .#{$prefix}--overflow-menu__icon,
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

  .#{$prefix}--data-table--selected .#{$prefix}--overflow-menu,
  .#{$prefix}--data-table--selected .#{$prefix}--overflow-menu__trigger {
    &:hover {
      background-color: $hover-field;
    }
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
    // Do not use `position: relative`, as its behavior is undefined for many table elements: https://www.w3.org/TR/CSS21/visuren.html#propdef-position
    position: static;
    background: $ui-03;
    padding: rem(12px) $spacing-03 0 $spacing-05;
    width: rem(
      44px
    ); // 16px padding left + 8px padding right + 20px checkbox width
    transition: background-color $duration--fast-01 motion(entrance, productive);
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
    background-color: $selected-ui;
    border-top: 1px solid $selected-ui;
    border-bottom: 1px solid $active-ui; //bottom border acts as separator from other rows
  }

  // first row
  .#{$prefix}--data-table--zebra
    tbody
    tr:first-of-type:nth-child(odd).#{$prefix}--data-table--selected
    td,
  tr.#{$prefix}--data-table--selected:first-of-type td {
    border-top: 1px solid $active-ui; //top border acts as separator from thead
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
    border-top: 1px solid $selected-ui; // doesn't need separators
    border-bottom: 1px solid $selected-ui;
  }

  // zebra select - odd child
  .#{$prefix}--data-table--zebra
    tbody
    tr:nth-child(even).#{$prefix}--data-table--selected
    td {
    border-bottom: 1px solid $active-ui;
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

  //----------------------------------------------------------------------------
  // Compact
  //----------------------------------------------------------------------------
  .#{$prefix}--data-table--compact thead tr,
  .#{$prefix}--data-table--compact tbody tr {
    height: rem(24px);
  }

  .#{$prefix}--data-table--compact .#{$prefix}--table-header-label {
    padding: rem(2px) 0;
  }

  .#{$prefix}--data-table--compact td {
    padding-top: rem(2px);
    padding-bottom: rem(2px);
  }

  .#{$prefix}--data-table--compact .#{$prefix}--overflow-menu {
    width: rem(32px);
    height: rem(23px); //24px row - 1px border
  }

  .#{$prefix}--data-table.#{$prefix}--data-table--compact
    .#{$prefix}--table-column-menu {
    padding-top: 0;
  }

  .#{$prefix}--data-table.#{$prefix}--data-table--compact
    .#{$prefix}--table-column-checkbox {
    padding-top: 0;
    padding-bottom: 0;
  }

  .#{$prefix}--data-table.#{$prefix}--data-table--compact
    .#{$prefix}--table-column-checkbox
    .#{$prefix}--checkbox-label {
    min-height: rem(23px); //24px row - 1px border
    height: rem(23px);
  }

  //----------------------------------------------------------------------------
  // Short
  //----------------------------------------------------------------------------
  .#{$prefix}--data-table--short thead tr,
  .#{$prefix}--data-table--short tbody tr {
    height: rem(32px);
  }

  .#{$prefix}--data-table--short .#{$prefix}--table-header-label {
    padding: rem(7px) 0;
  }

  .#{$prefix}--data-table--short td {
    padding-top: rem(7px);
    padding-bottom: rem(6px);
  }

  .#{$prefix}--data-table--short .#{$prefix}--overflow-menu {
    height: rem(31px); //32px row - 1px border
  }

  .#{$prefix}--data-table.#{$prefix}--data-table--short
    .#{$prefix}--table-column-menu {
    padding-top: 0;
  }

  .#{$prefix}--data-table.#{$prefix}--data-table--short
    .#{$prefix}--table-column-checkbox {
    padding-top: rem(3px);
    padding-bottom: rem(3px);
  }

  //----------------------------------------------------------------------------
  // Tall
  //----------------------------------------------------------------------------
  .#{$prefix}--data-table--tall thead tr,
  .#{$prefix}--data-table--tall tbody tr {
    height: rem(64px);
  }

  .#{$prefix}--data-table--tall .#{$prefix}--table-header-label {
    padding: rem(16px) 0;
  }

  .#{$prefix}--data-table--tall td {
    padding-top: 1rem;
  }

  .#{$prefix}--data-table--cell-secondary-text {
    @include type-style('label-01');
  }

  .#{$prefix}--data-table.#{$prefix}--data-table--tall
    .#{$prefix}--table-column-menu,
  .#{$prefix}--data-table.#{$prefix}--data-table--tall
    .#{$prefix}--table-column-checkbox {
    padding-top: rem(12px);
  }

  //----------------------------------------------------------------------------
  // Static
  //----------------------------------------------------------------------------
  .#{$prefix}--data-table--static {
    width: auto;
  }

  // -------------
  // Sticky header
  // -------------
  .#{$prefix}--data-table_inner-container {
    background-color: $ui-03;
    padding-top: rem(48px);
    transform: translateZ(0);
  }

  .#{$prefix}--data-table--sticky-header {
    display: block;
    // max-height: rem(300px);
    overflow-y: scroll;

    thead,
    tbody,
    tr,
    th,
    td {
      display: flex;
    }

    thead {
      position: fixed;
      top: 0;
      width: 100%;
      overflow: scroll;
      -ms-overflow-style: none; //hides ie scrollbar
      will-change: transform;
    }

    thead tr th {
      border-bottom: 1px solid $active-ui;
    }

    tbody {
      flex-direction: column;
      overflow-x: scroll;
      -ms-overflow-style: none; //hides ie scrollbar
      will-change: transform;
    }

    tr {
      min-height: rem(48px);
      height: auto;
    }

    tr.#{$prefix}--data-table--selected:first-of-type td {
      border-top: none;
    }

    //hides webkit scrollbar
    thead::-webkit-scrollbar,
    tbody::-webkit-scrollbar {
      display: none;
    }

    //hides ff scrollbar
    @-moz-document url-prefix() {
      thead,
      tbody {
        scrollbar-width: none;
      }
    }

    tbody tr:last-of-type {
      border-bottom: 0;
    }

    th:not(.#{$prefix}--table-column-checkbox):not(.#{$prefix}--table-column-menu):not(.#{$prefix}--table-expand-v2):not(.#{$prefix}--table-column-icon),
    td:not(.#{$prefix}--table-column-checkbox):not(.#{$prefix}--table-column-menu):not(.#{$prefix}--table-expand-v2):not(.#{$prefix}--table-column-icon) {
      width: 100%;
      min-width: 0;
    }

    .#{$prefix}--table-header-label {
      max-width: calc(100% - 10px);
      @include text-overflow;
    }
  }

  @include sticky-header($max-width: rem(900px));
}
```

</details>

- **Group**: [data-table](#data-table)
- **Requires**:
  - [text-overflow [mixin]](#text-overflow-mixin)
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
  - [selected-ui [variable]](#selected-ui-variable)
  - [active-ui [variable]](#active-ui-variable)

### ❌data-table-expandable [mixin]

Data table expandable styles

<details>
<summary>Source code</summary>

```scss
@mixin data-table-expandable() {
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
    transition: height $duration--moderate-01 motion(standard, productive);
  }

  tr.#{$prefix}--parent-row:not(.#{$prefix}--expandable-row)
    + tr[data-child-row]
    td {
    padding-top: 0;
    padding-bottom: 0;
    border: 0;
    background-color: $hover-ui;
    transition: padding $duration--moderate-01 motion(standard, productive), background-color
        $duration--moderate-01 motion(standard, productive);
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
    transition: height $duration--moderate-01 motion(standard, productive);
  }

  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row + tr[data-child-row] td {
    padding-bottom: rem(23px);
    transition: padding $duration--moderate-01 motion(standard, productive);
    border-bottom: 1px solid $ui-03;
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
    border-bottom: 1px solid $ui-03;
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
  tr.#{$prefix}--parent-row:not(.#{$prefix}--expandable-row) td,
  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row td,
  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row {
    transition: height $duration--moderate-02 motion(standard, productive), background-color
        $duration--fast-02 motion(standard, productive);
  }

  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row + tr[data-child-row] td {
    transition: all $duration--fast-02 motion(standard, productive);
  }

  // hovering on collapsed parent
  tr.#{$prefix}--parent-row:not(.#{$prefix}--expandable-row):first-of-type:hover
    td {
    border-top: 1px solid $ui-03;
    border-bottom: 1px solid $ui-03;
  }

  // hovering on expanded parent
  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row:hover td {
    background-color: $hover-ui;
    border-top: 1px solid $ui-03;
    border-bottom: 1px solid $ui-03;
    color: $text-01;
  }

  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row:hover td:first-of-type {
    border-bottom: 1px solid transparent; // first td doesn't have a visible border
  }

  // child row when hovering on expanded parent
  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row:hover
    + tr[data-child-row]
    td {
    background-color: $hover-ui;
    color: $text-01;
    border-bottom: 1px solid $ui-03;
  }

  //hovering on expanded child row
  tr.#{$prefix}--expandable-row--hover + tr[data-child-row] td {
    border-bottom: 1px solid $ui-03;
  }

  //hovering on expanded child row (class added to parent)
  tr.#{$prefix}--expandable-row--hover {
    background-color: $hover-ui;
  }

  tr.#{$prefix}--expandable-row--hover td {
    background-color: $hover-ui;
    border-bottom: 1px solid $ui-03;
    border-top: 1px solid $ui-03;
    color: $text-01;
  }

  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row.#{$prefix}--expandable-row--hover
    td:first-of-type {
    border-bottom: 1px solid transparent; // first parent td doesnt have visible bottom border
  }

  //----------------------------------------------------------------------------
  // Expand icon column
  //----------------------------------------------------------------------------
  .#{$prefix}--data-table td.#{$prefix}--table-expand {
    width: 2.5rem;
    min-width: 2.5rem;
    height: 3rem;
    vertical-align: top;
    padding: 0;
    border-bottom: 1px solid $ui-03;
  }

  .#{$prefix}--data-table
    td.#{$prefix}--table-expand[data-previous-value='collapsed'] {
    border-bottom: 1px solid transparent;
  }

  .#{$prefix}--table-expand[data-previous-value='collapsed']
    .#{$prefix}--table-expand__svg {
    transform: rotate(270deg);
    transition: transform $duration--moderate-01 motion(standard, productive);
  }

  .#{$prefix}--table-expand__button {
    @include button-reset('false');
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .#{$prefix}--data-table--short .#{$prefix}--table-expand__button {
    height: auto;
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
    transition: transform $duration--moderate-01 motion(standard, productive);
  }

  th.#{$prefix}--table-expand {
    position: relative;
    vertical-align: middle;
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
    background: $ui-03;
  }

  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row:hover
    td.#{$prefix}--table-expand
    + td::after,
  tr.#{$prefix}--parent-row.#{$prefix}--expandable-row.#{$prefix}--expandable-row--hover
    td.#{$prefix}--table-expand
    + td::after {
    background: $hover-ui;
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
    background: $selected-ui;
    border-top: 1px solid $active-ui;
    border-bottom: 1px solid $ui-03;
    box-shadow: 0 1px $active-ui;
  }

  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected td {
    background: $selected-ui;
    color: $text-01;
    border-bottom: 1px solid transparent;
    box-shadow: 0 1px $active-ui;
  }

  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected:last-of-type td {
    background: $selected-ui;
    border-bottom: 1px solid transparent;
    box-shadow: 0 1px $ui-03;
  }

  // parent collapsed hover
  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected:not(.#{$prefix}--expandable-row):hover
    td {
    background: $hover-selected-ui;
    border-top: 1px solid $hover-selected-ui;
    border-bottom: 1px solid $ui-03;
    box-shadow: 0 1px $hover-selected-ui;
  }

  // parent expanded
  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected.#{$prefix}--expandable-row
    td,
  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected.#{$prefix}--expandable-row
    td:first-of-type {
    border-bottom: 1px solid transparent;
    box-shadow: 0 1px $selected-ui; //no visible border when expanded
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
    background-color: $hover-ui;
    border-bottom: 1px solid $ui-03;
    box-shadow: 0 1px $active-ui;
    border-top: 1px solid $active-ui;
  }

  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected.#{$prefix}--expandable-row
    + tr[data-child-row]:last-of-type
    td {
    box-shadow: inset 0 -1px $active-ui;
    padding-bottom: rem(24px);
  }

  // child row expanded hover
  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected.#{$prefix}--expandable-row:hover
    + tr[data-child-row]
    td,
  tr.#{$prefix}--parent-row.#{$prefix}--data-table--selected.#{$prefix}--expandable-row--hover
    + tr[data-child-row]
    td {
    background: $selected-ui;
  }
}
```

</details>

- **Group**: [data-table](#data-table)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [spacing-05 [variable]](#spacing-05-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [text-01 [variable]](#text-01-variable)
  - [focus [variable]](#focus-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [spacing-03 [variable]](#spacing-03-variable)
  - [selected-ui [variable]](#selected-ui-variable)
  - [active-ui [variable]](#active-ui-variable)
  - [hover-selected-ui [variable]](#hover-selected-ui-variable)

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

### ❌data-table-sort [mixin]

Data table sort styles

<details>
<summary>Source code</summary>

```scss
@mixin data-table-sort() {
  // -------------------------------------
  // Sortable table
  // -------------------------------------
  .#{$prefix}--data-table--sort th,
  .#{$prefix}--data-table--sort
    th:first-of-type:not(.#{$prefix}--table-column-checkbox):not(.#{$prefix}--table-expand) {
    padding: 0;
  }

  .#{$prefix}--data-table--sort th {
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
    background-color: $ui-03;
    transition: background-color $duration--fast-01 motion(entrance, productive),
      outline $duration--fast-01 motion(entrance, productive);
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

  //----------------------------------------------------------------------------
  // Compact, Short, Tall Sortable
  //----------------------------------------------------------------------------
  // Sortable compact
  .#{$prefix}--data-table--compact.#{$prefix}--data-table--sort th {
    height: rem(24px);
  }

  .#{$prefix}--data-table--compact.#{$prefix}--data-table--sort
    th
    .#{$prefix}--table-sort {
    padding-top: 0;
    padding-bottom: 0;
  }

  // Sortable Short
  .#{$prefix}--data-table--short.#{$prefix}--data-table--sort th {
    height: rem(32px);
  }

  .#{$prefix}--data-table--short.#{$prefix}--data-table--sort
    th
    .#{$prefix}--table-sort {
    padding-top: 0;
    padding-bottom: 0;
  }

  // Sortable Tall
  .#{$prefix}--data-table--tall.#{$prefix}--data-table--sort th {
    height: rem(64px);
  }

  .#{$prefix}--data-table--tall.#{$prefix}--data-table--sort
    th
    .#{$prefix}--table-sort {
    padding-top: 0;
    padding-bottom: 0;
  }

  .#{$prefix}--data-table--tall.#{$prefix}--data-table--sort
    th
    .#{$prefix}--table-sort
    svg {
    align-self: flex-start;
    top: $spacing-03;
  }

  .#{$prefix}--data-table--tall.#{$prefix}--data-table--sort
    th
    .#{$prefix}--table-sort
    .#{$prefix}--table-header-label {
    align-self: flex-start;
    position: relative;
    top: rem(-8px);
    max-height: 3rem;
    display: -webkit-box; // weird text truncation style used
    -webkit-line-clamp: 2; // because we need text to wrap
    -webkit-box-orient: vertical; // can't use white-space: nowrap
  }
}
```

</details>

- **Group**: [data-table](#data-table)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
  - [layout-04 [variable]](#layout-04-variable)
  - [spacing-03 [variable]](#spacing-03-variable)
  - [spacing-04 [variable]](#spacing-04-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [layout-01 [variable]](#layout-01-variable)

## date-picker

### ❌date-picker [mixin]

Date picker styles

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

  .#{$prefix}--date-picker-input__wrapper {
    display: flex;
    align-items: center;
    position: relative;

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
      color: $disabled-02;
      background-color: $disabled-background-color;
      border-bottom: 1px solid transparent;
      cursor: not-allowed;
    }

    &:disabled::placeholder {
      color: $disabled-02;
    }

    &:disabled:hover {
      border-bottom: 1px solid transparent;
    }

    &::placeholder {
      color: $text-05;
      opacity: 1;
    }
  }

  .#{$prefix}--date-picker__icon {
    position: absolute;
    right: 1rem;
    fill: $icon-01;
    cursor: pointer;
    z-index: 1;
    // vertically center icon within parent container on IE11
    top: 50%;
    transform: translateY(-50%);
  }

  .#{$prefix}--date-picker__icon ~ .#{$prefix}--date-picker__input {
    padding-right: $carbon--spacing-09;
  }

  .#{$prefix}--date-picker__input:disabled ~ .#{$prefix}--date-picker__icon {
    fill: $disabled-02;
    cursor: not-allowed;
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
    @include type-style('productive-heading-01');
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
      outline-color: $interactive-01;
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
    color: $text-04;
    background: $interactive-01;
  }

  .#{$prefix}--date-picker__day.startRange.selected,
  .flatpickr-day.startRange.selected {
    box-shadow: none;
    z-index: 2;
  }

  .#{$prefix}--date-picker__day.endRange,
  .flatpickr-day.endRange {
    &:hover {
      @include focus-outline('outline');
      background: $ui-01;
      color: $text-01;
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
    color: $text-04;
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
    height: auto;
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
  - [prefix [variable]](#prefix-variable)
  - [field-02 [variable]](#field-02-variable)
  - [support-01 [variable]](#support-01-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [field-01 [variable]](#field-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [text-05 [variable]](#text-05-variable)
  - [icon-01 [variable]](#icon-01-variable)
  - [carbon--spacing-09 [variable]](#carbon--spacing-09-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [text-02 [variable]](#text-02-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [text-04 [variable]](#text-04-variable)

## dropdown

### ❌dropdown [mixin]

Dropdown styles

<details>
<summary>Source code</summary>

```scss
@mixin dropdown() {
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
    transition: background-color $duration--fast-01 motion(standard, productive);

    &:focus {
      @include focus-outline('outline');
    }

    &:hover {
      background-color: $hover-ui;
    }
  }

  .#{$prefix}--dropdown--xl {
    height: rem(48px);
  }

  .#{$prefix}--dropdown--xl .#{$prefix}--dropdown__arrow {
    top: rem(16px);
  }

  .#{$prefix}--dropdown--sm {
    height: rem(32px);
  }

  .#{$prefix}--dropdown--sm .#{$prefix}--dropdown__arrow {
    top: rem(8px);
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

  button.#{$prefix}--dropdown-text {
    color: $text-01;
    // button-reset mixin contradicts with bx--dropdown-text styles
    background: none;
    border: none;
    width: 100%;
    text-align: left;

    &:focus {
      @include focus-outline('outline');
    }
  }

  .#{$prefix}--dropdown-text {
    @include type-style('body-short-01');
    display: block;
    height: calc(100% + 1px); // Account for the border in `.bx--dropdown`
    padding-left: $carbon--spacing-05;
    padding-right: rem(42px); // 2rem + SVG width
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .#{$prefix}--dropdown-list {
    @include reset;
    @include focus-outline('reset');
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
    // NOTE: IE, Edge, and Safari do not support two value `overflow` shorthand.
    overflow-x: hidden;
    overflow-y: auto;
  }

  .#{$prefix}--dropdown:not(.#{$prefix}--dropdown--open)
    .#{$prefix}--dropdown-item {
    visibility: hidden;
  }

  .#{$prefix}--dropdown-item {
    transition: visibility $duration--fast-01 motion(standard, productive), opacity
        $duration--fast-01 motion(standard, productive),
      background-color $duration--fast-01 motion(standard, productive);
    opacity: 0;
    visibility: inherit;

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

    &:hover {
      color: $text-01;
      border-color: transparent;
    }
  }

  .#{$prefix}--dropdown--focused,
  .#{$prefix}--dropdown-link:focus {
    @include focus-outline('outline');
    margin: 0;
    padding: rem(11px) rem(16px);
  }

  // We don't want to apply focus styles via focus selector when using the aria-activedescendant structure
  .#{$prefix}--dropdown-list[aria-activedescendant]
    .#{$prefix}--dropdown-link:focus {
    outline: none;
    // Copied from .bx--dropdown-link styles
    margin: 0 $carbon--spacing-05;
    padding: rem(11px) 0;
  }

  // Need added weight for item that is :focused and .bx--dropdown--focused
  .#{$prefix}--dropdown-list[aria-activedescendant]
    .#{$prefix}--dropdown--focused:focus {
    // copied from default focus styles
    @include focus-outline('outline');
    margin: 0;
    padding: rem(11px) rem(16px);
  }

  // Don't want to allow multiple elements have a "selected" style. Not sure why active
  // had unique styles initially but creating an overwrite for the latest HTML markup for
  // backwards compatibility. For the next major release it would be possible to clean up
  // the HTML structure to prevent the user of :active and :focus styles which is creating
  // these duplicated styles in the list. The Carbon 10 version of dropdown is already
  // supporting 2 very different HTML structures.
  .#{$prefix}--dropdown-list[aria-activedescendant]
    .#{$prefix}--dropdown-item:active {
    background-color: inherit;
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
    transition: max-height $duration--fast-02 motion(entrance, productive);
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
    width: auto;
    height: rem(32px);
    background-color: $ui-background;
    transition: background $duration--fast-01 motion(entrance, productive);

    &:hover {
      background-color: $hover-ui;
    }

    &.#{$prefix}--dropdown--disabled {
      background-color: $ui-background;
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

  .#{$prefix}--dropdown--show-selected .#{$prefix}--dropdown--selected {
    background-color: $hover-ui;
    color: $text-01;
    display: block;

    &:hover {
      background-color: $selected-ui;
    }

    .#{$prefix}--dropdown-link {
      border-top-color: transparent;
    }

    + .#{$prefix}--dropdown-item .#{$prefix}--dropdown-link {
      border-top-color: transparent;
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
  - [prefix [variable]](#prefix-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [text-01 [variable]](#text-01-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [support-01 [variable]](#support-01-variable)
  - [field-02 [variable]](#field-02-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [selected-ui [variable]](#selected-ui-variable)
  - [text-02 [variable]](#text-02-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [ui-background [variable]](#ui-background-variable)
  - [carbon--spacing-04 [variable]](#carbon--spacing-04-variable)

## file-uploader

### ❌file-uploader [mixin]

File uploader styles

<details>
<summary>Source code</summary>

```scss
@mixin file-uploader() {
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
    @include type-style('productive-heading-01');
    color: $text-01;
    margin-bottom: $carbon--spacing-03;
  }

  .#{$prefix}--file-input {
    @include hidden;
  }

  // This class is of old markup with "select file" button
  // New code should use link-style "select file" UI (`.bx--file-browse-btn`)
  // TODO: deprecate this block
  .#{$prefix}--file-btn {
    display: inline-flex;
    margin: 0;
    padding-right: rem(64px);
  }

  .#{$prefix}--file-browse-btn {
    margin-bottom: $carbon--spacing-03;
    display: inline-block;
    width: 100%;
    max-width: rem(320px);
    color: $link-01;
    outline: none;
    transition: $duration--fast-02 motion(standard, productive);
    cursor: pointer;
    outline: 2px solid transparent;
    outline-offset: -2px;

    &:focus,
    &:hover {
      outline: 2px solid $interactive-03;
    }

    &:hover,
    &:focus,
    &:active,
    &:active:visited {
      text-decoration: underline;
    }

    &:active {
      color: $text-01;
    }
  }

  .#{$prefix}--file-browse-btn--disabled {
    cursor: no-drop;
    text-decoration: none;
    color: $disabled-02;

    &:hover,
    &:focus {
      outline: none;
      text-decoration: none;
      color: $disabled-02;
    }
  }

  .#{$prefix}--file-browse-btn--disabled .#{$prefix}--file__drop-container {
    border: 1px dashed $disabled-01;
  }

  .#{$prefix}--label-description {
    @include reset;
    @include type-style('body-short-01');

    color: $text-02;
    margin-bottom: $carbon--spacing-05;
  }

  .#{$prefix}--file-btn ~ .#{$prefix}--file-container {
    margin-top: $carbon--spacing-06;
  }

  .#{$prefix}--file__selected-file {
    display: grid;
    grid-gap: $carbon--spacing-03 $carbon--spacing-05;
    grid-template-columns: 1fr auto;
    grid-auto-rows: auto;
    align-items: center;
    min-height: $carbon--spacing-07;
    max-width: rem(320px);
    margin-bottom: $carbon--spacing-03;
    background-color: $field-01;
    word-break: break-word;

    &:last-child {
      margin-bottom: 0;
    }

    .#{$prefix}--form-requirement {
      grid-column-start: 1;
      grid-column-end: -1;
      max-height: none;
      margin: 0;
    }

    .#{$prefix}--loading {
      width: rem(32px);
      height: rem(32px);
      margin-right: -$carbon--spacing-03;
    }

    .#{$prefix}--inline-loading__animation .#{$prefix}--loading {
      // Vanilla markup has `.bx--inline-loading__animation` which is used for `margin-right` adjustment
      margin-right: 0;
    }

    .#{$prefix}--file-filename {
      @include type-style('body-short-01');
      margin-left: $carbon--spacing-05;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  // TODO: deprecate this block
  .#{$prefix}--file__selected-file--invalid__wrapper {
    @include focus-outline('invalid');
    outline-width: 1px;
    background-color: $field-01;
    max-width: rem(320px);
    margin-bottom: $carbon--spacing-03;
  }

  .#{$prefix}--file__selected-file--invalid {
    @include focus-outline('invalid');
    outline-width: 1px;
    padding: $carbon--spacing-04 0;
  }

  .#{$prefix}--file__selected-file--invalid .#{$prefix}--form-requirement {
    border-top: 1px solid $ui-03;
    padding-top: $carbon--spacing-03;
  }

  .#{$prefix}--file__selected-file--invalid
    .#{$prefix}--form-requirement__title,
  .#{$prefix}--file__selected-file--invalid
    .#{$prefix}--form-requirement__supplement {
    @include type-style('label-01');
    padding-right: $carbon--spacing-03;
    padding-left: $carbon--spacing-05;
  }

  .#{$prefix}--file__selected-file--invalid
    .#{$prefix}--form-requirement__supplement {
    color: $text-01;
  }

  // TODO: deprecate
  .#{$prefix}--file__selected-file--invalid + .#{$prefix}--form-requirement {
    @include type-style('caption-01');
    display: block;
    max-height: rem(200px);
    color: $support-01;
    font-weight: 400;
    padding: $carbon--spacing-03 $carbon--spacing-05;
    overflow: visible;
  }

  .#{$prefix}--file__selected-file--invalid
    + .#{$prefix}--form-requirement
    .#{$prefix}--form-requirement__supplement {
    padding-bottom: $carbon--spacing-03;
    color: $text-01;
  }

  .#{$prefix}--file__state-container {
    display: flex;
    justify-content: center;
    min-width: 1.5rem;
    padding-right: $carbon--spacing-03;

    .#{$prefix}--loading__svg {
      stroke: $ui-05;
    }
  }

  .#{$prefix}--file__state-container .#{$prefix}--file-complete {
    fill: $interactive-04;
    cursor: pointer;

    &:focus {
      @include focus-outline('border');
    }

    // for checkmark contrast
    [data-icon-path='inner-path'] {
      opacity: 1;
      fill: $icon-03;
    }
  }

  .#{$prefix}--file__state-container .#{$prefix}--file-invalid {
    height: $carbon--spacing-05;
    width: $carbon--spacing-05;
    fill: $support-01;
    margin-right: $carbon--spacing-03;
  }

  .#{$prefix}--file__state-container .#{$prefix}--file-close {
    height: $carbon--spacing-05;
    width: $carbon--spacing-05;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    fill: $icon-02;

    &:focus {
      @include focus-outline('border');
    }
  }

  .#{$prefix}--file__state-container .#{$prefix}--file-close svg path {
    fill: $icon-02;
  }

  .#{$prefix}--file__state-container .#{$prefix}--inline-loading__animation {
    margin-right: -$carbon--spacing-03;
  }

  .#{$prefix}--file__drop-container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    height: rem(96px);
    padding: $carbon--spacing-05;
    overflow: hidden;
    border: 1px dashed $ui-04;
  }

  .#{$prefix}--file__drop-container--drag-over {
    background: none;
    outline: 2px solid $interactive-03;
    outline-offset: -2px;
  }
}
```

</details>

- **Group**: [file-uploader](#file-uploader)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [support-01 [variable]](#support-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [link-01 [variable]](#link-01-variable)
  - [interactive-03 [variable]](#interactive-03-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [disabled-01 [variable]](#disabled-01-variable)
  - [text-02 [variable]](#text-02-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [carbon--spacing-06 [variable]](#carbon--spacing-06-variable)
  - [carbon--spacing-07 [variable]](#carbon--spacing-07-variable)
  - [field-01 [variable]](#field-01-variable)
  - [carbon--spacing-04 [variable]](#carbon--spacing-04-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [interactive-04 [variable]](#interactive-04-variable)
  - [icon-03 [variable]](#icon-03-variable)
  - [icon-02 [variable]](#icon-02-variable)
  - [ui-04 [variable]](#ui-04-variable)

## form

### ❌form [mixin]

Form styles

<details>
<summary>Source code</summary>

```scss
@mixin form() {
  .#{$prefix}--fieldset {
    @include reset;
    margin-bottom: $carbon--spacing-07;
  }

  .#{$prefix}--form-item {
    @include type-style('body-short-01');
    display: flex;
    flex-direction: column;
    // We specify `auto` as the default value so that the form item does
    // not collapse in IE11 due to a `flex-basis` of 0 only working with
    // `flex-direction: row`
    flex: 1 1 auto;
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
    color: $text-05;
    z-index: 0;
    opacity: 1;
    margin-bottom: $carbon--spacing-03;

    @include carbon--breakpoint('sm') {
      max-width: 75%;
    }
  }

  .#{$prefix}--label--disabled,
  .#{$prefix}--form__helper-text--disabled {
    color: $disabled-02;
  }
}
```

</details>

- **Group**: [form](#form)
- **Requires**:
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [carbon--font-family [function]](#carbon--font-family-function)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-07 [variable]](#carbon--spacing-07-variable)
  - [text-02 [variable]](#text-02-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [support-01 [variable]](#support-01-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [text-05 [variable]](#text-05-variable)
  - [disabled-02 [variable]](#disabled-02-variable)

## inline-loading

### ❌inline-loading [mixin]

Inline loading styles

<details>
<summary>Source code</summary>

```scss
@mixin inline-loading() {
  .#{$prefix}--inline-loading {
    display: flex;
    width: 100%;
    min-height: 2rem;
    align-items: center;

    .#{$prefix}--loading__svg circle {
      stroke-width: 12;
    }

    .#{$prefix}--loading__stroke {
      stroke-dashoffset: $loading--small__gap;
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
    fill: $interactive-04;

    // For deprecated older markup
    &.#{$prefix}--inline-loading__svg {
      width: 0.75rem;
      position: absolute;
      top: 0.75rem;
    }

    &[hidden] {
      display: none;
    }
  }

  .#{$prefix}--inline-loading__checkmark {
    fill: none;
    stroke: $interactive-04;
    transform-origin: 50% 50%;
    stroke-width: 1.8;
    stroke-dasharray: 12;
    stroke-dashoffset: 12;
    animation-name: stroke;
    animation-duration: 0.25s;
    animation-fill-mode: forwards;
  }

  .#{$prefix}--inline-loading--error {
    fill: $support-01;
    width: rem(16px);
    height: rem(16px);

    &[hidden] {
      display: none;
    }
  }

  .#{$prefix}--loading--small .#{$prefix}--inline-loading__svg {
    stroke: $interactive-04;
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
  - [prefix [variable]](#prefix-variable)
  - [loading--small\_\_gap [variable]](#loading--small__gap-variable)
  - [text-02 [variable]](#text-02-variable)
  - [interactive-04 [variable]](#interactive-04-variable)
  - [support-01 [variable]](#support-01-variable)

## link

### ❌link [mixin]

Link styles

<details>
<summary>Source code</summary>

```scss
@mixin link() {
  .#{$prefix}--link {
    @include reset;
    @include type-style('body-short-01');
    color: $link-01;
    text-decoration: none;
    outline: none;
    transition: $duration--fast-01 motion(standard, productive);

    &:hover {
      color: $link-01;
      text-decoration: underline;
    }

    &:active,
    &:active:visited,
    &:active:visited:hover {
      color: $text-01;
      text-decoration: underline;
    }

    &:focus {
      @include focus-outline;
    }

    &:not([href]):not(button) {
      color: $disabled-02;
      cursor: not-allowed;
      pointer-events: none;
      touch-action: none;
    }

    &:visited {
      color: $visited-link;
    }

    &:visited:hover {
      color: $hover-primary-text;
    }
  }

  .#{$prefix}--link--disabled {
    @include reset;
    @include type-style('body-short-01');
    display: inline;
    color: $disabled-02;
    font-weight: 400;
    cursor: not-allowed;
  }

  .#{$prefix}--link.#{$prefix}--link--inline {
    text-decoration: underline;

    &:hover {
      color: $hover-primary-text;
    }

    &:focus {
      text-decoration: none;
    }

    &:visited {
      text-decoration: none;
    }
  }

  .#{$prefix}--link--disabled.#{$prefix}--link--inline {
    text-decoration: underline;
  }
}
```

</details>

- **Group**: [link](#link)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
  - [link-01 [variable]](#link-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [visited-link [variable]](#visited-link-variable)
  - [hover-primary-text [variable]](#hover-primary-text-variable)

## list

### ❌lists [mixin]

List styles

<details>
<summary>Source code</summary>

```scss
@mixin lists() {
  .#{$prefix}--list--nested,
  .#{$prefix}--list--unordered,
  .#{$prefix}--list--ordered {
    @include reset;
    @include type-style('body-short-01');
  }

  .#{$prefix}--list__item {
    color: $text-01;
    margin-bottom: $carbon--spacing-02;
  }

  .#{$prefix}--list--nested {
    margin-top: $carbon--spacing-02;
    margin-left: $carbon--spacing-06;
  }

  .#{$prefix}--list--nested > .#{$prefix}--list__item {
    margin-top: 0;
    margin-bottom: 0;
  }

  .#{$prefix}--list--nested .#{$prefix}--list--nested {
    margin-top: 0;
  }

  .#{$prefix}--list--ordered {
    list-style-type: decimal;
  }

  .#{$prefix}--list--ordered.#{$prefix}--list--nested {
    list-style-type: lower-latin;
  }

  .#{$prefix}--list--unordered > .#{$prefix}--list__item {
    position: relative;

    &::before {
      position: absolute;
      left: -$carbon--spacing-05;
      content: '\002013'; // – en dash
    }
  }

  .#{$prefix}--list--unordered.#{$prefix}--list--nested
    > .#{$prefix}--list__item::before {
    left: -$carbon--spacing-04; // offset to account for smaller ▪ vs –
    content: '\0025AA'; // ▪ square
  }
}
```

</details>

- **Group**: [list](#list)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
  - [text-01 [variable]](#text-01-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [carbon--spacing-06 [variable]](#carbon--spacing-06-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [carbon--spacing-04 [variable]](#carbon--spacing-04-variable)

## list-box

### ❌list-box-width [variable]

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

### ❌list-box-height [variable]

<details>
<summary>Source code</summary>

```scss
$list-box-height: rem(40px);
```

</details>

- **Group**: [list-box](#list-box)
- **Type**: `Number`

### ❌list-box-inline-height [variable]

<details>
<summary>Source code</summary>

```scss
$list-box-inline-height: $list-box-height;
```

</details>

- **Group**: [list-box](#list-box)
- **Type**: `Number`

### ❌list-box-menu-width [variable]

<details>
<summary>Source code</summary>

```scss
$list-box-menu-width: rem(300px);
```

</details>

- **Group**: [list-box](#list-box)
- **Type**: `Number`

### ❌listbox [mixin]

List box styles

<details>
<summary>Source code</summary>

```scss
@mixin listbox() {
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
    @include reset;
    position: relative;
    width: $list-box-width;
    height: rem(40px);
    max-height: rem(40px);
    background-color: $field-01;
    border: none;
    border-bottom: 1px solid $ui-04;
    cursor: pointer;
    color: $text-01;
    transition: all $duration--fast-01 motion(standard, productive);

    &:hover {
      background-color: $hover-ui;
    }
  }

  .#{$prefix}--list-box--xl {
    height: rem(48px);
    max-height: rem(48px);
  }

  .#{$prefix}--list-box--sm {
    height: rem(32px);
    max-height: rem(32px);
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
    top: 50%;
    right: $carbon--spacing-08;
    fill: $support-01;
    transform: translateY(-50%);
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
    background-color: $ui-background;
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

  .#{$prefix}--list-box.#{$prefix}--list-box--inline.#{$prefix}--list-box--disabled:hover {
    background-color: transparent;
  }

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
    height: calc(100% + 1px); // Account for the border in `.bx--list-box`
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
  .#{$prefix}--list-box__field .#{$prefix}--text-input {
    padding-right: carbon--mini-units(9);
  }

  // invalid && populated input field
  .#{$prefix}--list-box[data-invalid]
    .#{$prefix}--list-box__field
    .#{$prefix}--text-input {
    padding-right: rem(98px); // to account for clear input button outline
  }

  .#{$prefix}--list-box[data-invalid]
    .#{$prefix}--list-box__field
    .#{$prefix}--text-input
    + .#{$prefix}--list-box__invalid-icon {
    right: rem(66px); // to account for clear input button outline
  }

  // empty input field
  .#{$prefix}--list-box__field .#{$prefix}--text-input--empty {
    padding-right: $carbon--spacing-09;
  }

  // invalid && empty input field
  .#{$prefix}--list-box[data-invalid]
    .#{$prefix}--list-box__field
    .#{$prefix}--text-input--empty {
    padding-right: carbon--mini-units(9);
  }

  .#{$prefix}--list-box[data-invalid]
    .#{$prefix}--list-box__field
    .#{$prefix}--text-input--empty
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
    top: 0;
    right: $carbon--spacing-05;
    bottom: 0;
    height: 100%;
    transition: transform $duration--fast-01 motion(standard, productive);
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
    transition: background-color $duration--fast-01 motion(standard, productive);

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
    fill: $inverse-01;
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
    transition: background $duration--fast-01 motion(standard, productive);

    &:hover {
      background-color: $hover-ui;
    }

    &:active {
      background-color: $selected-ui;
    }
  }

  .#{$prefix}--list-box--disabled .#{$prefix}--list-box__menu-item:hover {
    background-color: transparent;
  }

  .#{$prefix}--list-box--disabled
    .#{$prefix}--list-box__menu-item__option:hover {
    border-top-color: $ui-03;
  }

  .#{$prefix}--list-box__menu-item:first-of-type
    .#{$prefix}--list-box__menu-item__option {
    border-top-color: transparent;
  }

  .#{$prefix}--list-box__menu-item:hover
    .#{$prefix}--list-box__menu-item__option {
    color: $text-01;
  }

  .#{$prefix}--list-box__menu-item:hover
    + .#{$prefix}--list-box__menu-item
    .#{$prefix}--list-box__menu-item__option {
    border-top-color: transparent;
  }

  .#{$prefix}--list-box--disabled
    .#{$prefix}--list-box__menu-item:hover
    + .#{$prefix}--list-box__menu-item
    .#{$prefix}--list-box__menu-item__option {
    border-top-color: $ui-03;
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
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    border-top-color: $ui-03;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    transition: border-color $duration--fast-01 motion(standard, productive), color
        $duration--fast-01 motion(standard, productive);

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

  .#{$prefix}--list-box--disabled
    .#{$prefix}--list-box__menu-item:hover
    .#{$prefix}--list-box__menu-item__option,
  .#{$prefix}--list-box--disabled .#{$prefix}--list-box__menu-item__option {
    color: $disabled-02;
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
  }

  .#{$prefix}--list-box__menu-item--highlighted
    .#{$prefix}--list-box__menu-item__option,
  .#{$prefix}--list-box__menu-item--highlighted
    + .#{$prefix}--list-box__menu-item
    .#{$prefix}--list-box__menu-item__option {
    border-top-color: transparent;
  }

  .#{$prefix}--list-box__menu-item--highlighted
    .#{$prefix}--list-box__menu-item__option {
    color: $text-01;
  }

  .#{$prefix}--list-box__menu-item--active {
    color: $text-01;
    border-bottom-color: $selected-ui;

    &:hover {
      background-color: $selected-ui;
    }
  }

  .#{$prefix}--list-box__menu-item--active
    .#{$prefix}--list-box__menu-item__option {
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
  - [carbon--mini-units [function]](#carbon--mini-units-function)
  - [prefix [variable]](#prefix-variable)
  - [list-box-width [variable]](#list-box-width-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [text-01 [variable]](#text-01-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [field-02 [variable]](#field-02-variable)
  - [carbon--spacing-08 [variable]](#carbon--spacing-08-variable)
  - [support-01 [variable]](#support-01-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [carbon--spacing-09 [variable]](#carbon--spacing-09-variable)
  - [ui-background [variable]](#ui-background-variable)
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

Loading styles

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

  .#{$prefix}--loading--small .#{$prefix}--loading__stroke {
    stroke-dashoffset: $loading--small__gap;
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
  - [animation\_\_loading--spin [mixin]](#animation__loading--spin-mixin)
  - [animation\_\_loading--stop [mixin]](#animation__loading--stop-mixin)
  - [prefix [variable]](#prefix-variable)
  - [loading\_\_size [variable]](#loading__size-variable)
  - [interactive-04 [variable]](#interactive-04-variable)
  - [loading\_\_gap [variable]](#loading__gap-variable)
  - [loading--small\_\_gap [variable]](#loading--small__gap-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [ui-02 [variable]](#ui-02-variable)

### ❌animation\_\_loading--spin [mixin]

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
- **Used by**:
  - [loading [mixin]](#loading-mixin)

### ❌animation\_\_loading--stop [mixin]

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
- **Used by**:
  - [loading [mixin]](#loading-mixin)

### ❌loading\_\_gap [variable]

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

### ❌loading--small\_\_gap [variable]

<details>
<summary>Source code</summary>

```scss
$loading--small__gap: 99;
```

</details>

- **Group**: [loading](#loading)
- **Type**: `Number`
- **Used by**:
  - [inline-loading [mixin]](#inline-loading-mixin)
  - [loading [mixin]](#loading-mixin)

### ❌loading\_\_size [variable]

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

## modal

### ❌modal [mixin]

Modal styles

<details>
<summary>Source code</summary>

```scss
@mixin modal() {
  .#{$prefix}--modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: z('modal');
    display: flex;
    align-items: center;
    justify-content: center;
    content: '';
    background-color: transparent;
    opacity: 0;
    visibility: hidden;
    transition: background-color $duration--slow-02 motion(exit, expressive), opacity
        $duration--moderate-02 motion(exit, expressive),
      visibility 0ms linear $duration--moderate-02;

    &.is-visible {
      visibility: visible;
      opacity: 1;
      background-color: $overlay-01;
      transition: background-color $duration--slow-02 motion(entrance, expressive),
        opacity $duration--moderate-02 motion(entrance, expressive),
        visibility 0ms linear;
    }

    .#{$prefix}--text-input,
    .#{$prefix}--text-area,
    .#{$prefix}--search-input,
    .#{$prefix}--select-input,
    .#{$prefix}--dropdown,
    .#{$prefix}--dropdown-list,
    .#{$prefix}--number input[type='number'] {
      background-color: $field-02;
    }
  }

  .#{$prefix}--modal.is-visible .#{$prefix}--modal-container {
    transition: transform $duration--moderate-02 motion(entrance, expressive);
    transform: translate3d(0, 0, 0);
  }

  .#{$prefix}--modal-container {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto;
    background-color: $ui-01;
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
    transform-origin: top center;
    transform: translate3d(0, -24px, 0);
    transition: transform $duration--moderate-02 motion(exit, expressive);

    @include carbon--breakpoint(md) {
      width: 84%;
      max-height: 90%;
      height: auto;

      .#{$prefix}--modal-header,
      .#{$prefix}--modal-content,
      .#{$prefix}--modal-content__regular-content {
        padding-right: 20%;
      }
    }

    @include carbon--breakpoint(lg) {
      width: 60%;
      max-height: 84%;
    }

    @include carbon--breakpoint(xlg) {
      width: 48%;
    }
  }

  .#{$prefix}--modal-header,
  .#{$prefix}--modal-content {
    padding-left: $spacing-05;
  }

  .#{$prefix}--modal-header,
  .#{$prefix}--modal-content,
  .#{$prefix}--modal-content__regular-content {
    padding-right: $spacing-05;
  }

  .#{$prefix}--modal-content--with-form {
    padding-right: $spacing-05;

    @include carbon--breakpoint(md) {
      padding-right: $spacing-05; // Override for `.#{$prefix}--modal-content`
    }
  }

  .#{$prefix}--modal-container--xs {
    .#{$prefix}--modal-header {
      padding-right: $carbon--spacing-09;
    }

    .#{$prefix}--modal-content,
    .#{$prefix}--modal-content__regular-content,
    .#{$prefix}--modal-content--with-form {
      padding-right: $spacing-05;
    }

    @include carbon--breakpoint(md) {
      width: 48%;
    }

    @include carbon--breakpoint(lg) {
      width: 32%;
      max-height: 48%;
    }

    @include carbon--breakpoint(xlg) {
      width: 24%;
    }
  }

  .#{$prefix}--modal-container--sm {
    .#{$prefix}--modal-header {
      padding-right: $carbon--spacing-09;
    }

    .#{$prefix}--modal-content,
    .#{$prefix}--modal-content__regular-content,
    .#{$prefix}--modal-content--with-form {
      padding-right: $spacing-05;
    }

    @include carbon--breakpoint(md) {
      width: 60%;
    }

    @include carbon--breakpoint(lg) {
      width: 42%;
      max-height: 72%;
    }

    @include carbon--breakpoint(xlg) {
      width: 36%;

      .#{$prefix}--modal-header,
      .#{$prefix}--modal-content,
      .#{$prefix}--modal-content__regular-content {
        padding-right: 20%;
      }

      .#{$prefix}--modal-content--with-form {
        padding-right: $spacing-05; // Override for `.#{$prefix}--modal-content`
      }
    }
  }

  .#{$prefix}--modal-container--lg {
    .#{$prefix}--modal-header {
      padding-right: $carbon--spacing-09;
    }

    .#{$prefix}--modal-content,
    .#{$prefix}--modal-content__regular-content,
    .#{$prefix}--modal-content--with-form {
      padding-right: $spacing-05;
    }

    @include carbon--breakpoint(md) {
      width: 96%;

      .#{$prefix}--modal-header,
      .#{$prefix}--modal-content,
      .#{$prefix}--modal-content__regular-content {
        padding-right: 20%;
      }

      .#{$prefix}--modal-content--with-form {
        padding-right: $spacing-05; // Override for `.#{$prefix}--modal-content`
      }
    }

    @include carbon--breakpoint(lg) {
      width: 84%;
      max-height: 96%;
    }

    @include carbon--breakpoint(xlg) {
      width: 72%;
    }
  }

  .#{$prefix}--modal-header {
    padding-top: $spacing-05;
    padding-right: $spacing-09;
    margin-bottom: $spacing-03;

    grid-row: 1/1;
    grid-column: 1/-1;
  }

  .#{$prefix}--modal-header__label {
    @include type-style('label-01');

    color: $text-02;
    margin-bottom: $spacing-02;
  }

  .#{$prefix}--modal-header__heading {
    @include type-style('productive-heading-03');

    color: $text-01;
  }

  .#{$prefix}--modal-content {
    @include type-style('body-long-01');

    grid-row: 2/-2;
    grid-column: 1/-1;

    overflow-y: auto;
    margin-bottom: $spacing-08;
    color: $text-01;
    font-weight: 400;

    // Required to accommodate focus outline's negative offset:
    padding-top: $spacing-03;

    &:focus {
      @include focus-outline('outline');
    }
  }

  // Required so overflow-indicator disappears at end of content
  .#{$prefix}--modal-content > *:last-child {
    padding-bottom: $spacing-07;
  }

  .#{$prefix}--modal-content {
    > * {
      @include type-style('body-long-01');
    }
  }

  .#{$prefix}--modal-content--overflow-indicator {
    grid-row: 2/-2;
    grid-column: 1/-1;
    width: 100%;
    height: rem(32px);
    content: '';
    position: absolute;
    left: 0;
    bottom: $spacing-08;
    // Safari interprets `transparent` differently, so make color token value transparent instead:
    background-image: linear-gradient(to bottom, rgba($ui-01, 0), $ui-01);
  }

  .#{$prefix}--modal-content:focus
    ~ .#{$prefix}--modal-content--overflow-indicator {
    width: calc(100% - 4px);
    margin: 0 2px 2px 2px;
  }

  .#{$prefix}--modal-footer {
    display: flex;
    margin-top: auto;
    height: 4rem;
    background-color: $modal-footer-background-color;

    grid-row: -1/-1;
    grid-column: 1/-1;

    button.#{$prefix}--btn {
      max-width: none;
      flex: 1;
      height: 4rem;
      margin: 0;
      padding-top: $spacing-05;
      padding-bottom: $spacing-07;
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
    transition: background-color $duration--fast-02 motion(standard, productive);

    &:hover {
      background-color: $hover-ui;
    }

    &:focus {
      outline: none;
      border-color: $focus;
    }
  }

  .#{$prefix}--modal-close::-moz-focus-inner {
    border: 0;
  }

  .#{$prefix}--modal-close__icon {
    fill: $icon-01;
    height: rem(20px);
    width: rem(20px);
  }

  .#{$prefix}--body--with-modal-open {
    overflow: hidden;
  }
}
```

</details>

- **Group**: [modal](#modal)
- **Requires**:
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [prefix [variable]](#prefix-variable)
  - [overlay-01 [variable]](#overlay-01-variable)
  - [field-02 [variable]](#field-02-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [spacing-05 [variable]](#spacing-05-variable)
  - [carbon--spacing-09 [variable]](#carbon--spacing-09-variable)
  - [spacing-09 [variable]](#spacing-09-variable)
  - [spacing-03 [variable]](#spacing-03-variable)
  - [text-02 [variable]](#text-02-variable)
  - [spacing-02 [variable]](#spacing-02-variable)
  - [text-01 [variable]](#text-01-variable)
  - [spacing-08 [variable]](#spacing-08-variable)
  - [spacing-07 [variable]](#spacing-07-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [focus [variable]](#focus-variable)
  - [icon-01 [variable]](#icon-01-variable)

## multi-select

### ❌multiselect [mixin]

Multi select styles

<details>
<summary>Source code</summary>

```scss
@mixin multiselect() {
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
    padding-left: carbon--mini-units(7);
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

Inline notification styles

<details>
<summary>Source code</summary>

```scss
@mixin inline-notifications() {
  .#{$prefix}--inline-notification {
    @include reset;

    display: flex;
    position: relative;
    height: auto;
    min-height: rem(48px);
    min-width: rem(288px);
    max-width: rem(288px);
    color: $inverse-01;
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

  .#{$prefix}--inline-notification:not(.#{$prefix}--inline-notification--low-contrast)
    a {
    color: $inverse-link;
  }

  .#{$prefix}--inline-notification a {
    text-decoration: none;
  }

  .#{$prefix}--inline-notification a:hover {
    text-decoration: underline;
  }

  .#{$prefix}--inline-notification a:focus {
    outline: 1px solid $inverse-link;
  }

  .#{$prefix}--inline-notification.#{$prefix}--inline-notification--low-contrast
    a:focus {
    @include focus-outline;
  }

  .#{$prefix}--inline-notification--low-contrast {
    // Stop-gap to ensure color contrast (vs. fixed background color) until we have component-specific theme tokens
    color: map-get($carbon--theme--white, 'text-01');

    &::before {
      content: '';
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      filter: opacity(0.4);
      border-style: solid;
      border-width: 1px 1px 1px 0;
    }
  }

  .#{$prefix}--inline-notification--error {
    @include notification--experimental($inverse-support-01, $inverse-02);
  }

  .#{$prefix}--inline-notification--low-contrast.#{$prefix}--inline-notification--error {
    @include notification--experimental(
      $support-01,
      $notification-error-background-color
    );

    &:before {
      border-color: $support-01;
    }
  }

  .#{$prefix}--inline-notification--success {
    @include notification--experimental($inverse-support-02, $inverse-02);
  }

  .#{$prefix}--inline-notification--low-contrast.#{$prefix}--inline-notification--success {
    @include notification--experimental(
      $support-02,
      $notification-success-background-color
    );

    &:before {
      border-color: $support-02;
    }
  }

  .#{$prefix}--inline-notification--info {
    @include notification--experimental($inverse-support-04, $inverse-02);
  }

  .#{$prefix}--inline-notification--low-contrast.#{$prefix}--inline-notification--info {
    @include notification--experimental(
      $support-04,
      $notification-info-background-color
    );

    &:before {
      border-color: $support-04;
    }
  }

  .#{$prefix}--inline-notification--info .bx--inline-notification__icon {
    display: none;
  }

  .#{$prefix}--inline-notification--warning {
    @include notification--experimental($inverse-support-03, $inverse-02);
  }

  .#{$prefix}--inline-notification--low-contrast.#{$prefix}--inline-notification--warning {
    @include notification--experimental(
      $support-03,
      $notification-warning-background-color
    );

    &:before {
      border-color: $support-03;
    }
  }

  .#{$prefix}--inline-notification--warning
    .#{$prefix}--inline-notification__icon
    path[opacity='0'] {
    fill: $carbon__black-100;
    opacity: 1;
  }

  .#{$prefix}--inline-notification__details {
    display: flex;
    flex-grow: 1;
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
    @include type-style('productive-heading-01');
    margin: 0 $carbon--spacing-02 0 0;
    line-height: rem(24px);
  }

  .#{$prefix}--inline-notification__subtitle {
    @include type-style('body-short-01');
    word-break: break-word;
  }

  .#{$prefix}--inline-notification__action-button.#{$prefix}--btn--ghost {
    height: rem(32px);
    margin: $carbon--spacing-03 0;

    &,
    &:hover,
    &:focus,
    &:active {
      color: $inverse-link;
    }

    &:focus {
      border-color: transparent;
      outline: 2px solid $inverse-focus-ui;
      outline-offset: -2px;
    }

    &:hover {
      background-color: $inverse-hover-ui;
    }
  }

  .#{$prefix}--inline-notification--hide-close-button
    .#{$prefix}--inline-notification__action-button.#{$prefix}--btn--ghost {
    margin-right: $carbon--spacing-03;
  }

  .#{$prefix}--inline-notification__close-button {
    @include focus-outline('reset');
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
      outline: 2px solid $inverse-focus-ui;
      outline-offset: -2px;
    }

    .#{$prefix}--inline-notification__close-icon {
      fill: $inverse-01;
    }
  }

  .#{$prefix}--inline-notification--low-contrast {
    .#{$prefix}--inline-notification__close-button
      .#{$prefix}--inline-notification__close-icon {
      fill: map-get($carbon--theme--white, 'text-01');
    }

    .#{$prefix}--inline-notification__action-button {
      color: $carbon--blue-60;

      &:active {
        color: $carbon--blue-80;
      }

      &:active,
      &:hover {
        background-color: $carbon--white-0;
      }
    }
  }
}
```

</details>

- **Group**: [notification](#notification)
- **Requires**:
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [notification--experimental [mixin]](#notification--experimental-mixin)
  - [prefix [variable]](#prefix-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [inverse-link [variable]](#inverse-link-variable)
  - [inverse-support-01 [variable]](#inverse-support-01-variable)
  - [inverse-02 [variable]](#inverse-02-variable)
  - [support-01 [variable]](#support-01-variable)
  - [inverse-support-02 [variable]](#inverse-support-02-variable)
  - [support-02 [variable]](#support-02-variable)
  - [inverse-support-04 [variable]](#inverse-support-04-variable)
  - [support-04 [variable]](#support-04-variable)
  - [inverse-support-03 [variable]](#inverse-support-03-variable)
  - [support-03 [variable]](#support-03-variable)
  - [carbon--spacing-04 [variable]](#carbon--spacing-04-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [inverse-focus-ui [variable]](#inverse-focus-ui-variable)
  - [inverse-hover-ui [variable]](#inverse-hover-ui-variable)

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
  - [inline-notifications [mixin]](#inline-notifications-mixin)
  - [toast-notifications [mixin]](#toast-notifications-mixin)

### ❌toast-notifications [mixin]

Toast notification styles

<details>
<summary>Source code</summary>

```scss
@mixin toast-notifications() {
  .#{$prefix}--toast-notification {
    @include reset;

    display: flex;
    width: rem(288px);
    height: auto;
    padding-left: $carbon--spacing-05;
    color: $inverse-01;
    margin-top: $carbon--spacing-03;
    margin-bottom: $carbon--spacing-03;
    margin-right: $carbon--spacing-05;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);

    &:first-child {
      margin-top: $carbon--spacing-05;
    }

    @include carbon--breakpoint(max) {
      width: rem(352px);
    }
  }

  .#{$prefix}--toast-notification:not(.#{$prefix}--toast-notification--low-contrast)
    a {
    color: $inverse-link;
  }

  .#{$prefix}--toast-notification a {
    text-decoration: none;
  }

  .#{$prefix}--toast-notification a:hover {
    text-decoration: underline;
  }

  .#{$prefix}--toast-notification a:focus {
    outline: 1px solid $inverse-link;
  }

  .#{$prefix}--toast-notification.#{$prefix}--toast-notification--low-contrast
    a:focus {
    @include focus-outline;
  }

  .#{$prefix}--toast-notification--low-contrast {
    // Stop-gap to ensure color contrast (vs. fixed background color) until we have component-specific theme tokens
    color: map-get($carbon--theme--white, 'text-01');
  }

  .#{$prefix}--toast-notification--error {
    @include notification--experimental($inverse-support-01, $inverse-02);
  }

  .#{$prefix}--toast-notification--low-contrast.#{$prefix}--toast-notification--error {
    @include notification--experimental(
      $support-01,
      $notification-error-background-color
    );
  }

  .#{$prefix}--toast-notification--success {
    @include notification--experimental($inverse-support-02, $inverse-02);
  }

  .#{$prefix}--toast-notification--low-contrast.#{$prefix}--toast-notification--success {
    @include notification--experimental(
      $support-02,
      $notification-success-background-color
    );
  }

  .#{$prefix}--toast-notification--info {
    @include notification--experimental($inverse-support-04, $inverse-02);
  }

  .#{$prefix}--toast-notification--low-contrast.#{$prefix}--toast-notification--info {
    @include notification--experimental(
      $support-04,
      $notification-info-background-color
    );
  }

  .#{$prefix}--toast-notification--warning {
    @include notification--experimental($inverse-support-03, $inverse-02);
  }

  .#{$prefix}--toast-notification--low-contrast.#{$prefix}--toast-notification--warning {
    @include notification--experimental(
      $support-03,
      $notification-warning-background-color
    );
  }

  .#{$prefix}--toast-notification--warning
    .#{$prefix}--toast-notification__icon
    path[opacity='0'] {
    fill: $carbon__black-100;
    opacity: 1;
  }

  .#{$prefix}--toast-notification__icon {
    flex-shrink: 0;
    margin-right: $carbon--spacing-05;
    margin-top: $carbon--spacing-04;
  }

  .#{$prefix}--toast-notification__details {
    margin-right: $carbon--spacing-05;
  }

  .#{$prefix}--toast-notification__close-button {
    @include focus-outline('reset');
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
      outline: 2px solid $inverse-focus-ui;
      outline-offset: -2px;
    }

    .#{$prefix}--toast-notification__close-icon {
      fill: $inverse-01;
    }
  }

  .#{$prefix}--toast-notification--low-contrast
    .#{$prefix}--toast-notification__close-button
    .#{$prefix}--toast-notification__close-icon {
    fill: map-get($carbon--theme--white, 'text-01');
  }

  .#{$prefix}--toast-notification__title {
    @include type-style('productive-heading-01');
    font-weight: 600;
    margin-top: $carbon--spacing-05;
    word-break: break-word;
  }

  .#{$prefix}--toast-notification__subtitle {
    @include type-style('body-short-01');

    color: $inverse-01;
    margin-top: 0;
    margin-bottom: $carbon--spacing-06;
    word-break: break-word;
  }

  .#{$prefix}--toast-notification--low-contrast
    .#{$prefix}--toast-notification__subtitle {
    // Stop-gap to ensure color contrast (vs. fixed background color) until we have component-specific theme tokens
    color: map-get($carbon--theme--white, 'text-01');
  }

  .#{$prefix}--toast-notification__caption {
    @include type-style('body-short-01');

    color: $inverse-01;
    margin-bottom: $carbon--spacing-05;
  }

  .#{$prefix}--toast-notification--low-contrast
    .#{$prefix}--toast-notification__caption {
    // Stop-gap to ensure color contrast (vs. fixed background color) until we have component-specific theme tokens
    color: map-get($carbon--theme--white, 'text-01');
  }
}
```

</details>

- **Group**: [notification](#notification)
- **Requires**:
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [notification--experimental [mixin]](#notification--experimental-mixin)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [inverse-link [variable]](#inverse-link-variable)
  - [inverse-support-01 [variable]](#inverse-support-01-variable)
  - [inverse-02 [variable]](#inverse-02-variable)
  - [support-01 [variable]](#support-01-variable)
  - [inverse-support-02 [variable]](#inverse-support-02-variable)
  - [support-02 [variable]](#support-02-variable)
  - [inverse-support-04 [variable]](#inverse-support-04-variable)
  - [support-04 [variable]](#support-04-variable)
  - [inverse-support-03 [variable]](#inverse-support-03-variable)
  - [support-03 [variable]](#support-03-variable)
  - [carbon--spacing-04 [variable]](#carbon--spacing-04-variable)
  - [inverse-focus-ui [variable]](#inverse-focus-ui-variable)
  - [carbon--spacing-06 [variable]](#carbon--spacing-06-variable)

## number-input

### ❌number-input [mixin]

Number input styles

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
    transition: background-color $duration--fast-01 motion(standard, productive),
      outline $duration--fast-01 motion(standard, productive);

    &:focus {
      @include focus-outline('outline');
    }

    &:disabled ~ .#{$prefix}--number__controls {
      cursor: not-allowed;
      pointer-events: none;
    }

    &:disabled ~ .#{$prefix}--number__controls svg {
      fill: $disabled;
    }

    -moz-appearance: textfield; // Firefox: Hide spinner (up and down buttons)

    &::-ms-clear {
      display: none; // IE: Hide "clear-field" `x` button on input field
    }

    &::-webkit-inner-spin-button {
      appearance: none; // Safari: Hide number spinner
    }
  }

  .#{$prefix}--number input[type='number']:disabled,
  .#{$prefix}--number--readonly input[type='number'] {
    cursor: not-allowed;
    background-color: $disabled-background-color;
    color: $disabled;
  }

  .#{$prefix}--number__input-wrapper {
    display: flex;
    align-items: center;
    position: relative;

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
    // vertically center controls within parent container on IE11
    top: 50%;
    transform: translateY(-50%);
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

  .#{$prefix}--number--readonly .#{$prefix}--number__control-btn {
    display: none;
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
  - [carbon--font-family [function]](#carbon--font-family-function)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [carbon--spacing-07 [variable]](#carbon--spacing-07-variable)
  - [text-01 [variable]](#text-01-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-04 [variable]](#ui-04-variable)
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

Overflow menu styles

<details>
<summary>Source code</summary>

```scss
@mixin overflow-menu() {
  .#{$prefix}--overflow-menu,
  .#{$prefix}--overflow-menu__trigger {
    @include button-reset;
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
      background-color: $hover-selected-ui;
    }
  }

  // Overwrite Icon Tooltip focus styles
  .#{$prefix}--overflow-menu__trigger.#{$prefix}--tooltip--a11y.#{$prefix}--tooltip__trigger:focus {
    @include focus-outline('outline');

    svg {
      outline: none;
    }
  }

  .#{$prefix}--overflow-menu.#{$prefix}--overflow-menu--open,
  .#{$prefix}--overflow-menu.#{$prefix}--overflow-menu--open
    .#{$prefix}--overflow-menu__trigger {
    background-color: $ui-01;
    transition: none;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
  }

  .#{$prefix}--overflow-menu--light.#{$prefix}--overflow-menu--open,
  .#{$prefix}--overflow-menu--light.#{$prefix}--overflow-menu--open
    .#{$prefix}--overflow-menu__trigger {
    background-color: $ui-02;
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

  .#{$prefix}--overflow-menu-options--light {
    background-color: $ui-02;
    &::after {
      background-color: $ui-02;
    }
  }

  .#{$prefix}--overflow-menu-options[data-floating-menu-direction='bottom']::after {
    top: rem(-3px);
    left: 0;
    width: rem(32px);
    height: rem(3px);
  }

  .#{$prefix}--overflow-menu-options[data-floating-menu-direction='top']::after {
    bottom: rem(-8px);
    left: 0;
    width: rem(32px);
    height: rem(8px);
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

  .#{$prefix}--overflow-menu-options__content {
    width: 100%;
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

    svg {
      fill: $text-04;
    }
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
  - [prefix [variable]](#prefix-variable)
  - [hover-selected-ui [variable]](#hover-selected-ui-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [ui-02 [variable]](#ui-02-variable)
  - [icon-01 [variable]](#icon-01-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [text-02 [variable]](#text-02-variable)
  - [text-01 [variable]](#text-01-variable)
  - [icon-02 [variable]](#icon-02-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [text-04 [variable]](#text-04-variable)
  - [support-01 [variable]](#support-01-variable)
  - [disabled-02 [variable]](#disabled-02-variable)

## pagination

### ❌pagination [mixin]

Pagination styles

<details>
<summary>Source code</summary>

```scss
@mixin pagination() {
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

  .#{$prefix}--pagination .#{$prefix}--select-input--inline__wrapper {
    display: flex;
    height: 100%;
  }

  .#{$prefix}--pagination .#{$prefix}--select-input {
    @include type-style('body-short-01');
    width: auto;
    min-width: auto;
    height: 100%;
    padding: 0 2.5rem 0 $spacing-05;
    margin-right: -0.65rem;
    @include carbon--breakpoint('md') {
      padding-right: carbon--mini-units(4.5);
      margin-right: 0;
    }
  }

  .#{$prefix}--pagination .#{$prefix}--select-input:hover {
    background: $hover-ui;
  }

  .#{$prefix}--pagination .#{$prefix}--select__arrow {
    top: 50%;
    transform: translateY(-50%);
    @include carbon--breakpoint('md') {
      right: $carbon--spacing-05;
    }
  }

  .#{$prefix}--pagination
    .#{$prefix}--select__item-count
    .#{$prefix}--select-input {
    border-right: $spacing-4xs solid $ui-03;
  }

  .#{$prefix}--pagination
    .#{$prefix}--select__page-number
    .#{$prefix}--select-input {
    border-left: 1px solid $ui-03;
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
    padding: 0 $carbon--spacing-05;
  }

  .#{$prefix}--pagination__text {
    @include carbon--breakpoint('md') {
      display: inline-block;
    }
  }

  span.#{$prefix}--pagination__text {
    margin-left: $carbon--spacing-05;
    color: $text-02;
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
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [carbon--mini-units [function]](#carbon--mini-units-function)
  - [prefix [variable]](#prefix-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [spacing-05 [variable]](#spacing-05-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [text-02 [variable]](#text-02-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [disabled-02 [variable]](#disabled-02-variable)

## pagination-nav

### ❌pseudo-underline [mixin]

Pseudo underline

<details>
<summary>Source code</summary>

```scss
@mixin pseudo-underline() {
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
```

</details>

- **Group**: [pagination-nav](#pagination-nav)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
- **Used by**:
  - [pagination-nav [mixin]](#pagination-nav-mixin)

### ❌pagination-nav [mixin]

Pagination nav base styles

<details>
<summary>Source code</summary>

```scss
@mixin pagination-nav(
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
    @include type-style('body-short-01');
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
    @include type-style('body-short-01');
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
  - [pseudo-underline [mixin]](#pseudo-underline-mixin)
  - [prefix [variable]](#prefix-variable)

## progress-indicator

### ❌progress-indicator [mixin]

Progress indicator styles

<details>
<summary>Source code</summary>

```scss
@mixin progress-indicator() {
  .#{$prefix}--progress {
    @include reset;
    display: flex;
    list-style: none;
  }

  .#{$prefix}--progress-step {
    position: relative;
    display: inline-flex;
    flex-direction: row;
    min-width: 7rem;
    width: rem(128px);
    overflow: visible;

    .#{$prefix}--tooltip__label {
      display: block;
    }
  }

  .#{$prefix}--progress-line {
    position: absolute;
    left: 0;
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
    @include type-style('body-short-01');
    line-height: 1.45;
    max-width: rem(88px);
    margin: $carbon--spacing-03 0 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: box-shadow $duration--fast-02 motion(standard, productive), color
        $duration--fast-02 motion(standard, productive);

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
    @include type-style('body-long-01');
    min-width: rem(115px);
    width: rem(125px);
    min-height: $carbon--spacing-06;
    margin-left: rem(22px);
    margin-top: rem(40px);
    padding: $carbon--spacing-03 $carbon--spacing-05;
    display: block;
    visibility: hidden;
    color: $inverse-01;
  }

  //multiline tooltip
  .#{$prefix}--progress-step .#{$prefix}--tooltip_multi {
    @include type-style('body-long-01');
    width: rem(150px);
    height: auto;
    color: $inverse-01;
  }

  //OPTIONAL HELPER TEXT STYLING
  .#{$prefix}--progress-optional {
    @include type-style('label-01');
    position: absolute;
    left: 0;
    margin-left: $carbon--spacing-06;
    margin-top: rem(28px);
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
    margin-top: auto;
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
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [link-01 [variable]](#link-01-variable)
  - [carbon--spacing-06 [variable]](#carbon--spacing-06-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [support-01 [variable]](#support-01-variable)

## radio-button

### ❌radio-button [mixin]

Radio button styles

<details>
<summary>Source code</summary>

```scss
@mixin radio-button() {
  .#{$prefix}--radio-button-group {
    display: flex;
    align-items: center;
    margin-top: rem(6px);
  }

  // Remove spacing above collection of radio buttons if label is present
  .#{$prefix}--label + .#{$prefix}--form-item .#{$prefix}--radio-button-group {
    margin-top: 0;
  }

  // vertical radio button
  .#{$prefix}--radio-button-group--vertical {
    flex-direction: column;
    align-items: flex-start;

    &.#{$prefix}--radio-button-group--label-left {
      align-items: flex-end;
    }

    .#{$prefix}--radio-button__label {
      margin-right: 0;
      line-height: carbon--mini-units(2.5);
    }

    .#{$prefix}--radio-button__label:not(:last-of-type) {
      margin-bottom: $carbon--spacing-03;
    }
  }

  .#{$prefix}--radio-button {
    @include hidden;
    visibility: inherit;
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
    border: $radio-border-width solid $icon-01;
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
    border-color: $icon-01;

    &:before {
      content: '';
      display: inline-block;
      position: relative;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: $icon-01;

      // Allow the selected button to be seen in Windows HCM for IE/Edge
      @media screen and (-ms-high-contrast: active) {
        // Utilize a system color variable to accomodate any user HCM theme
        background-color: windowText;
      }
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

  .#{$prefix}--radio-button-group--label-right .#{$prefix}--radio-button__label,
  .#{$prefix}--radio-button-wrapper.#{$prefix}--radio-button-wrapper--label-right
    .#{$prefix}--radio-button__label {
    flex-direction: row;
  }

  .#{$prefix}--radio-button-group--label-left .#{$prefix}--radio-button__label,
  .#{$prefix}--radio-button-wrapper.#{$prefix}--radio-button-wrapper--label-left
    .#{$prefix}--radio-button__label {
    flex-direction: row-reverse;
  }

  .#{$prefix}--radio-button-group--label-left
    .#{$prefix}--radio-button__appearance,
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
  - [carbon--mini-units [function]](#carbon--mini-units-function)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [icon-01 [variable]](#icon-01-variable)
  - [focus [variable]](#focus-variable)

## search

### ❌search [mixin]

Search styles

<details>
<summary>Source code</summary>

```scss
@mixin search() {
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
    transition: background-color $duration--fast-02 motion(standard, productive),
      outline $duration--fast-02 motion(standard, productive);
    border-bottom: 1px solid $ui-04;

    &:focus {
      @include focus-outline('outline');
    }

    &::placeholder {
      color: $text-05;
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

  .#{$prefix}--search--lg .#{$prefix}--search-input {
    @include type-style('body-short-02');
    height: rem(40px);
  }

  .#{$prefix}--search--xl .#{$prefix}--search-input {
    @include type-style('body-short-02');
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
    pointer-events: none;
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
    position: absolute;
    right: 0;

    &::before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: rem(1px);
      height: calc(100% - 2px);
      width: 2px;
      background-color: $field-01;
      transition: background-color $duration--fast-02 motion(standard, productive);
    }

    &:hover {
      border-bottom: 1px solid $ui-04;
    }
  }

  .#{$prefix}--search-button {
    flex-shrink: 0;
    margin-left: $carbon--spacing-01;
    background-color: $field-01;

    svg {
      vertical-align: middle;
      fill: currentColor;
    }
  }

  .#{$prefix}--search-close,
  .#{$prefix}--search-button {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity $duration--fast-02 motion(standard, productive), background-color
        $duration--fast-02 motion(standard, productive),
      outline $duration--fast-02 motion(standard, productive), border
        $duration--fast-02 motion(standard, productive);
    cursor: pointer;
    visibility: visible;
    opacity: 1;
    height: rem(40px);
    width: rem(40px);
    fill: $icon-01;
    border-style: solid;
    border-color: transparent;
    border-width: 1px 0;

    &:hover {
      background-color: $hover-field;
    }

    &:focus {
      @include focus-outline('outline');
    }

    &:active {
      @include focus-outline('outline');
      background-color: $selected-ui;
    }
  }

  .#{$prefix}--search-close:hover {
    &::before {
      background-color: $hover-field;
    }
  }

  .#{$prefix}--search-close:focus,
  .#{$prefix}--search-close:active {
    &::before {
      background-color: $focus;
    }
  }

  .#{$prefix}--search-input:focus ~ .#{$prefix}--search-close:hover {
    @include focus-outline('outline');
  }

  .#{$prefix}--search--sm {
    .#{$prefix}--search-close,
    ~ .#{$prefix}--search-button {
      height: rem(32px);
      width: rem(32px);
    }
  }

  .#{$prefix}--search--lg {
    .#{$prefix}--search-close,
    ~ .#{$prefix}--search-button {
      height: rem(40px);
      width: rem(40px);
    }
  }

  .#{$prefix}--search--xl {
    .#{$prefix}--search-close,
    ~ .#{$prefix}--search-button {
      height: rem(48px);
      width: rem(48px);
    }
  }

  .#{$prefix}--search-close--hidden {
    visibility: hidden;
    opacity: 0;
  }

  .#{$prefix}--search--xl.#{$prefix}--skeleton .#{$prefix}--search-input,
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
  - [prefix [variable]](#prefix-variable)
  - [field-01 [variable]](#field-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [carbon--spacing-08 [variable]](#carbon--spacing-08-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [text-05 [variable]](#text-05-variable)
  - [field-02 [variable]](#field-02-variable)
  - [text-02 [variable]](#text-02-variable)
  - [carbon--spacing-01 [variable]](#carbon--spacing-01-variable)
  - [icon-01 [variable]](#icon-01-variable)
  - [hover-field [variable]](#hover-field-variable)
  - [selected-ui [variable]](#selected-ui-variable)
  - [focus [variable]](#focus-variable)

## select

### ❌select [mixin]

Select styles

<details>
<summary>Source code</summary>

```scss
@mixin select() {
  .#{$prefix}--select {
    @include reset;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .#{$prefix}--select-input__wrapper {
    position: relative;
    display: flex;
    align-items: center;
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
    padding: 0 $spacing-09 0 $spacing-05;
    color: $text-01;
    background-color: $field-01;
    border: none;
    border-bottom: 1px solid $ui-04;
    border-radius: 0;
    cursor: pointer;

    // Do not transition on background-color (see: https://github.com/carbon-design-system/carbon/issues/4464)
    transition: outline $duration--fast-01 motion(standard, productive);

    &:hover {
      background-color: $hover-ui;
    }

    // Hide default select arrow in IE10+
    &::-ms-expand {
      display: none;
    }

    // Select text renders a little high on Firefox
    @-moz-document url-prefix() {
      // Removes dotted inner focus
      &:-moz-focusring,
      &::-moz-focus-inner {
        color: transparent;
        text-shadow: 0 0 0 #000;
        background-image: none;
      }
    }

    &:focus {
      @include focus-outline('outline');
      color: $text-01;
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
    padding-right: carbon--mini-units(10);
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
    right: $spacing-05;
    pointer-events: none;
  }

  .#{$prefix}--select-input__wrapper[data-invalid]
    .#{$prefix}--select-input
    ~ .#{$prefix}--select__invalid-icon {
    position: absolute;
    right: $spacing-09;
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
    margin-top: rem(13px); // offset label text margin
    align-self: flex-start;
  }

  .#{$prefix}--select--inline .#{$prefix}--form__helper-text {
    margin-bottom: 0;
    margin-left: $spacing-03;
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
    padding-right: $spacing-07;
  }

  .#{$prefix}--select--inline .#{$prefix}--select-input[disabled],
  .#{$prefix}--select--inline .#{$prefix}--select-input[disabled]:hover {
    background-color: $disabled-background-color;
  }

  .#{$prefix}--select--inline .#{$prefix}--select__arrow {
    right: $carbon--spacing-03;
  }

  .#{$prefix}--select--inline.#{$prefix}--select--invalid
    .#{$prefix}--select-input {
    padding-right: $spacing-09 + $spacing-03; // 3.5rem
  }

  .#{$prefix}--select--inline.#{$prefix}--select--invalid
    .#{$prefix}--select-input
    ~ .#{$prefix}--select__invalid-icon {
    right: $spacing-07;
  }

  .#{$prefix}--select--inline .#{$prefix}--select-input:disabled {
    color: $disabled;
    cursor: not-allowed;

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
  - [carbon--mini-units [function]](#carbon--mini-units-function)
  - [prefix [variable]](#prefix-variable)
  - [spacing-09 [variable]](#spacing-09-variable)
  - [spacing-05 [variable]](#spacing-05-variable)
  - [text-01 [variable]](#text-01-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [support-01 [variable]](#support-01-variable)
  - [field-02 [variable]](#field-02-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [spacing-03 [variable]](#spacing-03-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [spacing-07 [variable]](#spacing-07-variable)

## slider

### ❌slider [mixin]

Slider styles

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
    transition: background $duration--fast-02 motion(standard, productive);
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
    transition: transform $duration--fast-02 motion(standard, productive), background
        $duration--fast-02 motion(standard, productive),
      box-shadow $duration--fast-02 motion(standard, productive);
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
      box-shadow: inset 0 0 0 2px $interactive-04, inset 0 0 0 3px $ui-01;
      background-color: $interactive-04;
    }

    &:active {
      transform: translate(-50%, -50%) scale(1.4285714286);
      box-shadow: inset 0 0 0 2px $interactive-04;
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
    background-color: $interactive-04;
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
    cursor: not-allowed;
    border: none;

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
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [interactive-04 [variable]](#interactive-04-variable)
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

### ❌padding-th [mixin]

Used only for normal structured-list

<details>
<summary>Source code</summary>

```scss
@mixin padding-th($padding: $structured-list-padding) {
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

### ❌padding-td [mixin]

Used only for normal structured-list

<details>
<summary>Source code</summary>

```scss
@mixin padding-td($padding: $structured-list-padding) {
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

## tabs

### ❌tabs [mixin]

Tabs styles

<details>
<summary>Source code</summary>

```scss
@mixin tabs() {
  .#{$prefix}--tabs {
    @include reset;
    @include type-style('body-short-01');
    color: $text-01;
    height: auto;
    width: 100%;
    position: relative;
    @include carbon--breakpoint(md) {
      background: none;
      min-height: rem(40px);
    }
  }

  .#{$prefix}--tabs--container {
    @include carbon--breakpoint(md) {
      min-height: rem(48px);
    }
  }

  .#{$prefix}--tabs-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $spacing-05;
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
    transition: transform $duration--fast-01 motion(standard, productive);
  }

  .#{$prefix}--tabs-trigger--open:focus,
  .#{$prefix}--tabs-trigger--open:active {
    @include focus-outline('reset');
    transition: outline $duration--fast-01 motion(standard, productive);
  }

  .#{$prefix}--tabs-trigger--open {
    background: $ui-03;
  }

  .#{$prefix}--tabs-trigger--open svg {
    @include rotate(-180deg, $duration--fast-01, 50% 45%);
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
    transition: max-height $duration--fast-01 motion(standard, productive);
    max-height: 600px;
    width: 100%;

    @include carbon--breakpoint(md) {
      flex-direction: row;
      background: none;
      box-shadow: none;
      z-index: auto;
      transition: inherit;
      width: auto;
    }
  }

  .#{$prefix}--tabs__nav--hidden {
    transition: max-height $duration--fast-01 motion(standard, productive);
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
    @include reset;
    background-color: $ui-01;
    display: flex;
    padding: 0;
    cursor: pointer;
    width: 100%;
    height: rem(40px);
    transition: background-color $duration--fast-01 motion(standard, productive);

    @include carbon--breakpoint(md) {
      background: transparent;
      height: auto;
      & + .#{$prefix}--tabs__nav-item {
        margin-left: rem(2px);
      }
    }
  }

  .#{$prefix}--tabs--container .#{$prefix}--tabs__nav-item {
    @include carbon--breakpoint(md) {
      background-color: $ui-03;

      & + .#{$prefix}--tabs__nav-item {
        margin-left: 0;
        // Draws the border without affecting the inner-content
        box-shadow: -1px 0 0 0 $ui-04;
      }

      & + .#{$prefix}--tabs__nav-item.#{$prefix}--tabs__nav-item--selected,
      &.#{$prefix}--tabs__nav-item--selected + .#{$prefix}--tabs__nav-item {
        box-shadow: none;
      }
    }
  }

  .#{$prefix}--tabs__nav-item .#{$prefix}--tabs__nav-link {
    transition: color $duration--fast-01 motion(standard, productive), border-bottom-color
        $duration--fast-01 motion(standard, productive),
      outline $duration--fast-01 motion(standard, productive);
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

      &,
      & + .#{$prefix}--tabs__nav-item {
        box-shadow: none;
      }
    }
  }

  .#{$prefix}--tabs--container
    .#{$prefix}--tabs__nav-item:hover:not(.#{$prefix}--tabs__nav-item--disabled) {
    @include carbon--breakpoint(md) {
      background-color: $hover-selected-ui;
    }
  }

  //---------------------------------------------
  // Item Disabled
  //---------------------------------------------
  .#{$prefix}--tabs__nav-item--disabled,
  .#{$prefix}--tabs__nav-item--disabled:hover {
    cursor: not-allowed;
    outline: none;
  }

  .#{$prefix}--tabs__nav-item--disabled .#{$prefix}--tabs__nav-link {
    pointer-events: none;
  }

  .#{$prefix}--tabs--container
    .#{$prefix}--tabs__nav-item.#{$prefix}--tabs__nav-item--disabled,
  .#{$prefix}--tabs--container
    .#{$prefix}--tabs__nav-item.#{$prefix}--tabs__nav-item--disabled:hover {
    @include carbon--breakpoint(md) {
      background-color: $disabled-02;
    }
  }

  .#{$prefix}--tabs--container
    .#{$prefix}--tabs__nav-item--disabled
    .#{$prefix}--tabs__nav-link {
    @include carbon--breakpoint(md) {
      color: $disabled-03;
    }
  }

  //-----------------------------
  // Item Selected
  //-----------------------------
  .#{$prefix}--tabs__nav-item--selected:not(.#{$prefix}--tabs__nav-item--disabled) {
    border: none;
    display: none;
    transition: color $duration--fast-01 motion(standard, productive);

    @include carbon--breakpoint(md) {
      display: flex;
      .#{$prefix}--tabs__nav-link {
        color: $text-01;
        @include type-style('productive-heading-01');
        border-bottom: 3px solid $interactive-01;
      }

      .#{$prefix}--tabs__nav-link:focus,
      .#{$prefix}--tabs__nav-link:active {
        color: $text-01;
        border-bottom: 2px solid $interactive-01;
      }
    }
  }

  .#{$prefix}--tabs--container
    .#{$prefix}--tabs__nav-item--selected:not(.#{$prefix}--tabs__nav-item--disabled),
  .#{$prefix}--tabs--container
    .#{$prefix}--tabs__nav-item--selected:hover:not(.#{$prefix}--tabs__nav-item--disabled) {
    @include carbon--breakpoint(md) {
      background-color: $ui-01;

      .#{$prefix}--tabs__nav-link {
        // Draws the border without affecting the inner-content
        box-shadow: inset 0 2px 0 0 $interactive-04;
        border-bottom: none;
      }

      .#{$prefix}--tabs__nav-link:focus,
      .#{$prefix}--tabs__nav-link:active {
        box-shadow: none;
      }
    }
  }

  //-----------------------------
  // Link
  //-----------------------------
  a.#{$prefix}--tabs__nav-link {
    @include focus-outline('reset');
    display: inline-block;
    color: $text-02;
    text-decoration: none;
    font-weight: 400;
    padding: $spacing-04 0;
    width: calc(100% - 32px);
    height: rem(40px);
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0 $spacing-05;
    line-height: rem(16px);
    border-bottom: 1px solid $ui-03;
    overflow: hidden;
    transition: border $duration--fast-01 motion(standard, productive), outline
        $duration--fast-01 motion(standard, productive);

    &:focus,
    &:active {
      width: 100%;
      margin: 0;
      padding-left: 16px;
      @include focus-outline('outline');
    }

    @include carbon--breakpoint(md) {
      border-bottom: $tab-underline-color;
      padding: $spacing-03 $spacing-05;
      width: rem(160px);
      margin: 0;
      line-height: inherit;

      &:focus,
      &:active {
        width: rem(160px);
        padding: $spacing-03 $spacing-05;
        border-bottom: 2px;
      }
    }
  }

  .#{$prefix}--tabs--container a.#{$prefix}--tabs__nav-link {
    @include carbon--breakpoint(md) {
      display: flex;
      align-items: center;
      height: rem(48px);
      border-bottom: none;
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

  .#{$prefix}--tabs--container
    .#{$prefix}--tabs__nav-item:hover:not(.#{$prefix}--tabs__nav-item--selected):not(.#{$prefix}--tabs__nav-item--disabled)
    .#{$prefix}--tabs__nav-link {
    @include carbon--breakpoint(md) {
      border-bottom: none;
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

  .#{$prefix}--tabs--container
    .#{$prefix}--tabs__nav-item--disabled
    .#{$prefix}--tabs__nav-link {
    @include carbon--breakpoint(md) {
      border-bottom: none;
    }
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
  //  Tab Content Container
  //-----------------------------
  .#{$prefix}--tab-content {
    padding: $carbon--spacing-05;
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
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [prefix [variable]](#prefix-variable)
  - [text-01 [variable]](#text-01-variable)
  - [spacing-05 [variable]](#spacing-05-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [field-01 [variable]](#field-01-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [field-02 [variable]](#field-02-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [hover-selected-ui [variable]](#hover-selected-ui-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [disabled-03 [variable]](#disabled-03-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [interactive-04 [variable]](#interactive-04-variable)
  - [text-02 [variable]](#text-02-variable)
  - [spacing-04 [variable]](#spacing-04-variable)
  - [spacing-03 [variable]](#spacing-03-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)

## tag

### ❌tag-theme [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin tag-theme() {
  background-color: $bg-color;
  color: $text-color;
}
```

</details>

- **Group**: [tag](#tag)
- **Used by**:
  - [tags [mixin]](#tags-mixin)

### ❌tags [mixin]

Tag styles

<details>
<summary>Source code</summary>

```scss
@mixin tags() {
  .#{$prefix}--tag {
    @include type-style('label-01');

    display: inline-flex;
    align-items: center;
    padding: 0 $carbon--spacing-03;
    height: 1.5rem;
    max-width: 100%; // restricts size of contained elements
    margin: $carbon--spacing-02;
    border-radius: rem(15px);

    &:not(:first-child) {
      margin-left: 0;
    }

    &.#{$prefix}--skeleton {
      @include tag-theme($bg-color: $ui-03, $text-color: $text-01);
    }
  }

  .#{$prefix}--tag--red {
    @include tag-theme($ibm-color__red-20, $ibm-color__red-70);
  }

  .#{$prefix}--tag--magenta {
    @include tag-theme($ibm-color__magenta-20, $ibm-color__magenta-70);
  }

  .#{$prefix}--tag--purple {
    @include tag-theme($ibm-color__purple-20, $ibm-color__purple-70);
  }

  .#{$prefix}--tag--blue {
    @include tag-theme($ibm-color__blue-20, $ibm-color__blue-70);
  }

  .#{$prefix}--tag--cyan {
    @include tag-theme($ibm-color__cyan-20, $ibm-color__cyan-70);
  }

  .#{$prefix}--tag--teal {
    @include tag-theme($ibm-color__teal-20, $ibm-color__teal-70);
  }

  .#{$prefix}--tag--green {
    @include tag-theme($ibm-color__green-20, $ibm-color__green-70);
  }

  .#{$prefix}--tag--gray {
    @include tag-theme($ibm-color__gray-20, $ibm-color__gray-100);
  }

  .#{$prefix}--tag--cool-gray {
    @include tag-theme($ibm-color__cool-gray-20, $ibm-color__cool-gray-100);
  }

  .#{$prefix}--tag--warm-gray {
    @include tag-theme($ibm-color__warm-gray-20, $ibm-color__warm-gray-100);
  }

  .#{$prefix}--tag--disabled {
    @include tag-theme($ibm-color__gray-10, $ibm-color__gray-30);

    &:hover {
      cursor: not-allowed;
    }
  }

  .#{$prefix}--tag__label {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  // tags used for filtering
  .#{$prefix}--tag--filter {
    @include tag-theme($inverse-02, $inverse-01);

    cursor: pointer;
    padding-right: rem(2px);
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
    background-color: $inverse-hover-ui;
  }

  .#{$prefix}--tag--filter:focus,
  .#{$prefix}--tag--filter:hover {
    outline: none;
  }

  .#{$prefix}--tag--filter:focus > svg {
    box-shadow: inset 0 0 0 2px $inverse-focus-ui;
    border-radius: 50%;
  }

  // Skeleton state
  .#{$prefix}--tag.#{$prefix}--skeleton {
    @include skeleton;

    width: rem(60px);
    overflow: hidden;
  }
}
```

</details>

- **Group**: [tag](#tag)
- **Requires**:
  - [tag-theme [mixin]](#tag-theme-mixin)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [ui-03 [variable]](#ui-03-variable)
  - [text-01 [variable]](#text-01-variable)
  - [inverse-02 [variable]](#inverse-02-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [inverse-hover-ui [variable]](#inverse-hover-ui-variable)
  - [inverse-focus-ui [variable]](#inverse-focus-ui-variable)

## text-area

### ❌text-area [mixin]

Text area styles

<details>
<summary>Source code</summary>

```scss
@mixin text-area() {
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
    transition: background-color $duration--fast-01 motion(standard, productive),
      outline $duration--fast-01 motion(standard, productive);

    & ~ .#{$prefix}--form__helper-text {
      margin-top: 0;
      order: 2;
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
  - [prefix [variable]](#prefix-variable)
  - [field-01 [variable]](#field-01-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [support-01 [variable]](#support-01-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [field-02 [variable]](#field-02-variable)
  - [carbon--spacing-08 [variable]](#carbon--spacing-08-variable)
  - [carbon--spacing-04 [variable]](#carbon--spacing-04-variable)
  - [disabled-02 [variable]](#disabled-02-variable)

## text-input

### ❌text-input [mixin]

Text input styles

<details>
<summary>Source code</summary>

```scss
@mixin text-input() {
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
    transition: background-color $duration--fast-01 motion(standard, productive),
      outline $duration--fast-01 motion(standard, productive);

    &:focus,
    &:active {
      @include focus-outline('outline');
    }

    &-wrapper svg[hidden] {
      display: none;
    }
  }

  .#{$prefix}--password-input {
    padding-right: $carbon--spacing-08;
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
    width: 100%;

    .#{$prefix}--text-input__invalid-icon {
      position: absolute;
      right: $carbon--spacing-05;
      fill: $support-01;
    }

    // TODO: deprecate this style block
    .#{$prefix}--text-input--password__visibility {
      @include tooltip--trigger('icon', 'bottom');
      @include tooltip--placement('icon', 'bottom', 'center');
    }

    .#{$prefix}--text-input--password__visibility,
    // TODO: remove selector above
    .#{$prefix}--text-input--password__visibility__toggle.#{$prefix}--tooltip__trigger {
      position: absolute;
      height: rem(16px);
      width: rem(16px);
      right: $carbon--spacing-05;
      padding: 0;
      border: 0;
      background: none;
      cursor: pointer;

      svg {
        fill: $icon-02;
      }
    }

    .#{$prefix}--text-input--invalid {
      padding-right: $carbon--spacing-08;
    }

    .#{$prefix}--text-input--invalid.#{$prefix}--password-input {
      padding-right: rem(64px);
    }

    .#{$prefix}--text-input--invalid
      + .#{$prefix}--text-input--password__visibility,
    // TODO: remove selector above
    .#{$prefix}--text-input--invalid
      + .#{$prefix}--text-input--password__visibility__toggle {
      right: $carbon--spacing-05;
    }
  }

  .#{$prefix}--password-input-wrapper .#{$prefix}--text-input__invalid-icon {
    right: $carbon--spacing-08;
  }

  .#{$prefix}--text-input:disabled
    + .#{$prefix}--text-input--password__visibility
    svg,
  // TODO: remove selector above
  .#{$prefix}--text-input:disabled
    + .#{$prefix}--text-input--password__visibility__toggle
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

    .#{$prefix}--text-input--password__visibility,
    // TODO: remove selector above
    .#{$prefix}--text-input--password__visibility__toggle {
      right: $carbon--spacing-08;
    }
  }
}
```

</details>

- **Group**: [text-input](#text-input)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
  - [field-01 [variable]](#field-01-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [text-01 [variable]](#text-01-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [carbon--spacing-08 [variable]](#carbon--spacing-08-variable)
  - [field-02 [variable]](#field-02-variable)
  - [support-01 [variable]](#support-01-variable)
  - [icon-02 [variable]](#icon-02-variable)
  - [disabled-01 [variable]](#disabled-01-variable)
  - [disabled-02 [variable]](#disabled-02-variable)

## tile

### ❌tile [mixin]

Tile styles

<details>
<summary>Source code</summary>

```scss
@mixin tile() {
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

  .#{$prefix}--tile--light {
    background-color: $ui-02;
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
    transition: max-height $duration--moderate-01 motion(standard, productive);
  }

  .#{$prefix}--tile-content__above-the-fold {
    display: block;
  }

  .#{$prefix}--tile-content__below-the-fold {
    display: block;
    visibility: hidden;
    opacity: 0;
    transition: opacity $duration--fast-02 motion(standard, productive), visibility
        $duration--fast-02 motion(standard, productive);
  }

  .#{$prefix}--tile--is-expanded {
    overflow: visible;
    transition: max-height $duration--fast-02 motion(standard, productive);

    .#{$prefix}--tile__chevron svg {
      transform: rotate(-180deg);
    }

    .#{$prefix}--tile-content__below-the-fold {
      visibility: visible;
      opacity: 1;
      transition: opacity $duration--fast-02 motion(standard, productive), visibility
          $duration--fast-02 motion(standard, productive);
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
  - [prefix [variable]](#prefix-variable)
  - [ui-01 [variable]](#ui-01-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [ui-02 [variable]](#ui-02-variable)
  - [hover-ui [variable]](#hover-ui-variable)
  - [carbon--spacing-09 [variable]](#carbon--spacing-09-variable)
  - [icon-02 [variable]](#icon-02-variable)
  - [ui-05 [variable]](#ui-05-variable)
  - [interactive-02 [variable]](#interactive-02-variable)

## time-picker

### ❌time-picker [mixin]

Time picker styles

<details>
<summary>Source code</summary>

```scss
@mixin time-picker() {
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
    transition: outline $duration--fast-01 motion(standard, productive), background-color
        $duration--fast-01 motion(standard, productive);

    &::placeholder {
      color: $text-05;
    }
  }
}
```

</details>

- **Group**: [time-picker](#time-picker)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-01 [variable]](#carbon--spacing-01-variable)
  - [text-05 [variable]](#text-05-variable)

## toggle

### ❌toggle [mixin]

Toggle styles

<details>
<summary>Source code</summary>

```scss
@mixin toggle() {
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
    width: carbon--rem(48px);
    height: carbon--rem(24px);

    // Toggle background oval
    &:before {
      position: absolute;
      display: block;
      content: '';
      background-color: $ui-04;
      cursor: pointer;
      box-sizing: border-box;
      height: carbon--rem(24px);
      width: carbon--rem(48px);
      border-radius: carbon--rem(15px);
      top: 0;
      will-change: box-shadow;
      // Corresponds to the double-border for focused state (`0 0 0 1px $ui-02, 0 0 0 3px $focus`)
      box-shadow: 0 0 0 1px transparent, 0 0 0 3px transparent;
      transition: box-shadow $duration--fast-01 motion(exit, productive), background-color
          $duration--fast-01 motion(exit, productive);
    }

    // Toggle circle
    &:after {
      box-sizing: border-box;
      position: absolute;
      display: block;
      cursor: pointer;
      left: carbon--rem(3px);
      top: carbon--rem(3px);
      width: carbon--rem(18px);
      height: carbon--rem(18px);
      background-color: $icon-03;
      border-radius: 50%;
      content: '';
      transition: transform $duration--fast-01 motion(exit, productive);
    }
  }

  .#{$prefix}--toggle__check {
    fill: $icon-03;
    position: absolute;
    left: carbon--rem(6px);
    top: carbon--rem(6px);
    width: carbon--rem(6px);
    height: carbon--rem(5px);
    z-index: 1;
    transition: $duration--fast-01 motion(exit, productive);
    transform: scale(0.2);
  }

  .#{$prefix}--toggle__text--left,
  .#{$prefix}--toggle__text--right {
    @include type-style('body-short-01');
    position: relative;
    margin-left: $carbon--spacing-03;
  }

  .#{$prefix}--toggle__text--left {
    position: absolute;
    left: carbon--rem(48px);
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
      transform: translateX(carbon--rem(24px));
    }
  }

  //----------------------------------------------
  // Focus
  // ---------------------------------------------
  .#{$prefix}--toggle + .#{$prefix}--toggle__label,
  .#{$prefix}--toggle + .#{$prefix}--toggle__label {
    .#{$prefix}--toggle__appearance:before {
      // Corresponds to the double-border for focused state (`0 0 0 1px $ui-02, 0 0 0 3px $focus`)
      box-shadow: 0 0 0 1px transparent, 0 0 0 3px transparent;
    }
  }
  .#{$prefix}--toggle:focus + .#{$prefix}--toggle__label,
  .#{$prefix}--toggle:active + .#{$prefix}--toggle__label {
    .#{$prefix}--toggle__appearance:before {
      box-shadow: 0 0 0 1px $ui-02, 0 0 0 3px $focus;
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

  //----------------------------------------------
  // Small toggle
  // ---------------------------------------------

  .#{$prefix}--toggle--small
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__appearance {
    width: carbon--rem(32px);
    height: carbon--rem(16px);

    &:before {
      box-sizing: border-box;
      height: carbon--rem(16px);
      width: carbon--rem(32px);
      border-radius: 0.9375rem;
      top: 0;
    }

    &:after {
      width: carbon--rem(10px);
      height: carbon--rem(10px);
      top: carbon--rem(3px);
      left: carbon--rem(3px);
    }
  }

  .#{$prefix}--toggle--small:checked
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__check {
    fill: $support-02;
    transform: scale(1) translateX(carbon--rem(16px));
  }

  .#{$prefix}--toggle--small
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__text--left {
    left: carbon--rem(32px);
  }

  .#{$prefix}--toggle--small:checked
    + .#{$prefix}--toggle__label
    .#{$prefix}--toggle__appearance {
    &:after {
      margin-left: 0px;
      transform: translateX(carbon--rem(17px));
    }
  }

  // -----------------------------------------------------
  // new accessible toggle
  // TODO: deprecate styles above this line
  // -----------------------------------------------------

  .#{$prefix}--toggle-input {
    @include hidden;

    &:focus {
      outline: none;
    }
  }

  .#{$prefix}--toggle-input__label {
    @include type-style('label-01');
    color: $text-02;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
  }

  .#{$prefix}--toggle__switch {
    position: relative;
    display: flex;
    align-items: center;
    width: carbon--rem(48px);
    height: carbon--rem(24px);
    margin: $carbon--spacing-03 0;
    cursor: pointer;

    // Toggle background oval
    &::before {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      display: block;
      width: carbon--rem(48px);
      height: carbon--rem(24px);
      border-radius: carbon--rem(15px);
      content: '';
      background-color: $ui-04;
      will-change: box-shadow;
      // Corresponds to the double-border for focused state (`0 0 0 1px $ui-02, 0 0 0 3px $focus`)
      box-shadow: 0 0 0 1px transparent, 0 0 0 3px transparent;
      transition: box-shadow $duration--fast-01 motion(exit, productive), background-color
          $duration--fast-01 motion(exit, productive);
    }

    // Toggle circle
    &::after {
      box-sizing: border-box;
      position: absolute;
      top: carbon--rem(3px);
      left: carbon--rem(3px);
      display: block;
      width: carbon--rem(18px);
      height: carbon--rem(18px);
      border-radius: 50%;
      background-color: $icon-03;
      content: '';
      transition: transform $duration--fast-01 motion(exit, productive);
    }
  }

  .#{$prefix}--toggle__text--off,
  .#{$prefix}--toggle__text--on {
    position: absolute;
    margin-left: carbon--rem(56px);
    @include type-style('body-short-01');
    user-select: none;
    // top offset needed to vertically center absolutely positioned flex child in IE11
    top: 50%;
    transform: translateY(-50%);
  }

  //----------------------------------------------
  // Checked
  // ---------------------------------------------
  .#{$prefix}--toggle-input:checked
    + .#{$prefix}--toggle-input__label
    > .#{$prefix}--toggle__switch
    > .#{$prefix}--toggle__text--off,
  .#{$prefix}--toggle-input:not(:checked)
    + .#{$prefix}--toggle-input__label
    > .#{$prefix}--toggle__switch
    > .#{$prefix}--toggle__text--on {
    visibility: hidden;
  }

  .#{$prefix}--toggle-input:checked
    + .#{$prefix}--toggle-input__label
    > .#{$prefix}--toggle__switch {
    &::before {
      background-color: $support-02;
    }

    &::after {
      background-color: $icon-03;
      transform: translateX(carbon--rem(24px));
    }
  }

  //----------------------------------------------
  // Focus and active
  // ---------------------------------------------
  .#{$prefix}--toggle-input:focus
    + .#{$prefix}--toggle-input__label
    > .#{$prefix}--toggle__switch::before,
  .#{$prefix}--toggle-input:active
    + .#{$prefix}--toggle-input__label
    > .#{$prefix}--toggle__switch::before {
    box-shadow: 0 0 0 1px $ui-02, 0 0 0 3px $focus;
  }

  //----------------------------------------------
  // Disabled
  // ---------------------------------------------
  .#{$prefix}--toggle-input:disabled + .#{$prefix}--toggle-input__label {
    cursor: not-allowed;
  }

  .#{$prefix}--toggle-input:disabled
    + .#{$prefix}--toggle-input__label
    > .#{$prefix}--toggle__switch {
    cursor: not-allowed;

    &::before {
      background-color: $disabled-01;
    }

    &::after {
      background-color: $disabled-02;
    }

    &::before,
    &::after {
      cursor: not-allowed;
      transition: $duration--fast-01 motion(exit, productive);
    }
  }

  .#{$prefix}--toggle-input:disabled + .#{$prefix}--toggle-input__label {
    color: $disabled;
  }

  .#{$prefix}--toggle-input:disabled:active
    + .#{$prefix}--toggle-input__label
    > .#{$prefix}--toggle__switch::before {
    box-shadow: none;
  }

  //----------------------------------------------
  // Small toggle
  // ---------------------------------------------
  .#{$prefix}--toggle-input--small + .#{$prefix}--toggle-input__label {
    > .#{$prefix}--toggle__switch {
      width: carbon--rem(32px);
      height: carbon--rem(16px);

      &::before {
        width: carbon--rem(32px);
        height: carbon--rem(16px);
        border-radius: 0.9375rem;
      }

      &::after {
        width: carbon--rem(10px);
        height: carbon--rem(10px);
      }
    }

    .#{$prefix}--toggle__text--off,
    .#{$prefix}--toggle__text--on {
      margin-left: carbon--rem(40px);
    }
  }

  .#{$prefix}--toggle-input--small:checked + .#{$prefix}--toggle-input__label {
    > .#{$prefix}--toggle__switch::after {
      transform: translateX(carbon--rem(17px));
    }

    .#{$prefix}--toggle__check {
      fill: $support-02;
      transform: scale(1) translateX(carbon--rem(16px));
    }
  }

  .#{$prefix}--toggle-input--small:disabled:checked
    + .#{$prefix}--toggle-input__label
    .#{$prefix}--toggle__check {
    fill: $disabled-02;
  }

  //----------------------------------------------
  // Skeleton
  // ---------------------------------------------

  .#{$prefix}--toggle__label.#{$prefix}--skeleton {
    flex-direction: column;
    align-items: flex-start;

    .#{$prefix}--toggle__label-text {
      margin-bottom: $carbon--spacing-03;
    }
  }
}
```

</details>

- **Group**: [toggle](#toggle)
- **Requires**:
  - [carbon--rem [function]](#carbon--rem-function)
  - [prefix [variable]](#prefix-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [ui-04 [variable]](#ui-04-variable)
  - [ui-02 [variable]](#ui-02-variable)
  - [focus [variable]](#focus-variable)
  - [icon-03 [variable]](#icon-03-variable)
  - [support-02 [variable]](#support-02-variable)
  - [disabled-01 [variable]](#disabled-01-variable)
  - [disabled-02 [variable]](#disabled-02-variable)
  - [text-02 [variable]](#text-02-variable)

## toolbar

### ❌toolbar [mixin]

Toolbar styles

<details>
<summary>Source code</summary>

```scss
@mixin toolbar() {
  .#{$prefix}--toolbar {
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
    @include type-style('caption-01');
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

  .#{$prefix}--toolbar-search:not(.#{$prefix}--toolbar-search--active)
    .#{$prefix}--search-input {
    border-bottom: none;
  }
}
```

</details>

- **Group**: [toolbar](#toolbar)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
  - [text-02 [variable]](#text-02-variable)
  - [field-02 [variable]](#field-02-variable)
  - [brand-01 [variable]](#brand-01-variable)
  - [ui-03 [variable]](#ui-03-variable)

## tooltip

### ❌⚠️tooltip--icon [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin tooltip--icon() {
  @include reset;
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  overflow: visible;

  // Tooltip - renders as a combo of ::before and ::after elements
  &::before,
  &::after {
    @include type-style('body-short-01');
    position: absolute;
    display: flex;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity $duration--fast-01 motion(standard, productive);
  }

  &::before {
    right: 0;
    left: 0;
    width: 0;
    height: 0;
    border-width: 0 rem(4px) rem(5px) rem(4px);
    border-style: solid;
    border-color: transparent transparent $inverse-02 transparent;
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
    background-color: $inverse-02;
  }

  &:hover,
  &:focus {
    &::before,
    &::after {
      opacity: 1;
    }
  }
}
```

</details>

- **Group**: [tooltip](#tooltip)
- **Requires**:
  - [inverse-02 [variable]](#inverse-02-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
- **Used by**:
  - [tooltip--icon--legacy [mixin]](#tooltip--icon--legacy-mixin)
- **Deprecated**: This may not be available in future releases

### ❌⚠️tooltip--icon-placement [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin tooltip--icon-placement($position: 'bottom', $align: 'center') {
  $translate-x: if($align == 'center', -50%, 0);
  $translate-y-caret: if($position == 'top', calc(-100% - 9px), 10px);
  $translate-y-body: if(
    $position == 'top',
    calc(-100% - 12px),
    calc(100% + 10px)
  );
  $rotate-caret: if($position == 'top', 180deg, 0);

  &::before {
    @if ($position == 'top') {
      top: 1px;
    } @else {
      bottom: 0;
    }
    @if ($align == 'start') {
      margin-left: 4px;
    } @else if ($align == 'end') {
      margin-right: 4px;
      left: auto;
      right: 0;
    }
    transform: translate($translate-x, $translate-y-caret) rotate($rotate-caret);
  }

  &::after {
    @if ($position == 'top') {
      top: 0;
    } @else {
      bottom: 0;
    }
    @if ($align != 'center') {
      margin-left: 0;
    }
    @if ($align == 'end') {
      right: 0;
    }
    transform: translate($translate-x, $translate-y-body);
  }
}
```

</details>

- **Parameters**:

| Name        | Description                                   | Type     | Default value |
| ----------- | --------------------------------------------- | -------- | ------------- |
| `$position` | The position, from: `top`, `bottom`           | `String` | `'bottom'`    |
| `$align`    | The alignment, from: `start`, `center`, `end` | `String` | `'center'`    |

- **Group**: [tooltip](#tooltip)
- **Used by**:
  - [tooltip--icon--legacy [mixin]](#tooltip--icon--legacy-mixin)
- **Deprecated**: This may not be available in future releases

### ❌⚠️tooltip--definition--legacy [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin tooltip--definition--legacy() {
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

  .#{$prefix}--tooltip--definition__align-end {
    right: 0;
  }

  .#{$prefix}--tooltip--definition__align-center {
    margin-left: 50%;
    transform: translateX(-50%);
  }

  .#{$prefix}--tooltip--definition__top.#{$prefix}--tooltip--definition__align-center {
    margin-left: 50%;
    transform: translate(-50%, -100%);
  }

  .#{$prefix}--tooltip--definition__align-center .#{$prefix}--tooltip__caret {
    left: auto;
    margin-left: auto;
    // Adjust by the half of the diagonal of the caret, which sizes 0.6rem
    margin-right: calc(50% - 6px);
  }

  .#{$prefix}--tooltip--definition__align-end .#{$prefix}--tooltip__caret {
    left: auto;
    margin-left: auto;
    margin-right: rem(16px);
  }
}
```

</details>

- **Group**: [tooltip](#tooltip)
- **Requires**:
  - [prefix [variable]](#prefix-variable)
  - [interactive-01 [variable]](#interactive-01-variable)
  - [text-01 [variable]](#text-01-variable)
  - [inverse-02 [variable]](#inverse-02-variable)
  - [carbon--spacing-04 [variable]](#carbon--spacing-04-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
- **Used by**:
  - [tooltip [mixin]](#tooltip-mixin)
- **Deprecated**: This may not be available in future releases

### ❌⚠️tooltip--icon--legacy [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin tooltip--icon--legacy() {
  // Icon CSS only tooltip
  .#{$prefix}--tooltip--icon {
    display: inline-flex;
    align-items: center;
  }

  .#{$prefix}--tooltip--icon__top,
  .#{$prefix}--tooltip--icon__bottom {
    @include tooltip--icon;

    &:hover,
    &:focus {
      svg {
        fill: $icon-02;
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
    @include tooltip--icon-placement('top');
  }

  // Tooltip Icon caret - bottom position
  .#{$prefix}--tooltip--icon__bottom {
    @include tooltip--icon-placement('bottom');
  }

  // Tooltip Icon caret - top position, left alignment
  .#{$prefix}--tooltip--icon__top.#{$prefix}--tooltip--icon__align-start {
    @include tooltip--icon-placement('top', 'start');
  }

  // Tooltip Icon caret - top position, right alignment
  .#{$prefix}--tooltip--icon__top.#{$prefix}--tooltip--icon__align-end {
    @include tooltip--icon-placement('top', 'end');
  }

  // Tooltip Icon caret - bottom position, left alignment
  .#{$prefix}--tooltip--icon__bottom.#{$prefix}--tooltip--icon__align-start {
    @include tooltip--icon-placement('bottom', 'start');
  }

  // Tooltip Icon caret - bottom position, right alignment
  .#{$prefix}--tooltip--icon__bottom.#{$prefix}--tooltip--icon__align-end {
    @include tooltip--icon-placement('bottom', 'end');
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
  - [tooltip--icon [mixin]](#tooltip--icon-mixin)
  - [tooltip--icon-placement [mixin]](#tooltip--icon-placement-mixin)
  - [prefix [variable]](#prefix-variable)
  - [icon-02 [variable]](#icon-02-variable)
- **Used by**:
  - [tooltip [mixin]](#tooltip-mixin)
- **Deprecated**: This may not be available in future releases

### ❌tooltip [mixin]

Tooltip styles

<details>
<summary>Source code</summary>

```scss
@mixin tooltip() {
  // Caret's original size was 13.75px square
  $caret-size: rem(6.875px);

  .#{$prefix}--tooltip__label {
    @include type-style('label-01');
    display: inline-flex;
    align-items: center;
    color: $text-02;

    &:focus {
      @include focus-outline('border');
    }
  }

  .#{$prefix}--tooltip__trigger svg {
    fill: $icon-02;
  }

  .#{$prefix}--tooltip__trigger:not(.#{$prefix}--btn--icon-only) {
    @include button-reset($width: false);
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    font-size: 1rem;

    &:focus {
      @include focus-outline('border');
      fill: $hover-primary;
    }
  }

  .#{$prefix}--tooltip__label .#{$prefix}--tooltip__trigger {
    // Override `margin: 0` from button-reset mixin
    margin-left: $carbon--spacing-03;
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
    padding: $carbon--spacing-05;
    border-radius: rem(2px);
    z-index: z('floating');
    word-wrap: break-word;
    color: $inverse-01;

    // @todo this can be deprecated in v11 since focus should always be on the content container not the tooltip
    &:focus {
      box-shadow: inset 0 0 0 1px $inverse-02, inset 0 0 0 2px $ui-background;
      outline: 0;
    }

    p {
      @include type-style('body-short-01');
    }

    button {
      padding-right: $carbon--spacing-07;
    }

    .#{$prefix}--btn:focus {
      border-color: $inverse-focus-ui;
      outline-color: $inverse-02;
    }

    .#{$prefix}--link {
      color: $inverse-link;
      font-size: rem(14px);

      &:focus {
        outline: 1px solid $inverse-focus-ui;
        outline-offset: 2px;
      }

      &:active {
        color: $inverse-01;
      }

      &:visited {
        color: $inverse-link;
      }
    }

    // Tooltips need to be click focusable but not sequentially focusable so the user can click within
    // the tooltip and not have it close. Because the element is not actionable it does not need
    // to have a visible focus indicator (OK'd by IBMa)
    .#{$prefix}--tooltip__content[tabindex='-1']:focus {
      outline: none;
    }

    .#{$prefix}--tooltip__caret {
      border-left: $caret-size solid transparent;
      border-right: $caret-size solid transparent;
      border-bottom: $caret-size solid $inverse-02;
      position: absolute;
      left: 0;
      top: calc(#{$caret-size * -1} + 1px);
      right: 0;
      width: 0;
      height: 0;
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
        // left position has an additional space between caret and tooltip
        right: calc(#{$caret-size * -1} + 1px);
        transform: rotate(90deg) translate(50%, -50%);
      }
    }

    &[data-floating-menu-direction='top'] {
      .#{$prefix}--tooltip__caret {
        top: auto;
        bottom: calc(#{$caret-size * -1} + 1px);
        transform: rotate(180deg);
      }
    }

    &[data-floating-menu-direction='right'] {
      .#{$prefix}--tooltip__caret {
        left: calc(#{$caret-size * -1} + 1px);
        top: 50%;
        right: auto;
        transform: rotate(270deg) translate(50%, -50%);
      }
    }
  }

  .#{$prefix}--tooltip__heading {
    @include carbon--type-style('productive-heading-01');
    margin-bottom: $spacing-03;
  }

  .#{$prefix}--tooltip--shown {
    display: block;
  }

  // Tooltip Definition
  /* begin legacy definition tooltip TODO: deprecate */
  @include tooltip--definition--legacy;
  /* end legacy definition tooltip */

  .#{$prefix}--tooltip--definition.#{$prefix}--tooltip--a11y {
    // Wrapping element set to inline since the tooltip isn't contained within the trigger (affects center and end alignments)
    // Also allows for Definition Tooltip to be used within a paragraph of text as defined in the usage guidelines
    display: inline-flex;
  }

  // default buttons in Safari are adding a small margin, affecting tooltip placement
  .#{$prefix}--tooltip--definition button.#{$prefix}--tooltip--a11y {
    margin: 0;
  }

  // Definition CSS only tooltip
  .#{$prefix}--tooltip__trigger.#{$prefix}--tooltip__trigger--definition {
    @include type-style('label-01');
    border-bottom: rem(1px) dotted $interactive-01;
  }

  .#{$prefix}--tooltip__trigger.#{$prefix}--tooltip__trigger--definition.#{$prefix}--tooltip--top {
    @include tooltip--trigger('definition', 'top');
    @include tooltip--placement('definition', 'top', 'start');

    &.#{$prefix}--tooltip--align-start {
      @include tooltip--placement('definition', 'top', 'start');
    }

    &.#{$prefix}--tooltip--align-center {
      @include tooltip--placement('definition', 'top', 'center');
    }

    &.#{$prefix}--tooltip--align-end {
      @include tooltip--placement('definition', 'top', 'end');
    }
  }

  .#{$prefix}--tooltip__trigger.#{$prefix}--tooltip__trigger--definition.#{$prefix}--tooltip--bottom {
    @include tooltip--trigger('definition', 'bottom');
    @include tooltip--placement('definition', 'bottom', 'start');

    &.#{$prefix}--tooltip--align-start {
      @include tooltip--placement('definition', 'bottom', 'start');
    }

    &.#{$prefix}--tooltip--align-center {
      @include tooltip--placement('definition', 'bottom', 'center');
    }

    &.#{$prefix}--tooltip--align-end {
      @include tooltip--placement('definition', 'bottom', 'end');
    }
  }

  // Tooltip Icon

  /* begin tooltip icon (TODO: deprecate) */
  @include tooltip--icon--legacy;
  /* end legacy tooltip icon */

  // Icon CSS only tooltip
  .#{$prefix}--tooltip__trigger {
    &:hover,
    &:focus {
      svg {
        fill: $icon-02;
      }
    }
  }

  .#{$prefix}--tooltip__trigger.#{$prefix}--tooltip--top {
    @include tooltip--trigger('icon', 'top');
    @include tooltip--placement('icon', 'top', 'center');

    &.#{$prefix}--tooltip--align-start {
      @include tooltip--placement('icon', 'top', 'start');
    }

    &.#{$prefix}--tooltip--align-center {
      @include tooltip--placement('icon', 'top', 'center');
    }

    &.#{$prefix}--tooltip--align-end {
      @include tooltip--placement('icon', 'top', 'end');
    }
  }

  .#{$prefix}--tooltip__trigger.#{$prefix}--tooltip--right {
    @include tooltip--trigger('icon', 'right');
    @include tooltip--placement('icon', 'right', 'center');

    &.#{$prefix}--tooltip--align-start {
      @include tooltip--placement('icon', 'right', 'start');
    }

    &.#{$prefix}--tooltip--align-center {
      @include tooltip--placement('icon', 'right', 'center');
    }

    &.#{$prefix}--tooltip--align-end {
      @include tooltip--placement('icon', 'right', 'end');
    }
  }

  .#{$prefix}--tooltip__trigger.#{$prefix}--tooltip--bottom {
    @include tooltip--trigger('icon', 'bottom');
    @include tooltip--placement('icon', 'bottom', 'center');

    &.#{$prefix}--tooltip--align-start {
      @include tooltip--placement('icon', 'bottom', 'start');
    }

    &.#{$prefix}--tooltip--align-center {
      @include tooltip--placement('icon', 'bottom', 'center');
    }

    &.#{$prefix}--tooltip--align-end {
      @include tooltip--placement('icon', 'bottom', 'end');
    }
  }

  .#{$prefix}--tooltip__trigger.#{$prefix}--tooltip--left {
    @include tooltip--trigger('icon', 'left');
    @include tooltip--placement('icon', 'left', 'center');

    &.#{$prefix}--tooltip--align-start {
      @include tooltip--placement('icon', 'left', 'start');
    }

    &.#{$prefix}--tooltip--align-center {
      @include tooltip--placement('icon', 'left', 'center');
    }

    &.#{$prefix}--tooltip--align-end {
      @include tooltip--placement('icon', 'left', 'end');
    }
  }
}
```

</details>

- **Group**: [tooltip](#tooltip)
- **Requires**:
  - [carbon--type-style [mixin]](#carbon--type-style-mixin)
  - [tooltip--definition--legacy [mixin]](#tooltip--definition--legacy-mixin)
  - [tooltip--icon--legacy [mixin]](#tooltip--icon--legacy-mixin)
  - [prefix [variable]](#prefix-variable)
  - [text-02 [variable]](#text-02-variable)
  - [icon-02 [variable]](#icon-02-variable)
  - [hover-primary [variable]](#hover-primary-variable)
  - [carbon--spacing-03 [variable]](#carbon--spacing-03-variable)
  - [inverse-02 [variable]](#inverse-02-variable)
  - [carbon--spacing-02 [variable]](#carbon--spacing-02-variable)
  - [carbon--spacing-05 [variable]](#carbon--spacing-05-variable)
  - [inverse-01 [variable]](#inverse-01-variable)
  - [ui-background [variable]](#ui-background-variable)
  - [carbon--spacing-07 [variable]](#carbon--spacing-07-variable)
  - [inverse-focus-ui [variable]](#inverse-focus-ui-variable)
  - [inverse-link [variable]](#inverse-link-variable)
  - [spacing-03 [variable]](#spacing-03-variable)
  - [interactive-01 [variable]](#interactive-01-variable)

## ui-shell

### ❌carbon-content [mixin]

UI shell content

<details>
<summary>Source code</summary>

```scss
@mixin carbon-content() {
  .#{$prefix}--content {
    background: $ui-02;
    padding: 2rem;
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
  - [ui-02 [variable]](#ui-02-variable)

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

### ❌carbon-header-panel [mixin]

UI shell side nav

<details>
<summary>Source code</summary>

```scss
@mixin carbon-header-panel() {
  //----------------------------------------------------------------------------
  // Header Panel
  //----------------------------------------------------------------------------
  .#{$prefix}--header-panel {
    @include carbon--motion(exit, productive);
    position: fixed;
    top: carbon--mini-units(6);
    bottom: 0;
    right: 0;
    width: 0;
    background-color: $shell-panel-bg-01;
    border: none;
    will-change: width;
    transition: width 0.11s;
    overflow: hidden;
    z-index: z('header');
    color: $shell-panel-text-01;
  }

  .#{$prefix}--header-panel--expanded {
    width: carbon--mini-units(32);
    border-left: 1px solid $shell-panel-border;
    border-right: 1px solid $shell-panel-border;
  }
}
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Requires**:
  - [carbon--motion [mixin]](#carbon--motion-mixin)
  - [carbon--mini-units [function]](#carbon--mini-units-function)
  - [prefix [variable]](#prefix-variable)
  - [shell-panel-bg-01 [variable]](#shell-panel-bg-01-variable)
  - [shell-panel-text-01 [variable]](#shell-panel-text-01-variable)
  - [shell-panel-border [variable]](#shell-panel-border-variable)

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
    border-bottom: 1px solid $shell-header-border-01;
    z-index: z('header');
  }

  .#{$prefix}--header__action {
    @include button-reset();
    width: mini-units(6);
    height: mini-units(6);
    border: rem(2px) solid transparent;
    transition: background-color $duration--fast-02, border-color
        $duration--fast-02;
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
    background-color: $shell-header-bg-04;
  }

  .#{$prefix}--header__action--active {
    border-left: 1px solid $shell-header-border-01;
    border-right: 1px solid $shell-header-border-01;
    border-bottom: 1px solid $shell-header-bg-01;
  }

  .#{$prefix}--header__action:focus {
    border-color: $shell-header-focus;
    outline: none;
  }

  .#{$prefix}--header__action:active {
    background-color: $shell-header-bg-03;
  }

  .#{$prefix}--header__action > svg {
    fill: $shell-header-icon-02;
  }

  .#{$prefix}--header__menu-trigger {
    margin-right: rem(-8px);
  }

  .#{$prefix}--header__menu-trigger > svg {
    fill: $shell-header-icon-01;
  }

  .#{$prefix}--header__menu-trigger:hover {
    fill: $shell-header-bg-02;
  }

  .#{$prefix}--header__menu-toggle {
    display: block;
  }

  .#{$prefix}--header__menu-toggle__hidden {
    @include carbon--breakpoint('lg') {
      display: none;
    }
  }

  //--------------------------------------------------------------------------
  // Header - Name
  //--------------------------------------------------------------------------
  a.#{$prefix}--header__name {
    @include type-style('body-short-01');
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 mini-units(4) 0 mini-units(2);
    text-decoration: none;
    font-weight: 600;
    letter-spacing: 0.1px;
    line-height: 20px;
    user-select: none;
    border: rem(2px) solid transparent;
    transition: border-color $duration--fast-02;
    outline: none;
  }

  a.#{$prefix}--header__name:focus {
    border-color: $shell-header-focus;
  }

  .#{$prefix}--header__name--prefix {
    font-weight: 400;
  }

  a.#{$prefix}--header__name,
  a.#{$prefix}--header__name:hover {
    color: $shell-header-text-01;
  }

  //--------------------------------------------------------------------------
  // Header - Navigation
  //--------------------------------------------------------------------------
  .#{$prefix}--header__nav {
    height: 100%;
    padding-left: mini-units(2);
    position: relative;
    display: block;

    @include carbon--breakpoint-down('lg') {
      display: none;
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: rem(24px);
      width: rem(1px);
      background-color: $shell-header-border-01;
    }
  }

  .#{$prefix}--header__menu-bar[role='menubar'] {
    display: flex;
    height: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a.#{$prefix}--header__menu-item[role='menuitem'] {
    display: flex;
    align-items: center;
    color: $shell-header-text-02;
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
    border: 2px solid transparent;
    transition: background-color $duration--fast-02, border-color
        $duration--fast-02, color $duration--fast-02;
  }

  a.#{$prefix}--header__menu-item[role='menuitem']:hover {
    background-color: $shell-header-bg-02;
    color: $shell-header-text-01;
  }

  .#{$prefix}--header__action:active,
  a.#{$prefix}--header__menu-item[role='menuitem']:active {
    background-color: $shell-header-bg-03;
    color: $shell-header-text-01;
  }

  a.#{$prefix}--header__menu-item[role='menuitem']:focus {
    border-color: $shell-header-focus;
    color: $shell-header-text-01;
    outline: none;
  }

  a.#{$prefix}--header__menu-item[role='menuitem']:hover > svg,
  a.#{$prefix}--header__menu-item[role='menuitem']:active > svg,
  a.#{$prefix}--header__menu-item[role='menuitem']:focus > svg {
    fill: $shell-header-icon-01;
  }

  .#{$prefix}--header__submenu {
    position: relative;
  }

  .#{$prefix}--header__menu-title[role='menuitem'][aria-haspopup='true'] {
    position: relative;
  }

  .#{$prefix}--header__menu-title[role='menuitem'][aria-expanded='true'] {
    background-color: $shell-header-bg-06;
    color: $shell-header-focus;
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
    list-style: none;
    padding: 0;
    margin: 0;
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
    background-color: $shell-header-bg-06;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    z-index: z('header');
  }

  .#{$prefix}--header__menu-title[role='menuitem'][aria-expanded='true']
    + .#{$prefix}--header__menu
    .#{$prefix}--header__menu-item:hover {
    background-color: $shell-header-bg-04;
  }

  .#{$prefix}--header__menu-title[role='menuitem'][aria-expanded='true']
    + .#{$prefix}--header__menu
    .#{$prefix}--header__menu-item:active {
    background-color: $shell-header-bg-03;
  }

  .#{$prefix}--header__menu .#{$prefix}--header__menu-item[role='menuitem'] {
    height: mini-units(6);
  }

  .#{$prefix}--header__menu
    .#{$prefix}--header__menu-item[role='menuitem']:hover {
    background-color: $shell-header-bg-06;
    color: $shell-header-text-01;
  }

  .#{$prefix}--header__menu-arrow {
    fill: $shell-header-icon-03;
    margin-left: mini-units(1);
    transition: transform $duration--fast-02, fill $duration--fast-02;
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
  - [carbon--breakpoint [mixin]](#carbon--breakpoint-mixin)
  - [carbon--breakpoint-down [mixin]](#carbon--breakpoint-down-mixin)
  - [mini-units [function]](#mini-units-function)
  - [prefix [variable]](#prefix-variable)
  - [shell-header-bg-01 [variable]](#shell-header-bg-01-variable)
  - [shell-header-border-01 [variable]](#shell-header-border-01-variable)
  - [shell-header-bg-04 [variable]](#shell-header-bg-04-variable)
  - [shell-header-focus [variable]](#shell-header-focus-variable)
  - [shell-header-bg-03 [variable]](#shell-header-bg-03-variable)
  - [shell-header-icon-02 [variable]](#shell-header-icon-02-variable)
  - [shell-header-icon-01 [variable]](#shell-header-icon-01-variable)
  - [shell-header-bg-02 [variable]](#shell-header-bg-02-variable)
  - [shell-header-text-01 [variable]](#shell-header-text-01-variable)
  - [shell-header-text-02 [variable]](#shell-header-text-02-variable)
  - [shell-header-bg-06 [variable]](#shell-header-bg-06-variable)
  - [shell-header-icon-03 [variable]](#shell-header-icon-03-variable)

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
  - [mini-units [function]](#mini-units-function)
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
    background-color: $shell-panel-bg-01;
    height: 100%;
    overflow-x: hidden;
    transition: transform 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);
  }

  .#{$prefix}--panel--expanded {
    box-shadow: 0 8px 16px 0 rgba($carbon--black-100, 0.25);
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
    background-color: $carbon--gray-20;
  }

  //--------------------------------------------------------------------------
  // Switcher - Buttons
  //--------------------------------------------------------------------------
  .#{$prefix}--product-switcher__subheader,
  .#{$prefix}--product-switcher__all-btn {
    @include type-style('body-short-01');
    padding: mini-units(1);
    color: $shell-panel-text-01;
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
    background: $carbon--gray-20;
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
    background: $carbon--gray-30;
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
    background: $carbon--white-0;
  }

  .#{$prefix}--product-list__item:hover .#{$prefix}--overflow-menu {
    display: flex;
  }
}
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Requires**:
  - [mini-units [function]](#mini-units-function)
  - [prefix [variable]](#prefix-variable)
  - [shell-panel-bg-01 [variable]](#shell-panel-bg-01-variable)
  - [shell-panel-text-01 [variable]](#shell-panel-text-01-variable)
  - [shell-header-link [variable]](#shell-header-link-variable)
  - [shell-header-text-02 [variable]](#shell-header-text-02-variable)

### ❌text-overflow [mixin]

Helper to add in text overflow styles to a particular node. Useful if we don't
want to have display-inline: block from the text helper classes

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
- **Used by**:
  - [data-table-core [mixin]](#data-table-core-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌expanded [mixin]

Helper for handling selectors for the expansion state of the side-nav. This
helper makes it easier to write code for children that need to respond to
whether the side-nav is open, or closed. For convenience, we also optionally set
properties for opacity and visibility to help with the transition animation.

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
  //----------------------------------------------------------------------------.
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
    z-index: z('header');
  }

  .#{$prefix}--side-nav--ux {
    top: $spacing-09;
    width: mini-units(32);

    @include carbon--breakpoint-down('lg') {
      width: 0;
    }
  }

  //----------------------------------------------------------------------------
  // Rail
  //---------------------------------------------------------------------------
  // Used for rendering the actual side rail. There are two states that we have
  // to style for, namely for when the rail is collapsed and expanded. When
  // collapsed, the rail is intended to expand on mouse over. When expanded, it
  // should have the same dimensions as when expanded on mouse over

  .#{$prefix}--side-nav--rail {
    width: mini-units(6);
  }

  .#{$prefix}--side-nav--hidden {
    width: 0;
  }

  .#{$prefix}--side-nav:not(.#{$prefix}--side-nav--fixed):hover,
  .#{$prefix}--side-nav--expanded {
    width: mini-units(32);
  }

  .#{$prefix}--side-nav__overlay {
    position: absolute;
    top: rem(48px);
    height: 0;
    width: 0;
    background-color: transparent;
    opacity: 0;
    transition: opacity $transition--expansion $carbon--standard-easing, background-color
        $transition--expansion $carbon--standard-easing;
  }

  .#{$prefix}--side-nav__overlay-active {
    @include carbon--breakpoint-down('lg') {
      height: 100vh;
      width: 100%;
      background-color: $overlay-01;
      opacity: 1;
      transition: opacity $transition--expansion $carbon--standard-easing, background-color
          $transition--expansion $carbon--standard-easing;
    }
  }

  // When used alongside the header, we update the `top` positioning so that we
  // can fit both widgets on the same page without overlapping.
  .#{$prefix}--header ~ .#{$prefix}--side-nav {
    top: mini-units(6);
    height: calc(100% - 48px);
  }

  .#{$prefix}--side-nav--fixed {
    width: mini-units(32);
  }

  .#{$prefix}--side-nav--collapsed {
    width: mini-units(32);
    transform: translateX(mini-units(-32));
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
    border-bottom: 1px solid $shell-side-nav-bg-02;
    width: 100%;
    height: mini-units(6);
    max-width: 100%;

    @include expanded() {
      height: auto;
    }
  }

  .#{$prefix}--side-nav--ux .#{$prefix}--side-nav__header {
    height: auto;
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

  .#{$prefix}--side-nav--ux .#{$prefix}--side-nav__details {
    opacity: 1;
    visibility: inherit;
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
    @include focus-outline('reset');
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
    transition: outline $duration--fast-02;
  }

  .#{$prefix}--side-nav__select:focus {
    @include focus-outline('outline');
  }

  //----------------------------------------------------------------------------
  // Side-nav > Navigation > Footer
  //----------------------------------------------------------------------------
  .#{$prefix}--side-nav__footer {
    flex: 0 0 rem(48px);
    width: 100%;
    background-color: $shell-side-nav-bg-01;
  }

  .#{$prefix}--side-nav__toggle {
    @include focus-outline('reset');
    @include button-reset($width: true);
    height: 100%;
    text-align: left;
    transition: outline $duration--fast-02;
  }

  .#{$prefix}--side-nav__toggle:focus {
    @include focus-outline('outline');
  }

  .#{$prefix}--side-nav__toggle {
    padding-left: mini-units(2);
  }

  //----------------------------------------------------------------------------
  // Side-nav > Navigation > Item(s)
  //----------------------------------------------------------------------------
  .#{$prefix}--side-nav__items {
    flex: 1 1 0%;
    overflow: hidden;
    padding: 1rem 0 0;

    @include expanded() {
      overflow-y: auto;
    }
  }

  .#{$prefix}--side-nav--ux .#{$prefix}--side-nav__items {
    overflow-y: auto;
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

  .#{$prefix}--side-nav--ux .#{$prefix}--side-nav__item {
    width: auto;
    height: auto;
  }

  .#{$prefix}--side-nav__item:not(.#{$prefix}--side-nav__item--active):hover
    .#{$prefix}--side-nav__item:not(.#{$prefix}--side-nav__item--active)
    > .#{$prefix}--side-nav__submenu:hover,
  .#{$prefix}--side-nav__item:not(.#{$prefix}--side-nav__item--active)
    > .#{$prefix}--side-nav__link:hover,
  .#{$prefix}--side-nav__menu[role='menu']
    a.#{$prefix}--side-nav__link[role='menuitem']:not(.#{$prefix}--side-nav__link--current):not([aria-current='page']):hover,
  .#{$prefix}--side-nav a.#{$prefix}--header__menu-item[role='menuitem']:hover,
  .#{$prefix}--side-nav
    .#{$prefix}--header__menu-title[role='menuitem'][aria-expanded='true']:hover {
    // TODO: sync color
    background-color: $shell-side-nav-bg-04;
    color: $ibm-color__gray-100;
  }

  .#{$prefix}--side-nav__item:not(.#{$prefix}--side-nav__item--active)
    > .#{$prefix}--side-nav__link:hover
    > span,
  .#{$prefix}--side-nav__item:not(.#{$prefix}--side-nav__item--active)
    .#{$prefix}--side-nav__menu-item
    > .#{$prefix}--side-nav__link:hover
    > span {
    color: $ibm-color__gray-100;
  }

  .#{$prefix}--side-nav__item--large {
    height: mini-units(6);
  }

  //----------------------------------------------------------------------------
  // Side-nav > Navigation > {Menu,Submenu}
  //----------------------------------------------------------------------------
  .#{$prefix}--side-nav__submenu[aria-haspopup='true'] {
    @include button-reset($width: true);
    @include type-style('productive-heading-01');
    @include focus-outline('reset');
    padding: 0 mini-units(2);
    display: flex;
    align-items: center;
    color: $shell-side-nav-text-01;
    height: mini-units(4);
    user-select: none;
    transition: color $duration--fast-02, background-color $duration--fast-02,
      outline $duration--fast-02;
  }

  .#{$prefix}--side-nav__submenu:hover {
    background-color: $shell-side-nav-bg-04;
    color: $ibm-color__gray-100;
  }

  .#{$prefix}--side-nav__submenu:focus {
    @include focus-outline('outline');
  }

  .#{$prefix}--side-nav__submenu-title {
    @include text-overflow();
    text-align: left;
  }

  .#{$prefix}--side-nav__icon.#{$prefix}--side-nav__submenu-chevron {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .#{$prefix}--side-nav__submenu-chevron > svg {
    transition: transform $duration--fast-02;
    height: rem(16px);
    width: rem(16px);
  }

  .#{$prefix}--side-nav__submenu[aria-expanded='true']
    .#{$prefix}--side-nav__submenu-chevron
    > svg {
    transform: rotate(180deg);
  }

  .#{$prefix}--side-nav__item--large {
    .#{$prefix}--side-nav__submenu {
      height: mini-units(6);
    }
  }

  .#{$prefix}--side-nav__item--active .#{$prefix}--side-nav__submenu:hover {
    background-color: $shell-side-nav-bg-04;
    color: $ibm-color__gray-100;
  }

  .#{$prefix}--side-nav__item--active
    .#{$prefix}--side-nav__submenu[aria-expanded='false'] {
    background-color: $shell-side-nav-bg-04;
    color: $ibm-color__gray-100;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 4px;
      background-color: $shell-side-nav-accent-01;
    }
  }

  .#{$prefix}--side-nav__item--active .#{$prefix}--side-nav__submenu-title {
    font-weight: 600;
    color: $ibm-color__gray-100;
  }

  .#{$prefix}--side-nav__menu[role='menu'] {
    display: block;
    visibility: hidden;
    max-height: 0;
  }

  .#{$prefix}--side-nav__submenu[aria-expanded='true']
    + .#{$prefix}--side-nav__menu[role='menu'] {
    max-height: rem(1500px);
    visibility: inherit;
  }

  .#{$prefix}--side-nav__menu[role='menu']
    a.#{$prefix}--side-nav__link[role='menuitem'] {
    height: mini-units(4);
    min-height: mini-units(4);
    padding-left: mini-units(4);
    font-weight: 400;
  }

  .#{$prefix}--side-nav__item.#{$prefix}--side-nav__item--icon
    a.#{$prefix}--side-nav__link[role='menuitem'] {
    padding-left: mini-units(9);
  }
  .#{$prefix}--side-nav__menu[role='menu']
    a.#{$prefix}--side-nav__link--current,
  .#{$prefix}--side-nav__menu[role='menu']
    a.#{$prefix}--side-nav__link[aria-current='page'],
  a.#{$prefix}--side-nav__link--current {
    background-color: $ibm-color__gray-20;

    > span {
      color: $ibm-color__gray-100;
      font-weight: 600;
    }
  }

  a.#{$prefix}--side-nav__link--current > span.#{$prefix}--side-nav__link-text {
    color: $ibm-color__gray-100;
    font-weight: 600;
  }
  //----------------------------------------------------------------------------
  // Side-nav > Link
  //----------------------------------------------------------------------------
  a.#{$prefix}--side-nav__link,
  .#{$prefix}--side-nav a.#{$prefix}--header__menu-item[role='menuitem'],
  .#{$prefix}--side-nav
    .#{$prefix}--header__menu-title[role='menuitem'][aria-expanded='true']
    + .#{$prefix}--header__menu {
    @include focus-outline('reset');
    @include type-style('productive-heading-01');
    position: relative;
    display: flex;
    align-items: center;
    text-decoration: none;
    min-height: mini-units(4);
    padding: 0 mini-units(2);
    transition: color $duration--fast-02, background-color $duration--fast-02,
      outline $duration--fast-02;
  }

  .#{$prefix}--side-nav__item--large {
    a.#{$prefix}--side-nav__link {
      height: mini-units(6);
    }
  }

  a.#{$prefix}--side-nav__link > .#{$prefix}--side-nav__link-text,
  .#{$prefix}--side-nav
    a.#{$prefix}--header__menu-item[role='menuitem']
    .#{$prefix}--text-truncate-end {
    @include text-overflow();
    color: $shell-side-nav-text-01;
    font-size: rem(14px);
    letter-spacing: 0.1px;
    line-height: rem(20px);
    user-select: none;
  }

  a.#{$prefix}--side-nav__link:focus,
  .#{$prefix}--side-nav a.#{$prefix}--header__menu-item[role='menuitem']:focus {
    @include focus-outline('outline');
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
    // Helpful in flex containers so the icon does not have less than the
    // expected width
    flex: 0 0 mini-units(2);
  }

  .#{$prefix}--side-nav__icon:not(.#{$prefix}--side-nav__submenu-chevron) {
    margin-right: mini-units(3);
  }

  .#{$prefix}--side-nav__icon > svg {
    fill: $shell-side-nav-icon-01;
    width: mini-units(2);
    height: mini-units(2);
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

  //----------------------------------------------------------------------------
  // Variants - Header Nav Links in Side Nav
  //----------------------------------------------------------------------------
  .#{$prefix}--side-nav .#{$prefix}--header__nav {
    @include carbon--breakpoint-down('lg') {
      display: block;
    }
  }

  .#{$prefix}--side-nav__header-navigation {
    display: none;

    @include carbon--breakpoint-down('lg') {
      display: block;
      position: relative;
      margin-bottom: rem(32px);
    }
  }

  .#{$prefix}--side-nav__header-divider::after {
    content: '';
    position: absolute;
    height: rem(1px);
    bottom: rem(-16px);
    left: rem(16px);
    width: calc(100% - 32px);
    background: $ibm-color__gray-20;
  }

  //header menu items overrides
  .#{$prefix}--side-nav a.#{$prefix}--header__menu-item[role='menuitem'] {
    color: $shell-side-nav-text-01;
    white-space: nowrap;
    justify-content: space-between;

    &[aria-expanded='true'] {
      background-color: transparent;
    }
  }

  .#{$prefix}--side-nav
    .#{$prefix}--header__menu-title[role='menuitem'][aria-expanded='true']
    + .#{$prefix}--header__menu {
    bottom: inherit;
    width: 100%;
    box-shadow: none;
    transform: none;
    background-color: transparent;
    padding: 0;

    & li {
      width: 100%;
    }

    & a.#{$prefix}--header__menu-item[role='menuitem'] {
      padding-left: 4.25rem;
      font-weight: 400;
    }

    & a.#{$prefix}--header__menu-item[role='menuitem']:hover {
      background-color: $shell-side-nav-bg-04;
      color: $ibm-color__gray-100;
    }
  }

  .#{$prefix}--side-nav
    .#{$prefix}--header__menu
    a.#{$prefix}--header__menu-item[role='menuitem'] {
    height: inherit;
  }

  .#{$prefix}--side-nav
    a.#{$prefix}--header__menu-item[role='menuitem']:hover
    .#{$prefix}--header__menu-arrow,
  .#{$prefix}--side-nav
    a.#{$prefix}--header__menu-item[role='menuitem']:focus
    .#{$prefix}--header__menu-arrow,
  .#{$prefix}--side-nav .#{$prefix}--header__menu-arrow {
    fill: $shell-side-nav-text-01;
  }
}
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Requires**:
  - [carbon--breakpoint-down [mixin]](#carbon--breakpoint-down-mixin)
  - [expanded [mixin]](#expanded-mixin)
  - [text-overflow [mixin]](#text-overflow-mixin)
  - [mini-units [function]](#mini-units-function)
  - [prefix [variable]](#prefix-variable)
  - [shell-side-nav-text-01 [variable]](#shell-side-nav-text-01-variable)
  - [shell-side-nav-bg-01 [variable]](#shell-side-nav-bg-01-variable)
  - [spacing-09 [variable]](#spacing-09-variable)
  - [overlay-01 [variable]](#overlay-01-variable)
  - [shell-side-nav-bg-02 [variable]](#shell-side-nav-bg-02-variable)
  - [shell-side-nav-icon-01 [variable]](#shell-side-nav-icon-01-variable)
  - [shell-header-bg-01 [variable]](#shell-header-bg-01-variable)
  - [shell-header-text-01 [variable]](#shell-header-text-01-variable)
  - [shell-side-nav-bg-04 [variable]](#shell-side-nav-bg-04-variable)
  - [shell-side-nav-accent-01 [variable]](#shell-side-nav-accent-01-variable)

### ❌carbon-switcher [mixin]

UI shell side nav

<details>
<summary>Source code</summary>

```scss
@mixin carbon-switcher() {
  //----------------------------------------------------------------------------
  // Header Switcher
  //----------------------------------------------------------------------------
  .#{$prefix}--switcher {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $shell-panel-text-01;
  }

  .#{$prefix}--switcher__item {
    width: 100%;
    height: $spacing-07;
  }

  .#{$prefix}--switcher__item:nth-child(1) {
    margin-top: $spacing-05;
  }

  .#{$prefix}--switcher__item--divider {
    display: block;
    width: rem(224px);
    height: 1px;
    margin: $spacing-03 $spacing-05;
    background: $shell-panel-border;
    border: none;
  }

  .#{$prefix}--switcher__item-link {
    @include carbon--type-style('productive-heading-01');
    display: block;
    height: $spacing-07;
    text-decoration: none;
    padding: rem(6px) $spacing-05;
    color: $shell-panel-text-01;

    &:hover:not(.#{$prefix}--switcher__item-link--selected) {
      background: $shell-panel-bg-02;
      color: $shell-panel-text-02;
      cursor: pointer;
    }

    &:focus {
      outline: 2px solid $shell-panel-focus;
      outline-offset: -2px;
    }

    &:active {
      background: $shell-panel-bg-03;
      color: $shell-panel-text-02;
    }
  }

  .#{$prefix}--switcher__item-link--selected {
    background: $shell-panel-bg-04;
    color: $shell-panel-text-02;
  }
}
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Requires**:
  - [carbon--type-style [mixin]](#carbon--type-style-mixin)
  - [prefix [variable]](#prefix-variable)
  - [shell-panel-text-01 [variable]](#shell-panel-text-01-variable)
  - [spacing-07 [variable]](#spacing-07-variable)
  - [spacing-05 [variable]](#spacing-05-variable)
  - [spacing-03 [variable]](#spacing-03-variable)
  - [shell-panel-border [variable]](#shell-panel-border-variable)
  - [shell-panel-bg-02 [variable]](#shell-panel-bg-02-variable)
  - [shell-panel-text-02 [variable]](#shell-panel-text-02-variable)
  - [shell-panel-focus [variable]](#shell-panel-focus-variable)
  - [shell-panel-bg-03 [variable]](#shell-panel-bg-03-variable)
  - [shell-panel-bg-04 [variable]](#shell-panel-bg-04-variable)

### ❌shell-header-bg-01 [variable]

Header bar background

<details>
<summary>Source code</summary>

```scss
$shell-header-bg-01: $carbon--gray-100;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header [mixin]](#carbon-header-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌shell-header-bg-02 [variable]

Header menu trigger hover, Header nav link hover

<details>
<summary>Source code</summary>

```scss
$shell-header-bg-02: #2c2c2c;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header [mixin]](#carbon-header-mixin)

### ❌shell-header-bg-03 [variable]

Header action active background

<details>
<summary>Source code</summary>

```scss
$shell-header-bg-03: $carbon--gray-80;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header [mixin]](#carbon-header-mixin)

### ❌shell-header-bg-04 [variable]

Header submenu link hover

<details>
<summary>Source code</summary>

```scss
$shell-header-bg-04: #353535;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header [mixin]](#carbon-header-mixin)

### ❌shell-header-bg-05 [variable]

Header nav link active and focus background

<details>
<summary>Source code</summary>

```scss
$shell-header-bg-05: $carbon--gray-70;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`

### ❌shell-header-bg-06 [variable]

Header nav link submenu

<details>
<summary>Source code</summary>

```scss
$shell-header-bg-06: $carbon--gray-90;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header [mixin]](#carbon-header-mixin)

### ❌shell-header-border-01 [variable]

Header border bottom

<details>
<summary>Source code</summary>

```scss
$shell-header-border-01: $carbon--gray-80;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header [mixin]](#carbon-header-mixin)

### ❌shell-header-focus [variable]

Header focus

<details>
<summary>Source code</summary>

```scss
$shell-header-focus: $carbon--white-0;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header [mixin]](#carbon-header-mixin)

### ❌shell-header-text-01 [variable]

Primary text in header, Title text

<details>
<summary>Source code</summary>

```scss
$shell-header-text-01: $carbon--gray-10;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header [mixin]](#carbon-header-mixin)
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌shell-header-text-02 [variable]

Secondary text in header, Menu item nav text

<details>
<summary>Source code</summary>

```scss
$shell-header-text-02: $carbon--gray-30;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header [mixin]](#carbon-header-mixin)
  - [product-switcher [mixin]](#product-switcher-mixin)

### ❌shell-header-icon-01 [variable]

Header menu trigger

<details>
<summary>Source code</summary>

```scss
$shell-header-icon-01: $carbon--gray-10;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header [mixin]](#carbon-header-mixin)

### ❌shell-header-icon-02 [variable]

Header bar icons

<details>
<summary>Source code</summary>

```scss
$shell-header-icon-02: $carbon--white-0;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header [mixin]](#carbon-header-mixin)

### ❌shell-header-icon-03 [variable]

Header bar icons

<details>
<summary>Source code</summary>

```scss
$shell-header-icon-03: $carbon--gray-30;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header [mixin]](#carbon-header-mixin)

### ❌shell-header-link [variable]

Item link

<details>
<summary>Source code</summary>

```scss
$shell-header-link: $carbon--blue-60;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [product-switcher [mixin]](#product-switcher-mixin)

### ❌shell-panel-bg-01 [variable]

Header-panel background

<details>
<summary>Source code</summary>

```scss
$shell-panel-bg-01: $carbon--gray-100;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header-panel [mixin]](#carbon-header-panel-mixin)
  - [product-switcher [mixin]](#product-switcher-mixin)

### ❌shell-panel-bg-02 [variable]

Panel item hover background

<details>
<summary>Source code</summary>

```scss
$shell-panel-bg-02: #2c2c2c;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-switcher [mixin]](#carbon-switcher-mixin)

### ❌shell-panel-bg-03 [variable]

Panel item focus and active background

<details>
<summary>Source code</summary>

```scss
$shell-panel-bg-03: $carbon--gray-80;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-switcher [mixin]](#carbon-switcher-mixin)

### ❌shell-panel-bg-04 [variable]

Panel item link selected background

<details>
<summary>Source code</summary>

```scss
$shell-panel-bg-04: $carbon--gray-90;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-switcher [mixin]](#carbon-switcher-mixin)

### ❌shell-panel-border [variable]

Panel border

<details>
<summary>Source code</summary>

```scss
$shell-panel-border: $carbon--gray-80;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header-panel [mixin]](#carbon-header-panel-mixin)
  - [carbon-switcher [mixin]](#carbon-switcher-mixin)

### ❌shell-panel-text-01 [variable]

Header panel text

<details>
<summary>Source code</summary>

```scss
$shell-panel-text-01: $carbon--gray-30;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-header-panel [mixin]](#carbon-header-panel-mixin)
  - [product-switcher [mixin]](#product-switcher-mixin)
  - [carbon-switcher [mixin]](#carbon-switcher-mixin)

### ❌shell-panel-text-02 [variable]

Header panel secondary text

<details>
<summary>Source code</summary>

```scss
$shell-panel-text-02: $carbon--gray-10;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-switcher [mixin]](#carbon-switcher-mixin)

### ❌shell-panel-focus [variable]

Header panel focus border

<details>
<summary>Source code</summary>

```scss
$shell-panel-focus: $carbon--white-0;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-switcher [mixin]](#carbon-switcher-mixin)

### ❌shell-side-nav-bg-01 [variable]

Side-nav panel background

<details>
<summary>Source code</summary>

```scss
$shell-side-nav-bg-01: $carbon--white-0;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌shell-side-nav-bg-02 [variable]

Selected category background Select L2 flatted item background Item active
background Footer-bar background

<details>
<summary>Source code</summary>

```scss
$shell-side-nav-bg-02: $carbon--gray-80;
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

### ❌shell-side-nav-bg-04 [variable]

Side nav item hover background

<details>
<summary>Source code</summary>

```scss
$shell-side-nav-bg-04: #e5e5e5;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌shell-side-nav-bg-05 [variable]

Side nav menu item hover background

<details>
<summary>Source code</summary>

```scss
$shell-side-nav-bg-05: #dcdcdc;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`

### ❌shell-side-nav-text-01 [variable]

Primary text in side-nav L2 Flatten item text L2 Nested item text L1 title text

<details>
<summary>Source code</summary>

```scss
$shell-side-nav-text-01: $ibm-color__gray-70;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌shell-side-nav-text-02 [variable]

Secondary text in side nav L2 Category label

<details>
<summary>Source code</summary>

```scss
$shell-side-nav-text-02: $ibm-color__gray-30;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`

### ❌shell-side-nav-icon-01 [variable]

Side-nav icon color

<details>
<summary>Source code</summary>

```scss
$shell-side-nav-icon-01: $ibm-color__gray-70;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

### ❌shell-side-nav-accent-01 [variable]

Item highlight bar

<details>
<summary>Source code</summary>

```scss
$shell-side-nav-accent-01: $ibm-color__blue-60;
```

</details>

- **Group**: [ui-shell](#ui-shell)
- **Type**: `Color`
- **Used by**:
  - [carbon-side-nav [mixin]](#carbon-side-nav-mixin)

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

Spacing for cells that are the first in their row @access private @group
data-table

<details>
<summary>Source code</summary>

```scss
$spacing--columns--first: 1.5rem;
```

</details>

- **Group**: [general](#general)

### ✅spacing--columns--before [variable]

Spacing before columns in cell @access private @group data-table

<details>
<summary>Source code</summary>

```scss
$spacing--columns--before: 0.75rem;
```

</details>

- **Group**: [general](#general)

### ✅spacing--cell--activity [variable]

Spacing for activity areas in a cell, namely status and actions @access private
@group data-table

<details>
<summary>Source code</summary>

```scss
$spacing--cell--activity: 3.5rem;
```

</details>

- **Group**: [general](#general)

### ✅spacing--cell--status [variable]

Offset used on input nodes to offer space to activity indicators such that the
input doesn't overlap with the status @access private @group data-table

<details>
<summary>Source code</summary>

```scss
$spacing--cell--status: 2rem;
```

</details>

- **Group**: [general](#general)

### ✅spacing--cell-actions [variable]

Spacing that should exist around, and in-between, elements in the action bar
@access private @group data-table

<details>
<summary>Source code</summary>

```scss
$spacing--cell-actions: 0.5rem;
```

</details>

- **Group**: [general](#general)
