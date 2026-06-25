/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './index';
import './_story-assets/_storybook-styles.scss';
import '@carbon/web-components/es/components/tooltip/index.js';
import {
  storyClass,
  sizes,
  tooltipAlignments,
  defaultArgs,
} from './edit-in-place-helpers';

const argTypes = {
  cancelLabel: {
    control: 'text',
    description: 'Label for the cancel button',
  },
  containerWidth: {
    control: { type: 'range', min: 20, max: 800, step: 10 },
    description:
      'Controls containing element width. Used for demonstration purposes, not property of the component.',
  },
  editAlwaysVisible: {
    control: 'boolean',
    description: 'Always show the edit icon (not just on hover)',
  },
  editLabel: {
    control: 'text',
    description: 'Label for the edit button',
  },
  id: {
    control: 'text',
    description: 'Specify a custom id for the input',
  },
  inheritTypography: {
    control: 'boolean',
    description: 'Inherit typography from container',
  },
  invalid: {
    control: 'boolean',
    description: 'Determines if the input is invalid',
  },
  invalidText: {
    control: 'text',
    description: 'Text displayed when input is invalid',
  },
  labelText: {
    control: 'text',
    description: 'Text for screen readers',
  },
  placeholder: {
    control: 'text',
    description: 'Placeholder text for the input',
  },
  readOnly: {
    control: 'boolean',
    description: 'Determines if the input is in read-only mode',
  },
  readOnlyLabel: {
    control: 'text',
    description: 'Label for the edit off button in read-only mode',
  },
  readOnlyToggleTipText: {
    control: 'text',
    description: 'Text for the toggletip that displays when in read-only mode',
  },
  saveLabel: {
    control: 'text',
    description: 'Label for the save button',
  },
  toggleTipAlignment: {
    control: 'select',
    description: 'Alignment for the toggletip in read-only mode',
    options: tooltipAlignments,
  },
  size: {
    control: 'select',
    description: 'Vertical size of control',
    options: sizes,
  },
  tooltipAlignment: {
    control: 'select',
    description: 'Tooltip alignment for buttons',
    options: tooltipAlignments,
  },
  value: {
    control: 'text',
    description: 'Current value of the input',
  },
};

export const Default = {
  args: defaultArgs,
  argTypes,
  render: (args: any) => {
    return html`
      <div style="width: ${args.containerWidth}px;">
        <c4p-edit-in-place
          id=${ifDefined(args.id)}
          cancel-label=${ifDefined(args.cancelLabel)}
          ?edit-always-visible=${args.editAlwaysVisible}
          edit-label=${ifDefined(args.editLabel)}
          ?inherit-typography=${args.inheritTypography}
          ?invalid=${args.invalid}
          invalid-text=${ifDefined(args.invalidText)}
          label-text=${ifDefined(args.labelText)}
          placeholder=${ifDefined(args.placeholder)}
          ?read-only=${args.readOnly}
          read-only-label=${ifDefined(args.readOnlyLabel)}
          read-only-toggletip-text=${ifDefined(args.readOnlyToggleTipText)}
          save-label=${ifDefined(args.saveLabel)}
          size=${ifDefined(args.size)}
          toggletip-alignment=${ifDefined(args.toggleTipAlignment)}
          tooltip-alignment=${ifDefined(args.tooltipAlignment)}
          value=${ifDefined(args.value)}
          @c4p-edit-in-place-change=${(e: CustomEvent) => {
            console.log('Change:', e.detail);
          }}
          @c4p-edit-in-place-save=${(e: CustomEvent) => {
            console.log('Save:', e.detail);
          }}
          @c4p-edit-in-place-cancel=${(e: CustomEvent) => {
            console.log('Cancel:', e.detail);
          }}
          @c4p-edit-in-place-blur=${(e: CustomEvent) => {
            console.log('Blur:', e.detail);
          }}
        ></c4p-edit-in-place>
      </div>
    `;
  },
};

export const Invalid = {
  args: {
    ...defaultArgs,
    invalid: true,
  },
  argTypes,
  render: (args: any) => {
    return html`
      <div style="width: ${args.containerWidth}px;">
        <c4p-edit-in-place
          id=${ifDefined(args.id)}
          cancel-label=${ifDefined(args.cancelLabel)}
          ?edit-always-visible=${args.editAlwaysVisible}
          edit-label=${ifDefined(args.editLabel)}
          ?inherit-typography=${args.inheritTypography}
          ?invalid=${args.invalid}
          invalid-text=${ifDefined(args.invalidText)}
          label-text=${ifDefined(args.labelText)}
          placeholder=${ifDefined(args.placeholder)}
          ?read-only=${args.readOnly}
          read-only-label=${ifDefined(args.readOnlyLabel)}
          read-only-toggletip-text=${ifDefined(args.readOnlyToggleTipText)}
          save-label=${ifDefined(args.saveLabel)}
          size=${ifDefined(args.size)}
          toggletip-alignment=${ifDefined(args.toggleTipAlignment)}
          tooltip-alignment=${ifDefined(args.tooltipAlignment)}
          value=${ifDefined(args.value)}
          @c4p-edit-in-place-change=${(e: CustomEvent) => {
            console.log('Change:', e.detail);
          }}
          @c4p-edit-in-place-save=${(e: CustomEvent) => {
            console.log('Save:', e.detail);
          }}
          @c4p-edit-in-place-cancel=${(e: CustomEvent) => {
            console.log('Cancel:', e.detail);
          }}
          @c4p-edit-in-place-blur=${(e: CustomEvent) => {
            console.log('Blur:', e.detail);
          }}
        ></c4p-edit-in-place>
      </div>
    `;
  },
};

export const CustomBlurFunction = {
  args: defaultArgs,
  argTypes,
  render: (args: any) => {
    return html`
      <div style="width: ${args.containerWidth}px;">
        <c4p-edit-in-place
          id=${ifDefined(args.id)}
          cancel-label=${ifDefined(args.cancelLabel)}
          ?edit-always-visible=${args.editAlwaysVisible}
          edit-label=${ifDefined(args.editLabel)}
          ?inherit-typography=${args.inheritTypography}
          ?invalid=${args.invalid}
          invalid-text=${ifDefined(args.invalidText)}
          label-text=${ifDefined(args.labelText)}
          placeholder=${ifDefined(args.placeholder)}
          ?read-only=${args.readOnly}
          read-only-label=${ifDefined(args.readOnlyLabel)}
          read-only-toggletip-text=${ifDefined(args.readOnlyToggleTipText)}
          save-label=${ifDefined(args.saveLabel)}
          size=${ifDefined(args.size)}
          toggletip-alignment=${ifDefined(args.toggleTipAlignment)}
          tooltip-alignment=${ifDefined(args.tooltipAlignment)}
          value=${ifDefined(args.value)}
          @c4p-edit-in-place-change=${(e: CustomEvent) => {
            console.log('Change:', e.detail);
          }}
          @c4p-edit-in-place-save=${(e: CustomEvent) => {
            console.log('Save:', e.detail);
          }}
          @c4p-edit-in-place-cancel=${(e: CustomEvent) => {
            console.log('Cancel:', e.detail);
          }}
          @c4p-edit-in-place-blur=${(e: CustomEvent) => {
            const shouldSaveValue = false;
            if (shouldSaveValue) {
              console.log('Save on blur:', e.detail);
            } else {
              console.log('Cancel on blur:', e.detail);
            }
          }}
        ></c4p-edit-in-place>
      </div>
    `;
  },
};

export const ReadOnly = {
  args: {
    ...defaultArgs,
    readOnly: true,
  },
  argTypes,
  render: (args: any) => {
    return html`
      <div style="width: ${args.containerWidth}px;">
        <c4p-edit-in-place
          id=${ifDefined(args.id)}
          cancel-label=${ifDefined(args.cancelLabel)}
          ?edit-always-visible=${args.editAlwaysVisible}
          edit-label=${ifDefined(args.editLabel)}
          ?inherit-typography=${args.inheritTypography}
          ?invalid=${args.invalid}
          invalid-text=${ifDefined(args.invalidText)}
          label-text=${ifDefined(args.labelText)}
          placeholder=${ifDefined(args.placeholder)}
          ?read-only=${args.readOnly}
          read-only-label=${ifDefined(args.readOnlyLabel)}
          read-only-toggletip-text=${ifDefined(args.readOnlyToggleTipText)}
          save-label=${ifDefined(args.saveLabel)}
          size=${ifDefined(args.size)}
          toggletip-alignment=${ifDefined(args.toggleTipAlignment)}
          tooltip-alignment=${ifDefined(args.tooltipAlignment)}
          value=${ifDefined(args.value)}
          @c4p-edit-in-place-change=${(e: CustomEvent) => {
            console.log('Change:', e.detail);
          }}
          @c4p-edit-in-place-save=${(e: CustomEvent) => {
            console.log('Save:', e.detail);
          }}
          @c4p-edit-in-place-cancel=${(e: CustomEvent) => {
            console.log('Cancel:', e.detail);
          }}
          @c4p-edit-in-place-blur=${(e: CustomEvent) => {
            console.log('Blur:', e.detail);
          }}
        ></c4p-edit-in-place>
      </div>
    `;
  },
};

const meta = {
  title: 'Components/EditInPlace',
  parameters: {
    docs: {
      description: {
        component: `
The EditInPlace component allows users to edit text inline with save and cancel actions.

## Usage

\`\`\`html
<c4p-edit-in-place
  id="my-edit"
  value="Edit me"
  label-text="Editable field"
  edit-label="Edit"
  save-label="Save"
  cancel-label="Cancel"
></c4p-edit-in-place>
\`\`\`

## Events

- \`c4p-edit-in-place-change\` - Fired when the input value changes
- \`c4p-edit-in-place-save\` - Fired when save is triggered
- \`c4p-edit-in-place-cancel\` - Fired when cancel is triggered
- \`c4p-edit-in-place-blur\` - Fired when the input loses focus

## CSS Parts

- \`input\` - The input element
- \`actions\` - The button container
- \`invalid-text\` - The error message container
        `,
      },
    },
  },
  decorators: [
    (story: any) => html`
      <div class="ccs-sb--display-box ${storyClass}__viewport">
        <div class="ccs-sb--display-box__indicator">
          <div class="ccs-sb--display-box__message">
            width available to component<br />(use containerWidth control to
            adjust)
          </div>
          <div class="ccs-sb--display-box__indicator--left"></div>
          <div class="ccs-sb--display-box__indicator--right"></div>
        </div>
        ${story()}
      </div>
    `,
  ],
};

export default meta;
