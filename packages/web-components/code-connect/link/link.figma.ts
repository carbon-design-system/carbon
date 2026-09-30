// url=https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=50111-991&mode=design&t=kyFCPK0tCeufcNP2-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/link/link.ts
// component=cds-link

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
const inline = instance.getEnum('Type', {
  Inline: true,
  Standalone: false,
});
const linkText = instance.getString('Link text');
const icon = instance.getInstanceSwap('Swap icon')?.executeTemplate().example;
const size = instance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
});
const disabled = instance.getEnum('State', {
  Disabled: true,
});

export default {
  id: 'cds-link',
  imports: ["import '@carbon/web-components/es/components/link/link.js'"],
  example: figma.code`<cds-link href="#"${renderBooleanAttribute(
    'inline',
    inline
  )}${renderStringAttribute('size', size)}${renderBooleanAttribute(
    'disabled',
    disabled
  )}>
  ${linkText}
  ${icon ? figma.code`<span slot="icon">${icon}</span>` : null}
</cds-link>`,
  metadata: { nestable: true },
};
