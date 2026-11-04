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
  FluidComboBoxComponent,
  FluidComboBoxSkeletonComponent,
} from '@carbon/angular/fluid-combo-box';
import { ComboBoxItemComponent } from '@carbon/angular/combo-box';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';

// ─── WC-parity stories (one-for-one with @carbon/web-components Fluid Combo Box) ───

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

const comboBoxItemsTemplate = `
  <cds-ng-combo-box-item value="option-0">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
  </cds-ng-combo-box-item>
  <cds-ng-combo-box-item value="option-1">Option 1</cds-ng-combo-box-item>
  <cds-ng-combo-box-item value="option-2">Option 2</cds-ng-combo-box-item>
  <cds-ng-combo-box-item [disabled]="true" value="option-3">
    Option 3 - a disabled item
  </cds-ng-combo-box-item>
  <cds-ng-combo-box-item value="option-4">Option 4</cds-ng-combo-box-item>
`;

const args = {
  ariaLabel: '',
  direction: 'bottom',
  disabled: false,
  isCondensed: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long',
  label: 'Choose an option',
  open: false,
  readOnly: false,
  titleText: 'Label',
  value: '',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

const argTypes: ArgTypes = {
  ariaLabel: {
    control: 'text',
    description:
      'Specify a label to be read by screen readers on the container node.',
  },
  autoalign: {
    control: 'boolean',
    description:
      'Will auto-align the combo box. This attribute is currently experimental and is subject to future changes.',
  },
  direction: {
    control: 'select',
    options: ['top', 'bottom'],
    description:
      "Specify the direction of the combo box dropdown. Can be either 'top' or 'bottom'.",
  },
  disabled: {
    control: 'boolean',
    description: 'Specify whether the control is disabled.',
  },
  isCondensed: {
    control: 'boolean',
    description:
      'Specify if the combo box should render its menu items in condensed mode.',
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
    description: 'Specify if the combo box should be open, or not.',
  },
  readOnly: {
    control: 'boolean',
    description: 'Whether or not the combo box is readonly.',
  },
  titleText: {
    control: 'text',
    description:
      'Text that will be read by a screen reader when visiting this control.',
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Fluid Components/FluidComboBox',
  decorators: [
    moduleMetadata({
      imports: [
        FluidComboBoxComponent,
        FluidComboBoxSkeletonComponent,
        ComboBoxItemComponent,
        AiLabelComponent,
        AiLabelActionButtonComponent,
      ],
    }),
  ],
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
      <div style="width: 400px">
        <cds-ng-fluid-combo-box
          [ariaLabel]="ariaLabel"
          [autoalign]="autoalign"
          [direction]="direction"
          [disabled]="disabled"
          [isCondensed]="isCondensed"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [label]="label"
          [open]="open"
          [readOnly]="readOnly"
          [titleText]="titleText"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText">
          ${comboBoxItemsTemplate}
        </cds-ng-fluid-combo-box>
      </div>
    `,
  }),
};

// WC: Condensed
export const Condensed: Story = {
  args: {
    ...args,
    isCondensed: true,
  },
  argTypes: {
    ...argTypes,
    isCondensed: {
      ...argTypes.isCondensed,
      table: { readonly: true },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-fluid-combo-box
          [ariaLabel]="ariaLabel"
          [autoalign]="autoalign"
          [direction]="direction"
          [disabled]="disabled"
          [isCondensed]="isCondensed"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [label]="label"
          [open]="open"
          [readOnly]="readOnly"
          [titleText]="titleText"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText">
          ${comboBoxItemsTemplate}
        </cds-ng-fluid-combo-box>
      </div>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: StoryObj<Record<string, unknown>> = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () => ({
    template: `
      <div style="width: 400px">
        <cds-ng-fluid-combo-box-skeleton></cds-ng-fluid-combo-box-skeleton>
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
      <div style="width: 400px">
        <cds-ng-fluid-combo-box
          [ariaLabel]="ariaLabel"
          [autoalign]="autoalign"
          [direction]="direction"
          [disabled]="disabled"
          [isCondensed]="isCondensed"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [label]="label"
          [open]="open"
          [readOnly]="readOnly"
          [titleText]="titleText"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText">
          <cds-ng-ai-label alignment="bottom-left">
            ${aiLabelContent}
            ${aiLabelActions}
          </cds-ng-ai-label>
          ${comboBoxItemsTemplate}
        </cds-ng-fluid-combo-box>
      </div>
    `,
  }),
};
