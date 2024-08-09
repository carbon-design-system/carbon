/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { PaginationNav } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  PaginationNav,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2799-20761&t=gkzO9FaEPqewqYn6-4',
  {
    example: () => <PaginationNav itemsShown={7} totalItems={30} />,
  }
);
