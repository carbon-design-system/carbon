/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { DefinitionTooltip, Tooltip } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Tooltip,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3684-40507&t=Z5rlxC6sD11qtIsk-4',
  {
    variant: { Type: 'Standard' },
    props: {
      trigger: figma.instance('Trigger'),
      tooltip: figma.nestedProps('Tooltip content', {
        label: figma.textContent('Tooltip text'),
      }),
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
    },
    example: ({ trigger, tooltip, ...props }) => (
      <Tooltip label={tooltip.label} {...props}>
        <button className="sb-tooltip-trigger" type="button">
          {trigger}
        </button>
      </Tooltip>
    ),
  }
);

figma.connect(
  DefinitionTooltip,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3684-40507&t=Z5rlxC6sD11qtIsk-4',
  {
    variant: { Type: 'Definition' },
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
      item: figma.nestedProps('_Tooltip definition item', {
        children: figma.textContent('Definition tooltip'),
      }),
      tooltip: figma.nestedProps('Tooltip content', {
        definition: figma.textContent('Tooltip text'),
      }),
    },
    example: ({ item, tooltip, align }) => (
      <DefinitionTooltip
        openOnHover
        definition={tooltip.definition}
        align={align}>
        {item.children}
      </DefinitionTooltip>
    ),
  }
);
