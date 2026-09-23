// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=68771-7312&t=BNxiN6zuoeazJ8tv-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/fluid-password-input/fluid-password-input.ts
// component=cds-fluid-password-input

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

  if (isSkeleton) {
    return {
      id: 'cds-fluid-text-input-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/fluid-text-input/fluid-text-input-skeleton.js'",
      ],
      example: figma.code`<cds-fluid-text-input-skeleton></cds-fluid-text-input-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const label = instance.findText('Label').__render__();
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const invalid = instance.getEnum('State', {
    Error: true,
  });
  const invalidText = instance.getString('Error text');
  const readonly = instance.getEnum('State', {
    'Read only': true,
  });
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const warnText = instance.getString('Warning text');

  return {
    id: 'cds-fluid-password-input',
    imports: [
      "import '@carbon/web-components/es/components/fluid-password-input/fluid-password-input.js'",
    ],
    example: figma.code`<cds-fluid-password-input${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderBooleanAttribute('invalid', invalid)}${renderStringAttribute(
      'invalid-text',
      invalidText
    )}${renderStringAttribute('label', label)}${renderBooleanAttribute(
      'readonly',
      readonly
    )}${renderBooleanAttribute('warn', warn)}${renderStringAttribute(
      'warn-text',
      warnText
    )}></cds-fluid-password-input>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
