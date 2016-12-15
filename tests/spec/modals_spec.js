import '../../consumables/js/polyfills/custom-event';
import '../../consumables/js/polyfills/object-assign';
import Promise from 'bluebird'; // For testing on browsers not supporting Promise
import { delay, promisify } from 'bluebird';
import '../utils/es6-weak-map-global'; // For PhantomJS
import EventManager from '../utils/event-manager';
import '../utils/es6-weak-map-global'; // For PhantomJS
import Modal from '../../consumables/js/es2015/modals';

describe('Test modal', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new Modal();
      }).to.throw(Error);
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new Modal(document.createTextNode(''));
      }).to.throw(Error);
    });

    it(`Should set default options`, function () {
      const modal = new Modal(document.createElement('div'));
      try {
        expect(modal.options).to.deep.equal({
          selectorInit: '[data-modal]',
          attribInitTarget: 'data-modal-target',
          classVisible: 'is-visible',
          classNoScroll: 'bx--noscroll',
          eventBeforeShown: 'modal-beingshown',
          eventAfterShown: 'modal-shown',
          eventBeforeHidden: 'modal-beinghidden',
          eventAfterHidden: 'modal-hidden',
        });
      } finally {
        modal.release();
      }
    });
  });

  describe('Showing/hiding', function () {
    let element;
    let button;
    let modal;
    let style;

    const events = new EventManager();

    before(function () {
      button = document.createElement('div');
      button.dataset.modalClose = '';

      element = document.createElement('div');
      element.classList.add('bx--modal');
      element.appendChild(button);
      document.body.appendChild(element);

      modal = new Modal(element);
    });

    it(`Should sanity check show()'s arguments`, function () {
      expect(() => {
        modal.show({});
      }).to.throw(Error);
    });

    it(`Should have show() do nothing if no state change happens`, async function () {
      element.classList.add('is-visible');
      const spyPreShownEventFired = sinon.spy();
      events.on(element.ownerDocument.body, 'modal-beingshown', spyPreShownEventFired);
      await promisify(modal.show, { context: modal })();
      expect(spyPreShownEventFired).not.have.been.called;
    });

    it(`Should have show() method show modal`, async function () {
      const spyShownEventFired = sinon.spy();
      await new Promise((resolve) => {
        events.on(element.ownerDocument.body, 'modal-shown', spyShownEventFired);
        modal.show(resolve);
      });
      expect(spyShownEventFired, 'modal-shown event').have.been.calledOnce;
      expect(element.classList.contains('is-visible'), 'is-visible class').to.be.true;
      expect(element.ownerDocument.body.classList.contains('bx--noscroll'), 'bx--noscroll class').to.be.true;
    });

    it(`Should have show() method support providing a DOM element instead of an event`, async function () {
      const spyBeingShownEventFired = sinon.spy();
      const spyShownEventFired = sinon.spy();
      events.on(element.ownerDocument.body, 'modal-beingshown', spyBeingShownEventFired);
      events.on(element.ownerDocument.body, 'modal-shown', spyShownEventFired);
      await promisify(modal.show, { context: modal })(modal.element);
      expect(spyBeingShownEventFired, 'modal-beingshown event').have.been.calledOnce;
      expect(spyBeingShownEventFired.firstCall.args[0].detail.launchingElement, 'Launching element for modal-beingshown event')
        .to.equal(modal.element);
      expect(spyBeingShownEventFired.firstCall.args[0].detail.launchingEvent, 'Launching element for modal-beingshown event')
        .not.to.be.ok;
      expect(spyShownEventFired, 'modal-shown event').have.been.calledOnce;
      expect(spyShownEventFired.firstCall.args[0].detail.launchingElement, 'Launching element for modal-shown event')
        .to.equal(modal.element);
      expect(spyShownEventFired.firstCall.args[0].detail.launchingEvent, 'Launching element for modal-shown event')
        .not.to.be.ok;
    });

    it(`Should call callback of show() method after it finishes`, async function () {
      style = document.createElement('style');
      style.textContent = `.bx--modal {
        opacity: 0;
      }
      .bx--modal .is-visible {
        opacity: 1;
        transition: opacity .2s;
      }`;
      document.head.appendChild(style);
      const spyShownEventFired = sinon.spy();
      await new Promise((resolve) => {
        events.on(element.ownerDocument.body, 'modal-shown', spyShownEventFired);
        modal.show(resolve);
      });
      expect(spyShownEventFired).have.been.calledOnce;
    });

    it(`Should have elements with data-modal-close attribute work as close buttons`, async function () {
      element.classList.add('is-visible');
      const [eventDataBeforeHidden, eventDataAfterHidden] = await Promise.all([
        new Promise((resolve) => {
          events.on(element.ownerDocument.body, 'modal-beinghidden', (e) => {
            resolve({
              launchingElement: e.detail.launchingElement,
              launchingEventCurrentTarget: e.detail.launchingEvent.currentTarget,
            });
          });
        }),
        new Promise((resolve) => {
          events.on(element.ownerDocument.body, 'modal-hidden', (e) => {
            resolve({
              launchingElement: e.detail.launchingElement,
              launchingEventCurrentTarget: e.detail.launchingEvent.currentTarget,
            });
          });
          button.dispatchEvent(new CustomEvent('click'));
        }),
      ]);
      expect(eventDataBeforeHidden.launchingElement, 'Launching element for modal-beinghidden').to.equal(button);
      expect(eventDataBeforeHidden.launchingEventCurrentTarget, 'Launching event for modal-beinghidden').to.equal(button);
      expect(eventDataAfterHidden.launchingElement, 'Launching element for modal-hidden').to.equal(button);
      expect(eventDataAfterHidden.launchingEventCurrentTarget, 'Launching event for modal-hidden').to.equal(button);
    });

    it(`Should provide a way to cancel showing modal`, async function () {
      events.on(element.ownerDocument.body, 'modal-beingshown', (e) => {
        e.preventDefault();
      });
      let errorShow;
      try {
        await promisify(modal.show, { context: modal })();
      } catch (error) {
        errorShow = error;
      }
      expect(errorShow && errorShow.canceled, 'canceled property in error object').to.be.true;
      expect(element.classList.contains('is-visible'), 'is-visible class').to.be.false;
      expect(element.ownerDocument.body.classList.contains('bx--noscroll'), 'bx--noscroll class').to.be.false;
    });

    it(`Should have hide() method hide modal`, async function () {
      const spyHiddenEventFired = sinon.spy();
      element.classList.add('is-visible');
      element.ownerDocument.body.classList.add('bx--noscroll');
      events.on(element.ownerDocument.body, 'modal-hidden', spyHiddenEventFired);
      await promisify(modal.hide, { context: modal })();
      expect(spyHiddenEventFired, 'modal-hidden event').have.been.calledOnce;
      expect(element.classList.contains('is-visible'), 'is-visible class').to.be.false;
      expect(element.ownerDocument.body.classList.contains('bx--noscroll'), 'bx--noscroll class').to.be.false;
    });

    it(`Should do nothing for hide() if no state change happens`, async function () {
      const spyPreHiddenEventFired = sinon.spy();
      events.on(element.ownerDocument.body, 'modal-beinghidden', spyPreHiddenEventFired);
      await promisify(modal.hide, { context: modal })();
      expect(spyPreHiddenEventFired).not.have.been.called;
    });

    it(`Should have hide() method hide modal`, async function () {
      element.classList.add('is-visible');
      style = document.createElement('style');
      style.textContent = `.bx--modal {
        opacity: 0;
      }
      .bx--modal .is-visible {
        opacity: 1;
        transition: opacity .2s;
      }`;
      document.head.appendChild(style);
      const spyHiddenEventFired = sinon.spy();
      events.on(element.ownerDocument.body, 'modal-hidden', spyHiddenEventFired);
      await promisify(modal.hide, { context: modal })();
      expect(spyHiddenEventFired).have.been.calledOnce;
    });

    it(`Should provide a way to cancel hiding modal`, async function () {
      element.classList.add('is-visible');
      element.ownerDocument.body.classList.add('bx--noscroll');
      events.on(element.ownerDocument.body, 'modal-beinghidden', (e) => {
        e.preventDefault();
      });
      let errorHide;
      try {
        await promisify(modal.hide, { context: modal })();
      } catch (error) {
        errorHide = error;
      }
      expect(errorHide && errorHide.canceled, 'canceled property in error object').to.be.true;
      expect(element.classList.contains('is-visible'), 'is-visible class').to.be.true;
      expect(element.ownerDocument.body.classList.contains('bx--noscroll'), 'bx--noscroll class').to.be.true;
    });

    it(`Should handle ESC key`, async function () {
      element.classList.add('is-visible');
      element.ownerDocument.body.classList.add('bx--noscroll');
      const [eventDataBeforeHidden, eventDataAfterHidden] = await Promise.all([
        new Promise((resolve) => {
          events.on(element.ownerDocument.body, 'modal-beinghidden', (e) => {
            resolve({
              launchingElement: e.detail.launchingElement,
              launchingEventCurrentTarget: e.detail.launchingEvent.currentTarget,
            });
          });
        }),
        new Promise((resolve) => {
          events.on(element.ownerDocument.body, 'modal-hidden', (e) => {
            resolve({
              launchingElement: e.detail.launchingElement,
              launchingEventCurrentTarget: e.detail.launchingEvent.currentTarget,
            });
          });
          document.body.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 27 }));
        }),
      ]);
      expect(eventDataBeforeHidden.launchingElement, 'Launching element for modal-beinghidden')
        .to.equal(element.ownerDocument.body);
      expect(eventDataBeforeHidden.launchingEventCurrentTarget, 'Launching event for modal-beinghidden')
        .to.equal(element.ownerDocument.body);
      expect(eventDataAfterHidden.launchingElement, 'Launching element for modal-hidden').to.equal(element.ownerDocument.body);
      expect(eventDataAfterHidden.launchingEventCurrentTarget, 'Launching event for modal-hidden').to.equal(element.ownerDocument.body);
    });

    it(`Shouldn't handle non-ESC key for closing`, async function () {
      const spyHiddenEventFired = sinon.spy();
      element.classList.add('is-visible');
      element.ownerDocument.body.classList.add('bx--noscroll');
      events.on(element.ownerDocument.body, 'modal-hidden', spyHiddenEventFired);
      document.body.dispatchEvent(Object.assign(new CustomEvent('keydown')));
      await delay(500);
      expect(spyHiddenEventFired).not.to.have.been.called;
    });

    it(`Should handle click outside`, async function () {
      element.classList.add('is-visible');
      const [eventDataBeforeHidden, eventDataAfterHidden] = await Promise.all([
        new Promise((resolve) => {
          events.on(element.ownerDocument.body, 'modal-beinghidden', (e) => {
            resolve({
              launchingElement: e.detail.launchingElement,
              launchingEventCurrentTarget: e.detail.launchingEvent.currentTarget,
            });
          });
        }),
        new Promise((resolve) => {
          events.on(element.ownerDocument.body, 'modal-hidden', (e) => {
            resolve({
              launchingElement: e.detail.launchingElement,
              launchingEventCurrentTarget: e.detail.launchingEvent.currentTarget,
            });
          });
          element.dispatchEvent(new CustomEvent('click'));
        }),
      ]);
      expect(eventDataBeforeHidden.launchingElement, 'Launching element for modal-beinghidden').to.equal(element);
      expect(eventDataBeforeHidden.launchingEventCurrentTarget, 'Launching event for modal-beinghidden').to.equal(element);
      expect(eventDataAfterHidden.launchingElement, 'Launching element for modal-hidden').to.equal(element);
      expect(eventDataAfterHidden.launchingEventCurrentTarget, 'Launching event for modal-hidden').to.equal(element);
    });

    afterEach(function () {
      if (style) {
        document.head.removeChild(style);
        style = null;
      }
      element.classList.remove('is-visible');
      events.reset();
    });

    after(function () {
      modal.release();
      document.body.removeChild(element);
    });
  });

  describe('Transition hook', function () {
    let style;
    let element;
    let modal;
    const spyChangeStateCallback = sinon.spy();

    before(function () {
      style = document.createElement('style');
      style.setAttribute('type', 'text/css');

      const cssText = '.modal { opacity: 0; transition: opacity .2s; } .is-visible { opacity: 1; }';
      if (style.styleSheet) {
        style.styleSheet.cssText = cssText;
      } else {
        style.appendChild(document.createTextNode(cssText));
      }
      document.head.appendChild(style);

      element = document.createElement('div');
      element.classList.add('modal');
      document.body.appendChild(element);

      modal = new Modal(element);
      modal._changeState(true, spyChangeStateCallback);
    });

    it(`Should call _changeState()'s callback after transition ends`, function () {
      for (let i = 0; i < 2; ++i) {
        element.dispatchEvent(new CustomEvent('transitionend'));
      }
      expect(spyChangeStateCallback).have.been.calledOnce;
    });

    after(function () {
      modal.release();
      document.body.removeChild(element);
      document.head.removeChild(style);
    });
  });

  describe('Modal in different frame', function () {
    let iframe;
    let element;
    let modal;

    before(function () {
      iframe = document.createElement('iframe');
      document.body.appendChild(iframe);

      element = iframe.contentWindow.document.createElement('div');
      iframe.contentWindow.document.body.appendChild(element);

      modal = new Modal(element);
    });

    it(`Shouldn't handle ESC key for modals in different frames`, async function () {
      const spyHideModal = sinon.spy(modal, 'hide');
      document.body.dispatchEvent(Object.assign(new CustomEvent('keydown')));
      await delay(500);
      expect(spyHideModal).not.to.have.been.called;
    });

    after(function () {
      modal.release();
      document.body.removeChild(iframe);
    });
  });

  describe('Automatic creation', function () {
    let context;
    let element;
    let target;
    let spyFocus;

    const events = new EventManager();

    before(function () {
      context = Modal.init();
    });

    it(`Should do nothing if there is none of a button's target modal upon button click`, function () {
      element = document.createElement('a');
      document.body.appendChild(element);
      expect(element.dispatchEvent(new CustomEvent('click', { bubbles: true }))).to.be.true;
    });

    it(`Should throw if there are more than one of a button's target modal`, function () {
      const className = `__element_${Math.random().toString(36).substr(2)}`;
      element = document.createElement('a');
      element.dataset.modalTarget = `.${className}`;

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

    it(`Should launch modal upon button click`, async function () {
      const id = `__element_${Math.random().toString(36).substr(2)}`;
      element = document.createElement('a');
      element.dataset.modalTarget = `#${id}`;

      target = document.createElement('div');
      target.setAttribute('id', id);
      target.style.width = target.style.height = '200px';

      spyFocus = sinon.spy(target, 'focus');

      document.body.appendChild(element);
      document.body.appendChild(target);

      let eventBeforeShown;

      const eventAfterShown = await new Promise((resolve) => {
        events.on(target, 'modal-beingshown', (e) => {
          eventBeforeShown = e;
        });
        events.on(target, 'modal-shown', resolve);
        expect(element.dispatchEvent(new CustomEvent('click', { bubbles: true, cancelable: true }))).to.be.false;
        expect(Modal.components.has(target)).to.be.true;
      });

      await delay(0);

      expect(eventBeforeShown.detail.launchingElement).to.equal(element);
      expect(eventBeforeShown.detail.launchingEvent.delegateTarget).to.equal(element);

      expect(eventAfterShown.detail.launchingElement).to.equal(element);
      expect(eventAfterShown.detail.launchingEvent.delegateTarget).to.equal(element);
      expect(spyFocus).have.been.calledOnce;
    });

    it(`Shouldn't focus on modal unless its root element has an area`, async function () {
      const id = `__element_${Math.random().toString(36).substr(2)}`;
      element = document.createElement('a');
      element.dataset.modalTarget = `#${id}`;

      target = document.createElement('div');
      target.setAttribute('id', id);
      target.style.width = target.style.height = '0';

      spyFocus = sinon.spy(target, 'focus');

      document.body.appendChild(element);
      document.body.appendChild(target);

      await new Promise((resolve) => {
        events.on(target, 'modal-shown', resolve);
        element.dispatchEvent(new CustomEvent('click', { bubbles: true, cancelable: true }));
      });

      await delay(0);

      expect(spyFocus).not.have.been.called;
    });

    it(`Shouldn't cancel event if the button is not <a>`, function () {
      const id = `__element_${Math.random().toString(36).substr(2)}`;
      element = document.createElement('button');
      element.dataset.modalTarget = `#${id}`;

      target = document.createElement('div');
      target.setAttribute('id', id);
      target.style.width = target.style.height = '200px';

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
