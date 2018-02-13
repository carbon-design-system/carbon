export default prefix => ({
  selectorInit: '[data-lightbox]',
  selectorScrollRight: '[data-scroll-right]',
  selectorScrollLeft: '[data-scroll-left]',
  selectorLightboxItem: `.${prefix}--lightbox__item`,
  classActiveItem: `${prefix}--lightbox__item--shown`,
});
