import warning from 'warning';
import { breakingChangesX } from '../../globals/js/feature-flags';
import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import removedComponent from '../removed-component';

let didWarnAboutDeprecation;

class Lightbox extends mixin(createComponent, initComponentBySearch) {
  constructor(element, options) {
    super(element, options);
    if (__DEV__) {
      warning(
        didWarnAboutDeprecation,
        'The `Lightbox` component in `carbon-components` has been deprecated. It will be removed in the next major release.'
      );
      didWarnAboutDeprecation = true;
    }
    this.activeIndex = this.element.dataset.lightboxIndex;
    this.totalSlides = this.element.querySelectorAll(this.options.selectorLightboxItem).length - 1;

    this.updateSlide();

    this.element.addEventListener('click', evt => this.handleClick(evt));
    this.element.parentNode.addEventListener('modal-beingshown', evt => this.showLightbox(evt));
  }

  showLightbox = evt => {
    if (!evt.detail.launchingElement.dataset.carouselItemIndex) {
      throw new Error('launchingElement must have carouselItemIndex data attribute to indicated what item to display');
    }
    this.activeIndex = evt.detail.launchingElement.dataset.carouselItemIndex;
    this.updateSlide();
  };

  handleClick = evt => {
    if (evt.target.matches(this.options.selectorScrollRight)) {
      if (this.activeIndex < this.totalSlides) {
        this.activeIndex++;
        this.updateSlide();
      }
    }

    if (evt.target.matches(this.options.selectorScrollLeft)) {
      if (this.activeIndex > 0) {
        this.activeIndex--;
        this.updateSlide();
      }
    }
  };

  updateSlide = () => {
    const items = [...this.element.querySelectorAll(this.options.selectorLightboxItem)];
    if (this.activeIndex < 0 || this.activeIndex >= items.length) {
      throw new RangeError('carouselItemIndex data attribute must be in range of lightbox items length');
    }
    items.forEach(item => item.classList.remove(this.options.classActiveItem));
    items[this.activeIndex].classList.add(this.options.classActiveItem);
  };

  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-lightbox]',
      selectorScrollRight: '[data-scroll-right]',
      selectorScrollLeft: '[data-scroll-left]',
      selectorLightboxItem: `.${prefix}--lightbox__item`,
      classActiveItem: `${prefix}--lightbox__item--shown`,
    };
  }

  /**
   * The map associating DOM element and accordion UI instance.
   * @type {WeakMap}
   */

  static components = new WeakMap();
}

export default (!breakingChangesX ? Lightbox : removedComponent('Lightbox'));
