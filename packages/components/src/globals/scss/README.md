# `scss`

See [docs](http://carbondesignsystem.com/getting-started/developers) to get
started with Carbon SCSS.

## Usage with another design system

While we do _not_ recommend using Carbon along with another design system in one
application because doing so loses coheisiveness in your application's user
experience, you can use "selector namspacing" technique e.g. while you are
migrating from another design system to Carbon and just flipping the switch at
once is extremely hard.

Below example generates CSS files whose CSS selectors are namespaced, e.g.
`textarea` selector converted to `.carbon textarea`:

```javascript
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const prefixSelector = require('postcss-prefix-selector');

gulp.task('postcss:carbon', () =>
  gulp
    .src('node_modules/carbon-components/css/carbon-components.css')
    .pipe(
      postcss([
        prefixSelector({
          prefix: '.carbon',
          transform: (prefix, selector, prefixedSelector) => {
            const list = [prefixedSelector, selector + prefix];
            if (selector === 'html' || selector === 'body') {
              // Mimics styles to `<html>`/`<body>` with e.g. `.carbon--body`
              list.push(`${prefix}--${selector}`);
            }
            return list;
          },
        }),
      ])
    )
    .pipe(gulp.dest('dist'))
);

gulp.task('postcss:another-design-system', () =>
  gulp
    .src('node_modules/another-design-system/path/to/another-design-system.css')
    .pipe(
      postcss([
        prefixSelector({
          prefix: '.another-design-system',
          transform: (prefix, selector, prefixedSelector) => {
            const list = [prefixedSelector, selector + prefix];
            if (selector === 'html' || selector === 'body') {
              // Mimics styles to `<html>`/`<body>` with e.g. `.another-design-system--body`
              list.push(`${prefix}--${selector}`);
            }
            return list;
          },
        }),
      ])
    )
    .pipe(gulp.dest('dist'))
);

gulp.task('postcss', ['postcss:carbon', 'postcss:another-design-system']);
```

Below HTML is an example using a Carbon button is used along with a button with
another design system, using what above build step generaes:

```html
<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      type="text/css"
      href="./dist/carbon-components.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="./dist/another-design-system.css"
    />
  </head>
  <body>
    <div class="bx--body carbon--body carbon--html">
      <button class="carbon bx--btn bx--btn--primary">Carbon</button>
    </div>
    <div class="another-design-system--body another-design-system--html">
      <button class="another-design-system btn btn-primary">
        Another design system
      </button>
    </div>
  </body>
</html>
```
