import '../utils/es6-weak-map-global'; // For PhantomJS
import '../../demo/polyfills/custom-event';
import Accordion from '../../src/components/accordion/accordion';

const HTML = `
<ul data-accordion class="bx--accordion">
  <li tabindex="0" data-accordion-item class="bx--accordion__item">
    <div class="bx--accordion__heading">
      <svg class="bx--accordion__arrow">
        <use xlink:href="https://dev-console.stage1.ng.bluemix.net/api/v5/img/bluemix-icons.svg#chevron--right"></use>
      </svg>
      <p class="bx--accordion__title">Label</p>
    </div>
    <div class="bx--accordion__content">
      <p>Lorem ipsum dolor sit amet, elit, et dolore magna aliqua. Ut enim ad minim veniam, laboris nisi ut.</p>
    </div>
  </li>
</ul>
`;

describe('Test accordion', function () {
  describe('Constructor', function () {
    it('Should throw if root element is not given', function () {
      expect(() => {
        new Accordion();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        new Accordion(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('Clicking list item', function () {
    let listItem;
    const container = document.createElement('div');
    container.innerHTML = HTML;

    before(function () {
      document.body.appendChild(container);
      new Accordion(document.querySelector('[data-accordion]'));
      listItem = document.querySelector('[data-accordion-item]');
    });

    it('Should set active state on click', function () {
      listItem.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(listItem.classList.contains('bx--accordion__item--active')).to.be.true;
    });

    it('Should remove active state on second click', function () {
      listItem.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(listItem.classList.contains('bx--accordion__item--active')).to.be.false;
    });

    after(function () {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });
  });

  describe('Keypress list item', function () {
    let accordion; //eslint-disable-line
    let listItem;
    const container = document.createElement('div');
    container.innerHTML = HTML;

    before(function () {
      document.body.appendChild(container);
      accordion = new Accordion(document.querySelector('[data-accordion]'));
      listItem = document.querySelector('[data-accordion-item]');
    });

    it('Should not set active state on other keypress', function () {
      const event = new CustomEvent('keypress', { bubbles: true });
      event.keyCode = 86;
      listItem.dispatchEvent(event);
      expect(listItem.classList.contains('bx--accordion__item--active')).to.be.false;
    });

    it('Should set active state on enter or spacebar press', function () {
      const event = new CustomEvent('keypress', { bubbles: true });
      event.keyCode = 32;
      listItem.dispatchEvent(event);
      expect(listItem.classList.contains('bx--accordion__item--active')).to.be.true;
    });

    it('Should remove active state on second enter or spacebar press', function () {
      const event = new CustomEvent('keypress', { bubbles: true });
      event.keyCode = 32;
      listItem.dispatchEvent(event);
      expect(listItem.classList.contains('bx--accordion__item--active')).to.be.false;
    });

    after(function () {
      accordion.release();
      document.body.removeChild(container);
    });
  });
});
