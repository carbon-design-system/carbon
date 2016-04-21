'use strict';

//////////////////////////////
// Requires
//////////////////////////////

const fs = require('fs');
const scssToJson = require('scss-to-json');
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
  return del([
    'consumables/css/*.css',
    'consumables/es5/*.{js,map}',
    'demo/*.{js,map}'
  ]);
});

//////////////////////////////
// JavaScript Tasks
//////////////////////////////
gulp.task('scripts:consumables', () => {
  function buildScripts(prod) {
    return new Promise((resolve, reject) => {
      webpack({
        devtool: 'source-maps',
        entry: './consumables/js/es2015/index.js',
        output: {
          path: './consumables/js/es5',
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

  return Promise.all([
    buildScripts(), // Expanded ES5
    buildScripts(true), // Minified ES5
  ]);
});

gulp.task('scripts:demo', ['scripts:consumables'], (cb) => {
  return gulp.src('consumables/js/es5/*.{js,map}')
    .pipe(gulp.dest('demo'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', ['scripts:demo']);

//////////////////////////////
// Sass Tasks
//////////////////////////////

gulp.task('sass:consumables', () => {
  function buildStyles(prod) {
    return gulp.src('consumables/scss/styles.scss')
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
      .pipe(gulp.dest('consumables/css'))
      .pipe(browserSync.stream());
  }

  buildStyles(); // Expanded CSS
  buildStyles(true); // Minified CSS
});

gulp.task('sass:demo', () => {
  return gulp.src('demo/**/demo.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(rename({ dirname: '' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('demo'))
    .pipe(browserSync.stream());
});

// Temporary 
// gulp.task('sass:json', () => {
//   const src = '_colors.scss';
//   const dest = 'colors.json';
//   const filePath = path.resolve(__dirname, `consumables/scss/global/colors/`);
//   const colors = JSON.stringify(scssToJson(`${filePath}/${src}`), null, 2);
//
//   fs.writeFile(`${filePath}/${dest}`, colors, (err) => {
//     if (err) return console.log(err);
//     console.log('colors > colors.json!');
//   });
// });

// Temporary: gulp-sass-lint does not seem to be using our .sass-lint.yml
// gulp.task('sass:lint', () => {
//   return gulp.src('consumables/**/*.scss')
//     .pipe(sassLint())
//     .pipe(sassLint.format())
//     .pipe(sassLint.failOnError());
// });

gulp.task('sass', ['sass:consumables', 'sass:demo']);

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
  gulp.watch(['consumables/**/*.js', '!**/es5/*.js'], ['scripts']);
  gulp.watch(['consumables/**/*.scss', 'demo/**/*.scss'], ['sass']);
});

gulp.task('serve', ['browser-sync', 'watch']);

// Use: npm run build
gulp.task('build', ['sass', 'scripts']);

gulp.task('default', () => {
  console.log('\n\n Please use `$ npm run dev` and navigate to \n http://localhost:3000 to view project locally \n\n');
});
