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
        stepMuliplier: 4,
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
    beforeEach(function () {
      const container = document.createElement('div');
      container.innerHTML = SliderHTML;
      document.body.appendChild(container);
      slider = new Slider(document.querySelector('[data-slider]'));
    });
    it('Should setValue as expected', function () {
      slider.setValue(1);
      expect(slider.getInputProps().value).to.equal('1');
    });
    it('Should stepUp as expected', function () {
      slider.setValue(0.5);
      slider.stepUp();
      expect(slider.getInputProps().value).to.equal('0.51');
    });
    it('Should stepDown as expected', function () {
      slider.setValue(0.5);
      slider.stepDown();
      expect(slider.getInputProps().value).to.equal('0.49');
    });
    afterEach(function () {
      if (slider) {
        slider = slider.release();
      }
    });
  });
  describe('Keydown on slider', function () {
    let slider;
    let thumb;
    beforeEach(function () {
      const container = document.createElement('div');
      container.innerHTML = SliderHTML;
      document.body.appendChild(container);
      slider = new Slider(document.querySelector('[data-slider]'));
      thumb = document.querySelector('.bx--slider__thumb');
    });
    it('Should stepUp value on up/right key', function () {
      const event = new CustomEvent('keydown', { bubbles: true });
      event.which = 39;
      thumb.dispatchEvent(event);
      expect(slider.getInputProps().value).to.equal('0.51');
    });
    it('Should stepUp value on down/left key', function () {
      const event = new CustomEvent('keydown', { bubbles: true });
      event.which = 40;
      thumb.dispatchEvent(event);
      // console.debug(slider.getInputProps().value);
      expect(slider.getInputProps().value).to.equal('0.49');
    });
    afterEach(function () {
      if (slider) {
        slider = slider.release();
      }
    });
  });
  describe('Click and drag on slider', function () {
    let slider;
    let track;
    beforeEach(function () {
      const container = document.createElement('div');
      container.innerHTML = SliderHTML;
      document.body.appendChild(container);
      slider = new Slider(document.querySelector('[data-slider]'));
      // thumb = document.querySelector('.bx--slider__thumb');
      track = document.querySelector('.bx--slider__track');
    });
    it('Should change value on click', function () {
      const event = new CustomEvent('click', { bubbles: true });
      event.clientX = 100;
      track.dispatchEvent(event);
      // console.debug(slider.getInputProps().value);
      expect(slider.getInputProps().value).to.equal('0');
    });
    afterEach(function () {
      if (slider) {
        slider = slider.release();
      }
    });
  });
});
