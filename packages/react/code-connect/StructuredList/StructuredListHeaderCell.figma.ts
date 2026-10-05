// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=11871-287656&t=FNMM9qlCorQ1hEnC-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/StructuredList/StructuredList.tsx
// component=StructuredListCell

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const children = instance.getString('Header text');

export default {
  id: 'StructuredListCell',
  imports: ["import { StructuredListCell } from '@carbon/react';"],
  example: figma.code`<StructuredListCell head>${figma.helpers.react.renderChildren(
    children
  )}</StructuredListCell>`,
  metadata: { nestable: true },
};
