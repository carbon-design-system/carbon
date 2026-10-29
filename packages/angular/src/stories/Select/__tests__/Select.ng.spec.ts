/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../generated/Select';
import { SelectItemComponent } from '../../../generated/SelectItem';
import { SelectItemGroupComponent } from '../../../generated/SelectItemGroup';
import { SelectSkeletonComponent } from '../../../generated/SelectSkeleton';
import { render } from '../../../testing/render';

const imports = [
  FormsModule,
  ReactiveFormsModule,
  SelectComponent,
  SelectItemComponent,
  SelectItemGroupComponent,
  SelectSkeletonComponent,
];

const hostEl = (el: HTMLElement) =>
  el.querySelector('cds-ng-select') as HTMLElement & Record<string, any>;

describe('SelectComponent', () => {
  it('should create SelectComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-select></cds-ng-select>`,
      imports
    );
    expect(hostEl(fixture.nativeElement)).toBeTruthy();
  });

  it('should create SelectSkeletonComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-select-skeleton></cds-ng-select-skeleton>`,
      imports
    );
    expect(
      fixture.nativeElement.querySelector('cds-ng-select-skeleton')
    ).toBeTruthy();
  });

  it('should create SelectItemComponent & SelectItemGroupComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-select>
        <cds-ng-select-item-group label="Group 1">
          <cds-ng-select-item value="1">Option 1</cds-ng-select-item>
        </cds-ng-select-item-group>
      </cds-ng-select>`,
      imports
    );
    expect(
      fixture.nativeElement.querySelector('cds-ng-select-item-group')
    ).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('cds-ng-select-item')
    ).toBeTruthy();
  });

  it('should forward @Input() properties to host element', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-select
        [disabled]="disabled"
        [helperText]="helperText"
        [hideLabel]="hideLabel"
        [inline]="inline"
        [invalid]="invalid"
        [invalidText]="invalidText"
        [labelText]="labelText"
        [name]="name"
        [placeholder]="placeholder"
        [readonly]="readonly"
        [size]="size"
        [warn]="warn"
        [warnText]="warnText">
        <cds-ng-select-item value="1">Option 1</cds-ng-select-item>
      </cds-ng-select>`,
      imports,
      {
        disabled: true,
        helperText: 'Helper',
        hideLabel: true,
        inline: true,
        invalid: true,
        invalidText: 'Error',
        labelText: 'Custom Select',
        name: 'my-select',
        placeholder: 'Choose',
        readonly: true,
        size: 'sm',
        warn: true,
        warnText: 'Warning',
      }
    );
    const host = hostEl(fixture.nativeElement);
    expect(host.disabled).toBe(true);
    expect(host.helperText).toBe('Helper');
    expect(host.hideLabel).toBe(true);
    expect(host.inline).toBe(true);
    expect(host.invalid).toBe(true);
    expect(host.invalidText).toBe('Error');
    expect(host.labelText).toBe('Custom Select');
    expect(host.name).toBe('my-select');
    expect(host.placeholder).toBe('Choose');
    expect(host.readonly).toBe(true);
    expect(host.size).toBe('sm');
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
      `<cds-ng-select [(ngModel)]="selectedValue">
        <cds-ng-select-item value="a">A</cds-ng-select-item>
        <cds-ng-select-item value="b">B</cds-ng-select-item>
      </cds-ng-select>`,
      imports,
      { selectedValue: 'a' }
    );
    const host = hostEl(fixture.nativeElement);
    expect(host.value).toBe('a');

    host.value = 'b';
    host.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(testHost.selectedValue).toBe('b');

    testHost.selectedValue = 'a';
    await update();
    expect(host.value).toBe('a');
  });

  it('should support ControlValueAccessor via reactive FormControl', async () => {
    const control = new FormControl('opt1');
    const { fixture } = await render(
      `<cds-ng-select [formControl]="control">
        <cds-ng-select-item value="opt1">Option 1</cds-ng-select-item>
        <cds-ng-select-item value="opt2">Option 2</cds-ng-select-item>
      </cds-ng-select>`,
      imports,
      { control }
    );
    const host = hostEl(fixture.nativeElement);
    expect(host.value).toBe('opt1');

    control.setValue('opt2');
    fixture.detectChanges();
    expect(host.value).toBe('opt2');

    host.value = 'opt1';
    host.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(control.value).toBe('opt1');

    control.disable();
    fixture.detectChanges();
    expect(host.disabled).toBe(true);
  });
});
