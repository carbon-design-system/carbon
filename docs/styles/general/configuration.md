## Configuration

* `$use-globals`
  - Boolean
  - Controls `@import` declarations for all global styles *except* for font-face.scss
  - Default: `True`
* `$use-fonts`:
  - Boolean
  - Controls `@import` declaration for **font-face.scss** only
  - Default: `True`
* `$font-path`:
  - String
  - A String that is interpolated to create a relative path to font files
  - Default: `'/assets/fonts'`
