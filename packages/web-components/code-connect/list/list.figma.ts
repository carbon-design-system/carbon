// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3284-27553&t=Y6lD1uj5Q0yszbgL-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/list/index.ts
// component=cds-unordered-list / cds-ordered-list

/**
 * Copyright IBM Corp. 2026
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
  id: isOrdered ? 'cds-ordered-list' : 'cds-unordered-list',
  imports: ["import '@carbon/web-components/es/components/list/index.js'"],
  example: isOrdered
    ? figma.code`<cds-ordered-list>
  ${children}
</cds-ordered-list>`
    : figma.code`<cds-unordered-list>
  ${children}
</cds-unordered-list>`,
  metadata: { nestable: true },
};
