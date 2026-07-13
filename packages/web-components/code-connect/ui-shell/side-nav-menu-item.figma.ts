/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2346-16194&t=wcK3P98b09VsrxXF-4',
  {
    props: {
      linkText: figma.string('Link text'),
      isActive: figma.enum('State', {
        Active: true,
      }),
    },
    example: (props) =>
      html`<cds-side-nav-menu-item href="#" active=${props.isActive}>
        ${props.linkText}
      </cds-side-nav-menu-item>`,
    imports: [
      "import '@carbon/web-components/es/components/ui-shell/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2346-16194&t=wcK3P98b09VsrxXF-4',
  {
    variant: { 'Icon left': 'True' },
    props: {
      linkText: figma.string('Link text'),
      isActive: figma.enum('State', {
        Active: true,
      }),
      icon: figma.instance('Swap icon'),
    },
    example: (props) =>
      html`<cds-side-nav-link href="#" active=${props.isActive}>
        <span slot="title-icon">${props.icon}</span>
        ${props.linkText}
      </cds-side-nav-link>`,
    imports: [
      "import '@carbon/web-components/es/components/ui-shell/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2346-16194&t=wcK3P98b09VsrxXF-4',
  {
    variant: { Type: 'Sub-menu' },
    props: {
      linkText: figma.string('Link text'),
      isActive: figma.enum('State', {
        Active: true,
      }),
    },
    example: (props) =>
      html`<cds-side-nav-menu title=${props.linkText} active=${props.isActive}>
        <cds-side-nav-menu-item href="#">Nested link</cds-side-nav-menu-item>
      </cds-side-nav-menu>`,
    imports: [
      "import '@carbon/web-components/es/components/ui-shell/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2346-16194&t=wcK3P98b09VsrxXF-4',
  {
    variant: { Type: 'Sub-menu', 'Icon left': 'True' },
    props: {
      linkText: figma.string('Link text'),
      isActive: figma.enum('State', {
        Active: true,
      }),
      icon: figma.instance('Swap icon'),
    },
    example: (props) =>
      html`<cds-side-nav-menu title=${props.linkText} active=${props.isActive}>
        <span slot="title-icon">${props.icon}</span>
        <cds-side-nav-menu-item href="#">Nested link</cds-side-nav-menu-item>
      </cds-side-nav-menu>`,
    imports: [
      "import '@carbon/web-components/es/components/ui-shell/index.js'",
    ],
  }
);
