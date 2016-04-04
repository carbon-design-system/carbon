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
// BrowserSync
//////////////////////////////

gulp.task('browser-sync', () => {
  browserSync.init({
    logPrefix: "Bluemix Components",
    open: false,
    proxy: 'localhost:8080',
    reloadDelay: 500
  });
});

//////////////////////////////
// Clean
//////////////////////////////

// Use: npm run prebuild
gulp.task('clean', () => {
  return del('dist/**/*.{css,js,map}');
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
        path: 'dist/js',
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

gulp.task('scripts:dist', () => {
  buildDistBundle() // Expanded ES5
  buildDistBundle(true); // Minified ES5
});

gulp.task('scripts:demo', (cb) => {
  webpack({
    devtool: 'source-maps',
    entry: './js/demo/app.js',
    output: {
      path: 'dist/demo',
      filename: 'demo.js'
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
  return gulp.src([
    'base-elements/**/*.scss',
    'components/**/*.scss',
    'scss/*.scss'
  ])
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
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
}

gulp.task('sass:dist', () => {
  buildDistSass(); // Expanded CSS
  buildDistSass(true); // Minified CSS
});

gulp.task('sass:demo', ['sass:lint'], () => {
  return gulp.src('scss/**/demo.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(rename({ dirname: '' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/demo'))
    .pipe(browserSync.stream());
});

gulp.task('sass', ['sass:dist', 'sass:demo']);

gulp.task('sass:lint', () => {
  gulp.src([
    'base-elements/**/*.scss',
    'components/**/*.scss',
    'global/**/*.scss',
    'scss/**/*.scss'
  ])
  .pipe(sassLint())
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError());
});

/////////////////////////////
// Test
/////////////////////////////

gulp.task('test', (done) => {
  new Server({
    configFile: path.resolve(__dirname, 'tests/karma.conf.js'),
    singleRun: !cloptions.keepalive,
  }, done).start();
});

//////////////////////////////
// Running Tasks
//////////////////////////////

gulp.task('watch', () => {
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch(['base-elements/**/*.js', 'components/**/*.js', 'js/**/*.js' ], ['scripts']);
  gulp.watch(['base-elements/**/*.scss', 'components/**/*.scss', 'scss/**/*.scss'], ['sass']);
});

gulp.task('serve', ['browser-sync', 'watch']);

// Use: npm run build
gulp.task('build', ['sass', 'scripts']);

gulp.task('default', () => {
  console.log('\n\n Please use `$ npm run dev` and navigate to \n http://localhost:3000 to view project locally \n\n');
});
