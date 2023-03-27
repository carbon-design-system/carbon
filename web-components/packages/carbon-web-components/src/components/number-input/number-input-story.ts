/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import * as knobs from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import { INPUT_SIZE } from '../input/input';
import './number-input';
import './number-input-skeleton';
import '../form/form-item';
import createProps from './stories/helpers';
import storyDocs from './number-input-story.mdx';
import { prefix } from '../../globals/settings';

export const Default = () => {
  return html`
    <cds-form-item>
      <cds-number-input
        value="50"
        min="0"
        max="100"
        size="${ifDefined(INPUT_SIZE.MEDIUM)}"
        step="1"
        label="number-input label"
        helper-text="Optional helper text">
      </cds-number-input>
    </cds-form-item>
  `;
};

Default.storyName = 'Default';

export const skeleton = () =>
  html` <cds-number-input-skeleton></cds-number-input-skeleton> `;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export const Playground = (args) => {
  const {
    allowEmpty,
    decrementButtonDescription,
    incrementButtonDescription,
    disabled,
    helperText,
    hideLabel,
    hideSteppers,
    invalid,
    invalidText,
    label,
    readonly,
    warn,
    warnText,
    value,
    min,
    max,
    size,
    step,
    onInput,
  } = args?.[`${prefix}-number-input`] ?? {};
  return html`
    <cds-form-item>
      <cds-number-input
        ?allow-empty="${allowEmpty}"
        decrement-button-assistive-text="${ifDefined(
          decrementButtonDescription
        )}"
        increment-button-assistive-text="${ifDefined(
          incrementButtonDescription
        )}"
        helper-text="${ifDefined(helperText)}"
        ?hide-steppers="${hideSteppers}"
        ?hide-label="${hideLabel}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label="${ifDefined(label)}"
        ?readonly="${readonly}"
        value="${ifDefined(value)}"
        ?warn="${warn}"
        warn-text="${ifDefined(warnText)}"
        ?disabled="${disabled}"
        min="${ifDefined(min)}"
        max="${ifDefined(max)}"
        size="${ifDefined(size)}"
        step="${ifDefined(step)}"
        @input="${onInput}">
      </cds-number-input>
    </cds-form-item>
  `;
};

Playground.storyName = 'Playground';

Playground.parameters = {
  knobs: {
    [`${prefix}-number-input`]: () => createProps({ ...knobs }),
  },
};

export default {
  title: 'Components/Number Input',
  parameters: {
    ...storyDocs.parameters,
  },
};
