import '../../consumables/js/polyfills/object-assign';
import '../../consumables/js/polyfills/custom-event';
import Promise from 'bluebird'; // For testing on browsers not supporting Promise
import '../utils/es6-weak-map-global'; // For PhantomJS
import EventManager from '../utils/event-manager';
import promiseTryCatcher from '../utils/promise-try-catcher';
import { HeaderNav } from '../../consumables/js/es2015/index.js';

describe('Test header', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new HeaderNav(); // eslint-disable-line no-new
      }).to.throw;
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new HeaderNav(document.createTextNode('')); // eslint-disable-line no-new
      }).to.throw;
    });

    it(`Should set default options`, function () {
      const element = document.createElement('div');
      const nav = new HeaderNav(element);
      expect(nav.options).to.deep.equal({
        selectorTriggerLabel: '.current-taxonomy',
        classActive: 'taxonomy-nav--active',
        selectorMenu: '.taxonomy-menu',
        selectorItem: '.taxonomy-item',
        selectorItemLink: '.taxonomy-item--taxonomy-menu',
        selectorLabel: '.taxonomy-item__label',
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

    it(`Should handle ESC key`, function () {
      return new Promise((resolve, reject) => {
        events.on(element, 'header-hidden', promiseTryCatcher(() => {
          expect(headerNav.triggerNode.focus).have.been.calledOnce;
        }, resolve, reject));
        element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 27 }));
      });
    });

    it(`Shouldn't handle non-ESC key`, function () {
      const spyHiddenEvent = sinon.spy();
      events.on(element, 'header-hidden', spyHiddenEvent);
      element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 32 }));

      return new Promise((resolve, reject) => {
        setTimeout(promiseTryCatcher(() => {
          expect(spyHiddenEvent).not.have.been.called;
        }, resolve, reject), 200);
      });
    });

    it(`Should provide a way to cancel hiding nav`, function () {
      events.on(element, 'header-beinghidden', (e) => {
        e.preventDefault();
      });

      const spyHidden = sinon.spy();
      events.on(element, 'header-hidden', spyHidden);
      element.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 27 }));

      return new Promise((resolve, reject) => {
        setTimeout(promiseTryCatcher(() => {
          expect(spyHidden).not.have.been.called;
          expect(headerNav.triggerNode.focus).not.have.been.called;
        }, resolve, reject), 200);
      });
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
    it(`Should select header nav item upon clicking`, function () {
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

      return new Promise((resolve, reject) => {
        element.addEventListener('header-selected', promiseTryCatcher((e) => {
          expect(e.detail.itemElement).to.equal(itemsNodes[1].firstChild);
          expect(itemsNodes.map((itemNode) => itemNode.classList.contains('selected'))).to.deep.equal([false, true]);
        }, resolve, reject));
        itemsNodes[1].firstChild.dispatchEvent(new CustomEvent('click'));
      });
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

  describe('Launching button', function () {
    const id = `__element_${Math.random().toString(36).substr(2)}`;

    let element;
    let target;
    let targetMenu;
    let spyFocusElement;
    let spyFocusTargetMenu;

    const events = new EventManager();

    before(function () {
      element = document.createElement('a');
      element.setAttribute('data-nav-target', `#${id}`);

      target = document.createElement('div');
      target.setAttribute('id', id);
      target.style.width = target.style.height = '200px';

      targetMenu = document.createElement('div');
      targetMenu.classList.add('taxonomy-menu');
      target.appendChild(targetMenu);

      spyFocusElement = sinon.spy(element, 'focus');
      spyFocusTargetMenu = sinon.spy(targetMenu, 'focus');

      document.body.appendChild(element);
      document.body.appendChild(target);

      HeaderNav.hook(element);
    });

    beforeEach(function () {
      target.style.width = target.style.height = '200px';
    });

    it(`Should sanity check hook()'s arguments`, function () {
      expect(() => {
        HeaderNav.hook();
      }).to.throw;
    });

    it(`Should handle header nav's button for launching header nav`, function () {
      return new Promise((resolve, reject) => {
        events.on(target, 'header-beingshown', promiseTryCatcher((e) => {
          expect(e.detail.launchingElement).to.equal(element);
        }, reject));
        events.on(target, 'header-shown', () => {
          setTimeout(promiseTryCatcher(() => {
            expect(spyFocusTargetMenu).have.been.calledOnce;
          }, resolve, reject), 0);
        });
        expect(element.dispatchEvent(new CustomEvent('click', { cancelable: true }))).to.be.false;
      });
    });

    it(`Should handle header nav's button for closing header nav`, function () {
      target.classList.add('taxonomy-nav--active');

      return new Promise((resolve, reject) => {
        events.on(target, 'header-beinghidden', promiseTryCatcher((e) => {
          expect(e.detail.launchingElement).to.equal(element);
        }, reject));
        events.on(target, 'header-hidden', () => {
          setTimeout(promiseTryCatcher(() => {
            expect(spyFocusElement).have.been.calledOnce;
          }, resolve, reject), 0);
        });
        expect(element.dispatchEvent(new CustomEvent('click', { cancelable: true }))).to.be.false;
      });
    });

    it(`Should handle down key for lauching header nav`, function () {
      return new Promise((resolve, reject) => {
        events.on(target, 'header-beingshown', promiseTryCatcher((e) => {
          expect(e.detail.launchingElement).to.equal(element);
        }, reject));
        events.on(target, 'header-shown', () => {
          setTimeout(promiseTryCatcher(() => {
            expect(spyFocusTargetMenu).have.been.calledOnce;
          }, resolve, reject), 0);
        });
        expect(element.dispatchEvent(Object.assign(new CustomEvent('keydown', { cancelable: true }), { which: 40 }))).to.be.false;
      });
    });

    it(`Should provide a way to cancel showing header nav`, function () {
      return new Promise((resolve, reject) => {
        events.on(target, 'header-beingshown', (e) => {
          e.preventDefault();
        });

        const spyShown = sinon.spy();
        events.on(target, 'header-shown', spyShown);

        element.dispatchEvent(new CustomEvent('click', { cancelable: true }));

        setTimeout(promiseTryCatcher(() => {
          expect(spyFocusTargetMenu).not.have.been.called;
          expect(spyShown).not.have.been.called;
        }, resolve, reject), 200);
      });
    });

    afterEach(function () {
      spyFocusTargetMenu.reset();
      spyFocusElement.reset();
      target.classList.remove('taxonomy-nav--active');
      events.reset();
    });

    after(function () {
      spyFocusTargetMenu.restore();
      spyFocusElement.restore();
      document.body.removeChild(target);
      document.body.removeChild(element);
    });
  });
});
