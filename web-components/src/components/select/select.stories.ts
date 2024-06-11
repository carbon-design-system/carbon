/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import { prefix } from '../../globals/settings';
import { INPUT_SIZE } from '../text-input/text-input';
import './index';
import '../form/form-item';
import '../layer';
import '../../../.storybook/templates/with-layer';

const sizes = {
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Medium size (${INPUT_SIZE.MEDIUM})`]: INPUT_SIZE.MEDIUM,
  [`Large size (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

const args = {
  disabled: false,
  helperText: 'Optional helper text',
  hideLabel: false,
  inline: false,
  invalid: false,
  invalidText: 'Error message',
  labelText: 'Select an option',
  placeholder: 'Choose an option',
  size: INPUT_SIZE.MEDIUM,
  readOnly: false,
  warn: false,
  warnText: 'Warning message',
  value: '',
};

const argTypes = {
  disabled: {
    control: 'boolean',
    description: 'Specify whether the control is disabled.',
  },
  helperText: {
    control: 'text',
    description:
      'Provide text that is used alongside the control label for additional help.',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Specify whether the label should be hidden, or not.',
  },
  inline: {
    control: 'boolean',
    description: 'Specify whether you want the inline version of this control.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently value is invalid.',
  },
  invalidText: {
    control: 'text',
    description: 'Message which is displayed if the value is invalid.',
  },
  labelText: {
    control: 'text',
    description:
      'Provide label text to be read by screen readers when interacting with the control.',
  },
  placeholder: {
    control: 'text',
    description:
      'Placeholder text to be used with the <code>&lt;input&gt;</code>.',
  },
  size: {
    control: 'select',
    description: 'Specify the size of the Select Input.',
    options: sizes,
  },
  readOnly: {
    control: 'boolean',
    description: 'Whether the select should be read-only.',
  },
  warn: {
    control: 'boolean',
    description: 'Specify whether the control is currently in warning state.',
  },
  warnText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in warning state.',
  },
  value: {
    control: 'text',
    description: 'The value of the selected item.',
  },
  onInput: {
    action: `${prefix}-select-selected`,
  },
};

export const Default = {
  render: () => {
    return html`
      <cds-form-item>
        <cds-select
          helper-text="Optional helper text"
          label-text="Select an option"
          placeholder="Choose an option">
          <cds-select-item-group label="Category 1">
            <cds-select-item value="all">Option 1</cds-select-item>
            <cds-select-item value="cloudFoundry">Option 2</cds-select-item>
          </cds-select-item-group>
          <cds-select-item-group label="Category 2">
            <cds-select-item value="staging">Option 3</cds-select-item>
            <cds-select-item value="dea">Option 4</cds-select-item>
            <cds-select-item value="router">Option 5</cds-select-item>
          </cds-select-item-group>
        </cds-select>
      </cds-form-item>
    `;
  },
};

export const Inline = {
  render: () => {
    return html`
      <cds-form-item>
        <cds-select
          inline
          helper-text="Optional helper text"
          label-text="Select an option"
          placeholder="Choose an option">
          <cds-select-item-group label="Category 1">
            <cds-select-item value="all">Option 1</cds-select-item>
            <cds-select-item value="cloudFoundry">Option 2</cds-select-item>
          </cds-select-item-group>
          <cds-select-item-group label="Category 2">
            <cds-select-item value="staging">Option 3</cds-select-item>
            <cds-select-item value="dea">Option 4</cds-select-item>
            <cds-select-item value="router">Option 5</cds-select-item>
          </cds-select-item-group>
        </cds-select>
      </cds-form-item>
    `;
  },
};

export const Skeleton = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () => html` <cds-select-skeleton></cds-select-skeleton> `,
};

export const WithLayer = {
  render: () => {
    return html`
      <sb-template-layers>
        <cds-select
          helper-text="Optional helper text"
          placeholder="Choose an option">
          <cds-select-item-group label="Category 1">
            <cds-select-item value="all">Option 1</cds-select-item>
            <cds-select-item value="cloudFoundry">Option 2</cds-select-item>
          </cds-select-item-group>
          <cds-select-item-group label="Category 2">
            <cds-select-item value="staging">Option 3</cds-select-item>
            <cds-select-item value="dea">Option 4</cds-select-item>
            <cds-select-item value="router">Option 5</cds-select-item>
          </cds-select-item-group>
        </cds-select>
      </sb-template-layers>
    `;
  },
};

export const Playground = {
  args,
  argTypes,
  render: (args) => {
    const {
      disabled,
      helperText,
      hideLabel,
      inline,
      invalid,
      invalidText,
      labelText,
      name,
      placeholder,
      size,
      readOnly,
      warn,
      warnText,
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
    } = args ?? {};
    return html`
      <cds-form-item>
        <cds-select
          ?inline="${inline}"
          ?disabled="${disabled}"
          helper-text="${ifDefined(helperText)}"
          ?hide-label="${hideLabel}"
          ?invalid="${invalid}"
          invalid-text="${ifDefined(invalidText)}"
          label-text="${ifDefined(labelText)}"
          name="${ifDefined(name)}"
          placeholder="${ifDefined(placeholder)}"
          size="${ifDefined(size)}"
          ?readonly="${readOnly}"
          ?warn="${warn}"
          warn-text="${ifDefined(warnText)}"
          value="${ifDefined(value)}"
          @cds-select-selected="${ifDefined(onInput)}">
          ${children}
        </cds-select>
      </cds-form-item>
    `;
  },
};

const meta = {
  decorators: [
    (story) => {
      return html`<div style="width: 400px">${story()}</div>`;
    },
  ],
  title: 'Components/Select',
};

export default meta;
