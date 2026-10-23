// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=11828-285325&t=aG4cJRjteQHcd71k-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/tree-view/tree-node.ts
// component=cds-tree-node

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import {
  renderBooleanAttribute,
  renderStringAttribute,
} from '../template-helpers';

const instance = figma.selectedInstance;
const label = instance.getString('Node text');
const disabled = instance.getEnum('State', {
  Disabled: true,
});
const isExpanded = instance.getBoolean('Open');

export default {
  id: 'cds-tree-node',
  imports: [
    "import '@carbon/web-components/es/components/tree-view/tree-node.js'",
  ],
  example: figma.code`<cds-tree-node${renderStringAttribute(
    'label',
    label
  )}${renderBooleanAttribute('is-expanded', isExpanded)}${renderBooleanAttribute(
    'disabled',
    disabled
  )}></cds-tree-node>`,
  metadata: { nestable: true },
};
