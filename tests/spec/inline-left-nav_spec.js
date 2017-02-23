import '../utils/es6-weak-map-global'; // For PhantomJS
import InlineLeftNav from '../../src/components/inline-left-nav/inline-left-nav';
import inlineLeftNavHtml from '../../src/components/inline-left-nav/inline-left-nav.html';

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
        classActiveLeftNavListItem: 'left-nav-list__item--active',
        classExpandedLeftNavListItem: 'left-nav-list__item--expanded',
      });
    });

    afterEach(function () {
      if (inlineLeftNav) {
        inlineLeftNav = inlineLeftNav.release();
      }
    });
  });
});
