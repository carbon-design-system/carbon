/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  unstable__FluidSearch as FluidSearch,
  unstable__FluidSearchSkeleton as FluidSearchSkeleton,
} from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  FluidSearch,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=15503-270751&t=6KMXKibN414b97hv-4',
  {
    props: {
      placeholder: figma.string('Placeholder text'),
      labelText: figma.string('Label text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: ({ placeholder, labelText, disabled }) => (
      <FluidSearch
        placeholder={placeholder}
        labelText={labelText}
        disabled={disabled}
      />
    ),
  }
);

figma.connect(
  FluidSearchSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=15503-270751&t=6KMXKibN414b97hv-4',
  {
    variant: { State: 'Skeleton' },
    example: () => <FluidSearchSkeleton />,
  }
);
