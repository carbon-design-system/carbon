export default prefix => ({
  selectorInit: '[data-content-switcher]',
  selectorButton: `input[type="radio"], .${prefix}--content-switcher-btn`,
  classActive: `${prefix}--content-switcher--selected`,
  eventBeforeSelected: 'content-switcher-beingselected',
  eventAfterSelected: 'content-switcher-selected',
});
