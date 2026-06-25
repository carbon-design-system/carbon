/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=10574-240285',
  {
    example: () =>
      html`<c4p-notification-footer
        slot="footer"
        viewAllLabel="View all (16)"
      ></c4p-notification-footer>`,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/notification-panel/index.js'",
    ],
  }
);
