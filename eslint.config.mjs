export default [
  {
    languageOptions: {
      parser: {
        meta: {
          name: 'Ignore Without Parsing',
        },

        // Ignore Paring error
        parse: function () {
          return {
            type: 'Program',
            loc: {},
            comments: [],
            range: [0, 0],
            body: [],
            tokens: [],
          };
        },
      },
    },
  },

  {
    ignores: [
      // Build folders
      '/build',
      'packages/*/build/',
      'packages/*/examples/*/build/',
      'es',
      'lib',
      'dist',
      'umd',

      'node_modules',
      'packages/*/examples/*',

      // Components
      'packages/components/demo/*.css',
      'packages/components/demo/*.map',
      'packages/components/demo/*.js',
      'packages/components/demo/js/prism.js',
      'packages/components/demo/hot',
      '!packages/components/demo/index.js', // This negation might need manual handling
      'packages/components/dist',
      'packages/components/tests/a11y-results',
      'packages/components/tests/coverage',
      'packages/components/es',
      'packages/components/umd',
      'packages/components/scripts',
      'packages/components/css',
      'packages/components/scss',
      'packages/components/html',
      'packages/components/docs/js',
      'packages/components/node_modules',
      'packages/components/scss/globals/vendor/**',
      'packages/components/src/globals/scss/vendor/**',

      // Upgrade
      '**/__testfixtures__/**',
      'packages/upgrade/cli.js',

      // React
      '**/storybook-static/**',
      'packages/react/icons/index.js',
      'packages/react/icons/index.esm.js',

      // Icons React
      'packages/icons-react/next/**',

      // Templates
      'packages/cli/src/component/templates/**',
    ],
  },
];
