// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=14032-291311&t=aG4cJRjteQHcd71k-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/MultiSelect/MultiSelect.tsx
// component=MultiSelect

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const size = instance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
});
const state = instance.getPropertyValue('State');

function createTemplate() {
  if (state === 'Skeleton') {
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

  const type = instance.getEnum('Style', {
    Inline: 'inline',
  });
  const titleText = instance.getString('Label text');
  const label = instance.getString('Prompt text');
  const helperText = instance.getBoolean('Show helper')
    ? instance.getString('Helper text')
    : undefined;
  const disabled = state === 'Disabled';
  const invalid = state === 'Error';
  const invalidText = invalid ? instance.getString('Error message') : undefined;
  const warn = state === 'Warning';
  const warnText = warn ? instance.getString('Warning message') : undefined;
  const readOnly = state === 'Read-only';

  return {
    id: 'MultiSelect',
    imports: [
      "import { useId } from 'react';",
      "import { MultiSelect } from '@carbon/react';",
    ],
    example: figma.code`function Example() {
  const id = useId();
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
    <MultiSelect${figma.helpers.react.renderProp(
      'type',
      type
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
      'helperText',
      helperText
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
      'readOnly',
      readOnly
    )} id={id} items={items} itemToString={(item) => (item ? item.text : '')} selectionFeedback="top-after-reopen" />
  );
}`,
    metadata: { nestable: false },
  };
}

export default createTemplate();
