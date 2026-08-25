/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3377-31707&m=dev',
  {
    props: {
      complete: figma.enum('State', {
        Completed: true,
      }),
      current: figma.enum('State', {
        Current: true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      invalid: figma.enum('State', {
        Error: true,
      }),
      secondaryLabel: figma.boolean('Optional label', {
        true: figma.textContent('Optional label'),
      }),
      label: figma.string('Label text'),
    },
    example: (props) =>
      html`<cds-progress-step
        complete=${props.complete}
        current=${props.current}
        disabled=${props.disabled}
        invalid=${props.invalid}
        label=${props.label}
        secondary-label=${props.secondaryLabel}></cds-progress-step>`,
    imports: [
      "import '@carbon/web-components/es/components/progress-indicator/index.js'",
    ],
  }
);
