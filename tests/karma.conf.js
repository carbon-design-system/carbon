'use strict';

var cloptions = require('minimist')(process.argv.slice(2), {
  alias: {
    b: 'browsers',
    d: 'debug',
  },
  boolean: ['debug'],
});

module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'sinon-chai'],

    files: [
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
            loaders: ['babel'],
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

    browsers: (function () {
      if (Array.isArray(cloptions.browsers)) {
        return cloptions.browsers;
      } else if (cloptions.browsers) {
        return [cloptions.browsers];
      }
      return ['PhantomJS'];
    }()),

    singleRun: false,

    concurrency: Infinity,
  });
};
