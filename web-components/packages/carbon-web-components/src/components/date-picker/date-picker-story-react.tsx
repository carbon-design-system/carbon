/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXDatePicker from 'carbon-web-components/es/components-react/date-picker/date-picker';
// @ts-ignore
import BXDatePickerInput from 'carbon-web-components/es/components-react/date-picker/date-picker-input';
// @ts-ignore
import BXDatePickerInputSkeleton from 'carbon-web-components/es/components-react/date-picker/date-picker-input-skeleton';
import {
  Default as baseDefault,
  singleWithCalendar as baseSingleWithCalendar,
  rangeWithCalendar as baseRangeWithCalendar,
  skeletonSimple as baseSkeletonSimple,
  skeletonSingle as baseSkeletonSingle,
  skeletonRange as baseSkeletonRange,
} from './date-picker-story';

export { default } from './date-picker-story';

export const Default = args => {
  const { disabled } = args?.['bx-date-picker'] ?? {};
  const { colorScheme, hideLabel, invalid, labelText, placeholder, size, sizeHorizontal, validityMessage } =
    args?.['bx-date-picker-input'] ?? {};
  return (
    <BXDatePicker disabled={disabled}>
      <BXDatePickerInput
        colorScheme={colorScheme}
        hideLabel={hideLabel}
        invalid={invalid}
        labelText={labelText}
        placeholder={placeholder}
        size={size}
        sizeHorizontal={sizeHorizontal}
        validityMessage={validityMessage}
      />
    </BXDatePicker>
  );
};

Object.assign(Default, baseDefault);

export const singleWithCalendar = args => {
  const { dateFormat, disabled, enabledRange, open, value, onChanged, onFlatpickrError } = args?.['bx-date-picker'];
  const { colorScheme, hideLabel, invalid, labelText, placeholder, size, validityMessage, onInput } =
    args?.['bx-date-picker-input'];
  return (
    <BXDatePicker
      dateFormat={dateFormat}
      disabled={disabled}
      enabledRange={enabledRange}
      open={open}
      value={value}
      onChanged={onChanged}
      onFlatpickrError={onFlatpickrError}>
      <BXDatePickerInput
        colorScheme={colorScheme}
        hideLabel={hideLabel}
        invalid={invalid}
        kind="single"
        labelText={labelText}
        placeholder={placeholder}
        size={size}
        validityMessage={validityMessage}
        onInput={onInput}
      />
    </BXDatePicker>
  );
};

Object.assign(singleWithCalendar, baseSingleWithCalendar);

export const rangeWithCalendar = args => {
  const { dateFormat, disabled, enabledRange, open, value, onChanged, onFlatpickrError } = args?.['bx-date-picker'];
  const { colorScheme, hideLabel, invalid, labelText, placeholder, size, validityMessage, onInput } =
    args?.['bx-date-picker-input'];
  return (
    <BXDatePicker
      dateFormat={dateFormat}
      disabled={disabled}
      enabledRange={enabledRange}
      open={open}
      value={value}
      onChanged={onChanged}
      onFlatpickrError={onFlatpickrError}>
      <BXDatePickerInput
        colorScheme={colorScheme}
        hideLabel={hideLabel}
        invalid={invalid}
        kind="from"
        labelText={labelText}
        placeholder={placeholder}
        size={size}
        validityMessage={validityMessage}
        onInput={onInput}
      />
      <BXDatePickerInput
        colorScheme={colorScheme}
        hideLabel={hideLabel}
        invalid={invalid}
        kind="to"
        labelText={labelText}
        placeholder={placeholder}
        size={size}
        validityMessage={validityMessage}
        onInput={onInput}
      />
    </BXDatePicker>
  );
};

Object.assign(rangeWithCalendar, baseRangeWithCalendar);

export const skeletonSimple = () => <BXDatePickerInputSkeleton />;

Object.assign(skeletonSimple, baseSkeletonSimple);

export const skeletonSingle = () => <BXDatePickerInputSkeleton kind="single" />;

Object.assign(skeletonSingle, baseSkeletonSingle);

export const skeletonRange = () => (
  <>
    <BXDatePickerInputSkeleton kind="from" />
    <BXDatePickerInputSkeleton kind="to" />
  </>
);

Object.assign(skeletonRange, baseSkeletonRange, {
  decorators: [story => <div>{story()}</div>],
});
