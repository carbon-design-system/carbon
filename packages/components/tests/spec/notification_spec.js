import EventManager from '../utils/event-manager';
import Notification from '../../src/components/notification/notification';
import HTML from '../../html/notification/toast-notification.html';
import flattenOptions from '../utils/flatten-options';

describe('ToastNotification', function() {
  describe('Constructor', function() {
    let toastElement;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    beforeAll(function() {
      document.body.appendChild(wrapper);
      toastElement = document.querySelector('.bx--toast-notification--error');
    });

    it('Should throw if root element is not given', function() {
      expect(() => {
        new Notification();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new Notification(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('should set default options', function() {
      const instance = new Notification(toastElement);
      expect(flattenOptions(instance.options)).toEqual({
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
      expect(toastInstance.options.selectorInit).toBe('[data-id="foo"]');
      toastInstance.release();
    });

    it('should search for close-button element with options.selectorButton', function() {
      const toastInstance = new Notification(toastElement);
      const toastButton = toastElement.querySelector(
        toastInstance.options.selectorButton
      );
      expect(toastButton).toBe(toastInstance.button);
      toastInstance.release();
    });

    afterAll(function() {
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
      spyOn(instance, 'remove');
      instance.button.dispatchEvent(
        new CustomEvent('click', { bubbles: true })
      );
      expect(instance.remove).toHaveBeenCalled();
    });

    it('should remove notification on click event', function() {
      instance.button.dispatchEvent(
        new CustomEvent('click', { bubbles: true })
      );
      expect(document.querySelector('.bx--toast-notification--error')).toBe(
        null
      );
    });

    it('should emit notification-before-delete event on click', function() {
      const spyNotificationCloseEvent = jasmine.createSpy();
      events.on(
        element,
        'notification-before-delete',
        spyNotificationCloseEvent
      );
      instance.button.dispatchEvent(
        new CustomEvent('click', { bubbles: true })
      );

      expect(spyNotificationCloseEvent).toHaveBeenCalled();
    });

    it('should emit notification-after-delete event on click', function() {
      const spyNotificationCloseEvent = jasmine.createSpy();
      events.on(
        element,
        'notification-after-delete',
        spyNotificationCloseEvent
      );
      instance.button.dispatchEvent(
        new CustomEvent('click', { bubbles: true })
      );

      expect(spyNotificationCloseEvent).toHaveBeenCalled();
    });

    it('should delete instance from WeakMap with release', function() {
      instance.release();
      expect(Notification.components.get(element)).toBe(undefined);
    });

    afterEach(function() {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });
});
