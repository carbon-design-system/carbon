// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=4179-105911&t=nJ89fkK549fgCUuf-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/notification/inline-notification.ts
// component=cds-inline-notification

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
const title = instance.getString('Title text');
const subtitle = instance.getString('Message text');
const kind = instance.getEnum('Status', {
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
});
const hideCloseButton = !instance.getBoolean('Close');
const lowContrast = !instance.getBoolean('High contrast');
const actionable = instance.getEnum('Actionable', {
  True: true,
});

function createTemplate() {
  if (actionable) {
    return {
      id: 'cds-actionable-notification',
      imports: [
        "import '@carbon/web-components/es/components/notification/index.js'",
      ],
      example: figma.code`<cds-actionable-notification${renderBooleanAttribute(
        'hide-close-button',
        hideCloseButton
      )} inline${renderStringAttribute('kind', kind)}${renderBooleanAttribute(
        'low-contrast',
        lowContrast
      )}${renderStringAttribute('subtitle', subtitle)}${renderStringAttribute(
        'title',
        title
      )}>
  <cds-actionable-notification-button slot="action">Action</cds-actionable-notification-button>
</cds-actionable-notification>`,
      metadata: { nestable: true },
    };
  }

  return {
    id: 'cds-inline-notification',
    imports: [
      "import '@carbon/web-components/es/components/notification/index.js'",
    ],
    example: figma.code`<cds-inline-notification${renderBooleanAttribute(
      'hide-close-button',
      hideCloseButton
    )}${renderStringAttribute('kind', kind)}${renderBooleanAttribute(
      'low-contrast',
      lowContrast
    )}${renderStringAttribute('subtitle', subtitle)}${renderStringAttribute(
      'title',
      title
    )}></cds-inline-notification>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
