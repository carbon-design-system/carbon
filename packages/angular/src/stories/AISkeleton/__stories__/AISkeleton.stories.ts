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
  AiSkeletonIconComponent,
  AiSkeletonPlaceholderComponent,
  AiSkeletonTextComponent,
} from '@carbon/angular/ai-skeleton';

// ─── WC-parity stories (one-for-one with @carbon/web-components AI Skeleton) ─

const textArgs = {
  heading: false,
  paragraph: false,
  width: '100%',
  lineCount: 3,
};

const textArgTypes: ArgTypes = {
  heading: {
    control: 'boolean',
    description: 'Set this to true to apply heading styling.',
  },
  paragraph: {
    control: 'boolean',
    description: 'Set this to true to generate multiple lines of text.',
  },
  width: {
    control: 'text',
    description:
      'Width (in px or %) of single line of text or max-width of paragraph lines.',
  },
  lineCount: {
    control: 'number',
    description: 'The number of lines shown if paragraph is true.',
  },
};

const meta: Meta = {
  title: 'Components/Skeleton/AI Skeleton',
  decorators: [
    moduleMetadata({
      imports: [
        AiSkeletonIconComponent,
        AiSkeletonPlaceholderComponent,
        AiSkeletonTextComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

// WC: AISkeletonIcon
export const AISkeletonIcon: Story = {
  // This story doesn't accept any args.
  args: {},
  render: () => ({
    template: `
      <cds-ng-ai-skeleton-icon customStyles="margin: 50px"></cds-ng-ai-skeleton-icon>
      <cds-ng-ai-skeleton-icon customStyles="margin: 50px; width: 24px; height: 24px"></cds-ng-ai-skeleton-icon>
    `,
  }),
};

// WC: AISkeletonPlaceholder
export const AISkeletonPlaceholder: Story = {
  // This story doesn't accept any args.
  args: {},
  render: () => ({
    template: `<cds-ng-ai-skeleton-placeholder class="test"></cds-ng-ai-skeleton-placeholder>`,
  }),
};

// WC: AISkeletonText
export const AISkeletonText: Story = {
  args: textArgs,
  argTypes: textArgTypes,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-ai-skeleton-text
        [heading]="heading"
        [width]="width"
        [paragraph]="paragraph"
        [lineCount]="lineCount"></cds-ng-ai-skeleton-text>
    `,
  }),
};
