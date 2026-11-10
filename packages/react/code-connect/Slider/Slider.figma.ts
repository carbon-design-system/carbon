// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=3673-40574&m=dev
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
      example: figma.code`<SliderSkeleton />`,
      metadata: { nestable: true },
    };
  }

  const sliderBase = instance.findInstance('_Slider base');
  const labelLayer =
    sliderBase.type !== 'ERROR' ? sliderBase.findText('Label') : null;
  const labelText =
    labelLayer && labelLayer.type !== 'ERROR'
      ? labelLayer.textContent
      : undefined;

  const textInput = instance.findInstance('Text input - Default');
  const value =
    textInput.type !== 'ERROR' ? textInput.getString('Input text') : undefined;

  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const readOnly = instance.getEnum('State', {
    'Read-only': true,
  });
  const invalid = instance.getEnum('State', {
    Error: true,
  });
  const invalidText = invalid ? instance.getString('Error text') : undefined;
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const warnText = warn ? instance.getString('Warning text') : undefined;

  return {
    id: 'Slider',
    imports: ["import { Slider } from '@carbon/react';"],
    example: figma.code`<Slider${figma.helpers.react.renderProp(
      'labelText',
      labelText
    )}${figma.helpers.react.renderProp(
      'value',
      value
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
