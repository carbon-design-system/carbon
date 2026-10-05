// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16031-269750&t=RuAO38H8L12JZXpK-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Tag/Tag.tsx
// component=Tag

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
  const type = instance.getEnum('Color', {
    Blue: 'blue',
    Cyan: 'cyan',
    Teal: 'teal',
    Green: 'green',
    Purple: 'purple',
    Magenta: 'magenta',
    Red: 'red',
    Gray: 'gray',
    'Cool gray': 'cool-gray',
    'Warm gray': 'warm-gray',
    'High contrast': 'high-contrast',
    Outline: 'outline',
  });
  const isDismissible = instance.getBoolean('Dismissible');

  if (isDismissible) {
    return {
      id: 'DismissibleTag',
      imports: ["import { DismissibleTag } from '@carbon/react';"],
      example: figma.code`<DismissibleTag${figma.helpers.react.renderProp(
        'text',
        text
      )}${figma.helpers.react.renderProp(
        'size',
        size
      )}${figma.helpers.react.renderProp(
        'type',
        type
      )}${figma.helpers.react.renderProp(
        'renderIcon',
        renderIcon
      )}${figma.helpers.react.renderProp('disabled', disabled)} />`,
      metadata: { nestable: true },
    };
  }

  return {
    id: 'Tag',
    imports: ["import { Tag } from '@carbon/react';"],
    example: figma.code`<Tag${figma.helpers.react.renderProp(
      'size',
      size
    )}${figma.helpers.react.renderProp(
      'type',
      type
    )}${figma.helpers.react.renderProp(
      'renderIcon',
      renderIcon
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled
    )}>${figma.helpers.react.renderChildren(text)}</Tag>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
