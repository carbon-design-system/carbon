/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

const sharedTableProps = {
  slot: figma.boolean('Slot', {
    true: figma.instance('Swap slot'),
  }),
  toolbar: figma.boolean('Toolbar', {
    true: figma.children(['Data table toolbar item']),
  }),
  pagination: figma.boolean('Pagination', {
    true: figma.children(['Pagination - Table bar']),
  }),
  headerItem: figma.nestedProps('Data table header item', {
    description: figma.boolean('Description', {
      true: figma.string('Description text'),
    }),
    title: figma.string('Title text'),
  }),
  headerRow: figma.nestedProps('Data table header row item', {
    size: figma.enum('Size', {
      'Extra large': 'xl',
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
      'Extra small': 'xs',
    }),
    children: figma.children('Col*'),
  }),
  rowItems: figma.boolean('Body', {
    true: figma.children(['Data table body row item']),
  }),
};

figma.connect(
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4630-268268&mode=design&t=dSt5NCwcWajIQZR7-4',
  {
    props: sharedTableProps,
    example: (props) =>
      html`<cds-table size=${props.headerRow.size}>
        <cds-table-header-title slot="title"
          >${props.headerItem.title}</cds-table-header-title
        >
        <cds-table-header-description slot="description"
          >${props.headerItem.description}</cds-table-header-description
        >
        ${props.toolbar}
        <cds-table-head>
          <cds-table-header-row
            >${props.headerRow.children}</cds-table-header-row
          >
        </cds-table-head>
        <cds-table-body>${props.rowItems}</cds-table-body>
        ${props.pagination} ${props.slot}
      </cds-table>`,
    imports: [
      "import '@carbon/web-components/es/components/data-table/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4630-268268&mode=design&t=dSt5NCwcWajIQZR7-4',
  {
    variant: { Type: 'Expandable' },
    props: sharedTableProps,
    example: (props) =>
      html`<cds-table expandable size=${props.headerRow.size}>
        <cds-table-header-title slot="title"
          >${props.headerItem.title}</cds-table-header-title
        >
        <cds-table-header-description slot="description"
          >${props.headerItem.description}</cds-table-header-description
        >
        ${props.toolbar}
        <cds-table-head>
          <cds-table-header-row
            >${props.headerRow.children}</cds-table-header-row
          >
        </cds-table-head>
        <cds-table-body>${props.rowItems}</cds-table-body>
        ${props.pagination} ${props.slot}
      </cds-table>`,
    imports: [
      "import '@carbon/web-components/es/components/data-table/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4630-268268&mode=design&t=dSt5NCwcWajIQZR7-4',
  {
    variant: { Type: 'Select checkbox' },
    props: sharedTableProps,
    example: (props) =>
      html`<cds-table is-selectable size=${props.headerRow.size}>
        <cds-table-header-title slot="title"
          >${props.headerItem.title}</cds-table-header-title
        >
        <cds-table-header-description slot="description"
          >${props.headerItem.description}</cds-table-header-description
        >
        ${props.toolbar}
        <cds-table-head>
          <cds-table-header-row selection-name="header"
            >${props.headerRow.children}</cds-table-header-row
          >
        </cds-table-head>
        <cds-table-body>${props.rowItems}</cds-table-body>
        ${props.pagination} ${props.slot}
      </cds-table>`,
    imports: [
      "import '@carbon/web-components/es/components/data-table/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4630-268268&mode=design&t=dSt5NCwcWajIQZR7-4',
  {
    variant: { Type: 'Select radio' },
    props: sharedTableProps,
    example: (props) =>
      html`<cds-table is-selectable radio size=${props.headerRow.size}>
        <cds-table-header-title slot="title"
          >${props.headerItem.title}</cds-table-header-title
        >
        <cds-table-header-description slot="description"
          >${props.headerItem.description}</cds-table-header-description
        >
        ${props.toolbar}
        <cds-table-head>
          <cds-table-header-row
            >${props.headerRow.children}</cds-table-header-row
          >
        </cds-table-head>
        <cds-table-body>${props.rowItems}</cds-table-body>
        ${props.pagination} ${props.slot}
      </cds-table>`,
    imports: [
      "import '@carbon/web-components/es/components/data-table/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4630-268268&mode=design&t=dSt5NCwcWajIQZR7-4',
  {
    variant: { Type: 'Expandable + Selectable' },
    props: sharedTableProps,
    example: (props) =>
      html`<cds-table expandable is-selectable size=${props.headerRow.size}>
        <cds-table-header-title slot="title"
          >${props.headerItem.title}</cds-table-header-title
        >
        <cds-table-header-description slot="description"
          >${props.headerItem.description}</cds-table-header-description
        >
        ${props.toolbar}
        <cds-table-head>
          <cds-table-header-row selection-name="header"
            >${props.headerRow.children}</cds-table-header-row
          >
        </cds-table-head>
        <cds-table-body>${props.rowItems}</cds-table-body>
        ${props.pagination} ${props.slot}
      </cds-table>`,
    imports: [
      "import '@carbon/web-components/es/components/data-table/index.js'",
    ],
  }
);
