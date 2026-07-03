/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
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
    example: (props) =>
      html`<cds-tooltip align=${props.align}>
        <button type="button" aria-labelledby="content">
          ${props.trigger}
        </button>
        <cds-tooltip-content id="content">
          ${props.tooltip.label}
        </cds-tooltip-content>
      </cds-tooltip>`,
    imports: ["import '@carbon/web-components/es/components/tooltip/index.js'"],
  }
);
