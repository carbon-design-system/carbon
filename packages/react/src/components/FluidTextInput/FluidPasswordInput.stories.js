/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidTextInput from '.';
import './test.scss';

export default {
  title: 'Experimental/Fluid Components/unstable__FluidPasswordInput',
  component: FluidTextInput,
};

export const Default = () => (
  <FluidTextInput
    id="input-1"
    labelText="Label"
    placeholder="Placeholder text"
    isPassword
  />
);

export const Playground = (args) => (
  <div style={{ width: args.playgroundWidth }}>
    <FluidTextInput
      {...args}
      id="input-1"
      labelText="Label"
      placeholder="Placeholder text"
      isPassword
    />
  </div>
);

Playground.args = {
  playgroundWidth: 300,
  className: 'test-class',
  placeholder: 'Placeholder text',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  isPassword: false,
  disabled: false,
  labelText: 'Label',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

Playground.argTypes = {
  playgroundWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  className: {
    control: {
      type: 'text',
    },
  },
  defaultValue: {
    control: {
      type: 'text',
    },
  },
  placeholder: {
    control: {
      type: 'text',
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
  isPassword: {
    control: {
      type: 'boolean',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  labelText: {
    control: {
      type: 'text',
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
  value: {
    control: {
      type: 'text',
    },
  },
};
