export default prefix => ({
  selectorInit: '[data-structured-list]',
  selectorRow: `[data-structured-list] .${prefix}--structured-list-tbody > label.${prefix}--structured-list-row`,
  selectorListInput: id => `#${id}.${prefix}--structured-list-input`,
  classActive: `${prefix}--structured-list-row--selected`,
});
