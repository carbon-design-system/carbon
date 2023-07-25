/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import { SliderSkeleton } from '.';
import Slider from './Slider';
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
        labelText="Slider label"
        max={100}
        min={0}
        value={val}
        onChange={({ value }) => setVal(value)}
      />
      <h1>{val}</h1>
    </>
  );
};

export const _WithLayer = () => (
  <WithLayer>
    <Slider
      labelText="Slider label"
      value={50}
      min={0}
      max={100}
      step={1}
      stepMultiplier={10}
      noValidate
    />
  </WithLayer>
);

export const ControlledSliderWithLayer = () => {
  const [val, setVal] = useState(87);
  return (
    <WithLayer>
      <button
        type="button"
        onClick={() => setVal(Math.round(Math.random() * 100))}>
        randomize value
      </button>
      <Slider
        labelText="Slider label"
        max={100}
        min={0}
        value={val}
        onChange={({ value }) => setVal(value)}
      />
      <h1>{val}</h1>
    </WithLayer>
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
    control: {
      control: {
        type: 'boolean',
      },
    },
  },
  formatLabel: {
    table: {
      disable: true,
    },
  },
  hideTextInput: {
    control: {
      type: 'boolean',
    },
  },
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    control: {
      type: 'text',
    },
  },
  labelText: {
    table: {
      disable: true,
    },
  },
  min: {
    control: { type: 'number' },
  },
  max: {
    control: { type: 'number' },
  },
  readOnly: {
    control: {
      type: 'boolean',
    },
  },
  required: {
    control: {
      type: 'boolean',
    },
  },
  step: {
    control: { type: 'number' },
  },
  stepMultiplier: {
    control: { type: 'number' },
  },
  value: {
    control: { type: 'number' },
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
  warn: {
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    control: {
      type: 'text',
    },
  },
};

Playground.args = {
  disabled: false,
  hideTextInput: false,
  invalid: false,
  invalidText: 'Invalid message goes here',
  min: 0,
  max: 100,
  readOnly: false,
  required: false,
  step: 5,
  stepMultiplier: 5,
  value: 50,
  warn: false,
  warnText: 'Warning message goes here',
};
