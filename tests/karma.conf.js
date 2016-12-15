'use strict';

var path = require('path');

var cloptions = require('minimist')(process.argv.slice(2), {
  alias: {
    b: 'browsers',
    f: 'files',
    d: 'debug',
    v: 'verbose',
  },
  boolean: ['debug', 'verbose'],
});

module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'sinon-chai'],

    files: cloptions.files ? (Array.isArray(cloptions.files) ? cloptions.files : [cloptions.files]).map(function (file) {
      return path.relative(__dirname, path.resolve(__dirname, '..', file));
    }) : [
      'remainders.js', // For generatoring coverage report for untested files
      'spec/**/*.js',
    ],

    exclude: [],

    preprocessors: {
      'remainders.js': ['webpack', 'sourcemap'], // For generatoring coverage report for untested files
      'spec/**/*.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      devtool: 'inline-source-maps',
      module: {
        loaders: [
          {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              presets: ['es2015', 'stage-1'],
              plugins: [
                ['transform-runtime', { polyfill: false }],
                [
                  'istanbul',
                  {
                    include: [
                      'consumables/**/*.js',
                    ],
                  },
                ],
              ],
            },
          },
          {
            test: /\.html?$/,
            exclude: /node_modules/,
            loaders: ['html'],
          },
        ],
      },
    },

    webpackMiddleware: {
      noInfo: !cloptions.verbose,
      stats: cloptions.verbose ? {
        colors: true,
      } : {},
    },

    customLaunchers: {
      Chrome_Travis: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },

    plugins: [
      require('karma-mocha'),
      require('karma-sinon-chai'),
      require('karma-sourcemap-loader'),
      require('karma-mocha-reporter'),
      require('karma-coverage'),
      require('karma-webpack'),
      require('karma-phantomjs-launcher'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-safari-launcher'),
      require('karma-ie-launcher'),
    ],

    reporters: (function () {
      var reporters = ['mocha'];
      if (!cloptions.debug) {
        reporters.push('coverage');
      }
      return reporters;
    })(),

    coverageReporter: Object.assign({
      dir: 'coverage',
      reporters: [
        { type: 'html' },
        { type: 'text' },
      ],
    }, cloptions.files ? {} : {
      check: {
        each: {
          statements: 40,
          branches: 40,
          functions: 40,
          lines: 40,
          excludes: [
            // Files in this exclude list are of either:
            // - Not meeting the code coverage standard set here, which shouldn't have happened
            // - Very browser dependent code that wouldn't get code coverage unless we run the suite with Sauce Labs
            // That said, new files should never be added, except for misc code that is very broser-specific
            '../consumables/js/es2015/accordion.js',
            '../consumables/js/es2015/copy-btn.js',
            '../consumables/js/es2015/detail-page-header.js',
            '../consumables/js/es2015/inline-left-nav.js',
            '../consumables/js/es2015/left-nav.js',
            '../consumables/js/es2015/pagination.js',
            '../consumables/js/es2015/profile-switcher.js',
            '../consumables/js/es2015/search-with-options.js',
            '../consumables/js/es2015/unified-header.js',
            '../consumables/js/misc/resize.js',
            '../consumables/js/polyfills/**/*.js',
          ],
        },
      },
    }),

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,
    autoWatchBatchDelay: 400,

    browsers: (Array.isArray(cloptions.browsers) ? cloptions.browsers : [cloptions.browsers || 'PhantomJS']).map(function (browser) {
      return browser + (browser === 'Chrome' && process.env.TRAVIS ? '_Travis' : '');
    }),

    singleRun: false,

    concurrency: Infinity,
  });
};
