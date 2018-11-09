import HeaderSubmenu from '../../src/components/ui-shell/header-submenu';

describe('Header Submenu', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new HeaderSubmenu();
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new HeaderSubmenu(document.createTextNode(''));
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });
  });

  describe('Click handler', function() {
    let headerSubmenu;
    let element;
    let triggerNode;
    let itemLinkNode;

    beforeAll(function() {
      element = document.createElement('li');
      triggerNode = document.createElement('a');
      triggerNode.className = 'bx--header__menu-title';
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
    });

    it('should open the menu on click', function() {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(triggerNode.getAttribute('aria-expanded')).toBe('true');
    });

    it('should close an open menu on click', function() {
      triggerNode.setAttribute('aria-expanded', 'true');
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
    });

    it('should close menu when clicking document', function() {
      triggerNode.setAttribute('aria-expanded', 'true');
      document.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
    });

    it('should close menu when clicking on an item', function() {
      triggerNode.setAttribute('aria-expanded', 'true');
      itemLinkNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
    });

    afterEach(function() {
      triggerNode.setAttribute('aria-expanded', 'false');
    });

    afterAll(function() {
      headerSubmenu.release();
      document.body.removeChild(element);
    });
  });

  describe('Handle blur', function() {
    let headerSubmenu;
    let element;
    let triggerNode;
    let input;

    beforeAll(function() {
      triggerNode = document.createElement('a');
      element = document.createElement('li');
      input = document.createElement('input');
      triggerNode.className = 'bx--header__menu-title';
      element.appendChild(triggerNode);
      document.body.appendChild(element);
      headerSubmenu = new HeaderSubmenu(element);
      input.type = 'text';
      document.body.appendChild(input);
    });

    beforeEach(function() {
      triggerNode.setAttribute('aria-expanded', 'true');
      triggerNode.focus();
    });

    it('should close menu when another element is focused', function() {
      input.focus();
      expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
    });

    it('should always close menu when document is clicked', function() {
      document.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
    });

    afterEach(function() {
      triggerNode.setAttribute('aria-expanded', 'false');
    });

    afterAll(function() {
      headerSubmenu.release();
      document.body.removeChild(element);
      document.body.removeChild(input);
    });
  });

  describe('Handle keydown', function() {
    let headerSubmenu;
    let element;
    let triggerNode;
    let itemsContainerNode;
    let itemNode1;
    let itemNode2;
    let itemLinkNode1;
    let itemLinkNode2;

    beforeAll(function() {
      element = document.createElement('li');
      triggerNode = document.createElement('a');
      triggerNode.className = 'bx--header__menu-title';
      element.appendChild(triggerNode);
      itemsContainerNode = document.createElement('bx--header__menu');
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
      element.appendChild(itemsContainerNode);
      headerSubmenu = new HeaderSubmenu(element);
      document.body.appendChild(element);
    });

    describe('Arrow keys', function() {
      const upArrowKeydown = new KeyboardEvent('keydown', { bubbles: true });
      Object.defineProperty(upArrowKeydown, 'which', { value: 38, writable: true });
      const downArrowKeydown = new KeyboardEvent('keydown', { bubbles: true });
      Object.defineProperty(downArrowKeydown, 'which', { value: 40, writable: true });

      it('should move focus from currently focused item to previous menu item', function() {
        spyOn(itemLinkNode2, 'focus');
        triggerNode.setAttribute('aria-expanded', 'true');
        triggerNode.dispatchEvent(upArrowKeydown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('true');
        expect(itemLinkNode2.focus).toHaveBeenCalled();
        expect(itemLinkNode2.focus).toHaveBeenCalledTimes(1);
      });

      it('should wrap focus from first menu item to last menu item', function() {
        spyOn(itemLinkNode1, 'focus');
        spyOn(itemLinkNode2, 'focus');
        triggerNode.setAttribute('aria-expanded', 'true');
        triggerNode.dispatchEvent(downArrowKeydown);
        triggerNode.dispatchEvent(upArrowKeydown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('true');
        expect(itemLinkNode1.focus).toHaveBeenCalledTimes(1);
        expect(itemLinkNode2.focus).toHaveBeenCalledTimes(1);
      });

      it('should open menu when menu is focused', function() {
        triggerNode.dispatchEvent(downArrowKeydown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('true');
      });

      it('should move focus from currently focused item to next menu item', function() {
        spyOn(itemLinkNode2, 'focus');
        triggerNode.setAttribute('aria-expanded', 'true');
        triggerNode.dispatchEvent(downArrowKeydown);
        triggerNode.dispatchEvent(downArrowKeydown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('true');
        expect(itemLinkNode2.focus).toHaveBeenCalledTimes(1);
      });

      it('should wrap focus from last menu item to first menu item', function() {
        spyOn(itemLinkNode1, 'focus');
        triggerNode.setAttribute('aria-expanded', 'true');
        triggerNode.dispatchEvent(downArrowKeydown);
        triggerNode.dispatchEvent(downArrowKeydown);
        triggerNode.dispatchEvent(downArrowKeydown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('true');
        expect(itemLinkNode1.focus).toHaveBeenCalledTimes(2);
      });
    });

    describe('Esc key', function() {
      const escKeydown = new KeyboardEvent('keydown', { bubbles: true });
      Object.defineProperty(escKeydown, 'which', { value: 27, writable: true });

      it('should close menu with ESC key when menu is focused', function() {
        triggerNode.setAttribute('aria-expanded', 'true');
        triggerNode.dispatchEvent(escKeydown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
      });

      it('should close menu with ESC key when an item is focused', function() {
        triggerNode.setAttribute('aria-expanded', 'true');
        itemNode1.dispatchEvent(escKeydown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
      });

      it('should not open menu with ESC key', function() {
        triggerNode.dispatchEvent(escKeydown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
      });
    });

    describe('Space bar', function() {
      const spaceBarDown = new KeyboardEvent('keydown', { bubbles: true });
      Object.defineProperty(spaceBarDown, 'which', { value: 32, writable: true });

      it('should open menu with space bar', function() {
        triggerNode.dispatchEvent(spaceBarDown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('true');
      });

      it('should close menu with space key', function() {
        triggerNode.setAttribute('aria-expanded', 'true');
        triggerNode.dispatchEvent(spaceBarDown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
      });

      it('should not close menu with space key on an item', function() {
        itemNode1.dispatchEvent(spaceBarDown);
        expect(triggerNode.getAttribute('aria-expanded')).toBe('true');
      });
    });

    afterEach(function() {
      triggerNode.setAttribute('aria-expanded', 'false');
    });

    afterAll(function() {
      headerSubmenu.release();
      document.body.removeChild(element);
    });
  });
});
