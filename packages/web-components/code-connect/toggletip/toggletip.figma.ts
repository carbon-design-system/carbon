// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=9384-402406&t=DU9vCm0ie6tvQBsY-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/toggle-tip/toggletip.ts
// component=cds-toggletip

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderStringAttribute } from '../template-helpers';

const instance = figma.selectedInstance;
const alignment = instance.getEnum('Position', {
  Top: instance.getEnum('Alignment', {
    Start: 'top-start',
    Center: 'top',
    End: 'top-end',
  }),
  Bottom: instance.getEnum('Alignment', {
    Start: 'bottom-start',
    Center: 'bottom',
    End: 'bottom-end',
  }),
  Left: 'left',
  Right: 'right',
});

const body = instance.findInstance('Toggletip body');
const contentLayer =
  body.type !== 'ERROR' ? body.findText('Toggletip text') : null;
const content =
  contentLayer && contentLayer.type !== 'ERROR'
    ? contentLayer.textContent
    : undefined;
const actions =
  body.type !== 'ERROR'
    ? body
        .findConnectedInstances(
          (child) =>
            (child.name === 'Link' || child.name === 'Button') &&
            child.hasCodeConnect()
        )
        .map((child) => child.executeTemplate().example)
    : [];

export default {
  id: 'cds-toggletip',
  imports: [
    "import '@carbon/web-components/es/components/toggle-tip/toggletip.js'",
    "import '@carbon/web-components/es/components/button/button.js'",
    "import '@carbon/web-components/es/components/link/link.js'",
  ],
  example: figma.code`<cds-toggletip${renderStringAttribute(
    'alignment',
    alignment
  )}>
  Toggletip label
  <p slot="body-text">${content}</p>
  ${actions}
</cds-toggletip>`,
  metadata: { nestable: true },
};
