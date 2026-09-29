// url=https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=14032-290635&mode=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Dropdown/Dropdown.tsx
// component=Dropdown

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
  const size = instance.getEnum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  });

  if (isSkeleton) {
    return {
      id: 'DropdownSkeleton',
      imports: ["import { DropdownSkeleton } from '@carbon/react';"],
      example: figma.code`<DropdownSkeleton${figma.helpers.react.renderProp(
        'size',
        size
      )} />`,
      metadata: { nestable: true },
    };
  }

  const helperText = instance.getBoolean('Show helper', {
    true: instance.getString('Helper text'),
  });
  const titleText = instance.getString('Label');
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
  const invalidText = instance.getString('Error message');
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const warnText = instance.getString('Warning message');
  const type = instance.getEnum('Style', {
    Inline: 'inline',
  });

  return {
    id: 'Dropdown',
    imports: ["import { Dropdown } from '@carbon/react';"],
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

  return (
    <Dropdown${figma.helpers.react.renderProp(
      'helperText',
      helperText
    )}${figma.helpers.react.renderProp(
      'size',
      size
    )}${figma.helpers.react.renderProp(
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
    )}${figma.helpers.react.renderProp(
      'type',
      type
    )} items={items} id="id" initialSelectedItem={items[0]} itemToString={(item) => (item ? item.text : '')} />
  );
}`,
    metadata: { nestable: false },
  };
}

export default createTemplate();
