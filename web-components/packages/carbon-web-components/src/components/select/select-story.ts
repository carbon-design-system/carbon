/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import ifNonNull from '../../globals/directives/if-non-null';
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

export const Default = args => {
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
      <bx-select-item-group label="Category 1">
        <bx-select-item value="all">Option 1</bx-select-item>
        <bx-select-item value="cloudFoundry">Option 2</bx-select-item>
      </bx-select-item-group>
      <bx-select-item-group label="Category 2">
        <bx-select-item value="staging">Option 3</bx-select-item>
        <bx-select-item value="dea">Option 4</bx-select-item>
        <bx-select-item value="router">Option 5</bx-select-item>
      </bx-select-item-group>
    `,
    onInput,
  } = args?.['bx-select'] ?? {};
  return html`
    <bx-select
      ?autofocus="${autofocus}"
      color-scheme="${ifNonNull(colorScheme)}"
      ?disabled="${disabled}"
      helper-text="${ifNonNull(helperText)}"
      ?invalid="${invalid}"
      label-text="${ifNonNull(labelText)}"
      name="${ifNonNull(name)}"
      placeholder="${ifNonNull(placeholder)}"
      size="${ifNonNull(size)}"
      validity-message="${ifNonNull(validityMessage)}"
      value="${ifNonNull(value)}"
      @bx-select-selected="${ifNonNull(onInput)}">
      ${children}
    </bx-select>
  `;
};

Default.parameters = {
  knobs: {
    'bx-select': () => ({
      colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
      disabled: boolean('Disabled (disabled)', false),
      helperText: textNullable('Helper text (helper-text)', 'Optional helper text'),
      invalid: boolean('Invalid (invalid)', false),
      labelText: textNullable('Label text (label-text)', 'Select'),
      placeholder: textNullable('Placeholder text (placeholder)', 'Optional placeholder text'),
      size: select('Dropdown size (size)', sizes, null),
      validityMessage: textNullable('The validity message (validity-message)', ''),
      value: textNullable('The value of the selected item (value)', ''),
      onInput: action('bx-select-selected'),
    }),
  },
};

export default {
  title: 'Components/Select',
  parameters: {
    ...storyDocs.parameters,
  },
};
