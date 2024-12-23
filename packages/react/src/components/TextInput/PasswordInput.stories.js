/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { PasswordInput } from '../PasswordInput';

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = (args) => (
  <div style={{ width: args.defaultWidth }}>
    <PasswordInput
      {...args}
      id="text-input-1"
      labelText="Text input label"
      helperText="Optional help text"
      autoComplete="true"
    />
  </div>
);

Default.args = {
  defaultWidth: 300,
  className: 'input-test-class',
  placeholder: 'Placeholder text',
  invalid: false,
  invalidText: 'Error message goes here',
  disabled: false,
  labelText: 'Label text',
  helperText: 'Helper text',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  size: 'md',
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
  helperText: {
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
  onChange: {
    action: 'onChange',
  },
  onClick: {
    action: 'onClick',
  },
  size: {
    options: ['sm', 'md', 'lg', 'xl'],
    control: {
      type: 'select',
    },
  },
};
