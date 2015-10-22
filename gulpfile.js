'use-strict';

//////////////////////////////
// Requires
//////////////////////////////
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var lazypipe = require('lazypipe');
var merge = require('merge-stream');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');

//////////////////////////////
// Variables
//////////////////////////////

var dirs = {
  'images': 'dev/images/*.{png,jpg,jpeg}',
  'markdown': 'dev/docs/*.md',
  'dist': [
    'dev/**/*.{html,scss,js,md,png,jpg,jpeg}',
    '!dev/dev.scss',
    '!dev/index.html'
  ],
  'sass': {
    'main': 'dev/*.scss',
    'lint': [
      'dev/base-elements/**/*.scss',
      'dev/components/**/*.scss',
      'dev/dev.scss',
      '!dev/*.css'
    ]
  },
  'js': {
    'concat': [
      'dev/base-elements/**/*.js',
      'dev/components/**/*.js'
    ],
    'lint': [
      'Gulpfile.js',
      '*.json',
      'dev/dev.js',
      'dev/base-elements/**/*.js',
      'dev/components/**/*.js'
    ]
  },
  'html': {
    'reload': [
      'dev/index.html',
      'dev/base-elements/**/*.html',
      'dev/components/**/*.html'
    ]
  }
};

var importPath = {
  node_modules: {
    colors: '../node_modules/bluemix-colors/npm-dist/bluemix-colors',
    typography: '../node_modules/bluemix-typography/bluemix-typography'
  },
  bower_components: {
    colors: '../../bluemix-colors/bower-dist/bluemix-colors',
    typography: '../../bluemix-typography/bluemix-typography'
  }
};

//////////////////////////////
// BrowserSync
//////////////////////////////

gulp.task('browser-sync', function() {
  browserSync.init({
    logPrefix: "Bluemix Components",
    server: {
      baseDir: "./dev"
    }
  });
});

//////////////////////////////
// HTML Tasks
//////////////////////////////

gulp.task('html:reload', function() {
  gulp.watch(dirs.html.reload).on('change', browserSync.reload);
});
//////////////////////////////
// JavaScript Tasks
//////////////////////////////

gulp.task('js', function() {
  var concatOnly = gulp.src(dirs.js.concat)
    .pipe(concat('bluemix-components.js'))
    .pipe(gulp.dest('dev'));

  var minify = gulp.src(dirs.js.concat)
    .pipe(concat('bluemix-components.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dev'));

  return merge(concatOnly, minify);
});

gulp.task('js:hint', function() {
  return gulp.src(dirs.js.lint)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('js:watch', function() {
  gulp.watch(dirs.js.lint, ['js', 'js:hint']);
});

gulp.task('js:reload', function() {
  gulp.watch(dirs.js.lint).on('change', browserSync.reload);
});


//////////////////////////////
// Sass Tasks
//////////////////////////////

// Using importPaths here to properly compile dev.css for development
gulp.task('sass', function() {
  return gulp.src(dirs.sass.main)
    .pipe(replace('{PATH_TO_COLORS}', importPath.node_modules.colors))
    .pipe(replace('{PATH_TO_TYPOGRAPHY}', importPath.node_modules.typography))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(gulp.dest('dev'))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function() {
  gulp.watch(dirs.sass.lint, ['sass']);
});

//////////////////////////////
// Image Task
//////////////////////////////

gulp.task('image:watch', function() {
  gulp.watch(dirs.images, ['image']);
});

//////////////////////////////
// Dist Task
//////////////////////////////

gulp.task('dist', function() {
  var everything = gulp.src(dirs.dist)
    .pipe(gulp.dest('bower-dist'))
    .pipe(gulp.dest('npm-dist'));

  var scss_npm = gulp.src(dirs.sass.main)
    .pipe(replace('{PATH_TO_COLORS}', importPath.node_modules.colors))
    .pipe(replace('{PATH_TO_TYPOGRAPHY}', importPath.node_modules.typography))
    .pipe(rename('_bluemix-components.scss'))
    .pipe(gulp.dest('npm-dist'));

  var scss_bower = gulp.src(dirs.sass.main)
    .pipe(replace('{PATH_TO_COLORS}', importPath.bower_components.colors))
    .pipe(replace('{PATH_TO_TYPOGRAPHY}', importPath.bower_components.typography))
    .pipe(rename('_bluemix-components.scss'))
    .pipe(gulp.dest('bower-dist'));

  return merge(everything, scss_npm, scss_bower);
});

//////////////////////////////
// Running Tasks
//////////////////////////////

gulp.task('build', ['dist', 'sass', 'js']);

gulp.task('watch', ['sass:watch', 'js:watch', 'image:watch']);

gulp.task('reload', ['html:reload', 'js:reload']);

gulp.task('default', ['browser-sync', 'build', 'watch', 'reload']);
