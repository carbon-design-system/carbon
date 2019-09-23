# Sass API

| Mark | Description                                                |
| ---- | ---------------------------------------------------------- |
| ✅   | Public functions, mixins, placeholders, and variables      |
| ❌   | Private items - not supported outside package's build      |
| ⚠️   | Deprecated items - may not be available in future releases |

<!-- toc -->

- [general](#general)
  - [❌custom-property-prefix [variable]](#custom-property-prefix-variable)
  - [❌custom-property [mixin]](#custom-property-mixin)
  - [❌should-emit [function]](#should-emit-function)

<!-- tocstop -->

## general

### ❌custom-property-prefix [variable]

<details>
<summary>Source code</summary>

```scss
$custom-property-prefix: 'cds' !default;
```

</details>

- **Group**: [general](#general)

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

- **Group**: [general](#general)

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

- **Group**: [general](#general)
