export default settings => {
  const { prefix } = settings;
  return {
    selectorInit: '[data-detail-page-header]',
    scroll: `${prefix}--detail-page-header--scroll`,
  };
};
