/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

const sharedComboButtonProps = {
  size: figma.enum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  }),
  menuAlignment: figma.enum('Position', {
    Bottom: 'bottom',
    Top: 'top',
  }),
  menu: figma.nestedProps('Menu', {
    menuItem: figma.children(['_Menu list item']),
  }),
};

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=31753-68447&t=aG4cJRjteQHcd71k-4',
  {
    props: sharedComboButtonProps,
    example: (props) =>
      html`<cds-combo-button
        label="Primary action"
        menu-alignment=${props.menuAlignment}
        size=${props.size}>
        <cds-menu>${props.menu.menuItem}</cds-menu>
      </cds-combo-button>`,
    imports: [
      "import '@carbon/web-components/es/components/combo-button/index.js'",
      "import '@carbon/web-components/es/components/menu/index.js'",
    ],
  }
);
