# Sass API

| Mark | Description                                                |
| ---- | ---------------------------------------------------------- |
| ✅   | Public functions, mixins, placeholders, and variables      |
| ❌   | Private items - not supported outside package's build      |
| ⚠️   | Deprecated items - may not be available in future releases |

<!-- toc -->

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

<!-- tocstop -->

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

  // For our narrow use-case, our container hangs 16px into the gutter
  .#{$prefix}--row--narrow &,
  .#{$prefix}--grid--narrow & {
    padding-right: ($gutter / 2);
    padding-left: 0;
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

Define the width of the column for a given span and column count. A width of 0
will hide the column entirely.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--make-col($span, $columns) {
  @if $span == 0 {
    display: none;
  } @else {
    // Explicitly include `display: block` to override
    display: block;
    flex: 0 0 percentage($span / $columns);
    // Add a `max-width` to ensure content within each column does not blow out
    // the width of the column. Applies to IE10+ and Firefox. Chrome and Safari
    // do not appear to require this.
    max-width: percentage($span / $columns);
  }
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
    @include carbon--make-col-ready($gutter);
  }

  @each $breakpoint in map-keys($breakpoints) {
    $infix: carbon--breakpoint-infix($breakpoint);
    $columns: map-get(map-get($breakpoints, $breakpoint), columns);

    // Allow columns to stretch full width below their breakpoints
    @for $i from 0 through $columns {
      .#{$prefix}--col#{$infix}-#{$i} {
        @include carbon--make-col-ready($gutter);
      }
    }

    .#{$prefix}--col#{$infix},
    .#{$prefix}--col#{$infix}--auto {
      @include carbon--make-col-ready($gutter);
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

      @for $i from 0 through $columns {
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
  - [carbon--make-col [mixin]](#carbon--make-col-mixin)
  - [carbon--make-col-offset [mixin]](#carbon--make-col-offset-mixin)
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

Add `no-gutter` and `no-gutter--{start,end}` classes to the output CSS. These
classes are useful for dropping the gutter in fluid situations.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--no-gutter() {
  .#{$prefix}--no-gutter,
  .#{$prefix}--row.#{$prefix}--no-gutter [class*='#{$prefix}--col'] {
    padding-right: 0;
    padding-left: 0;
  }

  .#{$prefix}--no-gutter--start,
  .#{$prefix}--row.#{$prefix}--no-gutter--start [class*='#{$prefix}--col'] {
    padding-left: 0;
  }

  .#{$prefix}--no-gutter--end,
  .#{$prefix}--row.#{$prefix}--no-gutter--end [class*='#{$prefix}--col'] {
    padding-right: 0;
  }

  // Deprecated ☠️
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

Add `hang--start` and `hang--end` classes for a given gutter. These classes are
used alongside `no-gutter--start` and `no-gutter--end` to "hang" type.

<details>
<summary>Source code</summary>

```scss
@mixin carbon--hang($gutter: $carbon--grid-gutter) {
  .#{$prefix}--hang--start {
    padding-left: ($gutter / 2);
  }

  .#{$prefix}--hang--end {
    padding-right: ($gutter / 2);
  }

  // Deprecated ☠️
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
$carbon--aspect-ratios: (
  (16, 9),
  (9, 16),
  (2, 1),
  (1, 2),
  (4, 3),
  (3, 4),
  (1, 1)
);
```

</details>

- **Group**: [@carbon/grid](#carbongrid)
- **Type**: `List`

### ❌carbon--aspect-ratio [mixin]

Generates the CSS classname utilities for the aspect ratios

CSS Tricks article on aspect ratios and all the different ways it can be done.
https://css-tricks.com/aspect-ratio-boxes/#article-header-id-6

That article references an earlier article on the topic.
https://keithjgrant.com/posts/2017/03/aspect-ratios/

<details>
<summary>Source code</summary>

```scss
@mixin carbon--aspect-ratio($width, $height) {
  .#{$prefix}--aspect-ratio {
    position: relative;
  }

  .#{$prefix}--aspect-ratio::before {
    float: left;
    width: 1px;
    height: 0;
    margin-left: -1px;
    content: '';
  }

  .#{$prefix}--aspect-ratio::after {
    display: table;
    clear: both;
    content: '';
  }

  @each $aspect-ratio in $aspect-ratios {
    $width: nth($aspect-ratio, 1);
    $height: nth($aspect-ratio, 2);

    .#{$prefix}--aspect-ratio--#{$width}x#{$height}::before {
      padding-top: percentage($height / $width);
    }
  }

  // leaving here for legacy support
  .#{$prefix}--aspect-ratio--object {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
```

</details>

- **Parameters**:

| Name      | Description                 | Type     | Default value |
| --------- | --------------------------- | -------- | ------------- |
| `$width`  | width from an aspect ratio  | `Number` | —             |
| `$height` | height from an aspect ratio | `Number` | —             |

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
          padding-right: #{($carbon--grid-gutter / 2) + $margin};
          padding-left: #{($carbon--grid-gutter / 2) + $margin};
        }
      }
    } @else {
      @include carbon--breakpoint($name) {
        padding-right: #{($carbon--grid-gutter / 2) + $margin};
        padding-left: #{($carbon--grid-gutter / 2) + $margin};
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

  .#{$prefix}--row-padding [class*='#{$prefix}--col'],
  .#{$prefix}--col-padding {
    padding-top: $grid-gutter / 2;
    padding-bottom: $grid-gutter / 2;
  }

  .#{$prefix}--grid--condensed [class*='#{$prefix}--col'] {
    padding-top: $condensed-gutter / 2;
    padding-bottom: $condensed-gutter / 2;
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
