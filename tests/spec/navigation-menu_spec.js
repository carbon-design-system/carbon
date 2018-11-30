import NavigationMenu from '../../src/components/ui-shell/navigation-menu';
import UiShellHtml from '../../html/ui-shell/ui-shell.html';

describe('Popup Nav', function() {
  describe('Constructor', function() {
    let navigationMenu;

    it('Should throw if root element is not given', function() {
      expect(() => {
        navigationMenu = new NavigationMenu();
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        navigationMenu = new NavigationMenu(document.createTextNode(''));
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    afterEach(function() {
      if (navigationMenu) {
        navigationMenu = navigationMenu.release();
      }
    });
  });

  describe('Init Component by Launch functionality', function() {
    let button;
    let navigationMenu;
    let context;

    beforeAll(function() {
      const range = document.createRange();
      button = range.createContextualFragment(UiShellHtml).querySelector('[data-navigation-menu-target]');
      navigationMenu = range.createContextualFragment(UiShellHtml).querySelector('[data-navigation-menu]');
      document.body.appendChild(button);
      document.body.appendChild(navigationMenu);
      context = NavigationMenu.init();
    });

    beforeEach(function() {
      button.classList.remove('bx--header__action--active');
      navigationMenu.setAttribute('hidden', '');
    });

    it('Should open the popup nav on button click', function() {
      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(button.classList.contains('bx--header__action--active')).toBe(true);
      expect(navigationMenu.hasAttribute('hidden')).toBe(false);
    });

    it('Should close an open popup nav on button click', function() {
      navigationMenu.removeAttribute('hidden');
      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(button.classList.contains('bx--header__action--active')).toBe(false);
      expect(navigationMenu.hasAttribute('hidden')).toBe(true);
    });

    afterAll(function() {
      document.body.removeChild(button);
      document.body.removeChild(navigationMenu);
      context.release();
    });
  });

  describe('Keydown handler', function() {
    let element;
    let navigationMenu;
    let button;
    let context;

    beforeAll(function() {
      const range = document.createRange();
      element = range.createContextualFragment(UiShellHtml).querySelector('[data-navigation-menu]');
      button = element.querySelector('.bx--navigation__category-toggle');
      [...element.querySelectorAll('.bx--navigation-link')].forEach(link => {
        link.textContent = 'link';
      });
      navigationMenu = new NavigationMenu(element);
      context = NavigationMenu.init();
      document.body.append(element);
    });

    it('should close navigation menu on Esc', function() {
      element.removeAttribute('hidden');
      const escKeydown = new KeyboardEvent('keydown', { bubbles: true });
      Object.defineProperty(escKeydown, 'which', { value: 27, writable: true });
      element.dispatchEvent(escKeydown);
      expect(!element.hasAttribute('hidden'));
    });

    describe('Up arrow navigation', function() {
      let navItems;
      let firstNavItem;
      let secondNavItem;
      let lastNavItem;
      let upArrowKeydown;
      beforeAll(function() {
        navItems = element.querySelectorAll(`
        .bx--navigation__category-toggle,
        .bx--navigation-item > .bx--navigation-link,
        .bx--navigation-link[tabindex="0"]
      `);
        [firstNavItem, secondNavItem] = navItems;
        lastNavItem = navItems[navItems.length - 1];
        upArrowKeydown = new KeyboardEvent('keydown', { bubbles: true });
        Object.defineProperty(upArrowKeydown, 'which', { value: 38, writable: true });
      });

      beforeEach(function() {
        element.removeAttribute('hidden');
      });

      it('should navigate backwards on up arrow', async function() {
        spyOn(firstNavItem, 'focus');
        secondNavItem.focus();
        secondNavItem.dispatchEvent(upArrowKeydown);
        expect(firstNavItem.focus).toHaveBeenCalled();
        expect(firstNavItem.focus).toHaveBeenCalledTimes(1);
      });

      it('should wrap navigation from first to last item', function() {
        spyOn(lastNavItem, 'focus');
        firstNavItem.focus();
        firstNavItem.dispatchEvent(upArrowKeydown);
        expect(lastNavItem.focus).toHaveBeenCalled();
        expect(lastNavItem.focus).toHaveBeenCalledTimes(1);
      });

      it('should navigate out of submenus', function() {
        spyOn(button, 'focus');
        button.setAttribute('aria-expanded', 'true');
        firstNavItem.focus();
        firstNavItem.dispatchEvent(upArrowKeydown);
        expect(button.focus).toHaveBeenCalled();
        expect(button.focus).toHaveBeenCalledTimes(1);
      });

      afterEach(function() {
        element.setAttribute('hidden', '');
      });
    });

    describe('Down arrow navigation', function() {
      let navItems;
      let firstNavItem;
      let secondNavItem;
      let lastNavItem;
      let downArrowKeydown;
      beforeAll(function() {
        navItems = element.querySelectorAll(`
        .bx--navigation__category-toggle,
        .bx--navigation-item > .bx--navigation-link,
        .bx--navigation-link[tabindex="0"]
      `);
        [firstNavItem, secondNavItem] = navItems;
        lastNavItem = navItems[navItems.length - 1];
        downArrowKeydown = new KeyboardEvent('keydown', { bubbles: true });
        Object.defineProperty(downArrowKeydown, 'which', { value: 40, writable: true });
      });

      beforeEach(function() {
        element.removeAttribute('hidden');
      });

      it('should navigate forwards on down arrow', async function() {
        spyOn(secondNavItem, 'focus');
        firstNavItem.focus();
        firstNavItem.dispatchEvent(downArrowKeydown);
        expect(secondNavItem.focus).toHaveBeenCalled();
        expect(secondNavItem.focus).toHaveBeenCalledTimes(1);
      });

      it('should wrap navigation from last to first item', function() {
        spyOn(firstNavItem, 'focus');
        lastNavItem.focus();
        lastNavItem.dispatchEvent(downArrowKeydown);
        expect(firstNavItem.focus).toHaveBeenCalled();
        expect(firstNavItem.focus).toHaveBeenCalledTimes(1);
      });

      it('should navigate into submenu', function() {
        const firstNestedMenuItem = lastNavItem.closest('.bx--navigation__category').querySelector('.bx--navigation-link');
        navigationMenu.changeNavSubmenuState({ matchesNavSubmenu: button, shouldBeCollapsed: false });
        spyOn(firstNestedMenuItem, 'focus');
        button.dispatchEvent(downArrowKeydown);
        expect(firstNestedMenuItem.focus).toHaveBeenCalled();
      });

      afterEach(function() {
        element.setAttribute('hidden', '');
      });
    });

    afterAll(function() {
      button.setAttribute('aria-expanded', 'false');
      navigationMenu.release();
      context.release();
    });
  });

  describe('Click handler', function() {
    let element;
    let navigationMenu;

    beforeAll(function() {
      const range = document.createRange();
      element = range.createContextualFragment(UiShellHtml).querySelector('[data-navigation-menu]');
      navigationMenu = new NavigationMenu(element);
    });

    describe('Submenu', function() {
      it('should open submenu', function() {
        const wrapper = element.querySelector('.bx--navigation__category');
        const button = element.querySelector('.bx--navigation__category-toggle');
        button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(wrapper.classList.contains('bx--navigation__category--expanded')).toBe(true);
        expect(button.getAttribute('aria-expanded')).toBe('true');
      });

      // it('should close an open submenu', function() {
      //   const wrapper = element.querySelector('.bx--navigation__category');
      //   const button = element.querySelector('.bx--navigation__category-toggle');
      //   wrapper.classList.add('bx--navigation__category--expanded');
      //   button.setAttribute('aria-expanded', 'true');
      //   button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      //   expect(wrapper.classList.contains('bx--navigation__category--expanded')).toBe(false);
      //   expect(button.getAttribute('aria-expanded')).toBe('false');
      // });
    });

    describe('Link', function() {
      it('should attach active link CSS classes on click', function() {
        const anchors = element.querySelectorAll('.bx--navigation-link');
        anchors[0].dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(anchors[0].classList.contains('bx--navigation-item--active')).toBe(true);
        [...anchors].slice(1).forEach(a => {
          expect(a.classList.contains('bx--navigation-item--active')).toBe(false);
        });
      });
    });

    afterAll(function() {
      navigationMenu.release();
    });
  });
});
