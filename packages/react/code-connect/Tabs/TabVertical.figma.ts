// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=75769-1965&t=PaZ3ZnEGQGMgXgBW-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Tabs/Tabs.tsx
// component=Tab

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const label = instance.getString('Text');
const disabled = instance.getEnum('State', {
  Disabled: true,
});

export default {
  id: 'Tab',
  imports: ["import { Tab } from '@carbon/react';"],
  example: figma.code`<Tab${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}>${figma.helpers.react.renderChildren(label)}</Tab>`,
  metadata: { nestable: true },
};
