import HeaderNav from '../../src/components/ui-shell/header-nav';
import HeaderSubMenu from '../../src/components/ui-shell/header-submenu';
import UiShellHtml from '../../html/ui-shell/ui-shell.html';

describe('HeaderNav', function() {
  let headerNavNode;
  let headerNavClass;
  let a1;
  let a2;
  let a3;
  let a4;
  let li3;
  let li4;
  // let nestedLi3Anchor;
  let nestedLi4Anchor;
  let li3HeaderSubmenuClass;
  // let li4HeaderSubmenuClass;

  beforeAll(function() {
    const range = document.createRange();
    headerNavNode = range.createContextualFragment(UiShellHtml).querySelector('[data-header-nav]');
    [a1, a2, a3, a4] = headerNavNode.querySelectorAll('.bx--header__menu-bar > li > .bx--header__menu-item');
    [li3, li4] = headerNavNode.querySelectorAll('.bx--header__submenu');
    // nestedLi3Anchor = li3.querySelector('.bx--header__menu  .bx--header__menu-item');
    nestedLi4Anchor = li4.querySelector('.bx--header__menu  .bx--header__menu-item');
    li3HeaderSubmenuClass = HeaderSubMenu.create(li3);
    // li4HeaderSubmenuClass = HeaderSubMenu.create(li4);
    headerNavClass = new HeaderNav(headerNavNode);
    document.body.appendChild(headerNavNode);
  });

  beforeEach(function() {
    a1.focus();
  });

  describe('Left/Right arrow keys', function() {
    const leftArrowKeydown = new KeyboardEvent('keydown', { bubbles: true });
    Object.defineProperty(leftArrowKeydown, 'which', { value: 37, writable: true });
    const rightArrowKeydown = new KeyboardEvent('keydown', { bubbles: true });
    Object.defineProperty(rightArrowKeydown, 'which', { value: 39, writable: true });

    describe('right arrow keydown', function() {
      it('should move to next submenu with right arrow key', function() {
        spyOn(a2, 'focus');
        a1.dispatchEvent(rightArrowKeydown);
        expect(a2.focus).toHaveBeenCalled();
      });

      it('should wrap to first submenu when navigating from end of list', function() {
        a4.focus();
        spyOn(a1, 'focus');
        a4.dispatchEvent(rightArrowKeydown);
        expect(a1.focus).toHaveBeenCalled();
      });

      it('should maintain submenu expanded state', function() {
        li3HeaderSubmenuClass.setState({ shouldBeExpanded: true, shouldFocusOnOpen: true });
        a3.focus();
        spyOn(nestedLi4Anchor, 'focus');
        a3.dispatchEvent(rightArrowKeydown);
        expect(nestedLi4Anchor.focus).toHaveBeenCalled();
      });
    });
  });

  afterAll(function() {
    headerNavClass.release();
    document.body.removeChild(headerNavNode);
  });
});
