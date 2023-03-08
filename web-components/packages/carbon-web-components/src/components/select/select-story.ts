/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import { prefix } from '../../globals/settings';
import { INPUT_COLOR_SCHEME, INPUT_SIZE } from '../input/input';
import './select';
import storyDocs from './select-story.mdx';

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${INPUT_COLOR_SCHEME.LIGHT})`]: INPUT_COLOR_SCHEME.LIGHT,
};

const sizes = {
  'Regular size': null,
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Extra large size (${INPUT_SIZE.EXTRA_LARGE})`]: INPUT_SIZE.EXTRA_LARGE,
};

export const Default = (args) => {
  const {
    autofocus,
    colorScheme,
    disabled,
    helperText,
    invalid,
    labelText,
    name,
    placeholder,
    size,
    validityMessage,
    value,
    children = html`
      <cds-select-item-group label="Category 1">
        <cds-select-item value="all">Option 1</cds-select-item>
        <cds-select-item value="cloudFoundry">Option 2</cds-select-item>
      </cds-select-item-group>
      <cds-select-item-group label="Category 2">
        <cds-select-item value="staging">Option 3</cds-select-item>
        <cds-select-item value="dea">Option 4</cds-select-item>
        <cds-select-item value="router">Option 5</cds-select-item>
      </cds-select-item-group>
    `,
    onInput,
  } = args?.[`${prefix}-select`] ?? {};
  return html`
    <cds-select
      ?autofocus="${autofocus}"
      color-scheme="${ifDefined(colorScheme)}"
      ?disabled="${disabled}"
      helper-text="${ifDefined(helperText)}"
      ?invalid="${invalid}"
      label-text="${ifDefined(labelText)}"
      name="${ifDefined(name)}"
      placeholder="${ifDefined(placeholder)}"
      size="${ifDefined(size)}"
      validity-message="${ifDefined(validityMessage)}"
      value="${ifDefined(value)}"
      @cds-select-selected="${ifDefined(onInput)}">
      ${children}
    </cds-select>
  `;
};

Default.parameters = {
  knobs: {
    [`${prefix}-select`]: () => ({
      colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
      disabled: boolean('Disabled (disabled)', false),
      helperText: textNullable(
        'Helper text (helper-text)',
        'Optional helper text'
      ),
      invalid: boolean('Invalid (invalid)', false),
      labelText: textNullable('Label text (label-text)', 'Select'),
      placeholder: textNullable(
        'Placeholder text (placeholder)',
        'Optional placeholder text'
      ),
      size: select('Dropdown size (size)', sizes, null),
      validityMessage: textNullable(
        'The validity message (validity-message)',
        ''
      ),
      value: textNullable('The value of the selected item (value)', ''),
      onInput: action(`${prefix}-select-selected`),
    }),
  },
};

export default {
  title: 'Components/Select',
  parameters: {
    ...storyDocs.parameters,
  },
};
