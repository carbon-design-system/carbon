// url=https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4630-268268&mode=design&t=dSt5NCwcWajIQZR7-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/DataTable/Table.tsx
// component=Table

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const type = instance.getEnum('Type', {
  Expandable: 'expandable',
  'Select checkbox': 'select-checkbox',
  'Select radio': 'select-radio',
  'Expandable + Selectable': 'expandable-selectable',
});
const slot = instance.getBoolean('Slot', {
  true: instance.getInstanceSwap('Swap slot')?.executeTemplate().example,
});
const toolbarItems = instance
  .findConnectedInstances(
    (child) =>
      child.name === 'Data table toolbar item' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);
const toolbar = instance.getBoolean('Toolbar', {
  true: toolbarItems,
});
const paginationItems = instance
  .findConnectedInstances(
    (child) => child.name === 'Pagination - Table bar' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);
const pagination = instance.getBoolean('Pagination', {
  true: paginationItems,
});
const headerItemLayer = instance.findInstance('Data table header item');
const headerRowLayer = instance.findInstance('Data table header row item');
const headerItem = {
  description:
    headerItemLayer.type !== 'ERROR'
      ? headerItemLayer.getBoolean('Description', {
          true: headerItemLayer.getString('Description text'),
        })
      : undefined,
  title:
    headerItemLayer.type !== 'ERROR'
      ? headerItemLayer.getString('Title text')
      : undefined,
};
// Data Table sizing is controlled through Figma Appearance, not a component property.
const headerRow = {
  children:
    headerRowLayer.type !== 'ERROR'
      ? headerRowLayer
          .findConnectedInstances(
            (child) => child.name.startsWith('Col') && child.hasCodeConnect()
          )
          .map((child) => child.executeTemplate().example)
      : undefined,
};
const bodyRows = instance
  .findConnectedInstances(
    (child) =>
      child.name === 'Data table body row item' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);
const rowItems = instance.getBoolean('Body', {
  true: bodyRows,
});
const isExpandable = type === 'expandable' || type === 'expandable-selectable';
const isSelectable =
  type === 'select-checkbox' || type === 'expandable-selectable';
const isRadio = type === 'select-radio';
const selectAll = figma.code`<TableSelectAll id="select-all" name="select-all" onSelect={() => {}} />`;
const headerControls = isExpandable
  ? figma.code`<TableExpandHeader aria-label="expand row" />
${isSelectable ? selectAll : null}`
  : isSelectable
    ? selectAll
    : isRadio
      ? figma.code`<th scope="col" />`
      : null;
const imports = [
  `import { TableContainer, Table, TableHead, TableRow, TableBody${isExpandable ? ', TableExpandHeader' : ''}${isSelectable ? ', TableSelectAll' : ''} } from '@carbon/react';`,
];

export default {
  id: 'Table',
  imports,
  example: figma.code`<TableContainer${figma.helpers.react.renderProp(
    'title',
    headerItem.title
  )}${figma.helpers.react.renderProp('description', headerItem.description)}>
  ${figma.helpers.react.renderChildren(toolbar)}
  <Table aria-label="sample table">
    <TableHead>
      <TableRow>
        ${headerControls}
        ${figma.helpers.react.renderChildren(headerRow.children)}
      </TableRow>
    </TableHead>
    <TableBody>${figma.helpers.react.renderChildren(rowItems)}</TableBody>
  </Table>
  ${figma.helpers.react.renderChildren(pagination)}
  ${figma.helpers.react.renderChildren(slot)}
</TableContainer>`,
  metadata: { nestable: true },
};
