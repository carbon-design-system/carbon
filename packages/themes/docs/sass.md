# Sass API

| Mark | Description                                                |
| ---- | ---------------------------------------------------------- |
| ✅   | Public functions, mixins, placeholders, and variables      |
| ❌   | Private items - not supported outside package's build      |
| ⚠️   | Deprecated items - may not be available in future releases |

<!-- toc -->

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

<!-- tocstop -->

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

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
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
