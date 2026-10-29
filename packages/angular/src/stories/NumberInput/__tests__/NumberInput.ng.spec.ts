/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberInputComponent } from '../../../generated/NumberInput';
import { NumberInputSkeletonComponent } from '../../../generated/NumberInputSkeleton';
import { render } from '../../../testing/render';

const imports = [
  FormsModule,
  ReactiveFormsModule,
  NumberInputComponent,
  NumberInputSkeletonComponent,
];

const hostEl = (el: HTMLElement) =>
  el.querySelector('cds-ng-number-input') as HTMLElement & Record<string, any>;

describe('NumberInputComponent', () => {
  it('should create NumberInputComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input></cds-ng-number-input>`,
      imports
    );
    expect(hostEl(fixture.nativeElement)).toBeTruthy();
  });

  it('should create NumberInputSkeletonComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input-skeleton></cds-ng-number-input-skeleton>`,
      imports
    );
    expect(
      fixture.nativeElement.querySelector('cds-ng-number-input-skeleton')
    ).toBeTruthy();
  });

  it('should forward @Input() properties to host element', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-number-input
        [disabled]="disabled"
        [allowEmpty]="allowEmpty"
        [decrementButtonAssistiveText]="decrementButtonAssistiveText"
        [incrementButtonAssistiveText]="incrementButtonAssistiveText"
        [helperText]="helperText"
        [hideSteppers]="hideSteppers"
        [hideLabel]="hideLabel"
        [invalid]="invalid"
        [invalidText]="invalidText"
        [label]="label"
        [readonly]="readonly"
        [min]="min"
        [max]="max"
        [size]="size"
        [step]="step"
        [warn]="warn"
        [warnText]="warnText">
      </cds-ng-number-input>`,
      imports,
      {
        disabled: true,
        allowEmpty: true,
        decrementButtonAssistiveText: 'dec',
        incrementButtonAssistiveText: 'inc',
        helperText: 'Helper',
        hideSteppers: true,
        hideLabel: true,
        invalid: true,
        invalidText: 'Error',
        label: 'My Label',
        readonly: true,
        min: '0',
        max: '100',
        size: 'sm',
        step: '5',
        warn: true,
        warnText: 'Warning',
      }
    );
    const host = hostEl(fixture.nativeElement);
    expect(host.disabled).toBe(true);
    expect(host.allowEmpty).toBe(true);
    expect(host.decrementButtonAssistiveText).toBe('dec');
    expect(host.incrementButtonAssistiveText).toBe('inc');
    expect(host.helperText).toBe('Helper');
    expect(host.hideSteppers).toBe(true);
    expect(host.hideLabel).toBe(true);
    expect(host.invalid).toBe(true);
    expect(host.invalidText).toBe('Error');
    expect(host.label).toBe('My Label');
    expect(host.readonly).toBe(true);
    expect(host.min).toBe('0');
    expect(host.max).toBe('100');
    expect(host.size).toBe('sm');
    expect(host.step).toBe('5');
    expect(host.warn).toBe(true);
    expect(host.warnText).toBe('Warning');

    h.disabled = false;
    h.readonly = false;
    h.size = 'lg';
    await update();
    expect(host.disabled).toBe(false);
    expect(host.readonly).toBe(false);
    expect(host.size).toBe('lg');
  });

  it('should support ControlValueAccessor via ngModel', async () => {
    const {
      fixture,
      host: testHost,
      update,
    } = await render(
      `<cds-ng-number-input [(ngModel)]="numValue"></cds-ng-number-input>`,
      imports,
      { numValue: '42' }
    );
    const host = hostEl(fixture.nativeElement);
    expect(host.value).toBe('42');

    host.value = '99';
    host.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(testHost.numValue).toBe('99');

    testHost.numValue = '123';
    await update();
    expect(host.value).toBe('123');
  });

  it('should support ControlValueAccessor via reactive FormControl', async () => {
    const control = new FormControl('10');
    const { fixture } = await render(
      `<cds-ng-number-input [formControl]="control"></cds-ng-number-input>`,
      imports,
      { control }
    );
    const host = hostEl(fixture.nativeElement);
    expect(host.value).toBe('10');

    control.setValue('20');
    fixture.detectChanges();
    expect(host.value).toBe('20');

    host.value = '30';
    host.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(control.value).toBe('30');

    control.disable();
    fixture.detectChanges();
    expect(host.disabled).toBe(true);
  });
});
