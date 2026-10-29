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
  RadioButtonComponent,
  RadioButtonGroupComponent,
  RadioButtonSkeletonComponent,
} from '@carbon/angular/radio-button';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';
import { IconButtonComponent } from '@carbon/angular/icon-button';

const orientations = {
  'Horizontal (horizontal)': 'horizontal',
  'Vertical (vertical)': 'vertical',
};

const labelPositions = {
  'Left (left)': 'left',
  'Right (right)': 'right',
};

const args = {
  disabled: false,
  readOnly: false,
  helperText: 'Helper text',
  invalid: false,
  invalidText: 'Invalid selection',
  labelPosition: 'right',
  orientation: 'horizontal',
  name: 'radio-group',
  required: false,
  value: 'radio-2',
  warn: false,
  warnText: 'Please notice the warning',
  checked: false,
  hideLabel: false,
  labelText: 'Radio button label',
};

const argTypes: ArgTypes = {
  disabled: {
    control: 'boolean',
    description: 'Disabled (disabled)',
  },
  readOnly: {
    control: 'boolean',
    description: 'read only (readOnly)',
  },
  required: {
    control: 'boolean',
    description: 'Required (required)',
  },
  helperText: {
    control: 'text',
    description: 'Helper text (helper-text)',
  },
  invalid: {
    control: 'boolean',
    description: 'Invalid (invalid)',
  },
  invalidText: {
    control: 'text',
    description: 'Invalid text (invalid-text)',
  },
  labelPosition: {
    control: 'select',
    description: 'Label position (label-position)',
    options: Object.values(labelPositions),
  },
  orientation: {
    control: 'select',
    description: 'Orientation (orientation)',
    options: Object.values(orientations),
  },
  name: {
    control: 'text',
    description: 'Name (name)',
  },
  value: {
    control: 'text',
    description: 'Value (value)',
  },
  warn: {
    control: 'boolean',
    description: 'Warn (warn)',
  },
  warnText: {
    control: 'text',
    description: 'Warn text (warn-text)',
  },
  checked: {
    control: 'boolean',
    description: 'Checked (checked)',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Hide label (hide-label)',
  },
  labelText: {
    control: 'text',
    description: 'Label text (label-text)',
  },
};

const meta: Meta = {
  title: 'Components/Radio Button',
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RadioButtonComponent,
        RadioButtonGroupComponent,
        RadioButtonSkeletonComponent,
        AiLabelComponent,
        AiLabelActionButtonComponent,
        IconButtonComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-radio-button-group
        [readOnly]="readOnly"
        [disabled]="disabled"
        [helperText]="helperText"
        [invalid]="invalid"
        [invalidText]="invalidText"
        [labelPosition]="labelPosition"
        legendText="Radio Button group"
        [orientation]="orientation"
        [name]="name"
        [value]="value"
        [required]="required"
        [warn]="warn"
        [warnText]="warnText">
        <cds-ng-radio-button
          [checked]="checked"
          [hideLabel]="hideLabel"
          [labelText]="labelText"
          value="radio-1"></cds-ng-radio-button>
        <cds-ng-radio-button
          [hideLabel]="hideLabel"
          [labelText]="labelText"
          value="radio-2"></cds-ng-radio-button>
        <cds-ng-radio-button
          [hideLabel]="hideLabel"
          [labelText]="labelText"
          value="radio-3"></cds-ng-radio-button>
      </cds-ng-radio-button-group>
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <cds-ng-radio-button-group
        legendText="Group label"
        name="radio-group"
        value="radio-1"
        orientation="vertical">
        <cds-ng-radio-button
          labelText="Radio button label"
          value="radio-1"></cds-ng-radio-button>
        <cds-ng-radio-button
          labelText="Radio button label"
          value="radio-2"></cds-ng-radio-button>
        <cds-ng-radio-button
          labelText="Radio button label"
          value="radio-3"
          [disabledItem]="true"></cds-ng-radio-button>
      </cds-ng-radio-button-group>
    `,
  }),
};

export const Skeleton: Story = {
  render: () => ({
    template: `<cds-ng-radio-button-skeleton></cds-ng-radio-button-skeleton>`,
  }),
};

export const WithAILabel: Story = {
  render: () => ({
    template: `
      <cds-ng-radio-button-group
        legendText="Group label"
        name="radio-group"
        value="radio-1"
        orientation="vertical">
        <cds-ng-ai-label alignment="bottom-left">
          <div slot="body-text">
            <p class="secondary">AI Explained</p>
            <h2 class="ai-label-heading">84%</h2>
            <p class="secondary bold">Confidence score</p>
            <p class="secondary">
              Lorem ipsum dolor sit amet, di os consectetur adipiscing elit.
            </p>
          </div>
        </cds-ng-ai-label>
        <cds-ng-radio-button
          labelText="Radio button label"
          value="radio-1"></cds-ng-radio-button>
        <cds-ng-radio-button
          labelText="Radio button label"
          value="radio-2"></cds-ng-radio-button>
        <cds-ng-radio-button
          labelText="Radio button label"
          value="radio-3"></cds-ng-radio-button>
      </cds-ng-radio-button-group>
    `,
  }),
};

// ─── Angular-only stories ─────────────────────────────────────────────────────

export const NgModel: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => ({
    props: {
      selectedRadio: 'radio-2',
    },
    template: `
      <cds-ng-radio-button-group
        legendText="[(ngModel)] binding"
        name="ngmodel-radio-group"
        [(ngModel)]="selectedRadio">
        <cds-ng-radio-button labelText="Option 1" value="radio-1"></cds-ng-radio-button>
        <cds-ng-radio-button labelText="Option 2" value="radio-2"></cds-ng-radio-button>
        <cds-ng-radio-button labelText="Option 3" value="radio-3"></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      <p style="margin-top: 1rem;">Selected: {{ selectedRadio }}</p>
    `,
  }),
};

export const ReactiveForm: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => ({
    props: {
      control: new FormControl('radio-3'),
    },
    template: `
      <cds-ng-radio-button-group
        legendText="Reactive Form control"
        name="reactive-radio-group"
        [formControl]="control">
        <cds-ng-radio-button labelText="Option 1" value="radio-1"></cds-ng-radio-button>
        <cds-ng-radio-button labelText="Option 2" value="radio-2"></cds-ng-radio-button>
        <cds-ng-radio-button labelText="Option 3" value="radio-3"></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      <p style="margin-top: 1rem;">Value: {{ control.value }}</p>
    `,
  }),
};
