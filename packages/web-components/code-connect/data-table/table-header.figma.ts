/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/Ude8f8dEgXxxnpbzrvWfwE/-v11--Carbon-Design-System--Community-?node-id=43292-32017&t=5C1lVaCoSygb13J1-4',
  {
    props: {
      text: figma.string('Cell text'),
      isSortable: figma.boolean('Sortable'),
    },
    example: (props) =>
      html`<cds-table-header-cell is-sortable=${props.isSortable}
        >${props.text}</cds-table-header-cell
      >`,
    imports: [
      "import '@carbon/web-components/es/components/data-table/index.js'",
    ],
  }
);
