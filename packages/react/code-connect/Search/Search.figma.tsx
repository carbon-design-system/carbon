/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { Search, ExpandableSearch, TextInputSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Search,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2805-21056&t=6KMXKibN414b97hv-4',
  {
    props: {
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      placeholder: figma.string('Placeholder text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: ({ size, placeholder, disabled }) => (
      // Disclaimer: Code Connect is currently in beta and integration with Carbon
      // React is in an exploratory phase. Code sample below may be incomplete.
      <Search size={size} placeholder={placeholder} disabled={disabled} />
    ),
  }
);

figma.connect(
  ExpandableSearch,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2805-21056&t=6KMXKibN414b97hv-4',
  {
    variant: { Expanded: 'True' }, //  <--doesn't work
    props: {
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      placeholder: figma.string('Placeholder text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: ({ size, placeholder, disabled }) => (
      // Disclaimer: Code Connect is currently in beta and integration with Carbon
      // React is in an exploratory phase. Code sample below may be incomplete.
      <ExpandableSearch
        size={size}
        placeholder={placeholder}
        disabled={disabled}
      />
    ),
  }
);

figma.connect(
  TextInputSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2805-21056&t=6KMXKibN414b97hv-4',
  {
    variant: { State: 'Skeleton' },
    example: () => (
      // Disclaimer: Code Connect is currently in beta and integration with Carbon
      // React is in an exploratory phase. Code sample below may be incomplete.
      <TextInputSkeleton hideLabel />
    ),
  }
);
