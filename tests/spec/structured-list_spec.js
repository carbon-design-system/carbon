import 'core-js/modules/es6.weak-map'; // For PhantomJS
import StructuredList from '../../src/components/structured-list/structured-list';
import HTML from '../../src/components/structured-list/structured-list--selection.html';

describe('StructuredList', function () {
  describe('Constructor', function () {
    let instance;
    let element;
    let wrapper;

    before(function () {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-structured-list]');
      instance = new StructuredList(element);
    });

    it('should throw if root element is not given', function () {
      expect(() => {
        new StructuredList();
      }).to.throw(Error);
    });

    it('should throw if root element is not a DOM element', function () {
      expect(() => {
        new StructuredList(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('should set default options', function () {
      expect(instance.options).to.deep.equal({
        selectorInit: '[data-structured-list]',
        selectorRow: '.bx--structured-list-tbody .bx--structured-list-row',
      });
    });

    it('should set static NAVIGATE property', function () {
      expect(instance.constructor.NAVIGATE).to.deep.equal({
        BACKWARD: -1,
        FORWARD: 1,
      });
    });

    after(function () {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('_selectKeydown(evt)', function () {
    let instance;
    let element;
    let wrapper;
    let spy;

    beforeEach(function () {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-structured-list]');
      instance = new StructuredList(element);
    });

    it('should be called on "enter" keydown event', function () {
      spy = sinon.spy(instance, '_selectKeydown');
      instance.element.dispatchEvent(
        Object.assign(
          new CustomEvent('keydown', {
            bubbles: true,
          }),
          { which: 13 },
        ),
      );
      expect(spy).to.have.been.called;
    });

    it('should be called on "space" keydown event', function () {
      spy = sinon.spy(instance, '_selectKeydown');
      instance.element.dispatchEvent(
        Object.assign(
          new CustomEvent('keydown', {
            bubbles: true,
          }),
          { which: 32 },
        ),
      );
      expect(spy).to.have.been.called;
    });

    afterEach(function () {
      spy.restore();
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('_arrowKeydown(evt)', function () {
    let instance;
    let element;
    let wrapper;
    let spy;

    beforeEach(function () {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-structured-list]');
      instance = new StructuredList(element);
    });

    it('should be called on "up" keydown event', function () {
      spy = sinon.spy(instance, '_arrowKeydown');
      instance.element.dispatchEvent(
        Object.assign(
          new CustomEvent('keydown', {
            bubbles: true,
          }),
          { which: 38 },
        ),
      );
      expect(spy).to.have.been.called;
    });

    it('should be called on "down" keydown event', function () {
      spy = sinon.spy(instance, '_arrowKeydown');
      instance.element.dispatchEvent(
        Object.assign(
          new CustomEvent('keydown', {
            bubbles: true,
          }),
          { which: 40 },
        ),
      );
      expect(spy).to.have.been.called;
    });

    afterEach(function () {
      spy.restore();
      instance.release();
      document.body.removeChild(wrapper);
    });
  });
});
