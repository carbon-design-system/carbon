/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import * as knobs from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import './textarea';
import './textarea-skeleton';
import '../form/form-item';
import createProps from './stories/helpers';
import storyDocs from './textarea-story.mdx';

export const Default = (args) => {
  const {
    autocomplete,
    autofocus,
    colorScheme,
    disabled,
    helperText,
    labelText,
    name,
    value,
    pattern,
    placeholder,
    readonly,
    required,
    invalid,
    validityMessage,
    onInput,
    rows,
    cols,
  } = args?.['bx-textarea'] ?? {};
  return html`
    <bx-textarea
      autocomplete="${ifNonNull(autocomplete)}"
      ?autofocus="${autofocus}"
      color-scheme="${ifNonNull(colorScheme)}"
      ?disabled="${disabled}"
      helper-text="${ifNonNull(helperText)}"
      label-text="${ifNonNull(labelText)}"
      name="${ifNonNull(name)}"
      value="${ifNonNull(value)}"
      pattern="${ifNonNull(pattern)}"
      placeholder="${ifNonNull(placeholder)}"
      ?readonly="${readonly}"
      ?required="${required}"
      ?invalid="${invalid}"
      validity-message="${ifNonNull(validityMessage)}"
      @input="${onInput}"
      rows="${ifNonNull(rows)}"
      cols="${ifNonNull(cols)}"
    >
    </bx-textarea>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    'bx-textarea': () => createProps({ ...knobs, textNullable }),
  },
};

export const formItem = (args) => {
  const { colorScheme, disabled, value, placeholder, invalid, onInput, rows, cols } = args?.['bx-textarea'] ?? {};
  return html`
    <bx-form-item>
      <bx-textarea
        color-scheme="${ifNonNull(colorScheme)}"
        placeholder="${ifNonNull(placeholder)}"
        @input="${onInput}"
        ?invalid="${invalid}"
        ?disabled="${disabled}"
        value="${ifNonNull(value)}"
        rows="${ifNonNull(rows)}"
        cols="${ifNonNull(cols)}"
      >
        <span slot="label-text">Label text</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Something isn't right</span>
        ${value}
      </bx-textarea>
    </bx-form-item>
  `;
};

formItem.storyName = 'Form item';

formItem.parameters = {
  knobs: {
    'bx-textarea': () => createProps({ ...knobs, textNullable }),
  },
};

export const withoutFormItemWrapper = (args) => {
  const { colorScheme, disabled, value, placeholder, invalid, onInput, rows, cols } = args?.['bx-textarea'] ?? {};
  return html`
    <bx-textarea
      color-scheme="${ifNonNull(colorScheme)}"
      placeholder="${ifNonNull(placeholder)}"
      @input="${onInput}"
      ?invalid="${invalid}"
      ?disabled="${disabled}"
      value="${ifNonNull(value)}"
      rows="${ifNonNull(rows)}"
      cols="${ifNonNull(cols)}"
    >
      <span slot="label-text">Label text</span>
      <span slot="helper-text">Optional helper text</span>
      <span slot="validity-message">Something isn't right</span>
      <span>${value}</span>
    </bx-textarea>
  `;
};

withoutFormItemWrapper.storyName = 'Without form item wrapper';

withoutFormItemWrapper.parameters = {
  knobs: {
    'bx-textarea': () => createProps({ ...knobs, textNullable }),
  },
};

export const skeleton = () => html` <bx-textarea-skeleton></bx-textarea-skeleton> `;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Components/Textarea',
  parameters: {
    ...storyDocs.parameters,
  },
};
