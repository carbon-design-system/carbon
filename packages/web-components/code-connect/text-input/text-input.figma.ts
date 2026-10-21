// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=15784-271032&m=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/text-input/text-input.ts
// component=cds-text-input

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
      id: 'cds-text-input-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/text-input/text-input-skeleton.js'",
      ],
      example: figma.code`<cds-text-input-skeleton></cds-text-input-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const label = instance.getString('Label text');
  const placeholder = instance.getString('Placeholder text');
  const value = instance.getBoolean('Text filled')
    ? instance.getString('Input text')
    : undefined;
  const helperText = instance.getBoolean('Show helper')
    ? instance.getString('Helper text')
    : undefined;
  const enableCounter = instance.getBoolean('Show count');
  const size = instance.getEnum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  });
  const inline = instance.getEnum('Style', {
    Inline: true,
  });
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
    id: 'cds-text-input',
    imports: [
      "import '@carbon/web-components/es/components/text-input/text-input.js'",
    ],
    example: figma.code`<cds-text-input${renderStringAttribute(
      'label',
      label
    )}${renderStringAttribute(
      'placeholder',
      placeholder
    )}${renderStringAttribute('value', value)}${renderStringAttribute(
      'helper-text',
      helperText
    )}${renderBooleanAttribute(
      'enable-counter',
      enableCounter
    )}${renderStringAttribute('size', size)}${renderBooleanAttribute(
      'inline',
      inline
    )}${renderBooleanAttribute(
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
    )}></cds-text-input>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
