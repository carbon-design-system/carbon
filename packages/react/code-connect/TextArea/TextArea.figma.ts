// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=14494-263111&t=4Ath5JqwaYJZxznq-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/TextArea/TextArea.tsx
// component=TextArea

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
  const hideLabel = !instance.getBoolean('Show label');

  if (isSkeleton) {
    return {
      id: 'TextAreaSkeleton',
      imports: ["import { TextAreaSkeleton } from '@carbon/react';"],
      example: figma.code`<TextAreaSkeleton${figma.helpers.react.renderProp(
        'hideLabel',
        hideLabel
      )} />`,
      metadata: { nestable: true },
    };
  }

  const labelText = instance.getString('Label text');
  const placeholder = instance.getString('Placeholder text');
  const value = instance.getBoolean('Text filled')
    ? instance.getString('Body text')
    : undefined;
  const helperText = instance.getBoolean('Show helper')
    ? instance.getString('Helper text')
    : undefined;
  const enableCounter = instance.getBoolean('Show count');
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
    id: 'TextArea',
    imports: ["import { TextArea } from '@carbon/react';"],
    example: figma.code`<TextArea${figma.helpers.react.renderProp(
      'labelText',
      labelText
    )}${figma.helpers.react.renderProp(
      'hideLabel',
      hideLabel
    )}${figma.helpers.react.renderProp(
      'placeholder',
      placeholder
    )}${figma.helpers.react.renderProp(
      'value',
      value
    )}${figma.helpers.react.renderProp(
      'helperText',
      helperText
    )}${figma.helpers.react.renderProp(
      'enableCounter',
      enableCounter
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
