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

export const Default = {
  parameters: {
    docs: {
      page: mdx,
    },
  },
  tags: ['!autodocs'],
  render: () => html`
    <sb-template-feature-flags>
      <div class=${previewClassname}>
        <feature-flags enable-v12-toggle-reduced-label-spacing>
          <cds-toggle
            label-text="Label"
            label-a="On"
            label-b="Off"
            toggled></cds-toggle>
        </feature-flags>
      </div>
    </sb-template-feature-flags>
  `,
};

const meta = {
  title: 'Components/Toggle/Feature Flag',
};

export default meta;
