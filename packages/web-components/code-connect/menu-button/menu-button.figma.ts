// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=31420-317548&t=KXgYpEhuz2XzSITV-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/menu-button/menu-button.ts
// component=cds-menu-button

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
    : figma.code`<!-- Open Menu button to view <cds-menu-item> props and code -->`;

export default {
  id: 'cds-menu-button',
  imports: [
    "import '@carbon/web-components/es/components/menu-button/index.js'",
    "import '@carbon/web-components/es/components/menu/index.js'",
  ],
  example: figma.code`<cds-menu-button${renderBooleanAttribute(
    'disabled',
    disabled
  )}${renderStringAttribute(
    'kind',
    kind
  )} label="Actions"${renderStringAttribute(
    'menu-alignment',
    menuAlignment
  )}${renderStringAttribute('size', size)}>
  <cds-menu label="Actions">${menuItems}</cds-menu>
</cds-menu-button>`,
  metadata: { nestable: true },
};
