// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/-v11--Carbon-Design-System?node-id=104376-11673&m=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/breadcrumb/breadcrumb.ts
// component=cds-breadcrumb

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
      id: 'cds-breadcrumb-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/breadcrumb/breadcrumb-skeleton.js'",
      ],
      example: figma.code`<cds-breadcrumb-skeleton items="${breadcrumbItems.length}"${renderStringAttribute(
        'size',
        size
      )}${renderBooleanAttribute(
        'no-trailing-slash',
        noTrailingSlash
      )}></cds-breadcrumb-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const children = breadcrumbItems.map(
    (child) => child.executeTemplate().example
  );

  return {
    id: 'cds-breadcrumb',
    imports: [
      "import '@carbon/web-components/es/components/breadcrumb/breadcrumb.js'",
      "import '@carbon/web-components/es/components/breadcrumb/breadcrumb-item.js'",
      "import '@carbon/web-components/es/components/breadcrumb/breadcrumb-link.js'",
    ],
    example: figma.code`<cds-breadcrumb${renderStringAttribute(
      'size',
      size
    )}${renderBooleanAttribute('no-trailing-slash', noTrailingSlash)}>
  ${children}
</cds-breadcrumb>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
