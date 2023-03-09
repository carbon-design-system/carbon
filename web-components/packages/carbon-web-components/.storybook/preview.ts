/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { white, g10, g90, g100 } from '@carbon/themes';
import container from './container';
import { breakpoints } from '@carbon/layout';
import theme from './theme';

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
        {
          right: '🇵🇸',
          title: 'Arabic',
          value: 'ar',
        },
      ],
    },
  },
  theme: {
    name: 'Theme',
    description: 'Set the global theme for displaying components',
    defaultValue: 'white',
    toolbar: {
      icon: 'paintbrush',
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

    hideNoControlsWarning: true,
  },
  darkMode: {
    current: 'light',
  },
  docs: {
    theme,
  },
  // Small (<672)
  // Medium (672 - 1056px)
  // Large (1056 - 1312px)
  // X-Large (1312 - 1584px)
  // Max (>1584)
  viewport: {
    viewports: {
      sm: {
        name: 'Small',
        styles: {
          width: breakpoints.sm.width,
          height: '100%',
        },
      },
      md: {
        name: 'Medium',
        styles: {
          width: breakpoints.md.width,
          height: '100%',
        },
      },
      lg: {
        name: 'Large',
        styles: {
          width: breakpoints.lg.width,
          height: '100%',
        },
      },
      xlg: {
        name: 'X-Large',
        styles: {
          width: breakpoints.xlg.width,
          height: '100%',
        },
      },
      Max: {
        name: 'Max',
        styles: {
          width: breakpoints.max.width,
          height: '100%',
        },
      },
    },
  },
  options: {
    storySort: (storyA, storyB) => {
      // By default, sort by the story "kind". The "kind" refers to the
      // top-level title of the story, either through Component Story Format
      // with the default export, or the `storiesOf('kind', module)` format
      if (storyA[1].kind !== storyB[1].kind) {
        return storyA[1].kind.localeCompare(storyB[1].kind);
      }

      const idA = storyA[0];
      const idB = storyB[0];

      // To story the stories, we first build up a list of matches based on
      // keywords. Each keyword has a specific weight that will be used to
      // determine order later on.
      const UNKNOWN_KEYWORD = 3;
      const keywords = new Map([
        ['welcome', 0],
        ['default', 1],
        ['usage', 2],
        ['playground', 4],
        ['development', 5],
        ['deprecated', 6],
        ['unstable', 7],
      ]);
      const matches = new Map();

      // We use this list of keywords to determine a collection of matches. By
      // default, we will look for the greatest valued matched
      for (const [keyword, weight] of keywords) {
        // If we already have a match for a given id that is greater than the
        // specific keyword we're looking for, break early
        if (matches.get(idA) > weight || matches.get(idB) > weight) {
          break;
        }

        // If we don't have a match already for either id, we check to see if
        // the id includes the keyword and assigns the relevant weight, if so
        if (idA.includes(keyword)) {
          matches.set(idA, weight);
        }

        if (idB.includes(keyword)) {
          matches.set(idB, weight);
        }
      }

      // If we have matches for either id, then we will compare the ids based on
      // the weight assigned to the matching keyword
      if (matches.size > 0) {
        const weightA = matches.get(idA) ?? UNKNOWN_KEYWORD;
        const weightB = matches.get(idB) ?? UNKNOWN_KEYWORD;
        // If we have the same weight for the ids, then we should compare them
        // using locale compare instead of by weight
        if (weightA === weightB) {
          return idA.localeCompare(idB);
        }
        return weightA - weightB;
      }

      // By default, if we have no matches we'll do a locale compare between the
      // two ids
      return idA.localeCompare(idB);
    },
  },
};

export const decorators = [
  function decoratorContainer(story, context) {
    const result = story();
    const { hasMainTag } = result as any;
    const { theme } = context.globals;

    document.documentElement.setAttribute('storybook-carbon-theme', theme);

    return container({ hasMainTag, children: result });
  },
];
