/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonComponent } from '../../../generated/RadioButton';
import { RadioButtonGroupComponent } from '../../../generated/RadioButtonGroup';
import { RadioButtonSkeletonComponent } from '../../../generated/RadioButtonSkeleton';
import { render } from '../../../testing/render';

const imports = [
  FormsModule,
  ReactiveFormsModule,
  RadioButtonComponent,
  RadioButtonGroupComponent,
  RadioButtonSkeletonComponent,
];

const groupHost = (el: HTMLElement) =>
  el.querySelector('cds-ng-radio-button-group') as HTMLElement &
    Record<string, any>;

const radioHost = (el: HTMLElement) =>
  el.querySelector('cds-ng-radio-button') as HTMLElement & Record<string, any>;

describe('RadioButtonComponent & RadioButtonGroupComponent', () => {
  it('should create RadioButtonComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-radio-button></cds-ng-radio-button>`,
      imports
    );
    expect(radioHost(fixture.nativeElement)).toBeTruthy();
  });

  it('should create RadioButtonGroupComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-radio-button-group></cds-ng-radio-button-group>`,
      imports
    );
    expect(groupHost(fixture.nativeElement)).toBeTruthy();
  });

  it('should create RadioButtonSkeletonComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-radio-button-skeleton></cds-ng-radio-button-skeleton>`,
      imports
    );
    expect(
      fixture.nativeElement.querySelector('cds-ng-radio-button-skeleton')
    ).toBeTruthy();
  });

  it('should forward [checked] and [labelText] inputs to RadioButtonComponent', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-radio-button [checked]="checked" [labelText]="labelText"></cds-ng-radio-button>`,
      imports,
      { checked: true, labelText: 'Option 1' }
    );
    const host = radioHost(fixture.nativeElement);
    expect(host.checked).toBe(true);
    expect(host.labelText).toBe('Option 1');

    h.checked = false;
    h.labelText = 'Option 2';
    await update();
    expect(host.checked).toBe(false);
    expect(host.labelText).toBe('Option 2');
  });

  it('should forward inputs to RadioButtonGroupComponent', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `
      <cds-ng-radio-button-group
        [legendText]="legendText"
        [orientation]="orientation"
        [value]="value"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [invalid]="invalid"
        [warn]="warn">
        <cds-ng-radio-button value="radio-1"></cds-ng-radio-button>
        <cds-ng-radio-button value="radio-2"></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      `,
      imports,
      {
        legendText: 'Test Group',
        orientation: 'vertical',
        value: 'radio-1',
        disabled: false,
        readOnly: false,
        invalid: false,
        warn: false,
      }
    );
    const host = groupHost(fixture.nativeElement);
    expect(host.legendText).toBe('Test Group');
    expect(host.orientation).toBe('vertical');
    expect(host.value).toBe('radio-1');

    h.legendText = 'Updated Group';
    h.orientation = 'horizontal';
    h.value = 'radio-2';
    h.disabled = true;
    h.readOnly = true;
    h.invalid = true;
    h.warn = true;
    await update();

    expect(host.legendText).toBe('Updated Group');
    expect(host.orientation).toBe('horizontal');
    expect(host.value).toBe('radio-2');
    expect(host.disabled).toBe(true);
    expect(host.readOnly).toBe(true);
    expect(host.invalid).toBe(true);
    expect(host.warn).toBe(true);
  });

  it('should support ngModel two-way binding on RadioButtonGroupComponent', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `
      <cds-ng-radio-button-group [(ngModel)]="selectedValue">
        <cds-ng-radio-button value="opt-1"></cds-ng-radio-button>
        <cds-ng-radio-button value="opt-2"></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      `,
      imports,
      { selectedValue: 'opt-1' }
    );
    const host = groupHost(fixture.nativeElement);
    expect(host.value).toBe('opt-1');

    h.selectedValue = 'opt-2';
    await update();
    expect(host.value).toBe('opt-2');
  });

  it('should support Reactive Forms formControl on RadioButtonGroupComponent', async () => {
    const control = new FormControl('opt-1');
    const { fixture, update } = await render(
      `
      <cds-ng-radio-button-group [formControl]="control">
        <cds-ng-radio-button value="opt-1"></cds-ng-radio-button>
        <cds-ng-radio-button value="opt-2"></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      `,
      imports,
      { control }
    );
    const host = groupHost(fixture.nativeElement);
    expect(host.value).toBe('opt-1');

    control.setValue('opt-2');
    await update();
    expect(host.value).toBe('opt-2');

    control.disable();
    await update();
    expect(host.disabled).toBe(true);
  });
});
