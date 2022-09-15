/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import {
  Default as baseDefault,
  singleWithCalendar as baseSingleWithCalendar,
  rangeWithCalendar as baseRangeWithCalendar,
  skeletonSingle as baseSkeletonSingle,
  skeletonSimple as baseSkeletonSimple,
  skeletonRange as baseSkeletonRange,
} from './date-picker-story';

export { default } from './date-picker-story';

export const Default = args => ({
  template: `
    <bx-date-picker :disabled="disabled">
      <bx-date-picker-input
        :color-scheme="colorScheme"
        :hide-label="hideLabel"
        :invalid="invalid"
        :label-text="labelText"
        :light="light"
        :placeholder="placeholder"
        :size="size"
        :size-horizontal="sizeHorizontal"
        :validity-message="validityMessage"
      >
      </bx-date-picker-input>
    </bx-date-picker>
  `,
  ...createVueBindingsFromProps({ ...args?.['bx-date-picker'], ...args?.['bx-date-picker-input'] }),
});

Object.assign(Default, baseDefault);

export const singleWithCalendar = args => ({
  template: `
    <bx-date-picker
      :date-format="dateFormat"
      :disabled="disabled"
      :enabled-range="enabledRange"
      :open="open"
      :value="value"
      @bx-date-picker-changed="onChanged"
      @bx-date-picker-flatpickr-error="onFlatpickrError"
    >
      <bx-date-picker-input
        :color-scheme="colorScheme"
        :hide-label="hideLabel"
        :invalid="invalid"
        kind="single"
        :label-text="labelText"
        :light="light"
        :placeholder="placeholder"
        :size="size"
        :validity-message="validityMessage"
        @input="onInput"
      >
      </bx-date-picker-input>
    </bx-date-picker>
  `,
  ...createVueBindingsFromProps({ ...args?.['bx-date-picker'], ...args?.['bx-date-picker-input'] }),
});

Object.assign(singleWithCalendar, baseSingleWithCalendar);

export const rangeWithCalendar = args => ({
  template: `
    <bx-date-picker
      :date-format="dateFormat"
      :disabled="disabled"
      :enabled-range="enabledRange"
      :open="open"
      :value="value"
      @bx-date-picker-changed="onChanged"
      @bx-date-picker-flatpickr-error="onFlatpickrError"
    >
      <bx-date-picker-input
        :color-scheme="colorScheme"
        :hide-label="hideLabel"
        :invalid="invalid"
        kind="from"
        :label-text="labelText"
        :light="light"
        :placeholder="placeholder"
        :size="size"
        :validity-message="validityMessage"
        @input="onInput"
      >
      </bx-date-picker-input>
      <bx-date-picker-input
        :color-scheme="colorScheme"
        :hide-label="hideLabel"
        :invalid="invalid"
        kind="to"
        :label-text="labelText"
        :light="light"
        :placeholder="placeholder"
        :size="size"
        :validity-message="validityMessage"
        @input="onInput"
      >
      </bx-date-picker-input>
    </bx-date-picker>
  `,
  ...createVueBindingsFromProps({ ...args?.['bx-date-picker'], ...args?.['bx-date-picker-input'] }),
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
    () => ({
      template: `<div><story/></div>`,
    }),
  ],
});
