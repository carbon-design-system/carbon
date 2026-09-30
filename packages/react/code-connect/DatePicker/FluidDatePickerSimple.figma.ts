// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-267399&t=hgJuU7m9Y6EM076g-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/FluidDatePicker/FluidDatePicker.tsx
// component=FluidDatePicker

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const isSkeleton = instance.getEnum('State', {
  Skeleton: true,
});

function createTemplate() {
  if (isSkeleton) {
    return {
      id: 'FluidDatePickerSkeleton',
      imports: ["import { FluidDatePickerSkeleton } from '@carbon/react';"],
      example: figma.code`<FluidDatePickerSkeleton datePickerType="simple" />`,
      metadata: { nestable: true },
    };
  }

  const placeholder = instance.getString('Date selected');
  const warnText = instance.getString('Warning text');
  const labelText = instance.getString('Label text');
  const invalidText = instance.getString('Error text');
  const invalid = instance.getEnum('State', {
    Error: true,
  });
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const readOnly = instance.getEnum('State', {
    'Read-only': true,
  });

  return {
    id: 'FluidDatePicker',
    imports: [
      "import { FluidDatePicker, FluidDatePickerInput } from '@carbon/react';",
    ],
    example: figma.code`<FluidDatePicker datePickerType="simple">
  <FluidDatePickerInput id="date-picker-simple"${figma.helpers.react.renderProp(
    'placeholder',
    placeholder
  )}${figma.helpers.react.renderProp(
    'warnText',
    warnText
  )}${figma.helpers.react.renderProp(
    'labelText',
    labelText
  )}${figma.helpers.react.renderProp(
    'invalidText',
    invalidText
  )}${figma.helpers.react.renderProp(
    'invalid',
    invalid
  )}${figma.helpers.react.renderProp(
    'warn',
    warn
  )}${figma.helpers.react.renderProp('readOnly', readOnly)} />
</FluidDatePicker>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
