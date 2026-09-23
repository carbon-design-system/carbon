// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/-v11--Carbon-Design-System?node-id=104376-11673&m=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Breadcrumb/Breadcrumb.tsx
// component=Breadcrumb

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const breadcrumbItems = instance.findConnectedInstances((child) =>
  child.hasCodeConnect()
);
const size = instance.getEnum('Size', {
  Medium: 'md',
  Small: 'sm',
});
// The current item controls noTrailingSlash on Breadcrumb.
const noTrailingSlash = breadcrumbItems.some((item) => {
  if (item.type === 'ERROR') {
    return false;
  }

  return item.getBoolean('Current') || item.getEnum('State', { Current: true });
});
// An item skeleton maps to one BreadcrumbSkeleton.
const isSkeleton = breadcrumbItems.some((item) =>
  item.type !== 'ERROR' ? item.getEnum('State', { Skeleton: true }) : false
);

function createTemplate() {
  if (isSkeleton) {
    return {
      id: 'BreadcrumbSkeleton',
      imports: ["import { BreadcrumbSkeleton } from '@carbon/react';"],
      example: figma.code`<BreadcrumbSkeleton${figma.helpers.react.renderProp(
        'items',
        breadcrumbItems.length
      )}${figma.helpers.react.renderProp(
        'size',
        size
      )}${figma.helpers.react.renderProp(
        'noTrailingSlash',
        noTrailingSlash
      )} />`,
      metadata: { nestable: true },
    };
  }

  const children = breadcrumbItems.map(
    (child) => child.executeTemplate().example
  );

  return {
    id: 'Breadcrumb',
    imports: ["import { Breadcrumb } from '@carbon/react';"],
    example: figma.code`<Breadcrumb${figma.helpers.react.renderProp(
      'size',
      size
    )}${figma.helpers.react.renderProp('noTrailingSlash', noTrailingSlash)}>
  ${figma.helpers.react.renderChildren(children)}
</Breadcrumb>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
