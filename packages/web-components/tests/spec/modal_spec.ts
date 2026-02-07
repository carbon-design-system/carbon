/**
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

describe('cds-modal', () => {
  describe('Showing/hiding functions', () => {
    let elem: HTMLElement | null;
    const events = new EventManager();

    beforeEach(async () => {
      elem = document.body.appendChild(document.createElement('cds-modal'));
      await Promise.resolve(); // Wait for initial render
    });

    it('Should have opening modal do nothing if already visible', async () => {
      (elem as unknown as CDSModal).open = true;
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.innerHTML = '<input type="text">';
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const input = elem!.querySelector('input');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOn(input!, 'focus');
      (elem as unknown as CDSModal).open = true;
      await Promise.resolve(); // For triggering the update cycle of `<cds-modal>`
      await Promise.resolve(); // `update()` in `<cds-modal>` waits for child nodes' update cycles to run
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(input!.focus).not.toHaveBeenCalled();
    });

    it('Should focus on modal upon showning', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOn(CDSModal as any, '_delay').and.callFake(() => {});
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.innerHTML = '<input type="text">';
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const input = elem!.querySelector('input');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOn(input!, 'focus');
      (elem as unknown as CDSModal).open = true;
      await Promise.resolve(); // For triggering the update cycle of `<cds-modal>`
      await Promise.resolve(); // `update()` in `<cds-modal>` waits for child nodes' update cycles to run
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(input!.focus).toHaveBeenCalled();
    });

    it('Should support specifying the primary focus element', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOn(CDSModal as any, '_delay').and.callFake(() => {});
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.innerHTML =
        '<input type="text"><button data-modal-primary-focus></button>';
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const input = elem!.querySelector('input');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const button = elem!.querySelector('button');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOn(input!, 'focus');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOn(button!, 'focus');
      (elem as unknown as CDSModal).open = true;
      await Promise.resolve(); // For triggering the update cycle of `<cds-modal>`
      await Promise.resolve(); // `update()` in `<cds-modal>` waits for child nodes' update cycles to run
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(input!.focus).not.toHaveBeenCalled();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(button!.focus).toHaveBeenCalled();
    });

    it('Should support using primary button in footer as the primary focus element', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOn(CDSModal as any, '_delay').and.callFake(() => {});
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.innerHTML =
        '<input type="text"><cds-modal-footer><cds-button kind="primary"></cds-button></cds-modal-footer>';
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const input = elem!.querySelector('input');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const button = elem!.querySelector('cds-button');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOn(input!, 'focus');
      spyOn(button as HTMLButtonElement, 'focus');
      (elem as unknown as CDSModal).open = true;
      await Promise.resolve(); // For triggering the update cycle of `<cds-modal>`
      await Promise.resolve(); // `update()` in `<cds-modal>` waits for child nodes' update cycles to run
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(input!.focus).not.toHaveBeenCalled();
      expect((button as HTMLButtonElement).focus).toHaveBeenCalled();
    });

    it('Should have closing modal do nothing if already visible', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.innerHTML = '<cds-modal-close-button></cds-modal-close-button>';
      const spyBeforeClosed = jasmine.createSpy('before closed');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      events.on(elem!, 'cds-modal-beingclosed', spyBeforeClosed);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      (elem!.querySelector('cds-modal-close-button') as HTMLElement).click();
      await Promise.resolve();
      expect(spyBeforeClosed).not.toHaveBeenCalled();
    });

    it('Should fire cds-modal-beingclosed/cds-modal-closed events upon hiding', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.innerHTML = '<cds-modal-close-button></cds-modal-close-button>';
      (elem as CDSModal).open = true;
      await Promise.resolve();
      const spyBeforeClosed = jasmine.createSpy('before closed');
      const spyAfterClosed = jasmine.createSpy('after closed');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      events.on(elem!, 'cds-modal-beingclosed', spyBeforeClosed);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      events.on(elem!, 'cds-modal-closed', spyAfterClosed);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      (elem!.querySelector('cds-modal-close-button') as HTMLElement).click();
      await Promise.resolve();
      expect(spyBeforeClosed).toHaveBeenCalled();
      expect(spyAfterClosed).toHaveBeenCalled();
    });

    it('Should focus on the launcher button upon hiding', async () => {
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

    it('Should support preventing modal from being closed upon user gesture', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.innerHTML = '<cds-modal-close-button></cds-modal-close-button>';
      (elem as CDSModal).open = true;
      await Promise.resolve();
      const spyAfterClosed = jasmine.createSpy('after closed');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      events.on(elem!, 'cds-modal-beingclosed', (event) => {
        event.preventDefault();
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      events.on(elem!, 'cds-modal-closed', spyAfterClosed);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      (elem!.querySelector('cds-modal-close-button') as HTMLElement).click();
      await Promise.resolve();
      expect(spyAfterClosed).not.toHaveBeenCalled();
    });

    afterEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.parentNode!.removeChild(elem!);
    });
  });

  describe('The various close actions', () => {
    let elem: HTMLElement | null;
    const events = new EventManager();

    beforeEach(async () => {
      elem = document.body.appendChild(document.createElement('cds-modal'));
      await Promise.resolve(); // Wait for initial render
    });

    it('Should handle the ESC key to close the modal', async () => {
      (elem as CDSModal).open = true;
      await Promise.resolve();
      const spyBeforeClosed = jasmine.createSpy('before closed');
      const spyAfterClosed = jasmine.createSpy('after closed');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      events.on(elem!, 'cds-modal-beingclosed', spyBeforeClosed);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      events.on(elem!, 'cds-modal-closed', spyAfterClosed);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(eventDataBeforeClosed.triggeredBy).toBe(elem!.ownerDocument!.body);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(eventDataAfterClosed.triggeredBy).toBe(elem!.ownerDocument!.body);
    });

    it('Should handle the IE-specific ESC key to close the modal', async () => {
      (elem as CDSModal).open = true;
      await Promise.resolve();
      const spyBeforeClosed = jasmine.createSpy('before closed');
      const spyAfterClosed = jasmine.createSpy('after closed');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      events.on(elem!, 'cds-modal-beingclosed', spyBeforeClosed);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      events.on(elem!, 'cds-modal-closed', spyAfterClosed);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(eventDataBeforeClosed.triggeredBy).toBe(elem!.ownerDocument!.body);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(eventDataAfterClosed.triggeredBy).toBe(elem!.ownerDocument!.body);
    });

    it('Should handle any elements with data-modal-close attribute to close the modal', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.innerHTML = '<button data-modal-close></button>';
      (elem as CDSModal).open = true;
      await Promise.resolve();
      const spyBeforeClosed = jasmine.createSpy('before closed');
      const spyAfterClosed = jasmine.createSpy('after closed');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      events.on(elem!, 'cds-modal-beingclosed', spyBeforeClosed);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      events.on(elem!, 'cds-modal-closed', spyAfterClosed);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
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

    it('Should handle any click outside the modal element to close the modal', async () => {
      (elem as CDSModal).open = true;
      await Promise.resolve();
      const spyBeforeClosed = jasmine.createSpy('before closed');
      const spyAfterClosed = jasmine.createSpy('after closed');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      events.on(elem!, 'cds-modal-beingclosed', spyBeforeClosed);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      events.on(elem!, 'cds-modal-closed', spyAfterClosed);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
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

    afterEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.parentNode!.removeChild(elem!);
    });
  });

  describe('Wrapping focus while modal is open', () => {
    let elem: HTMLElement | null;
    let buttonBefore: HTMLButtonElement | null;
    let buttonAfter: HTMLButtonElement | null;

    if (!document.hasFocus()) {
      return;
    }

    beforeEach(async () => {
      elem = document.body.appendChild(document.createElement('cds-modal'));
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.innerHTML = '<input type="text"><input type="text">';
      buttonBefore = document.body.insertBefore(
        document.createElement('button'),
        document.body.firstChild
      );
      buttonAfter = document.body.appendChild(document.createElement('button'));
      await Promise.resolve(); // Wait for initial render
    });

    it('Should support forward focus-wrap', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOn(CDSModal as any, '_delay').and.callFake(() => {});
      (elem as CDSModal).open = true;
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      buttonAfter!.focus();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(document.activeElement).toBe(elem!.querySelectorAll('input')[0]);
    });

    it('Should support backward focus-wrap', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOn(CDSModal as any, '_delay').and.callFake(() => {});
      (elem as CDSModal).open = true;
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      buttonBefore!.focus();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(document.activeElement).toBe(elem!.querySelectorAll('input')[1]);
    });

    afterEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.parentNode!.removeChild(elem!);
    });
  });
});
