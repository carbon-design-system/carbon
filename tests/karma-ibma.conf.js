'use strict';

/* eslint-disable import/no-extraneous-dependencies, global-require */

const minimatch = require('minimatch');

const cloptions = require('minimist')(process.argv.slice(2), {
  alias: {
    b: 'browsers',
    f: 'files',
    v: 'verbose',
  },
  boolean: ['verbose'],
  default: {
    browsers: ['Firefox'],
  },
});

module.exports = function (config) {
  const browsers = (Array.isArray(cloptions.browsers) ? cloptions.browsers : [cloptions.browsers]);
  if (browsers.some(browser => browser.toLowerCase() === 'ie')) {
    console.warn('IE cannot be used for a11y testing!'); // eslint-disable-line no-console
  }

  config.set({
    basePath: '..',

    frameworks: ['mocha', 'AAT'],

    files: (() => {
      const files = (!cloptions.files || Array.isArray(cloptions.files) ? cloptions.files : [cloptions.files]) || [
        'src/**/*.html',
      ];
      const specFiles = files.filter(file => minimatch(file, 'tests/spec/**'));
      if (specFiles.length > 0) {
        const explanationArgs = specFiles.map(file => `-f ${file}`).join(' ');
        // eslint-disable-next-line no-console
        console.warn('WARNING: The given files contain unit test specs.');
        // eslint-disable-next-line no-console
        console.warn(`You may have wanted:\n\tgulp test:unit ${explanationArgs}`);
      }
      files.push({
        pattern: 'dist/**/*.css',
        watched: true,
        included: false,
        served: true,
      });
      files.push('tests/a11y/scan-html-files.js', 'tests/a11y/karma-setup-context.js');
      return files;
    })(),

    preprocessors: {
      'src/**/*.html': ['html2js'],
      'tests/a11y/**/*.js': ['webpack', 'sourcemap'],
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
                  presets: [
                    [
                      'env',
                      {
                        modules: false,
                        chrome: 'latest',
                        edge: 'latest',
                        firefox: 'latest',
                        safari: 'latest',
                        ie: '11',
                        ios: 'latest',
                      },
                    ],
                  ],
                  plugins: [
                    'transform-class-properties',
                    ['transform-runtime', { polyfill: false }],
                  ],
                },
              },
            ],
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
      require('karma-html2js-preprocessor'),
      require('karma-sourcemap-loader'),
      require('karma-mocha-reporter'),
      require('karma-webpack'),
      require('karma-phantomjs-launcher'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-safari-launcher'),
      require('@ibma/karma-ibma'), // eslint-disable-line import/no-unresolved
    ],

    reporters: ['mocha', 'AAT'],

    port: 9876,

    colors: true,

    logLevel: cloptions.verbose ? config.LOG_DEBUG : config.LOG_INFO,

    autoWatch: true,
    autoWatchBatchDelay: 400,

    browsers: (Array.isArray(cloptions.browsers) ? cloptions.browsers : [cloptions.browsers])
      .map(browser => browser + (browser === 'Chrome' && process.env.TRAVIS ? '_Travis' : '')),

    browserNoActivityTimeout: 60000,

    singleRun: false,

    concurrency: Infinity,
  });
};
