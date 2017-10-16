import Promise, { promisify } from 'bluebird'; // For testing on browsers not supporting Promise
import EventManager from '../utils/event-manager';
import ContentSwitcher from '../../src/components/content-switcher/content-switcher';
import HTML from '../../src/components/content-switcher/content-switcher.html';

describe('Test content switcher', function() {
  describe('Constructor', function() {
    it('Should set default options', function() {
      const contentSwitcher = new ContentSwitcher(document.createElement('div'));
      expect(contentSwitcher.options).to.deep.equal({
        selectorInit: '[data-content-switcher]',
        selectorButton: 'input[type="radio"], .bx--content-switcher-btn',
        classActive: 'bx--content-switcher--selected',
        eventBeforeSelected: 'content-switcher-beingselected',
        eventAfterSelected: 'content-switcher-selected',
      });
    });
  });

  describe('_handleClick', function() {
    let instance;
    let element;
    let wrapper;
    let buttons;
    const events = new EventManager();

    beforeEach(function() {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-content-switcher]');
      instance = new ContentSwitcher(element);
      buttons = element.querySelectorAll('button');
    });

    it('Should be called on click', function() {
      const spy = sinon.spy(instance, '_handleClick');
      const event = new CustomEvent('click', { bubbles: true });
      buttons[1].dispatchEvent(event);
      expect(spy).to.have.been.called;
      spy.restore();
    });

    it('Should update active item upon clicking', function() {
      const event = new CustomEvent('click', { bubbles: true });
      buttons[1].dispatchEvent(event);
      expect(buttons[1].classList.contains(instance.options.classActive)).to.equal(true);
      expect(buttons[0].classList.contains(instance.options.classActive)).to.equal(false);
    });

    it('Should provide a way to cancel switching item upon clicking', async function() {
      const eventBeforeSelected = await new Promise(resolve => {
        events.on(element, 'content-switcher-beingselected', event => {
          event.preventDefault();
          resolve(event);
        });
        buttons[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      });
      expect(eventBeforeSelected.detail.item).to.equal(buttons[1]);
      expect(buttons[0].classList.contains('bx--content-switcher--selected')).to.be.true;
      expect(buttons[1].classList.contains('bx--content-switcher--selected')).to.be.false;
    });

    afterEach(function() {
      events.reset();
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('setActive', function() {
    let instance;
    let element;
    let wrapper;
    let buttons;
    const events = new EventManager();

    beforeEach(function() {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-content-switcher]');
      instance = new ContentSwitcher(element);
      buttons = element.querySelectorAll('button');
    });

    it('Should update selected item when using setActive method', function() {
      instance.setActive(buttons[1]);
      expect(buttons[0].classList.contains('bx--content-switcher--selected')).to.be.false;
      expect(buttons[1].classList.contains('bx--content-switcher--selected')).to.be.true;
    });

    it('Should update active item upon an API call', async function() {
      const item = await promisify(instance.setActive, { context: instance })(buttons[1]);
      expect(item).to.equal(buttons[1]);
      expect(buttons[0].classList.contains('bx--content-switcher--selected')).to.be.false;
      expect(buttons[1].classList.contains('bx--content-switcher--selected')).to.be.true;
    });

    it('Should provide a way to cancel switching item upon an API call', async function() {
      let errorBeforeSelected;
      let eventBeforeSelected;
      events.on(element, 'content-switcher-beingselected', event => {
        eventBeforeSelected = event;
        event.preventDefault();
      });
      try {
        await promisify(instance.setActive, { context: instance })(buttons[1]);
      } catch (error) {
        errorBeforeSelected = error;
      }
      expect(eventBeforeSelected.detail.item).to.equal(buttons[1]);
      expect(errorBeforeSelected.canceled).to.be.true;
      expect(errorBeforeSelected.item).to.equal(buttons[1]);
      expect(buttons[0].classList.contains('bx--content-switcher--selected')).to.be.true;
      expect(buttons[1].classList.contains('bx--content-switcher--selected')).to.be.false;
    });

    afterEach(function() {
      events.reset();
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('Panes', function() {
    let element;
    let buttonNodes;
    let paneNodes;
    let contentSwitcher;

    const id = `__element_${Math.random()
      .toString(36)
      .substr(2)}`;
    const events = new EventManager();

    before(function() {
      element = document.createElement('div');

      buttonNodes = [...new Array(2)].map((item, i) => {
        const buttonNode = document.createElement('input');
        buttonNode.type = 'radio';
        buttonNode.value = i;
        if (i === 0) {
          buttonNode.classList.add('bx--content-switcher--selected');
        }
        return element.appendChild(buttonNode);
      });

      // eslint-disable-next-line arrow-body-style
      (paneNodes = buttonNodes.map((buttonNode, i) => {
        return [...new Array(2)].map(() => {
          const paneNode = document.createElement('div');
          paneNode.className = `${id}_${i}`;
          return paneNode;
        });
      })).forEach(nodes => {
        nodes.forEach(node => {
          document.body.appendChild(node);
        });
      });

      document.body.appendChild(element);
      contentSwitcher = new ContentSwitcher(element);
    });

    beforeEach(function() {
      buttonNodes.forEach((buttonNode, i) => {
        buttonNode.classList[i === 0 ? 'add' : 'remove']('bx--content-switcher--selected');
      });
    });

    it('Should select target pane', function() {
      try {
        buttonNodes[0].dataset.target = `.${id}_0`;
        buttonNodes[1].dataset.target = `.${id}_1`;
        buttonNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
        paneNodes[0].forEach(node => {
          expect(node.getAttribute('hidden'), 'hidden of unselected item').to.exist;
        });
        paneNodes[1].forEach(node => {
          expect(node.getAttribute('hidden'), 'hidden of selected item').to.not.exist;
        });
      } finally {
        // eslint-disable-next-line no-param-reassign
        buttonNodes.forEach(buttonNode => {
          buttonNode.dataset.target = undefined;
        });
      }
    });

    afterEach(function() {
      events.reset();
    });

    after(function() {
      contentSwitcher.release();
      paneNodes.forEach(nodes => {
        nodes.forEach(node => {
          document.body.removeChild(node);
        });
      });
      document.body.removeChild(element);
    });
  });

  describe('Setting active item with link', function() {
    let element;
    let linkNodes;

    before(function() {
      element = document.createElement('div');

      document.body.appendChild(element);

      linkNodes = [...new Array(2)].map(() => {
        const buttonNode = document.createElement('button');
        const linkNode = document.createElement('a');
        buttonNode.appendChild(linkNode);
        element.appendChild(buttonNode);
        return linkNode;
      });

      new ContentSwitcher(element, {
        selectorButton: 'button',
        selectorLink: 'a',
      });
    });

    it('Should update active item upon clicking', function() {
      linkNodes[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(linkNodes[0].getAttribute('aria-selected')).to.equal('false');
      expect(linkNodes[1].getAttribute('aria-selected')).to.equal('true');
    });

    after(function() {
      document.body.removeChild(element);
    });
  });
});
