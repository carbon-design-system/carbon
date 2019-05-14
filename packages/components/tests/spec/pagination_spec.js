import Pagination from '../../src/components/pagination/pagination';
import flattenOptions from '../utils/flatten-options';

describe('Test pagination', function() {
  describe('Constructor', function() {
    let pagination;

    it('Should throw if root element is not given', function() {
      expect(() => {
        pagination = new Pagination();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        pagination = new Pagination(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should set default options', function() {
      expect(
        flattenOptions(
          (pagination = new Pagination(document.createElement('div'))).options
        )
      ).toEqual({
        selectorInit: '[data-pagination]',
        selectorItemsPerPageInput: '[data-items-per-page]',
        selectorPageNumberInput: '[data-page-number-input]',
        selectorPageBackward: '[data-page-backward]',
        selectorPageForward: '[data-page-forward]',
        eventItemsPerPage: 'itemsPerPage',
        eventPageNumber: 'pageNumber',
        eventPageChange: 'pageChange',
      });
    });

    afterEach(function() {
      if (pagination) {
        pagination = pagination.release();
      }
    });
  });
});
