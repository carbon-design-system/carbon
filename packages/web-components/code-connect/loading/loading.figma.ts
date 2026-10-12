// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=3238-28455&t=Y6lD1uj5Q0yszbgL-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/loading/loading.ts
// component=cds-loading / cds-inline-loading

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import {
  renderBooleanAttribute,
  renderStringAttribute,
} from '../template-helpers';

const instance = figma.selectedInstance;
const isInline = instance.getEnum('Size', {
  Inline: true,
});

function createTemplate() {
  if (isInline) {
    const loadingMessage = instance.findText('Loading message');
    const description =
      loadingMessage.type !== 'ERROR' ? loadingMessage.textContent : undefined;
    const status = instance.getEnum('State', {
      Active: 'active',
      Error: 'error',
      Finished: 'finished',
      Inactive: 'inactive',
    });

    return {
      id: 'cds-inline-loading',
      imports: [
        "import '@carbon/web-components/es/components/inline-loading/index.js'",
      ],
      example: figma.code`<cds-inline-loading icon-description="Loading"${renderStringAttribute(
        'status',
        status
      )}>${description}</cds-inline-loading>`,
      metadata: { nestable: true },
    };
  }

  const small = instance.getEnum('Size', {
    Small: true,
  });

  return {
    id: 'cds-loading',
    imports: ["import '@carbon/web-components/es/components/loading/index.js'"],
    example: figma.code`<cds-loading active description="Loading"${renderBooleanAttribute(
      'small',
      small
    )}></cds-loading>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
