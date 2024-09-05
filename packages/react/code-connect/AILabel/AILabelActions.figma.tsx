/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { AILabelActions } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  AILabelActions,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=57561-3559&t=SB9qULZbn3FRopvU-4',
  {
    props: {
      children: figma.children('*'),
    },
    example: ({ children }) => <AILabelActions>{children}</AILabelActions>,
  }
);
