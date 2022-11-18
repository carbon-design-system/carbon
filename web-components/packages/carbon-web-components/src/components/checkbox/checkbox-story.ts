/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import './checkbox';
import storyDocs from './checkbox-story.mdx';

export const Default = (args) => {
  const {
    checked,
    disabled,
    hideLabel,
    indeterminate,
    labelText,
    name,
    value,
    onChange,
  } = args?.['bx-checkbox'] ?? {};
  return html`
    <bx-checkbox
      ?checked="${checked}"
      ?disabled="${disabled}"
      ?hide-label="${hideLabel}"
      ?indeterminate="${indeterminate}"
      label-text="${ifNonNull(labelText)}"
      name="${ifNonNull(name)}"
      value="${ifNonNull(value)}"
      @bx-checkbox-changed="${onChange}"
    ></bx-checkbox>
  `;
};

Default.storyName = 'Default';

export default {
  title: 'Components/Checkbox',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      'bx-checkbox': () => ({
        checked: boolean('Checked (checked)', false),
        disabled: boolean('Disabled (disabled)', false),
        hideLabel: boolean('Hide label (hide-label)', false),
        indeterminate: boolean('Indeterminate state (indeterminate)', false),
        labelText: textNullable('Label text (label-text)', 'Checkbox'),
        name: textNullable('Name (name)', ''),
        value: textNullable('Value (value)', ''),
        onChange: action('bx-checkbox-changed'),
      }),
    },
  },
};
