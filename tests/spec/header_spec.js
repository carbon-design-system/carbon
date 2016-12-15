import '../../consumables/js/polyfills/object-assign';
import '../../consumables/js/polyfills/custom-event';
import Promise from 'bluebird'; // For testing on browsers not supporting Promise
import { delay } from 'bluebird';
import '../utils/es6-weak-map-global'; // For PhantomJS
import EventManager from '../utils/event-manager';
import HeaderNav from '../../consumables/js/es2015/header';

describe('Test header', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new HeaderNav(); // eslint-disable-line no-new
      }).to.throw(Error);
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new HeaderNav(document.createTextNode('')); // eslint-disable-line no-new
      }).to.throw(Error);
    });

    it(`Should set default options`, function () {
      const element = document.createElement('div');
      const nav = new HeaderNav(element);
      expect(nav.options).to.deep.equal({
        selectorInit: '[data-nav]',
        attribInitTarget: 'data-nav-target',
        selectorTriggerLabel: '.current-taxonomy',
        classActive: 'taxonomy-nav--active',
        selectorMenu: '.taxonomy-menu',
        selectorItem: '.taxonomy-item',
        selectorItemLink: '.taxonomy-item--taxonomy-menu',
        selectorLabel: '.taxonomy-item__label',
        eventBeforeShown: 'header-beingshown',
        eventAfterShown: 'header-shown',
        eventBeforeHidden: 'header-beinghidden',
        eventAfterHidden: 'header-hidden',
        eventBeforeSelected: 'header-beingselected',
        eventAfterSelected: 'header-selected',
      });
    });
  });

  describe('Hiding header nav', function () {
    let element;
    let headerNav;

    const events = new EventManager();

    before(function () {
      element = document.createElement('div');
      document.body.appendChild(element);

      headerNav = new HeaderNav(element);
      headerNav.triggerNode = { focus: sinon.spy() };
    });

    beforeEach(function () {
      element.classList.add('taxonomy-nav--active');
    });

    it(`Should handle ESC key`, async function () {
      await new Promise((resolve) => {
        events.on(element, 'header-hidden', resolve);
        element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 27 }));
      });
      expect(headerNav.triggerNode.focus).have.been.calledOnce;
    });

    it(`Shouldn't handle non-ESC key`, async function () {
      const spyHiddenEvent = sinon.spy();
      events.on(element, 'header-hidden', spyHiddenEvent);
      element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 32 }));
      await delay(200);
      expect(spyHiddenEvent).not.have.been.called;
    });

    it(`Should provide a way to cancel hiding nav`, async function () {
      events.on(element, 'header-beinghidden', (e) => {
        e.preventDefault();
      });

      const spyHidden = sinon.spy();
      events.on(element, 'header-hidden', spyHidden);
      element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 27 }));

      await delay(200);

      expect(spyHidden).not.have.been.called;
      expect(headerNav.triggerNode.focus).not.have.been.called;
    });

    afterEach(function () {
      headerNav.triggerNode.focus.reset();
      events.reset();
    });

    after(function () {
      document.body.removeChild(element);
    });
  });

  describe('Selection', function () {
    it(`Should select header nav item upon clicking`, async function () {
      const element = document.createElement('div');
      const itemsNodes = [... new Array(2)].map((item, i) => {
        const itemNode = document.createElement('div');
        itemNode.classList.add('taxonomy-item');
        if (i === 0) {
          itemNode.classList.add('selected');
        }

        const itemLinkNode = document.createElement('a');
        itemLinkNode.classList.add('taxonomy-item--taxonomy-menu');
        itemNode.appendChild(itemLinkNode);

        element.appendChild(itemNode);
        return itemNode;
      });

      new HeaderNav(element); // eslint-disable-line no-new

      const e = await new Promise((resolve) => {
        element.addEventListener('header-selected', resolve);
        itemsNodes[1].firstChild.dispatchEvent(new CustomEvent('click'));
      });

      expect(e.detail.itemElement).to.equal(itemsNodes[1].firstChild);
      expect(itemsNodes.map((itemNode) => itemNode.classList.contains('selected'))).to.deep.equal([false, true]);
    });
  });

  describe('Factory-based creation', function () {
    it(`Should have create() prevent duplicate HeaderNav instances for the same element`, function () {
      const element = document.createElement('div');
      const spyQuerySelector = sinon.spy(element, 'querySelector');

      HeaderNav.create(element);
      HeaderNav.create(element);

      expect(spyQuerySelector).have.been.calledOnce;
      expect(spyQuerySelector).have.been.calledWith('.taxonomy-menu');
    });
  });

  describe('Automatic creation', function () {
    let context;
    let element;
    let target;
    let spyFocus;

    const events = new EventManager();

    before(function () {
      context = HeaderNav.init();
    });

    it(`Should do nothing if there is none of a button's target taxonomy menu upon button click`, function () {
      element = document.createElement('a');
      document.body.appendChild(element);
      expect(element.dispatchEvent(new CustomEvent('click', { bubbles: true }))).to.be.true;
    });

    it(`Should throw if there are more than one of a button's target taxonomy menu`, function () {
      const className = `__element_${Math.random().toString(36).substr(2)}`;
      element = document.createElement('a');
      element.dataset.navTarget = `.${className}`;

      const targets = [... new Array(2)].map(() => {
        const item = document.createElement('div');
        item.className = className;
        item.style.width = item.style.height = '200px';
        return item;
      });

      document.body.appendChild(element);

      try {
        targets.forEach((item) => document.body.appendChild(item));
        expect(() => {
          element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        }).to.throw;
      } finally {
        targets.forEach((item) => document.body.removeChild(item));
      }
    });

    it(`Should launch taxonomy menu upon button click`, async function () {
      const id = `__element_${Math.random().toString(36).substr(2)}`;
      element = document.createElement('a');
      element.dataset.navTarget = `#${id}`;

      target = document.createElement('div');
      target.setAttribute('id', id);
      target.style.width = target.style.height = '200px';

      const targetMenu = document.createElement('div');
      targetMenu.classList.add('taxonomy-menu');
      target.appendChild(targetMenu);

      spyFocus = sinon.spy(targetMenu, 'focus');

      document.body.appendChild(element);
      document.body.appendChild(target);

      let eventBeforeShown;

      await new Promise((resolve) => {
        events.on(target, 'header-beingshown', (e) => {
          eventBeforeShown = e;
        });
        events.on(target, 'header-shown', resolve);
        expect(element.dispatchEvent(new CustomEvent('click', { bubbles: true, cancelable: true }))).to.be.false;
        expect(HeaderNav.components.has(target)).to.be.true;
      });

      await delay(0);

      expect(eventBeforeShown.detail.launchingElement).to.equal(element);
      expect(spyFocus).have.been.calledOnce;
    });

    it(`Should handle header nav's button for closing header nav`, async function () {
      const id = `__element_${Math.random().toString(36).substr(2)}`;
      element = document.createElement('a');
      element.dataset.navTarget = `#${id}`;

      target = document.createElement('div');
      target.setAttribute('id', id);
      target.style.width = target.style.height = '200px';

      const targetMenu = document.createElement('div');
      targetMenu.classList.add('taxonomy-menu');
      target.appendChild(targetMenu);

      spyFocus = sinon.spy(element, 'focus');

      document.body.appendChild(element);
      document.body.appendChild(target);

      let eventBeforeHidden;

      await new Promise((resolve) => {
        events.on(target, 'header-shown', resolve);
        element.dispatchEvent(new CustomEvent('click', { bubbles: true, cancelable: true }));
      });

      await new Promise((resolve) => {
        events.on(target, 'header-beinghidden', (e) => {
          eventBeforeHidden = e;
        });
        events.on(target, 'header-hidden', resolve);
        element.dispatchEvent(new CustomEvent('click', { bubbles: true, cancelable: true }));
      });

      await delay(0);

      expect(eventBeforeHidden.detail.launchingElement).to.equal(element);
      expect(spyFocus).have.been.calledOnce;
    });

    it(`Should handle down key for lauching header nav`, async function () {
      const id = `__element_${Math.random().toString(36).substr(2)}`;
      element = document.createElement('a');
      element.dataset.navTarget = `#${id}`;

      target = document.createElement('div');
      target.setAttribute('id', id);
      target.style.width = target.style.height = '200px';

      const targetMenu = document.createElement('div');
      targetMenu.classList.add('taxonomy-menu');
      target.appendChild(targetMenu);

      spyFocus = sinon.spy(targetMenu, 'focus');

      document.body.appendChild(element);
      document.body.appendChild(target);

      let eventBeforeShown;

      await new Promise((resolve) => {
        events.on(target, 'header-beingshown', (e) => {
          eventBeforeShown = e;
        });
        events.on(target, 'header-shown', resolve);
        expect(element.dispatchEvent(Object.assign(new CustomEvent('keydown', { bubbles: true, cancelable: true }), { which: 40 }))).to.be.false;
        expect(HeaderNav.components.has(target)).to.be.true;
      });

      await delay(0);

      expect(eventBeforeShown.detail.launchingElement).to.equal(element);
      expect(spyFocus).have.been.calledOnce;
    });

    it(`Should provide a way to cancel showing header nav`, async function () {
      const id = `__element_${Math.random().toString(36).substr(2)}`;
      element = document.createElement('a');
      element.dataset.navTarget = `#${id}`;

      target = document.createElement('div');
      target.setAttribute('id', id);
      target.style.width = target.style.height = '200px';

      const spyShown = sinon.spy();
      events.on(target, 'header-shown', spyShown);

      events.on(target, 'header-beingshown', (e) => {
        e.preventDefault();
      });

      const targetMenu = document.createElement('div');
      targetMenu.classList.add('taxonomy-menu');
      target.appendChild(targetMenu);

      spyFocus = sinon.spy(element, 'focus');

      document.body.appendChild(element);
      document.body.appendChild(target);

      element.dispatchEvent(new CustomEvent('click', { bubbles: true, cancelable: true }));

      await delay(200);

      expect(spyFocus).not.have.been.called;
      expect(spyShown).not.have.been.called;
    });

    it(`Shouldn't cancel event if the button is not <a>`, function () {
      const id = `__element_${Math.random().toString(36).substr(2)}`;
      element = document.createElement('button');
      element.dataset.navTarget = `#${id}`;

      target = document.createElement('div');
      target.setAttribute('id', id);
      target.style.width = target.style.height = '200px';

      const targetMenu = document.createElement('div');
      targetMenu.classList.add('taxonomy-menu');
      target.appendChild(targetMenu);

      document.body.appendChild(element);
      document.body.appendChild(target);

      expect(element.dispatchEvent(new CustomEvent('click', { bubbles: true, cancelable: true }))).to.be.true;
    });

    afterEach(function () {
      if (spyFocus) {
        spyFocus.restore();
        spyFocus = null;
      }
      if (document.body.contains(target)) {
        document.body.removeChild(target);
      }
      if (document.body.contains(element)) {
        document.body.removeChild(element);
      }
      events.reset();
    });

    after(function () {
      context.release();
    });
  });
});
