// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=31753-68447&t=aG4cJRjteQHcd71k-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/ComboButton/index.tsx
// component=ComboButton

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
const menuAlignment = instance.getEnum('Position', {
  Bottom: 'bottom',
  Top: 'top',
});
const open = instance.getBoolean('Open');
const menu = instance.findInstance('Menu');
const menuItems =
  menu.type !== 'ERROR'
    ? menu
        .findConnectedInstances(
          (child) => child.name === '_Menu list item' && child.hasCodeConnect()
        )
        .map((child) => child.executeTemplate().example)
    : [];

export default {
  id: 'ComboButton',
  imports: ["import { ComboButton } from '@carbon/react';"],
  example: figma.code`<ComboButton label="Primary action"${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp('menuAlignment', menuAlignment)}>
  ${
    open
      ? figma.helpers.react.renderChildren(menuItems)
      : 'Open Combo button to view MenuItem props and code'
  }
</ComboButton>`,
};
