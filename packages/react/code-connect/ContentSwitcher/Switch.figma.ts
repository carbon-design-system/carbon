// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=10151-402337&t=Y6lD1uj5Q0yszbgL-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Switch/Switch.tsx
// component=Switch

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const text = instance.getString('Label text');
const disabled = instance.getEnum('State', { Disabled: true });

export default {
  id: 'Switch',
  imports: ["import { Switch } from '@carbon/react';"],
  example: figma.code`<Switch${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp('text', text)} />`,
  metadata: { nestable: true },
};
