import '../utils/es6-weak-map-global'; // For PhantomJS
import '../../consumables/js/polyfills/custom-event';
import InlineLeftNav from '../../consumables/js/es2015/inline-left-nav';
import inlineLeftNavHtml from '../../consumables/html/components/inline-left-nav/inline-left-nav.html';

describe('Test inline left nav', function () {
  describe('Constructor', function () {
    let inlineLeftNav;

    it('Should throw if root element is not given', function () {
      expect(() => {
        inlineLeftNav = new InlineLeftNav();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        inlineLeftNav = new InlineLeftNav(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('Should set default options', function () {
      const container = document.createElement('div');
      container.innerHTML = inlineLeftNavHtml;
      expect((inlineLeftNav = new InlineLeftNav(container.querySelector('[data-inline-left-nav]'))).options).to.deep.equal({
        selectorInit: '[data-inline-left-nav]',
        selectorLeftNavList: '[data-inline-left-nav-list]',
        selectorLeftNavNestedList: '[data-inline-left-nav-nested-list]',
        selectorLeftNavListItem: '[data-inline-left-nav-item]',
        selectorLeftNavListItemLink: '[data-inline-left-nav-item-link]',
        selectorLeftNavNestedListItem: '[data-inline-left-nav-nested-item]',
        selectorLeftNavListItemHasChildren: '[data-inline-left-nav-with-children]',
        selectorLeftNavCollapse: '[data-inline-left-nav-collapse]',
        classActiveLeftNavListItem: 'left-nav-list__item--active',
        classExpandedLeftNavListItem: 'left-nav-list__item--expanded',
        classLeftNavCollapsing: 'bx--inline-left-nav--collapsing',
        classLeftNavCollapsed: 'bx--inline-left-nav--collapsed',
        classLeftNavExpanding: 'bx--inline-left-nav--expanding',
        eventBeforeLeftNavToggled: 'left-nav-beingtoggled',
        eventAfterLeftNavToggled: 'left-nav-toggled',
        keepOpen: false,
      });
    });

    afterEach(function () {
      if (inlineLeftNav) {
        inlineLeftNav = inlineLeftNav.release();
      }
    });
  });
});
