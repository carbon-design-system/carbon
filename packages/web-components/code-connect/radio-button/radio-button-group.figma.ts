/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2927-28166&t=yFGI7EFVWv0vtqIk-4',
  {
    props: {
      children: figma.children(['Radio button']),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      helperText: figma.boolean('Helper message', {
        true: figma.string('Helper text'),
      }),
      warnText: figma.string('Warning text'),
      warn: figma.enum('State', {
        Warning: true,
      }),
      invalidText: figma.string('Error text'),
      invalid: figma.enum('State', {
        Invalid: true,
      }),
      legendText: figma.string('Label text'),
      orientation: figma.boolean('Horizontal', {
        false: 'vertical',
      }),
    },
    example: (props) =>
      html`<cds-radio-button-group
        disabled=${props.disabled}
        helper-text=${props.helperText}
        invalid=${props.invalid}
        invalid-text=${props.invalidText}
        legend-text=${props.legendText}
        orientation=${props.orientation}
        warn=${props.warn}
        warn-text=${props.warnText}>
        ${props.children}
      </cds-radio-button-group>`,
    imports: [
      "import '@carbon/web-components/es/components/radio-button/index.js'",
    ],
  }
);
