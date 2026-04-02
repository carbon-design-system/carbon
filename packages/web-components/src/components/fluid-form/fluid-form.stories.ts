/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import spread from '../../globals/directives/spread';
import './index';
import '../fluid-text-input';
import '../fluid-textarea';
import '../fluid-number-input';
import '../fluid-select';
import '../fluid-time-picker';
import '../fluid-password-input';
import '../button';
import '../modal';
import '../fluid-search';
import '../fluid-password-input';

const additionalProps = {
  class: 'some-class',
  'aria-label': 'sample form',
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

const PasswordInputProps = {
  class: 'some-class',
  id: 'test4',
  label: 'Password',
  value: '0000',
};

export const Default = {
  render: (args) => {
    const { disabled, readonly, invalid, invalidText, warn, warnText } = args;
    const toggleButton = () => {
      document.querySelector('cds-modal')?.toggleAttribute('open');
    };
    return html`
      <cds-fluid-form ...=${spread(additionalProps)}>
        <div style="display: flex;">
          <cds-fluid-time-picker
            id="time-picker-1"
            label-text="Time"
            placeholder="hh:mm"
            ?disabled="${disabled}"
            ?readonly="${readonly}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warning="${warn}"
            warning-text="${warnText}">
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
            placeholder="Choose an option"
            ?disabled="${disabled}"
            ?readonly="${readonly}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
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
            ...=${spread(TextInputProps)}
            ?disabled="${disabled}"
            ?readonly="${readonly}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
          </cds-fluid-text-input>
          <cds-fluid-number-input
            label="Number Input Label"
            id="input-default"
            step="10"
            min="0"
            max="100"
            value="50"
            ?disabled="${disabled}"
            ?readonly="${readonly}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
          </cds-fluid-number-input>
        </div>

        <cds-fluid-password-input
          ...=${spread(PasswordInputProps)}
          ?disabled="${disabled}"
          ?readonly="${readonly}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-fluid-password-input>

        <cds-fluid-textarea
          ...=${spread(TextAreaProps)}
          ?disabled="${disabled}"
          ?readonly="${readonly}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-fluid-textarea>
      </cds-fluid-form>

      <br />

      <cds-modal size="md" prevent-close-on-click-outside>
        <cds-modal-header>
          <cds-modal-close-button></cds-modal-close-button>
          <cds-modal-label>Label</cds-modal-label>
          <cds-modal-heading>Modal heading</cds-modal-heading>
        </cds-modal-header>
        <cds-modal-body has-scrolling-content>
          <cds-fluid-form ...=${spread(additionalProps)}>
            <cds-fluid-text-input
              class="${TextInputProps.class}"
              id="modal-test2"
              label="${TextInputProps.label}"
              placeholder="${TextInputProps.placeholder}"
              ?disabled="${disabled}"
              ?readonly="${readonly}"
              ?invalid="${invalid}"
              invalid-text="${invalidText}"
              ?warn="${warn}"
              warn-text="${warnText}">
            </cds-fluid-text-input>
            <cds-fluid-password-input
              class="${PasswordInputProps.class}"
              id="modal-test4"
              label="${PasswordInputProps.label}"
              value="${PasswordInputProps.value}"
              ?disabled="${disabled}"
              ?readonly="${readonly}"
              ?invalid="${invalid}"
              invalid-text="${invalidText}"
              ?warn="${warn}"
              warn-text="${warnText}">
            </cds-fluid-password-input>
            <cds-fluid-textarea
              class="${TextAreaProps.class}"
              id="modal-test3"
              label="${TextAreaProps.label}"
              placeholder="${TextAreaProps.placeholder}"
              ?disabled="${disabled}"
              ?readonly="${readonly}"
              ?invalid="${invalid}"
              invalid-text="${invalidText}"
              ?warn="${warn}"
              warn-text="${warnText}">
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
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Specify whether the fluid form inputs should be disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Specify whether the fluid form inputs should be read-only',
    },
    invalid: {
      control: 'boolean',
      description:
        'Specify whether the fluid form inputs are in an invalid state',
    },
    invalidText: {
      control: 'text',
      description: 'Provide the text for the invalid state',
    },
    warn: {
      control: 'boolean',
      description:
        'Specify whether the fluid form inputs should display a warning',
    },
    warnText: {
      control: 'text',
      description: 'Provide the text for the warning state',
    },
  },
  args: {
    disabled: false,
    readonly: false,
    invalid: false,
    invalidText:
      'Error message that is really long can wrap to more lines but should not be excessively long.',
    warn: false,
    warnText:
      'Warning message that is really long can wrap to more lines but should not be excessively long.',
  },
};

export default meta;
