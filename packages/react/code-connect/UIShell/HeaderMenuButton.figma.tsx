/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { HeaderMenuButton } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  HeaderMenuButton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2213-15047&t=A3oys5odsvKkcDFA-4',
  {
    props: {
      isActive: figma.boolean('Open'),
    },
    example: ({ isActive }) => (
      <HeaderMenuButton
        aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
        onClick={() => {}}
        isActive={isActive}
        aria-expanded={isActive}
      />
    ),
  }
);
