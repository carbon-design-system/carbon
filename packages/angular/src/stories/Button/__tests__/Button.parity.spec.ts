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
 * the Angular `<cds-ng-button>` wrapper. Under ADR 0015 and ADR 0020 the host
 * element IS the cds-ng-button web component. Assertions run against the shadow DOM
 * of the `cds-ng-button` host element directly, matching the original WC tests.
 *
 * Ported 1:1 unless noted. Tests that cannot run in jsdom are `it.todo` with a
 * reason, and are covered by Playwright (`Button.e2e.ts`) where marked.
 */

import { ButtonComponent } from '@carbon/angular/button';
import { render } from '../../../testing/render';

const imports = [ButtonComponent];

/**
 * The web component element. In the host-is-WC design (ADR 0015, ADR 0020) the Angular
 * wrapper's host IS the `cds-ng-button` custom element. TestBed wraps the component
 * in a fixture element, so we query for the first `cds-ng-button` inside it.
 */
const wc = (el: HTMLElement) =>
  el.querySelector('cds-ng-button') as HTMLElement & {
    shadowRoot: ShadowRoot;
  };
const inner = (el: HTMLElement, selector: string) =>
  wc(el).shadowRoot.querySelector(selector) as HTMLElement | null;

describe('cds-ng-button (parity with web-components button-test.js)', () => {
  it('should support a custom tabIndex through props', async () => {
    const { fixture } = await render(
      `<cds-ng-button [tabIndex]="-1">test</cds-ng-button>`,
      imports
    );
    expect(wc(fixture.nativeElement).getAttribute('tab-index')).toBe('-1');
  });

  it('should support a custom className on the outermost element', async () => {
    const { query } = await render(
      `<cds-ng-button class="custom-class">test</cds-ng-button>`,
      imports
    );
    expect(query('cds-ng-button').classList).toContain('custom-class');
  });

  it('should render an element with the button role', async () => {
    const { fixture } = await render(
      `<cds-ng-button>test</cds-ng-button>`,
      imports
    );
    expect(inner(fixture.nativeElement, 'button')).toBeTruthy();
  });

  it('should use the disabled prop to set disabled on the <button>', async () => {
    const { fixture, host, update } = await render(
      `<cds-ng-button [disabled]="disabled">test</cds-ng-button>`,
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
    const { fixture } = await render(
      `<cds-ng-button>test</cds-ng-button>`,
      imports
    );
    expect(inner(fixture.nativeElement, 'button')!.getAttribute('type')).toBe(
      'button'
    );
  });

  ['button', 'submit', 'reset'].forEach((type) => {
    it(`should support changing the button type to ${type} with the \`type\` prop`, async () => {
      const { fixture } = await render(
        `<cds-ng-button type="${type}">test</cds-ng-button>`,
        imports
      );
      expect(inner(fixture.nativeElement, 'button')!.getAttribute('type')).toBe(
        type
      );
    });
  });

  it('should render as an element with the role of `link` when the `href` prop is used', async () => {
    const { fixture } = await render(
      `<cds-ng-button href="/">test</cds-ng-button>`,
      imports
    );
    const link = inner(fixture.nativeElement, 'a');
    expect(link).toBeTruthy();
    expect(link!.getAttribute('href')).toBe('/');
  });

  it('should not error on tooltipAlignment even when hasIconOnly=false', async () => {
    const { fixture } = await render(
      `<cds-ng-button tooltipAlignment="start"></cds-ng-button>`,
      imports
    );
    expect(wc(fixture.nativeElement).getAttribute('tooltip-alignment')).toBe(
      'start'
    );
  });

  const kinds = [
    ['primary', 'cds-ng--btn--primary'],
    ['secondary', 'cds-ng--btn--secondary'],
    ['ghost', 'cds-ng--btn--ghost'],
    ['danger', 'cds-ng--btn--danger'],
    ['danger--primary', 'cds-ng--btn--danger--primary'],
    ['danger-ghost', 'cds-ng--btn--danger--ghost'],
    ['danger-tertiary', 'cds-ng--btn--danger--tertiary'],
    ['tertiary', 'cds-ng--btn--tertiary'],
  ];

  kinds.forEach(([kind, className]) => {
    it(`kind="${kind}"`, async () => {
      const { fixture } = await render(
        `<cds-ng-button kind="${kind}">test</cds-ng-button>`,
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
      `<cds-ng-button kind="danger">test</cds-ng-button>`,
      imports
    );
    expect(inner(fixture.nativeElement, '.cds-ng--visually-hidden')).toBeNull();
  });

  it('renders custom danger assistive text when provided', async () => {
    const { fixture } = await render(
      `<cds-ng-button kind="danger" dangerDescription="gefahr">test</cds-ng-button>`,
      imports
    );
    const button = inner(fixture.nativeElement, 'button')!;
    const hiddenText = inner(
      fixture.nativeElement,
      '.cds-ng--visually-hidden'
    )!;

    expect(button.getAttribute('aria-describedby')).toBe('danger-description');
    expect(hiddenText).toBeTruthy();
    expect(hiddenText.getAttribute('id')).toBe('danger-description');
    expect(hiddenText.textContent).toBe('gefahr');
  });

  describe('supports props.size', () => {
    [
      ['sm', 'cds-ng--btn--sm'],
      ['md', 'cds-ng--btn--md'],
      ['lg', 'cds-ng--btn--lg'],
      ['xl', 'cds-ng--btn--xl'],
      ['2xl', 'cds-ng--btn--2xl'],
    ].forEach(([size, className]) => {
      it(`size="${size}"`, async () => {
        const { fixture } = await render(
          `<cds-ng-button size="${size}">test</cds-ng-button>`,
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
        `<cds-ng-button>test<svg slot="icon" data-testid="svg"></svg></cds-ng-button>`,
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
        `<cds-ng-button><svg slot="icon" data-testid="svg"></svg></cds-ng-button>`,
        imports
      );
      expect(
        inner(fixture.nativeElement, 'button')!.classList.contains(
          'cds-ng--btn--icon-only'
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
        `<cds-ng-button kind="ghost" isSelected tooltipText="Icon button">
           <svg slot="icon" data-testid="svg"></svg>
         </cds-ng-button>`,
        imports
      );
      expect(
        inner(fixture.nativeElement, 'button')!.hasAttribute('aria-pressed')
      ).toBe(true);
    });

    it('should not set aria-pressed on a ghost icon button that is not selected', async () => {
      const { fixture } = await render(
        `<cds-ng-button kind="ghost" tooltipText="Icon button">
           <svg slot="icon" data-testid="svg"></svg>
         </cds-ng-button>`,
        imports
      );
      expect(
        inner(fixture.nativeElement, 'button')!.hasAttribute('aria-pressed')
      ).toBe(false);
    });

    it('should not set aria-pressed on a non-icon ghost button', async () => {
      const { fixture } = await render(
        `<cds-ng-button kind="ghost" isSelected>test</cds-ng-button>`,
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
            ? `cds-ng--popover--${position}-${alignment}`
            : `cds-ng--popover--${position}`;

        it(`uses "${expectedClass}" for tooltip-position="${position}" tooltip-alignment="${alignment}"`, async () => {
          const { fixture } = await render(
            `<cds-ng-button
               tooltipText="tip"
               tooltipPosition="${position}"
               tooltipAlignment="${alignment}">
               <svg slot="icon" data-testid="svg"></svg>
             </cds-ng-button>`,
            imports
          );
          const container = inner(
            fixture.nativeElement,
            '.cds-ng--popover-container'
          );
          expect(container).toBeTruthy();
          expect(container!.classList.contains(expectedClass)).toBe(true);
          expect(container!.classList.contains('cds-ng--tooltip')).toBe(true);
          expect(container!.classList.contains('cds-ng--icon-tooltip')).toBe(
            true
          );
        });
      });
    });
  });

  // Layout-sensitive tests that cannot run in jsdom (getBoundingClientRect
  // returns 0,0,0,0). All 8 are covered by Playwright in `Button.e2e.ts`.
  describe('RTL auto-alignment (jsdom todo -> Playwright)', () => {
    // WC titles use template literals with ${position}/${alignment}; recorded
    // verbatim below so the parity script can match them.
    const positions = ['top', 'bottom'];
    const anchors = [
      { position: 'top', alignment: 'left', expectedAnchor: 'start' },
      { position: 'top', alignment: 'right', expectedAnchor: 'end' },
      { position: 'bottom', alignment: 'left', expectedAnchor: 'start' },
      { position: 'bottom', alignment: 'right', expectedAnchor: 'end' },
    ];
    const sides = ['right', 'left'];
    positions.forEach((position) => {
      it.todo(
        `renders centered "${position}" tooltip horizontally aligned with the button in RTL`
      );
    });
    anchors.forEach(({ position, alignment, expectedAnchor }) => {
      it.todo(
        `anchors "${position}-${alignment}" tooltip toward the button's inline-${expectedAnchor} edge in RTL`
      );
    });
    sides.forEach((position) => {
      it.todo(
        `keeps "${position}" tooltip on the same physical side of the button in RTL as in LTR`
      );
    });
    it.todo(
      'should automatically set alignment to end if the tooltip extends past the right edge (Playwright)'
    );
    it.todo(
      'should automatically set alignment to start if the tooltip extends past the left edge (Playwright)'
    );
    it.todo(
      'should automatically set position to top if the tooltip extends past the bottom edge (Playwright)'
    );
    it.todo(
      'should automatically set position to bottom if the tooltip extends past the top edge (Playwright)'
    );
    it.todo(
      'should automatically flip tooltipPosition when using RTL and position is left or right (Playwright)'
    );
    it.todo(
      'should automatically flip tooltipAlignment when using RTL and position is top or bottom (Playwright)'
    );
    it.todo(
      'should not flip alignment if RTL and alignment is center (Playwright)'
    );
    it.todo(
      'should not flip position if RTL and position is center (Playwright)'
    );
  });
});
