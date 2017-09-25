import Tooltip from '../../src/components/tooltip/tooltip';
import HTML from '../../src/components/tooltip/tooltip.html';

describe('Test tooltip', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new Tooltip();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new Tooltip(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('Showing/hiding', function() {
    const container = document.createElement('div');
    container.innerHTML = HTML;

    const element = container.querySelector('[data-tooltip-trigger]');
    const floating = container.querySelector('.bx--tooltip');
    let tooltip;

    before(function() {
      document.body.appendChild(container);
      tooltip = new Tooltip(element);
    });

    it('Should show the tooltip upon hovering over', function() {
      element.dispatchEvent(new CustomEvent('mouseover', { bubbles: true }));
      expect(floating.classList.contains('bx--tooltip--shown')).to.be.true;
    });

    it('Should hide the tooltip upon hovering out', function() {
      floating.classList.add('bx--tooltip--shown');
      element.dispatchEvent(new CustomEvent('mouseout', { bubbles: true }));
      expect(floating.classList.contains('bx--tooltip--shown')).to.be.false;
    });

    it('Should show the tooltip upon focusing', function() {
      element.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      expect(floating.classList.contains('bx--tooltip--shown')).to.be.true;
    });

    it('Should hide the tooltip upon bluring', function() {
      floating.classList.add('bx--tooltip--shown');
      element.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      expect(floating.classList.contains('bx--tooltip--shown')).to.be.false;
    });

    afterEach(function() {
      floating.classList.remove('bx--tooltip--shown');
    });

    after(function() {
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

    before(function() {
      document.body.appendChild(container);
      initContext = Tooltip.init();
    });

    it('Should create an instance upon hovering over', function() {
      element.dispatchEvent(new CustomEvent('mouseover', { bubbles: true }));
      expect(floating.classList.contains('bx--tooltip--shown')).to.be.true;
    });

    it('Should create an instance upon focusing', function() {
      element.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      expect(floating.classList.contains('bx--tooltip--shown')).to.be.true;
    });

    afterEach(function() {
      floating.classList.remove('bx--tooltip--shown');
      const tooltip = Tooltip.components.get(element);
      if (tooltip) {
        tooltip.release();
      }
    });

    after(function() {
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
