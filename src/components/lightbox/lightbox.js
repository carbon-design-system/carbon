import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
// import eventedShowHideState from '../../globals/js/mixins/evented-show-hide-state';
import eventMatches from '../../globals/js/misc/event-matches';
// import on from '../../globals/js/misc/on';

class Lightbox extends mixin(createComponent, initComponentBySearch) {
  constructor(element, options) {
    super(element, options);
    this.activeIndex = this.element.dataset.lightboxIndex;
    this.totalSlides =
      [...this.element.querySelectorAll(this.options.selectorLightboxItem)].length - 1;
    this.filmstrip = this.element.querySelector(this.options.selectorFilmstrip);
    this.filmstripItem = this.element.querySelector(this.options.selectorFilmstripItem);

    this.updateSlide();
    this.updateFilmstrip();

    this.element.addEventListener('click', evt => this.handleClick(evt));

    this.element.parentNode.addEventListener('modal-beingshown', evt => {
      if (!evt.detail.launchingElement.dataset.carouselItemIndex) {
        throw new Error(
          'launchingElement must have carouselItemIndex data attribute to indicated what item to display'
        );
      }
      this.activeIndex = evt.detail.launchingElement.dataset.carouselItemIndex;
      this.updateSlide();
      this.updateFilmstrip();
    });
  }

  handleClick = evt => {
    if (evt.target.matches(this.options.selectorScrollRight)) {
      if (this.activeIndex < this.totalSlides) {
        this.activeIndex++;
        this.updateSlide();
        this.updateFilmstrip();
      }
    }

    if (evt.target.matches(this.options.selectorScrollLeft)) {
      if (this.activeIndex > 0) {
        this.activeIndex--;
        this.updateSlide();
        this.updateFilmstrip();
      }
    }

    const filmstripItem = eventMatches(evt, this.options.selectorFilmstripItem);
    if (filmstripItem) {
      this.activeIndex = filmstripItem.dataset.carouselItemIndex;
      this.updateSlide();
      this.updateFilmstrip();
    }

    const filmstripBtn = eventMatches(evt, this.options.selectorFilmstripBtn);
    if (filmstripBtn) {
      this.activeIndex = filmstripBtn.dataset.carouselItemIndex;
      this.updateSlide();
      this.updateFilmstrip();
      this.updateFilmstripIndicator();
      // this.sideScroll('right');
    }
  };

  updateFilmstripIndicator = () => {
    const activeIndex = parseInt(this.activeIndex, 10);
    const activeClass = this.options.classFilmstripIndicatorActiveItem;
    const items = [
      ...this.element.querySelectorAll(this.options.selectorFilmstripIndicator),
    ];
    items.forEach(item => item.classList.remove(activeClass));

    if (activeIndex === 0) {
      console.log('first');
      items[0].classList.add(activeClass);
    }

    if (activeIndex > 0 && activeIndex <= items.length) {
      console.log('middle');
      items[1].classList.add(activeClass);
    }

    if (activeIndex > items.length) {
      console.log('last');
      items[2].classList.add(activeClass);
    }
  };

  updateSlide = () => {
    console.log('updateSlide');
    const items = [...this.element.querySelectorAll(this.options.selectorLightboxItem)];
    items.forEach(item => item.classList.remove(this.options.classActiveItem));
    items[this.activeIndex].classList.add(this.options.classActiveItem);
  };

  updateFilmstrip = () => {
    console.log('updateFilmstrip');
    const items = [...this.element.querySelectorAll(this.options.selectorFilmstripItem)];
    items.forEach(item => item.classList.remove(this.options.classFilmstripActiveItem));
    items[this.activeIndex].classList.add(this.options.classFilmstripActiveItem);
  };

  sideScroll = direction => {
    console.log('sideScroll');
    const filmstripWidth = this.filmstrip.getBoundingClientRect().width;
    const itemWidth = this.filmstripItem.getBoundingClientRect().width + 20;
    const re = /\.*translateX\((.*)px\)/i;
    const translateXValue = this.filmstrip.style.transform
      ? Number(this.filmstrip.style.transform.split(re)[1])
      : 0;
    direction = direction === 'right' ? -1 : 1;
    const itemWidthDirection = itemWidth * direction;
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
    selectorInit: '[data-lightbox]',
    selectorScrollRight: '[data-scroll-right]',
    selectorScrollLeft: '[data-scroll-left]',
    selectorLightboxItem: '.bx--lightbox__item',
    selectorFilmstrip: '.bx--filmstrip',
    selectorFilmstripBtn: '.bx--filmstrip-btn',
    selectorFilmstripIndicator: '.bx--filmstrip-indicator',
    selectorFilmstripItem: '.bx--carousel__item',
    classActiveItem: 'bx--lightbox__item--shown',
    classFilmstripActiveItem: 'bx--carousel__item--active',
    classFilmstripIndicatorActiveItem: 'bx--filmstrip-indicator--active',
  };

  /**
   * The map associating DOM element and accordion UI instance.
   * @type {WeakMap}
   */
  static components = new WeakMap();
}

export default Lightbox;
