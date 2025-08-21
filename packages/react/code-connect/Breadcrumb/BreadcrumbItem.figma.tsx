/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { BreadcrumbItem, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  BreadcrumbItem,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3136-29234&t=U57NnoohldL54XAl-4',
  {
    variant: { Type: 'Link' },
    props: {
      // state: figma.enum('State', { // in react skeleton state replaces the entire Breadcrumb component , not BreadcrumbItem
      //   Skeleton: 'skeleton',
      // }),
      children: figma.string('Text'),
    },
    example: ({ children }) => (
      <BreadcrumbItem href="#">{children}</BreadcrumbItem>
    ),
  }
);

figma.connect(
  BreadcrumbItem,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3136-29234&t=U57NnoohldL54XAl-4',
  {
    variant: { State: 'Current' },
    props: {
      children: figma.string('Text'),
      isCurrentPage: figma.boolean('Current'),
    },
    example: ({ children, isCurrentPage }) => (
      <BreadcrumbItem isCurrentPage={isCurrentPage}>{children}</BreadcrumbItem>
    ),
  }
);

figma.connect(
  BreadcrumbItem,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3136-29234&t=U57NnoohldL54XAl-4',
  {
    variant: { Type: 'Overflow' },
    props: {
      isCurrentPage: figma.boolean('Current'),
    },
    example: ({ isCurrentPage }) => (
      <BreadcrumbItem
        isCurrentPage={isCurrentPage}
        data-floating-menu-container>
        <OverflowMenu aria-label="Overflow menu in a breadcrumb">
          <OverflowMenuItem itemText="Breadcrumb 3" />
          <OverflowMenuItem itemText="Breadcrumb 4" />
        </OverflowMenu>
      </BreadcrumbItem>
    ),
  }
);
