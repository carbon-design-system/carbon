/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NgFor } from '@angular/common';
import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import {
  ComboBoxComponent,
  ComboBoxItemComponent,
} from '@carbon/angular/combo-box';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';
import { ButtonComponent } from '@carbon/angular/button';
import { IconButtonComponent } from '@carbon/angular/icon-button';
import { withLayers } from '../../../../.storybook/decorators/with-layers';

// ─── WC-parity stories (one-for-one with @carbon/web-components Combo Box) ───

const items = [
  {
    value: 'option-0',
    text: 'An example option that is really long to show what should be done to handle long text',
    disabled: false,
  },
  { value: 'option-1', text: 'Option 1', disabled: false },
  { value: 'option-2', text: 'Option 2', disabled: false },
  { value: 'option-3', text: 'Option 3', disabled: true },
  { value: 'option-4', text: 'Option 4', disabled: false },
  { value: 'option-5', text: 'Option 5', disabled: false },
];

const defaultArgs = {
  direction: 'bottom',
  allowCustomValue: false,
  disabled: false,
  helperText: 'Helper text',
  invalid: false,
  invalidText: 'Error message goes here',
  label: '',
  readOnly: false,
  size: '',
  titleText: 'Label',
  typeahead: false,
  value: '',
  warn: false,
  warnText: 'Warning message goes here',
  inputProps: undefined,
};

const controls: ArgTypes = {
  autoalign: {
    control: 'boolean',
    description:
      'Will auto-align the combo box. This attribute is currently experimental and is subject to future changes.',
  },
  allowCustomValue: {
    control: 'boolean',
    description:
      'Specify whether or not the ComboBox should allow a value that is not in the list to be entered in the input.',
  },
  disabled: {
    control: 'boolean',
    description: 'Specify if the control should be disabled, or not.',
  },
  direction: {
    control: 'select',
    options: ['top', 'bottom'],
    labels: { top: 'Top', bottom: 'Bottom' },
    description:
      'Specify the direction of the combobox dropdown. Can be either top or bottom.',
  },
  helperText: {
    control: 'text',
    description:
      'Provide helper text that is used alongside the control label for additional help.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently selected value is invalid.',
  },
  invalidText: {
    control: 'text',
    description: 'Message which is displayed if the value is invalid.',
  },
  inputProps: {
    control: 'object',
    description:
      "Specify native input attributes to place on the internal input, for example `{ maxlength: 5, autocomplete: 'off'}`.",
  },
  label: {
    control: 'text',
    description: 'The default content of the trigger button.',
  },
  readOnly: {
    control: 'boolean',
    description: 'Specify whether or not the component is read-only.',
  },
  size: {
    control: 'select',
    options: ['xs', 'sm', '', 'lg'],
    labels: {
      xs: 'Extra small size (xs)',
      sm: 'Small size (sm)',
      '': 'Regular size',
      lg: 'Large size (lg)',
    },
    description:
      'Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.',
  },
  titleText: {
    control: 'text',
    description:
      'Provide text to be used in a <label> element that is tied to the combobox via ARIA attributes.',
  },
  typeahead: {
    control: 'boolean',
    description:
      '**Experimental**: will enable autocomplete and typeahead for the input field.',
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

// Bindings shared by every `cds-ng-combo-box` in this file.
const comboBoxBindings = `
  [inputProps]="inputProps"
  [autoalign]="autoalign"
  [direction]="direction"
  [disabled]="disabled"
  [helperText]="helperText"
  [invalid]="invalid"
  [invalidText]="invalidText"
  [readOnly]="readOnly"
  [allowCustomValue]="allowCustomValue"
  [titleText]="titleText"
  [size]="size || null"
  [value]="value"
  [label]="label"
  [warn]="warn"
  [warnText]="warnText"
  [typeahead]="typeahead"
`;

const itemsTemplate = `
  <cds-ng-combo-box-item
    *ngFor="let item of items"
    [value]="item.value"
    [disabled]="item.disabled"
  >{{item.text}}</cds-ng-combo-box-item>
`;

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

// Inline copies of the Carbon `view`, `folder--open` and `folders` 16px icons.
const iconAttrs =
  'slot="icon" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" width="16" height="16"';

const actions = `
  <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
    <svg ${iconAttrs} viewBox="0 0 16 16">
      <path d="M15.5,7.8C14.3,4.7,11.3,2.6,8,2.5C4.7,2.6,1.7,4.7,0.5,7.8c0,0.1,0,0.2,0,0.3c1.2,3.1,4.1,5.2,7.5,5.3c3.3-0.1,6.3-2.2,7.5-5.3C15.5,8.1,15.5,7.9,15.5,7.8z M8,12.5c-2.7,0-5.4-2-6.5-4.5c1-2.5,3.8-4.5,6.5-4.5s5.4,2,6.5,4.5C13.4,10.5,10.6,12.5,8,12.5z"/>
      <path d="M8,5C6.3,5,5,6.3,5,8s1.3,3,3,3s3-1.3,3-3S9.7,5,8,5z M8,10c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S9.1,10,8,10z"/>
    </svg>
    <span slot="tooltip-content"> View </span>
  </cds-ng-icon-button>
  <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
    <svg ${iconAttrs} viewBox="0 0 32 32">
      <path d="M28,8H20.8284L17.4143,4.5859A2,2,0,0,0,16,4H4A2,2,0,0,0,2,6V26a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10A2,2,0,0,0,28,8ZM8,26V14h8v6.17l-2.59-2.58L12,19l5,5,5-5-1.41-1.41L18,20.17V14a2.0025,2.0025,0,0,0-2-2H8a2.0025,2.0025,0,0,0-2,2V26H4V6H16l4,4h8v2H22v2h6V26Z"/>
    </svg>
    <span slot="tooltip-content"> Open folder</span>
  </cds-ng-icon-button>
  <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
    <svg ${iconAttrs} viewBox="0 0 32 32">
      <path d="M26,28H6a2.0021,2.0021,0,0,1-2-2V11A2.0021,2.0021,0,0,1,6,9h5.6665a2.0119,2.0119,0,0,1,1.2007.4L16.3335,12H26a2.0021,2.0021,0,0,1,2,2V26A2.0021,2.0021,0,0,1,26,28ZM11.6665,11H5.9985L6,26H26V14H15.6665Z"/>
      <path d="M28,9H17.6665l-4-3H6V4h7.6665a2.0119,2.0119,0,0,1,1.2007.4L18.3335,7H28Z"/>
    </svg>
    <span slot="tooltip-content"> Folders </span>
  </cds-ng-icon-button>
  <cds-ng-ai-label-action-button>View details</cds-ng-ai-label-action-button>
`;

type ControlledComboBox = HTMLElement & { value: string; open: boolean };

const getControlledComboBox = () =>
  document.getElementById('controlled-combo-box') as ControlledComboBox | null;

const handleBeforeSelected = (event: CustomEvent) => {
  event.preventDefault();

  const { item } = event?.detail ?? {};
  const nextValue = item?.getAttribute?.('value') ?? item?.value ?? '';

  const comboBox = getControlledComboBox();
  if (comboBox) {
    comboBox.value = nextValue;
    comboBox.open = false;
  }
};

const handleSelected = (event: CustomEvent) => {
  const { item, value: detailValue } = event?.detail ?? {};
  if (item) {
    return;
  }
  const comboBox = getControlledComboBox();
  if (comboBox) {
    comboBox.value = typeof detailValue === 'string' ? detailValue : '';
  }
};

const setValue = (nextValue: string) => {
  const comboBox = getControlledComboBox();
  if (comboBox) {
    comboBox.value = nextValue;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Combo box',
  decorators: [
    moduleMetadata({
      imports: [
        ComboBoxComponent,
        ComboBoxItemComponent,
        AiLabelComponent,
        AiLabelActionButtonComponent,
        ButtonComponent,
        IconButtonComponent,
        NgFor,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args: {
    ...defaultArgs,
    helperText: 'Helper text',
    titleText: 'Label',
    inputProps: {},
  },
  argTypes: controls,
  render: (args) => ({
    props: { ...args, items },
    template: `
      <div style="width:300px">
        <cds-ng-combo-box ${comboBoxBindings}>
          ${itemsTemplate}
        </cds-ng-combo-box>
      </div>
    `,
  }),
};

// WC: AllowCustomValue
export const AllowCustomValue: Story = {
  args: {
    ...defaultArgs,
    helperText: 'Helper text',
    titleText: 'Label',
    allowCustomValue: true,
  },
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: `
      <div style="width:300px">
        <cds-ng-combo-box ${comboBoxBindings} [shouldFilterItem]="true">
          <cds-ng-combo-box-item value="Apple">Apple</cds-ng-combo-box-item>
          <cds-ng-combo-box-item value="Orange">Orange</cds-ng-combo-box-item>
          <cds-ng-combo-box-item value="Banana">Banana</cds-ng-combo-box-item>
          <cds-ng-combo-box-item value="Pineapple">Pineapple</cds-ng-combo-box-item>
          <cds-ng-combo-box-item value="Raspberry">Raspberry</cds-ng-combo-box-item>
          <cds-ng-combo-box-item value="Lime">Lime</cds-ng-combo-box-item>
        </cds-ng-combo-box>
      </div>
    `,
  }),
};

// WC: AutocompleteWithTypeahead
export const AutocompleteWithTypeahead: Story = {
  args: {
    ...defaultArgs,
    helperText: 'Helper text',
    titleText: 'Label',
    typeahead: true,
  },
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: `
      <div style="width:300px">
        <cds-ng-combo-box ${comboBoxBindings}>
          <cds-ng-combo-box-item value="apple">Apple</cds-ng-combo-box-item>
          <cds-ng-combo-box-item value="apricot">Apricot</cds-ng-combo-box-item>
          <cds-ng-combo-box-item value="avocado">Avocado</cds-ng-combo-box-item>
          <cds-ng-combo-box-item value="banana">Banana</cds-ng-combo-box-item>
          <cds-ng-combo-box-item value="blackberry">Blackberry</cds-ng-combo-box-item>
          <cds-ng-combo-box-item value="blueberry">Blueberry</cds-ng-combo-box-item>
          <cds-ng-combo-box-item value="cantaloupe">Cantaloupe</cds-ng-combo-box-item>
        </cds-ng-combo-box>
      </div>
    `,
  }),
};

// WC: ExperimentalAutoAlign
export const ExperimentalAutoAlign: Story = {
  args: {
    ...defaultArgs,
    autoalign: true,
    direction: 'bottom',
    helperText: 'Combobox helper text',
    titleText: 'ComboBox title',
  },
  argTypes: controls,
  render: (args) => ({
    props: { ...args, items },
    template: `
      <div style="width:400px">
        <div style="height: 300px"></div>
        <cds-ng-combo-box ${comboBoxBindings}>
          ${itemsTemplate}
        </cds-ng-combo-box>
        <div style="height: 800px"></div>
      </div>
    `,
  }),
};

// WC: Controlled
export const Controlled: Story = {
  args: {
    ...defaultArgs,
    helperText: 'Helper text',
    titleText: 'Label',
    value: 'option-1',
  },
  argTypes: controls,
  render: (args) => ({
    props: { ...args, handleBeforeSelected, handleSelected, setValue },
    template: `
      <cds-ng-combo-box
        id="controlled-combo-box"
        controlled
        ${comboBoxBindings}
        (comboBoxBeingselected)="handleBeforeSelected($event)"
        (comboBoxSelected)="handleSelected($event)"
      >
        <cds-ng-combo-box-item value="option-1">Option 1</cds-ng-combo-box-item>
        <cds-ng-combo-box-item value="option-2">Option 2</cds-ng-combo-box-item>
        <cds-ng-combo-box-item value="option-3">Option 3</cds-ng-combo-box-item>
      </cds-ng-combo-box>

      <div style="display: flex; align-items: center; justify-content: space-between;">
        <cds-ng-button (click)="setValue('')">Clear</cds-ng-button>
        <cds-ng-button (click)="setValue('option-1')">Option 1</cds-ng-button>
        <cds-ng-button (click)="setValue('option-2')">Option 2</cds-ng-button>
        <cds-ng-button (click)="setValue('option-3')">Option 3</cds-ng-button>
      </div>
    `,
  }),
};

// WC: WithAILabel
export const WithAILabel: Story = {
  args: {
    ...defaultArgs,
    helperText: 'Helper text',
    titleText: 'Label',
  },
  argTypes: controls,
  render: (args) => ({
    props: { ...args, items },
    template: `
      <div style="width:300px">
        <cds-ng-combo-box ${comboBoxBindings}>
          <cds-ng-ai-label alignment="bottom-left">
            ${content}${actions}
          </cds-ng-ai-label>
          ${itemsTemplate}
        </cds-ng-combo-box>
      </div>
    `,
  }),
};

// WC: WithLayer
export const WithLayer: Story = {
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    ...defaultArgs,
    helperText: 'Helper text',
    titleText: 'Label',
  },
  argTypes: controls,
  render: (args) => ({
    props: { ...args, items },
    template: `
      <div style="width:300px">
        <cds-ng-combo-box ${comboBoxBindings}>
          ${itemsTemplate}
        </cds-ng-combo-box>
      </div>
    `,
  }),
};
