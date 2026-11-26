// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=11948-286738&t=aG4cJRjteQHcd71k-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/TreeView/TreeView.tsx
// component=TreeView

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

// TODO: the Figma component doesn't nest TreeNodes accurately, so the sample
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
  id: 'TreeView',
  imports: ["import { TreeView } from '@carbon/react';"],
  example: figma.code`<TreeView label="Tree View"${figma.helpers.react.renderProp(
    'size',
    size
  )}>
  ${figma.helpers.react.renderChildren(children)}
</TreeView>`,
  metadata: { nestable: true },
};
