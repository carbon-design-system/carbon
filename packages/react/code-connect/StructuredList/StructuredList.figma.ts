// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=11797-285083&t=FNMM9qlCorQ1hEnC-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/StructuredList/StructuredList.tsx
// component=StructuredListWrapper

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const headerRowItems = instance
  .findConnectedInstances(
    (child) =>
      child.name === '_Structured list header row item' &&
      child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);
const rowItems = instance
  .findConnectedInstances(
    (child) =>
      child.name === '_Structured list row item' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);
const isCondensed = instance.getEnum('Size', {
  Condensed: true,
});
const isFlush = instance.getBoolean('Flush');

export default {
  id: 'StructuredListWrapper',
  imports: [
    "import { StructuredListWrapper, StructuredListHead, StructuredListBody, StructuredListRow, StructuredListCell } from '@carbon/react';",
  ],
  example: figma.code`<StructuredListWrapper${figma.helpers.react.renderProp(
    'isCondensed',
    isCondensed
  )}${figma.helpers.react.renderProp('isFlush', isFlush)}>
  <StructuredListHead>${figma.helpers.react.renderChildren(
    headerRowItems
  )}</StructuredListHead>
  <StructuredListBody>${figma.helpers.react.renderChildren(
    rowItems
  )}</StructuredListBody>
</StructuredListWrapper>`,
  metadata: { nestable: true },
};
