// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14505-304219&t=5acDGCinwyrs5Bbc-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/FluidComboBox/FluidComboBox.tsx
// component=FluidComboBox

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;

function createTemplate() {
  if (instance.getEnum('State', { Skeleton: true })) {
    return {
      id: 'FluidComboBoxSkeleton',
      imports: ["import { FluidComboBoxSkeleton } from '@carbon/react';"],
      example: figma.code`<FluidComboBoxSkeleton />`,
    };
  }

  const titleText = instance.getString('Label text');
  const label = instance.getString('Filter text');
  const disabled = instance.getEnum('State', { Disabled: true });
  const invalid = instance.getEnum('State', { Error: true });
  const invalidText = invalid ? instance.getString('Error text') : undefined;
  const warn = instance.getEnum('State', { Warning: true });
  const warnText = warn ? instance.getString('Warning text') : undefined;
  const readOnly = instance.getEnum('State', { 'Read-only': true });

  return {
    id: 'FluidComboBox',
    imports: ["import { FluidComboBox } from '@carbon/react';"],
    example: figma.code`<FluidComboBox
  onChange={() => {}}
  id="carbon-combobox"
  items={[{ id: 'option-0', text: 'Option 0' }, { id: 'option-1', text: 'Option 1' }]}
  itemToString={(item) => (item ? item.text : '')}${figma.helpers.react.renderProp(
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
  )}${figma.helpers.react.renderProp('readOnly', readOnly)}
/>`,
  };
}

export default createTemplate();
