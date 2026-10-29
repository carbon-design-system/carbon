/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Layer 1 — Angular unit tests for ModalComponent.
 *
 * Architecture (ADR 0015, ADR 0020): the host element IS the cds-ng-modal
 * web component. Every @Input() is forwarded via ngOnChanges.
 *
 * Modal has no CVA. Focus delegation and child registration are browser-only
 * behaviors verified in `Modal.e2e.ts`.
 * Rendered shadow-DOM assertions live in `Modal.parity.spec.ts`.
 */

import { Component } from '@angular/core';
import { ModalComponent } from '@carbon/angular/modal';
import { render } from '../../../testing/render';

const imports = [ModalComponent];

const host = (el: HTMLElement) =>
  el.querySelector('cds-ng-modal') as HTMLElement & Record<string, any>;

describe('ModalComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(`<cds-ng-modal></cds-ng-modal>`, imports);
    expect(host(fixture.nativeElement)).toBeTruthy();
  });

  // ─── open ─────────────────────────────────────────────────────────────────

  it('should default [open] to false', async () => {
    const { fixture } = await render(`<cds-ng-modal></cds-ng-modal>`, imports);
    expect(host(fixture.nativeElement).open).toBe(false);
  });

  it('should forward [open]=true as a property', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(`<cds-ng-modal [open]="open"></cds-ng-modal>`, imports, {
      open: false,
    });
    expect(host(fixture.nativeElement).open).toBe(false);

    h.open = true;
    await update();
    expect(host(fixture.nativeElement).open).toBe(true);
  });

  // ─── size ─────────────────────────────────────────────────────────────────

  it('should default [size] to "md"', async () => {
    const { fixture } = await render(`<cds-ng-modal></cds-ng-modal>`, imports);
    expect(host(fixture.nativeElement).size).toBe('md');
  });

  (['xs', 'sm', 'md', 'lg'] as const).forEach((size) => {
    it(`should forward [size]="${size}" as a property`, async () => {
      const { fixture } = await render(
        `<cds-ng-modal size="${size}"></cds-ng-modal>`,
        imports
      );
      expect(host(fixture.nativeElement).size).toBe(size);
    });
  });

  // ─── fullWidth ────────────────────────────────────────────────────────────

  it('should forward [fullWidth]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-modal [fullWidth]="true"></cds-ng-modal>`,
      imports
    );
    expect(host(fixture.nativeElement).fullWidth).toBe(true);
  });

  // ─── hasScrollingContent ──────────────────────────────────────────────────

  it('should forward [hasScrollingContent]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-modal [hasScrollingContent]="true"></cds-ng-modal>`,
      imports
    );
    expect(host(fixture.nativeElement).hasScrollingContent).toBe(true);
  });

  // ─── alert ────────────────────────────────────────────────────────────────

  it('should forward [alert]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-modal [alert]="true"></cds-ng-modal>`,
      imports
    );
    expect(host(fixture.nativeElement).alert).toBe(true);
  });

  // ─── preventCloseOnClickOutside ───────────────────────────────────────────

  it('should forward [preventCloseOnClickOutside]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-modal [preventCloseOnClickOutside]="true"></cds-ng-modal>`,
      imports
    );
    expect(host(fixture.nativeElement).preventCloseOnClickOutside).toBe(true);
  });

  // ─── loadingStatus ────────────────────────────────────────────────────────

  it('should forward [loadingStatus] as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-modal loadingStatus="active"></cds-ng-modal>`,
      imports
    );
    expect(host(fixture.nativeElement).loadingStatus).toBe('active');
  });

  // ─── shouldSubmitOnEnter ──────────────────────────────────────────────────

  it('should forward [shouldSubmitOnEnter]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-modal [shouldSubmitOnEnter]="true"></cds-ng-modal>`,
      imports
    );
    expect(host(fixture.nativeElement).shouldSubmitOnEnter).toBe(true);
  });

  // ─── @Output() events ─────────────────────────────────────────────────────

  it('should emit (modalClosed) when the web component fires cds-ng-modal-closed', async () => {
    @Component({
      standalone: true,
      imports: [ModalComponent],
      template: `<cds-ng-modal
        (modalClosed)="onClosed($event)"></cds-ng-modal>`,
    })
    class Host {
      count = 0;
      onClosed(_e: Event) {
        this.count += 1;
      }
    }

    const { TestBed } = await import('@angular/core/testing');
    TestBed.configureTestingModule({ imports: [Host] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector(
      'cds-ng-modal'
    ) as HTMLElement;
    el.dispatchEvent(new CustomEvent('cds-ng-modal-closed', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.count).toBe(1);
  });

  it('should emit (modalBeingclosed) when the web component fires cds-ng-modal-beingclosed', async () => {
    @Component({
      standalone: true,
      imports: [ModalComponent],
      template: `<cds-ng-modal
        (modalBeingclosed)="onBeingClosed($event)"></cds-ng-modal>`,
    })
    class Host {
      count = 0;
      onBeingClosed(_e: Event) {
        this.count += 1;
      }
    }

    const { TestBed } = await import('@angular/core/testing');
    TestBed.configureTestingModule({ imports: [Host] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector(
      'cds-ng-modal'
    ) as HTMLElement;
    el.dispatchEvent(
      new CustomEvent('cds-ng-modal-beingclosed', { bubbles: true })
    );
    fixture.detectChanges();

    expect(fixture.componentInstance.count).toBe(1);
  });
});
