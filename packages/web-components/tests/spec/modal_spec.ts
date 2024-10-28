/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import EventManager from '../utils/event-manager';

import CDSModal from '../../src/components/modal/modal';
// Above import is interface-only ref and thus code won't be brought into the build
import '../../src/components/modal/modal';
import '../../src/components/modal/modal-close-button';

describe('cds-modal', function () {
  describe('Showing/hiding functions', function () {
    let elem: HTMLElement | null;
    const events = new EventManager();

    beforeEach(async function () {
      elem = document.body.appendChild(document.createElement('cds-modal'));
      await Promise.resolve(); // Wait for initial render
    });

    it('Should have opening modal do nothing if already visible', async function () {
      (elem as unknown as CDSModal).open = true;
      await Promise.resolve();
      elem!.innerHTML = '<input type="text">';
      const input = elem!.querySelector('input');
      spyOn(input!, 'focus');
      (elem as unknown as CDSModal).open = true;
      await Promise.resolve(); // For triggering the update cycle of `<cds-modal>`
      await Promise.resolve(); // `update()` in `<cds-modal>` waits for child nodes' update cycles to run
      expect(input!.focus).not.toHaveBeenCalled();
    });

    it('Should focus on modal upon showning', async function () {
      spyOn(CDSModal as any, '_delay').and.callFake(() => {});
      elem!.innerHTML = '<input type="text">';
      const input = elem!.querySelector('input');
      spyOn(input!, 'focus');
      (elem as unknown as CDSModal).open = true;
      await Promise.resolve(); // For triggering the update cycle of `<cds-modal>`
      await Promise.resolve(); // `update()` in `<cds-modal>` waits for child nodes' update cycles to run
      expect(input!.focus).toHaveBeenCalled();
    });

    it('Should support specifying the primary focus element', async function () {
      spyOn(CDSModal as any, '_delay').and.callFake(() => {});
      elem!.innerHTML =
        '<input type="text"><button data-modal-primary-focus></button>';
      const input = elem!.querySelector('input');
      const button = elem!.querySelector('button');
      spyOn(input!, 'focus');
      spyOn(button!, 'focus');
      (elem as unknown as CDSModal).open = true;
      await Promise.resolve(); // For triggering the update cycle of `<cds-modal>`
      await Promise.resolve(); // `update()` in `<cds-modal>` waits for child nodes' update cycles to run
      expect(input!.focus).not.toHaveBeenCalled();
      expect(button!.focus).toHaveBeenCalled();
    });

    it('Should support using primary button in footer as the primary focus element', async function () {
      spyOn(CDSModal as any, '_delay').and.callFake(() => {});
      elem!.innerHTML =
        '<input type="text"><cds-modal-footer><cds-button kind="primary"></cds-button></cds-modal-footer>';
      const input = elem!.querySelector('input');
      const button = elem!.querySelector('cds-button');
      spyOn(input!, 'focus');
      spyOn(button as HTMLButtonElement, 'focus');
      (elem as unknown as CDSModal).open = true;
      await Promise.resolve(); // For triggering the update cycle of `<cds-modal>`
      await Promise.resolve(); // `update()` in `<cds-modal>` waits for child nodes' update cycles to run
      expect(input!.focus).not.toHaveBeenCalled();
      expect((button as HTMLButtonElement).focus).toHaveBeenCalled();
    });

    it('Should have closing modal do nothing if already visible', async function () {
      elem!.innerHTML = '<cds-modal-close-button></cds-modal-close-button>';
      const spyBeforeClosed = jasmine.createSpy('before closed');
      events.on(elem!, 'cds-modal-beingclosed', spyBeforeClosed);
      (elem!.querySelector('cds-modal-close-button') as HTMLElement).click();
      await Promise.resolve();
      expect(spyBeforeClosed).not.toHaveBeenCalled();
    });

    it('Should fire cds-modal-beingclosed/cds-modal-closed events upon hiding', async function () {
      elem!.innerHTML = '<cds-modal-close-button></cds-modal-close-button>';
      (elem as CDSModal).open = true;
      await Promise.resolve();
      const spyBeforeClosed = jasmine.createSpy('before closed');
      const spyAfterClosed = jasmine.createSpy('after closed');
      events.on(elem!, 'cds-modal-beingclosed', spyBeforeClosed);
      events.on(elem!, 'cds-modal-closed', spyAfterClosed);
      (elem!.querySelector('cds-modal-close-button') as HTMLElement).click();
      await Promise.resolve();
      expect(spyBeforeClosed).toHaveBeenCalled();
      expect(spyAfterClosed).toHaveBeenCalled();
    });

    it('Should focus on the launcher button upon hiding', async function () {
      elem = document.body.appendChild(document.createElement('div'));
      const button = elem.appendChild(document.createElement('button'));
      button.focus();
      spyOn(button, 'focus');
      const modal = elem.appendChild(document.createElement('cds-modal'));
      await Promise.resolve(); // Wait for initial render
      (modal as CDSModal).open = true;
      await Promise.resolve();
      (modal as CDSModal).open = false;
      await Promise.resolve();
      expect(button.focus).toHaveBeenCalled();
    });

    it('Should support preventing modal from being closed upon user gesture', async function () {
      elem!.innerHTML = '<cds-modal-close-button></cds-modal-close-button>';
      (elem as CDSModal).open = true;
      await Promise.resolve();
      const spyAfterClosed = jasmine.createSpy('after closed');
      events.on(elem!, 'cds-modal-beingclosed', (event) => {
        event.preventDefault();
      });
      events.on(elem!, 'cds-modal-closed', spyAfterClosed);
      (elem!.querySelector('cds-modal-close-button') as HTMLElement).click();
      await Promise.resolve();
      expect(spyAfterClosed).not.toHaveBeenCalled();
    });

    afterEach(function () {
      elem!.parentNode!.removeChild(elem!);
    });
  });

  describe('The various close actions', function () {
    let elem: HTMLElement | null;
    const events = new EventManager();

    beforeEach(async function () {
      elem = document.body.appendChild(document.createElement('cds-modal'));
      await Promise.resolve(); // Wait for initial render
    });

    it('Should handle the ESC key to close the modal', async function () {
      (elem as CDSModal).open = true;
      await Promise.resolve();
      const spyBeforeClosed = jasmine.createSpy('before closed');
      const spyAfterClosed = jasmine.createSpy('after closed');
      events.on(elem!, 'cds-modal-beingclosed', spyBeforeClosed);
      events.on(elem!, 'cds-modal-closed', spyAfterClosed);
      elem!.ownerDocument!.body.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'Escape',
        })
      );
      await Promise.resolve();
      expect((elem as CDSModal).open).toBeFalsy();
      expect(spyBeforeClosed).toHaveBeenCalled();
      expect(spyAfterClosed).toHaveBeenCalled();
      const eventDataBeforeClosed = spyBeforeClosed.calls.argsFor(0)[0].detail;
      const eventDataAfterClosed = spyAfterClosed.calls.argsFor(0)[0].detail;
      expect(eventDataBeforeClosed.triggeredBy).toBe(elem!.ownerDocument!.body);
      expect(eventDataAfterClosed.triggeredBy).toBe(elem!.ownerDocument!.body);
    });

    it('Should handle the IE-specific ESC key to close the modal', async function () {
      (elem as CDSModal).open = true;
      await Promise.resolve();
      const spyBeforeClosed = jasmine.createSpy('before closed');
      const spyAfterClosed = jasmine.createSpy('after closed');
      events.on(elem!, 'cds-modal-beingclosed', spyBeforeClosed);
      events.on(elem!, 'cds-modal-closed', spyAfterClosed);
      elem!.ownerDocument!.body.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'Esc',
        })
      );
      await Promise.resolve();
      expect((elem as CDSModal).open).toBeFalsy();
      expect(spyBeforeClosed).toHaveBeenCalled();
      expect(spyAfterClosed).toHaveBeenCalled();
      const eventDataBeforeClosed = spyBeforeClosed.calls.argsFor(0)[0].detail;
      const eventDataAfterClosed = spyAfterClosed.calls.argsFor(0)[0].detail;
      expect(eventDataBeforeClosed.triggeredBy).toBe(elem!.ownerDocument!.body);
      expect(eventDataAfterClosed.triggeredBy).toBe(elem!.ownerDocument!.body);
    });

    it('Should handle any elements with data-modal-close attribute to close the modal', async function () {
      elem!.innerHTML = '<button data-modal-close></button>';
      (elem as CDSModal).open = true;
      await Promise.resolve();
      const spyBeforeClosed = jasmine.createSpy('before closed');
      const spyAfterClosed = jasmine.createSpy('after closed');
      events.on(elem!, 'cds-modal-beingclosed', spyBeforeClosed);
      events.on(elem!, 'cds-modal-closed', spyAfterClosed);
      const closeButton = elem!.querySelector('button') as HTMLElement;
      closeButton.click();
      await Promise.resolve();
      expect((elem as CDSModal).open).toBeFalsy();
      expect(spyBeforeClosed).toHaveBeenCalled();
      expect(spyAfterClosed).toHaveBeenCalled();
      const eventDataBeforeClosed = spyBeforeClosed.calls.argsFor(0)[0].detail;
      const eventDataAfterClosed = spyAfterClosed.calls.argsFor(0)[0].detail;
      expect(eventDataBeforeClosed.triggeredBy).toBe(closeButton);
      expect(eventDataAfterClosed.triggeredBy).toBe(closeButton);
    });

    it('Should handle any click outside the modal element to close the modal', async function () {
      (elem as CDSModal).open = true;
      await Promise.resolve();
      const spyBeforeClosed = jasmine.createSpy('before closed');
      const spyAfterClosed = jasmine.createSpy('after closed');
      events.on(elem!, 'cds-modal-beingclosed', spyBeforeClosed);
      events.on(elem!, 'cds-modal-closed', spyAfterClosed);
      elem!.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await Promise.resolve();
      expect((elem as CDSModal).open).toBeFalsy();
      expect(spyBeforeClosed).toHaveBeenCalled();
      expect(spyAfterClosed).toHaveBeenCalled();
      const eventDataBeforeHidden = spyBeforeClosed.calls.argsFor(0)[0].detail;
      const eventDataAfterHidden = spyAfterClosed.calls.argsFor(0)[0].detail;
      expect(eventDataBeforeHidden.triggeredBy).toBe(elem);
      expect(eventDataAfterHidden.triggeredBy).toBe(elem);
    });

    afterEach(function () {
      elem!.parentNode!.removeChild(elem!);
    });
  });

  describe('Wrapping focus while modal is open', function () {
    let elem: HTMLElement | null;
    let buttonBefore: HTMLButtonElement | null;
    let buttonAfter: HTMLButtonElement | null;

    if (!document.hasFocus()) {
      return;
    }

    beforeEach(async function () {
      elem = document.body.appendChild(document.createElement('cds-modal'));
      elem!.innerHTML = '<input type="text"><input type="text">';
      buttonBefore = document.body.insertBefore(
        document.createElement('button'),
        document.body.firstChild
      );
      buttonAfter = document.body.appendChild(document.createElement('button'));
      await Promise.resolve(); // Wait for initial render
    });

    it('Should support forward focus-wrap', async function () {
      spyOn(CDSModal as any, '_delay').and.callFake(() => {});
      (elem as CDSModal).open = true;
      await Promise.resolve();
      buttonAfter!.focus();
      expect(document.activeElement).toBe(elem!.querySelectorAll('input')[0]);
    });

    it('Should support backward focus-wrap', async function () {
      spyOn(CDSModal as any, '_delay').and.callFake(() => {});
      (elem as CDSModal).open = true;
      await Promise.resolve();
      buttonBefore!.focus();
      expect(document.activeElement).toBe(elem!.querySelectorAll('input')[1]);
    });

    afterEach(function () {
      elem!.parentNode!.removeChild(elem!);
    });
  });
});
