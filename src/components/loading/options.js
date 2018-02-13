export default prefix => ({
  selectorInit: '[data-loading]',
  selectorLoadingOverlay: `.${prefix}--loading-overlay`,
  classLoadingOverlay: `${prefix}--loading-overlay`,
  classLoadingStop: `${prefix}--loading--stop`,
  classLoadingOverlayStop: `${prefix}--loading-overlay--stop`,
  active: true,
});
