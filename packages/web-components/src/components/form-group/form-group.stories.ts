/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import View16 from '@carbon/icons/lib/view/16.js';
import FolderOpen16 from '@carbon/icons/lib/folder--open/16.js';
import Folders16 from '@carbon/icons/lib/folders/16.js';
import '../text-input/index';
import '../stack/index';
import '../radio-button/index';
import '../button/index';
import '../ai-label/index';
import '../combo-box/index';
import '../date-picker/index';
import '../dropdown/index';
import '../form/index';
import './index';
import '../icon-button/index';
import '../multi-select/index';
import '../number-input/index';
import '../select/index';
import '../textarea/index';

const args = {
  legendText: 'FormGroup Legend',
  message: false,
};

const argTypes = {
  legendText: {
    control: 'text',
    description: 'Provide the text to be rendered inside of the fieldset.',
  },
  message: {
    control: 'boolean',
    description:
      'Specify whether the message should be displayed in the form group.',
  },
  messageText: {
    control: 'text',
    description: 'Provide the text for the message in the form group.',
  },
};

export const Default = {
  render: () => {
    return html`
      <cds-form-group legend-text="FormGroup Legend">
        <cds-stack gap="7">
          <cds-text-input label="First Name"> </cds-text-input>
          <cds-text-input label="Last Name"> </cds-text-input>
          <cds-radio-button-group
            legend-text="Radio button heading"
            name="radio-button-group"
            value="radio-1">
            <cds-radio-button
              label-text="Option 1"
              value="radio-1"
              id="radio-1"></cds-radio-button>
            <cds-radio-button
              label-text="Option 2"
              value="radio-2"
              id="radio-2"></cds-radio-button>
            <cds-radio-button
              label-text="Option 3"
              value="radio-3"
              id="radio-3"></cds-radio-button>
          </cds-radio-button-group>
          <cds-button>Submit</cds-button>
        </cds-stack>
      </cds-form-group>
    `;
  },
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

const content = html`
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h1>84%</h1>
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
    ${View16({ slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${FolderOpen16({ slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${Folders16({ slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-icon-button>
  <cds-ai-label-action-button>View details</cds-ai-label-action-button>
`;

export const _WithAILabel = {
  args: {
    disabled: false,
    invalid: false,
    invalidText: 'Error message goes here',
    warn: false,
    warnText:
      'Warning message that is really long can wrap to more lines but should not be excessively long.',
    revert: false,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
    invalidText: {
      control: 'text',
    },
    warn: {
      control: 'boolean',
    },
    warnText: {
      control: 'text',
    },
    revert: {
      control: 'boolean',
    },
  },
  render: (args) => {
    const { disabled, invalid, invalidText, warn, warnText, revert } =
      args ?? {};

    return html`
      <div style="width: 400px">
        <cds-form-group>
          <cds-stack gap="7">
            <cds-form-item>
              <cds-number-input
                value="50"
                min="0"
                max="100"
                step="1"
                label="Number input"
                ?disabled="${disabled}"
                ?invalid="${invalid}"
                invalid-text="${invalidText}"
                ?warn="${warn}"
                warn-text="${warnText}">
                <cds-ai-label
                  alignment="bottom-left"
                  ?revert-active="${revert}">
                  ${content}${actions}
                </cds-ai-label>
              </cds-number-input>
            </cds-form-item>

            <cds-form-item>
              <cds-date-picker>
                <cds-date-picker-input
                  kind="single"
                  label-text="Date Picker label"
                  placeholder="mm/dd/yyyy"
                  ?disabled="${disabled}"
                  ?invalid="${invalid}"
                  invalid-text="${invalidText}"
                  ?warn="${warn}"
                  warn-text="${warnText}">
                  <cds-ai-label
                    alignment="bottom-left"
                    ?revert-active="${revert}">
                    ${content}${actions}</cds-ai-label
                  >
                </cds-date-picker-input>
              </cds-date-picker>
            </cds-form-item>

            <cds-form-item>
              <cds-text-input
                label="Text input label"
                placeholder="Placeholder text"
                ?disabled="${disabled}"
                ?invalid="${invalid}"
                invalid-text="${invalidText}"
                ?warn="${warn}"
                warn-text="${warnText}">
                <cds-ai-label
                  alignment="bottom-left"
                  ?revert-active="${revert}">
                  ${content}${actions}</cds-ai-label
                >
              </cds-text-input>
            </cds-form-item>

            <cds-form-item>
              <cds-textarea
                label="Text input label"
                placeholder="Placeholder text"
                ?disabled="${disabled}"
                ?invalid="${invalid}"
                invalid-text="${invalidText}"
                ?warn="${warn}"
                warn-text="${warnText}">
                <cds-ai-label
                  alignment="bottom-left"
                  ?revert-active="${revert}">
                  ${content}${actions}</cds-ai-label
                >
              </cds-textarea>
            </cds-form-item>

            <cds-dropdown
              helper-text="This is some helper text"
              title-text="Dropdown title"
              label="Option 1"
              ?disabled="${disabled}"
              ?invalid="${invalid}"
              invalid-text="${invalidText}"
              ?warn="${warn}"
              warn-text="${warnText}">
              <cds-ai-label alignment="bottom-left" ?revert-active="${revert}">
                ${content}${actions}</cds-ai-label
              >
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

            <cds-multi-select
              title-text="Multiselect title"
              label="Multiselect label"
              helper-text="This is helper text"
              ?disabled="${disabled}"
              ?invalid="${invalid}"
              invalid-text="${invalidText}"
              ?warn="${warn}"
              warn-text="${warnText}">
              <cds-ai-label alignment="bottom-left" ?revert-active="${revert}">
                ${content}${actions}</cds-ai-label
              >
              <cds-multi-select-item value="example">
                An example option that is really long to show what should be
                done to handle long text</cds-multi-select-item
              >
              <cds-multi-select-item value="all"
                >Option 1</cds-multi-select-item
              >
              <cds-multi-select-item value="cloudFoundry"
                >Option 2</cds-multi-select-item
              >
              <cds-multi-select-item disabled value="staging"
                >Option 3 - a disabled item</cds-multi-select-item
              >
              <cds-multi-select-item value="dea"
                >Option 4</cds-multi-select-item
              >
              <cds-multi-select-item value="router"
                >Option 5</cds-multi-select-item
              >
            </cds-multi-select>

            <cds-multi-select
              filterable="true"
              title-text="FilterableMultiselect title"
              helper-text="This is helper text"
              ?disabled="${disabled}"
              ?invalid="${invalid}"
              invalid-text="${invalidText}"
              ?warn="${warn}"
              warn-text="${warnText}">
              <cds-ai-label alignment="bottom-left" ?revert-active="${revert}">
                ${content}${actions}</cds-ai-label
              >
              <cds-multi-select-item value="example"
                >An example option that is really long to show what should be
                done to handle long text</cds-multi-select-item
              >
              <cds-multi-select-item value="all"
                >Option 1</cds-multi-select-item
              >
              <cds-multi-select-item value="cloudFoundry"
                >Option 2</cds-multi-select-item
              >
              <cds-multi-select-item disabled value="staging"
                >Option 3 - a disabled item</cds-multi-select-item
              >
              <cds-multi-select-item value="dea"
                >Option 4</cds-multi-select-item
              >
              <cds-multi-select-item value="router"
                >Option 5</cds-multi-select-item
              >
            </cds-multi-select>

            <cds-combo-box
              helper-text="This is some helper text"
              title-text="Combo box title"
              label="Filter..."
              ?disabled="${disabled}"
              ?invalid="${invalid}"
              invalid-text="${invalidText}"
              ?warn="${warn}"
              warn-text="${warnText}">
              <cds-ai-label alignment="bottom-left" ?revert-active="${revert}">
                ${content}${actions}</cds-ai-label
              >

              <cds-combo-box-item value="all">Option 1</cds-combo-box-item>
              <cds-combo-box-item value="cloudFoundry"
                >Option 2</cds-combo-box-item
              >
              <cds-combo-box-item value="staging">Option 3</cds-combo-box-item>
              <cds-combo-box-item value="dea">Option 4</cds-combo-box-item>
              <cds-combo-box-item value="router">Option 5</cds-combo-box-item>
              <cds-combo-box-item value="support">Option 6</cds-combo-box-item>
              <cds-combo-box-item value="services">Option 7</cds-combo-box-item>
              <cds-combo-box-item value="products">Option 8</cds-combo-box-item>
            </cds-combo-box>

            <cds-select
              helper-text="Optional helper text"
              label-text="Select"
              placeholder="Optional placeholder text"
              ?disabled="${disabled}"
              ?invalid="${invalid}"
              invalid-text="${invalidText}"
              ?warn="${warn}"
              warn-text="${warnText}">
              <cds-ai-label alignment="bottom-left" ?revert-active="${revert}">
                ${content}${actions}</cds-ai-label
              >
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
            <cds-form-item> <cds-button>Submit</cds-button></cds-form-item>
          </cds-stack>
        </cds-form-group>
      </div>
    `;
  },
};

export const Playground = {
  args,
  argTypes,
  render: (args) => {
    const { legendText, message, messageText } = args ?? {};
    return html`
      <cds-form-group
        legend-text="${ifDefined(legendText)}"
        ?message="${message}"
        message-text="${ifDefined(messageText)}">
        <cds-stack gap="7">
          <cds-text-input label="First Name"> </cds-text-input>
          <cds-text-input label="Last Name"> </cds-text-input>
          <cds-radio-button-group
            legend-text="Radio button heading"
            name="radio-button-group"
            value="radio-1">
            <cds-radio-button
              label-text="Option 1"
              value="radio-1"
              id="radio-1"></cds-radio-button>
            <cds-radio-button
              label-text="Option 2"
              value="radio-2"
              id="radio-2"></cds-radio-button>
            <cds-radio-button
              label-text="Option 3"
              value="radio-3"
              id="radio-3"></cds-radio-button>
          </cds-radio-button-group>
          <cds-form-item> <cds-button>Submit</cds-button></cds-form-item>
        </cds-stack>
      </cds-form-group>
    `;
  },
};

const meta = {
  title: 'Components/Form Group',
  decorators: [
    (story) => {
      return html` <div style="max-width:400px">${story()}</div> `;
    },
  ],
};

export default meta;
