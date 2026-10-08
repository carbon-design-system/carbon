// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=84336-35011&t=nJ89fkK549fgCUuf-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Notification/Notification.tsx
// component=ToastNotification

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

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
      id: 'ActionableNotification',
      imports: ["import { ActionableNotification } from '@carbon/react';"],
      example: figma.code`<ActionableNotification${figma.helpers.react.renderProp(
        'kind',
        kind
      )}${figma.helpers.react.renderProp(
        'title',
        title
      )}${figma.helpers.react.renderProp(
        'subtitle',
        subtitle
      )}${figma.helpers.react.renderProp(
        'hideCloseButton',
        hideCloseButton
      )}${figma.helpers.react.renderProp(
        'lowContrast',
        lowContrast
      )} actionButtonLabel="Action" />`,
      metadata: { nestable: true },
    };
  }

  const caption = instance.getString('Time text');

  return {
    id: 'ToastNotification',
    imports: ["import { ToastNotification } from '@carbon/react';"],
    example: figma.code`<ToastNotification${figma.helpers.react.renderProp(
      'kind',
      kind
    )}${figma.helpers.react.renderProp(
      'title',
      title
    )}${figma.helpers.react.renderProp(
      'subtitle',
      subtitle
    )}${figma.helpers.react.renderProp(
      'caption',
      caption
    )}${figma.helpers.react.renderProp(
      'hideCloseButton',
      hideCloseButton
    )}${figma.helpers.react.renderProp('lowContrast', lowContrast)} />`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
