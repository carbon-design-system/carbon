# Detail Page Header

![detail-page-header](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/6272/6ee7f358-b5fc-11e5-8234-635bcd6a1724.png)

## Dependencies:

```scss
// Path to bower_components
// (edit according to your file structure)
$path: 'bower_components/bluemix-components';

// Global
@import '#{path}/global/colors/colors';         // variables
@import '#{path}/global/fonts/font-face';       // woff and woff2 files
@import '#{path}/global/typography/typography'; // type mixin, em and rem functions
@import '#{path}/global/layout/grid';           // breakpoint mixin

// Components
@import '#{path}/components/detail-page-header/detail-page-header';
```

### Sass

* **Colors**:
  - $color__white
  - $color__blue-20
  - $color__blue-30
  - $color__navy-gray-2
  - $color__navy-gray-6

* **Breakpoint**:
  - [`@include breakpoint(px)`](https://github.ibm.com/Bluemix/bluemix-components/blob/master/global/layout/_grid.scss#L16)
* **Typography**:
  - `@include type(px)`
  - `rem(px)`
  - `em(px)`

### Assets

* **Icons**:
  - arrow--left.svg (temporary)
  - gear.svg (temporary)
