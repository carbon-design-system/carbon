/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
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
  gap: '0',
  orientation: STACK_ORIENTATION.VERTICAL,
};

const controls = {
  gap: {
    control: 'select',
    description: 'gap',
    options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
  orientation: {
    control: 'select',
    description: 'orientation',
    options: orientationOptions,
  },
};

export const Default = {
  render: () => html` <cds-stack gap="6">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </cds-stack>`,
};

export const Horizontal = {
  render: () => html` <cds-stack gap="6" orientation="horizontal">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </cds-stack>`,
};

export const Playground = {
  args: defaultArgs,
  argTypes: controls,
  render: ({ gap, orientation }) => html` <cds-stack
    gap="${gap}"
    orientation="${orientation}">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </cds-stack>`,
};

const meta = {
  title: 'Layout/Stack',
};

export default meta;
