/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ProgressIndicator } from '@carbon/react';
// import { ProgressIndicatorSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  ProgressIndicator,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3925-58667&m=dev',
  {
    props: {
      children: figma.children(['_Progress indicator item']),
      vertical: figma.enum('Direction', {
        Vertical: true,
      }),
    },
    example: ({ children, vertical }) => (
      <ProgressIndicator vertical={vertical}>{children}</ProgressIndicator>
    ),
  }
);

// figma.connect(
//   ProgressIndicatorSkeleton,
//   'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3925-58667&m=dev',
//   {
//     variant: need nested variant selector here, https://github.com/figma/code-connect/issues/91
//     props: {
//       vertical: figma.enum('Direction', {
//         Vertical: true,
//       }),
//     },
//     example: ({ children, vertical }) => (
//       <ProgressIndicatorSkeleton vertical={vertical} />
//     ),
//   }
// );
