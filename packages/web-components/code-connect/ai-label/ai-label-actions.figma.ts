// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=57561-3559&t=SB9qULZbn3FRopvU-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/ai-label/ai-label-action-button.ts
// component=cds-ai-label-action-button

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const button = figma.selectedInstance.findInstance('Button');
const text =
  button.type !== 'ERROR' ? button.getString('Button text') : 'Button';

export default {
  id: 'cds-ai-label-action-button',
  imports: [
    "import '@carbon/web-components/es/components/ai-label/ai-label-action-button.js'",
  ],
  example: figma.code`<cds-ai-label-action-button>${text}</cds-ai-label-action-button>`,
  metadata: { nestable: true },
};
