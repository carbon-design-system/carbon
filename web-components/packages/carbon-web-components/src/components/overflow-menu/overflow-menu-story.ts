/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean, select } from '@storybook/addon-knobs';
import ifNonNull from '../../globals/directives/if-non-null';
import { FLOATING_MENU_DIRECTION } from '../floating-menu/floating-menu';
import {
  OVERFLOW_MENU_COLOR_SCHEME,
  OVERFLOW_MENU_SIZE,
} from './overflow-menu';
import './overflow-menu-body';
import './overflow-menu-item';
import storyDocs from './overflow-menu-story.mdx';

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
  [`XL size (${OVERFLOW_MENU_SIZE.EXTRA_LARGE})`]:
    OVERFLOW_MENU_SIZE.EXTRA_LARGE,
};

export const Default = (args) => {
  const { open, colorScheme, disabled, direction, size } =
    args?.['bx-overflow-menu'] ?? {};
  return html`
    <bx-overflow-menu ?open="${open}" ?disabled="${disabled}" size="${size}">
      <bx-overflow-menu-body
        color-scheme="${ifNonNull(colorScheme)}"
        direction="${ifNonNull(direction)}">
        <bx-overflow-menu-item>Option 1</bx-overflow-menu-item>
        <bx-overflow-menu-item>Option 2</bx-overflow-menu-item>
        <bx-overflow-menu-item>Option 3</bx-overflow-menu-item>
        <bx-overflow-menu-item>Option 4</bx-overflow-menu-item>
        <bx-overflow-menu-item>Option 5</bx-overflow-menu-item>
      </bx-overflow-menu-body>
    </bx-overflow-menu>
  `;
};

Default.storyName = 'Default';

export default {
  title: 'Components/Overflow menu',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      'bx-overflow-menu': () => ({
        open: boolean('Open (open)', false),
        colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
        disabled: boolean('Disabled (disabled)', false),
        direction: select(
          'Direction (direction in <bx-overflow-menu-body>)',
          directions,
          FLOATING_MENU_DIRECTION.BOTTOM
        ),
        size: select('Overflow menu size (size)', sizes, null),
      }),
    },
  },
};
