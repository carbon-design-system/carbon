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
        selectorRow: '.bx--structured-list-row',
      });
    });

    after(function () {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('_handleKeyDown()', function () {
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

    it('should be called on "enter" keydown event', function () {
      const spy = sinon.spy(instance, '_handleKeyDown');
      instance.element.dispatchEvent(
        Object.assign(
          new CustomEvent('keydown', {
            bubbles: true,
          }),
          { which: 13 },
        ),
      );
      expect(spy).to.have.been.called;
      spy.restore();
    });

    it('should be called on "space" keydown event', function () {
      const spy = sinon.spy(instance, '_handleKeyDown');
      instance.element.dispatchEvent(
        Object.assign(
          new CustomEvent('keydown', {
            bubbles: true,
          }),
          { which: 32 },
        ),
      );
      expect(spy).to.have.been.called;
      spy.restore();
    });

    it('on "space" keydown event, it should preventDefault event', function () {
      const event = Object.assign(
        new CustomEvent('keydown', {
          bubbles: true,
        }),
        { which: 32 },
        { preventDefault: sinon.spy() },
      );
      instance.element.dispatchEvent(event);
      expect(event.preventDefault).to.have.been.called;
    });

    after(function () {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });
});
