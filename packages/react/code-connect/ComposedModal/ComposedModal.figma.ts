// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4080-55366&t=kgHdN1kQbk04e5Jv-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/ComposedModal/ComposedModal.tsx
// component=ComposedModal

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const title = instance.getString('Title text');
const label = instance.getBoolean('Label')
  ? instance.getString('Label text')
  : undefined;
const size = instance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
  'Extra small': 'xs',
});
function getOptionalChild(toggle: string, name: string) {
  if (!instance.getBoolean(toggle)) {
    return undefined;
  }

  const child = instance.findInstance(name, { traverseInstances: true });
  return child.type !== 'ERROR' && child.hasCodeConnect()
    ? child.executeTemplate().example
    : undefined;
}

const progress = getOptionalChild('Progress', 'Progress indicator');
const description = instance.getBoolean('Description')
  ? figma.code`<p>${figma.helpers.react.renderChildren(
      instance.getString('Description text')
    )}</p>`
  : null;
const content = instance
  .getInstanceSwap('Swap slot')
  ?.executeTemplate().example;
const actions = getOptionalChild('Actions', 'Actions');

export default {
  id: 'ComposedModal',
  imports: [
    "import { ComposedModal, ModalHeader, ModalBody } from '@carbon/react';",
  ],
  example: figma.code`<ComposedModal open onClose={() => {}}${figma.helpers.react.renderProp(
    'size',
    size
  )}>
  <ModalHeader${figma.helpers.react.renderProp(
    'label',
    label
  )}${figma.helpers.react.renderProp('title', title)} />
  <ModalBody>
    ${figma.helpers.react.renderChildren(progress)}
    ${description}
    ${figma.helpers.react.renderChildren(content)}
  </ModalBody>
  ${figma.helpers.react.renderChildren(actions)}
</ComposedModal>`,
};
