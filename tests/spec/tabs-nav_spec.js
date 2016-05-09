import '../utils/es6-weak-map-global'; // For PhantomJS
import '../../consumables/js/polyfills/custom-event';
import Tab from '../../consumables/js/es2015/tabs-nav';

describe('Test tabs', function () {
  describe('Constructor', function () {
    it(`Should set default options`, function () {
      const stubUpdateTriggerText = sinon.stub(Tab.prototype, 'updateTriggerText');
      try {
        const tab = new Tab(document.createElement('div'));
        expect(tab.options).to.deep.equal({
          selectorMenu: '.bx--tabs__nav',
          selectorTrigger: '.bx--tabs__trigger',
          selectorTriggerText: '.bx--tabs__trigger-text',
          selectorButton: '.bx--tabs__nav-item',
          selectorButtonSelected: '.bx--tabs__nav-item.bx--tabs--selected',
          classActive: 'bx--tabs--selected',
          classHidden: 'bx--tabs--hidden',
          eventBeforeSelected: 'tab-beingselected',
          eventAfterSelected: 'tab-selected',
        });
      } finally {
        stubUpdateTriggerText.restore();
      }
    });

    it(`Should initialize currently selected tab item for narrow screen`, function () {
      const triggerTextNode = document.createElement('div');
      triggerTextNode.classList.add('bx--tabs__trigger-text');

      const element = document.createElement('div');
      element.appendChild(triggerTextNode);

      [... new Array(2)].forEach((item, i) => {
        const buttonNode = document.createElement('div');
        buttonNode.classList.add('bx--tabs__nav-item');
        if (i === 0) {
          buttonNode.classList.add('bx--tabs--selected');
        }
        buttonNode.textContent = i;
        element.appendChild(buttonNode);
      });

      new Tab(element);
      expect(triggerTextNode.textContent).to.equal('0');
    });

    it(`Should deal with a condition with no selected item when constructor runs`, function () {
      const element = document.createElement('div');
      const buttonNode = document.createElement('div');
      buttonNode.classList.add('bx--tabs__nav-item');
      element.appendChild(buttonNode);
      expect(() => {
        new Tab(element);
      }).to.not.throw(Error);
    });
  });

  describe('Toggling drop down for narrow screen', function () {
    let stubUpdateTriggerText;
    let triggerNode;
    let menuNode;

    before(function () {
      stubUpdateTriggerText = sinon.stub(Tab.prototype, 'updateTriggerText');

      triggerNode = document.createElement('div');
      triggerNode.classList.add('bx--tabs__trigger');

      menuNode = document.createElement('div');
      menuNode.classList.add('bx--tabs__nav');

      const element = document.createElement('div');
      element.appendChild(triggerNode);
      element.appendChild(menuNode);

      new Tab(element);
    });

    it(`Should show drop down upon hitting trigger button`, function () {
      menuNode.classList.add('bx--tabs--hidden');
      triggerNode.dispatchEvent(new CustomEvent('click'));
      expect(menuNode.classList.contains('bx--tabs--hidden')).to.be.false;
    });

    it(`Should hide drop down upon hitting trigger button`, function () {
      triggerNode.dispatchEvent(new CustomEvent('click'));
      expect(menuNode.classList.contains('bx--tabs--hidden')).to.be.true;
    });

    afterEach(function () {
      menuNode.classList.remove('bx--tabs--hidden');
    });

    after(function () {
      stubUpdateTriggerText.restore();
    });
  });

  describe('Setting active tab', function () {
    let stubUpdateMenuState;
    let buttonNodes;
    let triggerTextNode;

    before(function () {
      stubUpdateMenuState = sinon.stub(Tab.prototype, 'updateMenuState');

      triggerTextNode = document.createElement('div');
      triggerTextNode.classList.add('bx--tabs__trigger-text');

      const element = document.createElement('div');
      element.appendChild(triggerTextNode);

      buttonNodes = [... new Array(2)].map((item, i) => {
        const buttonNode = document.createElement('a');
        buttonNode.classList.add('bx--tabs__nav-item');
        buttonNode.textContent = i;
        if (i === 0) {
          buttonNode.classList.add('bx--tabs--selected');
        }
        return element.appendChild(buttonNode);
      });

      new Tab(element);
    });

    beforeEach(function () {
      buttonNodes.forEach((buttonNode, i) => {
        buttonNode.classList[i === 0 ? 'add' : 'remove']('bx--tabs--selected');
      });
    });

    it(`Should update active tab upon clicking`, function () {
      buttonNodes[1].dispatchEvent(new CustomEvent('click'));
      expect(buttonNodes[0].classList.contains('bx--tabs--selected')).to.be.false;
      expect(buttonNodes[1].classList.contains('bx--tabs--selected')).to.be.true;
    });

    it(`Should update currently selected tab item for narrow screen`, function () {
      buttonNodes[1].dispatchEvent(new CustomEvent('click'));
      expect(triggerTextNode.textContent).to.equal(buttonNodes[1].textContent);
    });

    after(function () {
      stubUpdateMenuState.restore();
    });
  });
});
