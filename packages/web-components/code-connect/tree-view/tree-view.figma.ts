/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=11948-286738&t=aG4cJRjteQHcd71k-4',
  {
    props: {
      treeNode: figma.nestedProps('Branch node item', {
        size: figma.enum('Size', {
          Small: 'sm',
          'Extra small': 'xs',
        }),
      }),
      children: figma.children(['Branch node item']),
    },
    // Figma component doesn't currently nest TreeNodes accurately,
    // code sample below is incomplete.
    example: (props) =>
      html`<cds-tree-view label="Tree View" size=${props.treeNode.size}>
        ${props.children}
      </cds-tree-view>`,
    imports: [
      "import '@carbon/web-components/es/components/tree-view/index.js'",
    ],
  }
);
