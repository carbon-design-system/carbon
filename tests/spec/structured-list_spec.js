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
        selectorRow: '[data-structured-list] .bx--structured-list-tbody > label.bx--structured-list-row',
      });
    });

    it('this.rows should have length', function () {
      expect(instance.rows.length).to.equal(4);
    });

    it('elements in this.rows should have correct class', function () {
      instance.rows.forEach((row) => {
        expect(row.classList.contains('bx--structured-list-row')).to.equal(true);
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

  describe('_direction(evt)', function () {
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
      spy = sinon.spy(instance, '_direction');
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
      spy = sinon.spy(instance, '_direction');
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

    it('should return -1 on "up" key', function () {
      const event = Object.assign(
        new CustomEvent('keydown', {
          bubbles: true,
        }),
        { which: 38 },
      );
      const direction = instance._direction(event);
      expect(direction).to.equal(-1);
    });

    it('should return 1 on "down" key', function () {
      const event = Object.assign(
        new CustomEvent('keydown', {
          bubbles: true,
        }),
        { which: 40 },
      );
      const direction = instance._direction(event);
      expect(direction).to.equal(1);
    });

    it('should return undefined on other key presses', function () {
      const event = Object.assign(
        new CustomEvent('keydown', {
          bubbles: true,
        }),
        { which: 70 },
      );
      const direction = instance._direction(event);
      expect(direction).to.be.undefined;
    });

    afterEach(function () {
      spy.restore();
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('_nextIndex()', function () {
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

    it('should be called', function () {
      spy = sinon.spy(instance, '_nextIndex');
      instance._nextIndex([0, 1, 2, 3], 0, 1);
      expect(spy).to.have.been.called;
    });

    it('should return a number', function () {
      const result = instance._nextIndex([0, 1, 2, 3], 0, 1);
      expect(typeof result).to.equal('number');
    });

    afterEach(function () {
      spy.restore();
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('_handleChecked()', function () {
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

    it('should be called', function () {
      spy = sinon.spy(instance, '_handleChecked');
      instance._handleChecked(0);
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
