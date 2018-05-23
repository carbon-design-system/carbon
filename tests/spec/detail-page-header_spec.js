import DetailPageHeader from '../../src/components/detail-page-header/detail-page-header';
import flattenOptions from '../utils/flatten-options';

describe('Test detail page header', function() {
  describe('Constructor', function() {
    let detailPageHeader;

    it('Should throw if root element is not given', function() {
      expect(() => {
        detailPageHeader = new DetailPageHeader();
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        detailPageHeader = new DetailPageHeader(document.createTextNode(''));
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    it('Should set default options', function() {
      expect(flattenOptions((detailPageHeader = new DetailPageHeader(document.createElement('div'))).options)).toEqual({
        selectorInit: '[data-detail-page-header]',
        scroll: 'bx--detail-page-header--scroll',
      });
    });

    afterEach(function() {
      if (detailPageHeader) {
        detailPageHeader = detailPageHeader.release();
      }
    });
  });
});
