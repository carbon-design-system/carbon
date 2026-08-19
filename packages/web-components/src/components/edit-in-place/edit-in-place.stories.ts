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
import type { Args, Meta } from '@storybook/web-components';
import './index';
import styles from './story-styles.scss?lit';
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
      'Controls containing element width. Used for demonstration purposes, not a property of the component.',
  },
  editAlwaysVisible: {
    control: 'boolean',
    description: 'Always show the edit icon instead of only on hover.',
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
    description: 'Inherit typography from the container',
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
    description: 'Label for the read-only icon button',
  },
  readOnlyToggleTipText: {
    control: 'text',
    description: 'Text for the tooltip shown in read-only mode',
  },
  saveLabel: {
    control: 'text',
    description: 'Label for the save button',
  },
  toggleTipAlignment: {
    control: 'select',
    description: 'Tooltip alignment in read-only mode',
    options: tooltipAlignments,
  },
  size: {
    control: 'select',
    description: 'Vertical size of the control',
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

const render = (args: Args) => {
  return html`
    <style>
      ${styles}
    </style>
    <div
      class="${storyClass}__viewport"
      style="width: ${args.containerWidth}px;">
      <cds-edit-in-place
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
        value=${ifDefined(args.value)}></cds-edit-in-place>
    </div>
  `;
};

const meta: Meta = {
  title: 'Components/EditInPlace',
  component: 'cds-edit-in-place',
  argTypes,
  render,
};

export default meta;

export const Default = {
  args: defaultArgs,
};

export const Invalid = {
  args: {
    ...defaultArgs,
    invalid: true,
  },
};

export const CustomBlurFunction = {
  args: defaultArgs,
};

export const ReadOnly = {
  args: {
    ...defaultArgs,
    readOnly: true,
  },
};
