/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

const sharedContainedListProps = {
  children: figma.children(['_Contained list row item']),
  search: figma.children(['Search - Default']),
  kind: figma.enum('Type', {
    'On page': 'on-page',
    Disclosed: 'disclosed',
  }),
  titleItem: figma.nestedProps('_Contained list title item', {
    action: figma.boolean('Show action', {
      true: figma.enum('Action type', {
        Default: figma.children(['Overflow']),
        'Filterable search': figma.children(['Search - Default']),
      }),
    }),
    label: figma.boolean('Tooltip', {
      // true: figma.string('List title text') + figma.children('Tooltip'), //https://github.com/figma/code-connect/issues/92
      true: figma.string('List title text'),
      false: figma.string('List title text'),
    }),
  }),
  rowItem: figma.nestedProps('_Contained list row item', {
    size: figma.enum('Size', {
      'Extra large': 'xl',
      Medium: 'md',
      Small: 'sm',
    }),
  }),
};

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16193-272726&t=cMvnFTYLPEhzhIpj-4',
  {
    props: sharedContainedListProps,
    example: (props) =>
      html`<cds-contained-list
        label=${props.titleItem.label}
        kind=${props.kind}
        size=${props.rowItem.size}>
        ${props.titleItem.action} ${props.children}
      </cds-contained-list>`,
    imports: [
      "import '@carbon/web-components/es/components/contained-list/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16193-272726&t=cMvnFTYLPEhzhIpj-4',
  {
    variant: { Search: 'True' },
    props: sharedContainedListProps,
    example: (props) =>
      html`<cds-contained-list
        label=${props.titleItem.label}
        kind=${props.kind}
        size=${props.rowItem.size}>
        ${props.titleItem.action} ${props.search} ${props.children}
      </cds-contained-list>`,
    imports: [
      "import '@carbon/web-components/es/components/contained-list/index.js'",
    ],
  }
);
