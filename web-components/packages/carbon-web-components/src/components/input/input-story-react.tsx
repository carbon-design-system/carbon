/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXInput from 'carbon-web-components/es/components-react/input/input';
// @ts-ignore
import BXFormItem from 'carbon-web-components/es/components-react/form/form-item';
import {
  Default as baseDefault,
  formItem as baseFormItem,
  withoutFormItemWrapper as baseWithoutFormItemWrapper,
} from './input-story';

export { default } from './input-story';

export const Default = args => {
  const { colorScheme, disabled, value, placeholder, size, invalid, type, onInput } = args?.['bx-input'];
  return (
    <BXInput
      colorScheme={colorScheme}
      disabled={disabled}
      invalid={invalid}
      type={type}
      value={value}
      placeholder={placeholder}
      size={size}
      onInput={onInput}
    />
  );
};

Object.assign(Default, baseDefault);

export const formItem = args => {
  const { colorScheme, disabled, value, placeholder, size, invalid, type, onInput } = args?.['bx-input'];
  return (
    <BXFormItem>
      <BXInput
        colorScheme={colorScheme}
        type={type}
        value={value}
        placeholder={placeholder}
        size={size}
        onInput={onInput}
        disabled={disabled}
        invalid={invalid}>
        <span slot="label-text">Label text</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Something isn't right</span>
      </BXInput>
    </BXFormItem>
  );
};

Object.assign(formItem, baseFormItem);

export const withoutFormItemWrapper = args => {
  const { colorScheme, disabled, value, placeholder, size, invalid, type, onInput } = args?.['bx-input'];
  return (
    <BXInput
      colorScheme={colorScheme}
      type={type}
      value={value}
      placeholder={placeholder}
      size={size}
      onInput={onInput}
      disabled={disabled}
      invalid={invalid}>
      <span slot="label-text">Label text</span>
      <span slot="helper-text">Optional helper text</span>
      <span slot="validity-message">Something isn't right</span>
    </BXInput>
  );
};

Object.assign(withoutFormItemWrapper, baseWithoutFormItemWrapper);
