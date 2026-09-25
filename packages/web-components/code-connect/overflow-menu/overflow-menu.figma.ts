// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3717-45725&t=aG4cJRjteQHcd71k-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/overflow-menu/overflow-menu.ts
// component=cds-overflow-menu

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
  'Extra small': 'xs',
});
const direction = instance.getEnum('Position', {
  Top: 'top',
});
const flipped = instance.getEnum('Alignment', {
  End: true,
});
const disabled = instance.getEnum('State', {
  Disabled: true,
});
const open = instance.getBoolean('Open');

const button = instance.findInstance('Button');
const icon =
  button.type !== 'ERROR'
    ? button.getInstanceSwap('Swap icon')?.executeTemplate().example
    : undefined;

export default {
  id: 'cds-overflow-menu',
  imports: [
    "import '@carbon/web-components/es/components/overflow-menu/index.js'",
  ],
  example: figma.code`<cds-overflow-menu${renderBooleanAttribute(
    'disabled',
    disabled
  )}${renderBooleanAttribute('open', open)}${renderStringAttribute(
    'size',
    size
  )}>
  <span slot="icon">${icon}</span>
  <span slot="tooltip-content">Options</span>
  <cds-overflow-menu-body${renderStringAttribute(
    'direction',
    direction
  )}${renderBooleanAttribute('flipped', flipped)}>
    <cds-overflow-menu-item>Stop app</cds-overflow-menu-item>
    <cds-overflow-menu-item>Restart app</cds-overflow-menu-item>
    <cds-overflow-menu-item>Rename app</cds-overflow-menu-item>
    <cds-overflow-menu-item disabled>
      Clone and move app
    </cds-overflow-menu-item>
    <cds-overflow-menu-item divider danger>
      Delete app
    </cds-overflow-menu-item>
  </cds-overflow-menu-body>
</cds-overflow-menu>`,
  metadata: { nestable: true },
};
