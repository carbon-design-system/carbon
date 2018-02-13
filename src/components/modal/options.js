export default settings => {
  const { prefix } = settings;
  return {
    selectorInit: '[data-modal]',
    selectorModalClose: '[data-modal-close]',
    selectorPrimaryFocus: '[data-modal-primary-focus]',
    selectorsFloatingMenus: [`.${prefix}--overflow-menu-options`, '.bx-tooltip'],
    classVisible: 'is-visible',
    attribInitTarget: 'data-modal-target',
    initEventNames: ['click'],
    eventBeforeShown: 'modal-beingshown',
    eventAfterShown: 'modal-shown',
    eventBeforeHidden: 'modal-beinghidden',
    eventAfterHidden: 'modal-hidden',
  };
};
