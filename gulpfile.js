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
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const jsdoc = require('gulp-jsdoc3');

const webpack = require('webpack');
const babel = require('gulp-babel');
const merge = require('merge-stream');
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
    logPrefix: 'Bluemix Components',
    open: false,
    proxy: 'localhost:8080',
    reloadDelay: 500,
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

function buildScripts(options) {
  options = options || {};
  options.target = (options.target || './consumables/js/es5/bluemix-components.js')
    .replace(/\.js$/, options.prod ? '.min.js' : '.js');
  return new Promise((resolve, reject) => {
    webpack({
      devtool: 'source-maps',
      entry: options.entry || './consumables/js/es2015/index.js',
      output: Object.assign({
        path: path.dirname(options.target),
        filename: path.basename(options.target),
      }, options.noExport ? {} : {
        libraryTarget: 'var',
        library: 'BluemixComponents',
      }),
      module: {
        loaders: [
          {
            test: /\.js?$/,
            exclude: /node_modules/,
            loaders: ['babel'],
          },
        ],
      },
      plugins: options.prod ? [new webpack.optimize.UglifyJsPlugin()] : [],
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

gulp.task('scripts:consumables', () => {
  return Promise.all([
    buildScripts(), // Expanded ES5
    buildScripts({ prod: true }), // Minified ES5
  ]);
});

gulp.task('scripts:umd', () => {
  const files = './consumables/js/es2015/*.js';
  const polyfills = './consumables/js/polyfills/**/*.js';
  const utils = './consumables/js/utils/**/*.js';

  const babelOpts = {
    plugins: ['transform-es2015-modules-umd', 'transform-runtime'],
  };

  const fileStream = gulp.src(files)
    .pipe(babel(babelOpts))
    .pipe(gulp.dest('./consumables/js/umd/lib'));

  const polyfillStream = gulp.src(polyfills)
    .pipe(babel(babelOpts))
    .pipe(gulp.dest('./consumables/js/umd/polyfills'));

  const utilStream = gulp.src(utils)
    .pipe(babel(babelOpts))
    .pipe(gulp.dest('./consumables/js/umd/utils'));

  return merge(fileStream, polyfillStream, utilStream);
});


gulp.task('scripts:dev', () => {
  return Promise.all([
    buildScripts({
      target: './demo/demo.js',
      entry: './demo/index.js',
    }),
  ]);
});

//////////////////////////////
// Sass Tasks
//////////////////////////////

gulp.task('sass:consumables', () => {
  function buildStyles(prod) {
    return gulp.src('consumables/scss/styles.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: prod ? 'compressed' : 'expanded',
      }).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['> 1%', 'last 2 versions'],
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

gulp.task('sass:dev', () => {
  return gulp.src('demo/**/demo.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions'],
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

/////////////////////////////
// Lint
/////////////////////////////

// Temporary: gulp-sass-lint does not seem to be using our .sass-lint.yml
// gulp.task('lint:sass', () => {
//   return gulp.src('consumables/**/*.scss')
//     .pipe(sassLint())
//     .pipe(sassLint.format())
//     .pipe(sassLint.failOnError());
// });

gulp.task('lint:scripts', function () {
  return gulp.src([
    'consumables/js/{es2015,polyfills}/**/*.js',
    '!**/examples/**/*.js',
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(eslint.results(function(results) {
      let count = results.warningCount;
      if (count > 0) {
        throw new gutil.PluginError('gulp-eslint', {
          name: 'ESLintWarning',
          message: 'Has ' + count + ' warning' + (count > 1 ? 's' : ''),
        });
      }
    }));
});

gulp.task('lint', [/*'lint:sass',*/ 'lint:scripts']);

/////////////////////////////
// Test
/////////////////////////////

gulp.task('test', (done) => {
  new Server({
    configFile: path.resolve(__dirname, 'tests/karma.conf.js'),
    singleRun: !cloptions.keepalive,
  }, done).start();
});

/////////////////////////////
// JSDoc
/////////////////////////////

gulp.task('jsdoc', function (cb) {
  gulp.src(['README.md', 'consumables/js/es2015/**/*.js'], {read: false})
    .pipe(jsdoc(Object.assign(require('gulp-jsdoc3/dist/jsdocConfig.json'), {
      opts: {
        destination: './docs/js'
      },
    }), cb));
});

//////////////////////////////
// Running Tasks
//////////////////////////////

gulp.task('watch', () => {
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch(['consumables/**/*.js', '!**/es5/*.js'], ['scripts:dev']);
  gulp.watch(['consumables/**/*.scss', 'demo/**/*.scss'], ['sass:dev']);
});

gulp.task('serve', ['browser-sync', 'watch']);

// Use: npm run build
gulp.task('build', ['sass:consumables', 'scripts:consumables', 'scripts:umd']);
gulp.task('build:dev', ['sass:dev', 'scripts:dev']);

gulp.task('default', () => {
  console.log('\n\n Please use `$ npm run dev` and navigate to \n http://localhost:3000 to view project locally \n\n');
});
