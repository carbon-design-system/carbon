module.exports = {
  module: {
    rules: [
      {
        test: /-story\.js$/,
        loaders: [
          {
            loader: require.resolve('@storybook/addon-storysource/loader'),
            options: {
              prettierConfig: {
                bracketSpacing: true,
                parser: 'babylon',
                printWidth: 80,
                singleQuote: true,
                trailingComma: 'es5',
              },
            },
          },
        ],
        enforce: 'pre',
      },
    ],
  },
};
