import Modal from '../../src/components/modal/modal';
import ModalHtml from '../../src/components/modal/modal.html';
import EventManager from '../utils/event-manager';

describe('Test modal', function() {
  describe('Constructor', function() {
    let modal;

    it('Should throw if root element is not given', function() {
      expect(() => {
        modal = new Modal();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        modal = new Modal(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('Should set default options', function() {
      const container = document.createElement('div');
      container.innerHTML = ModalHtml;
      const modalElement = container.querySelector('[data-modal]');
      modal = new Modal(modalElement);

      expect(modal.options).to.deep.equal({
        selectorInit: '[data-modal]',
        selectorModalClose: '[data-modal-close]',
        selectorPrimaryFocus: '[data-modal-primary-focus]',
        selectorsFloatingMenus: ['.bx--overflow-menu-options', '.bx-tooltip'],
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

    before(function() {
      container = document.createElement('div');
      container.innerHTML = ModalHtml;
      // Reset primary focus eleemnt for testing
      delete container.querySelector('[data-modal-primary-focus]').dataset.modalPrimaryFocus;
      document.body.appendChild(container);
      element = container.querySelector('[data-modal]');
    });

    beforeEach(function() {
      modal = new Modal(element);
    });

    it("Should sanity check show()'s arguments", function() {
      expect(() => {
        modal.show({});
      }).to.throw(Error);
    });

    it('Should have show() do nothing if already visible', function() {
      element.classList.add('is-visible');
      const spy = sinon.spy();
      events.on(element, 'modal-beingshown', spy);
      modal.show();
      expect(element.classList.contains('is-visible')).to.be.true;
      expect(spy).not.have.been.called;
    });

    it('Should have show() method show modal', function() {
      const spy = sinon.spy();
      events.on(modal.element, 'modal-shown', spy);
      modal.show();
      modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      expect(spy).have.been.calledOnce;
      expect(element.classList.contains('is-visible')).to.be.true;
    });

    it('Should have show() method support providing a DOM element instead of an event', function() {
      const spy = sinon.spy();
      events.on(modal.element, 'modal-shown', spy);
      modal.show(modal.element);
      modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      expect(spy.firstCall.args[0].detail.launchingElement, 'Launching element for modal-shown event').to.equal(modal.element);
    });

    it('Should call callback of show() method after it finishes', function() {
      const spy = sinon.spy();
      modal.show(spy);
      modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      expect(spy).have.been.calledOnce;
    });

    it('Should focus on modal upon showning', function() {
      const spy = sinon.spy(modal.element, 'focus');
      try {
        modal.show();
        modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
        expect(spy).to.have.been.calledOnce;
      } finally {
        spy.restore();
      }
    });

    it('Should support specifying the primary focus element', function() {
      const primaryButton = modal.element.querySelector('.bx--btn--primary');
      const spy = sinon.spy(primaryButton, 'focus');
      primaryButton.dataset.modalPrimaryFocus = '';
      try {
        modal.show();
        modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
        expect(spy).to.have.been.calledOnce;
      } finally {
        delete primaryButton.dataset.modalPrimaryFocus;
        spy.restore();
      }
    });

    it("Should sanity check hide()'s arguments", function() {
      expect(() => {
        modal.hide({});
      }).to.throw(Error);
    });

    it('Should have hide() not hide if not visible', function() {
      const spy = sinon.spy();
      events.on(element, 'modal-beinghidden', spy);
      modal.hide();
      modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      expect(element.classList.contains('is-visible')).to.be.false;
      expect(spy).not.have.been.called;
    });

    it('Should have hide() method hide modal', function() {
      modal.show();
      modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      const spy = sinon.spy();
      events.on(element, 'modal-beinghidden', spy);
      modal.hide();
      expect(element.classList.contains('is-visible')).to.be.false;
      expect(spy).to.be.called;
    });

    it('Should have hide() method support providing a DOM element instead of an event', function() {
      modal.show();
      modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      const spy = sinon.spy();
      events.on(modal.element, 'modal-hidden', spy);
      modal.hide(modal.element);
      modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      expect(spy.firstCall.args[0].detail.launchingElement, 'Launching element for modal-hidden event').to.equal(modal.element);
    });

    it('Should call callback of hide() method after it finishes', function() {
      modal.show();
      modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      const spy = sinon.spy();
      modal.hide(spy);
      modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      expect(spy).have.been.calledOnce;
    });

    afterEach(function() {
      modal.release();
      events.reset();
      element.classList.remove('is-visible');
    });

    after(function() {
      document.body.removeChild(container);
    });
  });

  describe('The various close actions', function() {
    let container;
    let modal;
    let element;
    const events = new EventManager();

    before(function() {
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
      const spyBeforeHidden = sinon.spy();
      const spyAfterHidden = sinon.spy();
      events.on(element, 'modal-beinghidden', spyBeforeHidden);
      events.on(element, 'modal-hidden', spyAfterHidden);
      element.ownerDocument.body.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          which: 27,
        })
      );
      modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      expect(element.classList.contains('is-visible')).to.be.false;
      expect(spyBeforeHidden).to.be.called;
      expect(spyAfterHidden).to.be.called;
      const eventDataBeforeHidden = spyBeforeHidden.firstCall.args[0].detail;
      const eventDataAfterHidden = spyAfterHidden.firstCall.args[0].detail;
      expect(eventDataBeforeHidden.launchingElement, 'Launching element for modal-beinghidden').to.equal(
        element.ownerDocument.body
      );
      expect(eventDataBeforeHidden.launchingEvent.target, 'Launching event for modal-beinghidden').to.equal(
        element.ownerDocument.body
      );
      expect(eventDataAfterHidden.launchingElement, 'Launching element for modal-hidden').to.equal(element.ownerDocument.body);
      expect(eventDataAfterHidden.launchingEvent.target, 'Launching event for modal-hidden').to.equal(element.ownerDocument.body);
    });

    it('Should handle any elements with data-modal-close attribute to close the modal', function() {
      modal.show();
      modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      const spyBeforeHidden = sinon.spy();
      const spyAfterHidden = sinon.spy();
      events.on(modal.element, 'modal-beinghidden', spyBeforeHidden);
      events.on(modal.element, 'modal-hidden', spyAfterHidden);
      const closeButton = element.querySelector('[data-modal-close]');
      closeButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      expect(element.classList.contains('is-visible'), 'Visible state').to.be.false;
      expect(spyBeforeHidden).to.have.been.called;
      expect(spyAfterHidden).to.have.been.called;
      const eventDataBeforeHidden = spyBeforeHidden.firstCall.args[0].detail;
      const eventDataAfterHidden = spyAfterHidden.firstCall.args[0].detail;
      expect(eventDataBeforeHidden.launchingElement, 'Launching element for modal-beinghidden').to.equal(closeButton);
      expect(eventDataBeforeHidden.launchingEvent.target, 'Launching event for modal-beinghidden').to.equal(closeButton);
      expect(eventDataAfterHidden.launchingElement, 'Launching element for modal-hidden').to.equal(closeButton);
      expect(eventDataAfterHidden.launchingEvent.target, 'Launching event for modal-hidden').to.equal(closeButton);
    });

    it('Should handle any click outside the modal element to close the modal', function() {
      modal.show();
      modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      const spyBeforeHidden = sinon.spy();
      const spyAfterHidden = sinon.spy();
      events.on(modal.element, 'modal-beinghidden', spyBeforeHidden);
      events.on(modal.element, 'modal-hidden', spyAfterHidden);
      const containerArea = document.querySelector('.bx--modal');
      containerArea.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      expect(element.classList.contains('is-visible')).to.be.false;
      expect(spyBeforeHidden).to.have.been.called;
      expect(spyAfterHidden).to.have.been.called;
      const eventDataBeforeHidden = spyBeforeHidden.firstCall.args[0].detail;
      const eventDataAfterHidden = spyAfterHidden.firstCall.args[0].detail;
      expect(eventDataBeforeHidden.launchingElement, 'Launching element for modal-beinghidden').to.equal(element);
      expect(eventDataBeforeHidden.launchingEvent.target, 'Launching event for modal-beinghidden').to.equal(element);
      expect(eventDataAfterHidden.launchingElement, 'Launching element for modal-hidden').to.equal(element);
      expect(eventDataAfterHidden.launchingEvent.target, 'Launching event for modal-hidden').to.equal(element);
    });

    afterEach(function() {
      modal.release();
      events.reset();
      element.classList.remove('is-visible');
    });

    after(function() {
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

    before(function() {
      container = document.createElement('div');
      container.innerHTML = ModalHtml;
      // Reset primary focus eleemnt for testing
      delete container.querySelector('[data-modal-primary-focus]').dataset.modalPrimaryFocus;
      document.body.appendChild(container);
      element = container.querySelector('[data-modal]');
      input = document.createElement('input');
      input.type = 'text';
      document.body.appendChild(input);
      modal = new Modal(element);
    });

    it('Should bring back focus when modal loses focus', async function() {
      modal.show();
      modal.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      input.focus();
      expect(element.contains(document.activeElement)).to.be.true;
    });

    after(function() {
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

    before(function() {
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
      expect(element.classList.contains('is-visible')).to.be.true;
    });

    afterEach(function() {
      modal.release();
      events.reset();
      element.classList.remove('is-visible');
    });

    after(function() {
      document.body.removeChild(container);
    });
  });
});
