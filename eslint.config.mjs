// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

// TODO: There is an `eslintConfig` reference in `package.json`. Investigate
// whether it should be moved to this file or deleted.
// https://github.com/carbon-design-system/carbon/issues/18991

export default tseslint.config([
  eslint.configs.recommended,
  tseslint.configs.strict,
  {
    rules: {
      // TODO: Turn these rules back on.
      // https://github.com/carbon-design-system/carbon/issues/19007
      'no-undef': 'off',
      'no-unused-vars': 'off',
      // All of these rules have directives in the codebase that disable them,
      // which implies that they were set previously.
      'no-console': 'error',
      'no-template-curly-in-string': 'error',
      'prefer-arrow-callback': 'error',
      'require-atomic-updates': 'error',
    },
  },
  {
    files: [
      '**/tasks/**',
      'actions/**',
      'packages/cli/**',
      'packages/upgrade/**',
    ],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    // TODO: Should we ignore all files in the .gitignore? If so, handle the
    // nested .gitignore files too.
    ignores: [
      // Build folders
      '**/build/',
      '**/es/',
      '**/es-custom/',
      '**/lib/',
      '**/dist/',
      '**/umd/',

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
      'packages/upgrade/fixtures/sample-project/example-imports-to-unified-package.js',

      // React
      '**/storybook-static/**',
      'packages/react/icons/index.js',
      'packages/react/icons/index.esm.js',

      // Icons React
      'packages/icons-react/next/**',

      // Templates
      'packages/cli/src/component/templates/**',

      // Generated files.
      '**/generated/',
      'config/typescript-config-carbon/index.js',

      // TODO: Delete these ignores.
      // https://github.com/carbon-design-system/carbon/issues/18991
      // Tests.
      '**/*-test.js',
      '**/__tests__/**/*',

      // TODO: Delete these ignores.
      // https://github.com/carbon-design-system/carbon/issues/18991
      // Stories.
      '**/.storybook/**/*',
      '**/*.stories.js',
      '**/stories/**/*',

      // TODO: Delete these ignores.
      // https://github.com/carbon-design-system/carbon/issues/19012
      'packages/react/src/components/Notification/a11yIconWarningSolid.js',
      'packages/react/src/components/OverflowMenuV2/index.js',
      'packages/react/src/components/Pagination/experimental/PageSelector.js',
      'packages/react/src/components/Pagination/experimental/Pagination-story.js',
      'packages/react/src/components/Pagination/experimental/Pagination.js',
      'packages/react/src/components/Switch/IconSwitch.js',

      // TODO: Delete these ignores.
      // https://github.com/carbon-design-system/carbon/issues/19012
      'www/src/components/Flex/index.js',
      'www/src/components/Header/index.js',
      'www/src/components/Text/index.js',
      'www/src/components/WorkspaceList/index.js',
      'www/src/pages/_app.js',
      'www/src/pages/index.js',
      'www/src/pages/insights/\\[owner\\]/\\[repo\\].js',
      'www/src/pages/insights/index.js',
      'www/src/pages/packages/\\[package\\]/index.js',
      'www/src/pages/packages/index.js',

      // TODO:
      // 1. Delete this ignore.
      // 2. Delete `--no-warn-ignored` from the `lint` script in `package.json`.
      //
      // https://github.com/carbon-design-system/carbon/issues/18991
      '**/*.{ts,tsx}',
    ],
  },
]);
