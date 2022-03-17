import { delay } from 'bluebird'; // For testing on browsers not supporting Promise
import EventManager from '../utils/event-manager';
import Dropdown from '../../src/components/dropdown/dropdown';

describe('Dropdown', function () {
  describe('Constructor', function () {
    it('Should throw if root element is not given', function () {
      expect(() => {
        new Dropdown();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        new Dropdown(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should not instantiate with "open" stateful modifier class', function () {
      const element = document.createElement('ul');
      new Dropdown(element);
      document.body.appendChild(element);
      expect(element.classList.contains('bx--dropdown--open')).toBe(false);
    });
  });

  // test backwards compatibility with legacy markup
  describe('Toggle', function () {
    let dropdown;
    let element;
    let itemNode;

    beforeAll(function () {
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

    it('Should add "open" stateful modifier class', function () {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--dropdown--open')).toBe(true);
      expect(element.getAttribute('class')).toBe(
        'bx--dropdown bx--dropdown--open'
      );
    });

    it('Should remove "open" stateful modifier class (closed default state)', function () {
      element.classList.add('bx--dropdown--open');
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--dropdown--open')).toBe(false);
      expect(element.getAttribute('class')).toBe('bx--dropdown');
    });

    it('Should always close dropdown when clicking document', function () {
      element.classList.add('bx--dropdown--open');
      document.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.getAttribute('class')).toBe('bx--dropdown');
    });

    it('Should close dropdown when clicking on an item', function () {
      element.classList.add('bx--dropdown--open');
      itemNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.getAttribute('class')).toBe('bx--dropdown');
    });

    it('Should open dropdown with enter key', function () {
      spyOn(element, 'focus');
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 13 })
      );
      expect(
        element.classList.contains('bx--dropdown--open'),
        'Open state'
      ).toBe(true);
      expect(element.focus, 'Focus requested').toHaveBeenCalledTimes(1);
    });

    it('Should close dropdown with enter key', async function () {
      spyOn(element, 'focus');
      element.classList.add('bx--dropdown--open');
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 13 })
      );
      expect(
        element.classList.contains('bx--dropdown--open'),
        'Open state'
      ).toBe(false);
      await delay(0);
      expect(element.focus, 'Focus requested').toHaveBeenCalledTimes(1);
    });

    it('Should open dropdown with space key', function () {
      spyOn(element, 'focus');
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 32 })
      );
      expect(
        element.classList.contains('bx--dropdown--open'),
        'Open state'
      ).toBe(true);
      expect(element.focus, 'Focus requested').toHaveBeenCalledTimes(1);
    });

    it('Should close dropdown with space key', async function () {
      spyOn(element, 'focus');
      element.classList.add('bx--dropdown--open');
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 32 })
      );
      expect(
        element.classList.contains('bx--dropdown--open'),
        'Open state'
      ).toBe(false);
      await delay(0);
      expect(element.focus, 'Focus requested').toHaveBeenCalledTimes(1);
    });

    it('Should not close dropdown with space key on an item', function () {
      spyOn(element, 'focus');
      element.classList.add('bx--dropdown--open');
      itemNode.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          which: 32,
        })
      );
      expect(
        element.classList.contains('bx--dropdown--open'),
        'Open state'
      ).toBe(true);
      expect(element.focus, 'Focus requested').not.toHaveBeenCalled();
    });

    it('Should close dropdown with ESC key', async function () {
      spyOn(element, 'focus');
      element.classList.add('bx--dropdown--open');
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 27 })
      );
      expect(
        element.classList.contains('bx--dropdown--open'),
        'Open state'
      ).toBe(false);
      await delay(0);
      expect(element.focus, 'Focus requested').toHaveBeenCalledTimes(1);
    });

    it('Should close dropdown with ESC key on an item', async function () {
      spyOn(element, 'focus');
      element.classList.add('bx--dropdown--open');
      itemNode.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          which: 27,
        })
      );
      expect(
        element.classList.contains('bx--dropdown--open'),
        'Open state'
      ).toBe(false);
      await delay(0);
      expect(element.focus, 'Focus requested').toHaveBeenCalledTimes(1);
    });

    it('Should not open dropdown with ESC key', function () {
      spyOn(element, 'focus');
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 27 })
      );
      expect(
        element.classList.contains('bx--dropdown--open'),
        'Open state'
      ).toBe(false);
      expect(element.focus, 'Focus requested').not.toHaveBeenCalled();
    });

    it('Should not open when the disabled class is applied', function () {
      element.classList.add('bx--dropdown--disabled');
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(
        element.classList.contains('bx--dropdown--open'),
        'Open state'
      ).toBe(false);
    });

    afterEach(function () {
      element.classList.remove('bx--dropdown--disabled');
      element.classList.remove('bx--dropdown--open');
    });

    afterAll(function () {
      dropdown.release();
      document.body.removeChild(element);
    });
  });

  describe('Toggle with semantic markup', function () {
    let dropdown;
    let element;
    let itemNode;
    let trigger;
    let list;

    beforeAll(function () {
      element = document.createElement('div');
      element.classList.add('bx--dropdown');

      trigger = element.appendChild(document.createElement('button'));
      trigger.classList.add('bx--dropdown-text');
      list = element.appendChild(document.createElement('ul'));
      list.classList.add('bx--dropdown-list');

      const itemContainerNode = document.createElement('li');
      itemContainerNode.dataset.option = '';

      itemNode = document.createElement('a');
      itemNode.id = 'item-0';
      itemNode.textContent = 0;
      itemNode.classList.add('bx--dropdown-link');
      itemNode.classList.add('bx--dropdown--selected');

      itemContainerNode.appendChild(itemNode);
      list.appendChild(itemContainerNode);

      dropdown = new Dropdown(element);
      document.body.appendChild(element);
    });

    it('Should add "open" stateful modifier class', function () {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--dropdown--open')).toBe(true);
      expect(element.getAttribute('class')).toBe(
        'bx--dropdown bx--dropdown--open'
      );
    });

    it('Should setup active descendent when open', function () {
      trigger.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(list.getAttribute('aria-activedescendant')).toBe(itemNode.id);
      expect(itemNode.classList.contains('bx--dropdown--focused')).toBe(true);
    });

    it('Should remove "open" stateful modifier class (closed default state)', function () {
      element.classList.add('bx--dropdown--open');
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('bx--dropdown--open')).toBe(false);
      expect(element.getAttribute('class')).toBe('bx--dropdown');
    });

    it('Should remove active descendent setup when closed', function () {
      // Open the dropdown
      trigger.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      // Close the dropdown
      trigger.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(list.hasAttribute('aria-activedescendant')).toBe(false);
      expect(itemNode.classList.contains('bx--dropdown--focused')).toBe(false);
    });

    it('Should open dropdown with enter key', function () {
      spyOn(list, 'focus');
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 13 })
      );
      expect(element.classList.contains('bx--dropdown--open')).toBe(true);
      expect(list.focus, 'Focus requested').toHaveBeenCalledTimes(1);
    });

    it('Should close dropdown with enter key', async function () {
      spyOn(trigger, 'focus');
      element.classList.add('bx--dropdown--open');
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 13 })
      );
      expect(element.classList.contains('bx--dropdown--open')).toBe(false);
      await delay(0);
      expect(trigger.focus, 'Focus requested').toHaveBeenCalledTimes(1);
    });

    it('Should open dropdown with space key', function () {
      spyOn(list, 'focus');
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 32 })
      );
      expect(element.classList.contains('bx--dropdown--open')).toBe(true);
      expect(list.focus, 'Focus requested').toHaveBeenCalledTimes(1);
    });

    it('Should close dropdown with space key', async function () {
      spyOn(trigger, 'focus');
      element.classList.add('bx--dropdown--open');
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 32 })
      );
      expect(element.classList.contains('bx--dropdown--open')).toBe(false);
      await delay(0);
      expect(trigger.focus, 'Focus requested').toHaveBeenCalledTimes(1);
    });

    it('Should not close dropdown with space key on an item', function () {
      spyOn(element, 'focus');
      element.classList.add('bx--dropdown--open');
      itemNode.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          which: 32,
        })
      );
      expect(element.classList.contains('bx--dropdown--open')).toBe(true);
      expect(element.focus, 'Focus requested').not.toHaveBeenCalled();
    });

    it('Should close dropdown with ESC key', async function () {
      spyOn(trigger, 'focus');
      element.classList.add('bx--dropdown--open');
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 27 })
      );
      expect(element.classList.contains('bx--dropdown--open')).toBe(false);
      await delay(0);
      expect(trigger.focus, 'Focus requested').toHaveBeenCalledTimes(1);
    });

    it('Should close dropdown with ESC key on an item', async function () {
      spyOn(trigger, 'focus');
      element.classList.add('bx--dropdown--open');
      itemNode.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          which: 27,
        })
      );
      expect(element.classList.contains('bx--dropdown--open')).toBe(false);
      await delay(0);
      expect(trigger.focus, 'Focus requested').toHaveBeenCalledTimes(1);
    });

    it('Should not open dropdown with ESC key', function () {
      spyOn(element, 'focus');
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 27 })
      );
      expect(element.classList.contains('bx--dropdown--open')).toBe(false);
      expect(element.focus, 'Focus requested').not.toHaveBeenCalled();
    });

    afterEach(function () {
      element.classList.remove('bx--dropdown--disabled');
      element.classList.remove('bx--dropdown--open');
    });

    afterAll(function () {
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

    beforeAll(function () {
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
          itemContainerNode.classList.add('bx--dropdown--selected');
        }

        itemContainerNode.appendChild(itemNode);
        list.appendChild(itemContainerNode);
        return itemNode;
      });

      dropdown = new Dropdown(element);
      document.body.appendChild(element);
    });

    it('Should add/remove "selected" modifier class', function () {
      itemNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(
        itemNodes[0].parentElement.classList.contains('bx--dropdown--selected'),
        'Unselected item'
      ).toBe(false);
      expect(
        itemNodes[1].parentElement.classList.contains('bx--dropdown--selected'),
        'Selected item'
      ).toBe(true);
    });

    it('Should update text', function () {
      itemNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(textNode.textContent).toBe('1');
    });

    it('Should not update text if navigation', function () {
      element.setAttribute('data-dropdown-type', 'navigation');
      itemNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(textNode.textContent).toBe('0');
    });

    it('Should not add "selected" modifier class if dropdown type is navigation', function () {
      element.setAttribute('data-dropdown-type', 'navigation');
      itemNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(
        itemNodes[0].parentElement.classList.contains('bx--dropdown--selected'),
        'Unselected item'
      ).toBe(false);
      expect(
        itemNodes[1].parentElement.classList.contains('bx--dropdown--selected'),
        'Selected item'
      ).toBe(false);
    });

    it('Should not cause an error if text does not exist', function () {
      textNode.parentNode.removeChild(textNode);
      expect(() => {
        itemNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      }, 'Error').not.toThrowError();
      expect(textNode.textContent, 'Text').toBe('0');
    });

    it('Should provide a way to cancel switching item', function () {
      events.on(element, 'dropdown-beingselected', (e) => {
        expect(e.detail.item).toBe(itemNodes[1]);
        e.preventDefault();
      });
      itemNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(
        itemNodes[0].parentElement.classList.contains('bx--dropdown--selected'),
        'Other item'
      ).toBe(true);
      expect(
        itemNodes[1].parentElement.classList.contains('bx--dropdown--selected'),
        'Clicked item'
      ).toBe(false);
      expect(textNode.textContent).toBe('0');
    });

    afterEach(function () {
      itemNodes[0].parentElement.classList.add('bx--dropdown--selected');
      itemNodes[1].parentElement.classList.remove('bx--dropdown--selected');
      textNode.textContent = '0';
      if (!textNode.parentNode) {
        element.appendChild(textNode);
      }
      element.setAttribute('data-dropdown-type', '');
      events.reset();
    });

    afterAll(function () {
      dropdown.release();
      document.body.removeChild(element);
    });
  });

  // test backwards compatibility with legacy markup
  describe('Navigating focus', function () {
    let dropdown;
    let element;
    let itemNodes;
    const events = new EventManager();

    beforeAll(function () {
      element = document.createElement('ul');

      const listContainer = element.appendChild(document.createElement('li'));
      const list = listContainer.appendChild(document.createElement('ul'));

      itemNodes = [...new Array(3)].map((item, i) => {
        const itemContainerNode = document.createElement('li');
        itemContainerNode.dataset.option = '';
        itemContainerNode.classList.add('bx--dropdown-item');

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

    beforeEach(function () {
      itemNodes.forEach((item) => {
        item.parentElement.classList.remove('bx--dropdown--selected');
        item.removeAttribute('hidden');
        item.parentNode.removeAttribute('hidden');
        item.removeAttribute('aria-hidden');
        item.parentNode.removeAttribute('aria-hidden');
      });
      element.classList.add('bx--dropdown--open');
      element.focus();
    });

    it('Should select the first one for forward navigation if there is no selection', function () {
      itemNodes.forEach((item) => {
        spyOn(item, 'focus');
      });
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').toBe(true);
      expect(itemNodes[0].focus, 'Focus on 1st item').toHaveBeenCalledTimes(1);
      expect(itemNodes[1].focus, 'Focus on 2nd item').not.toHaveBeenCalled();
      expect(itemNodes[2].focus, 'Focus on 3rd item').not.toHaveBeenCalled();
    });

    it('Should select the last one for backward navigation if there is no selection', function () {
      itemNodes.forEach((item) => {
        spyOn(item, 'focus');
      });
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 38 })
      );
      expect(itemNodes[0].focus, 'Focus on 1st item').not.toHaveBeenCalled();
      expect(itemNodes[1].focus, 'Focus on 2nd item').not.toHaveBeenCalled();
      expect(itemNodes[2].focus, 'Focus on 3rd item').toHaveBeenCalledTimes(1);
    });

    it('Should start with selection for forward navigation', function () {
      itemNodes[0].parentElement.classList.add('bx--dropdown--selected');
      itemNodes.forEach((item) => {
        spyOn(item, 'focus');
      });
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').toBe(true);
      expect(itemNodes[0].focus, 'Focus on 1st item').not.toHaveBeenCalled();
      expect(itemNodes[1].focus, 'Focus on 2nd item').toHaveBeenCalledTimes(1);
      expect(itemNodes[2].focus, 'Focus on 3rd item').not.toHaveBeenCalled();
    });

    it('Should start with selection for backward navigation', function () {
      itemNodes[2].parentElement.classList.add('bx--dropdown--selected');
      itemNodes.forEach((item) => {
        spyOn(item, 'focus');
      });
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 38,
        })
      );
      expect(defaultPrevented, 'Canceling event').toBe(true);
      expect(itemNodes[0].focus, 'Focus on 1st item').not.toHaveBeenCalled();
      expect(itemNodes[1].focus, 'Focus on 2nd item').toHaveBeenCalledTimes(1);
      expect(itemNodes[2].focus, 'Focus on 3rd item').not.toHaveBeenCalled();
    });

    it('Should handle overflow for forward navigation', function () {
      itemNodes[2].classList.add('bx--dropdown--selected');
      itemNodes.forEach((item) => {
        spyOn(item, 'focus');
      });
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').toBe(true);
      expect(itemNodes[0].focus, 'Focus on 1st item').toHaveBeenCalledTimes(1);
      expect(itemNodes[1].focus, 'Focus on 2nd item').not.toHaveBeenCalled();
      expect(itemNodes[2].focus, 'Focus on 3rd item').not.toHaveBeenCalled();
    });

    it('Should handle underflow for backward navigation', function () {
      itemNodes[0].classList.add('bx--dropdown--selected');
      itemNodes.forEach((item) => {
        spyOn(item, 'focus');
      });
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 38 })
      );
      expect(itemNodes[0].focus, 'Focus on 1st item').not.toHaveBeenCalled();
      expect(itemNodes[1].focus, 'Focus on 2nd item').not.toHaveBeenCalled();
      expect(itemNodes[2].focus, 'Focus on 3rd item').toHaveBeenCalledTimes(1);
    });

    it('Should start with focused element over selection for forward navigation', function () {
      spyOn(dropdown, 'getCurrentNavigation').and.callFake(function () {
        return itemNodes[0];
      });
      itemNodes[2].classList.add('bx--dropdown--selected');
      itemNodes.forEach((item) => {
        spyOn(item, 'focus');
      });
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').toBe(true);
      expect(itemNodes[0].focus, 'Focus on 1st item').not.toHaveBeenCalled();
      expect(itemNodes[1].focus, 'Focus on 2nd item').toHaveBeenCalledTimes(1);
      expect(itemNodes[2].focus, 'Focus on 3rd item').not.toHaveBeenCalled();
    });

    it('Should start with focused element over selection for backward navigation', function () {
      itemNodes[0].classList.add('bx--dropdown--selected');
      spyOn(dropdown, 'getCurrentNavigation').and.callFake(function () {
        return itemNodes[2];
      });
      itemNodes.forEach((item) => {
        spyOn(item, 'focus');
      });
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 38 })
      );
      expect(itemNodes[0].focus, 'Focus on 1st item').not.toHaveBeenCalled();
      expect(itemNodes[1].focus, 'Focus on 2nd item').toHaveBeenCalledTimes(1);
      expect(itemNodes[2].focus, 'Focus on 3rd item').not.toHaveBeenCalled();
    });

    it('Should skip selected items', function () {
      spyOn(dropdown, 'getCurrentNavigation').and.callFake(function () {
        return itemNodes[0];
      });
      itemNodes[1].parentElement.classList.add('bx--dropdown--selected');
      itemNodes.forEach((item) => {
        spyOn(item, 'focus');
      });
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').toBe(true);
      expect(itemNodes[0].focus, 'Focus on 1st item').not.toHaveBeenCalled();
      expect(itemNodes[1].focus, 'Focus on 2nd item').not.toHaveBeenCalled();
      expect(itemNodes[2].focus, 'Focus on 3rd item').toHaveBeenCalledTimes(1);
    });

    it('Should skip items with hidden link', function () {
      spyOn(dropdown, 'getCurrentNavigation').and.callFake(function () {
        return itemNodes[0];
      });
      itemNodes[1].setAttribute('hidden', '');
      itemNodes.forEach((item) => {
        spyOn(item, 'focus');
      });
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').toBe(true);
      expect(itemNodes[0].focus, 'Focus on 1st item').not.toHaveBeenCalled();
      expect(itemNodes[1].focus, 'Focus on 2nd item').not.toHaveBeenCalled();
      expect(itemNodes[2].focus, 'Focus on 3rd item').toHaveBeenCalledTimes(1);
    });

    it('Should skip items with hidden container', function () {
      spyOn(dropdown, 'getCurrentNavigation').and.callFake(function () {
        return itemNodes[0];
      });
      itemNodes[1].parentNode.setAttribute('hidden', '');
      itemNodes.forEach((item) => {
        spyOn(item, 'focus');
      });
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').toBe(true);
      expect(itemNodes[0].focus, 'Focus on 1st item').not.toHaveBeenCalled();
      expect(itemNodes[1].focus, 'Focus on 2nd item').not.toHaveBeenCalled();
      expect(itemNodes[2].focus, 'Focus on 3rd item').toHaveBeenCalledTimes(1);
    });

    it('Should skip items with link with aria-hidden', function () {
      spyOn(dropdown, 'getCurrentNavigation').and.callFake(function () {
        return itemNodes[0];
      });
      itemNodes[1].setAttribute('aria-hidden', 'true');
      itemNodes.forEach((item) => {
        spyOn(item, 'focus');
      });
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').toBe(true);
      expect(itemNodes[0].focus, 'Focus on 1st item').not.toHaveBeenCalled();
      expect(itemNodes[1].focus, 'Focus on 2nd item').not.toHaveBeenCalled();
      expect(itemNodes[2].focus, 'Focus on 3rd item').toHaveBeenCalledTimes(1);
    });

    it('Should skip items with container with aria-hidden', function () {
      spyOn(dropdown, 'getCurrentNavigation').and.callFake(function () {
        return itemNodes[0];
      });
      itemNodes[1].parentNode.setAttribute('aria-hidden', 'true');
      itemNodes.forEach((item) => {
        spyOn(item, 'focus');
      });
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').toBe(true);
      expect(itemNodes[0].focus, 'Focus on 1st item').not.toHaveBeenCalled();
      expect(itemNodes[1].focus, 'Focus on 2nd item').not.toHaveBeenCalled();
      expect(itemNodes[2].focus, 'Focus on 3rd item').toHaveBeenCalledTimes(1);
    });

    it('Should not navigate unless dropdown is open', function () {
      element.classList.remove('bx--dropdown--open');
      itemNodes.forEach((item) => {
        spyOn(item, 'focus');
      });
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').not.toBe(true);
      expect(itemNodes[0].focus, 'Focus on 1st item').not.toHaveBeenCalled();
      expect(itemNodes[1].focus, 'Focus on 2nd item').not.toHaveBeenCalled();
      expect(itemNodes[2].focus, 'Focus on 3rd item').not.toHaveBeenCalled();
    });

    afterEach(function () {
      events.reset();
    });

    afterAll(function () {
      dropdown.release();
      document.body.removeChild(element);
    });
  });

  describe('Navigating focus with semantic markup', function () {
    let dropdown;
    let element;
    let itemNodes;
    let list;
    let trigger;

    const events = new EventManager();

    beforeAll(function () {
      element = document.createElement('div');
      element.classList.add('bx--dropdown');

      trigger = element.appendChild(document.createElement('button'));
      trigger.classList.add('bx--dropdown-text');
      list = element.appendChild(document.createElement('ul'));
      list.classList.add('bx--dropdown-list');

      itemNodes = [...new Array(3)].map((item, i) => {
        const itemContainerNode = document.createElement('li');
        itemContainerNode.dataset.option = '';
        itemContainerNode.classList.add('bx--dropdown-item');

        const itemNode = document.createElement('a');
        itemNode.textContent = i;
        itemNode.classList.add('bx--dropdown-link');
        itemNode.id = `item-${i}`;

        itemContainerNode.appendChild(itemNode);
        list.appendChild(itemContainerNode);
        return itemNode;
      });

      dropdown = new Dropdown(element);
      document.body.appendChild(element);
    });

    beforeEach(function () {
      itemNodes.forEach((item) => {
        item.parentElement.classList.remove('bx--dropdown--selected');
        item.classList.remove('bx--dropdown--focused');
        item.removeAttribute('hidden');
        item.parentNode.removeAttribute('hidden');
        item.removeAttribute('aria-hidden');
        item.parentNode.removeAttribute('aria-hidden');
      });
    });

    it('Should focus the first item with no selection', function () {
      trigger.click();
      expect(list.getAttribute('aria-activedescendant')).toBe(itemNodes[0].id);
      expect(
        itemNodes[0].classList.contains('bx--dropdown--focused'),
        'Focus on 1st item'
      ).toBe(true);
      expect(
        itemNodes[1].classList.contains('bx--dropdown--focused'),
        'Focus on 2nd item'
      ).toBe(false);
      expect(
        itemNodes[2].classList.contains('bx--dropdown--focused'),
        'Focus on 3rd item'
      ).toBe(false);
    });

    it('Should start with selection for forward navigation', function () {
      itemNodes[0].classList.add('bx--dropdown--selected');
      trigger.click();
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').toBe(true);
      expect(list.getAttribute('aria-activedescendant')).toBe(itemNodes[1].id);
      expect(
        itemNodes[0].classList.contains('bx--dropdown--focused'),
        'Focus on 1st item'
      ).toBe(false);
      expect(
        itemNodes[1].classList.contains('bx--dropdown--focused'),
        'Focus on 2nd item'
      ).toBe(true);
      expect(
        itemNodes[2].classList.contains('bx--dropdown--focused'),
        'Focus on 3rd item'
      ).toBe(false);
    });

    it('Should start with selection for backward navigation', function () {
      itemNodes[2].parentElement.classList.add('bx--dropdown--selected');
      trigger.click();
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 38,
        })
      );
      expect(defaultPrevented, 'Canceling event').toBe(true);
      expect(list.getAttribute('aria-activedescendant')).toBe(itemNodes[1].id);
      expect(
        itemNodes[0].classList.contains('bx--dropdown--focused'),
        'Focus on 1st item'
      ).toBe(false);
      expect(
        itemNodes[1].classList.contains('bx--dropdown--focused'),
        'Focus on 2nd item'
      ).toBe(true);
      expect(
        itemNodes[2].classList.contains('bx--dropdown--focused'),
        'Focus on 3rd item'
      ).toBe(false);
    });

    it('Should handle overflow for forward navigation', function () {
      itemNodes[2].parentElement.classList.add('bx--dropdown--selected');
      trigger.click();
      const defaultPrevented = !element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          which: 40,
        })
      );
      expect(defaultPrevented, 'Canceling event').toBe(true);
      expect(list.getAttribute('aria-activedescendant')).toBe(itemNodes[0].id);
      expect(
        itemNodes[0].classList.contains('bx--dropdown--focused'),
        'Focus on 1st item'
      ).toBe(true);
      expect(
        itemNodes[1].classList.contains('bx--dropdown--focused'),
        'Focus on 2nd item'
      ).toBe(false);
      expect(
        itemNodes[2].classList.contains('bx--dropdown--focused'),
        'Focus on 3rd item'
      ).toBe(false);
    });

    it('Should handle underflow for backward navigation', function () {
      itemNodes[0].classList.add('bx--dropdown--selected');
      trigger.click();
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 38 })
      );
      expect(list.getAttribute('aria-activedescendant')).toBe(itemNodes[2].id);
      expect(
        itemNodes[0].classList.contains('bx--dropdown--focused'),
        'Focus on 1st item'
      ).toBe(false);
      expect(
        itemNodes[1].classList.contains('bx--dropdown--focused'),
        'Focus on 2nd item'
      ).toBe(false);
      expect(
        itemNodes[2].classList.contains('bx--dropdown--focused'),
        'Focus on 3rd item'
      ).toBe(true);
    });

    afterEach(function () {
      events.reset();
      trigger.click();
    });

    afterAll(function () {
      dropdown.release();
      document.body.removeChild(element);
    });
  });

  describe('Navigating focus with show selected modifier', function () {
    let dropdown;
    let element;
    let itemNodes;
    let list;
    let trigger;

    const events = new EventManager();

    beforeAll(function () {
      element = document.createElement('div');
      element.classList.add('bx--dropdown', 'bx--dropdown--show-selected');

      trigger = element.appendChild(document.createElement('button'));
      trigger.classList.add('bx--dropdown-text');
      list = element.appendChild(document.createElement('ul'));
      list.classList.add('bx--dropdown-list');

      itemNodes = [...new Array(3)].map((item, i) => {
        const itemContainerNode = document.createElement('li');
        itemContainerNode.dataset.option = '';
        itemContainerNode.classList.add('bx--dropdown-item');

        const itemNode = document.createElement('a');
        itemNode.textContent = i;
        itemNode.classList.add('bx--dropdown-link');
        itemNode.id = `item-${i}`;

        itemContainerNode.appendChild(itemNode);
        list.appendChild(itemContainerNode);
        return itemNode;
      });

      dropdown = new Dropdown(element);
      document.body.appendChild(element);
    });

    beforeEach(function () {
      itemNodes.forEach((item) => {
        item.parentElement.classList.remove('bx--dropdown--selected');
        item.classList.remove('bx--dropdown--focused');
        item.removeAttribute('hidden');
        item.parentNode.removeAttribute('hidden');
        item.removeAttribute('aria-hidden');
        item.parentNode.removeAttribute('aria-hidden');
      });
    });

    it('Should focus selected item with forward navigation', function () {
      itemNodes[1].parentElement.classList.add('bx--dropdown--selected');
      trigger.click();

      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          // user presses up
          which: 38,
        })
      );
      // Verify the navigation worked
      expect(
        itemNodes[0].classList.contains('bx--dropdown--focused'),
        'Focus on 1st item'
      ).toBe(true);
      expect(
        itemNodes[1].classList.contains('bx--dropdown--focused'),
        'Focus on 2nd item'
      ).toBe(false);
      expect(
        itemNodes[2].classList.contains('bx--dropdown--focused'),
        'Focus on 3rd item'
      ).toBe(false);

      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          // user presses down
          which: 40,
        })
      );
      // Verify that the selected item can be focused
      expect(
        itemNodes[0].classList.contains('bx--dropdown--focused'),
        'Focus on 1st item'
      ).toBe(false);
      expect(
        itemNodes[1].classList.contains('bx--dropdown--focused'),
        'Focus on 2nd item'
      ).toBe(true);
      expect(
        itemNodes[2].classList.contains('bx--dropdown--focused'),
        'Focus on 3rd item'
      ).toBe(false);
    });

    it('Should focus selected item with backward navigation', function () {
      itemNodes[1].parentElement.classList.add('bx--dropdown--selected');
      trigger.click();

      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          // user presses down
          which: 40,
        })
      );
      // Verify the navigation worked
      expect(
        itemNodes[0].classList.contains('bx--dropdown--focused'),
        'Focus on 1st item'
      ).toBe(false);
      expect(
        itemNodes[1].classList.contains('bx--dropdown--focused'),
        'Focus on 2nd item'
      ).toBe(false);
      expect(
        itemNodes[2].classList.contains('bx--dropdown--focused'),
        'Focus on 3rd item'
      ).toBe(true);

      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { cancelable: true }), {
          // user presses up
          which: 38,
        })
      );
      // Verify that the selected item can be focused
      expect(
        itemNodes[0].classList.contains('bx--dropdown--focused'),
        'Focus on 1st item'
      ).toBe(false);
      expect(
        itemNodes[1].classList.contains('bx--dropdown--focused'),
        'Focus on 2nd item'
      ).toBe(true);
      expect(
        itemNodes[2].classList.contains('bx--dropdown--focused'),
        'Focus on 3rd item'
      ).toBe(false);
    });

    afterEach(function () {
      events.reset();
      trigger.click();
    });

    afterAll(function () {
      dropdown.release();
      document.body.removeChild(element);
    });
  });

  describe('Close on blur', function () {
    let dropdown;
    let element;
    let input;

    beforeAll(function () {
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

    beforeEach(function () {
      dropdown.element.classList.add('bx--dropdown--open');
      element.querySelector('.bx--dropdown-link').focus();
    });

    it('Should close when dropdown loses focus', function () {
      input.focus();
      expect(dropdown.element.contains(document.activeElement)).toBe(false);
    });

    afterAll(function () {
      if (document.body.contains(input)) {
        document.body.removeChild(input);
      }
      dropdown.release();
      document.body.removeChild(element);
    });
  });

  describe('Managing instances: create() and release()', function () {
    let element;

    beforeAll(function () {
      element = document.createElement('a');
    });

    it('Should prevent creating duplicate instances', function () {
      let first;
      let second;
      try {
        first = Dropdown.create(element);
        second = Dropdown.create(element);
        expect(first).toBe(second);
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
        expect(first).not.toBe(second);
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
      expect(element.classList.contains('bx--dropdown--open')).toBe(true);
    });

    afterEach(function () {
      if (document.body.contains(element)) {
        document.body.removeChild(element);
      }
    });
  });
});
