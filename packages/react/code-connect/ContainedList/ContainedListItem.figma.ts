// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16193-272771&t=cMvnFTYLPEhzhIpj-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/ContainedList/ContainedListItem/ContainedListItem.tsx
// component=ContainedListItem

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const rowCellItem = instance.findInstance('_Contained list row cell item');
const textLayer =
  rowCellItem.type !== 'ERROR' ? rowCellItem.findText('Text field') : null;
const text =
  textLayer && textLayer.type !== 'ERROR' ? textLayer.textContent : undefined;
const renderIcon =
  rowCellItem.type !== 'ERROR'
    ? rowCellItem.getInstanceSwap('Swap icon')?.executeTemplate().example
    : undefined;
const action = instance.getBoolean('Action')
  ? instance
      .findConnectedInstances(
        (child) => child.name === 'Button' && child.hasCodeConnect()
      )[0]
      ?.executeTemplate().example
  : undefined;
const disabled = instance.getEnum('State', { Disabled: true });

export default {
  id: 'ContainedListItem',
  imports: ["import { ContainedListItem } from '@carbon/react';"],
  example: figma.code`<ContainedListItem${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${
    renderIcon ? figma.code` renderIcon={() => ${renderIcon}}` : null
  }${figma.helpers.react.renderProp('action', action)}>
  ${figma.helpers.react.renderChildren(text)}
</ContainedListItem>`,
  metadata: { nestable: true },
};
