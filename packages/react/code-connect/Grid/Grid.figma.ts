// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=1830-2335&t=Qm7ndWAwgu7d5Uxc-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Grid/Grid.tsx
// component=Grid

/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

// Screen in Figma
const instance = figma.selectedInstance;
// Breakpoint controls the Screen preview in Figma. At runtime, responsive grid
// behavior comes from CSS and Column props, not a Grid prop
const children = instance
  .findConnectedInstances((child) => child.hasCodeConnect())
  .map((child) => child.executeTemplate().example);

export default {
  id: 'Grid',
  imports: ["import { Grid } from '@carbon/react';"],
  example: figma.code`<Grid>
  ${figma.helpers.react.renderChildren(children)}
</Grid>`,
  metadata: { nestable: true },
};
