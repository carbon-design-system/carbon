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
import BXRadioButtonGroup from 'carbon-web-components/es/components-react/radio-button/radio-button-group';
// @ts-ignore
import BXRadioButton from 'carbon-web-components/es/components-react/radio-button/radio-button';
// @ts-ignore
import BXRadioButtonSkeleton from 'carbon-web-components/es/components-react/radio-button/radio-button-skeleton';
import { Default as baseDefault } from './radio-button-story';

export { default } from './radio-button-story';

export const Default = args => {
  const { disabled, labelPosition, orientation, name, value, onChange } = args?.['bx-radio-button-group'];
  const { hideLabel, labelText } = args?.['bx-radio-button'];
  return (
    <BXRadioButtonGroup
      disabled={disabled}
      labelPosition={labelPosition}
      orientation={orientation}
      name={name}
      value={value}
      onChange={onChange}>
      <BXRadioButton hideLabel={hideLabel} labelText={labelText} value="all" />
      <BXRadioButton hideLabel={hideLabel} labelText={labelText} value="cloudFoundry" />
      <BXRadioButton hideLabel={hideLabel} labelText={labelText} value="staging" />
    </BXRadioButtonGroup>
  );
};

Object.assign(Default, baseDefault);

export const skeleton = () => <BXRadioButtonSkeleton />;
