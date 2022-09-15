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
import BXNumberInput from 'carbon-web-components/es/components-react/number-input/number-input';
// @ts-ignore
import BXNumberInputSkeleton from 'carbon-web-components/es/components-react/number-input/number-input-skeleton';
// @ts-ignore
import BXFormItem from 'carbon-web-components/es/components-react/form/form-item';
import {
  Default as baseDefault,
  formItem as baseFormItem,
  withoutFormItemWrapper as baseWithoutFormItemWrapper,
} from './number-input-story';

export { default } from './number-input-story';

export const Default = args => {
  const { colorScheme, disabled, value, placeholder, invalid, mobile, min, max, size, step, light, onInput } =
    args?.['bx-number-input'];
  return (
    <BXNumberInput
      colorScheme={colorScheme}
      disabled={disabled}
      invalid={invalid}
      value={value}
      placeholder={placeholder}
      onInput={onInput}
      mobile={mobile}
      min={min}
      max={max}
      size={size}
      step={step}
      light={light}
    />
  );
};

Object.assign(Default, baseDefault);

export const formItem = args => {
  const { colorScheme, disabled, value, placeholder, invalid, mobile, min, max, size, step, light, onInput } =
    args?.['bx-number-input'];
  return (
    <BXFormItem>
      <BXNumberInput
        value={value}
        colorScheme={colorScheme}
        placeholder={placeholder}
        onInput={onInput}
        disabled={disabled}
        invalid={invalid}
        mobile={mobile}
        min={min}
        max={max}
        size={size}
        step={step}
        light={light}>
        <span slot="label-text">Label text</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Something isn't right</span>
        <span slot="validity-message-max">Try a lower value, something less than {max}</span>
        <span slot="validity-message-min">Value must be larger than {min}</span>
      </BXNumberInput>
    </BXFormItem>
  );
};

Object.assign(formItem, baseFormItem);

export const withoutFormItemWrapper = args => {
  const { colorScheme, disabled, value, placeholder, invalid, mobile, min, max, size, step, light, onInput } =
    args?.['bx-number-input'];
  return (
    <BXNumberInput
      value={value}
      colorScheme={colorScheme}
      placeholder={placeholder}
      onInput={onInput}
      disabled={disabled}
      invalid={invalid}
      mobile={mobile}
      min={min}
      max={max}
      size={size}
      step={step}
      light={light}>
      <span slot="label-text">Label text</span>
      <span slot="helper-text">Optional helper text</span>
      <span slot="validity-message">Something isn't right</span>
    </BXNumberInput>
  );
};

Object.assign(withoutFormItemWrapper, baseWithoutFormItemWrapper);

export const skeleton = () => <BXNumberInputSkeleton />;
