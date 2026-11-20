/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NgFor } from '@angular/common';
import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import { FormGroupComponent } from '@carbon/angular/form-group';
import { FormItemComponent } from '@carbon/angular/form';
import { StackComponent } from '@carbon/angular/stack';
import { TextInputComponent } from '@carbon/angular/text-input';
import {
  RadioButtonComponent,
  RadioButtonGroupComponent,
} from '@carbon/angular/radio-button';
import { ButtonComponent } from '@carbon/angular/button';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';
import { IconButtonComponent } from '@carbon/angular/icon-button';
import {
  ComboBoxComponent,
  ComboBoxItemComponent,
} from '@carbon/angular/combo-box';
import {
  PreviewDatePickerComponent,
  PreviewDatePickerInputComponent,
} from '@carbon/angular/date-picker';
import {
  DropdownComponent,
  DropdownItemComponent,
} from '@carbon/angular/dropdown';
import {
  MultiSelectComponent,
  MultiSelectItemComponent,
} from '@carbon/angular/multi-select';
import { NumberInputComponent } from '@carbon/angular/number-input';
import {
  SelectComponent,
  SelectItemComponent,
  SelectItemGroupComponent,
} from '@carbon/angular/select';
import { TextareaComponent } from '@carbon/angular/textarea';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';

// ─── WC-parity stories (one-for-one with @carbon/web-components Form group) ───

const args = {
  invalid: false,
  legendId: 'form-group-1',
  legendText: 'FormGroup Legend',
  message: false,
  messageText: 'Form group message',
};

const argTypes: ArgTypes = {
  invalid: {
    control: 'boolean',
    description: 'Specify whether the form group is invalid.',
  },
  legendId: {
    control: 'text',
    description: 'Provide the id used to label the fieldset.',
  },
  legendText: {
    control: 'text',
    description: 'Provide the text to be rendered inside of the fieldset.',
  },
  message: {
    control: 'boolean',
    description:
      'Specify whether the message should be displayed in the form group.',
  },
  messageText: {
    control: 'text',
    description: 'Provide the text for the message in the form group.',
  },
};

const items = [
  {
    value: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    value: 'option-1',
    text: 'Option 1',
  },
  {
    value: 'option-2',
    text: 'Option 2',
  },
  {
    value: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    value: 'option-4',
    text: 'Option 4',
  },
  {
    value: 'option-5',
    text: 'Option 5',
  },
];

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

const aiLabelActions = `
  <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
    ${iconToSvg(View16, { slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-ng-icon-button>
  <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
    ${iconToSvg(FolderOpen16, { slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-ng-icon-button>
  <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
    ${iconToSvg(Folders16, { slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-ng-icon-button>
  <cds-ng-ai-label-action-button>View details</cds-ng-ai-label-action-button>
`;

const aiLabel = `
  <cds-ng-ai-label alignment="bottom-left" [revertActive]="revert">
    ${aiLabelContent}${aiLabelActions}
  </cds-ng-ai-label>
`;

const stateBindings = `
  [disabled]="disabled"
  [invalid]="invalid"
  [invalidText]="invalidText"
  [warn]="warn"
  [warnText]="warnText"
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Form Group',
  decorators: [
    moduleMetadata({
      imports: [
        NgFor,
        FormGroupComponent,
        FormItemComponent,
        StackComponent,
        TextInputComponent,
        RadioButtonComponent,
        RadioButtonGroupComponent,
        ButtonComponent,
        AiLabelComponent,
        AiLabelActionButtonComponent,
        IconButtonComponent,
        ComboBoxComponent,
        ComboBoxItemComponent,
        PreviewDatePickerComponent,
        PreviewDatePickerInputComponent,
        DropdownComponent,
        DropdownItemComponent,
        MultiSelectComponent,
        MultiSelectItemComponent,
        NumberInputComponent,
        SelectComponent,
        SelectItemComponent,
        SelectItemGroupComponent,
        TextareaComponent,
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width:400px">${story}</div>`
    ),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args,
  argTypes,
  render: (storyArgs) => ({
    props: storyArgs,
    template: `
      <cds-ng-form-group
        [invalid]="invalid"
        [legendId]="legendId"
        [legendText]="legendText"
        [message]="message"
        [messageText]="messageText">
        <cds-ng-stack gap="7">
          <cds-ng-text-input label="First Name"></cds-ng-text-input>
          <cds-ng-text-input label="Last Name"></cds-ng-text-input>
          <cds-ng-radio-button-group
            legendText="Radio button heading"
            name="radio-button-group"
            value="radio-1">
            <cds-ng-radio-button
              labelText="Option 1"
              value="radio-1"
              id="radio-1"></cds-ng-radio-button>
            <cds-ng-radio-button
              labelText="Option 2"
              value="radio-2"
              id="radio-2"></cds-ng-radio-button>
            <cds-ng-radio-button
              labelText="Option 3"
              value="radio-3"
              id="radio-3"></cds-ng-radio-button>
          </cds-ng-radio-button-group>
          <cds-ng-form-item>
            <cds-ng-button>Submit</cds-ng-button>
          </cds-ng-form-item>
        </cds-ng-stack>
      </cds-ng-form-group>
    `,
  }),
};

// WC: _WithAILabel
// TODO(parity): the WC story uses the classic `cds-date-picker`, which
// `@carbon/angular` does not wrap (ADR 0021). The Preview Date Picker with
// `kind="single"` stands in for it here.
export const WithAILabel: Story = {
  args: {
    disabled: false,
    invalid: false,
    invalidText: 'Error message goes here',
    legendId: 'form-group-ai-label',
    legendText: 'AI-enabled fields',
    message: false,
    messageText: 'Form group message',
    warn: false,
    warnText:
      'Warning message that is really long can wrap to more lines but should not be excessively long.',
    revert: false,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
    invalidText: {
      control: 'text',
    },
    legendId: {
      control: 'text',
    },
    legendText: {
      control: 'text',
    },
    message: {
      control: 'boolean',
    },
    messageText: {
      control: 'text',
    },
    warn: {
      control: 'boolean',
    },
    warnText: {
      control: 'text',
    },
    revert: {
      control: 'boolean',
    },
  },
  render: (storyArgs) => ({
    props: { ...storyArgs, items },
    template: `
      <div style="width: 400px">
        <cds-ng-form-group
          [invalid]="invalid"
          [legendId]="legendId"
          [legendText]="legendText"
          [message]="message"
          [messageText]="messageText">
          <cds-ng-stack gap="7">
            <cds-ng-form-item>
              <cds-ng-number-input
                value="50"
                min="0"
                max="100"
                step="1"
                label="Number input"
                ${stateBindings}>
                ${aiLabel}
              </cds-ng-number-input>
            </cds-ng-form-item>

            <cds-ng-form-item>
              <cds-ng-preview-date-picker>
                <cds-ng-preview-date-picker-input
                  kind="single"
                  labelText="Date Picker label"
                  placeholder="mm/dd/yyyy"
                  ${stateBindings}>
                  ${aiLabel}
                </cds-ng-preview-date-picker-input>
              </cds-ng-preview-date-picker>
            </cds-ng-form-item>

            <cds-ng-form-item>
              <cds-ng-text-input
                label="Text input label"
                placeholder="Placeholder text"
                ${stateBindings}>
                ${aiLabel}
              </cds-ng-text-input>
            </cds-ng-form-item>

            <cds-ng-form-item>
              <cds-ng-textarea
                label="Text input label"
                placeholder="Placeholder text"
                ${stateBindings}>
                ${aiLabel}
              </cds-ng-textarea>
            </cds-ng-form-item>

            <cds-ng-dropdown
              helperText="This is some helper text"
              titleText="Dropdown title"
              label="Option 1"
              ${stateBindings}>
              ${aiLabel}
              <cds-ng-dropdown-item
                *ngFor="let item of items"
                [disabled]="!!item.disabled"
                [value]="item.value">{{ item.text }}</cds-ng-dropdown-item>
            </cds-ng-dropdown>

            <cds-ng-multi-select
              titleText="Multiselect title"
              label="Multiselect label"
              helperText="This is helper text"
              ${stateBindings}>
              ${aiLabel}
              <cds-ng-multi-select-item value="example">
                An example option that is really long to show what should be
                done to handle long text</cds-ng-multi-select-item>
              <cds-ng-multi-select-item value="all">Option 1</cds-ng-multi-select-item>
              <cds-ng-multi-select-item value="cloudFoundry">Option 2</cds-ng-multi-select-item>
              <cds-ng-multi-select-item disabled value="staging">Option 3 - a disabled item</cds-ng-multi-select-item>
              <cds-ng-multi-select-item value="dea">Option 4</cds-ng-multi-select-item>
              <cds-ng-multi-select-item value="router">Option 5</cds-ng-multi-select-item>
            </cds-ng-multi-select>

            <cds-ng-multi-select
              filterable
              titleText="FilterableMultiselect title"
              helperText="This is helper text"
              ${stateBindings}>
              ${aiLabel}
              <cds-ng-multi-select-item value="example">An example option that is really long to show what should be
                done to handle long text</cds-ng-multi-select-item>
              <cds-ng-multi-select-item value="all">Option 1</cds-ng-multi-select-item>
              <cds-ng-multi-select-item value="cloudFoundry">Option 2</cds-ng-multi-select-item>
              <cds-ng-multi-select-item disabled value="staging">Option 3 - a disabled item</cds-ng-multi-select-item>
              <cds-ng-multi-select-item value="dea">Option 4</cds-ng-multi-select-item>
              <cds-ng-multi-select-item value="router">Option 5</cds-ng-multi-select-item>
            </cds-ng-multi-select>

            <cds-ng-combo-box
              helperText="This is some helper text"
              titleText="Combo box title"
              label="Filter..."
              ${stateBindings}>
              ${aiLabel}
              <cds-ng-combo-box-item value="all">Option 1</cds-ng-combo-box-item>
              <cds-ng-combo-box-item value="cloudFoundry">Option 2</cds-ng-combo-box-item>
              <cds-ng-combo-box-item value="staging">Option 3</cds-ng-combo-box-item>
              <cds-ng-combo-box-item value="dea">Option 4</cds-ng-combo-box-item>
              <cds-ng-combo-box-item value="router">Option 5</cds-ng-combo-box-item>
              <cds-ng-combo-box-item value="support">Option 6</cds-ng-combo-box-item>
              <cds-ng-combo-box-item value="services">Option 7</cds-ng-combo-box-item>
              <cds-ng-combo-box-item value="products">Option 8</cds-ng-combo-box-item>
            </cds-ng-combo-box>

            <cds-ng-select
              helperText="Optional helper text"
              labelText="Select"
              placeholder="Optional placeholder text"
              ${stateBindings}>
              ${aiLabel}
              <cds-ng-select-item-group label="Category 1">
                <cds-ng-select-item value="all">Option 1</cds-ng-select-item>
                <cds-ng-select-item value="cloudFoundry">Option 2</cds-ng-select-item>
              </cds-ng-select-item-group>
              <cds-ng-select-item-group label="Category 2">
                <cds-ng-select-item value="staging">Option 3</cds-ng-select-item>
                <cds-ng-select-item value="dea">Option 4</cds-ng-select-item>
                <cds-ng-select-item value="router">Option 5</cds-ng-select-item>
              </cds-ng-select-item-group>
            </cds-ng-select>
            <cds-ng-form-item>
              <cds-ng-button>Submit</cds-ng-button>
            </cds-ng-form-item>
          </cds-ng-stack>
        </cds-ng-form-group>
      </div>
    `,
  }),
};
