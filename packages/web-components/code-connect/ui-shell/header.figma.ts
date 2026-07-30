/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-Carbon-Design-System?node-id=92123-1663&t=UFUf7yvv8SJyoEK1-4',
  {
    props: {
      prefix: figma.boolean('Site prefix', {
        true: figma.string('Site prefix text'),
      }),
      name: figma.string('Site name'),
      headerMenuButton: figma.boolean('Menu', {
        true: figma.children('Menu trigger'),
      }),
      headerGlobalActions: figma.boolean('Actions', {
        true: figma.children(['UI shell - Header actions']),
      }),
      headerMenuItems: figma.boolean('Navigation', {
        true: figma.children(['UI shell - Header menu item']),
      }),
    },
    example: (props) =>
      html`<cds-header aria-label=${props.name}>
        <cds-skip-to-content></cds-skip-to-content>
        ${props.headerMenuButton}
        <cds-header-name href="#" prefix=${props.prefix}>
          ${props.name}
        </cds-header-name>
        <cds-header-nav menu-bar-label="IBM [Platform]">
          ${props.headerMenuItems}
        </cds-header-nav>
        <div class="cds--header__global">${props.headerGlobalActions}</div>
      </cds-header>`,
    imports: [
      "import '@carbon/web-components/es/components/ui-shell/index.js'",
      "import '@carbon/web-components/es/components/skip-to-content/index.js'",
    ],
  }
);
