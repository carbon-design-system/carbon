/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXSelect from 'carbon-web-components/es/components-react/select/select';
// @ts-ignore
import BXSelectItem from 'carbon-web-components/es/components-react/select/select-item';
// @ts-ignore
import BXSelectItemGroup from 'carbon-web-components/es/components-react/select/select-item-group';
import { Default as baseDefault } from './select-story';

export { default } from './select-story';

export const Default = args => {
  const {
    autofocus,
    colorScheme,
    disabled,
    helperText,
    invalid,
    labelText,
    name,
    placeholder,
    size,
    validityMessage,
    value,
    onInput,
  } = args?.['bx-select'] ?? {};
  return (
    <BXSelect
      autofocus={autofocus}
      colorScheme={colorScheme}
      disabled={disabled}
      helperText={helperText}
      invalid={invalid}
      labelText={labelText}
      name={name}
      placeholder={placeholder}
      size={size}
      validityMessage={validityMessage}
      value={value}
      onInput={onInput}>
      <BXSelectItemGroup label="Category 1">
        <BXSelectItem value="all">Option 1</BXSelectItem>
        <BXSelectItem value="cloudFoundry">Option 2</BXSelectItem>
      </BXSelectItemGroup>
      <BXSelectItemGroup label="Category 2">
        <BXSelectItem value="staging">Option 3</BXSelectItem>
        <BXSelectItem value="dea">Option 4</BXSelectItem>
        <BXSelectItem value="router">Option 5</BXSelectItem>
      </BXSelectItemGroup>
    </BXSelect>
  );
};

Object.assign(Default, baseDefault);
