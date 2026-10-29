/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from '../../../generated/Search';
import { SearchSkeletonComponent } from '../../../generated/SearchSkeleton';
import { render } from '../../../testing/render';

const imports = [
  FormsModule,
  ReactiveFormsModule,
  SearchComponent,
  SearchSkeletonComponent,
];

const hostEl = (el: HTMLElement) =>
  el.querySelector('cds-ng-search') as HTMLElement & Record<string, any>;

describe('SearchComponent', () => {
  it('should create SearchComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-search></cds-ng-search>`,
      imports
    );
    expect(hostEl(fixture.nativeElement)).toBeTruthy();
  });

  it('should create SearchSkeletonComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-search-skeleton></cds-ng-search-skeleton>`,
      imports
    );
    expect(
      fixture.nativeElement.querySelector('cds-ng-search-skeleton')
    ).toBeTruthy();
  });

  it('should forward @Input() properties to host element', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-search
        [autoComplete]="autoComplete"
        [autofocus]="autofocus"
        [closeButtonLabelText]="closeButtonLabelText"
        [disabled]="disabled"
        [expandable]="expandable"
        [expanded]="expanded"
        [labelText]="labelText"
        [placeholder]="placeholder"
        [size]="size"
        [type]="type"
        [role]="role">
      </cds-ng-search>`,
      imports,
      {
        autoComplete: 'on',
        autofocus: true,
        closeButtonLabelText: 'Clear',
        disabled: true,
        expandable: true,
        expanded: true,
        labelText: 'Custom Search',
        placeholder: 'Search items',
        size: 'sm',
        type: 'search',
        role: 'searchbox',
      }
    );
    const host = hostEl(fixture.nativeElement);
    expect(host.autoComplete).toBe('on');
    expect(host.autofocus).toBe(true);
    expect(host.closeButtonLabelText).toBe('Clear');
    expect(host.disabled).toBe(true);
    expect(host.expandable).toBe(true);
    expect(host.expanded).toBe(true);
    expect(host.labelText).toBe('Custom Search');
    expect(host.placeholder).toBe('Search items');
    expect(host.size).toBe('sm');
    expect(host.type).toBe('search');
    expect(host.role).toBe('searchbox');

    h.disabled = false;
    h.expanded = false;
    h.size = 'lg';
    await update();
    expect(host.disabled).toBe(false);
    expect(host.expanded).toBe(false);
    expect(host.size).toBe('lg');
  });

  it('should support ControlValueAccessor via ngModel', async () => {
    const {
      fixture,
      host: testHost,
      update,
    } = await render(
      `<cds-ng-search [(ngModel)]="searchQuery"></cds-ng-search>`,
      imports,
      { searchQuery: 'Initial search' }
    );
    const host = hostEl(fixture.nativeElement);
    expect(host.value).toBe('Initial search');

    host.value = 'User query';
    host.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(testHost.searchQuery).toBe('User query');

    testHost.searchQuery = 'Updated query';
    await update();
    expect(host.value).toBe('Updated query');
  });

  it('should support ControlValueAccessor via reactive FormControl', async () => {
    const control = new FormControl('Form search');
    const { fixture } = await render(
      `<cds-ng-search [formControl]="control"></cds-ng-search>`,
      imports,
      { control }
    );
    const host = hostEl(fixture.nativeElement);
    expect(host.value).toBe('Form search');

    control.setValue('Form updated');
    fixture.detectChanges();
    expect(host.value).toBe('Form updated');

    host.value = 'DOM search';
    host.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(control.value).toBe('DOM search');

    control.disable();
    fixture.detectChanges();
    expect(host.disabled).toBe(true);
  });
});
