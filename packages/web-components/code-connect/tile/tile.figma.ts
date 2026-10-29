// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=20125-279432&m=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/tile/tile.ts
// component=cds-tile

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderBooleanAttribute } from '../template-helpers';

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

  const body = figma.code`${titleText ?? ''}${
    descriptionText ? figma.code`<br />${descriptionText}` : ''
  }${swapSlot ?? ''}`;

  if (type === 'clickable') {
    return {
      id: 'cds-clickable-tile',
      imports: [
        "import '@carbon/web-components/es/components/tile/clickable-tile.js'",
      ],
      example: figma.code`<cds-clickable-tile href="#"${renderBooleanAttribute(
        'disabled',
        disabled
      )}>
  ${body}
</cds-clickable-tile>`,
      metadata: { nestable: true },
    };
  }

  if (type === 'single-select') {
    return {
      id: 'cds-radio-tile',
      imports: [
        "import '@carbon/web-components/es/components/tile/radio-tile.js'",
      ],
      example: figma.code`<cds-radio-tile name="tile-group" value="option-1"${renderBooleanAttribute(
        'selected',
        selected
      )}${renderBooleanAttribute('disabled', disabled)}>
  ${body}
</cds-radio-tile>`,
      metadata: { nestable: true },
    };
  }

  if (type === 'multi-select') {
    return {
      id: 'cds-selectable-tile',
      imports: [
        "import '@carbon/web-components/es/components/tile/selectable-tile.js'",
      ],
      example: figma.code`<cds-selectable-tile value="option-1"${renderBooleanAttribute(
        'selected',
        selected
      )}${renderBooleanAttribute('disabled', disabled)}>
  ${body}
</cds-selectable-tile>`,
      metadata: { nestable: true },
    };
  }

  if (type === 'expandable' || type === 'expandable-interactive') {
    return {
      id: 'cds-expandable-tile',
      imports: [
        "import '@carbon/web-components/es/components/tile/expandable-tile.js'",
      ],
      example: figma.code`<cds-expandable-tile>
  <cds-tile-above-the-fold-content slot="above-the-fold-content" style="height: 200px">
    ${body}
  </cds-tile-above-the-fold-content>
  <cds-tile-below-the-fold-content style="height: 400px">
    Below the fold content here
  </cds-tile-below-the-fold-content>
</cds-expandable-tile>`,
      metadata: { nestable: true },
    };
  }

  return {
    id: 'cds-tile',
    imports: ["import '@carbon/web-components/es/components/tile/tile.js'"],
    example: figma.code`<cds-tile>
  ${body}
</cds-tile>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
