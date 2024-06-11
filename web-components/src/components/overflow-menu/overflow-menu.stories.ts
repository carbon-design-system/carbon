/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { OVERFLOW_MENU_SIZE } from './overflow-menu';
import './overflow-menu-body';
import './overflow-menu-item';
import { prefix } from '../../globals/settings';
import OverflowMenuVertical16 from '@carbon/icons/lib/overflow-menu--vertical/16';
import Filter16 from '@carbon/icons/lib/filter/16';

const sizes = {
  [`Small size (${OVERFLOW_MENU_SIZE.SMALL})`]: OVERFLOW_MENU_SIZE.SMALL,
  [`Medium size (default) (${OVERFLOW_MENU_SIZE.MEDIUM})`]:
    OVERFLOW_MENU_SIZE.MEDIUM,
  [`Lg size (${OVERFLOW_MENU_SIZE.LARGE})`]: OVERFLOW_MENU_SIZE.LARGE,
};

const args = {
  flipped: false,
  iconDescription: 'Options',
  open: false,
  index: 1,
  size: OVERFLOW_MENU_SIZE.MEDIUM,
};

const argTypes = {
  flipped: {
    control: 'boolean',
    description: '<code>true</code> if the menu alignment should be flipped.',
  },
  iconDescription: {
    control: 'text',
    description: 'The icon description.',
  },
  open: {
    control: 'boolean',
    description: '<code>true</code> if the menu should be open.\n',
  },
  index: {
    control: 'number',
    description: 'The index for the item which should be focused in the menu.',
  },
  size: {
    control: 'select',
    description:
      'Specify the size of the OverflowMenu. Currently supports either <code>sm</code>, <code>md</code> (default) or <code></code>lg</code> as an option.',
    options: sizes,
  },
};

export const Default = {
  render: () => {
    return html`
      <cds-overflow-menu>
        ${OverflowMenuVertical16({
          class: `${prefix}--overflow-menu__icon`,
          slot: 'icon',
        })}
        <span slot="tooltip-content"> Options </span>
        <cds-overflow-menu-body>
          <cds-overflow-menu-item>Stop app</cds-overflow-menu-item>
          <cds-overflow-menu-item>Restart app</cds-overflow-menu-item>
          <cds-overflow-menu-item>Rename app</cds-overflow-menu-item>
          <cds-overflow-menu-item disabled
            >Clone and move app</cds-overflow-menu-item
          >
          <cds-overflow-menu-item
            >Edit routes and access</cds-overflow-menu-item
          >
          <cds-overflow-menu-item divider danger
            >Delete app</cds-overflow-menu-item
          >
        </cds-overflow-menu-body>
      </cds-overflow-menu>
    `;
  },
};

export const RenderCustomIcon = {
  render: () => {
    return html`
      <cds-overflow-menu>
        ${Filter16({
          class: `${prefix}--overflow-menu__icon`,
          slot: 'icon',
        })}
        <span slot="tooltip-content">Options</span>
        <cds-overflow-menu-body>
          <cds-overflow-menu-item>Filter A</cds-overflow-menu-item>
          <cds-overflow-menu-item>Filter B</cds-overflow-menu-item>
        </cds-overflow-menu-body>
      </cds-overflow-menu>
    `;
  },
};

export const Playground = {
  args,
  argTypes,
  render: (args) => {
    const { flipped, iconDescription, open, index, size } = args ?? {};
    return html`
      <cds-overflow-menu ?open="${open}" size="${size}" index=${index}>
        ${OverflowMenuVertical16({
          class: `${prefix}--overflow-menu__icon`,
          slot: 'icon',
        })}
        <span slot="tooltip-content"> ${iconDescription} </span>
        <cds-overflow-menu-body ?flipped="${ifDefined(flipped)}">
          <cds-overflow-menu-item>Stop app</cds-overflow-menu-item>
          <cds-overflow-menu-item>Restart app</cds-overflow-menu-item>
          <cds-overflow-menu-item>Rename app</cds-overflow-menu-item>
          <cds-overflow-menu-item disabled
            >Clone and move app</cds-overflow-menu-item
          >
          <cds-overflow-menu-item
            >Edit routes and access</cds-overflow-menu-item
          >
          <cds-overflow-menu-item divider danger
            >Delete app</cds-overflow-menu-item
          >
        </cds-overflow-menu-body>
      </cds-overflow-menu>
    `;
  },
};

const meta = {
  title: 'Components/Overflow Menu',
};

export default meta;
