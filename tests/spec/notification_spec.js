import EventManager from '../utils/event-manager';
import Notification from '../../src/components/notification/notification';
import HTML from '../../src/components/notification/toast-notification.html';

describe('ToastNotification', function() {
  describe('Constructor', function() {
    let toastElement;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    before(function() {
      document.body.appendChild(wrapper);
      toastElement = document.querySelector('.bx--toast-notification--error');
    });

    it('Should throw if root element is not given', function() {
      expect(() => {
        new Notification();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new Notification(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('should set default options', function() {
      const instance = new Notification(toastElement);
      expect(instance.options).to.deep.equal({
        selectorInit: '[data-notification]',
        selectorButton: '[data-notification-btn]',
        eventBeforeDeleteNotification: 'notification-before-delete',
        eventAfterDeleteNotification: 'notification-after-delete',
      });
    });

    it('should search for an element with options.selectorInit', function() {
      toastElement.dataset.id = 'foo';
      const toastInstance = new Notification(toastElement, {
        selectorInit: '[data-id="foo"]',
      });
      expect(toastInstance.options.selectorInit).to.equal('[data-id="foo"]');
      toastInstance.release();
    });

    it('should search for close-button element with options.selectorButton', function() {
      const toastInstance = new Notification(toastElement);
      const toastButton = toastElement.querySelector(toastInstance.options.selectorButton);
      expect(toastButton).to.equal(toastInstance.button);
      toastInstance.release();
    });

    after(function() {
      document.body.removeChild(wrapper);
    });
  });

  describe('Remove notification', function() {
    let element;
    let instance;
    let events;
    let wrapper;

    beforeEach(function() {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      events = new EventManager();
      document.body.appendChild(wrapper);
      element = document.querySelector('.bx--toast-notification--error');
      instance = new Notification(element);
    });

    it('should call remove method', function() {
      const stub = sinon.stub(instance, 'remove');
      stub('remove');
      expect(stub).to.have.been.called;
    });

    it('should remove notification on click event', function() {
      instance.button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(document.querySelector('.bx--toast-notification--error')).to.be.null;
    });

    it('should emit notification-before-delete event on click', function() {
      const spyNotificationCloseEvent = sinon.spy();
      events.on(element, 'notification-before-delete', spyNotificationCloseEvent);
      instance.button.dispatchEvent(new CustomEvent('click', { bubbles: true }));

      expect(spyNotificationCloseEvent).to.have.been.called;
    });

    it('should emit notification-after-delete event on click', function() {
      const spyNotificationCloseEvent = sinon.spy();
      events.on(element, 'notification-after-delete', spyNotificationCloseEvent);
      instance.button.dispatchEvent(new CustomEvent('click', { bubbles: true }));

      expect(spyNotificationCloseEvent).to.have.been.called;
    });

    it('should delete instance from WeakMap with release', function() {
      instance.release();
      expect(Notification.components.get(element)).to.be.undefined;
    });

    afterEach(function() {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });
});
