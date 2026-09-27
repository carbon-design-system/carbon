// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=51447-2035&t=9XaizJDx8eI6KgQz-4
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
const textLabel = instance.getEnum('Type', {
  'Text + Icon': instance.getString('Slug text'),
});
const size = instance.getEnum('Size', {
  '12px': 'sm',
  '14px': 'md',
  '16px': 'lg',
});

export default {
  id: 'AILabel',
  imports: ["import { AILabel } from '@carbon/react';"],
  example: figma.code`<AILabel autoAlign kind="inline"${figma.helpers.react.renderProp(
    'aiText',
    aiText
  )}${figma.helpers.react.renderProp(
    'textLabel',
    textLabel
  )}${figma.helpers.react.renderProp('size', size)} />`,
  metadata: { nestable: true },
};
