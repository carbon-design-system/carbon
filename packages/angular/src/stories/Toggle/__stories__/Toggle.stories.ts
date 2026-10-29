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
  ToggleComponent,
  ToggleSkeletonComponent,
} from '@carbon/angular/toggle';
import { StackComponent } from '@carbon/angular/stack';

const sizes = {
  'Medium size (default)': 'md',
  'Small size (sm)': 'sm',
};

const defaultArgs = {
  labelA: 'On',
  labelB: 'Off',
  toggled: true,
  labelText: 'Label',
  disabled: false,
  hideLabel: false,
  readOnly: false,
  size: 'md',
};

const smallToggleArgs = {
  labelA: 'On',
  labelB: 'Off',
  toggled: true,
  labelText: 'Label',
  size: 'sm',
  disabled: false,
  hideLabel: false,
  readOnly: false,
};

const controls: ArgTypes = {
  disabled: {
    control: 'boolean',
    description: 'Whether this control should be disabled',
  },
  hideLabel: {
    control: 'boolean',
    description:
      "If true, the side labels (props.labelA and props.labelB) will be replaced by props.labelText (if passed), so that the toggle doesn't render a top label.",
  },
  labelA: {
    control: 'text',
    description: 'Specify the label for the "on" position',
  },
  labelB: {
    control: 'text',
    description: 'Specify the label for the "off" position',
  },
  labelText: {
    control: 'text',
    description: 'The text that is read for the control',
  },
  readOnly: {
    control: 'boolean',
    description: 'Whether the toggle should be read-only',
  },
  size: {
    control: 'radio',
    description:
      "Specify the size of the Toggle. Currently only supports 'sm' or 'md' (default)",
    options: Object.values(sizes),
  },
  toggled: {
    control: 'boolean',
    description: 'Specify whether the control is toggled',
  },
};

const meta: Meta = {
  title: 'Components/Toggle',
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        ToggleComponent,
        ToggleSkeletonComponent,
        StackComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: defaultArgs,
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-toggle
        [labelB]="labelB"
        [labelA]="labelA"
        [disabled]="disabled"
        [hideLabel]="hideLabel"
        [labelText]="labelText"
        [size]="size"
        [readOnly]="readOnly"
        [toggled]="toggled"></cds-ng-toggle>
    `,
  }),
};

export const Skeleton: Story = {
  render: () => ({
    template: `<cds-ng-toggle-skeleton></cds-ng-toggle-skeleton>`,
  }),
};

export const SmallToggle: Story = {
  args: smallToggleArgs,
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-toggle
        [toggled]="toggled"
        [readOnly]="readOnly"
        [disabled]="disabled"
        [hideLabel]="hideLabel"
        [labelText]="labelText"
        [labelB]="labelB"
        [labelA]="labelA"
        [size]="size"></cds-ng-toggle>
    `,
  }),
};

export const WithAccessibleLabels: Story = {
  render: () => ({
    template: `
      <cds-ng-stack gap="7">
        <cds-ng-toggle id="toggle-4" labelText="Label"></cds-ng-toggle>
        <cds-ng-toggle id="toggle-5" labelText="Label" [hideLabel]="true"></cds-ng-toggle>

        <div>
          <div id="toggle-6-label" style="margin-block-end: 0.5rem;">
            Internal aria-label toggle
          </div>
          <cds-ng-toggle ariaLabelledby="toggle-6-label" id="toggle-6"></cds-ng-toggle>
        </div>

        <div>
          <label
            id="toggle-7-label"
            for="toggle-7"
            style="display: block; margin-block-end: 0.5rem;">
            External toggle label
          </label>
          <cds-ng-toggle ariaLabelledby="toggle-7-label" id="toggle-7"></cds-ng-toggle>
        </div>
      </cds-ng-stack>
    `,
  }),
};

// ─── Angular-only stories ─────────────────────────────────────────────────────

export const NgModel: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => ({
    props: {
      isToggled: true,
    },
    template: `
      <cds-ng-toggle
        labelText="[(ngModel)] Toggle"
        [(ngModel)]="isToggled"></cds-ng-toggle>
      <p style="margin-top: 1rem;">Toggled state: {{ isToggled }}</p>
    `,
  }),
};

export const ReactiveForm: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => ({
    props: {
      control: new FormControl(false),
    },
    template: `
      <cds-ng-toggle
        labelText="Reactive Form Toggle"
        [formControl]="control"></cds-ng-toggle>
      <p style="margin-top: 1rem;">Control value: {{ control.value }}</p>
    `,
  }),
};
