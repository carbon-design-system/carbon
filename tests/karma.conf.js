'use strict';

/* eslint-disable import/no-extraneous-dependencies, global-require */

const minimatch = require('minimatch');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const string = require('rollup-plugin-string');

function ensureArray(as) {
  return !as || Array.isArray(as) ? as : [as];
}

function flatten(a) {
  return a.reduce((result, item) => {
    if (Array.isArray(item)) {
      result.push.apply(result, flatten(item)); // eslint-disable-line prefer-spread
    } else {
      result.push(item);
    }
    return result;
  }, []);
}

const cloptions = require('minimist')(process.argv.slice(2), {
  alias: {
    b: 'browsers',
    f: 'files',
    d: 'debug',
    s: 'sauce',
    v: 'verbose',
  },
  boolean: ['debug', 'verbose'],
});

const customLaunchers = {
  sl_chrome_sierra: {
    base: 'SauceLabs',
    platform: 'OS X 10.12',
    browserName: 'chrome',
  },
  sl_chrome_linux: {
    base: 'SauceLabs',
    platform: 'Linux',
    browserName: 'chrome',
  },
  sl_chrome_win7: {
    base: 'SauceLabs',
    platform: 'Windows 7',
    browserName: 'chrome',
  },
  sl_chrome_android: {
    base: 'SauceLabs',
    platform: 'Android',
    browserName: 'chrome',
  },
  sl_firefox_sierra: {
    base: 'SauceLabs',
    platform: 'OS X 10.12',
    browserName: 'firefox',
    version: '45',
  },
  sl_firefox_linux: {
    base: 'SauceLabs',
    platform: 'Linux',
    browserName: 'firefox',
    version: '45',
  },
  sl_firefox_win7: {
    base: 'SauceLabs',
    platform: 'Windows 7',
    browserName: 'firefox',
    version: '45',
  },
  sl_safari_sierra: {
    base: 'SauceLabs',
    platform: 'OS X 10.12',
    browserName: 'safari',
    version: '10',
  },
  sl_safari_elcapitan: {
    base: 'SauceLabs',
    platform: 'OS X 10.11',
    browserName: 'safari',
    version: '10',
  },
  sl_microsoftedge_win10: {
    base: 'SauceLabs',
    version: 14,
    platform: 'Windows 10',
    browserName: 'microsoftedge',
  },
  sl_ie_win10: {
    base: 'SauceLabs',
    version: 11,
    platform: 'Windows 10',
    browserName: 'internet explorer',
  },
  sl_ie_win7: {
    base: 'SauceLabs',
    version: 11,
    platform: 'Windows 7',
    browserName: 'internet explorer',
  },
  Chrome_Travis: {
    base: 'Chrome',
    flags: ['--no-sandbox'],
  },
};

const sauceLaunchers = {
  chrome: ['sl_chrome_sierra', 'sl_chrome_linux', 'sl_chrome_win7', 'sl_chrome_android'],
  firefox: ['sl_firefox_sierra', 'sl_firefox_linux', 'sl_firefox_win7'],
  safari: ['sl_safari_sierra', 'sl_safari_elcapitan'],
  microsoftedge: ['sl_microsoftedge_win10'],
  ie: ['sl_ie_win10', 'sl_ie_win7'],
};

const travisLaunchers = {
  chrome: 'Chrome_Travis',
};

module.exports = function (config) {
  const objectToStringPolyfillPath = require.resolve('core-js/library/modules/es6.object.to-string.js');

  if (cloptions.sauce) {
    if (!process.env.TRAVIS) {
      throw new Error([
        'You need extra caution when you run Sauce testing locally.',
        'You can comment out lines here if you know what you are doing.',
      ].join(' '));
    }
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
      throw new Error('Missing SAUCE_USERNAME or SAUCE_ACCESS_KEY environment variables.');
    }
  }

  config.set({
    basePath: '..',

    frameworks: ['mocha', 'sinon-chai'],

    files: (() => {
      const list = ensureArray(cloptions.files || [
        'node_modules/core-js/modules/es6.weak-map.js', // For generatoring coverage report for untested files
        'src/{components,globals}/**/*.js', // For generatoring coverage report for untested files
        'tests/spec/**/*.js',
      ]);
      const htmlFiles = list.filter(file => minimatch(file, 'src/components/**/*.html'));
      if (htmlFiles.length > 0) {
        const explanationArgs = htmlFiles.map(file => `-f ${file}`).join(' ');
        // eslint-disable-next-line no-console
        console.warn('WARNING: The given files contain component sample HTML.');
        // eslint-disable-next-line no-console
        console.warn(`You may have wanted:\n\tgulp test:a11y ${explanationArgs}`);
      }
      list.unshift('demo/polyfills/index.js');
      return list;
    })(),

    exclude: [
      'src/globals/js/watch.js', // watch.js imports index.js, which runs automatic instantiation
    ],

    preprocessors: {
      '**/core-js/**/*.js': ['rollup', 'sourcemap'], // For generatoring coverage report for untested files
      'src/**/*.js': ['rollup', 'sourcemap'], // For generatoring coverage report for untested files
      'tests/spec/**/*.js': ['rollup', 'sourcemap'],
      'demo/polyfills/**/*.js': ['rollup', 'sourcemap'],
    },

    rollupPreprocessor: {
      plugins: [
        {
          // eslint-disable-next-line consistent-return
          load(id) {
            // core-js/library/modules/es6.object.to-string.js is a zero-length file
            if (id === objectToStringPolyfillPath) {
              return 'export default undefined';
            }
          },
        },
        resolve({
          jsnext: true,
          main: true,
        }),
        string({
          include: '**/*.html',
        }),
        commonjs({
          include: ['node_modules/**'],
          namedExports: {
            'node_modules/bluebird/js/release/bluebird.js': ['delay', 'promisify'],
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
          ].concat(cloptions.debug ? [] : [
            [
              'istanbul',
              {
                include: [
                  'src/components/**/*.js',
                ],
              },
            ],
          ]),
        }),
      ],
      format: 'iife',
      moduleName: 'test',
      sourceMap: 'inline',
    },

    customLaunchers,

    sauceLabs: {
      testName: `carbon-components #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`,
      buildLabel: `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`,
      recordScreenshots: true,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
    },

    plugins: [
      require('karma-mocha'),
      require('karma-sinon-chai'),
      require('karma-sourcemap-loader'),
      require('karma-mocha-reporter'),
      require('karma-coverage'),
      require('karma-rollup-plugin'),
      require('karma-phantomjs-launcher'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-safari-launcher'),
      require('karma-ie-launcher'),
    ].concat(cloptions.sauce ? [require('karma-sauce-launcher')] : []),

    reporters: (() => {
      const reporters = ['mocha'];
      if (!cloptions.debug) {
        reporters.push('coverage');
      }
      return reporters;
    })(),

    coverageReporter: Object.assign({
      dir: 'tests/coverage',
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
            'src/components/accordion/accordion.js',
            'src/components/copy-button/copy-button.js',
            'src/components/detail-page-header/detail-page-header.js',
            'src/components/interior-left-nav/interior-left-nav.js',
            'src/components/pagination/pagination.js',
            'src/components/search/search-with-options.js',
            'src/components/tooltip/tooltip.js',
            'src/components/unified-header/left-nav.js',
            'src/components/unified-header/profile-switcher.js',
            'src/globals/js/misc/resize.js',
          ],
        },
      },
    }),

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    browserNoActivityTimeout: 60000,

    autoWatch: true,
    autoWatchBatchDelay: 400,

    browsers: flatten(ensureArray(cloptions.browsers || 'PhantomJS')
      .map((browser) => {
        const browserLower = browser.toLowerCase();
        return (cloptions.sauce && sauceLaunchers[browserLower])
          || (process.env.TRAVIS && travisLaunchers[browserLower])
          || browser;
      })),

    singleRun: false,

    concurrency: Infinity,
  });
};

