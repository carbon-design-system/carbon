/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import baseStory, {
  Default as baseDefault,
  singleWithCalendar as baseSingleWithCalendar,
  rangeWithCalendar as baseRangeWithCalendar,
  skeletonSimple as baseSkeletonSimple,
  skeletonSingle as baseSkeletonSingle,
  skeletonRange as baseSkeletonRange,
} from './date-picker-story';

export const Default = args => ({
  template: `
  <bx-date-picker [disabled]="disabled" [open]="open">
    <bx-date-picker-input
      [colorScheme]="colorScheme"
      [hideLabel]="hideLabel"
      [invalid]="invalid"
      [labelText]="labelText"
      [placeholder]="placeholder"
      [size]="size"
      [sizeHorizontal]="sizeHorizontal"
      [validityMessage]="validityMessage"
    >
    </bx-date-picker-input>
  </bx-date-picker>
`,
  props: {
    ...args?.['bx-date-picker'],
    ...args?.['bx-date-picker-input'],
  },
});

Object.assign(Default, baseDefault);

export const singleWithCalendar = args => ({
  template: `
  <bx-date-picker
    [dateFormat]="dateFormat"
    [disabled]="disabled"
    [enabledRange]="enabledRange"
    [open]="open"
    [value]="value"
    (bx-date-picker-changed)="onChanged($event)"
    (bx-date-picker-flatpickr-error)="onFlatpickrError($event)"
  >
    <bx-date-picker-input
      [colorScheme]="colorScheme"
      [hideLabel]="hideLabel"
      [invalid]="invalid"
      kind="single"
      [labelText]="labelText"
      [placeholder]="placeholder"
      [size]="size"
      [validityMessage]="validityMessage"
      (input)="onInput($event)"
    >
    </bx-date-picker-input>
  </bx-date-picker>
`,
  props: {
    ...args?.['bx-date-picker'],
    ...args?.['bx-date-picker-input'],
  },
});

Object.assign(singleWithCalendar, baseSingleWithCalendar);

export const rangeWithCalendar = args => ({
  template: `
  <bx-date-picker
    [dateFormat]="dateFormat"
    [disabled]="disabled"
    [enabledRange]="enabledRange"
    [open]="open"
    [value]="value"
    (bx-date-picker-changed)="onChanged($event)"
    (bx-date-picker-flatpickr-error)="onFlatpickrError($event)"
  >
    <bx-date-picker-input
      [colorScheme]="colorScheme"
      [hideLabel]="hideLabel"
      [invalid]="invalid"
      kind="from"
      [labelText]="labelText"
      [placeholder]="placeholder"
      [size]="size"
      [validityMessage]="validityMessage"
      (input)="onInput($event)"
    >
    </bx-date-picker-input>
    <bx-date-picker-input
      [colorScheme]="colorScheme"
      [hideLabel]="hideLabel"
      [invalid]="invalid"
      kind="to"
      [labelText]="labelText"
      [placeholder]="placeholder"
      [size]="size"
      [validityMessage]="validityMessage"
      (input)="onInput($event)"
    >
    </bx-date-picker-input>
  </bx-date-picker>
`,
  props: {
    ...args?.['bx-date-picker'],
    ...args?.['bx-date-picker-input'],
  },
});

Object.assign(rangeWithCalendar, baseRangeWithCalendar);

export const skeletonSimple = () => ({
  template: `<bx-date-picker-input-skeleton></bx-date-picker-input-skeleton>`,
});

Object.assign(skeletonSimple, baseSkeletonSimple);

export const skeletonSingle = () => ({
  template: `<bx-date-picker-input-skeleton kind="single"></bx-date-picker-input-skeleton>`,
});

Object.assign(skeletonSingle, baseSkeletonSingle);

export const skeletonRange = () => ({
  template: `
    <bx-date-picker-input-skeleton kind="from"></bx-date-picker-input-skeleton>
    <bx-date-picker-input-skeleton kind="to"></bx-date-picker-input-skeleton>
  `,
});

Object.assign(skeletonRange, baseSkeletonRange, {
  decorators: [
    story => {
      const { template, ...rest } = story();
      return {
        ...rest,
        template: `<div>${template}</div>`,
      };
    },
  ],
});

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
