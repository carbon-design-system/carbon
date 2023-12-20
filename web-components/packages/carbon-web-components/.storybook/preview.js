import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import container from './container';
import { white, g10, g90, g100 } from '@carbon/themes';
import { breakpoints } from '@carbon/layout';
import theme from './theme';

setCustomElementsManifest(customElements);

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
    expanded: true,
    sort: 'alpha',
    hideNoControlsWarning: true,
  },
  docs: {
    theme,
  },
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
    storySort: {
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

export const decorators = [
  function decoratorContainer(story, context) {
    const result = story();
    const { hasMainTag } = result;
    const { locale, dir, theme } = context.globals;

    document.documentElement.setAttribute('storybook-carbon-theme', theme);

    document.documentElement.lang = locale;
    document.documentElement.dir = dir;

    return container({ hasMainTag, children: result });
  },
];

export const Preview = {
  parameters,
  globalTypes,
  decorators,
};
