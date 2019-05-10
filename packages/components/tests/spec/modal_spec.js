import Modal from '../../src/components/modal/modal';
import ModalHtml from '../../html/modal/modal.html';
import EventManager from '../utils/event-manager';
import flattenOptions from '../utils/flatten-options';

describe('Test modal', function() {
  describe('Constructor', function() {
    let modal;

    it('Should throw if root element is not given', function() {
      expect(() => {
        modal = new Modal();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        modal = new Modal(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should set default options', function() {
      const container = document.createElement('div');
      container.innerHTML = ModalHtml;
      const modalElement = container.querySelector('[data-modal]');
      modal = new Modal(modalElement);

      expect(flattenOptions(modal.options)).toEqual({
        selectorInit: '[data-modal]',
        selectorModalClose: '[data-modal-close]',
        selectorPrimaryFocus: '[data-modal-primary-focus]',
        selectorsFloatingMenus: [
          '.bx--overflow-menu-options',
          '.bx--tooltip',
          '.flatpickr-calendar',
        ],
        classVisible: 'is-visible',
        attribInitTarget: 'data-modal-target',
        initEventNames: ['click'],
        eventBeforeShown: 'modal-beingshown',
        eventAfterShown: 'modal-shown',
        eventBeforeHidden: 'modal-beinghidden',
        eventAfterHidden: 'modal-hidden',
      });
    });

    afterEach(function() {
      if (modal) {
        modal = modal.release();
      }
    });
  });

  describe('Showing/hiding functions', function() {
    let container;
    let modal;
    let element;
    const events = new EventManager();

    beforeAll(function() {
      container = document.createElement('div');
      container.innerHTML = ModalHtml;
      // Reset primary focus eleemnt for testing
      delete container.querySelector(
        '[data-modal-primary-focus]'
      ).dataset.modalPrimaryFocus;
      document.body.appendChild(container);
      element = container.querySelector('[data-modal]');
    });

    beforeEach(function() {
      modal = new Modal(element);
    });

    it("Should sanity check show()'s arguments", function() {
      expect(() => {
        modal.show({});
      }).toThrowError(
        TypeError,
        'DOM Node should be given for launching element.'
      );
    });

    it('Should have show() do nothing if already visible', function() {
      element.classList.add('is-visible');
      const spy = jasmine.createSpy();
      events.on(element, 'modal-beingshown', spy);
      modal.show();
      expect(element.classList.contains('is-visible')).toBe(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('Should have show() method show modal', function() {
      const spy = jasmine.createSpy();
      events.on(modal.element, 'modal-shown', spy);
      modal.show();
      modal.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      expect(spy).toHaveBeenCalledTimes(1);
      expect(element.classList.contains('is-visible')).toBe(true);
    });

    it('Should have show() method support providing a DOM element instead of an event', function() {
      const spy = jasmine.createSpy();
      events.on(modal.element, 'modal-shown', spy);
      modal.show(modal.element);
      modal.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      expect(
        spy.calls.argsFor(0)[0].detail.launchingElement,
        'Launching element for modal-shown event'
      ).toBe(modal.element);
    });

    it('Should call callback of show() method after it finishes', function() {
      const spy = jasmine.createSpy();
      modal.show(spy);
      modal.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('Should focus on modal upon showning', function() {
      spyOn(modal.element, 'focus');
      modal.show();
      modal.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      expect(modal.element.focus).toHaveBeenCalledTimes(1);
    });

    it('Should support specifying the primary focus element', function() {
      const primaryButton = modal.element.querySelector('.bx--btn--primary');
      spyOn(primaryButton, 'focus');
      primaryButton.dataset.modalPrimaryFocus = '';
      try {
        modal.show();
        modal.element.dispatchEvent(
          new CustomEvent('transitionend', { bubbles: true })
        );
        expect(primaryButton.focus).toHaveBeenCalledTimes(1);
      } finally {
        delete primaryButton.dataset.modalPrimaryFocus;
      }
    });

    it("Should sanity check hide()'s arguments", function() {
      expect(() => {
        modal.hide({});
      }).toThrowError(
        TypeError,
        'DOM Node should be given for launching element.'
      );
    });

    it('Should have hide() not hide if not visible', function() {
      const spy = jasmine.createSpy();
      events.on(element, 'modal-beinghidden', spy);
      modal.hide();
      modal.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      expect(element.classList.contains('is-visible')).toBe(false);
      expect(spy).not.toHaveBeenCalled();
    });

    it('Should have hide() method hide modal', function() {
      modal.show();
      modal.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      const spy = jasmine.createSpy();
      events.on(element, 'modal-beinghidden', spy);
      modal.hide();
      expect(element.classList.contains('is-visible')).toBe(false);
      expect(spy).toHaveBeenCalled();
    });

    it('Should have hide() method support providing a DOM element instead of an event', function() {
      modal.show();
      modal.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      const spy = jasmine.createSpy();
      events.on(modal.element, 'modal-hidden', spy);
      modal.hide(modal.element);
      modal.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      expect(
        spy.calls.argsFor(0)[0].detail.launchingElement,
        'Launching element for modal-hidden event'
      ).toBe(modal.element);
    });

    it('Should call callback of hide() method after it finishes', function() {
      modal.show();
      modal.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      const spy = jasmine.createSpy();
      modal.hide(spy);
      modal.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    afterEach(function() {
      modal.release();
      events.reset();
      element.classList.remove('is-visible');
    });

    afterAll(function() {
      document.body.removeChild(container);
    });
  });

  describe('The various close actions', function() {
    let container;
    let modal;
    let element;
    const events = new EventManager();

    beforeAll(function() {
      container = document.createElement('div');
      container.innerHTML = ModalHtml;
      document.body.appendChild(container);
      element = container.querySelector('[data-modal]');
    });

    beforeEach(function() {
      modal = new Modal(element);
    });

    it('Should handle the ESC key to close the modal', function() {
      element.classList.add('is-visible');
      const spyBeforeHidden = jasmine.createSpy();
      const spyAfterHidden = jasmine.createSpy();
      events.on(element, 'modal-beinghidden', spyBeforeHidden);
      events.on(element, 'modal-hidden', spyAfterHidden);
      element.ownerDocument.body.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          which: 27,
        })
      );
      modal.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      expect(element.classList.contains('is-visible')).toBe(false);
      expect(spyBeforeHidden).toHaveBeenCalled();
      expect(spyAfterHidden).toHaveBeenCalled();
      const eventDataBeforeHidden = spyBeforeHidden.calls.argsFor(0)[0].detail;
      const eventDataAfterHidden = spyAfterHidden.calls.argsFor(0)[0].detail;
      expect(
        eventDataBeforeHidden.launchingElement,
        'Launching element for modal-beinghidden'
      ).toBe(element.ownerDocument.body);
      expect(
        eventDataBeforeHidden.launchingEvent.target,
        'Launching event for modal-beinghidden'
      ).toBe(element.ownerDocument.body);
      expect(
        eventDataAfterHidden.launchingElement,
        'Launching element for modal-hidden'
      ).toBe(element.ownerDocument.body);
      expect(
        eventDataAfterHidden.launchingEvent.target,
        'Launching event for modal-hidden'
      ).toBe(element.ownerDocument.body);
    });

    it('Should handle any elements with data-modal-close attribute to close the modal', function() {
      modal.show();
      modal.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      const spyBeforeHidden = jasmine.createSpy();
      const spyAfterHidden = jasmine.createSpy();
      events.on(modal.element, 'modal-beinghidden', spyBeforeHidden);
      events.on(modal.element, 'modal-hidden', spyAfterHidden);
      const closeButton = element.querySelector('[data-modal-close]');
      closeButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      modal.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      expect(element.classList.contains('is-visible'), 'Visible state').toBe(
        false
      );
      expect(spyBeforeHidden).toHaveBeenCalled();
      expect(spyAfterHidden).toHaveBeenCalled();
      const eventDataBeforeHidden = spyBeforeHidden.calls.argsFor(0)[0].detail;
      const eventDataAfterHidden = spyAfterHidden.calls.argsFor(0)[0].detail;
      expect(
        eventDataBeforeHidden.launchingElement,
        'Launching element for modal-beinghidden'
      ).toBe(closeButton);
      expect(
        eventDataBeforeHidden.launchingEvent.target,
        'Launching event for modal-beinghidden'
      ).toBe(closeButton);
      expect(
        eventDataAfterHidden.launchingElement,
        'Launching element for modal-hidden'
      ).toBe(closeButton);
      expect(
        eventDataAfterHidden.launchingEvent.target,
        'Launching event for modal-hidden'
      ).toBe(closeButton);
    });

    it('Should handle any click outside the modal element to close the modal', function() {
      modal.show();
      modal.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      const spyBeforeHidden = jasmine.createSpy();
      const spyAfterHidden = jasmine.createSpy();
      events.on(modal.element, 'modal-beinghidden', spyBeforeHidden);
      events.on(modal.element, 'modal-hidden', spyAfterHidden);
      const containerArea = document.querySelector('.bx--modal');
      containerArea.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      modal.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      expect(element.classList.contains('is-visible')).toBe(false);
      expect(spyBeforeHidden).toHaveBeenCalled();
      expect(spyAfterHidden).toHaveBeenCalled();
      const eventDataBeforeHidden = spyBeforeHidden.calls.argsFor(0)[0].detail;
      const eventDataAfterHidden = spyAfterHidden.calls.argsFor(0)[0].detail;
      expect(
        eventDataBeforeHidden.launchingElement,
        'Launching element for modal-beinghidden'
      ).toBe(element);
      expect(
        eventDataBeforeHidden.launchingEvent.target,
        'Launching event for modal-beinghidden'
      ).toBe(element);
      expect(
        eventDataAfterHidden.launchingElement,
        'Launching element for modal-hidden'
      ).toBe(element);
      expect(
        eventDataAfterHidden.launchingEvent.target,
        'Launching event for modal-hidden'
      ).toBe(element);
    });

    afterEach(function() {
      modal.release();
      events.reset();
      element.classList.remove('is-visible');
    });

    afterAll(function() {
      document.body.removeChild(container);
    });
  });

  describe('Wrapping focus while modal is open', function() {
    let container;
    let modal;
    let element;
    let input;

    if (!document.hasFocus()) {
      return;
    }

    beforeAll(function() {
      container = document.createElement('div');
      container.innerHTML = ModalHtml;
      // Reset primary focus eleemnt for testing
      delete container.querySelector(
        '[data-modal-primary-focus]'
      ).dataset.modalPrimaryFocus;
      document.body.appendChild(container);
      element = container.querySelector('[data-modal]');
      input = document.createElement('input');
      input.type = 'text';
      document.body.appendChild(input);
      modal = new Modal(element);
    });

    it('Should bring back focus when modal loses focus', async function() {
      modal.show();
      modal.element.dispatchEvent(
        new CustomEvent('transitionend', { bubbles: true })
      );
      input.focus();
      expect(element.contains(document.activeElement)).toBe(true);
    });

    afterAll(function() {
      if (modal) {
        modal = modal.release();
      }
      if (document.body.contains(input)) {
        input.parentNode.removeChild(input);
      }
      if (document.body.contains(element)) {
        element.parentNode.removeChild(element);
      }
    });
  });

  describe('Init Component by Launch functionality', function() {
    let container;
    let modal;
    let element;
    let context; // eslint-disable-line
    let button;
    const events = new EventManager();

    beforeAll(function() {
      container = document.createElement('div');
      container.innerHTML = ModalHtml;
      document.body.appendChild(container);
      element = container.querySelector('[data-modal]');
      context = Modal.init();
    });

    beforeEach(function() {
      modal = new Modal(element);
      button = document.querySelector('[data-modal-target]');
    });

    it('Should launch the modal on button click', function() {
      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('is-visible')).toBe(true);
    });

    afterEach(function() {
      modal.release();
      events.reset();
      element.classList.remove('is-visible');
    });

    afterAll(function() {
      document.body.removeChild(container);
    });
  });
});
