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
  CheckboxComponent,
  CheckboxGroupComponent,
  CheckboxSkeletonComponent,
} from '@carbon/angular/checkbox';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';

// ─── WC-parity stories (one-for-one with @carbon/web-components Checkbox) ─────

const checkboxLabel = 'Checkbox label';

const groupArgs = {
  disabled: false,
  helperText: 'Helper text goes here',
  invalid: false,
  invalidText: 'Invalid message goes here',
  legendText: 'Group label',
  readonly: false,
  warn: false,
  warnText: 'Warn message goes here',
  orientation: 'vertical',
};

const groupArgTypes: ArgTypes = {
  disabled: {
    control: 'boolean',
    description: 'Specify whether the checkbox group should be disabled.',
  },
  helperText: {
    control: 'text',
    description: 'Provide text for the form group for additional help.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify whether the form group is currently invalid.',
  },
  invalidText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the form group is in an invalid state.',
  },
  legendText: {
    control: 'text',
    description: 'Provide the text to be rendered inside of the fieldset.',
  },
  orientation: {
    control: 'select',
    options: ['vertical', 'horizontal'],
    description: 'Provide how checkbox should be displayed.',
  },
  readonly: {
    control: 'boolean',
    description: 'Specify whether the checkbox group is read-only.',
  },
  warn: {
    control: 'boolean',
    description:
      'Specify whether the form group is currently in warning state.',
  },
  warnText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the form group is in warning state.',
  },
};

const checkboxArgs = {
  checked: false,
  disabled: false,
  helperText: 'Helper text goes here',
  hideLabel: false,
  indeterminate: false,
  invalid: false,
  invalidText: 'Invalid test goes here',
  labelText: checkboxLabel,
  readonly: false,
  title: '',
  warn: false,
  warnText: 'Warning test goes here',
};

const checkboxArgTypes: ArgTypes = {
  checked: {
    control: 'boolean',
    description: 'Specify whether the checkbox is checked.',
  },
  disabled: {
    control: 'boolean',
    description: 'Specify whether the checkbox is disabled.',
  },
  helperText: {
    control: 'text',
    description: 'Provide additional help text for the checkbox.',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Specify whether the checkbox label should be hidden.',
  },
  indeterminate: {
    control: 'boolean',
    description: 'Specify whether the checkbox is in an indeterminate state.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify whether the checkbox is invalid.',
  },
  invalidText: {
    control: 'text',
    description:
      'Provide the text displayed when the checkbox is in an invalid state.',
  },
  labelText: {
    control: 'text',
    description: 'Provide a label that describes the checkbox.',
  },
  readonly: {
    control: 'boolean',
    description: 'Specify whether the checkbox is read-only.',
  },
  title: {
    control: 'text',
    description: 'Provide a title for the checkbox label.',
  },
  warn: {
    control: 'boolean',
    description: 'Specify whether the checkbox is in a warning state.',
  },
  warnText: {
    control: 'text',
    description:
      'Provide the text displayed when the checkbox is in a warning state.',
  },
};

const groupControls = Object.keys(groupArgTypes);
const checkboxControls = Object.keys(checkboxArgTypes);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Checkbox',
  decorators: [
    moduleMetadata({
      imports: [
        CheckboxComponent,
        CheckboxGroupComponent,
        CheckboxSkeletonComponent,
        AiLabelComponent,
        AiLabelActionButtonComponent,
      ],
    }),
  ],
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args: groupArgs,
  argTypes: groupArgTypes,
  parameters: {
    controls: { include: groupControls },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-checkbox-group
        [helperText]="helperText"
        [disabled]="disabled"
        [invalid]="invalid"
        [invalidText]="invalidText"
        [legendText]="legendText"
        [orientation]="orientation"
        [readonly]="readonly"
        [warn]="warn"
        [warnText]="warnText"
      >
        <cds-ng-checkbox (checkboxChanged)="checkboxChanged($event)">${checkboxLabel}</cds-ng-checkbox>
        <cds-ng-checkbox (checkboxChanged)="checkboxChanged($event)">${checkboxLabel}</cds-ng-checkbox>
      </cds-ng-checkbox-group>
    `,
  }),
};

// WC: Horizontal
export const Horizontal: Story = {
  args: { ...groupArgs, orientation: 'horizontal' },
  argTypes: {
    ...groupArgTypes,
    orientation: {
      ...groupArgTypes.orientation,
      table: { readonly: true },
    },
  },
  parameters: {
    controls: { include: groupControls },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-checkbox-group
        [helperText]="helperText"
        [disabled]="disabled"
        [invalid]="invalid"
        [invalidText]="invalidText"
        [legendText]="legendText"
        [orientation]="orientation"
        [readonly]="readonly"
        [warn]="warn"
        [warnText]="warnText"
      >
        <cds-ng-checkbox (checkboxChanged)="checkboxChanged($event)">${checkboxLabel}</cds-ng-checkbox>
        <cds-ng-checkbox (checkboxChanged)="checkboxChanged($event)">${checkboxLabel}</cds-ng-checkbox>
      </cds-ng-checkbox-group>
    `,
  }),
};

// WC: Single
export const Single: Story = {
  args: checkboxArgs,
  argTypes: checkboxArgTypes,
  parameters: {
    controls: { include: checkboxControls },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-checkbox
        [checked]="checked"
        [disabled]="disabled"
        [helperText]="helperText"
        [hideLabel]="hideLabel"
        [indeterminate]="indeterminate"
        [invalid]="invalid"
        [invalidText]="invalidText"
        [readonly]="readonly"
        [title]="title"
        [warn]="warn"
        [warnText]="warnText"
        (checkboxChanged)="checkboxChanged($event)"
      >{{labelText}}</cds-ng-checkbox>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: StoryObj<Record<string, unknown>> = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <fieldset class="cds--fieldset">
        <cds-ng-checkbox-skeleton></cds-ng-checkbox-skeleton>
      </fieldset>
    `,
  }),
};

// AI label body content shared across WithAILabel instances
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
  <cds-ng-ai-label-action-button>View details</cds-ng-ai-label-action-button>
`;

// WC: WithAILabel
export const WithAILabel: Story = {
  args: groupArgs,
  argTypes: groupArgTypes,
  parameters: {
    controls: { include: groupControls },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-checkbox-group
          [legendText]="legendText"
          [helperText]="helperText"
          [disabled]="disabled"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [orientation]="orientation"
          [readonly]="readonly"
          [warn]="warn"
          [warnText]="warnText"
        >
          <cds-ng-ai-label alignment="bottom-left">
            ${aiLabelContent}${aiLabelActions}
          </cds-ng-ai-label>
          <cds-ng-checkbox>${checkboxLabel}</cds-ng-checkbox>
          <cds-ng-checkbox>${checkboxLabel}</cds-ng-checkbox>
          <cds-ng-checkbox>${checkboxLabel}</cds-ng-checkbox>
        </cds-ng-checkbox-group>

        <br />

        <cds-ng-checkbox-group
          [legendText]="legendText"
          [helperText]="helperText"
          [disabled]="disabled"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [orientation]="orientation"
          [readonly]="readonly"
          [warn]="warn"
          [warnText]="warnText"
        >
          <cds-ng-checkbox>
            ${checkboxLabel}
            <cds-ng-ai-label alignment="bottom-left">
              ${aiLabelContent}${aiLabelActions}
            </cds-ng-ai-label>
          </cds-ng-checkbox>
          <cds-ng-checkbox>
            ${checkboxLabel}
            <cds-ng-ai-label alignment="bottom-left">
              ${aiLabelContent}${aiLabelActions}
            </cds-ng-ai-label>
          </cds-ng-checkbox>
          <cds-ng-checkbox>${checkboxLabel}</cds-ng-checkbox>
        </cds-ng-checkbox-group>

        <br />

        <cds-ng-checkbox-group
          [legendText]="legendText"
          [helperText]="helperText"
          [disabled]="disabled"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [orientation]="orientation"
          [readonly]="readonly"
          [warn]="warn"
          [warnText]="warnText"
        >
          <cds-ng-checkbox>
            ${checkboxLabel}
            <cds-ng-ai-label alignment="bottom-left" kind="inline">
              ${aiLabelContent}${aiLabelActions}
            </cds-ng-ai-label>
          </cds-ng-checkbox>
          <cds-ng-checkbox>
            ${checkboxLabel}
            <cds-ng-ai-label alignment="bottom-left" kind="inline">
              ${aiLabelContent}${aiLabelActions}
            </cds-ng-ai-label>
          </cds-ng-checkbox>
          <cds-ng-checkbox>${checkboxLabel}</cds-ng-checkbox>
        </cds-ng-checkbox-group>
      </div>
    `,
  }),
};
