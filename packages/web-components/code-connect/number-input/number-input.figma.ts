// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=19893-290998&m=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/number-input/number-input.ts
// component=cds-number-input

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import {
  renderBooleanAttribute,
  renderStringAttribute,
} from '../template-helpers';

const instance = figma.selectedInstance;

function createTemplate() {
  const isSkeleton = instance.getEnum('State', {
    Skeleton: true,
  });
  const hideLabel = !instance.getBoolean('Show label');

  if (isSkeleton) {
    return {
      id: 'cds-number-input-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/number-input/index.js'",
      ],
      example: figma.code`<cds-number-input-skeleton${renderBooleanAttribute(
        'hide-label',
        hideLabel
      )}></cds-number-input-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const helperText = instance.getBoolean('Show helper')
    ? instance.getString('Helper text')
    : undefined;
  const invalid = instance.getEnum('State', {
    Error: true,
  });
  const invalidText = invalid ? instance.getString('Error text') : undefined;
  const label = instance.getString('Label text');
  const readonly = instance.getEnum('State', {
    'Read-only': true,
  });
  const size = instance.getEnum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  });
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const warnText = warn ? instance.getString('Warning text') : undefined;

  const numberInputBase = instance.findInstance('_Number input base');
  const value =
    numberInputBase.type !== 'ERROR'
      ? numberInputBase.findText('Text').__render__()
      : undefined;

  return {
    id: 'cds-number-input',
    imports: [
      "import '@carbon/web-components/es/components/number-input/index.js'",
    ],
    example: figma.code`<cds-number-input${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderStringAttribute(
      'helper-text',
      helperText
    )}${renderBooleanAttribute('hide-label', hideLabel)}${renderBooleanAttribute(
      'invalid',
      invalid
    )}${renderStringAttribute(
      'invalid-text',
      invalidText
    )}${renderStringAttribute('label', label)}${renderBooleanAttribute(
      'readonly',
      readonly
    )}${renderStringAttribute('size', size)}${renderStringAttribute(
      'value',
      value
    )}${renderBooleanAttribute('warn', warn)}${renderStringAttribute(
      'warn-text',
      warnText
    )}></cds-number-input>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
