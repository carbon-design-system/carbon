/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import '../stack/index';
import { TOGGLE_SIZE } from './toggle';

const sizes = {
  'Regular size': null,
  [`Small size (${TOGGLE_SIZE.SMALL})`]: TOGGLE_SIZE.SMALL,
};

const defaultArgs = {
  labelA: 'On',
  labelB: 'Off',
  checked: true,
};

const controls = {
  disabled: {
    control: 'boolean',
    description: 'Whether this control should be disabled',
  },
  hideLabel: {
    control: 'boolean',
    description:
      "If true, the side labels (props.labelA and props.labelB) will be replaced by props.labelText (if passed), so that the toggle doesn't render a top label.",
  },
  labelA: {
    control: 'text',
    description: 'The text for the checked state.',
  },
  labelB: {
    control: 'text',
    description: 'The text for the unchecked state',
  },
  labelText: {
    control: 'text',
    description: 'The text that is read for the control',
  },
  readonly: {
    control: 'boolean',
    description: 'Whether the toggle should be read-only',
  },
  size: {
    control: 'radio',
    description:
      "Specify the size of the Toggle. Currently only supports 'sm' or 'md' (default)",
    options: sizes,
  },
  checked: {
    control: 'boolean',
    description: 'Specify whether the control is toggled',
  },
};

export const Default = {
  render: () => html`
    <cds-toggle
      checked
      label-a="On"
      label-b="Off"
      label-text="Toggle element label"></cds-toggle>
  `,
};

export const SmallToggle = {
  render: () => html`
    <cds-toggle
      checked
      label-a="On"
      label-b="Off"
      label-text="Toggle element label"
      size="sm"></cds-toggle>
  `,
};

export const Playground = {
  argTypes: controls,
  args: defaultArgs,
  render: ({
    disabled,
    hideLabel,
    labelA,
    labelB,
    labelText,
    readonly,
    size,
    checked,
  }) => html`
    <cds-toggle
      label-b="${labelB}"
      label-a="${labelA}"
      ?disabled="${disabled}"
      ?hideLabel="${hideLabel}"
      label-text="${labelText}"
      size="${size}"
      ?read-only=${readonly}
      ?checked="${checked}"></cds-toggle>
  `,
};

const meta = {
  title: 'Components/Toggle',
};

export default meta;
