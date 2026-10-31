// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=84336-36580&t=nJ89fkK549fgCUuf-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/notification/callout-notification.ts
// component=cds-callout-notification

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
const title = instance.getBoolean('Title', {
  true: instance.getString('Title text'),
  false: '',
});
const subtitle = instance.getString('Message text');
const kind = instance.getEnum('Status', {
  Info: 'info',
  Warning: 'warning',
});
const lowContrast = !instance.getBoolean('High contrast');

export default {
  id: 'cds-callout-notification',
  imports: [
    "import '@carbon/web-components/es/components/notification/index.js'",
  ],
  example: figma.code`<cds-callout-notification${renderStringAttribute(
    'kind',
    kind
  )}${renderBooleanAttribute(
    'low-contrast',
    lowContrast
  )}${renderStringAttribute('subtitle', subtitle)}${renderStringAttribute(
    'title',
    title
  )}></cds-callout-notification>`,
  metadata: { nestable: true },
};
