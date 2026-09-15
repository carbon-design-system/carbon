/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2133-10716&t=A3oys5odsvKkcDFA-4',
  {
    props: {
      children: figma.instance('Swap icon'),
      isActive: figma.enum('State', {
        Active: true,
      }),
    },
    example: (props) =>
      html`<cds-header-global-action active=${props.isActive}>
        ${props.children}
      </cds-header-global-action>`,
    imports: [
      "import '@carbon/web-components/es/components/ui-shell/index.js'",
    ],
  }
);
