// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=18791-274643&t=4Ath5JqwaYJZxznq-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/fluid-textarea/fluid-textarea.ts
// component=cds-fluid-textarea

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
      id: 'cds-fluid-textarea-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/fluid-textarea/fluid-textarea-skeleton.js'",
      ],
      example: figma.code`<cds-fluid-textarea-skeleton></cds-fluid-textarea-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const label = instance.getString('Label text');
  const placeholder = instance.getString('Placeholder text');
  const value = instance.getBoolean('Text filled')
    ? instance.getString('Body text')
    : undefined;
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const readonly = instance.getEnum('State', {
    'Read-only': true,
  });
  const invalid = instance.getEnum('State', {
    Error: true,
  });
  const invalidText = invalid ? instance.getString('Error message') : undefined;
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const warnText = warn ? instance.getString('Warning message') : undefined;

  return {
    id: 'cds-fluid-textarea',
    imports: [
      "import '@carbon/web-components/es/components/fluid-textarea/fluid-textarea.js'",
    ],
    example: figma.code`<cds-fluid-textarea${renderStringAttribute(
      'label',
      label
    )}${renderStringAttribute(
      'placeholder',
      placeholder
    )}${renderStringAttribute('value', value)}${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderBooleanAttribute('readonly', readonly)}${renderBooleanAttribute(
      'invalid',
      invalid
    )}${renderStringAttribute(
      'invalid-text',
      invalidText
    )}${renderBooleanAttribute('warn', warn)}${renderStringAttribute(
      'warn-text',
      warnText
    )}></cds-fluid-textarea>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
