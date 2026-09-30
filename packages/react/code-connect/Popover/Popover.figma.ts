// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=9125-400576&t=SbIuH3RAJeFPjXmN-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Popover/index.tsx
// component=Popover

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const align = figma.selectedInstance.getEnum('Position', {
  Top: figma.selectedInstance.getEnum('Alignment', {
    Start: 'top-start',
    Center: 'top',
    End: 'top-end',
  }),
  Bottom: figma.selectedInstance.getEnum('Alignment', {
    Start: 'bottom-start',
    Center: 'bottom',
    End: 'bottom-end',
  }),
  Left: 'left',
  Right: 'right',
});
const open = figma.selectedInstance.getBoolean('Visible');
const popoverItem = (function () {
  const nestedLayer0 = figma.selectedInstance.findInstance('Popover item');
  return {
    caret:
      nestedLayer0.type !== 'ERROR'
        ? nestedLayer0.getBoolean('Caret tip')
        : undefined,
    children:
      nestedLayer0.type !== 'ERROR'
        ? nestedLayer0.getInstanceSwap('Swap slot')?.executeTemplate().example
        : undefined,
    dropShadow:
      nestedLayer0.type !== 'ERROR'
        ? nestedLayer0.getBoolean('Shadow')
        : undefined,
  };
})();

export default {
  id: 'Popover',
  imports: [
    "import { Popover, PopoverContent } from '@carbon/react';",
    "import { Settings } from '@carbon/icons-react';",
  ],
  example: figma.code`<Popover${figma.helpers.react.renderProp(
    'align',
    align
  )}${figma.helpers.react.renderProp(
    'open',
    open
  )}${figma.helpers.react.renderProp(
    'caret',
    popoverItem.caret
  )}${figma.helpers.react.renderProp('dropShadow', popoverItem.dropShadow)}>
  <button type="button">
    <Settings />
  </button>
  <PopoverContent>${figma.helpers.react.renderChildren(
    popoverItem.children
  )}</PopoverContent>
</Popover>`,
  metadata: { nestable: true },
};
