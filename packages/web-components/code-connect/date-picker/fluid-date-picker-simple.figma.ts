// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-267399&t=hgJuU7m9Y6EM076g-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/fluid-date-picker/fluid-date-picker.ts
// component=cds-fluid-date-picker

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
      id: 'cds-fluid-date-picker-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/fluid-date-picker/index.js'",
      ],
      example: figma.code`<cds-fluid-date-picker-skeleton date-picker-type="simple"></cds-fluid-date-picker-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const placeholder = instance.getString('Date selected');
  const warnText = instance.getString('Warning text');
  const labelText = instance.getString('Label text');
  const invalidText = instance.getString('Error text');
  const invalid = instance.getEnum('State', {
    Error: true,
  });
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const readonly = instance.getEnum('State', {
    'Read-only': true,
  });

  return {
    id: 'cds-fluid-date-picker',
    imports: [
      "import '@carbon/web-components/es/components/fluid-date-picker/index.js'",
    ],
    example: figma.code`<cds-fluid-date-picker>
  <cds-fluid-date-picker-input kind="simple"${renderStringAttribute(
    'label-text',
    labelText
  )}${renderStringAttribute(
    'placeholder',
    placeholder
  )}${renderBooleanAttribute('readonly', readonly)}${renderBooleanAttribute(
    'invalid',
    invalid
  )}${renderStringAttribute(
    'invalid-text',
    invalidText
  )}${renderBooleanAttribute('warn', warn)}${renderStringAttribute(
    'warn-text',
    warnText
  )}></cds-fluid-date-picker-input>
</cds-fluid-date-picker>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
