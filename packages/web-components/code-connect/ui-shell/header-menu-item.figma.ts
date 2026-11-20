// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2133-9531&t=A3oys5odsvKkcDFA-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/ui-shell/header-nav-item.ts
// component=cds-header-nav-item

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
  const isActive = instance.getBoolean('Selected');
  const isSubMenu = instance.getEnum('Type', {
    'Sub-menu': true,
  });

  if (isSubMenu) {
    return {
      id: 'cds-header-menu',
      imports: [
        "import '@carbon/web-components/es/components/ui-shell/index.js'",
      ],
      example: figma.code`<cds-header-menu${renderStringAttribute(
        'menu-label',
        linkText
      )}${renderStringAttribute('trigger-content', linkText)}>
  <cds-header-menu-item href="#"${renderBooleanAttribute(
    'is-active',
    isActive
  )}>${linkText}</cds-header-menu-item>
</cds-header-menu>`,
      metadata: { nestable: true },
    };
  }

  return {
    id: 'cds-header-nav-item',
    imports: [
      "import '@carbon/web-components/es/components/ui-shell/index.js'",
    ],
    example: figma.code`<cds-header-nav-item href="#"${renderBooleanAttribute(
      'is-active',
      isActive
    )}>${linkText}</cds-header-nav-item>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
