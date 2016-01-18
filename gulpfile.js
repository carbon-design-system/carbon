'use strict';

//////////////////////////////
// Requires
//////////////////////////////

const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const lazypipe = require('lazypipe');
const merge = require('merge-stream');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const stylish = require('jshint-stylish');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const gutil = require('gulp-util');

//////////////////////////////
// Variables
//////////////////////////////

const PATHS = {
  static: 'static',
  clean: [
    'static/**/*.{css,woff,woff2,png,svg,jpeg,js,map}',
    '_styles.scss'
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
  images: 'images/**/*.{png,jpeg,jpg,svg}'
}

const importPaths = {
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
    reloadDelay: 500
  });
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'dust',
  }).on('restart', () => {
    browserSync.reload;
  });
});

process.once('SIGINT', function() {
  process.exit(0);
})

//////////////////////////////
// Clean
//////////////////////////////

gulp.task('clean', function() {
  return del(PATHS.clean);
});

//////////////////////////////
// JavaScript Tasks
//////////////////////////////

gulp.task('scripts', function(cb) {
  webpack({
    devtool: 'source-maps',
    entry: './app.js',
    output: {
      path: PATHS.static + '/js',
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

  var compile = gulp.src(PATHS.scss.all)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATHS.static + '/css'))
    .pipe(browserSync.stream());

  var bower = gulp.src(PATHS.scss.main)
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
  gulp.src(PATHS.scss.all)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

/////////////////////////////
// Copy
/////////////////////////////

gulp.task('copy:fonts', function() {
  let fonts = 'global/fonts/*.{woff,woff2}';

  return gulp.src(fonts)
    .pipe(gulp.dest(PATHS.static + '/css'));
});

gulp.task('copy:images', function() {
  return gulp.src(PATHS.images)
    .pipe(gulp.dest(PATHS.static + '/images'));
});

gulp.task('copy', ['copy:fonts', 'copy:images']);

//////////////////////////////
// Running Tasks
//////////////////////////////

gulp.task('watch', function() {
  gulp.watch(PATHS.html).on('change', browserSync.reload);
  gulp.watch(PATHS.scripts.all, ['scripts']);
  gulp.watch(PATHS.scss.all, ['sass']);
});

gulp.task('build', function () {
  runSequence('clean', ['sass', 'scripts', 'copy']);
});

gulp.task('default', function () {
  runSequence('build', 'nodemon', ['browser-sync', 'watch']);
});
