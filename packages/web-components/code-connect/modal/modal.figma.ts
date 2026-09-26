// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4080-55366&t=kgHdN1kQbk04e5Jv-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/modal/modal.ts
// component=cds-modal

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderStringAttribute } from '../template-helpers';

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
  ? figma.code`<cds-modal-body-content description>${instance.getString(
      'Description text'
    )}</cds-modal-body-content>`
  : null;
const content = instance
  .getInstanceSwap('Swap slot')
  ?.executeTemplate().example;
const actions = getOptionalChild('Actions', 'Actions');

export default {
  id: 'cds-modal',
  imports: ["import '@carbon/web-components/es/components/modal/index.js'"],
  example: figma.code`<cds-modal open${renderStringAttribute('size', size)}>
  <cds-modal-header>
    <cds-modal-close-button></cds-modal-close-button>
    ${label ? figma.code`<cds-modal-label>${label}</cds-modal-label>` : null}
    <cds-modal-heading>${title}</cds-modal-heading>
  </cds-modal-header>
  <cds-modal-body>
    ${progress}
    ${description}
    ${content}
  </cds-modal-body>
  ${actions}
</cds-modal>`,
};
