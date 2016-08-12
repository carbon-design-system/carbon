import '../utils/es6-weak-map-global'; // For PhantomJS
import '../../consumables/js/polyfills/custom-event';
import EventManager from '../utils/event-manager';
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

  describe('Selecting an item', function () {
    let dropdown;
    let element;
    let textNode;
    let itemNodes;
    const events = new EventManager();

    before(function () {
      element = document.createElement('ul');
      textNode = element.appendChild(document.createElement('li'));
      textNode.textContent = '0';

      const listContainer = element.appendChild(document.createElement('li'));
      const list = listContainer.appendChild(document.createElement('ul'));

      itemNodes = [... new Array(2)].map((item, i) => {
        const itemContainerNode = document.createElement('li');
        itemContainerNode.dataset.option = '';

        const itemNode = document.createElement('a');
        itemNode.textContent = i;
        itemNode.classList.add('bx--dropdown__link');
        if (i === 0) {
          itemNode.classList.add('bx--dropdown--selected');
        }

        itemContainerNode.appendChild(itemNode);
        list.appendChild(itemContainerNode);
        return itemNode;
      });

      dropdown = new Dropdown(element);
      document.body.appendChild(element);
    });

    it(`Should add/remove "selected" modifier class`, function () {
      itemNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(itemNodes[0].classList.contains('bx--dropdown--selected'), 'Unselected item').to.be.false;
      expect(itemNodes[1].classList.contains('bx--dropdown--selected'), 'Selected item').to.be.true;
    });

    it(`Should update text`, function () {
      itemNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(textNode.textContent).to.equal('1');
    });

    it(`Should provide a way to cancel switching item`, function () {
      events.on(element, 'dropdown-beingselected', (e) => {
        expect(e.detail.item).to.equal(itemNodes[1]);
        e.preventDefault();
      });
      itemNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(itemNodes[0].classList.contains('bx--dropdown--selected'), 'Other item').to.be.true;
      expect(itemNodes[1].classList.contains('bx--dropdown--selected'), 'Clicked item').to.be.false;
      expect(textNode.textContent).to.equal('0');
    });

    afterEach(function () {
      itemNodes[0].classList.add('bx--dropdown--selected');
      itemNodes[1].classList.remove('bx--dropdown--selected');
      textNode.textContent = '0';
      events.reset();
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

    it('Should remove click event listener on document object once the instance is released', function () {
      element.classList.add('bx--dropdown--open');
      document.body.appendChild(element);
      Dropdown.create(element).release();
      document.body.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--dropdown--open')).to.be.true;
    });

    afterEach(function () {
      if (document.body.contains(element)) {
        document.body.removeChild(element);
      }
    });
  });
});
