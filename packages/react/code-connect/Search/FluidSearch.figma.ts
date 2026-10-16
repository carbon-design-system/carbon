// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=15503-270751&t=6KMXKibN414b97hv-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/FluidSearch/FluidSearch.tsx
// component=FluidSearch

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
      id: 'FluidSearchSkeleton',
      imports: ["import { FluidSearchSkeleton } from '@carbon/react';"],
      example: figma.code`<FluidSearchSkeleton />`,
      metadata: { nestable: true },
    };
  }

  const labelText = instance.getString('Label text');
  const placeholder = instance.getString('Placeholder text');
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });

  return {
    id: 'FluidSearch',
    imports: ["import { FluidSearch } from '@carbon/react';"],
    example: figma.code`<FluidSearch${figma.helpers.react.renderProp(
      'labelText',
      labelText
    )}${figma.helpers.react.renderProp(
      'placeholder',
      placeholder
    )}${figma.helpers.react.renderProp('disabled', disabled)}/>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
