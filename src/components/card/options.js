export default settings => {
  const { prefix } = settings;
  return {
    selectorInit: '[data-card-list]',
    selectorCard: `.${prefix}--card`,
  };
};
