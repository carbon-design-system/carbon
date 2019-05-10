import InlineLoading from '../../src/components/inline-loading/inline-loading';
import InlineLoadingHTML from '../../html/inline-loading/inline-loading.html';

describe('Test Inline Loading', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new InlineLoading();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new InlineLoading(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });
  });

  describe('Setting state', function() {
    let elem;
    let instance;

    beforeEach(function() {
      elem = document.createElement('div');
      elem.innerHTML = InlineLoadingHTML;
    });

    it('Should support setting the initial state via options', function() {
      instance = new InlineLoading(
        elem.querySelector('[data-inline-loading]'),
        { initialState: 'active' }
      );
      expect(
        elem
          .querySelector('[data-inline-loading-spinner]')
          .classList.contains('bx--loading--stop')
      ).toBe(false);
      expect(
        elem
          .querySelector('[data-inline-loading-spinner]')
          .hasAttribute('hidden')
      ).toBe(false);
      expect(
        elem
          .querySelector('[data-inline-loading-finished]')
          .hasAttribute('hidden')
      ).toBe(true);
      expect(
        elem
          .querySelector('[data-inline-loading-text-active]')
          .hasAttribute('hidden')
      ).toBe(false);
      expect(
        elem
          .querySelector('[data-inline-loading-text-finished]')
          .hasAttribute('hidden')
      ).toBe(true);
    });

    it('Should hide everything but spinner when the state is set to inactive', function() {
      instance = new InlineLoading(
        elem.querySelector('[data-inline-loading]')
      ).setState('inactive');
      expect(
        elem
          .querySelector('[data-inline-loading-spinner]')
          .classList.contains('bx--loading--stop')
      ).toBe(true);
      expect(
        elem
          .querySelector('[data-inline-loading-spinner]')
          .hasAttribute('hidden')
      ).toBe(false);
      expect(
        elem
          .querySelector('[data-inline-loading-finished]')
          .hasAttribute('hidden')
      ).toBe(true);
      expect(
        elem
          .querySelector('[data-inline-loading-text-active]')
          .hasAttribute('hidden')
      ).toBe(true);
      expect(
        elem
          .querySelector('[data-inline-loading-text-finished]')
          .hasAttribute('hidden')
      ).toBe(true);
    });

    it('Should hide elements for finished states when the state is set to active', function() {
      instance = new InlineLoading(
        elem.querySelector('[data-inline-loading]')
      ).setState('active');
      expect(
        elem
          .querySelector('[data-inline-loading-spinner]')
          .classList.contains('bx--loading--stop')
      ).toBe(false);
      expect(
        elem
          .querySelector('[data-inline-loading-spinner]')
          .hasAttribute('hidden')
      ).toBe(false);
      expect(
        elem
          .querySelector('[data-inline-loading-finished]')
          .hasAttribute('hidden')
      ).toBe(true);
      expect(
        elem
          .querySelector('[data-inline-loading-text-active]')
          .hasAttribute('hidden')
      ).toBe(false);
      expect(
        elem
          .querySelector('[data-inline-loading-text-finished]')
          .hasAttribute('hidden')
      ).toBe(true);
    });

    it('Should hide elements for active states when the state is set to finished', function() {
      instance = new InlineLoading(
        elem.querySelector('[data-inline-loading]')
      ).setState('finished');
      expect(
        elem
          .querySelector('[data-inline-loading-spinner]')
          .classList.contains('bx--loading--stop')
      ).toBe(true);
      expect(
        elem
          .querySelector('[data-inline-loading-spinner]')
          .hasAttribute('hidden')
      ).toBe(true);
      expect(
        elem
          .querySelector('[data-inline-loading-finished]')
          .hasAttribute('hidden')
      ).toBe(false);
      expect(
        elem
          .querySelector('[data-inline-loading-text-active]')
          .hasAttribute('hidden')
      ).toBe(true);
      expect(
        elem
          .querySelector('[data-inline-loading-text-finished]')
          .hasAttribute('hidden')
      ).toBe(false);
    });

    it('Should throw if a wrong state is passed in', function() {
      instance = new InlineLoading(document.createElement('div'));
      expect(() => instance.setState()).toThrowError(
        Error,
        'One of the following value should be given as the state: inactive, active, finished'
      );
      expect(() => instance.setState('foo')).toThrowError(
        Error,
        'One of the following value should be given as the state: inactive, active, finished'
      );
    });

    it('Should return self', function() {
      instance = new InlineLoading(document.createElement('div'));
      expect(instance.setState('active')).toBe(instance);
    });

    afterEach(function() {
      if (instance) {
        instance = instance.release();
      }
      while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
      }
    });
  });

  describe('Managing instances', function() {
    let element;

    beforeAll(function() {
      element = document.createElement('a');
    });

    it('Should prevent creating duplicate instances', function() {
      let first;
      let second;
      try {
        first = InlineLoading.create(element);
        second = InlineLoading.create(element);
        expect(first).toBe(second);
      } finally {
        first && first.release();
        if (first !== second) {
          second && second.release();
        }
      }
    });

    it('Should let create a new instance for an element if an earlier one has been released', function() {
      let first;
      let second;
      try {
        first = InlineLoading.create(element);
        first.release();
        second = InlineLoading.create(element);
        expect(first).not.toBe(second);
      } finally {
        first && first.release();
        if (first !== second) {
          second && second.release();
        }
      }
    });
  });
});
