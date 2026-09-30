// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3284-27542&t=Y6lD1uj5Q0yszbgL-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/ListItem/ListItem.tsx
// component=ListItem

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const children = figma.selectedInstance.getString('List text');

export default {
  id: 'ListItem',
  imports: ["import { ListItem } from '@carbon/react';"],
  example: figma.code`<ListItem>${figma.helpers.react.renderChildren(
    children
  )}</ListItem>`,
  metadata: { nestable: true },
};
