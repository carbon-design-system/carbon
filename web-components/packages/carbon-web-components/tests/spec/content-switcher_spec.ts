/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import EventManager from '../utils/event-manager';
import BXTabs from '../../src/components/tabs/tabs';
import { Default } from '../../src/components/content-switcher/content-switcher-story';

const template = (props?) =>
  Default({
    'bx-content-switcher': props,
  });

describe('bx-content-switcher', function () {
  describe('Selecting an item', function () {
    const events = new EventManager();

    it('should add/remove "selected" attribute', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('bx-content-switcher-item');
      (itemNodes[2] as HTMLElement).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should update value', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('bx-content-switcher-item');
      (itemNodes[2] as HTMLElement).click();
      await Promise.resolve();
      expect((document.body.querySelector('bx-content-switcher') as BXTabs).value).toBe('staging');
    });

    it('should provide a way to switch item with a value', async function () {
      render(template(), document.body);
      await Promise.resolve();
      (document.body.querySelector('bx-content-switcher') as BXTabs).value = 'staging';
      await Promise.resolve(); // Update cycle for `<bx-content-switcher>`
      await Promise.resolve(); // Update cycle for `<bx-content-switcher-item>`
      const itemNodes = document.body.querySelectorAll('bx-content-switcher-item');
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should provide a way to cancel switching item', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-content-switcher');
      const itemNodes = document.body.querySelectorAll('bx-content-switcher-item');
      (document.body.querySelector('bx-content-switcher') as BXTabs).value = 'all';
      await Promise.resolve();
      events.on(elem!, 'bx-content-switcher-beingselected', (event: CustomEvent) => {
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
    });

    afterEach(async function () {
      events.reset();
    });
  });

  describe('Handling hover-over', function () {
    it('should add/remove "hide-divider" attribute', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('bx-content-switcher-item');
      itemNodes[0].dispatchEvent(new CustomEvent('mouseover', { bubbles: true }));
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[1].hasAttribute('hide-divider')).toBe(true);
      expect(itemNodes[2].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[3].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[4].hasAttribute('hide-divider')).toBe(false);
      itemNodes[0].dispatchEvent(new CustomEvent('mouseout', { bubbles: true }));
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[1].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[2].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[3].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[4].hasAttribute('hide-divider')).toBe(false);
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
