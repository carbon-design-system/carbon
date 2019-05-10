import SideNav from '../../src/components/ui-shell/side-nav';

describe('Side Nav', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => new SideNav()).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => new SideNav(document.createTextNode(''))).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });
  });

  describe('Click handler', function() {
    let element;
    let toggleNode;
    let navLinkNode1;
    let navLinkTriggerNode1;
    let navLinkNode2;
    let navLinkTriggerNode2;
    let navSubmenuNode;
    let navSubmenuTriggerNode;
    let sideNav;

    beforeAll(function() {
      element = document.createElement('aside');
      element.className = 'bx--side-nav';
      element.setAttribute('data-side-nav', 'true');
      toggleNode = document.createElement('button');
      toggleNode.className = 'bx--side-nav__submenu bx--side-nav__toggle';
      navLinkNode1 = document.createElement('li');
      navLinkNode1.className = 'bx--side-nav__item';
      navLinkNode2 = document.createElement('li');
      navLinkNode2.className = 'bx--side-nav__item';
      navLinkTriggerNode1 = document.createElement('a');
      navLinkTriggerNode1.className = 'bx--side-nav__link';
      navLinkTriggerNode2 = document.createElement('a');
      navLinkTriggerNode2.className = 'bx--side-nav__link';
      navSubmenuNode = document.createElement('li');
      navSubmenuNode.className = 'bx--side-nav__item';
      navSubmenuTriggerNode = document.createElement('button');
      navSubmenuTriggerNode.className = 'bx--side-nav__submenu';
      navSubmenuNode.appendChild(navSubmenuTriggerNode);
      navLinkNode1.appendChild(navLinkTriggerNode1);
      navLinkNode2.appendChild(navLinkTriggerNode2);
      element.appendChild(navLinkNode1);
      element.appendChild(navLinkNode2);
      element.appendChild(navSubmenuNode);
      element.appendChild(toggleNode);
      sideNav = new SideNav(element);
      document.body.appendChild(element);
    });

    describe('Click toggle', function() {
      it('should open the side nav on toggle click', function() {
        toggleNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(element.classList.contains('bx--side-nav--expanded')).toBe(true);
      });

      it('should close the open side nav on toggle click', function() {
        toggleNode.setAttribute('aria-expanded', 'true');
        toggleNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(element.classList.contains('bx--side-nav--expanded')).toBe(
          false
        );
      });
    });

    describe('Click side nav link', function() {
      it('should attach CSS classes on click', function() {
        navLinkTriggerNode1.dispatchEvent(
          new CustomEvent('click', { bubbles: true })
        );
        expect(
          navLinkTriggerNode1.classList.contains('bx--side-nav__link--current')
        ).toBe(true);
        expect(
          navLinkNode1.classList.contains('bx--side-nav__item--active')
        ).toBe(true);
      });
      it('should detach CSS classes from previously active links when nav link is active', function() {
        navLinkTriggerNode1.dispatchEvent(
          new CustomEvent('click', { bubbles: true })
        );
        navLinkTriggerNode2.dispatchEvent(
          new CustomEvent('click', { bubbles: true })
        );
        expect(
          navLinkTriggerNode1.classList.contains('bx--side-nav__link--current')
        ).toBe(false);
        expect(
          navLinkNode1.classList.contains('bx--side-nav__item--active')
        ).toBe(false);
        expect(
          navLinkTriggerNode2.classList.contains('bx--side-nav__link--current')
        ).toBe(true);
        expect(
          navLinkNode2.classList.contains('bx--side-nav__item--active')
        ).toBe(true);
      });
    });

    describe('Click nav submenu', function() {
      it('should open the submenu on click', function() {
        navSubmenuTriggerNode.dispatchEvent(
          new CustomEvent('click', { bubbles: true })
        );
        expect(navSubmenuTriggerNode.getAttribute('aria-expanded')).toBe(
          'true'
        );
      });

      it('should close the open submenu on click', function() {
        navSubmenuTriggerNode.setAttribute('aria-expanded', 'true');
        navSubmenuTriggerNode.dispatchEvent(
          new CustomEvent('click', { bubbles: true })
        );
        expect(navSubmenuTriggerNode.getAttribute('aria-expanded')).toBe(
          'false'
        );
      });
    });

    afterEach(function() {
      toggleNode.setAttribute('aria-expanded', 'false');
      navSubmenuTriggerNode.setAttribute('aria-expanded', 'false');
    });

    afterAll(function() {
      sideNav.release();
      document.body.removeChild(element);
    });
  });
});
