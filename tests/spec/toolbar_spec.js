import '../utils/es6-weak-map-global'; // For PhantomJS
import '../../demo/polyfills/custom-event';
import Toolbar from '../../src/components/toolbar/toolbar';
import ToolbarHTML from '../../src/components/toolbar/toolbar.html';

describe('Test accordion', function () {
  describe('Constructor', function () {
    it('Should throw if root element is not given', function () {
      expect(() => {
        new Toolbar();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        new Toolbar(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('Clicking on search', function () {
    let search;
    const container = document.createElement('div');
    container.innerHTML = ToolbarHTML;

    beforeEach(function () {
      document.body.appendChild(container);
      new Toolbar(document.querySelector('[data-toolbar]'));
      search = document.querySelector('[data-toolbar-search]');
    });

    it('Should open search on click', function () {
      search.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(search.classList.contains('bx--toolbar-search--active')).to.be.true;
    });

    it('Should close search on click outside the toolbar', function () {
      container.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(search.classList.contains('bx--toolbar-search--active')).to.be.false;
    });

    afterEach(function () {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });
  });

  describe('Keydown on search', function () {
    let search;
    const container = document.createElement('div');
    container.innerHTML = ToolbarHTML;

    beforeEach(function () {
      document.body.appendChild(container);
      new Toolbar(document.querySelector('[data-toolbar]'));
      search = document.querySelector('[data-toolbar-search]');
    });

    it('Should open search on enter or spacebar keydown', function () {
      const event = new CustomEvent('keydown', { bubbles: true });
      event.keyCode = 32;
      search.dispatchEvent(event);
      expect(search.classList.contains('bx--toolbar-search--active')).to.be.true;
    });

    it('Should close search on esc keydown', function () {
      const event = new CustomEvent('keydown', { bubbles: true });
      event.keyCode = 27;
      search.dispatchEvent(event);
      expect(search.classList.contains('bx--toolbar-search--active')).to.be.false;
    });

    afterEach(function () {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });
  });
});
