/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { boolean, number, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook-backup/knob-text-nullable';
import { OVERFLOW_MENU_SIZE } from './overflow-menu';
import './overflow-menu-body';
import './overflow-menu-item';
import storyDocs from './overflow-menu-story.mdx';
import { prefix } from '../../globals/settings';
import OverflowMenuVertical16 from '@carbon/icons/lib/overflow-menu--vertical/16';
import Filter16 from '@carbon/icons/lib/filter/16';

const sizes = {
  [`Small size (${OVERFLOW_MENU_SIZE.SMALL})`]: OVERFLOW_MENU_SIZE.SMALL,
  [`Medium size (default) (${OVERFLOW_MENU_SIZE.MEDIUM})`]:
    OVERFLOW_MENU_SIZE.MEDIUM,
  [`Lg size (${OVERFLOW_MENU_SIZE.LARGE})`]: OVERFLOW_MENU_SIZE.LARGE,
};

export const Default = () => {
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
        <cds-overflow-menu-item>Edit routes and access</cds-overflow-menu-item>
        <cds-overflow-menu-item divider danger
          >Delete app</cds-overflow-menu-item
        >
      </cds-overflow-menu-body>
    </cds-overflow-menu>
  `;
};

export const renderCustomIcon = () => {
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
};

export const Playground = (args) => {
  const { flipped, iconDescription, open, index, size } =
    args?.[`${prefix}-overflow-menu`] ?? {};
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
        <cds-overflow-menu-item>Edit routes and access</cds-overflow-menu-item>
        <cds-overflow-menu-item divider danger
          >Delete app</cds-overflow-menu-item
        >
      </cds-overflow-menu-body>
    </cds-overflow-menu>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-overflow-menu`]: () => ({
      flipped: boolean('Flipped (flipped)', false),
      iconDescription: textNullable(
        'Icon description (iconDescription)',
        'Options'
      ),
      open: boolean('Open (open)', false),
      index: number('Index focus (index)', 1),
      size: select(
        'Overflow menu size (size)',
        sizes,
        OVERFLOW_MENU_SIZE.MEDIUM
      ),
    }),
  },
};

export default {
  title: 'Components/Overflow menu',
  parameters: {
    ...storyDocs.parameters,
  },
};
