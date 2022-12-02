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
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import { TOGGLE_SIZE } from './toggle';
import storyDocs from './toggle-story.mdx';

const sizes = {
  'Regular size': null,
  [`Small size (${TOGGLE_SIZE.SMALL})`]: TOGGLE_SIZE.SMALL,
};

export const Default = (args) => {
  const {
    checked,
    checkedText,
    disabled,
    labelText,
    name,
    size,
    uncheckedText,
    value,
    onChange,
  } = args?.['bx-toggle'] ?? {};
  return html`
    <bx-toggle
      ?checked="${checked}"
      checked-text="${ifNonNull(checkedText)}"
      ?disabled="${disabled}"
      label-text="${ifNonNull(labelText)}"
      name="${ifNonNull(name)}"
      size="${ifNonNull(size)}"
      unchecked-text="${ifNonNull(uncheckedText)}"
      value="${ifNonNull(value)}"
      @bx-toggle-changed="${onChange}"></bx-toggle>
  `;
};

Default.storyName = 'Default';

export default {
  title: 'Components/Toggle',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      'bx-toggle': () => ({
        checked: boolean('Checked (checked)', false),
        checkedText: textNullable(
          'Text for checked state (checked-text)',
          'On'
        ),
        disabled: boolean('Disabled (disabled)', false),
        labelText: textNullable('Label text (label-text)', 'Toggle'),
        name: textNullable('Name (name)', ''),
        size: select('Toggle size (size)', sizes, null),
        uncheckedText: textNullable(
          'Text for unchecked state (unchecked-text)',
          'Off'
        ),
        value: textNullable('Value (value)', ''),
        onChange: action('bx-toggle-changed'),
      }),
    },
  },
};
