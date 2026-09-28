// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16193-272726&t=cMvnFTYLPEhzhIpj-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/ContainedList/ContainedList.tsx
// component=ContainedList

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const titleItem = instance.findInstance('_Contained list title item');
const rowItem = instance.findInstance('_Contained list row item');
const label =
  titleItem.type !== 'ERROR'
    ? titleItem.getString('List title text')
    : undefined;
const kind = instance.getEnum('Type', {
  'On page': 'on-page',
  Disclosed: 'disclosed',
});
const size =
  rowItem.type !== 'ERROR'
    ? rowItem.getEnum('Size', {
        'Extra large': 'xl',
        Medium: 'md',
        Small: 'sm',
      })
    : undefined;
const actionName =
  titleItem.type !== 'ERROR' && titleItem.getBoolean('Show action')
    ? titleItem.getEnum('Action type', {
        Default: 'Overflow',
        'Filterable search': 'Search - Default',
      })
    : undefined;
const action =
  titleItem.type !== 'ERROR' && actionName
    ? titleItem
        .findConnectedInstances(
          (child) => child.name === actionName && child.hasCodeConnect()
        )[0]
        ?.executeTemplate().example
    : undefined;
const search = instance.getEnum('Search', { True: true })
  ? instance
      .findConnectedInstances(
        (child) => child.name === 'Search - Default' && child.hasCodeConnect()
      )
      .map((child) => child.executeTemplate().example)
  : [];
const children = instance
  .findConnectedInstances(
    (child) =>
      child.name === '_Contained list row item' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);

export default {
  id: 'ContainedList',
  imports: ["import { ContainedList } from '@carbon/react';"],
  example: figma.code`<ContainedList${figma.helpers.react.renderProp(
    'label',
    label
  )}${figma.helpers.react.renderProp(
    'kind',
    kind
  )}${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp('action', action)}>
  ${figma.helpers.react.renderChildren(search)}
  ${figma.helpers.react.renderChildren(children)}
</ContainedList>`,
};
