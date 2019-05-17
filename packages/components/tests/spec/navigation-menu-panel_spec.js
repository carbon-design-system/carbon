import NavigationMenuPanel from '../../src/components/ui-shell/navigation-menu-panel';
import UiShellHtml from '../../html/ui-shell/ui-shell.html';

describe('Popup Nav', function() {
  describe('Constructor', function() {
    let navigationMenuPanel;

    it('Should throw if root element is not given', function() {
      expect(() => {
        navigationMenuPanel = new NavigationMenuPanel();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        navigationMenuPanel = new NavigationMenuPanel(
          document.createTextNode('')
        );
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    afterEach(function() {
      if (navigationMenuPanel) {
        navigationMenuPanel = navigationMenuPanel.release();
      }
    });
  });

  describe('Init Component by Launch functionality', function() {
    let button;
    let navigationMenu;
    let context;
    let options;

    beforeAll(function() {
      const range = document.createRange();
      button = range
        .createContextualFragment(UiShellHtml)
        .querySelector('[data-navigation-menu-target]');
      navigationMenu = range
        .createContextualFragment(UiShellHtml)
        .querySelector('[data-navigation-menu]');
      document.body.appendChild(button);
      document.body.appendChild(navigationMenu);
      options = Object.assign(Object.create(NavigationMenuPanel.options), {
        selectorInit: '[data-navigation-menu]',
        attribInitTarget: 'data-navigation-menu-target',
        selectorShellNavSubmenu: '.bx--navigation__category-toggle',
        selectorShellNavLink: '.bx--navigation-link',
        selectorShellNavLinkCurrent:
          '.bx--navigation-item--active,.bx--navigation__category-item--active',
        selectorShellNavItem: '.bx--navigation-item',
        selectorShellNavCategory: '.bx--navigation__category',
        classShellNavItemActive: 'bx--navigation-item--active',
        classShellNavLinkCurrent: 'bx--navigation__category-item--active',
        classShellNavCategoryExpanded: 'bx--navigation__category--expanded',
      });
      context = NavigationMenuPanel.init(undefined, options);
    });

    beforeEach(function() {
      button.classList.remove('bx--header__action--active');
      navigationMenu.setAttribute('hidden', '');
    });

    it('Should open the popup nav on button click', function() {
      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(button.classList.contains('bx--header__action--active')).toBe(
        true
      );
      expect(navigationMenu.hasAttribute('hidden')).toBe(false);
    });

    it('Should close an open popup nav on button click', function() {
      navigationMenu.removeAttribute('hidden');
      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(button.classList.contains('bx--header__action--active')).toBe(
        false
      );
      expect(navigationMenu.hasAttribute('hidden')).toBe(true);
    });

    afterAll(function() {
      document.body.removeChild(button);
      document.body.removeChild(navigationMenu);
      context.release();
    });
  });
});
