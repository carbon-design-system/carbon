// url=https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=3193-29303&mode=design&t=QVE44xARq96HRr11-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/checkbox/checkbox.ts
// component=cds-checkbox

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
      id: 'cds-checkbox-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/checkbox/checkbox-skeleton.js'",
      ],
      example: figma.code`<cds-checkbox-skeleton></cds-checkbox-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const hideLabel = !instance.getBoolean('Value');
  const labelText = instance.getString('Value text');
  const indeterminate = instance.getEnum('Selection', {
    Indeterminate: true,
  });
  const checked = instance.getEnum('Selection', {
    Checked: true,
  });
  const helperText = instance.getBoolean('Helper message')
    ? instance.getString('Helper text')
    : undefined;
  const invalid = instance.getEnum('State', {
    Invalid: true,
  });
  const invalidText = invalid ? instance.getString('Error text') : undefined;
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const warnText = warn ? instance.getString('Warning text') : undefined;
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const readonly = instance.getEnum('State', {
    'Read-only': true,
  });

  return {
    id: 'cds-checkbox',
    imports: [
      "import '@carbon/web-components/es/components/checkbox/checkbox.js'",
    ],
    example: figma.code`<cds-checkbox${renderBooleanAttribute(
      'checked',
      checked
    )}${renderBooleanAttribute('disabled', disabled)}${renderStringAttribute(
      'helper-text',
      helperText
    )}${renderBooleanAttribute(
      'hide-label',
      hideLabel
    )}${renderBooleanAttribute(
      'indeterminate',
      indeterminate
    )}${renderBooleanAttribute('invalid', invalid)}${renderStringAttribute(
      'invalid-text',
      invalidText
    )}${renderBooleanAttribute('readonly', readonly)}${renderBooleanAttribute(
      'warn',
      warn
    )}${renderStringAttribute('warn-text', warnText)}>${labelText}</cds-checkbox>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
