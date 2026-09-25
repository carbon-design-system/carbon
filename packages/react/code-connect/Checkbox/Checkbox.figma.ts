// url=https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=3193-29303&mode=design&t=QVE44xARq96HRr11-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Checkbox/Checkbox.tsx
// component=Checkbox

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
      id: 'CheckboxSkeleton',
      imports: ["import { CheckboxSkeleton } from '@carbon/react';"],
      example: figma.code`<CheckboxSkeleton />`,
      metadata: { nestable: true },
    };
  }

  const hideLabel = !instance.getBoolean('Value');
  const labelText = instance.getString('Value text');
  const indeterminate = instance.getEnum('Selection', {
    Indeterminate: true,
  });
  const checked = instance.getEnum('Selection', {
    Checked: true,
  });
  const helperText = instance.getBoolean('Helper message')
    ? instance.getString('Helper text')
    : undefined;
  const invalid = instance.getEnum('State', {
    Invalid: true,
  });
  const invalidText = invalid ? instance.getString('Error text') : undefined;
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const warnText = warn ? instance.getString('Warning text') : undefined;
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const readOnly = instance.getEnum('State', {
    'Read-only': true,
  });

  return {
    id: 'Checkbox',
    imports: ["import { Checkbox } from '@carbon/react';"],
    example: figma.code`<Checkbox id="your_checkbox_id"${figma.helpers.react.renderProp(
      'labelText',
      labelText
    )}${figma.helpers.react.renderProp(
      'hideLabel',
      hideLabel
    )}${figma.helpers.react.renderProp(
      'indeterminate',
      indeterminate
    )}${figma.helpers.react.renderProp(
      'checked',
      checked
    )}${figma.helpers.react.renderProp(
      'helperText',
      helperText
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
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled
    )}${figma.helpers.react.renderProp('readOnly', readOnly)} />`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
