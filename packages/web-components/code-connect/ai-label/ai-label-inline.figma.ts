// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=51447-2035&t=9XaizJDx8eI6KgQz-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/ai-label/ai-label.ts
// component=cds-ai-label

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderStringAttribute } from '../template-helpers';

const instance = figma.selectedInstance;
const aiText = instance.getString('Text translation');
const aiTextLabel = instance.getEnum('Type', {
  'Text + Icon': instance.getString('Slug text'),
});
const size = instance.getEnum('Size', {
  '12px': 'sm',
  '14px': 'md',
  '16px': 'lg',
});

export default {
  id: 'cds-ai-label',
  imports: [
    "import '@carbon/web-components/es/components/ai-label/ai-label.js'",
  ],
  example: figma.code`<cds-ai-label autoalign kind="inline"${renderStringAttribute(
    'ai-text',
    aiText
  )}${renderStringAttribute(
    'ai-text-label',
    aiTextLabel
  )}${renderStringAttribute('size', size)}></cds-ai-label>`,
  metadata: { nestable: true },
};
