// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=14494-263111&t=4Ath5JqwaYJZxznq-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/textarea/textarea.ts
// component=cds-textarea

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
      id: 'cds-textarea-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/textarea/textarea-skeleton.js'",
      ],
      example: figma.code`<cds-textarea-skeleton${renderBooleanAttribute(
        'hide-label',
        hideLabel
      )}></cds-textarea-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const label = instance.getString('Label text');
  const placeholder = instance.getString('Placeholder text');
  const value = instance.getBoolean('Text filled')
    ? instance.getString('Body text')
    : undefined;
  const helperText = instance.getBoolean('Show helper')
    ? instance.getString('Helper text')
    : undefined;
  const enableCounter = instance.getBoolean('Show count');
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const readonly = instance.getEnum('State', {
    'Read-only': true,
  });
  const invalid = instance.getEnum('State', {
    Error: true,
  });
  const invalidText = invalid ? instance.getString('Error text') : undefined;
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const warnText = warn ? instance.getString('Warning text') : undefined;

  return {
    id: 'cds-textarea',
    imports: [
      "import '@carbon/web-components/es/components/textarea/textarea.js'",
    ],
    example: figma.code`<cds-textarea${renderStringAttribute(
      'label',
      label
    )}${renderBooleanAttribute('hide-label', hideLabel)}${renderStringAttribute(
      'placeholder',
      placeholder
    )}${renderStringAttribute('value', value)}${renderStringAttribute(
      'helper-text',
      helperText
    )}${renderBooleanAttribute(
      'enable-counter',
      enableCounter
    )}${renderBooleanAttribute('disabled', disabled)}${renderBooleanAttribute(
      'readonly',
      readonly
    )}${renderBooleanAttribute('invalid', invalid)}${renderStringAttribute(
      'invalid-text',
      invalidText
    )}${renderBooleanAttribute('warn', warn)}${renderStringAttribute(
      'warn-text',
      warnText
    )}></cds-textarea>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
