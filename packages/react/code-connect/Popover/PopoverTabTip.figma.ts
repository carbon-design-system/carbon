// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=9826-402965&t=SbIuH3RAJeFPjXmN-4
// source=https://github.com/maradwan26/carbon/blob/main/packages/react/lib/components/Popover/index.d.ts
// component=Popover

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const align = figma.selectedInstance.getEnum('Alignment', {
  Start: 'start',
  End: 'end',
});
const open = figma.selectedInstance.getBoolean('Open');
const dropShadow = figma.selectedInstance.getBoolean('Shadow');
const popoverItem = (function () {
  const nestedLayer1 = figma.selectedInstance.findInstance('Popover item');
  return {
    children:
      nestedLayer1.type !== 'ERROR'
        ? nestedLayer1.getInstanceSwap('Swap slot')?.executeTemplate().example
        : undefined,
  };
})();

export default {
  id: 'Popover',
  imports: [
    "import { Popover, PopoverContent } from '@carbon/react';",
    "import { Settings } from '@carbon/icons-react';",
  ],
  example: figma.code`<Popover isTabTip${figma.helpers.react.renderProp(
    'align',
    align
  )}${figma.helpers.react.renderProp(
    'open',
    open
  )}${figma.helpers.react.renderProp('dropShadow', dropShadow)}>
  <button type="button">
    <Settings />
  </button>
  <PopoverContent>${figma.helpers.react.renderChildren(
    popoverItem.children
  )}</PopoverContent>
</Popover>`,
  metadata: { nestable: true },
};
