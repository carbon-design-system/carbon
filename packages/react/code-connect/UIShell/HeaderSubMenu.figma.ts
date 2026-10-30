// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2133-9973&t=A3oys5odsvKkcDFA-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/UIShell/HeaderMenu.tsx
// component=HeaderMenu

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
    (child) =>
      child.name === 'UI shell - Header sub-menu item' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);

export default {
  id: 'HeaderMenu',
  imports: ["import { HeaderMenu } from '@carbon/react';"],
  example: figma.code`<HeaderMenu aria-label="Menu" menuLinkName="Menu">
  ${figma.helpers.react.renderChildren(children)}
</HeaderMenu>`,
  metadata: { nestable: true },
};
