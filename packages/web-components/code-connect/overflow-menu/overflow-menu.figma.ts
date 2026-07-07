/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3717-45725&t=aG4cJRjteQHcd71k-4',
  {
    props: {
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      direction: figma.enum('Position', {
        Top: 'top',
      }),
      flipped: figma.enum('Alignment', {
        End: true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      open: figma.boolean('Open'),
      button: figma.nestedProps('Button', {
        renderIcon: figma.instance('Swap icon'),
      }),
    },
    example: (props) =>
      html`<cds-overflow-menu
        disabled=${props.disabled}
        open=${props.open}
        size=${props.size}>
        <span slot="icon">${props.button.renderIcon}</span>
        <span slot="tooltip-content">Options</span>
        <cds-overflow-menu-body
          direction=${props.direction}
          flipped=${props.flipped}>
          <cds-overflow-menu-item>Stop app</cds-overflow-menu-item>
          <cds-overflow-menu-item>Restart app</cds-overflow-menu-item>
          <cds-overflow-menu-item>Rename app</cds-overflow-menu-item>
          <cds-overflow-menu-item disabled>
            Clone and move app
          </cds-overflow-menu-item>
          <cds-overflow-menu-item divider danger>
            Delete app
          </cds-overflow-menu-item>
        </cds-overflow-menu-body>
      </cds-overflow-menu>`,
    imports: [
      "import '@carbon/web-components/es/components/overflow-menu/index.js'",
    ],
  }
);
