var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['node_modules/@console/bluemix-components/consumables']
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('fonts', function () {
  return gulp.src('node_modules/@console/bluemix-components/**/*.{woff, woff2}')
    .pipe(gulp.dest('src/fonts'))
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['sass', 'fonts']);
