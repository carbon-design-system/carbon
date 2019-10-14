import Tooltip from '../../src/components/tooltip/tooltip';
import HTML from '../../html/tooltip/tooltip.html';

describe('Test tooltip', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new Tooltip();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new Tooltip(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });
  });

  describe('Showing/hiding', function() {
    const container = document.createElement('div');
    container.innerHTML = HTML;

    const element = container.querySelector('[data-tooltip-trigger]');
    const floating = container.querySelector('.bx--tooltip');
    let tooltip;

    beforeAll(function() {
      document.body.appendChild(container);
      return Tooltip.__with__({
        debounce: fn => fn,
      })(() => {
        tooltip = new Tooltip(element);
      });
    });

    it('Should show the tooltip upon clicking', function() {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(floating.classList.contains('bx--tooltip--shown')).toBe(true);
    });

    it('Should apply focus to a child element upon opening', function() {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(document.activeElement.closest('.bx--tooltip')).not.toBe(null);
    });

    // This should be failing. When you perform these actions in the browser the
    // `focusoutEventName` event is triggered causing it to behave differently.
    // I believe it's  because the `click` event is not being watched in `track-blur.js`
    it('Should remain open upon click within the tooltip', function() {
      // Want to actually trigger the "show" function
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));

      const content = floating.querySelector('.bx--tooltip__content');
      content.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      console.log(document.activeElement);
      expect(floating.classList.contains('bx--tooltip--shown')).toBe(true);
    });

    // This works as expected in the browser but not in the tests I believe it's
    // because the `click` event is not actually being watched in `track-blur.js`
    it('Should hide the tooltip upon clicking outside of tooltip', function() {
      // Want to actually trigger the "show" function
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));

      document.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(floating.classList.contains('bx--tooltip--shown')).toBe(false);
    });

    it('Should hide the tooltip upon focusing an external element', function() {
      // Want to actually trigger the "show" function
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));

      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'example-input';
      document.body.appendChild(input);

      document
        .getElementById('example-input')
        .dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      expect(floating.classList.contains('bx--tooltip--shown')).toBe(false);
      // Known bug: https://github.com/carbon-design-system/carbon/issues/3835
      expect(document.activeElement).toBe(input);
    });

    it('Should hide the tooltip upon blurring', function() {
      floating.classList.add('bx--tooltip--shown');
      element.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      expect(floating.classList.contains('bx--tooltip--shown')).toBe(false);
    });

    afterEach(function() {
      floating.classList.remove('bx--tooltip--shown');
    });

    afterAll(function() {
      if (document.body.contains(floating)) {
        floating.parentNode.removeChild(floating);
      }
      if (tooltip) {
        tooltip.release();
        tooltip = null;
      }
      document.body.removeChild(container);
    });
  });

  describe('Automatic creation', function() {
    const container = document.createElement('div');
    container.innerHTML = HTML;

    const element = container.querySelector('[data-tooltip-trigger]');
    const floating = container.querySelector('.bx--tooltip');
    let initContext;

    beforeAll(function() {
      document.body.appendChild(container);
      initContext = Tooltip.init();
    });

    it('Should create an instance upon clicking', function() {
      return Tooltip.__with__({
        debounce: fn => fn,
      })(() => {
        element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(floating.classList.contains('bx--tooltip--shown')).toBe(true);
      });
    });

    afterEach(function() {
      floating.classList.remove('bx--tooltip--shown');
      const tooltip = Tooltip.components.get(element);
      if (tooltip) {
        tooltip.release();
      }
    });

    afterAll(function() {
      if (initContext) {
        initContext.release();
      }
      if (document.body.contains(floating)) {
        floating.parentNode.removeChild(floating);
      }
      document.body.removeChild(container);
    });
  });
});
