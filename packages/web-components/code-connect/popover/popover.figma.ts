/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
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
    example: (props) =>
      html`<cds-popover
        align=${props.align}
        caret=${props.popoverItem.caret}
        dropshadow=${props.popoverItem.dropShadow}
        open=${props.open}>
        <button type="button">Open popover</button>
        <cds-popover-content>${props.popoverItem.children}</cds-popover-content>
      </cds-popover>`,
    imports: ["import '@carbon/web-components/es/components/popover/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=9826-402965&t=SbIuH3RAJeFPjXmN-4',
  {
    props: {
      align: figma.enum('Alignment', {
        Start: 'bottom-start',
        End: 'bottom-end',
      }),
      open: figma.boolean('Open'),
      dropShadow: figma.boolean('Shadow'),
      popoverItem: figma.nestedProps('Popover item', {
        children: figma.instance('Swap slot'),
      }),
    },
    example: (props) =>
      html`<cds-popover
        align=${props.align}
        dropshadow=${props.dropShadow}
        open=${props.open}
        tabtip>
        <button type="button">Open tab tip</button>
        <cds-popover-content>${props.popoverItem.children}</cds-popover-content>
      </cds-popover>`,
    imports: ["import '@carbon/web-components/es/components/popover/index.js'"],
  }
);
