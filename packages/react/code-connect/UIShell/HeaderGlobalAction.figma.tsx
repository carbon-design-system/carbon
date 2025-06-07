/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { HeaderGlobalAction } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  HeaderGlobalAction,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2133-10716&t=A3oys5odsvKkcDFA-4',
  {
    props: {
      children: figma.instance('Swap icon'),
      isActive: figma.enum('State', {
        Active: true,
      }),
    },
    example: ({ children, isActive }) => (
      <HeaderGlobalAction isActive={isActive} onClick={() => {}}>
        {children}
      </HeaderGlobalAction>
    ),
  }
);
