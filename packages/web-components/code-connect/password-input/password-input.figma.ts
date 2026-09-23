// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=5621-280380&t=BNxiN6zuoeazJ8tv-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/password-input/password-input.ts
// component=cds-password-input

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
      id: 'cds-password-input-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/password-input/index.js'",
      ],
      example: figma.code`<cds-password-input-skeleton></cds-password-input-skeleton>`,
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
    'Read only': true,
  });
  const inline = instance.getEnum('Style', {
    Inline: true,
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

  return {
    id: 'cds-password-input',
    imports: [
      "import '@carbon/web-components/es/components/password-input/index.js'",
    ],
    example: figma.code`<cds-password-input${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderStringAttribute(
      'helper-text',
      helperText
    )}${renderBooleanAttribute('invalid', invalid)}${renderStringAttribute(
      'invalid-text',
      invalidText
    )}${renderBooleanAttribute('inline', inline)}${renderStringAttribute(
      'label',
      label
    )}${renderBooleanAttribute('readonly', readonly)}${renderStringAttribute(
      'size',
      size
    )}${renderBooleanAttribute('warn', warn)}${renderStringAttribute(
      'warn-text',
      warnText
    )}></cds-password-input>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
