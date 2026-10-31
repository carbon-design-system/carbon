// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2133-10716&t=A3oys5odsvKkcDFA-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/ui-shell/header-global-action.ts
// component=cds-header-global-action

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderBooleanAttribute } from '../template-helpers';

const instance = figma.selectedInstance;
const children = instance
  .getInstanceSwap('Swap icon')
  ?.executeTemplate().example;
const isActive = instance.getEnum('State', {
  Active: true,
});

export default {
  id: 'cds-header-global-action',
  imports: ["import '@carbon/web-components/es/components/ui-shell/index.js'"],
  example: figma.code`<cds-header-global-action${renderBooleanAttribute(
    'active',
    isActive
  )}>${children}</cds-header-global-action>`,
  metadata: { nestable: true },
};
