// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2346-16194&t=wcK3P98b09VsrxXF-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/UIShell/SideNavMenuItem.tsx
// component=SideNavMenuItem

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
  const isActive = instance.getEnum('State', {
    Active: true,
  });
  const isSubMenu = instance.getEnum('Type', {
    'Sub-menu': true,
  });
  const isDivider = instance.getEnum('Type', {
    Divider: true,
  });
  const hasIcon = instance.getEnum('Icon left', {
    True: true,
  });

  if (isDivider) {
    return {
      id: 'SideNavDivider',
      imports: ["import { SideNavDivider } from '@carbon/react';"],
      example: figma.code`<SideNavDivider />`,
      metadata: { nestable: true },
    };
  }

  if (isSubMenu) {
    return {
      id: 'SideNavMenu',
      imports: [
        "import { SideNavMenu, SideNavMenuItem } from '@carbon/react';",
      ],
      example: figma.code`<SideNavMenu${
        hasIcon ? figma.code` renderIcon={IconName}` : null
      }${figma.helpers.react.renderProp(
        'title',
        linkText
      )}${figma.helpers.react.renderProp('isActive', isActive)}>
  <SideNavMenuItem href="#">Nested link</SideNavMenuItem>
</SideNavMenu>`,
      metadata: { nestable: true },
    };
  }

  if (hasIcon) {
    return {
      id: 'SideNavLink',
      imports: ["import { SideNavLink } from '@carbon/react';"],
      example: figma.code`<SideNavLink renderIcon={IconName} href="#"${figma.helpers.react.renderProp(
        'isActive',
        isActive
      )}>${figma.helpers.react.renderChildren(linkText)}</SideNavLink>`,
      metadata: { nestable: true },
    };
  }

  return {
    id: 'SideNavMenuItem',
    imports: ["import { SideNavMenuItem } from '@carbon/react';"],
    example: figma.code`<SideNavMenuItem href="#"${figma.helpers.react.renderProp(
      'isActive',
      isActive
    )}>${figma.helpers.react.renderChildren(linkText)}</SideNavMenuItem>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
