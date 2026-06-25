/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Dropdown, Toggle } from '@carbon/react';
import { OptionsTile } from '.';
import styles from './_storybook-styles.scss?inline';
import mdx from './OptionsTile.mdx';

export default {
  title: 'Components/OptionsTile',
  component: OptionsTile,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};
const Template = (args) => {
  // spell-checker:disable
  const languages = [
    { label: 'English', id: 'en' },
    { label: '简体中文 - Chinese Simplified', id: 'zh-CN' },
    { label: '繁體中文 - Chinese Traditional', id: 'zh-TW' },
    { label: 'Français - French', id: 'fr' },
    { label: 'Deutsch - German', id: 'de' },
    { label: 'Italiano - Italian', id: 'it' },
    { label: '日本語 - Japanese', id: 'ja' },
    { label: '한국어 - Korean', id: 'ko' },
    { label: 'Polski - Polish', id: 'pl' },
    { label: 'Português (brasileiro) - Portuguese (Brazilian)', id: 'pt-BR' },
    { label: 'Русский - Russian', id: 'ru' },
    { label: 'Español - Spanish', id: 'es' },
  ];

  const locales = [
    { label: 'English', id: 'en' },
    { label: 'English-US', id: 'en-US' },
    { label: 'English-UK', id: 'en-UK' },
    { label: 'English-Canada', id: 'en-CA' },
    { label: 'English-Australia', id: 'en-AU' },
    { label: 'Japanese', id: 'ja' },
    { label: 'Korean', id: 'ko' },
    { label: 'Chinese-PRC', id: 'zh-CN' },
    { label: 'Chinese-Taiwan', id: 'zh-TW' },
    { label: 'Vietnamese', id: 'vi' },
    { label: 'Thai', id: 'th' },
    { label: 'Russian', id: 'ru' },
    { label: 'Polish', id: 'pl' },
    { label: 'Greek', id: 'el' },
    { label: 'Hebrew', id: 'he' },
    { label: 'Arabic', id: 'ar' },
    { label: 'Spanish', id: 'es' },
    { label: 'German', id: 'de' },
    { label: 'French', id: 'fr' },
    { label: 'French-Canada', id: 'fr-CA' },
    { label: 'Italian', id: 'it' },
    { label: 'Portuguese-Brazil', id: 'pt-BR' },
    { label: 'Turkish', id: 'tr' },
  ];

  const { titleId: id, enabled: enabledControl, ...rest } = args;
  const [toggleChecked, setToggleChecked] = useState(true);

  return (
    <main>
      <OptionsTile
        {...rest}
        enabled={enabledControl ? toggleChecked : undefined}
        onToggle={(checked) => {
          setToggleChecked(checked);
          console.log('Toggle changed:', checked);
        }}
      >
        <p>
          User interface defines the language the application is displayed in.
          Locale sets the regional display formats for information like time,
          date, currency and decimal delimiters.
        </p>
        <Dropdown
          id={`${id}-language`}
          titleText="User interface"
          label="User interface"
          items={languages}
          initialSelectedItem={languages[0]}
        />
        <Dropdown
          id={`${id}-locale`}
          titleText="Locale"
          label="Locale"
          items={locales}
          initialSelectedItem={locales[0]}
        />
      </OptionsTile>
    </main>
  );
};

const TemplateStatic = (args) => {
  return (
    <main>
      <OptionsTile {...args} />
    </main>
  );
};

const defaultProps = {
  className: 'example-class',
  enabled: true,
  invalid: false,
  invalidText: 'Your system does not support this configuration',
  locked: false,
  lockedText: 'This option is managed by your administrator',
  open: false,
  size: 'lg',
  summary: 'English | Locale: English',
  title: 'Language',
  titleId: 'title-id',
  warn: false,
  warnText: 'A restart is required to apply these settings',
};

export const optionsTile = Template.bind({});
optionsTile.args = { ...defaultProps };

export const staticOptionsTile = TemplateStatic.bind({});
staticOptionsTile.args = { ...defaultProps };
