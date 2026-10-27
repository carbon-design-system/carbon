/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Layer 1 — Angular unit tests for ButtonComponent.
 *
 * Architecture (ADR 0015): the host element IS the web component. There is no
 * inner element. Every @Input() is forwarded to the host element as a property
 * via ngOnChanges.
 *
 * NOTE: these tests import from `src/generated/Button` directly and use the
 * `cds-button` selector from that source file. The published package exposes
 * `cds-ng-button` (from `.entries/`). The selector difference is intentional:
 * Jest tests the wrapper class logic; Storybook and e2e tests exercise the
 * consumer-facing `cds-ng-button` tag.
 *
 * These tests use render() with bound templates to properly trigger ngOnChanges.
 * They assert that property forwarding is correct (the Angular input reaches the
 * WC element property). Rendered shadow-DOM assertions live in
 * `Button.parity.spec.ts`. Computed layout and real browser interaction are
 * verified at Layer 2 (Playwright / Button.e2e.ts).
 */

import { ButtonComponent } from '../../../generated/Button';
import { render } from '../../../testing/render';

const imports = [ButtonComponent];

/**
 * The host element IS the cds-button web component (ADR 0015).
 * render() wraps the template in a fixture element, so we query inside it.
 */
const host = (el: HTMLElement) =>
  el.querySelector('cds-button') as HTMLElement & Record<string, any>;

describe('ButtonComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(`<cds-button>text</cds-button>`, imports);
    expect(host(fixture.nativeElement)).toBeTruthy();
  });

  // ─── Selector isolation ────────────────────────────────────────────────────

  it('host element is the web component itself (no inner cds-ng-button)', async () => {
    // ADR 0015: template = <ng-content /> only. The host IS the WC.
    const { fixture } = await render(`<cds-button>text</cds-button>`, imports);
    const el = host(fixture.nativeElement);
    expect(el).not.toBeNull();
    expect(el.querySelector('cds-ng-button')).toBeNull();
  });

  // ─── tabIndex ─────────────────────────────────────────────────────────────
  // Mirrors: WC "should support a custom tabIndex through props"

  it('should forward [tabIndex] as a property on the host element', async () => {
    const { fixture } = await render(
      `<cds-button [tabIndex]="-1">text</cds-button>`,
      imports
    );
    expect(host(fixture.nativeElement).tabIndex).toBe(-1);
  });

  // ─── disabled ─────────────────────────────────────────────────────────────
  // Mirrors: WC "should use the disabled prop to set disabled on the <button>"

  it('should forward [disabled]=true as a property on the host element', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-button [disabled]="disabled">text</cds-button>`,
      imports,
      { disabled: false }
    );
    expect(host(fixture.nativeElement).disabled).toBe(false);

    h.disabled = true;
    await update();
    expect(host(fixture.nativeElement).disabled).toBe(true);
  });

  // ─── type ─────────────────────────────────────────────────────────────────
  // Mirrors: WC "should render with a default button type of button"

  it('should default [type] to "button"', async () => {
    const { fixture } = await render(`<cds-button>text</cds-button>`, imports);
    // Default is set by the component and forwarded on first ngOnChanges.
    expect(host(fixture.nativeElement).type).toBe('button');
  });

  const buttonTypes = ['button', 'submit', 'reset'] as const;
  buttonTypes.forEach((type) => {
    it(`should forward [type]="${type}" as a property`, async () => {
      const { fixture } = await render(
        `<cds-button type="${type}">text</cds-button>`,
        imports
      );
      expect(host(fixture.nativeElement).type).toBe(type);
    });
  });

  // ─── href / link variant ───────────────────────────────────────────────────

  it('should forward [href] as a property on the host element', async () => {
    const { fixture } = await render(
      `<cds-button href="https://example.com">text</cds-button>`,
      imports
    );
    expect(host(fixture.nativeElement).href).toBe('https://example.com');
  });

  // ─── kind ─────────────────────────────────────────────────────────────────

  it('should default [kind] to "primary"', async () => {
    const { fixture } = await render(`<cds-button>text</cds-button>`, imports);
    expect(host(fixture.nativeElement).kind).toBe('primary');
  });

  const kinds = [
    'primary',
    'secondary',
    'ghost',
    'danger',
    'danger-primary',
    'danger-ghost',
    'danger-tertiary',
    'tertiary',
  ] as const;

  kinds.forEach((kind) => {
    it(`should forward [kind]="${kind}" as a property`, async () => {
      const { fixture } = await render(
        `<cds-button kind="${kind}">text</cds-button>`,
        imports
      );
      expect(host(fixture.nativeElement).kind).toBe(kind);
    });
  });

  // ─── dangerDescription ────────────────────────────────────────────────────

  it('should forward [dangerDescription] as a property', async () => {
    const { fixture } = await render(
      `<cds-button dangerDescription="Gefahr">text</cds-button>`,
      imports
    );
    expect(host(fixture.nativeElement).dangerDescription).toBe('Gefahr');
  });

  // ─── size ─────────────────────────────────────────────────────────────────

  it('should default [size] to "lg"', async () => {
    const { fixture } = await render(`<cds-button>text</cds-button>`, imports);
    expect(host(fixture.nativeElement).size).toBe('lg');
  });

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

  sizes.forEach((size) => {
    it(`should forward [size]="${size}" as a property`, async () => {
      const { fixture } = await render(
        `<cds-button size="${size}">text</cds-button>`,
        imports
      );
      expect(host(fixture.nativeElement).size).toBe(size);
    });
  });

  // ─── isExpressive ─────────────────────────────────────────────────────────

  it('should forward [isExpressive] as a property', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-button [isExpressive]="isExpressive">text</cds-button>`,
      imports,
      { isExpressive: false }
    );
    expect(host(fixture.nativeElement).isExpressive).toBe(false);

    h.isExpressive = true;
    await update();
    expect(host(fixture.nativeElement).isExpressive).toBe(true);
  });

  // ─── isSelected ───────────────────────────────────────────────────────────

  it('should forward [isSelected] as a property', async () => {
    const { fixture } = await render(
      `<cds-button isSelected>text</cds-button>`,
      imports
    );
    // booleanAttribute transform: bare attribute → true
    expect(host(fixture.nativeElement).isSelected).toBe(true);
  });

  // ─── tooltip ──────────────────────────────────────────────────────────────

  it('should forward [tooltipText] as a property', async () => {
    const { fixture } = await render(
      `<cds-button tooltipText="Add item">text</cds-button>`,
      imports
    );
    expect(host(fixture.nativeElement).tooltipText).toBe('Add item');
  });

  const tooltipPositions = ['top', 'right', 'bottom', 'left'] as const;
  tooltipPositions.forEach((position) => {
    it(`should forward [tooltipPosition]="${position}" as a property`, async () => {
      const { fixture } = await render(
        `<cds-button tooltipPosition="${position}">text</cds-button>`,
        imports
      );
      expect(host(fixture.nativeElement).tooltipPosition).toBe(position);
    });
  });

  const tooltipAlignments = ['left', 'right'] as const;
  tooltipAlignments.forEach((alignment) => {
    it(`should forward [tooltipAlignment]="${alignment}" as a property`, async () => {
      const { fixture } = await render(
        `<cds-button tooltipAlignment="${alignment}">text</cds-button>`,
        imports
      );
      expect(host(fixture.nativeElement).tooltipAlignment).toBe(alignment);
    });
  });

  it('should accept [tooltipAlignment] regardless of hasIconOnly', async () => {
    const { fixture } = await render(
      `<cds-button tooltipAlignment="left">text</cds-button>`,
      imports
    );
    expect(host(fixture.nativeElement).tooltipAlignment).toBe('left');
  });

  // ─── openTooltip ──────────────────────────────────────────────────────────

  it('should forward [openTooltip] as a property', async () => {
    const { fixture } = await render(
      `<cds-button [openTooltip]="true">text</cds-button>`,
      imports
    );
    expect(host(fixture.nativeElement).openTooltip).toBe(true);
  });

  // ─── batchAction ──────────────────────────────────────────────────────────

  it('should forward [batchAction]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-button [batchAction]="true">text</cds-button>`,
      imports
    );
    expect(host(fixture.nativeElement).batchAction).toBe(true);
  });

  // ─── link-only props ──────────────────────────────────────────────────────

  it('should forward [download] as a property', async () => {
    const { fixture } = await render(
      `<cds-button download="file.pdf">text</cds-button>`,
      imports
    );
    expect(host(fixture.nativeElement).download).toBe('file.pdf');
  });

  it('should forward [hreflang] as a property', async () => {
    const { fixture } = await render(
      `<cds-button hreflang="en">text</cds-button>`,
      imports
    );
    expect(host(fixture.nativeElement).hreflang).toBe('en');
  });

  it('should forward [ping] as a property', async () => {
    const { fixture } = await render(
      `<cds-button ping="https://example.com/ping">text</cds-button>`,
      imports
    );
    expect(host(fixture.nativeElement).ping).toBe('https://example.com/ping');
  });

  it('should forward [rel] as a property', async () => {
    const { fixture } = await render(
      `<cds-button rel="noopener noreferrer">text</cds-button>`,
      imports
    );
    expect(host(fixture.nativeElement).rel).toBe('noopener noreferrer');
  });

  it('should forward [target] as a property', async () => {
    const { fixture } = await render(
      `<cds-button target="_blank">text</cds-button>`,
      imports
    );
    expect(host(fixture.nativeElement).target).toBe('_blank');
  });

  it('should forward [linkRole] as a property', async () => {
    const { fixture } = await render(
      `<cds-button linkRole="link">text</cds-button>`,
      imports
    );
    expect(host(fixture.nativeElement).linkRole).toBe('link');
  });
});
