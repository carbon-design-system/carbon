import '../utils/es6-weak-map-global'; // For PhantomJS
import '../../demo/polyfills/custom-event';
import SearchWithOptions from '../../src/components/search/search-with-options';
import searchWithOptionsHtml from '../../src/components/search/search-with-options.html';

describe('Test search with options', function () {
  describe('Constructor', function () {
    let searchWithOptions;

    it('Should throw if root element is not given', function () {
      expect(() => {
        searchWithOptions = new SearchWithOptions();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        searchWithOptions = new SearchWithOptions(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('Should set default options', function () {
      const container = document.createElement('div');
      container.innerHTML = searchWithOptionsHtml;
      expect(new SearchWithOptions(container.querySelector('[data-search-with-options]')).options).to.deep.equal({
        selectorInit: '[data-search-with-options]',
        selectorToggleLayoutBtn: '[data-search-toggle-btn]',
        selectorIconContainer: '[data-search-toggle-layout]',
        classHiddenContainer: 'bx--search__toggle-layout__container--hidden',
      });
    });

    afterEach(function () {
      if (searchWithOptions) {
        searchWithOptions = searchWithOptions.release();
      }
    });
  });
});
