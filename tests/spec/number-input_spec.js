import '../utils/es6-weak-map-global'; // For PhantomJS
import '../../consumables/js/polyfills/custom-event';
import Promise from 'bluebird'; // For testing on browsers not supporting Promise
import EventManager from '../utils/event-manager';
import promiseTryCatcher from '../utils/promise-try-catcher';
import NumberInput from '../../consumables/js/es2015/number-input';

const HTML = `
  <div data-numberinput class="bx--number">
    <label for="numberinput-id" class="bx--form__label">Number input</label>
    <input id="numberinput-id" type="number" pattern="[0-9]*" step="1" min="0" max="10" value="0" class="bx--number__input" />
    <span class="bx--number__arrow--up">
      <svg class="icon--up">
        <use xlink:href="https://dev-console.stage1.ng.bluemix.net/api/v5/img/bluemix-icons.svg#caret--up"></use>
      </svg>
    </span>
    <span class="bx--number__arrow--down">
      <svg class="icon--down">
        <use xlink:href="https://dev-console.stage1.ng.bluemix.net/api/v5/img/bluemix-icons.svg#caret--down"></use>
      </svg>
    </span>
  </div>`;

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

    it(`Should increase the value`, function () {
      const upArrowNode = document.querySelector('.bx--number__arrow--up');

      return new Promise((resolve, reject) => {
        events.on(document.body, 'change', promiseTryCatcher((e) => {
          expect(e.cancelable).to.be.false;
          expect(inputNode.value).to.equal('1');
        }, resolve, reject));
        upArrowNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      });
    });

    it(`Should decrease the value`, function () {
      const downArrowNode = document.querySelector('.bx--number__arrow--down');
      inputNode.value = '1';

      return new Promise((resolve, reject) => {
        events.on(document.body, 'change', promiseTryCatcher((e) => {
          expect(e.cancelable).to.be.false;
          expect(inputNode.value).to.equal('0');
        }, resolve, reject));
        downArrowNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      });
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
