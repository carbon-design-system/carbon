'use-strict';

//////////////////////////////
// Requires
//////////////////////////////
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
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
var sassLint = require('gulp-sass-lint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
//////////////////////////////
// Variables
//////////////////////////////

var paths = {
  static: 'static',
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
// BrowserSync + Nodemon
//////////////////////////////

gulp.task('browser-sync', function() {
  browserSync.init({
    logPrefix: "Bluemix Components",
    open: false,
    proxy: 'localhost:8080',
  });
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'dust',
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
    .pipe(gulp.dest(paths.static + '/js'))
    .pipe(browserSync.stream());

  var minify = gulp.src(paths.scripts)
    .pipe(concat('_scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.static + '/js'));

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
    .pipe(gulp.dest(paths.static + '/css'))
    .pipe(browserSync.stream());

  var bower = gulp.src(paths.scss.main)
    .pipe(replace('bower_components/bluemix-icons/icons', importPaths.icons))
    .pipe(replace('bower_components/IBM-Design-Colors/ibm-colors', importPaths.ibmColors))
    .pipe(rename('_styles.scss'))
    .pipe(gulp.dest('.'));

  return merge(compile, bower);
});

/////////////////////////////
// Sass Linter
// This is a WIP -- usage may break
// until SassLint is updated > 1.3.3
/////////////////////////////

gulp.task('sass-lint', function() {
  gulp.src(paths.scss.all)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

/////////////////////////////
// Copy
/////////////////////////////

gulp.task('copy:fonts', function() {
  var fonts = 'core/fonts/*.{woff,woff2}';

  gulp.src(fonts)
    .pipe(gulp.dest(paths.static + '/css'));
});

//////////////////////////////
// Running Tasks
//////////////////////////////

gulp.task('watch', function() {
  gulp.watch(paths.html).on('change', browserSync.reload);
  gulp.watch(paths.scripts, ['scripts', 'scripts:hint']);
  gulp.watch(paths.scss.all, ['sass']);
});

gulp.task('build', function () {
  runSequence('clean', ['sass', 'scripts', 'copy:fonts']);
});

gulp.task('default', function () {
  runSequence('build', 'nodemon', ['browser-sync', 'watch']);
});
