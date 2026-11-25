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
import { CopyButtonComponent } from '@carbon/angular/copy-button';

// ─── WC-parity stories (one-for-one with @carbon/web-components CopyButton) ──

const tooltipAlignments = {
  top: 'top',
  'top-start': 'top-start',
  'top-end': 'top-end',
  bottom: 'bottom',
  'bottom-start': 'bottom-start',
  'bottom-end': 'bottom-end',
  left: 'left',
  'left-start': 'left-start',
  'left-end': 'left-end',
  right: 'right',
  'right-start': 'right-start',
  'right-end': 'right-end',
};

const buttonKinds = [
  'primary',
  'secondary',
  'tertiary',
  'ghost',
  'danger',
  'danger-primary',
  'danger-tertiary',
  'danger-ghost',
];

const sizes = ['sm', 'md', 'lg'];

const defaultArgs = {
  align: 'bottom',
  disabled: false,
  feedback: 'Copied!',
  feedbackTimeout: 2000,
  iconDescription: 'Copy to clipboard',
  kind: '',
  size: 'lg',
};

const argTypes: ArgTypes = {
  align: {
    control: 'select',
    description: 'Specify how the toggletip should align with the button',
    options: Object.values(tooltipAlignments),
  },
  autoAlign: {
    control: 'boolean',
    description: 'Specify whether the tooltip should auto-align.',
  },
  disabled: {
    control: 'boolean',
    description: 'Specify whether the button should be disabled.',
  },
  feedback: {
    control: 'text',
    description: 'Specify the text displayed after the button is clicked.',
  },
  feedbackTimeout: {
    control: { type: 'number', min: 1, step: 1 },
    description: `Specify the time it takes for the feedback message to timeout`,
  },
  iconDescription: {
    control: 'text',
    description: `Provide a description for the icon representing the copy action that can be read by screen readers`,
  },
  kind: {
    control: 'select',
    description: 'Specify the kind of Button you want to create.',
    options: ['', ...buttonKinds],
  },
  size: {
    control: 'select',
    description: 'Specify the size of the Button.',
    options: sizes,
  },
  // `cds-ng-copy-button` has no custom click event, so the story binds the
  // native `(click)` to this action arg.
  onClick: {
    action: 'onClick',
    description:
      'Provide a function that is called when the button is clicked.',
  },
};

const parameters = {
  controls: {
    include: Object.keys(argTypes),
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Copy button',
  decorators: [
    moduleMetadata({
      imports: [CopyButtonComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  argTypes,
  args: defaultArgs,
  parameters,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-copy-button
        [align]="align"
        [autoAlign]="autoAlign"
        [disabled]="disabled"
        [feedback]="feedback"
        [feedbackTimeout]="feedbackTimeout"
        [kind]="kind"
        [size]="size"
        (click)="onClick($event)">
        {{ iconDescription }}
      </cds-ng-copy-button>
    `,
  }),
};
