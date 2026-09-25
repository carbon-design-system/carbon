// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3136-29234&t=U57NnoohldL54XAl-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/breadcrumb/breadcrumb-item.ts
// component=cds-breadcrumb-item

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderBooleanAttribute } from '../template-helpers';

const imports = [
  "import '@carbon/web-components/es/components/breadcrumb/breadcrumb-item.js'",
  "import '@carbon/web-components/es/components/breadcrumb/breadcrumb-link.js'",
];

const instance = figma.selectedInstance;
const text = instance.getString('Text');
const isCurrentPage =
  instance.getBoolean('Current') ||
  instance.getEnum('State', {
    Current: true,
  });
const isSkeleton = instance.getEnum('State', {
  Skeleton: true,
});
const isOverflow = instance.getEnum('Type', {
  Overflow: true,
});

function createTemplate() {
  if (isSkeleton) {
    return {
      id: 'cds-breadcrumb-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/breadcrumb/breadcrumb-skeleton.js'",
      ],
      example: figma.code`<cds-breadcrumb-skeleton items="1"></cds-breadcrumb-skeleton>`,
      metadata: { nestable: true },
    };
  }

  if (isOverflow) {
    // Figma does not expose overflow items, so use sample items.
    return {
      id: 'cds-breadcrumb-item',
      imports: [
        ...imports,
        "import '@carbon/web-components/es/components/overflow-menu/overflow-menu.js'",
        "import '@carbon/web-components/es/components/overflow-menu/overflow-menu-body.js'",
        "import '@carbon/web-components/es/components/overflow-menu/overflow-menu-item.js'",
      ],
      example: figma.code`<cds-breadcrumb-item>
  <cds-overflow-menu breadcrumb align="bottom">
    <svg
      slot="icon"
      class="cds--overflow-menu__icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="currentColor"
      width="16"
      height="16">
      <circle cx="8" cy="16" r="2"></circle>
      <circle cx="16" cy="16" r="2"></circle>
      <circle cx="24" cy="16" r="2"></circle>
    </svg>
    <span slot="tooltip-content">Options</span>
    <cds-overflow-menu-body>
      <cds-overflow-menu-item>Breadcrumb 3</cds-overflow-menu-item>
      <cds-overflow-menu-item>Breadcrumb 4</cds-overflow-menu-item>
    </cds-overflow-menu-body>
  </cds-overflow-menu>
</cds-breadcrumb-item>`,
      metadata: { nestable: true },
    };
  }

  return {
    id: 'cds-breadcrumb-item',
    imports,
    example: figma.code`<cds-breadcrumb-item>
  <cds-breadcrumb-link${
    isCurrentPage
      ? renderBooleanAttribute('is-currentpage', true)
      : figma.code` href="#"`
  }>${text}</cds-breadcrumb-link>
</cds-breadcrumb-item>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
