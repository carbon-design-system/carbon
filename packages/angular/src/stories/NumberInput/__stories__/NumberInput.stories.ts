/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import {
  NumberInputComponent,
  NumberInputSkeletonComponent,
} from '@carbon/angular/number-input';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';

const reusableProps = {
  min: -100000000,
  max: 100000000,
};

const content = `
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h2 class="ai-label-heading">84%</h2>
    <p class="secondary bold">Confidence score</p>
    <p class="secondary">
      Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
    </p>
    <hr />
    <p class="secondary">Model type</p>
    <p class="bold">Foundation model</p>
  </div>
`;

const actions = `<cds-ng-ai-label-action-button>View details</cds-ng-ai-label-action-button>`;

const sizes = ['xs', 'sm', 'md', 'lg'];

const args = {
  allowEmpty: false,
  decrementButtonDescription: 'decrease number input',
  incrementButtonDescription: 'increase number input',
  disabled: false,
  helperText: 'Optional helper text',
  hideLabel: false,
  hideSteppers: false,
  invalid: false,
  invalidText: 'Number is not valid. Must be between -100 and 100',
  label: 'NumberInput label',
  readOnly: false,
  value: 50,
  warn: false,
  warnText: 'Warning text',
  min: -100,
  max: 100,
  step: 1,
  size: 'md',
  type: 'number',
  locale: 'en-US',
  inputMode: 'decimal',
  stepStartValue: 0,
  disableWheel: false,
};

const argTypes: ArgTypes = {
  allowEmpty: {
    control: 'boolean',
    description: '<code>true</code> to allow empty string.',
  },
  decrementButtonDescription: {
    control: 'text',
    description:
      'Decrement button assistive description (decrement-button-assistive-text)',
  },
  incrementButtonDescription: {
    control: 'text',
    description:
      'Increment button assistive description (increment-button-assistive-text)',
  },
  disabled: {
    control: 'boolean',
    description: 'Specify if the control should be disabled, or not.',
  },
  helperText: {
    control: 'text',
    description:
      'Provide text that is used alongside the control label for additional help.',
  },
  hideLabel: {
    control: 'boolean',
    description:
      'Specify whether you want the underlying label to be visually hidden.',
  },
  hideSteppers: {
    control: 'boolean',
    description: 'Specify whether you want the steppers to be hidden.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently value is invalid.',
  },
  invalidText: {
    control: 'text',
    description: 'Message which is displayed if the value is invalid.',
  },
  label: {
    control: 'text',
    description:
      'Generic <code>label</code> that will be used as the textual representation of what this field is for.',
  },
  readOnly: {
    control: 'boolean',
    description: 'Specify if the component should be read-only.',
  },
  value: {
    control: 'number',
    description: 'Specify the value of the input.',
  },
  warn: {
    control: 'boolean',
    description: 'Specify whether the control is currently in warning state.',
  },
  warnText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in warning state.',
  },
  min: {
    control: 'number',
    description: 'The minimum value.',
  },
  max: {
    control: 'number',
    description: 'The maximum value.',
  },
  step: {
    control: 'number',
    description:
      'Specify how much the values should increase/decrease upon clicking on up/down button.',
  },
  size: {
    control: 'select',
    description: 'Specify the size of the Number Input.',
    options: sizes,
    labels: {
      xs: 'Extra small size (xs)',
      sm: 'Small size (sm)',
      md: 'Medium size (md)',
      lg: 'Large size (lg)',
    },
  },
  type: {
    control: 'select',
    description: 'Specify if the input should be of type text or number.',
    options: ['number', 'text'],
  },
  locale: {
    control: 'text',
    description:
      'Specify a BCP47 language code for parsing and formatting (use with type="text").',
  },
  inputMode: {
    control: 'select',
    description:
      'Instruct the browser which keyboard to display on mobile devices.',
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
  stepStartValue: {
    control: 'number',
    description:
      'Provide the value stepping should begin at when the input is empty.',
  },
  disableWheel: {
    control: 'boolean',
    description:
      'Specify if the wheel functionality for the input should be disabled.',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Number Input',
  decorators: [
    moduleMetadata({
      imports: [
        NumberInputComponent,
        NumberInputSkeletonComponent,
        AiLabelComponent,
        AiLabelActionButtonComponent,
        FormsModule,
        ReactiveFormsModule,
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
      <cds-ng-number-input
        [allowEmpty]="allowEmpty"
        [decrementButtonAssistiveText]="decrementButtonDescription"
        [incrementButtonAssistiveText]="incrementButtonDescription"
        [helperText]="helperText"
        [hideSteppers]="hideSteppers"
        [hideLabel]="hideLabel"
        [invalid]="invalid"
        [invalidText]="invalidText"
        [label]="label"
        [readonly]="readOnly"
        [value]="value"
        [warn]="warn"
        [warnText]="warnText"
        [disabled]="disabled"
        [min]="min"
        [max]="max"
        [size]="size"
        [step]="step"
        [type]="type"
        [locale]="locale"
        [inputMode]="inputMode"
        [stepStartValue]="stepStartValue"
        [disableWheel]="disableWheel">
      </cds-ng-number-input>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: Story = {
  args: {
    hideLabel: false,
    size: 'md',
  },
  argTypes: {
    hideLabel: {
      control: 'boolean',
      description:
        'Specify whether you want the underlying label to be visually hidden',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Specify the size of the Number Input skeleton.',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-number-input-skeleton
        [hideLabel]="hideLabel"
        [size]="size">
      </cds-ng-number-input-skeleton>
    `,
  }),
};

// WC: WithAILabel
export const WithAILabel: Story = {
  args: {
    ...args,
    helperText: 'Optional helper text.',
    invalidText: 'Number is not valid',
    max: reusableProps.max,
    min: reusableProps.min,
  },
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-number-input
          [allowEmpty]="allowEmpty"
          [decrementButtonAssistiveText]="decrementButtonDescription"
          [incrementButtonAssistiveText]="incrementButtonDescription"
          [helperText]="helperText"
          [hideSteppers]="hideSteppers"
          [hideLabel]="hideLabel"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [label]="label"
          [readonly]="readOnly"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText"
          [disabled]="disabled"
          [min]="min"
          [max]="max"
          [size]="size"
          [step]="step"
          [type]="type"
          [locale]="locale"
          [inputMode]="inputMode"
          [stepStartValue]="stepStartValue"
          [disableWheel]="disableWheel">
          <cds-ng-ai-label alignment="bottom-left">
            ${content}
            ${actions}
          </cds-ng-ai-label>
        </cds-ng-number-input>
      </div>
    `,
  }),
};

// WC: WithTypeOfCustomValidation
export const WithTypeOfCustomValidation: Story = {
  args: {
    ...args,
    allowEmpty: true,
    helperText: 'Optional helper text. Uses en-US formatting.',
    invalidText: `Number is not valid. Must be between ${reusableProps.min} and ${reusableProps.max}`,
    max: reusableProps.max,
    min: reusableProps.min,
    type: 'text',
    value: '',
  },
  argTypes,
  render: (args) => ({
    props: {
      ...args,
      setValueTo1000: () => {
        const input = document.querySelector(
          '#custom-validation-number-input'
        ) as HTMLElement & { value: string };
        if (input) input.value = '1000';
      },
    },
    template: `
      <cds-ng-number-input
        id="custom-validation-number-input"
        [allowEmpty]="allowEmpty"
        [decrementButtonAssistiveText]="decrementButtonDescription"
        [incrementButtonAssistiveText]="incrementButtonDescription"
        [helperText]="helperText"
        [hideSteppers]="hideSteppers"
        [hideLabel]="hideLabel"
        [invalid]="invalid"
        [invalidText]="invalidText"
        [label]="label"
        [readonly]="readOnly"
        [value]="value"
        [warn]="warn"
        [warnText]="warnText"
        [disabled]="disabled"
        [min]="min"
        [max]="max"
        [size]="size"
        [step]="step"
        [type]="type"
        [locale]="locale"
        [inputMode]="inputMode"
        [stepStartValue]="stepStartValue"
        [disableWheel]="disableWheel">
      </cds-ng-number-input>
      <button (click)="setValueTo1000()">set to 1000</button>
    `,
  }),
};

// WC: WithTypeOfText
export const WithTypeOfText: Story = {
  args: {
    ...args,
    allowEmpty: true,
    helperText: 'Optional helper text. Uses en-US formatting.',
    invalidText: `Number is not valid. Must be between ${reusableProps.min} and ${reusableProps.max}`,
    max: reusableProps.max,
    min: reusableProps.min,
    type: 'text',
  },
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-number-input
        [allowEmpty]="allowEmpty"
        [decrementButtonAssistiveText]="decrementButtonDescription"
        [incrementButtonAssistiveText]="incrementButtonDescription"
        [helperText]="helperText"
        [hideSteppers]="hideSteppers"
        [hideLabel]="hideLabel"
        [invalid]="invalid"
        [invalidText]="invalidText"
        [label]="label"
        [readonly]="readOnly"
        [value]="value"
        [warn]="warn"
        [warnText]="warnText"
        [disabled]="disabled"
        [min]="min"
        [max]="max"
        [size]="size"
        [step]="step"
        [type]="type"
        [locale]="locale"
        [inputMode]="inputMode"
        [stepStartValue]="stepStartValue"
        [disableWheel]="disableWheel">
      </cds-ng-number-input>
    `,
  }),
};

// WC: WithTypeOfTextControlled
export const WithTypeOfTextControlled: Story = {
  args: {
    ...args,
    allowEmpty: true,
    helperText: 'Optional helper text. Uses en-US formatting.',
    max: reusableProps.max,
    min: 0,
    type: 'text',
    value: '',
  },
  argTypes,
  render: (args) => ({
    props: {
      ...args,
      setValueTo50: () => {
        const input = document.querySelector(
          '#controlled-number-input'
        ) as HTMLElement & { value: string };
        if (input) input.value = '50';
      },
    },
    template: `
      <cds-ng-number-input
        id="controlled-number-input"
        [allowEmpty]="allowEmpty"
        [decrementButtonAssistiveText]="decrementButtonDescription"
        [incrementButtonAssistiveText]="incrementButtonDescription"
        [helperText]="helperText"
        [hideSteppers]="hideSteppers"
        [hideLabel]="hideLabel"
        [invalid]="invalid"
        [invalidText]="invalidText"
        [label]="label"
        [readonly]="readOnly"
        [value]="value"
        [warn]="warn"
        [warnText]="warnText"
        [disabled]="disabled"
        [min]="min"
        [max]="max"
        [size]="size"
        [step]="step"
        [type]="type"
        [locale]="locale"
        [inputMode]="inputMode"
        [stepStartValue]="stepStartValue"
        [disableWheel]="disableWheel">
      </cds-ng-number-input>
      <button (click)="setValueTo50()">set to 50</button>
    `,
  }),
};

// WC: InvalidWithAILabel
export const InvalidWithAILabel: Story = {
  tags: ['!dev', '!autodocs'],
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-number-input
          value="50"
          min="0"
          max="100"
          step="1"
          label="NumberInput label"
          [invalid]="true"
          invalidText="invalid">
          <cds-ng-ai-label alignment="bottom-left">
            ${content}
            ${actions}
          </cds-ng-ai-label>
        </cds-ng-number-input>
      </div>
    `,
  }),
};

// WC: WarnWithAILabel
export const WarnWithAILabel: Story = {
  tags: ['!dev', '!autodocs'],
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-number-input
          value="50"
          min="0"
          max="100"
          step="1"
          label="NumberInput label"
          [warn]="true"
          warnText="warning">
          <cds-ng-ai-label alignment="bottom-left">
            ${content}
            ${actions}
          </cds-ng-ai-label>
        </cds-ng-number-input>
      </div>
    `,
  }),
};

// WC: DisabledWithAILabel
export const DisabledWithAILabel: Story = {
  tags: ['!dev', '!autodocs'],
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-number-input
          value="50"
          min="0"
          max="100"
          step="1"
          label="Number input"
          helperText="Optional helper text."
          [disabled]="true">
          <cds-ng-ai-label alignment="bottom-left">
            ${content}
            ${actions}
          </cds-ng-ai-label>
        </cds-ng-number-input>
      </div>
    `,
  }),
};

// WC: TypeTextTestScenarios
export const TypeTextTestScenarios: Story = {
  tags: ['!dev', '!autodocs'],
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <h3>Type="text" Test Scenarios</h3>
        <cds-ng-number-input
          type="text"
          inputMode="decimal"
          value="50"
          min="0"
          max="10000000"
          step="1"
          label="Basic type=text"
          invalidText="Value must be between 0 and 10000000"
          helperText="Basic text input with value 50">
        </cds-ng-number-input>
      </div>
    `,
  }),
};
