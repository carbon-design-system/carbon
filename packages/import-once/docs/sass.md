# Sass API

| Mark | Description                                                |
| ---- | ---------------------------------------------------------- |
| ✅   | Public functions, mixins, placeholders, and variables      |
| ❌   | Private items - not supported outside package's build      |
| ⚠️   | Deprecated items - may not be available in future releases |

<!-- toc -->

- [@carbon/import-once](#carbonimport-once)
  - [✅imported-modules [variable]](#imported-modules-variable)
  - [✅exports [mixin]](#exports-mixin)

<!-- tocstop -->

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
