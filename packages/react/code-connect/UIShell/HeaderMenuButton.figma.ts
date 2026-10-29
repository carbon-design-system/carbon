// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2213-15047&t=A3oys5odsvKkcDFA-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/UIShell/HeaderMenuButton.tsx
// component=HeaderMenuButton

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const isActive = instance.getBoolean('Open');

export default {
  id: 'HeaderMenuButton',
  imports: ["import { HeaderMenuButton } from '@carbon/react';"],
  example: figma.code`<HeaderMenuButton${figma.helpers.react.renderProp(
    'aria-label',
    isActive ? 'Close menu' : 'Open menu'
  )}
  aria-expanded={${isActive}}${figma.helpers.react.renderProp(
    'isActive',
    isActive
  )} />`,
  metadata: { nestable: true },
};
