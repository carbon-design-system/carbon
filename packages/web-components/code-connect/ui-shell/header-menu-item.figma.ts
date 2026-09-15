/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2133-9531&t=A3oys5odsvKkcDFA-4',
  {
    props: {
      linkText: figma.string('Link text'),
      isActive: figma.boolean('Selected'),
    },
    example: (props) =>
      html`<cds-header-nav-item href="#" is-active=${props.isActive}>
        ${props.linkText}
      </cds-header-nav-item>`,
    imports: [
      "import '@carbon/web-components/es/components/ui-shell/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2133-9531&t=A3oys5odsvKkcDFA-4',
  {
    variant: { Type: 'Sub-menu' },
    props: {
      linkText: figma.string('Link text'),
      isActive: figma.boolean('Selected'),
    },
    example: (props) =>
      html`<cds-header-menu
        menu-label=${props.linkText}
        trigger-content=${props.linkText}>
        <cds-header-menu-item href="#" is-active=${props.isActive}>
          ${props.linkText}
        </cds-header-menu-item>
      </cds-header-menu>`,
    imports: [
      "import '@carbon/web-components/es/components/ui-shell/index.js'",
    ],
  }
);

// sub menu item
figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2133-9888&t=A3oys5odsvKkcDFA-4',
  {
    props: {
      linkText: figma.string('Link text'),
    },
    example: (props) =>
      html`<cds-header-menu-item href="#">
        ${props.linkText}
      </cds-header-menu-item>`,
    imports: [
      "import '@carbon/web-components/es/components/ui-shell/index.js'",
    ],
  }
);

// sub menu
figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2133-9973&t=A3oys5odsvKkcDFA-4',
  {
    props: {
      children: figma.children(['UI shell - Header sub-menu item']),
    },
    example: (props) =>
      html`<cds-header-menu>${props.children}</cds-header-menu>`,
    imports: [
      "import '@carbon/web-components/es/components/ui-shell/index.js'",
    ],
  }
);
