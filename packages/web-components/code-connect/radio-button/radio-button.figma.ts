// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2930-23442&t=yFGI7EFVWv0vtqIk-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/radio-button/radio-button.ts
// component=cds-radio-button

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
      id: 'cds-radio-button-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/radio-button/radio-button-skeleton.js'",
      ],
      example: figma.code`<cds-radio-button-skeleton></cds-radio-button-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const labelText = instance.getString('Value text');
  const labelPosition = instance.getEnum('Position', {
    Right: 'right',
  });
  const hideLabel = !instance.getBoolean('Value');
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const readonly = instance.getEnum('State', {
    'Read-only': true,
  });
  const checked = instance.getBoolean('Selected');

  return {
    id: 'cds-radio-button',
    imports: [
      "import '@carbon/web-components/es/components/radio-button/radio-button.js'",
    ],
    example: figma.code`<cds-radio-button${renderBooleanAttribute(
      'checked',
      checked
    )}${renderBooleanAttribute('disabled', disabled)}${renderBooleanAttribute(
      'hide-label',
      hideLabel
    )}${renderStringAttribute(
      'label-position',
      labelPosition
    )}${renderStringAttribute('label-text', labelText)}${renderBooleanAttribute(
      'readonly',
      readonly
    )} value="radio-button-value"></cds-radio-button>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
