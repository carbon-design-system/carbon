/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { Pagination } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Pagination,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3889-50204&t=gkzO9FaEPqewqYn6-4',
  {
    props: {
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
    },
    example: ({ size }) => (
      <Pagination
        size={size}
        backwardText="Previous page"
        forwardText="Next page"
        itemsPerPageText="Items per page:"
        onChange={function noRefCheck() {}}
        page={1}
        pageSize={10}
        pageSizes={[10, 20, 30, 40, 50]}
        totalItems={103}
      />
    ),
  }
);
