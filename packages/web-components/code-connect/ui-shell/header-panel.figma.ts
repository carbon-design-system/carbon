/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/Ude8f8dEgXxxnpbzrvWfwE/-v11--Carbon-Design-System--Community-?node-id=2319-15100&t=wcK3P98b09VsrxXF-4',
  {
    props: {
      children: figma.children('*'),
    },
    example: (props) =>
      html`<cds-header>
        <cds-header-panel aria-label="Header panel" expanded>
          ${props.children}
        </cds-header-panel>
      </cds-header>`,
    imports: [
      "import '@carbon/web-components/es/components/ui-shell/index.js'",
    ],
  }
);
