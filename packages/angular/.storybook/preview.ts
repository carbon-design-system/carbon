/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Preview } from '@storybook/angular';

// Carbon global styles are injected via the `styles` option in angular.json
// (build-storybook target) rather than imported here, so the Angular CSS
// pipeline handles them correctly.

const preview: Preview = {
  parameters: {
    a11y: {
      engine: 'accessibility-checker',
      config: {
        rules: [
          { id: 'html_lang_exists', enabled: false },
          { id: 'page_title_exists', enabled: false },
          { id: 'skip_main_exists', enabled: false },
          { id: 'html_skipnav_exists', enabled: false },
          { id: 'aria_content_in_landmark', enabled: false },
          { id: 'aria_child_tabbable', enabled: false },
        ],
      },
    },
    controls: {
      expanded: true,
      sort: 'alpha',
      hideNoControlsWarning: true,
    },
    docs: {
      source: { excludeDecorators: true },
      codePanel: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Introduction',
          [
            'Welcome',
            'Migration',
            'Form Participation',
            'Component Registration',
          ],
          'Components',
        ],
      },
    },
  },
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Set the localization for the storybook',
      defaultValue: 'en-US',
      toolbar: {
        icon: 'globe',
        items: [
          { right: '🇺🇸', title: 'English', value: 'en-US' },
          { right: '🇩🇪', title: 'German', value: 'de-DE' },
          { right: '🇵🇸', title: 'Arabic', value: 'ar-SA' },
          { right: '🇯🇵', title: 'Japanese', value: 'ja-JP' },
        ],
      },
    },
  },
  decorators: [
    (story, context) => {
      document.documentElement.lang = context.globals['locale'] ?? 'en-US';
      return story();
    },
  ],
  tags: ['autodocs'],
};

export default preview;
