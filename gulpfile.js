'use-strict';

//////////////////////////////
// Requires
//////////////////////////////
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var lazypipe = require('lazypipe');
var merge = require('merge-stream');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
//////////////////////////////
// Variables
//////////////////////////////

var paths = {
  clean: [
    '*.css',
    '_styles.scss',
    '_scripts.js',
    '_scripts.min.js',
  ],
  scripts: [
    'base-elements/**/*.js',
    'components/**/*.js'
  ],
  scss: {
    all: [
      'base-elements/**/*.scss',
      'components/**/*.scss',
      '*.scss'
    ],
    main: 'dev.scss'
  },
  html: './**/*.html',
  images: './**/*.{png,jpeg,jpg}'
}

var importPaths = {
  icons: '../bluemix-icons/icons',
  ibmColors: '../IBM-Design-Colors/ibm-colors'
}

//////////////////////////////
// BrowserSync
//////////////////////////////

gulp.task('browser-sync', function() {
  browserSync.init({
    logPrefix: "Bluemix Components",
    open: false,
    server: {
      baseDir: "."
    }
  });
});

//////////////////////////////
// Clean
//////////////////////////////

gulp.task('clean', function() {
  return del(paths.clean);
});

//////////////////////////////
// JavaScript Tasks
//////////////////////////////

gulp.task('scripts', function() {
  var concatOnly = gulp.src(paths.scripts)
    .pipe(concat('_scripts.js'))
    .pipe(gulp.dest('.'));

  var minify = gulp.src(paths.scripts)
    .pipe(concat('_scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('.'));

  return merge(concatOnly, minify);
});

gulp.task('scripts:hint', function() {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

//////////////////////////////
// Sass Tasks
//////////////////////////////

gulp.task('sass', function() {
  var compile = gulp.src(paths.scss.all)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.'))
    .pipe(browserSync.stream());

  var bower = gulp.src(paths.scss.main)
    .pipe(replace('bower_components/bluemix-icons/icons', importPaths.icons))
    .pipe(replace('bower_components/IBM-Design-Colors/ibm-colors', importPaths.ibmColors))
    .pipe(rename('_styles.scss'))
    .pipe(gulp.dest('.'));

  return merge(compile, bower);
});

//////////////////////////////
// Running Tasks
//////////////////////////////

gulp.task('watch', function() {
  gulp.watch(paths.html).on('change', browserSync.reload);
  gulp.watch(paths.scripts, ['scripts', 'scripts:hint']).on('change', browserSync.reload);
  gulp.watch(paths.scss.all, ['sass']);
});

gulp.task('build', function () {
  runSequence(['clean'], ['sass', 'scripts']);
});

gulp.task('default', function () {
  runSequence(['build'], ['browser-sync', 'watch']);
});
