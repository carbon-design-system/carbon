import Promise, { delay } from 'bluebird'; // For testing on browsers not supporting Promise
import EventManager from '../utils/event-manager';
import NumberInput from '../../src/components/number-input/number-input';
import HTML from '../../html/number-input/number-input.html';
import flattenOptions from '../utils/flatten-options';

describe('Test Number Input', function () {
  describe('Constructor', function () {
    let element;
    let instance;
    let container;

    beforeAll(function () {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-numberinput]');
      instance = new NumberInput(element);
    });

    it('Should throw if root element is not given', function () {
      expect(() => {
        new NumberInput();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        new NumberInput(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('should set default options', function () {
      expect(flattenOptions(instance.options)).toEqual({
        selectorInit: '[data-numberinput]',
        selectorInput: '.bx--number input',
      });
    });

    afterAll(function () {
      document.body.removeChild(container);
      instance.release();
    });
  });

  describe('_handleClick', function () {
    let element;
    let instance;
    let container;

    beforeEach(function () {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-numberinput]');
      instance = new NumberInput(element);
    });

    it('Should be called on click', function () {
      spyOn(instance, '_handleClick');
      const event = new CustomEvent('click', { bubbles: true });
      const clickTarget = element.querySelector('.up-icon');
      clickTarget.dispatchEvent(event);
      expect(instance._handleClick).toHaveBeenCalled();
    });

    it('Should emit a change event', function () {
      const spyOnChange = jasmine.createSpy();
      document.body.addEventListener('change', spyOnChange);
      const event = new CustomEvent('click', { bubbles: true });
      const clickTarget = element.querySelector('.up-icon');
      clickTarget.dispatchEvent(event);
      expect(spyOnChange).toHaveBeenCalled();
    });

    afterEach(function () {
      document.body.removeChild(container);
      instance.release();
    });
  });

  describe('Adding and Subtracting', function () {
    let element;
    let instance;
    let inputNode;
    let container;
    const events = new EventManager();

    beforeAll(function () {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-numberinput]');
      instance = new NumberInput(element);
      inputNode = document.querySelector('input');
    });

    beforeEach(function () {
      inputNode.value = '0';
      inputNode.max = '100';
      inputNode.min = '0';
    });

    it('Should increase the value', async function () {
      const upArrowNode = document.querySelector('.up-icon');
      const e = await new Promise((resolve) => {
        events.on(document.body, 'change', resolve);
        upArrowNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      });
      await delay(0);
      expect(e.cancelable).toBe(false);
      expect(inputNode.value).toBe('1');
    });

    it('Should increase the value when no maximum is set', async function () {
      const upArrowNode = document.querySelector('.up-icon');
      inputNode.max = '';
      inputNode.min = '';
      const e = await new Promise((resolve) => {
        events.on(document.body, 'change', resolve);
        upArrowNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      });
      await delay(0);
      expect(e.cancelable).toBe(false);
      expect(inputNode.value).toBe('1');
    });

    it('Should increase the value by the step amount', async function () {
      inputNode.step = 5;
      const upArrowNode = document.querySelector('.up-icon');
      const e = await new Promise((resolve) => {
        events.on(document.body, 'change', resolve);
        upArrowNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      });
      await delay(0);
      expect(e.cancelable).toBe(false);
      expect(inputNode.value).toBe('5');
    });

    it('Should not increase the value past the max', async function () {
      inputNode.step = 5;
      inputNode.max = 3;
      const upArrowNode = document.querySelector('.up-icon');
      const e = await new Promise((resolve) => {
        events.on(document.body, 'change', resolve);
        upArrowNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      });
      await delay(0);
      expect(e.cancelable).toBe(false);
      expect(inputNode.value).toBe('3');
    });

    it('Should ignore increment when current value is above maximum', async function () {
      inputNode.value = 1000;
      inputNode.step = 10;
      inputNode.max = 100;
      const upArrowNode = document.querySelector('.up-icon');
      const e = await new Promise((resolve) => {
        events.on(document.body, 'change', resolve);
        upArrowNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      });
      await delay(0);
      expect(e.cancelable).toBe(false);
      expect(inputNode.value).toBe('1000');
    });

    it('Should set value to maximum on decrement when current value is above maximum', async function () {
      inputNode.value = inputNode.max + 1;
      inputNode.step = 10;
      const downArrowNode = document.querySelector('.down-icon');
      const e = await new Promise((resolve) => {
        events.on(document.body, 'change', resolve);
        downArrowNode.dispatchEvent(
          new CustomEvent('click', { bubbles: true })
        );
      });
      await delay(0);
      expect(e.cancelable).toBe(false);
      expect(inputNode.value).toBe(inputNode.max);
    });

    it('Should ignore decrement when current value is below minimum', async function () {
      inputNode.value = -100;
      inputNode.step = 10;
      inputNode.min = 0;
      const downArrowNode = document.querySelector('.down-icon');
      const e = await new Promise((resolve) => {
        events.on(document.body, 'change', resolve);
        downArrowNode.dispatchEvent(
          new CustomEvent('click', { bubbles: true })
        );
      });
      await delay(0);
      expect(e.cancelable).toBe(false);
      expect(inputNode.value).toBe('-100');
    });

    it('Should set value to minimum on increment when current value is below minimum', async function () {
      inputNode.value = inputNode.min - 100;
      inputNode.step = 10;
      const upArrowNode = document.querySelector('.up-icon');
      const e = await new Promise((resolve) => {
        events.on(document.body, 'change', resolve);
        upArrowNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      });
      await delay(0);
      expect(e.cancelable).toBe(false);
      expect(inputNode.value).toBe(inputNode.min);
    });

    it('Should decrease the value', async function () {
      const downArrowNode = document.querySelector('.down-icon');
      inputNode.value = '1';
      const e = await new Promise((resolve) => {
        events.on(document.body, 'change', resolve);
        downArrowNode.dispatchEvent(
          new CustomEvent('click', { bubbles: true })
        );
      });
      await delay(0);
      expect(e.cancelable).toBe(false);
      expect(inputNode.value).toBe('0');
    });

    it('Should decrease the value when no minimum is set', async function () {
      const downArrowNode = document.querySelector('.down-icon');
      inputNode.min = '';
      inputNode.max = '';
      inputNode.step = 1;
      inputNode.value = '1';
      const e = await new Promise((resolve) => {
        events.on(document.body, 'change', resolve);
        downArrowNode.dispatchEvent(
          new CustomEvent('click', { bubbles: true })
        );
      });
      await delay(0);
      expect(e.cancelable).toBe(false);
      expect(inputNode.value).toBe('0');
    });

    it('Should decrease the value by the step amount', async function () {
      inputNode.value = 5;
      inputNode.step = 5;
      const downArrowNode = document.querySelector('.down-icon');
      const e = await new Promise((resolve) => {
        events.on(document.body, 'change', resolve);
        downArrowNode.dispatchEvent(
          new CustomEvent('click', { bubbles: true })
        );
      });
      await delay(0);
      expect(e.cancelable).toBe(false);
      expect(inputNode.value).toBe('0');
    });

    it('Should not decrease the value past the min', async function () {
      inputNode.value = 3;
      inputNode.step = 5;
      const downArrowNode = document.querySelector('.down-icon');
      const e = await new Promise((resolve) => {
        events.on(document.body, 'change', resolve);
        downArrowNode.dispatchEvent(
          new CustomEvent('click', { bubbles: true })
        );
      });
      await delay(0);
      expect(e.cancelable).toBe(false);
      expect(inputNode.value).toBe('0');
    });

    afterEach(function () {
      events.reset();
    });

    afterAll(function () {
      document.body.removeChild(container);
      instance.release();
    });
  });

  describe('Managing instances', function () {
    let element;
    let container;

    beforeAll(function () {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-numberinput]');
    });

    it('Should prevent creating duplicate instances', function () {
      let first;
      let second;
      try {
        first = NumberInput.create(element);
        second = NumberInput.create(element);
        expect(first).toBe(second);
      } finally {
        first && first.release();
        if (first !== second) {
          second && second.release();
        }
      }
    });

    it('Should let create a new instance for an element if an earlier one has been released', function () {
      let first;
      let second;
      try {
        first = NumberInput.create(element);
        first.release();
        second = NumberInput.create(element);
        expect(first).not.toBe(second);
      } finally {
        first && first.release();
        if (first !== second) {
          second && second.release();
        }
      }
    });

    afterAll(function () {
      document.body.removeChild(container);
    });
  });
});
