import '../../demo/polyfills/custom-event';
import ProgressIndicator from '../../src/components/progress-indicator/progress-indicator';
import HTML from '../../src/components/progress-indicator/progress-indicator.html';

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
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new ProgressIndicator(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('should set default options', function() {
      expect(instance.options).to.deep.equal({
        selectorInit: '[data-progress]',
        selectorStepElement: '.bx--progress-step',
        selectorCurrent: '.bx--progress-step--current',
        selectorIncomplete: '.bx--progress-step--incomplete',
        selectorComplete: '.bx--progress-step--complete',
        classStep: 'bx--progress-step',
        classComplete: 'bx--progress-step--complete',
        classCurrent: 'bx--progress-step--current',
        classIncomplete: 'bx--progress-step--incomplete',
      });
    });

    it('state.currentIndex should be a number', function() {
      expect(instance.state.currentIndex).to.be.a('number');
    });

    it('state.totalSteps should be a number', function() {
      expect(instance.state.totalSteps).to.be.a('number');
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
      const el = instance.element.querySelector(instance.options.selectorIncomplete);
      instance._updateStep({
        element: el,
        className: instance.options.classComplete,
      });
      expect(el.firstElementChild.tagName).to.not.equal('svg');
    });

    it('should update className with given className param', function() {
      const el = instance.element.querySelector(instance.options.selectorIncomplete);
      instance._updateStep({
        element: el,
        className: instance.options.classComplete,
      });
      expect(el.classList.contains(instance.options.classComplete)).to.equal(true);
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
      const className = instance.options.selectorStepElement;
      const steps = instance.getSteps();
      steps.forEach(step => expect(step.element.classList.contains(className)));
    });

    it('should return an Array of objects with "element" and "index" keynames', function() {
      const elementKey = Object.keys(instance.getSteps()[0])[0];
      const indexKey = Object.keys(instance.getSteps()[0])[1];
      expect(elementKey).to.equal('element');
      expect(indexKey).to.equal('index');
    });

    it('index should be a number', function() {
      expect(instance.getSteps()[0].index).to.be.a('number');
    });

    it('order should start counting from 0', function() {
      const firstStepIndex = instance.getSteps().map(step => step.index)[0];
      expect(firstStepIndex).to.equal(0);
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
      expect(Object.keys(instance.getCurrent())[0]).to.equal('element');
      expect(Object.keys(instance.getCurrent())[1]).to.equal('index');
    });

    it('element value should have correct className: classStep', function() {
      const el = instance.getCurrent().element;
      expect(el.classList.contains(instance.options.classStep)).to.equal(true);
    });

    it('element value should have correct className: classCurrent', function() {
      const el = instance.getCurrent().element;
      expect(el.classList.contains(instance.options.classCurrent)).to.equal(true);
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
      expect(instance.state.currentIndex).to.equal(2);
    });

    it('should update className of new currentIndex', function() {
      instance.setCurrent(2);
      const el = instance.getCurrent().element;
      expect(el.classList.contains(instance.options.classCurrent)).to.equal(true);
    });

    it('should set state of previous steps to complete', function() {
      instance.setCurrent(2);

      const previousStep = instance
        .getSteps()
        .map(step => step)
        .filter(step => step.index < 2)[0];

      expect(previousStep.element.classList.contains(instance.options.classComplete)).to.equal(true);
      expect(previousStep.element.classList.contains(instance.options.classCurrent)).to.equal(false);
    });

    it('should set state of next steps to incomplete', function() {
      instance.setCurrent(2);

      const nextStep = instance
        .getSteps()
        .map(step => step)
        .filter(step => step.index > 2)[0];

      expect(nextStep.element.classList.contains(instance.options.classIncomplete)).to.equal(true);
      expect(nextStep.element.classList.contains(instance.options.classComplete)).to.equal(false);
      expect(nextStep.element.classList.contains(instance.options.classCurrent)).to.equal(false);
    });

    afterEach(function() {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });
});
