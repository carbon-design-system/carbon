export default () => ({
  selectorContainer: '[data-floating-menu-container]',
  selectorPrimaryFocus: '[data-floating-menu-primary-focus]',
  attribDirection: 'data-floating-menu-direction',
  classShown: '', // Should be provided from options arg in constructor
  classRefShown: '', // Should be provided from options arg in constructor
  eventBeforeShown: 'floating-menu-beingshown',
  eventAfterShown: 'floating-menu-shown',
  eventBeforeHidden: 'floating-menu-beinghidden',
  eventAfterHidden: 'floating-menu-hidden',
  refNode: null, // Should be provided from options arg in constructor
  offset: {
    left: 0,
    top: 0,
  },
});
