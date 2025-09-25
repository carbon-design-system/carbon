/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import EventManager from '../utils/event-manager';

import CDSComboBox from '../../src/components/combo-box/combo-box';
import { Playground } from '../../src/components/combo-box/combo-box.stories';

const template = (props?) =>
  Playground({
    'cds-combo-box': props,
  });

describe('cds-combo-box', () => {
  const events = new EventManager();

  describe('Misc attributes', () => {
    it('should render with minimum attributes', async () => {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
        document.body.querySelector('cds-combo-box' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async () => {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
        document.body.querySelector('cds-combo-box' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Toggling', () => {
    let elem: Element;
    let itemNode: Element;

    beforeEach(async () => {
      render(template(), document.body);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      elem = document.body.querySelector('cds-combo-box')!;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      itemNode = elem.querySelector('cds-combo-box-item')!;
    });

    it('should add "open" stateful modifier class', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
    });

    it('should remove "open" stateful modifier class (closed default state)', async () => {
      (elem as CDSComboBox).open = true;
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should always close dropdown when clicking document', async () => {
      (elem as CDSComboBox).open = true;
      await Promise.resolve();
      elem.dispatchEvent(new CustomEvent('focusout'));
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should close dropdown when clicking on an item', async () => {
      (elem as CDSComboBox).open = true;
      await Promise.resolve();
      (itemNode as HTMLElement).click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should support enter key to open the menu', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      const event = new CustomEvent('keypress', { bubbles: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
      (event as any).key = 'Enter';
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      inner!.dispatchEvent(event);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      inner!.dispatchEvent(event);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should provide a way to cancel opening', async () => {
      events.on(elem, 'cds-combo-box-beingtoggled', (event: CustomEvent) => {
        event.preventDefault();
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should provide a way to cancel closing', async () => {
      (elem as CDSComboBox).open = true;
      await Promise.resolve();
      events.on(elem, 'cds-combo-box-beingtoggled', (event: CustomEvent) => {
        event.preventDefault();
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
    });
  });

  xdescribe('Selecting an item', () => {
    let elem: Element;
    let itemNodes: NodeListOf<Element>;

    beforeEach(async () => {
      render(template({ open: true, value: 'all' }), document.body);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      elem = document.body.querySelector('cds-combo-box')!;
      itemNodes = elem.querySelectorAll('cds-combo-box-item');
    });

    it('should add/remove "selected" modifier class', async () => {
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

    it('should update text', async () => {
      (
        document.body.querySelector(
          'cds-combo-box-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        (elem.shadowRoot!.getElementById('trigger-label') as HTMLInputElement)
          .value
      ).toBe('Option 3');
    });

    it('should update value', async () => {
      (
        document.body.querySelector(
          'cds-combo-box-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect((elem as CDSComboBox).value).toBe('staging');
    });

    it('should provide a way to switch item with a value', async () => {
      (elem as CDSComboBox).value = 'staging';
      await Promise.resolve(); // Update cycle for `<cds-combo-box>`
      await Promise.resolve(); // Update cycle for `<cds-combo-box-item>`
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should provide a way to cancel switching item', async () => {
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        (elem.shadowRoot!.getElementById('trigger-label') as HTMLInputElement)
          .value
      ).toBe('Option 1');
    });

    it('should provide a way to cancel clearing selection', async () => {
      events.on(elem, 'cds-combo-box-beingselected', (event: CustomEvent) => {
        expect(event.detail.item).toBeUndefined();
        event.preventDefault();
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      const shadowRoot = elem.shadowRoot;
      if (shadowRoot) {
        const selectionElement = shadowRoot.querySelector(
          '.cds--list-box__selection'
        ) as HTMLElement;
        selectionElement?.click();
      }
      await Promise.resolve();
      expect((elem as CDSComboBox).value).toBe('all');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        (elem.shadowRoot!.getElementById('trigger-label') as HTMLInputElement)
          .value
      ).toBe('Option 1');
    });

    it('should reflect the added child to the selection', async () => {
      const itemNode = document.createElement('cds-combo-box-item');
      itemNode.textContent = 'text-added';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
      (itemNode as any).value = 'value-added';
      elem.appendChild(itemNode);
      (elem as CDSComboBox).value = 'value-added';
      try {
        expect(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
          (elem.shadowRoot!.getElementById('trigger-label') as HTMLInputElement)
            .value
        ).toBe('text-added');
      } finally {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        itemNode.parentNode!.removeChild(itemNode);
      }
    });
  });

  describe('Typeahead', () => {
    let elem: Element;
    let inputNode: HTMLInputElement;
    let itemNodes: NodeListOf<Element>;

    beforeEach(async () => {
      render(template(), document.body);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      elem = document.body.querySelector('cds-combo-box')!;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      inputNode = elem.shadowRoot!.getElementById(
        'trigger-label'
      ) as HTMLInputElement;
      itemNodes = elem.querySelectorAll('cds-combo-box-item');
    });

    xit('Should highlight the item user types', async () => {
      inputNode.value = 'Option 3';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(true);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
    });

    it('Should highlight the first much if user types matches to multiple items', async () => {
      inputNode.value = 'Option';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(true);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
    });

    it('Should clear highlight if no item matches to what user types', async () => {
      inputNode.value = 'Option 3';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      // eslint-disable-next-line require-atomic-updates -- https://github.com/carbon-design-system/carbon/issues/20071
      inputNode.value = 'Foo';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
    });

    it('Should clear highlight if user types an empty value', async () => {
      inputNode.value = 'Option 3';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      // eslint-disable-next-line require-atomic-updates -- https://github.com/carbon-design-system/carbon/issues/20071
      inputNode.value = '';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
    });

    it('Should support clearing the typeahead', async () => {
      inputNode.value = 'Option 3';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      const shadowRoot = elem.shadowRoot;
      if (shadowRoot) {
        const selectionElement = shadowRoot.querySelector(
          '.cds--list-box__selection'
        ) as HTMLElement;
        if (selectionElement) {
          selectionElement.click();
        }
      }
      await Promise.resolve();
      expect((elem as CDSComboBox).value).toBe('');
      expect(inputNode.value).toBe('');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
    });

    it('Should support clearing the typeahead by space key', async () => {
      inputNode.value = 'Option 3';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const selectionButton = elem.shadowRoot!.querySelector(
        '.cds--list-box__selection'
      );
      const event = new CustomEvent('keypress', { bubbles: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
      (event as any).key = ' ';
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      selectionButton!.dispatchEvent(event);
      await Promise.resolve();
      expect((elem as CDSComboBox).value).toBe('');
      expect(inputNode.value).toBe('');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
    });

    it('Should support clearing the typeahead by enter key', async () => {
      inputNode.value = 'Option 3';
      inputNode.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const selectionButton = elem.shadowRoot!.querySelector(
        '.cds--list-box__selection'
      );
      const event = new CustomEvent('keypress', { bubbles: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
      (event as any).key = 'Enter';
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      selectionButton!.dispatchEvent(event);
      await Promise.resolve();
      expect((elem as CDSComboBox).value).toBe('');
      expect(inputNode.value).toBe('');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
      expect(itemNodes[0].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[1].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[2].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[4].hasAttribute('highlighted')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
    });

    xit('Should support selecting an item after typing', async () => {
      (elem as CDSComboBox).open = true;
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });
  });

  afterEach(async () => {
    events.reset();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
    await render(undefined!, document.body);
  });
});
