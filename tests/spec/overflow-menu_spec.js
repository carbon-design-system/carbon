import '../../consumables/js/polyfills/custom-event';
import '../utils/es6-weak-map-global'; // For PhantomJS
import { OverflowMenu } from '../../consumables/js/es2015/index.js';

describe('Test Overflow menu', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new OverflowMenu();
      }).to.throw;
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new OverflowMenu(document.createTextNode(''));
      }).to.throw;
    });
  });

  describe('Toggling a single overflow-menu', function () {
    let menu;
    let element;
    before(function () {
      element = document.createElement('a');
      menu = new OverflowMenu(element);
      document.body.appendChild(element);
    });

    it(`Instantiates without open class`, function () {
      expect(element.classList.contains('open')).to.be.false;
    });

    it(`Prevents default behavior of anchor element on click event`, function () {
      // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
      expect(element.dispatchEvent(new CustomEvent('click', { cancelable: true }))).to.be.false;
    });

    it(`Adds open class on click event`, function () {
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.classList.contains('open')).to.be.true;
    });

    it(`Removes open class on click event`, function () {
      element.classList.add('open');
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.classList.contains('open')).to.be.false;
    });

    it(`Adds open class then removes open class on click events`, function () {
      element.dispatchEvent(new CustomEvent('click'));
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.classList.contains('open')).to.be.false;
    });

    afterEach(function () {
      element.classList.remove('open');
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
      new OverflowMenu(element1);
      new OverflowMenu(element2);
      new OverflowMenu(element3);
      document.body.appendChild(element1);
      document.body.appendChild(element2);
      document.body.appendChild(element3);
    });

    it('All overflow-menus should instatiate without an open class', function () {
      expect(element1.classList.contains('open')).to.be.false;
      expect(element2.classList.contains('open')).to.be.false;
      expect(element3.classList.contains('open')).to.be.false;
    });

    it('One overflow-menu should open at a time on click event', function () {
      element1.dispatchEvent(new CustomEvent('click'));
      expect(element1.classList.contains('open')).to.be.true;
      expect(element2.classList.contains('open')).to.be.false;
      expect(element3.classList.contains('open')).to.be.false;
    });

    it('One overflow-menu should open at a time on multiple click events', function () {
      element1.dispatchEvent(new CustomEvent('click'));
      element2.dispatchEvent(new CustomEvent('click'));
      expect(element1.classList.contains('open')).to.be.false;
      expect(element2.classList.contains('open')).to.be.true;
      expect(element3.classList.contains('open')).to.be.false;
    });

    afterEach(function () {
      element1.classList.remove('open');
      element2.classList.remove('open');
      element3.classList.remove('open');
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
