// url=https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=2490-17019&mode=design&t=0hF8pirV0i9mofd1-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Accordion/Accordion.tsx
// component=Accordion

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const accordionItem = instance.findInstance('Accordion item');
const children = instance
  .findConnectedInstances((child) => child.hasCodeConnect())
  .map((child) => child.executeTemplate().example);

const align =
  accordionItem.type !== 'ERROR'
    ? accordionItem.getEnum('Alignment', {
        Left: 'start',
      })
    : undefined;
const isFlush =
  accordionItem.type !== 'ERROR'
    ? accordionItem.getBoolean('Flush')
    : undefined;
const size =
  accordionItem.type !== 'ERROR'
    ? accordionItem.getEnum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      })
    : undefined;

export default {
  id: 'Accordion',
  imports: ["import { Accordion } from '@carbon/react';"],
  example: figma.code`<Accordion${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp(
    'align',
    align
  )}${figma.helpers.react.renderProp('isFlush', isFlush)}>
  ${figma.helpers.react.renderChildren(children)}
</Accordion>`,
  metadata: { nestable: true },
};
