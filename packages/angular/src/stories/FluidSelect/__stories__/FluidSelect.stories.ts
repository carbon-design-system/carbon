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
  FluidSelectComponent,
  FluidSelectSkeletonComponent,
} from '@carbon/angular/fluid-select';
import { SelectItemComponent } from '@carbon/angular/select';
import { ToggletipComponent } from '@carbon/angular/toggle-tip';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';

// ─── WC-parity stories (one-for-one with @carbon/web-components Fluid Select) ───

const aiLabelContent = `
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

const aiLabelActions = `<cds-ng-ai-label-action-button>View details</cds-ng-ai-label-action-button>`;

const selectItemsTemplate = `
  <cds-ng-select-item value=""></cds-ng-select-item>
  <cds-ng-select-item value="option-1">Option 1</cds-ng-select-item>
  <cds-ng-select-item value="option-2">Option 2</cds-ng-select-item>
  <cds-ng-select-item value="option-3">Option 3</cds-ng-select-item>
  <cds-ng-select-item value="option-4">Option 4</cds-ng-select-item>
`;

const args = {
  defaultWidth: 400,
  disabled: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long',
  id: 'select-1',
  labelText: 'Select an option',
  name: 'fluid-select',
  readOnly: false,
  value: '',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

const argTypes: ArgTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  disabled: {
    control: 'boolean',
    description: 'Specify whether the control is disabled.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently value is invalid.',
  },
  invalidText: {
    control: 'text',
    description: 'Message which is displayed if the value is invalid.',
  },
  id: {
    control: 'text',
    description: 'Specify the id for the label and select.',
  },
  labelText: {
    control: 'text',
    description:
      'Provide label text to be read by screen readers when interacting with the control.',
  },
  name: {
    control: 'text',
    description: 'Specify the name used when submitting form data.',
  },
  readOnly: {
    control: 'boolean',
    description: 'Whether the select should be read-only.',
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
  value: {
    control: 'text',
    description: 'Specify the selected value.',
  },
  onInput: {
    action: 'select',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Fluid Components/FluidSelect',
  decorators: [
    moduleMetadata({
      imports: [
        FluidSelectComponent,
        FluidSelectSkeletonComponent,
        SelectItemComponent,
        ToggletipComponent,
        AiLabelComponent,
        AiLabelActionButtonComponent,
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
        <cds-ng-fluid-select
          [id]="id"
          [disabled]="disabled"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [labelText]="labelText"
          [name]="name"
          [readonly]="readOnly"
          [warn]="warn"
          [warnText]="warnText"
          [value]="value">
          ${selectItemsTemplate}
        </cds-ng-fluid-select>
      </div>
    `,
  }),
};

// WC: WithToggletip
export const WithToggletip: Story = {
  args,
  argTypes,
  parameters: {
    controls: {
      exclude: ['labelText', 'onInput'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div [style.width.px]="defaultWidth">
        <cds-ng-fluid-select
          [id]="id"
          [disabled]="disabled"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [name]="name"
          [readonly]="readOnly"
          [warn]="warn"
          [warnText]="warnText"
          [value]="value">
          <cds-ng-toggletip [autoalign]="true" slot="label-text">
            Label
            <p slot="body-text">Additional field information here.</p>
          </cds-ng-toggletip>
          <cds-ng-select-item
            value="An example option that is really long to show what should be done to handle long text">
            An example option that is really long to show what should be done
            to handle long text
          </cds-ng-select-item>
          <cds-ng-select-item value="option-1">Option 1</cds-ng-select-item>
          <cds-ng-select-item value="option-2">Option 2</cds-ng-select-item>
          <cds-ng-select-item value="option-3">Option 3</cds-ng-select-item>
          <cds-ng-select-item value="option-4">Option 4</cds-ng-select-item>
        </cds-ng-fluid-select>
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
    defaultWidth: argTypes.defaultWidth,
  },
  render: (args) => ({
    props: args,
    template: `
      <div [style.width.px]="defaultWidth">
        <cds-ng-fluid-select-skeleton></cds-ng-fluid-select-skeleton>
      </div>
    `,
  }),
};

// WC: WithAILabel
export const WithAILabel: Story = {
  args,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div [style.width.px]="defaultWidth">
        <cds-ng-fluid-select
          [id]="id"
          [disabled]="disabled"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [labelText]="labelText"
          [name]="name"
          [readonly]="readOnly"
          [warn]="warn"
          [warnText]="warnText"
          [value]="value">
          <cds-ng-ai-label alignment="bottom-left">
            ${aiLabelContent}
            ${aiLabelActions}
          </cds-ng-ai-label>
          <cds-ng-select-item value=""></cds-ng-select-item>
          <cds-ng-select-item value="all">
            An example option that is really long to show what should be done to
            handle long text
          </cds-ng-select-item>
          <cds-ng-select-item value="cloudFoundry">Option 2</cds-ng-select-item>
          <cds-ng-select-item value="staging">Option 3</cds-ng-select-item>
          <cds-ng-select-item value="dea">Option 4</cds-ng-select-item>
        </cds-ng-fluid-select>
      </div>
    `,
  }),
};
