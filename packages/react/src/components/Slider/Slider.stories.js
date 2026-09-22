/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import { Slider, SliderSkeleton } from '.';
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

const sharedArgs = {
  ariaLabelInput: 'Slider value',
  disabled: false,
  hideLabel: false,
  hideTextInput: false,
  inputType: 'number',
  invalid: false,
  invalidText: 'Enter a value within the allowed range',
  labelText: 'Storage allocation',
  max: 100,
  maxLabel: ' GB',
  min: 0,
  minLabel: ' GB',
  name: 'storage-allocation',
  noValidate: false,
  readOnly: false,
  required: false,
  step: 1,
  stepMultiplier: 10,
  value: 50,
  warn: false,
  warnText: 'Storage allocation is approaching the recommended limit',
};

const twoHandleArgs = {
  ...sharedArgs,
  ariaLabelInput: 'Minimum storage allocation',
  labelText: 'Storage allocation range',
  name: 'minimum-storage-allocation',
  unstable_ariaLabelInputUpper: 'Maximum storage allocation',
  unstable_nameUpper: 'maximum-storage-allocation',
  unstable_valueUpper: 90,
  value: 10,
};

const sharedArgTypes = {
  ariaLabelInput: {
    control: 'text',
  },
  disabled: {
    control: 'boolean',
  },
  hideLabel: {
    control: 'boolean',
  },
  hideTextInput: {
    control: 'boolean',
  },
  inputType: {
    control: 'text',
  },
  invalid: {
    control: 'boolean',
  },
  invalidText: {
    control: 'text',
  },
  labelText: {
    control: 'text',
  },
  max: {
    control: 'number',
  },
  maxLabel: {
    control: 'text',
  },
  min: {
    control: 'number',
  },
  minLabel: {
    control: 'text',
  },
  name: {
    control: 'text',
  },
  noValidate: {
    control: 'boolean',
  },
  onBlur: {
    action: 'onBlur',
  },
  onChange: {
    action: 'onChange',
  },
  onInputKeyUp: {
    action: 'onInputKeyUp',
  },
  onRelease: {
    action: 'onRelease',
  },
  readOnly: {
    control: 'boolean',
  },
  required: {
    control: 'boolean',
  },
  step: {
    control: 'number',
  },
  stepMultiplier: {
    control: 'number',
  },
  unstable_ariaLabelInputUpper: {
    control: 'text',
  },
  unstable_nameUpper: {
    control: 'text',
  },
  unstable_valueUpper: {
    control: 'number',
  },
  value: {
    control: 'number',
  },
  warn: {
    control: 'boolean',
  },
  warnText: {
    control: 'text',
  },
};

const singleHandleControls = Object.keys(sharedArgs);
const twoHandleControls = Object.keys(twoHandleArgs);

const singleHandleParameters = {
  controls: {
    include: singleHandleControls,
  },
};

const twoHandleParameters = {
  controls: {
    include: twoHandleControls,
  },
};

const hiddenInputArgTypes = {
  ...sharedArgTypes,
  hideTextInput: {
    ...sharedArgTypes.hideTextInput,
    table: {
      readonly: true,
    },
  },
};

const randomValue = ({ max, min, step }) => {
  const range = max - min;
  if (range <= 0 || step <= 0) {
    return min;
  }

  return Math.min(max, min + Math.round((Math.random() * range) / step) * step);
};

export const Default = (args) => <Slider {...args} />;

Default.args = { ...sharedArgs };
Default.argTypes = { ...sharedArgTypes };
Default.parameters = singleHandleParameters;

export const SliderWithHiddenInputs = (args) => <Slider {...args} />;

SliderWithHiddenInputs.args = {
  ...sharedArgs,
  hideTextInput: true,
};
SliderWithHiddenInputs.argTypes = hiddenInputArgTypes;
SliderWithHiddenInputs.parameters = singleHandleParameters;

export const SliderWithCustomValueLabel = (args) => (
  <Slider
    {...args}
    formatLabel={(value) => {
      if (value < 25) {
        return 'Low';
      } else if (value > 75) {
        return 'High';
      }
      return 'Medium';
    }}
  />
);

SliderWithCustomValueLabel.args = {
  ...sharedArgs,
  hideTextInput: true,
  labelText: 'Storage usage',
  stepMultiplier: 50,
};
SliderWithCustomValueLabel.argTypes = {
  ...hiddenInputArgTypes,
};
SliderWithCustomValueLabel.parameters = singleHandleParameters;

export const ControlledSlider = (args) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <>
      <button type="button" onClick={() => setValue(randomValue(args))}>
        Randomize value
      </button>
      <Slider
        {...args}
        value={value}
        onChange={(data) => {
          setValue(data.value);
          args.onChange?.(data);
        }}
      />
      <p>Current value: {value}</p>
    </>
  );
};

ControlledSlider.args = { ...sharedArgs, value: 87 };
ControlledSlider.argTypes = { ...sharedArgTypes };
ControlledSlider.parameters = singleHandleParameters;

export const _WithLayer = (args) => (
  <WithLayer>
    <Slider {...args} />
  </WithLayer>
);

_WithLayer.args = { ...sharedArgs };
_WithLayer.argTypes = { ...sharedArgTypes };
_WithLayer.parameters = singleHandleParameters;

export const ControlledSliderWithLayer = (args) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <WithLayer>
      <button type="button" onClick={() => setValue(randomValue(args))}>
        Randomize value
      </button>
      <Slider
        {...args}
        value={value}
        onChange={(data) => {
          setValue(data.value);
          args.onChange?.(data);
        }}
      />
      <p>Current value: {value}</p>
    </WithLayer>
  );
};

ControlledSliderWithLayer.args = { ...sharedArgs, value: 87 };
ControlledSliderWithLayer.argTypes = { ...sharedArgTypes };
ControlledSliderWithLayer.parameters = singleHandleParameters;

export const TwoHandleSlider = (args) => <Slider {...args} />;

TwoHandleSlider.args = { ...twoHandleArgs };
TwoHandleSlider.argTypes = { ...sharedArgTypes };
TwoHandleSlider.parameters = twoHandleParameters;

export const TwoHandleSliderWithHiddenInputs = (args) => <Slider {...args} />;

TwoHandleSliderWithHiddenInputs.args = {
  ...twoHandleArgs,
  hideTextInput: true,
};
TwoHandleSliderWithHiddenInputs.argTypes = {
  ...hiddenInputArgTypes,
};
TwoHandleSliderWithHiddenInputs.parameters = twoHandleParameters;

const skeletonArgs = {
  ariaLabel: 'Slider handle',
  hideLabel: false,
  twoHandles: false,
  unstable_ariaLabelHandleUpper: 'Upper slider handle',
};

const skeletonArgTypes = {
  ariaLabel: {
    control: 'text',
  },
  hideLabel: {
    control: 'boolean',
  },
  twoHandles: {
    control: 'boolean',
  },
  unstable_ariaLabelHandleUpper: {
    control: 'text',
  },
};

const skeletonParameters = {
  controls: {
    include: Object.keys(skeletonArgs),
  },
};

export const Skeleton = (args) => <SliderSkeleton {...args} />;

Skeleton.args = { ...skeletonArgs };
Skeleton.argTypes = { ...skeletonArgTypes };
Skeleton.parameters = skeletonParameters;

export const TwoHandleSkeleton = (args) => <SliderSkeleton {...args} />;

TwoHandleSkeleton.args = {
  ...skeletonArgs,
  twoHandles: true,
};
TwoHandleSkeleton.argTypes = {
  ...skeletonArgTypes,
  twoHandles: {
    ...skeletonArgTypes.twoHandles,
    table: {
      readonly: true,
    },
  },
};
TwoHandleSkeleton.parameters = skeletonParameters;
