// url=https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=9837%3A338233
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/ScrollGradient/ScrollGradient.tsx
// component=ScrollGradient

/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;

function createTemplate() {
  const children = instance
    .findConnectedInstances((child) => child.hasCodeConnect())
    .map((child) => child.executeTemplate().example);

  return {
    id: 'ScrollGradient',
    imports: ["import { ScrollGradient } from '@carbon/react';"],
    example: figma.code`<ScrollGradient>
  ${figma.helpers.react.renderChildren(children)}
</ScrollGradient>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
