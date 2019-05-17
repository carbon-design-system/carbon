import Search from '../../src/components/search/search';
import searchHTML from '../../html/search/search--extra-large.html';
import flattenOptions from '../utils/flatten-options';

describe('Test Search', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new Search();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new Search(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should set default options', function() {
      const container = document.createElement('div');
      container.innerHTML = searchHTML;
      const search = new Search(container);
      try {
        expect(flattenOptions(search.options)).toEqual({
          selectorInit: '[data-search]',
          selectorSearchView: '[data-search-view]',
          selectorSearchInput: '.bx--search-input',
          selectorClearIcon: '.bx--search-close',
          selectorIconContainer: '.bx--search-button[data-search-toggle]',
          classClearHidden: 'bx--search-close--hidden',
          classLayoutHidden: 'bx--search-view--hidden',
        });
      } finally {
        search.release();
      }
    });
  });

  describe('Clearing the search bar', function() {
    let input;
    let clearIcon;
    let clearIconInitialState;
    let instance;
    const container = document.createElement('div');
    container.innerHTML = searchHTML;

    beforeAll(function() {
      document.body.appendChild(container);
      instance = new Search(document.querySelector('[data-search]'));
      input = container.querySelector('.bx--search-input');
      clearIcon = container.querySelector('.bx--search-close');
      // IE11 doesn't have `.classList` for `<svg>`
      clearIconInitialState =
        clearIcon
          .getAttribute('class')
          .trim()
          .split(/\s+/)
          .indexOf('bx--search-close--hidden') >= 0;
    });

    it('Clear icon should be hidden by default', function() {
      expect(clearIconInitialState).toBe(true);
    });

    it('Clear icon should be shown when input has value', function() {
      input.value = 'testing';
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      // IE11 doesn't have `.classList` for `<svg>`
      expect(
        clearIcon
          .getAttribute('class')
          .trim()
          .split(/\s+/)
          .indexOf('bx--search-close--hidden') < 0
      ).toBe(true);
    });

    it('Should clear the input when clicked', function() {
      clearIcon.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(input.value).toBe('');
    });

    afterAll(function() {
      instance.release();
      document.body.removeChild(container);
    });
  });
});
