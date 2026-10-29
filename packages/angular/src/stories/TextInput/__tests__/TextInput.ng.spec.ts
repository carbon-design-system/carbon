/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Layer 1 — Angular unit tests for TextInputComponent.
 *
 * Architecture (ADR 0015, ADR 0020): the host element IS the cds-ng-text-input
 * web component. Every @Input() is forwarded via ngOnChanges; CVA reads/writes
 * `value` on the host element directly.
 *
 * CVA integration (ngModel, reactive forms) is covered in
 * `src/__tests__/generated-wrappers.spec.ts`. This file focuses on each
 * @Input() reaching the host.
 *
 * TextInput has no @Output() custom events (native `input`/`change` are caught
 * directly on the host — see ADR 0015 §4).
 * Rendered shadow-DOM assertions live in `TextInput.parity.spec.ts`.
 * Slot projection and browser interaction are in `TextInput.e2e.ts`.
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextInputComponent } from '@carbon/angular/text-input';
import { render } from '../../../testing/render';

const imports = [TextInputComponent];

const host = (el: HTMLElement) =>
  el.querySelector('cds-ng-text-input') as HTMLElement & Record<string, any>;

describe('TextInputComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input></cds-ng-text-input>`,
      imports
    );
    expect(host(fixture.nativeElement)).toBeTruthy();
  });

  // ─── type ─────────────────────────────────────────────────────────────────

  it('should default [type] to "text"', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input></cds-ng-text-input>`,
      imports
    );
    expect(host(fixture.nativeElement).type).toBe('text');
  });

  it('should forward [type]="password" as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input type="password"></cds-ng-text-input>`,
      imports
    );
    expect(host(fixture.nativeElement).type).toBe('password');
  });

  // ─── disabled ─────────────────────────────────────────────────────────────

  it('should default [disabled] to false', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input></cds-ng-text-input>`,
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
      `<cds-ng-text-input [disabled]="disabled"></cds-ng-text-input>`,
      imports,
      { disabled: false }
    );
    expect(host(fixture.nativeElement).disabled).toBe(false);

    h.disabled = true;
    await update();
    expect(host(fixture.nativeElement).disabled).toBe(true);
  });

  // ─── value ────────────────────────────────────────────────────────────────

  it('should forward [value] as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input value="hello"></cds-ng-text-input>`,
      imports
    );
    expect(host(fixture.nativeElement).value).toBe('hello');
  });

  // ─── label / placeholder / helperText / invalidText ───────────────────────

  it('should forward [label] as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input label="Email"></cds-ng-text-input>`,
      imports
    );
    expect(host(fixture.nativeElement).label).toBe('Email');
  });

  it('should forward [placeholder] as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input placeholder="Enter email"></cds-ng-text-input>`,
      imports
    );
    expect(host(fixture.nativeElement).placeholder).toBe('Enter email');
  });

  it('should forward [helperText] as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input helperText="e.g. name@example.com"></cds-ng-text-input>`,
      imports
    );
    expect(host(fixture.nativeElement).helperText).toBe(
      'e.g. name@example.com'
    );
  });

  it('should forward [invalidText] as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input invalidText="Required field"></cds-ng-text-input>`,
      imports
    );
    expect(host(fixture.nativeElement).invalidText).toBe('Required field');
  });

  // ─── invalid / warn ───────────────────────────────────────────────────────

  it('should forward [invalid]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input [invalid]="true"></cds-ng-text-input>`,
      imports
    );
    expect(host(fixture.nativeElement).invalid).toBe(true);
  });

  it('should forward [warn]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input [warn]="true"></cds-ng-text-input>`,
      imports
    );
    expect(host(fixture.nativeElement).warn).toBe(true);
  });

  // ─── readonly ─────────────────────────────────────────────────────────────

  it('should forward [readonly]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input [readonly]="true"></cds-ng-text-input>`,
      imports
    );
    expect(host(fixture.nativeElement).readonly).toBe(true);
  });

  // ─── hideLabel ────────────────────────────────────────────────────────────

  it('should forward [hideLabel]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input [hideLabel]="true"></cds-ng-text-input>`,
      imports
    );
    expect(host(fixture.nativeElement).hideLabel).toBe(true);
  });

  // ─── size ─────────────────────────────────────────────────────────────────

  (['sm', 'md', 'lg', 'xl'] as const).forEach((size) => {
    it(`should forward [size]="${size}" as a property`, async () => {
      const { fixture } = await render(
        `<cds-ng-text-input size="${size}"></cds-ng-text-input>`,
        imports
      );
      expect(host(fixture.nativeElement).size).toBe(size);
    });
  });

  // ─── enableCounter / maxCount ─────────────────────────────────────────────

  it('should forward [enableCounter]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input [enableCounter]="true" [maxCount]="200"></cds-ng-text-input>`,
      imports
    );
    expect(host(fixture.nativeElement).enableCounter).toBe(true);
  });

  // ─── CVA — setDisabledState ───────────────────────────────────────────────

  it('should disable the host element via setDisabledState', async () => {
    @Component({
      standalone: true,
      imports: [FormsModule, TextInputComponent],
      template: `<cds-ng-text-input [(ngModel)]="value"></cds-ng-text-input>`,
    })
    class Host {
      value = '';
    }

    const { TestBed } = await import('@angular/core/testing');
    TestBed.configureTestingModule({ imports: [Host] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await fixture.whenStable();

    const { NgModel } = await import('@angular/forms');
    const ngModel = fixture.debugElement
      .query((de) => de.injector.get(NgModel, null) != null)
      ?.injector.get(NgModel);

    (ngModel?.valueAccessor as any)?.setDisabledState(true);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('cds-ng-text-input') as any;
    expect(el.disabled).toBe(true);
  });
});
