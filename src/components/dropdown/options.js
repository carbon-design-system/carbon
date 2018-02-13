export default prefix => ({
  selectorInit: '[data-dropdown]',
  selectorText: `.${prefix}--dropdown-text`,
  selectorItem: `.${prefix}--dropdown-link`,
  selectorItemSelected: `.${prefix}--dropdown--selected`,
  classSelected: `${prefix}--dropdown--selected`,
  classOpen: `${prefix}--dropdown--open`,
  classDisabled: `${prefix}--dropdown--disabled`,
  eventBeforeSelected: 'dropdown-beingselected',
  eventAfterSelected: 'dropdown-selected',
});
