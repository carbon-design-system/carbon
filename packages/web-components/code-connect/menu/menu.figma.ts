// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=31131-96397&t=OdgMrt4NDVwZpNSx-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/menu/menu.ts
// component=cds-menu

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderStringAttribute } from '../template-helpers';

const instance = figma.selectedInstance;
const size = instance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
  'Extra small': 'xs',
});
const children = instance
  .findConnectedInstances(
    (child) => child.name === '_Menu list item' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);

// Menu uses Lit's default menualignment attribute, unlike MenuButton.
export default {
  id: 'cds-menu',
  imports: ["import '@carbon/web-components/es/components/menu/index.js'"],
  example: figma.code`<cds-menu label="Actions" menualignment="bottom" open${renderStringAttribute(
    'size',
    size
  )}>
  ${children}
</cds-menu>`,
  metadata: { nestable: true },
};
