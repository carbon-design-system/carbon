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
import { boolean, select } from '@storybook/addon-knobs';
import { FLOATING_MENU_DIRECTION } from '../floating-menu/floating-menu';
import {
  OVERFLOW_MENU_COLOR_SCHEME,
  OVERFLOW_MENU_SIZE,
} from './overflow-menu';
import './overflow-menu-body';
import './overflow-menu-item';
import storyDocs from './overflow-menu-story.mdx';
import { prefix } from '../../globals/settings';

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${OVERFLOW_MENU_COLOR_SCHEME.LIGHT})`]:
    OVERFLOW_MENU_COLOR_SCHEME.LIGHT,
};

const directions = {
  [`Bottom (${FLOATING_MENU_DIRECTION.BOTTOM})`]:
    FLOATING_MENU_DIRECTION.BOTTOM,
  [`Top (${FLOATING_MENU_DIRECTION.TOP})`]: FLOATING_MENU_DIRECTION.TOP,
};

const sizes = {
  'Regular size': null,
  [`Small size (${OVERFLOW_MENU_SIZE.SMALL})`]: OVERFLOW_MENU_SIZE.SMALL,
  [`Lg size (${OVERFLOW_MENU_SIZE.LARGE})`]: OVERFLOW_MENU_SIZE.LARGE,
};

export const Default = (args) => {
  const { open, colorScheme, disabled, direction, size } =
    args?.[`${prefix}-overflow-menu`] ?? {};
  return html`
    <cds-overflow-menu ?open="${open}" ?disabled="${disabled}" size="${size}">
      <cds-overflow-menu-body
        color-scheme="${ifDefined(colorScheme)}"
        direction="${ifDefined(direction)}">
        <cds-overflow-menu-item>Option 1</cds-overflow-menu-item>
        <cds-overflow-menu-item>Option 2</cds-overflow-menu-item>
        <cds-overflow-menu-item>Option 3</cds-overflow-menu-item>
        <cds-overflow-menu-item>Option 4</cds-overflow-menu-item>
        <cds-overflow-menu-item>Option 5</cds-overflow-menu-item>
      </cds-overflow-menu-body>
    </cds-overflow-menu>
  `;
};

Default.storyName = 'Default';

export default {
  title: 'Components/Overflow menu',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      [`${prefix}-overflow-menu`]: () => ({
        open: boolean('Open (open)', false),
        colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
        disabled: boolean('Disabled (disabled)', false),
        direction: select(
          'Direction (direction in <cds-overflow-menu-body>)',
          directions,
          FLOATING_MENU_DIRECTION.BOTTOM
        ),
        size: select('Overflow menu size (size)', sizes, null),
      }),
    },
  },
};
