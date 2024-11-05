/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import EventManager from '../utils/event-manager';

import CDSDropdown from '../../src/components/dropdown/dropdown';
import CDSDropdownItem from '../../src/components/dropdown/dropdown-item';
import { Playground } from '../../src/components/dropdown/dropdown.stories';

const template = (props?) =>
  Playground({
    'cds-dropdown': props,
  });

describe('cds-dropdown', function () {
  const events = new EventManager();

  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-dropdown' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
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
      expect(
        document.body.querySelector('cds-dropdown' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Toggling', function () {
    let elem: Element;
    let itemNode: Element;

    beforeEach(async function () {
      render(template(), document.body);
      await Promise.resolve();
      elem = document.body.querySelector('cds-dropdown')!;
      itemNode = elem.querySelector('cds-dropdown-item')!;
    });

    it('should add "open" stateful modifier class', async function () {
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
    });

    it('should remove "open" stateful modifier class (closed default state)', async function () {
      (elem as CDSDropdown).open = true;
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should always close dropdown when clicking document', async function () {
      (elem as CDSDropdown).open = true;
      await Promise.resolve();
      elem.dispatchEvent(new CustomEvent('focusout'));
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should close dropdown when clicking on an item', async function () {
      (elem as CDSDropdown).open = true;
      await Promise.resolve();
      (itemNode as HTMLElement).click();
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should provide a way to cancel opening', async function () {
      events.on(elem, 'cds-dropdown-beingtoggled', (event: CustomEvent) => {
        event.preventDefault();
      });
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should provide a way to cancel closing', async function () {
      (elem as CDSDropdown).open = true;
      await Promise.resolve();
      events.on(elem, 'cds-dropdown-beingtoggled', (event: CustomEvent) => {
        event.preventDefault();
      });
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
    });
  });

  describe('Selecting an item', function () {
    let elem: Element;
    let itemNodes: NodeListOf<Element>;

    beforeEach(async function () {
      render(template({ open: true, value: 'all' }), document.body);
      await Promise.resolve();
      elem = document.body.querySelector('cds-dropdown')!;
      itemNodes = elem.querySelectorAll('cds-dropdown-item');
    });

    xit('should add/remove "selected" modifier class', async function () {
      (
        document.body.querySelector(
          'cds-dropdown-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    xit('should update text', async function () {
      (
        document.body.querySelector(
          'cds-dropdown-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(
        elem.shadowRoot!.querySelector('.cds--list-box__label')!.textContent
      ).toBe('Option 3');
    });

    xit('should update value', async function () {
      (
        document.body.querySelector(
          'cds-dropdown-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect((elem as CDSDropdown).value).toBe('staging');
    });

    xit('should provide a way to switch item with a value', async function () {
      (elem as CDSDropdown).value = 'staging';
      await Promise.resolve(); // Update cycle for `<cds-dropdown>`
      await Promise.resolve(); // Update cycle for `<cds-dropdown-item>`
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    xit('should provide a way to cancel switching item', async function () {
      events.on(elem, 'cds-dropdown-beingselected', (event: CustomEvent) => {
        expect(event.detail.item).toBe(
          document.body.querySelector('cds-dropdown-item[value="staging"]')
        );
        event.preventDefault();
      });
      (
        document.body.querySelector(
          'cds-dropdown-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
      expect(
        elem.shadowRoot!.querySelector('.cds--list-box__label')!.textContent
      ).toBe('Option 1');
    });

    it('should reflect the added child to the selection', async function () {
      const itemNode = document.createElement('cds-dropdown-item');
      itemNode.textContent = 'text-added';
      (itemNode as unknown as CDSDropdownItem).value = 'value-added';
      elem.appendChild(itemNode);
      (elem as CDSDropdown).value = 'value-added';
      try {
        expect(
          elem.shadowRoot!.querySelector('.cds--list-box__label')!.textContent
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
      elem = document.body.querySelector('cds-dropdown')!;
    });

    it('should support checking if required value exists', async function () {
      const dropdown = elem as CDSDropdown;
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
      const dropdown = elem as CDSDropdown;
      dropdown.required = true;
      events.on(dropdown, 'invalid', (event) => {
        event.preventDefault();
      });
      expect(dropdown.checkValidity()).toBe(false);
      expect(dropdown.invalid).toBe(false);
      expect(dropdown.validityMessage).toBe('');
    });

    it('should treat empty custom validity message as not invalid', async function () {
      const dropdown = elem as CDSDropdown;
      dropdown.setCustomValidity('');
      expect(dropdown.invalid).toBe(false);
      expect(dropdown.validityMessage).toBe('');
    });

    it('should treat non-empty custom validity message as invalid', async function () {
      const dropdown = elem as CDSDropdown;
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
