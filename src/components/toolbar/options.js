export default prefix => ({
  selectorInit: '[data-toolbar]',
  selectorSearch: '[data-toolbar-search]',
  selectorRowHeight: '[data-row-height]',
  classTallRows: `${prefix}--responsive-table--tall`,
  classSearchActive: `${prefix}--toolbar-search--active`,
});
