var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

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

gulp.task('sass', function() {
  gulp.src(['dist', 'patterns/**/*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({ browsers: BROWSERS }))
    .pipe(gulp.dest(['./', 'patterns/**/']))
})
