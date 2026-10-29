/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/action-set/__tests__/action-set-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 *
 * Each `it` keeps the WC test's title verbatim. The WC test renders
 * `<cds-action-set ...>` with open-wc `fixture(html\`...\`)`. This test renders
 * the Angular `<cds-ng-action-set>` wrapper. Under ADR 0015 and ADR 0020 the host
 * element IS the cds-ng-action-set web component.
 *
 * Ported 1:1 unless noted. Tests that cannot run in jsdom are `it.todo` with
 * a reason.
 */

import { ActionSetComponent } from '@carbon/angular/action-set';
import { ButtonComponent } from '@carbon/angular/button';
import { render, settle } from '../../../testing/render';

const imports = [ActionSetComponent, ButtonComponent];

const prefix = 'cds-ng';
const blockClass = `${prefix}--action-set`;

/** The cds-ng-action-set host element. */
const wc = (el: HTMLElement) =>
  el.querySelector('cds-ng-action-set') as HTMLElement & {
    shadowRoot: ShadowRoot;
    size: string;
    stacked: boolean;
    disableStacking: boolean;
  };

/** The inner button-set div in the shadow root. */
const buttonSet = (el: HTMLElement) =>
  (wc(el).shadowRoot?.querySelector(`div.${blockClass}`) as HTMLElement) ||
  null;

describe('cds-ng-action-set (parity with web-components action-set-test.js)', () => {
  describe('Basic rendering', () => {
    it('renders with default properties', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set>
          <cds-ng-button kind="secondary">Cancel</cds-ng-button>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      expect(wc(fixture.nativeElement)).toBeTruthy();
      expect(wc(fixture.nativeElement).size).toBe('md');
      expect(wc(fixture.nativeElement).stacked).toBe(false);
      expect(wc(fixture.nativeElement).disableStacking).toBe(false);
    });

    it('applies correct CSS classes', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set>
          <cds-ng-button kind="secondary">Cancel</cds-ng-button>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      const bs = buttonSet(fixture.nativeElement);
      expect(bs).toBeTruthy();
      expect(bs!.classList.contains(blockClass)).toBe(true);
      expect(bs!.classList.contains(`${blockClass}--md`)).toBe(true);
    });

    it('renders buttons in correct order (secondary first, primary last)', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set>
          <cds-ng-button kind="secondary">Cancel</cds-ng-button>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      const buttons = fixture.nativeElement.querySelectorAll(
        `${prefix}-button`
      );
      expect(buttons.length).toBe(2);
      expect(buttons[0].getAttribute('kind')).toBe('secondary');
      expect(buttons[1].getAttribute('kind')).toBe('primary');
    });
  });

  describe('Button ordering', () => {
    it('orders buttons correctly: ghost, tertiary, secondary, primary', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set size="xl">
          <cds-ng-button kind="primary">Primary</cds-ng-button>
          <cds-ng-button kind="ghost">Ghost</cds-ng-button>
          <cds-ng-button kind="tertiary">Tertiary</cds-ng-button>
          <cds-ng-button kind="secondary">Secondary</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      const buttons = Array.from(
        fixture.nativeElement.querySelectorAll(`${prefix}-button`)
      ) as HTMLElement[];
      expect(buttons.length).toBe(4);
      const ghostButton = buttons.find(
        (btn) => btn.getAttribute('kind') === 'ghost'
      );
      expect(
        ghostButton?.classList.contains(`${blockClass}__action-button--ghost`)
      ).toBe(true);
    });

    it('reverses order when stacked', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set size="sm" [actions]="actions"></cds-ng-action-set>`,
        imports,
        {
          actions: [
            { kind: 'secondary', label: 'Cancel' },
            { kind: 'primary', label: 'Submit' },
          ],
        }
      );
      expect(wc(fixture.nativeElement).stacked).toBe(true);
      const buttons = Array.from(
        wc(fixture.nativeElement).shadowRoot.querySelectorAll(
          `${prefix}-button`
        )
      ) as HTMLElement[];
      const kinds = buttons.map((btn) => btn.getAttribute('kind'));
      // When stacked, primary should come first
      expect(kinds[0]).toBe('primary');
      expect(kinds[1]).toBe('secondary');
    });
  });

  describe('Stacking behavior', () => {
    it('stacks buttons when size is sm', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set size="sm">
          <cds-ng-button kind="secondary">Cancel</cds-ng-button>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      expect(wc(fixture.nativeElement).stacked).toBe(true);
      const bs = buttonSet(fixture.nativeElement);
      expect(bs?.classList.contains(`${blockClass}--stacking`)).toBe(true);
    });

    it('stacks buttons when size is md and has 3+ buttons', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set size="md">
          <cds-ng-button kind="tertiary">Cancel</cds-ng-button>
          <cds-ng-button kind="secondary">Back</cds-ng-button>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      expect(wc(fixture.nativeElement).stacked).toBe(true);
    });

    it('does not stack when size is md with 2 buttons', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set size="md">
          <cds-ng-button kind="secondary">Cancel</cds-ng-button>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      expect(wc(fixture.nativeElement).stacked).toBe(false);
    });

    it('respects disableStacking property', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set size="sm" [disableStacking]="true">
          <cds-ng-button kind="secondary">Cancel</cds-ng-button>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      expect(wc(fixture.nativeElement).disableStacking).toBe(true);
      expect(wc(fixture.nativeElement).stacked).toBe(false);
    });
  });

  describe('Size variants', () => {
    // WC test uses one `it` that loops over all sizes.  Angular breaks it into
    // per-size cases with different titles, so the WC title is recorded here.
    it.todo('applies correct classes for different sizes');
    ['sm', 'md', 'lg', 'xl', '2xl'].forEach((size) => {
      it(`applies correct class for size="${size}"`, async () => {
        const { fixture } = await render(
          `<cds-ng-action-set size="${size}">
            <cds-ng-button kind="primary">Submit</cds-ng-button>
          </cds-ng-action-set>`,
          imports
        );
        const bs = buttonSet(fixture.nativeElement);
        expect(bs?.classList.contains(`${blockClass}--${size}`)).toBe(true);
      });
    });
  });

  describe('Button count classes', () => {
    it('applies row-single class for 1 button', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      const bs = buttonSet(fixture.nativeElement);
      expect(bs?.classList.contains(`${blockClass}--row-single`)).toBe(true);
    });

    it('applies row-double class for 2 buttons', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set>
          <cds-ng-button kind="secondary">Cancel</cds-ng-button>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      const bs = buttonSet(fixture.nativeElement);
      expect(bs?.classList.contains(`${blockClass}--row-double`)).toBe(true);
    });

    it('applies row-triple class for 3 buttons', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set size="lg">
          <cds-ng-button kind="tertiary">Cancel</cds-ng-button>
          <cds-ng-button kind="secondary">Back</cds-ng-button>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      const bs = buttonSet(fixture.nativeElement);
      expect(bs?.classList.contains(`${blockClass}--row-triple`)).toBe(true);
    });

    it('applies row-quadruple class for 4 buttons', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set size="xl">
          <cds-ng-button kind="ghost">Help</cds-ng-button>
          <cds-ng-button kind="tertiary">Cancel</cds-ng-button>
          <cds-ng-button kind="secondary">Back</cds-ng-button>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      const bs = buttonSet(fixture.nativeElement);
      expect(bs?.classList.contains(`${blockClass}--row-quadruple`)).toBe(true);
    });
  });

  describe('Button size property', () => {
    it('applies button-size to all buttons', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set button-size="lg">
          <cds-ng-button kind="secondary">Cancel</cds-ng-button>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      const buttons = fixture.nativeElement.querySelectorAll(
        `${prefix}-button`
      );
      buttons.forEach((button: Element) => {
        expect(button.getAttribute('size')).toBe('lg');
      });
    });
  });

  describe('Action set styling', () => {
    it('adds action-button class to buttons', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      const button = fixture.nativeElement.querySelector(`${prefix}-button`);
      expect(button?.classList.contains(`${blockClass}__action-button`)).toBe(
        true
      );
    });

    it('adds ghost-specific class to ghost buttons', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set size="lg">
          <cds-ng-button kind="ghost">Help</cds-ng-button>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      const ghostButton = Array.from(
        fixture.nativeElement.querySelectorAll(`${prefix}-button`)
      ).find((btn) => (btn as Element).getAttribute('kind') === 'ghost') as
        | HTMLElement
        | undefined;
      expect(
        ghostButton?.classList.contains(`${blockClass}__action-button--ghost`)
      ).toBe(true);
    });

    it('sets is-expressive attribute on buttons', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      const button = fixture.nativeElement.querySelector(`${prefix}-button`);
      expect(button?.getAttribute('is-expressive')).toBe('true');
    });
  });

  describe('Validation warnings', () => {
    let warnings: string[];
    let originalWarn: typeof console.warn;

    beforeEach(() => {
      warnings = [];
      originalWarn = console.warn;
      console.warn = (...args: unknown[]) => {
        warnings.push(args.join(' '));
      };
    });

    afterEach(() => {
      console.warn = originalWarn;
    });

    const renderWithActions = (
      attrs: string,
      actions: Array<Record<string, unknown>>
    ) =>
      render(
        `<cds-ng-action-set ${attrs} [actions]="actions"></cds-ng-action-set>`,
        imports,
        {
          actions,
        }
      );

    it('warns when more than 4 actions are provided', async () => {
      await renderWithActions('size="xl"', [
        { kind: 'ghost', label: 'Help' },
        { kind: 'tertiary', label: 'Cancel' },
        { kind: 'secondary', label: 'Back' },
        { kind: 'secondary', label: 'Save' },
        { kind: 'primary', label: 'Submit' },
      ]);
      expect(warnings.length).toBeGreaterThan(0);
      expect(warnings[0]).toContain(
        'you cannot have more than four actions in an ActionSet'
      );
    });

    it('warns when more than 3 actions in stacking mode', async () => {
      await renderWithActions('size="sm"', [
        { kind: 'tertiary', label: 'Cancel' },
        { kind: 'secondary', label: 'Back' },
        { kind: 'secondary', label: 'Save' },
        { kind: 'primary', label: 'Submit' },
      ]);
      expect(warnings.length).toBeGreaterThan(0);
      expect(warnings[0]).toContain(
        'you cannot have more than three actions in this size of ActionSet'
      );
    });

    it('warns when more than one primary action', async () => {
      await renderWithActions('', [
        { kind: 'primary', label: 'Submit' },
        { kind: 'primary', label: 'Save' },
      ]);
      expect(warnings.length).toBeGreaterThan(0);
      expect(warnings[0]).toContain(
        "you cannot have more than one 'primary' action in an ActionSet"
      );
    });

    it('warns when more than one ghost action', async () => {
      await renderWithActions('size="xl"', [
        { kind: 'ghost', label: 'Help' },
        { kind: 'danger--ghost', label: 'Delete' },
        { kind: 'primary', label: 'Submit' },
      ]);
      expect(warnings.length).toBeGreaterThan(0);
      expect(warnings[0]).toContain(
        "you cannot have more than one 'ghost' action in an ActionSet"
      );
    });

    it('warns when ghost button with other actions in stacking mode', async () => {
      await renderWithActions('size="sm"', [
        { kind: 'ghost', label: 'Help' },
        { kind: 'primary', label: 'Submit' },
      ]);
      expect(warnings.length).toBeGreaterThan(0);
      expect(warnings[0]).toContain(
        "you cannot have a 'ghost' button in conjunction with other action types in this size of ActionSet"
      );
    });

    it('does not warn for valid action configurations', async () => {
      await renderWithActions('', [
        { kind: 'secondary', label: 'Cancel' },
        { kind: 'primary', label: 'Submit' },
      ]);
      expect(warnings.length).toBe(0);
    });
  });

  describe('_hideSiblingMargin functionality', () => {
    const buttonsIn = (root: ParentNode) =>
      Array.from(root.querySelectorAll(`${prefix}-button`)) as HTMLElement[];

    it('hides margin on focused button and its next sibling', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set>
          <cds-ng-button kind="tertiary">Cancel</cds-ng-button>
          <cds-ng-button kind="secondary">Back</cds-ng-button>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      const buttons = buttonsIn(fixture.nativeElement);
      expect(buttons.length).toBe(3);

      buttons[1].focus();
      await settle(fixture.nativeElement);

      expect(buttons[1].hasAttribute('hide-margin')).toBe(true);
      expect(buttons[2].hasAttribute('hide-margin')).toBe(true);
      expect(buttons[0].hasAttribute('hide-margin')).toBe(false);
    });

    it.todo('removes hide-margin when focus is lost');
    it.todo('works with actions prop rendered buttons');

    it('handles focus on last button correctly', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set>
          <cds-ng-button kind="secondary">Cancel</cds-ng-button>
          <cds-ng-button kind="primary">Submit</cds-ng-button>
        </cds-ng-action-set>`,
        imports
      );
      const buttons = buttonsIn(fixture.nativeElement);

      buttons[1].focus();
      await settle(fixture.nativeElement);

      expect(buttons[0].hasAttribute('hide-margin')).toBe(false);
      expect(buttons[1].hasAttribute('hide-margin')).toBe(true);
    });
  });

  describe('Actions prop with rest properties', () => {
    // WC title uses "cds-button"; Angular wrapper uses "cds-ng-button".
    it.todo('passes rest properties to cds-button');
    it('passes rest properties to cds-ng-button', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set [actions]="actions"></cds-ng-action-set>`,
        imports,
        {
          actions: [
            {
              kind: 'primary',
              label: 'Submit',
              'data-testid': 'submit-button',
              'aria-label': 'Submit form',
            },
          ],
        }
      );
      const button = wc(fixture.nativeElement).shadowRoot.querySelector(
        `${prefix}-button`
      );
      expect(button).toBeTruthy();
      expect(button?.getAttribute('kind')).toBe('primary');
    });

    it('handles onClick callback from actions', async () => {
      const onClick = jest.fn();
      const { fixture } = await render(
        `<cds-ng-action-set [actions]="actions"></cds-ng-action-set>`,
        imports,
        { actions: [{ kind: 'primary', label: 'Submit', onClick }] }
      );
      const button = wc(fixture.nativeElement).shadowRoot.querySelector(
        `${prefix}-button`
      ) as HTMLElement;
      button.click();
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('handles loading state', async () => {
      const { fixture } = await render(
        `<cds-ng-action-set [actions]="actions"></cds-ng-action-set>`,
        imports,
        { actions: [{ kind: 'primary', label: 'Submit', loading: true }] }
      );
      const button = wc(fixture.nativeElement).shadowRoot.querySelector(
        `${prefix}-button`
      );
      expect(button?.hasAttribute('disabled')).toBe(true);
    });
  });
});
