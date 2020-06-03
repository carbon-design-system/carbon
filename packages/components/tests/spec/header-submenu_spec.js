import HeaderSubmenu from '../../src/components/ui-shell/header-submenu';

describe('Header Submenu', function () {
  describe('Constructor', function () {
    it('Should throw if root element is not given', function () {
      expect(() => {
        new HeaderSubmenu();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        new HeaderSubmenu(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });
  });

  describe('Click handler', function () {
    let headerSubmenu;
    let element;
    let triggerNode;
    let itemLinkNode;

    beforeAll(function () {
      element = document.createElement('li');
      triggerNode = document.createElement('a');
      triggerNode.classList.add('bx--header__menu-title');
      triggerNode.classList.add('bx--header__menu-item');
      element.appendChild(triggerNode);
      const itemsContainerNode = document.createElement('ul');
      itemsContainerNode.className = 'bx--header__menu';
      const itemNode = document.createElement('li');
      itemLinkNode = document.createElement('a');
      itemLinkNode.className = 'bx--header__menu-item';
      itemNode.appendChild(itemLinkNode);
      itemsContainerNode.appendChild(itemNode);
      element.appendChild(itemsContainerNode);
      headerSubmenu = new HeaderSubmenu(element);
      document.body.appendChild(element);
    });

    it('should do nothing on menu title click', function () {
      triggerNode.setAttribute('aria-expanded', 'false');
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
    });

    it('should close menu when clicking on an item', function () {
      triggerNode.setAttribute('aria-expanded', 'true');
      itemLinkNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
    });

    afterEach(function () {
      triggerNode.setAttribute('aria-expanded', 'false');
    });

    afterAll(function () {
      headerSubmenu.release();
      document.body.removeChild(element);
    });
  });

  describe('Handle blur', function () {
    let headerSubmenu;
    let element;
    let triggerNode;
    let input;
    let itemLinkNode;

    beforeAll(function () {
      element = document.createElement('li');
      triggerNode = document.createElement('a');
      triggerNode.setAttribute('href', '#');
      triggerNode.classList.add('bx--header__menu-title');
      triggerNode.classList.add('bx--header__menu-item');
      triggerNode.textContent = 'menu header';
      element.appendChild(triggerNode);
      input = document.createElement('input');
      input.type = 'text';
      const itemsContainerNode = document.createElement('ul');
      itemsContainerNode.className = 'bx--header__menu';
      const itemNode = document.createElement('li');
      itemLinkNode = document.createElement('a');
      itemLinkNode.className = 'bx--header__menu-item';
      itemLinkNode.setAttribute('href', '#');
      itemLinkNode.textContent = 'menu item';
      itemNode.appendChild(itemLinkNode);
      itemsContainerNode.appendChild(itemNode);
      element.appendChild(itemsContainerNode);
      headerSubmenu = new HeaderSubmenu(element);
      document.body.appendChild(element);
      document.body.appendChild(input);
    });

    beforeEach(function () {
      triggerNode.setAttribute('aria-expanded', 'true');
    });

    it('should close menu when another element is focused or when document is clicked', function () {
      // TODO: mock CustomEvent for IE
      const customEvent = new CustomEvent('blur', { bubbles: true });
      Object.defineProperty(customEvent, 'relatedTarget', {
        value: input,
        writable: true,
      });
      itemLinkNode.dispatchEvent(customEvent);
      expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
    });

    afterEach(function () {
      triggerNode.setAttribute('aria-expanded', 'false');
    });

    afterAll(function () {
      headerSubmenu.release();
      document.body.removeChild(element);
      document.body.removeChild(input);
    });
  });

  describe('Handle keydown', function () {
    let headerSubmenu;
    let element1;
    let triggerNode;
    let itemsContainerNode;
    let itemNode1;
    let itemNode2;
    let itemLinkNode1;
    let itemLinkNode2;
    let element2;

    beforeAll(function () {
      element1 = document.createElement('li');
      element1.classList.add('bx--header__submenu');
      triggerNode = document.createElement('a');
      triggerNode.className = 'bx--header__menu-title';
      element1.appendChild(triggerNode);
      itemsContainerNode = document.createElement('ul');
      itemsContainerNode.className = 'bx--header__menu';
      itemNode1 = document.createElement('li');
      itemNode2 = document.createElement('li');
      itemLinkNode1 = document.createElement('a');
      itemLinkNode1.className = 'bx--header__menu-item';
      itemLinkNode2 = document.createElement('a');
      itemLinkNode2.className = 'bx--header__menu-item';
      itemNode1.appendChild(itemLinkNode1);
      itemNode2.appendChild(itemLinkNode2);
      itemsContainerNode.appendChild(itemNode1);
      itemsContainerNode.appendChild(itemNode2);
      element1.appendChild(itemsContainerNode);
      element2 = element1.cloneNode(true);
      headerSubmenu = new HeaderSubmenu(element1);
      document.body.appendChild(element1);
      document.body.appendChild(element2);
    });

    describe('Arrow keys', function () {
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

      describe('Up/Down arrow keys', function () {
        it('should move focus from currently focused item to previous menu item', function () {
          spyOn(itemLinkNode2, 'focus');
          triggerNode.setAttribute('aria-expanded', 'true');
          triggerNode.dispatchEvent(upArrowKeydown);
          expect(triggerNode.getAttribute('aria-expanded')).toBe('true');
          expect(itemLinkNode2.focus).toHaveBeenCalled();
          expect(itemLinkNode2.focus).toHaveBeenCalledTimes(1);
        });

        it('should wrap focus from first menu item to last menu item', function () {
          spyOn(itemLinkNode1, 'focus');
          spyOn(itemLinkNode2, 'focus');
          triggerNode.setAttribute('aria-expanded', 'true');
          triggerNode.dispatchEvent(downArrowKeydown);
          triggerNode.dispatchEvent(upArrowKeydown);
          expect(triggerNode.getAttribute('aria-expanded')).toBe('true');
          expect(itemLinkNode1.focus).toHaveBeenCalledTimes(1);
          expect(itemLinkNode2.focus).toHaveBeenCalledTimes(1);
        });

        it('should not open menu when menu is focused', function () {
          triggerNode.dispatchEvent(downArrowKeydown);
          expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
        });

        it('should move focus from currently focused item to next menu item', function () {
          // TODO: figure out why we need to set tabindex
          itemLinkNode1.setAttribute('tabindex', 0);
          spyOn(itemLinkNode2, 'focus');
          triggerNode.setAttribute('aria-expanded', 'true');
          itemLinkNode1.focus();
          triggerNode.dispatchEvent(downArrowKeydown);
          expect(triggerNode.getAttribute('aria-expanded')).toBe('true');
          expect(itemLinkNode2.focus).toHaveBeenCalledTimes(1);
        });

        it('should wrap focus from last menu item to first menu item', function () {
          // TODO: figure out why we need to set tabindex
          itemLinkNode2.setAttribute('tabindex', 0);
          spyOn(itemLinkNode1, 'focus');
          triggerNode.setAttribute('aria-expanded', 'true');
          itemLinkNode2.focus();
          triggerNode.dispatchEvent(downArrowKeydown);
          expect(triggerNode.getAttribute('aria-expanded')).toBe('true');
          expect(itemLinkNode1.focus).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('Esc key', function () {
      const escKeydown = new KeyboardEvent('keydown', { bubbles: true });
      Object.defineProperty(escKeydown, 'which', { value: 27, writable: true });

      it('should close menu with ESC key when menu is focused', function () {
        triggerNode.setAttribute('aria-expanded', 'true');
        triggerNode.dispatchEvent(escKeydown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
      });

      it('should close menu with ESC key when an item is focused', function () {
        triggerNode.setAttribute('aria-expanded', 'true');
        itemNode1.dispatchEvent(escKeydown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
      });

      it('should not open menu with ESC key', function () {
        triggerNode.dispatchEvent(escKeydown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
      });
    });

    describe('Space bar', function () {
      const spaceBarDown = new KeyboardEvent('keydown', { bubbles: true });
      Object.defineProperty(spaceBarDown, 'which', {
        value: 32,
        writable: true,
      });

      it('should open menu with space bar', function () {
        triggerNode.dispatchEvent(spaceBarDown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('true');
      });

      it('should close menu with space key', function () {
        triggerNode.setAttribute('aria-expanded', 'true');
        triggerNode.dispatchEvent(spaceBarDown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
      });

      it('should not close menu with space key on an item', function () {
        itemNode1.dispatchEvent(spaceBarDown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('true');
      });
    });

    afterEach(function () {
      triggerNode.setAttribute('aria-expanded', 'false');
    });

    afterAll(function () {
      headerSubmenu.release();
      document.body.removeChild(element1);
    });
  });

  describe('Handle mouse event', function () {
    let headerSubmenu;
    let element1;
    let triggerNode;
    let itemsContainerNode;
    let itemNode1;
    let itemNode2;
    let itemLinkNode1;
    let itemLinkNode2;
    let element2;
    const mouseEnter = new MouseEvent('mouseenter', { bubbles: true });
    const mouseLeave = new MouseEvent('mouseleave', { bubbles: true });

    beforeAll(function () {
      element1 = document.createElement('li');
      element1.classList.add('bx--header__submenu');
      triggerNode = document.createElement('a');
      triggerNode.className = 'bx--header__menu-title';
      element1.appendChild(triggerNode);
      itemsContainerNode = document.createElement('ul');
      itemsContainerNode.className = 'bx--header__menu';
      itemNode1 = document.createElement('li');
      itemNode2 = document.createElement('li');
      itemLinkNode1 = document.createElement('a');
      itemLinkNode1.className = 'bx--header__menu-item';
      itemLinkNode2 = document.createElement('a');
      itemLinkNode2.className = 'bx--header__menu-item';
      itemNode1.appendChild(itemLinkNode1);
      itemNode2.appendChild(itemLinkNode2);
      itemsContainerNode.appendChild(itemNode1);
      itemsContainerNode.appendChild(itemNode2);
      element1.appendChild(itemsContainerNode);
      element2 = element1.cloneNode(true);
      headerSubmenu = new HeaderSubmenu(element1);
      document.body.appendChild(element1);
      document.body.appendChild(element2);
    });

    it('should close menu on mouseleave', function () {
      triggerNode.setAttribute('aria-expanded', 'true');
      triggerNode.dispatchEvent(mouseLeave);
      expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
    });

    it('should open menu on mouseenter', function () {
      triggerNode.setAttribute('aria-expanded', 'false');
      triggerNode.dispatchEvent(mouseEnter);
      expect(triggerNode.getAttribute('aria-expanded')).toBe('true');
    });

    afterEach(function () {
      triggerNode.setAttribute('aria-expanded', 'false');
    });

    afterAll(function () {
      headerSubmenu.release();
      document.body.removeChild(element1);
    });
  });

  describe('Handle unknown events', function () {
    let headerSubmenu;
    let element;
    let triggerNode;
    let itemLinkNode;
    let unknownEvent;

    beforeAll(function () {
      element = document.createElement('li');
      triggerNode = document.createElement('a');
      triggerNode.classList.add('bx--header__menu-title');
      triggerNode.classList.add('bx--header__menu-item');
      element.appendChild(triggerNode);
      const itemsContainerNode = document.createElement('bx--header__menu');
      itemsContainerNode.className = 'bx--header__menu';
      const itemNode = document.createElement('li');
      itemLinkNode = document.createElement('a');
      itemLinkNode.className = 'bx--header__menu-item';
      itemNode.appendChild(itemLinkNode);
      itemsContainerNode.appendChild(itemNode);
      element.appendChild(itemsContainerNode);
      headerSubmenu = new HeaderSubmenu(element);
      document.body.appendChild(element);
      unknownEvent = new CustomEvent('unknown', { bubbles: true });
      Object.defineProperty(unknownEvent, 'target', {
        value: {},
        writable: true,
      });
      Object.defineProperty(unknownEvent, 'currentTarget', {
        value: {},
        writable: true,
      });
    });

    beforeEach(function () {
      triggerNode.setAttribute('aria-expanded', 'false');
    });

    it('should gracefully ignore unknown events', function () {
      const getAction = headerSubmenu._getAction(unknownEvent);
      expect(getAction).toEqual(null);
    });

    it('should not change state upon unknown events', function () {
      const action = headerSubmenu._getAction(unknownEvent);
      const state = headerSubmenu._getNewState(action);
      expect(state).toEqual(false);
    });

    it('should handle unknown keypress', function () {
      const unknownKeypress = headerSubmenu._handleKeyDown(unknownEvent);
      expect(unknownKeypress).toEqual(undefined);
    });

    afterAll(function () {
      headerSubmenu.release();
      document.body.removeChild(element);
    });
  });
});
