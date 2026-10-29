/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Layer 1 — Angular unit tests for AccordionComponent.
 *
 * Architecture (ADR 0015, ADR 0020): the host element IS the cds-ng-accordion
 * web component. Every @Input() is forwarded to the host element as a property
 * via ngOnChanges.
 *
 * Rendered shadow-DOM assertions live in `Accordion.parity.spec.ts`.
 * Computed layout and real browser interaction are in `Accordion.e2e.ts`.
 */

import { AccordionComponent } from '@carbon/angular/accordion';
import { render } from '../../../testing/render';

const imports = [AccordionComponent];

const host = (el: HTMLElement) =>
  el.querySelector('cds-ng-accordion') as HTMLElement & Record<string, any>;

describe('AccordionComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(
      `<cds-ng-accordion></cds-ng-accordion>`,
      imports
    );
    expect(host(fixture.nativeElement)).toBeTruthy();
  });

  it('host element is the web component itself', async () => {
    const { fixture } = await render(
      `<cds-ng-accordion></cds-ng-accordion>`,
      imports
    );
    expect(host(fixture.nativeElement)).not.toBeNull();
  });

  // ─── size ─────────────────────────────────────────────────────────────────

  it('should default [size] to "md"', async () => {
    const { fixture } = await render(
      `<cds-ng-accordion></cds-ng-accordion>`,
      imports
    );
    expect(host(fixture.nativeElement).size).toBe('md');
  });

  (['sm', 'md', 'lg'] as const).forEach((size) => {
    it(`should forward [size]="${size}" as a property`, async () => {
      const { fixture } = await render(
        `<cds-ng-accordion size="${size}"></cds-ng-accordion>`,
        imports
      );
      expect(host(fixture.nativeElement).size).toBe(size);
    });
  });

  // ─── alignment ────────────────────────────────────────────────────────────

  it('should default [alignment] to "END"', async () => {
    const { fixture } = await render(
      `<cds-ng-accordion></cds-ng-accordion>`,
      imports
    );
    expect(host(fixture.nativeElement).alignment).toBe('END');
  });

  // ─── isFlush ──────────────────────────────────────────────────────────────

  it('should forward [isFlush]=true as a property', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-accordion [isFlush]="isFlush"></cds-ng-accordion>`,
      imports,
      { isFlush: false }
    );
    expect(host(fixture.nativeElement).isFlush).toBe(false);

    h.isFlush = true;
    await update();
    expect(host(fixture.nativeElement).isFlush).toBe(true);
  });

  // ─── disabled ─────────────────────────────────────────────────────────────

  it('should forward [disabled]=true as a property', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-accordion [disabled]="disabled"></cds-ng-accordion>`,
      imports,
      { disabled: false }
    );
    expect(host(fixture.nativeElement).disabled).toBe(false);

    h.disabled = true;
    await update();
    expect(host(fixture.nativeElement).disabled).toBe(true);
  });
});
