/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

const sharedMenuButtonProps = {
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
  button: figma.nestedProps('Button', {
    kind: figma.enum('Style', {
      Primary: 'primary',
      Tertiary: 'tertiary',
      Ghost: 'ghost',
    }),
    disabled: figma.enum('State', {
      Disabled: true,
    }),
  }),
};

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=31420-317548&t=KXgYpEhuz2XzSITV-4',
  {
    props: sharedMenuButtonProps,
    example: (props) =>
      html`<cds-menu-button
        disabled=${props.button.disabled}
        kind=${props.button.kind}
        label="Actions"
        menu-alignment=${props.menuAlignment}
        size=${props.size}>
        <cds-menu>${props.menu.menuItem}</cds-menu>
      </cds-menu-button>`,
    imports: [
      "import '@carbon/web-components/es/components/menu-button/index.js'",
      "import '@carbon/web-components/es/components/menu/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=31420-317548&t=KXgYpEhuz2XzSITV-4',
  {
    variant: { Open: 'True' },
    props: sharedMenuButtonProps,
    example: (props) =>
      html`<cds-menu-button
        disabled=${props.button.disabled}
        kind=${props.button.kind}
        label="Actions"
        menu-alignment=${props.menuAlignment}
        size=${props.size}>
        <cds-menu>${props.menu.menuItem}</cds-menu>
      </cds-menu-button>`,
    imports: [
      "import '@carbon/web-components/es/components/menu-button/index.js'",
      "import '@carbon/web-components/es/components/menu/index.js'",
    ],
  }
);
