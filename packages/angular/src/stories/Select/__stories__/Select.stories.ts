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
  SelectComponent,
  SelectItemComponent,
  SelectItemGroupComponent,
  SelectSkeletonComponent,
} from '@carbon/angular/select';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';
import { LayerComponent } from '@carbon/angular/layer';

const content = `
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h2 class="ai-label-heading">84%</h2>
    <p class="secondary bold">Confidence score</p>
    <p class="secondary">
      This recommendation is based on current service availability and the
      location of your existing resources.
    </p>
    <hr />
    <p class="secondary">Model type</p>
    <p class="bold">Foundation model</p>
  </div>
`;

const actions = `<cds-ng-ai-label-action-button>View details</cds-ng-ai-label-action-button>`;

const sizes = ['xs', 'sm', 'md', 'lg'];

const sharedArgs = {
  disabled: false,
  helperText: 'Select the region where your resources will be hosted.',
  hideLabel: false,
  id: 'select',
  inline: false,
  invalid: false,
  invalidText: 'Select a deployment region.',
  labelStylesDisable: false,
  labelText: 'Deployment region',
  name: 'deployment-region',
  placeholder: '',
  size: 'md',
  readOnly: false,
  warn: false,
  warnText: 'This region has limited availability.',
  value: '',
};

const sharedArgTypes: ArgTypes = {
  disabled: {
    control: 'boolean',
    description: 'Specify whether the control is disabled.',
  },
  helperText: {
    control: 'text',
    description:
      'Provide text that is used alongside the control label for additional help.',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Specify whether the label should be hidden, or not.',
  },
  inline: {
    control: 'boolean',
    description: 'Specify whether you want the inline version of this control.',
  },
  id: {
    control: 'text',
    description: 'Specify the id for the label.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently value is invalid.',
  },
  invalidText: {
    control: 'text',
    description: 'Message which is displayed if the value is invalid.',
  },
  labelStylesDisable: {
    control: 'boolean',
    description: 'Specify if you want to disable the default label styling',
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
  placeholder: {
    control: 'text',
    description:
      'Placeholder text to be used with the <code>&lt;input&gt;</code>.',
  },
  size: {
    control: 'select',
    description: 'Specify the size of the Select Input.',
    options: sizes,
    labels: {
      xs: 'Extra small size (xs)',
      sm: 'Small size (sm)',
      md: 'Medium size (md)',
      lg: 'Large size (lg)',
    },
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
    description: 'The value of the selected item.',
  },
};

const selectItemsTemplate = `
  <cds-ng-select-item value="">Choose a region</cds-ng-select-item>
  <cds-ng-select-item value="us-south">Dallas (us-south)</cds-ng-select-item>
  <cds-ng-select-item value="us-east">Washington, DC (us-east)</cds-ng-select-item>
  <cds-ng-select-item value="eu-de">Frankfurt (eu-de)</cds-ng-select-item>
  <cds-ng-select-item value="au-syd">Sydney (au-syd)</cds-ng-select-item>
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Select',
  decorators: [
    moduleMetadata({
      imports: [
        SelectComponent,
        SelectItemComponent,
        SelectItemGroupComponent,
        SelectSkeletonComponent,
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
      <div style="width: 400px">
        <cds-ng-select
          [id]="id"
          [inline]="inline"
          [disabled]="disabled"
          [helperText]="helperText"
          [hideLabel]="hideLabel"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [labelStylesDisable]="labelStylesDisable"
          [labelText]="labelText"
          [name]="name"
          [placeholder]="placeholder"
          [size]="size"
          [readonly]="readOnly"
          [warn]="warn"
          [warnText]="warnText"
          [value]="value">
          ${selectItemsTemplate}
        </cds-ng-select>
      </div>
    `,
  }),
};

// WC: Inline
export const Inline: Story = {
  args: {
    ...sharedArgs,
    inline: true,
  },
  argTypes: sharedArgTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-select
          [id]="id"
          [inline]="inline"
          [disabled]="disabled"
          [helperText]="helperText"
          [hideLabel]="hideLabel"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [labelStylesDisable]="labelStylesDisable"
          [labelText]="labelText"
          [name]="name"
          [placeholder]="placeholder"
          [size]="size"
          [readonly]="readOnly"
          [warn]="warn"
          [warnText]="warnText"
          [value]="value">
          ${selectItemsTemplate}
        </cds-ng-select>
      </div>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: Story = {
  args: {
    hideLabel: false,
  },
  argTypes: {
    hideLabel: sharedArgTypes.hideLabel,
  },
  parameters: {
    controls: { include: ['hideLabel'] },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-select-skeleton [hideLabel]="hideLabel"></cds-ng-select-skeleton>
      </div>
    `,
  }),
};

// WC: WithAILabel
export const WithAILabel: Story = {
  args: sharedArgs,
  argTypes: sharedArgTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-select
          [id]="id"
          [inline]="false"
          [disabled]="disabled"
          [helperText]="helperText"
          [hideLabel]="hideLabel"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [labelStylesDisable]="labelStylesDisable"
          [labelText]="labelText"
          [name]="name"
          [placeholder]="placeholder"
          [size]="size"
          [readonly]="readOnly"
          [warn]="warn"
          [warnText]="warnText"
          [value]="value">
          <cds-ng-ai-label alignment="bottom-left">
            ${content}
            ${actions}
          </cds-ng-ai-label>
          ${selectItemsTemplate}
        </cds-ng-select>
      </div>
    `,
  }),
};

// WC: WithLayer
export const WithLayer: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: sharedArgs,
  argTypes: sharedArgTypes,
  render: (args) => ({
    props: args,
    template: `
      <div class="cds--with-layer__background">
        <div class="cds--with-layer__label">$background</div>
        <div class="cds--with-layer__content">
          <div style="width: 400px;">
            <cds-ng-select
              [id]="id"
              [inline]="false"
              [disabled]="disabled"
              [helperText]="helperText"
              [hideLabel]="hideLabel"
              [invalid]="invalid"
              [invalidText]="invalidText"
              [labelStylesDisable]="labelStylesDisable"
              [labelText]="labelText"
              [name]="name"
              [placeholder]="placeholder"
              [size]="size"
              [readonly]="readOnly"
              [warn]="warn"
              [warnText]="warnText"
              [value]="value">
              ${selectItemsTemplate}
            </cds-ng-select>
          </div>
          <cds-ng-layer [withBackground]="true">
            <div class="cds--with-layer__layer">
              <div class="cds--with-layer__label">$layer-01</div>
              <div class="cds--with-layer__content">
                <div style="width: 400px;">
                  <cds-ng-select
                    [id]="id"
                    [inline]="false"
                    [disabled]="disabled"
                    [helperText]="helperText"
                    [hideLabel]="hideLabel"
                    [invalid]="invalid"
                    [invalidText]="invalidText"
                    [labelStylesDisable]="labelStylesDisable"
                    [labelText]="labelText"
                    [name]="name"
                    [placeholder]="placeholder"
                    [size]="size"
                    [readonly]="readOnly"
                    [warn]="warn"
                    [warnText]="warnText"
                    [value]="value">
                    ${selectItemsTemplate}
                  </cds-ng-select>
                </div>
                <cds-ng-layer [withBackground]="true">
                  <div class="cds--with-layer__layer">
                    <div class="cds--with-layer__label">$layer-02</div>
                    <div class="cds--with-layer__content">
                      <div style="width: 400px;">
                        <cds-ng-select
                          [id]="id"
                          [inline]="false"
                          [disabled]="disabled"
                          [helperText]="helperText"
                          [hideLabel]="hideLabel"
                          [invalid]="invalid"
                          [invalidText]="invalidText"
                          [labelStylesDisable]="labelStylesDisable"
                          [labelText]="labelText"
                          [name]="name"
                          [placeholder]="placeholder"
                          [size]="size"
                          [readonly]="readOnly"
                          [warn]="warn"
                          [warnText]="warnText"
                          [value]="value">
                          ${selectItemsTemplate}
                        </cds-ng-select>
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
