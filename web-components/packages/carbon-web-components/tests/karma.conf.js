/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

const path = require('path');
const sass = require('sass');

function normalizeBrowser(browser) {
  return (
    {
      chrome: `Chrome${process.env.TRAVIS ? '_Travis' : ''}`,
      firefox: 'Firefox',
    }[browser.toLowerCase()] || browser
  );
}

module.exports = function setupKarma(config) {
  const {
    browsers,
    collectCoverage,
    noPruneShapshot,
    specs,
    random,
    updateSnapshot,
    useExperimentalFeatures,
    verbose,
  } = config.customConfig;

  config.set({
    basePath: '..',

    browsers: (browsers.length > 0 ? browsers : ['ChromeHeadless']).map(
      normalizeBrowser
    ),

    frameworks: ['jasmine', 'snapshot'],

    client: {
      jasmine: {
        random: !!random,
      },
    },

    files: [
      'src/polyfills/index.ts',
      'tests/utils/snapshot.js',
      'tests/snapshots/**/*.md',
      'tests/karma-setup-renderroot.js',
    ].concat(specs.length > 0 ? specs : ['tests/karma-test-shim.js']),

    preprocessors: {
      'src/**/*.[jt]s': ['webpack', 'sourcemap'], // For generating coverage report for untested files
      'tests/karma-test-shim.js': ['webpack', 'sourcemap'],
      'tests/spec/**/*.ts': ['webpack', 'sourcemap'],
      'tests/utils/**/*.js': ['webpack', 'sourcemap'],
      'tests/snapshots/**/*.md': ['snapshot'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-maps',
      resolve: {
        alias: {
          // In our development environment (where `carbon-web-components/es/icons` may not have been built yet),
          // we load icons from `@carbon/icons` and use a Webpack loader to convert the icons to `lit-html` version
          '@carbon/web-components/es/icons': '@carbon/icons/lib',
        },
        extensions: ['.js', '.ts'],
      },
      module: {
        rules: [
          {
            test: /@storybook[\\/]addon-/i,
            use: 'null-loader',
          },
          {
            test: /@carbon[\\/]icons[\\/]/i,
            use: [require.resolve('../tools/svg-result-carbon-icon-loader')],
          },
          {
            test: /\.ts$/,
            use: [
              {
                // Build note: Locking down `@babel/plugin-transform-typescript` to `~7.6.0`
                // given `7.7` or later versions seems to have a problem with using decorator with fields without an initializer
                loader: 'babel-loader',
                options: {
                  configFile: path.resolve(__dirname, '..', '.babelrc'),
                },
              },
            ],
          },
          !collectCoverage
            ? {}
            : {
                test: /\.[jt]s$/,
                exclude: [
                  __dirname,
                  path.resolve(__dirname, '../node_modules'),
                ],
                enforce: 'post',
                use: {
                  loader: 'istanbul-instrumenter-loader',
                  options: {
                    esModules: true,
                  },
                },
              },
          {
            test: /\.js$/,
            include: [
              __dirname,
              path.dirname(require.resolve('lit-html')),
              path.dirname(require.resolve('lit-element')),
              path.dirname(require.resolve('@webcomponents/custom-elements')),
              // `ShadyCSS` NPM package is missing its entry point file
              path.dirname(
                require.resolve('@webcomponents/shadycss/scoping-shim.min.js')
              ),
              path.dirname(require.resolve('@webcomponents/shadydom')),
              path.resolve(__dirname, '..', 'src/polyfills'),
            ],
            use: {
              loader: 'babel-loader',
              options: {
                configFile: path.resolve(__dirname, '..', '.babelrc'),
              },
            },
          },
          {
            test: /\.scss$/,
            sideEffects: true,
            use: [
              require.resolve('../tools/css-result-loader'),
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [
                    require('autoprefixer')({
                      overrideBrowserslist: ['last 1 version'],
                    }),
                  ],
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  additionalData: `
                    $feature-flags: (
                      grid: ${useExperimentalFeatures},
                      ui-shell: true,
                    );
                  `,
                  implementation: sass,
                  webpackImporter: false,
                  sassOptions: {
                    includePaths: [
                      path.resolve(__dirname, '..', 'node_modules'),
                    ],
                  },
                },
              },
            ],
          },
          {
            test: /\.mdx$/,
            use: 'null-loader',
          },
        ],
      },
    },

    webpackMiddleware: {
      noInfo: !verbose,
    },

    customLaunchers: {
      Chrome_Travis: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },

    plugins: [
      require('karma-jasmine'),
      require('karma-spec-reporter'),
      require('karma-sourcemap-loader'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-webpack'),
      require('karma-snapshot'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
    ],

    reporters: ['spec', ...(!collectCoverage ? [] : ['coverage-istanbul'])],

    coverageIstanbulReporter: {
      reports: ['html', 'text'],
      dir: path.join(__dirname, 'coverage'),
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
      verbose,
    },

    snapshot: {
      prune: !noPruneShapshot,
      update: updateSnapshot,
      pathResolver(basePath, suiteName) {
        return path.resolve(basePath, `tests/snapshots/${suiteName}.md`);
      },
    },

    port: 9876,

    colors: true,

    browserNoActivityTimeout: 60000,

    autoWatch: true,
    autoWatchBatchDelay: 400,

    logLevel: verbose ? config.LOG_DEBUG : config.LOG_INFO,

    concurrency: Infinity,
  });
};
