// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=11948-286738&t=aG4cJRjteQHcd71k-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/tree-view/tree-view.ts
// component=cds-tree-view

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderStringAttribute } from '../template-helpers';

// TODO: the Figma component doesn't nest tree nodes accurately, so the sample
// below is incomplete — https://github.com/carbon-design-system/carbon/issues/17607
const instance = figma.selectedInstance;
const children = instance
  .findConnectedInstances(
    (child) => child.name === 'Branch node item' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);

const branchNode = instance.findInstance('Branch node item');
const size =
  branchNode.type !== 'ERROR'
    ? branchNode.getEnum('Size', {
        Small: 'sm',
        'Extra small': 'xs',
      })
    : undefined;

export default {
  id: 'cds-tree-view',
  imports: [
    "import '@carbon/web-components/es/components/tree-view/tree-view.js'",
  ],
  example: figma.code`<cds-tree-view label="Tree View"${renderStringAttribute(
    'size',
    size
  )}>
  ${children}
</cds-tree-view>`,
  metadata: { nestable: true },
};
