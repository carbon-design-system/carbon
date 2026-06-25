/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { fn } from 'storybook/test';
import './index';
import '@carbon/web-components/es/components/toggle/index.js';
import '@carbon/web-components/es/components/dropdown/index.js';
import styles from './story-styles.scss?lit';

const argTypes = {
  body: {
    control: 'text',
    description: 'Slot body content',
  },
  defaultOpen: {
    control: 'boolean',
    description: 'If `true` the body of the component is shown',
  },
  enabled: {
    control: 'boolean',
    description:
      'Whether the toggle is enabled or disabled. If nothing is passed, no toggle will be rendered.',
  },
  size: {
    control: 'radio',
    options: ['lg', 'xl'],
    description: 'Determines the size of the header',
  },
  summary: {
    control: 'text',
    description: 'Slot text that is displayed under the title',
  },
  titleId: {
    control: 'text',
    description: 'ID for the title',
  },
  titleText: {
    control: 'text',
    description: 'Text for the title',
  },
  locked: {
    control: 'boolean',
    description: 'Whether the OptionsTile is in locked validation state.',
  },
  lockedText: {
    control: 'text',
    description:
      'Provide a text explaining why the OptionsTile is in locked state.',
  },
  warn: {
    control: 'boolean',
    description: 'Whether the OptionsTile is in warning validation state.',
  },
  warnText: {
    control: 'text',
    description:
      'Provide a text explaining why the OptionsTile is in warning state.',
  },
};

const blockClass = 'options-tile';

// spell-checker:disable
const languages = [
  { label: 'English', value: 'en' },
  { label: '简体中文 - Chinese Simplified', value: 'zh-CN' },
  { label: '繁體中文 - Chinese Traditional', value: 'zh-TW' },
  { label: 'Français - French', value: 'fr' },
  { label: 'Deutsch - German', value: 'de' },
  { label: 'Italiano - Italian', value: 'it' },
  { label: '日本語 - Japanese', value: 'ja' },
  { label: '한국어 - Korean', value: 'ko' },
  { label: 'Polski - Polish', value: 'pl' },
  { label: 'Português (brasileiro) - Portuguese (Brazilian)', value: 'pt-BR' },
  { label: 'Русский - Russian', value: 'ru' },
  { label: 'Español - Spanish', value: 'es' },
];

const locales = [
  { label: 'English', value: 'en' },
  { label: 'English-US', value: 'en-US' },
  { label: 'English-UK', value: 'en-UK' },
  { label: 'English-Canada', value: 'en-CA' },
  { label: 'English-Australia', value: 'en-AU' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese-PRC', value: 'zh-CN' },
  { label: 'Chinese-Taiwan', value: 'zh-TW' },
  { label: 'Vietnamese', value: 'vi' },
  { label: 'Thai', value: 'th' },
  { label: 'Russian', value: 'ru' },
  { label: 'Polish', value: 'pl' },
  { label: 'Greek', value: 'el' },
  { label: 'Hebrew', value: 'he' },
  { label: 'Arabic', value: 'ar' },
  { label: 'Spanish', value: 'es' },
  { label: 'German', value: 'de' },
  { label: 'French', value: 'fr' },
  { label: 'French-Canada', value: 'fr-CA' },
  { label: 'Italian', value: 'it' },
  { label: 'Portuguese-Brazil', value: 'pt-BR' },
  { label: 'Turkish', value: 'tr' },
];
// spell-checker:enable

export const Default = {
  args: {
    defaultOpen: false,
    enabled: true,
    size: 'lg',
    titleId: 'title-01',
    titleText: 'Language',
    locked: false,
    lockedText: 'This option is managed by your administrator',
    warn: false,
    warnText: 'A restart is required to apply these settings',
  },
  argTypes,
  render: (args) => {
    return html`
      <style>
        ${styles}
      </style>
      <div class="${blockClass}-wrapper">
        <c4p-options-tile
          class=${blockClass}
          ?defaultOpen=${args.defaultOpen}
          id="my-tile"
          size=${args.size}
          titleId=${args.titleId}
          titleText=${args.titleText}
          ?locked=${args.locked}
          lockedText=${args.lockedText}
          ?warn=${args.warn}
          warnText=${args.warnText}
          @c4p-options-tile-open=${console.log('open option tile')}
          @c4p-options-tile-close=${console.log('close option tile')}
        >
          <div slot="summary">
            <span>English | Locale: English</span>
          </div>
          ${args.enabled
            ? html`
                <div slot="toggle">
                  <cds-toggle
                    id="my-toggle"
                    size="sm"
                    hideLabel
                    ?disabled=${args.locked}
                  ></cds-toggle>
                </div>
              `
            : ''}
          <div slot="body">
            <div class=${`${blockClass}__body`}>
              <p>
                User interface defines the language the application is displayed
                in. Locale sets the regional display formats for information
                like time, date, currency and decimal delimiters.
              </p>
              <div class=${`${blockClass}__dropdown`}>
                <cds-dropdown
                  title-text="User interface"
                  value="${languages[0].value}"
                >
                  ${languages.map(
                    (lang) =>
                      html`<cds-dropdown-item value="${lang.value}"
                        >${lang.label}</cds-dropdown-item
                      >`
                  )}
                </cds-dropdown>
              </div>
              <div class=${`${blockClass}__dropdown`}>
                <cds-dropdown title-text="Locale" value="${locales[0].value}">
                  ${locales.map(
                    (locale) =>
                      html`<cds-dropdown-item value="${locale.value}"
                        >${locale.label}</cds-dropdown-item
                      >`
                  )}
                </cds-dropdown>
              </div>
            </div>
          </div>
        </c4p-options-tile>
      </div>
    `;
  },
};

export const StaticOptionsTile = {
  args: {
    defaultOpen: false,
    enabled: false,
    locked: false,
    lockedText: 'This option is managed by your administrator',
    size: 'lg',
    titleId: 'title-id-static',
    titleText: 'Language',
    warn: false,
    warnText: 'A restart is required to apply these settings',
  },
  argTypes,
  render: (args) => {
    return html`
      <style>
        ${styles}
      </style>
      <div class="${blockClass}-wrapper">
        <c4p-options-tile
          class=${blockClass}
          id="my-tile-static"
          size=${args.size}
          titleId=${args.titleId}
          titleText=${args.titleText}
          ?locked=${args.locked}
          lockedText=${args.lockedText}
          ?warn=${args.warn}
          warnText=${args.warnText}
        >
          <div slot="summary">
            <span>English | Locale: English</span>
          </div>
        </c4p-options-tile>
      </div>
    `;
  },
};

const meta = {
  title: 'Components/OptionsTile',
};

export default meta;
