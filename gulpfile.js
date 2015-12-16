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
var webpack = require('webpack');
var gutil = require('gulp-util');

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
  scripts: {
    all: [
      'base-elements/**/*.js',
      'components/**/*.js',
      'app.js'
    ],
    main: 'app.js'
  },
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
    proxy: 'localhost:8080'
  });
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'dust',
  });
});

process.once('SIGINT', function() {
  process.exit(0);
})

//////////////////////////////
// Clean
//////////////////////////////

gulp.task('clean', function() {
  return del(paths.clean);
});

//////////////////////////////
// JavaScript Tasks
//////////////////////////////

gulp.task('scripts', function(cb) {
  webpack({
    entry: './app.js',
    output: {
      path: paths.static + '/js',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loaders: ['babel'],
        },
      ],
    },
  }, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      progress: true,
      colors: true
    }));
    browserSync.reload();
    cb();
  });
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
  gulp.watch(paths.scripts.all, ['scripts']);
  gulp.watch(paths.scss.all, ['sass']);
});

gulp.task('build', function () {
  runSequence('clean', ['sass', 'scripts', 'copy:fonts']);
});

gulp.task('default', function () {
  runSequence('build', 'nodemon', ['browser-sync', 'watch']);
});
