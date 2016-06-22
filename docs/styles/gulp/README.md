# Using SCSS with Gulp

This tutorial will help you setup a simple project that can compile SCSS from bluemix-components to CSS using `gulp`.

When you're done with this tutorial, you'll learn:
* How to set up your SCSS files with Bluemix Components (from `npm` or `bower`)
* How to compile your SCSS with Gulp.js
* How to set up your fonts

## Before We Start

:point_up: You only need to install bluemix-components from `bower` or from `npm`.

:books: See the [install docs](https://github.ibm.com/Bluemix/bluemix-components/blob/master/docs/getting-started/install.md#install-bluemix-components) for more details.

🤓 If you don't want to go through the tutorial, you can see finished example code based on how you installed bluemix-components:

- [bower-example](https://github.ibm.com/Bluemix/bluemix-components/blob/master/docs/getting-started/styles/gulp/bower-example)
- [npm-example](https://github.ibm.com/Bluemix/bluemix-components/blob/master/docs/getting-started/styles/gulp/npm-example)

## Getting Started

Use [starter-files](https://github.ibm.com/Bluemix/bluemix-components/tree/master/docs/getting-started/styles/gulp/starter-files) and install dependencies.

```
$ npm install
```

If you're using bluemix-components as a bower package, run `bower install` as well.


## File Structure

For this tutorial, use the following file-structure:

```
├── bower.json
├── dist
├── gulpfile.js
├── index.html
├── package.json
└── src
    └── styles
        └── main.scss
```

* **dist**: CSS files go here after running build task(s)
* **src/styles**: SCSS files go here
* **gulpfile.js**: SCSS related tasks go here

Your project's file structure may be different but the same concepts still apply.

## Create `gulpfile.js`

> Note: If you're working on a microservice or using bluemix-boilerplate, `gulp` or another equivalent task-runner is already set up for you to compile SCSS to CSS.

Start a **gulpfile.js** file in the root of the project and write the following:.

**gulpfile.js**
```js
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
  // Write sass task here
});

gulp.task('default', ['sass']);
```

The `sass` task is going to do a few things:
* Compile SCSS to CSS using `gulp-sass`
* Include paths to bluemix-components making `@import` statements shorter using `gulp-sass`
* Add sourcemaps for debugging using `gulp-sourcemaps`
* Add vendor prefixes with `gulp-autoprefixer`
* Move CSS files to **dist/styles** with `gulp`

The `sass` task will look a little different depending on how you install bluemix-components (`npm` or `bower`).

**bower**
```js
gulp.task('sass', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['bower_components']
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/styles'));
});
```

**npm**
```js
gulp.task('sass', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['node_modules/@console']
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/styles'));
});
```

The only difference between these two `sass` tasks is [`includePaths`](https://github.com/sass/node-sass#includepaths), which is an array of paths that is used to resolve `@import` declarations.
In other words: use `includePaths` to avoid having to write lengthy relative paths in our `@import` declarations.


## Set up `main.scss` file

In **src/scss** directory, create a **main.scss** file, which is for importing styles and fonts from bluemix-components.
This file will compile to a single main CSS file.
You can set up this file to **import all styles** OR **import individual styles.**

#### Import all styles

You can `@import` all styles from Bluemix Components from the `styles.scss` file.

```scss
@import 'bluemix-components/consumables/scss/styles';
```

#### Individual Styles

Maybe you're only using buttons and checkboxes.
You can also `@import` individual styles as you need them.

```scss
@import 'bluemix-components/consumables/scss/base-elements/buttons/buttons';
@import 'bluemix-components/consumables/scss/base-elements/checkbox/checkbox';
@import 'bluemix-components/consumables/scss/components/card/card';
@import 'bluemix-components/consumables/scss/components/modals/modals';
```

:+1: **Starting in [`6.2.0`](https://github.ibm.com/Bluemix/bluemix-components/releases/tag/6.2.0) `@import` declarations will not be duplicated.** :tada:

Each base-element and component already includes their own SCSS dependencies.


## Using Fonts

> Note: This section only applies to projects that **do not** use Bluemix.Common. Common Header takes care of font files for you.

Font files are located in [bluemix-components/consumables/assets/fonts](https://github.ibm.com/Bluemix/bluemix-components/tree/master/consumables/assets/fonts) directory.

This `$font-path` variable builds a relative path to the fonts directory.
You can see the `$font-path` in action here in [font-face.scss](https://github.ibm.com/Bluemix/bluemix-components/blob/master/consumables/scss/global/typography/font-face.scss) from bluemix-components.

```scss
// Default font directory, `!default` flag allows user override.
// (font files are configured to be served as static assets from server.js)
$font-path: '/assets/fonts' !default;

@font-face {
  font-family: 'IBM Helvetica';
  font-style: normal;
  font-weight: 300;
  src: url('#{$font-path}/helvetica-neue-light.woff2') format('woff2'),
       url('#{$font-path}/helvetica-neue-light.woff') format('woff')
}

...
```

We can override the `$font-path` variable in **main.scss** like this:

**bower**
```scss
$font-path: '../../bower_components/bluemix-components/consumables/assets/fonts';
```

**npm**
```scss
$font-path: '../../node_modules/@console/bluemix-components/consumables/assets/fonts';
```

This works, but these relative paths are quite long. We can make them shorter by making an update to our **gulpfile.js** to copy font files into our **src** and **dist** directories.

Install one more gulp dependency.

```
$ npm install gulp-rename --save
```

And update **gulpfile.js:** require `gulp-rename` and create `fonts` task.

**bower**

```js
var rename = require('gulp-rename');

gulp.task('fonts', function () {
  return gulp.src('bower_components/bluemix-components/**/*.{woff, woff2}')
    .pipe(rename({ dirname: 'fonts' }))
    .pipe(gulp.dest('src'))
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['sass', 'fonts']);
```


**npm**

```js
var rename = require('gulp-rename');

gulp.task('fonts', function () {
  return gulp.src('node_modules/@console/bluemix-components/**/*.{woff, woff2}')
    .pipe(rename({ dirname: 'fonts' }))
    .pipe(gulp.dest('src'))
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['sass', 'fonts']);
```

This `fonts` task is going to target all font files in bluemix-components, use `gulp-rename` to put them into a new folder called **fonts** and send them to **src** and **dist** directories.

This brings font files closer to our stylesheets so we can edit out `$font-path` variable to be much shorter.

```scss
$font-path: '../fonts';
```

Run `gulp` and you're done.
