/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ButtonComponent } from '@carbon/angular/button';
import { CheckboxComponent } from '@carbon/angular/checkbox';
import { ModalFooterComponent } from '@carbon/angular/modal';
import { TextInputComponent } from '@carbon/angular/text-input';
import { AccordionComponent } from '@carbon/angular/accordion';
import { render, settle } from '../testing/render';

/**
 * Layer 1 checks for what the generator emits (forms integration, filtered
 * internals, ModalFooter compound-component, event counts).
 * These run against the real web components under jsdom.
 */

// ─── Host-is-WC helper ───────────────────────────────────────────────────────
// In the ADR 0015 / ADR 0020 design, the Angular component's host element IS the
// web component (cds-ng-*).

function host(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

// ─── CVA host components ─────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [FormsModule, TextInputComponent, CheckboxComponent],
  template: `
    <cds-ng-text-input [(ngModel)]="text"></cds-ng-text-input>
    <cds-ng-checkbox [(ngModel)]="checked"></cds-ng-checkbox>
  `,
})
class NgModelHostComponent {
  text = 'initial';
  checked = false;
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent],
  template: `<cds-ng-text-input [formControl]="control"></cds-ng-text-input>`,
})
class ReactiveHostComponent {
  control = new FormControl('abc');
}

// ─── ModalFooter host component ───────────────────────────────────────────────
// Regression test for ADR 0015 finding 3: cds-ng-modal-footer counts slotted
// children with `matches('cds-ng-button')`. Under the host-is-WC design each
// child IS a cds-ng-button, so hasThreeButtons must be true.

@Component({
  standalone: true,
  imports: [ModalFooterComponent, ButtonComponent],
  template: `
    <cds-ng-modal-footer>
      <cds-ng-button kind="secondary">Cancel</cds-ng-button>
      <cds-ng-button kind="secondary">Back</cds-ng-button>
      <cds-ng-button kind="primary">Submit</cds-ng-button>
    </cds-ng-modal-footer>
  `,
})
class ModalFooterThreeButtonsHost {}

describe('generated wrappers', () => {
  describe('form integration (ControlValueAccessor)', () => {
    it('pushes ngModel values into the web component host', async () => {
      const fixture = TestBed.createComponent(NgModelHostComponent);
      fixture.detectChanges();
      await fixture.whenStable();
      // Host IS the cds-ng-text-input element.
      const el = fixture.nativeElement.querySelector('cds-ng-text-input');
      expect((el as any).value).toBe('initial');
    });

    it('updates ngModel when the web component emits input', async () => {
      const fixture = TestBed.createComponent(NgModelHostComponent);
      fixture.detectChanges();
      await fixture.whenStable();

      const el = fixture.nativeElement.querySelector(
        'cds-ng-text-input'
      ) as any;
      el.value = 'typed';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();

      expect(fixture.componentInstance.text).toBe('typed');
    });

    it('uses `checked` for checkbox', async () => {
      const fixture = TestBed.createComponent(NgModelHostComponent);
      fixture.detectChanges();
      await fixture.whenStable();

      const el = fixture.nativeElement.querySelector('cds-ng-checkbox') as any;
      el.checked = true;
      el.dispatchEvent(
        new CustomEvent('cds-ng-checkbox-changed', { bubbles: true })
      );
      fixture.detectChanges();

      expect(fixture.componentInstance.checked).toBe(true);
    });

    it('works with reactive forms, including disabled state', async () => {
      const fixture = TestBed.createComponent(ReactiveHostComponent);
      fixture.detectChanges();
      await fixture.whenStable();

      const el = fixture.nativeElement.querySelector(
        'cds-ng-text-input'
      ) as any;
      expect(el.value).toBe('abc');

      fixture.componentInstance.control.setValue('xyz');
      expect(el.value).toBe('xyz');

      fixture.componentInstance.control.disable();
      fixture.detectChanges();
      expect(el.disabled).toBe(true);
    });
  });

  // ─── ModalFooter compound-component (ADR 0015 finding 3) ──────────────────
  describe('ModalFooter — hasThreeButtons (ADR 0015 finding 3)', () => {
    it('is true when three cds-ng-button children are slotted', async () => {
      const fixture = TestBed.createComponent(ModalFooterThreeButtonsHost);
      fixture.detectChanges();
      await settle(fixture.nativeElement);
      // cds-ng-modal-footer runs _checkButtons in slotchange, which sets
      // hasThreeButtons by counting matches('cds-ng-button').
      const footer = fixture.nativeElement.querySelector(
        'cds-ng-modal-footer'
      ) as any;
      expect(footer.hasThreeButtons).toBe(true);
    });
  });

  // ─── Event count (ADR 0015 finding 5) ─────────────────────────────────────
  // One consumer handler call per native change event.
  describe('event count', () => {
    it('fires the consumer change handler exactly once per native change event', async () => {
      @Component({
        standalone: true,
        imports: [TextInputComponent],
        template: `<cds-ng-text-input
          (change)="onChange($event)"></cds-ng-text-input>`,
      })
      class ChangeCountHost {
        count = 0;
        onChange(_e: Event) {
          this.count += 1;
        }
      }

      const fixture = TestBed.createComponent(ChangeCountHost);
      fixture.detectChanges();
      await fixture.whenStable();

      const el = fixture.nativeElement.querySelector(
        'cds-ng-text-input'
      ) as HTMLElement;
      el.dispatchEvent(new Event('change', { bubbles: true }));
      fixture.detectChanges();

      expect(fixture.componentInstance.count).toBe(1);
    });

    it('emits the @Output once when the web component dispatches its custom event', async () => {
      @Component({
        standalone: true,
        imports: [CheckboxComponent],
        template: `<cds-ng-checkbox
          (checkboxChanged)="onToggled($event)"></cds-ng-checkbox>`,
      })
      class OutputHost {
        count = 0;
        onToggled(_e: Event) {
          this.count += 1;
        }
      }

      const fixture = TestBed.createComponent(OutputHost);
      fixture.detectChanges();
      await fixture.whenStable();

      const el = fixture.nativeElement.querySelector(
        'cds-ng-checkbox'
      ) as HTMLElement;
      el.dispatchEvent(new CustomEvent('cds-ng-checkbox-changed'));
      fixture.detectChanges();

      expect(fixture.componentInstance.count).toBe(1);
    });
  });

  describe('inputs', () => {
    it('does not expose Lit / form-associated internals as inputs', () => {
      const fixture = TestBed.createComponent(TextInputComponent);
      const instance = fixture.componentInstance as any;
      for (const internal of [
        'renderRoot',
        'isUpdatePending',
        'hasUpdated',
        'willValidate',
        'validationMessage',
        'validity',
        'labels',
        'form',
        'formAssociated',
        'formValueProperties',
      ]) {
        expect(Object.prototype.hasOwnProperty.call(instance, internal)).toBe(
          false
        );
      }
    });

    it('does not set internal property names on the host element as attributes', () => {
      const fixture = TestBed.createComponent(TextInputComponent);
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      for (const attr of ['willvalidate', 'validity', 'formassociated']) {
        expect(el.hasAttribute(attr)).toBe(false);
      }
    });

    it('forwards boolean inputs to the host web component element', async () => {
      const { fixture } = await render(
        `<cds-ng-accordion [disabled]="true"></cds-ng-accordion>`,
        [AccordionComponent]
      );
      const el = fixture.nativeElement.querySelector('cds-ng-accordion') as any;
      expect(el.disabled).toBe(true);
    });
  });
});
