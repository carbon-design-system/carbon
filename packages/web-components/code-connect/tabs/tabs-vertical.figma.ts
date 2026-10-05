// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=75823-2818&t=PaZ3ZnEGQGMgXgBW-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/tabs/tabs-vertical.ts
// component=cds-tabs-vertical

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const children = instance
  .findConnectedInstances(
    (child) => child.name === '_Vertical tabs items' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);

export default {
  id: 'cds-tabs-vertical',
  imports: [
    "import '@carbon/web-components/es/components/tabs/tabs-vertical.js'",
    "import '@carbon/web-components/es/components/tabs/tabs.js'",
    "import '@carbon/web-components/es/components/tabs/tab.js'",
  ],
  example: figma.code`<cds-tabs-vertical>
  <cds-tabs aria-label="List of tabs" slot="tabs">${children}</cds-tabs>
  <!-- Example code below, not mapped in Figma.
  There needs to be one panel per tab -->
  <div id="panel-1" role="tabpanel">Tab Panel 1</div>
  <div id="panel-2" role="tabpanel">Tab Panel 2</div>
  <div id="panel-3" role="tabpanel">Tab Panel 3</div>
  <div id="panel-4" role="tabpanel">Tab Panel 4</div>
</cds-tabs-vertical>`,
  metadata: { nestable: true },
};
