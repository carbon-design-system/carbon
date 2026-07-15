/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=9384-402406&t=DU9vCm0ie6tvQBsY-4',
  {
    props: {
      alignment: figma.enum('Position', {
        Top: figma.enum('Alignment', {
          Start: 'top-start',
          Center: 'top',
          End: 'top-end',
        }),
        Bottom: figma.enum('Alignment', {
          Start: 'bottom-start',
          Center: 'bottom',
          End: 'bottom-end',
        }),
        Left: 'left',
        Right: 'right',
      }),
      toggletip: figma.nestedProps('Toggletip body', {
        content: figma.textContent('Toggletip text'),
      }),
    },
    example: (props) =>
      html`<cds-toggletip alignment=${props.alignment}>
        Toggletip label
        <p slot="body-text">${props.toggletip.content}</p>
        <cds-link href="#" slot="actions">Link action</cds-link>
        <cds-button size="sm" slot="actions">Button</cds-button>
      </cds-toggletip>`,
    imports: [
      "import '@carbon/web-components/es/components/toggle-tip/toggletip.js'",
      "import '@carbon/web-components/es/components/button/button.js'",
      "import '@carbon/web-components/es/components/link/link.js'",
    ],
  }
);
