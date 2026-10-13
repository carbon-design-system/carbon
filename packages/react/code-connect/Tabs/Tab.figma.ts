// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=103086-4853&t=qzeFExzcZKEytj8o-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Tabs/Tabs.tsx
// component=Tab

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

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
      id: 'IconTab',
      imports: ["import { IconTab } from '@carbon/react';"],
      example: figma.code`<IconTab${figma.helpers.react.renderProp(
        'disabled',
        disabled
      )}${figma.helpers.react.renderProp(
        'label',
        label
      )}>${figma.helpers.react.renderChildren(icon)}</IconTab>`,
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
    id: 'Tab',
    imports: ["import { Tab } from '@carbon/react';"],
    example: figma.code`<Tab${figma.helpers.react.renderProp(
      'disabled',
      disabled
    )}${figma.helpers.react.renderProp(
      'secondaryLabel',
      secondaryLabel
    )}${figma.helpers.react.renderProp(
      'renderIcon',
      icon
    )}>${figma.helpers.react.renderChildren(label)}</Tab>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
