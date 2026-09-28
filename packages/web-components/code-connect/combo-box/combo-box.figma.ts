// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14032-290976&t=5acDGCinwyrs5Bbc-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/combo-box/combo-box.ts
// component=cds-combo-box

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
const isSkeleton = instance.getEnum('State', { Skeleton: true });
const size = instance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
});

function createTemplate() {
  if (isSkeleton) {
    return {
      id: 'cds-dropdown-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/combo-box/index.js'",
        "import '@carbon/web-components/es/components/dropdown/index.js'",
      ],
      example: figma.code`<cds-dropdown-skeleton${renderStringAttribute(
        'size',
        size
      )}></cds-dropdown-skeleton>`,
    };
  }

  const label = instance.getString('Filter text');
  const helperText = instance.getBoolean('Show helper')
    ? instance.getString('Helper text')
    : undefined;
  const titleText = instance.getString('Label text');
  const readOnly = instance.getEnum('State', { 'Read-only': true });
  const disabled = instance.getEnum('State', { Disabled: true });
  const invalid = instance.getEnum('State', { Error: true });
  const invalidText = invalid ? instance.getString('Error message') : undefined;
  const warn = instance.getEnum('State', { Warning: true });
  const warnText = warn ? instance.getString('Warning message') : undefined;

  return {
    id: 'cds-combo-box',
    imports: [
      "import '@carbon/web-components/es/components/combo-box/index.js'",
    ],
    example: figma.code`<cds-combo-box${renderBooleanAttribute(
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
    )}${renderBooleanAttribute('warn', warn)}${renderStringAttribute(
      'warn-text',
      warnText
    )}>
  <cds-combo-box-item value="option-0">Option 0</cds-combo-box-item>
  <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
</cds-combo-box>`,
  };
}

export default createTemplate();
