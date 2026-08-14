/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

const imports = [
  "import '@carbon/web-components/es/components/breadcrumb/index.js'",
  "import '@carbon/web-components/es/components/overflow-menu/index.js'",
];

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3136-29234&t=U57NnoohldL54XAl-4',
  {
    variant: { Type: 'Link' },
    props: {
      children: figma.string('Text'),
    },
    example: ({ children }) =>
      html`<cds-breadcrumb-item>
        <cds-breadcrumb-link href="#">${children}</cds-breadcrumb-link>
      </cds-breadcrumb-item>`,
    imports,
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3136-29234&t=U57NnoohldL54XAl-4',
  {
    variant: { State: 'Current' },
    props: {
      children: figma.string('Text'),
      isCurrentPage: figma.boolean('Current'),
    },
    example: ({ children, isCurrentPage }) =>
      html`<cds-breadcrumb-item>
        <cds-breadcrumb-link is-currentpage=${isCurrentPage}>
          ${children}
        </cds-breadcrumb-link>
      </cds-breadcrumb-item>`,
    imports,
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3136-29234&t=U57NnoohldL54XAl-4',
  {
    variant: { Type: 'Overflow' },
    example: () =>
      html`<cds-breadcrumb-item>
        <cds-overflow-menu breadcrumb align="bottom">
          <svg
            slot="icon"
            class="cds--overflow-menu__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="currentColor"
            width="16"
            height="16">
            <circle cx="8" cy="16" r="2"></circle>
            <circle cx="16" cy="16" r="2"></circle>
            <circle cx="24" cy="16" r="2"></circle>
          </svg>
          <span slot="tooltip-content">Options</span>
          <cds-overflow-menu-body>
            <cds-overflow-menu-item>Breadcrumb 3</cds-overflow-menu-item>
            <cds-overflow-menu-item>Breadcrumb 4</cds-overflow-menu-item>
          </cds-overflow-menu-body>
        </cds-overflow-menu>
      </cds-breadcrumb-item>`,
    imports,
  }
);
