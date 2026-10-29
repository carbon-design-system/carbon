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
  TextareaComponent,
  TextareaSkeletonComponent,
} from '@carbon/angular/textarea';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';
import { LayerComponent } from '@carbon/angular/layer';

// ─── WC-parity stories (one-for-one with @carbon/web-components Textarea) ───

type TextareaStoryArgs = {
  cols: number;
  counterMode: string;
  disabled: boolean;
  enableCounter: boolean;
  helperText: string;
  hideLabel: boolean;
  invalid: boolean;
  invalidText: string;
  label: string;
  maxCount: number;
  placeholder: string;
  readonly: boolean;
  rows: number;
  value: string;
  warn: boolean;
  warnText: string;
};

const sharedArgs: TextareaStoryArgs = {
  cols: 0,
  counterMode: '',
  disabled: false,
  enableCounter: true,
  helperText: 'TextArea helper text',
  hideLabel: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  label: 'TextArea label',
  maxCount: 500,
  placeholder: '',
  readonly: false,
  rows: 4,
  value: '',
  warn: false,
  warnText: 'This is a warning message.',
};

const sharedArgTypes: ArgTypes = {
  cols: {
    control: 'number',
    description: 'Number of columns (cols)',
  },
  counterMode: {
    control: 'radio',
    options: ['character', 'word'],
    description:
      'Specify the method used for calculating the counter number (character or word)',
  },
  disabled: {
    control: 'boolean',
    description: 'Disabled (disabled)',
  },
  enableCounter: {
    control: 'boolean',
    description: 'Enable character counter (enable-counter)',
  },
  helperText: {
    control: 'text',
    description: 'Helper text (helper-text)',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Hide label (hide-label)',
  },
  invalid: {
    control: 'boolean',
    description: 'Invalid (invalid)',
  },
  invalidText: {
    control: 'text',
    description: 'Invalid text (invalid-text)',
  },
  label: {
    control: 'text',
    description: 'Label (label)',
  },
  maxCount: {
    control: 'number',
    description: 'Max character count (max-count)',
  },
  placeholder: {
    control: 'text',
    description: 'Placeholder text (placeholder)',
  },
  readonly: {
    control: 'boolean',
    description: 'Read only (readonly)',
  },
  rows: {
    control: 'number',
    description: 'Number of rows (rows)',
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
};

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
  title: 'Components/Text Area',
  decorators: [
    moduleMetadata({
      imports: [
        TextareaComponent,
        TextareaSkeletonComponent,
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
      <cds-ng-textarea
        [enableCounter]="enableCounter"
        [counterMode]="counterMode"
        [helperText]="helperText"
        [hideLabel]="hideLabel"
        [invalid]="invalid"
        [invalidText]="invalidText"
        [label]="label"
        [readonly]="readonly"
        [value]="value"
        [warn]="warn"
        [warnText]="warnText"
        [disabled]="disabled"
        [maxCount]="maxCount"
        [placeholder]="placeholder"
        [rows]="rows"
        [cols]="cols">
      </cds-ng-textarea>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: Story = {
  args: sharedArgs,
  argTypes: sharedArgTypes,
  parameters: {
    controls: {
      include: ['hideLabel'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-textarea-skeleton [hideLabel]="hideLabel"></cds-ng-textarea-skeleton>
    `,
  }),
};

// WC: WithAILabel
export const WithAILabel: Story = {
  args: {
    ...sharedArgs,
    helperText: 'Optional helper text',
    enableCounter: false,
  },
  argTypes: sharedArgTypes,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-textarea
        [enableCounter]="enableCounter"
        [counterMode]="counterMode"
        [helperText]="helperText"
        [hideLabel]="hideLabel"
        [invalid]="invalid"
        [invalidText]="invalidText"
        [label]="label"
        [readonly]="readonly"
        [value]="value"
        [warn]="warn"
        [warnText]="warnText"
        [disabled]="disabled"
        [maxCount]="maxCount"
        [placeholder]="placeholder"
        [rows]="rows"
        [cols]="cols">
        <cds-ng-ai-label alignment="bottom-right">
          ${aiLabelContent}
          ${aiLabelActions}
        </cds-ng-ai-label>
      </cds-ng-textarea>
    `,
  }),
};

// WC: WithLayer
export const WithLayer: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    ...sharedArgs,
    helperText: 'Optional helper text',
    enableCounter: false,
  },
  argTypes: sharedArgTypes,
  render: (args) => ({
    props: args,
    template: `
      <div class="cds--with-layer__background">
        <div class="cds--with-layer__label">$background</div>
        <div class="cds--with-layer__content">
          <div style="width: 400px;">
            <cds-ng-textarea
              [enableCounter]="enableCounter"
              [counterMode]="counterMode"
              [helperText]="helperText"
              [hideLabel]="hideLabel"
              [invalid]="invalid"
              [invalidText]="invalidText"
              [label]="label"
              [readonly]="readonly"
              [value]="value"
              [warn]="warn"
              [warnText]="warnText"
              [disabled]="disabled"
              [maxCount]="maxCount"
              [placeholder]="placeholder"
              [rows]="rows"
              [cols]="cols">
            </cds-ng-textarea>
          </div>
          <cds-ng-layer [withBackground]="true">
            <div class="cds--with-layer__layer">
              <div class="cds--with-layer__label">$layer-01</div>
              <div class="cds--with-layer__content">
                <div style="width: 400px;">
                  <cds-ng-textarea
                    [enableCounter]="enableCounter"
                    [counterMode]="counterMode"
                    [helperText]="helperText"
                    [hideLabel]="hideLabel"
                    [invalid]="invalid"
                    [invalidText]="invalidText"
                    [label]="label"
                    [readonly]="readonly"
                    [value]="value"
                    [warn]="warn"
                    [warnText]="warnText"
                    [disabled]="disabled"
                    [maxCount]="maxCount"
                    [placeholder]="placeholder"
                    [rows]="rows"
                    [cols]="cols">
                  </cds-ng-textarea>
                </div>
                <cds-ng-layer [withBackground]="true">
                  <div class="cds--with-layer__layer">
                    <div class="cds--with-layer__label">$layer-02</div>
                    <div class="cds--with-layer__content">
                      <div style="width: 400px;">
                        <cds-ng-textarea
                          [enableCounter]="enableCounter"
                          [counterMode]="counterMode"
                          [helperText]="helperText"
                          [hideLabel]="hideLabel"
                          [invalid]="invalid"
                          [invalidText]="invalidText"
                          [label]="label"
                          [readonly]="readonly"
                          [value]="value"
                          [warn]="warn"
                          [warnText]="warnText"
                          [disabled]="disabled"
                          [maxCount]="maxCount"
                          [placeholder]="placeholder"
                          [rows]="rows"
                          [cols]="cols">
                        </cds-ng-textarea>
                      </div>
                    </div>
                  </div>
                </cds-ng-layer>
              </div>
            </div>
          </cds-ng-layer>
        </div>
      </div>
    `,
  }),
};
