/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { Popover, PopoverContent } from '@carbon/react';
import { Settings } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Popover,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=9125-400576&t=SbIuH3RAJeFPjXmN-4',
  {
    props: {
      align: figma.enum('Position', {
        Top: figma.enum('Alignment', {
          Start: 'top-start',
          Center: 'top',
          End: 'top-end',
        }),
        Bottom: figma.enum('Alignment', {
          Start: 'bottom-start',
          Center: 'bottom',
          End: 'bottom-end',
        }),
        Left: 'left',
        Right: 'right',
      }),
      open: figma.boolean('Visible'),
      popoverItem: figma.nestedProps('Popover item', {
        caret: figma.boolean('Caret tip'),
        children: figma.instance('Swap slot'),
        dropShadow: figma.boolean('Shadow'),
      }),
    },
    example: ({ align, open, popoverItem }) => {
      const [open, setOpen] = React.useState(false);
      return (
        <Popover
          align={align}
          open={open}
          caret={popoverItem.caret}
          dropShadow={popoverItem.dropShadow}>
          <button
            type="button"
            onClick={() => {
              setOpen(!open);
            }}>
            <Settings />
          </button>
          <PopoverContent>{popoverItem.children}</PopoverContent>
        </Popover>
      );
    },
  }
);

//tab tip
figma.connect(
  Popover,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=9826-402965&t=SbIuH3RAJeFPjXmN-4',
  {
    props: {
      align: figma.enum('Alignment', {
        Start: 'start',
        End: 'end',
      }),
      open: figma.boolean('Open'),
      dropShadow: figma.boolean('Shadow'),
      popoverItem: figma.nestedProps('Popover item', {
        children: figma.instance('Swap slot'),
      }),
    },
    example: ({ align, open, dropShadow, popoverItem }) => {
      const [open, setOpen] = React.useState(false);
      return (
        <Popover isTabTip align={align} open={open} dropShadow={dropShadow}>
          <button
            type="button"
            onClick={() => {
              setOpen(!open);
            }}>
            <Settings />
          </button>
          <PopoverContent>{popoverItem.children}</PopoverContent>
        </Popover>
      );
    },
  }
);
