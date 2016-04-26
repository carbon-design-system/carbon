import '../../consumables/js/polyfills/custom-event';
import '../../consumables/js/polyfills/object-assign';
import Promise from 'bluebird'; // For testing on browsers not supporting Promise
import '../utils/es6-weak-map-global'; // For PhantomJS
import EventManager from '../utils/event-manager';
import promiseTryCatcher from '../utils/promise-try-catcher';
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
          classVisible: 'is-visible',
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

    const events = new EventManager();

    before(function () {
      button = document.createElement('div');
      button.dataset.modalClose = '';

      element = document.createElement('div');
      element.appendChild(button);
      document.body.appendChild(element);

      modal = new Modal(element);
    });

    it(`Should sanity check show()'s arguments`, function () {
      expect(() => {
        modal.show({});
      }).to.throw(Error);
    });

    it(`Should have show() do nothing if no state change happens`, function () {
      element.classList.add('is-visible');
      const spyPreShownEventFired = sinon.spy();
      events.on(element, 'modal-beingshown', spyPreShownEventFired);
      return new Promise((resolve, reject) => {
        modal.show(promiseTryCatcher(() => {
          expect(spyPreShownEventFired).not.have.been.called;
        }, resolve, reject));
      });
    });

    it(`Should have show() method show modal`, function () {
      const spyShownEventFired = sinon.spy();
      return new Promise((resolve) => {
        events.on(element, 'modal-shown', spyShownEventFired);
        modal.show(resolve);
      }).then(() => {
        expect(spyShownEventFired).have.been.calledOnce;
      });
    });

    it(`Should have elements with data-modal-close attribute close buttons`, function () {
      element.classList.add('is-visible');
      return new Promise((resolve) => {
        events.on(element, 'modal-hidden', resolve);
        button.dispatchEvent(new CustomEvent('click'));
      });
    });

    it(`Should provide a way to cancel showing modal`, function () {
      events.on(element, 'modal-beingshown', (e) => {
        e.preventDefault();
      });
      return new Promise((resolve, reject) => {
        modal.show(promiseTryCatcher((e) => {
          expect(e && e.canceled).to.be.true;
          expect(element.classList.contains('is-visible')).to.be.false;
        }, resolve, reject));
      });
    });

    it(`Should do nothing for hide() if no state change happens`, function () {
      const spyPreHiddenEventFired = sinon.spy();
      events.on(element, 'modal-beinghidden', spyPreHiddenEventFired);
      return new Promise((resolve, reject) => {
        modal.hide(promiseTryCatcher(() => {
          expect(spyPreHiddenEventFired).not.have.been.called;
        }, resolve, reject));
      });
    });

    it(`Should provide a way to cancel hiding modal`, function () {
      element.classList.add('is-visible');
      events.on(element, 'modal-beinghidden', (e) => {
        e.preventDefault();
      });
      return new Promise((resolve, reject) => {
        modal.hide(promiseTryCatcher((e) => {
          expect(e && e.canceled).to.be.true;
          expect(element.classList.contains('is-visible')).to.be.true;
        }, resolve, reject));
      });
    });

    it(`Should handle ESC key`, function () {
      element.classList.add('is-visible');
      return new Promise((resolve) => {
        events.on(element, 'modal-hidden', resolve);
        document.body.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 27 }));
      });
    });

    it(`Shouldn't handle non-ESC key for closing`, function () {
      const spyHiddenEventFired = sinon.spy();
      element.classList.add('is-visible');
      return new Promise((resolve) => {
        events.on(element, 'modal-hidden', () => {
          spyHiddenEventFired();
          resolve();
        });
        document.body.dispatchEvent(Object.assign(new CustomEvent('keydown')));
        setTimeout(resolve, 500);
      }).then(() => {
        expect(spyHiddenEventFired).not.to.have.been.called;
      });
    });

    afterEach(function () {
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

    it(`Shouldn't handle ESC key for modals in different frames`, function () {
      const spyHideModal = sinon.spy(modal, 'hide');
      return new Promise((resolve) => {
        document.body.dispatchEvent(Object.assign(new CustomEvent('keydown')));
        setTimeout(resolve, 500);
      }).then(() => {
        expect(spyHideModal).not.to.have.been.called;
      });
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

    it(`Should launch modal upon button click`, function () {
      const id = `__element_${Math.random().toString(36).substr(2)}`;
      element = document.createElement('a');
      element.dataset.modalTarget = `#${id}`;

      target = document.createElement('div');
      target.setAttribute('id', id);
      target.style.width = target.style.height = '200px';

      spyFocus = sinon.spy(target, 'focus');

      document.body.appendChild(element);
      document.body.appendChild(target);

      return new Promise((resolve, reject) => {
        events.on(target, 'modal-beingshown', promiseTryCatcher((e) => {
          expect(e.detail.launchingElement).to.equal(element);
        }, reject));
        events.on(target, 'modal-shown', () => {
          setTimeout(promiseTryCatcher(() => {
            expect(spyFocus).have.been.calledOnce;
          }, resolve, reject), 0);
        });
        expect(element.dispatchEvent(new CustomEvent('click', { bubbles: true, cancelable: true }))).to.be.false;
        expect(Modal.components.has(target)).to.be.true;
      });
    });

    it(`Shouldn't focus on modal unless its root element has an area`, function () {
      const id = `__element_${Math.random().toString(36).substr(2)}`;
      element = document.createElement('a');
      element.dataset.modalTarget = `#${id}`;

      target = document.createElement('div');
      target.setAttribute('id', id);
      target.style.width = target.style.height = '0';

      spyFocus = sinon.spy(target, 'focus');

      document.body.appendChild(element);
      document.body.appendChild(target);

      return new Promise((resolve, reject) => {
        events.on(target, 'modal-shown', () => {
          setTimeout(promiseTryCatcher(() => {
            expect(spyFocus).not.have.been.called;
          }, resolve, reject), 0);
        });
        element.dispatchEvent(new CustomEvent('click', { bubbles: true, cancelable: true }));
      });
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
