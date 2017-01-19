import '../../demo/polyfills/custom-event';
import '../../demo/polyfills/object-assign';
import '../utils/es6-weak-map-global'; // For PhantomJS
import EventManager from '../utils/event-manager';
import OverflowMenu from '../../src/components/overflow-menu/overflow-menu';
import { delay } from 'bluebird';

const HTML = `
  <div data-overflow-menu class="bx--overflow-menu" tabindex="0" aria-label="List of options">
    <svg class="bx--overflow-menu__icon">
      <use xlink:href="https://dev-console.stage1.ng.bluemix.net/api/v5/img/sprite.svg#app-actions--overflow-menu"></use>
    </svg>
    <ul class="bx--overflow-menu__options">
      <li><button type="button" class="bx--overflow-menu__btn">Stop app</button></li>
      <li><button type="button" class="bx--overflow-menu__btn">Restart app</button></li>
      <li><button type="button" class="bx--overflow-menu__btn">Rename app</button></li>
      <li><button type="button" class="bx--overflow-menu__btn">Edit routes and access</button></li>
      <hr/>
      <li><button type="button" class="bx--overflow-menu__btn--delete">Delete app</button></li>
    </ul>
  </div>
`;

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
    const container = document.createElement('div');
    container.innerHTML = HTML;

    before(function () {
      document.body.appendChild(container);
      element = document.querySelector('[data-overflow-menu]');
      menu = new OverflowMenu(element);
    });

    it(`Should set and remove "bx--overflow-menu--open" class on the element on click event`, function () {
      // Initial click to open overflow-menu:
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--overflow-menu--open')).to.be.true;

      // Secondary click to close overflow-menu:
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--overflow-menu--open')).to.be.false;
    });

    it(`Should set and remove "bx--overflow-menu--open" class on the options menu`, function () {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(menu.optionMenu.classList.contains('bx--overflow-menu--open')).to.be.true;

      // Secondary click to close overflow-menu:
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(menu.optionMenu.classList.contains('bx--overflow-menu--open')).to.be.false;
    });

    afterEach(function () {
      element.classList.remove('bx--overflow-menu--open');
      menu.optionMenu.classList.remove('bx--overflow-menu--open');
    });

    after(function () {
      menu.release();
      document.body.removeChild(container);
    });
  });

  describe('Custom event emission', function () {
    let menu;
    let element;
    const container = document.createElement('div');
    container.innerHTML = HTML;

    const events = new EventManager();

    before(function () {
      document.body.appendChild(container);
      element = document.querySelector('[data-overflow-menu]');
      menu = new OverflowMenu(element);
    });

    it('Should provide a way to cancel showing overflow menu', async function () {
      const spyOverflowEvent = sinon.spy();
      events.on(element.ownerDocument.body, 'overflow-menu-beingshown', (e) => {
        e.preventDefault();
      });
      events.on(element.ownerDocument.body, 'overflow-menu-shown', spyOverflowEvent);
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(spyOverflowEvent, 'overflow-menu-shown event').not.to.have.been.called;
      expect(element.classList.contains('bx--overflow-menu--open'), 'State of root element').to.be.false;
      expect(menu.optionMenu.classList.contains('bx--overflow-menu--open'), 'State of dropdown menu').to.be.false;
    });

    it('Should emit an event after showing', async function () {
      const spyOverflowEvent = sinon.spy();
      events.on(document, 'overflow-menu-shown', spyOverflowEvent);
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await delay(200);
      expect(spyOverflowEvent).to.have.been.called;
    });

    it(`Should provide a way to cancel hiding overflow menu`, function () {
      const spyOverflowEvent = sinon.spy();
      events.on(element.ownerDocument.body, 'overflow-menu-beinghidden', (e) => {
        e.preventDefault();
      });
      events.on(element.ownerDocument.body, 'overflow-menu-hidden', spyOverflowEvent);
      element.classList.add('bx--overflow-menu--open');
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(spyOverflowEvent, 'overflow-menu-hidden event').not.to.have.been.called;
      expect(element.classList.contains('bx--overflow-menu--open'), 'State of root element').to.be.true;
      expect(menu.optionMenu.classList.contains('bx--overflow-menu--open'), 'State of dropdown menu').to.be.true;
    });

    it('Should emit an event after hiding', async function () {
      const spyOverflowEvent = sinon.spy();
      events.on(document, 'overflow-menu-hidden', spyOverflowEvent);

      element.classList.add('bx--overflow-menu--open');
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await delay(200);
      expect(spyOverflowEvent).to.have.been.called;
    });

    afterEach(function () {
      element.classList.remove('bx--overflow-menu--open');
      events.reset();
    });

    after(function () {
      menu.release();
      document.body.removeChild(container);
    });
  });

  describe('Toggling multiple overflow-menus', function () {
    let elements;
    let element1;
    let element2;
    let element3;
    const container = document.createElement('div');
    container.innerHTML = [HTML, HTML, HTML].join('');

    before(function () {
      document.body.appendChild(container);
      elements = [... document.querySelectorAll('[data-overflow-menu]')];
      element1 = elements[0];
      element2 = elements[1];
      element3 = elements[2];
      new OverflowMenu(element1);
      new OverflowMenu(element2);
      new OverflowMenu(element3);
    });

    it('Should open one menu on a single click event', function () {
      element1.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element1.classList.contains('bx--overflow-menu--open')).to.be.true;
      expect(element2.classList.contains('bx--overflow-menu--open')).to.be.false;
      expect(element3.classList.contains('bx--overflow-menu--open')).to.be.false;
    });

    it('Should open one menu on multiple click events', function () {
      element1.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      element2.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element1.classList.contains('bx--overflow-menu--open')).to.be.false;
      expect(element2.classList.contains('bx--overflow-menu--open')).to.be.true;
      expect(element3.classList.contains('bx--overflow-menu--open')).to.be.false;
    });

    afterEach(function () {
      element1.classList.remove('bx--overflow-menu--open');
      element2.classList.remove('bx--overflow-menu--open');
      element3.classList.remove('bx--overflow-menu--open');
    });

    after(function () {
      document.body.removeChild(container);
    });
  });

  describe('Managing instances', function () {
    let element;

    before(function () {
      element = document.createElement('div');
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

    it('Should remove click event listener on document object once the instance is released', function () {
      element.classList.add('bx--overflow-menu--open');
      document.body.appendChild(element);
      OverflowMenu.create(element).release();
      document.body.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--overflow-menu--open')).to.be.true;
    });

    it('Should remove keypress event listener on document object once the instance is released', function () {
      element.classList.add('bx--overflow-menu--open');
      document.body.appendChild(element);
      OverflowMenu.create(element).release();
      const event = new CustomEvent('keypress', { bubbles: true });
      event.key = 'Enter';
      document.body.dispatchEvent(event);
      expect(element.classList.contains('bx--overflow-menu--open')).to.be.true;
    });

    afterEach(function () {
      if (document.body.contains(element)) {
        document.body.removeChild(element);
      }
    });
  });
});
