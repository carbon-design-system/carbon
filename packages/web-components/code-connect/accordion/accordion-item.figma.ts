// url=https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=2154-8478&mode=design&t=0hF8pirV0i9mofd1-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/accordion/accordion-item.ts
// component=cds-accordion-item

/**
 * Copyright IBM Corp. 2025, 2026
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
const title = instance.getString('Title text');
const disabled = instance.getEnum('State', {
  Disabled: true,
});
const open = instance.getBoolean('Expanded');
const content = instance.getString('Content text');
const slotContent = instance
  .getInstanceSwap('Swap slot')
  ?.executeTemplate().example;

export default {
  id: 'cds-accordion-item',
  imports: [
    "import '@carbon/web-components/es/components/accordion/accordion-item.js'",
  ],
  example: figma.code`<cds-accordion-item${renderStringAttribute(
    'title',
    title
  )}${renderBooleanAttribute(
    'disabled',
    disabled
  )}${renderBooleanAttribute('open', open)}>
  <p>${content}</p>
  ${slotContent}
</cds-accordion-item>`,
  metadata: { nestable: true },
};
