import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';

class Carousel extends mixin(createComponent, initComponentBySearch) {
  /**
   * Carousel.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as an carousel.
   */
  constructor(element, options) {
    super(element, options);
    this.filmstrip = this.element.querySelector(this.options.selectorFilmstrip);
    this.carouselItem = this.element.querySelector(this.options.selectorCarouselItem);

    this.element.addEventListener('click', evt => this.handleClick(evt));
  }

  handleClick = evt => {
    if (evt.target.matches(this.options.selectorScrollRight)) {
      this.sideScroll('right');
    } else {
      this.sideScroll('left');
    }
  };

  sideScroll = direction => {
    const filmstripWidth = this.filmstrip.getBoundingClientRect().width;
    const itemWidth = this.carouselItem.getBoundingClientRect().width + 20;
    const re = /\.*translateX\((.*)px\)/i;

    const translateXValue = this.filmstrip.style.transform ? Number(this.filmstrip.style.transform.split(re)[1]) : 0;
    const directionValue = direction === 'right' ? -1 : 1;

    const itemWidthDirection = itemWidth * directionValue;
    let newTranslateValue = itemWidthDirection + translateXValue;
    if (newTranslateValue > 0) {
      newTranslateValue = 0;
    }
    if (newTranslateValue < filmstripWidth * -1) {
      newTranslateValue = filmstripWidth * -1;
    }
    this.filmstrip.style.transform = `translateX(${newTranslateValue}px)`;
  };

  static options = {
    selectorInit: '[data-carousel]',
    selectorFilmstrip: '.bx--filmstrip',
    selectorScrollRight: '[data-scroll-right]',
    selectorScrollLeft: '[data-scroll-left]',
    selectorCarouselBtn: '.bx--carousel__btn',
    selectorCarouselItem: '.bx--carousel__item',
  };

  /**
   * The map associating DOM element and accordion UI instance.
   * @type {WeakMap}
   */
  static components = new WeakMap();
}

export default Carousel;
