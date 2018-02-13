export default prefix => ({
  selectorInit: '[data-tooltip-trigger]',
  classShown: `${prefix}--tooltip--shown`,
  attribTooltipTarget: 'data-tooltip-target',
  objMenuOffset: { top: 10, left: 0 },
  initEventNames: ['mouseover', 'focus'],
});
