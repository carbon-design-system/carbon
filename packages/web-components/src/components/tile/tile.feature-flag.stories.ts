/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import '../feature-flags/index';
import '../../../.storybook/templates/with-feature-flags';
import { withLayers } from '../../../.storybook/decorators/with-layers';

const previewClassname = 'preview-tile';

const defaultControls = {
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
};

export const Clickable = {
  ...defaultControls,
  render: ({ disabled }) => html`
    <div class=${previewClassname}>
      <feature-flags enable-v12-tile-default-icons>
        <cds-clickable-tile
          ?disabled="${disabled}"
          href="https://www.carbondesignsystem.com/">
          Clickable Tile
        </cds-clickable-tile>
      </feature-flags>
    </div>
  `,
};

export const ClickableWithLayer = {
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
  },
  render: () => html`
    <div class=${previewClassname}>
      <feature-flags enable-v12-tile-default-icons>
        <cds-clickable-tile href="https://www.carbondesignsystem.com/">
          Clickable Tile
        </cds-clickable-tile>
      </feature-flags>
    </div>
  `,
};

const meta = {
  title: 'Components/Tile/Feature Flag',
  tags: ['!autodocs'],
  decorators: [
    (story) => html`
      <sb-template-feature-flags> ${story()} </sb-template-feature-flags>
    `,
  ],
};

export default meta;
