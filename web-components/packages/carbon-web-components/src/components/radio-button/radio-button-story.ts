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
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import { prefix } from '../../globals/settings';
import { RADIO_BUTTON_ORIENTATION } from './radio-button-group';
import { RADIO_BUTTON_LABEL_POSITION } from './radio-button';
import './radio-button-skeleton';
import storyDocs from './radio-button-story.mdx';

const orientations = {
  [`Horizontal (${RADIO_BUTTON_ORIENTATION.HORIZONTAL})`]:
    RADIO_BUTTON_ORIENTATION.HORIZONTAL,
  [`Vertical (${RADIO_BUTTON_ORIENTATION.VERTICAL})`]:
    RADIO_BUTTON_ORIENTATION.VERTICAL,
};

const labelPositions = {
  [`Left (${RADIO_BUTTON_LABEL_POSITION.LEFT})`]:
    RADIO_BUTTON_LABEL_POSITION.LEFT,
  [`Right (${RADIO_BUTTON_LABEL_POSITION.RIGHT})`]:
    RADIO_BUTTON_LABEL_POSITION.RIGHT,
};

export const Default = (args) => {
  const { disabled, labelPosition, orientation, name, value, onChange } =
    args?.[`${prefix}-radio-button-group`] ?? {};
  const { hideLabel, labelText } = args?.[`${prefix}-radio-button`] ?? {};
  return html`
    <cds-radio-button-group
      ?disabled="${disabled}"
      label-position="${ifDefined(labelPosition)}"
      orientation="${ifDefined(orientation)}"
      name="${ifDefined(name)}"
      value="${ifDefined(value)}"
      @cds-radio-button-group-changed="${onChange}">
      <cds-radio-button
        ?hide-label="${hideLabel}"
        label-text="${ifDefined(labelText)}"
        value="all"></cds-radio-button>
      <cds-radio-button
        ?hide-label="${hideLabel}"
        label-text="${ifDefined(labelText)}"
        value="cloudFoundry"></cds-radio-button>
      <cds-radio-button
        ?hide-label="${hideLabel}"
        label-text="${ifDefined(labelText)}"
        value="staging"></cds-radio-button>
    </cds-radio-button-group>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    [`${prefix}-radio-button-group`]: () => ({
      disabled: boolean('Disabled (disabled)', false),
      labelPosition: select(
        'Label position (label-position)',
        labelPositions,
        RADIO_BUTTON_LABEL_POSITION.RIGHT
      ),
      orientation: select(
        'Orientation (orientation)',
        orientations,
        RADIO_BUTTON_ORIENTATION.HORIZONTAL
      ),
      name: textNullable('Name (name)', 'radio-group'),
      value: textNullable('Value (value)', ''),
      onChange: action(`${prefix}-radio-button-group-changed`),
    }),
    [`${prefix}-radio-button`]: () => ({
      hideLabel: boolean('Hide label (hide-label)', false),
      labelText: textNullable('Label text (label-text)', 'Radio button'),
    }),
  },
};

export const skeleton = () =>
  html` <cds-radio-button-skeleton></cds-radio-button-skeleton> `;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Components/Radio button',
  parameters: {
    ...storyDocs.parameters,
  },
};
