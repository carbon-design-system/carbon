var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var reload = browserSync.reload;

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

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: "http://localhost:3000",
    logPrefix: "Pattern Library"
  });
});

gulp.task('dist', function() {
  gulp.src('dev/patterns/**/*.scss')
    .pipe(plumber())
    .pipe(gulp.dest('dist/patterns'));
});

// gulp.task('dist', function() {
//   gulp.src('dev/*.scss')                   // Target scss files in this directory (dev.scss)
//     .pipe(plumber())                       // Keeps the gulp task running if there's an error
//     .pipe(rename('_pattern-library.scss')) // Rename dev.scss to pattern-library.scss
//     .pipe(gulp.dest('dist'))               // Pipe a copy of the renamed scss file to dist folder (_pattern-library.scss).
// });

gulp.task('sass', function() {
  gulp.src(['dev/*.scss', 'patterns/**/*.scss']) // Target scss files in these directories
    .pipe(plumber())
    .pipe(sass())              // Compile scss files to css
    .pipe(autoprefixer({       // Add vendor prefixes
      browsers: BROWSERS       // Prefixes are added based on compatibility with the BROWSERS array
    }))
    .pipe(gulp.dest('dev/patterns')) // Pipe the css file to dev folder (dev.css)
    .pipe(reload({ stream: true })); // Reload the browser (but stream when possible)
});

gulp.task('watch', function() {
  gulp.watch(['dev/*.scss', 'dev/patterns/**/*.scss'], ['sass', 'dist']); // watch for changes on these scss files
})

gulp.task('default', ['browser-sync', 'sass', 'dist', 'watch']);
