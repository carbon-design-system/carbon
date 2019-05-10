import '../../demo/polyfills/custom-event';
import Toolbar from '../../src/components/toolbar/toolbar';
import ToolbarHTML from '../../html/toolbar/toolbar.html';

describe('Test toolbar', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new Toolbar();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new Toolbar(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });
  });

  describe('Clicking on search', function() {
    let search;
    const container = document.createElement('div');
    container.innerHTML = ToolbarHTML;

    beforeEach(function() {
      document.body.appendChild(container);
      new Toolbar(document.querySelector('[data-toolbar]'));
      search = document.querySelector('[data-toolbar-search]');
    });

    it('Should open search on click', function() {
      search.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(search.classList.contains('bx--toolbar-search--active')).toBe(
        true
      );
    });

    it('Should close search on click outside the toolbar', function() {
      container.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(search.classList.contains('bx--toolbar-search--active')).toBe(
        false
      );
    });

    afterEach(function() {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });
  });

  describe('Keydown on search', function() {
    let container;
    let search;
    let toolbar;

    beforeEach(function() {
      container = document.createElement('div');
      container.innerHTML = ToolbarHTML;
      document.body.appendChild(container);
      toolbar = new Toolbar(container.querySelector('[data-toolbar]'));
      search = container.querySelector('[data-toolbar-search]');
    });

    it('Should close search on esc keydown', function() {
      const event = new CustomEvent('keydown', { bubbles: true });
      event.which = 27;
      search.dispatchEvent(event);
      expect(search.classList.contains('bx--toolbar-search--active')).toBe(
        false
      );
    });

    afterEach(function() {
      toolbar.release();
      if (document.body.contains(container)) {
        document.body.removeChild(container);
        container = null;
      }
    });
  });

  describe('Exclusive search box', function() {
    let container;
    const toolbars = [];

    beforeAll(function() {
      container = document.createElement('div');
      container.innerHTML = ToolbarHTML + ToolbarHTML;
      document.body.appendChild(container);
      toolbars.push(
        ...[...container.querySelectorAll('[data-toolbar]')].map(
          elem => new Toolbar(elem)
        )
      );
    });

    beforeEach(function() {
      toolbars.forEach(toolbar => {
        toolbar.element
          .querySelector(toolbar.options.selectorSearch)
          .classList.remove(toolbar.classSearchActive);
      });
    });

    it('Should make the search box exclusive upon clicking on one of the search boxes', function() {
      const searches = toolbars.map(toolbar =>
        toolbar.element.querySelector(toolbar.options.selectorSearch)
      );
      searches[0].classList.add(toolbars[0].classSearchActive);
      searches[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(searches[0].classList.contains('bx--toolbar-search--active')).toBe(
        false
      );
      expect(searches[1].classList.contains('bx--toolbar-search--active')).toBe(
        true
      );
    });

    afterAll(function() {
      for (let toolbar = toolbars.pop(); toolbar; toolbar = toolbars.pop()) {
        toolbar.release();
      }
      if (document.body.contains(container)) {
        document.body.removeChild(container);
        container = null;
      }
    });
  });
});
