import 'core-js/modules/es6.weak-map'; // For PhantomJS
import Tile from '../../src/components/tile/tile';
import clickableTile from '../../src/components/tile/clickable-tile.html';
import expandableTile from '../../src/components/tile/expandable-tile.html';
import selectableTile from '../../src/components/tile/selectable-tile.html';

describe('Test tile', function() {
  describe('Constructor', function() {
    let tile;

    it('Should throw if root element is not given', function() {
      expect(() => {
        tile = new Tile();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        tile = new Tile(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('Should set default options', function() {
      const container = document.createElement('div');
      container.innerHTML = clickableTile;
      document.body.appendChild(container);
      tile = new Tile(document.querySelector('[data-tile]'));

      expect(tile.options).to.deep.equal({
        selectorInit: '[data-tile]',
        selectorAboveTheFold: '[data-tile-atf]',
        selectorTileInput: '[data-tile-input]',
        classExpandedTile: 'bx--tile--is-expanded',
        classClickableTile: 'bx--tile--is-clicked',
        classSelectableTile: 'bx--tile--is-selected',
      });
    });

    afterEach(function() {
      if (tile) {
        tile = tile.release();
      }
    });
  });

  describe('Test _hookActions', function() {
    let instance;
    let tileElement;
    let spy;
    const container = document.createElement('div');
    container.innerHTML = clickableTile;

    before(function() {
      document.body.appendChild(container);
      tileElement = container.querySelector('[data-tile]');
      instance = new Tile(tileElement);
    });

    it('Should be called', function() {
      spy = sinon.spy(instance, '_hookActions');
      instance._hookActions();
      expect(spy).to.have.been.called;
    });

    after(function() {
      instance.release();
      document.body.removeChild(container);
    });
  });

  describe('Test clickable tile', function() {
    let instance;
    let tileElement;
    const container = document.createElement('div');
    container.innerHTML = clickableTile;

    before(function() {
      document.body.appendChild(container);
      tileElement = container.querySelector('[data-tile]');
      instance = new Tile(tileElement);
    });

    it('Should not have the is-clicked class before its been clicked', function() {
      expect(tileElement.classList.contains('bx--tile--is-clicked')).to.be.false;
    });

    it('Should have the is-clicked class after its been clicked', function() {
      tileElement.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(tileElement.classList.contains('bx--tile--is-clicked')).to.be.true;
    });

    after(function() {
      instance.release();
      document.body.removeChild(container);
    });
  });

  describe('Test expandable tile', function() {
    let instance;
    let tileElement;
    const container = document.createElement('div');
    container.innerHTML = expandableTile;

    before(function() {
      document.body.appendChild(container);
      tileElement = container.querySelector('[data-tile]');
      instance = new Tile(tileElement);
    });

    it('Should not have the is-expanded class before its been clicked', function() {
      expect(tileElement.classList.contains('bx--tile--is-expanded')).to.be.false;
    });

    it('Should have the is-expanded class after its been clicked', function() {
      tileElement.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(tileElement.classList.contains('bx--tile--is-expanded')).to.be.true;
    });

    it('Should have the is-expanded class after enter has been pressed', function() {
      tileElement.dispatchEvent(new CustomEvent('keydown', { bubbles: true }), {
        which: 13,
      });
      expect(tileElement.classList.contains('bx--tile--is-expanded')).to.be.true;
    });

    after(function() {
      instance.release();
      document.body.removeChild(container);
    });
  });

  describe('Test selectable tile', function() {
    let instance;
    let tileElement;
    const container = document.createElement('div');
    container.innerHTML = selectableTile;

    before(function() {
      document.body.appendChild(container);
      tileElement = container.querySelector('[data-tile]');
      instance = new Tile(tileElement);
    });

    it('Should not have the is-clicked class before its been clicked', function() {
      expect(tileElement.classList.contains('bx--tile--is-selected')).to.be.false;
    });

    it('Should have the is-clicked class after its been clicked', function() {
      tileElement.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(tileElement.classList.contains('bx--tile--is-selected')).to.be.true;
    });

    after(function() {
      instance.release();
      document.body.removeChild(container);
    });
  });
});
