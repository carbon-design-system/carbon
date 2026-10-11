// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=46254-10165&t=RuAO38H8L12JZXpK-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/tag/operational-tag.ts
// component=cds-operational-tag

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
    const skeletonSize = instance.getEnum('Size', {
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
    });

    return {
      id: 'cds-tag-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/tag/tag-skeleton.js'",
      ],
      example: figma.code`<cds-tag-skeleton${renderStringAttribute(
        'size',
        skeletonSize
      )}></cds-tag-skeleton>`,
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

  return {
    id: 'cds-operational-tag',
    imports: [
      "import '@carbon/web-components/es/components/tag/operational-tag.js'",
    ],
    example: figma.code`<cds-operational-tag${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderStringAttribute('size', size)}${renderStringAttribute(
      'text',
      text
    )}${renderStringAttribute('type', type)}>
  <span slot="icon">${renderIcon}</span>
</cds-operational-tag>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
