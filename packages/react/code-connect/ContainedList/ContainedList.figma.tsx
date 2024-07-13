/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { ContainedList } from '@carbon/react';
import figma from '@figma/code-connect';
import { title } from 'process';

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
        Default: '<OverflowMenu/> (code not fully connected with code connect)',
        'Filterable search': figma.children(['Search - Default']),
      }),
    }),
    label: figma.boolean('Tooltip', {
      // true: figma.string('List title text') + figma.children('Tooltip'), //https://github.com/figma/code-connect/issues/92
      true: figma.string('List title text'),
      false: figma.string('List title text'),
    }),
    tooltip: figma.children('Tooltip'),
  }),
  rowItem: figma.nestedProps('_Contained list row item', {
    size: figma.enum('Size', {
      'Extra large': 'xl',
      Medium: 'md',
      Small: 'sm',
    }),
  }),
  // Need a way to display a variant restriction from nestedProps
  // so that we can display this component for actions if Action type is
  // Filterable search or not
  // https://github.com/figma/code-connect/issues/91
  //
  // or combine boolean with nestedProps
  // https://github.com/figma/code-connect/issues/89
  //
  // titleActions: figma.nestedProps('Actions', {
  //   action: figma.enum('Action', {
  //     'Overflow menu': figma.children('Overflow'),
  //     'Ghost icon button': figma.children('Button'),
  //     'Primary icon button': figma.children('Button'),
  //     Link: figma.children('Link'),
  //     Tag: figma.children('Tag'),
  //   }),
  // }),
};

figma.connect(
  ContainedList,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16193-272726&t=cMvnFTYLPEhzhIpj-4',
  {
    props: sharedContainedListProps,
    example: ({ children, kind, titleItem, rowItem }) => (
      <ContainedList
        label={titleItem.label}
        kind={kind}
        size={rowItem.size}
        action={titleItem.action}>
        {children}
      </ContainedList>
    ),
  }
);

WithPersistentSearch;
figma.connect(
  ContainedList,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16193-272726&t=cMvnFTYLPEhzhIpj-4',
  {
    variant: { Search: 'True' },
    props: sharedContainedListProps,
    example: ({ children, kind, titleItem, rowItem, search }) => (
      <ContainedList
        label={titleItem.label}
        kind={kind}
        size={rowItem.size}
        action={titleActions.action}>
        {search}
        {children}
      </ContainedList>
    ),
  }
);
