import EventManager from '../utils/event-manager';
import OverflowMenu from '../../src/components/overflow-menu/overflow-menu';
import HTML from '../../src/components/overflow-menu/overflow-menu.html';

describe('Test Overflow menu', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new OverflowMenu();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new OverflowMenu(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('Toggling a single overflow-menu', function() {
    let menu;
    let element;
    const container = document.createElement('div');
    container.innerHTML = HTML;

    before(function() {
      document.body.appendChild(container);
      element = document.querySelector('[data-overflow-menu]');
      menu = new OverflowMenu(element);
    });

    it('Should set and remove "bx--overflow-menu--open" class on the element on click event', function() {
      // Initial click to open overflow-menu:
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--overflow-menu--open')).to.be.true;

      // Secondary click to close overflow-menu:
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--overflow-menu--open')).to.be.false;
    });

    afterEach(function() {
      element.classList.remove('bx--overflow-menu--open');
    });

    after(function() {
      menu.release();
      document.body.removeChild(container);
    });
  });

  describe('Custom event emission', function() {
    let menu;
    let element;
    const container = document.createElement('div');
    container.innerHTML = HTML;

    const events = new EventManager();

    before(function() {
      document.body.appendChild(container);
      element = document.querySelector('.bx--overflow-menu');
      menu = new OverflowMenu(element);
    });

    it('Should provide a way to cancel showing overflow menu', function() {
      const spyOverflowEvent = sinon.spy();
      events.on(element.ownerDocument.body, 'floating-menu-beingshown', e => {
        e.preventDefault();
      });
      events.on(element.ownerDocument.body, 'floating-menu-shown', spyOverflowEvent);
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(spyOverflowEvent, 'floating-menu-shown event').not.to.have.been.called;
      expect(element.classList.contains('bx--overflow-menu--open'), 'State of root element').to.be.false;
    });

    it('Should emit an event after showing', function() {
      const spyOverflowEvent = sinon.spy();
      events.on(document, 'floating-menu-shown', spyOverflowEvent);
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(spyOverflowEvent).to.have.been.called;
    });

    it('Should provide a way to cancel hiding overflow menu', function() {
      const spyOverflowEvent = sinon.spy();
      events.on(element.ownerDocument.body, 'floating-menu-beinghidden', e => {
        e.preventDefault();
      });
      events.on(element.ownerDocument.body, 'floating-menu-hidden', spyOverflowEvent);
      element.classList.add('bx--overflow-menu--open');
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(spyOverflowEvent, 'floating-menu-hidden event').not.to.have.been.called;
      expect(element.classList.contains('bx--overflow-menu--open'), 'State of root element').to.be.true;
    });

    it('Should emit an event after hiding', function() {
      const spyOverflowEvent = sinon.spy();
      events.on(document, 'floating-menu-hidden', spyOverflowEvent);
      element.classList.add('bx--overflow-menu--open');
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(spyOverflowEvent).to.have.been.called;
    });

    afterEach(function() {
      element.classList.remove('bx--overflow-menu--open');
      events.reset();
    });

    after(function() {
      menu.release();
      document.body.removeChild(container);
    });
  });

  describe('Toggling multiple overflow-menus', function() {
    let elements;
    let element1;
    let element2;
    let element3;
    const container = document.createElement('div');
    container.innerHTML = [HTML, HTML, HTML].join('');

    before(function() {
      document.body.appendChild(container);
      elements = [...document.querySelectorAll('.bx--overflow-menu')];
      element1 = elements[0];
      element2 = elements[1];
      element3 = elements[2];
      new OverflowMenu(element1);
      new OverflowMenu(element2);
      new OverflowMenu(element3);
    });

    it('Should open one menu on a single click event', function() {
      element1.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element1.classList.contains('bx--overflow-menu--open'), '1st overflow menu').to.be.true;
      expect(element2.classList.contains('bx--overflow-menu--open'), '2nd overflow menu').to.be.false;
      expect(element3.classList.contains('bx--overflow-menu--open'), '3rd overflow menu').to.be.false;
    });

    it('Should open one menu on multiple click events', function() {
      element1.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      element2.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element1.classList.contains('bx--overflow-menu--open'), '1st overflow menu').to.be.false;
      expect(element2.classList.contains('bx--overflow-menu--open'), '2nd overflow menu').to.be.true;
      expect(element3.classList.contains('bx--overflow-menu--open'), '3rd overflow menu').to.be.false;
    });

    afterEach(function() {
      element1.classList.remove('bx--overflow-menu--open');
      element2.classList.remove('bx--overflow-menu--open');
      element3.classList.remove('bx--overflow-menu--open');
    });

    after(function() {
      document.body.removeChild(container);
    });
  });

  describe('Managing focus', function() {
    let menu;
    let element;
    let firstItemNode;
    let spyFocusFirstItemNode;
    const container = document.createElement('div');
    container.innerHTML = HTML;

    before(function() {
      document.body.appendChild(container);
      element = document.querySelector('.bx--overflow-menu');
      firstItemNode = element.querySelector('[data-floating-menu-primary-focus]');
      spyFocusFirstItemNode = sinon.spy(firstItemNode, 'focus');
      menu = new OverflowMenu(element);
    });

    it('Should focus on the floating menu when the menu is open', function() {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(spyFocusFirstItemNode).to.have.been.calledOnce;
    });

    afterEach(function() {
      if (spyFocusFirstItemNode) {
        spyFocusFirstItemNode.reset();
      }
    });

    after(function() {
      if (spyFocusFirstItemNode) {
        spyFocusFirstItemNode.restore();
        spyFocusFirstItemNode = null;
      }
      menu.release();
      document.body.removeChild(container);
    });
  });

  describe('Managing instances', function() {
    let menu;
    let element;
    let container;

    beforeEach(function() {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-overflow-menu]');
      menu = OverflowMenu.create(element);
    });

    it('Should remove click event listener on document object once the instance is released', function() {
      element.classList.add('bx--overflow-menu--open');
      menu.release();
      document.body.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--overflow-menu--open')).to.be.true;
    });

    it('Should remove keypress event listener on document object once the instance is released', function() {
      element.classList.add('bx--overflow-menu--open');
      menu.release();
      const event = new CustomEvent('keypress', { bubbles: true });
      event.key = 'Enter';
      document.body.dispatchEvent(event);
      expect(element.classList.contains('bx--overflow-menu--open')).to.be.true;
    });

    afterEach(function() {
      document.body.removeChild(container);
      menu.release();
    });
  });
});
