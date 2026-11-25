// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=9506-402924&t=j280IIQF1o3iLkV2-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/progress-bar/progress-bar.ts
// component=cds-progress-bar

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderStringAttribute } from '../template-helpers';

const instance = figma.selectedInstance;
const label = instance.getString('Label text');
const value = instance.getEnum('Progress', {
  '0%': '0',
  '25%': '25',
  '50%': '50',
  '75%': '75',
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
  id: 'cds-progress-bar',
  imports: [
    "import '@carbon/web-components/es/components/progress-bar/progress-bar.js'",
  ],
  example: figma.code`<cds-progress-bar${renderStringAttribute(
    'helper-text',
    helperText
  )}${renderStringAttribute('label', label)}${renderStringAttribute(
    'size',
    size
  )}${renderStringAttribute('status', status)}${renderStringAttribute(
    'type',
    type
  )}${renderStringAttribute('value', value)}></cds-progress-bar>`,
  metadata: { nestable: true },
};
