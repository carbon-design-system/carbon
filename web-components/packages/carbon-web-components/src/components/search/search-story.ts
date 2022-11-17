/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import { INPUT_SIZE } from '../input/input';
import { SEARCH_COLOR_SCHEME } from './search';
import './search-skeleton';
import storyDocs from './search-story.mdx';

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${SEARCH_COLOR_SCHEME.LIGHT})`]: SEARCH_COLOR_SCHEME.LIGHT,
};

const sizes = {
  'Regular size': null,
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Extra large size (${INPUT_SIZE.EXTRA_LARGE})`]: INPUT_SIZE.EXTRA_LARGE,
};

export const Default = (args) => {
  const { closeButtonAssistiveText, colorScheme, disabled, labelText, name, placeholder, size, type, value, onInput } =
    args?.['bx-search'] ?? {};
  return html`
    <bx-search
      close-button-assistive-text="${ifNonNull(closeButtonAssistiveText)}"
      color-scheme="${ifNonNull(colorScheme)}"
      ?disabled="${disabled}"
      label-text="${ifNonNull(labelText)}"
      name="${ifNonNull(name)}"
      placeholder="${ifNonNull(placeholder)}"
      size="${ifNonNull(size)}"
      type="${ifNonNull(type)}"
      value="${ifNonNull(value)}"
      @bx-search-input="${onInput}"
    ></bx-search>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    'bx-search': () => ({
      closeButtonAssistiveText: textNullable(
        'The label text for the close button (close-button-assistive-text)',
        'Clear search input'
      ),
      colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
      disabled: boolean('Disabled (disabled)', false),
      labelText: textNullable('Label text (label-text)', 'Search'),
      name: textNullable('Name (name)', ''),
      placeholder: textNullable('Placeholder text (placeholder)', ''),
      size: select('Searh size (size)', sizes, null),
      type: textNullable('The type of the <input> (type)', ''),
      value: textNullable('Value (value)', ''),
      onInput: action('bx-search-input'),
    }),
  },
};

export const skeleton = () => html` <bx-search-skeleton></bx-search-skeleton> `;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Components/Search',
  parameters: {
    ...storyDocs.parameters,
  },
};
