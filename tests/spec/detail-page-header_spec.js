import '../utils/es6-weak-map-global'; // For PhantomJS
import '../../demo/polyfills/custom-event';
import DetailPageHeader from '../../src/components/detail-page-header/detail-page-header';

describe('Test detail page header', function () {
  describe('Constructor', function () {
    let detailPageHeader;

    it(`Should throw if root element is not given`, function () {
      expect(() => {
        detailPageHeader = new DetailPageHeader();
      }).to.throw(Error);
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        detailPageHeader = new DetailPageHeader(document.createTextNode(''));
      }).to.throw(Error);
    });

    it(`Should set default options`, function () {
      expect((detailPageHeader = new DetailPageHeader(document.createElement('div'))).options).to.deep.equal({
        slideUp: 'bx--detail-page-header--with-tabs--animated-slide-up',
        selectorInit: '[data-detail-page-header]',
      });
    });

    afterEach(function () {
      if (detailPageHeader) {
        detailPageHeader = detailPageHeader.release();
      }
    });
  });
});
