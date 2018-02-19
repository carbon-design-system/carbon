export default settings => {
  const { prefix } = settings;
  return {
    selectorInit: '[data-toolbar]',
    selectorSearch: '[data-toolbar-search]',
    selectorRowHeight: '[data-row-height]',
    classTallRows: `${prefix}--responsive-table--tall`,
    classSearchActive: `${prefix}--toolbar-search--active`,
  };
};
