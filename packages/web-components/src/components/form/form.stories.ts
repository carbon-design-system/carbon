/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { iconLoader } from '../../globals/internal/icon-loader';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import './index';
import '../stack/index';
import '../ai-label/index';
import '../radio-button/index';
import '../checkbox/index';
import '../form-group/index';
import '../number-input/index';
import '../select/index';
import '../file-uploader/index';
import '../search/index';
import '../text-input/index';
import '../textarea/index';
import '../button/index';
import '../date-picker/index';
import '../dropdown/index';
import '../multi-select/index';
import '../combo-box/index';

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

export const Default = {
  render: () => {
    const handleSubmit = () => {
      const form =
        (document
          .getElementById('test-form')
          ?.shadowRoot?.querySelector('form') as HTMLFormElement) || null;
      if (!form) return;

      const invalid = Array.from(document.querySelectorAll('[required]')).some(
        (el: Element) => {
          const input = el.shadowRoot?.querySelector('input');
          return input ? !input.reportValidity() : false;
        }
      );
      if (invalid) return;

      form.requestSubmit();
    };

    return html`
      <cds-form id="test-form">
        <cds-stack gap="7">
          <cds-form-group legend-text="Checkbox heading">
            <cds-checkbox default-checked>Checkbox label</cds-checkbox>
            <cds-checkbox>Checkbox label</cds-checkbox>
            <cds-checkbox disabled>Checkbox label</cds-checkbox>
          </cds-form-group>

          <cds-number-input
            label="Number Input"
            min="0"
            max="100"
            value="50"
            step="10"
            icon-description="Add/decrement number"></cds-number-input>

          <cds-form-group legend-text="File Uploader">
            <cds-file-uploader
              label-description="Max file size is 500 MB. Only .jpg files are supported."
              icon-description="Dimiss file"
              input-name="">
              <cds-file-uploader-button
                accept="image/jpeg"
                name="default-file-uploader-button"
                button-kind="primary"
                size="md"
                multiple>
                Add file
              </cds-file-uploader-button>
            </cds-file-uploader>
          </cds-form-group>

          <cds-radio-button-group
            legend-text="Radio Button heading"
            name="radio-button-group"
            value="default-selected">
            <cds-radio-button
              value="standard"
              id="radio-1"
              label-text="Standard Radio Button"></cds-radio-button>
            <cds-radio-button
              value="default-selected"
              id="radio-2"
              label-text="Default Selected Radio Button"></cds-radio-button>
            <cds-radio-button
              value="blue"
              id="radio-3"
              label-text="Standard Radio Button"></cds-radio-button>
            <cds-radio-button
              value="disabled"
              id="radio-4"
              disableditem
              label-text="Disabled Radio Button"></cds-radio-button>
          </cds-radio-button-group>

          <cds-form-group legend-text="Search">
            <cds-search
              size="md"
              placeholder="Search"
              label-text="Search"></cds-search>
          </cds-form-group>

          <cds-select label-text="Select" placeholder="Choose an Option">
            <cds-select-item value="option-1">Option 1</cds-select-item>
            <cds-select-item value="option-2">Option 2</cds-select-item>
            <cds-select-item value="option-3">Option 3</cds-select-item>
          </cds-select>

          <cds-text-input
            label="Text Input Label"
            placeholder="Placeholder text"></cds-text-input>

          <cds-text-input
            required
            type="password"
            label="Password"
            pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$"></cds-text-input>

          <cds-text-input
            required
            type="password"
            label="Password"
            pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$"
            invalid
            invalid-text="Your password must be at least 6 characters as well as contain at least one uppercase one lowercase, and one number."></cds-text-input>

          <cds-textarea
            label="Text Area label"
            placeholder="Placeholder text"
            rows="4"></cds-textarea>
          <cds-button type="submit" @click=${handleSubmit}> Submit </cds-button>
        </cds-stack>
      </cds-form>
    `;
  },
};

export const WithAILabel = {
  args: {
    revertActive: false,
    invalid: false,
    invalidText:
      'Error message that is really long can wrap to more lines but should not be excessively long.',
    disabled: false,
    warn: false,
    warnText:
      'Warning message that is really long can wrap to more lines but should not be excessively long.',
  },
  argTypes: {
    revertActive: {
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
  },
  render: (args) => {
    const { revertActive, invalid, invalidText, disabled, warn, warnText } =
      args ?? {};
    const aiLabel = html` <cds-ai-label
      alignment="bottom-left"
      ?revert-active="${revertActive}">
      ${content}${actions}
    </cds-ai-label>`;

    const handleSubmit = () => {
      const form =
        (document
          .getElementById('test-form')
          ?.shadowRoot?.querySelector('form') as HTMLFormElement) || null;
      if (!form) return;
      form.requestSubmit();
    };
    return html`
      <cds-form id="test-form"
        ><cds-stack gap="7">
          <cds-number-input
            label="Number Input"
            min="0"
            max="100"
            value="50"
            step="10"
            icon-description="Add/decrement number"
            ?disabled="${disabled}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
            ${aiLabel}</cds-number-input
          >
          <cds-date-picker>
            <cds-date-picker-input
              kind="single"
              label-text="Date Picker label"
              placeholder="mm/dd/yyyy"
              size="md"
              ?disabled="${disabled}"
              ?invalid="${invalid}"
              invalid-text="${invalidText}"
              ?warn="${warn}"
              warn-text="${warnText}">
              ${aiLabel}
            </cds-date-picker-input>
          </cds-date-picker>

          <cds-text-input
            label="Text Input label"
            placeholder="Placeholder text"
            ?disabled="${disabled}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
            ${aiLabel}
          </cds-text-input>

          <cds-textarea
            label="Text Area label"
            placeholder="Placeholder text"
            rows="4"
            ?disabled="${disabled}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
            ${aiLabel}
          </cds-textarea>

          <cds-dropdown
            helper-text="This is some helper text"
            title-text="Dropdown title"
            label="Option 1"
            value="option-1"
            ?disabled="${disabled}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
            ${aiLabel}
            <cds-dropdown-item value="option-0"
              >Lorem, ipsum dolor sit amet consectetur adipisicing
              elit.</cds-dropdown-item
            >
            <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
            <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
            <cds-dropdown-item disabled="" value="option-3"
              >Option 3 - a disabled item</cds-dropdown-item
            >
            <cds-dropdown-item value="option-4">Option 4</cds-dropdown-item>
            <cds-dropdown-item value="option-5">Option 5</cds-dropdown-item>
          </cds-dropdown>

          <cds-multi-select
            label="Multiselect label"
            title-text="Multiselect title"
            helper-text="This is helper text"
            ?disabled="${disabled}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
            <cds-multi-select-item value="option-0"
              >Lorem, ipsum dolor sit amet consectetur adipisicing
              elit.</cds-multi-select-item
            >
            <cds-multi-select-item value="option-1"
              >Option 1</cds-multi-select-item
            >
            <cds-multi-select-item value="option-2"
              >Option 2</cds-multi-select-item
            >
            <cds-multi-select-item disabled="" value="option-3"
              >Option 3 - a disabled item</cds-multi-select-item
            >
            <cds-multi-select-item value="option-4"
              >Option 4</cds-multi-select-item
            >
            <cds-multi-select-item value="option-5"
              >Option 5</cds-multi-select-item
            >
            ${aiLabel}
          </cds-multi-select>

          <cds-multi-select
            filterable
            title-text="FilterableMultiselect title"
            helper-text="This is helper text"
            ?disabled="${disabled}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
            <cds-multi-select-item value="option-0"
              >Lorem, ipsum dolor sit amet consectetur adipisicing
              elit.</cds-multi-select-item
            >
            <cds-multi-select-item value="option-1"
              >Option 1</cds-multi-select-item
            >
            <cds-multi-select-item value="option-2"
              >Option 2</cds-multi-select-item
            >
            <cds-multi-select-item disabled="" value="option-3"
              >Option 3 - a disabled item</cds-multi-select-item
            >
            <cds-multi-select-item value="option-4"
              >Option 4</cds-multi-select-item
            >
            <cds-multi-select-item value="option-5"
              >Option 5</cds-multi-select-item
            >
            ${aiLabel}
          </cds-multi-select>

          <cds-combo-box
            title-text="ComboBox title"
            helper-text="Combobox helper text"
            ?disabled="${disabled}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
            ${aiLabel}
            <cds-combo-box-item value="option-0"
              >Lorem, ipsum dolor sit amet consectetur adipisicing
              elit.</cds-combo-box-item
            >
            <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
            <cds-combo-box-item value="option-2">Option 2</cds-combo-box-item>
            <cds-combo-box-item disabled="" value="option-3"
              >Option 3 - a disabled item</cds-combo-box-item
            >
            <cds-combo-box-item value="option-4">Option 4</cds-combo-box-item>
            <cds-combo-box-item value="option-5">Option 5</cds-combo-box-item>
          </cds-combo-box>

          <cds-select
            label-text="Select an option"
            ?disabled="${disabled}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
            ${aiLabel}
            <cds-select-item
              value="An example option that is really long to show what should be done to handle long text"
              >An example option that is really long to show what should be done
              to handle long text</cds-select-item
            >
            <cds-select-item value="option-1">Option 1</cds-select-item>
            <cds-select-item value="option-2">Option 2</cds-select-item>
            <cds-select-item value="option-3">Option 3</cds-select-item>
          </cds-select>
          <cds-button type="submit" @click=${handleSubmit}> Submit </cds-button>
        </cds-stack>
      </cds-form>
    `;
  },
};

const meta = {
  title: 'Components/Form',
};
export default meta;
