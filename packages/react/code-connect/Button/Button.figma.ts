// url=https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=1854-1776&mode=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Button/index.ts
// component=Button

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;

function getSize() {
  return instance.getEnum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
    'Extra small': 'xs',
    'Extra large': 'xl',
    '2X large': '2xl',
  });
}

function createTemplate() {
  const isSkeleton = instance.getEnum('State', {
    Skeleton: true,
  });

  if (isSkeleton) {
    const size = getSize();

    return {
      id: 'ButtonSkeleton',
      imports: ["import { ButtonSkeleton } from '@carbon/react';"],
      example: figma.code`<ButtonSkeleton${figma.helpers.react.renderProp(
        'size',
        size
      )} />`,
      metadata: { nestable: true },
    };
  }

  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const buttonText = instance.getString('Button text');
  const kind = instance.getEnum('Style', {
    Primary: 'primary',
    Secondary: 'secondary',
    Tertiary: 'tertiary',
    Ghost: 'ghost',
    'Danger primary': 'danger',
    'Danger tertiary': 'danger--tertiary',
    'Danger ghost': 'danger--ghost',
  });
  const size = getSize();
  const isExpressive = instance.getEnum('Size', {
    Expressive: true,
  });
  const hasIconOnly = instance.getEnum('Type', {
    'Icon only': true,
  });
  const iconDescription = hasIconOnly ? buttonText : undefined;
  const renderIcon = instance
    .getInstanceSwap('Swap icon')
    ?.executeTemplate().example;

  return {
    id: 'Button',
    imports: ["import { Button } from '@carbon/react';"],
    example: figma.code`<Button${figma.helpers.react.renderProp(
      'disabled',
      disabled
    )}${figma.helpers.react.renderProp(
      'kind',
      kind
    )}${figma.helpers.react.renderProp(
      'size',
      size
    )}${figma.helpers.react.renderProp(
      'isExpressive',
      isExpressive
    )}${figma.helpers.react.renderProp(
      'hasIconOnly',
      hasIconOnly
    )}${figma.helpers.react.renderProp(
      'iconDescription',
      iconDescription
    )}${figma.helpers.react.renderProp(
      'renderIcon',
      renderIcon
    )}>${figma.helpers.react.renderChildren(buttonText)}</Button>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
