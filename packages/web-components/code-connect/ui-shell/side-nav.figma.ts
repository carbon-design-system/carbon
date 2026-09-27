/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=6227-297201&t=wcK3P98b09VsrxXF-4',
  {
    props: {
      expanded: figma.boolean('Compact', {
        true: false,
        false: true,
      }),
      children: figma.children(['UI shell - Left panel menu item']),
    },
    example: (props) =>
      html`<cds-side-nav
        aria-label="Side navigation"
        expanded=${props.expanded}>
        <cds-side-nav-items>
          <cds-side-nav-menu title="Menu">${props.children}</cds-side-nav-menu>
        </cds-side-nav-items>
      </cds-side-nav>`,
    imports: [
      "import '@carbon/web-components/es/components/ui-shell/index.js'",
    ],
  }
);
