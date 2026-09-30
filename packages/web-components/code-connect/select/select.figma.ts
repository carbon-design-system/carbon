// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17650-274860&t=LS77peWFGhwOdxIw-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/select/select.ts
// component=cds-select

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
      id: 'cds-select-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/select/select-skeleton.js'",
      ],
      example: figma.code`<cds-select-skeleton${renderBooleanAttribute(
        'hide-label',
        hideLabel
      )}></cds-select-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const labelText = instance.getString('Label text');
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
  const helperText = instance.getBoolean('Show helper')
    ? instance.getString('Helper text')
    : undefined;

  return {
    id: 'cds-select',
    imports: [
      "import '@carbon/web-components/es/components/select/select.js'",
      "import '@carbon/web-components/es/components/select/select-item.js'",
    ],
    example: figma.code`<cds-select${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderStringAttribute('helper-text', helperText)}${renderBooleanAttribute(
      'hide-label',
      hideLabel
    )}${renderBooleanAttribute('inline', inline)}${renderBooleanAttribute(
      'invalid',
      invalid
    )}${renderStringAttribute('invalid-text', invalidText)}${renderStringAttribute(
      'label-text',
      labelText
    )}${renderBooleanAttribute('readonly', readonly)}${renderStringAttribute(
      'size',
      size
    )}${renderBooleanAttribute('warn', warn)}${renderStringAttribute(
      'warn-text',
      warnText
    )}>
  <cds-select-item value=""></cds-select-item>
  <cds-select-item value="option-1">Option 1</cds-select-item>
  <cds-select-item value="option-2">Option 2</cds-select-item>
  <cds-select-item value="option-3">Option 3</cds-select-item>
  <cds-select-item value="option-4">Option 4</cds-select-item>
</cds-select>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
