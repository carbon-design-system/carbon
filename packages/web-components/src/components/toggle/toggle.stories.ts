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
  toggled: true,
  labelText: 'Label',
  labelA: 'On',
  labelB: 'Off',
  disabled: false,
  hideLabel: false,
  readOnly: false,
};

const smallToggleArgs = {
  toggled: true,
  labelText: 'Label',
  labelA: 'On',
  labelB: 'Off',
  size: 'sm',
  disabled: false,
  hideLabel: false,
  readOnly: false,
};

const controls = {
  disabled: {
    control: 'boolean',
  },
  hideLabel: {
    control: 'boolean',
  },
  labelA: {
    control: 'text',
  },
  labelB: {
    control: 'text',
  },
  labelText: {
    control: 'text',
  },
  readOnly: {
    control: 'boolean',
  },
  size: {
    control: 'radio',
    options: sizes,
  },
  toggled: {
    control: 'boolean',
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
  argTypes: {
    ...controls,
  },
  args: smallToggleArgs,
  parameters: {
    controls: {
      exclude: ['size'],
    },
  },
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
