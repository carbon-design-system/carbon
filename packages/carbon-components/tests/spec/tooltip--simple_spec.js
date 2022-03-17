import Tooltip from '../../src/components/tooltip/tooltip--simple';
import TooltipDefinitionHTML from '../../html/tooltip/tooltip--definition.html';
import TooltipIconHTML from '../../html/tooltip/tooltip--icon.html';

describe('Test simple tooltip', function () {
  describe('Constructor', function () {
    it('Should throw if root element is not given', function () {
      expect(() => {
        new Tooltip();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        new Tooltip(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });
  });

  describe('Showing/hiding definition tooltip', function () {
    const container = document.createElement('div');
    container.innerHTML = TooltipDefinitionHTML;

    const element = container.querySelector('[data-tooltip-definition]');
    const button = container.querySelector('.bx--tooltip__trigger--definition');
    let tooltip;

    beforeAll(function () {
      document.body.appendChild(container);
      tooltip = new Tooltip(element);
    });

    it('Should not have hidden class after mouseenter', function () {
      element.dispatchEvent(new CustomEvent('mouseenter', { bubbles: true }));
      expect(button.classList.contains('bx--tooltip--hidden')).toBe(false);
    });

    it('Should not have hidden class after focus', function () {
      element.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      expect(button.classList.contains('bx--tooltip--hidden')).toBe(false);
    });

    it('Should have hidden class after Esc keydown', function () {
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          which: 27,
        })
      );
      expect(button.classList.contains('bx--tooltip--hidden')).toBe(true);
    });

    afterEach(function () {
      button.classList.remove('bx--tooltip--hidden');
    });

    afterAll(function () {
      if (document.body.contains(button)) {
        button.parentNode.removeChild(button);
      }
      if (tooltip) {
        tooltip.release();
        tooltip = null;
      }
      document.body.removeChild(container);
    });
  });

  describe('Showing/hiding icon tooltip', function () {
    const container = document.createElement('div');
    container.innerHTML = TooltipIconHTML;

    const element = container.querySelector('[data-tooltip-icon]');
    let tooltip;

    beforeAll(function () {
      document.body.appendChild(container);
      tooltip = new Tooltip(element);
    });

    it('Should not have hidden class after mouseenter', function () {
      element.dispatchEvent(new CustomEvent('mouseenter', { bubbles: true }));
      expect(element.classList.contains('bx--tooltip--hidden')).toBe(false);
    });

    it('Should have visible class after mouseenter', function () {
      element.dispatchEvent(new CustomEvent('mouseenter', { bubbles: true }));
      expect(element.classList.contains('bx--tooltip--visible')).toBe(true);
    });

    it('Should not have visible class after mouseleave', async function () {
      return Tooltip.__with__({
        debounce: (fn) => fn,
      })(() => {
        tooltip.release();
        tooltip = new Tooltip(element);
        element.dispatchEvent(new CustomEvent('mouseleave', { bubbles: true }));
        expect(element.classList.contains('bx--tooltip--visible')).toBe(false);
      });
    });

    it('Should not have hidden class after focus', function () {
      element.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      expect(element.classList.contains('bx--tooltip--hidden')).toBe(false);
    });

    it('Should have hidden class after Esc keydown', function () {
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          which: 27,
        })
      );
      expect(element.classList.contains('bx--tooltip--hidden')).toBe(true);
    });

    afterEach(function () {
      element.classList.remove('bx--tooltip--hidden');
    });

    afterAll(function () {
      if (document.body.contains(element)) {
        element.parentNode.removeChild(element);
      }
      if (tooltip) {
        tooltip.release();
        tooltip = null;
      }
      document.body.removeChild(container);
    });
  });
});
