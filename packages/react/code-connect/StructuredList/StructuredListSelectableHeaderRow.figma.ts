// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=61634-2136&t=RuAO38H8L12JZXpK-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/StructuredList/StructuredList.tsx
// component=StructuredListRow

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const children = instance
  .findConnectedInstances(
    (child) => child.name.startsWith('Col') && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);

export default {
  id: 'StructuredListRow',
  imports: [
    "import { StructuredListRow, StructuredListCell } from '@carbon/react';",
  ],
  example: figma.code`<StructuredListRow head>
  ${figma.helpers.react.renderChildren(children)}
</StructuredListRow>`,
  metadata: { nestable: true },
};
