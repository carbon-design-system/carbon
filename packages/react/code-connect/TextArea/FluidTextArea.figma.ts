// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=18791-274643&t=4Ath5JqwaYJZxznq-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/FluidTextArea/FluidTextArea.tsx
// component=FluidTextArea

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
      id: 'FluidTextAreaSkeleton',
      imports: ["import { FluidTextAreaSkeleton } from '@carbon/react';"],
      example: figma.code`<FluidTextAreaSkeleton />`,
      metadata: { nestable: true },
    };
  }

  const labelText = instance.getString('Label text');
  const placeholder = instance.getString('Placeholder text');
  const value = instance.getBoolean('Text filled')
    ? instance.getString('Body text')
    : undefined;
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const readOnly = instance.getEnum('State', {
    'Read-only': true,
  });
  const invalid = instance.getEnum('State', {
    Error: true,
  });
  const invalidText = invalid ? instance.getString('Error message') : undefined;
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const warnText = warn ? instance.getString('Warning message') : undefined;

  return {
    id: 'FluidTextArea',
    imports: ["import { FluidTextArea } from '@carbon/react';"],
    example: figma.code`<FluidTextArea${figma.helpers.react.renderProp(
      'labelText',
      labelText
    )}${figma.helpers.react.renderProp(
      'placeholder',
      placeholder
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
