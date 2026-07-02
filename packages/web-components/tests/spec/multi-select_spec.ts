/**
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

describe('cds-multi-select', () => {
  const events = new EventManager();

  describe('Misc attributes', () => {
    it('should render with minimum attributes', async () => {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        document.body.querySelector('cds-multi-select' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async () => {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        document.body.querySelector('cds-multi-select' as any)
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem = document.body.querySelector('cds-multi-select')!;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      itemNode = elem.querySelector('cds-multi-select-item')!;
    });

    it('should add "open" stateful modifier class', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
    });

    it('should remove "open" stateful modifier class (closed default state)', async () => {
      (elem as CDSMultiSelect).open = true;
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should always close multi-select when clicking document', async () => {
      (elem as CDSMultiSelect).open = true;
      await Promise.resolve();
      elem.dispatchEvent(new CustomEvent('focusout'));
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should keep multi-select open when clicking on an item', async () => {
      (elem as CDSMultiSelect).open = true;
      await Promise.resolve();
      (itemNode as HTMLElement).click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
    });

    it('should provide a way to cancel opening', async () => {
      events.on(elem, 'cds-multi-select-beingtoggled', (event: CustomEvent) => {
        event.preventDefault();
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(false);
    });

    it('should provide a way to cancel closing', async () => {
      (elem as CDSMultiSelect).open = true;
      await Promise.resolve();
      events.on(elem, 'cds-multi-select-beingtoggled', (event: CustomEvent) => {
        event.preventDefault();
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(inner!.classList.contains('cds--list-box--expanded')).toBe(true);
    });
  });

  describe('Selecting items', () => {
    let elem: Element;
    let itemNodes: NodeListOf<Element>;

    beforeEach(async () => {
      render(template({ open: true, value: 'all' }), document.body);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem = document.body.querySelector('cds-multi-select')!;
      itemNodes = elem.querySelectorAll('cds-multi-select-item');
    });

    xit('should add/remove "selected" modifier class', async () => {
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

    xit('should update selection count', async () => {
      (
        document.body.querySelector(
          'cds-multi-select-item[value="staging"]'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        elem.shadowRoot!.querySelector('.cds--list-box__selection--multi')
      ).toBeNull();
    });

    xit('should update value', async () => {
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

    xit('should support selecting an item with space key', async () => {
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem.shadowRoot!.querySelector('.cds--list-box')!.dispatchEvent(event);
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    xit('should support selecting an item with enter key', async () => {
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem.shadowRoot!.querySelector('.cds--list-box')!.dispatchEvent(event);
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    xit('should provide a way to switch item with a value', async () => {
      (elem as CDSMultiSelect).value = 'staging';
      await Promise.resolve(); // Update cycle for `<cds-multi-select>`
      await Promise.resolve(); // Update cycle for `<cds-multi-select-item>`
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        elem
          .shadowRoot!.querySelector('.cds--list-box__selection--multi')!
          .textContent!.trim()
      ).toBe('1');
    });

    xit('should provide a way to cancel switching item', async () => {
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

    it('should reflect the added child to the selection', async () => {
      const itemNode = document.createElement('cds-multi-select-item');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      (itemNode as any).value = 'value-added';
      elem.appendChild(itemNode);
      (elem as CDSMultiSelect).value = 'value-added';
      try {
        expect((elem as CDSMultiSelect).value).toBe('value-added');
      } finally {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        itemNode.parentNode!.removeChild(itemNode);
      }
    });
  });

  describe('Clearing selection', () => {
    let elem: Element;
    let itemNodes: NodeListOf<Element>;

    beforeEach(async () => {
      render(template({ open: true, value: 'all' }), document.body);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem = document.body.querySelector('cds-multi-select')!;
      itemNodes = elem.querySelectorAll('cds-multi-select-item');
    });

    xit('should support clicking X button for clearing selection', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        elem.shadowRoot!.querySelector('.cds--list-box__selection--multi')
      ).toBeNull();
    });

    xit('should support space key on X button for clearing selection', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const trigger = elem.shadowRoot!.querySelector(
        '.cds--list-box__field'
      ) as HTMLElement;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOn(trigger!, 'focus');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        elem.shadowRoot!.querySelector('.cds--list-box__selection--multi')
      ).toBeNull();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(trigger!.focus).toHaveBeenCalledTimes(1);
    });

    xit('should support enter key on X button for clearing selection', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const trigger = elem.shadowRoot!.querySelector(
        '.cds--list-box__field'
      ) as HTMLElement;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOn(trigger!, 'focus');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        elem.shadowRoot!.querySelector('.cds--list-box__selection--multi')
      ).toBeNull();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(trigger!.focus).toHaveBeenCalledTimes(1);
    });
  });

  describe('Keyboard navigation', () => {
    let elem: Element;

    beforeEach(async () => {
      render(template({ open: true, value: 'all' }), document.body);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem = document.body.querySelector('cds-multi-select')!;
    });

    xit('should support arrow key to move focus out of the close button', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const trigger = elem.shadowRoot!.querySelector(
        '.cds--list-box__field'
      ) as HTMLElement;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      spyOn(trigger!, 'focus');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem
        .shadowRoot!.querySelector('.cds--list-box__selection--multi')!
        .dispatchEvent(
          Object.assign(new CustomEvent('keydown', { bubbles: true }), {
            key: 'ArrowDown',
          })
        );
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(trigger!.focus).toHaveBeenCalledTimes(1);
    });
  });

  afterEach(async () => {
    events.reset();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
    await render(undefined!, document.body);
  });
});
