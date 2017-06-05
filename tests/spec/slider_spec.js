import 'core-js/modules/es6.weak-map'; // For PhantomJS
import Slider from '../../src/components/slider/slider';
import SliderHTML from '../../src/components/slider/slider.html';

describe('Test slider', function () {
  describe('Constructor', function () {
    let slider;

    it('Should throw if root element is not given', function () {
      expect(() => {
        slider = new Slider();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        slider = new Slider(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('Should set default options', function () {
      const container = document.createElement('div');
      container.innerHTML = SliderHTML;
      document.body.appendChild(container);
      slider = new Slider(document.querySelector('[data-slider]'));

      expect(slider.options).to.deep.equal({
        selectorInit: '[data-slider]',
        selectorTrack: '.bx--slider__track',
        selectorFilledTrack: '.bx--slider__filled-track',
        selectorThumb: '.bx--slider__thumb',
        selectorInput: '.bx--slider__input',
        eventBeforeSliderValueChange: 'slider-before-value-change',
        eventAfterSliderValueChange: 'slider-after-value-change',
        stepMuliplier: 6,
      });
    });

    afterEach(function () {
      if (slider) {
        slider = slider.release();
      }
    });
  });
  describe('Programatic change', function () {
    let slider;
    let thumb;
    let input;
    beforeEach(function () {
      const container = document.createElement('div');
      container.innerHTML = SliderHTML;
      document.body.appendChild(container);
      slider = new Slider(document.querySelector('[data-slider]'));
      thumb = container.querySelector('.bx--slider__thumb');
      input = container.querySelector('.bx--slider__input');
    });
    it('Should setValue as expected', function () {
      // console.debug(input);
      slider.setValue(1);
      expect(input.value).to.equal(1);
      expect(thumb.style.left).to.equal('100%');
    });
    it('Should stepUp as expected', function () {
    });
    it('Should stepDown as expected', function () {
    });
    afterEach(function () {
      if (slider) {
        slider = slider.release();
      }
    });
  });
});
