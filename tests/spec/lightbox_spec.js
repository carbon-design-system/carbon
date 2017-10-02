import 'core-js/modules/es6.weak-map'; // For PhantomJS
import Lightbox from '../../src/components/lightbox/lightbox';
import HTML from '../../src/components/lightbox/lightbox.html';

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
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', () => {
      expect(() => {
        new Lightbox(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('should set default options', () => {
      expect(instance.options).to.deep.equal({
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
      const spy = sinon.spy(instance, 'updateSlide');
      const event = new CustomEvent('click', { bubbles: true });
      const rightButton = element.querySelector(instance.options.selectorScrollRight);
      rightButton.dispatchEvent(event);
      expect(spy).to.have.been.called;
      spy.restore();
    });

    afterEach(() => {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });
});
