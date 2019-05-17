import Accordion from '../../src/components/accordion/accordion';
import HTML from '../../html/accordion/accordion.html';
import LegacyHTML from '../../html/accordion/accordion--legacy.html';
import flattenOptions from '../utils/flatten-options';

describe('Test accordion', function() {
  describe('Constructor', function() {
    let instance;
    const container = document.createElement('div');
    container.innerHTML = HTML;

    beforeAll(function() {
      document.body.appendChild(container);
      instance = new Accordion(document.querySelector('[data-accordion]'));
    });

    it('Should throw if root element is not given', function() {
      expect(() => {
        new Accordion();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new Accordion(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should set default options', function() {
      expect(flattenOptions(instance.options)).toEqual({
        selectorInit: '[data-accordion]',
        selectorAccordionItem: '.bx--accordion__item',
        selectorAccordionItemHeading: '.bx--accordion__heading',
        selectorAccordionContent: '.bx--accordion__content',
        classActive: 'bx--accordion__item--active',
      });
    });

    afterAll(function() {
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

    beforeAll(function() {
      document.body.appendChild(container);
      new Accordion(document.querySelector('[data-accordion]'));
      listItem = document.querySelector('[data-accordion-item]');
      buttonItem = listItem.querySelector('.bx--accordion__heading');
    });

    it('Should set active state on click', function() {
      buttonItem.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(listItem.classList.contains('bx--accordion__item--active')).toBe(
        true
      );
    });

    it('Should remove active state on second click', function() {
      listItem.classList.add('bx--accordion__item--active');
      buttonItem.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(listItem.classList.contains('bx--accordion__item--active')).toBe(
        false
      );
    });

    afterAll(function() {
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

    beforeAll(function() {
      document.body.appendChild(container);
      accordion = new Accordion(document.querySelector('[data-accordion]'));
      listItem = document.querySelector('[data-accordion-item]');
    });

    it('Should not set active state on other keypress', function() {
      const event = new CustomEvent('keypress', { bubbles: true });
      event.which = 86;
      listItem.dispatchEvent(event);
      expect(listItem.classList.contains('bx--accordion__item--active')).toBe(
        false
      );
    });

    it('Should set active state on enter or spacebar press', function() {
      const event = new CustomEvent('keypress', { bubbles: true });
      event.which = 13;
      listItem.dispatchEvent(event);
      expect(listItem.classList.contains('bx--accordion__item--active')).toBe(
        true
      );
    });

    it('Should remove active state on second enter or spacebar press', function() {
      listItem.classList.add('bx--accordion__item--active');
      const event = new CustomEvent('keypress', { bubbles: true });
      event.which = 13;
      listItem.dispatchEvent(event);
      expect(listItem.classList.contains('bx--accordion__item--active')).toBe(
        false
      );
    });

    afterEach(function() {
      listItem.classList.remove('bx--accordion__item--active');
    });

    afterAll(function() {
      accordion.release();
      document.body.removeChild(container);
    });
  });
});
