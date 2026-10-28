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
 * the Angular `<cds-action-set>` wrapper. Under ADR 0015 the host element IS the
 * web component.
 *
 * Ported 1:1 unless noted. Tests that cannot run in jsdom are `it.todo` with
 * a reason.
 */

import { ActionSetComponent } from '../../../generated/ActionSet';
import { ButtonComponent } from '../../../generated/Button';
import { render } from '../../../testing/render';

const imports = [ActionSetComponent, ButtonComponent];

const prefix = 'cds';
const blockClass = `${prefix}--action-set`;

/** The cds-action-set host element. */
const wc = (el: HTMLElement) =>
  el.querySelector('cds-action-set') as HTMLElement & {
    shadowRoot: ShadowRoot;
    size: string;
    stacked: boolean;
    disableStacking: boolean;
  };

/** The inner button-set div in the shadow root. */
const buttonSet = (el: HTMLElement) =>
  (wc(el).shadowRoot?.querySelector(`div.${blockClass}`) as HTMLElement) ||
  null;

describe('cds-action-set (parity with web-components action-set-test.js)', () => {
  describe('Basic rendering', () => {
    it('renders with default properties', async () => {
      const { fixture } = await render(
        `<cds-action-set>
          <cds-button kind="secondary">Cancel</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>`,
        imports
      );
      expect(wc(fixture.nativeElement)).toBeTruthy();
      expect(wc(fixture.nativeElement).size).toBe('md');
      expect(wc(fixture.nativeElement).stacked).toBe(false);
      expect(wc(fixture.nativeElement).disableStacking).toBe(false);
    });

    it('applies correct CSS classes', async () => {
      const { fixture } = await render(
        `<cds-action-set>
          <cds-button kind="secondary">Cancel</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>`,
        imports
      );
      const bs = buttonSet(fixture.nativeElement);
      expect(bs).toBeTruthy();
      expect(bs!.classList.contains(blockClass)).toBe(true);
      expect(bs!.classList.contains(`${blockClass}--md`)).toBe(true);
    });

    it('renders buttons in correct order (secondary first, primary last)', async () => {
      const { fixture } = await render(
        `<cds-action-set>
          <cds-button kind="secondary">Cancel</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>`,
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
        `<cds-action-set size="xl">
          <cds-button kind="primary">Primary</cds-button>
          <cds-button kind="ghost">Ghost</cds-button>
          <cds-button kind="tertiary">Tertiary</cds-button>
          <cds-button kind="secondary">Secondary</cds-button>
        </cds-action-set>`,
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
        `<cds-action-set size="sm" [actions]="actions"></cds-action-set>`,
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
        `<cds-action-set size="sm">
          <cds-button kind="secondary">Cancel</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>`,
        imports
      );
      expect(wc(fixture.nativeElement).stacked).toBe(true);
      const bs = buttonSet(fixture.nativeElement);
      expect(bs?.classList.contains(`${blockClass}--stacking`)).toBe(true);
    });

    it('stacks buttons when size is md and has 3+ buttons', async () => {
      const { fixture } = await render(
        `<cds-action-set size="md">
          <cds-button kind="tertiary">Cancel</cds-button>
          <cds-button kind="secondary">Back</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>`,
        imports
      );
      expect(wc(fixture.nativeElement).stacked).toBe(true);
    });

    it('does not stack when size is md with 2 buttons', async () => {
      const { fixture } = await render(
        `<cds-action-set size="md">
          <cds-button kind="secondary">Cancel</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>`,
        imports
      );
      expect(wc(fixture.nativeElement).stacked).toBe(false);
    });

    it('respects disableStacking property', async () => {
      const { fixture } = await render(
        `<cds-action-set size="sm" [disableStacking]="true">
          <cds-button kind="secondary">Cancel</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>`,
        imports
      );
      expect(wc(fixture.nativeElement).disableStacking).toBe(true);
      expect(wc(fixture.nativeElement).stacked).toBe(false);
    });
  });

  describe('Size variants', () => {
    // Each size needs its own test — calling render() twice in one `it` block
    // hits "TestBed already instantiated" because render() calls
    // TestBed.configureTestingModule and afterEach resets it between tests.
    ['sm', 'md', 'lg', 'xl', '2xl'].forEach((size) => {
      it(`applies correct class for size="${size}"`, async () => {
        const { fixture } = await render(
          `<cds-action-set size="${size}">
            <cds-button kind="primary">Submit</cds-button>
          </cds-action-set>`,
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
        `<cds-action-set>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>`,
        imports
      );
      const bs = buttonSet(fixture.nativeElement);
      expect(bs?.classList.contains(`${blockClass}--row-single`)).toBe(true);
    });

    it('applies row-double class for 2 buttons', async () => {
      const { fixture } = await render(
        `<cds-action-set>
          <cds-button kind="secondary">Cancel</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>`,
        imports
      );
      const bs = buttonSet(fixture.nativeElement);
      expect(bs?.classList.contains(`${blockClass}--row-double`)).toBe(true);
    });

    it('applies row-triple class for 3 buttons', async () => {
      const { fixture } = await render(
        `<cds-action-set size="lg">
          <cds-button kind="tertiary">Cancel</cds-button>
          <cds-button kind="secondary">Back</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>`,
        imports
      );
      const bs = buttonSet(fixture.nativeElement);
      expect(bs?.classList.contains(`${blockClass}--row-triple`)).toBe(true);
    });

    it('applies row-quadruple class for 4 buttons', async () => {
      const { fixture } = await render(
        `<cds-action-set size="xl">
          <cds-button kind="ghost">Help</cds-button>
          <cds-button kind="tertiary">Cancel</cds-button>
          <cds-button kind="secondary">Back</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>`,
        imports
      );
      const bs = buttonSet(fixture.nativeElement);
      expect(bs?.classList.contains(`${blockClass}--row-quadruple`)).toBe(true);
    });
  });

  describe('Button size property', () => {
    it('applies button-size to all buttons', async () => {
      const { fixture } = await render(
        `<cds-action-set button-size="lg">
          <cds-button kind="secondary">Cancel</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>`,
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
});
