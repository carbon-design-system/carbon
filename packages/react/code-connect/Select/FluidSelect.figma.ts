// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17650-275243&t=LS77peWFGhwOdxIw-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/FluidSelect/FluidSelect.tsx
// component=FluidSelect

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
      id: 'FluidSelectSkeleton',
      imports: ["import { FluidSelectSkeleton } from '@carbon/react';"],
      example: figma.code`<FluidSelectSkeleton />`,
      metadata: { nestable: true },
    };
  }

  const labelText = instance.getString('Label text');
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
    id: 'FluidSelect',
    imports: ["import { FluidSelect, SelectItem } from '@carbon/react';"],
    example: figma.code`<FluidSelect${figma.helpers.react.renderProp(
      'labelText',
      labelText
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
    )}${figma.helpers.react.renderProp('warnText', warnText)}>
  <SelectItem value="" text=""/>
  <SelectItem value="option-1" text="Option 1"/>
  <SelectItem value="option-2" text="Option 2"/>
  <SelectItem value="option-3" text="Option 3"/>
  <SelectItem value="option-4" text="Option 4"/>
</FluidSelect>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
