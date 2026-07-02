/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import EventManager from '../utils/event-manager';
import CDSTabs from '../../src/components/tabs/tabs';
import { Playground } from '../../src/components/content-switcher/content-switcher-story';

const template = (props?) =>
  Playground({
    'cds-content-switcher': props,
  });

describe('cds-content-switcher', () => {
  describe('Selecting an item', () => {
    const events = new EventManager();

    xit('should add/remove "selected" attribute', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll(
        'cds-content-switcher-item'
      );
      (itemNodes[2] as HTMLElement).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should update value', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll(
        'cds-content-switcher-item'
      );
      (itemNodes[2] as HTMLElement).click();
      await Promise.resolve();
      expect(
        (document.body.querySelector('cds-content-switcher') as CDSTabs).value
      ).toBe('staging');
    });

    xit('should provide a way to switch item with a value', async () => {
      render(template(), document.body);
      await Promise.resolve();
      (document.body.querySelector('cds-content-switcher') as CDSTabs).value =
        'staging';
      await Promise.resolve(); // Update cycle for `<cds-content-switcher>`
      await Promise.resolve(); // Update cycle for `<cds-content-switcher-item>`
      const itemNodes = document.body.querySelectorAll(
        'cds-content-switcher-item'
      );
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    xit('should provide a way to cancel switching item', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('cds-content-switcher');
      const itemNodes = document.body.querySelectorAll(
        'cds-content-switcher-item'
      );
      (document.body.querySelector('cds-content-switcher') as CDSTabs).value =
        'all';
      await Promise.resolve();
      events.on(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        elem!,
        'cds-content-switcher-beingselected',
        (event: CustomEvent) => {
          expect(event.detail.item).toBe(itemNodes[2]);
          event.preventDefault();
        }
      );
      (itemNodes[2] as HTMLElement).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    afterEach(async () => {
      events.reset();
    });
  });

  describe('Handling hover-over', () => {
    xit('should add/remove "hide-divider" attribute', async () => {
      render(template(), document.body);
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll(
        'cds-content-switcher-item'
      );
      itemNodes[0].dispatchEvent(
        new CustomEvent('mouseover', { bubbles: true })
      );
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[1].hasAttribute('hide-divider')).toBe(true);
      expect(itemNodes[2].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[3].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[4].hasAttribute('hide-divider')).toBe(false);
      itemNodes[0].dispatchEvent(
        new CustomEvent('mouseout', { bubbles: true })
      );
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[1].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[2].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[3].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[4].hasAttribute('hide-divider')).toBe(false);
    });
  });

  afterEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
    await render(undefined!, document.body);
  });
});
