import EventManager from '../utils/event-manager';
import FloatingMenu from '../../src/components/floating-menu/floating-menu';
import HTML from '../../html/overflow-menu/overflow-menu.html'; // Use ul.bx--overflow-menu-options for testing

describe('Test floating menu', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new FloatingMenu();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new FloatingMenu(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });
  });

  describe('Setting menu direction', function() {
    let menu;

    it('Should use bottom by default', function() {
      expect(
        (menu = new FloatingMenu(document.createElement('div'))).options
          .direction
      ).toBe('bottom');
    });

    it('Should read the direction from data-floating-menu-direction', function() {
      const element = document.createElement('div');
      element.dataset.floatingMenuDirection = 'left';
      expect((menu = new FloatingMenu(element)).options.direction).toBe('left');
    });

    it('Should use options.direction over data-floating-menu-direction', function() {
      const element = document.createElement('div');
      element.dataset.floatingMenuDirection = 'left';
      expect(
        (menu = new FloatingMenu(element, { direction: 'right' })).options
          .direction
      ).toBe('right');
    });

    afterEach(function() {
      if (menu) {
        menu = menu.release();
      }
    });
  });

  describe('Showing/hiding', function() {
    let menu;
    let element;
    let refNode;
    const events = new EventManager();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = HTML;

    beforeAll(function() {
      element = tempDiv.querySelector('ul.bx--overflow-menu-options');
      document.body.appendChild(element);
      refNode = document.createElement('div');
      document.body.appendChild(refNode);
      menu = new FloatingMenu(element, {
        refNode,
        classShown: 'my-floating-menu-open',
        classRefShown: 'my-floating-menu-trigger-open',
      });
    });

    it("Should sanity check show()'s arguments", function() {
      expect(() => {
        menu.show({});
      }).toThrowError(
        TypeError,
        'DOM Node should be given for launching element.'
      );
    });

    it('Should have show() do nothing if already visible', function() {
      element.classList.add('my-floating-menu-open');
      const spy = jasmine.createSpy();
      events.on(element, 'floating-menu-beingshown', spy);
      menu.show();
      expect(
        element.classList.contains('my-floating-menu-open'),
        'Menu state'
      ).toBe(true);
      expect(
        refNode.classList.contains('my-floating-menu-trigger-open'),
        'Trigger button state'
      ).toBe(false);
      expect(spy, 'floating-menu-beingshown event').not.toHaveBeenCalled();
    });

    it('Should have show() method show menu', function() {
      const spy = jasmine.createSpy();
      events.on(menu.element, 'floating-menu-shown', spy);
      menu.show();
      expect(
        element.classList.contains('my-floating-menu-open'),
        'Menu state'
      ).toBe(true);
      expect(
        refNode.classList.contains('my-floating-menu-trigger-open'),
        'Trigger button state'
      ).toBe(true);
      expect(spy, 'floating-menu-shown event').toHaveBeenCalledTimes(1);
    });

    it('Should call callback of show() method after it finishes', function() {
      const spy = jasmine.createSpy();
      menu.show(spy);
      menu.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Should sanity check hide()'s arguments", function() {
      expect(() => {
        menu.hide({});
      }).toThrowError(
        TypeError,
        'DOM Node should be given for launching element.'
      );
    });

    it('Should have hide() not hide if not visible already', function() {
      const spy = jasmine.createSpy();
      events.on(element, 'floating-menu-beinghidden', spy);
      menu.hide();
      menu.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      expect(
        element.classList.contains('my-floating-menu-open'),
        'Menu state'
      ).toBe(false);
      expect(
        element.classList.contains('my-floating-menu-trigger-open'),
        'Trigger button state'
      ).toBe(false);
      expect(spy, 'floating-menu-beinghidden event').not.toHaveBeenCalled();
    });

    it('Should have hide() method hide menu', function() {
      menu.show();
      menu.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      const spy = jasmine.createSpy();
      events.on(element, 'floating-menu-hidden', spy);
      menu.hide();
      expect(
        element.classList.contains('my-floating-menu-open'),
        'Menu state'
      ).toBe(false);
      expect(
        element.classList.contains('my-floating-menu-trigger-open'),
        'Trigger button state'
      ).toBe(false);
      expect(spy, 'floating-menu-hidden event').toHaveBeenCalled();
    });

    it('Should have changeState() do nothing if the new state is neither shown or nor hidden', function() {
      const spyBeingShown = jasmine.createSpy();
      const spyBeingHidden = jasmine.createSpy();
      events.on(element, 'floating-menu-beingshown', spyBeingShown);
      events.on(element, 'floating-menu-beinghidden', spyBeingHidden);
      menu.changeState('foo');
      expect(
        element.classList.contains('my-floating-menu-open'),
        'Menu state'
      ).toBe(false);
      expect(
        refNode.classList.contains('my-floating-menu-trigger-open'),
        'Trigger button state'
      ).toBe(false);
      expect(
        spyBeingShown,
        'floating-menu-beingshown event'
      ).not.toHaveBeenCalled();
      expect(
        spyBeingHidden,
        'floating-menu-beinghidden event'
      ).not.toHaveBeenCalled();
    });

    it("Should fire event on delegator node if it's given", function() {
      const spy = jasmine.createSpy();
      events.on(refNode, 'floating-menu-shown', spy);
      menu.changeState('shown', { delegatorNode: refNode });
      expect(spy, 'floating-menu-shown event').toHaveBeenCalledTimes(1);
    });

    afterEach(function() {
      element.classList.remove('my-floating-menu-open');
      refNode.classList.remove('my-floating-menu-trigger-open');
      events.reset();
    });

    afterAll(function() {
      if (menu) {
        menu.release();
        menu = null;
      }
      if (refNode) {
        if (refNode.parentNode) {
          refNode.parentNode.removeChild(refNode);
        }
        refNode = null;
      }
      if (element) {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
        element = null;
      }
    });
  });

  describe('Placing menu', function() {
    let menu;
    let element;
    let refNode;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = HTML;

    beforeAll(function() {
      window.pageXOffset = 0;
      window.pageYOffset = 0;
      element = tempDiv.querySelector('ul.bx--overflow-menu-options');
      spyOn(element, 'getBoundingClientRect').and.callFake(() => ({
        width: 400,
        height: 400,
      }));
      document.body.appendChild(element);
      refNode = document.createElement('div');
      spyOn(refNode, 'getBoundingClientRect').and.callFake(() => ({
        left: 100,
        top: 200,
        right: 300,
        bottom: 400,
        width: 200,
        height: 200,
      }));
      document.body.appendChild(refNode);
      menu = new FloatingMenu(element, {
        refNode,
        classShown: 'my-floating-menu-open',
        classRefShown: 'my-floating-menu-trigger-open',
        offset: {
          left: 25,
          top: 50,
        },
      });
    });

    it('Should place the menu at the left', function() {
      menu.options.direction = 'left';
      menu.show();
      expect(element.style.left).toBe('-325px');
      expect(element.style.top).toBe('150px');
    });

    it('Should place the menu at the top', function() {
      menu.options.direction = 'top';
      menu.show();
      expect(element.style.left).toBe('25px');
      expect(element.style.top).toBe('-250px');
    });

    it('Should place the menu at the right', function() {
      menu.options.direction = 'right';
      menu.show();
      expect(element.style.left).toBe('325px');
      expect(element.style.top).toBe('150px');
    });

    it('Should place the menu at the bottom', function() {
      menu.options.direction = 'bottom';
      menu.show();
      expect(element.style.left).toBe('25px');
      expect(element.style.top).toBe('450px');
    });

    it('Should throw if refNode is not there', function() {
      menu.options.refNode = null;
      try {
        expect(() => {
          menu.show();
        }).toThrowError(
          TypeError,
          'Cannot find the refernce node for changing the style.'
        );
      } finally {
        menu.options.refNode = refNode;
      }
    });

    afterEach(function() {
      element.classList.remove('my-floating-menu-open');
      element.classList.remove('my-floating-menu-trigger-open');
    });

    afterAll(function() {
      if (menu) {
        menu.release();
        menu = null;
      }
      if (refNode) {
        if (refNode.parentNode) {
          refNode.parentNode.removeChild(refNode);
        }
        refNode = null;
      }
      if (element) {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
        element = null;
      }
    });
  });

  describe('Moving menu into the container', function() {
    let menu;
    let element;
    let refNode;
    let container;
    const events = new EventManager();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = HTML;

    beforeAll(function() {
      refNode = document.createElement('div');
      document.body.appendChild(refNode);
    });

    beforeEach(function() {
      container = document.createElement('div');
      container.innerHTML = HTML;
      element = container.querySelector('ul.bx--overflow-menu-options');
      document.body.appendChild(container);
      menu = new FloatingMenu(element, {
        refNode,
        classShown: 'my-floating-menu-open',
        classRefShown: 'my-floating-menu-trigger-open',
      });
    });

    it('Should move to body by default', function() {
      menu.show();
      expect(element.parentNode).toBe(document.body);
    });

    it('Should move to element with data-floating-menu-container attribute', function() {
      container.dataset.floatingMenuContainer = '';
      menu.show();
      expect(element.parentNode).toBe(container);
    });

    afterEach(function() {
      if (menu) {
        menu.release();
        menu = null;
      }
      if (element) {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
        element = null;
      }
      if (container) {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
        container = null;
      }
      events.reset();
    });

    afterAll(function() {
      if (refNode) {
        if (refNode.parentNode) {
          refNode.parentNode.removeChild(refNode);
        }
        refNode = null;
      }
    });
  });

  describe('Handling resize', function() {
    let menu;
    let element;
    let refNode;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = HTML;

    beforeAll(function() {
      element = tempDiv.querySelector('ul.bx--overflow-menu-options');
      document.body.appendChild(element);
      refNode = document.createElement('div');
      document.body.appendChild(refNode);
      menu = new FloatingMenu(element, {
        refNode,
        classShown: 'my-floating-menu-open',
        classRefShown: 'my-floating-menu-trigger-open',
      });
    });

    beforeEach(function() {
      spyOn(menu, '_place');
      spyOn(window, 'requestAnimationFrame').and.callFake(callback => {
        callback();
      });
    });

    it('Should handle resizing while shown', function() {
      menu.show();
      menu._place.calls.reset();
      window.dispatchEvent(new CustomEvent('resize'));
      expect(menu._place).toHaveBeenCalledTimes(1);
    });

    it('Should not handle resizing while hidden', function() {
      window.dispatchEvent(new CustomEvent('resize'));
      expect(menu._place).not.toHaveBeenCalled();
    });

    afterEach(function() {
      menu.hide();
    });

    afterAll(function() {
      if (menu) {
        menu.release();
        menu = null;
      }
      if (refNode) {
        if (refNode.parentNode) {
          refNode.parentNode.removeChild(refNode);
        }
        refNode = null;
      }
      if (element) {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
        element = null;
      }
    });
  });

  describe('Managing focus', function() {
    let menu;
    let element;
    let primaryFocusNode;
    let refNode;
    let input;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = HTML;

    beforeAll(function() {
      element = tempDiv.querySelector('ul.bx--overflow-menu-options');
      document.body.appendChild(element);
      primaryFocusNode = element.querySelector(
        '[data-floating-menu-primary-focus]'
      );
      refNode = document.createElement('div');
      document.body.appendChild(refNode);
      input = document.createElement('input');
      document.body.appendChild(input);
      menu = new FloatingMenu(element, {
        refNode,
        classShown: 'my-floating-menu-open',
        classRefShown: 'my-floating-menu-trigger-open',
      });
    });

    it('Should close menu when both the trigger button and the menu lose focus', function() {
      primaryFocusNode.focus();
      menu.changeState('shown', {});
      input.focus();
      expect(
        element.classList.contains('bx--overflow-menu-options--open')
      ).toBe(false);
    });

    it('Should focus back on the trigger button when floating menu loses focus', function() {
      const hasFocusin = 'onfocusin' in window;
      const focusinEventName = hasFocusin ? 'focusin' : 'focus';
      primaryFocusNode.focus();
      menu.changeState('shown', {});
      spyOn(HTMLElement.prototype, 'focus');
      // Firefox does not fire `onfocus` event with `input.focus()` call, presumably when the window does not have focus
      input.dispatchEvent(
        Object.assign(new CustomEvent(focusinEventName, { bubbles: true }), {
          relatedTarget: primaryFocusNode,
        })
      );
      expect(HTMLElement.prototype.focus).toHaveBeenCalledTimes(1);
    });

    afterEach(function() {
      element.classList.remove('bx--overflow-menu-options--open');
    });

    afterAll(function() {
      if (menu) {
        menu = menu.release();
      }
      if (input) {
        if (input.parentNode) {
          input.parentNode.removeChild(input);
        }
        input = null;
      }
      if (refNode) {
        if (refNode.parentNode) {
          refNode.parentNode.removeChild(refNode);
        }
        refNode = null;
      }
      if (element) {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
        element = null;
      }
    });
  });
});
