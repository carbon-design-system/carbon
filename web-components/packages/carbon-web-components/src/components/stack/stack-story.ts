/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { select } from '@storybook/addon-knobs';
import { prefix } from '../../globals/settings';
import storyDocs from './stack-story.mdx';
import { STACK_ORIENTATION } from './stack';
import './index.ts';

const orientationOptions = {
  ['Vertical']: STACK_ORIENTATION.VERTICAL,
  ['Horizontal']: STACK_ORIENTATION.HORIZONTAL,
};

export const Default = () => {
  return html` <cds-stack gap="6">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </cds-stack>`;
};

export const Horizontal = () => {
  return html` <cds-stack gap="6" orientation="horizontal">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </cds-stack>`;
};

export const Playground = (args) => {
  const { gap, orientation } = args?.['cds-stack'] ?? {};
  return html` <cds-stack gap="${gap}" orientation="${orientation}">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </cds-stack>`;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-stack`]: () => ({
      gap: select(
        'gap',
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        '0'
      ),
      orientation: select(
        'orientation',
        orientationOptions,
        STACK_ORIENTATION.VERTICAL
      ),
    }),
  },
};

export default {
  title: 'Layout/Stack',
  parameters: {
    ...storyDocs.parameters,
  },
};
