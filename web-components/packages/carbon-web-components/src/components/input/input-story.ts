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
import * as knobs from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import storyDocs from './input-story.mdx';
import { prefix } from '../../globals/settings';
import './input';
import '../form/form-item';

import { action } from '@storybook/addon-actions';
import { INPUT_COLOR_SCHEME, INPUT_SIZE, INPUT_TYPE } from './input';

const inputTypes = Object.entries(INPUT_TYPE).reduce(
  (acc, [key, val]) => ({
    ...acc,
    [`${key.toLowerCase()}`]: val,
  }),
  {}
);

const sizes = {
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  Regular: null,
  [`Large size (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${INPUT_COLOR_SCHEME.LIGHT})`]: INPUT_COLOR_SCHEME.LIGHT,
};

const createProps = ({ boolean, textNonEmpty, select }) => {
  const type = select('Input type (type)', inputTypes, INPUT_TYPE.TEXT);
  return {
    colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
    disabled: boolean('Disabled (disabled)', false),
    value: textNonEmpty('Input value (value)', ''),
    placeholder: textNonEmpty('Placeholder text (placeholder)', ''),
    invalid: boolean('Invalid (invalid)', false),
    onInput: action('input'),
    showPasswordVisibilityToggle:
      type === INPUT_TYPE.TEXT || type === INPUT_TYPE.PASSWORD
        ? boolean(
            'Show password visibility toggle (show-password-visibility-toggle)',
            false
          )
        : null,
    size: select('Input size (size)', sizes, INPUT_SIZE.REGULAR),
    type,
  };
};

export const Default = (args) => {
  const {
    autocomplete,
    autofocus,
    colorScheme,
    disabled,
    helperText,
    invalid,
    labelText,
    name,
    pattern,
    placeholder,
    readonly,
    required,
    showPasswordVisibilityToggle,
    size,
    type,
    validityMessage,
    value,
    onInput,
  } = args?.[`${prefix}-input`] ?? {};
  return html`
    <cds-input
      autocomplete="${ifDefined(autocomplete)}"
      ?autofocus="${autofocus}"
      color-scheme="${ifDefined(colorScheme)}"
      ?disabled="${disabled}"
      helper-text="${ifDefined(helperText)}"
      ?invalid="${invalid}"
      label-text="${ifDefined(labelText)}"
      name="${ifDefined(name)}"
      pattern="${ifDefined(pattern)}"
      placeholder="${ifDefined(placeholder)}"
      ?readonly="${readonly}"
      ?required="${required}"
      ?show-password-visibility-toggle="${showPasswordVisibilityToggle}"
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      validity-message="${ifDefined(validityMessage)}"
      value="${ifDefined(value)}"
      @input="${onInput}">
      <span slot="label-text">Text input label</span>
      <span slot="helper-text">Optional help text</span>
    </cds-input>
  `;
};

Default.storyName = 'Default';

export const withoutFormItemWrapper = (args) => {
  const {
    colorScheme,
    disabled,
    invalid,
    placeholder,
    showPasswordVisibilityToggle,
    size,
    type,
    value,
    onInput,
  } = args?.[`${prefix}-input`] ?? {};
  return html`
    <cds-input
      value="${ifDefined(value)}"
      color-scheme="${ifDefined(colorScheme)}"
      placeholder="${ifDefined(placeholder)}"
      size="${ifDefined(size)}"
      @input="${onInput}"
      ?invalid="${invalid}"
      ?disabled="${disabled}"
      ?show-password-visibility-toggle="${showPasswordVisibilityToggle}"
      type="${ifDefined(type)}">
      <span slot="label-text">Label text</span>
      <span slot="helper-text">Optional helper text</span>
      <span slot="validity-message">Something isn't right</span>
    </cds-input>
  `;
};

withoutFormItemWrapper.storyName = 'Without form item wrapper';

export default {
  title: 'Components/TextInput',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      [`${prefix}-input`]: () =>
        createProps({ ...knobs, textNonEmpty: textNullable }),
    },
  },
};
