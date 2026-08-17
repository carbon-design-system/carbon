/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { STACK_ORIENTATION } from './stack';
import './index';

const orientationOptions = {
  ['Vertical']: STACK_ORIENTATION.VERTICAL,
  ['Horizontal']: STACK_ORIENTATION.HORIZONTAL,
};

const defaultArgs = {
  gap: '6',
  orientation: STACK_ORIENTATION.VERTICAL,
  useCustomGapValue: false,
};

const controls = {
  gap: {
    control: 'text',
    description:
      'Provide either a spacing scale step or, when enabled, a custom gap value.',
  },
  orientation: {
    control: 'select',
    description: 'Specify the orientation of the items in the Stack.',
    options: orientationOptions,
  },
  useCustomGapValue: {
    control: 'boolean',
    description: 'Use a custom CSS value for the gap, such as `2rem`.',
  },
};

const renderStack = ({ gap, orientation, useCustomGapValue }) =>
  html` <cds-stack
    gap="${gap}"
    orientation="${orientation}"
    ?use-custom-gap-value="${useCustomGapValue}">
    <div>Account settings</div>
    <div>Billing details</div>
    <div>Notification preferences</div>
  </cds-stack>`;

export const Default = {
  render: renderStack,
};

export const Horizontal = {
  args: {
    orientation: STACK_ORIENTATION.HORIZONTAL,
  },
  argTypes: {
    orientation: {
      ...controls.orientation,
      table: {
        readonly: true,
      },
    },
  },
  render: renderStack,
};

const meta = {
  title: 'Layout/Stack',
  component: 'cds-stack',
  args: defaultArgs,
  argTypes: controls,
};

export default meta;
