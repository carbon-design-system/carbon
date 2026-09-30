// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3925-58667&m=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/ProgressIndicator/ProgressIndicator.tsx
// component=ProgressIndicator

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const children = instance
  .findConnectedInstances((child) => child.hasCodeConnect())
  .map((child) => child.executeTemplate().example);
const vertical = instance.getEnum('Direction', {
  Vertical: true,
});

export default {
  id: 'ProgressIndicator',
  imports: ["import { ProgressIndicator } from '@carbon/react';"],
  example: figma.code`<ProgressIndicator${figma.helpers.react.renderProp(
    'vertical',
    vertical
  )}>
  ${figma.helpers.react.renderChildren(children)}
</ProgressIndicator>`,
  metadata: { nestable: true },
};

// This comment existed before the template file migration, figma issue is still open
// figma.connect(
//   ProgressIndicatorSkeleton,
//   'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3925-58667&m=dev',
//   {
//     variant: need nested variant selector here, https://github.com/figma/code-connect/issues/91
//     props: {
//       vertical: figma.enum('Direction', {
//         Vertical: true,
//       }),
//     },
//     example: ({ children, vertical }) => (
//       <ProgressIndicatorSkeleton vertical={vertical} />
//     ),
//   }
// );
