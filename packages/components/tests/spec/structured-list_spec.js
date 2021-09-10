import StructuredList from '../../src/components/structured-list/structured-list';
import HTML from '../../html/structured-list/structured-list--selection.html';
import flattenOptions from '../utils/flatten-options';

describe('StructuredList', function () {
  describe('Constructor', function () {
    let instance;
    let element;
    let wrapper;

    beforeAll(function () {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-structured-list]');
      instance = new StructuredList(element);
    });

    it('should throw if root element is not given', function () {
      expect(() => {
        new StructuredList();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('should throw if root element is not a DOM element', function () {
      expect(() => {
        new StructuredList(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('should set default options', function () {
      // Spread operator does not take non-owning props
      const { selectorListInput, ...options } = Object.getPrototypeOf(
        instance.options
      );
      expect(selectorListInput('foo'), 'selectorListInput option').toBe(
        '#foo.bx--structured-list-input'
      );
      expect(flattenOptions(options), 'Other options').toEqual({
        selectorInit: '[data-structured-list]',
        selectorRow:
          '[data-structured-list] .bx--structured-list-tbody > label.bx--structured-list-row',
        classActive: 'bx--structured-list-row--selected',
      });
    });

    afterAll(function () {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('_handleKeydownChecked(evt)', function () {
    let instance;
    let element;
    let wrapper;

    beforeEach(function () {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-structured-list]');
      instance = new StructuredList(element);
    });

    it('should be called on "enter" keydown event', function () {
      spyOn(instance, '_handleKeydownChecked');
      const event = Object.assign(
        new CustomEvent('keydown', {
          bubbles: true,
        }),
        { which: 13 }
      );
      instance.element.dispatchEvent(event);
      expect(instance._handleKeydownChecked).toHaveBeenCalled();
    });

    it('should be called on "space" keydown event', function () {
      spyOn(instance, '_handleKeydownChecked');
      const event = Object.assign(
        new CustomEvent('keydown', {
          bubbles: true,
        }),
        { which: 32 }
      );
      instance.element.dispatchEvent(event);
      expect(instance._handleKeydownChecked).toHaveBeenCalled();
    });

    it('should not be called with another keydown event', function () {
      spyOn(instance, '_handleKeydownChecked');
      const event = Object.assign(
        new CustomEvent('keydown', {
          bubbles: true,
        }),
        { which: 40 }
      );
      instance.element.dispatchEvent(event);
      expect(instance._handleKeydownChecked).not.toHaveBeenCalled();
    });

    afterEach(function () {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('_handleClick(evt)', function () {
    let instance;
    let element;
    let wrapper;

    beforeEach(function () {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-structured-list]');
      instance = new StructuredList(element);
    });

    it('should be called on "click" keydown event', function () {
      spyOn(instance, '_handleClick');
      const event = Object.assign(
        new CustomEvent('click', {
          bubbles: true,
        })
      );
      instance.element.dispatchEvent(event);
      expect(instance._handleClick).toHaveBeenCalled();
    });

    it('should toggle classActive on a selectorRow', function () {
      spyOn(instance, '_handleClick').and.callThrough();
      const event = Object.assign(
        new CustomEvent('click', {
          bubbles: true,
        })
      );
      const rows = instance.element.querySelectorAll(
        instance.options.selectorRow
      );
      rows[1].dispatchEvent(event);
      expect(rows[1].classList.contains(instance.options.classActive)).toBe(
        true
      );
    });

    afterEach(function () {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('_direction(evt)', function () {
    let instance;
    let element;
    let wrapper;

    beforeEach(function () {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-structured-list]');
      instance = new StructuredList(element);
    });

    it('should be called on "up" keydown event', function () {
      spyOn(instance, '_direction');
      const event = Object.assign(
        new CustomEvent('keydown', {
          bubbles: true,
        }),
        { which: 38 }
      );
      instance.element.dispatchEvent(event);
      expect(instance._direction).toHaveBeenCalled();
    });

    it('should be called on "down" keydown event', function () {
      spyOn(instance, '_direction');
      const event = Object.assign(
        new CustomEvent('keydown', {
          bubbles: true,
        }),
        { which: 40 }
      );
      instance.element.dispatchEvent(event);
      expect(instance._direction).toHaveBeenCalled();
    });

    it('should return -1 on "up" key', function () {
      const event = Object.assign(
        new CustomEvent('keydown', {
          bubbles: true,
        }),
        { which: 38 }
      );
      const direction = instance._direction(event);
      expect(direction).toBe(-1);
    });

    it('should return 1 on "down" key', function () {
      const event = Object.assign(
        new CustomEvent('keydown', {
          bubbles: true,
        }),
        { which: 40 }
      );
      const direction = instance._direction(event);
      expect(direction).toBe(1);
    });

    it('should return undefined on other key presses', function () {
      const event = Object.assign(
        new CustomEvent('keydown', {
          bubbles: true,
        }),
        { which: 70 }
      );
      const direction = instance._direction(event);
      expect(direction).toBe(undefined);
    });

    afterEach(function () {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('_nextIndex()', function () {
    let instance;
    let element;
    let wrapper;

    beforeEach(function () {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-structured-list]');
      instance = new StructuredList(element);
    });

    it('should be called', function () {
      spyOn(instance, '_nextIndex');
      instance._nextIndex([0, 1, 2, 3], 0, 1);
      expect(instance._nextIndex).toHaveBeenCalled();
    });

    it('should return a number', function () {
      const array = [0, 1, 2, 3];
      const result = instance._nextIndex(array, 0, 1);
      expect(typeof result).toBe('number');
    });

    afterEach(function () {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('_handleInputChecked()', function () {
    let instance;
    let element;
    let wrapper;

    beforeEach(function () {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-structured-list]');
      instance = new StructuredList(element);
    });

    it('should be called', function () {
      spyOn(instance, '_handleInputChecked');
      instance._handleInputChecked(0);
      expect(instance._handleInputChecked).toHaveBeenCalled();
    });

    afterEach(function () {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('_handleKeydownArrow(evt)', function () {
    let instance;
    let element;
    let wrapper;

    beforeEach(function () {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-structured-list]');
      instance = new StructuredList(element);
    });

    it('should be called on "up" keydown event', function () {
      spyOn(instance, '_handleKeydownArrow');
      const event = Object.assign(
        new CustomEvent('keydown', {
          bubbles: true,
        }),
        { which: 38 }
      );
      instance.element.dispatchEvent(event);
      expect(instance._handleKeydownArrow).toHaveBeenCalled();
    });

    it('should be called on "down" keydown event', function () {
      spyOn(instance, '_handleKeydownArrow');
      const event = Object.assign(
        new CustomEvent('keydown', {
          bubbles: true,
        }),
        { which: 40 }
      );
      instance.element.dispatchEvent(event);
      expect(instance._handleKeydownArrow).toHaveBeenCalled();
    });

    it('should not be called with another keydown event', function () {
      spyOn(instance, '_handleKeydownArrow');
      const event = Object.assign(
        new CustomEvent('keydown', {
          bubbles: true,
        }),
        { which: 13 }
      );
      instance.element.dispatchEvent(event);
      expect(instance._handleKeydownArrow).not.toHaveBeenCalled();
    });

    afterEach(function () {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });
});
