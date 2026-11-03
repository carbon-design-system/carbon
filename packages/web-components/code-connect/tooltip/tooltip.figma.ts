// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=3684-40507&t=Z5rlxC6sD11qtIsk-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/tooltip/tooltip.ts
// component=cds-tooltip

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderStringAttribute } from '../template-helpers';

const instance = figma.selectedInstance;
const align = instance.getEnum('Position', {
  Top: instance.getEnum('Alignment', {
    Start: 'top-start',
    Center: 'top',
    End: 'top-end',
  }),
  Bottom: instance.getEnum('Alignment', {
    Start: 'bottom-start',
    Center: 'bottom',
    End: 'bottom-end',
  }),
  Left: 'left',
  Right: 'right',
});

const tooltipContent = instance.findInstance('Tooltip content');
const labelLayer =
  tooltipContent.type !== 'ERROR'
    ? tooltipContent.findText('Tooltip text')
    : null;
const label =
  labelLayer && labelLayer.type !== 'ERROR'
    ? labelLayer.textContent
    : undefined;

function createTemplate() {
  const isDefinition = instance.getEnum('Type', {
    Definition: true,
  });

  if (isDefinition) {
    const item = instance.findInstance('_Tooltip definition item');
    const childrenLayer =
      item.type !== 'ERROR' ? item.findText('Definition tooltip') : null;
    const children =
      childrenLayer && childrenLayer.type !== 'ERROR'
        ? childrenLayer.textContent
        : undefined;

    return {
      id: 'cds-definition-tooltip',
      imports: [
        "import '@carbon/web-components/es/components/tooltip/definition-tooltip.js'",
      ],
      example: figma.code`<cds-definition-tooltip${renderStringAttribute(
        'align',
        align
      )}>
  <span slot="definition">${label}</span>
  ${children}
</cds-definition-tooltip>`,
      metadata: { nestable: true },
    };
  }

  const trigger = instance
    .getInstanceSwap('Trigger')
    ?.executeTemplate().example;

  return {
    id: 'cds-tooltip',
    imports: [
      "import '@carbon/web-components/es/components/tooltip/tooltip.js'",
      "import '@carbon/web-components/es/components/tooltip/tooltip-content.js'",
    ],
    example: figma.code`<cds-tooltip${renderStringAttribute('align', align)}>
  <button type="button" aria-labelledby="content">${trigger}</button>
  <cds-tooltip-content id="content">${label}</cds-tooltip-content>
</cds-tooltip>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
