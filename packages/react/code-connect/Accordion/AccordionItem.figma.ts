// url=https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=2154-8478&mode=design&t=0hF8pirV0i9mofd1-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Accordion/AccordionItem.tsx
// component=AccordionItem

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

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
  id: 'AccordionItem',
  imports: ["import { AccordionItem } from '@carbon/react';"],
  example: figma.code`<AccordionItem${figma.helpers.react.renderProp(
    'title',
    title
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp('open', open)}>
  <p>${figma.helpers.react.renderChildren(content)}</p>
  ${figma.helpers.react.renderChildren(slotContent)}
</AccordionItem>`,
  metadata: { nestable: true },
};
