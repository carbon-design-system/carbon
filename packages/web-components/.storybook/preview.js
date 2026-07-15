/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { setCustomElementsManifest } from '@storybook/web-components-vite';
import customElements from '../custom-elements.json';
import container from './container';
import { white, g10, g90, g100 } from '@carbon/themes';
import { breakpoints } from '@carbon/layout';
import theme from './theme';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './_container.scss';

setCustomElementsManifest(customElements);
const devTools = {
  layoutSize: {
    description: "Set the layout context's size",
    defaultValue: false,
    toolbar: {
      title: 'dev :: preview__Layout size',
      items: [
        { value: false, title: 'None' },
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
      title: 'dev :: preview__Layout density',
      items: [{ value: false, title: 'None' }, 'condensed', 'normal'],
    },
  },
};

// always use full locale code strings for values
export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Set the localization for the storybook',
    defaultValue: 'en-US',
    toolbar: {
      icon: 'globe',
      items: [
        {
          right: '🇺🇸',
          title: 'English',
          value: 'en-US',
        },
        {
          right: '🇩🇪',
          title: 'German',
          value: 'de-DE',
        },
        {
          right: '🇵🇸',
          title: 'Arabic',
          value: 'ar-SA',
        },
        {
          right: '🇯🇵',
          title: 'Japanese',
          value: 'ja-JP',
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
  ...(process.env.NODE_ENV === 'development' ? devTools : {}),
};

export const parameters = {
  a11y: {
    // Can specify engine as "axe" or "accessibility-checker" (axe default)
    engine: 'accessibility-checker',
    config: {
      rules: [
        {
          // To disable a rule across all stories, set `enabled` to `false`.
          // Use with caution: all violations of this rule will be ignored!
          id: 'html_lang_exists',
          enabled: false,
        },
        { id: 'page_title_exists', enabled: false },
        { id: 'skip_main_exists', enabled: false },
        { id: 'html_skipnav_exists', enabled: false },
        { id: 'aria_content_in_landmark', enabled: false },
        { id: 'aria_child_tabbable', enabled: false },
      ],
    },
  },
  actions: { argTypesRegex: '^on.*' },
  backgrounds: {
    // https://storybook.js.org/docs/react/essentials/backgrounds#grid
    grid: {
      cellSize: 8,
      opacity: 0.5,
    },
    options: {
      white: { name: 'white', value: white.background },
      g10: { name: 'g10', value: g10.background },
      g90: { name: 'g90', value: g90.background },
      g100: { name: 'g100', value: g100.background },
    },
  },
  controls: {
    expanded: true,
    sort: 'alpha',
    hideNoControlsWarning: true,
  },
  darkMode: {
    current: 'light',
  },
  docs: {
    theme,
    source: {
      excludeDecorators: true,
    },
    codePanel: true,
  },
  viewport: {
    options: {
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
    storySort: {
      method: 'alphabetical',
      order: [
        'Introduction',
        [
          'Welcome',
          'Custom styles',
          'Carbon CDN style helpers',
          'Form Participation',
        ],
        'Components',
        'Layout',
      ],
    },
  },
};

// Helper function to map background values to theme names
function getThemeFromBackground(backgroundValue) {
  const backgroundThemeMap = {
    [white.background]: 'white',
    white: 'white',
    [g10.background]: 'g10',
    g10: 'g10',
    [g90.background]: 'g90',
    g90: 'g90',
    [g100.background]: 'g100',
    g100: 'g100',
  };
  return backgroundThemeMap[backgroundValue] ?? 'white';
}

export const decorators = [
  function decoratorContainer(story, context) {
    const result = story();
    const { hasMainTag } = result;
    const { locale, dir, layoutSize, layoutDensity } = context.globals;
    const backgroundValue = context.globals.backgrounds?.value;
    const theme = getThemeFromBackground(backgroundValue);

    if (process.env.STORYBOOK_USE_RTL === 'true') {
      document.documentElement.setAttribute('dir', 'rtl');
    }

    document.documentElement.setAttribute('storybook-carbon-theme', theme);
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;

    const containerResult = container({ hasMainTag, children: result });

    // Wrap in cds-layout when layout globals are set in dev mode
    if (layoutSize || layoutDensity) {
      return html`
        <cds-layout
          size=${ifDefined(layoutSize || undefined)}
          density=${ifDefined(layoutDensity || undefined)}>
          ${containerResult}
        </cds-layout>
      `;
    }

    return containerResult;
  },
];

export const Preview = {
  parameters,
  globalTypes,
  decorators,
};
export const tags = ['autodocs'];
