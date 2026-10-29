/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Layer 1 — Angular unit tests for DropdownComponent.
 *
 * Architecture (ADR 0015, ADR 0020): the host element IS the cds-ng-dropdown
 * web component. Every @Input() is forwarded via ngOnChanges; CVA reads/writes
 * `value` on the host element directly.
 *
 * CVA integration (ngModel, reactive forms) is covered in
 * `src/__tests__/generated-wrappers.spec.ts`. This file focuses on each
 * @Input() and @Output() reaching the host.
 *
 * Rendered shadow-DOM assertions live in `Dropdown.parity.spec.ts`.
 * Keyboard navigation and real browser interaction are in `Dropdown.e2e.ts`.
 */

import { Component } from '@angular/core';
import { DropdownComponent } from '../../../generated/Dropdown';
import { DropdownItemComponent } from '../../../generated/DropdownItem';
import { render } from '../../../testing/render';

const imports = [DropdownComponent, DropdownItemComponent];

const host = (el: HTMLElement) =>
  el.querySelector('cds-ng-dropdown') as HTMLElement & Record<string, any>;

describe('DropdownComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(
      `<cds-ng-dropdown></cds-ng-dropdown>`,
      imports
    );
    expect(host(fixture.nativeElement)).toBeTruthy();
  });

  // ─── disabled ─────────────────────────────────────────────────────────────

  it('should default [disabled] to false', async () => {
    const { fixture } = await render(
      `<cds-ng-dropdown></cds-ng-dropdown>`,
      imports
    );
    expect(host(fixture.nativeElement).disabled).toBe(false);
  });

  it('should forward [disabled]=true as a property', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-dropdown [disabled]="disabled"></cds-ng-dropdown>`,
      imports,
      { disabled: false }
    );
    expect(host(fixture.nativeElement).disabled).toBe(false);

    h.disabled = true;
    await update();
    expect(host(fixture.nativeElement).disabled).toBe(true);
  });

  // ─── open ─────────────────────────────────────────────────────────────────

  it('should forward [open]=true as a property', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-dropdown [open]="open"></cds-ng-dropdown>`,
      imports,
      { open: false }
    );
    expect(host(fixture.nativeElement).open).toBe(false);

    h.open = true;
    await update();
    expect(host(fixture.nativeElement).open).toBe(true);
  });

  // ─── size ─────────────────────────────────────────────────────────────────

  it('should default [size] to "md"', async () => {
    const { fixture } = await render(
      `<cds-ng-dropdown></cds-ng-dropdown>`,
      imports
    );
    expect(host(fixture.nativeElement).size).toBe('md');
  });

  (['sm', 'md', 'lg'] as const).forEach((size) => {
    it(`should forward [size]="${size}" as a property`, async () => {
      const { fixture } = await render(
        `<cds-ng-dropdown size="${size}"></cds-ng-dropdown>`,
        imports
      );
      expect(host(fixture.nativeElement).size).toBe(size);
    });
  });

  // ─── label / titleText / helperText / invalidText ─────────────────────────

  it('should forward [label] as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-dropdown label="Select an option"></cds-ng-dropdown>`,
      imports
    );
    expect(host(fixture.nativeElement).label).toBe('Select an option');
  });

  it('should forward [titleText] as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-dropdown titleText="Dropdown label"></cds-ng-dropdown>`,
      imports
    );
    expect(host(fixture.nativeElement).titleText).toBe('Dropdown label');
  });

  it('should forward [helperText] as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-dropdown helperText="Optional helper"></cds-ng-dropdown>`,
      imports
    );
    expect(host(fixture.nativeElement).helperText).toBe('Optional helper');
  });

  it('should forward [invalidText] as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-dropdown invalidText="Required"></cds-ng-dropdown>`,
      imports
    );
    expect(host(fixture.nativeElement).invalidText).toBe('Required');
  });

  // ─── invalid / warn ───────────────────────────────────────────────────────

  it('should forward [invalid]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-dropdown [invalid]="true"></cds-ng-dropdown>`,
      imports
    );
    expect(host(fixture.nativeElement).invalid).toBe(true);
  });

  it('should forward [warn]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-dropdown [warn]="true"></cds-ng-dropdown>`,
      imports
    );
    expect(host(fixture.nativeElement).warn).toBe(true);
  });

  // ─── readOnly ─────────────────────────────────────────────────────────────

  it('should forward [readOnly]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-dropdown [readOnly]="true"></cds-ng-dropdown>`,
      imports
    );
    expect(host(fixture.nativeElement).readOnly).toBe(true);
  });

  // ─── direction ────────────────────────────────────────────────────────────

  it('should default [direction] to "bottom"', async () => {
    const { fixture } = await render(
      `<cds-ng-dropdown></cds-ng-dropdown>`,
      imports
    );
    expect(host(fixture.nativeElement).direction).toBe('bottom');
  });

  it('should forward [direction]="top" as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-dropdown direction="top"></cds-ng-dropdown>`,
      imports
    );
    expect(host(fixture.nativeElement).direction).toBe('top');
  });

  // ─── value (CVA) ──────────────────────────────────────────────────────────

  it('should forward [value] as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-dropdown value="option-1"></cds-ng-dropdown>`,
      imports
    );
    expect(host(fixture.nativeElement).value).toBe('option-1');
  });

  // ─── @Output() events ─────────────────────────────────────────────────────

  it('should emit (dropdownSelected) when the web component fires cds-ng-dropdown-selected', async () => {
    @Component({
      standalone: true,
      imports: [DropdownComponent],
      template: `<cds-ng-dropdown
        (dropdownSelected)="onSelected($event)"></cds-ng-dropdown>`,
    })
    class Host {
      count = 0;
      onSelected(_e: Event) {
        this.count += 1;
      }
    }

    const { TestBed } = await import('@angular/core/testing');
    TestBed.configureTestingModule({ imports: [Host] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector(
      'cds-ng-dropdown'
    ) as HTMLElement;
    el.dispatchEvent(
      new CustomEvent('cds-ng-dropdown-selected', { bubbles: true })
    );
    fixture.detectChanges();

    expect(fixture.componentInstance.count).toBe(1);
  });

  it('should emit (dropdownToggled) when the web component fires cds-ng-dropdown-toggled', async () => {
    @Component({
      standalone: true,
      imports: [DropdownComponent],
      template: `<cds-ng-dropdown
        (dropdownToggled)="onToggled($event)"></cds-ng-dropdown>`,
    })
    class Host {
      count = 0;
      onToggled(_e: Event) {
        this.count += 1;
      }
    }

    const { TestBed } = await import('@angular/core/testing');
    TestBed.configureTestingModule({ imports: [Host] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector(
      'cds-ng-dropdown'
    ) as HTMLElement;
    el.dispatchEvent(
      new CustomEvent('cds-ng-dropdown-toggled', { bubbles: true })
    );
    fixture.detectChanges();

    expect(fixture.componentInstance.count).toBe(1);
  });
});
