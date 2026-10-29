// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=3038-25739&t=9zqAFF3e617gPBGE-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/toggle/toggle.ts
// component=cds-toggle

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
      id: 'cds-toggle-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/toggle/toggle-skeleton.js'",
      ],
      example: figma.code`<cds-toggle-skeleton></cds-toggle-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const size = instance.getEnum('Size', {
    Default: 'md',
    Small: 'sm',
  });
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const readOnly = instance.getEnum('State', {
    'Read-only': true,
  });
  const toggled = instance.getBoolean('Toggled');
  const isToggleOnly = instance.getEnum('Toggle only', {
    True: true,
  });
  const showValue = instance.getEnum('Show value', {
    True: true,
  });
  const hideLabel = isToggleOnly || !instance.getBoolean('Show label');
  const labelText = isToggleOnly ? undefined : instance.getString('Label text');
  const stateText = showValue ? instance.getString('State text') : '';

  return {
    id: 'cds-toggle',
    imports: ["import '@carbon/web-components/es/components/toggle/toggle.js'"],
    example: figma.code`<cds-toggle${renderStringAttribute(
      'size',
      size
    )}${renderStringAttribute('label-text', labelText)}${renderBooleanAttribute(
      'hide-label',
      hideLabel
    )}${renderStringAttribute('label-a', stateText)}${renderStringAttribute(
      'label-b',
      stateText
    )}${renderBooleanAttribute('toggled', toggled)}${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderBooleanAttribute('read-only', readOnly)}></cds-toggle>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
