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
  - [✅carbon--theme--white [variable]](#carbon--theme--white-variable)
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

### ❌custom-property [mixin]

<details>
<summary>Source code</summary>

```scss
@mixin custom-property() {
  @if type-of($value) == map {
    @each $property, $property-value in $value {
      @include custom-property('#{$name}-#{$property}', $property-value);
    }
  } @else {
    --#{$prefix}-#{$name}: #{$value};
  }
}
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)

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

  @if $emit-custom-properties == true {
    --interactive-01: #{map-get($theme, 'interactive-01')};
    --interactive-02: #{map-get($theme, 'interactive-02')};
    --interactive-03: #{map-get($theme, 'interactive-03')};
    --interactive-04: #{map-get($theme, 'interactive-04')};
    --ui-background: #{map-get($theme, 'ui-background')};
    --ui-01: #{map-get($theme, 'ui-01')};
    --ui-02: #{map-get($theme, 'ui-02')};
    --ui-03: #{map-get($theme, 'ui-03')};
    --ui-04: #{map-get($theme, 'ui-04')};
    --ui-05: #{map-get($theme, 'ui-05')};
    --text-01: #{map-get($theme, 'text-01')};
    --text-02: #{map-get($theme, 'text-02')};
    --text-03: #{map-get($theme, 'text-03')};
    --text-04: #{map-get($theme, 'text-04')};
    --text-05: #{map-get($theme, 'text-05')};
    --icon-01: #{map-get($theme, 'icon-01')};
    --icon-02: #{map-get($theme, 'icon-02')};
    --icon-03: #{map-get($theme, 'icon-03')};
    --link-01: #{map-get($theme, 'link-01')};
    --inverse-link: #{map-get($theme, 'inverse-link')};
    --field-01: #{map-get($theme, 'field-01')};
    --field-02: #{map-get($theme, 'field-02')};
    --inverse-01: #{map-get($theme, 'inverse-01')};
    --inverse-02: #{map-get($theme, 'inverse-02')};
    --support-01: #{map-get($theme, 'support-01')};
    --support-02: #{map-get($theme, 'support-02')};
    --support-03: #{map-get($theme, 'support-03')};
    --support-04: #{map-get($theme, 'support-04')};
    --inverse-support-01: #{map-get($theme, 'inverse-support-01')};
    --inverse-support-02: #{map-get($theme, 'inverse-support-02')};
    --inverse-support-03: #{map-get($theme, 'inverse-support-03')};
    --inverse-support-04: #{map-get($theme, 'inverse-support-04')};
    --overlay-01: #{map-get($theme, 'overlay-01')};
    --danger: #{map-get($theme, 'danger')};
    --focus: #{map-get($theme, 'focus')};
    --inverse-focus-ui: #{map-get($theme, 'inverse-focus-ui')};
    --hover-primary: #{map-get($theme, 'hover-primary')};
    --active-primary: #{map-get($theme, 'active-primary')};
    --hover-primary-text: #{map-get($theme, 'hover-primary-text')};
    --hover-secondary: #{map-get($theme, 'hover-secondary')};
    --active-secondary: #{map-get($theme, 'active-secondary')};
    --hover-tertiary: #{map-get($theme, 'hover-tertiary')};
    --active-tertiary: #{map-get($theme, 'active-tertiary')};
    --hover-ui: #{map-get($theme, 'hover-ui')};
    --active-ui: #{map-get($theme, 'active-ui')};
    --selected-ui: #{map-get($theme, 'selected-ui')};
    --hover-selected-ui: #{map-get($theme, 'hover-selected-ui')};
    --inverse-hover-ui: #{map-get($theme, 'inverse-hover-ui')};
    --hover-danger: #{map-get($theme, 'hover-danger')};
    --active-danger: #{map-get($theme, 'active-danger')};
    --hover-row: #{map-get($theme, 'hover-row')};
    --visited-link: #{map-get($theme, 'visited-link')};
    --disabled-01: #{map-get($theme, 'disabled-01')};
    --disabled-02: #{map-get($theme, 'disabled-02')};
    --disabled-03: #{map-get($theme, 'disabled-03')};
    --highlight: #{map-get($theme, 'highlight')};
    --skeleton-01: #{map-get($theme, 'skeleton-01')};
    --skeleton-02: #{map-get($theme, 'skeleton-02')};
    --brand-01: #{map-get($theme, 'brand-01')};
    --brand-02: #{map-get($theme, 'brand-02')};
    --brand-03: #{map-get($theme, 'brand-03')};
    --active-01: #{map-get($theme, 'active-01')};
    --hover-field: #{map-get($theme, 'hover-field')};
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
  - [carbon--theme [variable]](#carbon--theme-variable)

### ✅carbon--theme--white [variable]

Carbon's white color theme

<details>
<summary>Source code</summary>

```scss
$carbon--theme--white: (
  interactive-01: #0f62fe,
  interactive-02: #393939,
  interactive-03: #0f62fe,
  interactive-04: #0f62fe,
  ui-background: #ffffff,
  ui-01: #f4f4f4,
  ui-02: #ffffff,
  ui-03: #e0e0e0,
  ui-04: #8d8d8d,
  ui-05: #161616,
  text-01: #161616,
  text-02: #393939,
  text-03: #a8a8a8,
  text-04: #ffffff,
  text-05: #6f6f6f,
  icon-01: #161616,
  icon-02: #525252,
  icon-03: #ffffff,
  link-01: #0f62fe,
  inverse-link: #78a9ff,
  field-01: #f4f4f4,
  field-02: #ffffff,
  inverse-01: #ffffff,
  inverse-02: #393939,
  support-01: #da1e28,
  support-02: #24a148,
  support-03: #f1c21b,
  support-04: #0043ce,
  inverse-support-01: #fa4d56,
  inverse-support-02: #42be65,
  inverse-support-03: #f1c21b,
  inverse-support-04: #4589ff,
  overlay-01: rgba(22, 22, 22, 0.5),
  danger: #da1e28,
  focus: #0f62fe,
  inverse-focus-ui: #ffffff,
  hover-primary: #0353e9,
  active-primary: #002d9c,
  hover-primary-text: #0043ce,
  hover-secondary: #4c4c4c,
  active-secondary: #6f6f6f,
  hover-tertiary: #0353e9,
  active-tertiary: #002d9c,
  hover-ui: #e5e5e5,
  active-ui: #c6c6c6,
  selected-ui: #e0e0e0,
  inverse-hover-ui: #4c4c4c,
  hover-selected-ui: #cacaca,
  hover-danger: #ba1b23,
  active-danger: #750e13,
  hover-row: #e5e5e5,
  visited-link: #8a3ffc,
  disabled-01: #f4f4f4,
  disabled-02: #c6c6c6,
  disabled-03: #8d8d8d,
  highlight: #d0e2ff,
  skeleton-01: #e5e5e5,
  skeleton-02: #c6c6c6,
  brand-01: #0f62fe,
  brand-02: #393939,
  brand-03: #0f62fe,
  active-01: #c6c6c6,
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
  interactive-01: #0f62fe,
  interactive-02: #393939,
  interactive-03: #0f62fe,
  interactive-04: #0f62fe,
  ui-background: #f4f4f4,
  ui-01: #ffffff,
  ui-02: #f4f4f4,
  ui-03: #e0e0e0,
  ui-04: #8d8d8d,
  ui-05: #161616,
  text-01: #161616,
  text-02: #393939,
  text-03: #a8a8a8,
  text-04: #ffffff,
  text-05: #6f6f6f,
  icon-01: #161616,
  icon-02: #525252,
  icon-03: #ffffff,
  link-01: #0f62fe,
  inverse-link: #78a9ff,
  field-01: #ffffff,
  field-02: #f4f4f4,
  inverse-01: #ffffff,
  inverse-02: #393939,
  support-01: #da1e28,
  support-02: #24a148,
  support-03: #f1c21b,
  support-04: #0043ce,
  inverse-support-01: #fa4d56,
  inverse-support-02: #42be65,
  inverse-support-03: #f1c21b,
  inverse-support-04: #4589ff,
  overlay-01: rgba(22, 22, 22, 0.5),
  danger: #da1e28,
  focus: #0f62fe,
  inverse-focus-ui: #ffffff,
  hover-primary: #0353e9,
  active-primary: #002d9c,
  hover-primary-text: #0043ce,
  hover-secondary: #4c4c4c,
  active-secondary: #6f6f6f,
  hover-tertiary: #0353e9,
  active-tertiary: #002d9c,
  hover-ui: #e5e5e5,
  active-ui: #c6c6c6,
  selected-ui: #e0e0e0,
  inverse-hover-ui: #4c4c4c,
  hover-selected-ui: #cacaca,
  hover-danger: #ba1b23,
  active-danger: #750e13,
  hover-row: #e5e5e5,
  visited-link: #8a3ffc,
  disabled-01: #ffffff,
  disabled-02: #c6c6c6,
  disabled-03: #8d8d8d,
  highlight: #d0e2ff,
  skeleton-01: #e5e5e5,
  skeleton-02: #c6c6c6,
  brand-01: #0f62fe,
  brand-02: #393939,
  brand-03: #0f62fe,
  active-01: #c6c6c6,
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
  interactive-01: #0f62fe,
  interactive-02: #6f6f6f,
  interactive-03: #ffffff,
  interactive-04: #4589ff,
  ui-background: #262626,
  ui-01: #393939,
  ui-02: #525252,
  ui-03: #525252,
  ui-04: #8d8d8d,
  ui-05: #f4f4f4,
  text-01: #f4f4f4,
  text-02: #c6c6c6,
  text-03: #6f6f6f,
  text-04: #ffffff,
  text-05: #8d8d8d,
  icon-01: #f4f4f4,
  icon-02: #c6c6c6,
  icon-03: #ffffff,
  link-01: #78a9ff,
  inverse-link: #0f62fe,
  field-01: #393939,
  field-02: #525252,
  inverse-01: #161616,
  inverse-02: #f4f4f4,
  support-01: #fa4d56,
  support-02: #42be65,
  support-03: #f1c21b,
  support-04: #4589ff,
  inverse-support-01: #da1e28,
  inverse-support-02: #24a148,
  inverse-support-03: #f1c21b,
  inverse-support-04: #0f62fe,
  overlay-01: rgba(22, 22, 22, 0.7),
  danger: #da1e28,
  focus: #ffffff,
  inverse-focus-ui: #0f62fe,
  hover-primary: #0353e9,
  active-primary: #002d9c,
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
  hover-danger: #ba1b23,
  active-danger: #750e13,
  hover-row: #4c4c4c,
  visited-link: #be95ff,
  disabled-01: #393939,
  disabled-02: #6f6f6f,
  disabled-03: #8d8d8d,
  highlight: #0043ce,
  skeleton-01: #353535,
  skeleton-02: #525252,
  brand-01: #0f62fe,
  brand-02: #6f6f6f,
  brand-03: #ffffff,
  active-01: #6f6f6f,
  hover-field: #4c4c4c,
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
  interactive-01: #0f62fe,
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
  text-04: #ffffff,
  text-05: #8d8d8d,
  icon-01: #f4f4f4,
  icon-02: #c6c6c6,
  icon-03: #ffffff,
  link-01: #78a9ff,
  inverse-link: #0f62fe,
  field-01: #262626,
  field-02: #393939,
  inverse-01: #161616,
  inverse-02: #f4f4f4,
  support-01: #fa4d56,
  support-02: #42be65,
  support-03: #f1c21b,
  support-04: #4589ff,
  inverse-support-01: #da1e28,
  inverse-support-02: #24a148,
  inverse-support-03: #f1c21b,
  inverse-support-04: #0f62fe,
  overlay-01: rgba(22, 22, 22, 0.7),
  danger: #da1e28,
  focus: #ffffff,
  inverse-focus-ui: #0f62fe,
  hover-primary: #0353e9,
  active-primary: #002d9c,
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
  hover-danger: #ba1b23,
  active-danger: #750e13,
  hover-row: #353535,
  visited-link: #be95ff,
  disabled-01: #262626,
  disabled-02: #525252,
  disabled-03: #6f6f6f,
  highlight: #002d9c,
  skeleton-01: #353535,
  skeleton-02: #393939,
  brand-01: #0f62fe,
  brand-02: #6f6f6f,
  brand-03: #ffffff,
  active-01: #525252,
  hover-field: #353535,
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
$carbon--theme--v9: (
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
  text-04: #ffffff,
  text-05: #5a6872,
  icon-01: #3d70b2,
  icon-02: #5a6872,
  icon-03: #ffffff,
  link-01: #3d70b2,
  inverse-link: #5596e6,
  field-01: #ffffff,
  field-02: #f4f7fb,
  inverse-01: #ffffff,
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
  danger: #da1e28,
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
  inverse-hover-ui: #4c4c4c,
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
);
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
$interactive-01: #0f62fe;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Aliased**:
  - `brand-01`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅interactive-02 [variable]

Secondary interactive color; Secondary button

<details>
<summary>Source code</summary>

```scss
$interactive-02: #393939;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Aliased**:
  - `brand-02`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅interactive-03 [variable]

4.5:1 AA contrast; Tertiary button

<details>
<summary>Source code</summary>

```scss
$interactive-03: #0f62fe;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Aliased**:
  - `brand-03`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅interactive-04 [variable]

3:1 AA contrast; Selected elements; Active elements; Accent icons

<details>
<summary>Source code</summary>

```scss
$interactive-04: #0f62fe;
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
$ui-background: #ffffff;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅ui-01 [variable]

Primary container background; Secondary page background

<details>
<summary>Source code</summary>

```scss
$ui-01: #f4f4f4;
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
$ui-02: #ffffff;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅ui-03 [variable]

Subtle border; Tertiary background color

<details>
<summary>Source code</summary>

```scss
$ui-03: #e0e0e0;
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
$ui-04: #8d8d8d;
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
$ui-05: #161616;
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
$text-01: #161616;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅text-02 [variable]

Secondary text; Input labels; Help text

<details>
<summary>Source code</summary>

```scss
$text-02: #393939;
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
$text-03: #a8a8a8;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅text-04 [variable]

Text on interactive colors

<details>
<summary>Source code</summary>

```scss
$text-04: #ffffff;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅text-05 [variable]

<details>
<summary>Source code</summary>

```scss
$text-05: #6f6f6f;
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
$icon-01: #161616;
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
$icon-02: #525252;
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
$icon-03: #ffffff;
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
$link-01: #0f62fe;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅inverse-link [variable]

<details>
<summary>Source code</summary>

```scss
$inverse-link: #78a9ff;
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
$field-01: #f4f4f4;
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
$field-02: #ffffff;
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
$inverse-01: #ffffff;
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
$inverse-02: #393939;
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
$support-01: #da1e28;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅support-02 [variable]

Success

<details>
<summary>Source code</summary>

```scss
$support-02: #24a148;
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
$support-03: #f1c21b;
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
$support-04: #0043ce;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅inverse-support-01 [variable]

Error on high contrast backgrounds

<details>
<summary>Source code</summary>

```scss
$inverse-support-01: #fa4d56;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅inverse-support-02 [variable]

Success on high contrast backgrounds

<details>
<summary>Source code</summary>

```scss
$inverse-support-02: #42be65;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅inverse-support-03 [variable]

Warning on high contrast backgrounds

<details>
<summary>Source code</summary>

```scss
$inverse-support-03: #f1c21b;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅inverse-support-04 [variable]

Information on high contrast backgrounds

<details>
<summary>Source code</summary>

```scss
$inverse-support-04: #4589ff;
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
$overlay-01: rgba(22, 22, 22, 0.5);
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅danger [variable]

<details>
<summary>Source code</summary>

```scss
$danger: #da1e28;
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
$focus: #0f62fe;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅inverse-focus-ui [variable]

<details>
<summary>Source code</summary>

```scss
$inverse-focus-ui: #ffffff;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅hover-primary [variable]

`$interactive-01` hover

<details>
<summary>Source code</summary>

```scss
$hover-primary: #0353e9;
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
$active-primary: #002d9c;
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
$hover-primary-text: #0043ce;
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
$hover-secondary: #4c4c4c;
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
$active-secondary: #6f6f6f;
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
$hover-tertiary: #0353e9;
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
$active-tertiary: #002d9c;
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
$hover-ui: #e5e5e5;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Aliased**:
  - `hover-field`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅active-ui [variable]

`$ui-01` active; `$ui-02` active

<details>
<summary>Source code</summary>

```scss
$active-ui: #c6c6c6;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Aliased**:
  - `active-01`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅selected-ui [variable]

Selected UI elements

<details>
<summary>Source code</summary>

```scss
$selected-ui: #e0e0e0;
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
$hover-selected-ui: #cacaca;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅inverse-hover-ui [variable]

<details>
<summary>Source code</summary>

```scss
$inverse-hover-ui: #4c4c4c;
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
$hover-danger: #ba1b23;
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
$active-danger: #750e13;
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
$hover-row: #e5e5e5;
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
$visited-link: #8a3ffc;
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
$disabled-01: #f4f4f4;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅disabled-02 [variable]

Disabled elements on `$disabled-01`; Disabled label; Disabled text on
`$disabled-01`; Disabled icons; Disabled border

<details>
<summary>Source code</summary>

```scss
$disabled-02: #c6c6c6;
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
$disabled-03: #8d8d8d;
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
$highlight: #d0e2ff;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅skeleton-01 [variable]

Skeleton state of graphics

<details>
<summary>Source code</summary>

```scss
$skeleton-01: #e5e5e5;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)

### ✅skeleton-02 [variable]

Skeleton state of text

<details>
<summary>Source code</summary>

```scss
$skeleton-02: #c6c6c6;
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
$brand-01: #0f62fe;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Alias**: `interactive-01`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
- **Deprecated**: This may not be available in future releases

### ✅⚠️brand-02 [variable]

<details>
<summary>Source code</summary>

```scss
$brand-02: #393939;
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
$brand-03: #0f62fe;
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
$active-01: #c6c6c6;
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
$hover-field: #e5e5e5;
```

</details>

- **Group**: [@carbon/themes](#carbonthemes)
- **Type**: `Color`
- **Alias**: `hover-ui`
- **Used by**:
  - [carbon--theme [mixin]](#carbon--theme-mixin)
- **Deprecated**: This may not be available in future releases
