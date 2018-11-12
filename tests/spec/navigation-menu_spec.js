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

      it('should close an open submenu', function() {
        const wrapper = element.querySelector('.bx--navigation__category');
        const button = element.querySelector('.bx--navigation__category-toggle');
        wrapper.classList.add('bx--navigation__category--expanded');
        button.setAttribute('aria-expanded', 'true');
        button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(wrapper.classList.contains('bx--navigation__category--expanded')).toBe(false);
        expect(button.getAttribute('aria-expanded')).toBe('false');
      });
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
