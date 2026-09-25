// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-268235&t=hgJuU7m9Y6EM076g-4
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

function getDatePickerInputProps() {
  const layer = instance.findInstance('Date picker - Single calendar - Fluid');

  return {
    placeholder:
      layer.type !== 'ERROR' ? layer.getString('Date unselected') : undefined,
    disabled:
      layer.type !== 'ERROR'
        ? layer.getEnum('State', {
            Disabled: true,
          })
        : undefined,
    invalid:
      layer.type !== 'ERROR'
        ? layer.getEnum('State', {
            Error: true,
          })
        : undefined,
    warn:
      layer.type !== 'ERROR'
        ? layer.getEnum('State', {
            Warning: true,
          })
        : undefined,
    warnText:
      layer.type !== 'ERROR' ? layer.getString('Warning text') : undefined,
    invalidText:
      layer.type !== 'ERROR' ? layer.getString('Error text') : undefined,
  };
}

function createTemplate() {
  if (isSkeleton) {
    return {
      id: 'cds-fluid-date-picker-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/fluid-date-picker/index.js'",
      ],
      example: figma.code`<cds-fluid-date-picker-skeleton date-picker-type="range"></cds-fluid-date-picker-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const readonly = instance.getEnum('State', {
    'Read-only': true,
  });
  const datePickerInput = getDatePickerInputProps();

  return {
    id: 'cds-fluid-date-picker',
    imports: [
      "import '@carbon/web-components/es/components/fluid-date-picker/index.js'",
    ],
    example: figma.code`<cds-fluid-date-picker${renderBooleanAttribute(
      'readonly',
      readonly
    )}>
  <cds-fluid-date-picker-input${renderBooleanAttribute(
    'disabled',
    datePickerInput.disabled
  )}${renderBooleanAttribute(
    'invalid',
    datePickerInput.invalid
  )}${renderStringAttribute(
    'invalid-text',
    datePickerInput.invalidText
  )} kind="from" label-text="Start date"${renderStringAttribute(
    'placeholder',
    datePickerInput.placeholder
  )}${renderBooleanAttribute(
    'warn',
    datePickerInput.warn
  )}${renderStringAttribute(
    'warn-text',
    datePickerInput.warnText
  )}></cds-fluid-date-picker-input>
  <cds-fluid-date-picker-input${renderBooleanAttribute(
    'disabled',
    datePickerInput.disabled
  )}${renderBooleanAttribute(
    'invalid',
    datePickerInput.invalid
  )}${renderStringAttribute(
    'invalid-text',
    datePickerInput.invalidText
  )} kind="to" label-text="End date"${renderStringAttribute(
    'placeholder',
    datePickerInput.placeholder
  )}${renderBooleanAttribute(
    'warn',
    datePickerInput.warn
  )}${renderStringAttribute(
    'warn-text',
    datePickerInput.warnText
  )}></cds-fluid-date-picker-input>
</cds-fluid-date-picker>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
