'use strict';

/* eslint-disable import/no-extraneous-dependencies, global-require */

const minimatch = require('minimatch');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

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
        pattern: 'css/**/*.css',
        watched: true,
        included: false,
        served: true,
      });
      files.push('tests/a11y/scan-html-files.js', 'tests/a11y/karma-setup-context.js');
      return files;
    })(),

    preprocessors: {
      'src/**/*.html': ['html2js'],
      'tests/a11y/**/*.js': ['rollup', 'sourcemap'],
    },

    rollupPreprocessor: {
      plugins: [
        resolve({
          jsnext: true,
          main: true,
        }),
        commonjs({
          include: ['node_modules/**'],
          namedExports: {
            'node_modules/bluebird/js/release/bluebird.js': ['promisify'],
          },
        }),
        babel({
          exclude: 'node_modules/**',
          runtimeHelpers: true,
          presets: [
            [
              'env',
              {
                modules: false,
                targets: {
                  browsers: ['last 1 version', 'ie >= 11'],
                },
              },
            ],
          ],
          plugins: [
            'transform-class-properties',
            ['transform-runtime', { polyfill: false }],
          ],
        }),
      ],
      format: 'iife',
      moduleName: 'test',
      sourceMap: 'inline',
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
      require('karma-rollup-plugin'),
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

