// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3136-29234&t=U57NnoohldL54XAl-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Breadcrumb/BreadcrumbItem.tsx
// component=BreadcrumbItem

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

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
      id: 'BreadcrumbSkeleton',
      imports: ["import { BreadcrumbSkeleton } from '@carbon/react';"],
      example: figma.code`<BreadcrumbSkeleton items={1} />`,
      metadata: { nestable: true },
    };
  }

  if (isOverflow) {
    // Figma does not expose overflow items, so use sample items.
    return {
      id: 'BreadcrumbItem',
      imports: [
        "import { BreadcrumbItem, OverflowMenu, OverflowMenuItem } from '@carbon/react';",
      ],
      example: figma.code`<BreadcrumbItem${figma.helpers.react.renderProp(
        'isCurrentPage',
        isCurrentPage
      )} data-floating-menu-container>
  <OverflowMenu aria-label="Overflow menu in a breadcrumb">
    <OverflowMenuItem itemText="Breadcrumb 3" />
    <OverflowMenuItem itemText="Breadcrumb 4" />
  </OverflowMenu>
</BreadcrumbItem>`,
      metadata: { nestable: true },
    };
  }

  return {
    id: 'BreadcrumbItem',
    imports: ["import { BreadcrumbItem } from '@carbon/react';"],
    example: isCurrentPage
      ? figma.code`<BreadcrumbItem isCurrentPage>${figma.helpers.react.renderChildren(
          text
        )}</BreadcrumbItem>`
      : figma.code`<BreadcrumbItem href="#">${figma.helpers.react.renderChildren(
          text
        )}</BreadcrumbItem>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
