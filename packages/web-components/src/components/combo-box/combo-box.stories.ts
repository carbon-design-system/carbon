/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DROPDOWN_DIRECTION, DROPDOWN_SIZE } from './combo-box';
import './index';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import '../ai-label/index';
import { iconLoader } from '../../globals/internal/icon-loader';

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
  invalidText: '',
  label: '',
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
  argTypes: controls,
  args: {
    ...defaultArgs,
    helperText: 'Combobox helper text',
    titleText: 'ComboBox title',
  },
  render: (args) => {
    const {
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
    } = args ?? {};
    return html`
      <cds-combo-box
        ?disabled=${disabled}
        ?hide-label=${hideLabel}
        helper-text=${ifDefined(helperText)}
        ?invalid=${invalid}
        invalid-text=${ifDefined(invalidText)}
        direction=${ifDefined(direction)}
        ?read-only=${readOnly}
        title-text=${ifDefined(titleText)}
        size=${ifDefined(size)}
        type=${ifDefined(type)}
        value=${ifDefined(value)}
        label=${ifDefined(label)}
        ?warn=${warn}
        warn-text=${ifDefined(warnText)}>
        ${items.map(
          (elem) => html`
            <cds-combo-box-item ?disabled=${elem.disabled} value="${elem.value}"
              >${elem.text}</cds-combo-box-item
            >
          `
        )}
      </cds-combo-box>
    `;
  },
};

const content = html`
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h2 class="ai-label-heading">84%</h2>
    <p class="secondary bold">Confidence score</p>
    <p class="secondary">
      Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
    </p>
    <hr />
    <p class="secondary">Model type</p>
    <p class="bold">Foundation model</p>
  </div>
`;

const actions = html`
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(View16, { slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(FolderOpen16, { slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(Folders16, { slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-icon-button>
  <cds-ai-label-action-button>View details</cds-ai-label-action-button>
`;

export const AllowCustomValue = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    helperText: 'Combobox helper text',
    titleText: 'ComboBox title',
  },
  render: (args) => {
    const {
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
    } = args ?? {};
    return html`
      <cds-combo-box
        direction=${ifDefined(direction)}
        ?disabled=${disabled}
        helper-text=${ifDefined(helperText)}
        ?hide-label=${hideLabel}
        ?invalid=${invalid}
        invalid-text=${ifDefined(invalidText)}
        ?read-only=${readOnly}
        title-text=${ifDefined(titleText)}
        size=${ifDefined(size)}
        type=${ifDefined(type)}
        value=${ifDefined(value)}
        label=${ifDefined(label)}
        ?warn=${warn}
        warn-text=${ifDefined(warnText)}
        should-filter-item>
        <cds-combo-box-item value="apple">Apple</cds-combo-box-item>
        <cds-combo-box-item value="orange">Orange</cds-combo-box-item>
        <cds-combo-box-item value="banana">Banana</cds-combo-box-item>
        <cds-combo-box-item value="pineapple">Pineapple</cds-combo-box-item>
        <cds-combo-box-item value="raspberry">Raspberry</cds-combo-box-item>
        <cds-combo-box-item value="lime">Lime</cds-combo-box-item>
      </cds-combo-box>
    `;
  },
};

export const WithAILabel = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    helperText: 'Combobox helper text',
    titleText: 'ComboBox title',
  },
  render: (args) => {
    const {
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
    } = args ?? {};
    return html`
      <cds-combo-box
        ?disabled=${disabled}
        ?hide-label=${hideLabel}
        helper-text=${ifDefined(helperText)}
        ?invalid=${invalid}
        invalid-text=${ifDefined(invalidText)}
        direction=${ifDefined(direction)}
        ?read-only=${readOnly}
        title-text=${ifDefined(titleText)}
        size=${ifDefined(size)}
        type=${ifDefined(type)}
        value=${ifDefined(value)}
        label=${ifDefined(label)}
        ?warn=${warn}
        warn-text=${ifDefined(warnText)}>
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}</cds-ai-label
        >

        ${items.map(
          (elem) => html`
            <cds-combo-box-item ?disabled=${elem.disabled} value="${elem.value}"
              >${elem.text}</cds-combo-box-item
            >
          `
        )}
      </cds-combo-box>
    `;
  },
};

export const AutocompleteWithTypeahead = {
  render: () => html`
    <cds-combo-box
      title-text="ComboBox title"
      helper-text="Combobox helper text"
      typeahead>
      <cds-combo-box-item value="apple">Apple</cds-combo-box-item>
      <cds-combo-box-item value="apricot">Apricot</cds-combo-box-item>
      <cds-combo-box-item value="avocado">Avocado</cds-combo-box-item>
      <cds-combo-box-item value="banana">Banana</cds-combo-box-item>
      <cds-combo-box-item value="blackberry">Blackberry</cds-combo-box-item>
      <cds-combo-box-item value="blueberry">Blueberry</cds-combo-box-item>
      <cds-combo-box-item value="cantaloupe">Cantaloupe</cds-combo-box-item>
    </cds-combo-box>
  `,
};
export const WithLayer = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    helperText: 'Combobox helper text',
    titleText: 'ComboBox title',
  },
  render: (args) => {
    const {
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
    } = args ?? {};
    return html`
      <sb-template-layers>
        <div style="width:300px">
          <cds-combo-box
            direction=${ifDefined(direction)}
            ?disabled=${disabled}
            helper-text=${ifDefined(helperText)}
            ?hide-label=${hideLabel}
            ?invalid=${invalid}
            invalid-text=${ifDefined(invalidText)}
            ?read-only=${readOnly}
            title-text=${ifDefined(titleText)}
            size=${ifDefined(size)}
            type=${ifDefined(type)}
            value=${ifDefined(value)}
            label=${ifDefined(label)}
            ?warn=${warn}
            warn-text=${ifDefined(warnText)}>
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
    `;
  },
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
};

export default meta;
