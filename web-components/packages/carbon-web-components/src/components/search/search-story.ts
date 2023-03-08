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
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import { INPUT_SIZE } from '../input/input';
import { SEARCH_COLOR_SCHEME } from './search';
import './search-skeleton';
import storyDocs from './search-story.mdx';
import { prefix } from '../../globals/settings';

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${SEARCH_COLOR_SCHEME.LIGHT})`]: SEARCH_COLOR_SCHEME.LIGHT,
};

const sizes = {
  'Regular size': null,
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Large size (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

export const Default = (args) => {
  const {
    closeButtonAssistiveText,
    colorScheme,
    disabled,
    labelText,
    name,
    placeholder,
    size,
    type,
    value,
    onInput,
  } = args?.[`${prefix}-search`] ?? {};
  return html`
    <cds-search
      close-button-assistive-text="${ifDefined(closeButtonAssistiveText)}"
      color-scheme="${ifDefined(colorScheme)}"
      ?disabled="${disabled}"
      label-text="${ifDefined(labelText)}"
      name="${ifDefined(name)}"
      placeholder="${ifDefined(placeholder)}"
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      value="${ifDefined(value)}"
      @cds-search-input="${onInput}"></cds-search>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    [`${prefix}-search`]: () => ({
      closeButtonAssistiveText: textNullable(
        'The label text for the close button (close-button-assistive-text)',
        'Clear search input'
      ),
      colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
      disabled: boolean('Disabled (disabled)', false),
      labelText: textNullable('Label text (label-text)', 'Search'),
      name: textNullable('Name (name)', ''),
      placeholder: textNullable('Placeholder text (placeholder)', ''),
      size: select('Search size (size)', sizes, null),
      type: textNullable('The type of the <input> (type)', ''),
      value: textNullable('Value (value)', ''),
      onInput: action(`${prefix}-search-input`),
    }),
  },
};

export const skeleton = () =>
  html` <cds-search-skeleton></cds-search-skeleton> `;

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
