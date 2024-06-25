/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { Loading, InlineLoading } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Loading,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3238-28455&t=Y6lD1uj5Q0yszbgL-4',
  {
    props: {
      small: figma.enum('Size', {
        Small: true,
      }),
    },
    example: ({ small }) => (
      // Disclaimer: Code Connect is currently in beta and integration with Carbon
      // React is in an exploratory phase. Code sample below may be incomplete.
      <Loading withOverlay={false} small={small} />
    ),
  }
);

figma.connect(
  InlineLoading,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3238-28455&t=Y6lD1uj5Q0yszbgL-4',
  {
    variant: { Size: 'Inline' },
    props: {
      description: figma.textContent('Loading message'),
      status: figma.enum('State', {
        Active: 'active',
        Error: 'error',
        Finished: 'finished',
        Inactive: 'inactive',
      }),
    },
    example: ({ status, description }) => (
      // Disclaimer: Code Connect is currently in beta and integration with Carbon
      // React is in an exploratory phase. Code sample below may be incomplete.
      <InlineLoading
        iconDescription="Loading"
        status={status}
        description={description}
      />
    ),
  }
);
