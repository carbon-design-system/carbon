/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { ContainedList } from '@carbon/react';
// import { TitleProps } from ''; // fake component
import figma from '@figma/code-connect';

const sharedContainedListProps = {
  titleChild: figma.children(['_Contained list title item']),
  children: figma.children(['_Contained list row item']),
  searchChild: figma.children(['Search - Default']),
  kind: figma.enum('Type', {
    'On page': 'on-page',
    Disclosed: 'disclosed',
  }),

  titleItem: figma.nestedProps('_Contained list title item', {
    label: figma.string('List title text'),
    size: figma.enum('Size', {
      'Large + Extra large': 'lg',
      Medium: 'md',
      Small: 'sm',
      'Default (disclosed)': 'default--disclosed-',
    }),
    // showaction: figma.boolean('Value', {
    //   true: '',
    //   false: true,
    // }),

    tooltip: figma.boolean('Tooltip'),
    // style: figma.enum('Style', {
    //   'On page': 'on-page',
    //   Disclosed: 'disclosed',
    // }),

    // action: figma.enum('Action type', {
    //   Default: '<div>stuf</div>',
    //   'Filterable search': (
    //     // view configuration docs in storybook
    //     // https://react.carbondesignsystem.com/?path=/docs/components-containedlist--overview
    //     <ExpandableSearch
    //       placeholder="Filterable search"
    //       closeButtonLabelText="Clear search input"
    //       size="lg"
    //     />
    //   ),
    // }),

    expandfilterablesearch: figma.boolean('Expand filterable search'),
  }),

  search: figma.boolean('Search'), // todo: set up as a variant
};

// figma.connect(
//   TitleProps,
//   'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16193-272755&t=Imym692WuSKiAweW-4',
//   {
//     props: {
//       showaction: figma.boolean('Value', {
//         true: '',
//         false: true,
//       }),
//       listtitletext: figma.string('List title text'),
//       tooltip: figma.boolean('Tooltip'),
//       style: figma.enum('Style', {
//         'On page': 'on-page',
//         Disclosed: 'disclosed',
//       }),
//       size: figma.enum('Size', {
//         'Large + Extra large': 'large---extra-large',
//         Medium: 'medium',
//         Small: 'small',
//         'Default (disclosed)': 'default--disclosed-',
//       }),
//       actiontype: figma.enum('Action type', {
//         Default: 'default',
//         'Filterable search': 'filterable-search',
//       }),
//       expandfilterablesearch: figma.boolean('Expand filterable search'),
//     },
//     example: (props) => <div>actions here</div>,
//   }
// );

figma.connect(
  ContainedList,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16193-272726&t=cMvnFTYLPEhzhIpj-4',
  {
    props: sharedContainedListProps,
    example: ({ children, kind, titleItem, titleChild }) => (
      // Code Connect integration for Carbon React is in an exploratory phase.
      // Code sample below may be incomplete.
      <ContainedList
        label={titleItem.label}
        kind={kind}
        size={titleItem.size}
        action={titleChild}>
        {children}
      </ContainedList>
    ),
  }
);

// WithPersistentSearch
figma.connect(
  ContainedList,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16193-272726&t=cMvnFTYLPEhzhIpj-4',
  {
    variant: { Search: 'True' },
    props: sharedContainedListProps,
    example: ({ children, kind, titleItem, titleChild, searchChild }) => (
      // Code Connect integration for Carbon React is in an exploratory phase.
      // Code sample below may be incomplete.
      <ContainedList
        label={titleItem.label}
        kind={kind}
        size={titleItem.size}
        action={titleChild}>
        {searchChild}
        {children}
      </ContainedList>
    ),
  }
);
