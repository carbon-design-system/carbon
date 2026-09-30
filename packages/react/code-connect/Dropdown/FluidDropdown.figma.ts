// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14505-302528&t=4Ath5JqwaYJZxznq-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/FluidDropdown/FluidDropdown.tsx
// component=FluidDropdown

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
      id: 'FluidDropdownSkeleton',
      imports: ["import { FluidDropdownSkeleton } from '@carbon/react';"],
      example: figma.code`<FluidDropdownSkeleton />`,
      metadata: { nestable: true },
    };
  }

  const titleText = instance.getString('Label text');
  const label = instance.getString('Prompt text');
  const readOnly = instance.getEnum('State', {
    'Read-only': true,
  });
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const invalid = instance.getEnum('State', {
    Error: true,
  });
  const invalidText = instance.getString('Error text');
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const warnText = instance.getString('Warning text');

  return {
    id: 'FluidDropdown',
    imports: ["import { FluidDropdown } from '@carbon/react';"],
    example: figma.code`function Example() {
    const items = [
        {
            id: 'option-0',
            text: 'Option 0',
        },
        {
            id: 'option-1',
            text: 'Option 1',
        },
    ];
    return (<FluidDropdown${figma.helpers.react.renderProp(
      'titleText',
      titleText
    )}${figma.helpers.react.renderProp(
      'label',
      label
    )}${figma.helpers.react.renderProp(
      'readOnly',
      readOnly
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
    )} items={items} id="id" initialSelectedItem={items[0]} itemToString={(item) => (item ? item.text : '')}/>);
}`,
    metadata: { nestable: false },
  };
}

export default createTemplate();
