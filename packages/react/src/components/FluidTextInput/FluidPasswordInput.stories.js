/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidPasswordInput from './FluidPasswordInput';
import mdx from './FluidPasswordInput.mdx';

import './test.scss';

export default {
  title: 'Components/Fluid Components/FluidPasswordInput',
  component: FluidPasswordInput,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['isPassword'],
    },
  },
};

export const Default = ({ defaultWidth, ...passwordInputArgs }) => (
  <div style={{ width: defaultWidth }}>
    <FluidPasswordInput {...passwordInputArgs} />
  </div>
);

Default.args = {
  className: '',
  defaultWidth: 300,
  disabled: false,
  id: 'input-1',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  labelText: 'Label',
  placeholder: 'Placeholder text',
  readOnly: false,
  showPasswordLabel: 'Show password',
  hidePasswordLabel: 'Hide password',
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
    control: 'text',
    description: '"Show password" tooltip text on password visibility toggle',
  },
  hidePasswordLabel: {
    control: 'text',
    description: '"Hide password" tooltip text on password visibility toggle',
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
  id: {
    control: 'text',
  },
  onChange: {
    action: 'onChange',
  },
  onClick: {
    action: 'onClick',
  },
  onTogglePasswordVisibility: {
    action: 'onTogglePasswordVisibility',
    description:
      'Callback function that is called whenever the toggle password visibility button is clicked `(evt) => void`',
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
  readOnly: {
    control: 'boolean',
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
