/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { UnorderedList, OrderedList } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  UnorderedList,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3284-27553&t=Y6lD1uj5Q0yszbgL-4',
  {
    variant: { Type: 'Unordered' },
    props: { children: figma.children(['_List item']) },
    example: ({ children }) => (
      // Disclaimer: Code Connect is currently in beta and integration with Carbon
      // React is in an exploratory phase. Code sample below may be incomplete.
      <UnorderedList>{children}</UnorderedList>
    ),
  }
);

figma.connect(
  OrderedList,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3284-27553&t=Y6lD1uj5Q0yszbgL-4',
  {
    variant: { Type: 'Ordered' },
    props: { children: figma.children(['_List item']) },
    example: ({ children }) => (
      // Disclaimer: Code Connect is currently in beta and integration with Carbon
      // React is in an exploratory phase. Code sample below may be incomplete.
      <OrderedList>{children}</OrderedList>
    ),
  }
);
