// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=16031-269750&t=RuAO38H8L12JZXpK-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/tag/tag.ts
// component=cds-tag

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
  const isDismissible = instance.getBoolean('Dismissible');

  if (isDismissible) {
    return {
      id: 'cds-dismissible-tag',
      imports: [
        "import '@carbon/web-components/es/components/tag/dismissible-tag.js'",
      ],
      example: figma.code`<cds-dismissible-tag dismiss-tooltip-label="Dismiss"${renderBooleanAttribute(
        'disabled',
        disabled
      )}${renderStringAttribute('size', size)}${renderStringAttribute(
        'text',
        text
      )}${renderStringAttribute('type', type)}>
  <span slot="icon">${renderIcon}</span>
</cds-dismissible-tag>`,
      metadata: { nestable: true },
    };
  }

  return {
    id: 'cds-tag',
    imports: ["import '@carbon/web-components/es/components/tag/tag.js'"],
    example: figma.code`<cds-tag${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderStringAttribute('size', size)}${renderStringAttribute(
      'type',
      type
    )}>
  ${text}
  <span slot="icon">${renderIcon}</span>
</cds-tag>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
