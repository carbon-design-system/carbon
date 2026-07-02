/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * ESLint configuration for eslint-plugin-storybook
 *
 * @see https://github.com/storybookjs/eslint-plugin-storybook
 */
module.exports = {
  plugins: ['storybook'],
  overrides: [
    {
      files: ['*.stories.js', '*-story.js'],
      extends: ['plugin:storybook/recommended'],
      rules: {
        // Interactions should be awaited
        'storybook/await-interactions': 'error',

        // Pass a context when invoking play function of another story
        'storybook/context-in-play-function': 'error',

        // The component property should be set
        'storybook/csf-component': 'error',

        // Story files should have a default export
        'storybook/default-exports': 'error',

        // Deprecated hierachy separator in title property
        'storybook/hierarchy-separator': 'error',

        'storybook/no-redundant-story-name': 'error',

        // storiesOf is deprecated and should not be used
        'storybook/no-stories-of': 'error',

        // Do not define a title in meta
        'storybook/no-title-property-in-meta': 'off',

        // Stories should use PascalCase
        'storybook/prefer-pascal-case': 'error',

        // A story file must contain at least one story export
        'storybook/story-exports': 'error',

        // Use expect from @storybook/jest
        'storybook/use-storybook-expect': 'error',

        // Do not use testing-library directly on stories
        'storybook/use-storybook-testing-library': 'error',
      },
    },
  ],
};
