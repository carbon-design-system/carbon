import '../../demo/polyfills/custom-event';
import Toolbar from '../../src/components/toolbar/toolbar';
import ToolbarHTML from '../../src/components/toolbar/toolbar.html';

describe('Test accordion', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new Toolbar();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new Toolbar(document.createTextNode(''));
      }).to.throw(Error);
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
      expect(search.classList.contains('bx--toolbar-search--active')).to.be.true;
    });

    it('Should close search on click outside the toolbar', function() {
      container.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(search.classList.contains('bx--toolbar-search--active')).to.be.false;
    });

    afterEach(function() {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });
  });

  describe('Keydown on search', function() {
    let search;
    const container = document.createElement('div');
    container.innerHTML = ToolbarHTML;

    beforeEach(function() {
      document.body.appendChild(container);
      new Toolbar(document.querySelector('[data-toolbar]'));
      search = document.querySelector('[data-toolbar-search]');
    });

    it('Should open search on enter or spacebar keydown', function() {
      const event = new CustomEvent('keydown', { bubbles: true });
      event.which = 32;
      search.dispatchEvent(event);
      expect(search.classList.contains('bx--toolbar-search--active')).to.be.true;
    });

    it('Should close search on esc keydown', function() {
      const event = new CustomEvent('keydown', { bubbles: true });
      event.which = 27;
      search.dispatchEvent(event);
      expect(search.classList.contains('bx--toolbar-search--active')).to.be.false;
    });

    afterEach(function() {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });
  });

  describe('Exclusive search box', function() {
    let container;
    const toolbars = [];

    before(function() {
      container = document.createElement('div');
      container.innerHTML = ToolbarHTML + ToolbarHTML;
      document.body.appendChild(container);
      toolbars.push(...[...container.querySelectorAll('[data-toolbar]')].map(elem => new Toolbar(elem)));
    });

    beforeEach(function() {
      toolbars.forEach(toolbar => {
        toolbar.element.querySelector(toolbar.options.selectorSearch).classList.remove(toolbar.classSearchActive);
      });
    });

    it('Should make the search box exclusive upon clicking on one of the search boxes', function() {
      const searches = toolbars.map(toolbar => toolbar.element.querySelector(toolbar.options.selectorSearch));
      searches[0].classList.add(toolbars[0].classSearchActive);
      searches[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(searches[0].classList.contains('bx--toolbar-search--active')).to.be.false;
      expect(searches[1].classList.contains('bx--toolbar-search--active')).to.be.true;
    });

    it('Should make the search box exclusive upon hitting space bar on one of the search boxes', function() {
      const searches = toolbars.map(toolbar => toolbar.element.querySelector(toolbar.options.selectorSearch));
      searches[0].classList.add(toolbars[0].classSearchActive);
      searches[1].dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          which: 32,
        })
      );
      expect(searches[0].classList.contains('bx--toolbar-search--active')).to.be.false;
      expect(searches[1].classList.contains('bx--toolbar-search--active')).to.be.true;
    });

    after(function() {
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
