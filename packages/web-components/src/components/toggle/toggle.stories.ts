/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import '../stack/index';
import { TOGGLE_SIZE } from './toggle';

const sizes = {
  'Medium size (default)': null,
  [`Small size (${TOGGLE_SIZE.SMALL})`]: TOGGLE_SIZE.SMALL,
};

const defaultArgs = {
  labelA: 'On',
  labelB: 'Off',
  toggled: true,
  labelText: 'Label',
};

const smallToggleArgs = {
  labelA: 'On',
  labelB: 'Off',
  toggled: true,
  labelText: 'Label',
  size: 'sm',
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
    description: 'Specify the label for the "on" position',
  },
  labelB: {
    control: 'text',
    description: 'Specify the label for the "off" position',
  },
  labelText: {
    control: 'text',
    description: 'The text that is read for the control',
  },
  readOnly: {
    control: 'boolean',
    description: 'Whether the toggle should be read-only',
  },
  size: {
    control: 'radio',
    description:
      "Specify the size of the Toggle. Currently only supports 'sm' or 'md' (default)",
    options: sizes,
  },
  toggled: {
    control: 'boolean',
    description: 'Specify whether the control is toggled',
  },
};

export const Default = {
  argTypes: controls,
  args: defaultArgs,
  render: ({
    disabled,
    hideLabel,
    labelA,
    labelB,
    labelText,
    readOnly,
    size,
    toggled,
  }) => html`
    <cds-toggle
      label-b="${labelB}"
      label-a="${labelA}"
      ?disabled="${disabled}"
      ?hideLabel="${hideLabel}"
      label-text="${labelText}"
      size="${size}"
      ?read-only=${readOnly}
      ?toggled="${toggled}"></cds-toggle>
  `,
};

export const Skeleton = {
  render: () => html` <cds-toggle-skeleton></cds-toggle-skeleton> `,
};

export const SmallToggle = {
  argTypes: controls,
  args: smallToggleArgs,
  render: ({
    disabled,
    hideLabel,
    labelA,
    labelB,
    labelText,
    readOnly,
    size,
    toggled,
  }) => html`
    <cds-toggle
      ?toggled="${toggled}"
      ?read-only=${readOnly}
      ?disabled="${disabled}"
      ?hideLabel="${hideLabel}"
      label-text="${labelText}"
      label-b="${labelB}"
      label-a="${labelA}"
      size="${size}"></cds-toggle>
  `,
};

export const WithAccessibleLabels = {
  render: () => html`
    <cds-stack gap="7">
      <cds-toggle id="toggle-4" label-text="Label"></cds-toggle>
      <cds-toggle id="toggle-5" label-text="Label" hideLabel></cds-toggle>

      <div>
        <div id="toggle-6-label" style="margin-block-end: 0.5rem;">
          Internal aria-label toggle
        </div>
        <cds-toggle aria-labelledby="toggle-6-label" id="toggle-6"></cds-toggle>
      </div>

      <div>
        <label
          id="toggle-7-label"
          for="toggle-7"
          style="display: block; margin-block-end: 0.5rem;">
          External toggle label
        </label>
        <cds-toggle aria-labelledby="toggle-7-label" id="toggle-7"></cds-toggle>
      </div>
    </cds-stack>
  `,
};

const meta = {
  title: 'Components/Toggle',
};

export default meta;
