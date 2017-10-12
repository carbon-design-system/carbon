import DetailPageHeader from '../../src/components/detail-page-header/detail-page-header';

describe('Test detail page header', function() {
  describe('Constructor', function() {
    let detailPageHeader;

    it('Should throw if root element is not given', function() {
      expect(() => {
        detailPageHeader = new DetailPageHeader();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        detailPageHeader = new DetailPageHeader(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('Should set default options', function() {
      expect((detailPageHeader = new DetailPageHeader(document.createElement('div'))).options).to.deep.equal({
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
