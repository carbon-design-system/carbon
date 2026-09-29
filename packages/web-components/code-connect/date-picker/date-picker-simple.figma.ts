// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-266985&t=hgJuU7m9Y6EM076g-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/date-picker/date-picker.ts
// component=cds-date-picker

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
const hideLabel = instance.getBoolean('Show label', {
  true: false,
  false: true,
});

function createTemplate() {
  if (isSkeleton) {
    return {
      id: 'cds-date-picker-input-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/date-picker/index.js'",
      ],
      example: figma.code`<cds-date-picker-input-skeleton></cds-date-picker-input-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const placeholder = instance.getString('Date unselected');
  const labelText = instance.getString('Label text');
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const invalid = instance.getEnum('State', {
    Error: true,
  });
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const warnText = instance.getString('Warning text');
  const invalidText = instance.getString('Error text');
  const size = instance.getEnum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  });
  const readonly = instance.getEnum('State', {
    'Read-only': true,
  });

  return {
    id: 'cds-date-picker',
    imports: [
      "import '@carbon/web-components/es/components/date-picker/index.js'",
    ],
    example: figma.code`<cds-date-picker${renderBooleanAttribute(
      'readonly',
      readonly
    )}>
  <cds-date-picker-input${renderBooleanAttribute(
    'disabled',
    disabled
  )}${renderBooleanAttribute('hide-label', hideLabel)}${renderBooleanAttribute(
    'invalid',
    invalid
  )}${renderStringAttribute(
    'invalid-text',
    invalidText
  )} kind="simple"${renderStringAttribute(
    'label-text',
    labelText
  )}${renderStringAttribute(
    'placeholder',
    placeholder
  )}${renderStringAttribute('size', size)}${renderBooleanAttribute(
    'warn',
    warn
  )}${renderStringAttribute('warn-text', warnText)}></cds-date-picker-input>
</cds-date-picker>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
