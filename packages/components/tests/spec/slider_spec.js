import createMockRaf from 'mock-raf';
import Slider from '../../src/components/slider/slider';
import SliderHTML from '../../html/slider/slider.html';
import flattenOptions from '../utils/flatten-options';

describe('Test slider', function () {
  describe('Constructor', function () {
    let slider;

    it('Should throw if root element is not given', function () {
      expect(() => {
        slider = new Slider();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        slider = new Slider(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should set default options', function () {
      const container = document.createElement('div');
      container.innerHTML = SliderHTML;
      document.body.appendChild(container);
      slider = new Slider(document.querySelector('[data-slider]'));

      expect(flattenOptions(slider.options)).toEqual({
        selectorInit: '[data-slider]',
        selectorTrack: '.bx--slider__track',
        selectorFilledTrack: '.bx--slider__filled-track',
        selectorThumb: '.bx--slider__thumb',
        selectorInput: '.bx--slider__input',
        classDisabled: 'bx--slider--disabled',
        classThumbClicked: 'bx--slider__thumb--clicked',
        eventBeforeSliderValueChange: 'slider-before-value-change',
        eventAfterSliderValueChange: 'slider-after-value-change',
        stepMultiplier: 4,
      });
    });

    afterEach(function () {
      if (slider) {
        slider = slider.release();
      }
    });
  });
  describe('Programmatic change', function () {
    let slider;
    let container;
    beforeEach(function () {
      container = document.createElement('div');
      container.innerHTML = SliderHTML;
      document.body.appendChild(container);
      slider = new Slider(document.querySelector('[data-slider]'));
    });
    it('Should setValue as expected', function () {
      slider.setValue(100);
      expect(slider.getInputProps().value).toBe(100);
    });
    it('Should stepUp as expected', function () {
      slider.setValue(50);
      slider.stepUp();
      expect(slider.getInputProps().value).toBe(51);
    });
    it('Should stepDown as expected', function () {
      slider.setValue(50);
      slider.stepDown();
      expect(slider.getInputProps().value).toBe(49);
    });
    afterEach(function () {
      if (slider) {
        slider = slider.release();
        document.body.innerHTML = '';
      }
    });
  });
  describe('Keydown on slider', function () {
    let container;
    let slider;
    let thumb;
    let mockRaf;
    beforeEach(function () {
      mockRaf = createMockRaf();
      spyOn(window, 'requestAnimationFrame').and.callFake(mockRaf.raf);
      container = document.createElement('div');
      container.innerHTML = SliderHTML;
      document.body.appendChild(container);
      slider = new Slider(document.querySelector('[data-slider]'));
      thumb = document.querySelector('.bx--slider__thumb');
      mockRaf.step({ count: 1 });
      slider.setValue(50);
    });
    it('Should stepUp value on up/right key', function () {
      const event = new CustomEvent('keydown', { bubbles: true });
      event.which = 39;
      thumb.dispatchEvent(event);
      mockRaf.step({ count: 1 });
      thumb.dispatchEvent(event);
      mockRaf.step({ count: 1 });
      expect(slider.getInputProps().value).toBe(51);
      event.which = 38;
      thumb.dispatchEvent(event);
      mockRaf.step({ count: 1 });
      expect(slider.getInputProps().value).toBe(52);
    });
    it('Should stepDown value on down/left key', function () {
      const event = new CustomEvent('keydown', { bubbles: true });
      event.which = 40;
      thumb.dispatchEvent(event);
      mockRaf.step({ count: 1 });
      thumb.dispatchEvent(event);
      mockRaf.step({ count: 1 });
      expect(slider.getInputProps().value).toBe(49);
      event.which = 37;
      thumb.dispatchEvent(event);
      mockRaf.step({ count: 1 });
      expect(slider.getInputProps().value).toBe(48);
    });
    afterEach(function () {
      if (slider) {
        slider = slider.release();
        document.body.innerHTML = '';
      }
    });
  });
  describe('Click on slider', function () {
    let container;
    let slider;
    let track;
    let mockRaf;
    beforeEach(function () {
      mockRaf = createMockRaf();
      spyOn(window, 'requestAnimationFrame').and.callFake(mockRaf.raf);
      container = document.createElement('div');
      container.innerHTML = SliderHTML;
      document.body.appendChild(container);
      slider = new Slider(document.querySelector('[data-slider]'));
      track = document.querySelector('.bx--slider__track');
      mockRaf.step({ count: 1 });
    });
    it('Should change value on click', function () {
      const event = new CustomEvent('click', { bubbles: true });
      event.clientX = 0;
      track.dispatchEvent(event);
      mockRaf.step({ count: 1 });
      expect(slider.getInputProps().value).toBe(0);
    });
    afterEach(function () {
      if (slider) {
        slider = slider.release();
        document.body.innerHTML = '';
      }
    });
  });
});
