/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/dropdown/__tests__/dropdown-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 *
 * Each `it` keeps the WC test's title verbatim. The WC test renders
 * `<cds-dropdown ...>` with open-wc `fixture(html\`...\`)`. This test renders
 * the Angular `<cds-dropdown>` wrapper. Under ADR 0015 the host element IS the
 * web component — assertions run against the shadow DOM of the `cds-*` host
 * elements directly.
 *
 * Ported 1:1 unless noted. Tests that cannot run in jsdom are `it.todo` with
 * a reason. AI-label/slug slot tests are `it.todo` (require AiLabelComponent).
 * Auto-align tests are `it.todo` (access internal `_floatingController`).
 */

import { DropdownComponent } from '../../../generated/Dropdown';
import { DropdownItemComponent } from '../../../generated/DropdownItem';
import { render } from '../../../testing/render';

const imports = [DropdownComponent, DropdownItemComponent];

/** The cds-dropdown host element. */
const wc = (el: HTMLElement) =>
  el.querySelector('cds-dropdown') as HTMLElement & {
    shadowRoot: ShadowRoot;
    open: boolean;
    disabled: boolean;
    readOnly: boolean;
    invalid: boolean;
    warn: boolean;
    value: string;
    updateComplete: Promise<void>;
  };

const defaultDropdown = `
  <cds-dropdown titleText="Dropdown Label">
    <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
    <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
    <cds-dropdown-item value="option-3">Option 3</cds-dropdown-item>
  </cds-dropdown>
`;

describe('cds-dropdown (parity with web-components dropdown-test.js)', () => {
  it('should render', async () => {
    const { fixture } = await render(defaultDropdown, imports);
    expect(wc(fixture.nativeElement)).toBeTruthy();
  });

  it('should have title text', async () => {
    const { fixture } = await render(defaultDropdown, imports);
    const titleText = wc(fixture.nativeElement).shadowRoot.querySelector(
      '.cds--label'
    );
    expect(titleText?.textContent?.trim()).toBe('Dropdown Label');
  });

  it('should have dropdown items', async () => {
    const { fixture } = await render(defaultDropdown, imports);
    const items = fixture.nativeElement.querySelectorAll('cds-dropdown-item');
    expect(items.length).toBe(3);
  });

  describe('basic interaction', () => {
    it('should open on click', async () => {
      const { fixture } = await render(defaultDropdown, imports);
      const el = wc(fixture.nativeElement);
      const triggerButton = el.shadowRoot.querySelector(
        '#trigger-button'
      ) as HTMLElement;

      expect(el.open).toBe(false);

      triggerButton.click();
      await el.updateComplete;

      expect(el.open).toBe(true);
    });

    it('should select item on click', async () => {
      const { fixture } = await render(defaultDropdown, imports);
      const el = wc(fixture.nativeElement);
      const triggerButton = el.shadowRoot.querySelector(
        '#trigger-button'
      ) as HTMLElement;

      triggerButton.click();
      await el.updateComplete;

      const items = el.querySelectorAll('cds-dropdown-item') as NodeListOf<
        HTMLElement & { selected: boolean }
      >;
      items[1].click();
      await el.updateComplete;

      expect(el.open).toBe(false);
      expect(el.value).toBe('option-2');
      expect(items[1].selected).toBe(true);
    });

    it('should apply hovered-next-sibling attribute to next item on hover', async () => {
      const { fixture } = await render(
        `<cds-dropdown titleText="Dropdown Label" open>
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
          <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
        </cds-dropdown>`,
        imports
      );
      const el = wc(fixture.nativeElement);
      await el.updateComplete;

      const items = el.querySelectorAll(
        'cds-dropdown-item'
      ) as NodeListOf<HTMLElement>;
      items[0].dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      await el.updateComplete;

      expect(items[1].hasAttribute('hovered-next-sibling')).toBe(true);
    });

    it('should remove hovered-next-sibling attribute when mouse leaves item', async () => {
      const { fixture } = await render(
        `<cds-dropdown titleText="Dropdown Label" open>
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
          <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
        </cds-dropdown>`,
        imports
      );
      const el = wc(fixture.nativeElement);
      await el.updateComplete;

      const items = el.querySelectorAll(
        'cds-dropdown-item'
      ) as NodeListOf<HTMLElement>;
      items[0].dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      await el.updateComplete;

      items[0].dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      await el.updateComplete;

      expect(items[1].hasAttribute('hovered-next-sibling')).toBe(false);
    });

    it('should not apply hover state to next item when hovering disabled item', async () => {
      const { fixture } = await render(
        `<cds-dropdown titleText="Dropdown Label" open>
          <cds-dropdown-item value="option-1" [disabled]="true">Option 1</cds-dropdown-item>
          <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
        </cds-dropdown>`,
        imports
      );
      const el = wc(fixture.nativeElement);
      await el.updateComplete;

      const items = el.querySelectorAll(
        'cds-dropdown-item'
      ) as NodeListOf<HTMLElement>;
      items[0].dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      await el.updateComplete;

      expect(items[1].hasAttribute('hovered-next-sibling')).toBe(false);
    });
  });

  describe('keyboard interaction', () => {
    // WC: uses @web/test-runner sendKeys — jsdom does not fully propagate keydown from shadowRoot.
    it.todo('should close with escape');
    it.todo('should navigate with arrow keys');
  });

  describe('properties and attributes', () => {
    it('should reflect the disabled state', async () => {
      const { fixture } = await render(
        `<cds-dropdown [disabled]="true" titleText="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>`,
        imports
      );
      const el = wc(fixture.nativeElement);

      expect(el.disabled).toBe(true);

      const triggerButton = el.shadowRoot.querySelector(
        '#trigger-button'
      ) as HTMLElement;
      triggerButton.click();
      await el.updateComplete;
      expect(el.open).toBe(false);
      expect(el.getAttribute('tabindex')).toBeNull();
    });

    it('should respect the readOnly property', async () => {
      const { fixture } = await render(
        `<cds-dropdown [readOnly]="true" titleText="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>`,
        imports
      );
      const el = wc(fixture.nativeElement);

      expect(el.readOnly).toBe(true);

      const triggerButton = el.shadowRoot.querySelector(
        '#trigger-button'
      ) as HTMLElement;
      triggerButton.click();
      await el.updateComplete;
      expect(el.open).toBe(false);
    });

    it('should display helper text', async () => {
      const { fixture } = await render(
        `<cds-dropdown helperText="This is helper text" titleText="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>`,
        imports
      );
      const helperText = wc(fixture.nativeElement).shadowRoot.querySelector(
        '.cds--form__helper-text'
      );
      expect(helperText?.textContent?.trim()).toBe('This is helper text');
    });

    it('should display invalid state and message', async () => {
      const { fixture } = await render(
        `<cds-dropdown [invalid]="true" invalidText="This field is required" titleText="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>`,
        imports
      );
      const el = wc(fixture.nativeElement);

      expect(el.invalid).toBe(true);

      const invalidIcon = el.shadowRoot.querySelector(
        '.cds--list-box__invalid-icon'
      );
      expect(invalidIcon).toBeTruthy();

      const helperText = el.shadowRoot.querySelector('.cds--form__helper-text');
      expect(helperText?.textContent?.trim()).toBe('This field is required');
    });

    it('should display warning state and message', async () => {
      const { fixture } = await render(
        `<cds-dropdown [warn]="true" warnText="This is a warning" titleText="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>`,
        imports
      );
      const el = wc(fixture.nativeElement);

      expect(el.warn).toBe(true);

      const warningIcon = el.shadowRoot.querySelector(
        '.cds--list-box__invalid-icon--warning'
      );
      expect(warningIcon).toBeTruthy();

      const helperText = el.shadowRoot.querySelector('.cds--form__helper-text');
      expect(helperText?.textContent?.trim()).toBe('This is a warning');
    });

    // WC test title: "should support different sizes"
    // Split into individual `it` blocks — calling render() in a loop within one
    // `it` block hits "TestBed already instantiated".
    it('should support different sizes — sm', async () => {
      const { fixture } = await render(
        `<cds-dropdown size="sm" titleText="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>`,
        imports
      );
      expect(wc(fixture.nativeElement).getAttribute('size')).toBe('sm');
    });

    it('should support different sizes — md', async () => {
      const { fixture } = await render(
        `<cds-dropdown size="md" titleText="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>`,
        imports
      );
      expect(wc(fixture.nativeElement).getAttribute('size')).toBe('md');
    });

    it('should support different sizes — lg', async () => {
      const { fixture } = await render(
        `<cds-dropdown size="lg" titleText="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>`,
        imports
      );
      expect(wc(fixture.nativeElement).getAttribute('size')).toBe('lg');
    });

    it('should support type attribute', async () => {
      const { fixture } = await render(
        `<cds-dropdown type="inline" titleText="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>`,
        imports
      );
      expect(wc(fixture.nativeElement).getAttribute('type')).toBe('inline');
    });

    it('should display initially selected item', async () => {
      const { fixture } = await render(
        `<cds-dropdown titleText="Dropdown Label" value="option-2">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
          <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
          <cds-dropdown-item value="option-3">Option 3</cds-dropdown-item>
        </cds-dropdown>`,
        imports
      );
      const el = wc(fixture.nativeElement);
      await el.updateComplete;

      const items = el.querySelectorAll('cds-dropdown-item') as NodeListOf<
        HTMLElement & { selected: boolean }
      >;
      expect(items[1].selected).toBe(true);

      const label = el.shadowRoot.querySelector('.cds--list-box__label');
      expect(label?.textContent?.trim()).toBe('Option 2');
    });

    it('should render when defaultItemToString passed with null value', async () => {
      const { fixture } = await render(
        `<cds-dropdown titleText="Dropdown Label"></cds-dropdown>`,
        imports
      );
      const el = wc(fixture.nativeElement);
      await el.updateComplete;

      const label = el.shadowRoot.querySelector('.cds--list-box__label');
      expect(label?.textContent?.trim()).toBe('');
    });

    // WC: requires AiLabelComponent
    it.todo('should support AI Label decorator');

    it('should have proper ARIA attributes', async () => {
      const { fixture } = await render(
        `<cds-dropdown titleText="Dropdown Label" aria-label="Custom Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
          <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
        </cds-dropdown>`,
        imports
      );
      const el = wc(fixture.nativeElement);
      await el.updateComplete;

      const triggerButton = el.shadowRoot.querySelector(
        '#trigger-button'
      ) as HTMLElement;
      expect(triggerButton.getAttribute('role')).toBe('combobox');
      expect(triggerButton.getAttribute('aria-haspopup')).toBe('listbox');
      expect(triggerButton.getAttribute('aria-expanded')).toBe('false');
      expect(triggerButton.getAttribute('aria-controls')).toBe('menu-body');

      const menuBody = el.shadowRoot.querySelector('#menu-body') as HTMLElement;
      expect(menuBody.getAttribute('role')).toBe('listbox');
      expect(menuBody.getAttribute('aria-label')).toBe('Custom Dropdown Label');

      triggerButton.click();
      await el.updateComplete;

      expect(triggerButton.getAttribute('aria-expanded')).toBe('true');
    });

    it('should support custom toggle labels for accessibility', async () => {
      const { fixture } = await render(
        `<cds-dropdown titleText="Dropdown Label" toggleLabelClosed="Open dropdown" toggleLabelOpen="Close dropdown">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>`,
        imports
      );
      const el = wc(fixture.nativeElement);
      await el.updateComplete;

      const chevronIconClosed =
        el.shadowRoot.querySelector('#trigger-caret svg');
      expect(chevronIconClosed?.getAttribute('aria-label')).toBe(
        'Open dropdown'
      );

      const triggerButton = el.shadowRoot.querySelector(
        '#trigger-button'
      ) as HTMLElement;
      triggerButton.click();
      await el.updateComplete;

      const chevronIconOpen = el.shadowRoot.querySelector('#trigger-caret svg');
      expect(chevronIconOpen?.getAttribute('aria-label')).toBe(
        'Close dropdown'
      );
    });
  });

  describe('auto align behavior', () => {
    // WC: accesses internal `_floatingController` private API — not testable in jsdom.
    it.todo(
      'should apply autoalign classes and run floating placement when opened'
    );
    it.todo(
      'should reset floating styles when autoalign is disabled while open'
    );
  });

  describe('events', () => {
    it('should not commit selection when beingselected is prevented', async () => {
      const { fixture } = await render(defaultDropdown, imports);
      const el = wc(fixture.nativeElement);
      const items = el.querySelectorAll('cds-dropdown-item') as NodeListOf<
        HTMLElement & { selected: boolean }
      >;

      el.addEventListener('cds-dropdown-beingselected', (event) => {
        event.preventDefault();
      });

      items[1].click();
      await el.updateComplete;

      expect(el.value).toBe('');
      expect(items[0].selected).toBe(false);
      expect(items[1].selected).toBe(false);
    });

    it('should fire cds-dropdown-selected event when item is selected', async () => {
      const { fixture } = await render(defaultDropdown, imports);
      const el = wc(fixture.nativeElement);
      let eventFired = false;
      let selectedItem: HTMLElement | undefined;

      el.addEventListener('cds-dropdown-selected', (event) => {
        eventFired = true;
        selectedItem = (event as CustomEvent).detail.item;
      });

      el.open = true;
      await el.updateComplete;

      const items = el.querySelectorAll(
        'cds-dropdown-item'
      ) as NodeListOf<HTMLElement>;
      items[1].click();
      await el.updateComplete;

      expect(eventFired).toBe(true);
      expect(selectedItem).toBe(items[1]);
      expect(el.value).toBe('option-2');
    });

    it('should fire cds-dropdown-toggled event when dropdown is opened/closed', async () => {
      const { fixture } = await render(defaultDropdown, imports);
      const el = wc(fixture.nativeElement);
      let eventFired = false;
      let openState: boolean | undefined;

      el.addEventListener('cds-dropdown-toggled', (event) => {
        eventFired = true;
        openState = (event as CustomEvent).detail.open;
      });

      const triggerButton = el.shadowRoot.querySelector(
        '#trigger-button'
      ) as HTMLElement;
      triggerButton.click();
      await el.updateComplete;

      expect(eventFired).toBe(true);
      expect(openState).toBe(true);
    });
  });
});

describe('Validation states with disabled/readonly', () => {
  it('should not show invalid state when readOnly is true', async () => {
    const { fixture } = await render(
      `<cds-dropdown [readOnly]="true" [invalid]="true" invalidText="This field is required" titleText="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-dropdown>`,
      imports
    );
    const el = wc(fixture.nativeElement);
    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');
    expect(listBox?.classList.contains('cds--dropdown--invalid')).toBe(false);
  });

  it('should not show warning state when readOnly is true', async () => {
    const { fixture } = await render(
      `<cds-dropdown [readOnly]="true" [warn]="true" warnText="This is a warning" titleText="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-dropdown>`,
      imports
    );
    const el = wc(fixture.nativeElement);
    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');
    expect(listBox?.classList.contains('cds--dropdown--warn')).toBe(false);
  });

  it('should not show invalid state when disabled is true', async () => {
    const { fixture } = await render(
      `<cds-dropdown [disabled]="true" [invalid]="true" invalidText="This field is required" titleText="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-dropdown>`,
      imports
    );
    const el = wc(fixture.nativeElement);
    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');
    expect(listBox?.classList.contains('cds--dropdown--invalid')).toBe(false);
  });

  it('should not show warning state when disabled is true', async () => {
    const { fixture } = await render(
      `<cds-dropdown [disabled]="true" [warn]="true" warnText="This is a warning" titleText="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-dropdown>`,
      imports
    );
    const el = wc(fixture.nativeElement);
    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');
    expect(listBox?.classList.contains('cds--dropdown--warn')).toBe(false);
  });

  it('should not show warning state when invalid is true', async () => {
    const { fixture } = await render(
      `<cds-dropdown [invalid]="true" [warn]="true" invalidText="This field is required" warnText="This is a warning" titleText="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-dropdown>`,
      imports
    );
    const el = wc(fixture.nativeElement);
    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');
    expect(listBox?.classList.contains('cds--dropdown--invalid')).toBe(true);
    expect(listBox?.classList.contains('cds--dropdown--warn')).toBe(false);

    const helperText = el.shadowRoot.querySelector('.cds--form__helper-text');
    expect(helperText?.textContent?.trim()).toBe('This field is required');
  });

  it('should apply correct CSS classes based on normalized props', async () => {
    const { fixture } = await render(
      `<cds-dropdown [disabled]="true" [invalid]="true" [warn]="true" titleText="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-dropdown>`,
      imports
    );
    const el = wc(fixture.nativeElement);
    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');

    expect(listBox?.classList.contains('cds--list-box--disabled')).toBe(true);
    expect(listBox?.classList.contains('cds--dropdown--invalid')).toBe(false);
    expect(listBox?.classList.contains('cds--dropdown--warn')).toBe(false);
  });

  it('should prevent interaction when readOnly is true', async () => {
    const { fixture } = await render(
      `<cds-dropdown [readOnly]="true" titleText="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-dropdown>`,
      imports
    );
    const el = wc(fixture.nativeElement);
    await el.updateComplete;

    const triggerButton = el.shadowRoot.querySelector(
      '#trigger-button'
    ) as HTMLElement;
    triggerButton.click();
    await el.updateComplete;

    expect(el.open).toBe(false);
  });
});

describe('AI label and slug slot (@query decorator)', () => {
  // WC: requires AiLabelComponent and SlugComponent
  it.todo('should set ai-label attribute when cds-ai-label is slotted');
  it.todo('should resolve ai-label slot node via @query decorator');
  it.todo('should resolve slug slot node via @query decorator');
  it.todo(
    'should toggle cds--slug--revert class on ai-label slot when revert-active is set'
  );
  it.todo(
    'should not add cds--slug--revert to slug slot when only cds-slug is present (ai-label slot takes precedence in shadow DOM)'
  );
  it.todo(
    'should not set cds--slug--revert on ai-label slot when revert-active is absent'
  );
  it.todo('should remove ai-label attribute when no cds-ai-label is slotted');
  it.todo(
    'should toggle cds--slug--revert on slug slot when ai-label slot node is absent'
  );
});

describe('cds-dropdown-skeleton', () => {
  // TODO(parity): DropdownSkeletonComponent not yet generated — all tests todo.
  it.todo('should render with the expected classes');
});
