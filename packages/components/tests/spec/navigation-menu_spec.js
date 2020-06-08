import NavigationMenu from '../../src/components/ui-shell/navigation-menu';
import UiShellHtml from '../../html/ui-shell/ui-shell.html';

describe('Popup Nav', function () {
  describe('Constructor', function () {
    let navigationMenu;

    it('Should throw if root element is not given', function () {
      expect(() => {
        navigationMenu = new NavigationMenu();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        navigationMenu = new NavigationMenu(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    afterEach(function () {
      if (navigationMenu) {
        navigationMenu = navigationMenu.release();
      }
    });
  });

  describe('Init Component by Launch functionality', function () {
    let range;
    let button;
    let navigationMenu;
    let context;

    beforeAll(function () {
      range = document.createRange();
      button = range
        .createContextualFragment(UiShellHtml)
        .querySelector('[data-navigation-menu-target]');
      navigationMenu = range
        .createContextualFragment(UiShellHtml)
        .querySelector('[data-navigation-menu]');
      document.body.appendChild(button);
      document.body.appendChild(navigationMenu);
      context = NavigationMenu.init();
    });

    beforeEach(function () {
      button.classList.remove('bx--header__action--active');
      navigationMenu.setAttribute('hidden', '');
    });

    it('Should open the popup nav on button click', function () {
      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(button.classList.contains('bx--header__action--active')).toBe(
        true
      );
      expect(navigationMenu.hasAttribute('hidden')).toBe(false);
    });

    it('Should close an open popup nav on button click', function () {
      navigationMenu.removeAttribute('hidden');
      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(button.classList.contains('bx--header__action--active')).toBe(
        false
      );
      expect(navigationMenu.hasAttribute('hidden')).toBe(true);
    });

    afterAll(function () {
      document.body.removeChild(button);
      document.body.removeChild(navigationMenu);
      context.release();
    });
  });

  describe('Keydown handler', function () {
    let range;
    let navigationMenuNode;
    let navigationMenuClass;
    let button;
    let context;
    let escKeydown;

    beforeAll(function () {
      range = document.createRange();
      navigationMenuNode = range
        .createContextualFragment(UiShellHtml)
        .querySelector('[data-navigation-menu]');
      button = navigationMenuNode.querySelector(
        '.bx--navigation__category-toggle'
      );
      [...navigationMenuNode.querySelectorAll('.bx--navigation-link')].forEach(
        (link) => {
          link.textContent = 'link';
        }
      );
      escKeydown = new KeyboardEvent('keydown', { bubbles: true });
      Object.defineProperty(escKeydown, 'which', { value: 27, writable: true });
      navigationMenuClass = new NavigationMenu(navigationMenuNode);
      context = NavigationMenu.init();
      document.body.append(navigationMenuNode);
    });

    it('should close navigation menu on Esc', function () {
      navigationMenuNode.removeAttribute('hidden');
      navigationMenuNode.dispatchEvent(escKeydown);
      expect(navigationMenuNode.hasAttribute('hidden'));
    });

    describe('Up arrow navigation', function () {
      let navItems;
      let firstNavItem;
      let secondNavItem;
      let lastNavItem;
      let upArrowKeydown;
      beforeAll(function () {
        navItems = navigationMenuNode.querySelectorAll(`
        .bx--navigation__category-toggle,
        .bx--navigation-item > .bx--navigation-link,
        .bx--navigation-link[tabindex="0"]
      `);
        [firstNavItem, secondNavItem] = navItems;
        lastNavItem = navItems[navItems.length - 1];
        upArrowKeydown = new KeyboardEvent('keydown', { bubbles: true });
        Object.defineProperty(upArrowKeydown, 'which', {
          value: 38,
          writable: true,
        });
      });

      beforeEach(function () {
        navigationMenuNode.removeAttribute('hidden');
      });

      it('should navigate backwards on up arrow', async function () {
        spyOn(firstNavItem, 'focus');
        secondNavItem.focus();
        secondNavItem.dispatchEvent(upArrowKeydown);
        expect(firstNavItem.focus).toHaveBeenCalled();
        expect(firstNavItem.focus).toHaveBeenCalledTimes(1);
      });

      it('should wrap navigation from first to last item', function () {
        spyOn(lastNavItem, 'focus');
        firstNavItem.focus();
        firstNavItem.dispatchEvent(upArrowKeydown);
        expect(lastNavItem.focus).toHaveBeenCalled();
        expect(lastNavItem.focus).toHaveBeenCalledTimes(1);
      });

      it('should navigate out of submenus', function () {
        spyOn(button, 'focus');
        button.setAttribute('aria-expanded', 'true');
        firstNavItem.focus();
        firstNavItem.dispatchEvent(upArrowKeydown);
        expect(button.focus).toHaveBeenCalled();
        expect(button.focus).toHaveBeenCalledTimes(1);
      });

      afterEach(function () {
        navigationMenuNode.setAttribute('hidden', '');
      });
    });

    describe('Down arrow navigation', function () {
      let navItems;
      let firstNavItem;
      let secondNavItem;
      let lastNavItem;
      let downArrowKeydown;
      let firstNestedMenuItem;

      beforeAll(function () {
        navItems = navigationMenuNode.querySelectorAll(`
        .bx--navigation__category-toggle,
        .bx--navigation-item > .bx--navigation-link,
        .bx--navigation-link[tabindex="0"]
      `);
        [firstNavItem, secondNavItem] = navItems;
        lastNavItem = navItems[navItems.length - 1];
        firstNestedMenuItem = lastNavItem
          .closest('.bx--navigation__category')
          .querySelector('.bx--navigation-link');
        downArrowKeydown = new KeyboardEvent('keydown', { bubbles: true });
        Object.defineProperty(downArrowKeydown, 'which', {
          value: 40,
          writable: true,
        });
      });

      beforeEach(function () {
        navigationMenuNode.removeAttribute('hidden');
      });

      it('should navigate forwards on down arrow', async function () {
        spyOn(secondNavItem, 'focus');
        firstNavItem.focus();
        firstNavItem.dispatchEvent(downArrowKeydown);
        expect(secondNavItem.focus).toHaveBeenCalled();
        expect(secondNavItem.focus).toHaveBeenCalledTimes(1);
      });

      it('should wrap navigation from last to first item', function () {
        spyOn(firstNavItem, 'focus');
        lastNavItem.focus();
        lastNavItem.dispatchEvent(downArrowKeydown);
        expect(firstNavItem.focus).toHaveBeenCalled();
        expect(firstNavItem.focus).toHaveBeenCalledTimes(1);
      });

      // eslint-disable-next-line no-undef
      xit('should navigate into submenu', function () {
        // TODO: We may have removed "down arrow to open" feature, go ahead and remove this test if so
        navigationMenuClass.changeNavSubmenuState({
          matchesNavSubmenu: button,
          shouldBeCollapsed: false,
        });
        spyOn(firstNestedMenuItem, 'focus');
        button.dispatchEvent(downArrowKeydown);
        expect(firstNestedMenuItem.focus).toHaveBeenCalled();
      });

      afterEach(function () {
        navigationMenuNode.setAttribute('hidden', '');
      });
    });

    afterAll(function () {
      button.setAttribute('aria-expanded', 'false');
      navigationMenuClass.release();
      if (context) {
        context.release();
        context = null;
      }
    });
  });

  describe('Click handler', function () {
    let range;
    let element;
    let navigationMenu;
    let wrapper;
    let li;
    let button;
    let anchors;

    beforeAll(function () {
      range = document.createRange();
      element = range
        .createContextualFragment(UiShellHtml)
        .querySelector('[data-navigation-menu]');
      navigationMenu = new NavigationMenu(element);
      wrapper = element.querySelector('.bx--navigation__category');
      li = element.querySelector('.bx--navigation-item');
      button = element.querySelector('.bx--navigation__category-toggle');
      anchors = element.querySelectorAll('.bx--navigation-link');
    });

    describe('Submenu', function () {
      it('should open submenu', function () {
        button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(
          wrapper.classList.contains('bx--navigation__category--expanded')
        ).toBe(true);
        expect(button.getAttribute('aria-expanded')).toBe('true');
      });

      it('should close an open submenu', function () {
        wrapper.classList.add('bx--navigation__category--expanded');
        button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(
          wrapper.classList.contains('bx--navigation__category--expanded')
        ).toBe(false);
      });
    });

    describe('Link', function () {
      it('should attach active link CSS classes on click', function () {
        anchors[0].dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(li.classList.contains('bx--navigation-item--active')).toBe(true);
      });
    });

    afterAll(function () {
      navigationMenu.release();
    });
  });
});
