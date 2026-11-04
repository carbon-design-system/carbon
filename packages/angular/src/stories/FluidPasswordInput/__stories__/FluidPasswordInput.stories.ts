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
import { FluidPasswordInputComponent } from '@carbon/angular/fluid-password-input';

// ─── WC-parity stories (one-for-one with @carbon/web-components Fluid Password Input) ───

const args = {
  defaultWidth: 300,
  disabled: false,
  helperText: '',
  hideLabel: false,
  hidePasswordLabel: 'Hide password',
  inline: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  labelText: 'Label',
  placeholder: 'Placeholder text',
  readOnly: false,
  showPasswordLabel: 'Show password',
  size: 'md',
  tooltipAlignment: 'end',
  tooltipPosition: 'bottom',
  type: 'password',
  value: '',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

const argTypes: ArgTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  showPasswordLabel: {
    control: 'text',
    description: '"Show password" tooltip text on password visibility toggle',
  },
  hidePasswordLabel: {
    control: 'text',
    description: '"Hide password" tooltip text on password visibility toggle',
  },
  helperText: {
    control: 'text',
  },
  hideLabel: {
    control: 'boolean',
  },
  inline: {
    control: 'boolean',
  },
  placeholder: {
    control: {
      type: 'text',
    },
  },
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  labelText: {
    control: {
      type: 'text',
    },
  },
  onInput: {
    action: 'input',
  },
  size: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg'],
  },
  tooltipAlignment: {
    control: 'radio',
    options: ['start', 'center', 'end'],
  },
  tooltipPosition: {
    control: 'radio',
    options: ['top', 'right', 'bottom', 'left'],
  },
  type: {
    control: 'radio',
    options: ['password', 'text'],
  },
  warn: {
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    control: {
      type: 'text',
    },
  },
  value: {
    control: {
      type: 'text',
    },
  },
  readOnly: {
    control: 'boolean',
    description: 'Read only (readOnly)',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Fluid Components/FluidPasswordInput',
  decorators: [
    moduleMetadata({
      imports: [FluidPasswordInputComponent],
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
        <cds-ng-fluid-password-input
          [disabled]="disabled"
          [helperText]="helperText"
          [hideLabel]="hideLabel"
          [hidePasswordLabel]="hidePasswordLabel"
          [inline]="inline"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [label]="labelText"
          [placeholder]="placeholder"
          [readOnly]="readOnly"
          [showPasswordLabel]="showPasswordLabel"
          [size]="size"
          [tooltipAlignment]="tooltipAlignment"
          [tooltipDirection]="tooltipPosition"
          [type]="type"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText">
        </cds-ng-fluid-password-input>
      </div>
    `,
  }),
};
