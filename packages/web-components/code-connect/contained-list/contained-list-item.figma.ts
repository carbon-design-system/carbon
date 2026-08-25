/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16193-272771&t=cMvnFTYLPEhzhIpj-4',
  {
    props: {
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      action: figma.boolean('Action', {
        true: figma.children('Button'),
      }),
      rowCellItem: figma.nestedProps('_Contained list row cell item', {
        text: figma.textContent('Text field'),
        icon: figma.instance('Swap icon'),
      }),
    },
    example: (props) =>
      html`<cds-contained-list-item disabled=${props.disabled}>
        ${props.rowCellItem.icon} ${props.rowCellItem.text} ${props.action}
      </cds-contained-list-item>`,
    imports: [
      "import '@carbon/web-components/es/components/contained-list/index.js'",
    ],
  }
);
