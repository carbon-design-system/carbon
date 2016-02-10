'use strict';

//////////////////////////////
// Requires
//////////////////////////////

const path = require('path');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const gutil = require('gulp-util');
const Server = require('karma').Server;
const cloptions = require('minimist')(process.argv.slice(2), {
  alias: {
    k: 'keepalive',
  },
  boolean: ['keepalive'],
});

//////////////////////////////
// Variables
//////////////////////////////

const PATHS = {
  static: 'dev/static',
  clean: 'dev/static/**/*.{css,woff,woff2,png,svg,jpeg,js,map}',
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
      'dev/**/*.scss',
      '*.scss'
    ],
    main: 'styles.scss'
  },
  html: './**/*.html',
  images: 'images/**/*.{png,jpeg,jpg,svg}'
}

//////////////////////////////
// BrowserSync + Nodemon
//////////////////////////////

gulp.task('browser-sync', () => {
  browserSync.init({
    logPrefix: "Bluemix Components",
    open: false,
    proxy: 'localhost:8080',
    reloadDelay: 500
  });
});

gulp.task('nodemon', () => {
  nodemon({
    script: 'server.js',
    ext: 'dust',
  }).on('restart', () => {
    browserSync.reload;
  });
});

process.once('SIGINT', () => {
  process.exit(0);
})

//////////////////////////////
// Clean
//////////////////////////////

gulp.task('clean', () => {
  return del(PATHS.clean);
});

//////////////////////////////
// JavaScript Tasks
//////////////////////////////

gulp.task('scripts', (cb) => {
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
  }, (err, stats) => {
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

gulp.task('sass', ['sass-lint'], () => {
  return gulp.src(PATHS.scss.all)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATHS.static + '/css'))
    .pipe(browserSync.stream());
});

/////////////////////////////
// Sass Linter
// This is a WIP -- usage may break
// until SassLint is updated > 1.3.3
/////////////////////////////

gulp.task('sass-lint', () => {
  gulp.src(PATHS.scss.all)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

/////////////////////////////
// Copy
/////////////////////////////

gulp.task('copy:fonts', () => {
  let fonts = 'global/fonts/*.{woff,woff2}';

  return gulp.src(fonts)
    .pipe(gulp.dest(PATHS.static + '/css'));
});

gulp.task('copy:images', () => {
  return gulp.src(PATHS.images)
    .pipe(gulp.dest(PATHS.static + '/images'));
});

gulp.task('copy', ['copy:fonts', 'copy:images']);

/////////////////////////////
// Test
/////////////////////////////

gulp.task('test', function (done) {
  new Server({
    configFile: path.resolve(__dirname, 'tests/karma.conf.js'),
    singleRun: !cloptions.keepalive,
  }, done).start();
});

//////////////////////////////
// Running Tasks
//////////////////////////////

gulp.task('watch', () => {
  gulp.watch(PATHS.html).on('change', browserSync.reload);
  gulp.watch(PATHS.scripts.all, ['scripts']);
  gulp.watch(PATHS.scss.all, ['sass']);
});

gulp.task('build', ['clean', 'sass', 'scripts', 'copy']);

gulp.task('default', ['build', 'nodemon', 'browser-sync', 'watch']);
