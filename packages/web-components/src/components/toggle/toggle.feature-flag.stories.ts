/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import '../feature-flags/index';
import mdx from './toggle.feature-flag.mdx';
import '../../../.storybook/templates/with-feature-flags';
import { TOGGLE_SIZE } from './toggle';

const previewClassname = 'v12-toggle';

const sizes = {
  'Medium size (default)': null,
  [`Small size (${TOGGLE_SIZE.SMALL})`]: TOGGLE_SIZE.SMALL,
};

export const Default = {
  args: {
    labelA: 'On',
    labelB: 'Off',
    disabled: false,
    hideLabel: false,
    readOnly: false,
    toggled: true,
    size: null,
    labelText: 'Label',
  },
  argTypes: {
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
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
  tags: ['!autodocs'],
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
    <sb-template-feature-flags>
      <div class=${previewClassname}>
        <feature-flags enable-v12-toggle-reduced-label-spacing>
          <cds-toggle
            label-a="${labelA}"
            label-b="${labelB}"
            ?disabled="${disabled}"
            ?hideLabel="${hideLabel}"
            label-text="${labelText}"
            size="${size}"
            ?read-only=${readOnly}
            ?toggled="${toggled}"></cds-toggle>
        </feature-flags>
      </div>
    </sb-template-feature-flags>
  `,
};

const meta = {
  title: 'Components/Toggle/Feature Flag',
};

export default meta;
