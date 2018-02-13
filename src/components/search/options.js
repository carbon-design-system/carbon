export default settings => {
  const { prefix } = settings;
  return {
    selectorInit: '[data-search]',
    selectorSearchView: '[data-search-view]',
    selectorSearchInput: `.${prefix}--search-input`,
    selectorClearIcon: `.${prefix}--search-close`,
    selectorIconContainer: `.${prefix}--search-button[data-search-toggle]`,
    classClearHidden: `${prefix}--search-close--hidden`,
    classLayoutHidden: `${prefix}--search-view--hidden`,
  };
};
