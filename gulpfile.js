var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    reload = browserSync.reload
    ;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'Safari >= 7',
  'Opera >= 23',
  'iOS >= 7',
  'ChromeAndroid >= 4.4',
  'bb >= 10'
];

var SOURCE = {
  scss: '**/*.scss',
  css: '**/*.css',
  html: '**/*.html'
}

gulp.task('sass', function () {
  gulp.src(SOURCE.scss)
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
  .pipe(gulp.dest(SOURCE.css))
  .pipe(reload({ stream: true }))
  ;
});

gulp.task('browser-sync', function() {
  browserSync({
    proxy: "localhost:3000"
  })
})

gulp.task('watch-sass', ['sass', 'browser-sync'], function () {
  gulp.watch(SOURCE.scss, ['sass']);
});
