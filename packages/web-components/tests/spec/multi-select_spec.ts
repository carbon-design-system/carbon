/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import EventManager from '../utils/event-manager';

import CDSMultiSelect from '../../src/components/multi-select/multi-select';
import CDSMultiSelectItem from '../../src/components/multi-select/multi-select-item';
import { Playground } from '../../src/components/multi-select/multi-select-story';

const template = (props?) =>
  Playground({
    'cds-multi-select': props,
  });

describe('cds-multi-select', function () {
  const events = new EventManager();

  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-multi-select' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          clearSelectionLabel: 'clear-selection-label-foo',
          disabled: true,
          invalid: true,
          light: true,
          helperText: 'helper-text-foo',
          labelText: 'label-text-foo',
          open: true,
          toggleLabelClosed: 'toggle-label-closed-foo',
          toggleLabelOpen: 'toggle-label-open-foo',
          type: 'inline',
          triggerContent: 'trigger-content-foo',
          validityMessage: 'validity-message-foo',
          value: 'staging',
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-multi-select' as any)
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
      elem = document.body.querySelector('cds-multi-select')!;
      itemNode = elem.querySelector('cds-multi-select-item')!;
    });

    it('should add "open" stateful modifier class', async function () {
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
    });

    it('should remove "open" stateful modifier class (closed default state)', async function () {
      (elem as CDSMultiSelect).open = true;
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should always close multi-select when clicking document', async function () {
      (elem as CDSMultiSelect).open = true;
      await Promise.resolve();
      elem.dispatchEvent(new CustomEvent('focusout'));
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should keep multi-select open when clicking on an item', async function () {
      (elem as CDSMultiSelect).open = true;
      await Promise.resolve();
      (itemNode as HTMLElement).click();
      await Promise.resolve();
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
    });

    it('should provide a way to cancel opening', async function () {
      events.on(elem, 'cds-multi-select-beingtoggled', (event: CustomEvent) => {
        event.preventDefault();
      });
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should provide a way to cancel closing', async function () {
      (elem as CDSMultiSelect).open = true;
      await Promise.resolve();
      events.on(elem, 'cds-multi-select-beingtoggled', (event: CustomEvent) => {
        event.preventDefault();
      });
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
    });
  });

  describe('Selecting items', function () {
    let elem: Element;
    let itemNodes: NodeListOf<Element>;

    beforeEach(async function () {
      render(template({ open: true, value: 'all' }), document.body);
      await Promise.resolve();
      elem = document.body.querySelector('cds-multi-select')!;
      itemNodes = elem.querySelectorAll('cds-multi-select-item');
    });

    xit('should add/remove "selected" modifier class', async function () {
      (
        document.body.querySelector(
          'cds-multi-select-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    xit('should update selection count', async function () {
      (
        document.body.querySelector(
          'cds-multi-select-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(
        elem
          .shadowRoot!.querySelector('.cds--list-box__selection--multi')!
          .textContent!.trim()
      ).toBe('2');
      (
        document.body.querySelector(
          'cds-multi-select-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      (
        document.body.querySelector(
          'cds-multi-select-item[value="all"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(
        elem.shadowRoot!.querySelector('.cds--list-box__selection--multi')
      ).toBeNull();
    });

    xit('should update value', async function () {
      (
        document.body.querySelector(
          'cds-multi-select-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect((elem as CDSMultiSelect).value).toBe('all,staging');
      (
        document.body.querySelector(
          'cds-multi-select-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      (
        document.body.querySelector(
          'cds-multi-select-item[value="all"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect((elem as CDSMultiSelect).value).toBe('');
    });

    xit('should support selecting an item with space key', async function () {
      const event = Object.assign(
        new CustomEvent('keypress', { bubbles: true }),
        { key: ' ' }
      );
      (
        document.body.querySelector(
          'cds-multi-select-item[value="staging"]'
        ) as CDSMultiSelectItem
      ).highlighted = true;
      await Promise.resolve();
      elem.shadowRoot!.querySelector('.cds--list-box')!.dispatchEvent(event);
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    xit('should support selecting an item with enter key', async function () {
      const event = Object.assign(
        new CustomEvent('keypress', { bubbles: true }),
        { key: 'Enter' }
      );
      (
        document.body.querySelector(
          'cds-multi-select-item[value="staging"]'
        ) as CDSMultiSelectItem
      ).highlighted = true;
      await Promise.resolve();
      elem.shadowRoot!.querySelector('.cds--list-box')!.dispatchEvent(event);
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    xit('should provide a way to switch item with a value', async function () {
      (elem as CDSMultiSelect).value = 'staging';
      await Promise.resolve(); // Update cycle for `<cds-multi-select>`
      await Promise.resolve(); // Update cycle for `<cds-multi-select-item>`
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
      expect(
        elem
          .shadowRoot!.querySelector('.cds--list-box__selection--multi')!
          .textContent!.trim()
      ).toBe('1');
    });

    xit('should provide a way to cancel switching item', async function () {
      events.on(
        elem,
        'cds-multi-select-beingselected',
        (event: CustomEvent) => {
          expect(event.detail.item).toBe(
            document.body.querySelector(
              'cds-multi-select-item[value="staging"]'
            )
          );
          event.preventDefault();
        }
      );
      (
        document.body.querySelector(
          'cds-multi-select-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
      expect((elem as CDSMultiSelect).value).toBe('all');
    });

    it('should reflect the added child to the selection', async function () {
      const itemNode = document.createElement('cds-multi-select-item');
      (itemNode as unknown as CDSMultiSelectItem).value = 'value-added';
      elem.appendChild(itemNode);
      (elem as CDSMultiSelect).value = 'value-added';
      try {
        expect((elem as CDSMultiSelect).value).toBe('value-added');
      } finally {
        itemNode.parentNode!.removeChild(itemNode);
      }
    });
  });

  describe('Clearing selection', function () {
    let elem: Element;
    let itemNodes: NodeListOf<Element>;

    beforeEach(async function () {
      render(template({ open: true, value: 'all' }), document.body);
      await Promise.resolve();
      elem = document.body.querySelector('cds-multi-select')!;
      itemNodes = elem.querySelectorAll('cds-multi-select-item');
    });

    xit('should support clicking X button for clearing selection', async function () {
      elem
        .shadowRoot!.querySelector('.cds--list-box__selection--multi svg')!
        .dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
      await Promise.resolve();
      expect((elem as CDSMultiSelect).value).toBe('');
      expect(
        elem.shadowRoot!.querySelector('.cds--list-box__selection--multi')
      ).toBeNull();
    });

    xit('should support space key on X button for clearing selection', async function () {
      const trigger = elem.shadowRoot!.querySelector(
        '.cds--list-box__field'
      ) as HTMLElement;
      spyOn(trigger!, 'focus');
      elem
        .shadowRoot!.querySelector('.cds--list-box__selection--multi svg')!
        .dispatchEvent(
          Object.assign(new CustomEvent('keypress', { bubbles: true }), {
            key: ' ',
          })
        );
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
      expect((elem as CDSMultiSelect).value).toBe('');
      expect(
        elem.shadowRoot!.querySelector('.cds--list-box__selection--multi')
      ).toBeNull();
      expect(trigger!.focus).toHaveBeenCalledTimes(1);
    });

    xit('should support enter key on X button for clearing selection', async function () {
      const trigger = elem.shadowRoot!.querySelector(
        '.cds--list-box__field'
      ) as HTMLElement;
      spyOn(trigger!, 'focus');
      elem
        .shadowRoot!.querySelector('.cds--list-box__selection--multi svg')!
        .dispatchEvent(
          Object.assign(new CustomEvent('keypress', { bubbles: true }), {
            key: 'Enter',
          })
        );
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
      expect((elem as CDSMultiSelect).value).toBe('');
      expect(
        elem.shadowRoot!.querySelector('.cds--list-box__selection--multi')
      ).toBeNull();
      expect(trigger!.focus).toHaveBeenCalledTimes(1);
    });
  });

  describe('Keyboard navigation', function () {
    let elem: Element;

    beforeEach(async function () {
      render(template({ open: true, value: 'all' }), document.body);
      await Promise.resolve();
      elem = document.body.querySelector('cds-multi-select')!;
    });

    xit('should support arrow key to move focus out of the close button', async function () {
      const trigger = elem.shadowRoot!.querySelector(
        '.cds--list-box__field'
      ) as HTMLElement;
      spyOn(trigger!, 'focus');
      elem
        .shadowRoot!.querySelector('.cds--list-box__selection--multi')!
        .dispatchEvent(
          Object.assign(new CustomEvent('keydown', { bubbles: true }), {
            key: 'ArrowDown',
          })
        );
      await Promise.resolve();
      expect(trigger!.focus).toHaveBeenCalledTimes(1);
    });
  });

  afterEach(async function () {
    events.reset();
    await render(undefined!, document.body);
  });
});
