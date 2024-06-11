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
import './form-group';
import '../text-input';
import '../stack';
import '../radio-button/index';
import '../button';

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
          <cds-button>Submit</cds-button>
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
