var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var reload = browserSync.reload;
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var scsslint = require('gulp-scss-lint');
var exec = require('child_process').exec;

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
    proxy: "http://localhost:3333",
    logPrefix: "Pattern Library"
  });
});

gulp.task('dist', function() {
  gulp.src(['dev/patterns/**/*.scss', 'dev/patterns/**/*.md'])
    .pipe(plumber())
    .pipe(gulp.dest('dist/patterns'));

  gulp.src('dev/*.scss')
    .pipe(plumber())
    .pipe(rename('_pattern-library.scss'))
    .pipe(gulp.dest('dist'));
});

gulp.task('jslint', function() {
  return gulp.src(['*.json', '*.js', 'dist/patterns/**/*.json'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('scss-lint', function() {
  gulp.src(['dev/*.scss', 'dev/patterns/**/*.scss'])
    .pipe(scsslint());
});

gulp.task('sass', function() {
  gulp.src(['dev/*.scss', 'dev/patterns/**/*.scss']) // Target scss files in these directories
    .pipe(plumber())
    .pipe(sass())              // Compile scss files to css
    .pipe(autoprefixer({       // Add vendor prefixes
      browsers: BROWSERS       // Prefixes are added based on compatibility with the BROWSERS array
    }))
    .pipe(gulp.dest('dev/patterns')) // Pipe the css file to dev folder (dev.css)
    .pipe(reload({ stream: true })); // Reload the browser (but stream when possible)
});

// Controls shutdown of nodemon
// https://github.com/remy/nodemon#controlling-shutdown-of-your-script
gulp.task('clean-server', function() {
  exec('node clean-server.js', function(err, stdout, stderr) {
    if (err) throw err;
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task('watch', function() {
  gulp.watch('dev/patterns/**/*.md', ['clean-server']);
  gulp.watch(['dev/*.scss', 'dev/patterns/**/*.scss'], ['sass', 'scss-lint', 'dist', 'clean-server']); // watch for changes on these scss files
  gulp.watch(['*.json', '*.js', 'dist/patterns/**/*.json'], ['jslint', 'clean-server']);
});

gulp.task('default', ['browser-sync', 'sass', 'dist', 'watch']);
