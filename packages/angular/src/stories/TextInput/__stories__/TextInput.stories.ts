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
  TextInputComponent,
  TextInputSkeletonComponent,
} from '@carbon/angular/text-input';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';
import { LayerComponent } from '@carbon/angular/layer';

// ─── WC-parity stories (one-for-one with @carbon/web-components Text Input) ───

type TextInputStoryArgs = {
  disabled: boolean;
  enableCounter: boolean;
  helperText: string;
  hideLabel: boolean;
  inline: boolean;
  invalid: boolean;
  invalidText: string;
  labelText: string;
  maxCount: number;
  placeholder: string;
  defaultWidth: number;
  showPasswordVisibilityToggle: boolean;
  size: string;
  readonly: boolean;
  type: string;
  warn: boolean;
  warnText: string;
  value: string;
};

const sharedArgs: TextInputStoryArgs = {
  disabled: false,
  enableCounter: false,
  helperText: 'Helper text',
  hideLabel: false,
  inline: false,
  invalid: false,
  invalidText: 'Error message goes here',
  labelText: 'Label text',
  maxCount: 100,
  placeholder: 'Placeholder text',
  defaultWidth: 300,
  showPasswordVisibilityToggle: false,
  size: 'md',
  readonly: false,
  type: 'text',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  value: '',
};

const sharedArgTypes: ArgTypes = {
  disabled: {
    control: 'boolean',
    description: 'Disabled (disabled)',
  },
  enableCounter: {
    control: 'boolean',
    description: 'Enable counter (enable-counter)',
  },
  helperText: {
    control: 'text',
    description: 'Helper text (helper-text)',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Hide label (hide-label)',
  },
  inline: {
    control: 'boolean',
    description: 'Inline (inline)',
  },
  invalid: {
    control: 'boolean',
    description: 'Invalid (invalid)',
  },
  invalidText: {
    control: 'text',
    description: 'Invalid text (invalid-text)',
  },
  labelText: {
    control: 'text',
    description: 'Label text (label)',
  },
  maxCount: {
    control: 'number',
    description: 'Max count (max-count)',
  },
  placeholder: {
    control: 'text',
    description: 'Placeholder (placeholder)',
  },
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 1 },
    description: 'Default width',
  },
  showPasswordVisibilityToggle: {
    control: 'boolean',
    description:
      'Show password visibility toggle (show-password-visibility-toggle)',
  },
  size: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg'],
    labels: {
      xs: 'Extra small (xs)',
      sm: 'Small (sm)',
      md: 'Medium (md)',
      lg: 'Large (lg)',
    },
    description: 'Size (size)',
  },
  readonly: {
    control: 'boolean',
    description: 'Read only (readonly)',
  },
  type: {
    control: 'text',
    description: 'Type (type)',
  },
  warn: {
    control: 'boolean',
    description: 'Warn (warn)',
  },
  warnText: {
    control: 'text',
    description: 'Warn text (warn-text)',
  },
  value: {
    control: 'text',
    description: 'Value of input (value)',
  },
};

// AI label content / actions shared across WithAILabel instances
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
  title: 'Components/Text Input',
  decorators: [
    moduleMetadata({
      imports: [
        TextInputSkeletonComponent,
        AiLabelComponent,
        AiLabelActionButtonComponent,
        LayerComponent,
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
  args: sharedArgs,
  argTypes: sharedArgTypes,
  render: (args) => ({
    props: args,
    template: `
      <div [style.width.px]="defaultWidth">
        <cds-ng-text-input
          [disabled]="disabled"
          [enableCounter]="enableCounter"
          [helperText]="helperText"
          [hideLabel]="hideLabel"
          [inline]="inline"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [label]="labelText"
          [maxCount]="maxCount"
          [placeholder]="placeholder"
          [readonly]="readonly"
          [showPasswordVisibilityToggle]="showPasswordVisibilityToggle"
          [size]="size"
          [type]="type"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText"
        ></cds-ng-text-input>
      </div>
    `,
  }),
};

// WC: Inline
export const Inline: Story = {
  args: { ...sharedArgs, defaultWidth: 450, inline: true },
  argTypes: sharedArgTypes,
  parameters: {
    controls: {
      exclude: ['inline'],
    },
  },
  render: Default.render,
};

// WC: ReadOnly
export const ReadOnly: Story = {
  args: {
    ...sharedArgs,
    readonly: true,
    value: "This is read only, you can't type more.",
  },
  argTypes: sharedArgTypes,
  parameters: {
    controls: {
      exclude: [
        'readonly',
        'invalid',
        'invalidText',
        'warn',
        'warnText',
        'enableCounter',
        'showPasswordVisibilityToggle',
        'maxCount',
      ],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div [style.width.px]="defaultWidth">
        <cds-ng-text-input
          [readonly]="readonly"
          [label]="labelText"
          [helperText]="helperText"
          [size]="size"
          [hideLabel]="hideLabel"
          [value]="value"
        ></cds-ng-text-input>
      </div>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: StoryObj<Record<string, unknown>> = {
  args: { ...sharedArgs },
  argTypes: sharedArgTypes,
  parameters: {
    controls: {
      include: ['hideLabel', 'size'],
    },
  },
  render: (args) => ({
    props: args,
    template: `<cds-ng-text-input-skeleton [hideLabel]="hideLabel" [size]="size"></cds-ng-text-input-skeleton>`,
  }),
};

// WC: WithAILabel
export const WithAILabel: Story = {
  args: sharedArgs,
  argTypes: sharedArgTypes,
  parameters: {
    controls: {
      exclude: ['showPasswordVisibilityToggle'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div [style.width.px]="defaultWidth">
        <cds-ng-text-input
          [disabled]="disabled"
          [enableCounter]="enableCounter"
          [helperText]="helperText"
          [hideLabel]="hideLabel"
          [inline]="inline"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [label]="labelText"
          [maxCount]="maxCount"
          [placeholder]="placeholder"
          [readonly]="readonly"
          [size]="size"
          [type]="type"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText"
        >
          <cds-ng-ai-label alignment="bottom-left">
            ${aiLabelContent}${aiLabelActions}
          </cds-ng-ai-label>
        </cds-ng-text-input>
      </div>
    `,
  }),
};

// WC: WithLayer
export const WithLayer: Story = {
  args: sharedArgs,
  argTypes: sharedArgTypes,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-layer>
        <div [style.width.px]="defaultWidth">
          <cds-ng-text-input
            [disabled]="disabled"
            [helperText]="helperText"
            [hideLabel]="hideLabel"
            [inline]="inline"
            [invalid]="invalid"
            [invalidText]="invalidText"
            [label]="labelText"
            [placeholder]="placeholder"
            [readonly]="readonly"
            [size]="size"
            [type]="type"
            [value]="value"
            [warn]="warn"
            [warnText]="warnText"
          ></cds-ng-text-input>
        </div>
        <cds-ng-layer>
          <div [style.width.px]="defaultWidth">
            <cds-ng-text-input
              [disabled]="disabled"
              [helperText]="helperText"
              [hideLabel]="hideLabel"
              [inline]="inline"
              [invalid]="invalid"
              [invalidText]="invalidText"
              [label]="labelText"
              [placeholder]="placeholder"
              [readonly]="readonly"
              [size]="size"
              [type]="type"
              [value]="value"
              [warn]="warn"
              [warnText]="warnText"
            ></cds-ng-text-input>
          </div>
          <cds-ng-layer>
            <div [style.width.px]="defaultWidth">
              <cds-ng-text-input
                [disabled]="disabled"
                [helperText]="helperText"
                [hideLabel]="hideLabel"
                [inline]="inline"
                [invalid]="invalid"
                [invalidText]="invalidText"
                [label]="labelText"
                [placeholder]="placeholder"
                [readonly]="readonly"
                [size]="size"
                [type]="type"
                [value]="value"
                [warn]="warn"
                [warnText]="warnText"
              ></cds-ng-text-input>
            </div>
          </cds-ng-layer>
        </cds-ng-layer>
      </cds-ng-layer>
    `,
  }),
};

// ─── Angular-only stories (CVA / forms integration) ───────────────────────────

// NgModel: used by TextInput.e2e.ts
export const NgModel: StoryObj<Record<string, unknown>> = {
  tags: ['!dev', '!autodocs'],
  render: () => ({
    props: { name: 'initial' },
    template: `
      <cds-ng-text-input label="Name" [(ngModel)]="name"></cds-ng-text-input>
      <p data-testid="model">{{ name }}</p>
    `,
  }),
};

// ReactiveForm: used by TextInput.e2e.ts
export const ReactiveForm: StoryObj<Record<string, unknown>> = {
  tags: ['!dev', '!autodocs'],
  render: () => ({
    props: { control: new FormControl('initial') },
    template: `
      <cds-ng-text-input label="Name" [formControl]="control"></cds-ng-text-input>
      <p data-testid="value">{{ control.value }}</p>
      <p data-testid="touched">{{ control.touched }}</p>
      <button type="button" data-testid="set" (click)="control.setValue('programmatic')">set</button>
      <button type="button" data-testid="disable" (click)="control.disable()">disable</button>
      <button type="button" data-testid="enable" (click)="control.enable()">enable</button>
    `,
  }),
};

// Slots: used by TextInput.e2e.ts
export const Slots: StoryObj<Record<string, unknown>> = {
  tags: ['!dev', '!autodocs'],
  render: () => ({
    template: `
      <cds-ng-text-input>
        <span slot="label-text" data-testid="label-slot">Projected label</span>
        <span slot="helper-text" data-testid="helper-slot">Projected helper</span>
      </cds-ng-text-input>
    `,
  }),
};
