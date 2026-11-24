// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2213-15047&t=A3oys5odsvKkcDFA-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/ui-shell/header-menu-button.ts
// component=cds-header-menu-button

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderBooleanAttribute } from '../template-helpers';

const instance = figma.selectedInstance;
const isActive = instance.getBoolean('Open');

export default {
  id: 'cds-header-menu-button',
  imports: ["import '@carbon/web-components/es/components/ui-shell/index.js'"],
  example: figma.code`<cds-header-menu-button
  button-label-active="Close menu"
  button-label-inactive="Open menu"${renderBooleanAttribute(
    'active',
    isActive
  )}></cds-header-menu-button>`,
  metadata: { nestable: true },
};
