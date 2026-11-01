// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=17650-275243&t=LS77peWFGhwOdxIw-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/fluid-select/fluid-select.ts
// component=cds-fluid-select

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
      id: 'cds-fluid-select-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/fluid-select/fluid-select-skeleton.js'",
      ],
      example: figma.code`<cds-fluid-select-skeleton></cds-fluid-select-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const labelText = instance.getString('Label text');
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
    id: 'cds-fluid-select',
    imports: [
      "import '@carbon/web-components/es/components/fluid-select/fluid-select.js'",
      "import '@carbon/web-components/es/components/select/select-item.js'",
    ],
    example: figma.code`<cds-fluid-select${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderBooleanAttribute('invalid', invalid)}${renderStringAttribute(
      'invalid-text',
      invalidText
    )}${renderStringAttribute('label-text', labelText)}${renderBooleanAttribute(
      'readonly',
      readonly
    )}${renderBooleanAttribute('warn', warn)}${renderStringAttribute(
      'warn-text',
      warnText
    )}>
  <cds-select-item value=""></cds-select-item>
  <cds-select-item value="option-1">Option 1</cds-select-item>
  <cds-select-item value="option-2">Option 2</cds-select-item>
  <cds-select-item value="option-3">Option 3</cds-select-item>
  <cds-select-item value="option-4">Option 4</cds-select-item>
</cds-fluid-select>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
