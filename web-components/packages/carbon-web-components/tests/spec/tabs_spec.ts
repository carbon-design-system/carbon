/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import EventManager from '../utils/event-manager';
import BXTabs from '../../src/components/tabs/tabs';
import BXTab from '../../src/components/tabs/tab';
import { Default } from '../../src/components/tabs/tabs-story';

const template = (props?) =>
  Default({
    'bx-tabs': props,
  });

describe('bx-tabs', function () {
  describe('Toggling', function () {
    it('should toggle "open" attribute', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      const inner = elem!.shadowRoot!.getElementById('trigger');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('bx--tabs-trigger--open')).toBe(true);
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('bx--tabs-trigger--open')).toBe(false);
    });

    it('should always close dropdown when clicking document', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      const inner = elem!.shadowRoot!.getElementById('trigger');
      (inner as HTMLElement).click();
      await Promise.resolve();
      document.documentElement.click();
      expect(elem!.classList.contains('bx--tabs-trigger--open')).toBe(false);
    });

    it('should close dropdown when clicking on an item', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      const inner = elem!.shadowRoot!.getElementById('trigger');
      (inner as HTMLElement).click();
      await Promise.resolve();
      (document.body.querySelector('bx-tab') as HTMLElement).click();
      expect(elem!.classList.contains('bx--tabs-trigger--open')).toBe(false);
    });
  });

  describe('Selecting an item', function () {
    const events = new EventManager();

    it('should add/remove "selected" attribute', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('bx-tab');
      (itemNodes[2] as HTMLElement).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should update text', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      const itemNodes = document.body.querySelectorAll('bx-tab');
      (itemNodes[2] as HTMLElement).click();
      await Promise.resolve();
      expect(
        elem!.shadowRoot!.getElementById('trigger-label')!.textContent!.trim()
      ).toBe('Option 3');
    });

    it('should update value', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('bx-tab');
      (itemNodes[2] as HTMLElement).click();
      await Promise.resolve();
      expect((document.body.querySelector('bx-tabs') as BXTabs).value).toBe(
        'staging'
      );
    });

    it('should provide a way to switch item with a value', async function () {
      render(template(), document.body);
      await Promise.resolve();
      (document.body.querySelector('bx-tabs') as BXTabs).value = 'staging';
      await Promise.resolve(); // Update cycle for `<bx-tabs>`
      await Promise.resolve(); // Update cycle for `<bx-tab>`
      const itemNodes = document.body.querySelectorAll('bx-tab');
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should provide a way to cancel switching item', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      const itemNodes = document.body.querySelectorAll('bx-tab');
      (document.body.querySelector('bx-tabs') as BXTabs).value = 'all';
      await Promise.resolve();
      events.on(elem!, 'bx-tabs-beingselected', (event: CustomEvent) => {
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
        elem!.shadowRoot!.getElementById('trigger-label')!.textContent!.trim()
      ).toBe('Option 1');
    });

    afterEach(async function () {
      events.reset();
    });
  });

  describe('Keyboard navigation', function () {
    it('should support closing narrow mode dropdown by ESC key', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      (elem as any)._open = true;
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'Escape',
        })
      );
      expect((elem as any)._open).toBe(false);
    });

    it('should support left key in non-narrow mode', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      (elem as BXTabs).value = 'all';
      await Promise.resolve(); // Update cycle for `<bx-tabs>`
      await Promise.resolve(); // Update cycle for `<bx-tab>`
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue(null);
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'ArrowLeft',
        })
      );
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('bx-tab');
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(true);
    });

    it('should support right key in non-narrow mode', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      (elem as BXTabs).value = 'router';
      await Promise.resolve(); // Update cycle for `<bx-tabs>`
      await Promise.resolve(); // Update cycle for `<bx-tab>`
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue(null);
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'ArrowRight',
        })
      );
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('bx-tab');
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should support up key in narrow mode', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      (elem as BXTabs).value = 'all';
      (elem as any)._open = true;
      await Promise.resolve(); // Update cycle for `<bx-tabs>`
      await Promise.resolve(); // Update cycle for `<bx-tab>`
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue({});
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'ArrowUp',
        })
      );
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('bx-tab');
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(true);
    });

    it('should support down key in narrow mode', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      (elem as BXTabs).value = 'router';
      (elem as any)._open = true;
      await Promise.resolve(); // Update cycle for `<bx-tabs>`
      await Promise.resolve(); // Update cycle for `<bx-tab>`
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue({});
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'ArrowDown',
        })
      );
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('bx-tab');
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(true);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
    });

    it('should open the dropdown with down key in narrow mode', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      (elem as BXTabs).value = 'all';
      await Promise.resolve(); // Update cycle for `<bx-tabs>`
      await Promise.resolve(); // Update cycle for `<bx-tab>`
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue({});
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'ArrowDown',
        })
      );
      await Promise.resolve();
      expect((elem as any)._open).toBe(true);
      const itemNodes = document.body.querySelectorAll('bx-tab');
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
    });

    it('should open the dropdown with up key in narrow mode', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      (elem as BXTabs).value = 'all';
      await Promise.resolve(); // Update cycle for `<bx-tabs>`
      await Promise.resolve(); // Update cycle for `<bx-tab>`
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue({});
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'ArrowUp',
        })
      );
      await Promise.resolve();
      expect((elem as any)._open).toBe(true);
      const itemNodes = document.body.querySelectorAll('bx-tab');
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
    });

    it('should open the dropdown with space key in narrow mode', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue({});
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: ' ',
        })
      );
      expect((elem as any)._open).toBe(true);
    });

    it('should select the highlighted item with space key in narrow mode', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      (elem as any)._open = true;
      const itemNodes = document.body.querySelectorAll('bx-tab');
      (itemNodes[2] as BXTab).highlighted = true;
      await Promise.resolve();
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue({});
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: ' ',
        })
      );
      await Promise.resolve();
      expect((elem as any)._open).toBe(false);
      expect((elem as BXTabs).value).toBe('staging');
    });

    it('should simply close the dropdown if user tries to choose the same selection in narrow mode', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      (elem as BXTabs).value = 'staging';
      (elem as any)._open = true;
      const itemNodes = document.body.querySelectorAll('bx-tab');
      (itemNodes[2] as BXTab).highlighted = true;
      await Promise.resolve(); // Update cycle for `<bx-tabs>`
      await Promise.resolve(); // Update cycle for `<bx-tab>`
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue({});
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: ' ',
        })
      );
      expect((elem as any)._open).toBe(false);
    });

    it('should support closing the dropdown without an highlighted item in narrow mode', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      (elem as any)._open = true;
      const triggerNode = elem!.shadowRoot!.getElementById('trigger');
      spyOnProperty(triggerNode!, 'offsetParent').and.returnValue({});
      elem!.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: ' ',
        })
      );
      expect((elem as any)._open).toBe(false);
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
