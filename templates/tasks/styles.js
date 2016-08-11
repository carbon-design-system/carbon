const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

function onError(error) {
  notify({
    title: 'Error',
    message: error.messageOriginal,
  }).write(error);

  this.emit('end');
}

gulp.task('styles', () => {
  return gulp.src('app/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/@console'],
    }))
    .pipe(prefix({
      browsers: ['> 1%', 'last 2 versions'],
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/dist/css'))
    .pipe(browserSync.stream());
});
