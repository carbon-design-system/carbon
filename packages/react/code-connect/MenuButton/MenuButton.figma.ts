// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=31420-317548&t=KXgYpEhuz2XzSITV-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/MenuButton/index.tsx
// component=MenuButton

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
});
const menuAlignment = instance.getEnum('Position', {
  Bottom: 'bottom',
  Top: 'top',
});
const button = instance.findInstance('Button');
const kind =
  button.type !== 'ERROR'
    ? button.getEnum('Style', {
        Primary: 'primary',
        Tertiary: 'tertiary',
        Ghost: 'ghost',
      })
    : undefined;
const disabled =
  button.type !== 'ERROR'
    ? button.getEnum('State', {
        Disabled: true,
      })
    : undefined;
const open = instance.getBoolean('Open');
const menu = instance.findInstance('Menu');
const menuItems =
  open && menu.type !== 'ERROR'
    ? menu
        .findConnectedInstances(
          (child) => child.name === '_Menu list item' && child.hasCodeConnect()
        )
        .map((child) => child.executeTemplate().example)
    : figma.code`{/* Open Menu button to view <MenuItem /> props and code */}`;

export default {
  id: 'MenuButton',
  imports: ["import { MenuButton } from '@carbon/react';"],
  example: figma.code`<MenuButton${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp(
    'menuAlignment',
    menuAlignment
  )} label="Actions"${figma.helpers.react.renderProp(
    'kind',
    kind
  )}${figma.helpers.react.renderProp('disabled', disabled)}>
  ${menuItems}
</MenuButton>`,
  metadata: { nestable: true },
};
