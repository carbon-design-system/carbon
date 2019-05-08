# Sass API

| Mark | Description                                                |
| ---- | ---------------------------------------------------------- |
| ✅   | Public functions, mixins, placeholders, and variables      |
| ❌   | Private items - not supported outside package's build      |
| ⚠️   | Deprecated items - may not be available in future releases |

<!-- toc -->

- [@carbon/icons](#carbonicons)
  - [✅carbon--icons [mixin]](#carbon--icons-mixin)

<!-- tocstop -->

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
