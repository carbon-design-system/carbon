/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { delay } from 'bluebird';
import { render } from 'lit-html';
import EventManager from '../utils/event-manager';

import BXDropdown from '../../src/components/dropdown/dropdown';
import BXDropdownItem from '../../src/components/dropdown/dropdown-item';
import { Default } from '../../src/components/dropdown/dropdown-story';

const template = (props?) =>
  Default({
    'bx-dropdown': props,
  });

describe('bx-dropdown', function () {
  const events = new EventManager();

  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('bx-dropdown' as any)).toMatchSnapshot(
        {
          mode: 'shadow',
        }
      );
    });

    it('should render with various attributes', async function () {
      render(
        template({
          disabled: true,
          light: true,
          helperText: 'helper-text-foo',
          labelText: 'label-text-foo',
          open: true,
          triggerContent: 'trigger-content-foo',
          value: 'staging',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-dropdown' as any)).toMatchSnapshot(
        {
          mode: 'shadow',
        }
      );
    });
  });

  describe('Toggling', function () {
    let elem: Element;
    let itemNode: Element;

    beforeEach(async function () {
      render(template(), document.body);
      await Promise.resolve();
      elem = document.body.querySelector('bx-dropdown')!;
      itemNode = elem.querySelector('bx-dropdown-item')!;
    });

    it('should add "open" stateful modifier class', async function () {
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('bx--list-box--expanded')).toBe(true);
    });

    it('should remove "open" stateful modifier class (closed default state)', async function () {
      (elem as BXDropdown).open = true;
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('bx--list-box--expanded')).toBe(false);
    });

    it('should always close dropdown when clicking document', async function () {
      (elem as BXDropdown).open = true;
      await Promise.resolve();
      elem.dispatchEvent(new CustomEvent('focusout'));
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      expect(inner!.classList.contains('bx--list-box--expanded')).toBe(false);
    });

    it('should close dropdown when clicking on an item', async function () {
      (elem as BXDropdown).open = true;
      await Promise.resolve();
      (itemNode as HTMLElement).click();
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      expect(inner!.classList.contains('bx--list-box--expanded')).toBe(false);
    });

    it('should provide a way to cancel opening', async function () {
      events.on(elem, 'bx-dropdown-beingtoggled', (event: CustomEvent) => {
        event.preventDefault();
      });
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('bx--list-box--expanded')).toBe(false);
    });

    it('should provide a way to cancel closing', async function () {
      (elem as BXDropdown).open = true;
      await Promise.resolve();
      events.on(elem, 'bx-dropdown-beingtoggled', (event: CustomEvent) => {
        event.preventDefault();
      });
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('bx--list-box--expanded')).toBe(true);
    });
  });

  describe('Selecting an item', function () {
    let elem: Element;
    let itemNodes: NodeListOf<Element>;

    beforeEach(async function () {
      render(template({ open: true, value: 'all' }), document.body);
      await Promise.resolve();
      elem = document.body.querySelector('bx-dropdown')!;
      itemNodes = elem.querySelectorAll('bx-dropdown-item');
    });

    it('should add/remove "selected" modifier class', async function () {
      (
        document.body.querySelector(
          'bx-dropdown-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should update text', async function () {
      (
        document.body.querySelector(
          'bx-dropdown-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(
        elem.shadowRoot!.querySelector('.bx--list-box__label')!.textContent
      ).toBe('Option 3');
    });

    it('should update value', async function () {
      (
        document.body.querySelector(
          'bx-dropdown-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect((elem as BXDropdown).value).toBe('staging');
    });

    it('should provide a way to switch item with a value', async function () {
      (elem as BXDropdown).value = 'staging';
      await Promise.resolve(); // Update cycle for `<bx-dropdown>`
      await Promise.resolve(); // Update cycle for `<bx-dropdown-item>`
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should provide a way to cancel switching item', async function () {
      events.on(elem, 'bx-dropdown-beingselected', (event: CustomEvent) => {
        expect(event.detail.item).toBe(
          document.body.querySelector('bx-dropdown-item[value="staging"]')
        );
        event.preventDefault();
      });
      (
        document.body.querySelector(
          'bx-dropdown-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
      expect(
        elem.shadowRoot!.querySelector('.bx--list-box__label')!.textContent
      ).toBe('Option 1');
    });

    it('should reflect the added child to the selection', async function () {
      const itemNode = document.createElement('bx-dropdown-item');
      itemNode.textContent = 'text-added';
      (itemNode as unknown as BXDropdownItem).value = 'value-added';
      elem.appendChild(itemNode);
      (elem as BXDropdown).value = 'value-added';
      await delay(0); // Workaround for IE MutationObserver scheduling bug for moving elements to slot
      try {
        expect(
          elem.shadowRoot!.querySelector('.bx--list-box__label')!.textContent
        ).toBe('text-added');
      } finally {
        itemNode.parentNode!.removeChild(itemNode);
      }
    });
  });

  describe('Form validation', function () {
    let elem: Element;

    beforeEach(async function () {
      render(template(), document.body);
      await Promise.resolve();
      elem = document.body.querySelector('bx-dropdown')!;
    });

    it('should support checking if required value exists', async function () {
      const dropdown = elem as BXDropdown;
      dropdown.required = true;
      const spyInvalid = jasmine.createSpy('invalid');
      events.on(dropdown, 'invalid', spyInvalid);
      expect(dropdown.checkValidity()).toBe(false);
      expect(spyInvalid).toHaveBeenCalled();
      expect(dropdown.invalid).toBe(true);
      expect(dropdown.validityMessage).toBe('Please fill out this field.');
      dropdown.value = 'staging';
      expect(dropdown.checkValidity()).toBe(true);
      expect(dropdown.invalid).toBe(false);
      expect(dropdown.validityMessage).toBe('');
    });

    it('should support canceling required check', async function () {
      const dropdown = elem as BXDropdown;
      dropdown.required = true;
      events.on(dropdown, 'invalid', (event) => {
        event.preventDefault();
      });
      expect(dropdown.checkValidity()).toBe(false);
      expect(dropdown.invalid).toBe(false);
      expect(dropdown.validityMessage).toBe('');
    });

    it('should treat empty custom validity message as not invalid', async function () {
      const dropdown = elem as BXDropdown;
      dropdown.setCustomValidity('');
      expect(dropdown.invalid).toBe(false);
      expect(dropdown.validityMessage).toBe('');
    });

    it('should treat non-empty custom validity message as invalid', async function () {
      const dropdown = elem as BXDropdown;
      dropdown.setCustomValidity('validity-message-foo');
      expect(dropdown.invalid).toBe(true);
      expect(dropdown.validityMessage).toBe('validity-message-foo');
    });
  });

  afterEach(async function () {
    events.reset();
    await render(undefined!, document.body);
  });
});
