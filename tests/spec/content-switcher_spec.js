import '../../consumables/js/polyfills/custom-event';
import Promise from 'bluebird'; // For testing on browsers not supporting Promise
import '../utils/es6-weak-map-global'; // For PhantomJS
import EventManager from '../utils/event-manager';
import promiseTryCatcher from '../utils/promise-try-catcher';
import ContentSwitcher from '../../consumables/js/es2015/content-switcher.js';

describe('Test content switcher', function () {
  describe('Constructor', function () {
    it(`Should set default options`, function () {
      const contentSwitcher = new ContentSwitcher(document.createElement('div'));
      expect(contentSwitcher.options).to.deep.equal({
        selectorButton: 'input[type="radio"]',
        selectorButtonSelected: 'input[type="radio"].bx--content-switcher--selected',
        classActive: 'bx--content-switcher--selected',
        eventBeforeSelected: 'content-switcher-beingselected',
        eventAfterSelected: 'content-switcher-selected',
      });
    });
  });

  describe('Setting active item', function () {
    let element;
    let buttonNodes;
    let paneNodes;
    let contentSwitcher;

    const id = `__element_${Math.random().toString(36).substr(2)}`;
    const events = new EventManager();

    before(function () {
      element = document.createElement('div');

      buttonNodes = [... new Array(2)].map((item, i) => {
        const buttonNode = document.createElement('input');
        buttonNode.type = 'radio';
        buttonNode.value = i;
        if (i === 0) {
          buttonNode.classList.add('bx--content-switcher--selected');
        }
        return element.appendChild(buttonNode);
      });

      (paneNodes = buttonNodes.map((buttonNode, i) => {
        return [... new Array(2)].map(() => {
          const paneNode = document.createElement('div');
          paneNode.className = `${id}_${i}`;
          return paneNode;
        });
      })).forEach((nodes) => {
        nodes.forEach((node) => document.body.appendChild(node));
      });

      document.body.appendChild(element);
      contentSwitcher = new ContentSwitcher(element);
    });

    beforeEach(function () {
      buttonNodes.forEach((buttonNode, i) => {
        buttonNode.classList[i === 0 ? 'add' : 'remove']('bx--content-switcher--selected');
      });
    });

    it(`Should update active item upon clicking`, function () {
      return new Promise((resolve, reject) => {
        events.on(element, 'content-switcher-selected', promiseTryCatcher((e) => {
          expect(e.detail.item).to.equal(buttonNodes[1]);
          expect(buttonNodes[0].classList.contains('bx--content-switcher--selected')).to.be.false;
          expect(buttonNodes[1].classList.contains('bx--content-switcher--selected')).to.be.true;
        }, resolve, reject));
        buttonNodes[1].dispatchEvent(new CustomEvent('click'));
      });
    });

    it(`Should provide a way to cancel switching item`, function () {
      events.on(element, 'content-switcher-beingselected', (e) => {
        expect(e.detail.item).to.equal(buttonNodes[1]);
        e.preventDefault();
      });
      buttonNodes[1].dispatchEvent(new CustomEvent('click'));
      expect(buttonNodes[0].classList.contains('bx--content-switcher--selected')).to.be.true;
      expect(buttonNodes[1].classList.contains('bx--content-switcher--selected')).to.be.false;
    });

    it(`Should select target pane`, function () {
      try {
        buttonNodes[1].dataset.target = `.${id}_1`;
        buttonNodes[1].dispatchEvent(new CustomEvent('click'));
        paneNodes[0].forEach((node) => expect(node.classList.contains('bx--content-switcher--selected')).to.be.false);
        paneNodes[1].forEach((node) => expect(node.classList.contains('bx--content-switcher--selected')).to.be.true);
      } finally {
        buttonNodes.forEach((buttonNode) => buttonNode.dataset.target = undefined);
      }
    });

    afterEach(function () {
      events.reset();
    });

    after(function () {
      contentSwitcher.release();
      paneNodes.forEach((nodes) => nodes.forEach((node) => document.body.removeChild(node)));
      document.body.removeChild(element);
    });
  });
});
