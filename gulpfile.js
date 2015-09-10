'use-strict';

//////////////////////////////
// Requires
//////////////////////////////
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var stylish = require('jshint-stylish');

//////////////////////////////
// Variables
//////////////////////////////

var BROWSERS = [
  '> 5%',
  'ie > 0',
  'Firefox > 0',
  'Chrome > 0',
  'Opera > 0',
  'OperaMobile > 0',
  'OperaMini > 0',
  'Safari > 0',
  'iOS > 0',
  'Blackberry > 0',
  'Android > 0'
];

var dirs = {
  'images': 'dev/images/*.{png,jpg,jpeg}',
  'markdown': 'dev/patterns/**/*.md',
  'sass': {
    'main': 'dev/dev.scss',
    'patterns': 'dev/patterns/**/*.scss',
    'lint': [
      'dev/patterns/**/*.scss',
      'dev/dev.scss',
      '!dev/*.css'
    ]
  },
  'js': {
    'lint': [
      'Gulpfile.js',
      '*.json',
      'dev/dev.js',
      'dev/patterns/**/package.json'
    ]
  },
  'html': {
    'reload': [
      'dev/index.html',
      'dev/patterns/**/html/*.html'
    ]
  }
};

//////////////////////////////
// BrowserSync
//////////////////////////////

gulp.task('browser-sync', function() {
  browserSync.init({
    logPrefix: "Pattern Library",
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

gulp.task('jshint', function() {
  gulp.src(dirs.js.lint)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('jshint:watch', function() {
  gulp.watch(dirs.js.lint, ['jshint']);
});

gulp.task('js:reload', function() {
  gulp.watch(dirs.js.lint).on('change', browserSync.reload);
});


//////////////////////////////
// Sass Tasks
//////////////////////////////

gulp.task('sass', function() {
  gulp.src(dirs.sass.main)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: BROWSERS
    }))
    .pipe(gulp.dest('dev'))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function() {
  gulp.watch([dirs.sass.main, dirs.sass.patterns], ['sass']);
});

//////////////////////////////
// Build Tasks
//////////////////////////////

gulp.task('build:dist', function() {
  gulp.src([dirs.sass.patterns, dirs.markdown])
    .pipe(gulp.dest('dist/patterns'));

  gulp.src(dirs.sass.main)
    .pipe(rename('_pattern-library.scss'))
    .pipe(gulp.dest('dist'));

  gulp.src(dirs.images)
    .pipe(gulp.dest('dist/images'));
});

//////////////////////////////
// Running Tasks
//////////////////////////////

gulp.task('build', ['sass', 'build:dist']);

gulp.task('watch', ['sass:watch', 'jshint:watch', 'html:reload', 'js:reload']);

gulp.task('default', ['browser-sync', 'build', 'watch']);
