import '../utils/es6-weak-map-global'; // For PhantomJS
import '../../consumables/js/polyfills/custom-event';
import Dropdown from '../../consumables/js/es2015/dropdown';

describe('Dropdown', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new Dropdown();
      }).to.throw(Error);
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new Dropdown(document.createTextNode(''));
      }).to.throw(Error);
    });

    it(`Should not instantiate with "open" stateful modifier class`, function () {
      const element = document.createElement('ul');
      new Dropdown(element);
      document.body.appendChild(element);
      expect(element.classList.contains('bx--dropdown--open')).to.be.false;
    });

    it(`Should instantiate with data-dropdown attribute`, function () {
      const element = document.createElement('ul');
      new Dropdown(element);
      document.body.appendChild(element);
      expect(element.dataset.dropdown).to.equal('');
      expect(element.dataset.dropdown).to.not.equal(null);
      expect(element.dataset.dropdown).to.not.equal(undefined);
    });
  });

  describe('Toggle', function () {
    let dropdown;
    let element;

    before(function () {
      element = document.createElement('ul');
      element.classList.add('bx--dropdown');
      dropdown = new Dropdown(element);
      document.body.appendChild(element);
    });

    it(`Should add "open" stateful modifier class`, function () {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--dropdown--open')).to.be.true;
      expect(element.getAttribute('class')).to.equal('bx--dropdown bx--dropdown--open');
    });

    it(`Should remove "open" stateful modifier class (closed default state)`, function () {
      element.classList.add('bx--dropdown--open');
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--dropdown--open')).to.be.false;
      expect(element.getAttribute('class')).to.equal('bx--dropdown');
    });

    it(`Should always close dropdown when clicking document`, function () {
      element.classList.add('bx--dropdown--open');
      document.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.getAttribute('class')).to.equal('bx--dropdown');
    });

    afterEach(function () {
      element.classList.remove('bx--dropdown--open');
    });

    after(function () {
      dropdown.release();
      document.body.removeChild(element);
    });
  });

  describe('Managing instances: create() and release()', function () {
    let element;

    before(function () {
      element = document.createElement('a');
    });

    it('Should prevent creating duplicate instances', function () {
      let first;
      let second;
      try {
        first = Dropdown.create(element);
        second = Dropdown.create(element);
        expect(first).to.equal(second);
      } finally {
        first && first.release();
        if (first !== second) {
          second && second.release();
        }
      }
    });

    it('Should create a new instance for an element if an earlier one has been released', function () {
      let first;
      let second;
      try {
        first = Dropdown.create(element);
        first.release();
        second = Dropdown.create(element);
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
