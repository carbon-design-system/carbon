import PaginationNav from '../../src/components/pagination-nav/pagination-nav';
import HTML from '../../html/pagination-nav/pagination-nav.html';
import flattenOptions from '../utils/flatten-options';

describe('Pagination Nav', () => {
  describe('Constructor', () => {
    let element;
    let instance;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    beforeEach(() => {
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-pagination-nav]');
      instance = new PaginationNav(element);
    });

    it('Should throw if root element is not given', () => {
      expect(() => {
        new PaginationNav();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', () => {
      expect(() => {
        new PaginationNav(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('should set default options', () => {
      expect(flattenOptions(instance.options)).toEqual({
        selectorInit: '[data-pagination-nav]',
        selectorPageElement: '[data-page]',
        selectorPageButton: '[data-page-button]',
        selectorPagePrevious: '[data-page-previous]',
        selectorPageNext: '[data-page-next]',
        selectorPageSelect: '[data-page-select]',
        selectorPageActive: '[data-page-active="true"]',
        attribPage: 'data-page',
        attribActive: 'data-page-active',
        classActive: 'bx--pagination-nav__page--active',
        classDisabled: 'bx--pagination-nav__page--disabled',
      });
    });

    afterEach(() => {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('handleClick', () => {
    let element;
    let instance;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    beforeEach(() => {
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-pagination-nav]');
      instance = new PaginationNav(element);
    });

    it('should be called on click', () => {
      spyOn(instance, 'handleClick');
      const event = new CustomEvent('click', { bubbles: true });
      const pageButton = element.querySelector(
        instance.options.selectorPageElement
      );
      pageButton.dispatchEvent(event);
      expect(instance.handleClick).toHaveBeenCalled();
    });

    it('should be called on page direction click', () => {
      spyOn(instance, 'clearActivePage');
      const event = new CustomEvent('click', { bubbles: true });
      const pagePreviousButton = element.querySelector(
        instance.options.selectorPagePrevious
      );
      const pageNextButton = element.querySelector(
        instance.options.selectorPageNext
      );
      if (
        pagePreviousButton &&
        !pagePreviousButton.getAttribute('aria-disabled')
      ) {
        pagePreviousButton.dispatchEvent(event);
        expect(instance.clearActivePage).toHaveBeenCalled();
      }
      if (pageNextButton) {
        pageNextButton.dispatchEvent(event);
        expect(instance.clearActivePage).toHaveBeenCalled();
      }
    });

    it('should be called on page select menu', () => {
      spyOn(instance, 'handleSelectChange');
      const event = new CustomEvent('change', { bubbles: true });
      const pageSelectMenu = element.querySelector(
        instance.options.selectorPageSelect
      );
      if (pageSelectMenu) {
        pageSelectMenu.dispatchEvent(event);
        expect(instance.handleSelectChange).toHaveBeenCalled();
        expect(instance.setPrevNextStates).toHaveBeenCalled();
        expect(
          pageSelectMenu.classList.contains(instance.options.classActive)
        ).toBe(true);
      }
    });

    afterEach(() => {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('page change', () => {
    let element;
    let instance;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    beforeEach(() => {
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-pagination-nav]');
      instance = new PaginationNav(element);
    });

    it('page should get active class and be disabled when clicked', () => {
      const pageButtonArray = element.querySelectorAll(
        instance.options.selectorPageElement
      );
      pageButtonArray.forEach(el => {
        el.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(el.classList.contains(instance.options.classActive)).toBe(true);
        expect(el.classList.contains(instance.options.classDisabled)).toBe(
          true
        );
      });
    });

    afterEach(() => {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });
});
