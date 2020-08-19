/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import Slider from '../Slider';
import SliderSkeleton from '../Slider/Slider.Skeleton';
import { sliderValuePropSync } from '../../internal/FeatureFlags';

const props = () => ({
  name: text('Form item name (name)', ''),
  inputType: text('The form element type (inputType)', 'number'),
  ariaLabelInput: text(
    'The ARIA label for the <input> (ariaLabelInput)',
    'Label for slider value'
  ),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  hideTextInput: boolean('Without text input (hideTextInput)', false),
  value: !sliderValuePropSync ? 50 : number('The value (value)', 50),
  min: number('The minimum value (min)', 0),
  max: number('The maximum value (max)', 100),
  step: number('The step (step)', 1),
  stepMultiplier: number(
    'The step factor for Shift+arrow keys (stepMultiplier)',
    5
  ),
  labelText: text('Label text (labelText)', 'Slider Label'),
  minLabel: text('Label for minimum value (minLabel)', ''),
  maxLabel: text('Label for maximum value (maxLabel)', ''),
  onChange: action('onChange'),
  onRelease: action('onRelease'),
});

export default {
  title: 'Slider',
  decorators: [withKnobs],

  parameters: {
    component: Slider,

    subcomponents: {
      SliderSkeleton,
    },
  },
};

export const Default = () => <Slider required id="slider" {...props()} />;

Default.storyName = 'default';

Default.parameters = {
  info: {
    text: `
            Sliders provide a visual indication of adjustable content, where the user can move the handle along a horizontal track to increase or decrease the value.
          `,
  },
};

export const ControlledSlider = () => {
  const [val, setVal] = useState(87);
  return (
    <>
      <button
        type="button"
        onClick={() => setVal(Math.round(Math.random() * 100))}>
        randomize value
      </button>
      <Slider
        max={100}
        min={0}
        value={val}
        onChange={({ value }) => setVal(value)}
      />
      <h1>{val}</h1>
    </>
  );
};

ControlledSlider.storyName = 'controlled slider';

export const Skeleton = () => (
  <div
    style={{ marginTop: '2rem' }}
    aria-label="loading slider"
    aria-live="assertive"
    role="status"
    tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
  >
    <SliderSkeleton />
  </div>
);

Skeleton.storyName = 'skeleton';

Skeleton.parameters = {
  info: {
    text: `
        Placeholder skeleton state to use when content is loading.
      `,
  },
};
