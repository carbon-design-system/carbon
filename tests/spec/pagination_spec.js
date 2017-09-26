import Pagination from '../../src/components/pagination/pagination';

describe('Test pagination', function() {
  describe('Constructor', function() {
    let pagination;

    it('Should throw if root element is not given', function() {
      expect(() => {
        pagination = new Pagination();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        pagination = new Pagination(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('Should set default options', function() {
      expect((pagination = new Pagination(document.createElement('div'))).options).to.deep.equal({
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
