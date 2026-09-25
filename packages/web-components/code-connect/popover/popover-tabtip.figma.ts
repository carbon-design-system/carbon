// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=9826-402965&t=SbIuH3RAJeFPjXmN-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/popover/popover.ts
// component=cds-popover

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import {
  renderBooleanAttribute,
  renderStringAttribute,
} from '../template-helpers';

const instance = figma.selectedInstance;
const align = instance.getEnum('Alignment', {
  Start: 'bottom-start',
  End: 'bottom-end',
});
const open = instance.getBoolean('Open');
const dropShadow = instance.getBoolean('Shadow');

const popoverItem = instance.findInstance('Popover item');
const children =
  popoverItem.type !== 'ERROR'
    ? popoverItem.getInstanceSwap('Swap slot')?.executeTemplate().example
    : undefined;

export default {
  id: 'cds-popover',
  imports: ["import '@carbon/web-components/es/components/popover/index.js'"],
  example: figma.code`<cds-popover${renderStringAttribute(
    'align',
    align
  )}${renderBooleanAttribute('dropshadow', dropShadow)}${renderBooleanAttribute(
    'open',
    open
  )} tabtip>
  <button type="button">Open tab tip</button>
  <cds-popover-content>${children}</cds-popover-content>
</cds-popover>`,
  metadata: { nestable: true },
};
