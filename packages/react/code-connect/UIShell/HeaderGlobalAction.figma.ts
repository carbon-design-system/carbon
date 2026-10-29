// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2133-10716&t=A3oys5odsvKkcDFA-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/UIShell/HeaderGlobalAction.tsx
// component=HeaderGlobalAction

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const children = instance
  .getInstanceSwap('Swap icon')
  ?.executeTemplate().example;
const isActive = instance.getEnum('State', {
  Active: true,
});

export default {
  id: 'HeaderGlobalAction',
  imports: ["import { HeaderGlobalAction } from '@carbon/react';"],
  example: figma.code`<HeaderGlobalAction
  aria-label="Action"${figma.helpers.react.renderProp(
    'isActive',
    isActive
  )}>${figma.helpers.react.renderChildren(children)}</HeaderGlobalAction>`,
  metadata: { nestable: true },
};
