import '../utils/es6-weak-map-global'; // For PhantomJS
import '../../demo/polyfills/custom-event';
import Accordion from '../../src/components/accordion/accordion';

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
    let accordion;
    let element;
    let listItem;

    before(function () {
      element = document.createElement('ul');
      listItem = document.createElement('li');
      element.classList.add('bx--accordion');
      listItem.classList.add('bx--accordion__item');
      listItem.dataset.accordionItem = '';
      element.appendChild(listItem);
      accordion = new Accordion(element);
      document.body.appendChild(element);
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
      accordion.release();
      document.body.removeChild(element);
    });
  });

  describe('Keypress list item', function () {
    let accordion;
    let element;
    let listItem;

    before(function () {
      element = document.createElement('ul');
      listItem = document.createElement('li');
      element.classList.add('bx--accordion');
      listItem.classList.add('bx--accordion__item');
      listItem.dataset.accordionItem = '';
      element.appendChild(listItem);
      accordion = new Accordion(element);
      document.body.appendChild(element);
    });

    it('Should not set active state on other keypress', function () {
      listItem.dispatchEvent(Object.assign(new CustomEvent('keypress'), { keyCode: 86 }));
      expect(listItem.classList.contains('bx--accordion__item--active')).to.be.false;
    });

    it('Should set active state on enter or spacebar press', function () {
      listItem.dispatchEvent(Object.assign(new CustomEvent('keypress'), { keyCode: 32 }));
      expect(listItem.classList.contains('bx--accordion__item--active')).to.be.true;
    });

    it('Should remove active state on second enter or spacebar press', function () {
      listItem.dispatchEvent(Object.assign(new CustomEvent('keypress'), { keyCode: 32 }));
      expect(listItem.classList.contains('bx--accordion__item--active')).to.be.false;
    });

    after(function () {
      accordion.release();
      document.body.removeChild(element);
    });
  });
});
