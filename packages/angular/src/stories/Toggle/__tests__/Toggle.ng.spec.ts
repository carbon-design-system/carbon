/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleComponent } from '../../../generated/Toggle';
import { ToggleSkeletonComponent } from '../../../generated/ToggleSkeleton';
import { render } from '../../../testing/render';

const imports = [
  FormsModule,
  ReactiveFormsModule,
  ToggleComponent,
  ToggleSkeletonComponent,
];

const toggleHost = (el: HTMLElement) =>
  el.querySelector('cds-ng-toggle') as HTMLElement & Record<string, any>;

describe('ToggleComponent & ToggleSkeletonComponent', () => {
  it('should create ToggleComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-toggle></cds-ng-toggle>`,
      imports
    );
    expect(toggleHost(fixture.nativeElement)).toBeTruthy();
  });

  it('should create ToggleSkeletonComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-toggle-skeleton></cds-ng-toggle-skeleton>`,
      imports
    );
    expect(
      fixture.nativeElement.querySelector('cds-ng-toggle-skeleton')
    ).toBeTruthy();
  });

  it('should forward inputs to ToggleComponent', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `
      <cds-ng-toggle
        [labelText]="labelText"
        [labelA]="labelA"
        [labelB]="labelB"
        [size]="size"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [toggled]="toggled"
        [hideLabel]="hideLabel"></cds-ng-toggle>
      `,
      imports,
      {
        labelText: 'Toggle Label',
        labelA: 'Active',
        labelB: 'Inactive',
        size: 'sm',
        disabled: false,
        readOnly: false,
        toggled: false,
        hideLabel: false,
      }
    );
    const host = toggleHost(fixture.nativeElement);
    expect(host.labelText).toBe('Toggle Label');
    expect(host.labelA).toBe('Active');
    expect(host.labelB).toBe('Inactive');
    expect(host.size).toBe('sm');
    expect(host.toggled).toBe(false);

    h.labelText = 'Updated Label';
    h.labelA = 'Yes';
    h.labelB = 'No';
    h.size = 'md';
    h.disabled = true;
    h.readOnly = true;
    h.toggled = true;
    h.hideLabel = true;
    await update();

    expect(host.labelText).toBe('Updated Label');
    expect(host.labelA).toBe('Yes');
    expect(host.labelB).toBe('No');
    expect(host.size).toBe('md');
    expect(host.disabled).toBe(true);
    expect(host.readOnly).toBe(true);
    expect(host.toggled).toBe(true);
    expect(host.hideLabel).toBe(true);
  });

  it('should support ngModel two-way binding on ToggleComponent', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-toggle [(ngModel)]="isToggled"></cds-ng-toggle>`,
      imports,
      { isToggled: true }
    );
    const host = toggleHost(fixture.nativeElement);
    expect(host.checked).toBe(true);

    h.isToggled = false;
    await update();
    expect(host.checked).toBe(false);
  });

  it('should support Reactive Forms formControl on ToggleComponent', async () => {
    const control = new FormControl(true);
    const { fixture, update } = await render(
      `<cds-ng-toggle [formControl]="control"></cds-ng-toggle>`,
      imports,
      { control }
    );
    const host = toggleHost(fixture.nativeElement);
    expect(host.checked).toBe(true);

    control.setValue(false);
    await update();
    expect(host.checked).toBe(false);

    control.disable();
    await update();
    expect(host.disabled).toBe(true);
  });
});
