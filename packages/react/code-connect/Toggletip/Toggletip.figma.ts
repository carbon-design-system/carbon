// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=9384-402406&t=DU9vCm0ie6tvQBsY-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Toggletip/index.tsx
// component=Toggletip

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const align = instance.getEnum('Position', {
  Top: instance.getEnum('Alignment', {
    Start: 'top-start',
    Center: 'top',
    End: 'top-end',
  }),
  Bottom: instance.getEnum('Alignment', {
    Start: 'bottom-start',
    Center: 'bottom',
    End: 'bottom-end',
  }),
  Left: 'left',
  Right: 'right',
});

const body = instance.findInstance('Toggletip body');
const contentLayer =
  body.type !== 'ERROR' ? body.findText('Toggletip text') : null;
const content =
  contentLayer && contentLayer.type !== 'ERROR'
    ? contentLayer.textContent
    : undefined;
const actions =
  body.type !== 'ERROR'
    ? body
        .findConnectedInstances(
          (child) =>
            (child.name === 'Link' || child.name === 'Button') &&
            child.hasCodeConnect()
        )
        .map((child) => child.executeTemplate().example)
    : [];

// information: figma.instance('Information'), look at this once icons are connected

export default {
  id: 'Toggletip',
  imports: [
    "import { Toggletip, ToggletipLabel, ToggletipButton, ToggletipContent, ToggletipActions } from '@carbon/react';",
    "import { Information } from '@carbon/icons-react';",
  ],
  example: figma.code`<>
  <ToggletipLabel>Toggletip label</ToggletipLabel>
  <Toggletip${figma.helpers.react.renderProp('align', align)}>
    <ToggletipButton label="Show information">
      <Information />
    </ToggletipButton>
    <ToggletipContent>
      <p>${figma.helpers.react.renderChildren(content)}</p>
      <ToggletipActions>${figma.helpers.react.renderChildren(
        actions
      )}</ToggletipActions>
    </ToggletipContent>
  </Toggletip>
</>`,
  metadata: { nestable: false },
};
