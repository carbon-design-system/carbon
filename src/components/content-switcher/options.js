export default settings => {
  const { prefix } = settings;
  return {
    selectorInit: '[data-content-switcher]',
    selectorButton: `input[type="radio"], .${prefix}--content-switcher-btn`,
    classActive: `${prefix}--content-switcher--selected`,
    eventBeforeSelected: 'content-switcher-beingselected',
    eventAfterSelected: 'content-switcher-selected',
  };
};
