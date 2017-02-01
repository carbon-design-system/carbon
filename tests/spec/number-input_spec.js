import '../utils/es6-weak-map-global'; // For PhantomJS
import '../../demo/polyfills/custom-event';
import Promise from 'bluebird'; // For testing on browsers not supporting Promise
import EventManager from '../utils/event-manager';
import NumberInput from '../../src/components/number-input/number-input';

const HTML = `
  <div data-numberinput class="bx--number">
    <input type="number" min="0" max="100" value="1">
    <div class="bx--number__icon-wrapper">
      <svg class="up-icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://dev-console.stage1.ng.bluemix.net/api/v5/img/bluemix-icons.svg#caret--up"></use>
      </svg>
      <svg class="down-icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://dev-console.stage1.ng.bluemix.net/api/v5/img/bluemix-icons.svg#caret--down"></use>
      </svg>
    </div>
  </div>
`;

describe('Test Number Input', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new NumberInput();
      }).to.throw(Error);
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new NumberInput(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('Adding and Subtracting', function () {
    let element;
    let instance;
    let inputNode;
    let container;
    const events = new EventManager();

    before(function () {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-numberinput]');
      instance = new NumberInput(element);
      inputNode = document.querySelector('input');
      inputNode.value = '0';
    });

    it(`Should increase the value`, async function () {
      const upArrowNode = document.querySelector('.up-icon');
      const e = await new Promise((resolve) => {
        events.on(document.body, 'change', resolve);
        upArrowNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      });
      expect(e.cancelable).to.be.false;
      expect(inputNode.value).to.equal('1');
    });

    it(`Should decrease the value`, async function () {
      const downArrowNode = document.querySelector('.down-icon');
      inputNode.value = '1';
      const e = await new Promise((resolve) => {
        events.on(document.body, 'change', resolve);
        downArrowNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      });
      expect(e.cancelable).to.be.false;
      expect(inputNode.value).to.equal('0');
    });

    afterEach(function () {
      events.reset();
    });

    after(function () {
      document.body.removeChild(container);
      instance.release();
    });
  });

  describe('Managing instances', function () {
    let element;

    before(function () {
      document.body.innerHTML = HTML;
      element = document.querySelector('[data-numberinput]');
    });

    it('Should prevent creating duplicate instances', function () {
      let first;
      let second;
      try {
        first = NumberInput.create(element);
        second = NumberInput.create(element);
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
        first = NumberInput.create(element);
        first.release();
        second = NumberInput.create(element);
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
