/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { DISPLAY_NAMEComponent } from '../DISPLAY_NAME.component';

const meta: Meta<DISPLAY_NAMEComponent> = {
  title: 'Components/DISPLAY_NAME',
  component: DISPLAY_NAMEComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DISPLAY_NAMEComponent>;

export const Default: Story = {
  args: {},
};
