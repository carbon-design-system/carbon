// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=84336-36580&t=nJ89fkK549fgCUuf-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Notification/Notification.tsx
// component=Callout

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

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
  id: 'Callout',
  imports: ["import { Callout } from '@carbon/react';"],
  example: figma.code`<Callout${figma.helpers.react.renderProp(
    'title',
    title
  )}${figma.helpers.react.renderProp(
    'kind',
    kind
  )}${figma.helpers.react.renderProp(
    'subtitle',
    subtitle
  )}${figma.helpers.react.renderProp('lowContrast', lowContrast)} />`,
  metadata: { nestable: true },
};
