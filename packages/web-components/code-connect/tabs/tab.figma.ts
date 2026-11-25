// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=103086-4853&t=qzeFExzcZKEytj8o-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/tabs/tab.ts
// component=cds-tab

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

function createTemplate() {
  const label = instance.getString('Label text');
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const icon = instance.getInstanceSwap('Swap icon')?.executeTemplate().example;
  const isIconOnly = instance.getEnum('Type', {
    'Icon only': true,
  });

  if (isIconOnly) {
    return {
      id: 'cds-tab',
      imports: ["import '@carbon/web-components/es/components/tabs/tab.js'"],
      example: figma.code`<cds-tab icon-only${renderBooleanAttribute(
        'disabled',
        disabled
      )}${renderStringAttribute('aria-label', label)}>
  ${icon}
</cds-tab>`,
      metadata: { nestable: true },
    };
  }

  const isContained = instance.getEnum('Style', {
    Contained: true,
  });
  const secondaryLabelLayer =
    isContained && instance.getBoolean('Show 2nd label')
      ? instance.findText('2nd label')
      : null;
  const secondaryLabel =
    secondaryLabelLayer && secondaryLabelLayer.type !== 'ERROR'
      ? secondaryLabelLayer.textContent
      : undefined;

  return {
    id: 'cds-tab',
    imports: ["import '@carbon/web-components/es/components/tabs/index.js'"],
    example: figma.code`<cds-tab${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderStringAttribute('secondary-label', secondaryLabel)}>
  ${label} ${icon}
</cds-tab>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
