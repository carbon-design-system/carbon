/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import './slider';
import './slider-input';
import './slider-skeleton';
import storyDocs from './slider-story.mdx';
import { prefix } from '../../globals/settings';

export const Default = (args) => {
  const { disabled, labelText, max, min, name, step, value, onChange } =
    args?.[`${prefix}-slider`] || {};
  return html`
    <cds-slider
      ?disabled="${disabled}"
      label-text="${ifDefined(labelText)}"
      max="${ifDefined(max)}"
      min="${ifDefined(min)}"
      name="${ifDefined(name)}"
      step="${ifDefined(step)}"
      value="${ifDefined(value)}"
      @cds-slider-changed="${onChange}"></cds-slider>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    [`${prefix}-slider`]: () => ({
      disabled: boolean('Disabled (disabled)', false),
      labelText: text('Label text (label-text)', 'Slider'),
      name: text('Name (name)', ''),
      max: number('The maximum value (max)', 100),
      min: number('The minimum value (min)', 0),
      step: number('The step (step)', 1),
      value: number('Value (value)', 50),
      onAfterChange: action(`${prefix}-slider-changed`),
    }),
  },
};

export const withInputBox = (args) => {
  const { disabled, labelText, max, min, name, step, value, onChange } =
    args?.[`${prefix}-slider`] || {};
  return html`
    <cds-slider
      ?disabled="${disabled}"
      label-text="${labelText}"
      max="${ifDefined(max)}"
      min="${ifDefined(min)}"
      name="${ifDefined(name)}"
      step="${ifDefined(step)}"
      value="${ifDefined(value)}"
      @cds-slider-changed="${onChange}">
      <cds-slider-input
        aria-label="Slider value"
        type="number"></cds-slider-input>
    </cds-slider>
  `;
};

withInputBox.storyName = 'With input box';

withInputBox.parameters = {
  knobs: Default.parameters.knobs,
};

export const skeleton = () =>
  html` <cds-slider-skeleton></cds-slider-skeleton> `;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Components/Slider',
  parameters: {
    ...storyDocs.parameters,
  },
};
