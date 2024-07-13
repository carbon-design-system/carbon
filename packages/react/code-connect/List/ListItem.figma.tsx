/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ListItem } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  ListItem,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3284-27542&t=Y6lD1uj5Q0yszbgL-4',
  {
    props: {
      children: figma.string('List text'),
    },
    example: ({ children }) => <ListItem>{children}</ListItem>,
  }
);
