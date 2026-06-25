/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './welcome';

type Story = StoryObj;

export const Welcome: Story = {
  render: () => {
    return html`<c4p-welcome></c4p-welcome>`;
  },
};

const meta: Meta = {
  title: 'Overview/Welcome',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
    chromatic: { disableSnapshot: true },
  },
  tags: ['!autodocs'],
};

export default meta;
