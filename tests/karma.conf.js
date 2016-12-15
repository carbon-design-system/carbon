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
      'spec/**/*.js',
    ],

    exclude: [],

    preprocessors: {
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
              ],
            },
          },
          {
            test: /\.html?$/,
            exclude: /node_modules/,
            loaders: ['html'],
          },
        ],
        postLoaders: cloptions.debug ? [] : [
          {
            test: /\.js$/,
            exclude: /(tests|node_modules|bower_components)\//,
            loader: 'istanbul-instrumenter',
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
      require('istanbul-instrumenter-loader'),
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

    // NOTE: Line-by-line coverage detail becomes of intermediate code for now, due to:
    // https://github.com/gotwarlost/istanbul/issues/212
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
      ],
    },

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
