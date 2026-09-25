// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=19893-290998&m=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/NumberInput/NumberInput.tsx
// component=NumberInput

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const { renderProp } = figma.helpers.react;

const hideLabel = instance.getBoolean('Show label', {
  true: false,
  false: true,
});

const isSkeleton = instance.getEnum('State', { Skeleton: true });

let template;

if (isSkeleton) {
  template = {
    id: 'NumberInputSkeleton',
    imports: ["import { NumberInputSkeleton } from '@carbon/react';"],
    example: figma.code`<NumberInputSkeleton${renderProp('hideLabel', hideLabel)} />`,
    metadata: { nestable: true },
  };
} else {
  const disabled = instance.getEnum('State', { Disabled: true });
  const helperText = instance.getBoolean('Show helper', {
    true: instance.getString('Helper text'),
  });
  const invalid = instance.getEnum('State', { Error: true });
  const invalidText = invalid ? instance.getString('Error text') : undefined;
  const label = instance.getString('Label text');
  const readOnly = instance.getEnum('State', { 'Read-only': true });
  const size = instance.getEnum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  });
  const warn = instance.getEnum('State', { Warning: true });
  const warnText = warn ? instance.getString('Warning text') : undefined;

  const numberInputBase = instance.findInstance('_Number input base');

  const valueText =
    numberInputBase.type !== 'ERROR' ? numberInputBase.findText('Text') : null;
  const value =
    valueText && valueText.type !== 'ERROR' ? valueText.textContent : undefined;

  template = {
    id: 'NumberInput',
    imports: ["import { NumberInput } from '@carbon/react';"],
    example: figma.code`<NumberInput${renderProp(
      'disabled',
      disabled
    )}${renderProp('helperText', helperText)}${renderProp(
      'hideLabel',
      hideLabel
    )}${renderProp('invalid', invalid)}${renderProp(
      'invalidText',
      invalidText
    )}${renderProp('label', label)}${renderProp(
      'readOnly',
      readOnly
    )}${renderProp('size', size)}${renderProp('warn', warn)}${renderProp(
      'warnText',
      warnText
    )}${renderProp('value', value)} />`,
    metadata: { nestable: true },
  };
}

export default template;
