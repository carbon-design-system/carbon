/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Layer 1 — Angular unit tests for CheckboxComponent.
 *
 * Architecture (ADR 0015, ADR 0020): the host element IS the cds-ng-checkbox
 * web component. Every @Input() is forwarded via ngOnChanges; CVA writes/reads
 * `checked` on the host element directly.
 *
 * CVA integration (ngModel, reactive forms) is covered in
 * `src/__tests__/generated-wrappers.spec.ts`. This file focuses on each
 * @Input() and @Output() reaching the host.
 *
 * Rendered shadow-DOM assertions live in `Checkbox.parity.spec.ts`.
 * Real browser interaction is in `Checkbox.e2e.ts`.
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../../generated/Checkbox';
import { render } from '../../../testing/render';

const imports = [CheckboxComponent];

const host = (el: HTMLElement) =>
  el.querySelector('cds-ng-checkbox') as HTMLElement & Record<string, any>;

describe('CheckboxComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox></cds-ng-checkbox>`,
      imports
    );
    expect(host(fixture.nativeElement)).toBeTruthy();
  });

  // ─── checked ──────────────────────────────────────────────────────────────

  it('should default [checked] to false', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox></cds-ng-checkbox>`,
      imports
    );
    expect(host(fixture.nativeElement).checked).toBe(false);
  });

  it('should forward [checked]=true as a property', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-checkbox [checked]="checked"></cds-ng-checkbox>`,
      imports,
      { checked: false }
    );
    expect(host(fixture.nativeElement).checked).toBe(false);

    h.checked = true;
    await update();
    expect(host(fixture.nativeElement).checked).toBe(true);
  });

  // ─── disabled ─────────────────────────────────────────────────────────────

  it('should forward [disabled]=true as a property', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-checkbox [disabled]="disabled"></cds-ng-checkbox>`,
      imports,
      { disabled: false }
    );
    expect(host(fixture.nativeElement).disabled).toBe(false);

    h.disabled = true;
    await update();
    expect(host(fixture.nativeElement).disabled).toBe(true);
  });

  // ─── labelText ────────────────────────────────────────────────────────────

  it('should forward [labelText] as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox labelText="Accept terms"></cds-ng-checkbox>`,
      imports
    );
    expect(host(fixture.nativeElement).labelText).toBe('Accept terms');
  });

  // ─── indeterminate ────────────────────────────────────────────────────────

  it('should forward [indeterminate]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [indeterminate]="true"></cds-ng-checkbox>`,
      imports
    );
    expect(host(fixture.nativeElement).indeterminate).toBe(true);
  });

  // ─── invalid / invalidText ────────────────────────────────────────────────

  it('should forward [invalid]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [invalid]="true"></cds-ng-checkbox>`,
      imports
    );
    expect(host(fixture.nativeElement).invalid).toBe(true);
  });

  it('should forward [invalidText] as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox invalidText="Required"></cds-ng-checkbox>`,
      imports
    );
    expect(host(fixture.nativeElement).invalidText).toBe('Required');
  });

  // ─── warn / warnText ──────────────────────────────────────────────────────

  it('should forward [warn]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [warn]="true"></cds-ng-checkbox>`,
      imports
    );
    expect(host(fixture.nativeElement).warn).toBe(true);
  });

  // ─── hideLabel ────────────────────────────────────────────────────────────

  it('should forward [hideLabel]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [hideLabel]="true"></cds-ng-checkbox>`,
      imports
    );
    expect(host(fixture.nativeElement).hideLabel).toBe(true);
  });

  // ─── readonly ─────────────────────────────────────────────────────────────

  it('should forward [readonly]=true as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [readonly]="true"></cds-ng-checkbox>`,
      imports
    );
    expect(host(fixture.nativeElement).readonly).toBe(true);
  });

  // ─── name / id / value ────────────────────────────────────────────────────

  it('should forward [name] as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox name="terms"></cds-ng-checkbox>`,
      imports
    );
    expect(host(fixture.nativeElement).name).toBe('terms');
  });

  it('should forward [value] as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox value="on"></cds-ng-checkbox>`,
      imports
    );
    expect(host(fixture.nativeElement).value).toBe('on');
  });

  // ─── @Output() checkboxChanged ────────────────────────────────────────────

  it('should emit (checkboxChanged) when the web component fires cds-ng-checkbox-changed', async () => {
    @Component({
      standalone: true,
      imports: [CheckboxComponent],
      template: `<cds-ng-checkbox
        (checkboxChanged)="onChanged($event)"></cds-ng-checkbox>`,
    })
    class Host {
      count = 0;
      onChanged(_e: Event) {
        this.count += 1;
      }
    }

    const { TestBed } = await import('@angular/core/testing');
    TestBed.configureTestingModule({ imports: [Host] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector(
      'cds-ng-checkbox'
    ) as HTMLElement;
    el.dispatchEvent(
      new CustomEvent('cds-ng-checkbox-changed', { bubbles: true })
    );
    fixture.detectChanges();

    expect(fixture.componentInstance.count).toBe(1);
  });

  // ─── CVA — setDisabledState ───────────────────────────────────────────────

  it('should disable the host element via setDisabledState', async () => {
    @Component({
      standalone: true,
      imports: [FormsModule, CheckboxComponent],
      template: `<cds-ng-checkbox [(ngModel)]="checked"></cds-ng-checkbox>`,
    })
    class Host {
      checked = false;
    }

    const { TestBed } = await import('@angular/core/testing');
    TestBed.configureTestingModule({ imports: [Host] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await fixture.whenStable();

    // Access the CheckboxComponent instance through the directive.
    const { NgModel } = await import('@angular/forms');
    const ngModel = fixture.debugElement
      .query((de) => de.injector.get(NgModel, null) != null)
      ?.injector.get(NgModel);

    (ngModel?.valueAccessor as any)?.setDisabledState(true);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('cds-ng-checkbox') as any;
    expect(el.disabled).toBe(true);
  });
});
