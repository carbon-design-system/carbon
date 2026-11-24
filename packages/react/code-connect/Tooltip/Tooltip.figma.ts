// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=3684-40507&t=Z5rlxC6sD11qtIsk-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Tooltip/Tooltip.tsx
// component=Tooltip

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

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
      id: 'DefinitionTooltip',
      imports: ["import { DefinitionTooltip } from '@carbon/react';"],
      example: figma.code`<DefinitionTooltip
  openOnHover${figma.helpers.react.renderProp(
    'definition',
    label
  )}${figma.helpers.react.renderProp(
    'align',
    align
  )}>${figma.helpers.react.renderChildren(children)}</DefinitionTooltip>`,
      metadata: { nestable: true },
    };
  }

  const trigger = instance
    .getInstanceSwap('Trigger')
    ?.executeTemplate().example;

  return {
    id: 'Tooltip',
    imports: ["import { Tooltip } from '@carbon/react';"],
    example: figma.code`<Tooltip${figma.helpers.react.renderProp(
      'label',
      label
    )}${figma.helpers.react.renderProp('align', align)}>
  <button className="sb-tooltip-trigger" type="button">
    ${figma.helpers.react.renderChildren(trigger)}
  </button>
</Tooltip>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
