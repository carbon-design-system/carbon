/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import {
  DropdownComponent,
  DropdownItemComponent,
  DropdownSkeletonComponent,
} from '@carbon/angular/dropdown';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';
import { LayerComponent } from '@carbon/angular/layer';

// ─── WC-parity stories (one-for-one with @carbon/web-components Dropdown) ─────
// TODO(parity): WithToggletipLabel — requires ToggleTipComponent (not yet generated)

const items = [
  {
    value: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    disabled: false,
  },
  { value: 'option-1', text: 'Option 1', disabled: false },
  { value: 'option-2', text: 'Option 2', disabled: false },
  { value: 'option-3', text: 'Option 3', disabled: true },
  { value: 'option-4', text: 'Option 4', disabled: false },
  { value: 'option-5', text: 'Option 5', disabled: false },
  { value: 'option-6', text: 'Option 6', disabled: false },
  { value: 'option-7', text: 'Option 7', disabled: false },
  { value: 'option-8', text: 'Option 8', disabled: false },
];

const defaultArgs = {
  ariaLabel: '',
  direction: 'bottom',
  disabled: false,
  helperText: 'Helper text',
  hideLabel: false,
  invalid: false,
  invalidText: 'Error message goes here',
  label: 'Choose an option',
  open: false,
  readOnly: false,
  size: '',
  titleText: 'Label',
  type: '',
  value: '',
  warn: false,
  warnText: 'Warning message goes here',
};

const controls: ArgTypes = {
  ariaLabel: {
    control: 'text',
    description:
      'Specify a label to be read by screen readers on the container node.',
  },
  direction: {
    control: 'select',
    options: ['top', 'bottom'],
    description:
      "Specify the direction of the dropdown. Can be either 'top' or 'bottom'.",
  },
  disabled: {
    control: 'boolean',
    description: 'Disable the control.',
  },
  helperText: {
    control: 'text',
    description:
      'Provide helper text that is used alongside the control label for additional help.',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Specify whether the title text should be hidden or not.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently selected value is invalid.',
  },
  invalidText: {
    control: 'text',
    description: 'Message which is displayed if the value is invalid.',
  },
  label: {
    control: 'text',
    description: 'The default content of the trigger button.',
  },
  open: {
    control: 'boolean',
    description: 'Specify if the dropdown should be open, or not.',
  },
  readOnly: {
    control: 'boolean',
    description: 'Whether or not the Dropdown is readonly.',
  },
  size: {
    control: 'select',
    options: ['', 'sm', 'md', 'lg'],
    labels: {
      '': 'Default',
      sm: 'Small (sm)',
      md: 'Medium (md)',
      lg: 'Large (lg)',
    },
    description:
      "Specify the size of the ListBox. Currently supports either 'sm', 'md' or 'lg' as an option.",
  },
  titleText: {
    control: 'text',
    description:
      'Text that will be read by a screen reader when visiting this control.',
  },
  type: {
    control: 'select',
    options: ['', 'inline'],
    labels: { '': 'Default', inline: 'Inline (inline)' },
    description: "The dropdown type, 'default' or 'inline'.",
  },
  value: {
    control: 'text',
    description: 'The value of the selected item.',
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
};

// Skeleton controls
const skeletonArgs = {
  hideLabel: false,
  size: 'md',
};

const skeletonControls: ArgTypes = {
  hideLabel: {
    control: 'boolean',
    description: 'Specify whether the label should be hidden, or not.',
  },
  size: {
    control: 'select',
    options: ['', 'sm', 'md', 'lg'],
    labels: {
      '': 'Default',
      sm: 'Small (sm)',
      md: 'Medium (md)',
      lg: 'Large (lg)',
    },
    description: 'Specify the size of the ListBox.',
  },
};

// AI label content/actions shared across WithAILabel instances
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Dropdown',
  decorators: [
    moduleMetadata({
      imports: [
        DropdownItemComponent,
        DropdownSkeletonComponent,
        AiLabelComponent,
        AiLabelActionButtonComponent,
        LayerComponent,
        ReactiveFormsModule,
        NgFor,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args: defaultArgs,
  argTypes: controls,
  render: (args) => ({
    props: { ...args, items },
    template: `
      <cds-ng-dropdown
        [ariaLabel]="ariaLabel"
        [direction]="direction"
        [disabled]="disabled"
        [helperText]="helperText"
        [hideLabel]="hideLabel"
        [invalid]="invalid"
        [invalidText]="invalidText"
        [label]="label"
        [open]="open"
        [readOnly]="readOnly"
        [size]="size || null"
        [titleText]="titleText"
        [type]="type || null"
        [value]="value"
        [warn]="warn"
        [warnText]="warnText"
      >
        <cds-ng-dropdown-item
          *ngFor="let item of items"
          [value]="item.value"
          [disabled]="item.disabled"
        >{{item.text}}</cds-ng-dropdown-item>
      </cds-ng-dropdown>
    `,
  }),
};

// WC: Inline
export const Inline: Story = {
  args: {
    ...defaultArgs,
    label: 'Option 1',
    titleText: 'Label',
    type: 'inline',
    value: 'option-1',
  },
  argTypes: controls,
  render: (args) => ({
    props: { ...args, items },
    template: `
      <cds-ng-dropdown
        [ariaLabel]="ariaLabel"
        [direction]="direction"
        [disabled]="disabled"
        [helperText]="helperText"
        [hideLabel]="hideLabel"
        [invalid]="invalid"
        [invalidText]="invalidText"
        [label]="label"
        [open]="open"
        [readOnly]="readOnly"
        [size]="size || null"
        [titleText]="titleText"
        [type]="type || null"
        [value]="value"
        [warn]="warn"
        [warnText]="warnText"
      >
        <cds-ng-dropdown-item
          *ngFor="let item of items"
          [value]="item.value"
          [disabled]="item.disabled"
        >{{item.text}}</cds-ng-dropdown-item>
      </cds-ng-dropdown>
    `,
  }),
};

// WC: ExperimentalAutoAlign
export const ExperimentalAutoAlign: Story = {
  args: {
    ...defaultArgs,
    direction: 'top',
    label: 'Option 1',
    value: 'option-1',
  },
  argTypes: controls,
  render: (args) => ({
    props: { ...args, items },
    template: `
      <div style="width:400px">
        <div style="height: 300px"></div>
        <cds-ng-dropdown
          [ariaLabel]="ariaLabel"
          [autoalign]="true"
          [direction]="direction"
          [disabled]="disabled"
          [helperText]="helperText"
          [hideLabel]="hideLabel"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [label]="label"
          [open]="open"
          [readOnly]="readOnly"
          [size]="size || null"
          [titleText]="titleText"
          [type]="type || null"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText"
        >
          <cds-ng-dropdown-item
            *ngFor="let item of items"
            [value]="item.value"
            [disabled]="item.disabled"
          >{{item.text}}</cds-ng-dropdown-item>
        </cds-ng-dropdown>
        <div style="height: 800px"></div>
      </div>
    `,
  }),
};

// WC: InlineWithLayer
export const InlineWithLayer: Story = {
  args: {
    ...defaultArgs,
    label: 'Option 1',
    titleText: 'Label',
    type: 'inline',
    value: 'option-1',
  },
  argTypes: controls,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    props: { ...args, items },
    template: `
      <cds-ng-layer>
        <div style="width:400px">
          <cds-ng-dropdown
            [ariaLabel]="ariaLabel"
            [direction]="direction"
            [disabled]="disabled"
            [helperText]="helperText"
            [hideLabel]="hideLabel"
            [invalid]="invalid"
            [invalidText]="invalidText"
            [label]="label"
            [open]="open"
            [readOnly]="readOnly"
            [size]="size || null"
            [titleText]="titleText"
            [type]="type || null"
            [value]="value"
            [warn]="warn"
            [warnText]="warnText"
          >
            <cds-ng-dropdown-item
              *ngFor="let item of items"
              [value]="item.value"
              [disabled]="item.disabled"
            >{{item.text}}</cds-ng-dropdown-item>
          </cds-ng-dropdown>
        </div>
        <cds-ng-layer>
          <div style="width:400px">
            <cds-ng-dropdown
              [ariaLabel]="ariaLabel"
              [direction]="direction"
              [disabled]="disabled"
              [helperText]="helperText"
              [hideLabel]="hideLabel"
              [invalid]="invalid"
              [invalidText]="invalidText"
              [label]="label"
              [open]="open"
              [readOnly]="readOnly"
              [size]="size || null"
              [titleText]="titleText"
              [type]="type || null"
              [value]="value"
              [warn]="warn"
              [warnText]="warnText"
            >
              <cds-ng-dropdown-item
                *ngFor="let item of items"
                [value]="item.value"
                [disabled]="item.disabled"
              >{{item.text}}</cds-ng-dropdown-item>
            </cds-ng-dropdown>
          </div>
          <cds-ng-layer>
            <div style="width:400px">
              <cds-ng-dropdown
                [ariaLabel]="ariaLabel"
                [direction]="direction"
                [disabled]="disabled"
                [helperText]="helperText"
                [hideLabel]="hideLabel"
                [invalid]="invalid"
                [invalidText]="invalidText"
                [label]="label"
                [open]="open"
                [readOnly]="readOnly"
                [size]="size || null"
                [titleText]="titleText"
                [type]="type || null"
                [value]="value"
                [warn]="warn"
                [warnText]="warnText"
              >
                <cds-ng-dropdown-item
                  *ngFor="let item of items"
                  [value]="item.value"
                  [disabled]="item.disabled"
                >{{item.text}}</cds-ng-dropdown-item>
              </cds-ng-dropdown>
            </div>
          </cds-ng-layer>
        </cds-ng-layer>
      </cds-ng-layer>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: StoryObj<Record<string, unknown>> = {
  args: skeletonArgs,
  argTypes: skeletonControls,
  render: (args) => ({
    props: args,
    template: `
      <div style="width:300px">
        <cds-ng-dropdown-skeleton [hideLabel]="hideLabel" [size]="size"></cds-ng-dropdown-skeleton>
      </div>
    `,
  }),
};

// WC: WithAILabel
export const WithAILabel: Story = {
  args: {
    ...defaultArgs,
    label: 'Option 1',
    value: 'option-1',
  },
  argTypes: controls,
  render: (args) => ({
    props: { ...args, items },
    template: `
      <div style="width:400px">
        <cds-ng-dropdown
          [ariaLabel]="ariaLabel"
          [direction]="direction"
          [disabled]="disabled"
          [helperText]="helperText"
          [hideLabel]="hideLabel"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [label]="label"
          [open]="open"
          [readOnly]="readOnly"
          [size]="size || null"
          [titleText]="titleText"
          [type]="type || null"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText"
        >
          <cds-ng-ai-label alignment="bottom-left">
            ${aiLabelContent}${aiLabelActions}
          </cds-ng-ai-label>
          <cds-ng-dropdown-item
            *ngFor="let item of items"
            [value]="item.value"
            [disabled]="item.disabled"
          >{{item.text}}</cds-ng-dropdown-item>
        </cds-ng-dropdown>
      </div>
    `,
  }),
};

// WC: WithLayer
export const WithLayer: Story = {
  args: {
    ...defaultArgs,
    label: 'Option 1',
    value: 'option-1',
  },
  argTypes: controls,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    props: { ...args, items },
    template: `
      <cds-ng-layer>
        <div style="width:400px">
          <cds-ng-dropdown
            [ariaLabel]="ariaLabel"
            [direction]="direction"
            [disabled]="disabled"
            [helperText]="helperText"
            [hideLabel]="hideLabel"
            [invalid]="invalid"
            [invalidText]="invalidText"
            [label]="label"
            [open]="open"
            [readOnly]="readOnly"
            [size]="size || null"
            [titleText]="titleText"
            [type]="type || null"
            [value]="value"
            [warn]="warn"
            [warnText]="warnText"
          >
            <cds-ng-dropdown-item
              *ngFor="let item of items"
              [value]="item.value"
              [disabled]="item.disabled"
            >{{item.text}}</cds-ng-dropdown-item>
          </cds-ng-dropdown>
        </div>
        <cds-ng-layer>
          <div style="width:400px">
            <cds-ng-dropdown
              [ariaLabel]="ariaLabel"
              [direction]="direction"
              [disabled]="disabled"
              [helperText]="helperText"
              [hideLabel]="hideLabel"
              [invalid]="invalid"
              [invalidText]="invalidText"
              [label]="label"
              [open]="open"
              [readOnly]="readOnly"
              [size]="size || null"
              [titleText]="titleText"
              [type]="type || null"
              [value]="value"
              [warn]="warn"
              [warnText]="warnText"
            >
              <cds-ng-dropdown-item
                *ngFor="let item of items"
                [value]="item.value"
                [disabled]="item.disabled"
              >{{item.text}}</cds-ng-dropdown-item>
            </cds-ng-dropdown>
          </div>
          <cds-ng-layer>
            <div style="width:400px">
              <cds-ng-dropdown
                [ariaLabel]="ariaLabel"
                [direction]="direction"
                [disabled]="disabled"
                [helperText]="helperText"
                [hideLabel]="hideLabel"
                [invalid]="invalid"
                [invalidText]="invalidText"
                [label]="label"
                [open]="open"
                [readOnly]="readOnly"
                [size]="size || null"
                [titleText]="titleText"
                [type]="type || null"
                [value]="value"
                [warn]="warn"
                [warnText]="warnText"
              >
                <cds-ng-dropdown-item
                  *ngFor="let item of items"
                  [value]="item.value"
                  [disabled]="item.disabled"
                >{{item.text}}</cds-ng-dropdown-item>
              </cds-ng-dropdown>
            </div>
          </cds-ng-layer>
        </cds-ng-layer>
      </cds-ng-layer>
    `,
  }),
};

// ─── Angular-only stories (CVA / forms integration) ───────────────────────────

// ReactiveForm: used by Dropdown.e2e.ts
export const ReactiveForm: StoryObj<Record<string, unknown>> = {
  tags: ['!dev', '!autodocs'],
  render: () => ({
    props: { control: new FormControl('1.1') },
    template: `
      <cds-ng-dropdown label="Select" title-text="TLS" [formControl]="control">
        <cds-ng-dropdown-item value="1.0">1.0</cds-ng-dropdown-item>
        <cds-ng-dropdown-item value="1.1">1.1</cds-ng-dropdown-item>
        <cds-ng-dropdown-item value="1.2">1.2</cds-ng-dropdown-item>
      </cds-ng-dropdown>
      <p data-testid="value">{{ control.value }}</p>
      <button type="button" data-testid="set" (click)="control.setValue('1.2')">set 1.2</button>
    `,
  }),
};
