// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14505-302528&t=4Ath5JqwaYJZxznq-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/fluid-dropdown/fluid-dropdown.ts
// component=cds-fluid-dropdown

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
  if (isSkeleton) {
    return {
      id: 'cds-fluid-dropdown-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/fluid-dropdown/index.js'",
      ],
      example: figma.code`<cds-fluid-dropdown-skeleton></cds-fluid-dropdown-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const titleText = instance.getString('Label text');
  const label = instance.getString('Prompt text');
  const readonly = instance.getEnum('State', {
    'Read-only': true,
  });
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const invalid = instance.getEnum('State', {
    Error: true,
  });
  const invalidText = instance.getString('Error text');
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const warnText = instance.getString('Warning text');

  return {
    id: 'cds-fluid-dropdown',
    imports: [
      "import '@carbon/web-components/es/components/fluid-dropdown/index.js'",
    ],
    example: figma.code`<cds-fluid-dropdown${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderBooleanAttribute('invalid', invalid)}${renderStringAttribute(
      'invalid-text',
      invalidText
    )}${renderStringAttribute('label', label)}${renderBooleanAttribute(
      'read-only',
      readonly
    )}${renderStringAttribute(
      'title-text',
      titleText
    )}${renderBooleanAttribute('warn', warn)}${renderStringAttribute(
      'warn-text',
      warnText
    )} value="option-0">
  <cds-dropdown-item value="option-0">Option 0</cds-dropdown-item>
  <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
</cds-fluid-dropdown>`,
    metadata: { nestable: false },
  };
}

export default createTemplate();
