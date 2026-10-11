// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=41061-1531&m=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Slider/Slider.tsx
// component=Slider

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
      id: 'SliderSkeleton',
      imports: ["import { SliderSkeleton } from '@carbon/react';"],
      example: figma.code`<SliderSkeleton twoHandles />`,
      metadata: { nestable: true },
    };
  }

  const labelText = instance.getString('Label text');
  const min = instance.getString('Min range text');
  const max = instance.getString('Max range text');
  const hideTextInput = !instance.getBoolean('Inputs');
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const readOnly = instance.getEnum('State', {
    'Read only': true,
  });
  const invalid = instance.getEnum('State', {
    'Hover + Error': true,
    'Active + Error': true,
    'Focus + Error': true,
  });
  const invalidText = invalid ? instance.getString('Error text') : undefined;
  const warn = instance.getEnum('State', {
    'Hover + Warning': true,
    'Active + Warning': true,
    'Focus + Warning': true,
  });
  const warnText = warn ? instance.getString('Warning text') : undefined;

  return {
    id: 'Slider',
    imports: ["import { Slider } from '@carbon/react';"],
    example: figma.code`<Slider twoHandles${figma.helpers.react.renderProp(
      'labelText',
      labelText
    )}${figma.helpers.react.renderProp('min', min)}${figma.helpers.react.renderProp(
      'max',
      max
    )}${figma.helpers.react.renderProp(
      'hideTextInput',
      hideTextInput
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled
    )}${figma.helpers.react.renderProp(
      'readOnly',
      readOnly
    )}${figma.helpers.react.renderProp(
      'invalid',
      invalid
    )}${figma.helpers.react.renderProp(
      'invalidText',
      invalidText
    )}${figma.helpers.react.renderProp(
      'warn',
      warn
    )}${figma.helpers.react.renderProp('warnText', warnText)} />`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
