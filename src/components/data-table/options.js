export default settings => {
  const { prefix } = settings;
  return {
    selectorInit: '[data-responsive-table]',
    selectorExpandCells: `.${prefix}--table-expand`,
    selectorExpandableRows: `.${prefix}--expandable-row`,
    selectorParentRows: `.${prefix}--parent-row`,
    selectorTableBody: `.${prefix}--table-body`,
    selectorCheckbox: `.${prefix}--checkbox`,
    classParentRowEven: `${prefix}--parent-row--even`,
    classExpandableRow: `${prefix}--expandable-row`,
    classExpandableRowEven: `${prefix}--expandable-row--even`,
    classExpandableRowHidden: `${prefix}--expandable-row--hidden`,
    classTableSortAscending: `${prefix}--table-sort--ascending`,
    eventBeforeExpand: 'responsive-table-beforetoggleexpand',
    eventAfterExpand: 'responsive-table-aftertoggleexpand',
    eventBeforeSort: 'responsive-table-beforetogglesort',
    eventAfterSort: 'responsive-table-aftertogglesort',
    eventBeforeSelectAll: 'responsive-table-beforetoggleselectall',
    eventAfterSelectAll: 'responsive-table-aftertoggleselectall',
    eventTrigger: '[data-event]',
    eventParentContainer: '[data-parent-row]',
  };
};
