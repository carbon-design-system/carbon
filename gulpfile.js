'use strict';

//////////////////////////////
// Requires
//////////////////////////////

const path = require('path');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const sequence = require('run-sequence');
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
  dist: 'dist',
  static: 'dev/static',
  clean: ['dist', 'dev/static/**/*.{css,woff,woff2,png,svg,jpeg,js,map}'],
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
    dev: [
      'dev/**/*.scss',
    ],
    dist: [
      'base-elements/**/*.scss',
      'components/**/*.scss',
      '*.scss'
    ],
    main: 'styles.scss'
  },
  html: './**/*.html',
  images: 'assets/images/**/*.{png,jpeg,jpg,svg}'
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

// For controlling exit of Nodemon (npm run serve)
process.once('SIGINT', () => {
  process.exit(0);
});

//////////////////////////////
// Clean
//////////////////////////////

gulp.task('clean', () => {
  return del(PATHS.clean);
});

//////////////////////////////
// JavaScript Tasks
//////////////////////////////

function buildDistBundle(prod) {
  return new Promise((resolve, reject) => {
    webpack({
      devtool: 'source-maps',
      entry: './js/index.js',
      output: {
        path: PATHS.dist + '/js',
        filename: 'bluemix-components' + (prod ? '.min' : '') + '.js',
        libraryTarget: 'var',
        library: 'BluemixComponents',
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
      plugins: prod ? [new webpack.optimize.UglifyJsPlugin()] : [],
    }, (err, stats) => {
      if (err) {
        reject(new gutil.PluginError('webpack', err));
      } else {
        gutil.log('[webpack]', stats.toString({
          progress: true,
          colors: true,
        }));
        resolve();
      }
    });
  });
}

gulp.task('scripts:dist:dev', () => buildDistBundle());

gulp.task('scripts:dist:prod', () => buildDistBundle(true));

gulp.task('scripts:dist', ['scripts:dist:dev', 'scripts:dist:prod']);

gulp.task('scripts:demo', (cb) => {
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

gulp.task('scripts', ['scripts:dist', 'scripts:demo']);

//////////////////////////////
// Sass Tasks
//////////////////////////////

function buildDistSass(prod) {
  return gulp.src(PATHS.scss.dist)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: prod ? 'compressed' : 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(rename(function (path) {
      if (path.basename === 'styles') {
        path.basename = 'bluemix-components';
      }
      if (prod) {
        path.extname = '.min' + path.extname;
      }
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATHS.dist + '/css'))
    .pipe(browserSync.stream());
}

gulp.task('sass:dist:dev', ['sass-lint'], () => buildDistSass());

gulp.task('sass:dist:prod', ['sass-lint'], () => buildDistSass(true));

gulp.task('sass:dist', ['sass:dist:dev', 'sass:dist:prod']);

gulp.task('sass:demo', ['sass-lint'], () => {
  return gulp.src(PATHS.scss.dev)
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

gulp.task('sass', ['sass:dist', 'sass:demo']);

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
// Images
/////////////////////////////

gulp.task('images', function() {
  return gulp.src(PATHS.images)
    .pipe(imagemin())
    .pipe(gulp.dest(PATHS.dist + '/images'));
});

/////////////////////////////
// Copy
/////////////////////////////

gulp.task('copy:fonts', () => {
  let fonts = 'assets/fonts/*.{woff,woff2}';

  return gulp.src(fonts)
    .pipe(gulp.dest(PATHS.dist + '/css'));
});

gulp.task('copy', ['copy:fonts']);

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

gulp.task('build', (cb) => {
  sequence('clean', ['sass', 'scripts', 'images', 'copy'], cb);
});

gulp.task('default', ['build', 'browser-sync', 'watch']);
