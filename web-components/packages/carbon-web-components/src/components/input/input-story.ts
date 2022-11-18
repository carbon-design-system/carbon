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
import './input';
import '../form/form-item';
import createProps from './stories/helpers';
import storyDocs from './input-story.mdx';

export const Default = (args) => {
  const {
    autocomplete,
    autofocus,
    colorScheme,
    disabled,
    helperText,
    invalid,
    labelText,
    name,
    pattern,
    placeholder,
    readonly,
    required,
    showPasswordVisibilityToggle,
    size,
    type,
    validityMessage,
    value,
    onInput,
  } = args?.['bx-input'] ?? {};
  return html`
    <bx-input
      autocomplete="${ifNonNull(autocomplete)}"
      ?autofocus="${autofocus}"
      color-scheme="${ifNonNull(colorScheme)}"
      ?disabled="${disabled}"
      helper-text="${ifNonNull(helperText)}"
      ?invalid="${invalid}"
      label-text="${ifNonNull(labelText)}"
      name="${ifNonNull(name)}"
      pattern="${ifNonNull(pattern)}"
      placeholder="${ifNonNull(placeholder)}"
      ?readonly="${readonly}"
      ?required="${required}"
      ?show-password-visibility-toggle="${showPasswordVisibilityToggle}"
      size="${ifNonNull(size)}"
      type="${ifNonNull(type)}"
      validity-message="${ifNonNull(validityMessage)}"
      value="${ifNonNull(value)}"
      @input="${onInput}"
    ></bx-input>
  `;
};

Default.storyName = 'Default';

export const formItem = (args) => {
  const {
    colorScheme,
    disabled,
    invalid,
    placeholder,
    showPasswordVisibilityToggle,
    size,
    type,
    value,
    onInput,
  } = args?.['bx-input'] ?? {};
  return html`
    <bx-form-item>
      <bx-input
        value="${ifNonNull(value)}"
        color-scheme="${ifNonNull(colorScheme)}"
        placeholder="${ifNonNull(placeholder)}"
        size="${ifNonNull(size)}"
        @input="${onInput}"
        ?invalid="${invalid}"
        ?disabled="${disabled}"
        ?show-password-visibility-toggle="${showPasswordVisibilityToggle}"
        type="${ifNonNull(type)}"
      >
        <span slot="label-text">Label text</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Something isn't right</span>
      </bx-input>
    </bx-form-item>
  `;
};

formItem.storyName = 'Form item';

export const withoutFormItemWrapper = (args) => {
  const {
    colorScheme,
    disabled,
    invalid,
    placeholder,
    showPasswordVisibilityToggle,
    size,
    type,
    value,
    onInput,
  } = args?.['bx-input'] ?? {};
  return html`
    <bx-input
      value="${ifNonNull(value)}"
      color-scheme="${ifNonNull(colorScheme)}"
      placeholder="${ifNonNull(placeholder)}"
      size="${ifNonNull(size)}"
      @input="${onInput}"
      ?invalid="${invalid}"
      ?disabled="${disabled}"
      ?show-password-visibility-toggle="${showPasswordVisibilityToggle}"
      type="${ifNonNull(type)}"
    >
      <span slot="label-text">Label text</span>
      <span slot="helper-text">Optional helper text</span>
      <span slot="validity-message">Something isn't right</span>
    </bx-input>
  `;
};

withoutFormItemWrapper.storyName = 'Without form item wrapper';

export default {
  title: 'Components/Input',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      'bx-input': () => createProps({ ...knobs, textNonEmpty: textNullable }),
    },
  },
};
