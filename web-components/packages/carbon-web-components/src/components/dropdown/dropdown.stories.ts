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
import { DROPDOWN_DIRECTION, DROPDOWN_SIZE, DROPDOWN_TYPE } from './dropdown';
import './dropdown-item';
import './dropdown-skeleton';
import storyDocs from './dropdown.mdx';

const directionOptions = {
  [`Top`]: DROPDOWN_DIRECTION.TOP,
  [`Bottom`]: DROPDOWN_DIRECTION.BOTTOM,
};

const sizes = {
  [`Small size (${DROPDOWN_SIZE.SMALL})`]: DROPDOWN_SIZE.SMALL,
  [`Medium size (${DROPDOWN_SIZE.MEDIUM})`]: DROPDOWN_SIZE.MEDIUM,
  [`Large size (${DROPDOWN_SIZE.LARGE})`]: DROPDOWN_SIZE.LARGE,
};

const types = {
  Default: null,
  [`Inline (${DROPDOWN_TYPE.INLINE})`]: DROPDOWN_TYPE.INLINE,
};

const items = [
  {
    value: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
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

const defaultArgs = {
  direction: DROPDOWN_DIRECTION.BOTTOM,
  disabled: false,
  hideLabel: false,
  helperText: 'This is some helper text',
  invalid: false,
  invalidText: 'invalid selection',
  label: 'This is an example label',
  open: false,
  readOnly: false,
  size: null,
  titleText: 'This is an example title',
  type: null,
  value: '',
  warn: false,
  warnText: 'please notice the warning',  
}

const controls = {
  disabled: {
    control: 'boolean',
    description: `Specify if the dropdown should be disabled, or not.`,
  },
  direction: {
    control: 'select', options: directionOptions,
    description: `Dropdown direction.`
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
  open: {
    control: 'boolean',
    description: `Specify if the dropdown should be open, or not.`,
  },
  readOnly: {
    control: 'boolean',
    description: `Specify if the dropdown should be read only, or not.`,
  },
  size: {
    control: 'select', options: sizes,
    description: `Dropdown size.`
  },
  titleText: {
    control: 'text',
    description: `Text that will be read by a screen reader when visiting this control.`,
  },
  type: {
    control: 'select', options: types,
    description: `Dropdown size.`
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
    <cds-dropdown
      helper-text="This is some helper text"
      title-text="Dropdown label"
      label="Dropdown menu options">
      ${items.map(
        (elem) => html`
          <cds-dropdown-item ?disabled=${elem.disabled} value="${elem.value}"
            >${elem.text}</cds-dropdown-item
          >
        `
      )}
    </cds-dropdown>
  `
};

export const Inline = {
  render: () => html`
    <cds-dropdown
      type="inline"
      title-text="Inline dropdown label"
      label="Dropdown menu options">
      ${items.map(
        (elem) => html`
          <cds-dropdown-item ?disabled=${elem.disabled} value="${elem.value}"
            >${elem.text}</cds-dropdown-item
          >
        `
      )}
    </cds-dropdown>
  `
};

export const InlineWithLayer = {
  render: () => html`
    <sb-template-layers>
      <div style="width:400px">
        <cds-dropdown
          type="inline"
          title-text="Inline dropdown label"
          label="Dropdown menu options">
          ${items.map(
            (elem) => html`
              <cds-dropdown-item
                ?disabled=${elem.disabled}
                value="${elem.value}"
                >${elem.text}</cds-dropdown-item
              >
            `
          )}
        </cds-dropdown>
      </div>
    </sb-template-layers>
  `
};

export const WithLayer = {
  render: () => html`
    <sb-template-layers>
      <div style="width:400px">
        <cds-dropdown
          title-text="Dropdown label"
          helper-text="This is some helper text"
          label="Dropdown menu options">
          ${items.map(
            (elem) => html`
              <cds-dropdown-item
                ?disabled=${elem.disabled}
                value="${elem.value}"
                >${elem.text}</cds-dropdown-item
              >
            `
          )}
        </cds-dropdown>
      </div>
    </sb-template-layers>
  `
};

export const Playground = {
  argTypes: controls,
  args: defaultArgs,
  render: ({
    open,
    direction,
    disabled,
    helperText,
    hideLabel,
    invalid,
    invalidText,
    titleText,
    readOnly,
    size,
    type,
    value,
    label,
    warn,
    warnText,
  }) =>
   html`
    <cds-dropdown
      ?open=${open}
      ?disabled="${disabled}"
      ?hide-label=${hideLabel}
      helper-text=${ifDefined(helperText)}
      ?invalid=${invalid}
      ?read-only=${readOnly}
      invalid-text=${invalidText}
      direction="${direction}"
      title-text=${ifDefined(titleText)}
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      value=${ifDefined(value)}
      label=${ifDefined(label)}
      ?warn=${warn}
      warn-text=${warnText}>
      ${items.map(
        (elem) => html`
          <cds-dropdown-item ?disabled=${elem.disabled} value="${elem.value}"
            >${elem.text}</cds-dropdown-item
          >
        `
      )}
    </cds-dropdown>
  `
};

export const Skeleton = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () => html` <cds-dropdown-skeleton></cds-dropdown-skeleton> `
}

const meta = {
  title: 'Components/Dropdown',
  decorators: [
    (story, { name }) => {
      const width = !name.toLowerCase().includes('layer') ? `width:400px` : ``;
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
