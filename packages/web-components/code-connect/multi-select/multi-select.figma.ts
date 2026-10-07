// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=14032-291311&t=aG4cJRjteQHcd71k-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/multi-select/multi-select.ts
// component=cds-multi-select

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
const size = instance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
});
const state = instance.getPropertyValue('State');

function createTemplate() {
  if (state === 'Skeleton') {
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

  const type = instance.getEnum('Style', {
    Inline: 'inline',
  });
  const titleText = instance.getString('Label text');
  const label = instance.getString('Prompt text');
  const helperText = instance.getBoolean('Show helper')
    ? instance.getString('Helper text')
    : undefined;
  const disabled = state === 'Disabled';
  const invalid = state === 'Error';
  const invalidText = invalid ? instance.getString('Error message') : undefined;
  const warn = state === 'Warning';
  const warnText = warn ? instance.getString('Warning message') : undefined;
  const readOnly = state === 'Read-only';

  return {
    id: 'cds-multi-select',
    imports: [
      "import '@carbon/web-components/es/components/multi-select/index.js'",
    ],
    example: figma.code`<cds-multi-select${renderBooleanAttribute(
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
    )} selection-feedback="top-after-reopen"${renderStringAttribute(
      'size',
      size
    )}${renderStringAttribute('title-text', titleText)}${renderStringAttribute(
      'type',
      type
    )}${renderBooleanAttribute('warn', warn)}${renderStringAttribute(
      'warn-text',
      warnText
    )}>
  <cds-multi-select-item selected value="option-0">Option 0</cds-multi-select-item>
  <cds-multi-select-item value="option-1">Option 1</cds-multi-select-item>
</cds-multi-select>`,
    metadata: { nestable: false },
  };
}

export default createTemplate();
