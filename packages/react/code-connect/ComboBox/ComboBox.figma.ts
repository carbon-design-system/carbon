// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14032-290976&t=5acDGCinwyrs5Bbc-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/ComboBox/ComboBox.tsx
// component=ComboBox

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const isSkeleton = instance.getEnum('State', { Skeleton: true });
const size = instance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
});

function createTemplate() {
  if (isSkeleton) {
    return {
      id: 'DropdownSkeleton',
      imports: ["import { DropdownSkeleton } from '@carbon/react';"],
      example: figma.code`<DropdownSkeleton${figma.helpers.react.renderProp(
        'size',
        size
      )} />`,
    };
  }

  const placeholder = instance.getString('Filter text');
  const helperText = instance.getBoolean('Show helper')
    ? instance.getString('Helper text')
    : undefined;
  const titleText = instance.getString('Label text');
  const readOnly = instance.getEnum('State', { 'Read-only': true });
  const disabled = instance.getEnum('State', { Disabled: true });
  const invalid = instance.getEnum('State', { Error: true });
  const invalidText = invalid ? instance.getString('Error message') : undefined;
  const warn = instance.getEnum('State', { Warning: true });
  const warnText = warn ? instance.getString('Warning message') : undefined;

  return {
    id: 'ComboBox',
    imports: ["import { ComboBox } from '@carbon/react';"],
    example: figma.code`<ComboBox
  onChange={() => {}}
  id="carbon-combobox"
  items={[{ id: 'option-0', text: 'Option 0' }, { id: 'option-1', text: 'Option 1' }]}
  itemToString={(item) => (item ? item.text : '')}${figma.helpers.react.renderProp(
    'placeholder',
    placeholder
  )}${figma.helpers.react.renderProp(
    'helperText',
    helperText
  )}${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp(
    'titleText',
    titleText
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
  )}${figma.helpers.react.renderProp('warnText', warnText)}
/>`,
  };
}

export default createTemplate();
