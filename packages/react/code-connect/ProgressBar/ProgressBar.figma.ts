// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=9506-402924&t=j280IIQF1o3iLkV2-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/ProgressBar/ProgressBar.tsx
// component=ProgressBar

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const label = instance.getString('Label text');
const value = instance.getEnum('Progress', {
  '0%': 0,
  '25%': 25,
  '50%': 50,
  '75%': 75,
});
const type = instance.getEnum('Alignment', {
  Inline: 'inline',
  Indent: 'indented',
});
const status = instance.getEnum('Status', {
  Active: 'active',
  Success: 'finished',
  Error: 'error',
});
const size = instance.getEnum('Size', {
  Big: 'big',
  Small: 'small',
});

const helperText = instance.getEnum('Status', {
  Active: instance.getString('Helper text'),
  Error: instance.getString('Error text'),
  Success: instance.getString('Success text'),
});

export default {
  id: 'ProgressBar',
  imports: ["import { ProgressBar } from '@carbon/react';"],
  example: figma.code`<ProgressBar${figma.helpers.react.renderProp(
    'label',
    label
  )}${figma.helpers.react.renderProp(
    'value',
    value
  )}${figma.helpers.react.renderProp(
    'helperText',
    helperText
  )}${figma.helpers.react.renderProp(
    'status',
    status
  )}${figma.helpers.react.renderProp(
    'type',
    type
  )}${figma.helpers.react.renderProp('size', size)}/>`,
  metadata: { nestable: true },
};
