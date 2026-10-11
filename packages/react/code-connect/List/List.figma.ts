// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=3284-27553&t=Y6lD1uj5Q0yszbgL-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/UnorderedList/index.ts
// component=UnorderedList / OrderedList

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const isOrdered = instance.getEnum('Type', {
  Ordered: true,
});
// Nested lists are built differently in Figma and code (Issue #17607).
const children = instance
  .findConnectedInstances(
    (child) => child.name === 'List item' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);

export default {
  id: isOrdered ? 'OrderedList' : 'UnorderedList',
  imports: [
    isOrdered
      ? "import { OrderedList } from '@carbon/react';"
      : "import { UnorderedList } from '@carbon/react';",
  ],
  example: isOrdered
    ? figma.code`<OrderedList>
  ${figma.helpers.react.renderChildren(children)}
</OrderedList>`
    : figma.code`<UnorderedList>
  ${figma.helpers.react.renderChildren(children)}
</UnorderedList>`,
  metadata: { nestable: true },
};
