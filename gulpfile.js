var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
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
    logPrefix: "Pattern Library",
    browser: ["google chrome", "firefox", "safari"]
  });
});

gulp.task('dist', function() {
  gulp.src(['dev/*.scss', 'patterns/**/*.scss']) // Target all scss files in dev folder (pattern-library.scss)
    .pipe(plumber())           // plumber() keeps the gulp task running if there's an error
    .pipe(gulp.dest('dist'))   // Pipe a copy of all scss files from dev folder to dist folder.
});

gulp.task('sass', function() { // Main Sass task

  gulp.src(['dev/*.scss', 'patterns/**/*.scss'])
    .pipe(plumber())
    .pipe(sass())              // Compile scss files to css
    .pipe(autoprefixer({       // Add vendor prefixes
      browsers: BROWSERS       // Prefixes are added based on compatibility with the BROWSERS array
    }))
    .pipe(gulp.dest('dev/patterns')) // Pipe the css file to dev folder (pattern-library.css)
    .pipe(reload({ stream: true }));
});

gulp.task('watch', function() {
  gulp.watch(['dev/*.scss', 'dev/patterns/**/*.scss'], ['sass', 'dist']);
})

gulp.task('default', ['browser-sync', 'sass', 'dist', 'watch']);
