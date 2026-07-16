/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=6172-291044&t=5C1lVaCoSygb13J1-4',
  {
    props: {
      children: figma.boolean('Slot', {
        true: figma.instance('Swap slot'),
      }),
      text: figma.boolean('Show text', {
        true: figma.string('Cell text'),
      }),
    },
    example: (props) =>
      html`<cds-table-cell>${props.text}${props.children}</cds-table-cell>`,
    imports: [
      "import '@carbon/web-components/es/components/data-table/index.js'",
    ],
  }
);
