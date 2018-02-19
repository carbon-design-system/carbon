export default settings => {
  const { prefix } = settings;
  return {
    selectorInit: '[data-carousel]',
    selectorFilmstrip: `.${prefix}--filmstrip`,
    selectorScrollRight: '[data-scroll-right]',
    selectorScrollLeft: '[data-scroll-left]',
    selectorCarouselBtn: `.${prefix}--carousel__btn`,
    selectorCarouselItem: `.${prefix}--carousel__item`,
  };
};
