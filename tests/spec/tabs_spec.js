import Tab from '../../src/components/tabs/tabs';

describe('Test tabs', function() {
  describe('Constructor', function() {
    it('Should set default options', function() {
      const stubUpdateTriggerText = sinon.stub(Tab.prototype, '_updateTriggerText');
      try {
        const tab = new Tab(document.createElement('div'));
        expect(tab.options).to.deep.equal({
          selectorInit: '[data-tabs]',
          selectorMenu: '.bx--tabs__nav',
          selectorTrigger: '.bx--tabs-trigger',
          selectorTriggerText: '.bx--tabs-trigger-text',
          selectorButton: '.bx--tabs__nav-item',
          selectorButtonSelected: '.bx--tabs__nav-item--selected',
          selectorLink: '.bx--tabs__nav-link',
          classActive: 'bx--tabs__nav-item--selected',
          classHidden: 'bx--tabs__nav--hidden',
          eventBeforeSelected: 'tab-beingselected',
          eventAfterSelected: 'tab-selected',
        });
      } finally {
        stubUpdateTriggerText.restore();
      }
    });

    it('Should initialize currently selected tab item for narrow screen', function() {
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
      expect(triggerTextNode.textContent).to.equal('0');
    });

    it('Should deal with a condition with no selected item when constructor runs', function() {
      const element = document.createElement('div');
      const buttonNode = document.createElement('div');
      buttonNode.classList.add('bx--tabs__nav-item');
      element.appendChild(buttonNode);
      expect(() => {
        new Tab(element);
      }).to.not.throw(Error);
    });
  });

  describe('Toggling drop down for narrow screen', function() {
    let stubUpdateTriggerText;
    let element;
    let triggerNode;
    let menuNode;

    before(function() {
      stubUpdateTriggerText = sinon.stub(Tab.prototype, '_updateTriggerText');

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

    it('Should show drop down upon hitting trigger button', function() {
      menuNode.classList.add('bx--tabs__nav--hidden');
      triggerNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(menuNode.classList.contains('bx--tabs__nav--hidden')).to.be.false;
    });

    it('Should hide drop down upon hitting trigger button', function() {
      triggerNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(menuNode.classList.contains('bx--tabs__nav--hidden')).to.be.true;
    });

    afterEach(function() {
      menuNode.classList.remove('bx--tabs__nav--hidden');
    });

    after(function() {
      document.body.removeChild(element);
      stubUpdateTriggerText.restore();
    });
  });

  describe('Setting active tab', function() {
    let stubUpdateMenuState;
    let element;
    let buttonNodes;
    let triggerTextNode;

    before(function() {
      stubUpdateMenuState = sinon.stub(Tab.prototype, '_updateMenuState');

      triggerTextNode = document.createElement('div');
      triggerTextNode.classList.add('bx--tabs-trigger-text');

      element = document.createElement('div');
      element.appendChild(triggerTextNode);

      document.body.appendChild(element);

      buttonNodes = [...new Array(2)].map((item, i) => {
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

    beforeEach(function() {
      buttonNodes.forEach((buttonNode, i) => {
        buttonNode.classList[i === 0 ? 'add' : 'remove']('bx--tabs__nav-item--selected');
      });
    });

    it('Should update active tab upon clicking', function() {
      buttonNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(buttonNodes[0].classList.contains('bx--tabs__nav-item--selected')).to.be.false;
      expect(buttonNodes[1].classList.contains('bx--tabs__nav-item--selected')).to.be.true;
    });

    it('Should update currently selected tab item for narrow screen', function() {
      buttonNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(triggerTextNode.textContent).to.equal(buttonNodes[1].textContent);
    });

    it('Should update active tab upon right key', function() {
      const defaultPrevented = element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 39 }));
      expect(defaultPrevented).to.be.true;
      expect(buttonNodes[0].classList.contains('bx--tabs__nav-item--selected')).to.be.false;
      expect(buttonNodes[1].classList.contains('bx--tabs__nav-item--selected')).to.be.true;
    });

    it('Should handle out of range index', function() {
      element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 39 }));
      element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 39 }));
      expect(buttonNodes[0].classList.contains('bx--tabs__nav-item--selected')).to.be.true;
      expect(buttonNodes[1].classList.contains('bx--tabs__nav-item--selected')).to.be.false;
    });

    it('Should update active tab upon left key', function() {
      const defaultPrevented = element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 37 }));
      expect(defaultPrevented).to.be.true;
      expect(buttonNodes[0].classList.contains('bx--tabs__nav-item--selected')).to.be.false;
      expect(buttonNodes[1].classList.contains('bx--tabs__nav-item--selected')).to.be.true;
    });

    it('Should focus on the new active tab upon keyboard navigation', function() {
      const link = document.createElement('a');
      const spyFocus = sinon.spy(link, 'focus');
      link.classList.add('bx--tabs__nav-link');
      buttonNodes[1].appendChild(link);
      try {
        element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 39 }));
        expect(spyFocus).to.be.calledOnce;
      } finally {
        spyFocus.restore();
        buttonNodes[1].removeChild(link);
      }
    });

    after(function() {
      document.body.removeChild(element);
      stubUpdateMenuState.restore();
    });
  });
});
