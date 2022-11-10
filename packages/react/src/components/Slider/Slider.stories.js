/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { SliderSkeleton } from '.';
import Slider from './Slider';
import { Layer } from '../Layer';
import mdx from './Slider.mdx';

export default {
  title: 'Components/Slider',
  component: Slider,
  subcomponents: {
    SliderSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
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
    noValidate
  />
);

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

export const WithLayer = () => {
  return (
    <>
      <Slider
        labelText="First Layer"
        value={50}
        min={0}
        max={100}
        step={1}
        stepMultiplier={10}
        noValidate
      />
      <Layer>
        <Slider
          labelText="Second Layer"
          value={50}
          min={0}
          max={100}
          step={1}
          stepMultiplier={10}
          noValidate
        />
        <Layer>
          <Slider
            labelText="Third Layer"
            value={50}
            min={0}
            max={100}
            step={1}
            stepMultiplier={10}
            noValidate
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

export const Playground = (args) => (
  <Slider
    {...args}
    labelText={`Slider (must be an increment of ${args.step})`}
  />
);

Playground.argTypes = {
  light: {
    table: {
      disable: true,
    },
  },
  children: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  disabled: {
    control: { type: 'boolean' },
  },
  formatLabel: {
    table: {
      disable: true,
    },
  },
  labelText: {
    table: {
      disable: true,
    },
  },
  min: {
    control: { type: 'number' },
    defaultValue: 0,
  },
  max: {
    control: { type: 'number' },
    defaultValue: 100,
  },
  required: {
    control: { type: 'boolean' },
  },
  step: {
    control: { type: 'number' },
    defaultValue: 5,
  },
  stepMultiplier: {
    control: { type: 'number' },
    defaultValue: 5,
  },
  value: {
    control: { type: 'number' },
    defaultValue: 50,
  },
  onBlur: {
    table: {
      disable: true,
    },
  },
  onChange: {
    table: {
      disable: true,
    },
  },
  onInputKeyUp: {
    table: {
      disable: true,
    },
  },
  onRelease: {
    table: {
      disable: true,
    },
  },
};
