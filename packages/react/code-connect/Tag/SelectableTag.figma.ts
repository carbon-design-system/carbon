// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=46254-7550&t=RuAO38H8L12JZXpK-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Tag/SelectableTag.tsx
// component=SelectableTag

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
    const skeletonSize = instance.getEnum('Size', {
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
    });

    return {
      id: 'TagSkeleton',
      imports: ["import { TagSkeleton } from '@carbon/react';"],
      example: figma.code`<TagSkeleton${figma.helpers.react.renderProp(
        'size',
        skeletonSize
      )} />`,
      metadata: { nestable: true },
    };
  }

  const text = instance.getString('Tag text');
  const size = instance.getEnum('Size', {
    Large: 'lg',
    Small: 'sm',
  });
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const renderIcon = instance.getBoolean('Icon')
    ? instance.getInstanceSwap('Swap icon')?.executeTemplate().example
    : undefined;
  const selected = instance.getBoolean('Selected');

  return {
    id: 'SelectableTag',
    imports: ["import { SelectableTag } from '@carbon/react';"],
    example: figma.code`<SelectableTag${figma.helpers.react.renderProp(
      'text',
      text
    )}${figma.helpers.react.renderProp(
      'size',
      size
    )}${figma.helpers.react.renderProp(
      'selected',
      selected
    )}${figma.helpers.react.renderProp(
      'renderIcon',
      renderIcon
    )}${figma.helpers.react.renderProp('disabled', disabled)} />`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
