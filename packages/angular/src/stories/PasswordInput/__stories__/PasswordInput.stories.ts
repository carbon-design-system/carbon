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
  PasswordInputComponent,
  PasswordInputSkeletonComponent,
} from '@carbon/angular/password-input';

// ─── WC-parity stories (one-for-one with @carbon/web-components Password Input) ───

const sizes = ['xs', 'sm', 'md', 'lg'];

const args = {
  defaultWidth: 300,
  disabled: false,
  helperText: 'Use at least 8 characters',
  hideLabel: false,
  hidePasswordLabel: 'Hide password',
  inline: false,
  invalid: false,
  invalidText: 'Password must be at least 8 characters',
  labelText: 'Password',
  placeholder: 'Enter your password',
  readOnly: false,
  showPasswordLabel: 'Show password',
  size: 'md',
  tooltipAlignment: 'end',
  tooltipPosition: 'bottom',
  type: 'password',
  value: '',
  warn: false,
  warnText: 'Password strength is low',
};

const argTypes: ArgTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  disabled: {
    control: 'boolean',
    description: 'Specify whether the control is disabled',
  },
  helperText: {
    control: 'text',
    description:
      'Provide text that is used alongside the control label for additional help',
  },
  hideLabel: {
    control: 'boolean',
    description:
      'Specify whether or not the underlying label is visually hidden',
  },
  hidePasswordLabel: {
    control: 'text',
    description: '"Hide password" tooltip text on password visibility toggle',
  },
  inline: {
    control: 'boolean',
    description: 'true to use the inline version',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify whether the control is currently invalid',
  },
  invalidText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in an invalid state',
  },
  labelText: {
    control: 'text',
    description:
      'Provide the text that will be read by a screen reader when visiting this control',
  },
  onInput: {
    action: 'input',
  },
  placeholder: {
    control: 'text',
    description: 'Placeholder (placeholder)',
  },
  readOnly: {
    control: 'boolean',
    description: 'Read only (readOnly)',
  },
  showPasswordLabel: {
    control: 'text',
    description: '"Hide password" tooltip text on password visibility toggle',
  },
  size: {
    control: 'select',
    description: 'Size (size)',
    options: sizes,
    labels: {
      xs: 'Extra small size (xs)',
      sm: 'Small size (sm)',
      md: 'Medium size (md)',
      lg: 'Large size (lg)',
    },
  },
  tooltipAlignment: {
    options: ['start', 'center', 'end'],
    control: { type: 'radio' },
    description:
      'Specify the alignment of the tooltip to the icon-only button. Can be one of: `start`, `center`, or `end`.',
  },
  tooltipPosition: {
    options: ['top', 'right', 'bottom', 'left'],
    control: { type: 'radio' },
    description:
      'Specify the direction of the tooltip for the icon-only button. Can be either `top`, `right`, `bottom`, or `left`',
  },
  type: {
    options: ['password', 'text'],
    control: { type: 'radio' },
    description: 'The input type, either `password` or `text`',
  },
  value: {
    control: 'text',
    description: 'Provide the current value of the `<input>`',
  },
  warn: {
    control: 'boolean',
    description: 'Specify whether the control is currently in warning state',
  },
  warnText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in warning state',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Password Input',
  decorators: [
    moduleMetadata({
      imports: [PasswordInputComponent, PasswordInputSkeletonComponent],
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
        <cds-ng-password-input
          [disabled]="disabled"
          [helperText]="helperText"
          [hideLabel]="hideLabel"
          [hidePasswordLabel]="hidePasswordLabel"
          [inline]="inline"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [label]="labelText"
          [placeholder]="placeholder"
          [readonly]="readOnly"
          [showPasswordLabel]="showPasswordLabel"
          [size]="size"
          [tooltipAlignment]="tooltipAlignment"
          [tooltipDirection]="tooltipPosition"
          [type]="type"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText">
        </cds-ng-password-input>
      </div>
    `,
  }),
};
