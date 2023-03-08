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
import * as knobs from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import './textarea';
import './textarea-skeleton';
import '../form/form-item';
import createProps from './stories/helpers';
import storyDocs from './textarea-story.mdx';
import { prefix } from '../../globals/settings';

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
  } = args?.[`${prefix}-textarea`] ?? {};
  return html`
    <cds-textarea
      autocomplete="${ifDefined(autocomplete)}"
      ?autofocus="${autofocus}"
      color-scheme="${ifDefined(colorScheme)}"
      ?disabled="${disabled}"
      helper-text="${ifDefined(helperText)}"
      label-text="${ifDefined(labelText)}"
      name="${ifDefined(name)}"
      value="${ifDefined(value)}"
      pattern="${ifDefined(pattern)}"
      placeholder="${ifDefined(placeholder)}"
      ?readonly="${readonly}"
      ?required="${required}"
      ?invalid="${invalid}"
      validity-message="${ifDefined(validityMessage)}"
      @input="${onInput}"
      rows="${ifDefined(rows)}"
      cols="${ifDefined(cols)}">
    </cds-textarea>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    [`${prefix}-textarea`]: () => createProps({ ...knobs, textNullable }),
  },
};

export const formItem = (args) => {
  const {
    colorScheme,
    disabled,
    value,
    placeholder,
    invalid,
    onInput,
    rows,
    cols,
  } = args?.[`${prefix}-textarea`] ?? {};
  return html`
    <cds-form-item>
      <cds-textarea
        color-scheme="${ifDefined(colorScheme)}"
        placeholder="${ifDefined(placeholder)}"
        @input="${onInput}"
        ?invalid="${invalid}"
        ?disabled="${disabled}"
        value="${ifDefined(value)}"
        rows="${ifDefined(rows)}"
        cols="${ifDefined(cols)}">
        <span slot="label-text">Label text</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Something isn't right</span>
        ${value}
      </cds-textarea>
    </cds-form-item>
  `;
};

formItem.storyName = 'Form item';

formItem.parameters = {
  knobs: {
    [`${prefix}-textarea`]: () => createProps({ ...knobs, textNullable }),
  },
};

export const withoutFormItemWrapper = (args) => {
  const {
    colorScheme,
    disabled,
    value,
    placeholder,
    invalid,
    onInput,
    rows,
    cols,
  } = args?.[`${prefix}-textarea`] ?? {};
  return html`
    <cds-textarea
      color-scheme="${ifDefined(colorScheme)}"
      placeholder="${ifDefined(placeholder)}"
      @input="${onInput}"
      ?invalid="${invalid}"
      ?disabled="${disabled}"
      value="${ifDefined(value)}"
      rows="${ifDefined(rows)}"
      cols="${ifDefined(cols)}">
      <span slot="label-text">Label text</span>
      <span slot="helper-text">Optional helper text</span>
      <span slot="validity-message">Something isn't right</span>
      <span>${value}</span>
    </cds-textarea>
  `;
};

withoutFormItemWrapper.storyName = 'Without form item wrapper';

withoutFormItemWrapper.parameters = {
  knobs: {
    [`${prefix}-textarea`]: () => createProps({ ...knobs, textNullable }),
  },
};

export const skeleton = () =>
  html` <cds-textarea-skeleton></cds-textarea-skeleton> `;

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
