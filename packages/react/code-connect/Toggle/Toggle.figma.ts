// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=3038-25739&t=9zqAFF3e617gPBGE-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Toggle/Toggle.tsx
// component=Toggle

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;

function createTemplate() {
  const isSkeleton = instance.getEnum('State', {
    Skeleton: true,
  });

  if (isSkeleton) {
    return {
      id: 'ToggleSkeleton',
      imports: ["import { ToggleSkeleton } from '@carbon/react';"],
      example: figma.code`<ToggleSkeleton />`,
      metadata: { nestable: true },
    };
  }

  const size = instance.getEnum('Size', {
    Default: 'md',
    Small: 'sm',
  });
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const readOnly = instance.getEnum('State', {
    'Read-only': true,
  });
  const defaultToggled = instance.getBoolean('Toggled');
  const isToggleOnly = instance.getEnum('Toggle only', {
    True: true,
  });
  const showValue = instance.getEnum('Show value', {
    True: true,
  });
  const hideLabel = isToggleOnly || !instance.getBoolean('Show label');
  const labelText = isToggleOnly ? undefined : instance.getString('Label text');
  const stateText = showValue ? instance.getString('State text') : undefined;

  return {
    id: 'Toggle',
    imports: ["import { Toggle } from '@carbon/react';"],
    example: figma.code`<Toggle id="id"${figma.helpers.react.renderProp(
      'size',
      size
    )}${figma.helpers.react.renderProp(
      'labelText',
      labelText
    )}${figma.helpers.react.renderProp('hideLabel', hideLabel)}${
      showValue
        ? figma.code`${figma.helpers.react.renderProp(
            'labelA',
            stateText
          )}${figma.helpers.react.renderProp('labelB', stateText)}`
        : figma.code` labelA="" labelB=""`
    }${figma.helpers.react.renderProp(
      'defaultToggled',
      defaultToggled
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled
    )}${figma.helpers.react.renderProp('readOnly', readOnly)} />`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
