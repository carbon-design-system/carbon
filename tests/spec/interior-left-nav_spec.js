import 'core-js/modules/es6.weak-map'; // For PhantomJS
import InteriorLeftNav
  from '../../src/components/interior-left-nav/interior-left-nav';
import InteriorLeftNavHtml
  from '../../src/components/interior-left-nav/interior-left-nav.html';

describe('Test interior left nav', function () {
  describe('Constructor', function () {
    it('Should throw if root element is not given', function () {
      expect(() => {
        new InteriorLeftNav();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        new InteriorLeftNav(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('hookListItemsEvents', function () {
    let container;
    let element;
    let instance;

    beforeEach(function () {
      container = document.createElement('div');
      container.innerHTML = InteriorLeftNavHtml;
      document.body.appendChild(container);
      element = document.querySelector('[data-interior-left-nav]');
      instance = new InteriorLeftNav(element);
    });

    it('should be called', function () {
      const spy = sinon.spy(instance, 'hookListItemsEvents');
      instance.hookListItemsEvents();
      expect(spy).to.have.been.called;
      spy.restore();
    });

    afterEach(function () {
      instance.release();
      document.body.removeChild(container);
    });
  });

  describe('addActiveListItem', function () {
    let container;
    let element;
    let instance;

    beforeEach(function () {
      container = document.createElement('div');
      container.innerHTML = InteriorLeftNavHtml;
      document.body.appendChild(container);
      element = document.querySelector('[data-interior-left-nav]');
      instance = new InteriorLeftNav(element);
    });

    it('should be called', function () {
      const item = document.querySelector(
        instance.options.selectorLeftNavListItem,
      );
      const spy = sinon.spy(instance, 'addActiveListItem');
      instance.addActiveListItem(item);
      expect(spy).to.have.been.called;
      spy.restore();
    });

    afterEach(function () {
      instance.release();
      document.body.removeChild(container);
    });
  });
});
