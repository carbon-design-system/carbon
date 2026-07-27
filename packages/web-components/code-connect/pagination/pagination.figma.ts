/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3889-50204&t=gkzO9FaEPqewqYn6-4',
  {
    props: {
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
    },
    example: (props) =>
      html`<cds-pagination
        backward-text="Previous page"
        forward-text="Next page"
        items-per-page-text="Items per page:"
        page="1"
        page-size="10"
        size=${props.size}
        total-items="103">
        <cds-select-item value="10">10</cds-select-item>
        <cds-select-item value="20">20</cds-select-item>
        <cds-select-item value="30">30</cds-select-item>
        <cds-select-item value="40">40</cds-select-item>
        <cds-select-item value="50">50</cds-select-item>
      </cds-pagination>`,
    imports: [
      "import '@carbon/web-components/es/components/pagination/index.js'",
    ],
  }
);
