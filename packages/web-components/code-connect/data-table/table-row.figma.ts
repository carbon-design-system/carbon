/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4547-163221&t=5C1lVaCoSygb13J1-4',
  {
    props: {
      children: figma.children('Col*'),
    },
    example: (props) => html`<cds-table-row>${props.children}</cds-table-row>`,
    imports: [
      "import '@carbon/web-components/es/components/data-table/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4547-163221&t=5C1lVaCoSygb13J1-4',
  {
    variant: { Expandable: 'True' },
    props: {
      children: figma.children('Col*'),
    },
    example: (props) =>
      html`<cds-table-row>${props.children}</cds-table-row>
        <cds-table-expanded-row>
          Expandable row content
        </cds-table-expanded-row>`,
    imports: [
      "import '@carbon/web-components/es/components/data-table/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4547-163221&t=5C1lVaCoSygb13J1-4',
  {
    variant: { Expandable: 'True', Selectable: 'True' },
    props: {
      children: figma.children('Col*'),
    },
    example: (props) =>
      html`<cds-table-row selection-name="row">${props.children}</cds-table-row>
        <cds-table-expanded-row>
          Expandable row content
        </cds-table-expanded-row>`,
    imports: [
      "import '@carbon/web-components/es/components/data-table/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4547-163221&t=5C1lVaCoSygb13J1-4',
  {
    variant: { 'Select type': 'Checkbox' },
    props: {
      children: figma.children('Col*'),
    },
    example: (props) =>
      html`<cds-table-row selection-name="row"
        >${props.children}</cds-table-row
      >`,
    imports: [
      "import '@carbon/web-components/es/components/data-table/index.js'",
    ],
  }
);

// Radio variant for table-row renders the same as checkbox because `radio` attribute comes from
// the parent `<cds-table>`
figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4547-163221&t=5C1lVaCoSygb13J1-4',
  {
    variant: { 'Select type': 'Radio button' },
    props: {
      children: figma.children('Col*'),
    },
    example: (props) =>
      html`<cds-table-row selection-name="row"
        >${props.children}</cds-table-row
      >`,
    imports: [
      "import '@carbon/web-components/es/components/data-table/index.js'",
    ],
  }
);
