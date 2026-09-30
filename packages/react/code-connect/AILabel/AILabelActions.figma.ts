// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=57561-3559&t=SB9qULZbn3FRopvU-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/AILabel/index.tsx
// component=AILabelActions

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const children = figma.selectedInstance
  .findConnectedInstances((child) => child.hasCodeConnect())
  .map((child) => child.executeTemplate().example);

export default {
  id: 'AILabelActions',
  imports: ["import { AILabelActions } from '@carbon/react';"],
  example: figma.code`<AILabelActions>
  ${figma.helpers.react.renderChildren(children)}
</AILabelActions>`,
  metadata: { nestable: true },
};
