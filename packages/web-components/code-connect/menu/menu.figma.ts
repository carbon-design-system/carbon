/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=31131-96397&t=OdgMrt4NDVwZpNSx-4',
  {
    props: {
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
        'Extra small': 'xs',
      }),
      children: figma.children(['_Menu list item']),
    },
    example: (props) =>
      html`<cds-menu menu-alignment="bottom" open size=${props.size}>
        ${props.children}
      </cds-menu>`,
    imports: ["import '@carbon/web-components/es/components/menu/index.js'"],
  }
);
