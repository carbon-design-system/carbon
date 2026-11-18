// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=36234-38344&t=OdgMrt4NDVwZpNSx-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Menu/MenuItem.tsx
// component=MenuItem

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

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
const componentName = selected ? 'MenuItemSelectable' : 'MenuItem';
const shortcut = hasShortcut ? '⌘X' : undefined;
const imports = [
  `import { ${[componentName, ...(divider ? ['MenuItemDivider'] : [])].join(
    ', '
  )} } from '@carbon/react';`,
];

const menuItem = figma.code`<${componentName}${figma.helpers.react.renderProp(
  'disabled',
  disabled
)}${figma.helpers.react.renderProp(
  'label',
  label
)}${figma.helpers.react.renderProp(
  'shortcut',
  shortcut
)}${figma.helpers.react.renderProp(
  'kind',
  kind
)}${figma.helpers.react.renderProp('selected', selected)} />`;

export default {
  id: componentName,
  imports,
  example: divider
    ? figma.code`<>
  <MenuItemDivider />
  ${menuItem}
</>`
    : menuItem,
  metadata: { nestable: true },
};
