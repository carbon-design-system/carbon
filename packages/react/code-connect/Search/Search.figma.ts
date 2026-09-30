// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2805-21056&t=6KMXKibN414b97hv-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Search/Search.tsx
// component=Search

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;

function createTemplate() {
  const isSkeleton = instance.getEnum('State', {
    Skeleton: true,
  });

  if (isSkeleton) {
    return {
      id: 'TextInputSkeleton',
      imports: ["import { TextInputSkeleton } from '@carbon/react';"],
      example: figma.code`<TextInputSkeleton hideLabel/>`,
      metadata: { nestable: true },
    };
  }

  const isExpandable = instance.getEnum('Expandable', {
    True: true,
  });
  const size = instance.getEnum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  });
  const placeholder = instance.getString('Placeholder text');
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const isExpanded = isExpandable ? instance.getBoolean('Expanded') : undefined;
  const component = isExpandable ? 'ExpandableSearch' : 'Search';

  return {
    id: component,
    imports: [`import { ${component} } from '@carbon/react';`],
    example: figma.code`<${component}${figma.helpers.react.renderProp(
      'size',
      size
    )}${figma.helpers.react.renderProp(
      'placeholder',
      placeholder
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled
    )}${figma.helpers.react.renderProp('isExpanded', isExpanded)}/>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
