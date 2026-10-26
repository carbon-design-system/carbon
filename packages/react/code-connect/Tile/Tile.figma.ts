// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=20125-279432&m=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Tile/Tile.tsx
// component=Tile

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;

function createTemplate() {
  const type = instance.getEnum('Type', {
    Base: 'base',
    Clickable: 'clickable',
    'Single-select': 'single-select',
    'Multi-select': 'multi-select',
    Expandable: 'expandable',
    'Expandable (Interactive)': 'expandable-interactive',
  });
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const selected = instance.getBoolean('Selected');
  const titleText = instance.getBoolean('Title')
    ? instance.getString('Title text')
    : undefined;
  const descriptionText = instance.getBoolean('Description')
    ? instance.getString('Description text')
    : undefined;
  const swapSlot = instance.getBoolean('Slot')
    ? instance.getInstanceSwap('Swap slot')?.executeTemplate().example
    : undefined;

  const body = figma.code`${figma.helpers.react.renderChildren(titleText)}${
    descriptionText
      ? figma.code`
  <br />
  ${figma.helpers.react.renderChildren(descriptionText)}`
      : ''
  }${
    swapSlot
      ? figma.code`
  ${figma.helpers.react.renderChildren(swapSlot)}`
      : ''
  }`;

  if (type === 'clickable') {
    return {
      id: 'ClickableTile',
      imports: ["import { ClickableTile } from '@carbon/react';"],
      example: figma.code`<ClickableTile href="#"${figma.helpers.react.renderProp(
        'disabled',
        disabled
      )}>
  ${body}
</ClickableTile>`,
      metadata: { nestable: true },
    };
  }

  if (type === 'single-select' || type === 'multi-select') {
    return {
      id: 'SelectableTile',
      imports: ["import { SelectableTile } from '@carbon/react';"],
      example: figma.code`<SelectableTile id="tile-1"${figma.helpers.react.renderProp(
        'selected',
        selected
      )}${figma.helpers.react.renderProp('disabled', disabled)}>
  ${body}
</SelectableTile>`,
      metadata: { nestable: true },
    };
  }

  if (type === 'expandable' || type === 'expandable-interactive') {
    return {
      id: 'ExpandableTile',
      imports: [
        "import { ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent } from '@carbon/react';",
      ],
      example: figma.code`<ExpandableTile
  tileCollapsedIconText="Interact to Expand tile"
  tileExpandedIconText="Interact to Collapse tile">
  <TileAboveTheFoldContent>
    <div style={{ height: '200px' }}>
      ${body}
    </div>
  </TileAboveTheFoldContent>
  <TileBelowTheFoldContent>
    <div style={{ height: '400px' }}>Below the fold content here</div>
  </TileBelowTheFoldContent>
</ExpandableTile>`,
      metadata: { nestable: true },
    };
  }

  return {
    id: 'Tile',
    imports: ["import { Tile } from '@carbon/react';"],
    example: figma.code`<Tile>
  ${body}
</Tile>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
