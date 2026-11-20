/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import type { Args, Meta } from '@storybook/web-components';
import './index';
import '../toggle/index';
import '../dropdown/index';
import '../date-picker/index';
import '../icon-button/index';
import '../menu/index';
import '../overflow-menu/index';
import { enabled } from '@carbon/feature-flags';
import OverflowMenuVertical16 from '@carbon/icons/es/overflow-menu--vertical/16.js';
import VolumeUp16 from '@carbon/icons/es/volume--up/16.js';
import { iconLoader } from '../../globals/internal/icon-loader';
import { prefix } from '../../globals/settings';
import { languages, locales, blockClass } from './option-tile-helpers.ts';
import styles from './story-styles.scss?lit';

// Action components follow the tile size: `sm` (32px) in `lg`, `md` (40px) in `xl`.
const actionSize = (size: string) => (size === 'xl' ? 'md' : 'sm');

const iconButton = (size: string) => html`
  <cds-icon-button slot="action" kind="ghost" size=${actionSize(size)}>
    ${iconLoader(VolumeUp16, { slot: 'icon' })}
    <span slot="tooltip-content">Mute audio</span>
  </cds-icon-button>
`;

const overflowMenu = (size: string) => html`
  <cds-overflow-menu
    slot="action"
    size=${actionSize(size)}
    label="More audio options"
    menu-alignment="bottom-end">
    ${iconLoader(OverflowMenuVertical16, {
      class: `${prefix}--overflow-menu__icon`,
      slot: 'icon',
    })}
    ${enabled('enable-v12-overflowmenu')
      ? html`<cds-menu>
          <cds-menu-item label="Output device"></cds-menu-item>
          <cds-menu-item label="Audio settings"></cds-menu-item>
        </cds-menu>`
      : html`<span slot="tooltip-content">More audio options</span>
          <cds-overflow-menu-body flipped>
            <cds-overflow-menu-item>Output device</cds-overflow-menu-item>
            <cds-overflow-menu-item>Audio settings</cds-overflow-menu-item>
          </cds-overflow-menu-body>`}
  </cds-overflow-menu>
`;

// Content for the `action` slot, which replaces the toggle.
const actions = {
  'None (use enabled)': () => '',
  Dropdown: (size: string) => html`
    <cds-dropdown
      slot="action"
      class="${blockClass}__action-dropdown"
      size=${actionSize(size)}
      title-text="Language"
      hide-label
      value="${languages[0].value}">
      ${languages.map(
        (lang) =>
          html`<cds-dropdown-item value="${lang.value}"
            >${lang.label}</cds-dropdown-item
          >`
      )}
    </cds-dropdown>
  `,
  'Icon button': iconButton,
  'Icon button + overflow menu': (size: string) =>
    html`${iconButton(size)}${overflowMenu(size)}`,
  'Date picker': (size: string) => html`
    <cds-date-picker slot="action" class="${blockClass}__action-date">
      <cds-date-picker-input
        kind="single"
        label-text="Date"
        hide-label
        placeholder="mm/dd/yyyy"
        size=${actionSize(size)}></cds-date-picker-input>
    </cds-date-picker>
  `,
  'Custom slot': () =>
    html`<div slot="action" class="${blockClass}__slot">Slot</div>`,
};

const renderTile = (args: Args, body?: unknown) => html`
  <style>
    ${styles}
  </style>
  <div class="${blockClass}__wrapper">
    <div class="${blockClass}__viewport">
      <cds-options-tile
        class=${blockClass}
        ?open=${args.open}
        size=${args.size}
        titleId=${args.titleId}
        titleText=${args.titleText}
        ?invalid=${args.invalid}
        invalidText=${args.invalidText}
        ?locked=${args.locked}
        lockedText=${args.lockedText}
        ?warn=${args.warn}
        warnText=${args.warnText}>
        <span slot="summary">${args.summary}</span>
        ${actions[args.action as keyof typeof actions](args.size)}
        ${args.enabled !== undefined
          ? html`
              <cds-toggle
                slot="toggle"
                size="sm"
                hideLabel
                ?toggled=${args.enabled}
                ?disabled=${args.locked &&
                !args.invalid &&
                !args.warn}></cds-toggle>
            `
          : ''}
        ${body ?? ''}
      </cds-options-tile>
    </div>
  </div>
`;

const body = html`
  <div slot="body" class=${`${blockClass}__body`}>
    <p>
      User interface defines the language the application is displayed in.
      Locale sets the regional display formats for information like time, date,
      currency and decimal delimiters.
    </p>
    <div class=${`${blockClass}__dropdown`}>
      <cds-dropdown title-text="User interface" value="${languages[0].value}">
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
`;

export const Default = {
  render: (args: Args) => renderTile(args, body),
};

export const Static = {
  render: (args: Args) => renderTile(args),
};

const meta: Meta = {
  title: 'Components/OptionsTile',
  component: 'cds-options-tile',
  tags: ['ibm-products-migrated'],
  args: {
    action: 'None (use enabled)',
    enabled: true,
    invalid: false,
    invalidText: 'Your system does not support this configuration',
    locked: false,
    lockedText: 'This option is managed by your administrator',
    open: false,
    size: 'lg',
    summary: 'English | Locale: English',
    titleId: 'title-id',
    titleText: 'Language',
    warn: false,
    warnText: 'A restart is required to apply these settings',
  },
  argTypes: {
    action: {
      control: 'select',
      options: Object.keys(actions),
      description:
        'Content for the `action` slot, which replaces the toggle. "None" falls back to the toggle controlled by `enabled`.',
    },
    // undefined → toggle not rendered; true/false → toggle on/off
    enabled: {
      control: 'select',
      options: [undefined, true, false],
      mapping: { undefined: undefined, true: true, false: false },
      description: 'Story only: renders a `cds-toggle` in the `toggle` slot.',
    },
    open: {
      control: 'boolean',
      description: 'Whether the tile is expanded.',
    },
    size: {
      control: 'radio',
      options: ['lg', 'xl'],
      description: 'Determines the size of the header',
    },
    summary: {
      control: 'text',
      description: 'Text in the `summary` slot, displayed under the title',
    },
  },
};

export default meta;
