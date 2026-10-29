/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TagComponent } from '../../../generated/Tag';
import { DismissibleTagComponent } from '../../../generated/DismissibleTag';
import { SelectableTagComponent } from '../../../generated/SelectableTag';
import { OperationalTagComponent } from '../../../generated/OperationalTag';
import { TagSkeletonComponent } from '../../../generated/TagSkeleton';
import { render } from '../../../testing/render';

const imports = [
  TagComponent,
  DismissibleTagComponent,
  SelectableTagComponent,
  OperationalTagComponent,
  TagSkeletonComponent,
];

describe('Tag family Angular components', () => {
  it('should create TagComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-tag type="blue">Tag</cds-ng-tag>`,
      imports
    );
    expect(fixture.nativeElement.querySelector('cds-ng-tag')).toBeTruthy();
  });

  it('should create DismissibleTagComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-dismissible-tag text="Dismissible"></cds-ng-dismissible-tag>`,
      imports
    );
    expect(
      fixture.nativeElement.querySelector('cds-ng-dismissible-tag')
    ).toBeTruthy();
  });

  it('should create SelectableTagComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-selectable-tag text="Selectable"></cds-ng-selectable-tag>`,
      imports
    );
    expect(
      fixture.nativeElement.querySelector('cds-ng-selectable-tag')
    ).toBeTruthy();
  });

  it('should create OperationalTagComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-operational-tag text="Operational"></cds-ng-operational-tag>`,
      imports
    );
    expect(
      fixture.nativeElement.querySelector('cds-ng-operational-tag')
    ).toBeTruthy();
  });

  it('should create TagSkeletonComponent', async () => {
    const { fixture } = await render(
      `<cds-ng-tag-skeleton></cds-ng-tag-skeleton>`,
      imports
    );
    expect(
      fixture.nativeElement.querySelector('cds-ng-tag-skeleton')
    ).toBeTruthy();
  });

  it('should forward inputs on TagComponent', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-tag [type]="type" [size]="size" [disabled]="disabled" [filter]="filter">Tag</cds-ng-tag>`,
      imports,
      { type: 'blue', size: 'sm', disabled: false, filter: false }
    );
    const el = fixture.nativeElement.querySelector('cds-ng-tag') as any;
    expect(el.type).toBe('blue');
    expect(el.size).toBe('sm');
    expect(el.disabled).toBe(false);

    h.type = 'red';
    h.size = 'lg';
    h.disabled = true;
    h.filter = true;
    await update();

    expect(el.type).toBe('red');
    expect(el.size).toBe('lg');
    expect(el.disabled).toBe(true);
    expect(el.filter).toBe(true);
  });

  it('should forward inputs on SelectableTagComponent', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-selectable-tag [text]="text" [selected]="selected" [disabled]="disabled"></cds-ng-selectable-tag>`,
      imports,
      { text: 'Option', selected: false, disabled: false }
    );
    const el = fixture.nativeElement.querySelector(
      'cds-ng-selectable-tag'
    ) as any;
    expect(el.text).toBe('Option');
    expect(el.selected).toBe(false);

    h.text = 'Updated Option';
    h.selected = true;
    h.disabled = true;
    await update();

    expect(el.text).toBe('Updated Option');
    expect(el.selected).toBe(true);
    expect(el.disabled).toBe(true);
  });
});
