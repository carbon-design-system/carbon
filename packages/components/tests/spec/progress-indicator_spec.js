import '../../demo/polyfills/custom-event';
import ProgressIndicator from '../../src/components/progress-indicator/progress-indicator';
import HTML from '../../html/progress-indicator/progress-indicator.html';
import flattenOptions from '../utils/flatten-options';

describe('ProgressIndicator', function() {
  describe('Constructor', function() {
    let element;
    let instance;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    beforeEach(function() {
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-progress]');
      instance = new ProgressIndicator(element);
    });

    it('Should throw if root element is not given', function() {
      expect(() => {
        new ProgressIndicator();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new ProgressIndicator(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('should set default options', function() {
      expect(flattenOptions(instance.options)).toEqual({
        selectorInit: '[data-progress]',
        selectorStepElement: '.bx--progress-step',
        selectorCurrent: '.bx--progress-step--current',
        selectorIncomplete: '.bx--progress-step--incomplete',
        selectorComplete: '.bx--progress-step--complete',
        selectorLabel: '.bx--progress-label',
        selectorTooltip: '.bx--tooltip',
        selectorTooltipText: '.bx--tooltip__text',
        classStep: 'bx--progress-step',
        classComplete: 'bx--progress-step--complete',
        classCurrent: 'bx--progress-step--current',
        classIncomplete: 'bx--progress-step--incomplete',
        classOverflowLabel: 'bx--progress-label-overflow',
        classTooltipMulti: 'bx--tooltip_multi',
        maxWidth: 87,
        tooltipMaxHeight: 21,
      });
    });

    it('state.currentIndex should be a number', function() {
      expect(isNaN(instance.state.currentIndex)).toBe(false);
    });

    it('state.totalSteps should be a number', function() {
      expect(isNaN(instance.state.totalSteps)).toBe(false);
    });

    afterEach(function() {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('_updateStep', function() {
    let element;
    let instance;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    beforeEach(function() {
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-progress]');
      instance = new ProgressIndicator(element);
    });

    it('should remove the svg contained inside given element param', function() {
      const el = instance.element.querySelector(
        instance.options.selectorIncomplete
      );
      instance._updateStep({
        element: el,
        className: instance.options.classComplete,
      });
      expect(el.firstElementChild.tagName).not.toBe('svg');
    });

    it('should update className with given className param', function() {
      const el = instance.element.querySelector(
        instance.options.selectorIncomplete
      );
      instance._updateStep({
        element: el,
        className: instance.options.classComplete,
      });
      expect(el.classList.contains(instance.options.classComplete)).toBe(true);
    });

    afterEach(function() {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('addOverflowTooltip', function() {
    let element;
    let instance;
    let stepLabel;
    let tooltipDiv;
    let tooltipText;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    beforeEach(function() {
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-progress]');
      stepLabel = element.querySelector('.bx--progress-label');
      stepLabel.style.display = 'inline-block';
      tooltipDiv = document.createElement('div');
      tooltipDiv.classList.add('bx--tooltip');
      tooltipText = document.createElement('div');
      tooltipText.classList.add('bx--tooltip__text');
      tooltipDiv.appendChild(tooltipText);
      element.appendChild(tooltipDiv);
    });

    it('should not have overflow class', function() {
      stepLabel.textContent = 'Step';
      instance = new ProgressIndicator(element);
      expect(stepLabel.classList.contains('bx--progress-label-overflow')).toBe(
        false
      );
    });

    it('should have an overflow class', function() {
      stepLabel.textContent = 'Overflow Ex. 1';
      instance = new ProgressIndicator(element);
      expect(stepLabel.classList.contains('bx--progress-label-overflow')).toBe(
        true
      );
    });

    it('multi line tooltip should have multi line class', function() {
      stepLabel.textContent = 'Overflow Ex. 2 Multi Line';
      tooltipText.style.height = '24px';
      instance = new ProgressIndicator(element);
      expect(tooltipDiv.classList.contains('bx--tooltip_multi')).toBe(true);
    });

    it('single line tooltip should not have multi line class', function() {
      stepLabel.textContent = 'Overflow Ex. 1';
      tooltipText.style.height = '20px';
      instance = new ProgressIndicator(element);
      expect(tooltipDiv.classList.contains('bx--tooltip_multi')).toBe(false);
    });

    afterEach(function() {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('getSteps', function() {
    let element;
    let instance;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    beforeEach(function() {
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-progress]');
      instance = new ProgressIndicator(element);
    });

    it('should loop through all step elements with the correct selector', function() {
      const className = instance.options.classStep;
      const steps = instance.getSteps();
      steps.forEach(step =>
        expect(step.element.classList.contains(className)).toBe(true)
      );
    });

    it('should return an Array of objects with "element" and "index" keynames', function() {
      const elementKey = Object.keys(instance.getSteps()[0])[0];
      const indexKey = Object.keys(instance.getSteps()[0])[1];
      expect(elementKey).toBe('element');
      expect(indexKey).toBe('index');
    });

    it('index should be a number', function() {
      expect(isNaN(instance.getSteps()[0].index)).toBe(false);
    });

    it('order should start counting from 0', function() {
      const firstStepIndex = instance.getSteps().map(step => step.index)[0];
      expect(firstStepIndex).toBe(0);
    });

    afterEach(function() {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('getCurrent', function() {
    let element;
    let instance;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    beforeEach(function() {
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-progress]');
      instance = new ProgressIndicator(element);
    });

    it('should return an object with element and index keys', function() {
      expect(Object.keys(instance.getCurrent())[0]).toBe('element');
      expect(Object.keys(instance.getCurrent())[1]).toBe('index');
    });

    it('element value should have correct className: classStep', function() {
      const el = instance.getCurrent().element;
      expect(el.classList.contains(instance.options.classStep)).toBe(true);
    });

    it('element value should have correct className: classCurrent', function() {
      const el = instance.getCurrent().element;
      expect(el.classList.contains(instance.options.classCurrent)).toBe(true);
    });

    afterEach(function() {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('setCurrent', function() {
    let element;
    let instance;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    beforeEach(function() {
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-progress]');
      instance = new ProgressIndicator(element);
    });

    it('should set a new currentIndex with a given number param', function() {
      instance.setCurrent(2);
      expect(instance.state.currentIndex).toBe(2);
    });

    it('should update className of new currentIndex', function() {
      instance.setCurrent(2);
      const el = instance.getCurrent().element;
      expect(el.classList.contains(instance.options.classCurrent)).toBe(true);
    });

    it('should set state of previous steps to complete', function() {
      instance.setCurrent(2);

      const previousStep = instance
        .getSteps()
        .map(step => step)
        .filter(step => step.index < 2)[0];

      expect(
        previousStep.element.classList.contains(instance.options.classComplete)
      ).toBe(true);
      expect(
        previousStep.element.classList.contains(instance.options.classCurrent)
      ).toBe(false);
    });

    it('should set state of next steps to incomplete', function() {
      instance.setCurrent(2);

      const nextStep = instance
        .getSteps()
        .map(step => step)
        .filter(step => step.index > 2)[0];

      expect(
        nextStep.element.classList.contains(instance.options.classIncomplete)
      ).toBe(true);
      expect(
        nextStep.element.classList.contains(instance.options.classComplete)
      ).toBe(false);
      expect(
        nextStep.element.classList.contains(instance.options.classCurrent)
      ).toBe(false);
    });

    afterEach(function() {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });
});
