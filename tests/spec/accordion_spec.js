import 'core-js/modules/es6.weak-map'; // For PhantomJS
import Accordion from '../../src/components/accordion/accordion';
import HTML from '../../src/components/accordion/accordion.html';

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

    it('Should set default options', function () {
      const instance = new Accordion(document.createElement('div'));
      expect(instance.options).to.deep.equal({
        selectorInit: '[data-accordion]',
        selectorAccordionItem: '.bx--accordion__item',
        selectorAccordionContent: '.bx--accordion__content',
        classActive: 'bx--accordion__item--active',
      });
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
      event.which = 86;
      listItem.dispatchEvent(event);
      expect(listItem.classList.contains('bx--accordion__item--active')).to.be.false;
    });

    it('Should set active state on enter or spacebar press', function () {
      const event = new CustomEvent('keypress', { bubbles: true });
      event.which = 13;
      listItem.dispatchEvent(event);
      expect(listItem.classList.contains('bx--accordion__item--active')).to.be.true;
    });

    it('Should remove active state on second enter or spacebar press', function () {
      const event = new CustomEvent('keypress', { bubbles: true });
      event.which = 13;
      listItem.dispatchEvent(event);
      expect(listItem.classList.contains('bx--accordion__item--active')).to.be.false;
    });

    after(function () {
      accordion.release();
      document.body.removeChild(container);
    });
  });
});
