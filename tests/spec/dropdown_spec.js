import EventManager from '../utils/event-manager';
import Dropdown from '../../src/components/dropdown/dropdown';

describe('Dropdown', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new Dropdown();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new Dropdown(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('Should not instantiate with "open" stateful modifier class', function() {
      const element = document.createElement('ul');
      new Dropdown(element);
      document.body.appendChild(element);
      expect(element.classList.contains('bx--dropdown--open')).to.be.false;
    });
  });

  describe('Toggle', function() {
    let dropdown;
    let element;
    let itemNode;
    let stubFocus;

    before(function() {
      element = document.createElement('ul');
      element.classList.add('bx--dropdown');

      const listContainer = element.appendChild(document.createElement('li'));
      const list = listContainer.appendChild(document.createElement('ul'));

      const itemContainerNode = document.createElement('li');
      itemContainerNode.dataset.option = '';

      itemNode = document.createElement('a');
      itemNode.textContent = 0;
      itemNode.classList.add('bx--dropdown-link');
      itemNode.classList.add('bx--dropdown--selected');

      itemContainerNode.appendChild(itemNode);
      list.appendChild(itemContainerNode);

      dropdown = new Dropdown(element);
      document.body.appendChild(element);
    });

    it('Should add "open" stateful modifier class', function() {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--dropdown--open')).to.be.true;
      expect(element.getAttribute('class')).to.equal('bx--dropdown bx--dropdown--open');
    });

    it('Should remove "open" stateful modifier class (closed default state)', function() {
      element.classList.add('bx--dropdown--open');
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--dropdown--open')).to.be.false;
      expect(element.getAttribute('class')).to.equal('bx--dropdown');
    });

    it('Should always close dropdown when clicking document', function() {
      element.classList.add('bx--dropdown--open');
      document.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.getAttribute('class')).to.equal('bx--dropdown');
    });

    it('Should close dropdown when clicking on an item', function() {
      element.classList.add('bx--dropdown--open');
      itemNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.getAttribute('class')).to.equal('bx--dropdown');
    });

    it('Should open dropdown with enter key', function() {
      stubFocus = sinon.stub(element, 'focus');
      element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 13 }));
      expect(element.classList.contains('bx--dropdown--open'), 'Open state').to.be.true;
      expect(stubFocus, 'Focus requested').to.have.been.calledOnce;
    });

    it('Should close dropdown with enter key', function() {
      stubFocus = sinon.stub(element, 'focus');
      element.classList.add('bx--dropdown--open');
      element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 13 }));
      expect(element.classList.contains('bx--dropdown--open'), 'Open state').to.be.false;
      expect(stubFocus, 'Focus requested').to.have.been.calledOnce;
    });

    it('Should open dropdown with space key', function() {
      stubFocus = sinon.stub(element, 'focus');
      element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 32 }));
      expect(element.classList.contains('bx--dropdown--open'), 'Open state').to.be.true;
      expect(stubFocus, 'Focus requested').to.have.been.calledOnce;
    });

    it('Should close dropdown with space key', function() {
      stubFocus = sinon.stub(element, 'focus');
      element.classList.add('bx--dropdown--open');
      element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 32 }));
      expect(element.classList.contains('bx--dropdown--open'), 'Open state').to.be.false;
      expect(stubFocus, 'Focus requested').to.have.been.calledOnce;
    });

    it('Shouldn not close dropdown with space key on an item', function() {
      stubFocus = sinon.stub(element, 'focus');
      element.classList.add('bx--dropdown--open');
      itemNode.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          which: 32,
        })
      );
      expect(element.classList.contains('bx--dropdown--open'), 'Open state').to.be.true;
      expect(stubFocus, 'Focus requested').not.to.have.been.called;
    });

    it('Should close dropdown with ESC key', function() {
      stubFocus = sinon.stub(element, 'focus');
      element.classList.add('bx--dropdown--open');
      element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 27 }));
      expect(element.classList.contains('bx--dropdown--open'), 'Open state').to.be.false;
      expect(stubFocus, 'Focus requested').to.have.been.calledOnce;
    });

    it('Should close dropdown with ESC key on an item', function() {
      stubFocus = sinon.stub(element, 'focus');
      element.classList.add('bx--dropdown--open');
      itemNode.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          which: 27,
        })
      );
      expect(element.classList.contains('bx--dropdown--open'), 'Open state').to.be.false;
      expect(stubFocus, 'Focus requested').to.have.been.calledOnce;
    });

    it('Should not open dropdown with ESC key', function() {
      stubFocus = sinon.stub(element, 'focus');
      element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 27 }));
      expect(element.classList.contains('bx--dropdown--open'), 'Open state').to.be.false;
      expect(stubFocus, 'Focus requested').not.to.have.been.called;
    });

    it('Should not open when the disabled class is applied', function() {
      element.classList.add('bx--dropdown--disabled');
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--dropdown--open'), 'Open state').to.be.false;
    });

    afterEach(function() {
      if (stubFocus) {
        stubFocus.restore();
        stubFocus = null;
      }
      element.classList.remove('bx--dropdown--open');
    });

    after(function() {
      dropdown.release();
      document.body.removeChild(element);
    });
  });

  describe('Selecting an item', function() {
    let dropdown;
    let element;
    let textNode;
    let itemNodes;
    const events = new EventManager();

    before(function() {
      element = document.createElement('ul');
      textNode = element.appendChild(document.createElement('li'));
      textNode.classList.add('bx--dropdown-text');
      textNode.textContent = '0';

      const listContainer = element.appendChild(document.createElement('li'));
      const list = listContainer.appendChild(document.createElement('ul'));

      itemNodes = [...new Array(2)].map((item, i) => {
        const itemContainerNode = document.createElement('li');
        itemContainerNode.dataset.option = '';

        const itemNode = document.createElement('a');
        itemNode.textContent = i;
        itemNode.classList.add('bx--dropdown-link');
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

    it('Should add/remove "selected" modifier class', function() {
      itemNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(itemNodes[0].classList.contains('bx--dropdown--selected'), 'Unselected item').to.be.false;
      expect(itemNodes[1].classList.contains('bx--dropdown--selected'), 'Selected item').to.be.true;
    });

    it('Should update text', function() {
      itemNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(textNode.textContent).to.equal('1');
    });

    it('Should not update text if navigation', function() {
      element.setAttribute('data-dropdown-type', 'navigation');
      itemNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(textNode.textContent).to.equal('0');
    });

    it('Should not add "selected" modifier class if dropdown type is navigation', function() {
      element.setAttribute('data-dropdown-type', 'navigation');
      itemNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(itemNodes[0].classList.contains('bx--dropdown--selected'), 'Unselected item').to.be.false;
      expect(itemNodes[1].classList.contains('bx--dropdown--selected'), 'Selected item').to.be.false;
    });

    it('Should not cause an error if text does not exist', function() {
      textNode.parentNode.removeChild(textNode);
      expect(() => {
        itemNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      }, 'Error').not.to.throw(Error);
      expect(textNode.textContent, 'Text').to.equal('0');
    });

    it('Should provide a way to cancel switching item', function() {
      events.on(element, 'dropdown-beingselected', e => {
        expect(e.detail.item).to.equal(itemNodes[1]);
        e.preventDefault();
      });
      itemNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(itemNodes[0].classList.contains('bx--dropdown--selected'), 'Other item').to.be.true;
      expect(itemNodes[1].classList.contains('bx--dropdown--selected'), 'Clicked item').to.be.false;
      expect(textNode.textContent).to.equal('0');
    });

    afterEach(function() {
      itemNodes[0].classList.add('bx--dropdown--selected');
      itemNodes[1].classList.remove('bx--dropdown--selected');
      textNode.textContent = '0';
      if (!textNode.parentNode) {
        element.appendChild(textNode);
      }
      element.setAttribute('data-dropdown-type', '');
      events.reset();
    });

    after(function() {
      dropdown.release();
      document.body.removeChild(element);
    });
  });

  describe('Navigating focus', function() {
    let dropdown;
    let element;
    let itemNodes;
    const stubsFocus = [];
    let stubGetCurrentNavigation;
    const events = new EventManager();

    before(function() {
      element = document.createElement('ul');

      const listContainer = element.appendChild(document.createElement('li'));
      const list = listContainer.appendChild(document.createElement('ul'));

      itemNodes = [...new Array(3)].map((item, i) => {
        const itemContainerNode = document.createElement('li');
        itemContainerNode.dataset.option = '';

        const itemNode = document.createElement('a');
        itemNode.textContent = i;
        itemNode.classList.add('bx--dropdown-link');

        itemContainerNode.appendChild(itemNode);
        list.appendChild(itemContainerNode);
        return itemNode;
      });

      dropdown = new Dropdown(element);
      document.body.appendChild(element);
    });

    beforeEach(function() {
      itemNodes.forEach(item => {
        item.classList.remove('bx--dropdown--selected');
      });
      element.classList.add('bx--dropdown--open');
      element.focus();
    });

    it('Should select the first one for forward navigation if there is no selection', function() {
      stubsFocus.push(...itemNodes.map(item => sinon.stub(item, 'focus')));
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').to.be.true;
      expect(stubsFocus[0], 'Focus on 1st item').to.have.been.calledOnce;
      expect(stubsFocus[1], 'Focus on 2nd item').not.to.have.been.called;
      expect(stubsFocus[2], 'Focus on 3rd item').not.to.have.been.called;
    });

    it('Should select the last one for backward navigation if there is no selection', function() {
      stubsFocus.push(...itemNodes.map(item => sinon.stub(item, 'focus')));
      element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 38 }));
      expect(stubsFocus[0], 'Focus on 1st item').not.to.have.been.called;
      expect(stubsFocus[1], 'Focus on 2nd item').not.to.have.been.called;
      expect(stubsFocus[2], 'Focus on 3rd item').to.have.been.calledOnce;
    });

    it('Should start with selection for forward navigation', function() {
      itemNodes[0].classList.add('bx--dropdown--selected');
      stubsFocus.push(...itemNodes.map(item => sinon.stub(item, 'focus')));
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').to.be.true;
      expect(stubsFocus[0], 'Focus on 1st item').not.to.have.been.called;
      expect(stubsFocus[1], 'Focus on 2nd item').to.have.been.calledOnce;
      expect(stubsFocus[2], 'Focus on 3rd item').not.to.have.been.called;
    });

    it('Should start with selection for backward navigation', function() {
      itemNodes[2].classList.add('bx--dropdown--selected');
      stubsFocus.push(...itemNodes.map(item => sinon.stub(item, 'focus')));
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 38,
        })
      );
      expect(defaultPrevented, 'Canceling event').to.be.true;
      expect(stubsFocus[0], 'Focus on 1st item').not.to.have.been.called;
      expect(stubsFocus[1], 'Focus on 2nd item').to.have.been.calledOnce;
      expect(stubsFocus[2], 'Focus on 3rd item').not.to.have.been.called;
    });

    it('Should handle overflow for forward navigation', function() {
      itemNodes[2].classList.add('bx--dropdown--selected');
      stubsFocus.push(...itemNodes.map(item => sinon.stub(item, 'focus')));
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').to.be.true;
      expect(stubsFocus[0], 'Focus on 1st item').to.have.been.calledOnce;
      expect(stubsFocus[1], 'Focus on 2nd item').not.to.have.been.called;
      expect(stubsFocus[2], 'Focus on 3rd item').not.to.have.been.called;
    });

    it('Should handle underflow for backward navigation', function() {
      itemNodes[0].classList.add('bx--dropdown--selected');
      stubsFocus.push(...itemNodes.map(item => sinon.stub(item, 'focus')));
      element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 38 }));
      expect(stubsFocus[0], 'Focus on 1st item').not.to.have.been.called;
      expect(stubsFocus[1], 'Focus on 2nd item').not.to.have.been.called;
      expect(stubsFocus[2], 'Focus on 3rd item').to.have.been.calledOnce;
    });

    it('Should start with focused element over selection for forward navigation', function() {
      stubGetCurrentNavigation = sinon.stub(dropdown, 'getCurrentNavigation', function() {
        return itemNodes[0];
      });
      itemNodes[2].classList.add('bx--dropdown--selected');
      stubsFocus.push(...itemNodes.map(item => sinon.stub(item, 'focus')));
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').to.be.true;
      expect(stubsFocus[0], 'Focus on 1st item').not.to.have.been.called;
      expect(stubsFocus[1], 'Focus on 2nd item').to.have.been.calledOnce;
      expect(stubsFocus[2], 'Focus on 3rd item').not.to.have.been.called;
    });

    it('Should start with focused element over selection for backward navigation', function() {
      itemNodes[0].classList.add('bx--dropdown--selected');
      stubGetCurrentNavigation = sinon.stub(dropdown, 'getCurrentNavigation', function() {
        return itemNodes[2];
      });
      stubsFocus.push(...itemNodes.map(item => sinon.stub(item, 'focus')));
      element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 38 }));
      expect(stubsFocus[0], 'Focus on 1st item').not.to.have.been.called;
      expect(stubsFocus[1], 'Focus on 2nd item').to.have.been.calledOnce;
      expect(stubsFocus[2], 'Focus on 3rd item').not.to.have.been.called;
    });

    it('Should skip selected items', function() {
      stubGetCurrentNavigation = sinon.stub(dropdown, 'getCurrentNavigation', function() {
        return itemNodes[0];
      });
      itemNodes[1].classList.add('bx--dropdown--selected');
      stubsFocus.push(...itemNodes.map(item => sinon.stub(item, 'focus')));
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').to.be.true;
      expect(stubsFocus[0], 'Focus on 1st item').not.to.have.been.called;
      expect(stubsFocus[1], 'Focus on 2nd item').not.to.have.been.called;
      expect(stubsFocus[2], 'Focus on 3rd item').to.have.been.calledOnce;
    });

    it('Should not navigate unless dropdown is open', function() {
      element.classList.remove('bx--dropdown--open');
      stubsFocus.push(...itemNodes.map(item => sinon.stub(item, 'focus')));
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').not.to.be.true;
      expect(stubsFocus[0], 'Focus on 1st item').not.to.have.been.called;
      expect(stubsFocus[1], 'Focus on 2nd item').not.to.have.been.called;
      expect(stubsFocus[2], 'Focus on 3rd item').not.to.have.been.called;
    });

    afterEach(function() {
      if (stubGetCurrentNavigation) {
        stubGetCurrentNavigation.restore();
        stubGetCurrentNavigation = null;
      }
      for (let stub = stubsFocus.pop(); stub; stub = stubsFocus.pop()) {
        stub.restore();
      }
      events.reset();
    });

    after(function() {
      dropdown.release();
      document.body.removeChild(element);
    });
  });

  describe('Close on blur', function() {
    let dropdown;
    let element;
    let input;

    before(function() {
      element = document.createElement('ul');

      const listContainer = element.appendChild(document.createElement('li'));
      const list = listContainer.appendChild(document.createElement('ul'));

      const itemContainerNode = document.createElement('li');

      const itemNode = document.createElement('a');
      itemNode.textContent = 'foo';
      itemNode.classList.add('bx--dropdown-link');

      itemContainerNode.appendChild(itemNode);
      list.appendChild(itemContainerNode);

      dropdown = new Dropdown(element);
      document.body.appendChild(element);

      input = document.createElement('input');
      input.type = 'text';
      document.body.appendChild(input);
    });

    beforeEach(function() {
      dropdown.element.classList.add('bx--dropdown--open');
      element.querySelector('.bx--dropdown-link').focus();
    });

    it('Should close when dropdown loses focus', function() {
      input.focus();
      expect(dropdown.element.contains(document.activeElement)).to.be.false;
    });

    after(function() {
      if (document.body.contains(input)) {
        document.body.removeChild(input);
      }
      dropdown.release();
      document.body.removeChild(element);
    });
  });

  describe('Managing instances: create() and release()', function() {
    let element;

    before(function() {
      element = document.createElement('a');
    });

    it('Should prevent creating duplicate instances', function() {
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

    it('Should create a new instance for an element if an earlier one has been released', function() {
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

    it('Should remove click event listener on document object once the instance is released', function() {
      element.classList.add('bx--dropdown--open');
      document.body.appendChild(element);
      Dropdown.create(element).release();
      document.body.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--dropdown--open')).to.be.true;
    });

    afterEach(function() {
      if (document.body.contains(element)) {
        document.body.removeChild(element);
      }
    });
  });
});
