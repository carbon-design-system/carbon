# Sass

> Sass documentation for `@carbon/motion`

## Usage

The `@carbon/motion` package enables you to access motion curves and durations
built for the IBM Design Language in Sass. You can access these values directly
from the package by writing the following:

```scss
@use '@carbon/motion';

.selector {
  // Set `transition-timing-function` directly
  @include motion.motion(standard, productive);

  // Alternatively
  transition: opacity motion.motion(standard, productive);

  // Or use a duration
  transition: opacity motion.$duration-fast-01;
}
```

## API

| Name                    | Type     |
| :---------------------- | :------- |
| `$duration-fast-01`     | Duration |
| `$duration-fast-02`     | Duration |
| `$duration-moderate-01` | Duration |
| `$duration-moderate-02` | Duration |
| `$duration-slow-01`     | Duration |
| `$duration-slow-02`     | Duration |
| `$easings`              | Map      |
| `@mixin motion`         | Mixin    |
| `@function motion`      | Mixin    |
