// url=https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=9837%3A338232
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Resizer/Resizer.tsx
// component=Resizer

/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;

function createTemplate() {
  const orientation =
    instance.getEnum('Orientation', {
      Horizontal: 'horizontal',
      Vertical: 'vertical',
    }) || 'vertical';

  const children = instance
    .findConnectedInstances((child) => child.hasCodeConnect())
    .map((child) => child.executeTemplate().example);

  return {
    id: 'Resizer',
    imports: ["import { Resizer } from '@carbon/react';"],
    example: figma.code`<Resizer${figma.helpers.react.renderProp(
      'orientation',
      orientation
    )}>${figma.helpers.react.renderChildren(children)}</Resizer>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
