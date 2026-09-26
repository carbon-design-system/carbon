// url=https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=1854-1776&mode=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/button/index.ts
// component=cds-button

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
      id: 'cds-button-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/button/button-skeleton.js'",
      ],
      example: figma.code`<cds-button-skeleton${renderStringAttribute(
        'size',
        size
      )}></cds-button-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const text = instance.getString('Button text');
  const isIconOnly = instance.getEnum('Type', {
    'Icon only': true,
  });
  const buttonText = isIconOnly ? '' : text;
  const tooltipText = isIconOnly ? text : undefined;
  const kind = instance.getEnum('Style', {
    Primary: 'primary',
    Secondary: 'secondary',
    Tertiary: 'tertiary',
    Ghost: 'ghost',
    'Danger primary': 'danger',
    'Danger tertiary': 'danger-tertiary',
    'Danger ghost': 'danger-ghost',
  });
  const size = getSize();
  const isExpressive = instance.getEnum('Size', {
    Expressive: true,
  });
  const icon = instance.getInstanceSwap('Swap icon');
  const renderedIcon = icon?.executeTemplate().example;

  return {
    id: 'cds-button',
    imports: ["import '@carbon/web-components/es/components/button/button.js'"],
    example: figma.code`<cds-button${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderStringAttribute('kind', kind)}${renderStringAttribute(
      'size',
      size
    )}${renderBooleanAttribute(
      'isExpressive',
      isExpressive
    )}${renderStringAttribute(
      'tooltip-text',
      tooltipText
    )}>${buttonText} ${renderedIcon}</cds-button>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
