export default settings => {
  const { prefix } = settings;
  return {
    selectorInit: '[data-numberinput]',
    selectorInput: `.${prefix}--number input`,
  };
};
