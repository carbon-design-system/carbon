// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2930-23442&t=yFGI7EFVWv0vtqIk-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/RadioButton/RadioButton.tsx
// component=RadioButton

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
      id: 'RadioButtonSkeleton',
      imports: ["import { RadioButtonSkeleton } from '@carbon/react';"],
      example: figma.code`<RadioButtonSkeleton />`,
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
  const readOnly = instance.getEnum('State', {
    'Read-only': true,
  });
  const defaultChecked = instance.getBoolean('Selected');

  return {
    id: 'RadioButton',
    imports: ["import { RadioButton } from '@carbon/react';"],
    example: figma.code`<RadioButton${figma.helpers.react.renderProp(
      'labelText',
      labelText
    )}${figma.helpers.react.renderProp(
      'labelPosition',
      labelPosition
    )}${figma.helpers.react.renderProp(
      'hideLabel',
      hideLabel
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled
    )}${figma.helpers.react.renderProp(
      'readOnly',
      readOnly
    )}${figma.helpers.react.renderProp('defaultChecked', defaultChecked)}/>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
