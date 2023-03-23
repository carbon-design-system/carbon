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
import { TOGGLE_SIZE } from './toggle';
import storyDocs from './toggle-story.mdx';

const sizes = {
  'Regular size': null,
  [`Small size (${TOGGLE_SIZE.SMALL})`]: TOGGLE_SIZE.SMALL,
};

export const Default = (args) => {
  const { onChange } = args?.[`${prefix}-toggle`] ?? {};
  return html`
    <cds-toggle
      ?checked="${true}"
      label-text="Toggle element label"
      label-a="On"
      label-b="Off"
      @cds-toggle-changed="${onChange}"></cds-toggle>
  `;
};

Default.storyName = 'Default';

export const SmallToggle = (args) => {
  const { onChange } = args?.[`${prefix}-toggle`] ?? {};
  return html`
    <cds-toggle
      ?checked="${true}"
      label-text="Toggle element label"
      label-a="On"
      label-b="Off"
      size="sm"
      @cds-toggle-changed="${onChange}"></cds-toggle>
  `;
};

SmallToggle.storyName = 'Small toggle';

export const Playground = (args) => {
  const {
    checked,
    labelA,
    disabled,
    hideLabel,
    labelText,
    readOnly,
    name,
    size,
    labelB,
    value,
    onChange,
  } = args?.[`${prefix}-toggle`] ?? {};
  return html`
    <cds-toggle
      ?checked="${checked}"
      ?disabled="${disabled}"
      ?hideLabel="${hideLabel}"
      label-text="${ifDefined(labelText)}"
      ?read-only=${readOnly}
      name="${ifDefined(name)}"
      size="${ifDefined(size)}"
      label-a="${ifDefined(labelA)}"
      label-b="${ifDefined(labelB)}"
      value="${ifDefined(value)}"
      @cds-toggle-changed="${onChange}"></cds-toggle>
  `;
};

Playground.storyName = 'Playground';
Playground.parameters = {
  knobs: {
    [`${prefix}-toggle`]: () => ({
      checked: boolean('Checked (checked)', true),
      labelA: textNullable('Text for checked state (label-a)', 'On'),
      disabled: boolean('Disabled (disabled)', false),
      hideLabel: boolean('Hide label (hideLabel)', false),
      labelText: textNullable('Label text (label-text)', ''),
      readOnly: boolean('Read only (read-only)', false),
      name: textNullable('Name (name)', ''),
      size: select('Toggle size (size)', sizes, null),
      labelB: textNullable('Text for unchecked state (label-b)', 'Off'),
      value: textNullable('Value (value)', ''),
      onChange: action(`${prefix}-toggle-changed`),
    }),
  },
};

export default {
  title: 'Components/Toggle',
  parameters: {
    ...storyDocs.parameters,
  },
};
