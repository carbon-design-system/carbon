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
import BXSlider from 'carbon-web-components/es/components-react/slider/slider';
// @ts-ignore
import BXSliderInput from 'carbon-web-components/es/components-react/slider/slider-input';
// @ts-ignore
import BXSliderSkeleton from 'carbon-web-components/es/components-react/slider/slider-skeleton';
import { Default as baseDefault, withInputBox as baseWithInputBox } from './slider-story';

export { default } from './slider-story';

export const Default = args => {
  const { disabled, labelText, max, min, name, step, value, onChange } = args?.['bx-slider'];
  return (
    <BXSlider
      disabled={disabled}
      labelText={labelText}
      max={max}
      min={min}
      name={name}
      step={step}
      value={value}
      onChange={onChange}
    />
  );
};

Object.assign(Default, baseDefault);

export const withInputBox = args => {
  const { disabled, labelText, max, min, name, step, value, onChange } = args?.['bx-slider'];
  return (
    <BXSlider
      disabled={disabled}
      labelText={labelText}
      max={max}
      min={min}
      name={name}
      step={step}
      value={value}
      onChange={onChange}>
      <BXSliderInput aria-label="Slider value" type="number" />
    </BXSlider>
  );
};

Object.assign(withInputBox, baseWithInputBox);

export const skeleton = () => <BXSliderSkeleton />;
