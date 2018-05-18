import Lightbox from '../../src/components/lightbox/lightbox';
import HTML from '../../html/lightbox/lightbox.html';
import flattenOptions from '../utils/flatten-options';

describe('Lightbox', () => {
  describe('Constructor', () => {
    let element;
    let instance;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    beforeEach(() => {
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-lightbox]');
      instance = new Lightbox(element);
    });

    it('Should throw if root element is not given', () => {
      expect(() => {
        new Lightbox();
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    it('Should throw if root element is not a DOM element', () => {
      expect(() => {
        new Lightbox(document.createTextNode(''));
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    it('should set default options', () => {
      expect(flattenOptions(instance.options)).toEqual({
        selectorInit: '[data-lightbox]',
        selectorScrollRight: '[data-scroll-right]',
        selectorScrollLeft: '[data-scroll-left]',
        selectorLightboxItem: '.bx--lightbox__item',
        classActiveItem: 'bx--lightbox__item--shown',
      });
    });

    afterEach(() => {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('updateSlide', () => {
    let element;
    let instance;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    beforeEach(() => {
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-lightbox]');
      instance = new Lightbox(element);
    });

    it('should be called on click', () => {
      spyOn(instance, 'updateSlide');
      const event = new CustomEvent('click', { bubbles: true });
      const rightButton = element.querySelector(instance.options.selectorScrollRight);
      rightButton.dispatchEvent(event);
      expect(instance.updateSlide).toHaveBeenCalled();
    });

    afterEach(() => {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });
});
