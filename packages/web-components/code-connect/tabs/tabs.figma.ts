// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=3890-50605&t=PaZ3ZnEGQGMgXgBW-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/tabs/tabs.ts
// component=cds-tabs

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
const children = instance
  .findConnectedInstances(
    (child) => child.name === '_Horizontal tabs items' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);
const type = instance.getEnum('Style', {
  Contained: 'contained',
});
const fullWidth = instance.getEnum('Alignment', {
  'Grid aware': true,
});

const tabItem = instance.findInstance('_Horizontal tabs items');
const size =
  tabItem.type !== 'ERROR'
    ? tabItem.getEnum('Size', {
        Large: 'lg',
      })
    : undefined;
const dismissable =
  tabItem.type !== 'ERROR'
    ? tabItem.getBoolean('Dismissible') ||
      tabItem.getBoolean('Dismissible + Icon')
    : undefined;

export default {
  id: 'cds-tabs',
  imports: ["import '@carbon/web-components/es/components/tabs/index.js'"],
  example: figma.code`<cds-tabs aria-label="List of tabs"${renderStringAttribute(
    'type',
    type
  )}${renderBooleanAttribute('full-width', fullWidth)}${renderStringAttribute(
    'size',
    size
  )}${renderBooleanAttribute('dismissable', dismissable)}>
  ${children}
</cds-tabs>
  <!-- Example code below, not mapped in Figma.
  There needs to be one panel per tab -->
  <div id="panel-1" role="tabpanel">Tab Panel 1</div>
  <div id="panel-2" role="tabpanel">Tab Panel 2</div>
  <div id="panel-3" role="tabpanel">Tab Panel 3</div>
  <div id="panel-4" role="tabpanel">Tab Panel 4</div>`,
  metadata: { nestable: true },
};
