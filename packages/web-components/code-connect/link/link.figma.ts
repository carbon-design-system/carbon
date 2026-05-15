/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=50111-991&mode=design&t=kyFCPK0tCeufcNP2-4',
  {
    props: {
      inline: figma.enum('Type', {
        Inline: true,
        Standalone: false,
      }),
      linkText: figma.string('Link text'),
      renderIcon: figma.instance('Swap icon'),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: (props) =>
      html` <cds-link
        inline=${props.inline}
        size=${props.size}
        disabled=${props.disabled}>
        ${props.linkText} ${props.renderIcon}
      </cds-link>`,
    imports: ["import '@carbon/web-components/es/components/link/link.js'"],
  }
);
