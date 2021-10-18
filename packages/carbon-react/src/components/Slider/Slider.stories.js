/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
// import { action } from '@storybook/addon-actions';

// import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import { Slider, SliderSkeleton } from '.';
// import { sliderValuePropSync } from '../../../../react/src/internal/FeatureFlags';
import { Layer } from '../Layer';
import mdx from './Slider.mdx';

export default {
  title: 'Components/Slider',

  parameters: {
    component: Slider,
    docs: {
      page: mdx,
    },
    subcomponents: {
      SliderSkeleton,
    },
  },
};

export const Default = () => (
  <Slider
    labelText="Slider Label"
    value={50}
    min={0}
    max={100}
    step={1}
    stepMultiplier={10}
    novalidate
  />
);

Default.story = {
  name: 'Slider',
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

export const withLayer = () => {
  return (
    <>
      <Slider
        labelText="First Layer"
        value={50}
        min={0}
        max={100}
        step={1}
        stepMultiplier={10}
        novalidate
      />
      <Layer>
        <Slider
          labelText="Second Layer"
          value={50}
          min={0}
          max={100}
          step={1}
          stepMultiplier={10}
          novalidate
        />
        <Layer>
          <Slider
            labelText="Third Layer"
            value={50}
            min={0}
            max={100}
            step={1}
            stepMultiplier={10}
            novalidate
          />
        </Layer>
      </Layer>
    </>
  );
};

export const ControlledSliderWithLayer = () => {
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
      <Layer>
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
        <Layer>
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
        </Layer>
      </Layer>
    </>
  );
};

export const Skeleton = () => <SliderSkeleton />;
