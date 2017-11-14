import createMockRaf from 'mock-raf';
import Slider from '../../src/components/slider/slider';
import SliderHTML from '../../src/components/slider/slider.html';

describe('Test slider', function() {
  describe('Constructor', function() {
    let slider;

    it('Should throw if root element is not given', function() {
      expect(() => {
        slider = new Slider();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        slider = new Slider(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('Should set default options', function() {
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
        stepMultiplier: 4,
      });
    });

    afterEach(function() {
      if (slider) {
        slider = slider.release();
      }
    });
  });
  describe('Programatic change', function() {
    let slider;
    let container;
    beforeEach(function() {
      container = document.createElement('div');
      container.innerHTML = SliderHTML;
      document.body.appendChild(container);
      slider = new Slider(document.querySelector('[data-slider]'));
    });
    it('Should setValue as expected', function() {
      slider.setValue(100);
      expect(slider.getInputProps().value).to.equal(100);
    });
    it('Should stepUp as expected', function() {
      slider.setValue(50);
      slider.stepUp();
      expect(slider.getInputProps().value).to.equal(51);
    });
    it('Should stepDown as expected', function() {
      slider.setValue(50);
      slider.stepDown();
      expect(slider.getInputProps().value).to.equal(49);
    });
    afterEach(function() {
      if (slider) {
        slider = slider.release();
        document.body.innerHTML = '';
      }
    });
  });
  describe('Keydown on slider', function() {
    let container;
    let slider;
    let thumb;
    let mockRaf;
    let rafStub;
    beforeEach(function() {
      mockRaf = createMockRaf();
      rafStub = sinon.stub(window, 'requestAnimationFrame').callsFake(mockRaf.raf);
      container = document.createElement('div');
      container.innerHTML = SliderHTML;
      document.body.appendChild(container);
      slider = new Slider(document.querySelector('[data-slider]'));
      thumb = document.querySelector('.bx--slider__thumb');
      mockRaf.step({ count: 1 });
    });
    it('Should stepUp value on up/right key', function() {
      const event = new CustomEvent('keydown', { bubbles: true });
      event.which = 39;
      thumb.dispatchEvent(event);
      mockRaf.step({ count: 1 });
      expect(slider.getInputProps().value).to.equal(51);
      event.which = 38;
      thumb.dispatchEvent(event);
      mockRaf.step({ count: 1 });
      expect(slider.getInputProps().value).to.equal(52);
    });
    it('Should stepDown value on down/left key', function() {
      const event = new CustomEvent('keydown', { bubbles: true });
      event.which = 40;
      thumb.dispatchEvent(event);
      mockRaf.step({ count: 1 });
      expect(slider.getInputProps().value).to.equal(49);
      event.which = 37;
      thumb.dispatchEvent(event);
      mockRaf.step({ count: 1 });
      expect(slider.getInputProps().value).to.equal(48);
    });
    afterEach(function() {
      if (mockRaf) {
        rafStub.restore();
        rafStub = null;
      }
      if (slider) {
        slider = slider.release();
        document.body.innerHTML = '';
      }
    });
  });
  describe('Click on slider', function() {
    let container;
    let slider;
    let track;
    let mockRaf;
    let rafStub;
    beforeEach(function() {
      mockRaf = createMockRaf();
      rafStub = sinon.stub(window, 'requestAnimationFrame').callsFake(mockRaf.raf);
      container = document.createElement('div');
      container.innerHTML = SliderHTML;
      document.body.appendChild(container);
      slider = new Slider(document.querySelector('[data-slider]'));
      track = document.querySelector('.bx--slider__track');
      mockRaf.step({ count: 1 });
    });
    it('Should change value on click', function() {
      const event = new CustomEvent('click', { bubbles: true });
      event.clientX = 0;
      track.dispatchEvent(event);
      mockRaf.step({ count: 1 });
      expect(slider.getInputProps().value).to.equal(0);
    });
    afterEach(function() {
      if (mockRaf) {
        rafStub.restore();
        rafStub = null;
      }
      if (slider) {
        slider = slider.release();
        document.body.innerHTML = '';
      }
    });
  });
});
