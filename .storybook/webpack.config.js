const path = require('path');

const useExperimentalFeatures =
  process.env.CARBON_USE_EXPERIMENTAL_FEATURES === 'true';

const replaceTable = {
  componentsX: useExperimentalFeatures,
};

module.exports = {
  module: {
    rules: [
      {
        test: /\/FeatureFlags\.js$/,
        loader: 'string-replace-loader',
        options: {
          multiple: Object.keys(replaceTable).map(key => ({
            search: `export\\s+const\\s+${key}\\s*=\\s*false`,
            replace: `export const ${key} = ${replaceTable[key]}`,
            flags: 'i',
          })),
        },
      },
      {
        test: /\-story\.jsx?$/,
        loaders: [
          {
            loader: require.resolve('@storybook/addon-storysource/loader'),
            options: {
              prettierConfig: {
                parser: 'babylon',
                printWidth: 80,
                tabWidth: 2,
                bracketSpacing: true,
                trailingComma: 'es5',
                singleQuote: true,
              },
            },
          },
        ],
        enforce: 'pre',
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { importLoaders: 2 },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: ['last 1 version', 'ie >= 11'],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, '..', 'node_modules')],
              data: `
                $feature-flags: (
                  components-x: ${useExperimentalFeatures},
                  grid: ${useExperimentalFeatures},
                  ui-shell: ${useExperimentalFeatures},
                );
              `,
            },
          },
        ],
      },
    ],
  },
};
