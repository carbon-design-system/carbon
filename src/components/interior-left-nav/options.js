export default prefix => ({
  selectorInit: '[data-interior-left-nav]',
  // Data Attribute selectors
  selectorLeftNavList: '[data-interior-left-nav-list]',
  selectorLeftNavNestedList: '[data-interior-left-nav-nested-list]',
  selectorLeftNavListItem: '[data-interior-left-nav-item]',
  selectorLeftNavListItemLink: '[data-interior-left-nav-item-link]',
  selectorLeftNavNestedListItem: '[data-interior-left-nav-nested-item]',
  selectorLeftNavListItemHasChildren: '[data-interior-left-nav-with-children]',
  selectorLeftNavCollapse: '[data-interior-left-nav-collapse]',
  selectorLeftNavArrowTitle: '[data-interior-left-nav-arrow] title',
  // CSS Class Selectors
  classActiveLeftNavListItem: 'left-nav-list__item--active',
  classExpandedLeftNavListItem: 'left-nav-list__item--expanded',
  classLeftNavCollapsing: `${prefix}--interior-left-nav--collapsing`,
  classLeftNavCollapsed: `${prefix}--interior-left-nav--collapsed`,
  classLeftNavExpanding: `${prefix}--interior-left-nav--expanding`,
  // Event
  eventBeforeLeftNavToggled: 'left-nav-beingtoggled',
  eventAfterLeftNavToggled: 'left-nav-toggled',
  // Option
  expandTitle: 'Expand nav pane',
  collapseTitle: 'Collapse nav pane',
  keepOpen: false,
});
