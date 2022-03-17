import EventManager from '../utils/event-manager';
import OverflowMenu from '../../src/components/overflow-menu/overflow-menu';
import HTML from '../../html/overflow-menu/overflow-menu.html';

describe('Test Overflow menu', function () {
  describe('Constructor', function () {
    it('Should throw if root element is not given', function () {
      expect(() => {
        new OverflowMenu();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        new OverflowMenu(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });
  });

  describe('Toggling a single overflow-menu', function () {
    let menu;
    let element;
    const container = document.createElement('div');
    container.innerHTML = HTML;

    beforeAll(function () {
      document.body.appendChild(container);
      element = document.querySelector('[data-overflow-menu]');
      menu = new OverflowMenu(element);
    });

    it('Should set and remove "bx--overflow-menu--open" class on the element on click event', function () {
      // Initial click to open overflow-menu:
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--overflow-menu--open')).toBe(true);

      // Secondary click to close overflow-menu:
      element.dispatchEvent(new CustomEvent('mousedown', { bubbles: true }));
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--overflow-menu--open')).toBe(false);
    });

    afterEach(function () {
      element.classList.remove('bx--overflow-menu--open');
    });

    afterAll(function () {
      menu.release();
      document.body.removeChild(container);
    });
  });

  describe('Custom event emission', function () {
    let menu;
    let element;
    let optionsElement;
    const container = document.createElement('div');
    container.innerHTML = HTML;

    const events = new EventManager();

    beforeAll(function () {
      document.body.appendChild(container);
      element = document.querySelector('.bx--overflow-menu');
      optionsElement = element.querySelector('.bx--overflow-menu-options');
      menu = new OverflowMenu(element);
    });

    it('Should provide a way to cancel showing overflow menu', function () {
      const spyOverflowEvent = jasmine.createSpy();
      events.on(element.ownerDocument.body, 'floating-menu-beingshown', (e) => {
        e.preventDefault();
      });
      events.on(
        element.ownerDocument.body,
        'floating-menu-shown',
        spyOverflowEvent
      );
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(
        spyOverflowEvent,
        'floating-menu-shown event'
      ).not.toHaveBeenCalled();
      expect(
        element.classList.contains('bx--overflow-menu--open'),
        'State of root element'
      ).toBe(false);
    });

    describe('Arrow key navigation', function () {
      const upArrowKeydown = new KeyboardEvent('keydown', { bubbles: true });
      Object.defineProperty(upArrowKeydown, 'which', {
        value: 38,
        writable: true,
      });
      const downArrowKeydown = new KeyboardEvent('keydown', { bubbles: true });
      Object.defineProperty(downArrowKeydown, 'which', {
        value: 40,
        writable: true,
      });
      let items;

      beforeEach(() => {
        element.classList.add('bx--overflow-menu--open');
        optionsElement.classList.add('bx--overflow-menu-options--open');
        items = document.querySelectorAll(`
          .bx--overflow-menu-options--open
          .bx--overflow-menu-options__option:not(.bx--overflow-menu-options__option--disabled)
          > .bx--overflow-menu-options__btn
        `);
        items[0].focus();
      });

      describe('Up/Down arrow keys', function () {
        it('should move focus from currently focused item to previous menu item', function () {
          spyOn(items[0], 'focus');
          items[1].focus();
          element.dispatchEvent(upArrowKeydown);
          expect(items[0].focus).toHaveBeenCalled();
          expect(items[0].focus).toHaveBeenCalledTimes(1);
        });

        it('should wrap focus from first menu item to last menu item', function () {
          spyOn(items[items.length - 1], 'focus');
          element.dispatchEvent(upArrowKeydown);
          expect(items[items.length - 1].focus).toHaveBeenCalled();
          expect(items[items.length - 1].focus).toHaveBeenCalledTimes(1);
        });

        it('should move focus from currently focused item to next menu item', function () {
          spyOn(items[1], 'focus');
          optionsElement.dispatchEvent(downArrowKeydown);
          expect(items[1].focus).toHaveBeenCalledTimes(1);
        });

        it('should wrap focus from last menu item to first menu item', function () {
          spyOn(items[0], 'focus');
          items[items.length - 1].focus();
          optionsElement.dispatchEvent(downArrowKeydown);
          expect(items[0].focus).toHaveBeenCalledTimes(1);
        });
      });

      afterEach(() => {
        element.classList.remove('bx--overflow-menu--open');
        optionsElement.classList.remove('bx--overflow-menu-options--open');
      });
    });

    it('Should emit an event after showing', function () {
      const spyOverflowEvent = jasmine.createSpy();
      events.on(document, 'floating-menu-shown', spyOverflowEvent);
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(spyOverflowEvent).toHaveBeenCalled();
    });

    it('Should provide a way to cancel hiding overflow menu', function () {
      const spyOverflowEvent = jasmine.createSpy();
      events.on(
        element.ownerDocument.body,
        'floating-menu-beinghidden',
        (e) => {
          e.preventDefault();
        }
      );
      events.on(
        element.ownerDocument.body,
        'floating-menu-hidden',
        spyOverflowEvent
      );
      element.classList.add('bx--overflow-menu--open');
      optionsElement.classList.add('bx--overflow-menu-options--open');
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(
        spyOverflowEvent,
        'floating-menu-hidden event'
      ).not.toHaveBeenCalled();
      expect(
        element.classList.contains('bx--overflow-menu--open'),
        'State of root element'
      ).toBe(true);
    });

    it('Should emit an event after hiding', function () {
      const spyOverflowEvent = jasmine.createSpy();
      events.on(document, 'floating-menu-hidden', spyOverflowEvent);
      element.classList.add('bx--overflow-menu--open');
      optionsElement.classList.add('bx--overflow-menu-options--open');
      element.dispatchEvent(new CustomEvent('mousedown', { bubbles: true }));
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(spyOverflowEvent).toHaveBeenCalled();
    });

    afterEach(function () {
      optionsElement.classList.remove('bx--overflow-menu-options--open');
      element.classList.remove('bx--overflow-menu--open');
      events.reset();
    });

    afterAll(function () {
      menu.release();
      document.body.removeChild(container);
    });
  });

  describe('Toggling multiple overflow-menus', function () {
    let elements;
    let element1;
    let element2;
    let element3;
    let optionElements;
    const container = document.createElement('div');
    container.innerHTML = [HTML, HTML, HTML].join('');

    beforeAll(function () {
      document.body.appendChild(container);
      elements = [...document.querySelectorAll('.bx--overflow-menu')];
      [element1, element2, element3] = elements;
      optionElements = elements.map((element) =>
        element.querySelector('.bx--overflow-menu-options')
      );
      new OverflowMenu(element1);
      new OverflowMenu(element2);
      new OverflowMenu(element3);
    });

    it('Should open one menu on a single click event', function () {
      element1.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(
        element1.classList.contains('bx--overflow-menu--open'),
        '1st overflow menu'
      ).toBe(true);
      expect(
        element2.classList.contains('bx--overflow-menu--open'),
        '2nd overflow menu'
      ).toBe(false);
      expect(
        element3.classList.contains('bx--overflow-menu--open'),
        '3rd overflow menu'
      ).toBe(false);
    });

    it('Should open one menu on multiple click events', function () {
      element1.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      element2.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(
        element1.classList.contains('bx--overflow-menu--open'),
        '1st overflow menu'
      ).toBe(false);
      expect(
        element2.classList.contains('bx--overflow-menu--open'),
        '2nd overflow menu'
      ).toBe(true);
      expect(
        element3.classList.contains('bx--overflow-menu--open'),
        '3rd overflow menu'
      ).toBe(false);
    });

    afterEach(function () {
      optionElements.forEach((optionElement) => {
        optionElement.classList.remove('bx--overflow-menu-options--open');
      });
      elements.forEach((element) => {
        element.classList.remove('bx--overflow-menu--open');
      });
    });

    afterAll(function () {
      document.body.removeChild(container);
    });
  });

  describe('Managing focus', function () {
    let menu;
    let element;
    let firstItemNode;
    const container = document.createElement('div');
    container.innerHTML = HTML;

    beforeAll(function () {
      document.body.appendChild(container);
      element = document.querySelector('.bx--overflow-menu');
      firstItemNode = element.querySelector(
        '[data-floating-menu-primary-focus]'
      );
      menu = new OverflowMenu(element);
    });

    it('Should focus on the floating menu when the menu is open', function () {
      spyOn(firstItemNode, 'focus');
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(firstItemNode.focus).toHaveBeenCalledTimes(1);
    });

    afterAll(function () {
      menu.release();
      document.body.removeChild(container);
    });
  });

  describe('Managing instances', function () {
    let menu;
    let element;
    let container;

    beforeEach(function () {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-overflow-menu]');
      menu = OverflowMenu.create(element);
    });

    it('Should remove click event listener on document object once the instance is released', function () {
      element.classList.add('bx--overflow-menu--open');
      menu.release();
      document.body.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--overflow-menu--open')).toBe(true);
    });

    it('Should remove keypress event listener on document object once the instance is released', function () {
      element.classList.add('bx--overflow-menu--open');
      menu.release();
      const event = new CustomEvent('keypress', { bubbles: true });
      event.key = 'Enter';
      document.body.dispatchEvent(event);
      expect(element.classList.contains('bx--overflow-menu--open')).toBe(true);
    });

    afterEach(function () {
      document.body.removeChild(container);
      menu.release();
    });
  });
});
