/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import EventManager from '../utils/event-manager';
import CDSTabs from '../../src/components/tabs/tabs';
import CDSTab from '../../src/components/tabs/tab';
import { Playground } from '../../src/components/tabs/tabs.stories';

const template = (props?) =>
  Playground({
    'cds-tabs': props,
  });

xdescribe('cds-tabs', () => {
  describe('Toggling', () => {
    it('should toggle "open" attribute', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-tabs');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const inner = elem!.shadowRoot!.getElementById('trigger');
      (inner as HTMLElement).click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(inner!.classList.contains('cds--tabs-trigger--open')).toBe(true);
      (inner as HTMLElement).click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(inner!.classList.contains('cds--tabs-trigger--open')).toBe(false);
    });

    it('should always close dropdown when clicking document', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-tabs');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const inner = elem!.shadowRoot!.getElementById('trigger');
      (inner as HTMLElement).click();
      await Promise.resolve();
      document.documentElement.click();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(elem!.classList.contains('cds--tabs-trigger--open')).toBe(false);
    });

    it('should close dropdown when clicking on an item', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-tabs');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const inner = elem!.shadowRoot!.getElementById('trigger');
      (inner as HTMLElement).click();
      await Promise.resolve();
      (document.body.querySelector('cds-tab') as HTMLElement).click();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(elem!.classList.contains('cds--tabs-trigger--open')).toBe(false);
    });
  });

  describe('Selecting an item', () => {
    const events = new EventManager();

    it('should add/remove "selected" attribute', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('cds-tab');
      (itemNodes[2] as HTMLElement).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should update text', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-tabs');
      const itemNodes = document.body.querySelectorAll('cds-tab');
      (itemNodes[2] as HTMLElement).click();
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        elem!.shadowRoot!.getElementById('trigger-label')!.textContent!.trim()
      ).toBe('Option 3');
    });

    it('should update value', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('cds-tab');
      (itemNodes[2] as HTMLElement).click();
      await Promise.resolve();
      expect((document.body.querySelector('cds-tabs') as CDSTabs).value).toBe(
        'staging'
      );
    });

    it('should provide a way to switch item with a value', async () => {
      render(template(), document.body);
      await Promise.resolve();
      (document.body.querySelector('cds-tabs') as CDSTabs).value = 'staging';
      await Promise.resolve(); // Update cycle for `<cds-tabs>`
      await Promise.resolve(); // Update cycle for `<cds-tab>`
      const itemNodes = document.body.querySelectorAll('cds-tab');
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should provide a way to cancel switching item', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-tabs');
      const itemNodes = document.body.querySelectorAll('cds-tab');
      (document.body.querySelector('cds-tabs') as CDSTabs).value = 'all';
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      events.on(elem!, 'cds-tabs-beingselected', (event: CustomEvent) => {
        expect(event.detail.item).toBe(itemNodes[2]);
        event.preventDefault();
      });
      (itemNodes[2] as HTMLElement).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        elem!.shadowRoot!.getElementById('trigger-label')!.textContent!.trim()
      ).toBe('Option 1');
    });

    afterEach(async () => {
      events.reset();
    });
  });

  describe('Keyboard navigation', () => {
    it('should support closing narrow mode dropdown by ESC key', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-tabs');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      (elem as any)._open = true;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'Escape',
        })
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      expect((elem as any)._open).toBe(false);
    });

    it('should support left key in non-narrow mode', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-tabs');
      (elem as CDSTabs).value = 'all';
      await Promise.resolve(); // Update cycle for `<cds-tabs>`
      await Promise.resolve(); // Update cycle for `<cds-tab>`
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue(null);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'ArrowLeft',
        })
      );
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('cds-tab');
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(true);
    });

    it('should support right key in non-narrow mode', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-tabs');
      (elem as CDSTabs).value = 'router';
      await Promise.resolve(); // Update cycle for `<cds-tabs>`
      await Promise.resolve(); // Update cycle for `<cds-tab>`
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue(null);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'ArrowRight',
        })
      );
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('cds-tab');
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should support up key in narrow mode', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-tabs');
      (elem as CDSTabs).value = 'all';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      (elem as any)._open = true;
      await Promise.resolve(); // Update cycle for `<cds-tabs>`
      await Promise.resolve(); // Update cycle for `<cds-tab>`
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue({});
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'ArrowUp',
        })
      );
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('cds-tab');
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(true);
    });

    it('should support down key in narrow mode', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-tabs');
      (elem as CDSTabs).value = 'router';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      (elem as any)._open = true;
      await Promise.resolve(); // Update cycle for `<cds-tabs>`
      await Promise.resolve(); // Update cycle for `<cds-tab>`
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue({});
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'ArrowDown',
        })
      );
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('cds-tab');
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(true);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
    });

    it('should open the dropdown with down key in narrow mode', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-tabs');
      (elem as CDSTabs).value = 'all';
      await Promise.resolve(); // Update cycle for `<cds-tabs>`
      await Promise.resolve(); // Update cycle for `<cds-tab>`
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue({});
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'ArrowDown',
        })
      );
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      expect((elem as any)._open).toBe(true);
      const itemNodes = document.body.querySelectorAll('cds-tab');
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
    });

    it('should open the dropdown with up key in narrow mode', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-tabs');
      (elem as CDSTabs).value = 'all';
      await Promise.resolve(); // Update cycle for `<cds-tabs>`
      await Promise.resolve(); // Update cycle for `<cds-tab>`
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue({});
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'ArrowUp',
        })
      );
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      expect((elem as any)._open).toBe(true);
      const itemNodes = document.body.querySelectorAll('cds-tab');
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
    });

    it('should open the dropdown with space key in narrow mode', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-tabs');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue({});
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: ' ',
        })
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      expect((elem as any)._open).toBe(true);
    });

    it('should select the highlighted item with space key in narrow mode', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-tabs');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      (elem as any)._open = true;
      const itemNodes = document.body.querySelectorAll('cds-tab');
      (itemNodes[2] as CDSTab).highlighted = true;
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue({});
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: ' ',
        })
      );
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      expect((elem as any)._open).toBe(false);
      expect((elem as CDSTabs).value).toBe('staging');
    });

    it('should simply close the dropdown if user tries to choose the same selection in narrow mode', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-tabs');
      (elem as CDSTabs).value = 'staging';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      (elem as any)._open = true;
      const itemNodes = document.body.querySelectorAll('cds-tab');
      (itemNodes[2] as CDSTab).highlighted = true;
      await Promise.resolve(); // Update cycle for `<cds-tabs>`
      await Promise.resolve(); // Update cycle for `<cds-tab>`
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue({});
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: ' ',
        })
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      expect((elem as any)._open).toBe(false);
    });

    it('should support closing the dropdown without an highlighted item in narrow mode', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-tabs');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      (elem as any)._open = true;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue({});
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: ' ',
        })
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      expect((elem as any)._open).toBe(false);
    });
  });

  afterEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
    await render(undefined!, document.body);
  });
});
