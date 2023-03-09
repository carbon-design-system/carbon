/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { delay } from 'bluebird';
import { render } from 'lit';
import EventManager from '../utils/event-manager';

import BXComboBox from '../../src/components/combo-box/combo-box';
import BXComboBoxItem from '../../src/components/combo-box/combo-box-item';
import { Default } from '../../src/components/combo-box/combo-box-story';

const template = (props?) =>
  Default({
    'cds-combo-box': props,
  });

describe('cds-combo-box', function () {
  const events = new EventManager();

  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-combo-box' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          disabled: true,
          invalid: true,
          light: true,
          helperText: 'helper-text-foo',
          labelText: 'label-text-foo',
          open: true,
          triggerContent: 'trigger-content-foo',
          validityMessage: 'validity-message-foo',
          value: 'staging',
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-combo-box' as any)
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
      elem = document.body.querySelector('cds-combo-box')!;
      itemNode = elem.querySelector('cds-combo-box-item')!;
    });

    it('should add "open" stateful modifier class', async function () {
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
    });

    it('should remove "open" stateful modifier class (closed default state)', async function () {
      (elem as BXComboBox).open = true;
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should always close dropdown when clicking document', async function () {
      (elem as BXComboBox).open = true;
      await Promise.resolve();
      elem.dispatchEvent(new CustomEvent('focusout'));
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should close dropdown when clicking on an item', async function () {
      (elem as BXComboBox).open = true;
      await Promise.resolve();
      (itemNode as HTMLElement).click();
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should support enter key to open the menu', async function () {
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      const event = new CustomEvent('keypress', { bubbles: true });
      (event as any).key = 'Enter';
      inner!.dispatchEvent(event);
      await Promise.resolve();
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      inner!.dispatchEvent(event);
      await Promise.resolve();
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should provide a way to cancel opening', async function () {
      events.on(elem, 'cds-combo-box-beingtoggled', (event: CustomEvent) => {
        event.preventDefault();
      });
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should provide a way to cancel closing', async function () {
      (elem as BXComboBox).open = true;
      await Promise.resolve();
      events.on(elem, 'cds-combo-box-beingtoggled', (event: CustomEvent) => {
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
      elem = document.body.querySelector('cds-combo-box')!;
      itemNodes = elem.querySelectorAll('cds-combo-box-item');
    });

    it('should add/remove "selected" modifier class', async function () {
      (
        document.body.querySelector(
          'cds-combo-box-item[value="staging"]'
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
          'cds-combo-box-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(
        (elem.shadowRoot!.getElementById('trigger-label') as HTMLInputElement)
          .value
      ).toBe('Option 3');
    });

    it('should update value', async function () {
      (
        document.body.querySelector(
          'cds-combo-box-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect((elem as BXComboBox).value).toBe('staging');
    });

    it('should provide a way to switch item with a value', async function () {
      (elem as BXComboBox).value = 'staging';
      await Promise.resolve(); // Update cycle for `<cds-combo-box>`
      await Promise.resolve(); // Update cycle for `<cds-combo-box-item>`
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should provide a way to cancel switching item', async function () {
      events.on(elem, 'cds-combo-box-beingselected', (event: CustomEvent) => {
        expect(event.detail.item).toBe(
          document.body.querySelector('cds-combo-box-item[value="staging"]')
        );
        event.preventDefault();
      });
      (
        document.body.querySelector(
          'cds-combo-box-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
      expect(
        (elem.shadowRoot!.getElementById('trigger-label') as HTMLInputElement)
          .value
      ).toBe('Option 1');
    });

    it('should provide a way to cancel clearing selection', async function () {
      events.on(elem, 'cds-combo-box-beingselected', (event: CustomEvent) => {
        expect(event.detail.item).toBeUndefined();
        event.preventDefault();
      });
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (
        elem.shadowRoot!.querySelector(
          '.cds--list-box__selection'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect((elem as BXComboBox).value).toBe('all');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
      expect(
        (elem.shadowRoot!.getElementById('trigger-label') as HTMLInputElement)
          .value
      ).toBe('Option 1');
    });

    it('should reflect the added child to the selection', async function () {
      const itemNode = document.createElement('cds-combo-box-item');
      itemNode.textContent = 'text-added';
      (itemNode as unknown as BXComboBoxItem).value = 'value-added';
      elem.appendChild(itemNode);
      (elem as BXComboBox).value = 'value-added';
      await delay(0); // Workaround for IE MutationObserver scheduling bug for moving elements to slot
      try {
        expect(
          (elem.shadowRoot!.getElementById('trigger-label') as HTMLInputElement)
            .value
        ).toBe('text-added');
      } finally {
        itemNode.parentNode!.removeChild(itemNode);
      }
    });
  });

  describe('Typeahead', function () {
    let elem: Element;
    let inputNode: HTMLInputElement;
    let itemNodes: NodeListOf<Element>;

    beforeEach(async function () {
      render(template(), document.body);
      await Promise.resolve();
      elem = document.body.querySelector('cds-combo-box')!;
      inputNode = elem.shadowRoot!.getElementById(
        'trigger-label'
      ) as HTMLInputElement;
      itemNodes = elem.querySelectorAll('cds-combo-box-item');
    });

    it('Should highlight the item user types', async function () {
      inputNode.value = 'Option 3';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(true);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
    });

    it('Should highlight the first much if user types matches to multiple items', async function () {
      inputNode.value = 'Option';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(true);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
    });

    it('Should clear highlight if no item matches to what user types', async function () {
      inputNode.value = 'Option 3';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      inputNode.value = 'Foo';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
    });

    it('Should clear highlight if user types an empty value', async function () {
      inputNode.value = 'Option 3';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      inputNode.value = '';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
    });

    it('Should support clearing the typeahead', async function () {
      inputNode.value = 'Option 3';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      (
        elem.shadowRoot!.querySelector(
          '.cds--list-box__selection'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect((elem as BXComboBox).value).toBe('');
      expect(inputNode.value).toBe('');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
    });

    it('Should support clearing the typeahead by space key', async function () {
      inputNode.value = 'Option 3';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      const selectionButton = elem.shadowRoot!.querySelector(
        '.cds--list-box__selection'
      );
      const event = new CustomEvent('keypress', { bubbles: true });
      (event as any).key = ' ';
      selectionButton!.dispatchEvent(event);
      await Promise.resolve();
      expect((elem as BXComboBox).value).toBe('');
      expect(inputNode.value).toBe('');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
    });

    it('Should support clearing the typeahead by enter key', async function () {
      inputNode.value = 'Option 3';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      const selectionButton = elem.shadowRoot!.querySelector(
        '.cds--list-box__selection'
      );
      const event = new CustomEvent('keypress', { bubbles: true });
      (event as any).key = 'Enter';
      selectionButton!.dispatchEvent(event);
      await Promise.resolve();
      expect((elem as BXComboBox).value).toBe('');
      expect(inputNode.value).toBe('');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
    });

    it('Should support selecting an item after typing', async function () {
      (elem as BXComboBox).open = true;
      await Promise.resolve();
      (
        document.body.querySelector(
          'cds-combo-box-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      inputNode.value = 'Foo';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      (
        document.body.querySelector(
          'cds-combo-box-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });
  });

  afterEach(async function () {
    events.reset();
    await render(undefined!, document.body);
  });
});
