/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean } from '@storybook/addon-knobs';
import { prefix } from '../../globals/settings';
import textNullable from '../../../.storybook/knob-text-nullable';
import { ifDefined } from 'lit/directives/if-defined.js';
import './form-group';
import '../text-input';
import '../stack';
import '../radio-button/index';
import '../button';
import storyDocs from './form-group-story.mdx';

export const Default = () => {
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
};

export const Playground = (args) => {
  const { legendText, message, messageText } = args?.['cds-form-group'] ?? {};
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
};

Playground.parameters = {
  knobs: {
    [`${prefix}-form-group`]: () => ({
      legendText: textNullable('Legend Text (legend-text)', 'FormGroup Legend'),
      message: boolean('message', false),
      messageText: textNullable('Message Text (message-text)', ''),
    }),
  },
};

export default {
  title: 'Components/Form Group',
  parameters: {
    ...storyDocs.parameters,
  },
  decorators: [
    (story) => {
      return html` <div style="max-width:400px">${story()}</div> `;
    },
  ],
};
