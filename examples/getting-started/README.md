# DEPRECATED :skull:

### This directory will be removed by `7.0.0`.

This is out of date and user-testing has shown that this example project is causing confusion around how to use and "get started" with Bluemix Components.

# Getting Started

This is a basic project to show you how you how to get started. Use this project as a reference for:
* Installing Dependencies
* Compiling your SCSS to CSS with gulp or grunt
* Using font files

## Install Dependencies

Install `npm` dependencies:
```
npm install
```

Install `bower` dependencies:
```
bower install
```

## Compile SCSS with Gulp or Grunt?

![gulp-or-grunt](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/5362/59478ffc-a4ec-11e5-9d64-6baea4bb7f14.png)

**Recommended:**
* Use gulp and gulp-sass
* *Or* grunt and grunt-sass

Both `grunt-sass` and `gulp-sass` use `node-sass` which is a way to compile SCSS to CSS. Using any compiler that requires ruby or gems will cause problems.

Set up your respective gulpfile.js or gruntfile.js; refer to the ones already in this project.

In case you don't have gulp or grunt installed globally, it's also recommended to make an npm script in your package.json to execute your task-runner .

Note that bluemix-components relies on [autoprefixer](https://github.com/postcss/autoprefixer)
to handle vendor prefixes. Both of the gulp and grunt examples include this plugin.

For grunt:
```
npm run grunt

# if you have grunt globally installed, simply run:

grunt
```

For gulp:
```
npm run gulp

# if you have grunt globally installed, simply run:

gulp
```

## Using Font Files

![fonts](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/5364/b9fd0be0-a4fd-11e5-9e70-3518e4a368e9.png)

*This is a temporary step that will be resolved in a future release*

Bluemix Components includes 'Helvetica Neue for IBM' as font files.
These are located in [bower_components/bluemix-components/global/fonts](https://github.ibm.com/Bluemix/bluemix-components/tree/master/global/fonts).

Use this getting-started project as a reference for how to set-up fonts to ensure that you're always serving 'Helvetica Neue for IBM'.

### Serve Fonts from Static Assets

In this getting-started project, we moved our fonts folder to public/fonts which is where we will serve static assets and files like images, css, and javascript.

```
public
├── css
│   └── main.css
└── fonts
    ├── helvetica-neue-bold-italic.woff
    ├── helvetica-neue-bold-italic.woff2
    ├── helvetica-neue-bold.woff
    ├── helvetica-neue-bold.woff2
    ├── helvetica-neue-roman-italic.woff
    ├── helvetica-neue-roman-italic.woff2
    ├── helvetica-neue-roman.woff
    └── helvetica-neue-roman.woff2
```


### Override `$font-path` variable
In `_font-face.scss` from Bluemix Components, we use a variable called `$font-path` to construct a path to a font directory; by default it's set to the current font directory within Bluemix Components.

```scss
// _font-face.scss
$font-path: '.' !default; // Default font directory, allow user override

@font-face {
  font-family: 'IBM Helvetica';
  font-style: normal;
  font-weight: 400;
  src: url('#{$font-path}/helvetica-neue-roman.woff2') format('woff2'),
       url('#{$font-path}/helvetica-neue-roman.woff') format('woff')
}

// ...truncated for brevity
```

Based on the file structure we have in this project, `$font-path` must be reset to `'../fonts'` based on the location of `main.css`.


```scss
// In main.scss
// Overrides $font-path to construct new path to this project's font directory
$font-path: '../fonts';
@import 'bower_components/bluemix-components/styles';

```

Every project is different, it's not guaranteed where a project will put its static files and its scss files, so overriding `$font-path` according to your project's file structure is very important for now.

If you have any issues getting set-up with Bluemix Components,
[create an issue](https://github.ibm.com/Bluemix/bluemix-components/issues/new) and the core-team will do their best to help you out.
