/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=11797-285083&t=FNMM9qlCorQ1hEnC-4',
  {
    props: {
      isCondensed: figma.enum('Size', {
        Condensed: true,
      }),
      headerRowItems: figma.children(['_Structured list header row item']),
      isFlush: figma.boolean('Flush'),
      rowItems: figma.children(['_Structured list row item']),
    },
    example: (props) =>
      html`<cds-structured-list
        condensed=${props.isCondensed}
        flush=${props.isFlush}>
        <cds-structured-list-head>
          ${props.headerRowItems}
        </cds-structured-list-head>
        <cds-structured-list-body>${props.rowItems}</cds-structured-list-body>
      </cds-structured-list>`,
    imports: [
      "import '@carbon/web-components/es/components/structured-list/index.js'",
    ],
  }
);

// selectable
figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=61653-7458&t=RuAO38H8L12JZXpK-4',
  {
    props: {
      isCondensed: figma.enum('Size', {
        Condensed: true,
      }),
      headerRowItems: figma.children(['_Structured list header row item']),
      rowItems: figma.children(['_Structured list row item - Selectable']),
    },
    example: (props) =>
      html`<cds-structured-list
        selection-name="structured-list-selection"
        condensed=${props.isCondensed}>
        <cds-structured-list-head>
          ${props.headerRowItems}
        </cds-structured-list-head>
        <cds-structured-list-body>${props.rowItems}</cds-structured-list-body>
      </cds-structured-list>`,
    imports: [
      "import '@carbon/web-components/es/components/structured-list/index.js'",
    ],
  }
);

// ROWS
// header row
figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=11809-286209&t=FNMM9qlCorQ1hEnC-4',
  {
    props: {
      children: figma.children('Col*'),
    },
    example: (props) =>
      html`<cds-structured-list-header-row>
        ${props.children}
      </cds-structured-list-header-row>`,
    imports: [
      "import '@carbon/web-components/es/components/structured-list/index.js'",
    ],
  }
);

// row
figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=61634-3169&t=FNMM9qlCorQ1hEnC-4',
  {
    props: {
      children: figma.children('Col*'),
    },
    example: (props) =>
      html`<cds-structured-list-row>
        ${props.children}
      </cds-structured-list-row>`,
    imports: [
      "import '@carbon/web-components/es/components/structured-list/index.js'",
    ],
  }
);

// selectable header row
figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=61634-2136&t=RuAO38H8L12JZXpK-4',
  {
    props: {
      children: figma.children('Col*'),
    },
    example: (props) =>
      html`<cds-structured-list-header-row>
        ${props.children}
      </cds-structured-list-header-row>`,
    imports: [
      "import '@carbon/web-components/es/components/structured-list/index.js'",
    ],
  }
);

// selectable row
figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=11803-290100&t=RuAO38H8L12JZXpK-4',
  {
    props: {
      children: figma.children('Col*'),
    },
    example: (props) =>
      html`<cds-structured-list-row
        selection-value="structured-list-selection-0">
        ${props.children}
      </cds-structured-list-row>`,
    imports: [
      "import '@carbon/web-components/es/components/structured-list/index.js'",
    ],
  }
);

// CELLS
// header cell
figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=11871-287656&t=FNMM9qlCorQ1hEnC-4',
  {
    props: {
      children: figma.string('Header text'),
    },
    example: (props) =>
      html`<cds-structured-list-header-cell>
        ${props.children}
      </cds-structured-list-header-cell>`,
    imports: [
      "import '@carbon/web-components/es/components/structured-list/index.js'",
    ],
  }
);

// cell
figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=11801-289539&t=RuAO38H8L12JZXpK-4',
  {
    props: {
      children: figma.string('Row text'),
    },
    example: (props) =>
      html`<cds-structured-list-cell>
        ${props.children}
      </cds-structured-list-cell>`,
    imports: [
      "import '@carbon/web-components/es/components/structured-list/index.js'",
    ],
  }
);
