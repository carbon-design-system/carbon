// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=10151-402486&t=LoXqbMLZkoMgbrAS-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/content-switcher/content-switcher.ts
// component=cds-content-switcher

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
const itemName = instance.getEnum('Type', { 'Icon only': true })
  ? '_Content switcher icon item'
  : '_Content switcher text item';
const children = instance
  .findConnectedInstances(
    (child) => child.name === itemName && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);
const lowContrast = instance.getBoolean('Low contrast');
const size = instance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
});

export default {
  id: 'cds-content-switcher',
  imports: [
    "import '@carbon/web-components/es/components/content-switcher/index.js'",
  ],
  example: figma.code`<cds-content-switcher selected-index="0"${renderBooleanAttribute(
    'low-contrast',
    lowContrast
  )}${renderStringAttribute('size', size)}>
  ${children}
</cds-content-switcher>`,
};
