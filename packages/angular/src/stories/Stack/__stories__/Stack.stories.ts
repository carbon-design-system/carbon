/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import { StackComponent } from '@carbon/angular/stack';

// ─── WC-parity stories (one-for-one with @carbon/web-components Stack) ───────

const orientationOptions = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
};

const defaultArgs = {
  gap: '6',
  orientation: 'vertical',
  useCustomGapValue: false,
};

const controls: ArgTypes = {
  gap: {
    control: 'select',
    description:
      'Provide either a spacing scale step or, when enabled, a custom gap value.',
  },
  orientation: {
    control: 'select',
    description: 'Specify the orientation of the items in the Stack.',
    options: Object.values(orientationOptions),
    labels: { vertical: 'Vertical', horizontal: 'Horizontal' },
  },
  useCustomGapValue: {
    control: 'boolean',
    description: 'Use a custom CSS value for the gap, such as `2rem`.',
  },
};

const renderStack = (args: Record<string, unknown>) => ({
  props: args,
  template: `
    <cds-ng-stack
      [gap]="gap"
      [orientation]="orientation"
      [useCustomGapValue]="useCustomGapValue">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </cds-ng-stack>
  `,
});

const meta: Meta = {
  title: 'Layout/Stack',
  component: StackComponent,
  args: defaultArgs,
  argTypes: controls,
  decorators: [
    moduleMetadata({
      imports: [StackComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj;

// WC: Default
export const Default: Story = {
  render: renderStack,
};

// WC: Horizontal
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  argTypes: {
    orientation: {
      ...controls['orientation'],
      table: {
        readonly: true,
      },
    },
  },
  render: renderStack,
};
