'use-strict';

//////////////////////////////
// Requires
//////////////////////////////
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
// var exec = require('child_process').exec;
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sasslint = require('gulp-sass-lint');
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
  'images': 'dev/images/*.png',
  'markdown': 'dev/patterns/**/*.md',
  'sass': {
    'main': 'dev/dev.scss',
    'patterns': 'dev/patterns/**/*.scss',
    'lint':[
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
browserSync = browserSync.create();
var reload = browserSync.reload;

gulp.task('reload', reload);

gulp.task('browser-sync', function() {
  browserSync.init({
    logPrefix: "Pattern Library",
    server: {
      baseDir: "./dev"
    }
  });
});

//////////////////////////////
// JavaScript Tasks
//////////////////////////////

gulp.task('eslint', function() {
  gulp.src(dirs.js.lint)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('eslint:watch', function() {
  gulp.watch(dirs.js.lint, ['eslint']);
});

//////////////////////////////
// Sass Tasks
//////////////////////////////

// Compile and prefix Sass code into CSS,
// then reload the browser (stream when possible).
gulp.task('sass', function() {
  gulp.src(dirs.sass.main)
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: BROWSERS
    }))
    .pipe(gulp.dest('dev'))
    .pipe(browserSync.stream());
});

gulp.task('sass:lint', function() {
  gulp.src(dirs.sass.lint)
    .pipe(sasslint())
    .pipe(sasslint.format());
});

gulp.task('sass:watch', function() {
  gulp.watch([dirs.sass.main, dirs.sass.patterns], ['sass', 'sass:lint']);
});

// Get the patterns ready for distribution
gulp.task('build:dist', function() {
  gulp.src([dirs.sass.patterns, dirs.markdown])
    .pipe(gulp.dest('dist/patterns'));

  gulp.src(dirs.sass.main)
    .pipe(rename('_pattern-library.scss'))
    .pipe(gulp.dest('dist'));

  gulp.src(dirs.images)
    .pipe(gulp.dest('dist/images'));
});

// Watch for changes on these files
// Run these specific tasks when files change.
gulp.task('watch', function() {
  gulp.watch(['dev/patterns/**/html/*.html', 'dev/patterns/*.html']).on('change', reload);
  gulp.watch(['*.json', '*.js', 'dist/patterns/**/*.json', 'dev/patterns/*.js'], ['eslint']).on('change', reload);
  gulp.watch(['dev/*.scss', 'dev/patterns/**/*.scss'], ['sass', 'build:dist']);
  // If you have scss-lint:
  // gulp.watch(['dev/*.scss', 'dev/patterns/**/*.scss'], ['sass', 'scss-lint', 'dist']);
});

// Default task -- run these tasks.
gulp.task('default', ['browser-sync', 'sass', 'build:dist', 'watch']);
