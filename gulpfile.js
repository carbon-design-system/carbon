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

gulp.task('sass', function() { // Main Sass task
  gulp.src('dev/*.scss')       // Target all scss files in dev folder (pattern-library.scss)
    .pipe(plumber())           // plumber() keeps the gulp task running if there's an error
    .pipe(gulp.dest('dist'))   // Pipe a copy of all scss files from dev folder to dist folder.
    .pipe(sass())              // Compile scss files to css
    .pipe(autoprefixer({       // Add vendor prefixes
      browsers: BROWSERS       // Prefixes are added based on compatibility with the BROWSERS array
    }))
    .pipe(gulp.dest('dev'))    // Pipe the css file to dev folder (pattern-library.css)
});
