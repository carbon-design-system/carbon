/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/button/__tests__/button-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 *
 * Each `it` keeps the WC test's title. The WC test renders
 * `<cds-button ...>` with open-wc `fixture(html\`...\`)`. This test renders
 * the Angular `<cds-button>` wrapper. Under ADR 0015 the host element IS the
 * web component — there is no inner `cds-ng-button`. Assertions run against
 * the shadow DOM of the `cds-button` host element directly, matching the
 * original WC tests.
 *
 * Ported 1:1 unless noted. Tests that cannot run in jsdom are `it.todo` with a
 * reason, and are covered by Playwright (`Button.e2e.ts`) where marked.
 */

import { ButtonComponent } from '../../../generated/Button';
import { render } from '../../../testing/render';

const imports = [ButtonComponent];

/**
 * The web component element. In the host-is-WC design (ADR 0015) the Angular
 * wrapper's host IS the `cds-button` custom element — there is no inner
 * `cds-ng-button`. TestBed wraps the component in a fixture element, so we
 * query for the first `cds-button` inside it.
 */
const wc = (el: HTMLElement) =>
  el.querySelector('cds-button') as HTMLElement & {
    shadowRoot: ShadowRoot;
  };
const inner = (el: HTMLElement, selector: string) =>
  wc(el).shadowRoot.querySelector(selector) as HTMLElement | null;

describe('cds-button (parity with web-components button-test.js)', () => {
  it('should support a custom tabIndex through props', async () => {
    const { fixture } = await render(
      `<cds-button [tabIndex]="-1">test</cds-button>`,
      imports
    );
    expect(wc(fixture.nativeElement).getAttribute('tab-index')).toBe('-1');
  });

  it('should support a custom className on the outermost element', async () => {
    const { query } = await render(
      `<cds-button class="custom-class">test</cds-button>`,
      imports
    );
    expect(query('cds-button').classList).toContain('custom-class');
  });

  it('should render an element with the button role', async () => {
    const { fixture } = await render(`<cds-button>test</cds-button>`, imports);
    expect(inner(fixture.nativeElement, 'button')).toBeTruthy();
  });

  it('should use the disabled prop to set disabled on the <button>', async () => {
    const { fixture, host, update } = await render(
      `<cds-button [disabled]="disabled">test</cds-button>`,
      imports,
      { disabled: false }
    );
    const button = inner(fixture.nativeElement, 'button')!;
    expect(button.hasAttribute('disabled')).toBe(false);

    host.disabled = true;
    await update();
    expect(button.hasAttribute('disabled')).toBe(true);
  });

  it('should render with a default button type of button', async () => {
    const { fixture } = await render(`<cds-button>test</cds-button>`, imports);
    expect(inner(fixture.nativeElement, 'button')!.getAttribute('type')).toBe(
      'button'
    );
  });

  ['button', 'submit', 'reset'].forEach((type) => {
    it(`should support changing the button type to ${type} with the \`type\` prop`, async () => {
      const { fixture } = await render(
        `<cds-button type="${type}">test</cds-button>`,
        imports
      );
      expect(inner(fixture.nativeElement, 'button')!.getAttribute('type')).toBe(
        type
      );
    });
  });

  it('should render as an element with the role of `link` when the `href` prop is used', async () => {
    const { fixture } = await render(
      `<cds-button href="/">test</cds-button>`,
      imports
    );
    const link = inner(fixture.nativeElement, 'a');
    expect(link).toBeTruthy();
    expect(link!.getAttribute('href')).toBe('/');
  });

  it('should not error on tooltipAlignment even when hasIconOnly=false', async () => {
    const { fixture } = await render(
      `<cds-button tooltipAlignment="start"></cds-button>`,
      imports
    );
    expect(wc(fixture.nativeElement).getAttribute('tooltip-alignment')).toBe(
      'start'
    );
  });

  const kinds = [
    ['primary', 'cds--btn--primary'],
    ['secondary', 'cds--btn--secondary'],
    ['ghost', 'cds--btn--ghost'],
    ['danger', 'cds--btn--danger'],
    ['danger--primary', 'cds--btn--danger--primary'],
    ['danger-ghost', 'cds--btn--danger--ghost'],
    ['danger-tertiary', 'cds--btn--danger--tertiary'],
    ['tertiary', 'cds--btn--tertiary'],
  ];

  kinds.forEach(([kind, className]) => {
    it(`kind="${kind}"`, async () => {
      const { fixture } = await render(
        `<cds-button kind="${kind}">test</cds-button>`,
        imports
      );
      expect(wc(fixture.nativeElement).getAttribute('kind')).toBe(kind);
      expect(
        inner(fixture.nativeElement, 'button')!.classList.contains(className)
      ).toBe(true);
    });
  });

  it('does not render default danger assistive text when none is provided', async () => {
    const { fixture } = await render(
      `<cds-button kind="danger">test</cds-button>`,
      imports
    );
    expect(inner(fixture.nativeElement, '.cds--visually-hidden')).toBeNull();
  });

  it('renders custom danger assistive text when provided', async () => {
    const { fixture } = await render(
      `<cds-button kind="danger" dangerDescription="gefahr">test</cds-button>`,
      imports
    );
    const button = inner(fixture.nativeElement, 'button')!;
    const hiddenText = inner(fixture.nativeElement, '.cds--visually-hidden')!;

    expect(button.getAttribute('aria-describedby')).toBe('danger-description');
    expect(hiddenText).toBeTruthy();
    expect(hiddenText.getAttribute('id')).toBe('danger-description');
    expect(hiddenText.textContent).toBe('gefahr');
  });

  describe('supports props.size', () => {
    [
      ['sm', 'cds--btn--sm'],
      ['md', 'cds--btn--md'],
      ['lg', 'cds--btn--lg'],
      ['xl', 'cds--btn--xl'],
      ['2xl', 'cds--btn--2xl'],
    ].forEach(([size, className]) => {
      it(`size="${size}"`, async () => {
        const { fixture } = await render(
          `<cds-button size="${size}">test</cds-button>`,
          imports
        );
        expect(wc(fixture.nativeElement).getAttribute('size')).toBe(size);
        expect(
          inner(fixture.nativeElement, 'button')!.classList.contains(className)
        ).toBe(true);
      });
    });
  });

  describe('Button with Icon variant', () => {
    it('should render the given icon within the <button> element', async () => {
      const { fixture } = await render(
        `<cds-button>test<svg slot="icon" data-testid="svg"></svg></cds-button>`,
        imports
      );
      // Projected through the wrapper into the web component's light DOM.
      expect(
        wc(fixture.nativeElement).querySelector('svg[data-testid="svg"]')
      ).toBeTruthy();
      expect(inner(fixture.nativeElement, 'slot[name="icon"]')).toBeTruthy();
    });
  });

  describe('Icon Button variant', () => {
    // WC: sets a `has-icon-only` attribute, but CDSButton has no such property —
    // it derives icon-only from slot content. Port asserts the rendered result.
    it('should set the icon-only class', async () => {
      const { fixture } = await render(
        `<cds-button><svg slot="icon" data-testid="svg"></svg></cds-button>`,
        imports
      );
      expect(
        inner(fixture.nativeElement, 'button')!.classList.contains(
          'cds--btn--icon-only'
        )
      ).toBe(true);
    });

    // WC tests set `badge-count` / `has-icon-only` attributes that CDSButton does
    // not declare; they only assert the attribute they wrote and a shadow-DOM
    // snapshot. Needs a badge-indicator slot story + wrapper support first.
    it.todo('should support badge indicator');
    it.todo('should support badge indicator and truncate');

    it('should set aria-pressed on a selected ghost icon button', async () => {
      const { fixture } = await render(
        `<cds-button kind="ghost" isSelected tooltipText="Icon button">
           <svg slot="icon" data-testid="svg"></svg>
         </cds-button>`,
        imports
      );
      expect(
        inner(fixture.nativeElement, 'button')!.hasAttribute('aria-pressed')
      ).toBe(true);
    });

    it('should not set aria-pressed on a ghost icon button that is not selected', async () => {
      const { fixture } = await render(
        `<cds-button kind="ghost" tooltipText="Icon button">
           <svg slot="icon" data-testid="svg"></svg>
         </cds-button>`,
        imports
      );
      expect(
        inner(fixture.nativeElement, 'button')!.hasAttribute('aria-pressed')
      ).toBe(false);
    });

    it('should not set aria-pressed on a non-icon ghost button', async () => {
      const { fixture } = await render(
        `<cds-button kind="ghost" isSelected>test</cds-button>`,
        imports
      );
      expect(
        inner(fixture.nativeElement, 'button')!.hasAttribute('aria-pressed')
      ).toBe(false);
    });
  });

  describe('Tooltip popover position classes', () => {
    ['top', 'bottom', 'left', 'right'].forEach((position) => {
      ['start', 'center', 'end'].forEach((alignment) => {
        const expectedClass =
          position === 'top' || position === 'bottom'
            ? `cds--popover--${position}-${alignment}`
            : `cds--popover--${position}`;

        it(`uses "${expectedClass}" for tooltip-position="${position}" tooltip-alignment="${alignment}"`, async () => {
          const { fixture } = await render(
            `<cds-button tooltipText="tip" tooltipPosition="${position}" tooltipAlignment="${alignment}">
               <svg slot="icon" data-testid="svg"></svg>
             </cds-button>`,
            imports
          );
          const container = inner(
            fixture.nativeElement,
            '.cds--popover-container'
          );
          expect(container).toBeTruthy();
          expect(container!.classList.contains(expectedClass)).toBe(true);
          expect(container!.classList.contains('cds--tooltip')).toBe(true);
          expect(container!.classList.contains('cds--icon-tooltip')).toBe(true);
        });
      });
    });
  });

  // These measure `getBoundingClientRect()` of the rendered popover. jsdom has
  // no layout engine (every rect is 0), so they cannot run here. Equivalent
  // coverage lives in the web component suite itself; add a Playwright case to
  // Button.e2e.ts if the Angular wrapper ever changes how `dir` is handled.
  describe('Tooltip popover RTL alignment', () => {
    it.todo(
      'renders centered "top" tooltip horizontally aligned with the button in RTL'
    );
    it.todo(
      'renders centered "bottom" tooltip horizontally aligned with the button in RTL'
    );
    it.todo(
      'anchors "top-left" tooltip toward the button\'s inline-start edge in RTL'
    );
    it.todo(
      'anchors "top-right" tooltip toward the button\'s inline-end edge in RTL'
    );
    it.todo(
      'anchors "bottom-left" tooltip toward the button\'s inline-start edge in RTL'
    );
    it.todo(
      'anchors "bottom-right" tooltip toward the button\'s inline-end edge in RTL'
    );
    it.todo(
      'keeps "right" tooltip on the same physical side of the button in RTL as in LTR'
    );
    it.todo(
      'keeps "left" tooltip on the same physical side of the button in RTL as in LTR'
    );
  });
});
