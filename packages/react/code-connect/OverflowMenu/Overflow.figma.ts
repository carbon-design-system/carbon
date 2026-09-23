// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3717-45725&t=aG4cJRjteQHcd71k-4
// source=https://github.com/maradwan26/carbon/blob/main/packages/react/lib/components/OverflowMenu/index.d.ts
// component=OverflowMenu

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
});
const direction = figma.selectedInstance.getEnum('Position', {
  Top: 'top',
});
const flipped = figma.selectedInstance.getEnum('Alignment', {
  End: true,
});
const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
});
const open = figma.selectedInstance.getBoolean('Open');
const button = (function () {
  const nestedLayer0 = figma.selectedInstance.findInstance('Button');
  return {
    renderIcon:
      nestedLayer0.type !== 'ERROR'
        ? nestedLayer0.getInstanceSwap('Swap icon')?.executeTemplate().example
        : undefined,
  };
})();

export default {
  id: 'OverflowMenu',
  imports: ["import { OverflowMenu, OverflowMenuItem } from '@carbon/react';"],
  example: figma.code`<OverflowMenu${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp(
    'direction',
    direction
  )}${figma.helpers.react.renderProp(
    'flipped',
    flipped
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp(
    'open',
    open
  )}${figma.helpers.react.renderProp('renderIcon', button.renderIcon)}>
        {/* Sample OverflowMenuItem code, not directly mapped */}
        <OverflowMenuItem itemText="Stop app"/>
        <OverflowMenuItem itemText="Restart app"/>
        <OverflowMenuItem itemText="Rename app"/>
        <OverflowMenuItem itemText="Clone and move app" disabled requireTitle/>
        <OverflowMenuItem itemText="Edit routes and access" requireTitle/>
        <OverflowMenuItem hasDivider isDelete itemText="Delete app"/>
      </OverflowMenu>`,
  metadata: { nestable: true },
};
