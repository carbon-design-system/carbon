# Sass

> Sass documentation for `@carbon/colors`

## Usage

The `@carbon/colors` package enables you to access colors from the IBM Design
Language in Sass. You can access a color directly from the package by writing
the following:

```scss
@use '@carbon/colors';

.selector {
  background: colors.$blue-50;
}
```

For a full list of colors exported, refer to the [exports](#exports) section
below.

In addition to individual colors, you can also access a `Map` of all colors from
the IBM Design Language using the `$colors` variable.

```scss
@use '@carbon/colors';

@each $swatch, $grades in colors.$colors {
  @each $grade in $grades {
    //
  }
}
```

Each key in the `$colors` map is the name of a group of colors, also known as a
swatch. The value of each entry is a `Map` where the keys are the color grade
and the values are the hex codes for the color at that grade. For example:

```scss
$colors: (
  blue: (
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
);
```

## Exports

| Name                   | Type  |
| :--------------------- | :---- |
| `$colors`              | Map   |
| `$black`               | Color |
| `$white`               | Color |
| `$black-100`           | Color |
| `$blue-10`             | Color |
| `$blue-20`             | Color |
| `$blue-30`             | Color |
| `$blue-40`             | Color |
| `$blue-50`             | Color |
| `$blue-60`             | Color |
| `$blue-70`             | Color |
| `$blue-80`             | Color |
| `$blue-90`             | Color |
| `$blue-100`            | Color |
| `$cool-gray-10`        | Color |
| `$cool-gray-20`        | Color |
| `$cool-gray-30`        | Color |
| `$cool-gray-40`        | Color |
| `$cool-gray-50`        | Color |
| `$cool-gray-60`        | Color |
| `$cool-gray-70`        | Color |
| `$cool-gray-80`        | Color |
| `$cool-gray-90`        | Color |
| `$cool-gray-100`       | Color |
| `$cyan-10`             | Color |
| `$cyan-20`             | Color |
| `$cyan-30`             | Color |
| `$cyan-40`             | Color |
| `$cyan-50`             | Color |
| `$cyan-60`             | Color |
| `$cyan-70`             | Color |
| `$cyan-80`             | Color |
| `$cyan-90`             | Color |
| `$cyan-100`            | Color |
| `$gray-10`             | Color |
| `$gray-20`             | Color |
| `$gray-30`             | Color |
| `$gray-40`             | Color |
| `$gray-50`             | Color |
| `$gray-60`             | Color |
| `$gray-70`             | Color |
| `$gray-80`             | Color |
| `$gray-90`             | Color |
| `$gray-100`            | Color |
| `$green-10`            | Color |
| `$green-20`            | Color |
| `$green-30`            | Color |
| `$green-40`            | Color |
| `$green-50`            | Color |
| `$green-60`            | Color |
| `$green-70`            | Color |
| `$green-80`            | Color |
| `$green-90`            | Color |
| `$green-100`           | Color |
| `$magenta-10`          | Color |
| `$magenta-20`          | Color |
| `$magenta-30`          | Color |
| `$magenta-40`          | Color |
| `$magenta-50`          | Color |
| `$magenta-60`          | Color |
| `$magenta-70`          | Color |
| `$magenta-80`          | Color |
| `$magenta-90`          | Color |
| `$magenta-100`         | Color |
| `$orange-10`           | Color |
| `$orange-20`           | Color |
| `$orange-30`           | Color |
| `$orange-40`           | Color |
| `$orange-50`           | Color |
| `$orange-60`           | Color |
| `$orange-70`           | Color |
| `$orange-80`           | Color |
| `$orange-90`           | Color |
| `$orange-100`          | Color |
| `$purple-10`           | Color |
| `$purple-20`           | Color |
| `$purple-30`           | Color |
| `$purple-40`           | Color |
| `$purple-50`           | Color |
| `$purple-60`           | Color |
| `$purple-70`           | Color |
| `$purple-80`           | Color |
| `$purple-90`           | Color |
| `$purple-100`          | Color |
| `$red-10`              | Color |
| `$red-20`              | Color |
| `$red-30`              | Color |
| `$red-40`              | Color |
| `$red-50`              | Color |
| `$red-60`              | Color |
| `$red-70`              | Color |
| `$red-80`              | Color |
| `$red-90`              | Color |
| `$red-100`             | Color |
| `$teal-10`             | Color |
| `$teal-20`             | Color |
| `$teal-30`             | Color |
| `$teal-40`             | Color |
| `$teal-50`             | Color |
| `$teal-60`             | Color |
| `$teal-70`             | Color |
| `$teal-80`             | Color |
| `$teal-90`             | Color |
| `$teal-100`            | Color |
| `$warm-gray-10`        | Color |
| `$warm-gray-20`        | Color |
| `$warm-gray-30`        | Color |
| `$warm-gray-40`        | Color |
| `$warm-gray-50`        | Color |
| `$warm-gray-60`        | Color |
| `$warm-gray-70`        | Color |
| `$warm-gray-80`        | Color |
| `$warm-gray-90`        | Color |
| `$warm-gray-100`       | Color |
| `$white-0`             | Color |
| `$yellow-10`           | Color |
| `$yellow-20`           | Color |
| `$yellow-30`           | Color |
| `$yellow-40`           | Color |
| `$yellow-50`           | Color |
| `$yellow-60`           | Color |
| `$yellow-70`           | Color |
| `$yellow-80`           | Color |
| `$yellow-90`           | Color |
| `$yellow-100`          | Color |
| `$white-hover`         | Color |
| `$black-hover`         | Color |
| `$blue-10-hover`       | Color |
| `$blue-20-hover`       | Color |
| `$blue-30-hover`       | Color |
| `$blue-40-hover`       | Color |
| `$blue-50-hover`       | Color |
| `$blue-60-hover`       | Color |
| `$blue-70-hover`       | Color |
| `$blue-80-hover`       | Color |
| `$blue-90-hover`       | Color |
| `$blue-100-hover`      | Color |
| `$cool-gray-10-hover`  | Color |
| `$cool-gray-20-hover`  | Color |
| `$cool-gray-30-hover`  | Color |
| `$cool-gray-40-hover`  | Color |
| `$cool-gray-50-hover`  | Color |
| `$cool-gray-60-hover`  | Color |
| `$cool-gray-70-hover`  | Color |
| `$cool-gray-80-hover`  | Color |
| `$cool-gray-90-hover`  | Color |
| `$cool-gray-100-hover` | Color |
| `$cyan-10-hover`       | Color |
| `$cyan-20-hover`       | Color |
| `$cyan-30-hover`       | Color |
| `$cyan-40-hover`       | Color |
| `$cyan-50-hover`       | Color |
| `$cyan-60-hover`       | Color |
| `$cyan-70-hover`       | Color |
| `$cyan-80-hover`       | Color |
| `$cyan-90-hover`       | Color |
| `$cyan-100-hover`      | Color |
| `$gray-10-hover`       | Color |
| `$gray-20-hover`       | Color |
| `$gray-30-hover`       | Color |
| `$gray-40-hover`       | Color |
| `$gray-50-hover`       | Color |
| `$gray-60-hover`       | Color |
| `$gray-70-hover`       | Color |
| `$gray-80-hover`       | Color |
| `$gray-90-hover`       | Color |
| `$gray-100-hover`      | Color |
| `$green-10-hover`      | Color |
| `$green-20-hover`      | Color |
| `$green-30-hover`      | Color |
| `$green-40-hover`      | Color |
| `$green-50-hover`      | Color |
| `$green-60-hover`      | Color |
| `$green-70-hover`      | Color |
| `$green-80-hover`      | Color |
| `$green-90-hover`      | Color |
| `$green-100-hover`     | Color |
| `$magenta-10-hover`    | Color |
| `$magenta-20-hover`    | Color |
| `$magenta-30-hover`    | Color |
| `$magenta-40-hover`    | Color |
| `$magenta-50-hover`    | Color |
| `$magenta-60-hover`    | Color |
| `$magenta-70-hover`    | Color |
| `$magenta-80-hover`    | Color |
| `$magenta-90-hover`    | Color |
| `$magenta-100-hover`   | Color |
| `$orange-10-hover`     | Color |
| `$orange-20-hover`     | Color |
| `$orange-30-hover`     | Color |
| `$orange-40-hover`     | Color |
| `$orange-50-hover`     | Color |
| `$orange-60-hover`     | Color |
| `$orange-70-hover`     | Color |
| `$orange-80-hover`     | Color |
| `$orange-90-hover`     | Color |
| `$orange-100-hover`    | Color |
| `$purple-10-hover`     | Color |
| `$purple-20-hover`     | Color |
| `$purple-30-hover`     | Color |
| `$purple-40-hover`     | Color |
| `$purple-50-hover`     | Color |
| `$purple-60-hover`     | Color |
| `$purple-70-hover`     | Color |
| `$purple-80-hover`     | Color |
| `$purple-90-hover`     | Color |
| `$purple-100-hover`    | Color |
| `$red-10-hover`        | Color |
| `$red-20-hover`        | Color |
| `$red-30-hover`        | Color |
| `$red-40-hover`        | Color |
| `$red-50-hover`        | Color |
| `$red-60-hover`        | Color |
| `$red-70-hover`        | Color |
| `$red-80-hover`        | Color |
| `$red-90-hover`        | Color |
| `$red-100-hover`       | Color |
| `$teal-10-hover`       | Color |
| `$teal-20-hover`       | Color |
| `$teal-30-hover`       | Color |
| `$teal-40-hover`       | Color |
| `$teal-50-hover`       | Color |
| `$teal-60-hover`       | Color |
| `$teal-70-hover`       | Color |
| `$teal-80-hover`       | Color |
| `$teal-90-hover`       | Color |
| `$teal-100-hover`      | Color |
| `$warm-gray-10-hover`  | Color |
| `$warm-gray-20-hover`  | Color |
| `$warm-gray-30-hover`  | Color |
| `$warm-gray-40-hover`  | Color |
| `$warm-gray-50-hover`  | Color |
| `$warm-gray-60-hover`  | Color |
| `$warm-gray-70-hover`  | Color |
| `$warm-gray-80-hover`  | Color |
| `$warm-gray-90-hover`  | Color |
| `$warm-gray-100-hover` | Color |
| `$yellow-10-hover`     | Color |
| `$yellow-20-hover`     | Color |
| `$yellow-30-hover`     | Color |
| `$yellow-40-hover`     | Color |
| `$yellow-50-hover`     | Color |
| `$yellow-60-hover`     | Color |
| `$yellow-70-hover`     | Color |
| `$yellow-80-hover`     | Color |
| `$yellow-90-hover`     | Color |
| `$yellow-100-hover`    | Color |
