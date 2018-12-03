import warning from 'warning';
import { breakingChangesX } from '../../globals/js/feature-flags';
import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import removedComponent from '../removed-component';

let didWarnAboutDeprecation;

class Carousel extends mixin(createComponent, initComponentBySearch) {
  /**
   * Carousel.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as an carousel.
   */
  constructor(element, options) {
    super(element, options);
    if (__DEV__) {
      warning(
        didWarnAboutDeprecation,
        'The `Carousel` component in `carbon-components` has been deprecated. It will be removed in the next major release.'
      );
      didWarnAboutDeprecation = true;
    }
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

  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-carousel]',
      selectorFilmstrip: `.${prefix}--filmstrip`,
      selectorScrollRight: '[data-scroll-right]',
      selectorScrollLeft: '[data-scroll-left]',
      selectorCarouselBtn: `.${prefix}--carousel__btn`,
      selectorCarouselItem: `.${prefix}--carousel__item`,
    };
  }

  /**
   * The map associating DOM element and accordion UI instance.
   * @type {WeakMap}
   */
  static components = new WeakMap();
}

export default (!breakingChangesX ? Carousel : removedComponent('Carousel'));
