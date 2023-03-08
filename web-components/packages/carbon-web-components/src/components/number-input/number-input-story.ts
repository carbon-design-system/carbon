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
import textNullable from '../../../.storybook/knob-text-nullable';
import { ifDefined } from 'lit/directives/if-defined.js';
import './number-input';
import './number-input-skeleton';
import '../form/form-item';
import createProps from './stories/helpers';
import storyDocs from './number-input-story.mdx';
import { prefix } from '../../globals/settings';

export const Default = (args) => {
  const {
    colorScheme,
    disabled,
    value,
    placeholder,
    invalid,
    mobile,
    min,
    max,
    size,
    step,
    onInput,
    name,
  } = args?.[`${prefix}-number-input`] ?? {};
  return html`
    <cds-number-input
      color-scheme="${ifDefined(colorScheme)}"
      ?disabled="${disabled}"
      value="${ifDefined(value)}"
      placeholder="${ifDefined(placeholder)}"
      ?invalid="${invalid}"
      name="${name}"
      ?mobile="${mobile}"
      min="${ifDefined(min)}"
      max="${ifDefined(max)}"
      size="${ifDefined(size)}"
      step="${ifDefined(step)}"
      @input="${onInput}"></cds-number-input>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    [`${prefix}-number-input`]: () => createProps({ ...knobs, textNullable }),
  },
};

export const formItem = (args) => {
  const {
    colorScheme,
    disabled,
    value,
    placeholder,
    invalid,
    mobile,
    min,
    max,
    size,
    step,
    onInput,
  } = args?.[`${prefix}-number-input`] ?? {};
  return html`
    <cds-form-item>
      <cds-number-input
        value="${ifDefined(value)}"
        color-scheme="${ifDefined(colorScheme)}"
        placeholder="${ifDefined(placeholder)}"
        ?invalid="${invalid}"
        ?disabled="${disabled}"
        ?mobile="${mobile}"
        min="${ifDefined(min)}"
        max="${ifDefined(max)}"
        size="${ifDefined(size)}"
        step="${ifDefined(step)}"
        @input="${onInput}">
        <span slot="label-text">Label text</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Something isn't right</span>
        <span slot="validity-message-max"
          >Try a lower value, something less than ${max}</span
        >
        <span slot="validity-message-min"
          >Value must be larger than ${min}</span
        >
      </cds-number-input>
    </cds-form-item>
  `;
};

formItem.storyName = 'Form item';

formItem.parameters = {
  knobs: {
    [`${prefix}-number-input`]: () => createProps({ ...knobs, textNullable }),
  },
};

export const withoutFormItemWrapper = (args) => {
  const {
    colorScheme,
    disabled,
    value,
    placeholder,
    invalid,
    mobile,
    min,
    max,
    size,
    step,
    onInput,
  } = args?.[`${prefix}-number-input`] ?? {};
  return html`
    <cds-number-input
      value="${ifDefined(value)}"
      color-scheme="${ifDefined(colorScheme)}"
      placeholder="${ifDefined(placeholder)}"
      ?invalid="${invalid}"
      ?disabled="${disabled}"
      ?mobile="${mobile}"
      min="${ifDefined(min)}"
      max="${ifDefined(max)}"
      size="${ifDefined(size)}"
      step="${ifDefined(step)}"
      @input="${onInput}">
      <span slot="label-text">Label text</span>
      <span slot="helper-text">Optional helper text</span>
      <span slot="validity-message">Something isn't right</span>
    </cds-number-input>
  `;
};

withoutFormItemWrapper.storyName = 'Without form item wrapper';

withoutFormItemWrapper.parameters = {
  knobs: {
    [`${prefix}-number-input`]: () => createProps({ ...knobs, textNullable }),
  },
};

export const skeleton = () =>
  html` <cds-number-input-skeleton></cds-number-input-skeleton> `;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Components/Number Input',
  parameters: {
    ...storyDocs.parameters,
  },
};
