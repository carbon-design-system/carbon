import Accordion from '../../src/components/accordion/accordion';
import HTML from '../../src/components/accordion/accordion.html';
import LegacyHTML from '../../src/components/accordion/legacyaccordion.html';

describe('Test accordion', function() {
  describe('Constructor', function() {
    let instance;
    const container = document.createElement('div');
    container.innerHTML = HTML;

    before(function() {
      document.body.appendChild(container);
      instance = new Accordion(document.querySelector('[data-accordion]'));
    });

    it('Should throw if root element is not given', function() {
      expect(() => {
        new Accordion();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new Accordion(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('Should set default options', function() {
      expect(instance.options).to.deep.equal({
        selectorInit: '[data-accordion]',
        selectorAccordionItem: '.bx--accordion__item',
        selectorAccordionItemHeading: '.bx--accordion__heading',
        selectorAccordionContent: '.bx--accordion__content',
        classActive: 'bx--accordion__item--active',
      });
    });

    after(function() {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });
  });

  // Why no keyboard tests on the current markup? onClick actually
  // maps to the default action of an element - for interactive elements like
  // button, that's also enter + space. Keydown/keypress won't
  // trigger the event listener, as it's a different event

  describe('Clicking list item', function() {
    let listItem;
    let buttonItem;
    const container = document.createElement('div');
    container.innerHTML = HTML;

    before(function() {
      document.body.appendChild(container);
      new Accordion(document.querySelector('[data-accordion]'));
      listItem = document.querySelector('[data-accordion-item]');
      buttonItem = listItem.querySelector('.bx--accordion__heading');
    });

    it('Should set active state on click', function() {
      buttonItem.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(listItem.classList.contains('bx--accordion__item--active')).to.be.true;
    });

    it('Should remove active state on second click', function() {
      buttonItem.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(listItem.classList.contains('bx--accordion__item--active')).to.be.false;
    });

    after(function() {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });
  });

  // Only to ensure old markup still works as normal
  describe('Keypress legacy list item', function() {
    let accordion; //eslint-disable-line
    let listItem;
    const container = document.createElement('div');
    container.innerHTML = LegacyHTML;

    before(function() {
      document.body.appendChild(container);
      accordion = new Accordion(document.querySelector('[data-accordion]'));
      listItem = document.querySelector('[data-accordion-item]');
    });

    it('Should not set active state on other keypress', function() {
      const event = new CustomEvent('keypress', { bubbles: true });
      event.which = 86;
      listItem.dispatchEvent(event);
      expect(listItem.classList.contains('bx--accordion__item--active')).to.be.false;
    });

    it('Should set active state on enter or spacebar press', function() {
      const event = new CustomEvent('keypress', { bubbles: true });
      event.which = 13;
      listItem.dispatchEvent(event);
      expect(listItem.classList.contains('bx--accordion__item--active')).to.be.true;
    });

    it('Should remove active state on second enter or spacebar press', function() {
      const event = new CustomEvent('keypress', { bubbles: true });
      event.which = 13;
      listItem.dispatchEvent(event);
      expect(listItem.classList.contains('bx--accordion__item--active')).to.be.false;
    });

    after(function() {
      accordion.release();
      document.body.removeChild(container);
    });
  });
});
