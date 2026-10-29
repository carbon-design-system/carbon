// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=11828-285325&t=aG4cJRjteQHcd71k-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/TreeView/TreeNode.tsx
// component=TreeNode

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const label = instance.getString('Node text');
const disabled = instance.getEnum('State', {
  Disabled: true,
});
const isExpanded = instance.getBoolean('Open');

export default {
  id: 'TreeNode',
  imports: ["import { TreeNode } from '@carbon/react';"],
  example: figma.code`<TreeNode renderIcon={Icon}${figma.helpers.react.renderProp(
    'label',
    label
  )}${figma.helpers.react.renderProp(
    'isExpanded',
    isExpanded
  )}${figma.helpers.react.renderProp('disabled', disabled)} />`,
  metadata: { nestable: true },
};
