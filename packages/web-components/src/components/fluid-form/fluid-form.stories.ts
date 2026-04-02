/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import '../fluid-text-input/index';
import '../fluid-textarea/index';
import '../fluid-number-input/index';
import '../fluid-select/index';
import '../fluid-time-picker/index';
import '../fluid-password-input/index';
import '../select/index';
import '../button/index';
import '../modal/index';
import '../fluid-search/index';

const additionalProps = {
  class: 'some-class',
};

const TextInputProps = {
  class: 'some-class',
  id: 'test2',
  label: 'Text Input label',
  placeholder: 'Placeholder text',
};

const TextAreaProps = {
  class: 'some-class',
  id: 'test3',
  label: 'Text Area label',
  placeholder: 'Placeholder text',
};

const InvalidPasswordProps = {
  class: 'some-class',
  id: 'test4',
  label: 'Password',
  value: '0000',
};

export const Default = {
  render: () => {
    const toggleButton = () => {
      document.querySelector('cds-modal')?.toggleAttribute('open');
    };
    return html`
      <cds-fluid-form aria-label="sample form" class="${additionalProps.class}">
        <div style="display: flex;">
          <cds-fluid-time-picker
            id="time-picker-1"
            label-text="Time"
            placeholder="hh:mm">
            <cds-fluid-time-picker-select
              id="select-01"
              label-text="Clock"
              default-value="am">
              <cds-select-item value="am">AM</cds-select-item>
              <cds-select-item value="pm">PM</cds-select-item>
            </cds-fluid-time-picker-select>
            <cds-fluid-time-picker-select
              id="select-02"
              label-text="Timezone"
              default-value="et">
              <cds-select-item value="et">Eastern Time (ET)</cds-select-item>
              <cds-select-item value="ct">Central Time (CT)</cds-select-item>
              <cds-select-item value="mt">Mountain Time (MT)</cds-select-item>
              <cds-select-item value="pt">Pacific Time (PT)</cds-select-item>
            </cds-fluid-time-picker-select>
          </cds-fluid-time-picker>
          <!-- TODO: cds-fluid-date-picker should go here, once it is implemented -->
          <cds-fluid-select
            id="select-1"
            label-text="Choose an option"
            placeholder="Choose an option">
            <cds-select-item value="placeholder-item" disabled hidden
              >Choose an option</cds-select-item
            >
            <cds-select-item-group label="Category 1">
              <cds-select-item value="option-1">Option 1</cds-select-item>
              <cds-select-item value="option-2">Option 2</cds-select-item>
            </cds-select-item-group>
            <cds-select-item-group label="Category 2">
              <cds-select-item value="option-3">Option 3</cds-select-item>
              <cds-select-item value="option-4">Option 4</cds-select-item>
            </cds-select-item-group>
          </cds-fluid-select>
        </div>

        <div style="display: flex;">
          <cds-fluid-text-input
            class="${TextInputProps.class}"
            id="${TextInputProps.id}"
            label="${TextInputProps.label}"
            placeholder="${TextInputProps.placeholder}">
          </cds-fluid-text-input>
          <cds-fluid-number-input
            label="Number Input Label"
            id="input-default"
            step="10"
            min="0"
            max="100"
            value="50">
          </cds-fluid-number-input>
        </div>

        <cds-fluid-text-input
          type="password"
          pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$"
          class="${InvalidPasswordProps.class}"
          id="${InvalidPasswordProps.id}"
          label="${InvalidPasswordProps.label}"
          value="${InvalidPasswordProps.value}">
        </cds-fluid-text-input>

        <cds-fluid-textarea
          class="${TextAreaProps.class}"
          id="${TextAreaProps.id}"
          label="${TextAreaProps.label}"
          placeholder="${TextAreaProps.placeholder}">
        </cds-fluid-textarea>
      </cds-fluid-form>

      <br />

      <cds-modal size="md">
        <cds-modal-header>
          <cds-modal-close-button></cds-modal-close-button>
          <cds-modal-label>Label</cds-modal-label>
          <cds-modal-heading>Modal heading</cds-modal-heading>
        </cds-modal-header>
        <cds-modal-body has-scrolling-content>
          <cds-fluid-form class="${additionalProps.class}">
            <cds-fluid-text-input
              class="${TextInputProps.class}"
              id="${TextInputProps.id}"
              label="${TextInputProps.label}"
              placeholder="${TextInputProps.placeholder}">
            </cds-fluid-text-input>
            <cds-fluid-text-input
              type="password"
              pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$"
              class="${InvalidPasswordProps.class}"
              id="${InvalidPasswordProps.id}"
              label="${InvalidPasswordProps.label}"
              value="${InvalidPasswordProps.value}">
            </cds-fluid-text-input>
            <cds-fluid-textarea
              class="${TextAreaProps.class}"
              id="${TextAreaProps.id}"
              label="${TextAreaProps.label}"
              placeholder="${TextAreaProps.placeholder}">
            </cds-fluid-textarea>
          </cds-fluid-form>
        </cds-modal-body>
        <cds-modal-footer>
          <cds-modal-footer-button kind="secondary" data-modal-close>
            Cancel
          </cds-modal-footer-button>
          <cds-modal-footer-button kind="primary">
            Save
          </cds-modal-footer-button>
        </cds-modal-footer>
      </cds-modal>
      <cds-button @click="${toggleButton}">Fluid form in modal</cds-button>
    `;
  },
};

const meta = {
  title: 'Components/Fluid Components/FluidForm',
};

export default meta;
