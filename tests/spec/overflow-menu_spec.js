import '../../consumables/js/polyfills/custom-event';
import '../utils/es6-weak-map-global'; // For PhantomJS
import OverflowMenu from '../../consumables/js/es2015/overflow-menu';

describe('Test Overflow menu', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new OverflowMenu();
      }).to.throw(Error);
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new OverflowMenu(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('Toggling a single overflow-menu', function () {
    let menu;
    let element;
    before(function () {
      element = document.createElement('a');
      element.dataset.state = 'closed';
      menu = new OverflowMenu(element);
      document.body.appendChild(element);
    });

    it(`Prevents default behavior of anchor element on click event`, function () {
      // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
      expect(element.dispatchEvent(new CustomEvent('click', { bubbles: true, cancelable: true }))).to.be.false;
    });

    it(`Sets data-state to "open" on click event`, function () {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.dataset.state).to.equal('open');
    });

    it(`Sets data-state to "open", then sets it to "closed" on click events`, function () {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.dataset.state).to.equal('open');
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.dataset.state).to.equal('closed');
    });

    afterEach(function () {
      element.dataset.state = 'closed';
    });

    after(function () {
      menu.release();
      document.body.removeChild(element);
    });
  });

  describe('Toggling multiple overflow-menus', function () {
    let element1;
    let element2;
    let element3;

    before(function () {
      element1 = document.createElement('a');
      element2 = document.createElement('a');
      element3 = document.createElement('a');
      element1.dataset.overflowMenu = '';
      element2.dataset.overflowMenu = '';
      element3.dataset.overflowMenu = '';
      element1.dataset.state = 'closed';
      element2.dataset.state = 'closed';
      element3.dataset.state = 'closed';
      new OverflowMenu(element1);
      new OverflowMenu(element2);
      new OverflowMenu(element3);
      document.body.appendChild(element1);
      document.body.appendChild(element2);
      document.body.appendChild(element3);
    });

    it('Should open one menu on a single click event', function () {
      element1.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element1.dataset.state).to.equal('open');
      expect(element2.dataset.state).to.equal('closed');
      expect(element3.dataset.state).to.equal('closed');
    });

    it('Should open one menu on multiple click events', function () {
      element1.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      element2.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element1.dataset.state).to.equal('closed');
      expect(element2.dataset.state).to.equal('open');
      expect(element3.dataset.state).to.equal('closed');
    });

    afterEach(function () {
      element1.dataset.state = 'closed';
      element2.dataset.state = 'closed';
      element3.dataset.state = 'closed';
    });

    after(function () {
      document.body.removeChild(element1);
      document.body.removeChild(element2);
      document.body.removeChild(element3);
    });
  });

  describe('Managing instances', function () {
    let element;

    before(function () {
      element = document.createElement('a');
    });

    it('Should prevent creating duplicate instances', function () {
      let first;
      let second;
      try {
        first = OverflowMenu.create(element);
        second = OverflowMenu.create(element);
        expect(first).to.equal(second);
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
        first = OverflowMenu.create(element);
        first.release();
        second = OverflowMenu.create(element);
        expect(first).not.to.equal(second);
      } finally {
        first && first.release();
        if (first !== second) {
          second && second.release();
        }
      }
    });
  });
});
