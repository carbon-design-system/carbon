/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import { configureActions } from '@storybook/addon-actions';
import { white, g10, g90, g100 } from '@carbon/themes';
import React from 'react';

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Set the localization for the storybook',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        {
          right: '🇺🇸',
          title: 'English',
          value: 'en',
        },
      ],
    },
  },
  theme: {
    name: 'Theme',
    description: 'Set the global theme for displaying components',
    defaultValue: 'white',
    toolbar: {
      icon: 'circlehollow',
      items: ['white', 'g10', 'g90', 'g100'],
    },
  },
};

export const parameters = {
  backgrounds: {
    // https://storybook.js.org/docs/react/essentials/backgrounds#grid
    grid: {
      cellSize: 8,
      opacity: 0.5,
    },
    values: [
      {
        name: 'white',
        value: white.background,
      },
      {
        name: 'g10',
        value: g10.background,
      },
      {
        name: 'g90',
        value: g90.background,
      },
      {
        name: 'g100',
        value: g100.background,
      },
    ],
  },
  controls: {
    // https://storybook.js.org/docs/react/essentials/controls#show-full-documentation-for-each-property
    expanded: true,

    // https://storybook.js.org/docs/react/essentials/controls#specify-initial-preset-color-swatches
    // presetColors: [],

    // https://storybook.js.org/docs/react/essentials/controls#sorting-controls
    sort: 'alpha',
  },
};

configureActions({
  depth: 3,
  limit: 10,
});

export const decorators = [
  (Story, context) => {
    const { theme } = context.globals;

    React.useEffect(() => {
      document.body.setAttribute('data-carbon-theme', theme);
    }, [theme]);

    return <Story {...context} />;
  },
];
