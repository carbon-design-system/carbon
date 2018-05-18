import Carousel from '../../src/components/carousel/carousel';
import HTML from '../../html/carousel/carousel.html';
import flattenOptions from '../utils/flatten-options';

describe('Carousel', () => {
  describe('Constructor', () => {
    let element;
    let instance;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    beforeEach(() => {
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-carousel]');
      instance = new Carousel(element);
    });

    it('Should throw if root element is not given', () => {
      expect(() => {
        new Carousel();
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    it('Should throw if root element is not a DOM element', () => {
      expect(() => {
        new Carousel(document.createTextNode(''));
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    it('should set default options', () => {
      expect(flattenOptions(instance.options)).toEqual({
        selectorInit: '[data-carousel]',
        selectorFilmstrip: '.bx--filmstrip',
        selectorScrollRight: '[data-scroll-right]',
        selectorScrollLeft: '[data-scroll-left]',
        selectorCarouselBtn: '.bx--carousel__btn',
        selectorCarouselItem: '.bx--carousel__item',
      });
    });

    afterEach(() => {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('sideScroll', () => {
    let element;
    let instance;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    beforeEach(() => {
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-carousel]');
      instance = new Carousel(element);
    });

    it('should be called on click', () => {
      spyOn(instance, 'sideScroll');
      const event = new CustomEvent('click', { bubbles: true });
      const rightButton = element.querySelector(instance.options.selectorScrollRight);
      rightButton.dispatchEvent(event);
      expect(instance.sideScroll).toHaveBeenCalled();
    });

    it('should scroll right on click', () => {
      const initalStyle = instance.filmstrip.style.transform;
      const rightButton = element.querySelector(instance.options.selectorScrollRight);
      const event = new CustomEvent('click', { bubbles: true });
      rightButton.dispatchEvent(event);
      expect(initalStyle).not.toBe(instance.filmstrip.style.transform);
    });

    it('should scroll left on click', () => {
      const initalStyle = instance.filmstrip.style.transform;
      const leftButton = element.querySelector(instance.options.selectorScrollLeft);
      const event = new CustomEvent('click', { bubbles: true });
      leftButton.dispatchEvent(event);
      expect(initalStyle).not.toBe(instance.filmstrip.style.transform);
    });

    afterEach(() => {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });
});
