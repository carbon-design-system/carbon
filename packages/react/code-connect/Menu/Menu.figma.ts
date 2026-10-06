// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=31131-96397&t=OdgMrt4NDVwZpNSx-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Menu/Menu.tsx
// component=Menu

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const size = instance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
  'Extra small': 'xs',
});
const children = instance
  .findConnectedInstances(
    (child) => child.name === '_Menu list item' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);

export default {
  id: 'Menu',
  imports: ["import { Menu } from '@carbon/react';"],
  example: figma.code`<Menu open label="Actions"${figma.helpers.react.renderProp(
    'size',
    size
  )}>
  ${figma.helpers.react.renderChildren(children)}
</Menu>`,
  metadata: { nestable: true },
};
