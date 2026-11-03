// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2133-9888&t=A3oys5odsvKkcDFA-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/UIShell/HeaderMenuItem.tsx
// component=HeaderMenuItem

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const linkText = instance.getString('Link text');

export default {
  id: 'HeaderMenuItem',
  imports: ["import { HeaderMenuItem } from '@carbon/react';"],
  example: figma.code`<HeaderMenuItem href="#">${figma.helpers.react.renderChildren(
    linkText
  )}</HeaderMenuItem>`,
  metadata: { nestable: true },
};
