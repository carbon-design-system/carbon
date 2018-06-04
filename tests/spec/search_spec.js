import Search from '../../src/components/search/search';
import searchHTML from '../../src/components/search/search-large.html';
import flattenOptions from '../utils/flatten-options';

describe('Test Search', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new Search();
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new Search(document.createTextNode(''));
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
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

  describe('Toggling between views', function() {
    let gridIcon;
    let listIcon;
    let toggle;
    let instance;
    const container = document.createElement('div');
    container.innerHTML = searchHTML;

    beforeAll(function() {
      document.body.appendChild(container);
      instance = new Search(document.querySelector('[data-search]'));
      toggle = container.querySelector('.bx--search-button[data-search-toggle]');
      gridIcon = container.querySelector('div[data-search-view="grid"]');
      listIcon = container.querySelector('div[data-search-view="list"]');
    });

    it('Should show grid view by default', function() {
      expect(gridIcon.classList.contains('bx--search-view--hidden')).toBe(false);
    });

    it('Should show list view after click', function() {
      toggle.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(gridIcon.classList.contains('bx--search-view--hidden')).toBe(true);
      expect(listIcon.classList.contains('bx--search-view--hidden')).toBe(false);
    });

    it('Should show grid view after second click', function() {
      toggle.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(gridIcon.classList.contains('bx--search-view--hidden')).toBe(false);
      expect(listIcon.classList.contains('bx--search-view--hidden')).toBe(true);
    });

    afterAll(function() {
      instance.release();
      document.body.removeChild(container);
    });
  });

  describe('Clearing the search bar', function() {
    let input;
    let clearIcon;
    let instance;
    const container = document.createElement('div');
    container.innerHTML = searchHTML;

    beforeAll(function() {
      document.body.appendChild(container);
      instance = new Search(document.querySelector('[data-search]'));
      input = container.querySelector('.bx--search-input');
      clearIcon = container.querySelector('.bx--search-close');
    });

    it('Clear icon should be hidden by default', function() {
      // IE11 doesn't have `.classList` for `<svg>`
      expect(
        clearIcon
          .getAttribute('class')
          .trim()
          .split(/\s+/)
          .indexOf('bx--search-close--hidden') >= 0
      ).toBe(true);
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
