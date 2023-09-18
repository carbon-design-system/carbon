/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
} from '@storybook/blocks';

import './styles.scss';
import '../src/feature-flags';

import { white, g10, g90, g100 } from '@carbon/themes';
import React from 'react';
import { breakpoints } from '@carbon/layout';
import { GlobalTheme } from '../src/components/Theme';
import { Layout } from '../src/components/Layout';

import theme from './theme';

const devTools = {
  layoutSize: {
    description: "Set the layout context's size",
    defaultValue: false,
    toolbar: {
      title: 'dev :: unstable__Layout size',
      items: [
        {
          value: false,
          title: 'None',
        },
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
      ],
    },
  },
  layoutDensity: {
    description: "Set the layout context's density",
    defaultValue: false,
    toolbar: {
      title: 'dev :: unstable__Layout density',
      items: [
        {
          value: false,
          title: 'None',
        },
        'condensed',
        'normal',
      ],
    },
  },
};

const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Set the localization for the storybook',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      title: 'Locale',
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
  dir: {
    name: 'Text direction',
    description: 'Set the text direction for the story',
    defaultValue: 'ltr',
    toolbar: {
      icon: 'transfer',
      title: 'Text direction',
      items: [
        {
          right: '🔄',
          title: 'auto',
          value: 'auto',
        },
        {
          right: '➡️',
          title: 'left-to-right (ltr)',
          value: 'ltr',
        },
        {
          right: '⬅️',
          title: 'right-to-left (rtl)',
          value: 'rtl',
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
      title: 'Theme',
      items: ['white', 'g10', 'g90', 'g100'],
    },
  },
  ...(process.env.NODE_ENV === 'development' ? devTools : {}),
};

const parameters = {
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
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Primary />
        <ArgsTable />
        <Stories includePrimary={false} />
      </>
    ),
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
      const isUsingV6Store = process.env.STORYBOOK_STORE_7 === 'false';

      const idA = isUsingV6Store ? storyA[1].id : storyA.id;
      const idB = isUsingV6Store ? storyB[1].id : storyB.id;
      const titleA = isUsingV6Store ? storyA[1].title : storyA.title;
      const titleB = isUsingV6Store ? storyB[1].title : storyB.title;

      if (idA.includes('welcome')) {
        return -1;
      }
      if (idB.includes('welcome')) {
        return 1;
      }

      // By default, sort by the top-level title of the story
      if (titleA !== titleB) {
        if (idA.includes('overview') && !idB.includes('overview')) {
          return -1;
        }
        if (idB.includes('overview') && !idA.includes('overview')) {
          return 1;
        }
        return titleA.localeCompare(titleB);
      }

      // To sort the stories, we first build up a list of matches based on
      // keywords. Each keyword has a specific weight that will be used to
      // determine order later on.
      const UNKNOWN_KEYWORD = 4;
      const keywords = new Map([
        ['welcome', 0],
        ['overview', 1],
        ['default', 2],
        ['usage', 3],
        ['playground', 5],
        ['development', 6],
        ['deprecated', 7],
        ['unstable', 8],
      ]);
      const matches = new Map();

      // We use this list of keywords to determine a collection of matches. By
      // default, we will look for the greatest valued matched
      for (const [keyword, weight] of keywords) {
        // If we already have a match for a given id that is lesser than the
        // specific keyword we're looking for, break early
        if (matches.get(idA) < weight || matches.get(idB) < weight) {
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

const decorators = [
  (Story, context) => {
    const { layoutDensity, layoutSize, locale, dir, theme } = context.globals;
    const [randomKey, setRandomKey] = React.useState(1);

    React.useEffect(() => {
      document.documentElement.setAttribute('data-carbon-theme', theme);
    }, [theme]);

    React.useLayoutEffect(() => {
      document.documentElement.lang = locale;
      document.documentElement.dir = dir;
      // Need to set random key to recalculate Popover coordinates
      setRandomKey(Math.floor(Math.random() * 10));
    }, [locale, dir]);

    return (
      <GlobalTheme theme={theme}>
        <Layout size={layoutSize || null} density={layoutDensity || null}>
          <Story key={randomKey} {...context} />
        </Layout>
      </GlobalTheme>
    );
  },
];

const preview = {
  parameters,
  decorators,
  globalTypes,
};

export default preview;
