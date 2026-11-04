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
  FluidNumberInputComponent,
  FluidNumberInputSkeletonComponent,
} from '@carbon/angular/fluid-number-input';
import { ToggletipComponent } from '@carbon/angular/toggle-tip';

// ─── WC-parity stories (one-for-one with @carbon/web-components Fluid Number Input) ───

const args = {
  defaultWidth: 400,
  allowEmpty: false,
  disableWheel: false,
  disabled: false,
  hideSteppers: false,
  iconDescription: 'Adjust number',
  inputMode: 'decimal',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  label: 'Label',
  locale: 'en-US',
  readOnly: false,
  value: 50,
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  min: 0,
  max: 100,
  step: 1,
  type: 'number',
};

const argTypes: ArgTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  allowEmpty: {
    control: 'boolean',
  },
  disableWheel: {
    control: 'boolean',
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
  hideSteppers: {
    control: 'boolean',
  },
  iconDescription: {
    control: 'text',
  },
  inputMode: {
    control: 'select',
    options: [
      'none',
      'text',
      'tel',
      'url',
      'email',
      'numeric',
      'decimal',
      'search',
    ],
  },
  label: {
    control: {
      type: 'text',
    },
  },
  locale: {
    control: 'text',
  },
  max: {
    control: 'number',
  },
  min: {
    control: 'number',
  },
  onInput: {
    action: 'input',
  },
  readOnly: {
    control: 'boolean',
  },
  step: {
    control: 'number',
  },
  type: {
    control: 'select',
    options: ['number', 'text'],
  },
  value: {
    control: 'number',
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
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Fluid Components/FluidNumberInput',
  decorators: [
    moduleMetadata({
      imports: [
        FluidNumberInputComponent,
        FluidNumberInputSkeletonComponent,
        ToggletipComponent,
      ],
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
        <cds-ng-fluid-number-input
          [allowEmpty]="allowEmpty"
          [disableWheel]="disableWheel"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [label]="label"
          [hideSteppers]="hideSteppers"
          [iconDescription]="iconDescription"
          [inputMode]="inputMode"
          [locale]="locale"
          [readonly]="readOnly"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText"
          [disabled]="disabled"
          [min]="min"
          [max]="max"
          [step]="step"
          [type]="type">
        </cds-ng-fluid-number-input>
      </div>
    `,
  }),
};

// WC: DefaultWithToggletip
export const DefaultWithToggletip: Story = {
  args,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div [style.width.px]="defaultWidth">
        <cds-ng-fluid-number-input
          [allowEmpty]="allowEmpty"
          [disableWheel]="disableWheel"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [label]="label"
          [hideSteppers]="hideSteppers"
          [iconDescription]="iconDescription"
          [inputMode]="inputMode"
          [locale]="locale"
          [readonly]="readOnly"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText"
          [disabled]="disabled"
          [min]="min"
          [max]="max"
          [step]="step"
          [type]="type">
          <cds-ng-toggletip [autoalign]="true" slot="label-text">
            {{ label }}
            <p slot="body-text">Additional field information here.</p>
          </cds-ng-toggletip>
        </cds-ng-fluid-number-input>
      </div>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: StoryObj<Record<string, unknown>> = {
  args: {
    defaultWidth: 300,
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
        <cds-ng-fluid-number-input-skeleton></cds-ng-fluid-number-input-skeleton>
      </div>
    `,
  }),
};
