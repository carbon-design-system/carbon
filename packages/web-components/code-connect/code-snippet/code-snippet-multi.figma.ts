// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4257-168802&t=cMvnFTYLPEhzhIpj-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/code-snippet/code-snippet.ts
// component=cds-code-snippet

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderBooleanAttribute } from '../template-helpers';

const instance = figma.selectedInstance;
const isSkeleton = instance.getEnum('State', { Skeleton: true });

function createTemplate() {
  if (isSkeleton) {
    return {
      id: 'cds-code-snippet-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/code-snippet/index.js'",
      ],
      example: figma.code`<cds-code-snippet-skeleton type="multi"></cds-code-snippet-skeleton>`,
    };
  }

  const hideCopyButton = !instance.getBoolean('Copy');
  const disabled = instance.getEnum('State', { Disabled: true });

  return {
    id: 'cds-code-snippet',
    imports: [
      "import '@carbon/web-components/es/components/code-snippet/index.js'",
    ],
    example: figma.code`<cds-code-snippet type="multi" feedback="Copied to clipboard" tooltip-content="Copy to clipboard" show-less-text="Show less" show-more-text="Show more"${renderBooleanAttribute(
      'hide-copy-button',
      hideCopyButton
    )}${renderBooleanAttribute('disabled', disabled)}>Code sample here</cds-code-snippet>`,
  };
}

export default createTemplate();
