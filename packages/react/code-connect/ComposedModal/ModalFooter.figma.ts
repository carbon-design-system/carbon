// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3906-50587&t=SbIuH3RAJeFPjXmN-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/ComposedModal/ModalFooter.tsx
// component=ModalFooter

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const children = figma.selectedInstance
  .findConnectedInstances((child) => child.hasCodeConnect())
  .map((child) => child.executeTemplate().example);

export default {
  id: 'ModalFooter',
  imports: ["import { ModalFooter } from '@carbon/react';"],
  example: figma.code`<ModalFooter>
  ${figma.helpers.react.renderChildren(children)}
</ModalFooter>`,
  metadata: { nestable: true },
};
