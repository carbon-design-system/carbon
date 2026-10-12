// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2805-21056&t=6KMXKibN414b97hv-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/search/search.ts
// component=cds-search

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
      id: 'cds-search-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/search/search-skeleton.js'",
      ],
      example: figma.code`<cds-search-skeleton></cds-search-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const expandable = instance.getEnum('Expandable', {
    True: true,
  });
  const expanded = expandable ? instance.getBoolean('Expanded') : undefined;
  const size = instance.getEnum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  });
  const placeholder = instance.getString('Placeholder text');
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });

  return {
    id: 'cds-search',
    imports: ["import '@carbon/web-components/es/components/search/search.js'"],
    example: figma.code`<cds-search${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderBooleanAttribute('expandable', expandable)}${renderBooleanAttribute(
      'expanded',
      expanded
    )}${renderStringAttribute(
      'placeholder',
      placeholder
    )}${renderStringAttribute('size', size)}></cds-search>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
