import Tab from '../../src/components/tabs/tabs';
import flattenOptions from '../utils/flatten-options';

describe('Test tabs', function () {
  describe('Constructor', function () {
    it('Should set default options', function () {
      spyOn(Tab.prototype, '_updateTriggerText');
      const tab = new Tab(document.createElement('div'));
      expect(flattenOptions(tab.options)).toEqual({
        selectorInit: '[data-tabs]',
        selectorMenu: '.bx--tabs__nav',
        selectorTrigger: '.bx--tabs-trigger',
        selectorTriggerText: '.bx--tabs-trigger-text',
        selectorButton: '.bx--tabs__nav-item',
        selectorButtonEnabled:
          '.bx--tabs__nav-item:not(.bx--tabs__nav-item--disabled)',
        selectorButtonSelected: '.bx--tabs__nav-item--selected',
        selectorLink: '.bx--tabs__nav-link',
        classActive: 'bx--tabs__nav-item--selected',
        classHidden: 'bx--tabs__nav--hidden',
        classOpen: 'bx--tabs-trigger--open',
        classButtonDisabled: `bx--tabs__nav-item--disabled`,
        eventBeforeSelected: 'tab-beingselected',
        eventAfterSelected: 'tab-selected',
      });
    });

    it('Should initialize currently selected tab item for narrow screen', function () {
      const triggerTextNode = document.createElement('div');
      triggerTextNode.classList.add('bx--tabs-trigger-text');

      const element = document.createElement('div');
      element.appendChild(triggerTextNode);

      [...new Array(2)].forEach((item, i) => {
        const buttonNode = document.createElement('div');
        buttonNode.classList.add('bx--tabs__nav-item');
        if (i === 0) {
          buttonNode.classList.add('bx--tabs__nav-item--selected');
        }
        buttonNode.textContent = i;
        element.appendChild(buttonNode);
      });

      new Tab(element);
      expect(triggerTextNode.textContent).toBe('0');
    });

    it('Should deal with a condition with no selected item when constructor runs', function () {
      const element = document.createElement('div');
      const buttonNode = document.createElement('div');
      buttonNode.classList.add('bx--tabs__nav-item');
      element.appendChild(buttonNode);
      expect(() => {
        new Tab(element);
      }).not.toThrowError(Error);
    });
  });

  describe('Toggling drop down for narrow screen', function () {
    let element;
    let triggerNode;
    let menuNode;

    beforeAll(function () {
      spyOn(Tab.prototype, '_updateTriggerText');

      triggerNode = document.createElement('div');
      triggerNode.classList.add('bx--tabs-trigger');

      menuNode = document.createElement('div');
      menuNode.classList.add('bx--tabs__nav');

      element = document.createElement('div');
      element.appendChild(triggerNode);
      element.appendChild(menuNode);

      document.body.appendChild(element);

      new Tab(element);
    });

    it('Should show drop down upon hitting trigger button', function () {
      menuNode.classList.add('bx--tabs__nav--hidden');
      triggerNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(menuNode.classList.contains('bx--tabs__nav--hidden')).toBe(false);
      expect(triggerNode.classList.contains('bx--tabs-trigger--open')).toBe(
        true
      );
    });

    it('Should hide drop down upon hitting trigger button', function () {
      triggerNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(menuNode.classList.contains('bx--tabs__nav--hidden')).toBe(true);
      expect(triggerNode.classList.contains('bx--tabs-trigger--open')).toBe(
        false
      );
    });

    afterEach(function () {
      menuNode.classList.remove('bx--tabs__nav--hidden');
    });

    afterAll(function () {
      document.body.removeChild(element);
    });
  });

  describe('Setting active tab', function () {
    let element;
    let buttonNodes;
    let triggerTextNode;

    beforeAll(function () {
      spyOn(Tab.prototype, '_updateMenuState');

      triggerTextNode = document.createElement('div');
      triggerTextNode.classList.add('bx--tabs-trigger-text');

      element = document.createElement('div');
      element.appendChild(triggerTextNode);

      document.body.appendChild(element);

      buttonNodes = [...new Array(3)].map((item, i) => {
        const buttonNode = document.createElement('button');
        buttonNode.classList.add('bx--tabs__nav-item');
        buttonNode.textContent = i;
        if (i === 0) {
          buttonNode.classList.add('bx--tabs__nav-item--selected');
        }
        return element.appendChild(buttonNode);
      });

      new Tab(element);
    });

    beforeEach(function () {
      buttonNodes.forEach((buttonNode, i) => {
        buttonNode.classList.remove('bx--tabs__nav-item--disabled');
        buttonNode.classList[i === 0 ? 'add' : 'remove'](
          'bx--tabs__nav-item--selected'
        );
      });
    });

    it('Should update active tab upon clicking', function () {
      buttonNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(
        buttonNodes[0].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(false);
      expect(
        buttonNodes[1].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(true);
      expect(
        buttonNodes[2].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(false);
    });

    it('Should skip disabled tab upon right key', function () {
      buttonNodes[1].classList.add('bx--tabs__nav-item--disabled');
      const defaultPrevented = element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 39 })
      );
      expect(defaultPrevented).toBe(true);
      expect(
        buttonNodes[0].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(false);
      expect(
        buttonNodes[1].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(false);
      expect(
        buttonNodes[2].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(true);
    });

    it('Should avoid activating disabled tab on click', function () {
      buttonNodes[1].classList.add('bx--tabs__nav-item--disabled');
      buttonNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(
        buttonNodes[0].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(true);
      expect(
        buttonNodes[1].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(false);
      expect(
        buttonNodes[2].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(false);
    });

    it('Should update currently selected tab item for narrow screen', function () {
      buttonNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(triggerTextNode.textContent).toBe(buttonNodes[1].textContent);
    });

    it('Should update active tab upon right key', function () {
      const defaultPrevented = element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 39 })
      );
      expect(defaultPrevented).toBe(true);
      expect(
        buttonNodes[0].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(false);
      expect(
        buttonNodes[1].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(true);
      expect(
        buttonNodes[2].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(false);
    });

    it('Should handle out of range index', function () {
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 39 })
      );
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 39 })
      );
      element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 39 })
      );
      expect(
        buttonNodes[0].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(true);
      expect(
        buttonNodes[1].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(false);
      expect(
        buttonNodes[2].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(false);
    });

    it('Should update active tab upon left key', function () {
      const defaultPrevented = element.dispatchEvent(
        Object.assign(new CustomEvent('keydown'), { which: 37 })
      );
      expect(defaultPrevented).toBe(true);
      expect(
        buttonNodes[0].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(false);
      expect(
        buttonNodes[1].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(false);
      expect(
        buttonNodes[2].classList.contains('bx--tabs__nav-item--selected')
      ).toBe(true);
    });

    it('Should focus on the new active tab upon keyboard navigation', function () {
      const link = document.createElement('a');
      spyOn(link, 'focus');
      link.classList.add('bx--tabs__nav-link');
      buttonNodes[1].appendChild(link);
      try {
        element.dispatchEvent(
          Object.assign(new CustomEvent('keydown'), { which: 39 })
        );
        expect(link.focus).toHaveBeenCalledTimes(1);
      } finally {
        buttonNodes[1].removeChild(link);
      }
    });

    afterAll(function () {
      document.body.removeChild(element);
    });
  });
});
