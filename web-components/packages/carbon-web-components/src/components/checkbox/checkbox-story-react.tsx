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
import BXCheckbox from 'carbon-web-components/es/components-react/checkbox/checkbox';
import { Default as baseDefault } from './checkbox-story';

export { default } from './checkbox-story';

export const Default = args => {
  const { checked, disabled, hideLabel, indeterminate, labelText, name, value, onChange } = args?.['bx-checkbox'];
  return (
    <BXCheckbox
      checked={checked}
      disabled={disabled}
      hideLabel={hideLabel}
      indeterminate={indeterminate}
      labelText={labelText}
      name={name || undefined}
      value={value || undefined}
      onChange={onChange}
    />
  );
};

Object.assign(Default, baseDefault);
