/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { AccordionItem } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  AccordionItem,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=2154-8478&mode=design&t=0hF8pirV0i9mofd1-4',
  {
    props: {
      title: figma.string('Title text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      open: figma.boolean('Expanded'),
      content: figma.string('Content text'),
      children: figma.instance('Swap slot'),
    },
    example: ({ title, disabled, open, content, children }) => (
      <AccordionItem title={title} disabled={disabled} open={open}>
        <p>{content}</p>
        {children}
      </AccordionItem>
    ),
  }
);

// figma.connect(
//   AccordionSkeleton,
//   'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=14032-290635&mode=dev',
//   {
//     variant: { State: 'Skeleton' },
//     props: {
//       open: figma.boolean('Expanded'),
//       isFlush: figma.boolean('Flush'),
//       align: figma.enum('Alignment', {
//       Left: 'start',
//     }),
//     },
//     example: ({ size, hideLabel }) => {
//       return <AccordionSkeleton align={align}  />;
//     },
//   }
// );
