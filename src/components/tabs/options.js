export default prefix => ({
  selectorInit: '[data-tabs]',
  selectorMenu: `.${prefix}--tabs__nav`,
  selectorTrigger: `.${prefix}--tabs-trigger`,
  selectorTriggerText: `.${prefix}--tabs-trigger-text`,
  selectorButton: `.${prefix}--tabs__nav-item`,
  selectorButtonSelected: `.${prefix}--tabs__nav-item--selected`,
  selectorLink: `.${prefix}--tabs__nav-link`,
  classActive: `${prefix}--tabs__nav-item--selected`,
  classHidden: `${prefix}--tabs__nav--hidden`,
  eventBeforeSelected: 'tab-beingselected',
  eventAfterSelected: 'tab-selected',
});
