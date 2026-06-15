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

const previewClassname = 'v12-toggle';

const defaultArgs = {
  toggled: true,
  labelText: 'Label',
  labelA: 'On',
  labelB: 'Off',
  disabled: false,
  hideLabel: false,
  readOnly: false,
  size: null,
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
    options: { 'Medium size (default)': null, 'Small size (sm)': 'sm' },
  },
  toggled: {
    control: 'boolean',
  },
};

export const Default = {
  argTypes: controls,
  args: defaultArgs,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  tags: ['!autodocs'],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
            label-text="${labelText}"
            label-a="${labelA}"
            label-b="${labelB}"
            size="${size}"
            ?disabled="${disabled}"
            ?hideLabel="${hideLabel}"
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
