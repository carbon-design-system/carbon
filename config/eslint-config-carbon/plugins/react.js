/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // react
    'react/button-has-type': 'error',
    'react/jsx-uses-vars': 1,
    'react/jsx-uses-react': 1,
    'react/no-find-dom-node': 1,
    'react/jsx-no-useless-fragment': 2,
    'react/no-typos': 2,
    'react/sort-prop-types': 2,
    'react/forbid-component-props': [
      2,
      { forbid: [{ propName: 'style', message: 'Avoid using style prop' }] },
    ],
    'react/forbid-dom-props': [
      2,
      { forbid: [{ propName: 'style', message: 'Avoid using style prop' }] },
    ],

    // react-hooks
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': [
      2,
      {
        additionalHooks: 'useIsomorphicEffect',
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      rules: {
        'no-unused-vars': 'off', // Disabled in favor of @typescript-eslint/no-unused-vars
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-empty-function': 'off', // Disabled to support default empty functions used in PropTypes
        '@typescript-eslint/no-explicit-any': 'off', // TODO: Enable once stricter typings of internal utilities are supported
        '@typescript-eslint/ban-ts-comment': 'off', // Disabled to allow some instances where we won't be able to fix type errors
      },
    },
    // Sometimes we'll want to define a quick component in a story to use as a
    // wrapper for a component we're documenting. For example:
    //
    // function DemoComponent({ children }) {
    //   return <p>{children}</p>;
    // }
    //
    // In these cases, we don't need to handle prop type validation like we
    // would for code we ship to users.
    {
      files: ['*-story.js', '*.stories.js'],
      rules: {
        'react/display-name': 0,
        'react/prop-types': 0,
        'react/forbid-component-props': 0,
        'react/forbid-dom-props': 0,
      },
    },
    // style prop is fine to be used in internal unit testing
    {
      files: ['*.e2e.js'],
      rules: {
        'react/forbid-component-props': 0,
        'react/forbid-dom-props': 0,
      },
    },

    // When writing fixtures, we tend to focus on the specific component and
    // don't require React in scope as we never end up executing the code. The
    // fixtures are often used for asserting transformations on the file
    {
      files: ['**/fixtures/**/*.js'],
      rules: {
        'react/react-in-jsx-scope': 0,
      },
    },

    {
      files: ['*-test.js'],
      rules: {
        // We often write inline functions for certain types of props, typically
        // `render*` props. For example, `renderIcon={() => <div>test</div>}`
        'react/display-name': 0,

        // While writing tests, we often write helper components that are meant
        // to emulate a specific situation or behavior. These do not require prop
        // types as they are not shipped to end-users and are not valuable for
        // test authors.
        'react/prop-types': 0,
      },
    },
  ],
};
