// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=61653-7458&t=RuAO38H8L12JZXpK-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/structured-list/structured-list.ts
// component=cds-structured-list

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderBooleanAttribute } from '../template-helpers';

const instance = figma.selectedInstance;
const headerRowItems = instance
  .findConnectedInstances(
    (child) =>
      child.name === '_Structured list header row item' &&
      child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);
const rowItems = instance
  .findConnectedInstances(
    (child) =>
      child.name === '_Structured list row item - Selectable' &&
      child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);
const condensed = instance.getEnum('Size', {
  Condensed: true,
});
export default {
  id: 'cds-structured-list',
  imports: [
    "import '@carbon/web-components/es/components/structured-list/index.js'",
  ],
  example: figma.code`<cds-structured-list selection-name="structured-list-selection"${renderBooleanAttribute(
    'condensed',
    condensed
  )}>
  <cds-structured-list-head>${headerRowItems}</cds-structured-list-head>
  <cds-structured-list-body>${rowItems}</cds-structured-list-body>
</cds-structured-list>`,
  metadata: { nestable: true },
};
