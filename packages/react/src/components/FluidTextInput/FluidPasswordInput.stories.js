/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidPasswordInput from './FluidPasswordInput';

import './test.scss';

export default {
  title: 'Experimental/Fluid Components/unstable__FluidPasswordInput',
  component: FluidPasswordInput,
};

export const Default = (args) => (
  <div style={{ width: args.defaultWidth }}>
    <FluidPasswordInput
      {...args}
      id="input-1"
      labelText="Label"
      placeholder="Placeholder text"
    />
  </div>
);

Default.args = {
  defaultWidth: 300,
  className: 'test-class',
  placeholder: 'Placeholder text',
  showPasswordLabel: 'Show password label',
  hidePasswordLabel: 'Hide password label',
  onTogglePasswordVisibility: true,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  disabled: false,
  labelText: 'Label',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

Default.argTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  className: {
    control: {
      type: 'text',
    },
  },
  showPasswordLabel: {
    description: 'Show password" tooltip text on password visibility toggle',
  },
  hidePasswordLabel: {
    description: 'Hide password" tooltip text on password visibility toggle',
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
    table: {
      disable: true,
    },
  },
  onTogglePasswordVisibility: {
    table: {
      disable: false,
    },
    control: false,
    description:
      'Callback function that is called whenever the toggle password visibility button is clicked `(evt) => void`      ',
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
