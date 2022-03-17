'use strict';

const path = require('path');
const commander = require('commander');

const flatten = (a) =>
  a.reduce(
    (result, item) => [...result, ...(Array.isArray(item) ? item : [item])],
    []
  );
const collect = (v, a) => (a.indexOf(v) < 0 ? [...a, v] : a);
const defaultFiles = ['demo/polyfills/index.js'];
const cloptions = commander
  .option(
    '--browser [browser]',
    'Browser to test with (ChromeHeadless or Chrome)',
    collect,
    []
  )
  .option(
    '-d, --debug',
    'Disables collection of code coverage, useful for running debugger against specs or sources'
  )
  .option('--file [file]', 'Spec files to run', collect, defaultFiles)
  .option('-r, --random', 'Enable random execution order of tests')
  .option('--verbose', 'Enables verbose output')
  .parse(process.argv);
const isFilesDefault =
  cloptions.file.length === defaultFiles.length &&
  cloptions.file.every((item, i) => item === defaultFiles[i]);

const customLaunchers = {
  Chrome_Travis: {
    base: 'Chrome',
    flags: ['--no-sandbox'],
  },
  ChromeHeadless_Travis: {
    base: 'ChromeHeadless',
    flags: ['--no-sandbox'],
  },
};

const travisLaunchers = {
  chrome: 'Chrome_Travis',
};

class FeatureFlagProxyPlugin {
  /**
   * A WebPack resolver plugin that proxies module request
   * for `src/globals/js/feature-flags` to `demo/js/feature-flags`,
   * which is a file generated from `src/globals/js/feature-flags` with effective feature flag values.
   */
  constructor() {
    this.source = 'before-described-relative';
  }

  apply(resolver) {
    resolver.plugin(this.source, (request, callback) => {
      if (/feature-flags$/i.test(request.path)) {
        request.path = path.resolve(__dirname, '../demo/feature-flags');
      }
      callback();
    });
  }
}

module.exports = function (config) {
  config.set({
    basePath: '..',

    frameworks: ['jasmine'],

    client: {
      jasmine: {
        random: !!cloptions.random,
      },
    },

    files: [
      ...cloptions.file,
      ...(isFilesDefault
        ? [
            'node_modules/core-js/modules/es6.weak-map.js', // For generating coverage report for untested files
            'src/components/**/!(*.config).js', // For generating coverage report for untested files
            'src/globals/js/{misc,mixins}/**/*.js', // For generating coverage report for untested files
            // Excluding tests for removed components
            'tests/spec/**/!(carousel|data-table|fab|left-nav|lightbox|profile-switcher)_spec.js',
          ]
        : []),
    ],

    preprocessors: {
      '**/core-js/**/*.js': ['webpack', 'sourcemap'], // For generating coverage report for untested files
      'src/**/*.js': ['webpack', 'sourcemap'], // For generating coverage report for untested files
      'tests/spec/**/*.js': ['webpack', 'sourcemap'],
      'demo/polyfills/**/*.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-maps',
      resolve: {
        modules: ['node_modules'],
        plugins: [new FeatureFlagProxyPlugin()],
      },
      module: {
        rules: [
          {
            test: /\.js?$/,
            exclude: [/node_modules/, /settings\.js$/],
            loader: 'babel-loader',
            query: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: ['last 1 version', 'ie >= 11'],
                    },
                  },
                ],
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-transform-runtime',
                'dev-expression',
              ]
                .concat(
                  cloptions.debug
                    ? []
                    : [
                        [
                          'istanbul',
                          {
                            include: ['src/{components,globals}/**/*.js'],
                          },
                        ],
                      ]
                )
                .concat(['rewire']),
            },
          },
          {
            test: /settings\.js?$/,
            loader: 'babel-loader',
            query: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: ['last 1 version', 'ie >= 11'],
                    },
                  },
                ],
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-transform-runtime',
              ].concat(
                cloptions.debug
                  ? []
                  : [
                      [
                        'istanbul',
                        {
                          include: ['src/{components,globals}/**/*.js'],
                        },
                      ],
                    ]
              ),
            },
          },
          {
            test: /\.html?$/,
            loader: 'html-loader',
          },
        ],
      },
    },

    webpackMiddleware: {
      noInfo: !cloptions.verbose,
      stats: cloptions.verbose
        ? {
            colors: true,
          }
        : {},
    },

    customLaunchers,
    plugins: [
      require('karma-jasmine'),
      require('karma-spec-reporter'),
      require('karma-sourcemap-loader'),
      require('karma-coverage'),
      require('karma-webpack'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-safari-launcher'),
      require('karma-ie-launcher'),
    ],

    reporters: ['spec', ...(cloptions.debug ? [] : ['coverage'])],

    coverageReporter: Object.assign(
      {
        dir: 'tests/coverage',
        reporters: [{ type: 'html' }, { type: 'text' }],
      },
      !isFilesDefault
        ? {}
        : {
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
                  // That said, new files should never be added, except for misc code that is very browser-specific
                  'src/components/removed-component.js',
                  'src/components/carousel/carousel.js', // Removed for `v10`
                  'src/components/code-snippet/code-snippet.js',
                  'src/components/copy-button/copy-button.js',
                  'src/components/data-table/data-table.js', // Removed for `v10`
                  'src/components/detail-page-header/detail-page-header.js',
                  'src/components/fab/fab.js', // Removed for `v10`
                  'src/components/interior-left-nav/interior-left-nav.js', // Removed for `v10`
                  'src/components/lightbox/lightbox.js', // Removed for `v10`
                  'src/components/pagination/pagination.js',
                  'src/components/unified-header/left-nav.js', // Removed for `v10`
                  'src/components/unified-header/profile-switcher.js', // Removed for `v10`
                  'src/components/data-table-v2/data-table-v2.js', // to-do: remove when v9 is deprecated
                ],
              },
            },
          }
    ),

    port: 9876,

    colors: true,

    logLevel: cloptions.verbose ? config.LOG_DEBUG : config.LOG_INFO,

    browserNoActivityTimeout: 60000,

    autoWatch: true,
    autoWatchBatchDelay: 400,

    browsers: flatten(
      (cloptions.browser.length === 0
        ? ['ChromeHeadless']
        : cloptions.browser
      ).map((browser) => {
        const browserLower = browser.toLowerCase();
        return (process.env.TRAVIS && travisLaunchers[browserLower]) || browser;
      })
    ),

    singleRun: false,

    concurrency: Infinity,
  });
};
