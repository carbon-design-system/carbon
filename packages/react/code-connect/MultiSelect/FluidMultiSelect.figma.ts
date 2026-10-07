// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=14530-300220&t=aG4cJRjteQHcd71k-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/FluidMultiSelect/FluidMultiSelect.tsx
// component=FluidMultiSelect

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const state = instance.getPropertyValue('State');

function createTemplate() {
  if (state === 'Skeleton') {
    return {
      id: 'FluidDropdownSkeleton',
      imports: ["import { FluidDropdownSkeleton } from '@carbon/react';"],
      example: figma.code`<FluidDropdownSkeleton />`,
      metadata: { nestable: true },
    };
  }

  // Preserve the legacy text-only title; toggletip placement remains unresolved.
  // https://github.com/carbon-design-system/carbon/issues/17607
  const titleText = instance.getString('Label text');
  const label = instance.getString('Prompt text');
  const disabled = state === 'Disabled';
  const invalid = state === 'Error';
  const invalidText = invalid ? instance.getString('Error text') : undefined;
  const warn = state === 'Warning';
  const warnText = warn ? instance.getString('Warning text') : undefined;
  const readOnly = state === 'Read-only';

  return {
    id: 'FluidMultiSelect',
    imports: [
      "import { useId } from 'react';",
      "import { FluidMultiSelect } from '@carbon/react';",
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
    <FluidMultiSelect${figma.helpers.react.renderProp(
      'titleText',
      titleText
    )}${figma.helpers.react.renderProp(
      'label',
      label
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
    )} id={id} initialSelectedItems={[items[0]]} items={items} itemToString={(item) => (item ? item.text : '')} />
  );
}`,
    metadata: { nestable: false },
  };
}

export default createTemplate();
