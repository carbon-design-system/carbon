// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=51447-1916&t=9XaizJDx8eI6KgQz-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/AILabel/index.tsx
// component=AILabel

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const aiText = instance.getString('Text translation');
const size = instance.getEnum('Size', {
  '16px': 'mini',
  '20px': '2xs',
  '24px': 'xs',
  '32px': 'sm',
  '40px': 'md',
  '48px': 'lg',
  '64px': 'xl',
});

export default {
  id: 'AILabel',
  imports: ["import { AILabel } from '@carbon/react';"],
  example: figma.code`<AILabel autoAlign${figma.helpers.react.renderProp(
    'aiText',
    aiText
  )}${figma.helpers.react.renderProp('size', size)} />`,
  metadata: { nestable: true },
};
