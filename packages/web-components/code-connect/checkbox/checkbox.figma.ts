/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=3193-29303&mode=design&t=QVE44xARq96HRr11-4',
  {
    props: {
      hideLabel: figma.boolean('Value', {
        true: false,
        false: true,
      }),
      labelText: figma.string('Value text'),
      indeterminate: figma.enum('Selection', {
        Indeterminate: true,
      }),
      checked: figma.enum('Selection', {
        Checked: true,
      }),
      helperText: figma.boolean('Helper message', {
        true: figma.string('Helper text'),
      }),
      invalid: figma.enum('State', {
        Invalid: true,
      }),
      invalidText: figma.string('Error text'),
      warn: figma.enum('State', {
        Warning: true,
      }),
      warnText: figma.string('Warning text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      readonly: figma.enum('State', {
        'Read-only': true,
      }),
    },
    example: (props) =>
      html`<cds-checkbox
        checked=${props.checked}
        disabled=${props.disabled}
        helper-text=${props.helperText}
        hide-label=${props.hideLabel}
        indeterminate=${props.indeterminate}
        invalid=${props.invalid}
        invalid-text=${props.invalidText}
        readonly=${props.readonly}
        warn=${props.warn}
        warn-text=${props.warnText}>
        ${props.labelText}
      </cds-checkbox>`,
    imports: [
      "import '@carbon/web-components/es/components/checkbox/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=3193-29303&mode=design&t=QVE44xARq96HRr11-4',
  {
    variant: { State: 'Skeleton' },
    example: () => html`<cds-checkbox-skeleton></cds-checkbox-skeleton>`,
    imports: [
      "import '@carbon/web-components/es/components/checkbox/index.js'",
    ],
  }
);
