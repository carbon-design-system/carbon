// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=15503-270751&t=6KMXKibN414b97hv-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/fluid-search/fluid-search.ts
// component=cds-fluid-search

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
  const isSkeleton = instance.getEnum('State', {
    Skeleton: true,
  });

  if (isSkeleton) {
    return {
      id: 'cds-fluid-search-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/fluid-search/fluid-search-skeleton.js'",
      ],
      example: figma.code`<cds-fluid-search-skeleton></cds-fluid-search-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const labelText = instance.getString('Label text');
  const placeholder = instance.getString('Placeholder text');
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });

  return {
    id: 'cds-fluid-search',
    imports: [
      "import '@carbon/web-components/es/components/fluid-search/fluid-search.js'",
    ],
    example: figma.code`<cds-fluid-search${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderStringAttribute('label-text', labelText)}${renderStringAttribute(
      'placeholder',
      placeholder
    )}></cds-fluid-search>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
