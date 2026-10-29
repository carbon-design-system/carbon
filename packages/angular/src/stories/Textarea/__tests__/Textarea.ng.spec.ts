/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from '../../../generated/Textarea';
import { TextareaSkeletonComponent } from '../../../generated/TextareaSkeleton';
import { render } from '../../../testing/render';

const imports = [
  FormsModule,
  ReactiveFormsModule,
  TextareaComponent,
  TextareaSkeletonComponent,
];

const hostEl = (el: HTMLElement) =>
  el.querySelector('cds-ng-textarea') as HTMLElement & Record<string, any>;

describe('TextareaComponent', () => {
  it('should create TextareaComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-textarea></cds-ng-textarea>`,
      imports
    );
    expect(hostEl(fixture.nativeElement)).toBeTruthy();
  });

  it('should create TextareaSkeletonComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-textarea-skeleton></cds-ng-textarea-skeleton>`,
      imports
    );
    expect(
      fixture.nativeElement.querySelector('cds-ng-textarea-skeleton')
    ).toBeTruthy();
  });

  it('should forward @Input() properties to host element', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-textarea
        [disabled]="disabled"
        [enableCounter]="enableCounter"
        [counterMode]="counterMode"
        [helperText]="helperText"
        [hideLabel]="hideLabel"
        [invalid]="invalid"
        [invalidText]="invalidText"
        [label]="label"
        [maxCount]="maxCount"
        [placeholder]="placeholder"
        [readonly]="readonly"
        [rows]="rows"
        [cols]="cols"
        [warn]="warn"
        [warnText]="warnText">
      </cds-ng-textarea>`,
      imports,
      {
        disabled: true,
        enableCounter: true,
        counterMode: 'word',
        helperText: 'Helper',
        hideLabel: true,
        invalid: true,
        invalidText: 'Error',
        label: 'My Label',
        maxCount: 200,
        placeholder: 'Holder',
        readonly: true,
        rows: 8,
        cols: 40,
        warn: true,
        warnText: 'Warning',
      }
    );
    const host = hostEl(fixture.nativeElement);
    expect(host.disabled).toBe(true);
    expect(host.enableCounter).toBe(true);
    expect(host.counterMode).toBe('word');
    expect(host.helperText).toBe('Helper');
    expect(host.hideLabel).toBe(true);
    expect(host.invalid).toBe(true);
    expect(host.invalidText).toBe('Error');
    expect(host.label).toBe('My Label');
    expect(host.maxCount).toBe(200);
    expect(host.placeholder).toBe('Holder');
    expect(host.readonly).toBe(true);
    expect(host.rows).toBe(8);
    expect(host.cols).toBe(40);
    expect(host.warn).toBe(true);
    expect(host.warnText).toBe('Warning');

    h.disabled = false;
    h.readonly = false;
    h.rows = 6;
    await update();
    expect(host.disabled).toBe(false);
    expect(host.readonly).toBe(false);
    expect(host.rows).toBe(6);
  });

  it('should support ControlValueAccessor via ngModel', async () => {
    const {
      fixture,
      host: testHost,
      update,
    } = await render(
      `<cds-ng-textarea [(ngModel)]="textValue"></cds-ng-textarea>`,
      imports,
      { textValue: 'Hello Angular' }
    );
    const host = hostEl(fixture.nativeElement);
    expect(host.value).toBe('Hello Angular');

    host.value = 'Changed via user';
    host.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(testHost.textValue).toBe('Changed via user');

    testHost.textValue = 'Updated from model';
    await update();
    expect(host.value).toBe('Updated from model');
  });

  it('should support ControlValueAccessor via reactive FormControl', async () => {
    const control = new FormControl('Reactive start');
    const { fixture } = await render(
      `<cds-ng-textarea [formControl]="control"></cds-ng-textarea>`,
      imports,
      { control }
    );
    const host = hostEl(fixture.nativeElement);
    expect(host.value).toBe('Reactive start');

    control.setValue('Reactive updated');
    fixture.detectChanges();
    expect(host.value).toBe('Reactive updated');

    host.value = 'Changed from DOM';
    host.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(control.value).toBe('Changed from DOM');

    control.disable();
    fixture.detectChanges();
    expect(host.disabled).toBe(true);
  });
});
