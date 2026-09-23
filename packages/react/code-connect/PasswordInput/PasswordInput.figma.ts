// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=5621-280380&t=BNxiN6zuoeazJ8tv-4
// source=https://github.com/maradwan26/carbon/blob/main/packages/react/lib/components/TextInput/PasswordInput.d.ts
// component=PasswordInput

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

let template;
if (figma.selectedInstance.getPropertyValue('State') === 'Skeleton') {
  template = {
    id: 'TextInputSkeleton',
    imports: ["import { TextInputSkeleton } from '@carbon/react';"],
    example: figma.code`<TextInputSkeleton />`,
  };
} else {
  const labelText = figma.selectedInstance.getString('Label text');
  const size = figma.selectedInstance.getEnum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  });
  const disabled = figma.selectedInstance.getEnum('State', {
    Disabled: true,
  });
  const invalid = figma.selectedInstance.getEnum('State', {
    Error: true,
  });
  const invalidText = figma.selectedInstance.getString('Error text');
  const warn = figma.selectedInstance.getEnum('State', {
    Warning: true,
  });
  const warnText = figma.selectedInstance.getString('Warning text');
  const helperText = figma.selectedInstance.getBoolean('Show helper', {
    true: figma.selectedInstance.getString('Helper text'),
  });

  // missing from Figma
  // const readOnly = figma.selectedInstance.getEnum('State', {
  //   Read-only: true,
  // });

  template = {
    id: 'PasswordInput',
    imports: ["import { PasswordInput } from '@carbon/react';"],
    example: figma.code`<PasswordInput${figma.helpers.react.renderProp(
      'labelText',
      labelText
    )}${figma.helpers.react.renderProp(
      'size',
      size
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
    )}${figma.helpers.react.renderProp('helperText', helperText)}/>`,
    metadata: { nestable: true },
  };
}

export default template;
