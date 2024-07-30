/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { Toggletip, ToggletipLabel, ToggletipButton } from '@carbon/react';
import { Information } from '@carbon/icons-react';
import figma from '@figma/code-connect';

figma.connect(
  Toggletip,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=9384-402406&t=DU9vCm0ie6tvQBsY-4',
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
      toggletip: figma.nestedProps('Toggletip body', {
        content: figma.textContent('Toggletip text'),
        link: figma.children('Link'),
        button: figma.children('Button'),
      }),
      // information: figma.instance('Information'), look at this once icons are connected
    },
    example: ({ align, toggletip }) => (
      <>
        <ToggletipLabel>Toggletip label</ToggletipLabel>

        <Toggletip>
          <ToggletipButton label="Show information">
            <Information />
          </ToggletipButton>
          <ToggletipContent>
            <p>{toggletip.content}</p>
            <ToggletipActions>
              {toggletip.link}
              {toggletip.button}
            </ToggletipActions>
          </ToggletipContent>
        </Toggletip>
      </>
    ),
  }
);
