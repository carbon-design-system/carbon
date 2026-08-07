/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17422-270657&t=Qm7ndWAwgu7d5Uxc-4',
  {
    props: {
      children: figma.children(['Checkbox']),
      helperText: figma.boolean('Helper message', {
        true: figma.string('Helper text'),
      }),
      readonly: figma.enum('State', {
        'Read-only': true,
      }),
      invalid: figma.enum('State', {
        Invalid: true,
      }),
      invalidText: figma.string('Error text'),
      warn: figma.enum('State', {
        Warning: true,
      }),
      warnText: figma.string('Warning text'),
    },
    example: (props) =>
      html`<cds-checkbox-group
        helper-text=${props.helperText}
        invalid=${props.invalid}
        invalid-text=${props.invalidText}
        legend-text="Checkbox group label"
        readonly=${props.readonly}
        warn=${props.warn}
        warn-text=${props.warnText}>
        ${props.children}
      </cds-checkbox-group>`,
    imports: [
      "import '@carbon/web-components/es/components/checkbox/index.js'",
    ],
  }
);
