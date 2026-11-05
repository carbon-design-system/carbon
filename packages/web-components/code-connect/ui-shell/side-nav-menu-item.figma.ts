// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2346-16194&t=wcK3P98b09VsrxXF-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/ui-shell/side-nav-menu-item.ts
// component=cds-side-nav-menu-item

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
      id: 'cds-side-nav-divider',
      imports: [
        "import '@carbon/web-components/es/components/ui-shell/index.js'",
      ],
      example: figma.code`<cds-side-nav-divider></cds-side-nav-divider>`,
      metadata: { nestable: true },
    };
  }

  if (isSubMenu) {
    return {
      id: 'cds-side-nav-menu',
      imports: [
        "import '@carbon/web-components/es/components/ui-shell/index.js'",
      ],
      example: figma.code`<cds-side-nav-menu${renderStringAttribute(
        'title',
        linkText
      )}${renderBooleanAttribute('active', isActive)}>${
        hasIcon
          ? figma.code`
  <span slot="title-icon">IconName</span>`
          : null
      }
  <cds-side-nav-menu-item href="#">Nested link</cds-side-nav-menu-item>
</cds-side-nav-menu>`,
      metadata: { nestable: true },
    };
  }

  if (hasIcon) {
    return {
      id: 'cds-side-nav-link',
      imports: [
        "import '@carbon/web-components/es/components/ui-shell/index.js'",
      ],
      example: figma.code`<cds-side-nav-link href="#"${renderBooleanAttribute(
        'active',
        isActive
      )}>
  <span slot="title-icon">IconName</span>
  ${linkText}
</cds-side-nav-link>`,
      metadata: { nestable: true },
    };
  }

  return {
    id: 'cds-side-nav-menu-item',
    imports: [
      "import '@carbon/web-components/es/components/ui-shell/index.js'",
    ],
    example: figma.code`<cds-side-nav-menu-item href="#"${renderBooleanAttribute(
      'active',
      isActive
    )}>${linkText}</cds-side-nav-menu-item>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
