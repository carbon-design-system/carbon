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
import {
  FluidSearchComponent,
  FluidSearchSkeletonComponent,
} from '@carbon/angular/fluid-search';

// ─── WC-parity stories (one-for-one with @carbon/web-components Fluid Search) ───

const args = {
  autoComplete: 'off',
  defaultWidth: 400,
  closeButtonLabelText: 'Clear search input',
  disabled: false,
  labelText: 'Search',
  placeholder: 'Prompt text',
  role: 'searchbox',
  type: 'search',
  value: '',
};

const argTypes: ArgTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  autoComplete: {
    control: 'text',
    description:
      'Specify an optional value for the <code>autocomplete</code> property on the underlying <code>&lt;input&gt;</code>, defaults to "off".',
  },
  closeButtonLabelText: {
    control: 'text',
    description:
      'Specify a label to be read by screen readers on the "close" button.',
  },
  disabled: {
    control: 'boolean',
    description:
      'Specify whether the <code>&lt;input&gt;</code> should be disabled.',
  },
  labelText: {
    control: 'text',
    description: 'Provide the label text for the Search icon.',
  },
  placeholder: {
    control: 'text',
    description:
      'Provide an optional placeholder text for the Search. Note: if the label and placeholder differ, VoiceOver on Mac will read both.',
  },
  role: {
    control: 'text',
    description:
      'Specify the role for the underlying <code>&lt;input&gt;</code>, defaults to <code>searchbox</code>.',
  },
  type: {
    control: 'text',
    description:
      'Optional prop to specify the type of the <code>&lt;input&gt;</code>.',
  },
  value: {
    control: 'text',
    description: 'Specify the value of the <code>&lt;input&gt;</code>.',
  },
  onInput: {
    action: 'input',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Fluid Components/FluidSearch',
  decorators: [
    moduleMetadata({
      imports: [FluidSearchComponent, FluidSearchSkeletonComponent],
    }),
  ],
  parameters: {
    controls: {
      exclude: ['onInput'],
    },
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div [style.width.px]="defaultWidth">
        <cds-ng-fluid-search
          [autoComplete]="autoComplete"
          [closeButtonLabelText]="closeButtonLabelText"
          [disabled]="disabled"
          [labelText]="labelText"
          [placeholder]="placeholder"
          [type]="type"
          [role]="role"
          [value]="value">
        </cds-ng-fluid-search>
      </div>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: StoryObj<Record<string, unknown>> = {
  args: {
    defaultWidth: 400,
  },
  argTypes: {
    defaultWidth: {
      control: { type: 'range', min: 300, max: 800, step: 50 },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div [style.width.px]="defaultWidth">
        <cds-ng-fluid-search-skeleton></cds-ng-fluid-search-skeleton>
      </div>
    `,
  }),
};
