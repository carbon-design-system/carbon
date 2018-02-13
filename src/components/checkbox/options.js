export default settings => {
  const { prefix } = settings;
  return {
    selectorInit: `.${prefix}--checkbox`,
  };
};
