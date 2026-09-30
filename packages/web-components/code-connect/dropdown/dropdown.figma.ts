// url=https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=14032-290635&mode=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/dropdown/dropdown.ts
// component=cds-dropdown

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
const isSkeleton = instance.getEnum('State', {
  Skeleton: true,
});

function createTemplate() {
  const size = instance.getEnum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  });

  if (isSkeleton) {
    return {
      id: 'cds-dropdown-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/dropdown/index.js'",
      ],
      example: figma.code`<cds-dropdown-skeleton${renderStringAttribute(
        'size',
        size
      )}></cds-dropdown-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const helperText = instance.getBoolean('Show helper', {
    true: instance.getString('Helper text'),
  });
  const titleText = instance.getString('Label');
  const label = instance.getString('Prompt text');
  const readOnly = instance.getEnum('State', {
    'Read-only': true,
  });
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const invalid = instance.getEnum('State', {
    Error: true,
  });
  const invalidText = instance.getString('Error message');
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const warnText = instance.getString('Warning message');
  const type = instance.getEnum('Style', {
    Inline: 'inline',
  });

  return {
    id: 'cds-dropdown',
    imports: [
      "import '@carbon/web-components/es/components/dropdown/index.js'",
    ],
    example: figma.code`<cds-dropdown${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderStringAttribute(
      'helper-text',
      helperText
    )}${renderBooleanAttribute('invalid', invalid)}${renderStringAttribute(
      'invalid-text',
      invalidText
    )}${renderStringAttribute('label', label)}${renderBooleanAttribute(
      'read-only',
      readOnly
    )}${renderStringAttribute('size', size)}${renderStringAttribute(
      'title-text',
      titleText
    )}${renderStringAttribute('type', type)}${renderBooleanAttribute(
      'warn',
      warn
    )}${renderStringAttribute('warn-text', warnText)} value="option-0">
  <cds-dropdown-item value="option-0">Option 0</cds-dropdown-item>
  <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
</cds-dropdown>`,
    metadata: { nestable: false },
  };
}

export default createTemplate();
