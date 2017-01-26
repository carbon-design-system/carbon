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
        rules: [
          {
            test: /\.js?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['es2015', 'stage-1'],
                  plugins: [['transform-runtime', { polyfill: false }]].concat(cloptions.debug ? [] : [
                    [
                      'istanbul',
                      {
                        include: [
                          'src/components/**/*.js',
                        ],
                      },
                    ],
                  ]),
                },
              },
            ],
          },
          {
            test: /\.html?$/,
            exclude: /node_modules/,
            use: ['html-loader'],
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
            '../src/components/accordion/accordion.js',
            '../src/components/buttons/copy-btn.js',
            '../src/components/detail-page-header/detail-page-header.js',
            '../src/components/inline-left-nav/inline-left-nav.js',
            '../src/components/pagination/pagination.js',
            '../src/components/search/search-with-options.js',
            '../src/components/unified-header/left-nav.js',
            '../src/components/unified-header/profile-switcher.js',
            '../src/globals/js/misc/resize.js',
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
