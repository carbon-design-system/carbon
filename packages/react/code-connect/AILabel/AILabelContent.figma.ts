// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=57561-3508&t=SB9qULZbn3FRopvU-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/AILabel/index.tsx
// component=AILabelContent

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const title = instance.getString('AI title');
const description = instance.getString('AI description');

function getOptionalSwap(toggle: string, swap: string) {
  return instance.getBoolean(toggle)
    ? instance.getInstanceSwap(swap)?.executeTemplate().example
    : undefined;
}

const slotOne = getOptionalSwap('Slot 1', 'Swap slot 1');
const slotTwo = getOptionalSwap('Slot 2', 'Swap slot 2');
const slotThree = getOptionalSwap('Slot 3', 'Swap slot 3');
const slotFour = getOptionalSwap('Slot 4', 'Swap slot 4');
const actionsFooter = instance.findInstance('Actions footer');
const actions =
  actionsFooter.type !== 'ERROR' && actionsFooter.hasCodeConnect()
    ? actionsFooter.executeTemplate().example
    : undefined;

export default {
  id: 'AILabelContent',
  imports: ["import { AILabelContent } from '@carbon/react';"],
  example: figma.code`<AILabelContent>
  <div>
    <p className="secondary">AI Explained</p>
    <h2 className="ai-label-heading">${figma.helpers.react.renderChildren(
      title
    )}</h2>
    <p className="secondary">${figma.helpers.react.renderChildren(
      description
    )}</p>
    ${figma.helpers.react.renderChildren(slotOne)}
    <hr />
    ${figma.helpers.react.renderChildren(slotTwo)}
    <p className="secondary">
      This is sample placeholder content, replace with your own content and custom styles.
    </p>
    ${figma.helpers.react.renderChildren(slotThree)}
    ${figma.helpers.react.renderChildren(slotFour)}
  </div>
  ${figma.helpers.react.renderChildren(actions)}
</AILabelContent>`,
  metadata: { nestable: true },
};
