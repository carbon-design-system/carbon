import HeaderNav from '../../src/components/ui-shell/header-nav';

describe('HeaderNav', function () {
  let headerNav;
  let nav;
  let ul;
  let li1;
  let li2;
  let a1;
  let a2;

  beforeAll(function () {
    nav = document.createElement('nav');
    nav.className = 'bx--header__nav';
    ul = document.createElement('ul');
    li1 = document.createElement('li');
    li1.classList.add('bx--header__submenu');
    li2 = document.createElement('li');
    li2.classList.add('bx--header__submenu');
    a1 = document.createElement('a');
    a1.classList.add('bx--header__menu-item', 'bx--header__menu-title');
    li1.appendChild(a1);
    a2 = document.createElement('a');
    a2.classList.add('bx--header__menu-item', 'bx--header__menu-title');
    li2.appendChild(a2);
    ul.appendChild(li1);
    ul.appendChild(li2);
    nav.appendChild(ul);
    headerNav = new HeaderNav(nav);
    document.body.appendChild(nav);
  });

  beforeEach(function () {
    // TODO: investigate
    a1.setAttribute('tabindex', 0);
    a1.focus();
  });

  describe('Left/Right arrow keys', function () {
    const leftArrowKeydown = new KeyboardEvent('keydown', { bubbles: true });
    Object.defineProperty(leftArrowKeydown, 'which', {
      value: 37,
      writable: true,
    });
    const rightArrowKeydown = new KeyboardEvent('keydown', { bubbles: true });
    Object.defineProperty(rightArrowKeydown, 'which', {
      value: 39,
      writable: true,
    });

    describe('right arrow keydown', function () {
      it('should move to next submenu with right arrow key', function () {
        spyOn(a2, 'focus');
        a1.dispatchEvent(rightArrowKeydown);
        expect(a2.focus).toHaveBeenCalled();
      });

      it('should wrap to first submenu when navigating from end of list', function () {
        // TODO: investigate
        a2.setAttribute('tabindex', 0);
        a2.focus();
        spyOn(a1, 'focus');
        a2.dispatchEvent(rightArrowKeydown);
        expect(a1.focus).toHaveBeenCalled();
      });
    });

    describe('left arrow keydown', function () {
      it('should move to previous submenu with left arrow key', function () {
        // TODO: investigate
        a2.setAttribute('tabindex', 0);
        a2.focus();
        spyOn(a1, 'focus');
        a2.dispatchEvent(rightArrowKeydown);
        expect(a1.focus).toHaveBeenCalled();
      });

      it('should wrap to last submenu when navigating from start of list', function () {
        spyOn(a2, 'focus');
        a1.dispatchEvent(rightArrowKeydown);
        expect(a2.focus).toHaveBeenCalled();
      });
    });
  });

  afterAll(function () {
    headerNav.release();
    document.body.removeChild(nav);
  });
});
