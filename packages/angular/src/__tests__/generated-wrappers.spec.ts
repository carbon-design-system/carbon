/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ButtonComponent } from '../generated/Button';
import { CheckboxComponent } from '../generated/Checkbox';
import { ModalFooterComponent } from '../generated/ModalFooter';
import { TextInputComponent } from '../generated/TextInput';
import { AccordionComponent } from '../generated/Accordion';
import { render, settle } from '../testing/render';

/**
 * Layer 1 checks for what the generator emits (forms integration, filtered
 * internals, ModalFooter compound-component, event counts).
 * These run against the real web components under jsdom.
 */

// ─── Host-is-WC helper ───────────────────────────────────────────────────────
// In the ADR 0015 design, the Angular component's host element IS the web
// component — there is no inner cds-ng-* element. Querying by tag inside the
// fixture still works (the host is placed in the test DOM by TestBed), but for
// the component under test the host IS the element of interest.

function host(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

// ─── CVA host components ─────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [FormsModule, TextInputComponent, CheckboxComponent],
  template: `
    <cds-text-input [(ngModel)]="text"></cds-text-input>
    <cds-checkbox [(ngModel)]="checked"></cds-checkbox>
  `,
})
class NgModelHostComponent {
  text = 'initial';
  checked = false;
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent],
  template: `<cds-text-input [formControl]="control"></cds-text-input>`,
})
class ReactiveHostComponent {
  control = new FormControl('abc');
}

// ─── ModalFooter host component ───────────────────────────────────────────────
// Regression test for ADR 0015 finding 3: cds-modal-footer counts slotted
// children with `matches('cds-button')`. Under the host-is-WC design each
// child IS a cds-button, so hasThreeButtons must be true.

@Component({
  standalone: true,
  imports: [ModalFooterComponent, ButtonComponent],
  template: `
    <cds-modal-footer>
      <cds-button kind="secondary">Cancel</cds-button>
      <cds-button kind="secondary">Back</cds-button>
      <cds-button kind="primary">Submit</cds-button>
    </cds-modal-footer>
  `,
})
class ModalFooterThreeButtonsHost {}

describe('generated wrappers', () => {
  describe('form integration (ControlValueAccessor)', () => {
    it('pushes ngModel values into the web component host', async () => {
      const fixture = TestBed.createComponent(NgModelHostComponent);
      fixture.detectChanges();
      await fixture.whenStable();
      // Host IS the cds-text-input element.
      const el = fixture.nativeElement.querySelector('cds-text-input');
      expect((el as any).value).toBe('initial');
    });

    it('updates ngModel when the web component emits input', async () => {
      const fixture = TestBed.createComponent(NgModelHostComponent);
      fixture.detectChanges();
      await fixture.whenStable();

      const el = fixture.nativeElement.querySelector('cds-text-input') as any;
      el.value = 'typed';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();

      expect(fixture.componentInstance.text).toBe('typed');
    });

    it('uses `checked` for checkbox', async () => {
      const fixture = TestBed.createComponent(NgModelHostComponent);
      fixture.detectChanges();
      await fixture.whenStable();

      const el = fixture.nativeElement.querySelector('cds-checkbox') as any;
      el.checked = true;
      el.dispatchEvent(
        new CustomEvent('cds-checkbox-changed', { bubbles: true })
      );
      fixture.detectChanges();

      expect(fixture.componentInstance.checked).toBe(true);
    });

    it('works with reactive forms, including disabled state', async () => {
      const fixture = TestBed.createComponent(ReactiveHostComponent);
      fixture.detectChanges();
      await fixture.whenStable();

      const el = fixture.nativeElement.querySelector('cds-text-input') as any;
      expect(el.value).toBe('abc');

      fixture.componentInstance.control.setValue('xyz');
      expect(el.value).toBe('xyz');

      fixture.componentInstance.control.disable();
      fixture.detectChanges();
      expect(el.disabled).toBe(true);
    });
  });

  // ─── ModalFooter compound-component (ADR 0015 finding 3) ──────────────────
  // Regression: if the Angular wrapper placed an inner element around the WC,
  // the slot children would be the wrapper elements (not cds-button), and
  // matches('cds-button') would find zero buttons → hasThreeButtons = false.
  // With the host-is-WC design the slotted nodes ARE cds-button elements.
  describe('ModalFooter — hasThreeButtons (ADR 0015 finding 3)', () => {
    it('is true when three cds-button children are slotted', async () => {
      const fixture = TestBed.createComponent(ModalFooterThreeButtonsHost);
      fixture.detectChanges();
      await settle(fixture.nativeElement);
      // cds-modal-footer runs _checkButtons in slotchange, which sets
      // hasThreeButtons by counting matches('cds-button').
      const footer = fixture.nativeElement.querySelector(
        'cds-modal-footer'
      ) as any;
      expect(footer.hasThreeButtons).toBe(true);
    });
  });

  // ─── Event count (ADR 0015 finding 5) ─────────────────────────────────────
  // One consumer handler call per native change event. The old design with an
  // @Output('change') caused 2 calls (double-dispatch). With no @Output for
  // native events the DOM event reaches the consumer exactly once.
  describe('event count', () => {
    it('fires the consumer change handler exactly once per native change event', async () => {
      @Component({
        standalone: true,
        imports: [TextInputComponent],
        template: `<cds-text-input
          (change)="onChange($event)"></cds-text-input>`,
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
        'cds-text-input'
      ) as HTMLElement;
      el.dispatchEvent(new Event('change', { bubbles: true }));
      fixture.detectChanges();

      // Measured (ADR 0015 §5): old design with @Output('change') gave 2.
      // No @Output for native events → exactly 1.
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
      // In the host-is-WC design the host IS the web component element.
      // The wrapper must not forward filtered internals.
      const fixture = TestBed.createComponent(TextInputComponent);
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      for (const attr of ['willvalidate', 'validity', 'formassociated']) {
        expect(el.hasAttribute(attr)).toBe(false);
      }
    });

    it('forwards boolean inputs to the host web component element', async () => {
      // Use render() with a template binding to properly trigger ngOnChanges.
      // AccordionComponent's host IS cds-accordion; the property should be
      // forwarded from the Angular @Input to the host element's WC property.
      const { fixture } = await render(
        `<cds-accordion [disabled]="true"></cds-accordion>`,
        [AccordionComponent]
      );
      const el = fixture.nativeElement.querySelector('cds-accordion') as any;
      expect(el.disabled).toBe(true);
    });
  });
});
