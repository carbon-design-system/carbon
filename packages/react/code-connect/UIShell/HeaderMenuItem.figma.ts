// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2133-9531&t=A3oys5odsvKkcDFA-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/UIShell/HeaderMenuItem.tsx
// component=HeaderMenuItem

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;

function createTemplate() {
  const linkText = instance.getString('Link text');
  const isActive = instance.getBoolean('Selected');
  const isSubMenu = instance.getEnum('Type', {
    'Sub-menu': true,
  });

  if (isSubMenu) {
    return {
      id: 'HeaderMenu',
      imports: ["import { HeaderMenu, HeaderMenuItem } from '@carbon/react';"],
      example: figma.code`<HeaderMenu${figma.helpers.react.renderProp(
        'aria-label',
        linkText
      )}${figma.helpers.react.renderProp('menuLinkName', linkText)}>
  <HeaderMenuItem href="#"${figma.helpers.react.renderProp(
    'isActive',
    isActive
  )}>${figma.helpers.react.renderChildren(linkText)}</HeaderMenuItem>
</HeaderMenu>`,
      metadata: { nestable: true },
    };
  }

  return {
    id: 'HeaderMenuItem',
    imports: ["import { HeaderMenuItem } from '@carbon/react';"],
    example: figma.code`<HeaderMenuItem href="#"${figma.helpers.react.renderProp(
      'isActive',
      isActive
    )}>${figma.helpers.react.renderChildren(linkText)}</HeaderMenuItem>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
