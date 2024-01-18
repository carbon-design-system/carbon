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
import { DROPDOWN_DIRECTION, DROPDOWN_SIZE } from './combo-box';
import './combo-box-item';
import storyDocs from './combo-box.mdx';

const items = [
  {
    value: 'option-0',
    text: 'An example option that is really long to show what should be done to handle long text',
  },
  {
    value: 'option-1',
    text: 'Option 1',
  },
  {
    value: 'option-2',
    text: 'Option 2',
  },
  {
    value: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    value: 'option-4',
    text: 'Option 4',
  },
  {
    value: 'option-5',
    text: 'Option 5',
  },
];

const directionOptions = {
  [`Top`]: DROPDOWN_DIRECTION.TOP,
  [`Bottom`]: DROPDOWN_DIRECTION.BOTTOM,
};

const sizes = {
  [`Small size (${DROPDOWN_SIZE.SMALL})`]: DROPDOWN_SIZE.SMALL,
  'Regular size': null,
  [`Large size (${DROPDOWN_SIZE.LARGE})`]: DROPDOWN_SIZE.LARGE,
};

const defaultArgs = {
  direction: DROPDOWN_DIRECTION.BOTTOM,
  disabled: false,
  hideLabel: false,
  helperText: 'This is some helper text',
  invalid: false,
  invalidText: 'invalid selection',
  label: 'This is an example label',
  readOnly: false,
  size: null,
  titleText: 'This is an example title',
  value: '',
  warn: false,
  warnText: 'please notice the warning',
};

const controls = {
  disabled: {
    control: 'boolean',
    description: `Specify if the dropdown should be disabled, or not.`,
  },
  direction: {
    control: 'select',
    options: directionOptions,
    description: `Dropdown direction`,
  },
  hideLabel: {
    control: 'boolean',
    description: `Specify if the title text should be hidden, or not.`,
  },
  helperText: {
    control: 'text',
    description: `The helper text for the dropdown.`,
  },
  invalid: {
    control: 'boolean',
    description: `Specify if the dropdown should display an invalid icon, or not.`,
  },
  invalidText: {
    control: 'text',
    description: `Message which is displayed if the value is invalid.`,
  },
  label: {
    control: 'text',
    description: `The default content of the trigger button.`,
  },
  readOnly: {
    control: 'boolean',
    description: `Specify if the dropdown should be read only, or not.`,
  },
  size: {
    control: 'select',
    options: sizes,
    description: `Dropdown size.`,
  },
  titleText: {
    control: 'text',
    description: `Text that will be read by a screen reader when visiting this control.`,
  },
  value: {
    control: 'text',
    description: `The value of the selected item.`,
  },
  warn: {
    control: 'boolean',
    description: `Specify whether the control is currently in warning state.`,
  },
  warnText: {
    control: 'text',
    description: `Text that is displayed when the control is in warning state.`,
  },
};

export const Default = {
  render: () => html`
    <cds-combo-box
      helper-text="Combobox helper text"
      title-text="ComboBox title">
      ${items.map(
        (elem) => html`
          <cds-combo-box-item ?disabled=${elem.disabled} value="${elem.value}"
            >${elem.text}</cds-combo-box-item
          >
        `
      )}
    </cds-combo-box>
  `,
};

export const WithLayer = {
  render: () => html`
    <sb-template-layers>
      <div style="width:300px">
        <cds-combo-box
          title-text="ComboBox label"
          helper-text="Combobox helper text"
          label="Dropdown menu options">
          ${items.map(
            (elem) => html`
              <cds-combo-box-item
                ?disabled=${elem.disabled}
                value="${elem.value}"
                >${elem.text}</cds-combo-box-item
              >
            `
          )}
        </cds-combo-box>
      </div>
    </sb-template-layers>
  `,
};

export const Playground = {
  argTypes: controls,
  args: defaultArgs,
  render: ({
    disabled,
    helperText,
    invalid,
    titleText,
    hideLabel,
    direction,
    readOnly,
    warn,
    warnText,
    size,
    label,
    type,
    invalidText,
    value,
  }) => html`
    <cds-combo-box
      ?disabled="${disabled}"
      ?hide-label=${hideLabel}
      helper-text=${ifDefined(helperText)}
      ?invalid=${invalid}
      invalid-text=${invalidText}
      direction="${direction}"
      ?read-only=${readOnly}
      title-text=${ifDefined(titleText)}
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      value=${ifDefined(value)}
      label=${ifDefined(label)}
      ?warn=${warn}
      warn-text=${warnText}>
      ${items.map(
        (elem) => html`
          <cds-combo-box-item ?disabled=${elem.disabled} value="${elem.value}"
            >${elem.text}</cds-combo-box-item
          >
        `
      )}
    </cds-combo-box>
  `,
};

const meta = {
  title: 'Components/Combo box',
  decorators: [
    (story, { name }) => {
      const width = !name.toLowerCase().includes('layer') ? `width:300px` : ``;
      return html` <div style="${width}">${story()}</div> `;
    },
  ],
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
