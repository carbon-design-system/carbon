/**
 * Copyright IBM Corp. 2021, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import React, { useEffect, useState } from 'react';
import mdx from './OptionsTile.mdx';
import { OptionsTile } from '.';
import { VolumeUp } from '@carbon/icons-react';
import Dropdown from '../Dropdown';
import DatePicker from '../DatePicker';
import DatePickerInput from '../DatePickerInput';
import { IconButton } from '../IconButton';
import { MenuItem } from '../Menu';
import OverflowMenu from '../OverflowMenu';

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
// spell-checker:enable

// Action components follow the tile size: `sm` (32px) in `lg`, `md` (40px) in `xl`.
const actionSize = (size) => (size === 'xl' ? 'md' : 'sm');

const actionRenderers = {
  'None (use enabled)': undefined,
  Dropdown: ({ size }) => (
    <Dropdown
      id="options-tile-action-dropdown"
      className="options-tile-story__action-dropdown"
      titleText="Language"
      label="Language"
      hideLabel
      items={languages}
      initialSelectedItem={languages[0]}
      size={actionSize(size)}
    />
  ),
  'Icon button': ({ size }) => (
    <IconButton kind="ghost" label="Mute audio" size={actionSize(size)}>
      <VolumeUp />
    </IconButton>
  ),
  'Icon button + overflow menu': ({ size }) => (
    <>
      <IconButton kind="ghost" label="Mute audio" size={actionSize(size)}>
        <VolumeUp />
      </IconButton>
      <OverflowMenu
        label="More audio options"
        size={actionSize(size)}
        menuAlignment="bottom-end">
        <MenuItem label="Output device" />
        <MenuItem label="Audio settings" />
      </OverflowMenu>
    </>
  ),
  'Date picker': ({ size }) => (
    <DatePicker
      datePickerType="single"
      className="options-tile-story__action-date">
      <DatePickerInput
        id="options-tile-action-date"
        labelText="Date"
        hideLabel
        placeholder="mm/dd/yyyy"
        size={actionSize(size)}
      />
    </DatePicker>
  ),
  'Custom slot': () => <div className="options-tile-story__slot">Slot</div>,
};

const defaultArgs = {
  actionRenderer: 'None (use enabled)',
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

export default {
  title: 'Components/OptionsTile',
  component: OptionsTile,
  tags: ['autodocs', 'ibm-products-migrated'],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  args: defaultArgs,
  argTypes: {
    // Renders custom content in place of the toggle. "None" falls back to the
    // toggle controlled by `enabled`.
    actionRenderer: {
      control: 'select',
      options: Object.keys(actionRenderers),
      mapping: actionRenderers,
    },
    children: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    // undefined → toggle not rendered; true/false → toggle on/off
    enabled: {
      control: 'select',
      options: [undefined, true, false],
      mapping: { undefined: undefined, true: true, false: false },
    },
  },
};

// Local state seeded from a control, re-synced when the control changes.
const useArgState = (value) => {
  const [state, setState] = useState(value);
  useEffect(() => setState(value), [value]);
  return [state, setState];
};

export const Default = ({ enabled: enabledArg, open: openArg, ...args }) => {
  const [enabled, setEnabled] = useArgState(enabledArg);
  const [open, setOpen] = useArgState(openArg);

  return (
    <main>
      <OptionsTile
        {...args}
        open={open}
        onChange={setOpen}
        enabled={enabled}
        onToggle={setEnabled}>
        <p>
          User interface defines the language the application is displayed in.
          Locale sets the regional display formats for information like time,
          date, currency and decimal delimiters.
        </p>
        <Dropdown
          id="options-tile-language"
          titleText="User interface"
          label="User interface"
          items={languages}
          initialSelectedItem={languages[0]}
        />
        <Dropdown
          id="options-tile-locale"
          titleText="Locale"
          label="Locale"
          items={locales}
          initialSelectedItem={locales[0]}
        />
      </OptionsTile>
    </main>
  );
};

export const Static = ({ enabled: enabledArg, open, ...args }) => {
  const [enabled, setEnabled] = useArgState(enabledArg);

  return (
    <main>
      <OptionsTile {...args} enabled={enabled} onToggle={setEnabled} />
    </main>
  );
};
