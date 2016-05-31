import '../../consumables/js/polyfills/custom-event';
import '../utils/es6-weak-map-global'; // For PhantomJS
import Card from '../../consumables/js/es2015/card';

describe('Test card', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new Card();
      }).to.throw(Error);
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new Card(document.createTextNode(''));
      }).to.throw(Error);
    });

    it(`Should set default options`, function () {
      const cardlist = new Card(document.createElement('div'));
      expect(cardlist.options).to.deep.equal({
        selectorCard: '.bx--card',
      });
    });
  });

  describe('Keyboard navigation', function () {
    let element;
    let cardNodes;
    let spyFocus;

    before(function () {
      element = document.createElement('div');
      cardNodes = [... new Array(2)].map(() => {
        const cardNode = document.createElement('div');
        cardNode.classList.add('bx--card');
        cardNode.tabIndex = 0;
        return element.appendChild(cardNode);
      });
      document.body.appendChild(element);
      new Card(element);
    });

    beforeEach(function () {
      cardNodes[0].focus();
    });

    it(`Should focus on the new active card upon right key with old spec`, function () {
      spyFocus = sinon.spy(cardNodes[1], 'focus');
      cardNodes[0].dispatchEvent(Object.assign(new CustomEvent('keydown', { bubbles: true }), { keyIdentifier: 'Right' }));
      expect(spyFocus).to.be.calledOnce;
    });

    it(`Should focus on the new active card upon right key with new spec`, function () {
      spyFocus = sinon.spy(cardNodes[1], 'focus');
      cardNodes[0].dispatchEvent(Object.assign(new CustomEvent('keydown', { bubbles: true }), { key: 'ArrowRight' }));
      expect(spyFocus).to.be.calledOnce;
    });

    it(`Should handle out of range index`, function () {
      cardNodes[1].focus();
      spyFocus = sinon.spy(cardNodes[0], 'focus');
      cardNodes[1].dispatchEvent(Object.assign(new CustomEvent('keydown', { bubbles: true }), { key: 'ArrowRight' }));
      expect(spyFocus).to.be.calledOnce;
    });

    it(`Should focus on the new active card upon left key with old spec`, function () {
      spyFocus = sinon.spy(cardNodes[1], 'focus');
      cardNodes[0].dispatchEvent(Object.assign(new CustomEvent('keydown', { bubbles: true }), { keyIdentifier: 'Left' }));
      expect(spyFocus).to.be.calledOnce;
    });

    it(`Should focus on the new active card upon left key with new spec`, function () {
      spyFocus = sinon.spy(cardNodes[1], 'focus');
      cardNodes[0].dispatchEvent(Object.assign(new CustomEvent('keydown', { bubbles: true }), { key: 'ArrowLeft' }));
      expect(spyFocus).to.be.calledOnce;
    });

    afterEach(function () {
      if (spyFocus) {
        spyFocus.restore();
        spyFocus = null;
      }
    });

    after(function () {
      const card = Card.components.get(element);
      document.body.removeChild(element);
      if (card) {
        card.release();
      }
    });
  });

  describe('Managing instances', function () {
    let element;

    before(function () {
      element = document.createElement('div');
    });

    it('Should prevent creating duplicate instances', function () {
      let first;
      let second;
      try {
        first = Card.create(element);
        second = Card.create(element);
        expect(first).to.equal(second);
      } finally {
        first && first.release();
        if (first !== second) {
          second && second.release();
        }
      }
    });

    it('Should let create a new instance for an element if an earlier one has been released', function () {
      let first;
      let second;
      try {
        first = Card.create(element);
        first.release();
        second = Card.create(element);
        expect(first).not.to.equal(second);
      } finally {
        first && first.release();
        if (first !== second) {
          second && second.release();
        }
      }
    });
  });
});
