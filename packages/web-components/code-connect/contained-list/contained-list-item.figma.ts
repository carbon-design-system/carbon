// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16193-272771&t=cMvnFTYLPEhzhIpj-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/contained-list/contained-list-item.ts
// component=cds-contained-list-item

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderBooleanAttribute } from '../template-helpers';

const instance = figma.selectedInstance;
const rowCellItem = instance.findInstance('_Contained list row cell item');
const textLayer =
  rowCellItem.type !== 'ERROR' ? rowCellItem.findText('Text field') : null;
const text =
  textLayer && textLayer.type !== 'ERROR' ? textLayer.textContent : undefined;
const icon =
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
  id: 'cds-contained-list-item',
  imports: [
    "import '@carbon/web-components/es/components/contained-list/index.js'",
  ],
  example: figma.code`<cds-contained-list-item${renderBooleanAttribute(
    'disabled',
    disabled
  )}>
  ${icon ? figma.code`<span slot="icon">${icon}</span>` : null}
  ${text}
  ${action ? figma.code`<span slot="action">${action}</span>` : null}
</cds-contained-list-item>`,
  metadata: { nestable: true },
};
