import 'core-js/modules/es6.weak-map'; // For PhantomJS
import Carousel from '../../src/components/carousel/carousel';
import HTML from '../../src/components/carousel/carousel.html';

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
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', () => {
      expect(() => {
        new Carousel(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('should set default options', () => {
      expect(instance.options).to.deep.equal({
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
      const spy = sinon.spy(instance, 'sideScroll');
      const event = new CustomEvent('click', { bubbles: true });
      const rightButton = element.querySelector(instance.options.selectorScrollRight);
      rightButton.dispatchEvent(event);
      expect(spy).to.have.been.called;
      spy.restore();
    });

    it('should scroll right on click', () => {
      const initalStyle = instance.filmstrip.style.transform;
      const rightButton = element.querySelector(instance.options.selectorScrollRight);
      const event = new CustomEvent('click', { bubbles: true });
      rightButton.dispatchEvent(event);
      expect(initalStyle).to.not.equal(instance.filmstrip.style.transform);
    });

    it('should scroll left on click', () => {
      const initalStyle = instance.filmstrip.style.transform;
      const leftButton = element.querySelector(instance.options.selectorScrollLeft);
      const event = new CustomEvent('click', { bubbles: true });
      leftButton.dispatchEvent(event);
      expect(initalStyle).to.not.equal(instance.filmstrip.style.transform);
    });

    afterEach(() => {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });
});
