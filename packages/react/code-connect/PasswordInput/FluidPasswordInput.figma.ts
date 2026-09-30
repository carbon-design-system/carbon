// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=68771-7312&t=BNxiN6zuoeazJ8tv-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/FluidTextInput/FluidPasswordInput.tsx
// component=FluidPasswordInput

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

let template;
if (figma.selectedInstance.getPropertyValue('State') === 'Skeleton') {
  template = {
    id: 'FluidTextInputSkeleton',
    imports: ["import { FluidTextInputSkeleton } from '@carbon/react';"],
    example: figma.code`<FluidTextInputSkeleton />`,
  };
} else {
  const labelLayer = figma.selectedInstance.findText('Label');
  const labelText =
    labelLayer.type !== 'ERROR' ? labelLayer.textContent : undefined;

  const disabled = figma.selectedInstance.getEnum('State', {
    Disabled: true,
  });
  const invalid = figma.selectedInstance.getEnum('State', {
    Error: true,
  });
  const invalidText = figma.selectedInstance.getString('Error text');
  const warn = figma.selectedInstance.getEnum('State', {
    Warning: true,
  });
  const warnText = figma.selectedInstance.getString('Warning text');
  const readOnly = figma.selectedInstance.getEnum('State', {
    'Read only': true,
  });

  template = {
    id: 'FluidPasswordInput',
    imports: ["import { FluidPasswordInput } from '@carbon/react';"],
    example: figma.code`<FluidPasswordInput${figma.helpers.react.renderProp(
      'labelText',
      labelText
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled
    )}${figma.helpers.react.renderProp(
      'invalid',
      invalid
    )}${figma.helpers.react.renderProp(
      'invalidText',
      invalidText
    )}${figma.helpers.react.renderProp(
      'warn',
      warn
    )}${figma.helpers.react.renderProp(
      'warnText',
      warnText
    )}${figma.helpers.react.renderProp('readOnly', readOnly)}/>`,
    metadata: { nestable: true },
  };
}

export default template;
