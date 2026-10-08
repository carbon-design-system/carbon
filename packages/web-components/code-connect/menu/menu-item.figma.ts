// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=36234-38344&t=OdgMrt4NDVwZpNSx-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/menu/menu-item.ts
// component=cds-menu-item

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
const state = instance.getPropertyValue('State');
const kind =
  state === 'Danger hover' || state === 'Danger hover + Focus'
    ? 'danger'
    : undefined;
const label = instance.getString('Option text');
const disabled = state === 'Disabled';
const divider = instance.getEnum('Divider', {
  True: true,
});
const hasShortcut = instance.getEnum('Shortcuts or Trigger ', {
  True: true,
});
const selected = instance.getEnum('Selected', {
  True: true,
});
const tagName = selected ? 'cds-menu-item-selectable' : 'cds-menu-item';
const shortcut = hasShortcut ? '⌘X' : undefined;

// The selectable element exposes neither disabled nor kind.
const menuItem = figma.code`<${tagName}${renderBooleanAttribute(
  'disabled',
  !selected && disabled
)}${renderStringAttribute('kind', selected ? undefined : kind)}${renderStringAttribute(
  'label',
  label
)}${renderStringAttribute('shortcut', shortcut)}${renderBooleanAttribute(
  'selected',
  selected
)}></${tagName}>`;

export default {
  id: tagName,
  imports: ["import '@carbon/web-components/es/components/menu/index.js'"],
  example: divider
    ? figma.code`<cds-menu-item-divider></cds-menu-item-divider>
${menuItem}`
    : menuItem,
  metadata: { nestable: true },
};
