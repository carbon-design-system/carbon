var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var reload = browserSync.reload;
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var stylish = require('jshint-stylish');

// Target these browsers for adding vendor prefixes to CSS
var BROWSERS = [
  "> 5%",
  "ie > 0",
  "Firefox > 0",
  "Chrome > 0",
  "Opera > 0",
  "OperaMobile > 0",
  "OperaMini > 0",
  "Safari > 0",
  "iOS > 0",
  "Blackberry > 0",
  "Android > 0"
];

// Initialize browser-sync and proxy web server
gulp.task('browser-sync', function() {
  browserSync.init({
    logPrefix: "Pattern Library",
    server: {
      baseDir: "./dev/patterns"
    }
  });
});

// Get the patterns ready for distribution
gulp.task('dist', function() {
  gulp.src(['dev/patterns/**/*.scss', 'dev/patterns/**/*.md'])
    .pipe(plumber())
    .pipe(gulp.dest('dist/patterns'));

  gulp.src('dev/*.scss')
    .pipe(plumber())
    .pipe(rename('_pattern-library.scss'))
    .pipe(gulp.dest('dist'));
});

// Lint JavaScript and JSON files.
gulp.task('jslint', function() {
  return gulp.src(['*.json', '*.js', 'dist/patterns/**/*.json'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Full Browser Reload (HTML, JS, JSON files)
gulp.task('reload', reload);

// Lint Sass files (.scss)
gulp.task('scss-lint', function() {
  gulp.src(['dev/*.scss', 'dev/patterns/**/*.scss'])
    .pipe(scsslint());
});

// Compile and prefix Sass code into CSS,
// then reload the browser (stream when possible).
gulp.task('sass', function() {
  gulp.src(['dev/*.scss', 'dev/patterns/**/*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: BROWSERS
    }))
    .pipe(gulp.dest('dev/patterns'))
    .pipe(browserSync.stream());
});

// Watch for changes on these files
// Run these specific tasks when files change.
gulp.task('watch', function() {
  gulp.watch('dev/patterns/**/html/*.html').on('change', reload);
  gulp.watch(['*.json', '*.js', 'dev/patterns/**/*.js','dist/patterns/**/*.json'], ['jslint']).on('change', reload);
  gulp.watch(['dev/*.scss', 'dev/patterns/**/*.scss'], ['sass', 'scss-lint', 'dist']);
});

// Default task -- run these tasks.
gulp.task('default', ['browser-sync', 'sass', 'dist', 'watch']);
